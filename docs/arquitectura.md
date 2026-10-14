# Syzygy — Arquitectura Tecnológica & Topología Multi-Host

Este documento detalla la infraestructura, flujo de datos y estrategia de despliegue continuo de la plataforma web de Syzygy (`syzygy.metamedia.cl`).

---

## 0. Dependencia de Ecosistema: Rizoma

Syzygy no se despliega directamente en Oracle Cloud. Su infraestructura de producción depende del proyecto **Rizoma**, que es la capa de administración del Oracle Cloud VPS del ecosistema completo.

```
ECOSISTEMA vandalit
│
├── N8N (automatización y aprendizaje)
│   └── Proyecto 3 (Streams) ──────────────┐
│                                           │ trigger
├── RIZOMA (Oracle Cloud VPS)  ◄────────────┘
│   ├── Gestión de contenedores y servicios
│   ├── Flujos de datos del ecosistema
│   └── Hosting para proyectos puntuales
│       └── Syzygy ──────────────────────────── ESTE PROYECTO
│
└── CPANEL (Hosting compartido)
    └── WordPress Headless (backend CMS de Syzygy)
```

**Secuencia de activación de Rizoma:**
1. N8N llega al Proyecto 3 (Streams).
2. Se activa Rizoma en producción (Oracle Cloud VPS).
3. Rizoma prepara el espacio para Syzygy (Nginx, subdominio, SSL).
4. Se conecta el pipeline CI/CD de GitHub Actions con Rizoma.

> El desarrollo del **frontend de Syzygy** (Fase 1) es completamente independiente de Rizoma y avanza en paralelo.

---

## 1. Visión General de la Topología

La solución adopta un patrón **Decoupled Multi-Host**, aislando el motor de gestión de contenidos (CMS en cPanel) del motor de entrega de alto rendimiento (Frontend estático en Oracle Cloud VPS):

```
                              ┌────────────────┐
                              │     NIC.CL     │
                              │  metamedia.cl  │
                              └───────┬────────┘
                                      │ (Delegación DNS / Nameservers)
                                      ▼
                        ┌───────────────────────────┐
                        │       HOSTING CPANEL      │
                        │    (DNS Zone Editor & WP) │
                        └──────┬─────────────┬──────┘
                               │             │
          A Record (IP Oracle) │             │ A Record / Local (IP cPanel)
                               ▼             ▼
  ┌──────────────────────────────┐        ┌──────────────────────────────┐
  │   ORACLE CLOUD FREE TIER     │        │    BACKEND CPANEL (HOSTING)  │
  │  syzygy.metamedia.cl         │        │  cms-syzygy.metamedia.cl      │
  ├──────────────────────────────┤        ├──────────────────────────────┤
  │ • Nginx (Servidor estático)  │        │ • WordPress clásico          │
  │ • Astro SSG (HTML/CSS puro)  │        │ • Base de datos MySQL cPanel │
  │ • Islas React (hidratación)  │        │ • WPGraphQL / REST API       │
  │ • RAM: ~15MB | CPU: ~0%      │        │ • RankMath / Yoast SEO       │
  │ • SSL: Let's Encrypt         │        │ • Webhook de despliegue      │
  └──────────────▲───────────────┘        └──────────────┬───────────────┘
                 │                                       │
                 │   3. Despliegue rsync/SSH             │ 1. Dispara Webhook al
                 │      (carpeta dist/)                  │    publicar/editar
                 │                                       ▼
        ┌────────┴──────────────────────────────────────────────┐
        │            GITHUB ACTIONS (Pipeline CI/CD)             │
        │ • Repositorio privado en GitHub                       │
        │ • Ejecuta `npm run build` (consume GraphQL de cPanel) │
        │ • Sube los estáticos al Nginx de Oracle vía SSH       │
        └───────────────────────────────────────────────────────┘
```

---

## 2. Enrutamiento DNS (NIC.cl y cPanel Zone Editor)

1. **Dominio principal (`metamedia.cl`):**
   * Configurado en **NIC.cl** apuntando a los servidores DNS primarios y secundarios del hosting cPanel contratado.
2. **Configuración en cPanel Zone Editor:**
   * **Subdominio Frontend:**
     * Nombre: `syzygy.metamedia.cl`
     * Tipo: `A` Record
     * Destino: `[IP_PUBLICA_ORACLE_VPS]`
   * **Subdominio Backend (CMS):**
     * Nombre: `cms-syzygy.metamedia.cl` (o `cms.syzygy.metamedia.cl`)
     * Tipo: `A` Record o Subdominio estándar en cPanel
     * Destino: IP local del servidor de hosting cPanel.

---

## 3. Capa de Frontend (Oracle Cloud Always Free)

* **Tecnología:** **Astro 5** en modo Static Site Generation (SSG) con Tailwind CSS v4 y componentes React en islas (`client:load`, `client:visible`).
* **Servidor Web:** **Nginx** configurado para servir el directorio compilado `/var/www/syzygy/dist`.
* **Consumo de Recursos en VPS:**
  * RAM: ~15MB a 25MB (únicamente el proceso de Nginx y caché en memoria del kernel).
  * CPU: Prácticamente 0% en reposo.
  * Todo el resto de la capacidad de la máquina Oracle (Ampere ARM o AMD Micro) queda libre para otros proyectos.
* **Seguridad SSL:** Certbot / Let's Encrypt con renovación automática vía cron.

---

## 4. Capa de Backend (Hosting cPanel Compartido)

* **Tecnología:** **WordPress** administrado mediante cPanel.
* **Ventajas operativas:**
  * Cero mantenimiento de servidor Linux para la base de datos (cPanel gestiona MySQL, phpMyAdmin, copias de seguridad automáticas y PHP-FPM).
  * AutoSSL / Let's Encrypt provisto por el hosting cPanel.
* **Plugins Esenciales para Modo Headless:**
  * `WPGraphQL`: Expone el esquema de datos tipado y eficiente para Astro.
  * `WPGraphQL for Rank Math` (o Yoast): Expone metadatos de SEO, OpenGraph, Twitter Cards y canonicals.
  * `Advanced Custom Fields (ACF)`: Para modelar métricas, entregables y datos específicos de proyectos.
  * `WP Webhooks` (o Deployer): Notifica a GitHub Actions cada vez que se crea, actualiza o elimina contenido.

---

## 5. Pipeline CI/CD (GitHub Actions)

El archivo `.github/workflows/deploy.yml` orquesta la compilación y entrega:

1. **Triggers:**
   * `push` en la rama `main`.
   * Evento `repository_dispatch` emitido vía HTTP POST por el webhook de WordPress.
2. **Pasos de Ejecución:**
   * `actions/checkout`: Clona el código fuente.
   * `actions/setup-node`: Prepara el entorno Node.js.
   * `npm ci`: Instala dependencias limpiamente.
   * `npm run build`: Astro consulta la API de WordPress en cPanel y genera el paquete estático en `dist/`.
   * `easingthemes/ssh-deploy` (o `rsync`): Sube los archivos directamente a `/var/www/syzygy/dist/` en el VPS de Oracle mediante claves SSH seguras almacenadas en GitHub Secrets.
3. **Tiempo de despliegue:** ~30 a 45 segundos con cero tiempo de inactividad (*zero-downtime*).

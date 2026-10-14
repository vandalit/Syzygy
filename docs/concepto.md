# Syzygy — Digital Agency

> **Alineando los tres cuerpos fundamentales de una marca: Experiencia, Identidad y Contenido.**

---

## 1. Filosofía y Concepto Core

En astronomía, una **sizigia** (*syzygy*) es la alineación recta de tres o más cuerpos celestes en un sistema gravitacional. 

Para **Syzygy**, este fenómeno define nuestra metodología de trabajo: una marca solo alcanza su máximo impacto cuando sus tres ejes fundamentales gravitan y avanzan en perfecta sincronía:

```
           ┌──────────────────────────────────────────────┐
           │                   SYZYGY                     │
           └──────────────────────┬───────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         ▼                        ▼                        ▼
 ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
 │  EXPERIENCIA  │        │   IDENTIDAD   │        │   CONTENIDO   │
 ├───────────────┤        ├───────────────┤        ├───────────────┤
 │ Web Digital   │        │ Branding      │        │ Multimedia    │
 │       ↓       │        │       ↓       │        │       ↓       │
 │ Evoluciona UX │        │ Storytelling  │        │   Marketing   │
 └───────────────┘        └───────────────┘        └───────────────┘
```

### Los Tres Ejes
1. **Experiencia (Web → UX):** La presencia digital técnica. No solo sitios estéticos, sino interfaces ultra rápidas, intuitivas y diseñadas para convertir y sorprender técnicamente.
2. **Identidad (Branding → Storytelling):** La voz, estética y narrativa de la marca. Construcción de activos gráficos y conceptuales que transmitan autoridad y empatía.
3. **Contenido (Multimedia → Marketing):** Los insumos visuales, audiovisuales y estratégicos que dan vida a la marca y atraen al público objetivo.

### Modelo de Negocio
* **Enfoque inicial:** Estudio multidisciplinar de diseño y desarrollo web de alto estándar.
* **Modalidad de trabajo:** Proyectos con alcances claros y plazos definidos (Sprint/Project-based). Evitamos esquemas de membresías o planes recurrentes en esta etapa para garantizar foco y excelencia en cada entrega.
* **Visión a mediano plazo:** Expansión estructurada hacia marketing digital, posicionamiento de marca y consultoría integral.

---

## 2. Arquitectura Tecnológica

La infraestructura está calibrada en un modelo **decoupled multi-host**, separando la capa de gestión (cPanel) de la capa de entrega de alto rendimiento (Oracle VPS), orquestado por **GitHub Actions**:

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
  │ • Islas interactivas         │        │ • WPGraphQL / REST API       │
  │ • RAM: ~15MB | CPU: ~0%      │        │ • RankMath / Yoast SEO       │
  │ • SSL: Let's Encrypt / Cert  │        │ • Webhook de despliegue      │
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

### Componentes del Stack y Distribución
* **Dominio & DNS (`metamedia.cl`):**
  * NIC.cl apunta a los servidores DNS del hosting cPanel.
  * Desde el **Zone Editor de cPanel**:
    * `syzygy.metamedia.cl` $\rightarrow$ Registro `A` apuntando a la IP pública del VPS de Oracle.
    * `cms-syzygy.metamedia.cl` (o `cms.syzygy.metamedia.cl`) $\rightarrow$ Subdominio apuntando al directorio de WordPress dentro de cPanel.
* **Backend Headless (Hosting cPanel):**
  * WordPress tradicional y económico sin complicaciones de mantenimiento de servidor.
  * cPanel gestiona PHP, MySQL, phpMyAdmin, respaldos y certificados SSL del CMS.
  * WPGraphQL expone los datos; un webhook notifica a GitHub Actions cada vez que se publica un cambio.
* **Frontend Estático (Oracle Cloud VPS):**
  * Nginx sirviendo exclusivamente archivos estáticos compilados (`dist/`).
  * Consumo ínfimo de recursos (~15MB RAM), dejando el VPS de Oracle libre para futuros proyectos.
* **Automatización CI/CD (GitHub Actions):**
  * *Push a `main`*: Construye y despliega automáticamente.
  * *Publicación en WordPress*: El webhook dispara un `repository_dispatch` en GitHub Actions, reconstruye el sitio con los nuevos datos y actualiza Oracle en menos de 40 segundos sin tocar el servidor.

---

## 3. Hoja de Ruta (Roadmap)

### Fase 1: Identidad, Layout y Frontend Estático (Astro) — *[Fase Actual]*
El objetivo es tener la web de la agencia 100% funcional, interactiva y navegable utilizando contratos de datos locales (mock data), sin depender aún del servidor ni de WordPress.

- [ ] **1.1. Inicialización del Proyecto Astro:**
  - Configuración base con TypeScript y Tailwind CSS.
  - Definición del sistema de diseño (paleta de colores, tipografías, dark/light mood, espaciados).
- [ ] **1.2. Layout Base y Componentes Globales:**
  - Header / Navegación dinámica con animaciones de entrada.
  - Footer estructurado con enlaces institucionales y branding.
  - Componente de SEO Head modular (OpenGraph, meta tags, schema JSON-LD).
- [ ] **1.3. Secciones Principales (Home):**
  - **Hero:** Concepto astronómico de Syzygy con micro-animaciones interactivas.
  - **Los 3 Ejes:** Presentación interactiva de *Experiencia*, *Identidad* y *Contenido*.
  - **Showcase de Proyectos (Isla interactiva):** Galería con filtros por categoría y transiciones fluidas.
  - **Proceso / Metodología:** Cómo opera la agencia por proyectos y plazos.
  - **CTA / Contacto:** Formulario de inicio de proyecto.
- [ ] **1.4. Páginas Internas & Mocks de Datos:**
  - Estructuración de `src/data/projects.json` y `src/data/services.json`.
  - Rutas dinámicas: `/proyectos/[slug].astro` para detalle de casos de estudio.
  - Páginas de detalle de servicios y filosofía de agencia (`/nosotros`).

---

### Fase 2: Configuración del Backend Headless (Hosting cPanel)
- [ ] Creación de subdominio en cPanel (ej. `cms-syzygy.metamedia.cl` o `cms.syzygy.metamedia.cl`).
- [ ] Instalación limpia de WordPress desde cPanel y activación de certificado SSL (AutoSSL / Let's Encrypt).
- [ ] Configuración de Custom Post Types (CPT) y ACF: *Proyectos/Portfolio*, *Servicios*.
- [ ] Instalación de **WPGraphQL** (o configuración de REST API con CORS habilitado).
- [ ] Integración de plugin SEO (**Rank Math** o **Yoast**) con soporte GraphQL para metadatos, títulos, descripciones y canonicals.
- [ ] Configuración de plugin de Webhooks (ej. *WP Webhooks* o *Deployer*) para emitir evento a GitHub Actions al publicar contenido.

---

### Fase 3: Infraestructura Oracle Cloud, DNS en cPanel & CI/CD
- [ ] **Configuración DNS (cPanel Zone Editor):**
  - Registro `A` para `syzygy.metamedia.cl` $\rightarrow$ IP pública del VPS Oracle.
- [ ] **Aprovisionamiento de Oracle Cloud (Always Free):**
  - Configuración de Nginx para servir el directorio `/var/www/syzygy/dist`.
  - Emisión de certificado SSL para `syzygy.metamedia.cl` mediante Certbot.
- [ ] **Pipeline en GitHub Actions (`.github/workflows/deploy.yml`):**
  - Trigger 1: `push` a la rama `main`.
  - Trigger 2: `repository_dispatch` (disparado por el webhook de WordPress).
  - Tarea: `npm run build` $\rightarrow$ sincronización vía SSH/rsync hacia el Nginx de Oracle.

---

### Fase 4: Optimización, Métricas y Lanzamiento
- [ ] Auditoría de rendimiento (100% en Lighthouse: Performance, Accessibility, Best Practices, SEO).
- [ ] Vinculación con Google Search Console y verificación de sitemap XML generado por Astro.
- [ ] Integración de Google Analytics 4 (GA4) / Tag Manager de forma asíncrona para no penalizar el rendimiento.

---

## 4. Estructura Proyectada del Código (Astro)

```
Syzygy/
├── readme.md               # Documentación y hoja de ruta principal
├── astro.config.mjs        # Configuración de Astro (integraciones: Tailwind, React, etc.)
├── package.json
├── tsconfig.json
├── public/                 # Favicons, fuentes, recursos estáticos
└── src/
    ├── assets/             # Imágenes y vectores optimizados
    ├── components/
    │   ├── common/         # Header, Footer, SEOHead, Button, Card
    │   ├── home/           # Hero, EjesSection, ProcessSection, CTABanner
    │   ├── islands/        # Componentes interactivos (ej. ProjectFilter.tsx, SpaceScene.tsx)
    │   └── projects/       # ProjectCard, ProjectGrid, ProjectDetails
    ├── data/               # Mocks locales para desarrollo previo a WordPress
    │   ├── projects.json
    │   └── services.json
    ├── layouts/
    │   └── BaseLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── proyectos/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── servicios.astro
    │   └── contacto.astro
    └── styles/
        └── global.css
```

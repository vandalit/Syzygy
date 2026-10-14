# Syzygy — Hoja de Ruta de Desarrollo (Roadmap)

Este documento registra el progreso, las tareas completadas y los próximos hitos del proyecto web de Syzygy.

---

## Estado Global del Proyecto

| Fase | Descripción | Estado |
| :--- | :--- | :--- |
| **Fase 1** | Identidad, Layout y Frontend Estático (Astro) | 🟡 **En Progreso (80%)** |
| **Fase 2** | Configuración del Backend Headless (Hosting cPanel) | ⚪ Pendiente |
| **Fase 3** | Infraestructura Oracle Cloud, DNS en cPanel & CI/CD | ⚪ Pendiente |
| **Fase 4** | Optimización, Métricas y Lanzamiento | ⚪ Pendiente |

---

## Fase 1: Identidad, Layout y Frontend Estático (Astro) — *[Fase Actual]*

El objetivo es tener la web de la agencia 100% funcional, interactiva y navegable utilizando contratos de datos locales (mock data), sin depender aún del servidor ni de WordPress.

- [x] **1.1. Inicialización del Entorno:**
  - [x] Configuración de Astro 5 (v5.18.2) compatible con Node.js v20.
  - [x] Integración de Tailwind CSS v4 con `@tailwindcss/vite`.
  - [x] Integración de React 19 para Component Islands (`@astrojs/react`).
  - [x] Configuración del sistema de diseño cósmico en `src/styles/global.css`.
- [x] **1.2. Layout Base y Componentes Globales:**
  - [x] `src/layouts/BaseLayout.astro` con SEO tags, OpenGraph y tipografías (Space Grotesk + Plus Jakarta Sans).
  - [x] Header responsive con branding Syzygy y enlaces de navegación.
  - [x] Footer institucional con créditos y especificación técnica.
- [x] **1.3. Secciones Principales de la Home:**
  - [x] **Hero:** Concepto astronómico de Syzygy, titulares y badges de valor.
  - [x] **Isla Interactiva (`SyzygyAlignment.tsx`):** Selector orbital reactivo de los 3 ejes.
  - [x] **Grilla de los 3 Ejes:** Experiencia, Identidad y Contenido con entregables.
  - [x] **Showcase de Casos de Estudio:** Presentación de proyectos con tags y métricas.
  - [x] **Sección de Metodología:** Explicación del modelo de negocio por sprints y plazos definidos.
  - [x] **Formulario de Brief / Contacto:** Captura de requerimientos preliminares.
- [ ] **1.4. Páginas Internas y Contratos de Datos Adicionales:**
  - [x] Mocks iniciales creados: `src/data/services.json` y `src/data/projects.json`.
  - [ ] Rutas dinámicas de casos de estudio: `src/pages/proyectos/[slug].astro`.
  - [ ] Filtro interactivo de portfolio por categoría/eje.
  - [ ] Página de Manifiesto / Filosofía detallada (`src/pages/manifiesto.astro`).

---

## Fase 2: Configuración del Backend Headless (Hosting cPanel)

- [ ] Creación de subdominio en cPanel (`cms-syzygy.metamedia.cl` o `cms.syzygy.metamedia.cl`).
- [ ] Instalación limpia de WordPress desde cPanel y activación de certificado SSL (AutoSSL / Let's Encrypt).
- [ ] Configuración de Custom Post Types (CPT) y ACF: *Proyectos/Portfolio*, *Servicios*.
- [ ] Instalación de **WPGraphQL** (o configuración de REST API con CORS habilitado).
- [ ] Integración de plugin SEO (**Rank Math** o **Yoast**) con soporte GraphQL para metadatos, títulos, descripciones y canonicals.
- [ ] Configuración de plugin de Webhooks (ej. *WP Webhooks* o *Deployer*) para emitir evento a GitHub Actions al publicar contenido.

---

## Fase 3: Infraestructura Oracle Cloud, DNS en cPanel & CI/CD

- [ ] **Configuración DNS (cPanel Zone Editor):**
  - [ ] Registro `A` para `syzygy.metamedia.cl` $\rightarrow$ IP pública del VPS Oracle.
- [ ] **Aprovisionamiento de Oracle Cloud (Always Free):**
  - [ ] Configuración de Nginx para servir el directorio `/var/www/syzygy/dist`.
  - [ ] Emisión de certificado SSL para `syzygy.metamedia.cl` mediante Certbot.
- [ ] **Pipeline en GitHub Actions (`.github/workflows/deploy.yml`):**
  - [ ] Configurar secretos en el repositorio GitHub (`ORACLE_HOST`, `ORACLE_USER`, `SSH_PRIVATE_KEY`).
  - [ ] Trigger 1: `push` a la rama `main`.
  - [ ] Trigger 2: `repository_dispatch` (disparado por el webhook de WordPress).
  - [ ] Tarea: `npm run build` $\rightarrow$ sincronización vía SSH/rsync hacia el Nginx de Oracle.

---

## Fase 4: Optimización, Métricas y Lanzamiento

- [ ] Auditoría de rendimiento (100% en Lighthouse: Performance, Accessibility, Best Practices, SEO).
- [ ] Vinculación con Google Search Console y verificación de sitemap XML generado por Astro.
- [ ] Integración de Google Analytics 4 (GA4) / Tag Manager de forma asíncrona para no penalizar el rendimiento.
- [ ] Pruebas finales de estrés y validación de respuesta en producción.

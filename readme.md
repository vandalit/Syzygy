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

Para maximizar el rendimiento, garantizar SEO de primer nivel y aprovechar al máximo la infraestructura gratuita de **Oracle Cloud Free Tier**, la plataforma se diseña bajo el paradigma **Headless Decoupled**:

```
 ┌────────────────────────────────────────────────────────┐
 │            ORACLE CLOUD FREE TIER (VPS)                │
 │                                                        │
 │  ┌─────────────────────────┐  ┌─────────────────────┐  │
 │  │      FRONTEND (SSG)     │  │  HEADLESS WORDPRESS │  │
 │  │                         │  │                     │  │
 │  │ • Astro                 │  │ • Motor CMS / Blog  │  │
 │  │ • Component Islands     │  │ • WPGraphQL / REST  │  │
 │  │ • Nginx (Servidor est.) │  │ • Yoast / RankMath  │  │
 │  │ • Consumo: ~20MB RAM    │  │ • Dominio CMS       │  │
 │  │ • 100/100 Core Vitals   │  │ • MySQL / MariaDB   │  │
 │  └────────────▲────────────┘  └──────────┬──────────┘  │
 │               │                          │             │
 │               └──────── GraphQL ─────────┘             │
 └────────────────────────────────────────────────────────┘
```

### Componentes del Stack
* **Frontend:** **Astro** (Generación de Sitios Estáticos - SSG).
  * *Zero JS by default*: Salida de HTML y CSS puro para páginas informativas y de contenido.
  * *Component Islands*: Micro-apps interactivas (React/Svelte/Vanilla JS) solo donde se requiere interacción visual avanzada (showcase, cotizadores, filtros dinámicos).
  * *Estilos:* Tailwind CSS / CSS Moderno con Design Tokens.
  * *Animaciones:* GSAP / Framer Motion / Lenis (scroll suave y transiciones de alto impacto).
* **Backend (Headless CMS):** **WordPress** en subdominio aislado (ej. `cms.syzygy.agency`).
  * Gestión centralizada de artículos, casos de estudio, taxonomías y metadatos de SEO.
  * Conexión con Google Search Console, Google Analytics y plugins especializados sin ensuciar el código del frontend.
* **Infraestructura:** **Oracle Cloud (Always Free Tier)**.
  * Frontend servido por Nginx (consumo de CPU prácticamente nulo y uso ínfimo de RAM).
  * Entorno seguro con certificados SSL automatizados (Let's Encrypt).

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

### Fase 2: Configuración del Backend Headless (WordPress)
- [ ] Configuración de Custom Post Types (CPT) en WordPress: *Proyectos/Portfolio*, *Servicios*, *Testimonios*.
- [ ] Integración de **WPGraphQL** (o endpoints optimizados de la REST API).
- [ ] Integración de plugin SEO (**Rank Math** o **Yoast**) con su respectiva extensión de GraphQL para exponer metadatos, títulos, descripciones y canonicals.
- [ ] Configuración de Webhooks en WordPress para disparar builds automáticos cuando se publique o actualice contenido.

---

### Fase 3: Servidor Oracle Cloud & Despliegue
- [ ] Aprovisionamiento de instancia VM en Oracle Cloud Free Tier.
- [ ] Configuración del servidor web (Nginx) y políticas de firewall (iptables / OCI Security Lists).
- [ ] Despliegue de WordPress con Docker Compose o stack LEMP ligero.
- [ ] Configuración de subdominios (`syzygy.agency` para frontend, `cms.syzygy.agency` para WordPress).
- [ ] Emisión de certificados SSL con Certbot.
- [ ] Pipeline de despliegue continuo (CI/CD) para compilar Astro y mover la carpeta `dist/` a Nginx.

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

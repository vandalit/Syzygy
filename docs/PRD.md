# Syzygy — Product Requirements Document (PRD)

> **Documento Maestro de Especificación de Producto y Contexto de Ingeniería**  
> **Versión:** 1.0.0 | **Estado:** En Desarrollo Activo (Fase 1) | **Dominio Objetivo:** `syzygy.metamedia.cl`

---

## 1. Resumen Ejecutivo y Propósito

**Syzygy** es la presencia web insignia de una agencia y estudio multidisciplinar de diseño y desarrollo web de alto estándar. Su propuesta de valor se basa en alinear los tres ejes fundamentales de cualquier marca: **Experiencia (Web/UX)**, **Identidad (Branding/Storytelling)** y **Contenido (Multimedia/Marketing)**.

La plataforma debe fungir como:
1. **Vitrina de Autoridad Técnica:** Demostrar en su propia construcción un rendimiento inigualable (100/100 Core Web Vitals, 0% bloatware, transiciones fluidas e hidratación parcial mediante islas interactivas).
2. **Canal de Captación de Proyectos:** Convertir visitantes cualificados a través de una propuesta de trabajo por proyectos y sprints con plazos y presupuestos definidos.
3. **Plataforma Escalable Headless:** Facilitar la autogestión de contenidos, artículos y casos de estudio mediante un backend desacoplado en WordPress alojado en cPanel, sin comprometer el servidor principal.

---

## 2. Índice Modular de Documentación

Este PRD es el punto de enlace central con los documentos especializados del proyecto:

| Documento | Ubicación | Descripción |
| :--- | :--- | :--- |
| **Concepto & Filosofía** | [`docs/concepto.md`](file:///home/vandalit/work/vandalit/Syzygy/docs/concepto.md) | Tesis astronómica de la sizigia, los 3 ejes en profundidad y manifiesto de diseño. |
| **Arquitectura Técnica** | [`docs/arquitectura.md`](file:///home/vandalit/work/vandalit/Syzygy/docs/arquitectura.md) | Topología multi-host, cPanel DNS, Oracle VPS, flujo GraphQL y pipeline CI/CD. |
| **Hoja de Ruta (Roadmap)** | [`docs/roadmap.md`](file:///home/vandalit/work/vandalit/Syzygy/docs/roadmap.md) | Seguimiento pormenorizado de las 4 fases de desarrollo y tareas pendientes. |

---

## 3. Requerimientos del Sistema

### 3.1. Requerimientos Funcionales (RF)
* **RF-01 (Navegación Fluida):** Header persistente con enlaces anclados y acceso directo a secciones clave (`#ejes`, `#proyectos`, `#metodologia`, `#manifiesto`, `#contacto`).
* **RF-02 (Showcase Interactivo de Ejes):** Componente isla en React (`SyzygyAlignment.tsx`) que permita inspeccionar cada eje por separado o visualizar la alineación completa (Sizigia).
* **RF-03 (Catálogo de Casos de Estudio):** Visualización de proyectos con etiquetas de los ejes involucrados, métricas clave (ej. "+42% Conversión", "100/100 Lighthouse") y descripción del desafío.
* **RF-04 (Páginas Dinámicas de Detalle):** Generación de rutas estáticas (`/proyectos/[slug]`) a partir de contratos de datos para exponer el proceso de trabajo de cada caso.
* **RF-05 (Captura de Brief / Contacto):** Formulario estructurado para seleccionar los ejes requeridos, describir el proyecto y remitir el contacto.
* **RF-06 (Consumo Headless - Fase 2):** Capacidad de hidratar datos estáticos en tiempo de build consumiendo la API GraphQL de WordPress en cPanel.

### 3.2. Requerimientos No Funcionales (RNF)
* **RNF-01 (Rendimiento Lighthouse):** 100/100 en Performance, Best Practices, Accessibility y SEO.
* **RNF-02 (Cero JavaScript Innecesario):** Salida estática (SSG) por defecto; JavaScript empaquetado únicamente para las islas interactivas (`client:load` / `client:visible`).
* **RNF-03 (Consumo Mínimo de Recursos en VPS):** Servido por Nginx en Oracle Cloud Always Free con consumo de memoria inferior a 25MB de RAM.
* **RNF-04 (Diseño Visual de Alto Impacto):** Estética cósmica (*deep space* `#07090e`), bordes sutiles, *glassmorphism*, tipografía moderna (Space Grotesk + Plus Jakarta Sans) y gradientes de sizigia (Cian, Púrpura, Magenta).
* **RNF-05 (SEO y Metadatos):** Schema.org JSON-LD para agencias digitales, OpenGraph completo, Twitter Cards y etiquetas canónicas automáticas.

---

## 4. Stack Tecnológico Aprobado

```
┌────────────────────────────────────────────────────────┐
│                        STACK FRONTEND                  │
│                                                        │
│ • Framework:      Astro 5 (SSG)                        │
│ • Interactividad: React 19 (Component Islands)         │
│ • Estilos:        Tailwind CSS v4 (@tailwindcss/vite)  │
│ • Tipografías:    Space Grotesk & Plus Jakarta Sans    │
│ • Runtime:        Node.js v20 LTS                      │
└────────────────────────────────────────────────────────┘
```

---

## 5. Estructura de Datos (Mocks Fase 1 $\rightarrow$ WordPress ACF Fase 2)

### Contrato de Proyectos (`src/data/projects.json`)
```typescript
interface Project {
  id: number | string;
  slug: string;
  title: string;
  client: string;
  year: string;
  axes: ("Experiencia" | "Identidad" | "Contenido")[];
  category: string;
  excerpt: string;
  featured: boolean;
  stats: { label: string; value: string }[];
  tags: string[];
}
```

### Contrato de Servicios / Ejes (`src/data/services.json`)
```typescript
interface ServiceAxis {
  id: string;
  axis: string;
  subheading: string;
  color: string;
  accentClass: string;
  borderClass: string;
  bgGlow: string;
  description: string;
  deliverables: string[];
}
```

---

## 6. Convención de Archivos y Roles

```
Syzygy/
├── README.md               # Puerta de entrada para desarrolladores y guía rápida
├── docs/                   # Documentación modular del proyecto
│   ├── PRD.md              # [Este archivo] Especificación de producto y contexto general
│   ├── concepto.md         # Filosofía, los 3 ejes y modelo de negocio
│   ├── arquitectura.md     # Topología multi-host, DNS cPanel, Oracle y CI/CD
│   └── roadmap.md          # Control de tareas, fases y estado vivo del avance
├── src/
│   ├── components/islands/ # Componentes interactivos React
│   ├── data/               # Mocks locales sincronizados con schemas de WordPress
│   ├── layouts/            # Plantillas maestras Astro
│   ├── pages/              # Rutas y páginas de la web
│   └── styles/             # Variables de diseño y Tailwind CSS v4
```

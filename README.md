# Syzygy — Agencia Digital

> **Alineando los tres cuerpos fundamentales de una marca: Experiencia, Identidad y Contenido.**  
> *Desarrollado con Astro 5, React 19, Tailwind CSS v4 y arquitectura Headless Decoupled.*

---

## 📚 Documentación del Proyecto

La documentación de Syzygy está organizada de forma modular dentro de la carpeta [`docs/`](file:///home/vandalit/work/vandalit/Syzygy/docs). El documento central de requerimientos y contexto es el **PRD**:

* 📄 **[PRD — Documento de Requerimientos de Producto](file:///home/vandalit/work/vandalit/Syzygy/docs/PRD.md):** Especificación funcional, no funcional, contratos de datos y contexto integral para el desarrollo.
* 🌌 **[Filosofía y Concepto Core](file:///home/vandalit/work/vandalit/Syzygy/docs/concepto.md):** La metáfora astronómica de la sizigia, los 3 ejes y el modelo de negocio por sprints.
* 🏗️ **[Arquitectura y Topología Multi-Host](file:///home/vandalit/work/vandalit/Syzygy/docs/arquitectura.md):** Diagrama técnico de cPanel DNS, WordPress Headless, Oracle Cloud VPS y CI/CD con GitHub Actions.
* 🗺️ **[Hoja de Ruta (Roadmap)](file:///home/vandalit/work/vandalit/Syzygy/docs/roadmap.md):** Estado vivo de avance y tareas por fases.

---

## ⚡ Inicio Rápido (Desarrollo Local)

### Requisitos Previos
* **Node.js:** v20.x o superior
* **Gestor de paquetes:** npm

### Comandos de Terminal

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev

# 3. Compilar bundle estático para producción (SSG)
npm run build

# 4. Previsualizar la compilación de producción localmente
npm run preview
```

El servidor local se iniciará de forma predeterminada en **`http://localhost:4321/`**.

---

## 🛠️ Stack Tecnológico

| Capa | Herramienta | Propósito |
| :--- | :--- | :--- |
| **Framework Base** | **Astro 5** (SSG) | Generación estática, Zero-JS por defecto y rendimiento 100/100. |
| **Islas Interactivas** | **React 19** (`@astrojs/react`) | Hidratación parcial selectiva para componentes dinámicos. |
| **Estilos** | **Tailwind CSS v4** (`@tailwindcss/vite`) | Utilidades atómicas y tokens de diseño cósmico. |
| **Tipografía** | Google Fonts | *Space Grotesk* (titulares) y *Plus Jakarta Sans* (lectura). |
| **Backend CMS** | WordPress Headless (cPanel) | Gestión de artículos, casos de estudio y SEO vía GraphQL. |
| **Hosting Frontend** | Oracle Cloud Always Free | Nginx ultraliviano (~15MB RAM) para entrega estática. |

---

## 📂 Estructura de Directorios

```
Syzygy/
├── README.md               # Portada del proyecto y comandos rápidos
├── docs/                   # Documentación técnica y especificaciones
│   ├── PRD.md              # Documento Maestro de Producto
│   ├── concepto.md         # Filosofía y los 3 Ejes
│   ├── arquitectura.md     # Topología cPanel + Oracle + CI/CD
│   └── roadmap.md          # Seguimiento de fases y tareas
├── src/
│   ├── components/
│   │   └── islands/        # Componentes interactivos en React
│   ├── data/               # Mocks locales sincronizados con schemas WP
│   ├── layouts/            # Plantilla BaseLayout con SEO
│   ├── pages/              # Rutas de Astro (index.astro, etc.)
│   └── styles/             # Variables de diseño y global.css
├── astro.config.mjs        # Configuración de Astro, React y Tailwind v4
└── package.json
```

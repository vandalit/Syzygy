# Syzygy — Checklist de Revisión y Autorización de Decisiones

> **Documento de Control:** Cada ítem requiere revisión explícita por parte del responsable antes de ejecutarse.  
> **Convención:** ⚪ Pendiente de revisión | ✅ Aprobado | ❌ Rechazado / Revisar alternativa

---

## 🎨 BLOQUE A — Diseño y Sistema Visual

> *A cargo del diseñador (Figma). Ningún elemento de este bloque debe quedar fijo en código hasta que sea aprobado.*

| # | Decisión | Estado | Notas |
| :--- | :--- | :--- | :--- |
| A-01 | **Paleta de colores de la marca Syzygy:** Propuesta actual: espacio profundo (`#07090e`) con acentos Cian (`#00f0ff`), Púrpura (`#a855f7`), Rosa (`#f43f5e`). | ⚪ | Pendiente validación en Figma. |
| A-02 | **Tipografías:** Propuesta actual: *Space Grotesk* para titulares y *Plus Jakarta Sans* para cuerpo de texto. | ⚪ | Revisar si aplica a la marca. |
| A-03 | **Estética general (Glassmorphism / Cosmic dark):** Fondo oscuro con glow effect, paneles de vidrio y degradados. | ⚪ | El diseñador tiene decisión final. |
| A-04 | **Logo e isotipo de Syzygy:** El componente actual en header usa "SY" como placeholder. | ⚪ | Reemplazar con el logo/vector definitivo. |
| A-05 | **Hero Section:** Título, subtítulo y badjes de valor actuales son propuesta de contenido. | ⚪ | Revisar copy e imágenes/animaciones del hero. |
| A-06 | **Micro-animaciones y transiciones:** Hover states, transiciones de sección, islas interactivas. | ⚪ | Definir nivel de animación (sutil vs. expresivo). |
| A-07 | **Diseño de tarjetas (Cards) de proyectos:** Estructura actual con stats, tags y ejes. | ⚪ | Revisar componentes en Figma. |
| A-08 | **Favicon e ícono de app:** Actualmente usa el `favicon.svg` genérico de Astro. | ⚪ | Reemplazar con isotipo de marca. |

---

## 🧭 BLOQUE B — Información Arquitectónica del Sitio (IA / Navegación)

> *Requiere definir Figma y la taxonomía de contenidos antes de crear rutas en Astro.*

| # | Decisión | Estado | Notas |
| :--- | :--- | :--- | :--- |
| B-01 | **Estructura de navegación principal (Header nav):** Propuesta actual: `Los 3 Ejes`, `Proyectos`, `Metodología`, `Manifiesto`, `Contacto`. | ⚪ | ¿Es todo scroll en Home o rutas independientes? |
| B-02 | **Cantidad de páginas:** ¿Sitio de una sola página (SPA-like) con anclas o multi-página real? | ⚪ | Determina la estructura de `src/pages/`. |
| B-03 | **Ruta de proyectos/casos de estudio:** ¿Grilla en Home o sección `/proyectos` independiente? | ⚪ | Afecta el routing de Astro. |
| B-04 | **Ruta de servicios/ejes:** ¿Sección en Home o páginas `/experiencia`, `/identidad`, `/contenido`? | ⚪ | Define la arquitectura de URLs. |
| B-05 | **Página `/nosotros` o `/manifiesto`:** ¿Existe como página separada o solo como sección de Home? | ⚪ | Pendiente de definición en Figma. |
| B-06 | **Página `/contacto`:** ¿Formulario en Home (actual) o página dedicada? | ⚪ | Impacta el CTA del header. |
| B-07 | **Blog/Artículos conectados a WordPress:** ¿Incluir sección de artículos en Fase 1 como mock o solo en Fase 2? | ⚪ | Coordinar con el roadmap. |
| B-08 | **Subdominios/idiomas:** ¿Solo español chileno o preparar para internacionalización? | ⚪ | Definir desde el inicio. |

---

## ⚙️ BLOQUE C — Desarrollo (Código y Componentes)

> *Algunas de estas decisiones se pueden avanzar independientemente del diseño final.*

| # | Decisión | Estado | Notas |
| :--- | :--- | :--- | :--- |
| C-01 | **Componente Isla `SyzygyAlignment.tsx`:** Funcionalidad aprobada, pendiente ajuste de estilos post-Figma. | ⚪ | Funciona. Bloquear restyling hasta A-01~A-07. |
| C-02 | **Contratos de datos mock (`projects.json`, `services.json`):** Estructuras de datos definidas y alineadas al schema de WordPress CPT. | ⚪ | Revisar campos si la IA de contenidos cambia. |
| C-03 | **`BaseLayout.astro`:** SEO Head implementado (OpenGraph, canonical, meta description). | ⚪ | Validar cuando tengamos textos definitivos de marca. |
| C-04 | **GitHub Pages como Preview de Build:** Evaluar configuración de `base` en `astro.config.mjs`. Ver **Sección D** de este documento. | ⚪ | Ver análisis completo más abajo. |
| C-05 | **Rutas dinámicas `/proyectos/[slug]`:** Pendiente hasta aprobación de B-03. | ⚪ | Bloqueado por diseño e IA. |
| C-06 | **Filtro interactivo de portfolio (isla React):** Pendiente hasta definir taxonomía de proyectos (B-03, B-04). | ⚪ | Bloqueado por diseño e IA. |
| C-07 | **Formulario de contacto funcional:** Actualmente usa `alert()`. ¿Backend con Resend / Formspree / ContactForm7? | ⚪ | Decidir en qué fase se conecta backend de email. |
| C-08 | **Librería de animaciones:** ¿GSAP, Framer Motion o solo CSS Transitions? | ⚪ | Depende del nivel de animación aprobado en A-06. |

---

## 🏗️ BLOQUE D — Infraestructura y Despliegue

| # | Decisión | Estado | Notas |
| :--- | :--- | :--- | :--- |
| D-01 | **GitHub Pages como Preview de Build:** (Ver análisis detallado en Sección D) | ⚪ | Análisis adjunto en este documento. |
| D-02 | **Aprovisionamiento del VPS Oracle Cloud:** ¿Cuándo iniciamos la configuración del servidor? | ⚪ | Se puede avanzar en paralelo con diseño. |
| D-03 | **Contratación del hosting cPanel para WordPress:** ¿Cuándo y con qué proveedor? | ⚪ | Requisito para la Fase 2. |
| D-04 | **Nombre del subdominio para WordPress en cPanel:** `cms-syzygy.metamedia.cl` (propuesta) o alternativa. | ⚪ | Depende de D-03. |
| D-05 | **Pipeline CI/CD con GitHub Actions:** Estructura propuesta en `docs/arquitectura.md`. | ⚪ | Requiere D-02 completado. |
| D-06 | **Repositorio en GitHub:** ¿Privado o público? Afecta el plan de GitHub Actions gratuito. | ⚪ | GitHub Pages gratuito requiere repo público o plan de pago. |

---

## 🔍 Sección D — Análisis: GitHub Pages como Preview de Build

### ¿Es viable?

**Sí, es la solución ideal para el preview estático.** Astro genera archivos estáticos puros (`dist/`) que son 100% compatibles con GitHub Pages.

### Consideraciones Técnicas

**1. Configuración en `astro.config.mjs` (si el repo es `https://usuario.github.io/Syzygy/`):**
```javascript
export default defineConfig({
  site: 'https://[tu-usuario].github.io',
  base: '/Syzygy',   // Nombre del repositorio
  // ...
});
```
> ⚠️ Importante: la `base` en el config de preview **no es la misma** que la del deploy de producción en Oracle. Habría que gestionarlo por variable de entorno o rama separada.

**2. Estrategia Recomendada (sin complicar el config de producción):**
- Usar un workflow de GitHub Actions **separado** (ej. `.github/workflows/preview.yml`) que se dispare solo en la rama `preview` o `develop`.
- Este workflow usa `base: '/Syzygy'` y despliega a `gh-pages`.
- El workflow de producción en `main` usa el config limpio (sin `base`) y despliega a Oracle.

**3. Alternativa más simple (sin GitHub Actions por ahora):**
- Instalar la integración de Cloudflare Pages o Netlify (gratuita y sin conflictos de config).
- Conectar el repositorio en GitHub y cualquier push genera automáticamente un preview en URL pública.
- **Ventajas:** Zero configuración de servidor, HTTPS gratuito, preview URL permanente.
- **Recomendación:** Para revisión de diseño esta alternativa es más rápida de implementar.

### Veredicto
| Opción | Complejidad | Velocidad de Setup | Recomendación |
| :--- | :--- | :--- | :--- |
| GitHub Pages (manual) | Baja-Media | Media | ✅ Funciona bien |
| GitHub Pages + Actions | Media | Media | ✅ Ideal a largo plazo |
| Cloudflare Pages | Baja | **Alta** | ⭐ Recomendado para preview |
| Netlify | Baja | **Alta** | ⭐ También válido |

---

## 🟢 Qué SÍ Podemos Avanzar Sin Diseño

Las siguientes tareas son **independientes del diseño** y pueden ejecutarse en paralelo mientras el diseñador trabaja en Figma:

- [ ] **Contratos de datos completos** y mock data adicional.
- [ ] **Configurar GitHub Pages o Cloudflare Pages** para el preview (Decisión D-01).
- [ ] **Configurar el repositorio en GitHub** y política de ramas (`main` = producción, `develop` = preview).
- [ ] **Aprovisionamiento de Oracle Cloud VPS** (sin afectar el frontend).
- [ ] **Configurar Nginx en Oracle** y reservar el subdominio en cPanel Zone Editor.
- [ ] **Arquitectura del `astro.config.mjs`** para manejar variables de entorno (`PUBLIC_WP_API_URL`).
- [ ] **Contenido SEO base:** `sitemap.xml` generado automáticamente por el plugin `@astrojs/sitemap`.
- [ ] **`robots.txt`** y configuración de metadatos SEO base.

## 🔴 Qué DEBE Esperar al Diseño

- Todas las decisiones del **Bloque A**.
- Rutas dinámicas y nueva estructura de páginas (**Bloque B**).
- Restyling de componentes (C-01, C-05, C-06).
- Librería de animaciones (C-08).

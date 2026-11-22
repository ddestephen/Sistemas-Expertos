# Design system

Decisiones de diseño tomadas hasta ahora, con los nombres de variables y sus valores.
Los nombres siguen el formato de variables CSS (`--nombre`) y son los mismos que se
usarán en Figma (como variables) y en código.

**Estado:** fundamentos definidos. Pendientes al final del documento.

---

## Principios

1. **Confiable.** Consistente: el mismo elemento siempre se ve y se comporta igual.
2. **Claro antes que decorativo.** Jerarquía y orden; la estética sale de la prolijidad.
3. **Escritorio y celular desde el inicio.** Todo componente funciona en ambos.
4. **Profesional y sobrio.** Pocos colores, una tipografía, espacios generosos.

---

## Color

### Cómo se organiza

Dos niveles de variables:

- **Primitivas:** la paleta cruda (`--color-brand-600`). Los componentes **no** las usan directo.
- **Semánticas:** la intención (`--color-action-primary`). Es lo que usan los componentes.

Proporción en pantalla: ~90% neutros, ~5–8% marca, semánticos solo cuando hay algo que comunicar.

### Primitivas: marca (violeta)

Elegido sobre el azul petróleo (`#0E5E74`) porque queda claramente separado del azul
de los avisos "info". Contraste de `#5B3FA8` sobre blanco: ~7.7:1.

| Variable | Valor | Uso principal |
|---|---|---|
| `--color-brand-50` | `#F5F3FB` | Fondo de ítem activo, hover suave |
| `--color-brand-100` | `#ECE8F7` | Selección marcada, badges de marca |
| `--color-brand-200` | `#D9D1F0` | Borde de elementos seleccionados |
| `--color-brand-300` | `#BDB0E4` | Links en modo oscuro |
| `--color-brand-400` | `#9C88D4` | Íconos activos en modo oscuro |
| `--color-brand-500` | `#7A60C2` | Anillo de foco |
| `--color-brand-600` | `#5B3FA8` | **Color base**: botón principal, links |
| `--color-brand-700` | `#4A3389` | Hover del botón principal; texto sobre brand-50 |
| `--color-brand-800` | `#3B296C` | Botón presionado |
| `--color-brand-900` | `#2D2052` | Fondos de marca en modo oscuro |
| `--color-brand-950` | `#1C1435` | Fondos muy oscuros en modo oscuro |

### Primitivas: neutros (grises levemente teñidos de violeta)

El tinte debe sentirse, no verse.

| Variable | Valor | Uso principal |
|---|---|---|
| `--color-white` | `#FFFFFF` | Superficies (cards, tablas, modales) |
| `--color-neutral-50` | `#F8F8FB` | Fondo general de la app |
| `--color-neutral-100` | `#F1F1F5` | Hover de filas, encabezados de tabla |
| `--color-neutral-200` | `#E4E4EA` | Bordes de cards, divisores |
| `--color-neutral-300` | `#D1D1DA` | Bordes marcados, botón secundario |
| `--color-neutral-400` | `#A9A9B6` | Elementos deshabilitados |
| `--color-neutral-500` | `#7E7E8C` | Placeholders, íconos secundarios, borde de inputs |
| `--color-neutral-600` | `#5F5F6E` | Texto secundario |
| `--color-neutral-700` | `#464655` | Texto secundario con énfasis (poco uso) |
| `--color-neutral-800` | `#2F2F3B` | Superficies en modo oscuro |
| `--color-neutral-900` | `#1D1D27` | Texto principal |
| `--color-neutral-950` | `#121218` | Fondo general en modo oscuro |

### Semánticas: fondos, texto, bordes y acciones

| Variable | Valor | Uso |
|---|---|---|
| `--color-bg-canvas` | `var(--color-neutral-50)` | Fondo general, detrás de las cards |
| `--color-bg-surface` | `var(--color-white)` | Cards, tablas, paneles |
| `--color-bg-elevated` | `var(--color-white)` | Menús, popovers, modales, toasts (en oscuro se aclara) |
| `--color-bg-subtle` | `var(--color-neutral-100)` | Hover de filas, encabezados de tabla |
| `--color-bg-selected` | `var(--color-brand-50)` | Ítem activo del menú, fila seleccionada |
| `--color-bg-disabled` | `var(--color-neutral-100)` | Controles deshabilitados |
| `--color-text-primary` | `var(--color-neutral-900)` | Títulos, contenido, datos |
| `--color-text-secondary` | `var(--color-neutral-600)` | Labels, descripciones, metadatos |
| `--color-text-tertiary` | `var(--color-neutral-500)` | Placeholders y ayudas (no esencial) |
| `--color-text-disabled` | `var(--color-neutral-400)` | Texto deshabilitado |
| `--color-text-on-brand` | `var(--color-white)` | Texto sobre el botón principal |
| `--color-text-link` | `var(--color-brand-600)` | Links |
| `--color-text-selected` | `var(--color-brand-700)` | Texto de ítem activo sobre `bg-selected` |
| `--color-border-default` | `var(--color-neutral-200)` | Cards, divisores, tablas |
| `--color-border-strong` | `var(--color-neutral-300)` | Botón secundario, separaciones marcadas |
| `--color-border-input` | `var(--color-neutral-500)` | Inputs (≥ 3:1, visibles al sol en celular) |
| `--color-focus-ring` | `var(--color-brand-500)` | Anillo de foco (nunca eliminarlo) |
| `--color-action-primary` | `var(--color-brand-600)` | Botón principal |
| `--color-action-primary-hover` | `var(--color-brand-700)` | Hover (se oscurece, nunca se aclara) |
| `--color-action-primary-pressed` | `var(--color-brand-800)` | Presionado |
| `--color-overlay` | `rgba(18, 18, 24, 0.45)` | Fondo detrás de modales (neutral-950 al 45%) |

**Propuestas para estados de componentes** (pendientes de revisión, ver [Estados](#estados-de-componentes)):

| Variable | Valor | Uso |
|---|---|---|
| `--color-bg-pressed` | `var(--color-neutral-200)` | Botón secundario presionado |
| `--color-text-link-hover` | `var(--color-brand-700)` | Link en hover (+ subrayado) |
| `--color-border-input-hover` | `var(--color-neutral-600)` | Input y checkbox en hover |
| `--color-focus-halo` | `var(--color-brand-100)` | Halo de 3px del input con foco |

### Semánticas: avisos

Patrón: fondo muy claro, borde algo más intenso, texto oscuro del mismo tono, ícono en tono medio.

| Variable | Info | Éxito | Advertencia | Error |
|---|---|---|---|---|
| `--color-{tipo}-bg` | `#EFF6FF` | `#F0FDF4` | `#FFFBEB` | `#FEF2F2` |
| `--color-{tipo}-border` | `#BFDBFE` | `#BBF7D0` | `#FDE68A` | `#FECACA` |
| `--color-{tipo}-text` | `#1E40AF` | `#166534` | `#92400E` | `#991B1B` |
| `--color-{tipo}-icon` | `#2563EB` | `#16A34A` | `#D97706` | `#DC2626` |

`{tipo}` = `info`, `success`, `warning`, `error`. Ejemplo: `--color-warning-bg: #FFFBEB`.

**Toasts:** fondo `--color-neutral-900`, texto blanco, solo el ícono con el color del tipo.
En modo oscuro: fondo `--color-bg-elevated` con borde `--color-border-strong`.

### Reglas de color

1. Un solo botón principal (violeta) por pantalla o sección; el resto, secundarios.
2. El violeta significa "acción" o "estás acá". Nunca decora.
3. La marca nunca comunica estados ni riesgo.
4. Avisos y riesgo no se personalizan por empresa.
5. Contraste mínimo WCAG AA: 4.5:1 en texto, 3:1 en íconos y bordes de controles.

---

## Tipografía

**Inter** para toda la interfaz. Montserrat queda, como mucho, para logo y material comercial.

### Variables base

| Variable | Valor |
|---|---|
| `--font-family-sans` | `'Inter', system-ui, sans-serif` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-size-xs` | `12px` |
| `--font-size-sm` | `14px` |
| `--font-size-md` | `16px` |
| `--font-size-lg` | `20px` |
| `--font-size-xl` | `24px` |
| `--font-size-2xl` | `30px` |

No se usan bold (700) ni light (300).

### Estilos de texto

Se nombran por función, no por tamaño.

| Estilo | Tamaño / interlineado | Peso | Uso |
|---|---|---|---|
| Display | 30 / 36 | Semibold | KPIs grandes |
| Título 1 | 24 / 32 | Semibold | Título de página (20/28 en celular) |
| Título 2 | 20 / 28 | Semibold | Secciones |
| Título 3 | 16 / 24 | Semibold | Títulos de cards y modales |
| Cuerpo grande | 16 / 24 | Regular | Textos largos; texto largo en celular |
| **Cuerpo** | **14 / 20** | **Regular** | **Texto base de la app** |
| Label | 14 / 20 | Medium | Botones, labels de formulario |
| Caption | 12 / 16 | Regular | Fechas, metadatos, ayudas |

### Reglas tipográficas

- Inputs en celular: texto de **16px como mínimo** (si no, iPhone hace zoom).
- Números tabulares en tablas, KPIs y fechas (`font-variant-numeric: tabular-nums`).
- Largo de línea máximo de 60–80 caracteres en textos largos.
- Títulos grandes con espaciado entre letras levemente negativo (−1% / −2%).
- Interlineados siempre múltiplos de 4px.

---

## Espaciado

Unidad base **4px**. Solo estos valores; los saltos son intencionales.

| Variable | Valor | Uso típico |
|---|---|---|
| `--space-1` | `4px` | Ícono y su texto |
| `--space-2` | `8px` | Label e input; elementos muy relacionados |
| `--space-3` | `12px` | Padding interno de inputs y celdas |
| `--space-4` | `16px` | Entre campos; padding de botones |
| `--space-6` | `24px` | Padding de cards; entre grupos |
| `--space-8` | `32px` | Entre secciones |
| `--space-12` | `48px` | Entre bloques grandes |
| `--space-16` | `64px` | Márgenes amplios (login, pantallas vacías) |

**Principio de proximidad:** el espacio dentro de un grupo siempre es menor que el espacio entre grupos.

### Layout

| | Celular | Tablet | Escritorio |
|---|---|---|---|
| Columnas | 4 | 8 | 12 |
| Margen lateral | 16px | 24px | 32px |
| Separación entre columnas | 16px | 16px | 24px |

| Variable | Valor | Uso |
|---|---|---|
| `--layout-max-width` | `1280px` | Ancho máximo de pantallas generales |
| `--layout-max-width-narrow` | `720px` | Formularios y documentos |
| `--layout-sidebar-width` | `240px` | Menú lateral en escritorio |

### Tamaños de componentes

| Variable | Valor | Uso |
|---|---|---|
| `--control-height` | `36px` | Botones e inputs en escritorio |
| `--control-height-touch` | `44px` | Botones e inputs en celular (mínimo táctil) |
| `--table-row-height` | `44px` | Filas de tabla |

Una sola densidad en el primer entregable.

---

## Radios

Rango 4–8px: profesional y equilibrado.

| Variable | Valor | Uso |
|---|---|---|
| `--radius-sm` | `4px` | Badges, checkboxes, tags |
| `--radius-md` | `6px` | Botones, inputs, selects |
| `--radius-lg` | `8px` | Cards, paneles, tablas |
| `--radius-xl` | `12px` | Modales, popovers, menús desplegables |
| `--radius-full` | `9999px` | Avatares, pills, toggles |

- Más grande el elemento, más radio.
- Esquinas anidadas: el radio interior es menor que el exterior.
- Bottom sheets en celular: 16px solo en las esquinas superiores.

---

## Bordes

| Variable | Valor | Uso |
|---|---|---|
| `--border-width` | `1px` | Todos los bordes |
| `--focus-ring-width` | `2px` | Anillo de foco |
| `--focus-ring-offset` | `2px` | Separación del anillo respecto del elemento |

Los colores de borde son las semánticas `--color-border-*` y `--color-focus-ring`.

---

## Sombras (elevación)

La sombra significa "esto está por encima del resto", no decora. Tono `#1D1D27`
(neutral-900) con baja opacidad, nunca negro puro. **Bordes antes que sombras.**

| Variable | Valor | Uso |
|---|---|---|
| — (nivel 0) | sin sombra, solo borde | Cards, tablas, paneles |
| `--shadow-1` | `0 1px 2px rgba(29, 29, 39, 0.06)` | Card clickeable en hover, encabezado fijo |
| `--shadow-2` | `0 4px 12px rgba(29, 29, 39, 0.10)` | Menús, popovers, tooltips |
| `--shadow-3` | `0 2px 6px rgba(29, 29, 39, 0.08), 0 16px 32px rgba(29, 29, 39, 0.18)` | Modales, toasts (dos capas) |

---

## Modo oscuro

**Alcance:** valores definidos ahora; se lanza después del primer entregable.
**Quién lo elige:** cada usuario (no la empresa): claro, oscuro o "igual que mi dispositivo" (por defecto).

No cambia ninguna decisión: primitivas, tipografía, espaciado, radios y componentes son los mismos.
Solo cambia **a qué tono apunta cada variable semántica**. En Figma, cada variable lleva sus dos
valores como **modos** (Claro / Oscuro).

**Regla:** toda variable semántica nueva se define en los dos modos a la vez.

### Principios

- Ni fondo negro puro ni texto blanco puro.
- **La elevación se invierte:** lo más elevado es más claro (canvas 950 → card 900 → menú/modal 800).
  Las sombras casi no se ven sobre fondo oscuro, así que la superficie hace el trabajo.
- **El botón principal es igual en ambos modos**: el color exacto de cada empresa se ve igual.
- Los tonos de marca para texto (links, ítem activo) se aclaran para leerse sobre fondo oscuro.
- Dentro de superficies elevadas (menús, modales: neutral-800), el hover usa `--color-bg-pressed`
  (neutral-700), porque `--color-bg-subtle` coincide con el fondo elevado.

### Fondos, texto y bordes

| Variable | Claro | Oscuro |
|---|---|---|
| `--color-bg-canvas` | neutral-50 | neutral-950 |
| `--color-bg-surface` | white | neutral-900 |
| `--color-bg-elevated` | white | neutral-800 |
| `--color-bg-subtle` | neutral-100 | neutral-800 |
| `--color-bg-pressed` | neutral-200 | neutral-700 |
| `--color-bg-disabled` | neutral-100 | neutral-800 |
| `--color-text-primary` | neutral-900 | neutral-50 |
| `--color-text-secondary` | neutral-600 | neutral-400 |
| `--color-text-tertiary` | neutral-500 | neutral-500 |
| `--color-text-disabled` | neutral-400 | neutral-600 |
| `--color-border-default` | neutral-200 | neutral-800 |
| `--color-border-strong` | neutral-300 | neutral-700 |
| `--color-border-input` | neutral-500 | neutral-500 |
| `--color-border-input-hover` | neutral-600 | neutral-400 |
| `--color-overlay` | neutral-950 al 45% | negro al 60% |

### Marca

| Variable | Claro | Oscuro |
|---|---|---|
| `--color-action-primary` / `-hover` / `-pressed` | brand 600 / 700 / 800 | **igual** |
| `--color-text-on-brand` | white | **igual** |
| `--color-text-link` | brand-600 | brand-300 |
| `--color-text-link-hover` | brand-700 | brand-200 |
| `--color-bg-selected` | brand-50 | brand-900 |
| `--color-text-selected` | brand-700 | brand-200 |
| `--color-focus-ring` | brand-500 | brand-400 |
| `--color-focus-halo` | brand-100 | brand-900 |

### Avisos

El patrón se invierte: fondo muy oscuro del mismo tono, texto claro.

| Variable | Info | Éxito | Advertencia | Error |
|---|---|---|---|---|
| `--color-{tipo}-bg` | `#172554` | `#052E16` | `#451A03` | `#450A0A` |
| `--color-{tipo}-border` | `#1E3A8A` | `#14532D` | `#78350F` | `#7F1D1D` |
| `--color-{tipo}-text` | `#BFDBFE` | `#BBF7D0` | `#FDE68A` | `#FECACA` |
| `--color-{tipo}-icon` | `#60A5FA` | `#4ADE80` | `#FBBF24` | `#F87171` |

### Sombras

Misma forma, con negro y más opacidad:

| Variable | Oscuro |
|---|---|
| `--shadow-1` | `0 1px 2px rgba(0, 0, 0, 0.30)` |
| `--shadow-2` | `0 4px 12px rgba(0, 0, 0, 0.40)` |
| `--shadow-3` | `0 2px 6px rgba(0, 0, 0, 0.30), 0 16px 32px rgba(0, 0, 0, 0.55)` |

### Riesgo

Al definir los colores de riesgo, hacerlo en los dos modos: las variantes sólidas probablemente
sirvan en ambos; las suaves (badges) necesitan versión oscura, como los avisos.

---

## Estados de componentes

Los marcados con **(P)** son propuestas pendientes de revisión.

**Foco (teclado), común a todos:** anillo de 2px `--color-focus-ring`, separado 2px
(`--focus-ring-width`, `--focus-ring-offset`). En inputs, en lugar del anillo: borde
`--color-focus-ring` + halo de 3px `--color-focus-halo` (P). En ítems de menú, contorno interno.

**Deshabilitado, común a todos:** fondo `--color-bg-disabled`, texto `--color-text-disabled`,
borde `--color-border-default` (si tiene), cursor no permitido.

| Componente | Por defecto | Hover | Presionado / activo | Otros |
|---|---|---|---|---|
| Botón primario | fondo `--color-action-primary`, texto `--color-text-on-brand` | `--color-action-primary-hover` | `--color-action-primary-pressed` | Cargando (P): mismo fondo, spinner + texto en gerundio, no clickeable |
| Botón secundario | fondo `--color-bg-surface`, borde `--color-border-strong`, texto `--color-text-primary` | fondo `--color-bg-subtle` | fondo `--color-bg-pressed` (P) | — |
| Link | `--color-text-link` | `--color-text-link-hover` + subrayado (P) | — | — |
| Input | borde `--color-border-input`, placeholder `--color-text-tertiary` | borde `--color-border-input-hover` (P) | — | Error: borde `--color-error-icon` + mensaje con ícono en `--color-error-text` |
| Checkbox | borde `--color-border-input`, caja 16px, `--radius-sm` | borde `--color-border-input-hover` | Marcado: fondo `--color-action-primary`, tilde `--color-text-on-brand` | Área tocable ≥ 44px en celular |
| Ítem de menú | texto `--color-text-secondary` | fondo `--color-bg-subtle`, texto `--color-text-primary` | Seleccionado: fondo `--color-bg-selected`, texto `--color-text-selected` | — |
| Fila de tabla | fondo `--color-bg-surface` | fondo `--color-bg-subtle` | Seleccionada: fondo `--color-bg-selected` | — |
| Card clickeable | borde `--color-border-default`, sin sombra | `--shadow-1` + borde `--color-border-strong` | — | — |

Badges, avisos y toasts no son interactivos: tienen variantes por tipo, no estados.

**Guía visual:** `documentacion-proyecto-final/design-system/index.html` muestra cada decisión con su ejemplo,
anotaciones superpuestas (activables) y todos los estados. Usa exactamente estas variables.
Sus estilos están en `design-system.css` y su comportamiento en `design-system.js`, en la misma carpeta.

---

## Personalización por empresa

**Alcance:** entregable posterior. La arquitectura (variables semánticas) ya lo soporta desde el
primer entregable. La guía HTML incluye una demostración interactiva.

### Qué personaliza cada empresa

| Personalizable | Nunca personalizable |
|---|---|
| **Un** color de marca (hex) | Neutros, fondos, texto |
| Logo (versión clara y oscura) | Avisos (info, éxito, advertencia, error) |
| | Colores de riesgo |
| | Tipografía, espaciado, radios, sombras |

Se pide un solo color: varios colores por empresa no garantizan legibilidad, obligan a
decidir roles distintos por empresa y compiten con avisos y riesgo.

### Cómo funciona

1. Las **variables semánticas no cambian**: `--color-action-primary` apunta a `--color-brand-600`,
   `--color-bg-selected` a `--color-brand-50`, etc. Única excepción: marcas claras con botón de
   texto oscuro (ver "Color exacto").
2. Lo único que se reemplaza por empresa es la **escala de marca** `--color-brand-50` … `--color-brand-950`.
3. El violeta del SaaS es el **tema por defecto**: lo ven las empresas que no personalizan, el login
   (antes de identificar la empresa), la web comercial y los emails.

### Cómo se genera la escala

Se trabaja en **OKLCH**: L (luminosidad percibida, 0–1), C (intensidad), H (tono en grados).
No se usa HSL porque su luminosidad no coincide con la percepción (un amarillo y un azul con la
misma L de HSL se ven muy distintos).

Para cada tono de la escala:

- **H: se toma del color de la empresa.** Es lo que lo hace "suyo".
- **L: la fija el sistema** con la tabla de abajo, medida sobre la escala violeta. Garantiza el mismo
  ritmo de claros y oscuros, y el mismo contraste, para todas las empresas.
- **C: la del color de la empresa × la curva de abajo.** Los extremos se desaturan.
- **Gamut:** si la combinación no se puede mostrar en pantalla, se baja C de a poco hasta que se pueda
  (L y H no se tocan).

| Tono | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L (fija) | 0.968 | 0.938 | 0.877 | 0.786 | 0.674 | 0.561 | 0.458 | 0.397 | 0.341 | 0.289 | 0.221 |
| Curva de C | 0.07 | 0.13 | 0.27 | 0.46 | 0.70 | 0.92 | 1.00 | 0.85 | 0.69 | 0.55 | 0.39 |

**Color exacto.** Se evalúa en este orden:

1. **Contraste ≥ 4.5:1 con texto blanco:** el color va tal cual como `brand-600`. Los tonos vecinos se
   corren lo necesario para que la escala siga ordenada (700–950 más oscuros, 50–500 más claros).
2. **Si no, contraste ≥ 4.5:1 con texto oscuro (neutral-900)** (marcas claras: amarillo, celeste,
   pastel) **(P):** el botón principal usa el color exacto **con texto oscuro**. Para eso, a esa
   empresa se le sobrescriben `--color-action-primary` (color exacto), `-hover` y `-pressed`
   (el mismo color con L −0.05 y −0.10) y `--color-text-on-brand` (neutral-900). Todo lo que va sobre
   `--color-action-primary` (texto e íconos del botón, tilde del checkbox) usa `--color-text-on-brand`. La escala `brand-*`
   se genera normal, así links, ítem activo y foco usan tonos que se leen.
3. **Si no pasa ninguno** (tonos medios): se usa el 600 generado con texto blanco y se avisa
   "Ajustamos tu color para que sea legible".

**No se usan opacidades** para los tonos de marca: el resultado dependería del fondo, el contraste
sería impredecible, se mezclarían al superponerse (fila seleccionada + hover) y complicaría el
modo oscuro. La opacidad queda solo para el overlay de modales y las sombras.

### Validación antes de guardar

| Par | Mínimo |
|---|---|
| Texto blanco sobre `brand-600` (botón) | 4.5:1 |
| Texto blanco sobre `brand-700` (botón en hover) | 4.5:1 |
| `brand-700` sobre `brand-50` (ítem de menú activo) | 4.5:1 |
| `brand-500` sobre blanco (anillo de foco) | 3:1 |
| `brand-600` sobre blanco (link) | 4.5:1 |
| **Oscuro:** `brand-300` sobre neutral-900 (link) | 4.5:1 |
| **Oscuro:** `brand-200` sobre `brand-900` (ítem de menú activo) | 4.5:1 |
| **Oscuro:** `brand-400` sobre neutral-900 (anillo de foco) | 3:1 |

En los pares del botón, "texto blanco" pasa a ser `--color-text-on-brand` cuando la empresa usa
botón con texto oscuro. Además, si el botón se distingue poco del fondo oscuro (marcas muy
oscuras, como azul marino o grafito), se avisa con la vista previa en modo oscuro.

### Casos especiales

| Si la empresa elige… | Comportamiento |
|---|---|
| Un color muy claro (amarillo, pastel) | Botón con el color exacto y texto oscuro (P); el resto de la escala se genera normal |
| Un tono medio que no pasa con ningún texto | Se ajusta el 600 y se avisa con vista previa |
| Rojo, naranja, amarillo, verde o rosa intenso | Se permite, pero se advierte que se parece a avisos y riesgo, con vista previa junto a los badges |
| Negro, gris o casi sin color | La escala sale gris (estilo "grafito"); se acepta |
| Un color que ya pasa el contraste | Se usa exacto en el botón principal |

### Almacenamiento y aplicación

- La escala se genera y valida **al guardar la configuración** y se guardan los 11 HEX por empresa
  (más los 3 colores del botón y el color de texto si usa botón con texto oscuro).
- Al cargar la app solo se leen y se aplican sobre `--color-brand-*` en `:root`. No se recalcula en cada carga.
- En la pantalla de configuración, el mismo cálculo corre en vivo para la vista previa.
- Las conversiones se resuelven con librerías conocidas (por ejemplo Culori o Color.js).

### Pantalla de configuración (a diseñar)

Selector de color o campo hex, carga de logo, **vista previa en vivo**, avisos de ajuste o de
parecido con los colores de riesgo, y un botón para volver al tema por defecto.

---

## Pendientes

- **Colores de riesgo** (bajo → crítico): pospuesto. Falta definir cuántos niveles usa la metodología (3, 4 o 5).
- **Organización en Figma** (paso 2): estructura del archivo y variables.
- **Breakpoints** exactos de celular / tablet / escritorio.
- **Modo oscuro:** valores definidos (ver sección); falta revisar todas las pantallas en oscuro antes de lanzarlo, después del primer entregable.
- **Componentes base:** botón, input, tabla, card, badge, modal…
- **Personalización por empresa:** estrategia definida (ver sección); falta diseñar la pantalla de configuración. Entregable posterior.

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
| `--color-action-danger` | `#DC2626` (= `--color-error-icon` claro) | Botón de peligro (solo en diálogos de confirmación) |
| `--color-action-danger-hover` | `#B91C1C` | Hover del botón de peligro |
| `--color-action-danger-pressed` | `#991B1B` (= `--color-error-text` claro) | Presionado del botón de peligro |
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

### Semánticas: datos (gráficos)

Para las barras de los gráficos (por ahora, los resultados de una encuesta). No salen de la marca ni de los avisos: el violeta significa "acción" y los avisos comunican estados. El azul viene de la paleta de referencia de visualización de datos y está validado contra `--color-bg-surface` en los dos modos (contraste ≥ 3:1, banda de luminosidad y croma).

| Variable | Claro | Oscuro | Uso |
|---|---|---|---|
| `--color-dato-serie` | `#2A78D6` | `#3987E5` | La barra (el dato) |
| `--color-dato-pista` | `#CDE2FB` | `#0D366B` | El fondo de la barra (pista): un paso del mismo azul que se aleja del dato |

- **Una sola serie, un solo tono y sin leyenda:** el título de la pregunta dice qué se mide.
- **Las cifras van impresas en color de texto** (`--color-text-secondary`), nunca en el color del dato.
- **En oscuro la pista es más oscura que la barra:** con un tono cercano, una opción con 0 % parecía una barra llena.
- **Si un gráfico necesita varias series,** se agregan colores de la misma paleta de visualización en orden fijo, se validan y se documentan aquí antes de usarlos.

### Semánticas: riesgo

Los cuatro niveles de RN-16, con nivel = probabilidad × severidad (RN-15). Es el semáforo de las matrices de riesgo de SST (IPER, GTC 45): quien las usa lo lee sin leyenda.

| Variable | Valor | Nivel | Texto encima (`--color-riesgo-{nivel}-texto`) |
|---|---|---|---|
| `--color-riesgo-bajo` | `#22C55E` | Bajo (1–4) | `#1D1D27`, 7.3:1 |
| `--color-riesgo-medio` | `#FACC15` | Medio (5–9) | `#1D1D27`, 10.9:1 |
| `--color-riesgo-alto` | `#F97316` | Alto (10–14) | `#1D1D27`, 6.0:1 |
| `--color-riesgo-critico` | `#DC2645` | Crítico (15–25) | `#FFFFFF`, 4.8:1 |

- **Los mismos valores en claro y en oscuro,** también los de texto. El texto encima es fijo: no usa `--color-text-primary`, que se invierte en oscuro.
- **No se parecen a los avisos:**
  - medio es amarillo, no el ámbar de advertencia;
  - alto es naranja, que los avisos no usan;
  - crítico tira a carmesí, distinto del rojo de error (`#DC2626`).
- **Validación (validate_palette.js):**
  - Con visión normal, los cuatro se distinguen: el par más cercano, crítico y alto, está en ΔE 16.
  - Contra la superficie oscura (`#1D1D27`) todos pasan 3:1.
  - Contra el blanco, verde, amarillo y naranja no llegan a 3:1, así que siempre llevan texto y separación.
  - En deuteranopia, verde y naranja quedan en ΔE 6.2: ningún semáforo pasa esa prueba.
- **Por eso el color de riesgo nunca va solo:** siempre se muestra con el nombre del nivel y el número.
- **Dónde se usa:** solo en la etiqueta de riesgo y en el mapa de calor (ver Estados de componentes). Nunca en botones, fondos de página ni texto.

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

## Íconos

Librería **Lucide**, con trazo de **1.5px** en todos los tamaños (el de Lucide por defecto, 2, se ve
pesado junto a Inter 400).

| Tamaño | Uso |
|---|---|
| 16px | Junto a texto de 14px: botones, inputs, badges, avisos, toasts |
| 20px | Menú lateral y botones de solo ícono |
| 32px | Pantallas vacías |

- **Color:** el del texto que acompaña (`currentColor`); en avisos y toasts, `--color-{tipo}-icon`.
- **Separación del texto:** `--space-1` en badges; `--space-2` en botones y menú.
- **Nunca comunica solo:** siempre va con texto. Un estado o un riesgo no se distingue solo por ícono ni por color.
- **Botón de solo ícono:** con etiqueta accesible y tooltip; su área sigue `--control-height` (36px) y `--control-height-touch` (44px en celular).

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

El botón de peligro (`--color-action-danger` / `-hover` / `-pressed`) es **igual** en ambos modos.

### Datos

| Variable | Claro | Oscuro |
|---|---|---|
| `--color-dato-serie` | `#2A78D6` | `#3987E5` |
| `--color-dato-pista` | `#CDE2FB` | `#0D366B` |

### Sombras

Misma forma, con negro y más opacidad:

| Variable | Oscuro |
|---|---|
| `--shadow-1` | `0 1px 2px rgba(0, 0, 0, 0.30)` |
| `--shadow-2` | `0 4px 12px rgba(0, 0, 0, 0.40)` |
| `--shadow-3` | `0 2px 6px rgba(0, 0, 0, 0.30), 0 16px 32px rgba(0, 0, 0, 0.55)` |

### Riesgo

Los mismos valores que en claro, incluido el color del texto encima (ver "Semánticas: riesgo"). No hay variantes suaves: la etiqueta de riesgo es neutra y solo su cuadrado lleva el color, así que no necesita versión oscura.

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
| Botón de peligro | fondo `--color-action-danger`, texto blanco (4.8:1) | `--color-action-danger-hover` | `--color-action-danger-pressed` | Solo en diálogos de confirmación; no se personaliza por empresa |
| Link | `--color-text-link` | `--color-text-link-hover` + subrayado (P) | — | — |
| Input | borde `--color-border-input`, placeholder `--color-text-tertiary` | borde `--color-border-input-hover` (P) | — | Error: borde `--color-error-icon` + mensaje con ícono en `--color-error-text` |
| Checkbox | borde `--color-border-input`, caja 16px, `--radius-sm` | borde `--color-border-input-hover` | Marcado: fondo `--color-action-primary`, tilde `--color-text-on-brand` | Área tocable ≥ 44px en celular |
| Radio | fondo `--color-bg-surface`, borde `--color-border-input`, círculo 16px, `--radius-full` | borde `--color-border-input-hover` | Seleccionado: fondo `--color-action-primary`, punto central 6px `--color-text-on-brand` | Texto Cuerpo a `--space-2`; el texto también selecciona. Área tocable ≥ 44px en celular |
| Área de texto | igual que el input; padding `--space-3` | igual que el input | — | Mínimo 3 líneas (~80px), crece hasta ~8 y luego desplaza; sin tirador. Contador opcional (ver abajo) |
| Ítem de menú | texto `--color-text-secondary` | fondo `--color-bg-subtle`, texto `--color-text-primary` | Seleccionado: fondo `--color-bg-selected`, texto `--color-text-selected` | — |
| Fila de tabla | fondo `--color-bg-surface` | fondo `--color-bg-subtle` | Seleccionada: fondo `--color-bg-selected` | En celular, las columnas secundarias se ocultan y su dato (por ejemplo, rol y estado) baja debajo del dato principal, para que la acción de la fila quede a la vista sin desplazar la tabla |
| Card clickeable | borde `--color-border-default`, sin sombra | `--shadow-1` + borde `--color-border-strong` | — | — |

Badges, avisos y toasts no son interactivos: tienen variantes por tipo, no estados.

### Controles de selección y área de texto

- **Radio y checkbox se ven de la misma familia:** el seleccionado es relleno de marca con la marca
  interior en `--color-text-on-brand`, así funciona también con la personalización por empresa.
- **Opciones siempre en columna,** una debajo de otra, con `--space-3` entre ellas, aunque sean
  dos cortas ("Sí / No").
- **Error de grupo:** las opciones no se ponen rojas. El mensaje va una sola vez debajo del grupo,
  igual que el error del input (ícono + `--color-error-text`). Vale para radios y checkboxes.
- **Contador del área de texto** (solo si hay límite): "120 / 500" abajo a la derecha, Caption en
  `--color-text-tertiary`; al pasarse, `--color-error-text`.
- **Celular:** el área de texto usa 16px, como el input, para evitar el zoom del iPhone.

### Select

**Cerrado:** igual que el input (`--control-height`, borde `--color-border-input`, `--radius-md`,
padding `--space-3`, mismos estados). Ícono `chevron-down` 16px a la derecha en
`--color-text-secondary`; sin valor, "Selecciona…" en `--color-text-tertiary`.

**Lista abierta:**

| Parte | Decisión |
|---|---|
| Contenedor | `--color-bg-elevated`, borde `--color-border-default`, `--radius-xl`, `--shadow-2`; a 4px del campo y con su mismo ancho |
| Opción | 36px de alto (44px en celular), padding `--space-3`, Cuerpo |
| Hover / teclado | Fondo `--color-bg-subtle` |
| Seleccionada | Texto `--color-text-selected` + check 16px a la derecha; sin fondo de marca |
| Alto máximo | ~8 opciones, luego desplaza |

- **Pocas opciones → radios:** con 5 o menos opciones que conviene ver juntas, se usan radios en vez de select.
- **Excepción: el control se repite por fila.** En un editor donde cada elemento lleva el mismo control (el tipo de respuesta de cada pregunta de una encuesta), se usa select aunque haya 5 opciones o menos: repetir los radios en cada fila alarga la pantalla y esconde lo que se edita.
- **Búsqueda:** desde ~10 opciones la lista lleva un campo de búsqueda arriba (peligros, responsables, rubros).
- **Celular:** la lista se abre como hoja inferior (radio de 16px solo arriba), no como desplegable flotante.

### Modal

| Parte | Decisión |
|---|---|
| Fondo de pantalla | `--color-overlay` |
| Caja | `--color-bg-elevated`, `--radius-xl`, `--shadow-3`, padding `--space-6` |
| Ancho | Chico 400px (confirmaciones), mediano 560px (formularios). Lo que no cabe va en pantalla propia |
| Encabezado | Título 3 a la izquierda; cerrar (ícono `x` 20px) a la derecha |
| Pie | Acciones a la derecha: secundaria y luego principal. En celular, apiladas a todo el ancho, principal arriba |
| Contenido largo | Encabezado y pie fijos; solo desplaza el medio |
| Teclado | Esc cierra; el foco queda dentro y al cerrar vuelve al botón que lo abrió |
| Clic fuera | Cierra solo si no hay cambios sin guardar |
| Celular | El modal de formulario ocupa toda la pantalla |

### Diálogo de confirmación

Para acciones que no se deshacen o quitan acceso (dar de baja o suspender un vínculo, cerrar una
encuesta, suspender una empresa).

- **Título:** pregunta con la acción y el objeto ("¿Dar de baja a Ana López?").
- **Texto:** la consecuencia en una línea ("Ya no podrá entrar a Norvia en esta empresa.").
- **Botones:** "Cancelar" + verbo concreto ("Dar de baja"), nunca "Aceptar". Si la acción es de
  peligro, el botón usa `--color-action-danger` y el foco empieza en "Cancelar".
- **No se cierra con clic fuera.** En celular sale como hoja inferior.

### Badges de estado

Cada color significa siempre lo mismo, sea cual sea la entidad. No hay badge de marca: la marca no
comunica estados; una etiqueta que no sea un estado usa el neutro.

| Color | Significa | Variables |
|---|---|---|
| Neutro | Sin empezar o fuera de uso | `--color-bg-subtle` / `--color-text-secondary` |
| Info | En curso | `--color-info-*` |
| Éxito | Vigente, activo o completado | `--color-success-*` |
| Advertencia | Necesita atención | `--color-warning-*` |
| Error | Algo salió mal o se pasó la fecha | `--color-error-*` |

| Entidad | Neutro | Info | Éxito | Advertencia | Error |
|---|---|---|---|---|---|
| Empresa | Inactiva | — | Activa | Suspendida | — |
| Vínculo | De baja | — | Activo | Suspendido | — |
| Encuesta | Borrador · Cerrada | Publicada | — | — | — |
| Peligro sugerido | Por revisar · Descartado | — | En la matriz | — | — |
| Tarea del plan | Pendiente · Cancelada | En progreso | Completada | — | Vencida |
| Accidente | Cerrado · Descartado | En investigación | — | Abierto | — |
| Política | Borrador · Reemplazada | — | Vigente | — | — |

- **Accidente cerrado es neutro,** no éxito: que termine el caso no es una buena noticia.
- **"Vencida" no es un estado guardado:** es una tarea pendiente o en progreso con la fecha límite
  pasada. Se muestran dos badges ("En progreso" + "Vencida") para no perder el estado.

### Campo de fecha

Usos: fecha y hora del accidente; fecha límite de una tarea (sin hora).

| Parte | Decisión |
|---|---|
| Caja | Igual que el input, con ícono `calendar` 16px a la derecha |
| Formato | dd/mm/aaaa; sin valor, "dd/mm/aaaa" en `--color-text-tertiary` |
| Entrada | Se escribe (las barras se agregan solas) o se elige en el calendario |
| Calendario | Como la lista del select: `--color-bg-elevated`, `--radius-xl`, `--shadow-2`. La semana empieza el domingo |
| Hoy | Borde `--color-border-strong` |
| Día elegido | Fondo `--color-action-primary`, texto `--color-text-on-brand` |
| Días no permitidos | Estilo deshabilitado; no se eligen |
| Celular | El calendario se abre como hoja inferior |

- **Restricciones:** el accidente no admite fechas futuras. La fecha límite no admite fechas pasadas
  al crear la tarea; al editar se conserva la que tenía, aunque esté vencida.
- **Hora del accidente:** campo aparte, junto a la fecha, en 12 horas con a. m. / p. m.; se escribe,
  sin selector de reloj.

### Estados de pantalla

**Vacía:** dos casos distintos, centrados y con `--space-16` arriba y abajo.

| | Vacía al inicio (sin datos) | Sin resultados (búsqueda o filtro) |
|---|---|---|
| Ícono | 32px en `--color-text-tertiary`, del módulo | `search` 32px |
| Título | Título 3 ("Todavía no hay riesgos identificados") | "No hay resultados para «ruido»" |
| Texto | Cuerpo secundario: qué es y para qué sirve | "Prueba con otra palabra o quita los filtros." |
| Acción | Botón principal ("Identificar riesgo") solo si el rol puede | Link "Quitar filtros"; sin botón principal |

Si el rol no puede crear, solo el mensaje ("No tienes encuestas pendientes").

**Cargando:** skeleton (bloques `--color-bg-subtle`, `--radius-sm`, con la forma del contenido).
Aparece solo si la carga pasa de ~300ms; pulso suave que se apaga con reducción de movimiento.
El spinner queda solo dentro de botones.

**Error al cargar:** en el lugar del contenido, no en un toast. Ícono de error, título ("No se pudo
cargar la lista de riesgos"), texto ("Revisa tu conexión e inténtalo de nuevo.") y botón
secundario "Reintentar".

**Sin acceso o no existe:** el mismo mensaje en ambos casos ("No encontramos lo que buscas" + link
al inicio), para no confirmar que un recurso existe en otra empresa.

### Pregunta de encuesta

Bloque que se repite por pregunta; dentro va el control según el tipo
(`respuesta_breve` → área de texto, `seleccion_unica` → radios, `seleccion_multiple` → checkboxes).

| Parte | Decisión |
|---|---|
| Enunciado | Numerado ("1.", "2."…), Título 3 (16/24), `--color-text-primary` |
| Obligatoria | Asterisco `*` en `--color-error-text` tras el enunciado; al inicio de la encuesta, "Las preguntas con * son obligatorias" |
| Ayuda (opcional) | Cuerpo en `--color-text-secondary`, debajo del enunciado |
| Enunciado → opciones | `--space-3` |
| Entre preguntas | `--space-8` |
| Contenedor | Una sola card para toda la encuesta; sin cards por pregunta |
| Error | Mensaje de grupo debajo de las opciones ("Esta pregunta es obligatoria.") |

### Resultados de encuesta

Los resultados anónimos de una encuesta: indicadores arriba y, debajo, una sola card con el resultado de cada pregunta.

| Parte | Decisión |
|---|---|
| Indicadores | Tres: participantes, respuestas de la versión vigente y periodo analizado (primera y última respuesta). Valor en Display (30/36), etiqueta y aclaración en Caption `--color-text-secondary` |
| Pregunta de selección | Lista de medidores, una fila por opción: nombre, barra y cifra "cantidad · %" |
| Barra | 8px de alto, extremos redondeados, `--color-dato-serie` sobre la pista `--color-dato-pista`. Todas las barras de una pregunta miden lo mismo (la columna de la cifra tiene ancho fijo) |
| Orden | El de la encuesta, no por cantidad: las opciones suelen tener un orden propio (por ejemplo, de menos a más horas) |
| Selección múltiple | Se aclara que se podía elegir más de una opción y que los porcentajes pueden sumar más de 100 % |
| Respuestas breves | En bloques `--color-bg-subtle` con `--radius-md`, sin autor y en **orden alfabético**, no en el orden en que se guardaron (ese orden podría identificar a quien respondió). Con más de 8 se muestran las primeras y "Ver las N respuestas" |
| Menos de 3 respuestas | Solo los indicadores y un aviso info que explica que el detalle se oculta para proteger el anonimato y cuántas respuestas van |
| Teclado | Cada fila es enfocable y se anuncia con su cifra ("Siempre: 6 respuestas, 50 %"); el hover y el foco la resaltan con `--color-bg-subtle` |
| Celular | La barra baja debajo del nombre y la cifra, a todo el ancho |
| Peligros sugeridos | Card propia entre los indicadores y el detalle. Por peligro: nombre, badge de estado, "Lo indican N de T respuestas · %" con la misma barra, y las preguntas que lo originaron con su cifra. Orden por respaldo. Con menos de 3 respuestas, una línea en `--color-text-secondary` (no un segundo aviso). Si falla su carga, el resto de los resultados se sigue viendo |

No se usan tortas ni donas: las barras sobre una misma base se comparan mejor.

### Etiqueta de riesgo

Muestra la clasificación de un riesgo en listas, tablas y detalle.

| Parte | Decisión |
|---|---|
| Forma | Chip neutro, como un badge: fondo `--color-bg-subtle`, borde `--color-border-default`, `--radius-sm`, Caption Medium |
| Color | Solo un cuadrado de 10px con `--color-riesgo-{nivel}` y `--radius-sm`, a la izquierda del texto |
| Texto | "Alto · 12": nivel y número, en `--color-text-primary` y con cifras tabulares. Nunca en el color del riesgo |
| Sin evaluar | "Sin evaluar", sin cuadrado y en `--color-text-secondary` |

- **No es un badge de color:** así "Bajo" no se confunde con "Activo" (éxito) ni "Crítico" con un error.
- **Los badges de estado siguen aparte:** un riesgo puede llevar los dos, por ejemplo "Alto · 12" y "Por revisar".

### Mapa de calor de riesgo

La matriz de probabilidad × severidad, de 5 × 5. Se usa en tres lugares:
- en la matriz (HU-038), para ver cuántos riesgos hay en cada celda;
- al evaluar (HU-037), para elegir la celda;
- en el PDF (HU-075).

| Parte | Decisión |
|---|---|
| Ejes | Severidad en horizontal (1 → 5) y probabilidad en vertical (5 arriba). Títulos "Severidad" y "Probabilidad" en Label, números en Caption `--color-text-secondary` |
| Celda | Mínimo 44px, fondo `--color-riesgo-{nivel}` según P × S, separación de 2px (el fondo de la card entre celdas), `--radius-sm` |
| Contenido | En la matriz, la cantidad de riesgos (en negrita; vacía si no hay); al evaluar, el número P × S. Siempre en `--color-riesgo-{nivel}-texto` |
| Leyenda | Debajo, los cuatro niveles con su cuadrado, nombre y rango ("Alto 10–14") |
| Elegir (HU-037) | El mapa es un atajo: cada celda es un botón que elige la probabilidad y la severidad a la vez. El control principal son las dos listas de radios con la explicación de cada valor (RN-80), que quedan sincronizadas con el mapa. La celda elegida (`aria-pressed`) y la que tiene foco llevan un anillo de 2px `--color-text-primary` por dentro y un halo de 2px del fondo, para que se vean sobre cualquier color. Se anuncia "Probabilidad 3, severidad 4: nivel 12, alto" |
| Ver (HU-038) | Una celda con riesgos es un botón que filtra la lista a esos riesgos; se anuncia "Probabilidad 3, severidad 4: 2 riesgos, alto" |
| Celular | El título "Probabilidad" pasa arriba del mapa, en horizontal; así cabe en 390px sin reducir las celdas de 44px |
| Impresión | Se imprimen los colores (`print-color-adjust: exact`); el número y la leyenda permiten leerla en blanco y negro |

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

- **Organización en Figma** (paso 2): estructura del archivo y variables.
- **Breakpoints** exactos de celular / tablet / escritorio.
- **Modo oscuro:** valores definidos (ver sección); falta revisar todas las pantallas en oscuro antes de lanzarlo, después del primer entregable.
- **Personalización por empresa:** estrategia definida (ver sección); falta diseñar la pantalla de configuración. Entregable posterior.

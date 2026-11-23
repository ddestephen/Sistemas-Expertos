// Los valores de las muestras se leen de las variables CSS de :root, así nunca se desincronizan.
const css = getComputedStyle(document.documentElement);
const val = (name) => css.getPropertyValue(name).trim();
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const brandUse = { 50: 'Ítem activo', 100: 'Selección', 200: 'Borde selección', 300: 'Links (oscuro)', 400: 'Íconos (oscuro)', 500: 'Foco', 600: 'Botón, links', 700: 'Hover', 800: 'Presionado', 900: 'Fondos (oscuro)', 950: 'Fondos (oscuro)' };
const neutralUse = { white: 'Superficies', 50: 'Fondo app', 100: 'Hover filas', 200: 'Bordes', 300: 'Bordes marcados', 400: 'Deshabilitado', 500: 'Placeholder, inputs', 600: 'Texto secundario', 700: 'Énfasis', 800: 'Superficie (oscuro)', 900: 'Texto principal', 950: 'Fondo (oscuro)' };

function swatch(varName, label, use, isBase) {
  return `<div class="swatch${isBase ? ' base' : ''}"><div class="swatch-chip" style="background: var(${varName})"></div>
    <div class="name">${label}</div><div class="val">${val(varName)}</div><div class="use">${use}</div></div>`;
}
document.getElementById('sw-brand').innerHTML = steps.map((s) => swatch(`--color-brand-${s}`, `brand-${s}`, brandUse[s], s === 600)).join('');
document.getElementById('sw-neutral').innerHTML =
  swatch('--color-white', 'white', neutralUse.white) +
  steps.map((s) => swatch(`--color-neutral-${s}`, `neutral-${s}`, neutralUse[s])).join('');

const semantic = [
  ['--color-bg-canvas', 'neutral-50', 'neutral-950', 'Fondo general, detrás de las cards'],
  ['--color-bg-surface', 'white', 'neutral-900', 'Cards, tablas, paneles'],
  ['--color-bg-elevated', 'white', 'neutral-800', 'Menús, popovers, modales, toasts'],
  ['--color-bg-subtle', 'neutral-100', 'neutral-800', 'Hover de filas, encabezados de tabla'],
  ['--color-bg-pressed', 'neutral-200', 'neutral-700', 'Botón secundario presionado · propuesta'],
  ['--color-bg-selected', 'brand-50', 'brand-900', 'Ítem activo del menú, fila seleccionada'],
  ['--color-bg-disabled', 'neutral-100', 'neutral-800', 'Controles deshabilitados'],
  ['--color-text-primary', 'neutral-900', 'neutral-50', 'Títulos, contenido, datos'],
  ['--color-text-secondary', 'neutral-600', 'neutral-400', 'Labels, descripciones, metadatos'],
  ['--color-text-tertiary', 'neutral-500', 'neutral-500', 'Placeholders y ayudas'],
  ['--color-text-disabled', 'neutral-400', 'neutral-600', 'Texto deshabilitado'],
  ['--color-text-on-brand', 'white', 'white', 'Texto sobre el botón principal'],
  ['--color-text-link', 'brand-600', 'brand-300', 'Links'],
  ['--color-text-link-hover', 'brand-700', 'brand-200', 'Link en hover · propuesta'],
  ['--color-text-selected', 'brand-700', 'brand-200', 'Texto de ítem activo'],
  ['--color-border-default', 'neutral-200', 'neutral-800', 'Cards, divisores, tablas'],
  ['--color-border-strong', 'neutral-300', 'neutral-700', 'Botón secundario, separaciones marcadas'],
  ['--color-border-input', 'neutral-500', 'neutral-500', 'Inputs (≥ 3:1)'],
  ['--color-border-input-hover', 'neutral-600', 'neutral-400', 'Input en hover · propuesta'],
  ['--color-focus-ring', 'brand-500', 'brand-400', 'Anillo de foco'],
  ['--color-focus-halo', 'brand-100', 'brand-900', 'Halo del input con foco · propuesta'],
  ['--color-action-primary', 'brand-600', 'brand-600', 'Botón principal (igual en ambos modos)'],
  ['--color-action-primary-hover', 'brand-700', 'brand-700', 'Hover'],
  ['--color-action-primary-pressed', 'brand-800', 'brand-800', 'Presionado'],
  ['--color-action-danger', '#DC2626', '#DC2626', 'Botón de peligro (igual en ambos modos)'],
  ['--color-action-danger-hover', '#B91C1C', '#B91C1C', 'Hover del botón de peligro'],
  ['--color-action-danger-pressed', '#991B1B', '#991B1B', 'Presionado del botón de peligro'],
  ['--color-overlay', 'neutral-950 · 45%', 'negro · 60%', 'Fondo detrás de modales'],
  ['--color-dato-serie', '#2a78d6', '#3987e5', 'Barra de un gráfico (una sola serie); no es la marca'],
  ['--color-dato-pista', '#cde2fb', '#0d366b', 'Fondo de la barra (pista); en oscuro se aleja para no parecer un dato'],
];
document.getElementById('semantic-rows').innerHTML = semantic.map(([v, light, dark, use]) =>
  `<tr><td class="col-dot"><span class="dot" style="background: var(${v})"></span></td><td><span class="tok">${v}</span></td><td class="muted">${light}</td><td class="muted">${dark}</td><td>${use}</td></tr>`).join('');

const typeStyles = [
  ['t-display tabular', 'Display', '72%', '30 / 36', 'Semibold · −2%', '--font-size-2xl', 'KPIs grandes'],
  ['t-h1', 'Título 1', 'Incidentes', '24 / 32', 'Semibold · −1.5%', '--font-size-xl', 'Título de página (20/28 en celular)'],
  ['t-h2', 'Título 2', 'Planes de acción', '20 / 28', 'Semibold · −1%', '--font-size-lg', 'Secciones'],
  ['t-h3', 'Título 3', 'Revisión de EPP · Planta 2', '16 / 24', 'Semibold', '--font-size-md', 'Títulos de cards y modales'],
  ['t-body-lg', 'Cuerpo grande', 'El responsable de área debe verificar el uso de protección auditiva antes de cada turno.', '16 / 24', 'Regular', '--font-size-md', 'Textos largos; texto largo en celular'],
  ['t-body', 'Cuerpo', 'Se registró una caída al mismo nivel en el pasillo del sector de envasado.', '14 / 20', 'Regular', '--font-size-sm', 'Texto base de la app'],
  ['t-label', 'Label', 'Fecha del incidente', '14 / 20', 'Medium', '--font-size-sm', 'Botones, labels de formulario'],
  ['t-caption', 'Caption', 'Actualizado el 28/10/2026 por Laura Méndez', '12 / 16', 'Regular', '--font-size-xs', 'Fechas, metadatos, ayudas'],
];
document.getElementById('type-rows').innerHTML = typeStyles.map(([cls, name, sample, size, weight, token, use]) =>
  `<div class="type-row"><div class="type-sample"><span class="measure ${cls}">${sample}<span class="ann lh"></span></span></div>
   <dl class="specs"><dt>Estilo</dt><dd><b>${name}</b></dd><dt>Tamaño</dt><dd>${size}</dd><dt>Peso</dt><dd>${weight}</dd>
   <dt>Variable</dt><dd><span class="tok">${token}</span></dd><dt>Uso</dt><dd>${use}</dd></dl></div>`).join('');

const spaceUse = { 1: 'Ícono y su texto', 2: 'Label e input', 3: 'Padding de inputs y celdas', 4: 'Entre campos; padding de botones', 6: 'Padding de cards; entre grupos', 8: 'Entre secciones', 12: 'Entre bloques grandes', 16: 'Márgenes amplios' };
document.getElementById('space-rows').innerHTML = Object.keys(spaceUse).map((k) =>
  `<div class="space-row"><span class="tok">--space-${k}</span><span class="tabular">${val('--space-' + k)}</span>
   <span class="t-caption muted">${spaceUse[k]}</span></div>`).join('');

const radii = [['sm', 'Badges, checkboxes'], ['md', 'Botones, inputs'], ['lg', 'Cards, tablas'], ['xl', 'Modales, popovers'], ['full', 'Avatares, toggles']];
document.getElementById('radius-tiles').innerHTML = radii.map(([k, use]) =>
  `<div><div class="radius-tile" style="border-radius: ${k === 'full' ? '44px' : `var(--radius-${k})`}"></div>
   <div><span class="tok">--radius-${k}</span> <span class="tabular">${k === 'full' ? '9999px' : val('--radius-' + k)}</span></div><div class="t-caption muted">${use}</div></div>`).join('');

document.querySelectorAll('[data-cols]').forEach((el) => { el.innerHTML = '<span></span>'.repeat(+el.dataset.cols); });

// ---------------------------------------------------------------------
// Personalización por empresa: genera la escala de marca en OKLCH.
// La tabla de L y la curva de C se miden sobre la escala violeta por defecto.
// ---------------------------------------------------------------------
const toLinear = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function hexToRgb(hex) {
  const n = hex.replace('#', '');
  const full = n.length === 3 ? [...n].map((x) => x + x).join('') : n;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
}
const rgbToHex = (rgb) => '#' + rgb.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();

function hexToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

function oklchToLinear({ l, c, h }) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

// Si el color no se puede mostrar en pantalla, baja la intensidad (C) hasta que se pueda.
function oklchToHex({ l, c, h }) {
  let lin = oklchToLinear({ l, c, h });
  while (lin.some((v) => v < -0.0001 || v > 1.0001) && c > 0) {
    c = Math.max(0, c - 0.002);
    lin = oklchToLinear({ l, c, h });
  }
  return rgbToHex(lin.map((v) => toGamma(Math.min(1, Math.max(0, v)))));
}

const luminance = (hex) => { const [r, g, b] = hexToRgb(hex).map(toLinear); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

const DEFAULT_BRAND = steps.map((s) => val(`--color-brand-${s}`).toUpperCase());
const BASE = DEFAULT_BRAND.map(hexToOklch);
const L_TABLE = BASE.map((c) => c.l);
const C_CURVE = BASE.map((c) => c.c / BASE[6].c);
const STEP_GAP = 0.05;
const WHITE = '#FFFFFF';
const INK = val('--color-neutral-900').toUpperCase();          // texto oscuro y superficie en modo oscuro
const DARK_CANVAS = val('--color-neutral-950').toUpperCase();

// Modos: 'white' = color exacto con texto blanco · 'dark-text' = color exacto con texto oscuro (propuesta)
//        'adjusted' = no pasa con ningún texto: se usa el 600 generado.
function generateScale(hex) {
  const src = hexToOklch(hex);
  const mode = contrast(hex, WHITE) >= 4.5 ? 'white' : contrast(hex, INK) >= 4.5 ? 'dark-text' : 'adjusted';
  const L = [...L_TABLE];
  if (mode === 'white') {
    // El 600 es el color exacto; los vecinos se corren para mantener el orden de la escala.
    L[6] = src.l;
    for (let i = 7; i < L.length; i++) L[i] = Math.max(0.12, Math.min(L_TABLE[i], L[i - 1] - STEP_GAP));
    for (let i = 5; i >= 0; i--) L[i] = Math.min(0.985, Math.max(L_TABLE[i], L[i + 1] + STEP_GAP));
  }
  const scale = L.map((l, i) => (mode === 'white' && i === 6 ? hex : oklchToHex({ l, c: src.c * C_CURVE[i], h: src.h })));
  // Con texto oscuro, el botón usa el color exacto y dos tonos apenas más oscuros; el resto usa la escala.
  const button = mode === 'dark-text'
    ? { bg: hex, hover: oklchToHex({ ...src, l: src.l - 0.05 }), pressed: oklchToHex({ ...src, l: src.l - 0.1 }), text: INK }
    : { bg: scale[6], hover: scale[7], pressed: scale[8], text: WHITE };
  return { src, mode, L, scale, button };
}

const PRESETS = [
  ['Violeta (por defecto)', '#5B3FA8'], ['Verde azulado', '#0F766E'], ['Azul marino', '#1E3A5F'],
  ['Celeste claro', '#7DD3FC'], ['Rojo', '#DC2626'], ['Amarillo', '#FACC15'], ['Grafito', '#1F2933'],
];
document.getElementById('tenant-presets').innerHTML = PRESETS.map(([name, hex]) =>
  `<button class="btn btn-secondary preset" data-hex="${hex}"><span class="chip" style="background:${hex}"></span>${name}</button>`).join('');

function scaleRow(label, colors, Ls, exactIndex) {
  return `<span class="row-label">${label}</span>` + colors.map((hex, i) =>
    `<div class="scale-cell${i === exactIndex ? ' exact' : ''}"><div class="step">${steps[i]}</div><div class="chip" style="background:${hex}" title="${hex}"></div>
     <div class="meta">${hex}</div><div class="meta">L ${Ls[i].toFixed(2)}</div></div>`).join('');
}

function note(type, icon, title, text) {
  return `<div class="alert alert-${type}"><svg class="icon"><use href="#${icon}"/></svg><div><div class="t-label">${title}</div><div>${text}</div></div></div>`;
}

const BUTTON_PROPS = {
  '--color-action-primary': 'bg', '--color-action-primary-hover': 'hover',
  '--color-action-primary-pressed': 'pressed', '--color-text-on-brand': 'text',
};

function applyTenant(rawHex) {
  const hex = rgbToHex(hexToRgb(rawHex));
  const { src, mode, L, scale, button } = generateScale(hex);
  const isDefault = hex === DEFAULT_BRAND[6];

  document.getElementById('tenant-picker').value = hex.toLowerCase();
  document.getElementById('tenant-hex').value = hex;
  document.getElementById('tenant-readout').innerHTML =
    `<div><span class="t-caption muted">L · luminosidad</span><b class="tabular">${src.l.toFixed(2)}</b></div>
     <div><span class="t-caption muted">C · intensidad</span><b class="tabular">${src.c.toFixed(3)}</b></div>
     <div><span class="t-caption muted">H · tono</span><b class="tabular">${Math.round(src.h)}°</b></div>`;

  document.getElementById('row-base').innerHTML = scaleRow('Por defecto', DEFAULT_BRAND, L_TABLE, -1);
  document.getElementById('row-tenant').innerHTML = scaleRow('Empresa', scale, L, mode === 'white' ? 6 : -1);
  document.getElementById('tenant-button').innerHTML =
    `<span class="t-label">Botón principal</span>
     ${['bg', 'hover', 'pressed'].map((k, i) => `<span class="sample" style="background:${button[k]}; color:${button.text}">${['Por defecto', 'Hover', 'Presionado'][i]}</span>`).join('')}
     <span class="t-caption muted">texto ${button.text === WHITE ? 'blanco' : 'oscuro (neutral-900)'}</span>`;

  // Aplica la escala (y, si corresponde, el botón con texto oscuro) en los contenedores de vista previa
  document.querySelectorAll('.theme-scope').forEach((el) => {
    steps.forEach((s, i) => (isDefault ? el.style.removeProperty(`--color-brand-${s}`) : el.style.setProperty(`--color-brand-${s}`, scale[i])));
    Object.entries(BUTTON_PROPS).forEach(([prop, key]) =>
      (mode === 'dark-text' ? el.style.setProperty(prop, button[key]) : el.style.removeProperty(prop)));
  });

  const checks = [
    ['Ambos', 'Texto del botón', button.text, button.bg, 4.5],
    ['Ambos', 'Texto del botón en hover', button.text, button.hover, 4.5],
    ['Claro', 'Link (600) sobre blanco', scale[6], WHITE, 4.5],
    ['Claro', 'Menú activo: 700 sobre 50', scale[7], scale[0], 4.5],
    ['Claro', 'Anillo de foco (500) sobre blanco', scale[5], WHITE, 3],
    ['Oscuro', 'Link (300) sobre superficie oscura', scale[3], INK, 4.5],
    ['Oscuro', 'Menú activo: 200 sobre 900', scale[2], scale[9], 4.5],
    ['Oscuro', 'Anillo de foco (400) sobre superficie oscura', scale[4], INK, 3],
  ];
  document.getElementById('tenant-checks').innerHTML = checks.map(([modeName, label, fg, bg, min]) => {
    const r = contrast(fg, bg);
    return `<tr><td class="muted">${modeName}</td><td><span class="dot dot-sample" style="background:${bg}; color:${fg}">A</span> ${label}</td><td>${min}:1</td>
      <td class="${r >= min ? 'ok' : 'fail'} tabular">${r >= min ? '✓' : '✕'} ${r.toFixed(2)}:1</td></tr>`;
  }).join('');

  const notes = [];
  if (isDefault) notes.push(note('info', 'i-info', 'Tema por defecto', 'Es el violeta del SaaS: lo ven las empresas que no personalizan.'));
  else if (mode === 'white') notes.push(note('success', 'i-check-circle', 'Usamos tu color exacto', 'Tu color tiene buen contraste con texto blanco, así que va tal cual en el botón principal (★).'));
  else if (mode === 'dark-text') notes.push(note('success', 'i-check-circle', 'Usamos tu color exacto, con texto oscuro <span class="proposal">Propuesta</span>',
    `Con texto blanco, ${hex} tiene ${contrast(hex, WHITE).toFixed(2)}:1; con texto oscuro, ${contrast(hex, INK).toFixed(2)}:1. El botón usa tu color tal cual con texto oscuro; links, menú activo y foco usan tonos más oscuros del mismo color para que se lean.`));
  else notes.push(note('warning', 'i-warning', 'Ajustamos tu color para que sea legible', `${hex} no alcanza 4.5:1 ni con texto blanco (${contrast(hex, WHITE).toFixed(2)}:1) ni con texto oscuro (${contrast(hex, INK).toFixed(2)}:1). El botón usa un tono más oscuro del mismo color.`));
  if (src.c < 0.03) notes.push(note('info', 'i-info', 'Color casi sin intensidad', 'La escala sale gris (estilo "grafito"). Funciona bien; revisá que el ítem activo se distinga del hover.'));
  else if (src.c > 0.06 && (src.h < 165 || src.h > 345)) notes.push(note('warning', 'i-warning', 'Se parece a los colores de avisos o riesgo', 'Rojo, naranja, amarillo, verde o rosa pueden confundirse con alertas o niveles de riesgo. Se permite, pero conviene mostrárselo a la empresa junto a los badges.'));
  if (contrast(button.bg, DARK_CANVAS) < 1.7) notes.push(note('info', 'i-info', 'En modo oscuro el botón se distingue poco del fondo', 'Tu color es muy oscuro: el texto del botón se lee bien, pero el botón se "hunde" en el fondo. Revisalo con el selector en Oscuro.'));
  document.getElementById('tenant-notes').innerHTML = notes.join('');
}

document.getElementById('tenant-picker').addEventListener('input', (e) => applyTenant(e.target.value));
document.getElementById('tenant-hex').addEventListener('change', (e) => {
  const v = e.target.value.trim();
  if (/^#?([\da-f]{3}|[\da-f]{6})$/i.test(v)) applyTenant(v.startsWith('#') ? v : '#' + v);
  else e.target.value = document.getElementById('tenant-picker').value.toUpperCase();
});
document.getElementById('tenant-presets').addEventListener('click', (e) => {
  const b = e.target.closest('[data-hex]');
  if (b) applyTenant(b.dataset.hex);
});
document.getElementById('tenant-reset').addEventListener('click', () => applyTenant(DEFAULT_BRAND[6]));
applyTenant(DEFAULT_BRAND[6]);

// Tema de la guía: claro / oscuro / igual que el dispositivo (en la app, la elección es por usuario).
const darkMedia = matchMedia('(prefers-color-scheme: dark)');
let themeChoice = 'system';
try { themeChoice = localStorage.getItem('ds-theme') || 'system'; } catch {}
function applyTheme() {
  const dark = themeChoice === 'dark' || (themeChoice === 'system' && darkMedia.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelectorAll('[data-theme-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeSet === themeChoice)));
}
document.querySelector('.segmented').addEventListener('click', (e) => {
  const b = e.target.closest('[data-theme-set]');
  if (!b) return;
  themeChoice = b.dataset.themeSet;
  try { localStorage.setItem('ds-theme', themeChoice); } catch {}
  applyTheme();
});
darkMedia.addEventListener('change', applyTheme);
applyTheme();

document.getElementById('ann-toggle').addEventListener('change', (e) => document.body.classList.toggle('show-ann', e.target.checked));

// Contador de las áreas de texto con límite (data-max)
document.querySelectorAll('textarea[data-max]').forEach((ta) => {
  const counter = ta.parentElement.querySelector('.counter');
  const max = Number(ta.dataset.max);
  ta.addEventListener('input', () => {
    const over = ta.value.length > max;
    counter.textContent = `${ta.value.length} / ${max}`;
    counter.classList.toggle('is-over', over);
    ta.classList.toggle('is-error', over);
  });
});

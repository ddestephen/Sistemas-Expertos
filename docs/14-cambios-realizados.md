# Cambios realizados

**Para qué sirve:** que **cualquier compañero** (o su IA) entienda **qué problema había**, **por qué se cambió**, **cómo quedó** y **qué trabajo hizo quién**, **leyendo solo este archivo**. Los demás `docs/` guardan el texto oficial para implementar; aquí está la historia y el razonamiento.

**Cómo usarlo:** tabla **Últimos cambios** → sección del día → si hace falta el texto legal/criterios, el enlace opcional al final de cada bloque.

---

## Últimos cambios

| Fecha | Quién | En una frase | Detalle |
|-------|--------|--------------|---------|
| 2026-11-09 | Jonathan | Acceso por **vínculo** por empresa (sin login global); modelo **Persona**; producto **Norvia** | [Ver cambio](#cambio-2026-11-09) |

*(Cada fila nueva se agrega **arriba** de esta tabla.)*

---

## Cambio `2026-11-09` {#cambio-2026-11-09}

| | |
|---|---|
| **Quién documentó** | Jonathan |
| **Fecha** | 9 de noviembre de 2026 |
| **Alcance** | Documentación en `docs/` (modelo, reglas, HUs M1 y auth). Sin código ni tablero aún. |

### El problema (por qué hubo que cambiar)

1. **Un usuario, varias empresas, una contraseña.** El diseño anterior imaginaba una cuenta global y una “membresía” por empresa. Tras el login, a veces se elegía “empresa activa”. Eso mezclaba identidad humana con acceso laboral y complicaba casos reales: misma persona en dos empresas, baja en una sola, correo institucional distinto por empresa.
2. **Membresia + Usuario operativo.** No separaba bien “quién es la persona” de “con qué rol y credenciales entra a *esta* empresa”. Tampoco encajaba con 3FN si el nombre y el login vivían repartidos sin criterio claro.
3. **Marca y mensaje del curso.** El pitch y varios textos decían **SST360**; el equipo unificó el nombre comercial **Norvia** (Normativa + Vía).
4. **Autorización solo “en código”.** Para la Fase 2 y el ERD del curso hacía falta mostrar **permisos en base de datos**, no solo nombres de rol en atributos.

Si no se cambiaba, las HUs de login, onboarding y JWT seguían describiendo un flujo que el equipo ya no quería implementar.

### Qué se decidió y por qué (en lenguaje del equipo)

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Persona** sin correo ni clave | Solo identidad (nombres en 4 columnas, sin “nombre completo” guardado) | Un trabajador puede existir en accidentes/EPP sin cuenta; la misma persona puede enlazarse a varios vínculos |
| **VinculoEmpresa** | Persona + Empresa + rol + **correo institucional** + **contraseña** + estado | La empresa controla el correo de trabajo; suspender un vínculo no apaga a la persona ni otras empresas |
| **Usuario** solo plataforma | Tabla aparte para admin de Norvia, no para operar una empresa | No mezclar SaaS interno con usuarios de cliente |
| **Login = vínculo** | Quien entra usa el correo/clave del vínculo, no una cuenta “global” | Cumple RN de no confiar en `EmpresaId` del cliente y aislar tenants |
| **JWT** | Incluye vínculo, empresa (cifrada) y rol; **sin** selector de empresa después del login | Cada sesión es un tenant claro |
| **Permiso / RolPermiso** | Catálogo de permisos y qué rol los tiene | El ERD y HU-014/095 demuestran RBAC; la API puede validar contra BD |
| **Historial de estados** | Al suspender vínculo o empresa, motivo obligatorio y registro histórico | Auditoría y diferencia “se fue el empleado” vs “morosos del SaaS” |
| **Cargo ≠ rol** | Cargo de comisión (presidente, etc.) no sustituye permisos del vínculo | La ley/comisión es un ámbito distinto al menú del sistema |
| **Norvia** | Nombre único del producto en docs; SST360 solo como alias histórico en glosario | Un solo discurso para pitch, README y HUs |

En el repo formal estas ideas están en decisiones **D1, D19–D22** y reglas **RN-02, RN-03, RN-57–RN-62** (entre otras). Aquí no hace falta abrir `08` ni `07` para entender el fondo.

### Cómo quedó el modelo de acceso (resumen técnico legible)

```text
Persona (global, sin login)
    └── VinculoEmpresa (por Empresa): Email, PasswordHash, RolId, Estado
            └── JWT: VinculoEmpresaId + EmpresaId (cifrado) + RolId

Usuario → solo administrador de la plataforma Norvia

Trabajador que no usa la app → puede ser solo Persona (sin VinculoEmpresa)
```

**Otra empresa, mismo humano:** no es “cambiar empresa” en la misma sesión; es **otro vínculo** con **otras** credenciales (como dos cuentas de trabajo distintas).

**Contraseña:** se cambia la del vínculo en el que estás logueado; no la de otros vínculos.

### Qué hizo Jonathan en la práctica (entregable del cambio)

- Reescribió criterios de HUs de multiempresa, registro, login, gestión de vínculos y diseño/implementación JWT/RBAC.
- Actualizó decisiones, reglas, entidades, modelo de datos, actores, glosario, visión/alcance y sprint backlog para que digan lo mismo.
- Creó guía de edición (`00`) y esta bitácora (`14`).
- **Pendiente explícito:** issues del tablero Kanban, PDF del pitch, código en `ProyectoFinal/`, archivo `HUs.txt` de la raíz.

**Ajuste posterior (mismo lote):** se alineó el ERD en `12-modelo-datos.md` (historiales, vínculo en comisión, sin enlace erróneo Persona–Usuario), criterios HU-008/010/093, endpoints M1 en `13-sprint-backlog.md`.

**Revisión de coherencia (segunda pasada):** unificación de lenguaje y caza de restos del modelo viejo.

| Archivo | Qué se corrigió |
|---------|------------------|
| `10-historias-usuario.md` | Nota al inicio: operador vs `Usuario`; criterios HU-024, 043, 045, 047, 054, 060, 074, 079, 086, 099, 102 |
| `04-modulos.md`, `03-alcance.md` | M1 sin “cambiar empresa”; vínculos en lugar de “usuarios” |
| `13-sprint-backlog.md` | Pasos 3.1–3.3 y DoD HU-098 |
| `02-requisitos-curso.md` | `HasQueryFilter` y rutas sin “usuario genérico” |
| `11-glosario.md` | Términos **Operador**, **Usuario**, JWT/token |
| `00-guia-edicion-docs.md` | Checklist de búsqueda de discrepancias |

| Fuente | Estado |
|--------|--------|
| Carpeta `docs/` | Coherente con vínculos (salvo citas históricas en este `14`) |
| `HUs.txt` (raíz) | **Desactualizado** — aún describe usuario multiempresa y RN viejas |
| `ProyectoFinal/` (código) | **No revisado** en este lote — implementar según `12` + HUs M1 |
| GitHub Projects (tablero) | **Pendiente** — checks Tablero en `[ ]` abajo |
| PDF pitch / lineamientos | **No regenerados** |

### Seguimiento por historia (resumen + checks)

| HU | Doc en repo | Tablero GitHub |
|----|-------------|----------------|
| 009, 014, 015, 017–022, 094, 095 | [x] criterios actualizados en `10` | [ ] |
| 092 (ERD) | [x] en `12` | — (sin issue suelta) |

Marca **Tablero** `[x]` cuando la issue tenga el mismo título y criterios que el **Ahora** de abajo. HU-019 en tablero: **«Acceder a otra empresa»** (no «Cambiar de empresa»).

### Detalle por historia (antes → ahora)

Cada bloque es el “commit” documental de esa HU dentro de este cambio.

#### HU-009 | Aislamiento multiempresa

| | |
|---|---|
| **Antes** | Varios usuarios/empresas con login global y empresa activa elegida después. |
| **Ahora** | Cada acceso es un vínculo; el token define la empresa; no hay selector post-login. |
| **Tablero** | [ ] |
| **Referencia oficial** *(opcional)* | [10-historias-usuario.md § HU-009](10-historias-usuario.md#hu-009--definir-el-aislamiento-multiempresa) |

#### HU-014 | Diseño auth y autorización

| | |
|---|---|
| **Antes** | Usuario global, membresía, empresa activa en claims; roles fijos en código. |
| **Ahora** | Login en `VinculoEmpresa`; claims `VinculoEmpresaId`, `EmpresaId` cifrado, `RolId`; `Permiso`/`RolPermiso`; `Usuario` solo plataforma; 401/403. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-014](10-historias-usuario.md#hu-014--diseñar-autenticación-y-autorización), `13-sprint-backlog.md` |

#### HU-015 | Pitch

| | |
|---|---|
| **Antes** | Nombre **SST360**. |
| **Ahora** | Nombre **Norvia**; mismo mensaje “prepara, no certifica”. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-015](10-historias-usuario.md#hu-015--redactar-el-pitch-de-1-página) |

#### HU-017 | Registrar empresa

| | |
|---|---|
| **Antes** | Empresa + usuario global + membresía en un paso. |
| **Ahora** | Empresa + `Persona` + primer `VinculoEmpresa` (admin) con correo y hash. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-017](10-historias-usuario.md#hu-017--registrar-mi-empresa) |

#### HU-018 | Sesión

| | |
|---|---|
| **Antes** | Login global; una membresía activa entraba directo. |
| **Ahora** | Login del vínculo; JWT según HU-014; sin acceso si vínculo o empresa suspendidos. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-018](10-historias-usuario.md#hu-018--iniciar-y-cerrar-sesión) |

#### HU-019 | Otra empresa

| | |
|---|---|
| **Antes** | «Cambiar de empresa» con selector y nuevo token. |
| **Ahora** | «Acceder a otra empresa» con otro correo y contraseña; sesiones independientes. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-019](10-historias-usuario.md#hu-019--acceder-a-otra-empresa) |

#### HU-020 | Altas en la empresa

| | |
|---|---|
| **Antes** | Agregar usuarios; reutilizar correo para nueva membresía. |
| **Ahora** | Agregar vínculos; correo único en plataforma; un vínculo por persona y empresa. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-020](10-historias-usuario.md#hu-020--agregar-vínculos) |

#### HU-021 | Roles y vínculos

| | |
|---|---|
| **Antes** | Gestionar membresías; desactivar usuario. |
| **Ahora** | Rol y estado del vínculo; **HistorialEstadoVinculo** con motivo. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-021](10-historias-usuario.md#hu-021--gestionar-roles-y-vínculos) |

#### HU-022 | Contraseña

| | |
|---|---|
| **Antes** | Contraseña de la cuenta global. |
| **Ahora** | Contraseña solo del vínculo actual. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-022](10-historias-usuario.md#hu-022--cambiar-mi-contraseña) |

#### HU-094 | JWT (implementación)

| | |
|---|---|
| **Antes** | Token con usuario global y empresa activa. |
| **Ahora** | Token alineado a HU-014 (`VinculoEmpresaId`, empresa cifrada, rol). |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-094](10-historias-usuario.md), `13-sprint-backlog.md` |

#### HU-095 | Autorización (implementación)

| | |
|---|---|
| **Antes** | Solo atributos de rol en endpoints. |
| **Ahora** | Validación con `Permiso`/`RolPermiso`; comisión sigue por cargo. |
| **Tablero** | [ ] |
| **Referencia oficial** | [HU-095](10-historias-usuario.md), `13-sprint-backlog.md` |

#### HU-092 | ERD (nota de modelado)

| | |
|---|---|
| **Antes** | `Membresia`, `Usuario` operativo de empresa. |
| **Ahora** | `Persona`, `VinculoEmpresa`, historiales, RBAC en BD; `Usuario` solo plataforma. |
| **Tablero** | — |
| **Referencia oficial** | [12-modelo-datos.md](12-modelo-datos.md), [HU-010](10-historias-usuario.md#hu-010--diseñar-el-diagrama-entidad-relación) |

### Mapa rápido: si necesitas el archivo oficial

| Tema | Archivo |
|------|---------|
| Decisiones D1, D19–D22 | `08-decisiones-bd.md` |
| Reglas RN multiempresa y acceso | `07-reglas-negocio.md` |
| Criterios de todas las HUs | `10-historias-usuario.md` |
| Tablas y relaciones | `12-modelo-datos.md` |

---

## Cómo registrar el próximo cambio

1. Fila nueva en **Últimos cambios** (arriba).
2. Copiar la plantilla y completar **problema → decisiones → cómo quedó → trabajo hecho → detalle por HU**.
3. Luego editar los archivos oficiales siguiendo [00-guia-edicion-docs.md](00-guia-edicion-docs.md).

### Plantilla

```markdown
## Cambio `AAAA-MM-DD` {#cambio-AAAA-MM-DD}

| | |
|---|---|
| **Quién documentó** | … |
| **Fecha** | … |
| **Alcance** | … |

### El problema (por qué hubo que cambiar)

1. …

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|

### Cómo quedó (resumen)

…

### Qué hizo [nombre] en la práctica

- …

### Seguimiento por historia

| HU | Doc en repo | Tablero |
|----|-------------|---------|

#### HU-… | Título

| **Antes** | … |
| **Ahora** | … |
| **Tablero** | [ ] |
| **Referencia oficial** | enlace opcional |

### Mapa rápido (archivos oficiales)

| Tema | Archivo |
```

Si el cambio no toca HUs, omitir detalle por historia y dejar claro en **Alcance**.

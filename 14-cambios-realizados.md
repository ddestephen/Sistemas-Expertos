# Cambios realizados

**Para qué sirve:** que **cualquier compañero** (o su IA) entienda **qué problema había**, **por qué se cambió**, **cómo quedó** y **qué trabajo hizo quién**, **leyendo solo este archivo**. Los demás `docs/` guardan el texto oficial para implementar; aquí está la historia y el razonamiento.

**Cómo usarlo:** tabla **Últimos cambios** → sección del día → si hace falta el texto legal/criterios, el enlace opcional al final de cada bloque.

---

## Últimos cambios

| Fecha | Quién | En una frase | Detalle |
|-------|--------|--------------|---------|
| 2026-11-13 | Equipo (redactado con Claude Code) | **Reducción de alcance** integrada con el rework de Jonathan: encuestas internas con versiones y 3 tipos, respuestas anónimas, cuentas de encuestados, sin áreas, M6 sin personas afectadas, notificaciones en Norvia y por correo; M7, M8 y M12 fuera (41 tablas, D26–D28, RN-68–79, HU-114–118) | [Ver cambio](#cambio-2026-11-13-reduccion-alcance) |
| 2026-11-13 | Jonathan | Rework de historias: redacción no técnica de los criterios, encuestas internas con versiones (`EncuestaVersion`) y 3 tipos de pregunta, política de contraseñas (HU-114) | Integrado en [este cambio](#cambio-2026-11-13-reduccion-alcance) |
| 2026-11-09 | Jesús | Archivo nativo editable **`docs/Diagramas.drawio`** (ERD Conceptual y Relacional Físico) y `.gitignore` | [Ver cambio](#cambio-2026-11-09-archivo-drawio) |
| 2026-11-09 | Jesús | Diagramas ERD y Relacional con tipos PostgreSQL exportables a draw.io en Mermaid (53 tablas, D25) | [Ver cambio](#cambio-2026-11-09-diagramas-drawio) |
| 2026-11-09 | Jonathan | Tablas **`Acceso`** y **`RefreshToken`**; credenciales fuera de vínculo/staff (D21/D25, RN-57/65–67); alineado a `ProyectoFinal/backend` | [Ver cambio](#cambio-2026-11-09-acceso) |
| 2026-11-09 | Jonathan | **`Permiso.Alcance`** (`empresa` \| `plataforma`) documentado y distinto de tabla **`StaffPlataforma`** (D24, RN-63/64) | [Ver cambio](#cambio-2026-11-09-permiso-alcance) |
| 2026-11-09 | Jonathan | Acceso por **vínculo** por empresa (sin login global); modelo **Persona**; producto **Norvia** | [Ver cambio](#cambio-2026-11-09) |

*(Cada fila nueva se agrega **arriba** de esta tabla.)*

---

## Cambio `2026-11-13-reduccion-alcance` {#cambio-2026-11-13-reduccion-alcance}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 13 de noviembre de 2026 |
| **Alcance** | Reducción del alcance del producto y rediseño de las encuestas, integrado con el commit `0c693a9 rework/hus actualizadas` de Jonathan. Toca decisiones, reglas, entidades, modelo de datos (53 → 41 tablas), historias, alcance, módulos, actores, marco normativo, backlog, glosario y diagramas Mermaid |

### El problema (por qué hubo que cambiar)

1. **El alcance era demasiado grande** para el tiempo disponible: 12 módulos, app para teléfono y dos integraciones con Google. El equipo acordó un flujo más corto, de 8 pasos:
   1. definir la empresa;
   2. generar encuestas según el rubro;
   3. crear las cuentas de encuestados y encuestadores;
   4. generar un reporte anónimo;
   5. armar la matriz de riesgos;
   6. imprimir la matriz;
   7. definir controles, sugerencias y el plan de acción (gestión del riesgo);
   8. notificar cada política nueva.
2. **Pidieron no usar Google Forms:** los formularios deben generarse en Norvia, y el frontend debe cambiar el control según el tipo de pregunta.
3. **Áreas:** trabajar por área agregaba tablas, FK y reglas a casi todos los módulos. Se decidió trabajar todo a nivel de empresa.
4. **Accidentes (M6):** se conserva, pero sin registrar personas afectadas ni días de incapacidad.
5. **Estructura de carpetas:** la documentación y el código se movieron a una carpeta padre (`proyecto-docs/`), con dos repositorios separados:
   - `documentacion-proyecto-final/` (este repositorio);
   - `Proyecto-Sistemas-Expertos-1900-III-PAC-2026/` (backend e infra).

   Varias rutas de la guía (`docs/`, `ProyectoFinal/`) quedaron desactualizadas.

### Integración con el rework de Jonathan (mismo día)

El 13-11 Jonathan subió en paralelo su propio rediseño de las encuestas y una reescritura de las historias. Al juntar ambos cambios se decidió lo siguiente:

| Tema | Jonathan | Este cambio | Quedó |
|---|---|---|---|
| Edición de encuestas | Versiones (`EncuestaVersion`): editar una encuesta publicada crea una versión nueva | Encuesta fija al publicar | **Versiones** (Jonathan) |
| Tipos de pregunta | `respuesta_breve`, `seleccion_unica`, `seleccion_multiple` | 7 tipos, con escala y umbral | **Los 3 de Jonathan** |
| Quién responde | Cualquier vínculo; la respuesta queda asociada al trabajador | Rol `encuestado`; respuesta anónima | **Encuestado y anonimato** (decisión del equipo sobre el "reporte anónimo") |
| Áreas y Google Calendar | Se conservaban | Se eliminan | **Sin áreas ni Google** |
| Elegir empresa al entrar y roles editables por empresa (HU-019, HU-021) | Sí | Login por empresa sin selector; roles globales | **Modelo actual** (D1, D20, D23): HU-019 y HU-021 se redactaron sin selector y sin edición de funciones por grupo |
| Redacción de las historias | No técnica, en todas | Técnica en las historias técnicas | **No técnica, en todas** (Jonathan) |
| Política de contraseñas | HU-114 nueva | — | Se conserva como **HU-114**; las historias nuevas de este cambio pasan a ser **HU-115 a HU-118** |
| Reglas | RN-68 (respuesta asociada al trabajador) y RN-69 (tipos) | RN-68 a RN-79 | Su RN-68 se descarta porque contradice el anonimato; su RN-69 queda dentro de la nueva **RN-68** (tipos) |
| HU-006 | Pasa a Must | — | Must |

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Conservar los códigos** | M1–M12, HU-001–113, D1–D25 y RN-01–67 no se renumeran. Lo recortado se marca "Fuera de alcance" (HU, RN, módulos) o "Sin efecto" (D) | Los enlaces, el tablero y la bitácora anterior siguen siendo válidos |
| **Las tablas recortadas salen del modelo** | 16 tablas se eliminan del diccionario y de los diagramas. Se listan en `09-entidades.md` § Recortadas | El ERD que se entrega muestra solo lo que se construye |
| **Encuesta propia con versiones (D8, D26)** | Cada pregunta tiene un tipo: `respuesta_breve`, `seleccion_unica` o `seleccion_multiple`, y la marca `Obligatoria`. Estados de la encuesta: `borrador` → `publicada` → `cerrada`. Editar una encuesta publicada crea una `EncuestaVersion` nueva; cada respuesta guarda la versión contestada | El front pinta cada control según el tipo, sin servicios externos, y las respuestas viejas no cambian al editar |
| **Encuestados con cuenta (D5, RN-74)** | Rol nuevo `encuestado`. El "encuestador" es el Responsable SST, que crea y publica la encuesta; no hay un rol aparte | Cada trabajador responde una sola vez, y la regla está en la base |
| **Respuestas anónimas (D27, RN-71–73)** | `ParticipacionEncuesta` guarda quién participó; `RespuestaEncuesta` guarda qué se respondió (con la versión), sin vínculo y solo con la fecha. No hay relación entre ambas. El reporte se muestra con al menos 3 respuestas | Es el "reporte anónimo" del diagrama: se controla la participación sin poder identificar respuestas |
| **Sin áreas (D4)** | Se elimina `Area`. Los riesgos, accidentes y encuestas son de la empresa. `Accidente` usa `Lugar` en texto libre | Reduce FK, reglas e historias en todos los módulos |
| **Accidentes sin afectados (D11)** | Se elimina `PersonaAfectada`; las estadísticas son conteos por tipo, gravedad y periodo | Recorta alcance y evita guardar datos de salud |
| **Notificaciones (D28, RN-75, RN-77–79)** | Tabla `Notificacion` por vínculo destinatario: se ve en Norvia y se envía por correo, con reintentos (outbox). Se usa para las políticas publicadas y las tareas asignadas | Es la "notificación de nueva política" del diagrama, sin Google Calendar |
| **Controles sugeridos (RN-76)** | Al definir controles, Norvia propone los de `PlantillaTarea` del peligro, y el Responsable SST los acepta o descarta | Es el paso "sugerencias" del diagrama, sin tablas nuevas |
| **Sin Google ni app para teléfono** | D16 queda sin efecto; HU-025, HU-105, HU-112 y HU-113 quedan fuera de alcance | Menos dependencias externas; la web se adapta a pantallas pequeñas |
| **2 entregas** | E1 = M1–M5 y la matriz impresa (HU-075). E2 = M6, M9 y M11. E3 queda vacía | El orden sigue el flujo acordado |

### Cómo quedó (resumen)

- **Módulos que se construyen:**
  - M1, con las cuentas de encuestados;
  - M2, sin áreas;
  - M3, reescrito;
  - M4, con controles sugeridos e impresión;
  - M5;
  - M6, reducido;
  - M9;
  - M10, solo la matriz en PDF;
  - M11, en Norvia y por correo.
- **Módulos fuera de alcance:** M7, M8 y M12.
- **Modelo:** 41 tablas.
  - **Salen (16):** ConexionGoogle, EventoCalendario, Informe, Area, PersonaAfectada, Comision, IntegranteComision, Reunion, Asistencia, Acta, FirmaActa, Equipo, Mantenimiento, ArticuloEPP, IngresoEPP y EntregaEPP.
  - **Entran (4):** EncuestaVersion, ParticipacionEncuesta, DetalleRespuestaOpcion y Notificacion.
  - **Cambian:**
    - PreguntaExploratoria y EncuestaPregunta: 3 tipos y `Obligatoria`.
    - Encuesta: sin columnas de Google; con estados.
    - EncuestaCategoria y EncuestaPregunta: cuelgan de EncuestaVersion.
    - EncuestaPregunta y EncuestaOpcion: sin la pregunta de área.
    - RespuestaEncuesta: anónima, con la versión contestada.
    - RiesgoEmpresa: sin `AreaId`; con `AccidenteId`.
    - Accidente: sin `AreaId`; con `Lugar`.
    - Tarea: origen riesgo, accidente o manual.
    - Archivo: dueño tarea o accidente.
    - Rol: se agrega `encuestado`.
- **Decisiones:**
  - Nuevas: D26–D28.
  - Modificadas: D3–D9 y D11.
  - Sin efecto: D12, D16, D17 y D18.
- **Reglas:**
  - Nuevas: RN-68–RN-79.
  - Modificadas: RN-10, RN-12, RN-13 y RN-23.
  - Fuera de alcance: RN-17, RN-29, RN-30, RN-32–48, RN-53–56 y RN-61.
- **Historias:** 118 en total.
  - En alcance: 80 (68 Must y 12 Should).
  - Fuera de alcance: 38.
  - Por entrega: Diseño 16, E1 44 y E2 20.

### Qué hizo el equipo en la práctica

- Se actualizó la cadena de verdad en orden: `08` → `07` → `09` → `12` (diccionario, diagramas, relaciones, índices, normalización y trazabilidad §9) → `10` (historias y tabla Resumen) → `14` → `11`.
- También se ajustaron `01`, `03`, `04`, `05`, `06`, `13`, `README.md` y `00-guia-edicion-docs.md` (rutas nuevas y regla de recortes).
- Se regeneraron los bloques Mermaid de `15-diagramas-drawio.md` desde el diccionario de `12`.
- **Pendiente:** `Diagramas.drawio` todavía muestra el modelo de 53 tablas (el nuevo tiene 41). Hay que reimportar los bloques de `15`.
- Se verificó con un script:
  - que no hay dependencias hacia historias inexistentes ni recortadas;
  - que ninguna historia depende de una entrega posterior;
  - que no hay ciclos;
  - que no se citan RN o D inexistentes ni recortadas en historias activas;
  - que no hay enlaces `.md` rotos.
- **Pendiente en el código** (`Proyecto-Sistemas-Expertos-1900-III-PAC-2026/backend`):
  - quitar `Area` y `RiesgoEmpresa.AreaId`;
  - actualizar el enum `TipoRespuestaPregunta`;
  - crear las entidades de encuesta (con `EncuestaVersion`), `Notificacion`, `Acceso` y `RefreshToken`;
  - generar una migración nueva.
- **Por confirmar:** que cada encuestado tenga un correo para su **Acceso** (trabajadores de maquila sin correo).

### Seguimiento por historia

| HU | Doc en repo | Tablero |
|----|-------------|---------|
| HU-029–033 (M3 reescrito) | Sí | [ ] |
| HU-035, HU-036, HU-038, HU-039 (M4 sin áreas, controles sugeridos) | Sí | [ ] |
| HU-047, HU-051, HU-052 (M6 reducido) | Sí | [ ] |
| HU-075 (matriz impresa, pasa a E1) | Sí | [ ] |
| HU-081 (aviso de tarea asignada) | Sí | [ ] |
| HU-114 (Jonathan) y HU-115–118 (nuevas) | Sí | [ ] |
| Resto de historias (redacción no técnica de Jonathan) | Sí | [ ] |
| HU-025, 027, 028, 048, 053–069, 076–080, 082–090, 105, 112, 113 (fuera de alcance) | Sí | [ ] cerrar o archivar en el tablero |
| HU-023, 024, 034, 041, 046, 070–074, 099 (de E3 a E2) | Sí | [ ] |

#### HU-030 | Crear y editar una encuesta

| **Antes** | Se creaba en Google Forms, con una pregunta de área, y se compartía un enlace |
| **Ahora** | Se crea en Norvia como borrador, se publica y se cierra. Editarla después de publicada crea una versión nueva. Sin Google ni pregunta de área |
| **Tablero** | [ ] |

#### HU-031 | Responder una encuesta (antes: Importar las respuestas)

| **Antes** | El Responsable SST importaba las respuestas desde Google |
| **Ahora** | El encuestado responde con su cuenta, en un formulario que muestra cada pregunta según su tipo (texto, una opción o varias). Responde una sola vez, de forma anónima, y la respuesta guarda la versión contestada |
| **Tablero** | [ ] |

#### HU-032 | Consultar gráficos y resultados anónimos (antes: Ver el resumen de respuestas)

| **Antes** | Resumen por pregunta y por área |
| **Ahora** | Gráficos de la empresa por pregunta, comparativas entre versiones y encuestas, y textos sin autor; visible solo con al menos 3 respuestas |
| **Tablero** | [ ] |

#### HU-033 | Obtener peligros sugeridos

| **Antes** | La sugerencia era por área, desde la opción de exposición |
| **Ahora** | La sugerencia es de la empresa, desde la opción de exposición |
| **Tablero** | [ ] |

#### HU-035, HU-036, HU-038 | Matriz sin áreas

| **Antes** | Cada riesgo tenía un área; la matriz se filtraba por área |
| **Ahora** | Los riesgos son de la empresa; la matriz se filtra por peligro, clasificación, nivel y estado. HU-036 depende de HU-026 en vez de HU-027 |
| **Tablero** | [ ] |

#### HU-039 | Definir controles

| **Antes** | Los controles se escribían a mano |
| **Ahora** | Norvia sugiere controles desde las plantillas del peligro; el Responsable SST los acepta, edita o descarta (RN-76) |
| **Tablero** | [ ] |

#### HU-047, HU-051, HU-052 | Accidentes

| **Antes** | Con área, personas afectadas (HU-048), incapacidad y ausentismo; app para teléfono |
| **Ahora** | Lugar en texto libre, sin afectados, estadísticas por tipo, gravedad y periodo; solo web. Un riesgo nuevo puede quedar enlazado al accidente |
| **Tablero** | [ ] |

#### HU-075 | Generar la matriz de riesgos en PDF

| **Antes** | E3, riesgos por área, se guardaba en Informe |
| **Ahora** | E1, riesgos de la empresa, imprimible y descargable, se genera al pedirla sin guardarla |
| **Tablero** | [ ] |

#### HU-081 | Notificar tareas asignadas (antes: Llevar las tareas al calendario)

| **Antes** | Evento en Google Calendar |
| **Ahora** | Notificación en Norvia y por correo, con reintento |
| **Tablero** | [ ] |

#### HU-019 y HU-021 | Acceso a varias empresas y grupos

| **Antes** | Redacción técnica (vínculo, `IdEmpresa` cifrado, `HistorialEstadoVinculo`) |
| **Ahora** | Redacción no técnica de Jonathan, ajustada al modelo vigente: una sesión por empresa, sin opción de cambiar de empresa, y funciones de cada grupo definidas por la plataforma |
| **Tablero** | [ ] |

#### HU-114 a HU-118 | Historias nuevas

| **Antes** | — |
| **Ahora** | HU-114 (Jonathan): política de contraseñas. HU-115: crear cuentas de encuestados (también en lote). HU-116: notificar una política nueva. HU-117: ver mis notificaciones. HU-118: configurar el envío de correo |
| **Tablero** | [ ] |

### Mapa rápido (archivos oficiales)

| Tema | Archivo |
|------|---------|
| Decisiones D3–D28 | [08-decisiones-bd.md](08-decisiones-bd.md) |
| Reglas RN-68–79 y recortes | [07-reglas-negocio.md](07-reglas-negocio.md) |
| Entidades y tablas recortadas | [09-entidades.md](09-entidades.md) |
| Diccionario de 41 tablas | [12-modelo-datos.md](12-modelo-datos.md) |
| Historias y Resumen | [10-historias-usuario.md](10-historias-usuario.md) |
| Alcance y entregas | [03-alcance.md](03-alcance.md) |
| Diagramas Mermaid | [15-diagramas-drawio.md](15-diagramas-drawio.md) |

---

## Cambio `2026-11-09-archivo-drawio` {#cambio-2026-11-09-archivo-drawio}

| | |
|---|---|
| **Quién documentó** | Jesús |
| **Fecha** | 9 de noviembre de 2026 |
| **Alcance** | Incorporación del archivo nativo editable `docs/Diagramas.drawio` (con 2 páginas: Entidad-Relación y Relacional con tipos PostgreSQL) y configuración de `.gitignore` para archivos temporales de Draw.io. |

### El problema (por qué hubo que cambiar)

1. Aunque `docs/15-diagramas-drawio.md` contenía el código fuente Mermaid para importar en draw.io, el equipo necesitaba un archivo nativo ya procesado, maquetado y listo para abrir en **Draw.io Desktop** o en [app.diagrams.net](https://app.diagrams.net/).
2. Al guardar y editar en Draw.io, la aplicación genera archivos temporales de respaldo (`.*.bkp`, `*.bkp`) que ensuciaban el árbol de trabajo de Git sin una regla de exclusión.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Archivo nativo versionado** | Guardar `docs/Diagramas.drawio` en el repositorio | Permite a cualquier integrante abrir, retocar visualmente o exportar a PNG/PDF de inmediato sin reimportar Mermaid |
| **Multi-página** | Dos páginas integradas: *Entidad-Relación* (semántico) y *Relacional* (PostgreSQL) | Centraliza el modelo completo de 53 tablas en un solo archivo organizado por pestañas |
| **`.gitignore` para Draw.io** | Ignorar patrones `.*.bkp`, `*.bkp` y `~$*` | Evita subir archivos temporales y bloqueos locales de Draw.io al repositorio remoto |

### Qué se actualizó en el repo

| Archivo | Cambio |
|---------|--------|
| `docs/Diagramas.drawio` | Archivo nativo de Draw.io con páginas *Entidad-Relación* y *Relacional* |
| `.gitignore` | Creación de reglas de exclusión para temporales de Draw.io y del sistema operativo |
| `docs/15-diagramas-drawio.md` | Nota informativa enlazando a `Diagramas.drawio` |
| `docs/README.md` | Enlace a `Diagramas.drawio` en el índice de documentos y en pasos siguientes |

---

## Cambio `2026-11-09-diagramas-drawio` {#cambio-2026-11-09-diagramas-drawio}

| | |
|---|---|
| **Quién documentó** | Jesús |
| **Fecha** | 9 de noviembre de 2026 |
| **Alcance** | Creación de `docs/15-diagramas-drawio.md` con especificaciones Mermaid completas de ERD Conceptual y Relacional Físico PostgreSQL importables en draw.io para las 53 tablas de Norvia. |

### El problema (por qué hubo que cambiar)

1. El equipo requería diagramas exportables e importables directamente en **draw.io** para la presentación del proyecto y los entregables de la Fase 1 (ERD 3FN) y Fase 2 (EF Core Code-First).
2. Los diagramas existentes en `12-modelo-datos.md` §3 eran esquemas sintéticos sin columnas ni tipos de datos PostgreSQL.
3. Se integraron las nuevas tablas **`Acceso`** y **`RefreshToken`** incorporadas por el backend de Jonathan (D25).

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Mermaid nativo para draw.io** | Bloques de código `erDiagram` listos para copiar y pegar | Draw.io convierte Mermaid a vectores editables en 3 clics sin instalar plugins |
| **Cardinalidad en ambos** | ERD Conceptual = 1:1, 1:N, N:M del negocio; Relacional = Crow's foot (`\|\|--o{`) con N:M resueltas en tablas intermedias | Cumple la teoría de modelado de datos y los requisitos de la cátedra |
| **Esquemas modulares y globales** | 4 dominios independientes + diagrama maestro de 53 tablas | Permite trabajar por pestañas limpias en draw.io sin saturar el lienzo |
| **Tipos reales de PostgreSQL** | Tipos normalizados sin paréntesis (`uuid`, `varchar_80`, `timestamptz`, `smallint`) | Previene errores de parseo en el motor Mermaid de draw.io |

### Qué se actualizó en el repo

| Archivo | Cambio |
|---------|--------|
| `docs/15-diagramas-drawio.md` | Creación del documento con los diagramas conceptuales y físicos completos (53 tablas) |
| `docs/README.md` | Enlace al nuevo documento en la tabla general y en siguientes pasos |

---

## Cambio `2026-11-09-acceso` {#cambio-2026-11-09-acceso}

| | |
|---|---|
| **Quién documentó** | Jonathan |
| **Fecha** | 9 de noviembre de 2026 |
| **Alcance** | Modelo de acceso en `docs/` alineado a EF Core en `ProyectoFinal/backend` (migración `AccesoYRefresh`, auth en Application). |

### El problema (por qué hubo que cambiar)

1. Los `docs/` del 9-nov describían **correo y `PasswordHash` en cada `VinculoEmpresa`** (y en `StaffPlataforma`), con contraseña distinta por empresa en HU-019.
2. El backend ya implementó **3FN de credenciales**: tabla global **`Acceso`**, vínculos y staff con **`AccesoId`**, sesiones en **`RefreshToken`** (solo hash; JWT de access no en BD).
3. Sin actualizar la cadena 08→12, el ERD del curso y las HUs M1 no coincidían con el código ni con la regla “un correo, una contraseña” entre empresas que comparten correo institucional.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **D21** (ajuste) | Credenciales solo en **Acceso** | Una fila de hash por correo |
| **D25** | **RefreshToken** + JWT efímero | HU-018/094 sin tabla de access tokens |
| **RN-57** (ajuste) | Login empresa: **Acceso** + `IdEmpresa` cifrado + vínculo activo | Mantiene tenant aislado sin selector post-login |
| **RN-65–67** | Correo UQ, rotación/borrado de refresh, `Verificado` | Paridad con `AuthServicio` y configs EF |

### Cómo quedó el acceso (resumen)

```text
Acceso (Email UQ, PasswordHash, Verificado)
    ├── VinculoEmpresa (EmpresaId, PersonaId, AccesoId, RolId, Estado)
    └── StaffPlataforma (AccesoId 1:1, RolStaffPlataformaId, Activo)

RefreshToken: TokenHash, AccesoId, VinculoEmpresaId?, TipoSesion, ExpiraEn
```

Login: `POST /api/auth/login/empresa` | `/plataforma` | `refresh` | `logout`.

### Qué se actualizó en el repo de docs

| Archivo | Cambio |
|---------|--------|
| `08-decisiones-bd.md` | D1, D21; **D25** |
| `07-reglas-negocio.md` | RN-57; **RN-65, RN-66, RN-67** |
| `09-entidades.md`, `12-modelo-datos.md` | **Acceso**, **RefreshToken**; vínculo/staff sin Email/PasswordHash; ERD §3.1; trazabilidad §9 |
| `10-historias-usuario.md` | HU-014, 017–022, 094 (criterios) |
| `11-glosario.md`, `00-guia-edicion-docs.md`, `04-modulos.md`, `13-sprint-backlog.md` | Términos y endpoints auth |
| `README.md` | Rango D1–D25 |

### Seguimiento por historia

| HU | Doc en repo | Tablero GitHub | Código `ProyectoFinal/backend` |
|----|-------------|----------------|--------------------------------|
| 014, 017–022, 094 | [x] | [ ] | [x] auth slice + migración (pendiente `database update` en cada máquina) |

#### HU-019 | Acceder a otra empresa

| | |
|---|---|
| **Antes** | Cada empresa: correo y contraseña distintos por vínculo. |
| **Ahora** | Mismo **Acceso** si mismo correo; sesiones separadas por `IdEmpresa` y refresh distinto. |
| **Tablero** | [ ] |

### Mapa rápido

| Tema | Archivo |
|------|---------|
| D25, D21 | `08-decisiones-bd.md` |
| Diccionario Acceso / RefreshToken | `12-modelo-datos.md` §4.1 |
| Guía de edición | `00-guia-edicion-docs.md` |

**Nota:** el bloque histórico [cambio 2026-11-09](#cambio-2026-11-09) aún menciona credenciales en vínculo; fue el diseño documental **antes** de este ajuste. La fuente vigente es este bloque y `12-modelo-datos.md`.

---

## Cambio `2026-11-09-permiso-alcance` {#cambio-2026-11-09-permiso-alcance}

| | |
|---|---|
| **Quién documentó** | Jonathan |
| **Fecha** | 9 de noviembre de 2026 |
| **Alcance** | Aclaración RBAC en `docs/` (decisión D24, RN-63/64, glosario, HU-014/095, diccionario). Sin código ni tablero. |

### El problema (por qué hubo que cambiar)

1. **`StaffPlataforma`** es una **tabla de login** (correo, clave, `RolStaffPlataformaId`).
2. **`Permiso.Alcance = plataforma`** es una **etiqueta del catálogo RBAC** que indica “esta ruta es global, sin tenant SST”.
3. Sin texto explícito, quien implementa puede pensar que hay que renombrar tablas, unificar nombres o mezclar permisos de empresa con los del staff en una sola tabla puente.

### Qué se decidió y por qué (en lenguaje del equipo)

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **D24** | Un catálogo **Permiso**; `Alcance` solo `empresa` o `plataforma` | Un solo inventario de endpoints |
| **`empresa`** | Sesión de **vínculo**; enlace en **RolPermiso** | RBAC del tenant |
| **`plataforma`** | Sesión **StaffPlataforma**; enlace en **RolStaffPlataformaPermiso** | RBAC del equipo Norvia |
| **No renombrar** | No llamar la tabla `Plataforma` ni el alcance `staff` | `StaffPlataforma` = quién entra; `plataforma` = qué clase de API es |

### Qué es `Permiso.Alcance` (explicación corta)

Cada fila de **Permiso** describe una operación HTTP protegida (`MetodoHttp`, `RutaPatron`, `Codigo`). La columna **`Alcance`** responde: *¿esta operación requiere contexto de empresa cliente o es global?*

- **`empresa`:** el JWT trae `VinculoEmpresaId` / `EmpresaId`; ejemplos: riesgos, accidentes, vínculos de esa empresa.
- **`plataforma`:** el JWT es de **StaffPlataforma**; ejemplos: editar rubros, listar empresas, suspender tenant.

La API, al autorizar, cruza **tipo de sesión** + **`Alcance`** + tabla puente correcta (RN-64).

### Qué se actualizó en el repo

| Archivo | Cambio |
|---------|--------|
| `08-decisiones-bd.md` | **D24** |
| `07-reglas-negocio.md` | **RN-63**, **RN-64** (sección Autorización) |
| `09-entidades.md`, `12-modelo-datos.md` | Texto y tabla en diccionario **Permiso**; trazabilidad §9 |
| `11-glosario.md` | Entradas **Permiso** y **Alcance (de permiso)** |
| `00-guia-edicion-docs.md`, `05-actores-roles.md` | Término y checklist |
| `10-historias-usuario.md` | HU-014, HU-095 |
| `13-sprint-backlog.md` | Nota HU-095 |

### Seguimiento por historia

| HU | Doc en repo | Tablero GitHub |
|----|-------------|----------------|
| 014, 095 | [x] | [ ] |

#### HU-014 | Diseñar autenticación y autorización

| | |
|---|---|
| **Antes** | RBAC empresa/plataforma citado sin definir `Alcance` ni reglas de mezcla. |
| **Ahora** | Catálogo con `empresa` \| `plataforma`; criterios enlazan D24 y RN-63/64. |
| **Tablero** | [ ] |

#### HU-095 | Implementar autorización por roles

| | |
|---|---|
| **Antes** | “Admin plataforma aparte” sin filtro por `Alcance`. |
| **Ahora** | Autorización por tipo de sesión y tabla puente según `Permiso.Alcance`. |
| **Tablero** | [ ] |

### Mapa rápido

| Tema | Archivo |
|------|---------|
| D24 | `08-decisiones-bd.md` |
| RN-63, RN-64 | `07-reglas-negocio.md` |
| Diccionario Permiso | `12-modelo-datos.md` § Permiso |

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
| **Usuario** + **StaffPlataforma** | `Usuario.Activo` por persona (sin login); staff en `StaffPlataforma` + `RolStaffPlataforma` | Activación global vs credenciales en vínculo |
| **Rol de empresa vs plataforma** (D23) | `Rol`/`RolPermiso` solo en vínculos; catálogos con `RolStaffPlataforma` | El staff **no** asigna roles de empresa |
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

StaffPlataforma → staff Norvia (RolStaffPlataforma)

Trabajador que no usa la app → puede ser solo Persona (sin VinculoEmpresa)

Quien da de alta vínculos y roles en una empresa → vínculo `admin_empresa`, no StaffPlataforma
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
| `08`, `09`, `12`, `05` | **D21/D23:** `Usuario` solo `Activo`; credenciales en vínculo; `StaffPlataforma` staff |

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
| **Ahora** | Login empresa en `VinculoEmpresa`; staff en `StaffPlataforma`; RBAC empresa/plataforma separado (D23); 401/403. |
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
| **Ahora** | `Persona`, `VinculoEmpresa`, `StaffPlataforma`, historiales, RBAC empresa y plataforma. |
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

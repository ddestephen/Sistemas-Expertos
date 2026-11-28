# Cambios realizados

**Para qué sirve:** que **cualquier compañero** (o su IA) entienda **qué problema había**, **por qué se cambió**, **cómo quedó** y **qué trabajo hizo quién**, **leyendo solo este archivo**. Los demás `docs/` guardan el texto oficial para implementar; aquí está la historia y el razonamiento.

**Cómo usarlo:** tabla **Últimos cambios** → sección del día → si hace falta el texto legal/criterios, el enlace opcional al final de cada bloque.

---

## Últimos cambios

| Fecha | Quién | En una frase | Detalle |
|-------|--------|--------------|---------|
| 2026-11-28 | Equipo (redactado con Claude Code) | **Marco de navegación del frontend (lote 1):** tres layouts (público, empresa y plataforma), menú lateral por rol en lugar de los botones del inicio, menú de cuenta, panel de menú en celular, 404 dentro del marco y niveles de pantalla (las del menú no llevan "Volver"); se documenta en `design-system.md` § Layouts y navegación, § Menú lateral y § Menú de cuenta | [Ver cambio](#cambio-2026-11-28-navegacion-marco) |
| 2026-11-27 | Equipo (redactado con Claude Code) | **Activación de cuentas por código, envío por Resend y correo inmediato de notificaciones:** toda cuenta local nueva (empresa, vínculo o encuestado) deja de recibir contraseña temporal y se activa con el mismo código de 6 dígitos de Microsoft (D30, RN-87; tabla **VerificacionCorreoMicrosoft** generalizada a **VerificacionCorreo**); el envío de correo deja SMTP y pasa a la API de Resend; las notificaciones de M11 intentan su correo de inmediato al crearse, con un botón de reintento manual y el estado nuevo `en_proceso` (RN-78) | [Ver cambio](#cambio-2026-11-27-activacion-por-codigo) |
| 2026-11-26 | Jesús Zepeda | **HU-075 completada:** reporte consolidado `GET /api/riesgos/matriz/reporte` (`riesgo.matriz.reporte`, `ArmadorMatriz`) y vista imprimible apaisada `/riesgos/imprimir` para imprimir o guardar en PDF al vuelo sin guardar archivos (`art. 47.b`, `RN-52`) | [Ver cambio](#cambio-2026-11-26-hu-075) |
| 2026-11-26 | Jesús Zepeda | **HU-099 completada:** tabla `RegistroAuditoria` inalterable (Code-First + `ProtegerRegistroAuditoriaInterceptor` sin triggers SQL), instrumentación transaccional en M1–M9 (omitiendo acciones anónimas `RN-72`/`D11`), consulta `GET /api/auditoria` (`auditoria.listar`) y vista web `/auditoria` | [Ver cambio](#cambio-2026-11-26-hu-099) |
| 2026-11-26 | Jesús Zepeda | **HU-034 completada:** historial de encuestas cerradas o con versiones anteriores (`GET /api/encuestas/historial`), resultados históricos por versión (`?versionId=`) y comparación integral entre encuestas o versiones con exposición a peligros (`GET /api/encuestas/comparacion`) respetando `RN-12`, `D8` y `RN-73` | [Ver cambio](#cambio-2026-11-26-hu-034) |
| 2026-11-26 | Jesús Zepeda | **HU-024 completada:** el staff de plataforma (`admin_plataforma` y `soporte_plataforma`) consulta las empresas registradas con su rubro, estado, fecha de registro y personas con acceso vigente, con filtro `?buscar=` y sin datos SST (`RN-05`) | [Ver cambio](#cambio-2026-11-26-hu-024) |
| 2026-11-25 | Jesús Zepeda | **HU-073 completada (cierre de M9):** el Responsable SST crea una versión nueva en borrador a partir de la vigente sin alterar la publicada (**RN-50**), y tanto el Responsable SST como el admin consultan el historial y el contenido íntegro de las versiones anteriores | [Ver cambio](#cambio-2026-11-25-hu-073) |
| 2026-11-25 | Equipo (redactado con Claude Code) | **HU-074 completada y HU-116 cerrada:** todas las personas de la empresa (también encuestados) consultan las políticas y los procedimientos **vigentes**, los buscan por nombre y los descargan en PDF desde la impresión del navegador; la notificación de una política nueva ya abre su versión vigente | [Ver cambio](#cambio-2026-11-25-hu-074) |
| 2026-11-25 | Equipo (redactado con Claude Code) | **HU-072 completada:** el Responsable SST aprueba el borrador de un documento cuando ya no le faltan datos; queda **vigente** con quién y cuándo, la vigente anterior pasa a reemplazada (**RN-51**) y, si es una política, Norvia avisa a cada vínculo activo en Norvia y por correo (**RN-75**). **RN-49 crece:** no se aprueba con datos por completar | [Ver cambio](#cambio-2026-11-25-hu-072) |
| 2026-11-25 | Equipo (redactado con Claude Code) | **HU-071 completada:** el Responsable SST edita el borrador de un documento en Markdown, con la vista previa al lado y el conteo de lo que falta completar; solo se edita el borrador (**RN-50**) y la plantilla no cambia. Primer **editor de documento** del design system | [Ver cambio](#cambio-2026-11-25-hu-071) |
| 2026-11-25 | Equipo (redactado con Claude Code) | **HU-070 completada:** el Responsable SST genera la política de SST o el procedimiento de investigación de accidentes desde una plantilla de su rubro; se llena con los datos del perfil, lo que falta queda resaltado como `[Completar: …]` y el documento queda como borrador para revisarlo. Tablas `Documento` y `VersionDocumento` creadas en el código; el admin consulta | [Ver cambio](#cambio-2026-11-25-hu-070) |
| 2026-11-25 | Equipo (redactado con Claude Code) | **Decisiones de M9 antes de HU-070:** contenido en Markdown, seis marcadores con datos de la empresa (los que faltan quedan como `[Completar: …]`), política de SST y procedimiento de investigación de accidentes en el contenido inicial, y versión aprobada protegida por la aplicación y los valores únicos, **sin disparador** (D13, RN-49) | [Ver cambio](#cambio-2026-11-25-decisiones-m9) |
| 2026-11-25 | Equipo (redactado con Claude Code) | **Acceso con Microsoft:** nueva tabla **AccesoProveedor** (D29), contraseña opcional en **Acceso**, reglas RN-81–RN-84 y dos historias nuevas (HU-119 registrar empresa con Microsoft, HU-120 iniciar sesión y vincular); el modelo pasa a 42 tablas | [Ver cambio](#cambio-2026-11-25-oauth-microsoft) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-052 completada:** estadísticas de eventos por tipo, gravedad y mes en un periodo, sin descartados y solo con cifras; con ella queda completo M6 (sin evidencias, que esperan a HU-100) | [Ver cambio](#cambio-2026-11-24-hu-052) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-051 completada:** desde un evento se agrega un riesgo nuevo que queda **revelado** por él o se **reevalúa** uno de la matriz; la evaluación guarda el evento (columna nueva `EvaluacionRiesgo.AccidenteId`, D10) y el evento muestra el nivel de antes y el de después | [Ver cambio](#cambio-2026-11-24-hu-051) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-050 completada:** el Responsable SST agrega medidas correctivas a un evento; cada una es una **tarea del plan** con origen "accidente", y desde el evento se ve su avance (completadas, vencidas). Con esto un evento ya se puede cerrar desde la web | [Ver cambio](#cambio-2026-11-24-hu-050) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-049 completada:** el Responsable SST registra y corrige la investigación de un evento (causas inmediatas y de fondo, conclusiones, quién investigó y cuándo), lo **cierra** solo con investigación y al menos una medida correctiva (RN-28) y descarta reportes inválidos con motivo opcional; el admin solo consulta | [Ver cambio](#cambio-2026-11-24-hu-049) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-047 completada en la web:** reportar un evento de forma anónima (cualquier persona de la empresa, también encuestados) con fecha y hora de Honduras, y lista y detalle de eventos para el admin y el Responsable SST; primer **campo de hora** del design system | [Ver cambio](#cambio-2026-11-24-hu-047-web) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-023 completada en la web:** pantallas del staff para mantener categorías, preguntas (tipo, peligro y opciones de exposición), peligros, rubros y plantillas de documento; se agrega la API de **plantillas de tarea** (controles sugeridos y tareas modelo) y la **navegación de sección** del design system | [Ver cambio](#cambio-2026-11-24-hu-023-web) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-097 completada:** contenido SST inicial (12 categorías en los 4 rubros, 34 preguntas de los 3 tipos, 21 peligros y 94 plantillas de tareas), cargado al arrancar sin duplicar ni pisar lo que edite el staff. **Pendiente: revisión por alguien con conocimiento de SST** | [Ver cambio](#cambio-2026-11-24-hu-097-catalogos) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-041 implementada:** historial de todas las evaluaciones de un riesgo (iniciales y residuales) con fecha y autor, y la vigente de cada tipo marcada | [Ver cambio](#cambio-2026-11-24-hu-041-historial) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-046 implementada:** filtrar el plan por estado, vencidas, responsable, origen, prioridad y fecha límite; las vencidas se cuentan y se filtran con un toque. Los enums de la consulta aceptan snake_case | [Ver cambio](#cambio-2026-11-24-hu-046-filtrar-plan) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-044 implementada:** "Mis tareas" para atender las tareas asignadas (pendiente, en progreso, completada y reabrir), solo por su responsable o el Responsable SST (**RN-24**), sin completar las que piden evidencia (**RN-25**) | [Ver cambio](#cambio-2026-11-24-hu-044-mis-tareas) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-043 implementada:** asignar responsable y fecha límite a cada tarea (solo personas activas de la empresa, sin encuestados), crear tareas manuales y marcar las vencidas; primer **campo de fecha** del design system en el código | [Ver cambio](#cambio-2026-11-24-hu-043-asignar) |
| 2026-11-24 | Equipo (redactado con Claude Code) | **HU-042 implementada:** generar el plan de trabajo desde los riesgos evaluados y sus controles (y las tareas modelo del peligro), revisarlo desmarcando tareas y confirmarlo sin duplicar; tabla `Tarea` creada en el código | [Ver cambio](#cambio-2026-11-24-hu-042-plan) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **HU-040 implementada:** evaluación residual (con los controles aplicados) guardada aparte de la inicial y mostrada a su lado, con la comparación de niveles | [Ver cambio](#cambio-2026-11-23-hu-040-residual) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **HU-039 implementada:** controles de un riesgo sugeridos desde las plantillas del peligro (aceptar, editar o descartar) o propios, y señal de los riesgos altos y críticos sin control (**RN-19**); `Control` gana `PlantillaTareaId` | [Ver cambio](#cambio-2026-11-23-hu-039-controles) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **HU-038 implementada:** mapa de la matriz (riesgos por celda de probabilidad × severidad) y lista filtrable por peligro, su clasificación, nivel y estado, con el nivel más alto primero | [Ver cambio](#cambio-2026-11-23-hu-038-ver-matriz) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **HU-037 implementada:** evaluar un riesgo (probabilidad × severidad) con la explicación de cada valor (**RN-80**, nueva), el nivel calculado y quién evaluó y cuándo | [Ver cambio](#cambio-2026-11-23-hu-037-evaluar-riesgo) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **HU-036 implementada:** agregar riesgos a la matriz (peligro del catálogo o descrito, con su actividad) y ver la lista de riesgos de la empresa | [Ver cambio](#cambio-2026-11-23-hu-036-agregar-riesgos) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **Design system:** colores de **riesgo** (semáforo de 4 niveles, iguales en claro y oscuro), **etiqueta de riesgo** y **mapa de calor** 5 × 5 para la matriz | [Ver cambio](#cambio-2026-11-23-design-system-riesgo) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **HU-035 completa:** confirmar o descartar los peligros sugeridos desde los resultados de la encuesta; el contrato pasa a la ruta implementada | [Ver cambio](#cambio-2026-11-23-hu-035-revisar-peligros) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **HU-022 implementada:** cambiar la contraseña con confirmación por correo (enlace firmado, de un solo uso y con vencimiento), también desde "¿Olvidaste tu contraseña?" | [Ver cambio](#cambio-2026-11-23-hu-022-cambio-contrasena) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **Design system:** cómo se adapta una **tabla con acción por fila** en celular (pantalla de personas, HU-021) | [Ver cambio](#cambio-2026-11-23-design-system-tabla-celular) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **Design system:** cómo se muestran los **peligros sugeridos** de una encuesta (HU-033) en la pantalla de resultados y qué badge lleva cada sugerencia | [Ver cambio](#cambio-2026-11-23-design-system-peligros-sugeridos) |
| 2026-11-23 | Equipo (redactado con Claude Code) | **Design system:** colores para datos (`--color-dato-serie` y `--color-dato-pista`, en claro y oscuro), cómo se muestran los **resultados de una encuesta** (lista de medidores, respuestas breves en orden alfabético) y una excepción del select para controles que se repiten por fila | [Ver cambio](#cambio-2026-11-23-design-system-datos) |
| 2026-11-22 | Jesús Zepeda | **HU-047 (backend)** implementada: reporte anónimo de eventos (`POST /api/eventos` para los 4 roles activos) y consulta con filtros para `admin_empresa` y `responsable_sst` (`GET /api/eventos`, `GET /api/eventos/{id}`), dejando evidencias marcadas como pendientes de `HU-100` | [Ver cambio](#cambio-2026-11-22-hu-047-backend) |
| 2026-11-22 | Equipo (redactado con Claude Code) | **Design system** en la documentación: decisiones y variables en `design-system.md`, guía visual publicable en `design-system/` (GitHub Pages) y componentes del MVP definidos (radio, área de texto, select, fecha, modal, confirmación, botón de peligro, badges de estado, estados de pantalla, pregunta de encuesta e íconos); el front usará Tailwind v4 sobre esas variables | [Ver cambio](#cambio-2026-11-22-design-system) |
| 2026-11-16 | Equipo (redactado con Claude Code) | **HU-033** implementada: peligros sugeridos a partir de las respuestas, registrados una sola vez como riesgos `sugerido` y con su respaldo calculado | [Ver cambio](#cambio-2026-11-16-hu-033) |
| 2026-11-16 | Equipo (redactado con Claude Code) | **HU-029** implementada: el Responsable SST ve las categorías de riesgo del rubro de su empresa con la vista previa de sus preguntas | [Ver cambio](#cambio-2026-11-16-hu-029) |
| 2026-11-16 | Equipo (redactado con Claude Code) | **HU-098** implementada: proyecto `Norvia.Tests` con 15 pruebas automáticas de aislamiento entre empresas, por la API y en la base, sobre un PostgreSQL desechable | [Ver cambio](#cambio-2026-11-16-hu-098) |
| 2026-11-16 | Equipo (redactado con Claude Code) | **HU-115** implementada: alta de encuestados individual y por lote, con contraseña temporal generada; el login informa `debeCambiarPassword` | [Ver cambio](#cambio-2026-11-16-hu-115) |
| 2026-11-15 | Jesús Zepeda | **HU-047 (M6) rediseñada como reporte anónimo:** se elimina `ReportadoPorId`, `Archivo.SubidoPorId` pasa a nullable para adjuntos de eventos, se agrega el tipo `condicion_insegura`, se habilita el estado `descartado` en HU-049 y se permite reportar al rol `encuestado` | [Ver cambio](#cambio-2026-11-15-hu-047-anonimo) |
| 2026-11-15 | Equipo (redactado con Claude Code) | **HU-021** implementada: listar los accesos de la empresa y cambiar rol o estado con motivo e historial, sin dejar a la empresa sin administrador | [Ver cambio](#cambio-2026-11-15-hu-021) |
| 2026-11-15 | Equipo (redactado con Claude Code) | **HU-020** implementada: `POST /api/vinculos` agrega una persona a la empresa de la sesión, creando su cuenta con contraseña temporal o reutilizando la existente | [Ver cambio](#cambio-2026-11-15-hu-020) |
| 2026-11-15 | Equipo (redactado con Claude Code) | **HU-114** implementada y **modificada**: la contraseña ahora exige al menos una mayúscula, un número y un carácter especial (antes no exigía combinaciones); endpoint `POST /api/auth/contrasena/establecer` | [Ver cambio](#cambio-2026-11-15-hu-114) |
| 2026-11-15 | Equipo (redactado con Claude Code) | **HU-023** implementada: el staff de plataforma mantiene rubros, categorías, peligros, preguntas (con tipo y opciones) y plantillas de documento en `api/<recurso>` (sin prefijo `plataforma`), con `PATCH` parcial y `PATCH …/estado` | [Ver cambio](#cambio-2026-11-15-hu-023) |
| 2026-11-15 | Jonathan | Doc **18**: anexo JSON (request/response) por endpoint MVP | Auth ✅ alineado a DTOs; resto 🚧 según modelo §4 |
| 2026-11-15 | Jonathan | Guías **17** (permisos/seed/Postman) y **18** (contratos API MVP Must/Should) | Enlazadas en `README.md`; mapeo HU → endpoint → `CatalogoPermisos` |
| 2026-11-15 | Jonathan | Auth: `DTOs/` + `Validators/` **por slice**; `Data/` solo `NorviaDbContext`; resto en `Persistence/` | Alineado a HabitForge (contexto en Data; contratos por feature) |
| 2026-11-15 | Jonathan | Auth: estructura de contratos y vertical slicing | Actualizado `16-arquitectura` §3 y regla `dto-sufijo` |
| 2026-11-15 | Jonathan | AccesoRecurso en vertical slicing: slice `PermitirAccesoRecurso/` + `IPermitirAccesoRecursoRepositorio` | Sin `IAutorizadorPermisos` en Common; repo por convención DI |
| 2026-11-15 | Jonathan | Convención de contratos: sufijo **`Dto`** | Alineado al código Auth (`*RequestDto`, `SesionResponseDto`) |
| 2026-11-13 | Equipo (redactado con Claude Code) | Guía de **Clean Architecture y Vertical Slicing** (`16-arquitectura-backend-frontend.md`) y evaluación de la rama `feature/acceso-auth`: servicio por caso de uso, repositorio por slice + unidad de trabajo, FluentValidation con middleware global | [Ver cambio](#cambio-2026-11-13-arquitectura) |
| 2026-11-13 | Equipo (redactado con Claude Code) | **Reducción de alcance** integrada con el rework de Jonathan: encuestas internas con versiones y 3 tipos, respuestas anónimas, cuentas de encuestados, sin áreas, M6 sin personas afectadas, notificaciones en Norvia y por correo; M7, M8 y M12 fuera (41 tablas, D26–D28, RN-68–79, HU-114–118) | [Ver cambio](#cambio-2026-11-13-reduccion-alcance) |
| 2026-11-13 | Jonathan | Rework de historias: redacción no técnica de los criterios, encuestas internas con versiones (`EncuestaVersion`) y 3 tipos de pregunta, política de contraseñas (HU-114) | Integrado en [este cambio](#cambio-2026-11-13-reduccion-alcance) |
| 2026-11-09 | Jesús | Archivo nativo editable **`docs/Diagramas.drawio`** (ERD Conceptual y Relacional Físico) y `.gitignore` | [Ver cambio](#cambio-2026-11-09-archivo-drawio) |
| 2026-11-09 | Jesús | Diagramas ERD y Relacional con tipos PostgreSQL exportables a draw.io en Mermaid (53 tablas, D25) | [Ver cambio](#cambio-2026-11-09-diagramas-drawio) |
| 2026-11-09 | Jonathan | Tablas **`Acceso`** y **`RefreshToken`**; credenciales fuera de vínculo/staff (D21/D25, RN-57/65–67); alineado a `ProyectoFinal/backend` | [Ver cambio](#cambio-2026-11-09-acceso) |
| 2026-11-09 | Jonathan | **`Permiso.Alcance`** (`empresa` \| `plataforma`) documentado y distinto de tabla **`StaffPlataforma`** (D24, RN-63/64) | [Ver cambio](#cambio-2026-11-09-permiso-alcance) |
| 2026-11-09 | Jonathan | Acceso por **vínculo** por empresa (sin login global); modelo **Persona**; producto **Norvia** | [Ver cambio](#cambio-2026-11-09) |

*(Cada fila nueva se agrega **arriba** de esta tabla.)*

---

## Cambio `2026-11-28-navegacion-marco` {#cambio-2026-11-28-navegacion-marco}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 2026-11-28 |
| **Alcance** | Diseño de la interfaz: navegación y layouts del frontend (primer lote del rediseño). Solo `design-system.md` y su guía visual. No cambia el modelo, las reglas, los permisos ni las historias. |

### El problema (por qué hubo que cambiar)

1. **No había menú.** El inicio era la única forma de pasar de un módulo a otro: una fila de hasta 14 botones iguales, sin rótulos.
2. **Diez pantallas no tenían forma de regresar** sin el botón atrás del navegador: el plan de trabajo y su tarea nueva, la lista de eventos, Mis tareas, Reportar un evento y las cinco listas de catálogos. Desde Catálogos, el staff no podía volver a su inicio.
3. **El 404 con sesión iniciada llevaba a la landing pública,** que ofrecía registrar una empresa o iniciar sesión a quien ya había entrado.
4. **"Volver" no nombraba varias pantallas** (el plan, los eventos, Mis tareas, los catálogos). Por ejemplo, al abrir un riesgo desde el plan, "Volver" llevaba a la matriz.
5. **El encabezado daba el mismo peso a la cuenta que al trabajo:** "Cambiar contraseña" y "Cerrar sesión" eran botones fijos, y en celular el encabezado ocupaba unos 190 px.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| Tres layouts | Público (barra con "Norvia"), empresa y plataforma (el mismo marco, con la empresa o "Plataforma Norvia") | Se reconoce de inmediato en qué sesión se está |
| Menú lateral por rol | En escritorio, un menú fijo con los destinos del rol. En celular, una barra superior de una fila y el mismo menú en un panel | Se cambia de módulo sin pasar por el inicio y siempre se ve dónde se está |
| Niveles de pantalla | Las pantallas del menú (nivel 1) no llevan "Volver"; los detalles y formularios (nivel 2), sí | "Volver" solo aparece donde hay un paso anterior que no está en el menú |
| Lista única de pantallas | Ruta, nombre y texto de "Volver" de cada pantalla. De ella salen el título de la pestaña ("{nombre} · Norvia") y los textos de "Volver" | Ninguna pantalla queda sin nombre, y el mismo destino se nombra igual en todos lados |
| Menú de cuenta | Cambiar o agregar la contraseña y cerrar sesión, al pie del menú | La cuenta deja de competir con el trabajo; el encabezado de celular pasa a una fila |
| 404 dentro del marco | Con sesión, el menú sigue a la vista y el link es "Ir al inicio". El título de la pestaña no nombra la pantalla pedida | Ya no se cae a la landing, y se sigue sin confirmar que algo existe |
| El admin también gestiona SST | Su menú incluye Gestión SST, como el del Responsable SST, más Personas | Coincide con los permisos actuales (decisión del 27-11-2026) |

### Cómo quedó (resumen)

`design-system.md` tiene tres secciones nuevas: § Layouts y navegación (layouts, niveles, lista única de pantallas, títulos, acción principal y menú por rol), § Menú lateral y § Menú de cuenta. Además cambian § Volver (cuándo va y los textos de ejemplo), § Estados de pantalla (el 404 con sesión) y las pantallas Empresas registradas y Auditoría, que ya no llevan "Volver" porque están en el menú. La guía visual muestra el marco de sesión.

Los títulos de cada pantalla, su acción principal, los estados vacíos y el contenido del inicio se revisan en los lotes siguientes. Mientras tanto, el inicio conserva sus botones.

### Qué hizo el equipo en la práctica

- Inventario de rutas y recorrido de la app con una cuenta por rol (27-11-2026).
- Propuesta del marco con prototipo, aprobada; propuesta del lote 1 con antes y después, aprobada.
- Implementación en la rama `feature/navegacion-lote-1-marco` del repositorio de código.
- Documentación en `design-system.md` y en la guía visual.

### Mapa rápido (archivos oficiales)

| Tema | Archivo |
|------|---------|
| Layouts, niveles, menú por rol, menú lateral y de cuenta | [design-system.md](design-system.md) § Layouts y navegación, § Menú lateral, § Menú de cuenta |
| "Volver" y 404 | [design-system.md](design-system.md) § Volver, § Estados de pantalla |
| Guía visual | [design-system/index.html](design-system/index.html) § Componentes y estados |

---

## Cambio `2026-11-27-activacion-por-codigo` {#cambio-2026-11-27-activacion-por-codigo}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 27 de noviembre de 2026 |
| **Alcance** | `08` (D21 ajustada, D28 ajustada, D30 nueva), `07` (RN-87 nueva, RN-78 ajustada), `09`, `12` (tabla renombrada y generalizada, columna `DebeCambiarPassword` eliminada, `CorreoEstado` con `en_proceso`, trazabilidad), `10` (HU-020, HU-022, HU-115, HU-117, HU-118), `11`, `18` (contratos de login, `/api/vinculos` y `/api/vinculos/encuestados[/lote]`). También el código: backend y frontend (`ProyectoFinal/`) y una migración nueva |

### El problema (por qué hubo que cambiar)

1. El correo por SMTP (Google, 587/STARTTLS) seguía siendo poco confiable desde el hosting en la nube: entregas lentas o que nunca llegaban, sin un error claro que lo explicara.
2. Al revisar el envío de correos se notó que las notificaciones de M11 (tarea asignada, política publicada) solo se intentaban enviar cuando corría el proceso de fondo (cada 30 s), nunca al crearse; y que no había manera de que la persona pidiera un reintento inmediato sin esperar ese ciclo.
3. El alta de personas (registro de empresa, HU-020, HU-115) seguía dándole una contraseña temporal a quien la creaba (el administrador la escribía o Norvia la generaba), distinto del código de 6 dígitos que ya existía para el registro con Microsoft (D29): dos mecanismos de activación para el mismo problema.
4. Una vez migrado el envío a Resend, se detectó que el enlace del correo de activación apuntaba a una ruta inexistente del frontend (`/activar-cuenta`) en vez de la ruta real (`/verificar-cuenta`).

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| Envío de correo por la API de Resend, no por SMTP | `SmtpEnvioCorreo` se elimina; `ResendEnvioCorreo` llama `POST https://api.resend.com/emails` con un `HttpClient` tipado | Un proveedor hecho para envío transaccional, sin depender de una cuenta de Gmail ni de una conexión SMTP saliente desde el hosting |
| Envío inmediato de notificaciones (D28, RN-78) | Al crear la notificación se intenta el correo de una vez (mejor esfuerzo); si falla, queda `pendiente` para el proceso de fondo, que sigue activo como respaldo | El correo sale lo antes posible sin perder el reintento automático que ya existía |
| Botón "Reintentar" por notificación | Dispara el mismo intento inmediato a pedido, sin esperar al proceso de fondo (HU-117) | La persona no depende del siguiente ciclo del proceso para forzar un reenvío |
| Estado `en_proceso` en `CorreoEstado` | Guardo atómico: una fila solo pasa de `pendiente`/`fallido` a `en_proceso` si nadie más la tomó ya | El botón y el proceso de fondo nunca envían la misma notificación a la vez |
| Tabla **VerificacionCorreoMicrosoft** generalizada a **VerificacionCorreo** (D30) | Gana `Proposito` (`microsoft` o `activacion_cuenta`) y `AccesoId` opcional; mismo `CodigoHash`, `Intentos`, `ExpiraEn` y ventana de envíos que ya tenía | Un solo mecanismo de código de 6 dígitos para las dos activaciones, en vez de duplicar la lógica |
| Eliminar la contraseña temporal (RN-87) | `Acceso.DebeCambiarPassword` desaparece; una cuenta local nueva queda con `PasswordHash` nulo hasta activarse con su código, igual que una cuenta de Microsoft queda sin contraseña hasta vincularla | Nadie, ni quien da el alta, conoce la contraseña de otra persona; un solo flujo de activación para registrar empresa, dar un vínculo o crear un encuestado |

### Cómo quedó (resumen)

El modelo sigue en las mismas tablas (la que cambió es **VerificacionCorreo**, generalización de **VerificacionCorreoMicrosoft**; no se agregó ni se quitó ninguna tabla). `Acceso` perdió `DebeCambiarPassword`. `Notificacion.CorreoEstado` gana el valor `en_proceso`. `POST /api/vinculos` y `POST /api/vinculos/encuestados[/lote]` ya no reciben ni devuelven una contraseña: devuelven `cuentaNueva` y `correoActivacionEnviado`. El login (`SesionResponseDto`) ya no lleva `debeCambiarPassword`. Variables nuevas en `example.env`: `Correo__ApiKeyResend`, `Correo__Remitente`, `Correo__RemitenteNombre`, `Correo__UrlBaseFrontend` (reemplazan al bloque SMTP).

### Qué hizo Claude Code en la práctica

- Siguió la cadena de verdad `08 → 07 → 09 → 12 → 10 → 14 → 11` y además actualizó `18` (contratos afectados).
- En el backend: reemplazó `SmtpEnvioCorreo` por `ResendEnvioCorreo` (typed `HttpClient`), quitando las dependencias `MailKit`/`MimeKit`; generalizó la entidad y la tabla `VerificacionCorreo` (migración nueva); quitó `GeneradorContrasenaTemporal` y `Acceso.DebeCambiarPassword`; unificó `AltaDeVinculo`, `RegistrarEmpresaServicio`, `VerificarCuentaServicio` y `ReenviarVerificacionCuentaServicio` al código de 6 dígitos; agregó el intento inmediato de correo (`IEnvioInmediatoNotificacion`) con guardo atómico y el endpoint de reintento manual (`POST /api/notificaciones/{id}/reintentar-correo`); corrigió el enlace del correo de activación para que apunte a `/verificar-cuenta` (antes `/activar-cuenta`, ruta que no existía en el frontend).
- Arregló además un bug de `PlantillasCorreoSeeder` (comparaba las plantillas por `Codigo` en vez de por `Id`, la llave real) que impedía que la plantilla `activacion_cuenta` llegara a crearse en la base, dejando el envío sin plantilla.
- En el frontend: quitó por completo el flujo de contraseña temporal (pantalla de "Cambiar contraseña" forzada, generador de contraseña, descarga de CSV con contraseñas del lote) y reescribió `VerificarCuentaPage` y los formularios de alta de personas para el código de 6 dígitos, reutilizando el patrón ya probado de `VerificarCorreoMicrosoft` (validación, reenvío y mensajes de error).
- Actualizó las pruebas de integración afectadas (infraestructura de pruebas incluida) y confirmó `dotnet build` y `dotnet test` en verde (289 pruebas), y en el frontend `tsc -b`, `eslint` y `vite build` sin errores.
- Pendiente: reimportar los diagramas en `Diagramas.drawio` (ya desfasado desde antes) y que el equipo revise la redacción del correo de activación.

### Seguimiento por historia

| HU | Doc en repo | Tablero |
|----|-------------|---------|
| HU-020 | `10` | [ ] |
| HU-022 | `10` | [ ] |
| HU-115 | `10` | [ ] |
| HU-117 | `10` | [ ] |
| HU-118 | `10` | [ ] |

#### HU-020 | Agregar personas a la empresa

| **Antes** | El administrador escribía o generaba una contraseña temporal para la cuenta nueva. |
| **Ahora** | La cuenta nueva no recibe contraseña de nadie: le llega un código de 6 dígitos para activarse (D30, RN-87). |

#### HU-022 | Cambiar mi contraseña

| **Antes** | Mencionaba que, si se usaba una contraseña temporal, se pedía cambiarla en el primer ingreso. |
| **Ahora** | Ya no hay contraseña temporal que cambiar: la cuenta nueva se activa directo con su contraseña definitiva. |

#### HU-115 | Crear cuentas de encuestados

| **Antes** | El acceso inicial requería cambiar la contraseña en el primer ingreso; en el lote, Norvia generaba una contraseña por cuenta nueva y la devolvía una sola vez. |
| **Ahora** | La cuenta nueva no recibe contraseña de nadie: se activa con el código de 6 dígitos, individual o por lote. |

#### HU-117 | Consultar notificaciones

| **Antes** | Solo mostraba las notificaciones y permitía marcarlas como leídas. |
| **Ahora** | Si el correo de una notificación no se envió, se puede pedir que se reintente de inmediato. |

#### HU-118 | Configurar el envío de correos

| **Antes** | El correo de una notificación solo se intentaba cuando corría el proceso de fondo, por SMTP. |
| **Ahora** | Se envía por la API de Resend y se intenta de inmediato al crearse; el proceso de fondo y el botón de reintento manual quedan como respaldo, sin pisarse entre sí. |

### Mapa rápido (archivos oficiales)

| Tema | Archivo |
|------|---------|
| Decisiones D21, D28, D30 | `08-decisiones-bd.md` |
| Reglas RN-78, RN-87 | `07-reglas-negocio.md` |
| Tabla VerificacionCorreo | `12-modelo-datos.md` §4.1 |
| Historias HU-020, HU-022, HU-115, HU-117, HU-118 | `10-historias-usuario.md` |
| Contratos de API | `18-contratos-api-mvp.md` |

---

## Cambio `2026-11-26-hu-075` {#cambio-2026-11-26-hu-075}

| | |
|---|---|
| **Quién documentó** | Jesús Zepeda |
| **Fecha** | 26 de noviembre de 2026 |
| **Alcance** | Rama `feature/hu-075`: helper compartido `ArmadorMatriz` reutilizado por `ObtenerMatrizServicio` y `ObtenerReporteMatrizServicio`, slice `ObtenerReporteMatriz` (`GET /api/riesgos/matriz/reporte` con permiso `riesgo.matriz.reporte`), `RiesgosController`, 3 pruebas en `ReporteMatrizTests`, tipos/API de `riesgos`, `<LeyendaNiveles />` y modo `soloLectura` en `MapaMatriz`, botón **"Imprimir o descargar PDF"** en `RiesgosPage`, pantalla `/riesgos/imprimir` (`ImprimirMatrizPage`), hoja apaisada `@page matriz` y `@media print` en `index.css`, `router.tsx`, `historialVolver.ts` y actualización de `18-contratos-api-mvp.md`, `16-arquitectura-backend-frontend.md` y `design-system.md`. No requiere migración de BD |

### Qué se decidió y por qué

1. **Endpoint consolidado + impresión web (`16-arquitectura §9`, `HU-074`):** en lugar de añadir dependencias nativas pesadas de PDF en .NET ni hacer N+1 peticiones desde React para leer controles, `GET /api/riesgos/matriz/reporte` entrega en una sola consulta al vuelo la fecha del servidor (`IReloj`), el perfil de la empresa, el mapa de calor 5 × 5 (`ArmadorMatriz`) y todos los riesgos `confirmado` con su última evaluación inicial, última residual y controles ordenados según `RN-21`.
2. **Matriz oficial completa y permisos M4 (`RN-05`, `RN-18`):** accesible para `admin_empresa` y `responsable_sst` (`403` para `colaborador` y `encuestado`). Incluye siempre todos los riesgos `confirmado` (excluyendo `sugerido`, `descartado` y filtros temporales de pantalla).
3. **Impresión apaisada aislada (`@page matriz`):** `/riesgos/imprimir` aplica `page: matriz` (`size: landscape; margin: 12mm`) con `print-color-adjust: exact` para `.cuadro-riesgo`, `.insignia` y celdas del mapa sin alterar la orientación vertical de `HU-074` (`DocumentoVigentePage`).

### Verificación

- Backend: `dotnet test backend\Norvia.slnx --no-build --disable-build-servers -m:1` → **270/270 pruebas aprobadas** (`Duración: 2 m 3 s`, incluidas 3 pruebas nuevas en `ReporteMatrizTests`).
- Frontend: `eslint .`, `tsc -b` y `vite build` → **0 errores** (`built in 1.94s`), más prueba E2E en Google Chrome (`http://localhost:5173/` contra `Norvia.API` y PostgreSQL local): verificación con Responsable SST, Administrador de empresa y Colaborador sobre `/riesgos` → `/riesgos/imprimir` (`GET /api/riesgos/matriz/reporte` `200 OK`, exclusión de 10 riesgos no confirmados, controles ordenados por jerarquía `RN-21` tras alta inversa, evaluación inicial/residual, retorno a `/riesgos` y bloqueo al Colaborador sin errores de consola/API; emulación CSS `@media print` verificada por inspección del código al no estar expuesta en Chrome DevTools MCP).

---

## Cambio `2026-11-26-hu-099` {#cambio-2026-11-26-hu-099}

| | |
|---|---|
| **Quién documentó** | Jesús Zepeda |
| **Fecha** | 26 de noviembre de 2026 |
| **Alcance** | Rama `feature/hu-099`: entidad `RegistroAuditoria` (`ITieneEmpresa`), configuración `RegistroAuditoriaConfiguration` con FK compuesta `(EmpresaId, VinculoEmpresaId)`, interceptor `ProtegerRegistroAuditoriaInterceptor`, migración `AgregarRegistroAuditoriaHu099`, servicio transversal `Auditor` e instrumentación de 23 servicios de M1–M9, permiso `auditoria.listar` (`GET /api/auditoria`), 7 pruebas nuevas (5 en `AuditoriaAccionesTests` y 2 en `AislamientoBaseDatosTests`), vista `/auditoria` (`AuditoriaPage`), botón en `InicioPage`, ruta en `router.tsx`, `historialVolver.ts` y actualización de `10-historias-usuario.md`, `18-contratos-api-mvp.md` y `design-system.md` |

### Qué se decidió y por qué

1. **Inalterabilidad sin triggers SQL:** siguiendo `16-arquitectura-backend-frontend.md`, `RegistroAuditoria` evita triggers en migración; la protección contra `Modified` y `Deleted` recae en `ProtegerRegistroAuditoriaInterceptor` registrado en el `DbContext` (y no se exponen endpoints de escritura).
2. **Aislamiento multiempresa y atomicidad:** `RegistroAuditoria` implementa `ITieneEmpresa` (filtro global + `AsignarEmpresaInterceptor`) y FK compuesta `(EmpresaId, VinculoEmpresaId)` hacia `VinculoEmpresa`. `Auditor.Registrar` encola la evidencia en la misma unidad de trabajo que la acción de origen: si falla la operación, no queda rastro huérfano.
3. **Respeto estricto al anonimato (`RN-72`, `D11`) y búsqueda sobre `jsonb`:** nunca se auditan `ResponderEncuesta` ni `ReportarEvento`. En `ListarAuditoriaRepositorio`, la búsqueda de texto libre combina `EF.Functions.ILike` en campos de texto con una subconsulta `FromSqlInterpolated` con cast `"Detalle"::text ILIKE ... ESCAPE '!'` filtrada automáticamente por `HasQueryFilter`, evitando el error de PostgreSQL `jsonb ~~* text`.
4. **Pendiente al integrar con M9 completo:** en esta rama (basada en `development`) no existe aún `CrearVersionNuevaServicio` de `feature/hu-073`; al integrar ambas ramas conviene agregar su llamada a `Auditor.Registrar`.

### Verificación

- Backend: `dotnet test backend\Norvia.slnx --no-build --disable-build-servers -m:1` → **274/274 pruebas aprobadas** (`Duración: 2 m 1 s`, incluyendo 5 en `AuditoriaAccionesTests` y 2 nuevas en `AislamientoBaseDatosTests`).
- Frontend: `eslint .`, `tsc -b` y `vite build` → **0 errores** (`built in 1.94s`), más prueba E2E en Google Chrome (`http://localhost:5173/` contra `Norvia.API` y PostgreSQL local con migración aplicada): flujo completo con Responsable SST, Administrador y Colaborador (`9` registros cronológicos reales entre encuestas, riesgos/evaluaciones, documentos, perfil y vínculos; exclusión verificada de reportes anónimos `D11`; filtros por entidad, texto en `Detalle` y rango de fechas en Honduras; enlace cruzado con retorno "Volver a auditoría"; y bloqueo de acceso a rol Colaborador sin errores de consola ni de API).

---

## Cambio `2026-11-26-hu-034` {#cambio-2026-11-26-hu-034}

| | |
|---|---|
| **Quién documentó** | Jesús Zepeda |
| **Fecha** | 26 de noviembre de 2026 |
| **Alcance** | Rama `feature/hu-034`: permisos `encuesta.historial` y `encuesta.comparar`, helper compartido `AgregadorReporteVersion`, slices `ListarHistorialEncuestas` y `CompararEncuestas`, soporte de `?versionId=` en `ObtenerReporteEncuesta`, `versionesPublicadas` en `ObtenerEncuesta`, 5 pruebas de integración en `HistorialYComparacionEncuestasTests`, vistas web `/encuestas/historial`, `/encuestas/comparar` y selector histórico en `/encuestas/:id/resultados`, más actualización de `18-contratos-api-mvp.md` y `design-system.md`. Sin migración de BD |

### Qué se decidió y por qué

1. **Alcance de historial vs comparación (`D8`, `RN-12`):** `GET /api/encuestas/historial` lista por defecto encuestas cerradas o con versiones reemplazadas, mostrando fechas, categorías, versiones y respuestas anónimas (con filtro `?buscar=` por título o categoría). El parámetro `?incluirVigentes=true` permite que `/encuestas/comparar` contraste una encuesta cerrada previa contra una encuesta vigente actual (`v1` publicada) además de versiones anteriores dentro de una misma encuesta.
2. **Reporte por versión y emparejamiento sin alterar respuestas pasadas:** `GET /api/encuestas/{id}/reporte?versionId=` acepta versiones `publicada` o `reemplazada` (rechaza borradores con `409`). En `/api/encuestas/comparacion`, al tener cada copia sus propios UUID (`RN-12`), las preguntas de selección se emparejan en dos pasadas (por `PreguntaExploratoriaId` + tipo, y luego por texto normalizado + tipo) y sus opciones por texto normalizado; además calcula la exposición por peligro en cada versión y conserva los estados de `RiesgoEmpresa` (`sugerido` / `confirmado` / `descartado`).
3. **Privacidad (`RN-73`) y anonimato (`RN-72`):** si cualquiera de las versiones comparadas o consultadas tiene menos de 3 respuestas anónimas, se ocultan las distribuciones y porcentajes de exposición.

### Verificación

- Backend: `dotnet test backend\Norvia.slnx --no-build --disable-build-servers -m:1` → **272/272 pruebas aprobadas** (incluidas 5 pruebas nuevas en `HistorialYComparacionEncuestasTests`).
- Frontend: `eslint .`, `tsc -b` y `vite build` → **0 errores** (`built in 1.94s`), más verificación E2E en Google Chrome (`Responsable SST` y bloqueo a `Colaborador`, conservando `replace: true` al cambiar de versión o comparar).

---

## Cambio `2026-11-26-hu-024` {#cambio-2026-11-26-hu-024}

| | |
|---|---|
| **Quién documentó** | Jesús Zepeda |
| **Fecha** | 26 de noviembre de 2026 |
| **Alcance** | Rama `feature/hu-024`: endpoint `GET /api/plataforma/empresas` con permiso `empresa.listar`, slice `ListarEmpresasPlataforma`, pruebas en `ListarEmpresasPlataformaTests`, pantalla `/empresas` y enlace en `/inicio` (`EmpresasRegistradasPage`), y actualización de `10-historias-usuario.md`, `18-contratos-api-mvp.md` y `design-system.md`. No hay migración de BD |

### Qué se decidió y por qué

1. **Filtro global al consultar conteos de plataforma:** `VinculoEmpresa` implementa `ITieneEmpresa`, así que en una sesión de plataforma (`EmpresaIdActual = null`) el filtro global devolvería `0` vínculos. Se aplicó `IgnoreQueryFilters()` justificado exclusivamente en `ListarEmpresasPlataformaRepositorio` para contar vínculos `Activo` agregados por empresa sin leer ninguna tabla SST (`RN-05`).
2. **Consulta para todo el staff (`admin_plataforma` y `soporte_plataforma`):** alineado con `05-actores-roles.md` y los `GET` de catálogos (`HU-023`), ambos roles ven uso básico de plataforma (`razonSocial`, `rubroNombre`, `estado`, `registradaEn`, `vinculosActivos`); las sesiones de empresa reciben `403`.
3. **Filtro y métricas en `/empresas`:** `?buscar=` (hasta 100 caracteres) filtra por razón social o rubro, e indicadores arriba muestran total de empresas y total de accesos vigentes.

### Verificación

- Backend: `dotnet test backend\Norvia.slnx` → **270/270 pruebas aprobadas** (incluyendo 3 pruebas nuevas en `ListarEmpresasPlataformaTests`).
- Frontend: `eslint .`, `tsc -b` y `vite build` → **0 errores**.

---

## Cambio `2026-11-25-hu-073` {#cambio-2026-11-25-hu-073}

| | |
|---|---|
| **Quién documentó** | Jesús Zepeda |
| **Fecha** | 25 de noviembre de 2026 |
| **Alcance** | Rama `feature/hu-073`: 3 casos de uso backend (`CrearVersionNueva`, `ListarVersiones`, `ObtenerVersion`) con permisos `documento.version.crear`, `documento.version.listar` y `documento.version.ver`, pruebas en `CrearVersionNuevaTests`, flujo web (`DocumentoPage`, `EditarBorradorPage`, `HistorialVersiones`, `VersionDocumentoPage`, `router.tsx`) y actualización de `18-contratos-api-mvp.md` y `design-system.md`. El modelo de datos no cambia y no hay migración |

### Qué se decidió y por qué

1. **Sin cambios de esquema:** `VersionDocumento` ya garantiza un único `vigente` (`RN-51`), un único `borrador` y `UQ (DocumentoId, NumeroVersion)`. Al crear una versión nueva se copia el Markdown íntegro de la `vigente` como `borrador` con `NumeroVersion = max + 1`, mientras la `vigente` sigue publicada en `/api/documentos/vigentes` hasta aprobar la nueva (`HU-072`).
2. **Consulta de versiones anteriores:** `GET /api/documentos/{id}/versiones` devuelve el historial liviano (sin contenido) en orden descendente y `GET /api/documentos/{id}/versiones/{versionId}` devuelve el `DocumentoDetalleResponseDto` completo para cualquier versión (`reemplazada`, `vigente` o `borrador`), accesible para `admin_empresa` y `responsable_sst`.
3. **Flujo web alineado al design system:** en `/documentos/{id}`, el Responsable SST ve "Crear nueva versión" cuando el documento está vigente; tras el diálogo de confirmación, entra directo al editor (`/documentos/{id}/editar`) con un aviso de éxito. Debajo del documento, `HistorialVersiones` aparece cuando hay más de una versión y abre cada versión anterior en la pantalla dedicada de solo lectura `/documentos/{id}/versiones/{versionId}` con `Volver al documento`.

### Verificación

- Backend: `dotnet test backend\Norvia.slnx` → **271/271 pruebas aprobadas** (incluidas las 4 pruebas nuevas de `CrearVersionNuevaTests` cubriendo copia desde vigente, ciclo v1→v2→v3 y consulta histórica, conflictos `409 documentos.ya_tiene_borrador`, permisos por rol y aislamiento multiempresa).
- Frontend: `eslint .`, `tsc -b` y `vite build` sin errores.

---

## Cambio `2026-11-25-hu-074` {#cambio-2026-11-25-hu-074}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 25 de noviembre de 2026 |
| **Alcance** | `10-historias-usuario.md` (tarea de backend de HU-074), `18-contratos-api-mvp.md` (contratos de los vigentes, bandeja de notificaciones con `documentoId` y retiro de `api/politicas/vigentes`), `design-system.md` y la guía visual (documentos vigentes y "Descargar PDF"). En el código: dos casos de uso con sus permisos, el documento en la notificación, pruebas, dos pantallas, estilos de impresión y el enlace desde el inicio y la notificación. El modelo de datos no cambia y no hay migración |

### El problema (por qué hubo que cambiar)

1. Una política aprobada (HU-072) solo la veían el admin y el Responsable SST, en la pantalla de trabajo, donde también están los borradores.
2. La notificación de una política nueva (HU-116) no tenía a dónde llevar: el colaborador y el encuestado no tienen acceso a `/documentos/{id}`.
3. El catálogo de permisos tenía un permiso provisional `politica.vigentes` (`api/politicas/vigentes`, solo para el encuestado) sin endpoint, y el contrato provisional de los vigentes usaba otros nombres (`tipo`, `versionNumero`).

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Consulta aparte, solo con lo publicado** | `GET api/documentos/vigentes` y `GET api/documentos/vigentes/{id}`: solo versiones vigentes, sin plantilla, sin quién generó el borrador. Si el documento solo tiene borrador, 404 | Todas las personas leen la política sin ver lo que todavía se está revisando (RN-05, HU-074) |
| **Para los cuatro roles** | Permisos `documento.vigentes` y `documento.vigente.ver`; se retira `politica.vigentes` | La HU es para todo operador con vínculo, y el encuestado consulta las políticas vigentes (RN-74). También se muestran los procedimientos |
| **Búsqueda por nombre en el servidor** | `?buscar=` filtra por título sin distinguir mayúsculas, hasta 100 caracteres | Igual que la búsqueda de la matriz (HU-038) |
| **PDF desde la impresión del navegador** | "Descargar PDF" abre el diálogo de impresión, que guarda el PDF o lo imprime; se imprime solo el documento | Ya estaba acordado en 16-arquitectura §9; no agrega librerías y no se guarda ningún archivo |
| **La notificación lleva el documento** | La bandeja agrega `documentoId` a cada aviso de política; "Ver la política" abre su versión vigente | Si después se aprueba otra versión, la persona ve la más nueva, que es la que rige |

### Cómo quedó (resumen)

- **API:** los dos endpoints de vigentes y `documentoId` en `GET api/notificaciones`. La lista va primero con las políticas y después con los procedimientos, cada grupo por título.
- **Web:**
  - **Inicio:** enlace "Políticas y procedimientos" para todas las personas de la empresa.
  - **`/documentos-vigentes`:** buscador, una card por documento con tipo, versión y fecha. Estado vacío sin buscador, y "sin resultados" con "Quitar la búsqueda".
  - **`/documentos-vigentes/{id}`:** el documento con versión, fecha y quién lo aprobó, y el botón "Descargar PDF".
  - **Notificaciones:** el aviso de una política nueva tiene el enlace "Ver la política".

### Trabajo hecho

- **3 pruebas nuevas en el backend:**
  - el colaborador y el encuestado ven solo las vigentes, en orden, sin la versión reemplazada ni el borrador ni lo de otra empresa, y buscan por nombre;
  - la búsqueda no acepta más de 100 caracteres;
  - la notificación de una política lleva el documento y abre su vigente.

  Pasan las 267 pruebas.
- **La web se probó de punta a punta contra la API real** con una empresa de prueba (admin, Responsable SST, colaborador y encuestado), que después se borró:
  - el encuestado entra desde el inicio y ve solo la vigente;
  - la búsqueda filtra, muestra "sin resultados" y se quita;
  - "Descargar PDF" abre la impresión y el PDF contiene solo el documento;
  - la notificación abre la política vigente;
  - en celular no hay desplazamiento horizontal;
  - el colaborador no puede abrir un borrador;
  - sin vigentes, se ve el estado vacío.

| HU | Antes | Ahora |
|---|---|---|
| HU-074 | Sin construir; contrato provisional con otros nombres | Todas las personas consultan y buscan las versiones vigentes y las descargan en PDF |
| HU-116 | El aviso se creaba al aprobar, pero no llevaba a la política | El aviso abre la versión vigente de la política; la historia queda completa |

---

## Cambio `2026-11-25-hu-072` {#cambio-2026-11-25-hu-072}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 25 de noviembre de 2026 |
| **Alcance** | `07-reglas-negocio.md` (RN-49), `12-modelo-datos.md` (VersionDocumento y §9), `10-historias-usuario.md` (HU-072 y sus tareas), `16-arquitectura-backend-frontend.md` §5 (guardar en pasos dentro de una transacción), `18-contratos-api-mvp.md` (contrato de `POST api/documentos/{id}/aprobacion`), `design-system.md` y la guía visual (acciones del borrador y diálogo de aprobar). En el código: un caso de uso con su permiso, pruebas y el botón con su confirmación en el documento. El modelo de datos no cambia y no hay migración |

### El problema (por qué hubo que cambiar)

1. Un documento se generaba (HU-070) y se editaba (HU-071), pero nunca llegaba a estar vigente.
2. El aviso de política nueva (HU-116) ya tenía su texto en el código, pero nada lo disparaba.
3. Nada impedía aprobar un documento con `[Completar: dirección]`; como la versión aprobada ya no cambia, el texto pendiente quedaría para siempre en la política vigente.
4. El contrato provisional respondía `{ id, estado, aprobadoEn }`, distinto del resto del módulo.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **No se aprueba con datos por completar (RN-49)** | Si el borrador tiene un `[Completar: …]`, responde 409 `documentos.por_completar`. En la web, el botón "Aprobar" no aparece y el aviso dice "Cuando no falte ninguno, podrás aprobarlo." | La versión aprobada no se edita (RN-50): un dato pendiente quedaría en la versión vigente |
| **Una sola vigente (RN-51)** | Si ya hay una vigente, pasa a `reemplazada` antes de que el borrador quede vigente | Deja listo el camino de la versión nueva (HU-073) |
| **Guardar en dos pasos dentro de una transacción** | `IUnidadDeTrabajo.EnTransaccionAsync`: primero se guarda la anterior como reemplazada y luego el borrador como vigente; se confirman juntos | PostgreSQL revisa el valor único "una vigente por documento" en cada cambio, y EF no garantiza el orden: una prueba lo mostró fallando según el orden de los id |
| **Aviso de política (RN-75, HU-116)** | Al aprobar una `politica`, una notificación para cada vínculo activo de la empresa, también quien aprueba; un procedimiento no avisa. Se guarda con la aprobación y el correo sale después, con reintentos (RN-78) | Si la aprobación falla, no queda un aviso suelto; si el correo falla, la aprobación no se pierde |
| **Respuesta igual al resto del módulo** | Devuelve el `DocumentoDetalleResponseDto` con la versión ya vigente | La web muestra el resultado sin otra consulta y con los mismos tipos |
| **Confirmación antes de aprobar** | Diálogo "¿Aprobar «título»?" con la consecuencia; botón principal, no de peligro | Aprobar no se deshace, pero no quita nada (design-system § Diálogo de confirmación) |
| **Solo el Responsable SST** | Permiso `documento.aprobar`; el admin consulta | Igual que generar y editar (05-actores-roles) |

### Cómo quedó (resumen)

- **API:** `POST api/documentos/{id}/aprobacion`, sin body. Responde 404 si es de otra empresa o no existe, y 409 `documentos.sin_borrador` si ya está aprobado.
- **Web:** en `/documentos/{id}`, para el Responsable SST y solo si es un borrador:
  - **Con datos por completar:** solo "Editar borrador", principal.
  - **Sin datos por completar:** "Editar borrador" secundario y "Aprobar" principal.
  - **Diálogo:** "Quedará vigente y ya no se podrá editar." (o "Reemplazará a la versión vigente…") y, si es una política, que Norvia avisará en Norvia y por correo a las personas con acceso vigente.
  - **Al aprobar:** aviso de éxito y el documento ya vigente, con quién lo aprobó y cuándo y sin acciones.
  - **Si alguien lo aprobó antes:** aviso de error con lo que pasó y el documento como quedó.
- **Notificaciones:** el aviso aparece en la bandeja (HU-117). **Pendiente:** abrir la política desde el aviso necesita la pantalla de documentos vigentes (HU-074), porque el colaborador y el encuestado no tienen acceso a `/documentos/{id}`.

### Trabajo hecho

- **6 pruebas nuevas en el backend:**
  - una política aprobada queda vigente con quién y cuándo, avisa a cada vínculo activo (no al suspendido), y después no se edita ni se aprueba otra vez;
  - un procedimiento se aprueba sin avisos;
  - no se aprueba con datos por completar;
  - la vigente anterior pasa a reemplazada, con los id en los dos órdenes;
  - solo el Responsable SST de la empresa aprueba.

  Pasan las 264 pruebas.
- **La web se probó de punta a punta contra la API real** con una empresa de prueba, que después se borró:
  - con datos por completar no aparece "Aprobar";
  - completados los datos, aparecen los dos botones;
  - cancelar el diálogo no aprueba;
  - al aprobar, queda vigente, sin acciones y con dos avisos creados;
  - el admin ve la notificación de la política;
  - en celular no hay desplazamiento horizontal;
  - si otra persona lo aprobó antes, se muestra el error y el documento como quedó.

| HU | Antes | Ahora |
|---|---|---|
| HU-072 | Sin construir; contrato provisional con otra respuesta | El Responsable SST aprueba el borrador sin datos pendientes; queda vigente, reemplaza a la anterior y, si es política, avisa |
| HU-116 | El texto del aviso existía, pero nada lo creaba | Aprobar una política crea el aviso para cada vínculo activo, en Norvia y por correo. Falta el enlace a la política (llega con HU-074) |

---

## Cambio `2026-11-25-hu-071` {#cambio-2026-11-25-hu-071}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 25 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (contrato de `PUT api/documentos/{id}/borrador`), `design-system.md` y la guía visual (sección "Editor de documento", excepción del área de texto y botón "Editar borrador"). En el código: un caso de uso con su permiso, pruebas, la pantalla del editor y el botón en el documento. El modelo de datos no cambia y no hay migración |

### El problema (por qué hubo que cambiar)

1. Un documento generado (HU-070) quedaba como borrador con datos por completar, como `[Completar: dirección]`, pero no había cómo corregirlo ni adaptarlo a la empresa.
2. El contrato provisional usaba `contenidoMarkdown` y respondía "documento actualizado" sin definir la forma.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Se reemplaza el contenido completo** | `PUT api/documentos/{id}/borrador` con `{ "contenido": "…" }`: obligatorio, sin quedar en blanco y de hasta 50 000 caracteres | Simple y sin estados intermedios; las plantillas iniciales tienen unos 4000 caracteres |
| **Solo el borrador (RN-50)** | Si el documento no tiene borrador (su versión está aprobada), responde 409 `documentos.sin_borrador` | La versión aprobada nunca cambia; una edición después de aprobar llega con la versión nueva (HU-073) |
| **Los marcadores ya no se reemplazan** | Un `{{RazonSocial}}` escrito al editar queda tal cual | Reemplazar es parte de generar (HU-070); así el borrador muestra exactamente lo que se guardó |
| **Texto normalizado** | Los saltos de línea se guardan como `\n` y se quitan los espacios del final; si no cambió nada, no se escribe | El mismo contenido se guarda igual desde cualquier navegador o sistema |
| **Solo el Responsable SST** | Permiso `documento.editar`; el admin consulta | Igual que generar (05-actores-roles) |
| **Editor con vista previa al lado** | En escritorio, dos columnas; en celular, la vista previa debajo. El área de texto crece con todo el documento | Se ve cómo quedará mientras se escribe (criterio de HU-071) sin dos barras de desplazamiento |
| **Aviso al salir sin guardar** | Dentro de Norvia, diálogo de confirmación; al recargar o cerrar la pestaña, el aviso del navegador | Un documento largo no se pierde por un clic en "Volver" |

### Cómo quedó (resumen)

- **API:** `PUT api/documentos/{id}/borrador` devuelve el `DocumentoDetalleResponseDto` con `porCompletar` recalculado. Otra empresa o un documento inexistente responden 404.
- **Web:**
  - **Botón "Editar borrador":** en `/documentos/{id}`, para el Responsable SST y solo si la versión es un borrador.
  - **`/documentos/{id}/editar`:** el contenido con su contador y la ayuda del formato, la vista previa con "N datos por completar" y los botones "Cancelar" y "Guardar borrador".
  - **Al guardar:** vuelve al documento con "Se guardaron los cambios del borrador." y los avisos actualizados. "Volver" desde ahí lleva a la lista.
  - **Sin borrador:** el editor lo explica con un aviso.
- **Compartido:** `porCompletar` (`shared/documentos/`) cuenta los `[Completar: …]` igual que el backend. El `Contador` ya no parte su cifra en dos líneas.

### Trabajo hecho

- **4 pruebas nuevas en el backend:**
  - guarda el contenido sin tocar la plantilla y recalcula lo que falta;
  - no acepta un documento vacío ni uno demasiado largo;
  - una versión aprobada no se edita;
  - solo el Responsable SST de la empresa edita.

  Pasan las 258 pruebas.
- **La web se probó de punta a punta contra la API real** con una empresa de prueba, que después se borró:
  - el editor muestra el contenido, la vista previa y lo que falta;
  - la vista previa se actualiza en vivo;
  - salir con cambios pide confirmación, y cancelar se queda en el editor;
  - un documento vacío no se guarda;
  - al guardar, los avisos se actualizan y "Volver" lleva a la lista;
  - en celular no hay desplazamiento horizontal;
  - una versión vigente no tiene botón y el editor lo explica;
  - el admin no edita.

| HU | Antes | Ahora |
|---|---|---|
| HU-071 | Sin construir; contrato provisional con `contenidoMarkdown` | El Responsable SST edita el borrador con vista previa; solo el borrador, sin alterar la plantilla |

---

## Cambio `2026-11-25-hu-070` {#cambio-2026-11-25-hu-070}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 25 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (tabla de M9, índice de rutas y anexo de documentos), `16-arquitectura-backend-frontend.md` (§9, cómo se muestra el Markdown), `design-system.md` y la guía visual (sección "Documento" y badge "Política o procedimiento"), y el código de la plantilla del procedimiento en `12`, `14` y `16`. En el código: entidades, migración, cuatro casos de uso con sus permisos, las dos plantillas iniciales, pruebas, tres pantallas y la ayuda del editor de plantillas (HU-023). El modelo de datos no cambia: las tablas ya estaban en `12` |

### El problema (por qué hubo que cambiar)

1. La empresa no tenía cómo armar su política de SST ni sus procedimientos: la plantilla existía en los catálogos (HU-023), pero no había documentos de empresa ni las tablas `Documento` y `VersionDocumento` en el código.
2. Las decisiones de M9 (D13 y RN-49, cambio [2026-11-25-decisiones-m9](#cambio-2026-11-25-decisiones-m9)) estaban tomadas, pero faltaba llevarlas al código.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Quién hace qué** | El Responsable SST ve las plantillas y genera; el admin consulta la lista y el detalle; colaboradores y encuestados no ven documentos en borrador | Igual que en eventos: gestiona el Responsable SST (05-actores-roles) y el admin acompaña. Las vigentes para todos llegan con HU-074 |
| **Plantillas en `api/documentos/plantillas`** | Ruta propia de la empresa: solo las activas de su rubro o de todos los rubros. `api/plantillas` sigue siendo del staff | El staff administra el catálogo completo; la empresa solo ve lo que puede usar. Sin rubro responde 409 `documentos.sin_rubro` |
| **Título opcional** | Sin título, el documento toma el de la plantilla | Generar es un solo clic; quien quiera, lo nombra ("Política SST 2026") |
| **Versión de trabajo** | La lista y el detalle muestran el borrador si hay uno; si no, la vigente | Deja preparada la edición (HU-071), la aprobación (HU-072) y la versión nueva (HU-073) sin cambiar los contratos |
| **`porCompletar` sale del contenido** | Se calcula buscando los `[Completar: …]` que quedan en la versión, no los marcadores vacíos de la generación | Sigue siendo cierto después de editar el borrador, y cuenta también lo que la plantilla trae escrito (p. ej. "nombre y cargo de quien aprueba") |
| **Código `procedimiento_investigacion`** | El código acordado (`procedimiento_investigacion_accidentes`) tenía 38 caracteres y la columna admite 30. Se corrigió en `12`, `14` y `16` | Respeta el largo de `PlantillaDocumento.Codigo` |
| **Lo que solo sabe la empresa va como `[Completar: …]`** | Las plantillas no inventan datos legales: centro de salud de referencia, a quién se avisa un accidente y en qué plazo, plazo para investigar y quién aprueba | El documento no afirma obligaciones que el equipo no comprobó; la empresa las completa al revisar |
| **Lector de Markdown propio** | Entiende títulos, párrafos, listas, negritas, cursivas y `[Completar: …]`; nada de HTML | Sin dependencia nueva, seguro y con los estilos del design system (16 §9) |

### Cómo quedó (resumen)

- **Base:** migración `DocumentosHu070` con `Documento` y `VersionDocumento` como dice `12`:
  - FK compuestas con `EmpresaId`;
  - CHECK de número de versión, estado y aprobación;
  - únicos parciales: una versión vigente y un borrador por documento;
  - sin disparador.

  También agrega la FK compuesta de `Notificacion.VersionDocumentoId` que esperaba desde HU-118.
- **Contenido inicial:** `politica_sst` y `procedimiento_investigacion`, para todos los rubros, se cargan al arrancar con el resto del contenido SST (`CatalogoSst.Documentos.cs`), solo si faltan. Se redactaron a partir del reglamento STSS-053-04 (art. 9.j, 44, 46.1 y 47) y de ISO 45001 § 5.2. **Pendiente: revisión por alguien con conocimiento de SST**, como el resto del contenido inicial.
- **API:** `GET api/documentos/plantillas`, `POST api/documentos/generacion` (201), `GET api/documentos` y `GET api/documentos/{id}`, con los permisos `documento.plantillas`, `documento.generar`, `documento.listar` y `documento.ver`.
- **Web:**
  - "Documentos" en el inicio de admin y Responsable SST;
  - **`/documentos`:** lista con tipo, versión y estado, o estado vacío con la acción de generar;
  - **`/documentos/generar`:** plantillas como radios y título opcional. Sin rubro, un aviso con el enlace al perfil;
  - **`/documentos/{id}`:** el documento con sus badges y los avisos "Revisa el contenido antes de aprobarlo" y "Faltan datos por completar", con la lista de lo que falta resaltado en el texto.
- **HU-023:** la ayuda del contenido de una plantilla muestra el formato y los seis marcadores válidos.

### Trabajo hecho

- **9 pruebas nuevas en el backend**, y la prueba del contenido inicial ahora revisa también las plantillas de documento:
  - plantillas por rubro, sin las desactivadas;
  - generación con datos, faltantes, marcador desconocido y fecha;
  - la plantilla no cambia;
  - título por defecto y propio;
  - sin rubro;
  - plantilla no disponible;
  - validaciones;
  - permisos por rol;
  - aislamiento entre empresas;
  - reemplazo de marcadores.

  Pasan las 254 pruebas.
- **Un detalle de EF que se corrigió:** dos `HasIndex` sobre la misma columna se juntaban en uno solo, y se perdía el único de la versión vigente. Ahora cada uno lleva nombre.
- **La web se probó de punta a punta contra la API real** con una empresa de prueba, que después se borró:
  - lista vacía;
  - error sin plantilla;
  - política y procedimiento generados, con datos, avisos, resaltados, listas y numeración;
  - lista con los dos borradores;
  - celular sin desplazamiento horizontal;
  - sin rubro;
  - el admin consulta pero no genera.

| HU | Antes | Ahora |
|---|---|---|
| HU-070 | Sin construir; solo existían las plantillas del staff | Generar desde una plantilla del rubro, con los datos de la empresa, lo que falta resaltado y el resultado como borrador |
| HU-023 | La ayuda solo nombraba `{{RazonSocial}}` | La ayuda muestra el formato y los seis marcadores |

---

## Cambio `2026-11-25-decisiones-m9` {#cambio-2026-11-25-decisiones-m9}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 25 de noviembre de 2026 |
| **Alcance** | `08-decisiones-bd.md` (D13), `07-reglas-negocio.md` (RN-49), `12-modelo-datos.md` (PlantillaDocumento, VersionDocumento, §6 y §9), `10-historias-usuario.md` (HU-070 y HU-071, también sus tareas de front y back), `16-arquitectura-backend-frontend.md` (§5, §8 y §9) y `11-glosario.md`. Solo documentación: todavía no hay código de M9. Las tablas y columnas no cambian |

### El problema (por qué hubo que cambiar)

Antes de programar M9 (HU-070 a HU-074 y, con ellas, HU-116) quedaban cuatro huecos:

1. **No había plantillas de documento cargadas.** HU-070 exige al menos la política de SST y el procedimiento de investigación de accidentes, pero el contenido inicial (HU-097) no traía ninguna. El staff podía crearlas a mano, pero cada base nueva (local, pruebas, producción) empezaba vacía.
2. **Solo existía el marcador `{{RazonSocial}}`.** Con eso, "el documento se llena con los datos de la empresa" casi no se cumplía. Tampoco estaba definido qué pasa si un dato del perfil está vacío.
3. **El modelo pedía un disparador** para impedir editar una versión aprobada (RN-50). Pero la regla del código es un esquema 100 % Code-First sin `migrationBuilder.Sql`, y un disparador solo se puede crear con SQL escrito a mano. Las dos reglas se contradecían.
4. **No estaba definido el formato del contenido.** El contrato de plantillas ya traía un ejemplo en Markdown (`# Uso de EPP en {{RazonSocial}}`), pero ningún documento lo fijaba. El formato decide cómo es el editor del borrador (HU-071) y cómo se muestra y descarga (HU-074).

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Plantillas iniciales en el contenido SST** | `politica_sst` y `procedimiento_investigacion`, para todos los rubros, se cargan al arrancar junto con el resto del contenido inicial, solo si faltan. Se redactan a partir del reglamento STSS-053-04 (ya en `Reglamentos/normativasMarkdown/`) y el staff las puede editar después | Cada base nueva cumple el criterio de HU-070 sin trabajo manual, igual que categorías y peligros |
| **Seis marcadores** | `{{RazonSocial}}`, `{{RTN}}`, `{{Direccion}}`, `{{ActividadEconomica}}`, `{{Rubro}}` y `{{Fecha}}` (fecha de generación, en hora de Honduras). La lista está en `12` § PlantillaDocumento | Son los datos del perfil que tiene sentido poner en una política. Generar ya exige rubro, porque las plantillas se filtran por rubro |
| **Dato vacío → `[Completar: …]` y aviso** | Si falta un dato, el borrador lleva un texto visible como `[Completar: dirección]` y la pantalla avisa cuáles faltan. Un marcador fuera de la lista queda tal cual | No bloquea la generación por un dato opcional del perfil; el Responsable SST lo corrige al editar el borrador (HU-071), que de todos modos debe revisar |
| **Versión aprobada protegida sin disparador** | Solo se edita la versión en `borrador`. La base lo respalda con el estado y los valores únicos parciales (una `vigente` y un `borrador` por documento) | Se mantiene la regla Code-First sin excepciones, y RN-50 queda cubierta por la aplicación y por lo que la base sí expresa |
| **Markdown** | Plantillas y versiones guardan Markdown (títulos, listas, negritas). El front lo muestra sin interpretar HTML crudo; el editor es un área de texto con vista previa, y el PDF sale de imprimir esa vista | Coincide con el contrato que ya existía, es seguro y no agrega un editor enriquecido pesado |

### Cómo quedó (resumen)

- **D13** describe el contenido, los marcadores, las plantillas iniciales y cómo se protege la versión aprobada.
- **RN-49** suma que el documento se llena con los datos de la empresa y que los faltantes quedan marcados y avisados.
- **`12-modelo-datos.md`:**
  - PlantillaDocumento: formato, tabla de marcadores, dato vacío y plantillas iniciales;
  - VersionDocumento: el disparador cambia por "solo se edita la versión en borrador";
  - §6: la protección de los registros inmutables, sin disparador;
  - §9: RN-49 a RN-51 pasan a "BD y App".
- **HU-070:** criterios de los datos faltantes y de las plantillas disponibles desde el inicio. **HU-071:** formato sencillo con vista previa, y suma la regla RN-50.
- **`16-arquitectura-backend-frontend.md`:** sin disparadores (§5), plantillas de documento en el contenido inicial (§8) y la regla de mostrar Markdown sin HTML crudo (§9).
- **Glosario:** "Markdown" y "Marcador"; "Disparador" aclara que Norvia no los usa.

### Trabajo hecho

- Se revisó el código antes de decidir. `PlantillaDocumento` ya existe y se administra desde HU-023, pero el contenido inicial no trae plantillas de documento. Todavía no existen `Documento` ni `VersionDocumento`. `Notificacion.VersionDocumentoId` espera la FK compuesta que llega con HU-070.
- **Pendiente para HU-070 (código):**
  - redactar las dos plantillas;
  - cargarlas con el contenido SST inicial;
  - ampliar la ayuda del editor de plantillas (HU-023) con la lista de marcadores.

| HU | Antes | Ahora |
|---|---|---|
| HU-070 | "Se llena con los datos de la empresa", con un solo marcador definido; las plantillas mínimas no venían cargadas | Seis marcadores; los datos que faltan quedan marcados y se avisan; la política de SST y el procedimiento de investigación de accidentes vienen desde el inicio |
| HU-071 | "Puedo modificar el contenido", sin formato definido | Formato sencillo (Markdown) con vista previa; solo se edita la versión en borrador (RN-50) |
| HU-072 | La versión aprobada la protegía un disparador | La protegen la aplicación y los valores únicos parciales, sin disparador |

---

## Cambio `2026-11-25-oauth-microsoft` {#cambio-2026-11-25-oauth-microsoft}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 25 de noviembre de 2026 |
| **Alcance** | `08` (D29, ajuste de D21), `07` (RN-81 a RN-86, ajuste de RN-67), `09`, `12` (dos tablas nuevas, conteo 43, trazabilidad), `10` (HU-119, HU-120 y ajustes en HU-017 y HU-018), `11`, `13`, `15`, `16`, `18`, `README.md`, `00` y el `CLAUDE.md` de la raíz. Solo documentación: el código no se tocó |

### El problema (por qué hubo que cambiar)

1. El único modo de entrar era correo y contraseña. El equipo quiere permitir también la cuenta de Microsoft y dejar abierta la puerta a Google u otros.
2. **Acceso** exigía contraseña, así que una cuenta creada con Microsoft no cabía en el modelo.
3. No había dónde guardar con qué proveedor y con qué identificador entra cada cuenta.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| Tabla nueva **AccesoProveedor** (D29) | Guarda el proveedor (`microsoft`) y el identificador de la cuenta en él, ligados a un **Acceso** | Agregar Google es agregar un valor, no rediseñar el modelo |
| Contraseña opcional en **Acceso** | Una cuenta debe tener contraseña o al menos un proveedor (RN-81) | Las cuentas de Microsoft no guardan una clave falsa |
| Mismo correo existente: confirmar contraseña (RN-83) | Antes de vincular Microsoft a una cuenta con contraseña se pide la actual | Evita que alguien tome una cuenta ajena solo por coincidir el correo |
| Correo de Microsoft verificado y bloqueado (RN-84) | En el registro el correo no se edita; los nombres vienen prellenados y sí se editan | La cuenta nace verificada y no se suplanta otro correo |
| **Persona** sin cambios | Documento y teléfono ya eran opcionales y se completan después en el perfil (HU-026) | No hace falta tocar el modelo |
| El login sigue siendo por empresa | Microsoft solo reemplaza la contraseña; se mantiene el identificador cifrado de empresa (D1) | Conserva el aislamiento multiempresa |

| Reutilizar **Persona** sin sobrescribir (RN-85) | Si la persona ya existe, se muestran sus nombres actuales y solo se completan los campos vacíos (documento, teléfono) | Registrar una empresa nueva no cambia el nombre de la persona en las otras |
| Pantalla previa para elegir método | Microsoft o correo y contraseña antes del formulario, en login y registro; se documentó en `design-system.md` | Mantiene el flujo de correo tal cual y suma Microsoft sin mezclar formularios |
| Código de 6 dígitos al crear cuenta con Microsoft (RN-86) | Se envía al correo de Microsoft antes de registrar la empresa; vence en unos 10 minutos y tiene límite de envíos e intentos, guardado en la tabla **VerificacionCorreoMicrosoft** (solo el hash del código, nunca en claro) | Microsoft no siempre garantiza que el correo sea de quien entra; sin esto alguien podría crear una cuenta con el correo de otra persona |
| Variables `Microsoft__*` en `example.env` | Credenciales de la aplicación de Azure fuera del código | Los secretos no se commitean |

### Cómo quedó (resumen)

El modelo tiene 42 tablas. **Acceso** admite `PasswordHash` nulo y **AccesoProveedor** (global, sin `EmpresaId`) cuelga de **Acceso** con dos únicos: `(Proveedor, ProveedorUserId)` y `(AccesoId, Proveedor)`. El registro con Microsoft crea Empresa, Persona, Usuario, Acceso verificado sin contraseña, AccesoProveedor y el vínculo de administrador en una sola operación. Los contratos de API se agregaron en `18`.

### Qué hizo Claude Code en la práctica

- Siguió la cadena de verdad `08 → 07 → 09 → 12 → 10 → 14 → 11` y actualizó los documentos técnicos (`13`, `15`, `16`, `18`).
- Buscó los conteos de 41 tablas y de D1–D28 para actualizarlos.
- Implementó el código en el backend (entidad `AccesoProveedor`, migración `AccesoProveedor`, cuatro casos de uso, endpoints y 4 pruebas de integración con un Microsoft de prueba) y en el frontend (pantalla previa para elegir método, retorno de Microsoft y registro con el correo bloqueado). Variables nuevas: `Microsoft__*` en `Norvia.API/example.env` y `VITE_MICROSOFT_*` en `frontend/example.env`.
- Pendiente: probar contra un registro real de Azure (hace falta crear la aplicación y poner las credenciales) y reimportar los diagramas en `Diagramas.drawio`.

### Seguimiento por historia

| HU | Doc en repo | Tablero |
|----|-------------|---------|
| HU-119 | `10` | [ ] |
| HU-120 | `10` | [ ] |

#### HU-119 | Registrar mi empresa con Microsoft

| **Antes** | No existía. |
| **Ahora** | Mismo formulario de HU-017 con correo bloqueado, nombres prellenados y editables y sin contraseña; la cuenta nace verificada. |
| **Tablero** | [ ] |

#### HU-120 | Iniciar sesión con Microsoft y vincularla a mi cuenta

| **Antes** | No existía. |
| **Ahora** | Se entra por empresa con Microsoft; quien ya tiene contraseña vincula Microsoft confirmándola. |
| **Tablero** | [ ] |

#### HU-017 y HU-018

| **Antes** | Solo correo y contraseña. |
| **Ahora** | Cada una indica que existe la alternativa de Microsoft (HU-119 y HU-120). |

### Mapa rápido (archivos oficiales)

| Tema | Archivo |
|------|---------|
| Decisión D29 | `08-decisiones-bd.md` |
| Reglas RN-81 a RN-86 | `07-reglas-negocio.md` |
| Tabla AccesoProveedor | `12-modelo-datos.md` §4.1 |
| Historias HU-119 y HU-120 | `10-historias-usuario.md` |
| Contratos de API | `18-contratos-api-mvp.md` |

---

## Cambio `2026-11-24-hu-052` {#cambio-2026-11-24-hu-052}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (contrato nuevo y corrección de la lista "Fuera de alcance"), `design-system.md` (sección "Estadísticas de eventos"). En el código: un caso de uso y un permiso, pruebas, la página de estadísticas y los componentes compartidos `Indicador` y `ListaMedidores`. El modelo de datos no cambia |

### El problema (por qué hubo que cambiar)

1. El Responsable SST no tenía cómo ver patrones en los eventos (art. 47.e): solo una lista.
2. El contrato decía que HU-052 estaba fuera del MVP, pero la historia es de E2 (Should) en `10-historias-usuario.md`, que manda.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Solo cifras** | `GET /api/eventos/estadisticas` devuelve totales por tipo, gravedad y mes; nada de descripciones, lugares ni personas | Cumple "no muestran datos personales" y el anonimato de los reportes (D11) |
| **Sin descartados** | Los reportes descartados no cuentan | RN-28 |
| **Periodo por cuándo ocurrió** | Fechas de Honduras, incluidas, sobre la fecha del evento y no la del reporte; como máximo 24 meses | Un evento reportado tarde cuenta en el mes en que pasó; el desglose por mes se lee de un vistazo |
| **Todos los meses y tipos, también con 0** | La API completa los huecos | Se comparan sobre la misma base; un mes sin eventos también es un dato |
| **Las piezas de los resultados de encuesta** | Indicadores y lista de medidores, ahora en `shared/components/datos` | El mismo lenguaje visual (sin tortas, una sola serie) y sin duplicar código |
| **Admin y Responsable SST** | Igual que la lista de eventos | Son quienes gestionan |

### Cómo quedó (resumen)

- **`/eventos/estadisticas`** (enlace "Estadísticas" en la lista de eventos):
  - Desde y Hasta, que se aplican al cambiar, y los atajos "Últimos 12 meses" (por defecto), "Este año" y "El año pasado";
  - indicadores de eventos, graves y tipo más frecuente;
  - una card con los medidores por tipo (con cuántos fueron graves), por gravedad y por mes.
- **Periodo no válido:** si "hasta" es anterior a "desde" o el periodo pasa de 24 meses, el error sale junto al campo y se siguen viendo las cifras anteriores.

### Trabajo hecho

- 5 pruebas nuevas en el backend:
  - conteos sin descartados;
  - límites del periodo en hora de Honduras;
  - solo los campos de cifras y todos los meses;
  - validaciones;
  - permisos y aislamiento entre empresas.

  Pasan las 220 pruebas.
- La web se probó de punta a punta contra la API real (5 casos):
  - cifras por defecto, comprobando que no aparece ningún texto de los reportes;
  - atajos y periodo escrito;
  - validaciones que conservan las cifras;
  - admin sí y colaborador no;
  - celular y modo oscuro.

  Siguen pasando los e2e de resultados de encuesta (HU-033, HU-035), que ahora usan los componentes compartidos.

| HU | Antes | Ahora |
|---|---|---|
| HU-052 | Sin construir; el contrato la marcaba fuera del MVP | Estadísticas por tipo, gravedad y mes, sin descartados ni datos personales |

## Cambio `2026-11-24-hu-051` {#cambio-2026-11-24-hu-051}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `08-decisiones-bd.md` (D10), `09-entidades.md`, `12-modelo-datos.md` y `15-diagramas-drawio.md` (columna `EvaluacionRiesgo.AccidenteId`), `18-contratos-api-mvp.md`. En el código: migración `RiesgoEventoHu051` (también agrega `RiesgoEmpresa.AccidenteId`, que el modelo ya tenía y el código no), un caso de uso y un permiso nuevos, `accidenteId` al crear y evaluar riesgos, pruebas, y las pantallas de eventos y riesgos |

### El problema (por qué hubo que cambiar)

1. Un evento enseña algo sobre la matriz (art. 47.b): o revela un peligro que no estaba, o muestra que un riesgo era más grave de lo evaluado. No había forma de dejar ese rastro.
2. El modelo tenía `RiesgoEmpresa.AccidenteId` ("evento que lo reveló"), que sirve para el riesgo nuevo, pero el código no lo tenía.
3. Para un riesgo que ya estaba en la matriz, el modelo no tenía dónde guardar que se reevaluó por un evento: `AccidenteId` del riesgo es su origen, y ya tiene otro (encuesta o agregado a mano).

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Riesgo nuevo: revelado por el evento** | `POST /api/riesgos` acepta `accidenteId`; el riesgo queda con ese origen (como máximo uno: encuesta o evento) | Cumple "creo un riesgo nuevo que queda enlazado al evento" con lo que el modelo ya tenía |
| **Riesgo existente: el enlace va en la evaluación** | Columna nueva `EvaluacionRiesgo.AccidenteId`, opcional y solo en evaluaciones iniciales (CHECK). Lo decidió el equipo frente a no guardar el enlace | No cambia el origen del riesgo, no agrega tablas y deja ver el antes y el después en el historial (D10) |
| **El evento muestra lo que cambió** | `GET /api/eventos/{id}/riesgos`: revelados con su nivel actual y reevaluados con "pasó de Bajo · 4 a Crítico · 16" | El Responsable SST ve en el evento cómo quedó la matriz |
| **Se evalúa en la pantalla de riesgos** | Desde el evento, "Agregar un riesgo" y "Reevaluar un riesgo" llevan a las pantallas de riesgos con el evento; ahí se guarda y se vuelve al evento | No se duplica el mapa de calor ni el formulario de evaluación |
| **También con el evento cerrado** | Se enlaza mientras el evento no esté descartado (400 `riesgos.evento_invalido` si lo está o es de otra empresa) | Lo aprendido puede llegar después del cierre |
| **Botones solo para el Responsable SST** | En el evento solo él agrega o reevalúa; el admin consulta. La API de riesgos sigue abierta al admin, como antes | La historia es del Responsable SST; no se cambian los permisos de la matriz |

### Cómo quedó (resumen)

- **Detalle del evento:** sección **Matriz de riesgos** con los riesgos enlazados:
  - revelados primero;
  - cada uno con su etiqueta de nivel y qué pasó;
  - botones "Agregar un riesgo" y "Reevaluar un riesgo". El segundo abre un modal para buscar el riesgo en la matriz.
- **Agregar riesgo (`/riesgos/nuevo?evento=…`):** avisa que quedará enlazado y, al guardarlo, lleva a evaluarlo.
- **Riesgo (`/riesgos/:id?evento=…`):**
  - un aviso "Revisión tras un evento", con enlace de vuelta;
  - la reevaluación inicial abierta de una vez, que se guarda enlazada.
  - El origen muestra "Revelado por un evento", y el historial marca "Tras un evento" en las evaluaciones enlazadas.
- **Modal (design system):** el contenido empieza arriba. En celular, un modal con poco contenido lo repartía a lo alto de la pantalla.

### Trabajo hecho

- 5 pruebas nuevas en el backend:
  - riesgo revelado y evaluado;
  - reevaluación con su nivel de antes y de después, y el historial con el evento de cada evaluación;
  - orden;
  - no se enlaza con un evento descartado ni de otra empresa;
  - permisos y aislamiento.

  Pasan las 215 pruebas.
- La web se probó de punta a punta contra la API real (7 casos):
  - sin riesgos;
  - agregar y evaluar desde el evento;
  - elegir y reevaluar uno existente;
  - el existente conserva su origen y su historial;
  - el descartado no muestra la sección;
  - el admin solo consulta;
  - celular y modo oscuro.

  Siguen pasando los e2e de riesgos, controles, plan y catálogos que usan las pantallas o el modal tocados.

| HU | Antes | Ahora |
|---|---|---|
| HU-051 | Sin construir; el código no tenía el enlace riesgo–evento y el modelo no podía guardar una reevaluación por un evento | Riesgo revelado y reevaluación enlazada al evento, con el antes y el después a la vista |

## Cambio `2026-11-24-hu-050` {#cambio-2026-11-24-hu-050}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (medidas correctivas y `accidenteId` en las tareas del plan). En el código: 2 casos de uso y 2 permisos en el backend, pruebas, la sección de medidas en el detalle del evento y el enlace desde el plan de trabajo en la web. El modelo de datos no cambia: la medida es una `Tarea` con `AccidenteId` |

### El problema (por qué hubo que cambiar)

1. Desde HU-049 un evento solo se cierra con al menos una medida correctiva (RN-28), pero no había forma de crearlas: el evento quedaba en investigación para siempre.
2. El contrato pedía solo descripción, fecha límite y responsable. Una tarea del plan también necesita título y prioridad, así que la medida no se podía guardar como tarea.
3. Desde el evento no se veía si sus medidas se estaban cumpliendo.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **La medida es una tarea** | `POST …/medidas-correctivas` crea una tarea pendiente con el evento como origen (RN-23, D6); pide lo mismo que una tarea manual | Se trabaja, filtra y vence en el plan como cualquier otra; no hay una segunda lista de pendientes |
| **El avance se ve en el evento** | `GET …/medidas-correctivas` las lista con su estado; la web muestra "1 de 2 completadas · 1 vencida" | Cumple "desde el evento veo el avance de sus medidas" |
| **Las canceladas no cuentan** | Se muestran tachadas, pero no suman al avance ni sirven para cerrar | Una medida cancelada no corrige nada |
| **Solo mientras está abierto** | Cerrado o descartado, el evento ya no recibe medidas (409 `eventos.terminado`); las que tiene se siguen viendo | El cierre significa que el plan de acción está definido |
| **Del plan al evento** | Las tareas del plan traen `accidenteId` y la lista enlaza "Medida de un evento" al evento | Quien gestiona el plan llega a la investigación en un clic |
| **Solo el Responsable SST agrega** | Agregar: `responsable_sst`; ver: también `admin_empresa` | Igual que investigar y cerrar (HU-049) |

### Cómo quedó (resumen)

- **Detalle del evento (`/eventos/:id`):** entre la investigación y el cierre hay una sección **Medidas correctivas**:
  - muestra el avance y la lista, primero las abiertas por fecha límite;
  - cada medida muestra estado, "Vencida", responsable, fecha límite, prioridad y cuándo se completó;
  - "Agregar una medida" abre un modal con qué hay que hacer, detalle, prioridad, responsable, fecha límite y si pide evidencia;
  - al agregar la primera, se habilita "Cerrar el evento".
- **Plan de trabajo:** las medidas aparecen con "Medida de un evento" (enlace al evento), y el filtro de origen dice "De un evento". En "Mis tareas", quien es responsable la ve como "Medida de un evento".
- **API:** `POST` y `GET /api/eventos/{id}/medidas-correctivas`; errores nuevos `eventos.responsable_invalido`, `eventos.fecha_pasada` (400) y `eventos.sin_vinculo` (403).

### Trabajo hecho

- 5 pruebas nuevas en el backend:
  - cada medida es una tarea con origen accidente, aparece en el plan y permite cerrar;
  - orden y avance, donde la cancelada no cuenta;
  - validaciones de título, fecha y responsable;
  - un evento cerrado o descartado no recibe medidas;
  - permisos y aislamiento entre empresas.

  Pasan las 210 pruebas.
- La web se probó de punta a punta contra la API real (8 casos):
  - sin medidas no se cierra;
  - agregar con validaciones;
  - avance con vencidas y completadas;
  - el colaborador la ve en sus tareas;
  - enlace y filtro en el plan;
  - cerrado, sin agregar;
  - el admin solo consulta;
  - celular y modo oscuro.

  Siguen pasando los e2e de HU-043 y HU-046.
- En la web, estados de tarea, prioridades, "vencida" y el esquema de una tarea asignada pasaron a `shared/tareas`, porque ahora los usan el plan y los eventos.
- **Pendiente:** cancelar una tarea todavía no tiene pantalla ni API; la regla de que las canceladas no cuentan queda lista para cuando exista.

| HU | Antes | Ahora |
|---|---|---|
| HU-050 | Sin construir; el contrato no alcanzaba para crear una tarea | Medidas correctivas como tareas del plan, con su avance en el evento y enlace desde el plan |
| HU-049 | El cierre pedía medidas que no se podían crear | Un evento se cierra de punta a punta desde la web |

## Cambio `2026-11-24-hu-049` {#cambio-2026-11-24-hu-049}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (investigación, cierre y descarte de eventos; detalle del evento). En el código: entidad `InvestigacionAccidente` con su migración, 3 casos de uso y 3 permisos en el backend, pruebas, y la sección de investigación en el detalle del evento de la web. El modelo de datos (`12`) ya describía la tabla y no cambia |

### El problema (por qué hubo que cambiar)

1. Los eventos reportados (HU-047) se quedaban en "Abierto": no había forma de registrar por qué ocurrieron, de cerrarlos ni de descartar un reporte falso o duplicado.
2. El contrato decía que guardar la investigación cerraba el evento solo, en cuanto cumpliera RN-28. Así el Responsable SST no decidía cuándo terminó, y una medida agregada después lo habría cerrado sin que nadie lo revisara.
3. El contrato no pedía quién investigó, aunque la historia y el modelo sí (`InvestigadaPorId`).

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Una investigación por evento, corregible** | `PUT …/investigacion` la registra o la reemplaza mientras el evento siga abierto o en investigación; la primera vez lo deja "En investigación" | Se corrige un error sin duplicar registros |
| **Cierre explícito** | `POST …/cierre` cierra solo si hay investigación y al menos una medida correctiva (tarea con origen en el evento que no esté cancelada); si falta algo, responde qué falta | RN-28 se cumple y es el Responsable SST quien decide cuándo terminó |
| **Quién investigó** | Una persona activa de la empresa que no sea encuestada (la misma lista de responsables del plan); por defecto, quien registra | Cumple "registro responsables de la investigación" (art. 46.1.a) |
| **Fecha de la investigación** | No puede ser futura (fecha de Honduras) ni anterior al día del evento | Evita fechas imposibles |
| **Descartar con rastro** | Guarda quién descartó, cuándo y el motivo opcional; un descartado ya no se investiga ni se cierra | Limpia el historial sin perder la explicación |
| **Solo el Responsable SST gestiona** | Investigar, cerrar y descartar: solo `responsable_sst`; el admin ve todo pero no edita | La historia es del Responsable SST |
| **Medidas, en HU-050** | El detalle cuenta las medidas (`totalMedidas`), pero crearlas desde el evento es HU-050 | Hasta entonces un evento no se puede cerrar desde la web; la pantalla dice qué falta |

### Cómo quedó (resumen)

- **Detalle del evento (`/eventos/:id`):**
  - sección **Investigación**: sin investigar, "Registrar la investigación"; con investigación, causas, conclusiones, quién y cuándo, con "Editar la investigación";
  - sección **Cierre**: número de medidas correctivas, "Cerrar el evento" (deshabilitado con "Para cerrarlo falta…" si falta algo) y "Descartar el reporte" con motivo opcional; ambos piden confirmación;
  - cerrado o descartado: aviso con la fecha (y, si se descartó, quién y por qué), sin botones.
- **API:** `PUT /api/eventos/{id}/investigacion`, `POST /api/eventos/{id}/cierre`, `PATCH /api/eventos/{id}/descarte`; los tres devuelven el detalle del evento, que ahora incluye la investigación, `totalMedidas` y los datos de cierre y descarte.
- **Errores nuevos:** `eventos.terminado` (409), `eventos.sin_investigacion` (409), `eventos.sin_medidas` (409), `eventos.investigador_invalido` (400), `eventos.fecha_investigacion_invalida` (400).

### Trabajo hecho

- Migración `InvestigacionAccidenteHu049`: tabla `InvestigacionAccidente` con FK compuestas a `Accidente` y a `VinculoEmpresa`, y una sola investigación por evento.
- 5 pruebas nuevas en el backend (registrar y corregir sin duplicar; validaciones de causas, fecha e investigador; no cerrar sin investigación ni sin medidas, y una medida cancelada no cuenta; descartar; solo el Responsable SST de la empresa). Pasan las 205 pruebas.
- La web se probó de punta a punta contra la API real (8 casos): sin investigar no se cierra, registrar con validaciones, corregir sin duplicar, cerrar con una medida, descartar con motivo, lista con los estados nuevos, el admin solo consulta, y celular y modo oscuro.

| HU | Antes | Ahora |
|---|---|---|
| HU-049 | Sin construir; el contrato cerraba el evento solo y no pedía quién investigó | Investigación corregible, cierre explícito con RN-28 y descarte con rastro, en la API y en la web. Las medidas se crean en HU-050 |

## Cambio `2026-11-24-hu-047-web` {#cambio-2026-11-24-hu-047-web}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (zona horaria de `fechaHoraEvento`), `design-system.md` (badge "Grave" y campo de hora). En el código, solo la web: la feature `eventos`, el componente `CampoHora` y el `maximo` de `CampoFecha`. El backend es el de Jesús Zepeda (22-11) y no cambia |

### El problema (por qué hubo que cambiar)

1. HU-047 tenía backend (reportar, listar y ver) pero no tenía pantallas.
2. El reporte necesita fecha **y hora**. El design system definía la hora (12 horas, a. m./p. m., escrita), pero no existía el componente.
3. La API guarda la fecha y hora en UTC. Si la web enviara la hora del navegador sin zona, un reporte hecho desde una computadora con otra zona quedaría corrido.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Hora de Honduras con zona** | La web envía `…T14:30:00-06:00`; la API la guarda en UTC y la muestra de nuevo en la hora de Honduras | La hora reportada es la que la persona escribió, sin importar la zona de su equipo |
| **No futura, también en la web** | La fecha no admite días después de hoy (el calendario los deshabilita) y, si es hoy, la hora no puede haber pasado más allá del margen de 5 minutos del backend | Mismo resultado que el backend, con el error junto al campo |
| **Anonimato a la vista** | Un aviso antes del formulario explica que no se guarda quién reporta y sugiere no poner el nombre en la descripción; la confirmación y el detalle lo repiten | RN-27: que nadie deje de reportar por temor |
| **Cualquier persona reporta** | "Reportar un evento" en Inicio para los cuatro roles, también encuestados; la lista y el detalle, solo para admin y Responsable SST | Igual que los permisos del backend |
| **"Grave" junto al estado** | Badge de error "Grave" al lado del estado (Abierto es advertencia) | Lo urgente se ve en la lista sin abrirlo |
| **Sin adjuntos por ahora** | Adjuntar imágenes o PDF espera a HU-100 (almacenamiento de archivos), igual que en el backend | No bloquea el reporte |

### Cómo quedó (resumen)

- **`/eventos/reportar`:**
  - **Formulario:** qué pasó (los cuatro tipos con su explicación), si es enfermedad profesional (sospechosa o diagnosticada), fecha (`CampoFecha` con `maximo`), hora (`CampoHora`), lugar opcional, qué ocurrió y "Es grave".
  - **Confirmación:** dice cuándo se recibió el reporte, con "Reportar otro evento" y "Volver al inicio".
- **`/eventos`:** lista, el último recibido primero, con filtros por tipo, estado y gravedad.
- **`/eventos/:id`:** detalle con cuándo ocurrió, dónde, cuándo se recibió y la descripción. No hay dato de quién reportó.

### Trabajo hecho

- Se construyó la web y se probó de punta a punta contra la API real (8 casos):
  - un encuestado reporta y ve los errores;
  - enfermedad profesional;
  - fechas y horas futuras, y la hora en 12 horas;
  - envío, comprobando que la hora quedó en UTC y que la tabla no tiene columnas de quién reportó;
  - el encuestado no ve la lista;
  - lista y filtros del Responsable SST;
  - detalle;
  - celular y modo oscuro.

  Sigue pasando el e2e de HU-043, que también usa el campo de fecha.
- **Hallazgo:** el aviso "Esa hora todavía no llega" quedaba visible después de cambiar la fecha. Ahora la hora se revisa de nuevo cuando cambia la fecha.

| HU | Antes | Ahora |
|---|---|---|
| HU-047 | Solo backend | Reporte anónimo en la web para toda la empresa; lista y detalle para la gestión. Adjuntos pendientes de HU-100 |

## Cambio `2026-11-24-hu-023-web` {#cambio-2026-11-24-hu-023-web}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (plantillas de tarea y corrección de `tipoRespuestaCodigo`), `design-system.md` y la guía visual (Navegación de sección). En el código: 4 casos de uso y 4 permisos de plantillas de tarea, la feature `catalogos` de la web, y los códigos de peligro del contenido de HU-097 en minúsculas |

### El problema (por qué hubo que cambiar)

1. HU-023 tenía backend desde el 15-11 (rubros, categorías, peligros, preguntas y plantillas de documento), pero no tenía pantallas: el staff solo podía mantener los catálogos con Postman.
2. El equipo había dejado las plantillas de tarea sin API "para acotar la historia". Desde HU-097 son las que sugieren los controles (HU-039) y las tareas modelo del plan (HU-042), y solo se podían corregir editando el código.
3. Los códigos de peligro sembrados en HU-097 (`LOC-CAIDA-NIVEL`) no cumplían la regla de la administración (minúsculas, números y guion bajo).
4. El contrato de preguntas decía `tipoRespuesta`; la API usa `tipoRespuestaCodigo`.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **API de plantillas de tarea** (decidido por el equipo) | `api/plantillas-tarea` con listar (por peligro), crear, editar (parcial, con `quitarTipoControl` para volverla tarea modelo) y activar o desactivar; permisos `catalogo.plantilla_tarea.*`, consulta también para soporte | El staff corrige el contenido de SST sin programar. Lo ya aceptado o generado en las empresas guarda su copia |
| **Plantillas dentro de cada peligro** | Desde la lista de peligros se entra al peligro, que muestra sus controles sugeridos (por efectividad) y sus tareas modelo | La plantilla tiene sentido junto a su peligro; la lista dice cuántas tiene cada uno |
| **Área "Catálogos" con navegación de sección** | Categorías, Preguntas, Peligros y plantillas, Rubros y Plantillas de documento, cada una con su URL. Componente nuevo del design system | Un área de mantenimiento con pantallas hermanas; la URL permite enlazar (por ejemplo, "Preguntas" de una categoría) |
| **Soporte solo consulta** | `soporte_plataforma` ve todo con un aviso y sin botones de cambio; el formulario de documento se muestra deshabilitado | Igual que los permisos del backend |
| **Editor de preguntas en página propia** | Tipo con explicación, "Es obligatoria", peligro con búsqueda y opciones con subir, bajar, quitar y "Indica exposición" (solo si hay peligro). Las reglas de RN-68 están también en Zod | Es el formulario más complejo; en un modal no cabe cómodo |
| **El bloque de respuesta solo se envía si cambió** | Editar solo el texto no reemplaza las opciones | Conservan su id; el backend reemplaza las opciones completas cuando llega el bloque |
| **Simples en modal** | Rubros, categorías, peligros y plantillas de tarea se crean y editan en un modal; activar o desactivar es una acción directa, sin confirmación | No se borra nada: desactivar se revierte con "Activar" |
| **Códigos de HU-097 en minúsculas** | `loc_caida_nivel`, etc. Los Id siguen saliendo de la forma anterior del código | Una base ya sembrada no duplica nada |

### Cómo quedó (resumen)

- **Backend:** `GET/POST /api/plantillas-tarea`, `PATCH /api/plantillas-tarea/{id}` y `…/estado`.
- **Web (`/catalogos`, enlace "Catálogos" en Inicio para el staff):**
  - **Categorías:** filtro por rubro y enlace a sus preguntas.
  - **Preguntas:** por categoría, con su tipo, si es obligatoria, el peligro que detecta y las opciones que indican exposición; editor aparte.
  - **Peligros y plantillas:** búsqueda sin tildes y filtro por clasificación; el detalle del peligro administra sus plantillas.
  - **Rubros y plantillas de documento,** esta última con un editor de contenido que admite `{{RazonSocial}}`.
  - **Errores junto al campo:** código o nombre repetidos, y referencias desactivadas.

### Trabajo hecho

- Se implementó la API de plantillas de tarea con 8 pruebas nuevas:
  - orden por peligro;
  - edición parcial y cambio entre control y tarea modelo;
  - una desactivada deja de sugerirse en los riesgos;
  - validaciones y peligro inactivo;
  - una sesión de empresa recibe 403.

  Pasan las 200 pruebas del backend (y las de HU-097 con los códigos nuevos).
- Se construyó la web y se probó de punta a punta contra la API real, con el contenido de HU-097 cargado (8 casos):
  - categorías por rubro;
  - categoría nueva y nombre repetido;
  - pregunta con peligro, opciones repetidas y exposición;
  - editar el texto sin cambiar las opciones;
  - plantillas de un peligro (crear, pasar a tarea modelo, desactivar);
  - rubros y plantillas de documento;
  - soporte solo consulta;
  - celular y modo oscuro.

  Siguen pasando los e2e de HU-039 y HU-097.

| HU | Antes | Ahora |
|---|---|---|
| HU-023 | Solo backend, sin plantillas de tarea | Pantallas para todo el catálogo, incluidas las plantillas de tarea de cada peligro; soporte en consulta |

## Cambio `2026-11-24-hu-097-catalogos` {#cambio-2026-11-24-hu-097-catalogos}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `16-arquitectura-backend-frontend.md` §8 (datos iniciales al arrancar). En el código: `CatalogoSst` (contenido), `CatalogoSstSeeder`, la opción `CatalogoSst:Cargar` y su línea en `example.env`. Sin cambios de modelo |

### El problema (por qué hubo que cambiar)

1. HU-097 estaba a medias: se cargaban los roles con sus permisos y los cuatro rubros, pero no había categorías, preguntas, peligros ni plantillas.
2. Por eso, una empresa nueva no podía armar una encuesta (HU-029, HU-030), la encuesta no sugería peligros (HU-033), y Norvia no sugería controles (HU-039) ni tareas modelo (HU-042). Solo funcionaba si alguien cargaba datos a mano por la API.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Contenido en código, cargado al arrancar** | `CatalogoSst` tiene el contenido y `CatalogoSstSeeder` lo carga junto con los demás seeders | Toda instalación nueva arranca con contenido, sin pasos manuales |
| **Solo agrega lo que falta** | Cada elemento tiene un Id estable derivado de su clave. Si ya existe, no se toca, aunque el staff lo haya editado o desactivado (HU-023) | "Las cargas repetidas no generan información duplicada", y las correcciones del staff no se pierden al reiniciar |
| **Respeta lo cargado a mano** | Si ya hay un peligro con el mismo código o una categoría con el mismo nombre en el rubro, se usa ese; si la posición de una pregunta está ocupada, esa pregunta no se agrega | No choca con lo que el staff haya creado antes de la carga |
| **No se reordena ni se borra** | Lo nuevo se agrega al final de su lista; lo que sobre se desactiva desde la administración de catálogos | Los Id dependen de la posición |
| **Pruebas con catálogos vacíos** | `CatalogoSst:Cargar=false` en las pruebas de integración; la carga se prueba en una base propia del mismo contenedor | Las pruebas existentes no cambian y la carga se prueba de verdad |
| **Roles y permisos, como estaban** | Los cuatro grupos de acceso (también `encuestado`) ya se cargaban con sus permisos (`CatalogoBase`, `PermisosSeeder`); ahora una prueba lo comprueba | Cubre el tercer criterio de la historia |

### Cómo quedó (resumen)

**Peligros (21)**, cada uno con 3 a 6 plantillas: controles por tipo, del más al menos efectivo, y al menos una tarea modelo (94 plantillas):

| Clasificación | Peligros |
|---|---|
| Locativo | Caída al mismo nivel, caída de altura, caída de objetos almacenados, derrumbe en excavaciones |
| Mecánico | Atrapamiento con partes de máquinas, cortes con herramientas, golpes por montacargas o vehículos |
| Eléctrico | Contacto eléctrico |
| Físico | Ruido, calor, iluminación deficiente |
| Químico | Sustancias químicas, polvo en el aire |
| Biológico | Agentes biológicos |
| Ergonómico | Trabajo prolongado frente a pantalla, levantar y cargar peso a mano, movimientos repetitivos, trabajo de pie prolongado |
| Psicosocial | Sobrecarga de trabajo, violencia de terceros |
| Otro | Incendio |

**Categorías por rubro (12), con 34 preguntas.** Hay selección única y múltiple con la opción que indica exposición, y en cada rubro una pregunta abierta opcional:

| Rubro | Categorías |
|---|---|
| Oficina administrativa | Puesto de trabajo y pantallas · Instalaciones y orden · Carga de trabajo y bienestar |
| Comercio o tienda | Bodega y almacenamiento · Atención al público y caja · Limpieza y local |
| Maquila o fábrica | Máquinas y herramientas · Ambiente de la planta · Tareas y ritmo de trabajo |
| Construcción | Trabajo en alturas · Excavaciones, materiales y herramientas · Condiciones del sitio |

- **Redacción:** propia, basada en la práctica habitual de SST y en el reglamento STSS-053-04, dirigida a quien responde ("tú").
- **Pendiente para el equipo:** que lo revise alguien con conocimiento de SST, como pide la historia. Las correcciones se hacen desde la administración de catálogos (HU-023) o editando `CatalogoSst` sin reordenar.
- **Plantillas sin pantalla:** HU-023 no tiene todavía pantalla para las plantillas de tareas. Hasta entonces, se corrigen en `CatalogoSst`, y solo llegan a las instalaciones donde el elemento aún no exista.

### Trabajo hecho

- Se escribió el contenido y el seeder, con 3 pruebas nuevas sobre una base propia:
  - todo se carga y una segunda carga no duplica;
  - los cuatro rubros tienen categorías con preguntas;
  - las preguntas cumplen las reglas de D26 y RN-68 (tipos, opciones y exposición);
  - cada peligro tiene controles y tareas modelo;
  - los roles, incluido `encuestado`, tienen sus permisos;
  - no se pisa lo editado por el staff y no se duplica lo cargado a mano.

  Pasan las 192 pruebas del backend.
- Se probó de punta a punta con la API real y una base nueva:
  - la carga agregó 161 elementos, y al reiniciar la API no agregó nada;
  - una empresa de oficina ve sus tres categorías, publica la encuesta y recibe respuestas;
  - Norvia sugiere los tres peligros elegidos como exposición;
  - el riesgo confirmado recibe controles desde las plantillas, y el plan propone la tarea del control y la tarea modelo.

| HU | Antes | Ahora |
|---|---|---|
| HU-097 | Solo roles, permisos y rubros | Contenido SST de los cuatro rubros, peligros y plantillas, cargado sin duplicar; pendiente de revisión por SST |

## Cambio `2026-11-24-hu-041-historial` {#cambio-2026-11-24-hu-041-historial}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (HU-041: la ruta pasa a `GET /api/riesgos/{id}/evaluaciones`), `12-modelo-datos.md` §9 (RN-20). En el código: slice `ListarEvaluaciones` y la sección "Historial de evaluaciones" del riesgo en la web |

### El problema (por qué hubo que cambiar)

1. HU-041 pide ver todas las evaluaciones de un riesgo, con fecha y autor, para demostrar su evolución. Desde HU-037 y HU-040 se guardan todas, pero solo se mostraban las vigentes.
2. El contrato tenía `GET /api/riesgos/{id}/historial` con una línea de tiempo de eventos variados ("creado", "evaluacion_inicial"…). Las evaluaciones son lo único que se guarda como historial.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **`GET …/evaluaciones`** | Lista de `EvaluacionResponseDto`, la más reciente primero, iniciales y residuales juntas | Es lo que pide la historia, con el mismo formato que evaluar y la misma ruta que el `POST` |
| **"Vigente" marcada** | La más reciente de cada tipo lleva el badge éxito "Vigente" (design system § Badges: vigente) | Se ve qué cuenta hoy y qué es historia |
| **Solo con evaluaciones** | Si el riesgo no tiene evaluaciones, la sección no aparece | No se muestra una tabla vacía junto al formulario de la primera evaluación |
| **Se actualiza sola** | Al guardar una evaluación, el historial se vuelve a pedir | "Una evaluación nueva no borra las anteriores" se ve en el momento |

### Cómo quedó (resumen)

- **Backend:** `GET /api/riesgos/{id}/evaluaciones` con el permiso `riesgo.historial` para `admin_empresa` y `responsable_sst`.
- **Web, detalle del riesgo, "Historial de evaluaciones":**
  - **Encabezado:** cuántas evaluaciones hay y desde cuándo.
  - **Tabla:** fecha y quién evaluó, tipo (con "Vigente"), nivel, y probabilidad × severidad con sus nombres (RN-80).
  - **En celular:** el tipo y el detalle van bajo la fecha, así el nivel queda a la vista.

### Trabajo hecho

- Se implementó el backend con 3 pruebas nuevas:
  - todas las evaluaciones en orden, con fecha y autor;
  - historial vacío;
  - aislamiento entre empresas y permisos.

  Pasan las 189 pruebas del backend.
- Se probó la web de punta a punta contra la API real (5 casos):
  - primera evaluación;
  - residual sumada arriba;
  - reevaluar la inicial sin borrar la anterior;
  - riesgo sin evaluar;
  - celular y modo oscuro.

  Siguen pasando los e2e de HU-037 y HU-040.
- **Ajuste:** la primera versión de la tabla no cabía en el ancho del detalle. El autor pasó bajo la fecha y el detalle baja de línea.

| HU | Antes | Ahora |
|---|---|---|
| HU-041 | Contrato con una línea de tiempo de eventos sin respaldo | Historial de evaluaciones con fecha, autor, tipo, nivel y la vigente de cada tipo |

## Cambio `2026-11-24-hu-046-filtrar-plan` {#cambio-2026-11-24-hu-046-filtrar-plan}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (filtros de `GET /api/plan-trabajo/tareas`), `16-arquitectura-backend-frontend.md` §7 (enums de la consulta en snake_case). En el código: filtros de `ListarTareas`, `EnumSnakeCaseBinder` en la API y los filtros del plan en la web |

### El problema (por qué hubo que cambiar)

1. HU-046 pide filtrar las tareas del plan por estado, responsable, origen y fecha, y que las vencidas se distingan claramente.
2. Al probar `?estado=en_progreso`, la API respondía 400. El JSON usa los enums en snake_case, pero el binder de la consulta de ASP.NET Core solo entiende el nombre del enum (`EnProgreso`) y además acepta números. Los filtros de la matriz no lo habían mostrado porque sus valores eran de una sola palabra (`critico`, `locativo`).

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Filtros en el backend** | `estado`, `vencidas`, `responsableId`, `sinResponsable`, `origen`, `prioridad`, `fechaDesde` y `fechaHasta`, validados con FluentValidation | Igual que en la matriz (HU-038): cualquier cliente filtra igual |
| **"Vencidas" como filtro** | Pendientes o en progreso con la fecha límite antes de hoy en Honduras; en la web es una opción más del filtro de estado | Lo urgente, en un toque. No es un estado guardado (design system) |
| **Las vencidas se ven** | Además del badge "Vencida" (HU-043), junto al total de la lista va "N vencidas" en rojo, que filtra al tocarlo | "Se distinguen claramente" sin buscarlas |
| **"Sin responsable" y prioridad** | Se agregaron también: el primero para encontrar lo que falta asignar; la prioridad la pedía el contrato anterior | Completan la revisión del plan |
| **Enums de la consulta en snake_case** | `EnumSnakeCaseBinder` acepta `en_progreso` en la consulta, igual que el JSON, y rechaza números y valores desconocidos (400) | Un solo formato en toda la API; ningún filtro futuro vuelve a tropezar con esto |
| **Fecha del filtro** | Se escribe o se elige con el campo de fecha (HU-043). A medio escribir no filtra; si no existe o el rango es imposible, se avisa y no se filtra | No aparecen errores mientras se escribe |

### Cómo quedó (resumen)

- **Backend:** `GET /api/plan-trabajo/tareas` con los filtros anteriores, y el binder de enums para toda la API.
- **Web, plan de trabajo:**
  - **Filtros:** estado (con "Vencidas"), responsable (con "Sin responsable"), origen, prioridad, y "Vence desde" y "Vence hasta". Filtran al momento.
  - **Junto al total:** "N vencidas" (filtra) y "Quitar filtros".
  - **Sin resultados:** "No hay tareas con esos filtros", con "Quitar filtros".

### Trabajo hecho

- Se implementó el backend con 9 pruebas nuevas:
  - cada filtro y sus combinaciones;
  - qué cuenta como vencida;
  - filtros contradictorios o inválidos;
  - aislamiento entre empresas.

  Pasan las 186 pruebas del backend, también las de los filtros que ya existían (riesgos y eventos).
- Se probó la web de punta a punta contra la API real (5 casos):
  - conteo y badge de vencidas;
  - enlace de vencidas y "Quitar filtros";
  - estado, responsable, origen y prioridad, también combinados;
  - rango de fechas con sus avisos;
  - celular y modo oscuro.

  Siguen pasando los e2e de HU-038, HU-042, HU-043 y HU-044. El de HU-043 se ajustó porque ahora la página también tiene selects de filtro.

| HU | Antes | Ahora |
|---|---|---|
| HU-046 | Sin filtros; el contrato solo nombraba estado, prioridad y responsable | Filtros por estado, vencidas, responsable, origen, prioridad y fecha; vencidas contadas y filtrables con un toque |

## Cambio `2026-11-24-hu-044-mis-tareas` {#cambio-2026-11-24-hu-044-mis-tareas}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (HU-044: mis tareas y cambio de estado; `completadaEn` en el item), `12-modelo-datos.md` §9 (RN-24, RN-25). En el código: slices `ListarMisTareas` y `CambiarEstadoTarea`, y la página "Mis tareas" en la web |

### El problema (por qué hubo que cambiar)

1. HU-044 pide que el colaborador vea sus tareas y las pase por pendiente, en progreso y completada, sin poder cambiar las ajenas.
2. Los permisos se asignan por ruta y rol. Para cambiar el estado, el colaborador necesita el permiso, pero RN-24 dice que solo el responsable de **esa** tarea o el Responsable SST pueden actualizarla. El rol no alcanza: hay que mirar la tarea.
3. RN-25 (no completar sin evidencia) aplica desde ya, pero las evidencias llegan con HU-045.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Ruta propia para el estado** | `PATCH …/tareas/{id}/estado`, separada de `PUT …/asignacion` | Dar este permiso al colaborador no le permite reasignar |
| **RN-24 en la aplicación** | El permiso de la ruta lo tienen `admin_empresa`, `responsable_sst` y `colaborador`; el servicio además exige ser el responsable de la tarea o Responsable SST (403 `plan.tarea_ajena`). Un admin que no es responsable tampoco puede | Lo que dice la regla, al pie de la letra; el rol se lee de la base, así refleja un cambio de rol reciente |
| **Estados en cualquier orden** | Entre pendiente, en progreso y completada se puede ir y volver (reabrir). `completadaEn` se guarda al completar y se borra al reabrir. Cancelar no está aquí | "Puedo pasarlas por pendiente, en progreso y completada"; un error al marcar se corrige solo |
| **RN-25 desde ya** | Una tarea que pide evidencia no se completa (409 `plan.falta_evidencia`). Como todavía no hay evidencias, esas tareas esperan a HU-045; en la web el botón está deshabilitado y se explica por qué | No se completa nada que deba demostrarse |
| **RN-22 al iniciar** | Sin responsable o sin fecha límite no se inicia ni se completa (409 `plan.tarea_sin_asignar`) | Lo exige la base con un CHECK; la aplicación da un mensaje claro |
| **Solo veo las mías** | `GET …/tareas/mias` filtra por el vínculo del token. Los colaboradores no entran al plan completo | "No puedo cambiar tareas ajenas": ni siquiera las ve |

### Cómo quedó (resumen)

- **Backend:** `GET /api/plan-trabajo/tareas/mias` y `PATCH /api/plan-trabajo/tareas/{id}/estado`, con los permisos `tarea.mias` y `tarea.estado`. `completadaEn` se agrega al item de tarea.
- **Web (`/mis-tareas`, enlace "Mis tareas" en Inicio para admin, Responsable SST y colaborador):**
  - **Por hacer:** en progreso y pendientes, la más urgente primero, con prioridad, fecha límite, "Vencida", de dónde sale y si pide evidencia.
  - **Terminadas:** completadas (con su fecha) y canceladas.
  - **Botones según el estado:** "Empezar", "Marcar como completada" (deshabilitado si pide evidencia), "Volver a pendiente" y "Reabrir".
  - **Si la tarea dejó de ser suya:** el aviso queda arriba y la lista se actualiza.

### Trabajo hecho

- Se implementó el backend con 10 pruebas nuevas:
  - solo mis tareas y en qué orden;
  - el ciclo completo, también reabrir;
  - tarea ajena: el admin no puede y el Responsable SST sí;
  - evidencia, sin asignar y estados no permitidos;
  - tarea cancelada;
  - aislamiento entre empresas y que el encuestado no entra.

  Pasan las 177 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real (8 casos):
  - lista y orden;
  - empezar, completar, reabrir y volver a pendiente;
  - tarea con evidencia;
  - tarea reasignada a otra persona mientras estaba abierta;
  - el colaborador no entra al plan;
  - estado vacío, celular y modo oscuro.

  Siguen pasando los e2e de HU-042 y HU-043.
- **Hallazgo:** si una tarea se reasignaba mientras el colaborador la tenía abierta, al recargar la lista desaparecía junto con su mensaje de error. Ahora el aviso va arriba de la página.

| HU | Antes | Ahora |
|---|---|---|
| HU-044 | Contrato de "mis tareas" sin detalle; el cambio de estado iba en un `PATCH` genérico | Página "Mis tareas", cambio de estado con RN-22, RN-24 y RN-25, y reabrir |

## Cambio `2026-11-24-hu-043-asignar` {#cambio-2026-11-24-hu-043-asignar}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (HU-043; el `PATCH` genérico de tareas se reemplaza por rutas por acción), `12-modelo-datos.md` §9 (RN-22), `design-system.md` (Campo de fecha: posición y teclado). En el código: slices `AsignarTarea`, `CrearTareaManual` y `ListarResponsables`, el modal de asignación, la página de tarea nueva y el componente `CampoFecha` en la web |

### El problema (por qué hubo que cambiar)

1. Las tareas del plan (HU-042) nacían sin dueño. HU-043 pide asignarlas solo a vínculos activos de la empresa, con fecha límite, y poder crear tareas manuales.
2. El contrato tenía un solo `PATCH /api/plan-trabajo/tareas/{id}` para estado, responsable, fecha y prioridad. Los permisos se asignan por ruta, así que darle ese `PATCH` al colaborador para HU-044 (cambiar el estado de sus tareas) también le permitiría reasignarlas.
3. El design system definía el campo de fecha (dd/mm/aaaa, barras automáticas, calendario), pero no existía en el código.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Rutas por acción** | `PUT …/tareas/{id}/asignacion` (gestión) y, en HU-044, una ruta aparte para el estado | Cada permiso cubre una sola cosa: el colaborador no podrá reasignar |
| **Quién puede ser responsable** | Vínculos activos de la empresa con rol `admin_empresa`, `responsable_sst` o `colaborador`; **no** los encuestados | RN-07 y RN-22. Los encuestados son cuentas solo para responder encuestas (HU-115) |
| **Fecha límite obligatoria y no pasada** | Al asignar o crear, no puede ser anterior a hoy. Al reasignar, se puede conservar la que ya tenía aunque esté vencida | Lo que dice el design system (§ Campo de fecha); reasignar una tarea atrasada no obliga a inventar otra fecha |
| **"Hoy" es el de Honduras** | El backend usa la hora del servidor menos 6 horas (Honduras no tiene horario de verano); la web usa `America/Tegucigalpa` | La regla no cambia según la zona del servidor o del navegador |
| **Tarea manual ya asignada** | `POST …/tareas` exige título, prioridad, responsable y fecha; origen manual (RN-23), estado pendiente | "Cada tarea tenga dueño" desde que existe |
| **Completadas y canceladas no se reasignan** | 409 `plan.tarea_cerrada` | Ya no hay nada que asignar |
| **"Vencida" se calcula** | Pendiente o en progreso con fecha límite pasada: badge de error junto al estado, como define el design system | No es un estado guardado |
| **Notificación aparte** | Avisar al responsable (RN-77) queda para HU-081 (E2) | HU-043 no depende de M11 |

### Cómo quedó (resumen)

- **Backend:**
  - `GET /api/plan-trabajo/responsables`, `PUT /api/plan-trabajo/tareas/{id}/asignacion` y `POST /api/plan-trabajo/tareas`;
  - permisos `tarea.responsables`, `tarea.asignar` y `tarea.crear` para `admin_empresa` y `responsable_sst`.
- **Web:**
  - **Plan de trabajo:** cada tarea abierta tiene "Asignar" o "Reasignar", que abre un modal con el responsable (select con búsqueda) y la fecha límite. La tabla muestra la fecha límite y el badge "Vencida". "Nueva tarea" lleva a `/plan-de-trabajo/nueva`.
  - **Campo de fecha (`CampoFecha`):** se escribe con barras automáticas o se elige en el calendario, que empieza el domingo, marca hoy, deshabilita los días pasados y se maneja con teclado. Abre debajo o encima del campo sin que lo recorte el modal; en celular es una hoja inferior.

### Trabajo hecho

- Se implementó el backend con 15 pruebas nuevas:
  - asignar y reasignar, conservando una fecha vencida;
  - campos obligatorios y fecha pasada;
  - responsable suspendido, encuestado o de otra empresa;
  - tarea cerrada;
  - tarea manual y sus validaciones;
  - lista de responsables, aislamiento entre empresas y permisos.

  Pasan las 167 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real (8 casos):
  - tabla sin asignar;
  - responsables posibles;
  - validaciones de la fecha;
  - asignar;
  - calendario con teclado y Esc dentro del modal;
  - tarea vencida reasignada;
  - tarea manual;
  - modo oscuro y celular (hoja inferior).

  Siguen pasando los e2e de HU-042.
- **Hallazgo:** dentro del modal, el cuerpo con desplazamiento recortaba el calendario. Ahora se coloca con posición fija junto al campo.

| HU | Antes | Ahora |
|---|---|---|
| HU-043 | Contrato con un `PATCH` genérico; tareas sin responsable | Asignar y reasignar con reglas de responsable y fecha, tareas manuales ya asignadas, badge "Vencida" y campo de fecha del design system |

## Cambio `2026-11-24-hu-042-plan` {#cambio-2026-11-24-hu-042-plan}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 24 de noviembre de 2026 |
| **Alcance** | `12-modelo-datos.md` (Tarea: UQ parcial por `ControlId`), `18-contratos-api-mvp.md` (HU-042: propuesta, generación y lista de tareas). En el código: entidad `Tarea` y su migración `TareaPlanHu042`, módulo `Plan` (slices `ObtenerPropuestaPlan`, `GenerarPlan`, `ListarTareas`) y la página del plan en la web. La etiqueta de riesgo de la web pasó a `shared/riesgo` porque la usan la matriz y el plan |

### El problema (por qué hubo que cambiar)

1. HU-042 pide convertir riesgos y controles en tareas "según las plantillas", ordenadas por prioridad, revisables antes de confirmar y sin duplicarse al generar dos veces. La tabla `Tarea` estaba en el modelo, pero no en el código.
2. El contrato pedía `incluirPlantillasRubro` y devolvía un `planId`, pero no existen plantillas por rubro ni una entidad "plan": el plan son las tareas de la empresa.
3. El modelo solo impedía duplicar tareas por plantilla de cada riesgo. Un control propio (sin plantilla) podía generar su tarea dos veces.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **De dónde salen las tareas** | Cada control propuesto sin tarea produce una que lo implementa; cada plantilla activa del peligro **sin** tipo de control (tarea modelo) produce otra. Las plantillas que sugieren un control solo entran si el control se aceptó (HU-039) | "Riesgos y controles producen tareas según las plantillas", sin saltarse la confirmación de RN-76 |
| **Solo riesgos evaluados** (decidido por el equipo) | Los riesgos sin evaluación no entran; la vista previa dice cuántos faltan y enlaza a la matriz | La prioridad sale del nivel, así que sin nivel no hay orden |
| **Prioridad por nivel** | Alto o crítico 1, medio 2, bajo 3, según la última evaluación inicial. Orden: nivel más alto primero, luego controles por efectividad (RN-21) y luego tareas modelo | Cumple "empezando por los riesgos más altos" |
| **Revisar desmarcando** (decidido por el equipo) | `GET …/propuesta` no guarda nada; la web muestra todo marcado y se desmarca lo que no se quiere. `POST …/generacion` recibe las claves elegidas y recalcula la propuesta en el servidor | Revisión real antes de confirmar, sin confiar en lo que mande el cliente; lo desmarcado se vuelve a proponer |
| **No duplicar** | Lo que ya tiene tarea no se propone; la base lo garantiza con la UQ por plantilla de cada riesgo (ya documentada) y una nueva UQ parcial por `ControlId` | Generarlo dos veces crea 0 la segunda vez, aunque haya dos pestañas abiertas |
| **Estado como texto con CHECK** (decidido por el equipo) | `Tarea.Estado` sigue a `12` (varchar con CHECK), como Encuesta y Accidente | Coherencia con el modelo documentado |
| **Sin entidad de plan** | Se quitan `planId`, `incluirControlesPropuestos` e `incluirPlantillasRubro` del contrato | El modelo no tiene un "plan" aparte |

### Cómo quedó (resumen)

- **Base:** tabla `Tarea` con las FK compuestas y CHECK de `12` (un solo origen, control del mismo riesgo, responsable y fecha para iniciarse, `CompletadaEn` solo si está completada) y las dos UQ parciales.
- **Backend:** `GET /api/plan-trabajo/propuesta`, `POST /api/plan-trabajo/generacion` y `GET /api/plan-trabajo/tareas`, con los permisos `plan.propuesta`, `plan.generar` y `tarea.listar` para `admin_empresa` y `responsable_sst`.
- **Web (`/plan-de-trabajo`, enlace en Inicio):**
  - **Tareas propuestas:** agrupadas por riesgo (con su nivel y prioridad), cada una con su origen y si pide evidencia. Se desmarcan y se confirman con "Agregar N tareas al plan".
  - **Tareas del plan:** tabla con prioridad, nivel del riesgo, estado ("Pendiente") y responsable ("Sin responsable" hasta HU-043).
  - **Sin propuesta:** dice "El plan está al día" y cómo aparecen tareas nuevas.

### Trabajo hecho

- Se implementó el backend con 11 pruebas nuevas:
  - qué se propone y que no se guarda nada;
  - orden por nivel y riesgos sin evaluar;
  - confirmar solo lo elegido, con su origen;
  - no duplicar y controles nuevos después de generar;
  - orden de la lista dentro de un riesgo;
  - validación, aislamiento entre empresas y permisos;
  - la UQ por control en la base.

  Pasan las 152 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real (6 casos):
  - propuesta ordenada;
  - desmarcar;
  - confirmar;
  - plan al día sin duplicar;
  - control nuevo;
  - celular y modo oscuro.

  Siguen pasando los e2e de HU-039 y HU-040.
- **Hallazgo:** las tareas confirmadas juntas comparten `CreadaEn`, así que la lista no puede desempatar por fecha. Se ordena por riesgo, tipo de control y título.
- **Pendiente para el equipo:** sin plantillas de tareas cargadas (HU-023 no las cubre), solo los controles producen tareas.

| HU | Antes | Ahora |
|---|---|---|
| HU-042 | Contrato con opciones sin respaldo en el modelo y un `planId`; sin tabla `Tarea` en el código | Propuesta determinista por nivel, revisión desmarcando y confirmación sin duplicados; `Tarea` en la base |

## Cambio `2026-11-23-hu-040-residual` {#cambio-2026-11-23-hu-040-residual}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (HU-040 y `evaluacionResidual` en `RiesgoResponseDto`), `design-system.md` (Etiqueta de riesgo: inicial y residual). En el código: slice `EvaluarRiesgoResidual`, última residual en la respuesta del riesgo, y la sección de evaluación y la columna "Residual" en la web. Sin cambios de modelo: `EvaluacionRiesgo.Tipo` ya tenía `residual` (D10) |

### El problema (por qué hubo que cambiar)

1. HU-040 pide evaluar el riesgo con los controles aplicados, separado de la inicial, y ver ambos niveles lado a lado.
2. El contrato dejaba abierto si el tipo `residual` venía en el cuerpo o lo fijaba el servidor, y no decía cuándo se puede hacer una residual.
3. El riesgo solo traía la última evaluación inicial.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Ruta propia y tipo fijo** | `POST /api/riesgos/{id}/evaluaciones-residual`, con el tipo `residual` fijado por el servidor | El cliente no puede guardar una residual como inicial ni al revés |
| **Pide la inicial y un control** | Sin evaluación inicial responde 409 `riesgos.sin_evaluacion_inicial`; sin controles, 409 `riesgos.sin_controles` | La residual mide "el riesgo con los controles aplicados" y se compara con la inicial: sin una de las dos no tiene sentido |
| **La matriz sigue con la inicial** | El mapa, el orden y los filtros de nivel usan la última evaluación inicial; la residual va en `evaluacionResidual` y en su propia columna | La matriz no cambia de significado según el riesgo, y el residual se ve sin perder el nivel original |
| **Comparación a la vista** | En el detalle, los paneles "Inicial" y "Residual" lado a lado y una frase: bajó, siguió igual o subió (estas dos últimas sugieren revisar los controles) | Responde directo "para saber si bajó" |
| **Historial** | Cada residual es una fila nueva (RN-20); volver a evaluar la inicial no toca la residual | El historial completo queda para HU-041 |

### Cómo quedó (resumen)

- **Backend:** `POST /api/riesgos/{id}/evaluaciones-residual` (permiso `riesgo.evaluar_residual` para `admin_empresa` y `responsable_sst`) y `evaluacionResidual` en la lista y el detalle del riesgo.
- **Web:**
  - **Detalle del riesgo:** paneles "Inicial" y "Residual" con su botón para evaluar; el residual se habilita con al menos un control y usa el mismo formulario (mapa y escalas de RN-80).
  - **Matriz:** columna "Residual"; en celular, bajo el nivel. El texto del mapa aclara que ubica por la evaluación inicial.

### Trabajo hecho

- Se implementó el backend con 10 pruebas nuevas:
  - se guarda aparte y el riesgo trae las dos;
  - una residual nueva no borra la anterior;
  - la matriz sigue usando la inicial;
  - condiciones (inicial y controles), validaciones y riesgo fuera de la matriz;
  - aislamiento entre empresas y permisos.

  Pasan las 141 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real (8 casos):
  - paneles lado a lado;
  - habilitar con un control;
  - guardar y comparar;
  - volver a evaluar y cancelar;
  - reevaluar la inicial sin tocar la residual;
  - riesgo sin evaluar;
  - columna en la matriz, celular y modo oscuro.

  Siguen pasando los e2e de HU-037, HU-038 y HU-039 (el de HU-037 se ajustó al nuevo formato del resumen, en dos líneas).

| HU | Antes | Ahora |
|---|---|---|
| HU-040 | Contrato con la ruta y el cuerpo, sin reglas | Residual aparte de la inicial, con sus condiciones, mostrada lado a lado con la comparación de niveles |

## Cambio `2026-11-23-hu-039-controles` {#cambio-2026-11-23-hu-039-controles}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `12-modelo-datos.md` (`Control.PlantillaTareaId`, su UQ parcial y §9 RN-19 y RN-76), `15-diagramas-drawio.md` (columna y relación), `18-contratos-api-mvp.md` (HU-039, filtro `sinControl`, `altosSinControl` y `totalControles`), `design-system.md` (badges "Sin control" y de control). En el código: slices `ListarControlesSugeridos`, `CrearControl` y `ListarControles`, migración `ControlPlantillaHu039`, y la sección de controles en la web |

### El problema (por qué hubo que cambiar)

1. HU-039 pide que Norvia sugiera controles desde las plantillas del peligro y que cada sugerencia se acepte, edite o descarte. `Control` no guardaba de qué plantilla salía, así que no había forma de saber cuáles ya se habían aceptado, sobre todo si se aceptaban editadas.
2. RN-19 ("un riesgo alto o crítico exige al menos un control") figuraba en `12` §9 como "validación al evaluar". Pero al evaluar todavía no se sabe si el riesgo será alto, y no puede tener controles antes de existir la evaluación. Bloquear la evaluación tampoco sirve: el criterio pide además que "se señalen los riesgos altos sin control", es decir, que puedan existir un tiempo.
3. El contrato solo tenía `POST` y `GET …/controles`; faltaban las sugerencias.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **`Control.PlantillaTareaId` (opcional)** | FK a `PlantillaTarea` cuando el control sale de una sugerencia, con UQ parcial `(RiesgoEmpresaId, PlantillaTareaId)`. Null en los controles propios | Una sugerencia aceptada, aunque se haya editado, no vuelve a sugerirse ni se acepta dos veces. También deja el rastro para el plan de trabajo (M5) |
| **RN-19 se señala** | La matriz cuenta los altos y críticos sin controles (`altosSinControl`), los filtra (`sinControl=true`) y les pone el badge "Sin control". El riesgo muestra un aviso hasta que tenga uno | Cumple los dos criterios ("exige" y "se señalan") sin impedir evaluar. `12` §9 queda con este punto de aplicación |
| **Orden por efectividad** | Sugerencias y controles van por la jerarquía de RN-21: eliminación, sustitución, ingeniería, administrativo y equipo de protección personal | Es lo que pide el criterio "de mayor a menor efectividad"; la jerarquía ya era el orden del tipo |
| **Descartar no se guarda** | Descartar quita la sugerencia de la vista mientras el riesgo está abierto; al volver, reaparece | RN-76 dice que nada se guarda sin confirmar, y el modelo no tiene dónde guardar un descarte. Si el equipo quiere que el descarte dure, hace falta una tabla o columna nueva |
| **Sugerencia válida** | Solo se aceptan plantillas activas, del peligro del riesgo y con tipo de control (400 `riesgos.sugerencia_invalida`). Un riesgo sugerido o descartado no recibe controles (409 `riesgos.no_en_matriz`) | El cliente no puede colgar a un riesgo una plantilla de otro peligro |
| **Estado inicial `propuesto`** | Todo control nace propuesto; pasar a `implementado` queda para el plan de trabajo | HU-039 solo define controles |

### Cómo quedó (resumen)

- **Backend:**
  - `GET /api/riesgos/{id}/controles/sugeridos`, `POST` y `GET /api/riesgos/{id}/controles`, con los permisos `riesgo.control.sugeridos`, `riesgo.control.crear` y `riesgo.control.listar` para `admin_empresa` y `responsable_sst`.
  - `totalControles` en el riesgo, `altosSinControl` en el mapa y el filtro `sinControl`.
- **Web:**
  - **Detalle del riesgo:** sección "Controles" con la lista, las sugerencias (aceptar, editar o descartar), el formulario de control propio y el aviso de RN-19.
  - **Matriz:** badge "Sin control", enlace junto al mapa y opción en el filtro de nivel.

### Trabajo hecho

- Se implementó el backend con 12 pruebas nuevas:
  - orden y filtro de las sugerencias;
  - que nada se guarde sin aceptar y que una aceptada no se repita;
  - controles propios y su orden;
  - validaciones, sugerencia de otro peligro y riesgo fuera de la matriz;
  - señal de altos sin control, aislamiento entre empresas y permisos.

  Pasan las 131 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real (10 casos):
  - señal en la matriz;
  - sugerencias en orden;
  - descartar y mostrar;
  - aceptar, aceptar editada y control propio con sus errores;
  - recarga, peligro sin plantillas, celular y modo oscuro.

  Siguen pasando los e2e de HU-036, HU-037 y HU-038.
- **Pendiente para el equipo:** no hay pantalla ni carga inicial de `PlantillaTarea` (HU-023 la lista entre los catálogos del staff), así que hasta cargarlas Norvia no sugiere controles.

| HU | Antes | Ahora |
|---|---|---|
| HU-039 | Contrato con alta y lista de controles; RN-19 "al evaluar" | Sugerencias desde las plantillas, aceptar (tal cual o editada), descartar o agregar propio; RN-19 se señala en la matriz y el riesgo |

## Cambio `2026-11-23-hu-038-ver-matriz` {#cambio-2026-11-23-hu-038-ver-matriz}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (HU-038 y `RiesgoResponseDto`), `design-system.md` (Mapa de calor, fila "Ver"). En el código: slice `ObtenerMatriz`, filtros de `ListarRiesgos`, clasificación del peligro en la respuesta del riesgo y la página de la matriz en la web |

### El problema (por qué hubo que cambiar)

1. La matriz solo era una lista de riesgos. HU-038 pide verlos ubicados por probabilidad y severidad, y una lista filtrable por peligro, clasificación del peligro, nivel y estado.
2. El contrato de `GET /api/riesgos/matriz` devolvía la lista completa con sus evaluaciones. El mapa solo necesita cuántos riesgos hay en cada celda, y la lista se filtra aparte.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Mapa con conteos** | `GET /api/riesgos/matriz` devuelve el total, los sin evaluar y las celdas con riesgos (por la última evaluación inicial) | El mapa se arma con poco, y la lista de una celda se pide con los filtros |
| **Filtros en el backend** | `GET /api/riesgos` acepta estado, texto, clasificación del peligro, nivel, sin evaluar y celda, validados con FluentValidation | Lo pide el criterio del backend; la web y cualquier otro cliente filtran igual |
| **"Estado" es el del riesgo** | En la matriz (confirmado), por revisar (sugerido) y descartado; por defecto, la matriz | Desde la matriz también se ven las sugerencias de todas las encuestas que esperan revisión |
| **Nivel más alto primero** | La lista se ordena por el nivel de la última evaluación, con los sin evaluar al final | Ayuda a "decidir qué atender primero" (HU-038) |
| **Celda como filtro** | Tocar una celda con riesgos filtra la lista; tocarla otra vez o la X lo quita | Del mapa a los riesgos concretos en un paso |

### Cómo quedó (resumen)

- **Backend:** `GET /api/riesgos/matriz`, filtros en `GET /api/riesgos` y `peligroClasificacion` en la respuesta del riesgo.
- **Web, matriz (`/riesgos`):**
  - **Mapa:** celdas con el número de riesgos, el total, los sin evaluar (enlace que filtra) y la leyenda.
  - **Filtros:** buscar, clasificación del peligro, nivel y estado.
  - **Lista:** cada riesgo abre su detalle.
  - **Estado sin matriz:** "Por revisar" y "Descartado" se muestran con su badge, y el filtro de nivel se desactiva.

### Trabajo hecho

- Se implementaron el mapa y los filtros con 9 pruebas nuevas: conteo por la última evaluación, orden, cada filtro, estado, filtros inválidos, aislamiento entre empresas y permisos. Pasan las 119 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real: mapa, orden, filtro por celda, por texto, clasificación, nivel, sin evaluar y estado, sin resultados, detalle, celular y modo oscuro.
- Se actualizaron el contrato y el design system.
- **Limitación conocida:** la búsqueda del backend distingue tildes (PostgreSQL sin la extensión `unaccent`): "electrico" no encuentra "Eléctrico".

## Cambio `2026-11-23-hu-037-evaluar-riesgo` {#cambio-2026-11-23-hu-037-evaluar-riesgo}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `07-reglas-negocio.md` (RN-80 nueva), `12-modelo-datos.md` §9, `10-historias-usuario.md` (reglas de HU-037), `18-contratos-api-mvp.md` (HU-037 y `RiesgoResponseDto`), `design-system.md` (Mapa de calor, fila "Elegir"). En el código: slice `EvaluarRiesgo`, clasificación en el dominio, última evaluación en la lista y el detalle del riesgo, y la página del riesgo en la web |

### El problema (por qué hubo que cambiar)

1. HU-037 pide elegir probabilidad y severidad "con su explicación visible", pero ningún documento decía qué significa cada valor del 1 al 5.
2. El contrato de la evaluación no incluía quién evaluó, y la lista de riesgos no traía la evaluación.
3. El design system definía el mapa de calor como un grupo de radios. Así, la explicación de cada valor quedaba fuera del control.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **RN-80: escalas con explicación** | Probabilidad: rara, improbable, posible, probable, casi segura. Severidad: insignificante, menor, moderada, mayor, catastrófica. Cada una con su descripción; propuesta por validar, igual que RN-16 | Quien evalúa sabe qué elegir, y dos personas evalúan con el mismo criterio |
| **Listas con explicación como control principal** | Probabilidad y severidad se eligen en dos listas de radios con la explicación; el mapa es un atajo sincronizado (tocar una celda elige las dos) | La explicación queda a la vista y es accesible, y el mapa sigue sirviendo para elegir rápido |
| **Solo riesgos confirmados** | Un riesgo sugerido o descartado responde 409 `riesgos.no_en_matriz` | Solo se evalúa lo que está en la matriz (RN-18) |
| **Historial y vigente** | Cada evaluación es una fila con quién y cuándo; la lista y el detalle muestran la más reciente (RN-20) | Volver a evaluar no pierde lo anterior |
| **Nivel y clasificación calculados** | El backend los calcula al responder (dominio: `EvaluacionRiesgo.Clasificar`); no se guardan | Una sola regla para el cálculo (RN-15, RN-16); la web solo la repite para la vista previa |

### Cómo quedó (resumen)

- **Backend:** `POST /api/riesgos/{id}/evaluaciones` crea la evaluación inicial. `GET /api/riesgos` y `GET /api/riesgos/{id}` traen la última en `evaluacion`, con el nombre de quien evaluó.
- **Web, página del riesgo (`/riesgos/:id`):**
  - datos del riesgo y su evaluación vigente: etiqueta "Medio · 6", los dos valores con su nombre, y "Evaluado por … el …";
  - "Volver a evaluar" parte de la vigente;
  - el formulario tiene el mapa de calor, las dos listas con explicación y el nivel calculado con el aviso de control para alto y crítico.
- **Web, matriz:** muestra la etiqueta de nivel con su color.

### Trabajo hecho

- Se implementó el caso de uso con 17 pruebas nuevas:
  - umbrales de RN-16;
  - valores fuera de escala y faltantes;
  - historial con evaluador;
  - riesgo fuera de la matriz;
  - aislamiento entre empresas y permisos.
- Pasan las 110 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real: elegir en las listas o en el mapa (también con teclado), guardar, volver a evaluar, Cancelar, celular, modo oscuro y riesgo inexistente.
- Se documentó RN-80 siguiendo la cadena de verdad (reglas, trazabilidad, historia) y se actualizaron el contrato y el design system.

## Cambio `2026-11-23-hu-036-agregar-riesgos` {#cambio-2026-11-23-hu-036-agregar-riesgos}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (M4: HU-036). En el código: módulo Riesgos del backend (slices `CrearRiesgo`, `ListarRiesgos`, `ObtenerRiesgo` y `ListarPeligrosDisponibles`, `RiesgosController`, 4 permisos) y en la web la matriz y el formulario para agregar un riesgo, con un select con búsqueda nuevo. No cambia el modelo de datos ni las reglas de negocio |

### El problema (por qué hubo que cambiar)

1. Solo entraban a la matriz los peligros que sugería una encuesta (HU-035). HU-036 pide agregar los que la encuesta no detectó, desde el catálogo o describiéndolos.
2. El contrato tenía solo `POST /api/riesgos`. Faltaban la lista de riesgos, para "mostrar los riesgos agregados", y una forma de que una empresa consultara el catálogo de peligros: `api/peligros` es solo del staff de plataforma.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Entra confirmado** | Un riesgo agregado a mano no pasa por "sugerido": queda en la matriz, y quien lo agrega figura como su revisor | Lo decide la persona responsable; no hay nada que revisar |
| **Actividad obligatoria** | Al agregar a mano se pide la actividad (hasta 200 caracteres) | Lo pide el criterio de HU-036 y distingue riesgos del mismo peligro en lugares distintos |
| **Sin duplicados** | No se repite el mismo peligro con la misma actividad (sin distinguir mayúsculas); en otra actividad, sí | La matriz no se llena de filas iguales |
| **Catálogo para empresas** | `GET /api/riesgos/peligros-disponibles` devuelve los peligros activos | La empresa elige del catálogo sin acceder a la administración del staff |
| **Lista de la matriz** | `GET /api/riesgos` devuelve los confirmados con su origen (encuesta o a mano) | Es la base de la matriz; HU-037 y HU-038 le suman la evaluación y el mapa de calor |
| **Administración y Responsable SST** | Los permisos son para `admin_empresa` y `responsable_sst`, igual que la revisión de sugerencias (HU-035) | Ambos roles gestionan la empresa y ven las mismas pantallas |

### Cómo quedó (resumen)

- **Backend:** el módulo Riesgos tiene 4 endpoints y 11 pruebas: creación, validación, peligro inactivo, duplicado, origen, aislamiento entre empresas y permisos.
- **Web, matriz (`/riesgos`):** lista los riesgos con el peligro, la actividad, la etiqueta "Sin evaluar", el origen y la fecha. En celular, la actividad y el origen bajan debajo del peligro.
- **Web, agregar riesgo (`/riesgos/nuevo`):** se elige el peligro del catálogo con un select con búsqueda (design-system.md § Select: buscador arriba y hoja inferior en celular) o se describe, y se indica la actividad.

### Trabajo hecho

- Se implementaron y probaron los endpoints. Pasan las 93 pruebas del backend.
- Se construyó la web y se probó de punta a punta contra la API real:
  - riesgo confirmado desde una encuesta;
  - búsqueda sin tildes y manejo con teclado;
  - agregar del catálogo y descrito;
  - duplicado;
  - celular y modo oscuro;
  - acceso solo para los roles de gestión.
- Se actualizó el contrato en `18-contratos-api-mvp.md`.

## Cambio `2026-11-23-design-system-riesgo` {#cambio-2026-11-23-design-system-riesgo}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `design-system.md` (Semánticas: riesgo; Modo oscuro § Riesgo; Etiqueta de riesgo; Mapa de calor de riesgo; Pendientes) y la guía visual (`design-system/index.html`, `design-system.css`, `design-system.js`). No cambia el modelo de datos, las reglas de negocio ni las historias |

### El problema (por qué hubo que cambiar)

1. Los colores de riesgo estaban en "Pendientes" porque no se sabía cuántos niveles usa la metodología. RN-16 ya lo fija: bajo (1–4), medio (5–9), alto (10–14) y crítico (15–25).
2. La matriz de riesgos (HU-037, HU-038) y su PDF (HU-075) los necesitan.
3. Había que evitar que un nivel de riesgo se confundiera con un aviso o con un badge de estado: un "Bajo" verde podía leerse como "Activo".

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Semáforo de 4 niveles** | Bajo `#22C55E`, medio `#FACC15`, alto `#F97316` y crítico `#DC2645` | Es la convención de las matrices de SST (IPER, GTC 45): se lee sin leyenda |
| **Distintos de los avisos** | Medio es amarillo (no el ámbar de advertencia), alto es naranja (los avisos no lo usan) y crítico es carmesí (no el rojo de error) | Un riesgo no parece un mensaje del sistema |
| **Iguales en claro y en oscuro** | También el color del texto encima: oscuro `#1D1D27` sobre verde, amarillo y naranja; blanco sobre crítico (contraste ≥ 4.5:1) | Una sola tabla de valores; sobre la superficie oscura los cuatro pasan 3:1 |
| **Nunca solo color** | Cada uso lleva el nombre del nivel y el número | En deuteranopia el verde y el naranja se parecen (ΔE 6.2), y ningún semáforo pasa esa prueba |
| **Etiqueta de riesgo neutra** | Chip gris con un cuadrado de 10px del color y "Alto · 12" en texto principal | No se confunde con los badges de estado, y un riesgo puede llevar los dos |
| **Mapa de calor 5 × 5** | Severidad en horizontal, probabilidad en vertical; celdas de 44px con el número; anillo para la celda elegida | Sirve para evaluar (HU-037), para ver la matriz (HU-038) y para imprimirla (HU-075) |

### Cómo quedó (resumen)

- **`design-system.md`:**
  - sección "Semánticas: riesgo" con las 8 variables (`--color-riesgo-{nivel}` y `-texto`);
  - Modo oscuro § Riesgo;
  - componentes "Etiqueta de riesgo" y "Mapa de calor de riesgo";
  - se quitó el ítem de "Pendientes".
- **La guía visual:** muestra las variables en la tabla de semánticas y un ejemplo con las etiquetas, el mapa y la leyenda, con anotaciones, en claro, en oscuro y en celular.

### Trabajo hecho

- **Validación con `validate_palette.js`,** contra `#FFFFFF` (claro) y `#1D1D27` (oscuro):
  - con visión normal pasan, con el par más cercano (crítico y alto) en ΔE 16;
  - en oscuro, el contraste contra la superficie es ≥ 3:1;
  - en claro, verde, amarillo y naranja quedan bajo 3:1 contra el blanco, y lo compensan el texto y la separación;
  - en daltonismo hay una advertencia, que se mitiga con el nombre y el número.
- **Contraste del texto encima de cada color:** 7.3, 10.9, 6.0 y 4.8:1.
- **Guía:** se comprobó en 1280 y 390px, en claro y en oscuro, sin errores de consola ni desborde.

## Cambio `2026-11-23-hu-035-revisar-peligros` {#cambio-2026-11-23-hu-035-revisar-peligros}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (HU-033 y HU-035). En el código: backend de HU-035 de la rama `feature/hu-035` integrado con `development`, campo `actividad` en la respuesta de HU-033 y la revisión en la web. No cambia el modelo de datos, las reglas de negocio ni las historias |

### El problema (por qué hubo que cambiar)

1. El contrato describía HU-035 con dos rutas (`POST /api/riesgos/sugeridos/{id}/confirmacion` y `/descarte`), pero el backend se implementó con una sola: `PATCH /api/encuestas/{id}/peligros-sugeridos/{riesgoId}`, con el estado en el cuerpo.
2. La lista de peligros sugeridos (HU-033) no devolvía la actividad indicada al confirmar: al volver a la página se perdía.
3. La web mostraba las sugerencias, pero no permitía revisarlas.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **El contrato sigue a la ruta implementada** | HU-035 queda documentada como `PATCH` sobre la sugerencia de la encuesta, con `estado` y `actividad` | El documento coincide con lo que la API responde |
| **`actividad` en la respuesta de HU-033** | Campo nuevo, `null` si no se indicó o no se revisó | La web muestra dónde se presenta cada riesgo confirmado |
| **Revisión desde los resultados** | Cada sugerencia "Por revisar" ofrece "Confirmar…" (con la actividad opcional) y "Descartar…" (con diálogo de confirmación) | Se decide con el respaldo y las preguntas a la vista, y como no se puede deshacer, se confirma antes |
| **Revisión concurrente** | Si otra persona ya la revisó (409), se avisa y la lista se recarga con su decisión | Nadie cree que su decisión se guardó cuando no fue así |

### Cómo quedó (resumen)

- **Backend:** HU-035 con sus 7 pruebas. Además, la prueba de HU-033 ahora confirma con el endpoint real y comprueba que la actividad vuelve en la lista.
- **Web:** la sección "Peligros sugeridos" dice cuántas sugerencias quedan por revisar. Las confirmadas muestran "En la matriz" y su actividad; las descartadas, "Descartado".

### Trabajo hecho

- Se integró la rama `feature/hu-035` con `development`, sin conflictos, y pasan las 82 pruebas del backend.
- Se agregó `actividad` a la respuesta de HU-033.
- Se construyó la revisión en la web y se probó de punta a punta contra la API real: confirmar con actividad y sin ella, descartar, cancelar, revisión concurrente, recarga, celular y modo oscuro.
- Se actualizó el contrato en `18-contratos-api-mvp.md`.

## Cambio `2026-11-23-hu-022-cambio-contrasena` {#cambio-2026-11-23-hu-022-cambio-contrasena}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `18-contratos-api-mvp.md` (sección Contraseña y `SesionResponseDto`). En el código: backend (slices `SolicitarCambioContrasena` y `ConfirmarCambioContrasena`, token del enlace, claim `email`, código HTTP 410) y web (páginas para pedir el enlace y elegir la contraseña nueva). No cambia el modelo de datos, las reglas de negocio ni las historias |

### El problema (por qué hubo que cambiar)

1. HU-022 pide confirmar desde el correo antes de cambiar la contraseña. Solo existía el cambio con la contraseña actual, que se usa en el primer ingreso con contraseña temporal.
2. El contrato de los dos endpoints estaba escrito (🚧), pero no decía cómo se guardaba el enlace ni cuántas veces servía.
3. Quien olvidaba su contraseña no tenía cómo recuperarla.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Enlace firmado, sin tabla nueva** | El token lleva el Acceso, el vencimiento y un sello de la contraseña actual, firmados. No se guarda en la base | El modelo sigue con 41 tablas y no hace falta una migración |
| **Un solo uso y 30 minutos** | Cuando la contraseña cambia, el sello deja de coincidir y el enlace ya no sirve. También vence a los 30 minutos | Un enlace viejo o reenviado no permite volver a cambiarla |
| **Respuesta igual exista o no la cuenta** | `solicitud` responde siempre 202 con el mismo mensaje y solo escribe a cuentas verificadas | No revela qué correos están registrados |
| **410 para un enlace que ya no sirve** | Vencido, usado o alterado responde 410 `auth.enlace_invalido` | La web explica el caso y ofrece pedir otro enlace |
| **El JWT lleva el correo** | Claim `email` en el token de sesión | Con sesión, la web envía el enlace al correo de la cuenta sin pedir que se escriba |
| **Mismo flujo para "olvidé mi contraseña"** | Desde el login se escribe el correo y se usa el mismo enlace | Quien no puede entrar recupera su cuenta sin ayuda |

### Cómo quedó (resumen)

- **Pedir el enlace (`POST /api/auth/contrasena/solicitud`):** envía el enlace al correo de la cuenta.
- **Confirmar (`POST /api/auth/contrasena/confirmacion`):** cambia la contraseña con el token. Vale en todas las empresas de la cuenta y cierra todas sus sesiones (HU-114).
- **Primer ingreso:** el cambio obligatorio con contraseña temporal no cambia.
- **En la web:**
  - "Cambiar contraseña" en el encabezado de la sesión.
  - "¿Olvidaste tu contraseña?" en el login.
  - La página del enlace (`/restablecer-contrasena`), que pide la contraseña nueva con la política a la vista.

### Trabajo hecho

- Se implementaron los dos endpoints con su validación (FluentValidation) y se agregó `TipoError.Expirado`, que se traduce a 410.
- Se agregaron 6 pruebas de backend: misma respuesta exista o no el correo, cambio en todas las empresas con cierre de sesiones, un solo uso, enlace vencido o alterado, política y repetición de la actual, y claim `email`.
- Las pruebas ya no usan SMTP: un capturador guarda los correos en memoria.
- Se probó de punta a punta en la web contra la API real.
- Se actualizó el contrato en `18-contratos-api-mvp.md`.

## Cambio `2026-11-23-design-system-tabla-celular` {#cambio-2026-11-23-design-system-tabla-celular}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `design-system.md` (Estados de componentes, fila "Fila de tabla"). No cambia el modelo de datos, las reglas de negocio ni las historias |

### El problema (por qué hubo que cambiar)

1. En la lista de personas (HU-021), cada fila tiene la acción "Editar acceso" en la última columna.
2. En celular, la tabla se desplazaba de lado y esa acción quedaba fuera de la pantalla: había que desplazar la tabla para encontrarla.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Columnas secundarias debajo del dato principal** | En celular se ocultan las columnas secundarias (rol, estado, fecha) y el rol y el estado pasan debajo del nombre | La fila cabe en el ancho de la pantalla y la acción queda a la vista |

### Cómo quedó (resumen)

- `design-system.md`: la fila "Fila de tabla" de Estados de componentes describe el comportamiento en celular.

### Trabajo hecho

- Se documentó la decisión y se comprobó en la lista de personas que, a 390px de ancho, la acción de cada fila queda dentro de la pantalla y la página no se desplaza de lado.

## Cambio `2026-11-23-design-system-peligros-sugeridos` {#cambio-2026-11-23-design-system-peligros-sugeridos}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `design-system.md` (Badges de estado y Resultados de encuesta) y la guía visual (`design-system/index.html` y `design-system.css`). No cambia el modelo de datos, las reglas de negocio ni las historias |

### El problema (por qué hubo que cambiar)

1. HU-033 sugiere peligros a partir de las respuestas, pero el design system no decía dónde mostrarlos ni cómo indicar cuántas respuestas respaldan cada uno.
2. Cada sugerencia queda registrada como un riesgo con estado (sugerido, confirmado o descartado), y la tabla de badges no tenía esa entidad.
3. Las sugerencias se calculan con las respuestas de todas las versiones, mientras que el detalle por pregunta usa solo la versión vigente: con menos de 3 respuestas, mostrar dos avisos seguidos confundía.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Card propia en los resultados** | Los peligros sugeridos van en una card entre los indicadores y el detalle por pregunta | Es lo que más sirve para armar la matriz de riesgos, y queda a la vista sin bajar por todas las preguntas |
| **Respaldo con la misma barra** | Por peligro: "Lo indican N de T respuestas · %" con la barra de los resultados y las preguntas que lo originaron con su cifra; orden por respaldo | Se comparan los peligros sobre la misma base y se sabe de dónde salió cada uno |
| **Badge "Peligro sugerido"** | Por revisar y Descartado en neutro; En la matriz en éxito | Sigue el significado fijo de cada color: sin empezar o fuera de uso es neutro, vigente es éxito |
| **Menos de 3 respuestas** | Una línea de texto secundario dentro de la card, no un segundo aviso | No se repiten dos avisos de anonimato seguidos |
| **Carga independiente** | Si fallan las sugerencias, la card muestra el error con "Reintentar" y el resto de los resultados se sigue viendo | Un fallo en una parte no deja la pantalla vacía |

### Cómo quedó (resumen)

- `design-system.md`: fila "Peligro sugerido" en la tabla de badges por entidad y fila "Peligros sugeridos" en la sección "Resultados de encuesta".
- La guía visual agrega el ejemplo de la card de peligros sugeridos, con su anotación, debajo del ejemplo de resultados.

### Trabajo hecho

- Se documentaron las decisiones de la tabla anterior en `design-system.md`.
- Se agregó el ejemplo a la guía y se revisó en claro y en oscuro, sin errores en la consola.

## Cambio `2026-11-23-design-system-datos` {#cambio-2026-11-23-design-system-datos}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 23 de noviembre de 2026 |
| **Alcance** | `design-system.md` (secciones Color, Modo oscuro, Select y Resultados de encuesta) y la guía visual (`design-system/index.html`, `design-system.css`, `design-system.js`). No cambia el modelo de datos, las reglas de negocio ni las historias |

### El problema (por qué hubo que cambiar)

1. Al construir la pantalla de resultados de una encuesta (HU-032) hacían falta colores para las barras de un gráfico, y el design system no los tenía. Usar el violeta de marca rompía la regla "el violeta significa acción", y usar el azul de los avisos mezclaba un dato con un mensaje.
2. No estaba definido cómo mostrar la distribución de respuestas por pregunta ni las respuestas breves, y las respuestas breves llegan en el orden en que se guardaron: alguien que sepa quién respondió primero podría deducir quién escribió cada una.
3. En el editor de encuestas (HU-030), la regla "con 5 opciones o menos, radios" obligaba a repetir tres radios en cada pregunta para elegir su tipo, lo que alargaba mucho la pantalla.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Colores para datos** | Variables nuevas `--color-dato-serie` (claro `#2A78D6`, oscuro `#3987E5`) y `--color-dato-pista` (claro `#CDE2FB`, oscuro `#0D366B`), tomadas de la paleta de referencia de visualización y validadas contra el fondo de las cards en los dos modos | Los gráficos no usan la marca ni los colores de aviso, y se leen bien en claro y en oscuro |
| **Pista oscura en modo oscuro** | El fondo de la barra es un paso del mismo azul que se aleja del dato | Con un tono cercano, una opción con 0 % parecía una barra llena |
| **Una serie, un tono, sin leyenda** | Las cifras van impresas en color de texto, nunca en el color del dato | La identidad no depende del color y no hace falta leyenda |
| **Resultados como lista de medidores** | Por opción: nombre, barra de 8px y "cantidad · %"; en el orden de la encuesta; todas las barras de una pregunta del mismo largo; sin tortas | Las barras sobre una misma base se comparan mejor que las porciones de una torta |
| **Respuestas breves en orden alfabético** | Se muestran sin autor y ordenadas alfabéticamente, no en el orden en que se guardaron | El orden no permite deducir quién escribió cada respuesta (anonimato, RN-72) |
| **Menos de 3 respuestas** | Solo los indicadores y un aviso que explica por qué se oculta el detalle | Aplica RN-73 en la pantalla y la persona entiende por qué no ve el detalle |
| **Excepción del select** | Si el mismo control se repite en cada fila de un editor (el tipo de respuesta de cada pregunta), se usa select aunque haya 5 opciones o menos | El editor no se alarga y lo que se edita sigue a la vista |

### Cómo quedó (resumen)

- `design-system.md`: secciones nuevas "Semánticas: datos (gráficos)" (en Color), "Datos" (en Modo oscuro) y "Resultados de encuesta" (en Estados de componentes), más la excepción en Select.
- La guía visual muestra las dos variables nuevas en la tabla de semánticas y un ejemplo de resultados de encuesta con sus anotaciones, en claro, en oscuro y en celular.

### Trabajo hecho

- Se validaron los colores de datos contra `--color-bg-surface` en claro y en oscuro (contraste, luminosidad y croma).
- Se documentaron las decisiones de la tabla anterior en `design-system.md`.
- Se agregaron a la guía las variables, las filas de la tabla semántica y el ejemplo de resultados, y se comprobó que en los tres anchos las barras de una pregunta midan lo mismo y que las cifras no se partan.

## Cambio `2026-11-22-hu-047-backend` {#cambio-2026-11-22-hu-047-backend}

| | |
|---|---|
| **Quién documentó** | Jesús Zepeda |
| **Fecha** | 22 de noviembre de 2026 |
| **Alcance** | Backend en rama `feature/hu-047` (entidad `Accidente`, migración `EventosM6Hu047`, slices `ReportarEvento`, `ListarEventos` y `ObtenerEvento`, `EventosController`, 3 permisos en `CatalogoPermisos`, pruebas funcionales y de aislamiento en `Norvia.Tests`) y contratos de `18-contratos-api-mvp.md` |

### Qué se implementó y por qué se acotó así

1. **Núcleo de `HU-047` desacoplado de `HU-100`:** la subida de evidencias (`POST /api/eventos/{id}/evidencias`) requiere la tabla `Archivo` y el almacenamiento externo gratuito (`HU-100`), todavía inexistentes en el backend. Para no mezclar dos HUs ni bloquear `HU-047` esperando credenciales cloud, se implementó el registro y consulta de `Accidente` y se dejó el endpoint de evidencias marcado explícitamente como pendiente de `HU-100`.
2. **Esquema `Accidente` completo desde esta migración:** la tabla `Accidente` ya incluye las columnas y `CHECK` reservados para cierre/descarte (`CerradoEn`, `DescartadoPorId`, `MotivoDescarte`, `DescartadoEn` y FK compuesta a `VinculoEmpresa`), comentados como pendientes de `HU-049` para evitar migraciones conflictivas después.
3. **Permisos alineados a `RN-27` y `RN-74`:** cualquier vínculo activo (`admin_empresa`, `responsable_sst`, `colaborador`, `encuestado`) puede reportar de forma anónima en `POST /api/eventos`, pero solo `admin_empresa` y `responsable_sst` pueden listar y ver el detalle (`GET /api/eventos`, `GET /api/eventos/{id}`).
4. **Filtros `snake_case` en query y validaciones:** `GET /api/eventos` acepta `?estado=&tipo=&esGrave=` validando explícitamente el formato `snake_case` de la API y devolviendo orden descendente por `registradoEn`; `POST /api/eventos` rechaza fechas futuras (> 5 min con `eventos.fecha_futura`) y hace cumplir la regla de `estadoEnfermedad` (`RN-26`).

---

## Cambio `2026-11-22-design-system` {#cambio-2026-11-22-design-system}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 22 de noviembre de 2026 |
| **Alcance** | Archivos nuevos `design-system.md` y carpeta `design-system/` (`index.html`, `design-system.css`, `design-system.js`), más el workflow `.github/workflows/pages.yml` y el punto 5 (estilos) de §9 en `16-arquitectura-backend-frontend.md`. No cambia el modelo de datos, las reglas ni las historias |

### El problema (por qué hubo que cambiar)

1. El sistema de diseño (colores, tipografía, espaciado, estados) se definió en una sesión aparte y no estaba en el repositorio, así que el equipo no tenía una referencia común para empezar el front.
2. La guía visual era un solo HTML con el CSS y el JS adentro y con 115 estilos sueltos en las etiquetas, difícil de mantener.
3. Faltaban componentes que el MVP necesita: los controles de la encuesta, el select, la fecha, el modal y la confirmación, los estados de los registros y las pantallas vacías o con error.
4. Algunos textos de la guía no aplicaban a Norvia o sobraban (principios, explicaciones largas, un badge de marca que contradecía la regla "la marca no comunica estados").

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Dos piezas** | `design-system.md` guarda las decisiones y las variables (nombre + valor); `design-system/` es la guía visual con ejemplos | El `.md` es la fuente; la guía se mira y se comparte |
| **HTML, CSS y JS separados** | La guía no tiene estilos sueltos: todo son clases en `design-system.css` | Se mantiene como el código del front |
| **Publicación en GitHub Pages** | Un workflow publica solo `design-system/` en cada push a `main` que la cambie | El equipo la abre con un enlace, sin exponer el resto de la documentación |
| **Radio de la familia del checkbox** | Relleno de marca con punto blanco; opciones siempre en columna; el error va una vez debajo del grupo | Coherencia visual y funciona con la personalización por empresa |
| **Pregunta de encuesta** | Enunciado numerado, `*` para obligatorias, 12px enunciado → opciones, 32px entre preguntas, una sola card | El front pinta cada pregunta igual según su tipo |
| **Select** | Se ve como un campo de texto; con 5 opciones o menos se usan radios; búsqueda desde ~10; en celular, hoja inferior | Listas largas usables y sin desplegables tapados por el teclado |
| **Campo de fecha** | dd/mm/aaaa, se escribe o se elige; semana desde el domingo; hora aparte en 12 horas; el accidente no admite fechas futuras | Formato de Honduras y menos errores de captura |
| **Modal y confirmación** | Modal de 400 o 560px; la confirmación pregunta con la acción y el objeto y usa un verbo concreto | Acciones como dar de baja quedan claras |
| **Botón de peligro** | Variables nuevas `--color-action-danger` (`#DC2626`), `-hover` (`#B91C1C`) y `-pressed` (`#991B1B`); solo en diálogos de confirmación | La marca significa "acción", no "cuidado"; no se personaliza por empresa |
| **Badges de estado** | Cinco colores con un solo significado: neutro (sin empezar o fuera de uso), info (en curso), éxito (vigente o completado), advertencia (necesita atención), error (falló o venció); sin badge de marca | Cada estado de empresa, vínculo, encuesta, tarea, accidente y política se lee igual en todo Norvia |
| **Estados de pantalla** | Vacía al inicio y sin resultados por separado; cargando con skeleton; error al cargar en el lugar del contenido; "sin acceso" y "no existe" muestran el mismo mensaje | El mismo mensaje no confirma que un recurso existe en otra empresa |
| **Íconos** | Lucide, trazo 1.5px, tamaños 16, 20 y 32px; nunca comunican solos | Un solo estilo y accesible |
| **Tailwind v4 en el front** | Las variables del design system se declaran en `@theme`; se quitan la paleta, los radios, las sombras y los pasos de espaciado por defecto; sin valores arbitrarios; modo oscuro por `data-theme` | Las clases solo permiten los valores de la guía y la personalización por empresa funciona sin cambiar componentes |

### Cómo quedó (resumen)

- `design-system.md` tiene las secciones nuevas: Íconos, Controles de selección y área de texto, Select, Modal, Diálogo de confirmación, Badges de estado, Campo de fecha, Estados de pantalla y Pregunta de encuesta, más las filas de radio, área de texto y botón de peligro en la tabla de estados.
- La guía (`design-system/index.html`) muestra un ejemplo de cada uno, en claro y en oscuro, y en celular.
- Pendientes que siguen abiertos: colores de riesgo (falta definir cuántos niveles tiene la matriz), breakpoints definitivos, revisar las propuestas marcadas "(P)" y la pantalla de configuración de la personalización por empresa.

### Trabajo hecho

- Se separó la guía en tres archivos y se pasaron los 115 estilos sueltos a clases.
- Se quitaron de la guía el encabezado, la sección de principios, textos largos de marca, neutros y sombras, la ilustración de espaciado y el badge de marca.
- Se movió la guía a `design-system/index.html` y se agregó el workflow de GitHub Pages.
- Se definieron y documentaron los componentes de la tabla anterior, con sus ejemplos en la guía.
- `16-arquitectura-backend-frontend.md` §9: punto 5 con la configuración de Tailwind.

---

## Cambio `2026-11-16-hu-033` {#cambio-2026-11-16-hu-033}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 16 de noviembre de 2026 |
| **Alcance** | Código de la rama `feature/hu-033` (slice `Encuestas/ObtenerPeligrosSugeridos`, permiso `encuesta.peligros_sugeridos`, 7 pruebas en `Norvia.Tests`) y contrato en `18-contratos-api-mvp.md`. No cambia el modelo de datos ni las reglas |

### El problema (por qué hubo que cambiar)

1. Con las respuestas de HU-031 ya guardadas, faltaba convertirlas en peligros sugeridos para construir la matriz (RN-13).
2. El contrato de `18` no decía:
   - si las sugerencias se guardan o se calculan;
   - cómo se evitan duplicados;
   - qué pasa al cambiar la relación pregunta-peligro;
   - si aplica el mínimo de respuestas del reporte anónimo.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Se calcula con la copia de cada versión** | Cuentan el peligro de `EncuestaPregunta` y la exposición de `EncuestaOpcion` de la versión contestada | Respeta RN-12; una versión nueva con otro peligro sugiere ese peligro |
| **Se registra una vez** | Cada peligro nuevo se guarda como `RiesgoEmpresa` `sugerido`, protegido por la UQ `(EncuestaId, PeligroId)` | RN-14 y "sin repetirlas"; HU-035 confirma o descarta esa fila |
| **El respaldo no se guarda** | `respuestasConExposicion` se calcula al consultar y cuenta respuestas distintas | 3FN ("Datos que no se guardan" en `08`) |
| **Lo revisado no se toca** | Una sugerencia confirmada o descartada conserva su estado | No se pisa la decisión del Responsable SST |
| **Mínimo de 3 respuestas** | Con menos, `detalleOculto: true` y no se registra nada | Mismo criterio de anonimato que el reporte (RN-73) |
| **Respuesta con objeto** | `PeligrosSugeridosResponseDto` en lugar de una lista suelta | Lleva el total de respuestas y el aviso de detalle oculto |

### Trabajo hecho

- Slice `ObtenerPeligrosSugeridos`, su repositorio y la ruta en `EncuestasController`.
- Permiso `encuesta.peligros_sugeridos` para `admin_empresa` y `responsable_sst`, igual que el reporte.
- 7 pruebas nuevas, con encuestas y respuestas armadas en la base:
  - con menos de 3 respuestas no se muestra nada;
  - conteo en selección única y múltiple;
  - las mismas respuestas dan el mismo resultado y las nuevas no duplican;
  - una versión nueva cambia el peligro;
  - una sugerencia confirmada se conserva;
  - otra empresa recibe 404 y un colaborador recibe 403.
- `18`: contrato y anexo.

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-033 | Contrato 🚧 con una lista sin reglas de registro | ✅ Sugerencias calculadas, registradas una vez y con respaldo por pregunta |

---

## Cambio `2026-11-16-hu-029` {#cambio-2026-11-16-hu-029}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 16 de noviembre de 2026 |
| **Alcance** | Código de la rama `feature/hu-029` (módulo `Encuestas`: slice `ListarCategoriasDisponibles`, permiso `encuesta.categoria.listar`, 6 pruebas en `Norvia.Tests`) y contrato en `18-contratos-api-mvp.md`. No cambia el modelo de datos ni las reglas |

### El problema (por qué hubo que cambiar)

1. Para armar una encuesta, el Responsable SST necesita ver qué categorías aplican al rubro de su empresa y qué preguntas traería cada una (RN-11).
2. El contrato de `18` solo mostraba el texto y el tipo de cada pregunta, sin opciones ni obligatoriedad, y no decía qué pasa si la empresa aún no tiene rubro.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Un solo endpoint de lectura** | Categorías y vista previa en la misma respuesta; la elección se envía al crear la encuesta (HU-030) | Coincide con el contrato y no guarda selecciones a medias |
| **Rubro tomado del token** | El servidor busca el rubro de la empresa de la sesión | El cliente no puede pedir categorías de otro rubro (RN-06) |
| **Solo lo activo** | Las categorías y preguntas desactivadas en HU-023 no se ofrecen | Lo retirado del catálogo no entra en encuestas nuevas |
| **Sin rubro, 409** | `encuestas.empresa_sin_rubro` mientras el perfil (HU-026) no tenga rubro | RN-10: sin rubro no hay encuesta |
| **Sin tablas nuevas** | HU-029 solo lee el catálogo existente | La regla del equipo de convertir enums en tablas sembradas con FK se aplicará desde HU-030, que crea las tablas de encuesta |

### Trabajo hecho

- `Features/Encuestas/ListarCategoriasDisponibles/`, su repositorio y `EncuestasController`.
- Permiso `encuesta.categoria.listar` para `responsable_sst`.
- 6 pruebas nuevas en `Norvia.Tests/Encuestas`: solo lo activo y en orden, cada empresa ve su rubro, 409 sin rubro, y 403 para colaborador, encuestado y staff. La suite completa (21) pasa.
- `18`: contrato y anexo.

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-029 | Contrato 🚧 | ✅ Categorías del rubro con vista previa de preguntas |

---

## Cambio `2026-11-16-hu-098` {#cambio-2026-11-16-hu-098}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 16 de noviembre de 2026 |
| **Alcance** | Proyecto nuevo `backend/Norvia.Tests` (rama `feature/hu-098`), `public partial class Program` en la API, sección de pruebas y checklist en `16-arquitectura-backend-frontend.md`, y estado de HU-098 en `18`. No cambia el modelo de datos ni las reglas |

### El problema (por qué hubo que cambiar)

1. El aislamiento multiempresa es lo que más pesa en la rúbrica, y hasta ahora solo se había probado a mano en bases temporales.
2. Sin pruebas automáticas, un cambio futuro (un `IgnoreQueryFilters` de más, una FK sin `EmpresaId`) podía abrir una fuga sin que nadie lo notara.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **API real en memoria** | `WebApplicationFactory<Program>` con todo el pipeline: JWT, middleware de permisos, filtro de validación | Se prueba lo mismo que usa el front, no una simulación |
| **PostgreSQL desechable** | Testcontainers levanta `postgres:16-alpine`, aplica las migraciones y lo borra al terminar | No toca la base de desarrollo ni depende del `.env`; corre igual en CI |
| **Datos preparados en la base** | Las empresas de prueba se crean con los servicios reales de hash y cifrado; lo que se prueba se hace por HTTP | No depende del registro público de HU-017, que sigue pendiente |
| **Dos niveles** | Por la API (RN-05, RN-06) y en la capa de datos (filtro, interceptor y FK compuestas: RN-07, D15) | Si la aplicación falla, la base todavía impide mezclar empresas |
| **Pruebas independientes** | Cada una crea sus empresas con correos y RTN únicos | Se pueden correr en cualquier orden |

### Cómo quedó (resumen)

15 pruebas, todas en verde, en unos 30 segundos:

- **Consultar:** la lista de vínculos solo trae los de la empresa de la sesión; ver uno de otra empresa responde 404.
- **Registrar:**
  - el alta usa la empresa del token aunque el cliente envíe otra;
  - dar acceso en A a una persona de B no cambia nada en B.
- **Editar y retirar:**
  - cambiar el rol, suspender o dar de baja un vínculo de otra empresa responde 404 y no lo modifica;
  - suspender a alguien en A no le quita el acceso a B.
- **Sesión:**
  - no se abre sesión en una empresa sin vínculo, ni con un identificador alterado;
  - el staff no accede a datos de empresas.
- **Base de datos:**
  - el filtro global solo muestra la empresa de la sesión, y nada sin sesión;
  - el interceptor impone la empresa de la sesión al insertar e impide cambiarla;
  - la FK compuesta rechaza un historial de A que apunta a un vínculo de B.

### Trabajo hecho

- `Norvia.Tests` agregado a `Norvia.slnx` (xUnit, `Microsoft.AspNetCore.Mvc.Testing` 10.0.14, `Testcontainers.PostgreSql`).
- `public partial class Program;` al final de `Program.cs`.
- `16`: sección "Pruebas de aislamiento (HU-098)" y una línea en el checklist de PR.
- `18`: HU-098 en ✅.

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-098 | 🚧 Solo pruebas manuales | ✅ 15 pruebas automáticas (`dotnet test`) |

---

## Cambio `2026-11-16-hu-115` {#cambio-2026-11-16-hu-115}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 16 de noviembre de 2026 |
| **Alcance** | Código de la rama `feature/hu-115` (slices `CrearEncuestado` y `CrearEncuestadosLote`, pieza compartida `AltaDeVinculo`, campo `debeCambiarPassword` en la sesión) y contrato en `18-contratos-api-mvp.md`. No cambia el modelo de datos ni las reglas |

### El problema (por qué hubo que cambiar)

1. Los trabajadores que responden encuestas necesitan una cuenta propia (D5, RN-74), y cargarlos uno por uno no es práctico.
2. El lote del contrato no trae contraseña por fila, y el envío por correo (HU-118) es de E2.
3. HU-115 pide cambiar la contraseña en el primer ingreso, pero el login no lo informaba.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Contraseña generada por cuenta nueva** | 12 caracteres que cumplen HU-114, distintos por persona, devueltos una sola vez | Cada persona tiene su propia contraseña sin esperar a HU-118. En el alta individual también se puede enviar una |
| **El lote no se detiene** | Cada fila se valida aparte; los errores se informan con su número de fila y las válidas se guardan juntas | Criterio de HU-115 |
| **Pieza compartida `AltaDeVinculo`** | La lógica de crear o reutilizar la cuenta pasa de HU-020 a la raíz del módulo `Vinculos` | Un solo lugar para RN-02 y RN-65; los slices no se importan entre sí |
| **Solo informar el primer ingreso** | La sesión trae `debeCambiarPassword`; el front pide el cambio y la API no bloquea | Decisión del equipo |

### Cómo quedó (resumen)

- `POST /api/vinculos/encuestados` (201) y `POST /api/vinculos/encuestados/lote` (200, de 1 a 500 filas), solo para `admin_empresa`.
- Códigos de error por fila: `email_invalido`, `datos_invalidos`, `duplicado`, `duplicado_en_lote` y `fila_invalida`.
- Login y refresh devuelven `debeCambiarPassword`.
- El encuestado solo tiene los permisos de RN-74 y el de cambiar su contraseña.

### Trabajo hecho

- Slices `CrearEncuestado` y `CrearEncuestadosLote`, `AltaDeVinculo` con su repositorio, y `GeneradorContrasenaTemporal` en `Common/Seguridad`.
- `CrearVinculo` (HU-020) usa la pieza compartida, sin cambios en su contrato.
- `SesionResponseDto` con `debeCambiarPassword`.
- Permisos `vinculo.encuestado.crear` y `vinculo.encuestado.lote`.
- Se probaron 21 casos nuevos con dos empresas en una base temporal:
  - contraseña generada y propia, y duplicados;
  - un lote mixto con cada tipo de error y la reutilización de una cuenta de otra empresa;
  - límites del lote y RN-74;
  - el ciclo completo del primer ingreso.
- Se volvieron a correr las pruebas de HU-020 (15) y HU-021 (26) sin fallas.

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-115 | Contrato 🚧 sin contraseña en el lote | ✅ Alta individual y por lote con contraseña temporal generada |
| HU-018 | La sesión no indicaba contraseña temporal | `debeCambiarPassword` en login y refresh |

---

## Cambio `2026-11-15-hu-047-anonimo` {#cambio-2026-11-15-hu-047-anonimo}

| | |
|---|---|
| **Quién documentó** | Jesús Zepeda |
| **Fecha** | 15 de noviembre de 2026 |
| **Alcance** | Rediseño documental y de modelo de datos de M6 (**HU-047**, **HU-049**, **HU-052**) y ajuste de permisos de `encuestado` (**RN-74**, **HU-115**). Toca `08`, `07`, `09`, `12`, `10`, `04`, `05`, `15`, `18`, `11` y `14`. **No requiere cambios en código ni migraciones aún**, porque M6 (Entrega E2) todavía no existe en `backend/` |

### El problema (por qué hubo que cambiar)

1. **`HU-047` guardaba la identidad del reportante:** `Accidente.ReportadoPorId` (`NOT NULL`) y `Archivo.SubidoPorId` (`NOT NULL`) dejaban registrado qué vínculo envió el reporte o subió las fotos, lo que desincentiva que los trabajadores reporten accidentes o condiciones peligrosas por temor a represalias.
2. **Faltaba reportar riesgos preventivos rápidos sin esperar una encuesta:** `RN-26` solo contemplaba `accidente`, `incidente` y `enfermedad_profesional`, dejando fuera el reporte rápido de una condición insegura antes de que ocurra un daño.
3. **No existía salida para reportes falsos o duplicados:** un reporte anónimo inválido quedaba atrapado en `abierto` porque `RN-28` solo permitía cerrarlo tras investigarlo y crear medidas.
4. **Contradicción entre `RN-27` y `RN-74`:** `RN-27` habilitaba a cualquier vínculo activo para reportar, pero `RN-74` restringía a `encuestado` solo a encuestas, notificaciones y políticas.
5. **Desfase en `18-contratos-api-mvp.md`:** el contrato borrador de `POST /api/eventos` usaba campos (`casi_accidente`, `severidadAparente`, `estado: "registrado"`) que no coincidían con `12-modelo-datos.md`.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Anonimato con sesión (patrón `D27`)** | El trabajador reporta autenticado con su vínculo (JWT), pero el servidor **no guarda** `ReportadoPorId` en `Accidente` ni `SubidoPorId` en `Archivo` cuando pertenece a un evento | Protege la identidad en BD, evita spam de internet que tendría un buzón `[AllowAnonymous]` y mantiene intacto el aislamiento por `EmpresaId` del JWT |
| **Agregar `condicion_insegura` a `Accidente.Tipo`** | Se añade un 4.º tipo de evento en la misma columna `Tipo` (sin tablas puente N:M ni árboles recursivos de casos) | Permite al frontend mostrar una cuadrícula rápida de 4 tipos, habilita reportes preventivos que luego pasan a `RiesgoEmpresa` (HU-051) o `Tarea` (HU-050), y mantiene el alcance MVP |
| **`Descripcion` obligatoria y evidencias (`Archivo`) opcionales** | `Descripcion` sigue `NOT NULL`; las imágenes o PDF (`Archivo`) son opcionales en `POST /api/eventos/{id}/evidencias` (sin audio/video) | Evita bloquear reportes de emergencia cuando no hay foto disponible, no acopla `POST /api/eventos` al storage externo (`HU-100`) y cuida los límites del plan gratuito |
| **Moderación simplificada con estado `descartado`** | Se agrega `'descartado'` a `Accidente.Estado` junto con `DescartadoPorId`, `MotivoDescarte` (opcional) y `DescartadoEn` | Permite archivar reportes falsos o duplicados sin crear tablas de moderación por archivo y los excluye de `HU-052` |
| **Habilitar a `encuestado` en `RN-27` y `RN-74`** | Todos los vínculos activos (incluido `encuestado`) pueden reportar eventos anónimos | En planta/maquila/construcción la mayoría de trabajadores operativos solo tiene rol `encuestado` |

### Cómo quedó (resumen)

- **`Accidente`:** sin `ReportadoPorId`; `Tipo` acepta `accidente`, `incidente`, `enfermedad_profesional`, `condicion_insegura`; `Estado` acepta `abierto`, `en_investigacion`, `cerrado`, `descartado`; agrega `DescartadoPorId`, `MotivoDescarte` y `DescartadoEn` con `CHECK` de consistencia.
- **`Archivo`:** `SubidoPorId` pasa a nullable (`CHECK`: obligatorio si `TareaId IS NOT NULL`, nulo si `AccidenteId IS NOT NULL`).
- **Contratos (`18`):** `POST /api/eventos`, `POST /api/eventos/{id}/evidencias` y `PATCH /api/eventos/{id}/descarte` alineados a `12-modelo-datos.md`.

### Qué hizo Jesús Zepeda en la práctica

- Actualizó la cadena documental completa (`08` → `07` → `09` → `12` → `10` → `04`/`05`/`15`/`18` → `11` → `14`).
- Verificó en `backend/` (rama `development`) que M6 aún no tiene entidades ni migraciones creadas, dejando el diseño listo antes de programar la Entrega E2.
- *(Pendiente visual)* Reimportar los bloques Mermaid actualizados de `15-diagramas-drawio.md` en `docs/Diagramas.drawio` cuando se regenere el diagrama completo.

### Seguimiento por historia

| HU | Doc en repo | Tablero |
|----|-------------|---------|
| HU-047 (reporte anónimo y `condicion_insegura`) | [x] | [ ] |
| HU-049 (descarte de reportes inválidos) | [x] | [ ] |
| HU-052 (excluir `descartado` de estadísticas) | [x] | [ ] |
| HU-115 (rol `encuestado` habilitado para reportar) | [x] | [ ] |

#### HU-047 | Reportar un evento

| | |
|---|---|
| **Antes** | Reporte identificado (`ReportadoPorId` obligatorio) de `accidente`, `incidente` o `enfermedad_profesional`; `encuestado` no reportaba. |
| **Ahora** | Reporte anónimo con sesión (`Accidente` sin `ReportadoPorId`, `Archivo.SubidoPorId` nulo); incluye `condicion_insegura`; `Descripcion` obligatoria y fotos/PDF opcionales; habilitado para todo vínculo activo incluido `encuestado`. |
| **Tablero** | [ ] |
| **Referencia oficial** | [10-historias-usuario.md § HU-047](10-historias-usuario.md#hu-047--reportar-un-evento) |

#### HU-049 | Investigar un evento

| | |
|---|---|
| **Antes** | Solo permitía investigar y cerrar con causas y medidas (`RN-28`). |
| **Ahora** | Además permite marcar un reporte falso o duplicado como `descartado` (con motivo opcional) sin exigir investigación ni medidas. |
| **Tablero** | [ ] |
| **Referencia oficial** | [10-historias-usuario.md § HU-049](10-historias-usuario.md#hu-049--investigar-un-evento) |

### Mapa rápido (archivos oficiales)

| Tema | Archivo |
|------|---------|
| Decisión D11 | [08-decisiones-bd.md](08-decisiones-bd.md) |
| Reglas RN-26–RN-28 y RN-74 | [07-reglas-negocio.md](07-reglas-negocio.md) |
| Diccionario `Accidente` y `Archivo` | [12-modelo-datos.md](12-modelo-datos.md) |
| Criterios HU-047, HU-049, HU-052, HU-115 | [10-historias-usuario.md](10-historias-usuario.md) |
| Contratos HTTP M6 | [18-contratos-api-mvp.md](18-contratos-api-mvp.md) |

---

## Cambio `2026-11-15-hu-021` {#cambio-2026-11-15-hu-021}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 15 de noviembre de 2026 |
| **Alcance** | Código de la rama `feature/hu-021` (slices `ListarVinculos`, `ObtenerVinculo`, `ActualizarVinculo` y 3 permisos) y contrato en `18-contratos-api-mvp.md`. No cambia el modelo de datos ni las reglas |

### El problema (por qué hubo que cambiar)

1. Una vez dado el acceso (HU-020), el administrador no podía verlo, cambiar el rol ni suspenderlo.
2. El contrato no decía qué pasa con las sesiones abiertas al suspender, si reactivar pide motivo, ni cómo se aplica RN-08.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Un solo `PATCH` para rol y estado** | Se envía solo lo que cambia | Coincide con el contrato de `18` |
| **Motivo al suspender o dar de baja** | Obligatorio en esos casos; al reactivar, por defecto `decision_admin` | La columna `MotivoCodigo` del historial es obligatoria (RN-59) y reactivar no necesita justificación |
| **Efecto inmediato** | Se borran los refresh de ese vínculo; el middleware ya rechaza el token de un vínculo no activo | "La persona deja de poder usar Norvia para esa empresa" sin esperar a que venza el token |
| **Solo esta empresa** | Los vínculos y sesiones de la persona en otras empresas no cambian | Criterio de HU-021 |
| **Último administrador** | Quitar el rol o suspender al último `admin_empresa` activo da 409, aunque sea uno mismo | RN-08 |

### Cómo quedó (resumen)

- `GET /api/vinculos` (filtros `estado` y `rolCodigo`), `GET /api/vinculos/{id}` y `PATCH /api/vinculos/{id}`, solo para `admin_empresa`.
- Un vínculo de otra empresa responde 404, por el filtro global.
- Cada cambio de estado deja una fila en `HistorialEstadoVinculo` con el vínculo que lo registró.

### Trabajo hecho

- Slices en `Features/Vinculos/` y el `VinculoResponseDto` compartido del módulo.
- Permisos `vinculo.listar`, `vinculo.leer` y `vinculo.actualizar`.
- `18`: contrato y anexo de las 3 rutas.
- Se probaron 26 casos con dos empresas en una base temporal:
  - filtros y aislamiento entre empresas;
  - cambio de rol, y suspensión con token, refresh y login bloqueados solo en esa empresa;
  - reactivación e historial;
  - último administrador y permisos.

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-021 | Contrato 🚧 | ✅ Listar, ver y cambiar rol o estado con motivo, historial y protección del último administrador |

---

## Cambio `2026-11-15-hu-020` {#cambio-2026-11-15-hu-020}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 15 de noviembre de 2026 |
| **Alcance** | Código de la rama `feature/hu-020` (slice `Vinculos/CrearVinculo` y permiso `vinculo.crear`) y contrato en `18-contratos-api-mvp.md`. No cambia el modelo de datos ni las reglas |

### El problema (por qué hubo que cambiar)

1. Solo existía el primer vínculo de cada empresa, creado al registrarla (HU-017). El administrador no podía dar acceso a nadie más.
2. El contrato de `18` no decía qué pasa si el correo ya tiene cuenta, ni cuándo es obligatoria la contraseña temporal.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **El correo identifica la cuenta** | Si existe, se reutilizan la cuenta y su persona; se ignoran los nombres y la contraseña enviados | Una cuenta para varias empresas, sin duplicados (RN-02, RN-65) |
| **Contraseña temporal solo para cuentas nuevas** | Obligatoria si el correo no tiene cuenta; cumple HU-114; queda `DebeCambiarPassword = true` | Todavía no hay correo de invitación (HU-118, E2) |
| **Duplicado en cualquier estado** | Un vínculo suspendido o dado de baja también impide crear otro (409) | Reactivar o cambiar el rol es tarea de HU-021, con su historial |
| **La empresa sale del token** | El interceptor de HU-093 pone `EmpresaId` | El cliente no puede dar acceso a otra empresa (RN-06) |
| **Respuesta con `cuentaNueva`** | Indica si se usó la contraseña temporal | El front sabe si debe comunicarla a la persona |

### Cómo quedó (resumen)

- `POST /api/vinculos`, solo para `admin_empresa`. Responde 201 con el vínculo y `cuentaNueva`.
- Se puede asignar cualquiera de los 4 roles, incluido `encuestado`. HU-115 agregará el alta específica y en lote.
- La búsqueda de la persona de una cuenta existente salta el filtro por empresa, con un comentario que lo justifica: solo lee la identidad global.

### Trabajo hecho

- Slice `Features/Vinculos/CrearVinculo/` y su repositorio.
- `VinculosController` y la fila `vinculo.crear` en `CatalogoPermisos`.
- `18`: contrato y anexo de `POST /api/vinculos`.
- Se probaron 15 casos con dos empresas en una base temporal: cuenta nueva, cuenta reutilizada en otra empresa, duplicado (sin importar mayúsculas), cuenta de staff sin persona, contraseña débil o ausente, rol inválido y permisos (401, y 403 para staff y colaborador).

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-020 | Contrato 🚧 sin reglas para cuentas existentes | ✅ `POST /api/vinculos` con creación o reutilización de la cuenta |

---

## Cambio `2026-11-15-hu-114` {#cambio-2026-11-15-hu-114}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 15 de noviembre de 2026 |
| **Alcance** | Criterios de HU-114 en `10-historias-usuario.md`, contrato en `18-contratos-api-mvp.md` y código de la rama `feature/hu-114`. No cambia el modelo de datos ni las reglas de negocio |

### El problema (por qué hubo que cambiar)

1. HU-114 decía que el sistema "no exige combinar mayúsculas, minúsculas, números o símbolos". El equipo decidió exigir una combinación mínima.
2. En el código cada formulario tenía su propia regla. Por ejemplo, el registro de empresa pedía al menos 15 caracteres, y el contrato decía 8 a 64.
3. No había forma de cambiar la contraseña ni de reemplazar una contraseña temporal (`DebeCambiarPassword`), que necesitan HU-115 y HU-022.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Composición mínima** | 8 a 64 caracteres, con al menos una mayúscula, un número y un carácter especial; el espacio no cuenta | Decisión del equipo |
| **Rechazo de comunes** | Lista de contraseñas comunes que sí cumplen la composición (`P@ssw0rd`, `Admin123!`…), sin distinguir mayúsculas | La composición sola no evita las contraseñas más adivinadas |
| **Una sola política** | `PoliticaContrasena` en `Application/Common/Validacion`, que usan todos los validadores que fijan una contraseña | La misma regla en el registro, los vínculos y los encuestados |
| **El login no valida la política** | Solo compara con lo guardado | Las contraseñas anteriores siguen sirviendo para entrar y cambiarlas |
| **Cambiar cierra las sesiones** | Se borran todos los refresh del Acceso | La contraseña vale en todas las empresas de esa cuenta (RN-65) |

### Cómo quedó (resumen)

- Cada requisito que falla da su propio mensaje en `errors`, como pide el criterio "indica qué requisito debe corregirse".
- `POST /api/auth/contrasena/establecer` recibe la contraseña actual y la nueva, y responde 204.
  - Es para sesiones de empresa: los 4 roles, incluido `encuestado`.
  - El staff queda fuera por ahora, porque una ruta solo tiene un alcance.

### Trabajo hecho

- `PoliticaContrasena` aplicada en `RegistrarEmpresaValidator` (deja el mínimo de 15).
- Slice `Auth/EstablecerContrasena`, permiso `auth.contrasena.establecer` y `AccesoId` en `ITenantActual`.
- `[AllowAnonymous]` pasa de toda la clase `AuthController` a cada acción de login, refresh y logout.
- Se probaron 22 casos en una base temporal: cada requisito, comunes, varios fallos a la vez, cambio exitoso, refresh revocado y login con la contraseña vieja y la nueva.

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-114 | 8 a 64 caracteres, frases, sin exigir combinaciones; 🚧 | 8 a 64, con mayúscula, número y carácter especial, sin contraseñas comunes; ✅ con endpoint para cambiar la contraseña |
| HU-017 | Contraseña de al menos 15 caracteres | Usa la política de HU-114 |

---

## Cambio `2026-11-15-hu-023` {#cambio-2026-11-15-hu-023}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 15 de noviembre de 2026 |
| **Alcance** | Código de la rama `feature/hu-023` (módulo `Catalogos`: 20 casos de uso y 20 permisos) y documentos `18-contratos-api-mvp.md` y `17-guia-permisos-seeder-y-pruebas.md`. No cambia el modelo de datos ni las reglas |

### El problema (por qué hubo que cambiar)

1. Los catálogos globales (D7) solo podían cargarse desde el código (HU-097). HU-023 pide que el Administrador de plataforma los mantenga sin programar.
2. El contrato de `18` dejaba abiertos varios puntos:
   - las rutas llevaban el prefijo `api/plataforma/`;
   - para desactivar ofrecía `DELETE` o `PATCH` sin decidir;
   - "Plantillas" mezclaba dos tablas distintas.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Sin prefijo `plataforma`** | `api/rubros`, `api/categorias-riesgo`, `api/peligros`, `api/preguntas`, `api/plantillas` | URLs más cortas. El alcance lo define la fila de `CatalogoPermisos`, no la URL (D24) |
| **`PATCH {id}` parcial** | Lo que no se envía se conserva; `""` borra una descripción | El front envía solo lo que cambió |
| **`PATCH {id}/estado`** | `{ "activo": false }` desactiva y `true` reactiva | Desactivar es una acción aparte de editar; no hay borrado físico |
| **Bloque de respuesta en preguntas** | `tipoRespuesta`, `peligroId` y `opciones` se envían juntos; las opciones se reemplazan completas | Esas tres partes dependen entre sí (D26). Las encuestas ya generadas no cambian porque guardan su copia (RN-12) |
| **`api/plantillas` = plantillas de documento** | Las plantillas de tarea no tienen API en HU-023 | Decisión del equipo para acotar la historia |
| **Consulta para soporte, cambios solo para admin** | `soporte_plataforma` solo tiene los permisos de listar | Cumple "solo personas autorizadas pueden hacer cambios" |
| **Referencias activas solo si cambian** | El rubro, la categoría o el peligro deben estar activos al elegirlos, pero no para editar algo que ya los tenía | Se puede corregir un elemento aunque su padre se haya desactivado |

### Cómo quedó (resumen)

- Por recurso: `GET` (lista, con filtros opcionales e incluye los desactivados), `POST` (201), `PATCH {id}` y `PATCH {id}/estado`.
- Reglas de una pregunta:
  - el tipo es obligatorio;
  - `respuesta_breve` va sin opciones ni peligro;
  - las de selección llevan de 2 a 20 opciones, sin repetir posición ni texto;
  - con peligro, al menos una opción indica exposición; sin peligro, ninguna.
- Errores con código propio: `catalogos.*_no_encontrado` (404), `catalogos.*_invalido` (400), `codigo_duplicado`, `nombre_duplicado` y `orden_ocupado` (409).

### Trabajo hecho

- Módulo `Features/Catalogos/` con un slice por caso de uso y `CatalogosController`.
- 20 filas en `CatalogoPermisos` con alcance `plataforma`.
- Respuesta 201 para las altas y enums serializados en snake_case.
- `18`: resumen, índice y anexo JSON de catálogos; `17`: el ejemplo pasa a `PATCH api/rubros/{id}`.
- Se probaron 52 casos en una base temporal: permisos (401 y 403 para soporte), validaciones, ediciones parciales, estado, conflictos y reemplazo de opciones.

### Antes y ahora por historia

| HU | Antes | Ahora |
|----|-------|-------|
| HU-023 | Contrato 🚧 con prefijo `api/plataforma/` y la desactivación sin decidir | ✅ implementada sin prefijo, con `PATCH` parcial, `PATCH …/estado` y permisos por rol de staff |
| HU-024 | 🚧 | Sin cambios (sigue pendiente, con su ruta `api/plataforma/empresas`) |

---

## Cambio `2026-11-13-arquitectura` {#cambio-2026-11-13-arquitectura}

| | |
|---|---|
| **Quién documentó** | Equipo (redactado con Claude Code) |
| **Fecha** | 13 de noviembre de 2026 |
| **Alcance** | Documento nuevo `16-arquitectura-backend-frontend.md`, con enlaces en `README.md`, `00-guia-edicion-docs.md` y la DoD de `13-sprint-backlog.md`. No cambia el modelo de datos ni las reglas. **No se modificó código**: las correcciones quedan propuestas |

### El problema (por qué hubo que cambiar)

1. La rama `feature/acceso-auth` (commit `9aa2517`, login, refresh y logout con JWT) se revisó contra Clean Architecture y Vertical Slicing, que la rúbrica califica en el backend.
2. **Las referencias entre proyectos son correctas.** Sin embargo:
   - un solo `AuthServicio` agrupa los 4 casos de uso, y la carpeta del módulo se divide por tipo técnico (`DTOs/`, `Interfaces/`, `Validators/`);
   - el repositorio guarda en cada método, así que la rotación del refresh no es atómica;
   - no hay middleware global de errores;
   - el paquete `FluentValidation.AspNetCore` está deprecado y choca con FluentValidation 12;
   - las abstracciones transversales están dentro del slice;
   - la configuración se lee directamente de `IConfiguration` en varios lugares.
3. No existía un documento que dijera cómo organizar el código, así que cada integrante lo resolvía a su manera.

### Qué se decidió y por qué

| Decisión | Qué significa | Por qué ayuda |
|----------|---------------|---------------|
| **Un servicio por caso de uso** | Slice = `DTOs/` + `Validators/` + servicio + `I*Repositorio`. Sin MediatR | Vertical slicing real (contratos dentro del caso de uso) |
| **Repositorio por slice + `IUnidadDeTrabajo`** | Los repositorios no guardan; el servicio confirma una vez por caso de uso | Transacciones atómicas, y Application no depende de EF Core |
| **FluentValidation obligatorio** | Un validador por slice. Un filtro propio lo ejecuta y el middleware global convierte la `ValidationException` a ProblemDetails. Solo se quita el paquete de integración deprecado | Cumple "middleware que intercepta FluentValidation" de la rúbrica |
| **`Resultado<T>` + `Error`** | Los fallos de negocio no son excepciones; se traducen a 400/401/403/404/409 | Respuestas HTTP coherentes en todos los módulos |
| **Patrón Options** | Ningún servicio lee `IConfiguration`; `AddJwtBearer` pasa a la API | Configuración en un solo lugar y capas limpias |
| **Frontend por features** | `src/features/<modulo>/{api, components, hooks, pages, schemas, types}` | Mismo criterio de slices que el backend; Zod como espejo de FluentValidation |

### Cómo quedó (resumen)

- La guía tiene 10 secciones (capas, carpetas, anatomía de un slice con el ejemplo `LoginEmpresa`, reglas de slicing, datos, multiempresa, validación y errores, configuración, frontend y checklist de PR) y un anexo con la evaluación de la rama.
- **Correcciones propuestas,** en orden:
  1. middleware global + filtro de FluentValidation;
  2. `IUnidadDeTrabajo`;
  3. mover las abstracciones a `Common` y pasar la configuración a Options;
  4. separar `AuthServicio` en 4 slices y usar `Resultado<T>`;
  5. mover el seeder y borrar `PersonaCreateDTO`;
  6. hacer HU-093 (filtro por empresa).

### Qué hizo el equipo en la práctica

- Revisó los `.csproj`, `Program.cs`, el controller, el servicio, las interfaces, los repositorios y la configuración de la rama.
- Redactó `16-arquitectura-backend-frontend.md` y lo enlazó desde `README.md`, `00-guia-edicion-docs.md` y la DoD de `13-sprint-backlog.md`.

### Seguimiento por historia

| HU | Doc en repo | Tablero |
|----|-------------|---------|
| HU-013 (arquitectura del backend) | Sí, la guía la concreta | [ ] |
| HU-091, HU-094, HU-096 (implementación) | Correcciones propuestas en el anexo de la guía | [ ] |

### Mapa rápido (archivos oficiales)

| Tema | Archivo |
|------|---------|
| Reglas de arquitectura y evaluación | [16-arquitectura-backend-frontend.md](16-arquitectura-backend-frontend.md) |

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

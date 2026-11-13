# Decisiones que condicionan la base de datos

**Para qué sirve:** explica las decisiones que hay que tomar antes de dibujar el modelo de datos.

Conceptos usados aquí:

- **Global:** dato común a toda la plataforma; no pertenece a una empresa.
- **`EmpresaId`:** columna que indica a qué empresa pertenece cada registro.

| # | Tema | Decisión recomendada | Por qué |
|---|---|---|---|
| D1 | Persona, vínculo y acceso | **Persona** (sin credenciales) se enlaza a cada **Empresa** con **VinculoEmpresa** (rol, `AccesoId`, estado). El **correo institucional y la contraseña** viven en **Acceso** (un correo, una clave en toda la plataforma). Login empresa: correo + contraseña + identificador de empresa cifrado; la API resuelve el vínculo (`AccesoId` + `EmpresaId`). JWT: `VinculoEmpresaId`, `EmpresaId` cifrado y rol. **Sin** selector de empresa después del login | Misma persona en dos empresas puede compartir **Acceso** pero cada sesión es un tenant distinto |
| D2 | Alta de empresa | Registro propio: quien registra queda como Administrador de empresa en el primer vínculo | Es el modelo SaaS y no requiere intervención manual |
| D3 | Rol y cargo | **Rol** en `VinculoEmpresa.RolId` (permisos). El **cargo** en la Comisión Mixta queda **fuera de alcance** junto con M7 (recorte del 13-11-2026) | Un cargo no equivale a permisos; si M7 vuelve, el cargo irá en su propia tabla |
| D4 | Jerarquía | Solo **Empresa**: no hay áreas ni centros de trabajo. Riesgos, encuestas, accidentes y tareas se registran a nivel de empresa | Reduce el alcance; la empresa es la única unidad organizativa |
| D5 | Trabajadores | Solo tienen **vínculo** quienes usan el sistema. Los trabajadores que responden encuestas (**encuestados**) tienen vínculo con el rol `encuestado`. Quien no usa la app es solo **Persona**. El número de trabajadores permanentes es un dato de la empresa | Controla quién responde sin construir un módulo de personal |
| D6 | Tareas | Una sola entidad Tarea con su origen: riesgo, accidente o manual | Unifica seguimiento, evidencia y notificaciones |
| D7 | Catálogos | Globales: rubros, categorías de riesgo por rubro, preguntas exploratorias por categoría, peligros y plantillas. Cada pregunta tiene un **tipo** (ver D26) y puede indicar un peligro y qué opción indica exposición | Es contenido común que se reutiliza entre empresas |
| D8 | Encuestas | Cada encuesta es un registro propio de Norvia (sin formularios externos) con **versiones**: cada versión tiene sus categorías y una copia editable de sus preguntas y opciones. Editar una encuesta publicada crea una versión nueva; solo una versión está publicada a la vez, y cada respuesta queda asociada a la versión que se contestó | El catálogo y la encuesta pueden cambiar sin alterar respuestas pasadas, y se pueden comparar en el tiempo |
| D9 | Peligros y riesgos | El peligro es un catálogo global. El riesgo es de la empresa, enlazado a un peligro, y empieza como "sugerido" si viene de una encuesta. Puede indicar el accidente que lo reveló | Dos empresas tienen el mismo peligro con evaluaciones distintas |
| D10 | Evaluaciones | Tabla aparte para las evaluaciones, con su tipo: inicial o residual | Conserva el historial y evita sobrescribir |
| D11 | Accidentes | El evento guarda tipo, fechas, descripción, quién reportó y su investigación. **No** se registran personas afectadas ni días de incapacidad (recorte del 13-11-2026) | Reduce el alcance y evita guardar datos sensibles de salud |
| D12 | Actas | **Sin efecto (recorte):** M7 está fuera de alcance. Decía: acta firmada inmutable; cada firma guarda vínculo, fecha y hash | — |
| D13 | Documentos | La plantilla es global. El documento es de la empresa y cada versión es un registro propio | Una versión aprobada nunca cambia |
| D14 | Archivos | La base de datos guarda los datos del archivo y su enlace. El archivo va en un almacenamiento externo | El servidor gratuito pierde sus archivos al reiniciarse |
| D15 | Integridad entre empresas | Toda relación entre tablas con `EmpresaId` debe quedar dentro de la misma empresa | Filtrar las consultas no impide guardar una referencia cruzada |
| D16 | Conexión con Google | **Sin efecto (recorte):** se retira toda integración con Google. Las encuestas son propias (D8, D26) y las notificaciones son internas y por correo (D28) | — |
| D17 | Equipos | **Sin efecto (recorte):** M8 está fuera de alcance. Decía: equipo de la empresa con mantenimientos y fotografías | — |
| D18 | EPP | **Sin efecto (recorte):** M8 está fuera de alcance. Decía: artículo de EPP con ingresos y entregas; inventario calculado | — |
| D19 | Persona y nombres | Tabla **Persona** global con `PrimerNombre`, `SegundoNombre`, `PrimerApellido`, `SegundoApellido` (3FN). Sin `NombreCompleto` en BD | Identidad reusable sin mezclar credenciales |
| D20 | RBAC en BD | Catálogo **Permiso** (con alcance `empresa` o `plataforma`), **RolPermiso** para roles de empresa y **RolStaffPlataformaPermiso** para roles de plataforma; la API valida según el tipo de sesión (HU-014) | El ERD separa autorización tenant vs operación global |
| D21 | Credenciales y **Usuario** | Tabla global **Acceso** (`Email` UQ, `PasswordHash`, `Verificado`, `DebeCambiarPassword`). **VinculoEmpresa** y **StaffPlataforma** solo referencian `AccesoId` y su estado operativo (`Estado` / `Activo`). **Usuario** (1:1 **Persona**): solo `Activo` global; **sin** correo ni contraseña | 3FN: una fila de credenciales; vínculo = permisos por empresa |
| D22 | Estados auditables | `VinculoEmpresa.Estado` con **HistorialEstadoVinculo** (motivo obligatorio al cambiar). `Empresa.Estado` con **HistorialEstadoEmpresa** para suspensión del tenant | Separar baja laboral de mora del SaaS |
| D23 | Roles plataforma vs empresa | **Rol** + `VinculoEmpresa.RolId` = permisos **dentro del tenant** (incl. gestionar vínculos y roles de esa empresa). **RolStaffPlataforma** + `StaffPlataforma` = catálogos globales y suspensión SaaS; **no** asigna roles de empresa a nadie | El admin de plataforma no sustituye al admin de empresa |
| D24 | **`Permiso.Alcance`** | Catálogo único **Permiso** con columna **`Alcance`**: solo `empresa` o `plataforma` (CHECK). **`empresa`** = API con contexto de tenant (`VinculoEmpresa` / `EmpresaId`). **`plataforma`** = API global sin datos SST de clientes; la sesión la abre **`StaffPlataforma`**. Enlaces: `RolPermiso` solo permisos `empresa`; `RolStaffPlataformaPermiso` solo `plataforma`. El valor `plataforma` es el **tipo de permiso**, no el nombre de la tabla de login (que sigue siendo `StaffPlataforma`) | Un solo catálogo de rutas HTTP; la API filtra por tipo de sesión sin renombrar tablas ni mezclar RBAC |
| D25 | Sesión JWT y **RefreshToken** | El **access token (JWT)** no se persiste. Solo **RefreshToken** en BD: `TokenHash` (único), `AccesoId`, `VinculoEmpresaId` opcional, `TipoSesion`, `ExpiraEn`. Al refresh válido se rota (borrar fila anterior, crear nueva). Logout y refresh vencido eliminan la fila | Cumple HU-018 sin tabla de sesiones duplicando el JWT |
| D26 | Formularios dinámicos | Cada pregunta tiene un `TipoRespuesta`: `respuesta_breve` (texto), `seleccion_unica` (una opción) o `seleccion_multiple` (varias opciones), y la marca `Obligatoria`. El tipo decide qué control muestra el formulario y cómo se valida la respuesta. Las opciones elegidas en `seleccion_multiple` van en una tabla aparte | El formulario se arma solo a partir de los datos, sin servicios externos |
| D27 | Anonimato de respuestas | El encuestado responde con su vínculo, pero la base guarda **dos registros sin relación entre sí**: la **participación** (vínculo y encuesta, para impedir que responda dos veces) y la **respuesta** (sin vínculo, con la versión contestada y solo la fecha, sin hora). El reporte se muestra solo si la encuesta tiene un mínimo de respuestas | Se controla quién participó sin poder saber qué respondió cada persona |
| D28 | Notificaciones | Tabla **Notificacion** por destinatario (vínculo), con su origen (versión de política o tarea), su lectura y el estado del envío por correo. La misma fila funciona como bandeja de salida: si el correo falla, se reintenta sin perder el aviso dentro de Norvia | Avisos internos y por correo sin depender de calendarios externos |

## Datos que no se guardan

Para cumplir la tercera forma normal (3FN), estos valores se calculan cuando se necesitan:

- Nombre completo de una persona, a partir de las cuatro columnas de nombre.
- Nivel de riesgo, a partir de probabilidad y severidad.
- Número de respuestas que respaldan cada peligro sugerido.
- Resultados del reporte anónimo de una encuesta.
- Si una notificación está leída: `LeidaEn` tiene valor.
- Tareas vencidas y estadísticas de accidentes.

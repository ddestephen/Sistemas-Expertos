# Decisiones que condicionan la base de datos

**Para qué sirve:** explica las decisiones que hay que tomar antes de dibujar el modelo de datos.

Conceptos usados aquí:

- **Global:** dato común a toda la plataforma; no pertenece a una empresa.
- **`EmpresaId`:** columna que indica a qué empresa pertenece cada registro.

| # | Tema | Decisión recomendada | Por qué |
|---|---|---|---|
| D1 | Persona, vínculo y acceso | **Persona** (sin credenciales) se enlaza a cada **Empresa** con **VinculoEmpresa** (rol, `AccesoId`, estado). El **correo institucional y la contraseña** viven en **Acceso** (un correo, una clave en toda la plataforma). Login empresa: correo + contraseña + identificador de empresa cifrado; la API resuelve el vínculo (`AccesoId` + `EmpresaId`). JWT: `VinculoEmpresaId`, `EmpresaId` cifrado y rol. **Sin** selector de empresa después del login | Misma persona en dos empresas puede compartir **Acceso** pero cada sesión es un tenant distinto |
| D2 | Alta de empresa | Registro propio: quien registra queda como Administrador de empresa en el primer vínculo | Es el modelo SaaS y no requiere intervención manual |
| D3 | Rol y cargo | **Rol** en `VinculoEmpresa.RolId` (permisos). **Cargo** solo en `IntegranteComision.Cargo` (`presidente`, `secretario`, `miembro`) | Los cargos vencen a los 2 años y no equivalen a permisos |
| D4 | Jerarquía | Empresa → área. La comisión pertenece a la empresa | Mantiene el modelo simple; cada empresa tiene una comisión |
| D5 | Trabajadores | Solo tienen **vínculo** quienes usan el sistema. Trabajadores sin app son solo **Persona**. El número de trabajadores permanentes es un dato de la empresa | Evita construir un módulo de personal |
| D6 | Tareas | Una sola entidad Tarea con su origen, para todos los módulos | Unifica seguimiento, evidencia, calendario y panel |
| D7 | Catálogos | Globales: rubros, categorías de riesgo por rubro, preguntas exploratorias por categoría, peligros y plantillas. Cada pregunta puede indicar un peligro y la respuesta que indica exposición | Es contenido común que se reutiliza entre empresas |
| D8 | Encuestas | Cada encuesta es un registro propio, con sus categorías, una copia editable de sus preguntas y respuestas asociadas a la definición mostrada al responder | El catálogo puede cambiar sin alterar encuestas pasadas, y se pueden comparar en el tiempo |
| D9 | Peligros y riesgos | El peligro es un catálogo global. El riesgo es de la empresa, enlazado a un peligro y a un área, y empieza como "sugerido" | Dos empresas tienen el mismo peligro con evaluaciones distintas |
| D10 | Evaluaciones | Tabla aparte para las evaluaciones, con su tipo: inicial o residual | Conserva el historial y evita sobrescribir |
| D11 | Accidentes | El evento guarda sus personas afectadas en una tabla aparte, sin exigirles vínculo. El acceso a esa tabla se restringe | Muchos afectados no tendrán cuenta, y son datos sensibles |
| D12 | Actas | Firmada es inmutable. Cada firma guarda vínculo, fecha y hash del contenido | La evidencia debe poder verificarse |
| D13 | Documentos | La plantilla es global. El documento es de la empresa y cada versión es un registro propio | Una versión aprobada nunca cambia |
| D14 | Archivos | La base de datos guarda los datos del archivo y su enlace. El archivo va en un almacenamiento externo | El servidor gratuito pierde sus archivos al reiniciarse |
| D15 | Integridad entre empresas | Toda relación entre tablas con `EmpresaId` debe quedar dentro de la misma empresa | Filtrar las consultas no impide guardar una referencia cruzada |
| D16 | Conexión con Google | La empresa conecta una cuenta de Google para gestionar eventos de calendario. Se guardan la conexión, con credenciales cifradas, y el identificador de cada evento junto al registro que lo originó | Permite actualizar o eliminar eventos sin exponer el acceso a la cuenta |
| D17 | Equipos | El equipo es de la empresa, y cada mantenimiento o reparación es un registro propio con sus fotografías | Conserva el historial y alimenta el informe anual |
| D18 | EPP | El artículo de EPP tiene sus ingresos y sus entregas en tablas aparte. El inventario se calcula | Evita guardar un dato derivado y deja constancia de cada entrega |
| D19 | Persona y nombres | Tabla **Persona** global con `PrimerNombre`, `SegundoNombre`, `PrimerApellido`, `SegundoApellido` (3FN). Sin `NombreCompleto` en BD | Identidad reusable sin mezclar credenciales |
| D20 | RBAC en BD | Catálogo **Permiso** (con alcance `empresa` o `plataforma`), **RolPermiso** para roles de empresa y **RolStaffPlataformaPermiso** para roles de plataforma; la API valida según el tipo de sesión (HU-014) | El ERD separa autorización tenant vs operación global |
| D21 | Credenciales y **Usuario** | Tabla global **Acceso** (`Email` UQ, `PasswordHash`, `Verificado`, `DebeCambiarPassword`). **VinculoEmpresa** y **StaffPlataforma** solo referencian `AccesoId` y su estado operativo (`Estado` / `Activo`). **Usuario** (1:1 **Persona**): solo `Activo` global; **sin** correo ni contraseña | 3FN: una fila de credenciales; vínculo = permisos por empresa |
| D22 | Estados auditables | `VinculoEmpresa.Estado` con **HistorialEstadoVinculo** (motivo obligatorio al cambiar). `Empresa.Estado` con **HistorialEstadoEmpresa** para suspensión del tenant | Separar baja laboral de mora del SaaS |
| D23 | Roles plataforma vs empresa | **Rol** + `VinculoEmpresa.RolId` = permisos **dentro del tenant** (incl. gestionar vínculos y roles de esa empresa). **RolStaffPlataforma** + `StaffPlataforma` = catálogos globales y suspensión SaaS; **no** asigna roles de empresa a nadie | El admin de plataforma no sustituye al admin de empresa |
| D24 | **`Permiso.Alcance`** | Catálogo único **Permiso** con columna **`Alcance`**: solo `empresa` o `plataforma` (CHECK). **`empresa`** = API con contexto de tenant (`VinculoEmpresa` / `EmpresaId`). **`plataforma`** = API global sin datos SST de clientes; la sesión la abre **`StaffPlataforma`**. Enlaces: `RolPermiso` solo permisos `empresa`; `RolStaffPlataformaPermiso` solo `plataforma`. El valor `plataforma` es el **tipo de permiso**, no el nombre de la tabla de login (que sigue siendo `StaffPlataforma`) | Un solo catálogo de rutas HTTP; la API filtra por tipo de sesión sin renombrar tablas ni mezclar RBAC |
| D25 | Sesión JWT y **RefreshToken** | El **access token (JWT)** no se persiste. Solo **RefreshToken** en BD: `TokenHash` (único), `AccesoId`, `VinculoEmpresaId` opcional, `TipoSesion`, `ExpiraEn`. Al refresh válido se rota (borrar fila anterior, crear nueva). Logout y refresh vencido eliminan la fila | Cumple HU-018 sin tabla de sesiones duplicando el JWT |

## Datos que no se guardan

Para cumplir la tercera forma normal (3FN), estos valores se calculan cuando se necesitan:

- Nombre completo de una persona, a partir de las cuatro columnas de nombre.
- Nivel de riesgo, a partir de probabilidad y severidad.
- Número de representantes de la comisión.
- Número de trabajadores que respaldan cada peligro sugerido.
- Área de quien respondió la encuesta: es su respuesta a la pregunta de área.
- Inventario de EPP.
- Equipos con mantenimiento vencido.
- Tareas vencidas y estadísticas de accidentes.

# Decisiones que condicionan la base de datos

**Para qué sirve:** explica las decisiones que hay que tomar antes de dibujar el modelo de datos.

Conceptos usados aquí:

- **Global:** dato común a toda la plataforma; no pertenece a una empresa.
- **`EmpresaId`:** columna que indica a qué empresa pertenece cada registro.

| # | Tema | Decisión recomendada | Por qué |
|---|---|---|---|
| D1 | Persona, vínculo y acceso | **Persona** (identidad sin credenciales) se relaciona con cada **Empresa** mediante **VinculoEmpresa** (rol, correo institucional, contraseña y estado). El login de empresa usa ese vínculo; el JWT lleva `EmpresaId` cifrado y `VinculoEmpresaId`. No hay un correo global que abra varios tenants con una sola contraseña | La empresa da de alta con correo institucional; renuncia o venta suspende solo ese vínculo |
| D2 | Alta de empresa | Registro propio: quien registra queda como Administrador de empresa en el primer vínculo | Es el modelo SaaS y no requiere intervención manual |
| D3 | Rol y cargo | **Rol** en `VinculoEmpresa.RolId` (permisos). **Cargo** solo en `IntegranteComision.Cargo` (`presidente`, `secretario`, `miembro`) | Los cargos vencen a los 2 años y no equivalen a permisos |
| D4 | Jerarquía | Empresa → área. La comisión pertenece a la empresa | Mantiene el modelo simple; cada empresa tiene una comisión |
| D5 | Trabajadores | Solo tienen **vínculo** quienes usan el sistema. Trabajadores sin app son solo **Persona**. El número de trabajadores permanentes es un dato de la empresa | Evita construir un módulo de personal |
| D6 | Tareas | Una sola entidad Tarea con su origen, para todos los módulos | Unifica seguimiento, evidencia, calendario y panel |
| D7 | Catálogos | Globales: rubros, categorías de riesgo por rubro, preguntas exploratorias por categoría, peligros y plantillas. Cada pregunta puede indicar un peligro y la respuesta que indica exposición | Es contenido común que se reutiliza entre empresas |
| D8 | Encuestas | Cada encuesta es un registro propio, con sus categorías, una copia de sus preguntas, el identificador y enlace del formulario en Google, y las respuestas importadas | El catálogo puede cambiar sin alterar encuestas pasadas, y se pueden comparar en el tiempo |
| D9 | Peligros y riesgos | El peligro es un catálogo global. El riesgo es de la empresa, enlazado a un peligro y a un área, y empieza como "sugerido" | Dos empresas tienen el mismo peligro con evaluaciones distintas |
| D10 | Evaluaciones | Tabla aparte para las evaluaciones, con su tipo: inicial o residual | Conserva el historial y evita sobrescribir |
| D11 | Accidentes | El evento guarda sus personas afectadas en una tabla aparte, sin exigirles vínculo. El acceso a esa tabla se restringe | Muchos afectados no tendrán cuenta, y son datos sensibles |
| D12 | Actas | Firmada es inmutable. Cada firma guarda vínculo, fecha y hash del contenido | La evidencia debe poder verificarse |
| D13 | Documentos | La plantilla es global. El documento es de la empresa y cada versión es un registro propio | Una versión aprobada nunca cambia |
| D14 | Archivos | La base de datos guarda los datos del archivo y su enlace. El archivo va en un almacenamiento externo | El servidor gratuito pierde sus archivos al reiniciarse |
| D15 | Integridad entre empresas | Toda relación entre tablas con `EmpresaId` debe quedar dentro de la misma empresa | Filtrar las consultas no impide guardar una referencia cruzada |
| D16 | Conexión con Google | La empresa conecta una cuenta de Google. Se guardan la conexión, con credenciales cifradas, y el identificador de cada formulario y de cada evento de calendario junto al registro que lo originó | Permite leer respuestas y actualizar o eliminar eventos sin exponer el acceso a la cuenta |
| D17 | Equipos | El equipo es de la empresa, y cada mantenimiento o reparación es un registro propio con sus fotografías | Conserva el historial y alimenta el informe anual |
| D18 | EPP | El artículo de EPP tiene sus ingresos y sus entregas en tablas aparte. El inventario se calcula | Evita guardar un dato derivado y deja constancia de cada entrega |
| D19 | Persona y nombres | Tabla **Persona** global con `PrimerNombre`, `SegundoNombre`, `PrimerApellido`, `SegundoApellido` (3FN). Sin `NombreCompleto` en BD | Identidad reusable sin mezclar credenciales |
| D20 | RBAC en BD | Catálogo **Permiso** y puente **RolPermiso**; la API valida rol del vínculo contra permisos del endpoint (HU-014, Code First) | El ERD demuestra el modelo de autorización |
| D21 | Credenciales por vínculo | `Email` y `PasswordHash` en **VinculoEmpresa**. Tabla **Usuario** solo para administrador de plataforma | Baja en un tenant no afecta el acceso en otro |
| D22 | Estados auditables | `VinculoEmpresa.Estado` con **HistorialEstadoVinculo** (motivo obligatorio al cambiar). `Empresa.Estado` con **HistorialEstadoEmpresa** para suspensión del tenant | Separar baja laboral de mora del SaaS |

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

# Glosario

**Para qué sirve:** explica los términos y siglas usados en esta documentación.

## Seguridad y salud en el trabajo

| Término | Significado |
|---|---|
| Accidente | Suceso del trabajo que causa una lesión o daño a la salud |
| Acta | Documento que deja constancia de lo tratado en una reunión de la comisión |
| Acta de constitución | Documento que registra la creación de la Comisión Mixta |
| Ausentismo | Ausencias del trabajo por accidentes o enfermedades |
| Categoría de riesgo | Grupo de riesgos de un rubro, como trabajo en alturas o alto voltaje |
| Comisión Mixta | Comisión Mixta de Higiene y Seguridad: grupo con representantes del empleador y de los trabajadores que vigila la SST en la empresa |
| Control | Medida para reducir un riesgo |
| Días de incapacidad | Días que una persona no puede trabajar por un accidente o enfermedad |
| Enfermedad profesional | Enfermedad causada por el trabajo. Puede estar sospechosa o diagnosticada |
| EPP | Equipo de protección personal: casco, guantes, arnés y otros elementos que usa el trabajador |
| Equipo de emergencia | Equipo que se usa ante una emergencia, como un extintor o una lámpara de emergencia |
| Evidencia | Archivo o registro que demuestra que algo se hizo |
| IHSS | Instituto Hondureño de Seguridad Social |
| Incidente | Suceso que pudo causar daño, pero no lo causó |
| ISO 45001 | Norma internacional para gestionar la seguridad y salud en el trabajo |
| Mantenimiento correctivo | Reparación de un equipo que falló o tiene un problema |
| Mantenimiento preventivo | Revisión programada para evitar que un equipo falle |
| Matriz de riesgos | Tabla con los riesgos de la empresa, su nivel y sus controles |
| Peligro | Algo que puede causar daño, como una escalera en mal estado |
| Pregunta exploratoria | Pregunta de la encuesta que ayuda a detectar si existe un peligro |
| Propietario | Integrante titular de la comisión |
| Quórum | Número mínimo de miembros presentes para que una reunión sea válida |
| Riesgo | Combinación de qué tan probable es un daño y qué tan grave sería |
| Riesgo residual | Riesgo que queda después de aplicar los controles |
| Secretaría de Trabajo | Secretaría de Trabajo y Seguridad Social de Honduras, también llamada STSS o SETRASS |
| Severidad | Qué tan grave sería el daño |
| SG-SST | Sistema de gestión de la seguridad y salud en el trabajo |
| Siniestralidad | Cantidad de accidentes y enfermedades del trabajo en un periodo |
| SST | Seguridad y salud en el trabajo |
| Suplente | Integrante que reemplaza al propietario cuando este falta |

## Producto y gestión

| Término | Significado |
|---|---|
| Norvia | Plataforma SaaS de SST multiempresa; nombre oficial del producto (Normativa + Vía) |
| SST360 | Nombre de trabajo anterior; usar **Norvia** en documentación nueva |
| Persona | Identidad humana sin credenciales; nombres en cuatro columnas |
| VinculoEmpresa | Relación persona–empresa: rol, correo institucional, contraseña y estado |
| Operador (con vínculo) | Persona que inicia sesión en una empresa mediante su `VinculoEmpresa`; en HUs sustituye “usuario de la empresa” |
| StaffPlataforma | Login del **equipo Norvia** (soporte, admin de catálogos) con **RolStaffPlataforma** |
| RolStaffPlataforma | Rol del staff (`admin_plataforma`, `soporte_plataforma`); distinto de **Rol** en vínculos |
| CuentaPlataforma | Nombre anterior de **StaffPlataforma**; no usar en diseño nuevo |
| Usuario | Registro global por **Persona** con `Activo` (sin correo/clave). Login y rol de empresa van en **VinculoEmpresa** |
| Membresia | Nombre anterior de **VinculoEmpresa**; no usar en diseño nuevo |
| Cargo (comisión) | Función en la Comisión Mixta (`presidente`, `secretario`, `miembro`); no es rol del sistema |
| Rol (sistema) | Permisos en Norvia para un vínculo (`admin_empresa`, `responsable_sst`, `colaborador`) |
| Permiso | Fila del catálogo RBAC: código, ruta y método HTTP de una operación protegida |
| Alcance (de permiso) | Columna **`Permiso.Alcance`**: `empresa` (sesión de **vínculo**, tenant) o `plataforma` (sesión **StaffPlataforma**, operaciones globales). No es el nombre de la tabla de login |
| Encuesta | Cuestionario que responden los trabajadores para identificar peligros |
| Entrega | Etapa de construcción que deja algo demostrable |
| Google Calendar | Calendario de Google; Norvia crea allí eventos con recordatorios |
| Google Forms | Servicio de formularios de Google; Norvia crea allí las encuestas |
| Historia de usuario (HU) | Descripción breve de lo que alguien necesita y para qué |
| Inventario | Cantidad disponible de cada artículo de EPP |
| Kanban | Tablero para visualizar el trabajo por estados |
| Must | Prioridad: sin esto el MVP o la calificación quedan incompletos |
| Multiempresa | Varias empresas usan la misma plataforma con su información aislada |
| MVP | Producto mínimo viable: versión más pequeña que ya resuelve el problema |
| Pitch | Presentación breve de una idea de negocio |
| Razón social | Nombre legal de la empresa |
| RTN | Registro Tributario Nacional de Honduras |
| Rubro | Tipo de actividad de la empresa. Norvia trabaja con 4: oficina administrativa, comercio o tienda, maquila o fábrica, y construcción |
| SaaS | Software como servicio: se usa por internet sin instalarlo en servidores propios |
| Should | Prioridad: aporta valor, pero se puede recortar |

## Técnicos

| Término | Significado |
|---|---|
| 3FN | Tercera forma normal: forma de organizar tablas para evitar datos repetidos |
| API | Interfaz por la que un sistema se comunica con otro, como los clientes con el backend o Norvia con Google |
| Backend | Parte del sistema que corre en el servidor |
| Claim | Dato incluido dentro de un token |
| Cascada | Borrar o cambiar automáticamente los registros hijos al borrar o cambiar el padre. Norvia no la usa |
| Clean Architecture | Forma de separar el código en capas con dependencias controladas |
| Disparador | Código que la base de datos ejecuta automáticamente ante un cambio; en inglés, trigger |
| DTO | Objeto que define los datos que entran y salen de la API |
| EF Core | Entity Framework Core: herramienta de .NET para trabajar con bases de datos |
| `EmpresaId` | Columna y dato que identifica a qué empresa pertenece un registro |
| Endpoint | Dirección de la API que atiende una operación |
| ERD | Diagrama entidad-relación: dibujo de las tablas y sus relaciones |
| FK | Llave foránea: columna que apunta a otra tabla |
| Frontend | Parte del sistema que ve y usa la persona |
| Global Query Filter | Filtro automático de EF Core que se aplica a todas las consultas |
| HTTP y HTTPS | Protocolos con los que se comunican clientes y servidores. HTTPS es la versión cifrada |
| Hash | Huella digital de un contenido; cambia si el contenido cambia |
| Índice | Estructura que acelera las búsquedas en una tabla |
| Índice parcial | Índice que solo incluye las filas que cumplen una condición |
| JWE | Token JWT con el contenido cifrado |
| JWT | Token firmado que identifica el vínculo (`VinculoEmpresaId`) y la empresa de la sesión |
| Middleware | Componente que procesa todas las peticiones del backend |
| Llave compuesta | Llave formada por dos o más columnas |
| PDF | Formato de documento para descargar e imprimir |
| PK | Llave primaria: columna que identifica cada fila |
| RBAC | Control de acceso basado en roles |
| Restricción CHECK | Condición que la base de datos verifica en cada fila antes de guardarla |
| Token | Credencial de sesión: vínculo de empresa o `StaffPlataforma` |
| Transacción | Grupo de cambios que se guardan todos juntos o ninguno |
| UUID | Identificador único de 128 bits generado al azar |
| Vertical Slicing | Organizar el código por funcionalidad y no por tipo de archivo |

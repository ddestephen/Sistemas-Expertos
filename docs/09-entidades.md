# Entidades candidatas

**Para qué sirve:** lista los datos principales que guardará **Norvia**. Es el punto de partida del diccionario de datos.

Es una lista conceptual: todavía no incluye atributos ni relaciones. Puede cambiar durante el diseño.

## Tipos de entidad

- **Raíz:** la empresa, de la que depende toda la información.
- **Global:** común a toda la plataforma, sin `EmpresaId`.
- **Con `EmpresaId`:** pertenece a una empresa.

El curso exige `EmpresaId` en las tablas transaccionales principales. Aquí se incluye en todas las de empresa, para que el filtro automático funcione igual en todas y se pueda aplicar la decisión D15.

## Lista

| Tipo | Entidad | Qué guarda | Módulo |
|---|---|---|---|
| Raíz | Empresa | Cada empresa cliente: razón social, RTN, dirección, actividad, rubro, trabajadores y estado del tenant | M1, M2 |
| Global | Persona | Identidad humana (nombres y documento), sin correo ni contraseña | M1, M6, M8 |
| Global | Usuario | Registro de persona en la plataforma: `Activo` (sin credenciales; login en vínculo o staff de plataforma) | M1 |
| Global | StaffPlataforma | Login del staff Norvia (correo, clave, rol de plataforma); no opera empresas cliente | M1 |
| Global | RolStaffPlataforma | Rol del staff (p. ej. admin catálogos, soporte); no gestiona `Rol` de empresas | M1 |
| Global | Rol | Rol **de empresa** asignado en cada `VinculoEmpresa` | M1 |
| Global | Permiso | Catálogo de operaciones HTTP (`Codigo`, ruta, método) y **`Alcance`**: `empresa` (tenant) o `plataforma` (operación global vía **StaffPlataforma**; el alcance no se llama `staff`) | M1 |
| Global | RolPermiso | Permisos de cada **Rol** de empresa | M1 |
| Global | RolStaffPlataformaPermiso | Permisos de cada **RolStaffPlataforma** | M1 |
| Global | Rubro | Los 4 rubros | M2 |
| Global | CategoriaRiesgo | Categorías de riesgo de cada rubro | M3 |
| Global | PreguntaExploratoria | Preguntas de cada categoría, con su peligro asociado | M3 |
| Global | OpcionPregunta | Opciones de respuesta de cada pregunta, indicando cuál revela exposición | M3 |
| Global | Peligro | Catálogo de peligros | M3, M4 |
| Global | PlantillaTarea | Tareas modelo | M4, M5 |
| Global | PlantillaDocumento | Políticas y procedimientos modelo | M9 |
| Con `EmpresaId` | VinculoEmpresa | Persona en la empresa: rol, correo institucional, contraseña y estado | M1 |
| Con `EmpresaId` | HistorialEstadoVinculo | Cambios de estado del vínculo con motivo | M1 |
| Con `EmpresaId` | HistorialEstadoEmpresa | Cambios de estado del tenant (p. ej. mora) | M1 |
| Con `EmpresaId` | ConexionGoogle | Cuenta de Google conectada y sus credenciales cifradas | M1 |
| Con `EmpresaId` | RegistroAuditoria | Acciones importantes | Todos |
| Con `EmpresaId` | Area | Áreas de la empresa | M2 |
| Con `EmpresaId` | Encuesta | Cada encuesta, con su formulario y enlace en Google | M3 |
| Con `EmpresaId` | EncuestaCategoria | Categorías elegidas para cada encuesta | M3 |
| Con `EmpresaId` | EncuestaPregunta | Copia de las preguntas enviadas | M3 |
| Con `EmpresaId` | EncuestaOpcion | Copia de las opciones enviadas | M3 |
| Con `EmpresaId` | RespuestaEncuesta | Cada respuesta recibida | M3 |
| Con `EmpresaId` | DetalleRespuesta | Respuesta a cada pregunta | M3 |
| Con `EmpresaId` | RiesgoEmpresa | Riesgos de la empresa | M4 |
| Con `EmpresaId` | EvaluacionRiesgo | Evaluaciones inicial y residual | M4 |
| Con `EmpresaId` | Control | Medidas de cada riesgo | M4 |
| Con `EmpresaId` | Tarea | Tareas de todos los orígenes | M5 |
| Con `EmpresaId` | Archivo | Datos y enlace de evidencias, fotos y actas de constitución | M5, M6, M7, M8 |
| Con `EmpresaId` | Accidente | Accidentes, incidentes y enfermedades profesionales | M6 |
| Con `EmpresaId` | PersonaAfectada | Personas afectadas y días de incapacidad | M6 |
| Con `EmpresaId` | InvestigacionAccidente | Causas y conclusiones | M6 |
| Con `EmpresaId` | Comision | Comisión de la empresa y su acta de constitución | M7 |
| Con `EmpresaId` | IntegranteComision | Miembros, cargos y periodos | M7 |
| Con `EmpresaId` | Reunion | Reuniones | M7 |
| Con `EmpresaId` | Asistencia | Asistencia por reunión | M7 |
| Con `EmpresaId` | Acta | Actas | M7 |
| Con `EmpresaId` | FirmaActa | Firmas de cada acta | M7 |
| Con `EmpresaId` | Equipo | Equipos y productos con su identificador | M8 |
| Con `EmpresaId` | Mantenimiento | Mantenimientos y reparaciones | M8 |
| Con `EmpresaId` | ArticuloEPP | Artículos de equipo de protección personal | M8 |
| Con `EmpresaId` | IngresoEPP | Ingresos al inventario | M8 |
| Con `EmpresaId` | EntregaEPP | Entregas a trabajadores | M8 |
| Con `EmpresaId` | Documento | Políticas y procedimientos de la empresa | M9 |
| Con `EmpresaId` | VersionDocumento | Cada versión | M9 |
| Con `EmpresaId` | Informe | Reportes generados | M10 |
| Con `EmpresaId` | EventoCalendario | Evento de Google Calendar y el registro que lo originó | M11 |

**M12 no tiene entidades propias:** solo lee datos de los demás módulos.

El detalle de cada tabla está en el [modelo de datos](12-modelo-datos.md).

**Nota:** *Membresia* fue el nombre anterior de **VinculoEmpresa** (ver [glosario](11-glosario.md)).

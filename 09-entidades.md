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
| Global | Persona | Identidad humana (nombres y documento), sin correo ni contraseña | M1 |
| Global | Usuario | Registro de persona en la plataforma: `Activo` (sin credenciales; login vía **Acceso**) | M1 |
| Global | Acceso | Correo (único) y contraseña compartidos por vínculos y/o staff que usen ese correo | M1 |
| Global | RefreshToken | Hash del refresh, tipo de sesión y vínculo opcional; el JWT de access no se guarda | M1 |
| Global | StaffPlataforma | Fila de staff Norvia (`AccesoId`, rol de plataforma, `Activo`); credenciales en **Acceso** | M1 |
| Global | RolStaffPlataforma | Rol del staff (p. ej. admin catálogos, soporte); no gestiona `Rol` de empresas | M1 |
| Global | Rol | Rol **de empresa** asignado en cada `VinculoEmpresa` (`admin_empresa`, `responsable_sst`, `colaborador`, `encuestado`) | M1 |
| Global | Permiso | Catálogo de operaciones HTTP (`Codigo`, ruta, método) y **`Alcance`**: `empresa` (tenant) o `plataforma` (operación global vía **StaffPlataforma**; el alcance no se llama `staff`) | M1 |
| Global | RolPermiso | Permisos de cada **Rol** de empresa | M1 |
| Global | RolStaffPlataformaPermiso | Permisos de cada **RolStaffPlataforma** | M1 |
| Global | Rubro | Los 4 rubros | M2 |
| Global | CategoriaRiesgo | Categorías de riesgo de cada rubro | M3 |
| Global | PreguntaExploratoria | Preguntas de cada categoría, con su tipo de respuesta, su configuración y su peligro asociado | M3 |
| Global | OpcionPregunta | Opciones de las preguntas de selección, indicando cuál revela exposición | M3 |
| Global | Peligro | Catálogo de peligros | M3, M4 |
| Global | PlantillaTarea | Tareas modelo | M4, M5 |
| Global | PlantillaDocumento | Políticas y procedimientos modelo | M9 |
| Con `EmpresaId` | VinculoEmpresa | Persona en la empresa: rol, `AccesoId` y estado del vínculo (credenciales en **Acceso**) | M1 |
| Con `EmpresaId` | HistorialEstadoVinculo | Cambios de estado del vínculo con motivo | M1 |
| Con `EmpresaId` | HistorialEstadoEmpresa | Cambios de estado del tenant (p. ej. mora) | M1 |
| Con `EmpresaId` | RegistroAuditoria | Acciones importantes | Todos |
| Con `EmpresaId` | Encuesta | Cada encuesta propia de Norvia y su estado | M3 |
| Con `EmpresaId` | EncuestaCategoria | Categorías elegidas para cada encuesta | M3 |
| Con `EmpresaId` | EncuestaPregunta | Copia de las preguntas enviadas | M3 |
| Con `EmpresaId` | EncuestaOpcion | Copia de las opciones enviadas | M3 |
| Con `EmpresaId` | ParticipacionEncuesta | Qué vínculo ya respondió cada encuesta, sin enlazarlo a su respuesta | M3 |
| Con `EmpresaId` | RespuestaEncuesta | Cada respuesta recibida, anónima | M3 |
| Con `EmpresaId` | DetalleRespuesta | Respuesta a cada pregunta | M3 |
| Con `EmpresaId` | DetalleRespuestaOpcion | Opciones elegidas en preguntas de opción múltiple | M3 |
| Con `EmpresaId` | RiesgoEmpresa | Riesgos de la empresa | M4 |
| Con `EmpresaId` | EvaluacionRiesgo | Evaluaciones inicial y residual | M4 |
| Con `EmpresaId` | Control | Medidas de cada riesgo | M4 |
| Con `EmpresaId` | Tarea | Tareas de todos los orígenes | M5 |
| Con `EmpresaId` | Archivo | Datos y enlace de evidencias de tareas | M5 |
| Con `EmpresaId` | Accidente | Accidentes, incidentes y enfermedades profesionales | M6 |
| Con `EmpresaId` | InvestigacionAccidente | Causas y conclusiones | M6 |
| Con `EmpresaId` | Documento | Políticas y procedimientos de la empresa | M9 |
| Con `EmpresaId` | VersionDocumento | Cada versión | M9 |
| Con `EmpresaId` | Notificacion | Aviso a un vínculo, con su lectura y el estado del correo | M11 |

**M12 (panel) está fuera de alcance.**

## Recortadas (13-11-2026)

Estas entidades salieron del modelo al reducir el alcance (sin áreas, sin Google y sin M7, M8 ni la parte de personas afectadas de M6). Se listan para entender documentos anteriores.

| Entidad | Qué guardaba | Módulo | Motivo |
|---|---|---|---|
| ConexionGoogle | Cuenta de Google conectada y sus credenciales cifradas | M1 | Sin integración con Google (D16) |
| Area | Áreas de la empresa | M2 | Todo se trabaja a nivel de empresa (D4) |
| PersonaAfectada | Personas afectadas y días de incapacidad | M6 | Sin personas afectadas (D11) |
| Comision | Comisión de la empresa y su acta de constitución | M7 | Módulo fuera de alcance |
| IntegranteComision | Miembros, cargos y periodos | M7 | Módulo fuera de alcance |
| Reunion | Reuniones | M7 | Módulo fuera de alcance |
| Asistencia | Asistencia por reunión | M7 | Módulo fuera de alcance |
| Acta | Actas | M7 | Módulo fuera de alcance |
| FirmaActa | Firmas de cada acta | M7 | Módulo fuera de alcance |
| Equipo | Equipos y productos con su identificador | M8 | Módulo fuera de alcance |
| Mantenimiento | Mantenimientos y reparaciones | M8 | Módulo fuera de alcance |
| ArticuloEPP | Artículos de equipo de protección personal | M8 | Módulo fuera de alcance |
| IngresoEPP | Ingresos al inventario | M8 | Módulo fuera de alcance |
| EntregaEPP | Entregas a trabajadores | M8 | Módulo fuera de alcance |
| Informe | Reportes generados | M10 | M10 se reduce a imprimir la matriz, sin historial |
| EventoCalendario | Evento de Google Calendar y el registro que lo originó | M11 | Sin integración con Google (D16) |

El detalle de cada tabla está en el [modelo de datos](12-modelo-datos.md).

**Nota:** *Membresia* fue el nombre anterior de **VinculoEmpresa** (ver [glosario](11-glosario.md)).

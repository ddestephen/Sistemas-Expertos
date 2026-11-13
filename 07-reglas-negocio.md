# Reglas de negocio

**Para qué sirve:** lista las condiciones que el sistema debe respetar siempre. Cada historia de usuario cita las reglas que le aplican.

Las reglas con artículo vienen del reglamento hondureño, explicado en el [marco normativo](06-marco-normativo.md).

## Multiempresa

| Código | Regla |
|---|---|
| RN-01 | Cada empresa tiene un identificador único |
| RN-02 | Una misma persona física puede tener varios vínculos en empresas distintas; cada vínculo es independiente |
| RN-03 | Cada vínculo lleva un solo rol de sistema; puede ser distinto al de otro vínculo de la misma persona |
| RN-04 | Todo dato operativo pertenece a una sola empresa |
| RN-05 | Quien opera con un vínculo no puede consultar información de otra empresa |
| RN-06 | La empresa de cada operación se toma del token autenticado, nunca de lo que envíe el cliente |
| RN-07 | Un registro solo puede relacionarse con registros de su misma empresa |
| RN-08 | Una empresa siempre debe tener al menos un vínculo activo con rol Administrador de empresa |

## Identidad y acceso

| Código | Regla |
|---|---|
| RN-57 | El login de empresa usa correo y contraseña de **Acceso** más el identificador de empresa (cifrado en cliente); la API exige vínculo `activo` para ese `AccesoId` y `EmpresaId` |
| RN-65 | El correo de login es único en **Acceso**; todos los **VinculoEmpresa** que lo comparten usan la misma contraseña |
| RN-66 | El refresh token se guarda solo como hash; logout y rotación de refresh **borran** la fila en **RefreshToken** |
| RN-67 | Sin `Acceso.Verificado = true` no hay login (cuando aplique verificación de correo) |
| RN-58 | Suspender un vínculo no altera otros vínculos de la misma persona |
| RN-59 | Todo cambio de estado de un vínculo registra historial con motivo y actualiza el estado actual en la misma transacción |
| RN-60 | Si la empresa está suspendida, ningún vínculo de esa empresa puede iniciar sesión |
| RN-61 | **Fuera de alcance (recorte 13-11-2026).** El cargo en la comisión no sustituye ni amplía los permisos del rol en el vínculo |
| RN-62 | El nombre completo de una persona se obtiene de sus columnas de nombre; no se guarda como texto concatenado |

## Autorización (RBAC)

| Código | Regla |
|---|---|
| RN-63 | Cada **Permiso** tiene `Alcance` `empresa` o `plataforma`. Solo los de alcance `empresa` pueden enlazarse en **RolPermiso**; solo los de alcance `plataforma`, en **RolStaffPlataformaPermiso** |
| RN-64 | Con sesión de **vínculo**, la API solo evalúa permisos con `Alcance = empresa`. Con sesión **StaffPlataforma**, solo permisos con `Alcance = plataforma` |

## Perfil y encuesta

| Código | Regla |
|---|---|
| RN-09 | Cada empresa pertenece a un solo rubro |
| RN-10 | Sin rubro y sin al menos una categoría elegida no se puede generar una encuesta |
| RN-11 | Las categorías de riesgo disponibles dependen del rubro, y las preguntas de la encuesta dependen de las categorías elegidas |
| RN-12 | Cada pregunta conserva su tipo de respuesta y sus opciones. Editar una encuesta publicada crea una versión nueva; las respuestas enviadas conservan la versión que se mostró al encuestado |
| RN-13 | Un peligro se sugiere cuando al menos una respuesta elige una opción marcada como exposición (en `seleccion_unica` o `seleccion_multiple`). La sugerencia indica cuántas respuestas lo respaldan |
| RN-14 | Las mismas respuestas siempre producen las mismas sugerencias |

## Riesgos

| Código | Regla |
|---|---|
| RN-15 | El nivel de riesgo es probabilidad por severidad, cada una en escala de 1 a 5 |
| RN-16 | El resultado se clasifica en: 1–4 bajo, 5–9 medio, 10–14 alto, 15–25 crítico. Esta clasificación es una propuesta por validar |
| RN-17 | **Fuera de alcance (recorte 13-11-2026).** Cada riesgo pertenece a un área. Ahora los riesgos son de la empresa (D4) |
| RN-18 | Un peligro sugerido no forma parte de la matriz hasta que el Responsable SST lo confirme |
| RN-19 | Un riesgo alto o crítico exige al menos un control |
| RN-76 | Al definir controles, Norvia sugiere los de las plantillas del peligro del riesgo. El Responsable SST acepta, edita o descarta cada sugerencia; ninguna se guarda sin su confirmación |
| RN-20 | Cada evaluación se conserva; una nueva no reemplaza a la anterior |
| RN-21 | Cada control indica su tipo: eliminación, sustitución, ingeniería, administrativo o equipo de protección personal |

## Plan de trabajo

| Código | Regla |
|---|---|
| RN-22 | Una tarea necesita responsable activo en la empresa y fecha límite para iniciarse |
| RN-23 | Cada tarea conserva su origen: riesgo, accidente o manual |
| RN-24 | Solo el responsable de la tarea o el Responsable SST pueden actualizarla |
| RN-25 | Si la tarea exige evidencia, no se puede completar sin ella |

## Accidentes

| Código | Regla |
|---|---|
| RN-26 | Cada evento se clasifica como accidente, incidente o enfermedad profesional. Una enfermedad profesional se marca como sospechosa o diagnosticada |
| RN-27 | Cualquier vínculo activo de la empresa puede reportar un evento |
| RN-28 | Un evento no se cierra sin causas y medidas correctivas registradas (art. 46.1.a) |
| RN-29 | **Fuera de alcance (recorte 13-11-2026).** Un accidente grave genera una convocatoria a reunión extraordinaria (art. 32). Depende de M7 |
| RN-30 | **Fuera de alcance (recorte 13-11-2026).** Los datos de las personas afectadas solo son visibles para el Responsable SST y la comisión. Ya no se registran personas afectadas (D11) |
| RN-31 | La fecha de registro la fija el servidor; la fecha del evento la indica quien reporta |

## Comisión y actas

**Fuera de alcance (recorte 13-11-2026).** Las reglas de esta sección se conservan solo para no reutilizar sus códigos.

| Código | Regla |
|---|---|
| RN-32 | La comisión tiene igual número de representantes de cada parte, según la tabla del art. 14 |
| RN-33 | Cada propietario tiene un suplente (art. 14) |
| RN-34 | Un suplente solo cuenta para el quórum si su propietario está ausente (art. 14) |
| RN-35 | El quórum es la mitad más uno de los miembros propietarios (art. 23). Esta interpretación está por confirmar |
| RN-36 | El periodo de los integrantes es de 2 años (art. 21) |
| RN-37 | Debe haber al menos una reunión ordinaria al mes (art. 24) |
| RN-38 | El acta pasa por borrador, aprobada y firmada (art. 27.c) |
| RN-39 | Sin quórum no se puede aprobar el acta |
| RN-40 | Un acta firmada no se puede editar ni borrar; las correcciones se hacen en un acta nueva |
| RN-41 | Cada firma guarda vínculo, fecha y hash del contenido, una huella que permite detectar cambios |

## Gestión del riesgo

**Fuera de alcance (recorte 13-11-2026).** Las reglas de esta sección se conservan solo para no reutilizar sus códigos.

| Código | Regla |
|---|---|
| RN-42 | Cada equipo tiene un identificador único dentro de la empresa |
| RN-43 | Cada mantenimiento indica tipo (preventivo o correctivo), responsable y fecha. Uno realizado exige al menos una fotografía |
| RN-44 | La fecha de registro la fija el servidor, y un mantenimiento realizado no se puede editar |
| RN-45 | Un equipo cuya próxima fecha de mantenimiento ya pasó se considera vencido |
| RN-46 | El inventario de EPP se calcula como ingresos menos entregas, y no se guarda |
| RN-47 | No se puede entregar más EPP del que hay en inventario |
| RN-48 | Cada entrega de EPP indica trabajador, área o puesto, artículo, cantidad y fecha (art. 47.d) |

## Documentos y reportes

| Código | Regla |
|---|---|
| RN-49 | Un documento generado queda como borrador hasta que el Responsable SST lo apruebe |
| RN-50 | Una versión aprobada no se puede editar; los cambios crean una versión nueva |
| RN-51 | Cada documento tiene una sola versión vigente |
| RN-52 | Los informes usan los datos capturados en el sistema |

## Integración con Google

**Fuera de alcance (recorte 13-11-2026).** Las reglas de esta sección se conservan solo para no reutilizar sus códigos.

| Código | Regla |
|---|---|
| RN-53 | Cada empresa tiene como máximo una cuenta de Google conectada, y sus credenciales nunca se muestran |
| RN-54 | Las fechas de tareas, reuniones, mantenimientos, informes y vencimiento de la comisión se crean como eventos en el Google Calendar de la empresa |
| RN-55 | Si una fecha cambia, su evento se actualiza; si se cancela, el evento se elimina |
| RN-56 | Si Google no responde, la operación se guarda igual en Norvia y el evento se vuelve a intentar |

## Encuestas dinámicas y anonimato

| Código | Regla |
|---|---|
| RN-68 | El formulario presenta cada pregunta según su tipo: `respuesta_breve` acepta texto, `seleccion_unica` acepta una opción y `seleccion_multiple` acepta una o varias opciones. Se valida igual en el formulario y en el servidor |
| RN-69 | Una pregunta obligatoria sin respuesta impide enviar la encuesta |
| RN-70 | Solo se puede responder la versión publicada de una encuesta en estado `publicada`. Una versión en `borrador` se prepara sin que la vean los encuestados; una encuesta `cerrada` ya no recibe respuestas |
| RN-71 | Cada vínculo responde una misma encuesta una sola vez |
| RN-72 | La respuesta es anónima: no guarda el vínculo de quien respondió ni la hora, solo la fecha. La participación se guarda aparte, sin relación con la respuesta |
| RN-73 | El reporte de una encuesta solo se muestra cuando tiene al menos 3 respuestas, para que no se pueda deducir quién respondió qué |
| RN-74 | El rol `encuestado` solo puede responder encuestas, ver sus notificaciones y consultar las políticas vigentes |

## Notificaciones

| Código | Regla |
|---|---|
| RN-75 | Publicar una versión vigente de una política crea una notificación para cada vínculo activo de la empresa, visible en Norvia y enviada por correo |
| RN-77 | Asignar una tarea notifica a su responsable en Norvia y por correo |
| RN-78 | Si el correo falla, la notificación sigue visible en Norvia y el envío se reintenta hasta un máximo de intentos |
| RN-79 | Cada operador con vínculo solo ve y marca como leídas sus propias notificaciones |

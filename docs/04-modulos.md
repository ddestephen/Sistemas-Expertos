# Módulos

**Para qué sirve:** describe qué hace cada módulo y dónde se usa.

Las historias detalladas de cada módulo están en [historias de usuario](10-historias-usuario.md).

## M1. Empresas y acceso

**Propósito:** dar a cada empresa un espacio aislado y controlar quién entra.

- Registrar una empresa e iniciar sesión con **Acceso** (correo institucional) y el vínculo de esa empresa.
- Agregar vínculos (`Persona` + **Acceso** + rol) y gestionar su estado.
- Trabajar en otra empresa: nuevo inicio de sesión con el vínculo de esa empresa (no hay “cambiar empresa” en la misma sesión).
- Conectar la cuenta de Google de la empresa para sincronizar el calendario.
- Administrar los contenidos comunes de la plataforma: rubros, categorías de riesgo, preguntas, peligros y plantillas.

**Se usa en:** web. Iniciar sesión también en teléfono (cada sesión = un vínculo / una empresa).

## M2. Perfil de empresa

**Propósito:** conocer a la empresa para saber qué le aplica.

- Registrar razón social, RTN, dirección, actividad económica y número de trabajadores permanentes.
- Elegir el rubro: oficina administrativa, comercio o tienda, maquila o fábrica, o construcción.
- Registrar las áreas de la empresa.
- Calcular cuántos representantes necesita la Comisión Mixta.

**Se usa en:** web.

## M3. Diagnóstico de contexto

**Propósito:** conocer el contexto de la organización a través de sus trabajadores, para identificar sus riesgos.

Cada rubro tiene categorías de riesgo, como trabajo en alturas o alto voltaje, y cada categoría tiene preguntas exploratorias. Rubros, categorías y preguntas se guardan en la base de datos. Las categorías disponibles se filtran por el rubro de la empresa.

1. El Responsable de SST elige las categorías que quiere explorar. Solo ve las de su rubro.
2. Norvia reúne las preguntas de esas categorías y agrega una pregunta sobre el área en que trabaja cada persona.
3. Norvia crea una encuesta interna editable y la publica para los trabajadores con vínculo activo en la empresa.
4. El formulario muestra cada pregunta según su tipo: respuesta breve como texto, selección única como una opción y selección múltiple como varias opciones.
5. Los trabajadores inician sesión en Norvia, responden el cuestionario y envían sus respuestas a la plataforma.
6. Norvia presenta las respuestas con gráficos y comparativas por pregunta, área y encuesta; quien creó la encuesta puede editarla y consultar sus resultados.
7. Norvia sugiere peligros. Cada pregunta puede asociarse a un peligro y a la respuesta que indica exposición. Si al menos un trabajador da esa respuesta, el peligro se sugiere en su área, indicando cuántos trabajadores la dieron.

Los peligros sugeridos pasan a la matriz de riesgos, donde el Responsable de SST los confirma. Corresponde a la idea de "contexto de la organización" de ISO 45001.

**Se usa en:** web. Los trabajadores responden desde cualquier dispositivo e inician sesión con su vínculo de empresa.

## M4. Matriz de riesgos

**Propósito:** identificar, evaluar y controlar los riesgos de la empresa.

- Revisar los peligros sugeridos por la encuesta y agregar otros.
- Evaluar cada riesgo por probabilidad y severidad para obtener su nivel.
- Definir controles, de mayor a menor efectividad: eliminar, sustituir, controles de ingeniería, controles administrativos y equipo de protección personal.
- Volver a evaluar con los controles aplicados, lo que da el riesgo residual.
- Ver la matriz completa y su historial.

Un peligro es lo que puede causar daño, como una escalera en mal estado. El riesgo combina qué tan probable es el daño y qué tan grave sería.

**Se usa en:** web.

## M5. Plan de trabajo

**Propósito:** convertir lo detectado en acciones con dueño y fecha.

- Generar tareas desde los riesgos y sus controles. Otras tareas llegan de mantenimientos, accidentes y acuerdos de reunión.
- Asignar responsable y fecha.
- Atender tareas y adjuntar evidencia.
- Filtrar y ver lo vencido.

**Se usa en:** web. Atender tareas y adjuntar evidencia también en teléfono.

## M6. Accidentes e incidentes

**Propósito:** registrar lo ocurrido, entender por qué pasó y evitar que se repita.

- Reportar accidentes, incidentes (lo que estuvo a punto de causar daño) y enfermedades profesionales, sospechosas o diagnosticadas.
- Registrar a las personas afectadas y sus días de incapacidad.
- Investigar causas y definir medidas correctivas.
- Revisar la matriz de riesgos a partir de lo aprendido.
- Consultar estadísticas de siniestralidad y ausentismo.

**Se usa en:** teléfono y web para reportar. Web para investigar y consultar.

## M7. Comisión y actas

**Propósito:** gestionar lo que la ley exige a la Comisión Mixta de Higiene y Seguridad.

- Registrar la comisión, su acta de constitución y sus integrantes, con su periodo de 2 años.
- Programar reuniones ordinarias y extraordinarias.
- Registrar asistencia y verificar quórum.
- Redactar, aprobar y firmar actas.
- Convertir acuerdos en tareas y consultar el historial.

**Se usa en:** web. Firmar actas también en teléfono.

## M8. Gestión del riesgo

**Propósito:** mantener en buen estado los equipos de la empresa y controlar el equipo de protección personal (EPP).

**Equipos y mantenimiento:**

- Registrar cada equipo o producto con su identificador, tipo, área y responsable de mantenimiento.
- Marcar los equipos de emergencia, como extintores o lámparas de emergencia.
- Programar la próxima fecha de mantenimiento.
- Registrar mantenimientos preventivos y reparaciones, con fotografías tomadas desde el teléfono.
- Consultar el historial de cada equipo y los mantenimientos vencidos.
- Crear tareas de reparación cuando un mantenimiento detecta un problema.

**Equipo de protección personal:**

- Registrar los artículos de EPP y los ingresos al inventario.
- Registrar las entregas a cada trabajador, indicando su área o puesto.
- Consultar el inventario disponible y las entregas por área, puesto y periodo.

**Se usa en:** teléfono para registrar mantenimientos. Web para lo demás.

## M9. Políticas y procedimientos

**Propósito:** generar la documentación del sistema de gestión sin partir de cero.

- Elegir una plantilla, como la política de SST o un procedimiento de investigación de accidentes.
- Generar el documento con los datos de la empresa.
- Editar el borrador, aprobarlo y publicarlo.
- Crear versiones nuevas y conservar las anteriores.

**Se usa en:** web. Consultar los documentos vigentes también en teléfono.

## M10. Reportes

**Propósito:** generar documentos con los datos ya capturados.

| Reporte | Contenido |
|---|---|
| Matriz de riesgos | Riesgos por área, evaluación inicial y residual, y controles |
| Políticas | Políticas y procedimientos vigentes |
| Informe semestral | Actividades del semestre para las autoridades de trabajo |
| Informe anual | Informe para la Secretaría de Trabajo, con copia al Instituto Hondureño de Seguridad Social (IHSS) |
| Actas firmadas | Cada acta firmada en PDF |
| Historial | Todos los informes generados |

**Contenido del informe anual:**

| Sección | Qué incluye | De dónde salen los datos |
|---|---|---|
| Datos de la empresa | Razón social, RTN, dirección, actividad económica y número de trabajadores | M2 |
| Comisión de Seguridad e Higiene | Acta de constitución, integración y funciones de la Comisión Mixta | M7 |
| Estadísticas de siniestralidad | Accidentes de trabajo del periodo, enfermedades profesionales diagnosticadas o sospechosas, días de incapacidad y ausentismo | M6 |
| Gestión de prevención | Identificación de peligros, evaluación de riesgos, y mantenimiento de instalaciones y equipos de emergencia | M4, M8 |
| Equipo de protección personal | Inventario y entregas por área o puesto | M8 |
| Plan de acción y mejoras | Objetivos cumplidos durante el año, y retos o medidas correctivas para el siguiente periodo | M5, más el texto que redacta el Responsable SST |

**Se usa en:** web.

## M11. Notificaciones

**Propósito:** que nadie olvide una fecha importante.

Norvia usa Google Calendar con la cuenta conectada por la empresa. Crea un evento, e invita a las personas que corresponde, para:

- La fecha límite de cada tarea.
- Cada reunión de la comisión.
- Cada mantenimiento programado.
- Los informes semestral y anual.
- El vencimiento del periodo de la comisión.
- La reunión extraordinaria después de un accidente grave.

Si una fecha cambia, el evento se actualiza; si se cancela, se elimina. Los recordatorios los envía Google Calendar, también en el teléfono.

**Se usa en:** web y teléfono, a través de Google Calendar.

## M12. Panel de avance

**Propósito:** mostrar de un vistazo cómo va la empresa.

- Riesgos por nivel y riesgos altos sin control.
- Tareas pendientes y vencidas.
- Mantenimientos vencidos e inventario de EPP.
- Obligaciones del mes.
- Documentación lista para una auditoría.

Este módulo no guarda datos propios: lee los de los demás.

**Se usa en:** web.

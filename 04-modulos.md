# Módulos

**Para qué sirve:** describe qué hace cada módulo y dónde se usa.

Las historias detalladas de cada módulo están en [historias de usuario](10-historias-usuario.md).

**Alcance reducido (13-11-2026):** se construyen M1 a M6, M9, la impresión de la matriz (parte de M10) y M11 como notificaciones internas y por correo. M7, M8 y M12 quedan fuera. No hay áreas: todo se trabaja a nivel de empresa. No hay integración con Google ni app para teléfono.

## M1. Empresas y acceso

**Propósito:** dar a cada empresa un espacio aislado y controlar quién entra.

- Registrar una empresa e iniciar sesión con **Acceso** (correo institucional) y el vínculo de esa empresa.
- Agregar vínculos (`Persona` + **Acceso** + rol) y gestionar su estado.
- Crear las cuentas de los **encuestados**, una a una o en lote: vínculos con el rol `encuestado`, que solo responden encuestas, ven sus notificaciones y consultan las políticas vigentes.
- Trabajar en otra empresa: nuevo inicio de sesión con el vínculo de esa empresa (no hay “cambiar empresa” en la misma sesión).
- Administrar los contenidos comunes de la plataforma: rubros, categorías de riesgo, preguntas (con su tipo), peligros y plantillas.

**Se usa en:** web.

## M2. Perfil de empresa

**Propósito:** conocer a la empresa para saber qué le aplica.

- Registrar razón social, RTN, dirección, actividad económica y número de trabajadores permanentes.
- Elegir el rubro: oficina administrativa, comercio o tienda, maquila o fábrica, o construcción.

La empresa es la única unidad organizativa: no se registran áreas. El cálculo de la composición de la Comisión Mixta quedó fuera de alcance junto con M7.

**Se usa en:** web.

## M3. Diagnóstico de contexto

**Propósito:** conocer el contexto de la organización a través de sus trabajadores, para identificar sus riesgos.

Cada rubro tiene categorías de riesgo, como trabajo en alturas o alto voltaje, y cada categoría tiene preguntas exploratorias. Rubros, categorías y preguntas se guardan en la base de datos. Cada pregunta tiene un **tipo** que decide cómo se muestra y se valida: sí/no, opción única, opción múltiple, escala (por ejemplo, de 1 a 5 con etiquetas), texto corto, texto largo o número.

1. El Responsable de SST elige las categorías que quiere explorar. Solo ve las de su rubro.
2. Norvia genera la encuesta como borrador con las preguntas de esas categorías. El Responsable de SST puede quitar o reordenar preguntas y ver la vista previa.
3. El Responsable de SST la publica. Desde ese momento sus preguntas no cambian.
4. Los **encuestados** entran con su cuenta y responden un **formulario dinámico**: Norvia pinta cada pregunta con el control de su tipo y valida la respuesta igual en el formulario y en el servidor. Cada encuestado responde una sola vez.
5. Las respuestas son **anónimas**: Norvia guarda que la persona participó, pero no qué respondió.
6. Norvia muestra un **reporte anónimo** de la empresa, por pregunta, cuando hay al menos 3 respuestas.
7. Norvia sugiere peligros. Cada pregunta puede asociarse a un peligro y a la respuesta que indica exposición: una opción o, en una escala, un valor desde un umbral. Si al menos una respuesta indica exposición, el peligro se sugiere, indicando cuántas respuestas lo respaldan.

Los peligros sugeridos pasan a la matriz de riesgos, donde el Responsable de SST los confirma. Corresponde a la idea de "contexto de la organización" de ISO 45001.

**Se usa en:** web, también desde el navegador del teléfono.

## M4. Matriz de riesgos

**Propósito:** identificar, evaluar y controlar los riesgos de la empresa.

- Revisar los peligros sugeridos por la encuesta y agregar otros.
- Evaluar cada riesgo por probabilidad y severidad para obtener su nivel.
- Definir controles, de mayor a menor efectividad: eliminar, sustituir, controles de ingeniería, controles administrativos y equipo de protección personal. Norvia **sugiere controles** a partir de las plantillas del peligro, y el Responsable SST los acepta, edita o descarta.
- Volver a evaluar con los controles aplicados, lo que da el riesgo residual.
- Ver la matriz completa y su historial.
- **Imprimir la matriz** o descargarla en PDF (historia HU-075, del módulo M10).

Un peligro es lo que puede causar daño, como una escalera en mal estado. El riesgo combina qué tan probable es el daño y qué tan grave sería. Los riesgos son de toda la empresa, sin áreas.

**Se usa en:** web.

## M5. Plan de trabajo

**Propósito:** convertir lo detectado en acciones con dueño y fecha (plan de acción).

- Generar tareas desde los riesgos y sus controles. Otras tareas llegan de las medidas correctivas de accidentes o se crean a mano.
- Asignar responsable y fecha; el responsable recibe una notificación.
- Atender tareas y adjuntar evidencia.
- Filtrar y ver lo vencido.

**Se usa en:** web.

## M6. Accidentes e incidentes

**Propósito:** registrar lo ocurrido, entender por qué pasó y evitar que se repita.

- Reportar accidentes, incidentes (lo que estuvo a punto de causar daño) y enfermedades profesionales, sospechosas o diagnosticadas, con su lugar en texto libre.
- Investigar causas y definir medidas correctivas, que se convierten en tareas.
- Revisar la matriz de riesgos a partir de lo aprendido.
- Consultar estadísticas de eventos por tipo, gravedad y periodo.

No se registran personas afectadas ni días de incapacidad (recorte del 13-11-2026).

**Se usa en:** web.

## M7. Comisión y actas

> **Fuera de alcance (recorte del 13-11-2026).** Se conserva la descripción para no reutilizar el código del módulo; no se construye.

**Propósito:** gestionar lo que la ley exige a la Comisión Mixta de Higiene y Seguridad.

- Registrar la comisión, su acta de constitución y sus integrantes, con su periodo de 2 años.
- Programar reuniones ordinarias y extraordinarias.
- Registrar asistencia y verificar quórum.
- Redactar, aprobar y firmar actas.
- Convertir acuerdos en tareas y consultar el historial.

**Se usa en:** web. Firmar actas también en teléfono.

## M8. Gestión del riesgo

> **Fuera de alcance (recorte del 13-11-2026).** Se conserva la descripción para no reutilizar el código del módulo; no se construye.

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

Cuando se aprueba una versión nueva de una política, Norvia avisa a todos los vínculos activos de la empresa, dentro de Norvia y por correo (M11).

**Se usa en:** web.

## M10. Reportes

> **Alcance reducido (13-11-2026).** Solo se construye la **matriz de riesgos** para imprimir o descargar en PDF; pasa a E1 junto con M4. Los demás reportes, incluido el informe anual, quedan fuera de alcance.

**Propósito:** generar documentos con los datos ya capturados.

| Reporte | Contenido |
|---|---|
| Matriz de riesgos | Riesgos de la empresa, evaluación inicial y residual, y controles |
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

**Propósito:** que nadie se pierda un aviso importante.

Norvia guarda cada notificación para su destinatario y además la envía por correo. Notifica:

- La publicación de una versión nueva de una política, a todos los vínculos activos de la empresa.
- La asignación de una tarea, a su responsable.

Cada persona ve sus notificaciones dentro de Norvia, con las no leídas destacadas, y puede abrir la política o la tarea. Si el correo falla, la notificación sigue visible y el envío se reintenta.

La integración con Google Calendar quedó fuera de alcance (recorte del 13-11-2026).

**Se usa en:** web.

## M12. Panel de avance

> **Fuera de alcance (recorte del 13-11-2026).** Se conserva la descripción para no reutilizar el código del módulo; no se construye.

**Propósito:** mostrar de un vistazo cómo va la empresa.

- Riesgos por nivel y riesgos altos sin control.
- Tareas pendientes y vencidas.
- Mantenimientos vencidos e inventario de EPP.
- Obligaciones del mes.
- Documentación lista para una auditoría.

Este módulo no guarda datos propios: lee los de los demás.

**Se usa en:** web.

# Alcance

**Para qué sirve:** define qué se construye, en qué orden y qué queda fuera.

MVP significa "producto mínimo viable": la versión más pequeña que ya resuelve el problema para un cliente real.

## Qué incluye

Norvia tiene 12 módulos, descritos en [módulos](04-modulos.md).

| # | Módulo | En una frase |
|---|---|---|
| M1 | Empresas y acceso | Cada empresa tiene su espacio y sus vínculos operativos |
| M2 | Perfil de empresa | Datos de la empresa, rubro y áreas |
| M3 | Diagnóstico de contexto | Encuestas internas para trabajadores con cuenta, con resultados comparativos que sugieren peligros |
| M4 | Matriz de riesgos | Identificar, evaluar y controlar riesgos |
| M5 | Plan de trabajo | Tareas con responsable, fecha y evidencia |
| M6 | Accidentes e incidentes | Registrar e investigar lo ocurrido |
| M7 | Comisión y actas | Reuniones y actas firmadas de la Comisión Mixta |
| M8 | Gestión del riesgo | Mantenimiento de equipos con fotos y control del equipo de protección personal |
| M9 | Políticas y procedimientos | Documentos generados con datos de la empresa |
| M10 | Reportes | Matriz, políticas, informes obligatorios y actas en PDF |
| M11 | Notificaciones | Fechas y recordatorios en Google Calendar |
| M12 | Panel de avance | Vista general de la empresa |

## Web y teléfono

Norvia es multiplataforma, con reparto según el uso:

- **Teléfono, para el trabajo de campo:** registrar mantenimientos con fotos, reportar accidentes, atender tareas y firmar actas. Las fechas y recordatorios llegan por Google Calendar.
- **Web, para todo lo demás:** configuración, encuesta, matriz de riesgos, inventario de equipo de protección, documentos, reportes y panel. La web también incluye las funciones del teléfono.

La tecnología para construirlo se decidirá más adelante.

## Cómo se construye: un MVP en 3 entregas

Antes de escribir código, el equipo completa el diseño (historias HU-001 a HU-016). Después, el MVP se construye en 3 entregas, ordenadas según lo que depende de qué.

| Entrega | Módulos | Qué se puede demostrar al terminar |
|---|---|---|
| E1. Base y riesgos | M1 a M5 | Una empresa se registra, genera la encuesta, obtiene su matriz de riesgos y su plan de trabajo |
| E2. Operación | M6 a M8 y app para teléfono | Se registran accidentes, la comisión trabaja, y se registran mantenimientos y entregas de equipo de protección |
| E3. Documentos y seguimiento | M9 a M12 | Se generan políticas e informes, las fechas llegan a Google Calendar y el panel muestra el avance |

### Por qué un solo MVP y no varios

- **El curso califica una sola entrega final.** Lo que quede en un "MVP 2" no suma nota.
- **Las entregas evitan terminar con todo a medias.** Cada una deja algo completo y demostrable.
- **Definen qué recortar.** Las entregas indican qué sacrificar primero.

Si falta tiempo, se recorta en este orden:

1. Historias Should de E3.
2. Historias Should de E2.
3. La app para teléfono, conservando esas funciones en la web adaptada a pantallas pequeñas.

**Advertencia:** el alcance es grande: 12 módulos, dos aplicaciones y una integración externa con Google Calendar. Si el total no cabe en el tiempo disponible, debe decidirse antes de comenzar E2, no al final. La [rúbrica](02-requisitos-curso.md) premia la calidad de la base técnica más que la cantidad de módulos.

## Fuera de alcance

- Capacitaciones.
- Auditorías internas.
- Inspecciones con lista de verificación y códigos QR.
- Normas distintas de ISO 45001 y de la legislación hondureña de SST.
- Envío directo de informes a la Secretaría de Trabajo: la empresa descarga el documento y lo presenta.
- Facturación y planes de pago.
- Trabajo sin conexión a internet.

## Supuestos

- Los clientes son empresas con 10 o más trabajadores permanentes.
- Cada empresa corresponde a un solo rubro.
- Los trabajadores que responden las encuestas tienen un vínculo activo y una cuenta en Norvia.
- Hay conexión a internet al registrar mantenimientos y reportar accidentes.
- La firma electrónica es la de un operador autenticado con vínculo, no una firma avanzada certificada.
- El contenido de las categorías, preguntas, peligros y plantillas lo redacta el equipo en cantidad reducida por rubro, y debe revisarlo alguien con conocimiento de SST.

## Limitaciones

- **Infraestructura gratuita:** el servicio gratuito de Render se suspende tras 15 minutos sin uso, tarda hasta un minuto en reactivarse y pierde los archivos que tenga guardados. Las fotos y evidencias necesitan un almacenamiento externo.
- **Espacio de base de datos:** el plan gratuito de Neon ronda 1 GB por proyecto. Conviene confirmarlo antes de depender de esa cifra.
- **Dependencia de Google:** los recordatorios dependen de Google Calendar, sus límites de uso y de que la empresa autorice el acceso a su cuenta.
- **ISO 45001 tiene derechos de autor:** se cita por número de cláusula y se redacta con palabras propias.
- **Reglamento revisado:** versión reformada publicada en La Gaceta 30,523, del 19 de octubre de 2004. No se comprobó si tiene reformas posteriores.

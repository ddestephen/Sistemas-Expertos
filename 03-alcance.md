# Alcance

**Para qué sirve:** define qué se construye, en qué orden y qué queda fuera.

MVP significa "producto mínimo viable": la versión más pequeña que ya resuelve el problema para un cliente real.

## Qué incluye

El 13-11-2026 el equipo redujo el alcance. Norvia mantiene la numeración de sus 12 módulos, descritos en [módulos](04-modulos.md), pero solo construye los marcados como "Sí" o "Parcial".

| # | Módulo | En una frase | ¿Se construye? |
|---|---|---|---|
| M1 | Empresas y acceso | Cada empresa tiene su espacio, sus vínculos operativos y las cuentas de sus encuestados | Sí |
| M2 | Perfil de empresa | Datos de la empresa y su rubro | Sí, sin áreas |
| M3 | Diagnóstico de contexto | Encuesta dinámica y anónima a los trabajadores que sugiere peligros | Sí |
| M4 | Matriz de riesgos | Identificar, evaluar y controlar riesgos, con controles sugeridos | Sí |
| M5 | Plan de trabajo | Tareas con responsable, fecha y evidencia | Sí |
| M6 | Accidentes e incidentes | Registrar e investigar lo ocurrido | Sí, sin personas afectadas |
| M7 | Comisión y actas | Reuniones y actas firmadas de la Comisión Mixta | No |
| M8 | Gestión del riesgo | Mantenimiento de equipos y equipo de protección personal | No |
| M9 | Políticas y procedimientos | Documentos generados con datos de la empresa | Sí |
| M10 | Reportes | Matriz de riesgos para imprimir o en PDF | Parcial: solo la matriz |
| M11 | Notificaciones | Avisos dentro de Norvia y por correo | Sí |
| M12 | Panel de avance | Vista general de la empresa | No |

### Flujo principal acordado

1. Definir la empresa: registro, perfil y rubro.
2. Generar la encuesta según el rubro.
3. Crear las cuentas de los encuestados (y de quien aplica la encuesta, el Responsable SST).
4. Los encuestados responden; Norvia genera un reporte anónimo.
5. Matriz de riesgos a partir de los peligros sugeridos.
6. Impresión de la matriz.
7. Controles, sugerencias y plan de acción (gestión del riesgo).
8. Notificación de cada política nueva.

## Web

Norvia se construye solo como aplicación web, adaptada a pantallas pequeñas para que los encuestados puedan responder desde el navegador del teléfono. La app nativa para teléfono quedó fuera de alcance.

## Cómo se construye: un MVP en 2 entregas

Antes de escribir código, el equipo completa el diseño (historias HU-001 a HU-016). Después, el MVP se construye en 2 entregas, ordenadas según lo que depende de qué. La antigua E3 quedó vacía tras la reducción de alcance.

| Entrega | Módulos | Qué se puede demostrar al terminar |
|---|---|---|
| E1. Base, encuesta y riesgos | M1 a M5 y la matriz impresa (M10) | Una empresa se registra, crea las cuentas de sus encuestados, publica la encuesta, obtiene el reporte anónimo, arma e imprime su matriz de riesgos y su plan de trabajo |
| E2. Operación y seguimiento | M6, M9 y M11 | Se registran e investigan accidentes, se publican políticas y cada persona recibe sus avisos en Norvia y por correo |

### Por qué un solo MVP y no varios

- **El curso califica una sola entrega final.** Lo que quede en un "MVP 2" no suma nota.
- **Las entregas evitan terminar con todo a medias.** Cada una deja algo completo y demostrable.
- **Definen qué recortar.** Las entregas indican qué sacrificar primero.

Si falta tiempo, se recortan primero las historias Should de E2 y después las de E1.

## Fuera de alcance

- Capacitaciones.
- Comisión Mixta y actas (M7), mantenimiento de equipos y EPP (M8) y panel de avance (M12).
- Áreas o centros de trabajo: todo se trabaja a nivel de empresa.
- Personas afectadas y días de incapacidad en los accidentes.
- Informes semestral y anual, y demás reportes salvo la matriz de riesgos.
- Integración con Google (Forms y Calendar).
- App nativa para teléfono.
- Auditorías internas.
- Inspecciones con lista de verificación y códigos QR.
- Normas distintas de ISO 45001 y de la legislación hondureña de SST.
- Envío directo de informes a la Secretaría de Trabajo: la empresa descarga el documento y lo presenta.
- Facturación y planes de pago.
- Trabajo sin conexión a internet.

## Supuestos

- Los clientes son empresas con 10 o más trabajadores permanentes.
- Cada empresa corresponde a un solo rubro.
- Cada trabajador que responde la encuesta tiene una cuenta de encuestado con un correo propio, que también recibe las notificaciones. Debe confirmarse para trabajadores sin correo.
- Hay conexión a internet al responder encuestas y reportar accidentes.
- El contenido de las categorías, preguntas, peligros y plantillas lo redacta el equipo en cantidad reducida por rubro, y debe revisarlo alguien con conocimiento de SST.

## Limitaciones

- **Infraestructura gratuita:** el servicio gratuito de Render se suspende tras 15 minutos sin uso, tarda hasta un minuto en reactivarse y pierde los archivos que tenga guardados. Las fotos y evidencias necesitan un almacenamiento externo, y los correos pendientes se reintentan cuando el servicio vuelve.
- **Espacio de base de datos:** el plan gratuito de Neon ronda 1 GB por proyecto. Conviene confirmarlo antes de depender de esa cifra.
- **Envío de correo:** depende de un proveedor de correo con plan gratuito y sus límites diarios de envío.
- **ISO 45001 tiene derechos de autor:** se cita por número de cláusula y se redacta con palabras propias.
- **Reglamento revisado:** versión reformada publicada en La Gaceta 30,523, del 19 de octubre de 2004. No se comprobó si tiene reformas posteriores.

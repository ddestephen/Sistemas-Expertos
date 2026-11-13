# Documentación de Norvia

**Estado:** propuesta para aprobación del equipo
**Fecha:** 9 de noviembre de 2026

**Norvia** (Normativa + Vía) es el producto del proyecto final de Sistemas Expertos (UNAH, III PAC 2026): una plataforma para que las empresas hondureñas gestionen la seguridad y salud de sus trabajadores.

Antes de editar varios archivos, lee la [guía de edición de la documentación](00-guia-edicion-docs.md).

## Por dónde empezar

1. [Visión del producto](01-vision-producto.md): qué vamos a construir y para quién.
2. [Alcance](03-alcance.md): qué entra, qué no y en qué orden se construye.
3. [Módulos](04-modulos.md): qué hace cada parte del sistema.
4. [Sprint backlog de la entrega actual](13-sprint-backlog.md): qué historias se construyen primero para la Fase 1 y Fase 2.

Si una palabra no te resulta conocida, búscala en el [glosario](11-glosario.md).

## Todos los archivos

| Archivo | Para qué sirve | Quién debe leerlo |
|---|---|---|
| [01-vision-producto.md](01-vision-producto.md) | Problema, solución y recorrido del usuario | Todos |
| [02-requisitos-curso.md](02-requisitos-curso.md) | Qué exige la clase y cómo se califica | Todos |
| [03-alcance.md](03-alcance.md) | Qué se construye, en qué orden y qué queda fuera | Todos |
| [04-modulos.md](04-modulos.md) | Los 12 módulos en detalle | Todos |
| [05-actores-roles.md](05-actores-roles.md) | Quién usa el sistema y qué puede hacer | Todos |
| [06-marco-normativo.md](06-marco-normativo.md) | Qué exigen ISO 45001 y la ley hondureña | Quien trabaje en reglas o módulos |
| [07-reglas-negocio.md](07-reglas-negocio.md) | Condiciones que debe respetar el sistema | Quien diseñe o programe |
| [00-guia-edicion-docs.md](00-guia-edicion-docs.md) | Convenciones al cambiar decisiones, reglas y modelo | Quien edite la documentación |
| [08-decisiones-bd.md](08-decisiones-bd.md) | Decisiones que definen la base de datos | Quien diseñe la base de datos |
| [09-entidades.md](09-entidades.md) | Datos principales que guardará el sistema | Quien diseñe la base de datos |
| [10-historias-usuario.md](10-historias-usuario.md) | Todo el trabajo, historia por historia | Todos |
| [14-cambios-realizados.md](14-cambios-realizados.md) | Bitácora del equipo: problema, decisiones y HUs (antes/ahora) sin abrir otros docs | Quien se incorpore o retome el proyecto |
| [11-glosario.md](11-glosario.md) | Significado de términos y siglas | Consulta |
| [12-modelo-datos.md](12-modelo-datos.md) | Tablas, columnas, relaciones, restricciones e índices | Quien diseñe o programe |
| [13-sprint-backlog.md](13-sprint-backlog.md) | Sprint backlog priorizado para Fase 1 y 2 (entrega actual) | Desarrolladores y evaluadores |
| [15-diagramas-drawio.md](15-diagramas-drawio.md) | Diagramas ERD y relacionales con tipos PostgreSQL exportables a draw.io | Quien diseñe o modele la base de datos |
| [Diagramas.drawio](Diagramas.drawio) | Archivo vectorial nativo de Draw.io con páginas ERD y Relacional | Quien diseñe o modele la base de datos |

## Lo que el equipo debe aprobar

1. Los 12 módulos y lo que queda fuera ([alcance](03-alcance.md)).
2. El orden de construcción en 3 entregas ([alcance](03-alcance.md)).
3. Las decisiones de modelado D1–D25 ([decisiones](08-decisiones-bd.md)).

## Siguiente paso

1. El [modelo de datos](12-modelo-datos.md) es la propuesta para las historias HU-008 a HU-011 de [historias de usuario](10-historias-usuario.md). El equipo debe revisarlo antes de pasarlo a EF Core.
2. Seguir el [sprint backlog](13-sprint-backlog.md) para ejecutar las historias prioritarias de la Fase 1 (análisis y gobierno ágil) y Fase 2 (backend transaccional .NET + PostgreSQL).
3. Abrir o editar [Diagramas.drawio](Diagramas.drawio) en Draw.io (o importar los bloques Mermaid de [15-diagramas-drawio.md](15-diagramas-drawio.md)) para los entregables visuales de la Fase 1 (ERD en 3FN).

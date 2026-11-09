# Historias de usuario

**Para qué sirve:** describe todo el trabajo del proyecto, historia por historia. Estas historias se cargan al tablero del equipo.

## Cómo leer este archivo

Una historia de usuario (HU) dice quién necesita algo, qué necesita y para qué. Sus criterios de aceptación indican cuándo está terminada.

**Lenguaje de acceso:** **Persona** + **Usuario** (`Activo`: ¿puede usar la plataforma?). Entrar a una empresa: **VinculoEmpresa** (correo, clave, **Estado** activo/suspendido/baja, **Rol**). **Staff Norvia:** `StaffPlataforma` + `RolStaffPlataforma`. Gestionar roles de empresa: vínculo `admin_empresa`, no staff de plataforma.

| Código | Contenido |
|---|---|
| `HU-001` a `HU-016` | Análisis y diseño, antes de programar |
| `HU-017` a `HU-090` | Funciones de cada [módulo](04-modulos.md) (M1 a M12) |
| `HU-091` a `HU-113` | Trabajo técnico exigido por el [curso](02-requisitos-curso.md) o necesario para el producto |

Cada historia termina con estos datos:

- **Entrega:** Diseño, E1, E2 o E3, según el [alcance](03-alcance.md).
- **Dónde:** Web, Teléfono o ambos.
- **Prioridad:** Must (indispensable) o Should (se puede recortar si falta tiempo).
- **Depende de:** historias que deben estar listas antes.
- **Reglas:** `RN` son [reglas de negocio](07-reglas-negocio.md), `D` son [decisiones](08-decisiones-bd.md) y `art.` son artículos del [reglamento](06-marco-normativo.md).

---

## Análisis y diseño

### HU-001 | Aprobar el alcance

**Como** equipo, **quiero** aprobar los módulos, las entregas y las exclusiones, **para** saber qué vamos a construir.

**Criterios de aceptación:**

- El equipo revisó el alcance y los pendientes que le corresponden.
- La aprobación queda registrada en el tablero.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** ninguna · **Reglas:** ninguna

### HU-002 | Documentar los requerimientos funcionales

**Como** equipo, **quiero** listar los requerimientos de cada módulo, **para** tener claro qué operaciones permite el sistema.

**Criterios de aceptación:**

- Cada requerimiento tiene identificador, descripción, actor y prioridad.
- Se indican entradas y resultados esperados.
- Cada requerimiento se relaciona con al menos una HU.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-001 · **Reglas:** ninguna

### HU-003 | Documentar los requerimientos no funcionales

**Como** equipo, **quiero** definir las condiciones de calidad y operación, **para** que sean alcanzables con infraestructura gratuita.

**Criterios de aceptación:**

- Se documentan seguridad, aislamiento entre empresas, auditoría y mantenibilidad.
- Rendimiento y disponibilidad consideran que el servidor gratuito se suspende.
- Se define el tamaño máximo de archivos.
- Se documentan las dependencias de Google: cuenta, permisos y límites de uso.
- Se documentan las restricciones del curso.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-001 · **Reglas:** D14, D16

### HU-004 | Validar las reglas de negocio

**Como** equipo, **quiero** revisar y completar las reglas de negocio, **para** que controlen correctamente el sistema.

**Criterios de aceptación:**

- Cada regla es verificable.
- Cada regla se relaciona con sus requerimientos.
- Las reglas marcadas como propuesta quedan confirmadas o ajustadas.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-002 · **Reglas:** ninguna

### HU-005 | Priorizar el backlog

**Como** equipo, **quiero** ordenar las HUs por prioridad y dependencias, **para** saber qué se hace primero.

**Criterios de aceptación:**

- Las prioridades reflejan el tamaño del equipo y el plazo real.
- Se identifican las HUs bloqueadas por pendientes.
- El backlog queda ordenado en el tablero.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-002, HU-016 · **Reglas:** ninguna

### HU-006 | Elaborar casos de uso

**Como** equipo, **quiero** representar los casos de uso principales, **para** visualizar qué hace cada rol.

**Criterios de aceptación:**

- Un diagrama relaciona los 4 roles con los módulos.
- Se describen los casos de uso principales.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Should · **Depende de:** HU-002 · **Reglas:** ninguna

### HU-007 | Documentar los flujos principales

**Como** equipo, **quiero** documentar los flujos del producto, **para** entender la secuencia de cada operación.

**Criterios de aceptación:**

- Se documenta registro, inicio de sesión, cambio de empresa y conexión con Google.
- Se documenta categorías → encuesta en Google Forms → respuestas → peligros sugeridos → matriz de riesgos → plan de trabajo.
- Se documenta accidente → investigación → medidas → revisión de la matriz.
- Se documenta reunión → acta → aprobación → firma.
- Se documenta mantenimiento con fotos → tarea de reparación.
- Se documenta ingreso de EPP → entrega → inventario.
- Se documenta plantilla → borrador → aprobación → versión vigente.
- Se documenta fecha en Norvia → evento en Google Calendar → actualización o eliminación.
- Cada flujo indica inicio, resultado, alternativas y errores.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-002 · **Reglas:** ninguna

### HU-008 | Elaborar el diccionario de datos

**Como** equipo, **quiero** definir entidades y atributos, **para** establecer la información que guardará la plataforma.

**Criterios de aceptación:**

- Cada entidad tiene atributos, tipos, llaves primarias y foráneas.
- Se indican los atributos obligatorios y opcionales.
- Cada entidad se clasifica como raíz, global o con `EmpresaId`.
- Acceso: `Persona`, `Usuario` (`Activo`), `VinculoEmpresa`, `StaffPlataforma`, `RolStaffPlataforma`; RBAC empresa/plataforma.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-001 · **Reglas:** D1 a D24

### HU-009 | Definir el aislamiento multiempresa

**Como** equipo, **quiero** definir cómo se separa la información de cada empresa, **para** garantizar que nadie vea datos ajenos.

**Criterios de aceptación:**

- Se listan las tablas con `EmpresaId` y las entidades globales.
- Se documenta el patrón `VinculoEmpresa` (varias empresas = varios vínculos y credenciales separadas).
- Se define cómo el JWT fija una sola empresa por sesión (sin selector tras login).
- Se documenta cómo se impiden las referencias entre empresas.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-008 · **Reglas:** RN-04, RN-05, RN-06, RN-07, D1, D7, D15

### HU-010 | Diseñar el diagrama entidad-relación

**Como** equipo, **quiero** elaborar el ERD en tercera forma normal, **para** definir la estructura de la base de datos.

**Criterios de aceptación:**

- Muestra entidades, relaciones, cardinalidades y llaves.
- Las relaciones muchos a muchos usan entidades intermedias.
- Las tablas cumplen 1FN, 2FN y 3FN.
- Las decisiones de normalización quedan documentadas.
- Cada tabla existe en el diccionario de datos.
- El ERD incluye `Persona`, `Usuario`, `VinculoEmpresa`, `StaffPlataforma`, historiales, RBAC; no `Membresia`.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-008, HU-009 · **Reglas:** D1 a D24

### HU-011 | Definir restricciones e índices

**Como** equipo, **quiero** definir restricciones e índices, **para** proteger la integridad y optimizar las consultas.

**Criterios de aceptación:**

- Se identifican restricciones de unicidad y campos obligatorios.
- Se documentan las reglas de eliminación y actualización.
- Se identifican índices frecuentes, incluido `EmpresaId`.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-010 · **Reglas:** D15

### HU-012 | Definir los contratos de la API

**Como** equipo, **quiero** definir endpoints y DTOs, **para** acordar cómo se comunican los clientes con el backend.

**Criterios de aceptación:**

- Cada endpoint tiene método, ruta, parámetros, respuestas y códigos HTTP.
- Cada endpoint indica sus requisitos de acceso.
- Los DTOs de entrada y salida están separados de las entidades.
- Hay una estructura uniforme para errores.
- Los contratos sirven para web y teléfono.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-002, HU-010 · **Reglas:** ninguna

### HU-013 | Diseñar la arquitectura del backend

**Como** equipo, **quiero** definir la arquitectura, **para** separar responsabilidades.

**Criterios de aceptación:**

- Se definen las capas `Domain`, `Application`, `Infrastructure` y `API`.
- Se establecen las dependencias permitidas.
- Se define dónde van los casos de uso, la persistencia y el `DbContext`.
- Se documentan la inyección de dependencias, el manejo de errores y Vertical Slicing.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-001 · **Reglas:** ninguna

### HU-014 | Diseñar autenticación y autorización

**Como** equipo, **quiero** definir el mecanismo de acceso, **para** proteger los recursos.

**Criterios de aceptación:**

- Login con correo institucional y contraseña de `VinculoEmpresa`.
- Claims: `EmpresaId` cifrado, `VinculoEmpresaId`, `RolId`.
- Catálogo **Permiso** con **`Alcance`**: `empresa` (vínculo) o `plataforma` (staff). Sin mezclar alcances en `RolPermiso` / `RolStaffPlataformaPermiso` (D24, RN-63).
- Autorización: sesión empresa vía `Rol`/`RolPermiso` solo permisos `empresa`; sesión staff vía `RolStaffPlataforma`/`RolStaffPlataformaPermiso` solo permisos `plataforma` (D20, D23, RN-64).
- Login plataforma: `StaffPlataforma`; JWT sin `EmpresaId` de tenant o con claim de plataforma explícito.
- Se resuelve con el catedrático cómo cumplir `EmpresaId` encriptado.
- Se identifican endpoints públicos y protegidos.
- Se documentan las respuestas 401 y 403.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-009 · **Reglas:** RN-03, RN-05, RN-06, RN-57, RN-61, RN-63, RN-64, D1, D20, D21, D23, D24

### HU-015 | Redactar el pitch de 1 página

**Como** equipo, **quiero** resumir Norvia en una página, **para** cumplir el entregable de la Fase 1 del curso.

**Criterios de aceptación:**

- Ocupa una página y define problema, solución, cliente y MVP.
- Nombre del producto: **Norvia** (Normativa + Vía).
- Coincide con el alcance aprobado.
- Indica que la plataforma prepara a la empresa y no certifica.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-001 · **Reglas:** ninguna

### HU-016 | Configurar el tablero Kanban

**Como** equipo, **quiero** cargar las HUs en GitHub Projects, **para** dar seguimiento al trabajo.

**Criterios de aceptación:**

- Existen el repositorio y su tablero.
- Cada HU es un issue con sus criterios de aceptación.
- Los issues tienen entrega, módulo, prioridad y responsable.

**Módulo:** Diseño · **Entrega:** Diseño · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-001 · **Reglas:** ninguna

---

## M1. Empresas y acceso

### HU-017 | Registrar mi empresa

**Como** representante de una empresa, **quiero** registrarla, **para** empezar a gestionar su SST.

**Criterios de aceptación:**

- Se crean la empresa, la persona, la fila `Usuario` (`Activo = true`) y el vínculo con correo institucional y contraseña en una sola operación.
- Quien registra queda como Administrador de empresa en ese vínculo.
- Un RTN de empresa repetido se rechaza con un mensaje claro.
- La contraseña del vínculo se guarda con hash, nunca en texto plano.

**Módulo:** M1 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-091, HU-092 · **Reglas:** RN-01, D2

### HU-018 | Iniciar y cerrar sesión

**Como** operador de una empresa, **quiero** iniciar y cerrar sesión con mi correo institucional, **para** acceder de forma segura.

**Criterios de aceptación:**

- El login usa correo institucional y contraseña del vínculo (`VinculoEmpresa`).
- Si `Usuario.Activo` es falso, la empresa está suspendida o el vínculo no está `activo`, no hay acceso.
- Las credenciales incorrectas reciben un mensaje que no revela qué dato falló.
- El JWT incluye `EmpresaId` cifrado, `VinculoEmpresaId` y rol (HU-014).

**Módulo:** M1 · **Entrega:** E1 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-017, HU-094 · **Reglas:** RN-57, RN-60, D1, D21

### HU-019 | Acceder a otra empresa

**Como** persona con vínculos en varias empresas, **quiero** entrar con el correo de cada empresa, **para** que los accesos sigan separados.

**Criterios de aceptación:**

- No existe un selector de empresa tras un solo login: cada empresa usa su correo institucional y su contraseña.
- Cerrar sesión en una empresa no afecta otra.
- Pedir datos con token de otra empresa devuelve 403.

**Módulo:** M1 · **Entrega:** E1 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-018 · **Reglas:** RN-02, RN-05, RN-58, D21

### HU-020 | Agregar vínculos

**Como** Administrador de empresa, **quiero** dar de alta personas con correo institucional, **para** que participen en la gestión.

**Criterios de aceptación:**

- Creo o enlazo `Persona`, `Usuario` (`Activo` si es nueva en la app) y `VinculoEmpresa` con correo único en la plataforma.
- Asigno rol al crear el vínculo.
- Una persona no puede tener dos vínculos en la misma empresa.
- El correo institucional no se reutiliza en otro vínculo activo.

**Módulo:** M1 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-018 · **Reglas:** RN-02, D5

### HU-021 | Gestionar roles y vínculos

**Como** Administrador de empresa, **quiero** cambiar roles y estados de vínculos, **para** controlar quién accede.

**Criterios de aceptación:**

- Solo afecta a mi empresa.
- Suspender o dar de baja el **vínculo** registra `HistorialEstadoVinculo` con motivo (no confundir con `Usuario.Activo`, que bloquea a la persona en toda la plataforma y solo gestiona staff con `RolStaffPlataforma`).
- La empresa no puede quedar sin Administrador con vínculo activo.
- Otros roles reciben 403.

**Módulo:** M1 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-020, HU-095 · **Reglas:** RN-03, RN-08, RN-59

### HU-022 | Cambiar mi contraseña

**Como** operador con vínculo activo, **quiero** cambiar la contraseña de mi vínculo, **para** proteger el acceso a esa empresa.

**Criterios de aceptación:**

- Debo indicar la contraseña actual del vínculo.
- La nueva cumple la política definida.
- Debo cambiar el acceso temporal al entrar por primera vez.
- No altera contraseñas de vínculos en otras empresas.

**Módulo:** M1 · **Entrega:** E1 · **Dónde:** Web y teléfono · **Prioridad:** Should · **Depende de:** HU-018 · **Reglas:** ninguna

### HU-023 | Administrar los catálogos

**Como** Administrador de plataforma, **quiero** mantener rubros, categorías de riesgo, preguntas exploratorias, peligros y plantillas, **para** actualizar el contenido sin programar.

**Criterios de aceptación:**

- Puedo crear, editar y desactivar elementos.
- Cada categoría pertenece a un rubro, y cada pregunta a una categoría.
- Puedo asociar una pregunta a un peligro y a la respuesta que indica exposición.
- Los cambios no alteran encuestas ya generadas.
- Otros roles reciben 403.

**Módulo:** M1 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-097 · **Reglas:** RN-12, D7

### HU-024 | Consultar las empresas registradas

**Como** Administrador de plataforma, **quiero** ver las empresas registradas, **para** conocer el uso de la plataforma.

**Criterios de aceptación:**

- Veo nombre, rubro, fecha de registro y número de vínculos activos.
- No veo su información de SST.

**Módulo:** M1 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-017 · **Reglas:** RN-05

### HU-025 | Conectar la cuenta de Google

**Como** Administrador de empresa, **quiero** conectar la cuenta de Google de la empresa, **para** generar encuestas y usar el calendario.

**Criterios de aceptación:**

- Autorizo el acceso desde Norvia con la cuenta de Google de la empresa.
- La empresa tiene como máximo una cuenta conectada.
- Puedo desconectarla y conectar otra.
- Sin cuenta conectada, Norvia indica que no se pueden generar encuestas ni eventos.
- Las credenciales nunca se muestran.

**Módulo:** M1 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-021, HU-113 · **Reglas:** RN-53, D16

---

## M2. Perfil de empresa

### HU-026 | Completar el perfil

**Como** Administrador de empresa, **quiero** registrar los datos de mi empresa y su rubro, **para** que la plataforma sepa qué me aplica y pueda generar los informes.

**Criterios de aceptación:**

- Registro razón social, RTN, dirección, actividad económica y número de trabajadores permanentes.
- Elijo uno de los 4 rubros.
- El RTN no puede repetirse entre empresas.
- Puedo actualizar los datos.

**Módulo:** M2 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-017, HU-097 · **Reglas:** RN-01, RN-09, D5, D7

### HU-027 | Registrar áreas

**Como** Administrador de empresa, **quiero** registrar las áreas de mi empresa, **para** ubicar riesgos, equipos y responsables.

**Criterios de aceptación:**

- Cada área pertenece a mi empresa.
- Puedo asignar un Encargado de área.
- Un área con registros asociados se desactiva, no se borra.

**Módulo:** M2 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-026 · **Reglas:** RN-07, D3, D4

### HU-028 | Calcular la composición de la comisión

**Como** Responsable SST, **quiero** saber cuántos representantes necesita la comisión, **para** cumplir la ley.

**Criterios de aceptación:**

- Con 10 y 49 trabajadores indica 1 representante por parte.
- Con 50 y 99 indica 2; con 100 y 499, 3; con 500 y 999, 4; con 1000, 5.
- El resultado se calcula con los trabajadores permanentes de la empresa y no se guarda.
- Si cambia el número de trabajadores, recuerda comunicarlo a la Secretaría de Trabajo.

**Módulo:** M2 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-026 · **Reglas:** arts. 12, 14, 17, RN-32

---

## M3. Diagnóstico de contexto

### HU-029 | Elegir categorías de riesgo

**Como** Responsable SST, **quiero** elegir las categorías de riesgo que quiero explorar, **para** que la encuesta pregunte lo que aplica a mi empresa.

**Criterios de aceptación:**

- Solo veo las categorías del rubro de mi empresa.
- Puedo elegir una o varias categorías.
- Antes de generar la encuesta veo las preguntas que incluirá.

**Módulo:** M3 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-027, HU-097 · **Reglas:** RN-09, RN-11, D7

### HU-030 | Generar la encuesta en Google Forms

**Como** Responsable SST, **quiero** generar la encuesta con un clic, **para** compartirla con los trabajadores sin armarla a mano.

**Criterios de aceptación:**

- La encuesta se crea en la cuenta de Google de la empresa con las preguntas de las categorías elegidas.
- Incluye una pregunta sobre el área, con las áreas de la empresa como opciones.
- Queda publicada, y Norvia muestra su enlace para compartirlo.
- Se registran categorías, preguntas, fecha y autor.
- Si Google falla, se informa el error y no queda una encuesta a medias.

**Módulo:** M3 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-029, HU-025 · **Reglas:** RN-10, RN-12, D8, D16

### HU-031 | Importar las respuestas

**Como** Responsable SST, **quiero** traer las respuestas de la encuesta, **para** analizarlas en Norvia.

**Criterios de aceptación:**

- Puedo importar las respuestas cuando quiera.
- Importar de nuevo trae solo las respuestas nuevas, sin duplicar.
- Veo cuántas respuestas tiene la encuesta y la fecha de la última importación.

**Módulo:** M3 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-030 · **Reglas:** D8, D16

### HU-032 | Ver el resumen de respuestas

**Como** Responsable SST, **quiero** ver un resumen de las respuestas, **para** entender la situación de cada área.

**Criterios de aceptación:**

- Veo, por pregunta, cuántos trabajadores dieron cada respuesta.
- Puedo filtrar el resumen por área.

**Módulo:** M3 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-031 · **Reglas:** ninguna

### HU-033 | Obtener peligros sugeridos

**Como** Responsable SST, **quiero** que el sistema sugiera peligros a partir de las respuestas, **para** construir la matriz sin empezar de cero.

**Criterios de aceptación:**

- Si al menos un trabajador da la respuesta que indica exposición, se sugiere el peligro asociado en su área.
- Cada sugerencia indica la pregunta que la originó y cuántos trabajadores dieron esa respuesta.
- Las mismas respuestas producen las mismas sugerencias.
- Importar nuevas respuestas actualiza las sugerencias sin duplicarlas.
- Asociar un peligro a otra pregunta del catálogo cambia los resultados sin modificar código.

**Módulo:** M3 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-031 · **Reglas:** art. 46.1.b, RN-13, RN-14, D9

### HU-034 | Consultar encuestas anteriores

**Como** Responsable SST, **quiero** ver las encuestas anteriores, **para** comparar cómo cambian los resultados.

**Criterios de aceptación:**

- Veo cada encuesta con su fecha, categorías y número de respuestas.
- Puedo abrir el resumen y las sugerencias de cada una.

**Módulo:** M3 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-033 · **Reglas:** RN-12, D8

---

## M4. Matriz de riesgos

### HU-035 | Confirmar los peligros sugeridos

**Como** Responsable SST, **quiero** revisar los peligros sugeridos por la encuesta, **para** dejar en la matriz solo los que aplican.

**Criterios de aceptación:**

- Puedo confirmar o descartar cada sugerencia.
- Al confirmar se crea el riesgo en el área sugerida, que puedo cambiar.
- Un peligro sin confirmar no aparece en la matriz.

**Módulo:** M4 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-033 · **Reglas:** RN-17, RN-18, D9

### HU-036 | Agregar riesgos

**Como** Responsable SST, **quiero** agregar riesgos por mi cuenta, **para** incluir lo que el formulario no detectó.

**Criterios de aceptación:**

- Elijo un peligro del catálogo o lo describo.
- Indico el área y la actividad relacionada.

**Módulo:** M4 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-027 · **Reglas:** RN-17, D9

### HU-037 | Evaluar un riesgo

**Como** Responsable SST, **quiero** evaluar probabilidad y severidad, **para** conocer el nivel de cada riesgo.

**Criterios de aceptación:**

- Elijo probabilidad y severidad del 1 al 5, con su explicación visible.
- El sistema calcula el nivel y lo clasifica.
- Se registran evaluador y fecha.

**Módulo:** M4 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-035 · **Reglas:** art. 46.1.b, RN-15, RN-16, D10

### HU-038 | Ver la matriz de riesgos

**Como** Responsable SST, **quiero** ver todos mis riesgos, **para** decidir qué atender primero.

**Criterios de aceptación:**

- Veo una matriz de probabilidad por severidad con los riesgos ubicados.
- Veo también una lista filtrable por centro, área y nivel.
- Puedo abrir el detalle de cada riesgo.

**Módulo:** M4 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-037 · **Reglas:** art. 47.b

### HU-039 | Definir controles

**Como** Responsable SST, **quiero** definir controles, **para** reducir cada riesgo.

**Criterios de aceptación:**

- Cada control indica su tipo y descripción.
- Un riesgo alto o crítico exige al menos un control.
- Se señalan los riesgos altos sin control.

**Módulo:** M4 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-037 · **Reglas:** art. 46.1.e, RN-19, RN-21

### HU-040 | Evaluar el riesgo residual

**Como** Responsable SST, **quiero** evaluar el riesgo con los controles aplicados, **para** saber si bajó.

**Criterios de aceptación:**

- La evaluación residual queda separada de la inicial.
- Veo ambos niveles lado a lado.

**Módulo:** M4 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-039 · **Reglas:** RN-20, D10

### HU-041 | Consultar el historial de un riesgo

**Como** Responsable SST, **quiero** ver las evaluaciones anteriores, **para** demostrar la evolución.

**Criterios de aceptación:**

- Veo todas las evaluaciones con fecha y autor.
- Una evaluación nueva no borra las anteriores.

**Módulo:** M4 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-040 · **Reglas:** art. 47.b, RN-20

---

## M5. Plan de trabajo

### HU-042 | Generar el plan

**Como** Responsable SST, **quiero** convertir los riesgos y sus controles en tareas, **para** saber qué hacer y en qué orden.

**Criterios de aceptación:**

- Riesgos y controles producen tareas según las plantillas.
- Las tareas se ordenan por prioridad, empezando por los riesgos más altos.
- Puedo revisar el plan antes de confirmarlo.
- Generarlo dos veces no duplica tareas.

**Módulo:** M5 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-039 · **Reglas:** art. 46.1.e, RN-23, D6

### HU-043 | Asignar tareas

**Como** Responsable SST, **quiero** asignar responsable y fecha, **para** que cada tarea tenga dueño.

**Criterios de aceptación:**

- Solo puedo asignar vínculos activos de mi empresa como responsables.
- La tarea exige fecha límite.
- Puedo crear tareas manuales.

**Módulo:** M5 · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-042 · **Reglas:** RN-07, RN-22, D6

### HU-044 | Atender mis tareas

**Como** Colaborador, **quiero** ver y actualizar mis tareas, **para** informar mi avance.

**Criterios de aceptación:**

- Veo mis tareas asignadas.
- Puedo pasarlas por pendiente, en progreso y completada.
- No puedo cambiar tareas ajenas.

**Módulo:** M5 · **Entrega:** E1 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-043, HU-095 · **Reglas:** RN-24

### HU-045 | Adjuntar evidencia

**Como** responsable de una tarea, **quiero** adjuntar evidencia, **para** demostrar que se hizo.

**Criterios de aceptación:**

- Puedo adjuntar imágenes y PDF dentro del tamaño permitido.
- El archivo queda con fecha y autor.
- Solo operadores con vínculo en mi empresa pueden verlo.
- Si la tarea exige evidencia, no se completa sin ella.

**Módulo:** M5 · **Entrega:** E1 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-044, HU-100 · **Reglas:** RN-05, RN-25, D14

### HU-046 | Filtrar el plan

**Como** Responsable SST, **quiero** filtrar tareas, **para** encontrar lo urgente.

**Criterios de aceptación:**

- Puedo filtrar por estado, responsable, origen y fecha.
- Las tareas vencidas se distinguen claramente.

**Módulo:** M5 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-043 · **Reglas:** ninguna

---

## M6. Accidentes e incidentes

### HU-047 | Reportar un evento

**Como** Colaborador, **quiero** reportar un accidente o incidente desde donde esté, **para** que se atienda de inmediato.

**Criterios de aceptación:**

- Indico tipo, fecha, hora, área y descripción.
- Una enfermedad profesional se marca como sospechosa o diagnosticada.
- Puedo indicar si el accidente es grave.
- Puedo adjuntar fotos.
- El sistema registra quién reporta y cuándo.
- Cualquier operador con vínculo activo en la empresa puede reportar.

**Módulo:** M6 · **Entrega:** E2 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-027, HU-100, HU-105 · **Reglas:** arts. 9.j, 46.1.d, RN-26, RN-27, RN-31

### HU-048 | Registrar a las personas afectadas

**Como** Responsable SST, **quiero** registrar a las personas afectadas, **para** llevar el control de cada caso.

**Criterios de aceptación:**

- Registro nombre, puesto, tipo de lesión y días de incapacidad.
- La persona no necesita tener cuenta.
- Solo el Responsable SST y la comisión ven estos datos.

**Módulo:** M6 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-047 · **Reglas:** art. 47.f, RN-30, D11

### HU-049 | Investigar un evento

**Como** Responsable SST, **quiero** registrar causas y conclusiones, **para** entender por qué ocurrió.

**Criterios de aceptación:**

- Registro causas inmediatas y causas de fondo.
- Registro responsables de la investigación y fecha.
- El evento no se cierra sin causas y medidas.

**Módulo:** M6 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-047 · **Reglas:** arts. 25.d, 46.1.a, RN-28

### HU-050 | Definir medidas correctivas

**Como** Responsable SST, **quiero** convertir las medidas en tareas, **para** evitar que se repita.

**Criterios de aceptación:**

- Cada medida crea una tarea con origen "accidente".
- Desde el evento veo el avance de sus medidas.

**Módulo:** M6 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-049, HU-043 · **Reglas:** art. 46.1.a, RN-23, D6

### HU-051 | Actualizar la matriz tras un evento

**Como** Responsable SST, **quiero** enlazar el evento con un riesgo, **para** revisar la matriz con lo aprendido.

**Criterios de aceptación:**

- Puedo enlazarlo a un riesgo existente o crear uno nuevo.
- Puedo reevaluar el riesgo enlazado.

**Módulo:** M6 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-049, HU-037 · **Reglas:** art. 47.b, D9

### HU-052 | Consultar estadísticas

**Como** Responsable SST, **quiero** ver estadísticas, **para** detectar patrones.

**Criterios de aceptación:**

- Veo eventos por tipo, área y periodo.
- Veo días de incapacidad y ausentismo por periodo.
- Las cifras se calculan y no muestran datos personales.

**Módulo:** M6 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-048 · **Reglas:** arts. 47.e, 47.f, RN-30

---

## M7. Comisión y actas

### HU-053 | Constituir la comisión

**Como** Responsable SST, **quiero** registrar la comisión de la empresa, **para** gestionarla en la plataforma.

**Criterios de aceptación:**

- Registro la fecha de constitución y los datos de registro ante la Secretaría.
- Adjunto el acta de constitución.
- La empresa tiene una sola comisión activa.
- Se advierte si pasaron más de 30 días desde el inicio de operaciones.

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-028, HU-100 · **Reglas:** arts. 12, 15, D4, D14

### HU-054 | Registrar los integrantes

**Como** Responsable SST, **quiero** registrar a los integrantes, **para** cumplir la composición legal.

**Criterios de aceptación:**

- Cada integrante indica parte, condición, cargo y periodo.
- Se exige el mismo número de representantes por parte.
- Cada propietario tiene suplente.
- Hay un presidente y un secretario activos.
- Cada integrante es un vínculo activo de la empresa (`IntegranteComision.VinculoEmpresaId`).

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-053, HU-020 · **Reglas:** arts. 14, 19, 20, 21, 28.c, RN-32, RN-33, RN-36, D3, D5

### HU-055 | Programar reuniones

**Como** secretario de la comisión, **quiero** programar reuniones, **para** cumplir la reunión mensual.

**Criterios de aceptación:**

- Indico tipo, fecha, lugar y temas.
- La convocatoria queda registrada y visible para los integrantes.
- Una reunión extraordinaria registra su motivo.
- El sistema señala los meses sin reunión ordinaria.

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-054 · **Reglas:** arts. 24, 27.a, 32, RN-37

### HU-056 | Registrar asistencia y quórum

**Como** secretario de la comisión, **quiero** registrar la asistencia, **para** verificar el quórum.

**Criterios de aceptación:**

- Marco la asistencia de cada integrante.
- Un suplente solo cuenta si falta su propietario.
- El sistema indica si hay quórum.

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-055 · **Reglas:** arts. 14, 23, 27.b, RN-34, RN-35

### HU-057 | Redactar el acta

**Como** secretario de la comisión, **quiero** redactar el acta, **para** dejar constancia de la reunión.

**Criterios de aceptación:**

- Tiene conclusiones de visitas, resultados de investigaciones, actividades educativas y otros temas.
- Queda como borrador editable.
- Solo el secretario puede redactarla.

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-056 · **Reglas:** arts. 27.c, 33, D3

### HU-058 | Aprobar y firmar el acta

**Como** integrante de la comisión, **quiero** aprobar y firmar el acta, **para** que quede como registro verificable.

**Criterios de aceptación:**

- El acta pasa por borrador, aprobada y firmada.
- Sin quórum no se aprueba.
- Solo firman los asistentes.
- Un acta firmada no se edita ni se borra por ninguna vía.
- Se puede comprobar que el contenido coincide con su hash.

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-057, HU-105 · **Reglas:** art. 27.c, RN-38, RN-39, RN-40, RN-41, D12

### HU-059 | Convertir acuerdos en tareas

**Como** secretario de la comisión, **quiero** crear tareas desde los acuerdos, **para** dar seguimiento a lo decidido.

**Criterios de aceptación:**

- La tarea queda con origen "acuerdo de reunión" y referencia al acta.

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-043, HU-057 · **Reglas:** RN-23, D6

### HU-060 | Consultar el historial de actas

**Como** operador con vínculo en la empresa, **quiero** consultar las actas, **para** tenerlas disponibles ante la autoridad.

**Criterios de aceptación:**

- Veo las actas firmadas por fecha, con búsqueda por periodo.
- Los borradores solo los ve la comisión.

**Módulo:** M7 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-058 · **Reglas:** arts. 27.e, 33, RN-05

### HU-061 | Renovar la comisión

**Como** Responsable SST, **quiero** registrar nuevos periodos, **para** mantener vigente la comisión.

**Criterios de aceptación:**

- Puedo registrar nuevos integrantes o reelegir a los actuales.
- Se conserva el historial de integrantes anteriores.

**Módulo:** M7 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-054 · **Reglas:** arts. 17, 21, RN-36

---

## M8. Gestión del riesgo

### HU-062 | Registrar equipos

**Como** Responsable SST, **quiero** registrar los equipos y productos de la empresa, **para** controlar su mantenimiento.

**Criterios de aceptación:**

- Cada equipo tiene identificador, nombre, tipo, área y responsable de mantenimiento.
- El identificador no puede repetirse dentro de la empresa.
- Puedo marcar un equipo como equipo de emergencia.
- Puedo indicar la próxima fecha de mantenimiento.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-027 · **Reglas:** RN-42, D17

### HU-063 | Registrar un mantenimiento o reparación

**Como** responsable de mantenimiento, **quiero** registrar el trabajo desde el teléfono, **para** dejar constancia con fotografías.

**Criterios de aceptación:**

- Elijo el equipo por su identificador.
- Indico si es preventivo o correctivo, y describo lo realizado.
- Tomo una o varias fotografías con el teléfono.
- No se puede marcar como realizado sin al menos una fotografía.
- La fecha de registro la fija el servidor, y un mantenimiento realizado no se edita.
- Al registrar un preventivo puedo programar la siguiente fecha.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-062, HU-100, HU-105 · **Reglas:** RN-43, RN-44, D14, D17

### HU-064 | Consultar el historial de un equipo

**Como** Responsable SST, **quiero** ver el historial de cada equipo, **para** demostrar su mantenimiento.

**Criterios de aceptación:**

- Veo todos los mantenimientos y reparaciones con fecha, responsable y fotografías.
- Puedo filtrar por tipo y periodo.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-063 · **Reglas:** D17

### HU-065 | Ver los mantenimientos vencidos

**Como** Responsable SST, **quiero** ver qué equipos tienen el mantenimiento vencido, **para** atenderlos primero.

**Criterios de aceptación:**

- Veo los equipos cuya próxima fecha ya pasó.
- Los equipos de emergencia se distinguen claramente.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-062 · **Reglas:** RN-45

### HU-066 | Crear una tarea de reparación

**Como** responsable de mantenimiento, **quiero** crear una tarea cuando detecto un problema, **para** que se repare.

**Criterios de aceptación:**

- La tarea queda con origen "mantenimiento" y referencia al equipo.
- Desde el equipo veo sus tareas abiertas.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web y teléfono · **Prioridad:** Should · **Depende de:** HU-063, HU-043 · **Reglas:** RN-23, D6

### HU-067 | Registrar artículos e ingresos de EPP

**Como** Responsable SST, **quiero** registrar el equipo de protección personal que compra la empresa, **para** llevar su inventario.

**Criterios de aceptación:**

- Cada artículo tiene nombre, tipo y marca.
- Registro cada ingreso con cantidad y fecha.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-027 · **Reglas:** arts. 9.f, 47.d, D18

### HU-068 | Registrar entregas de EPP

**Como** Responsable SST, **quiero** registrar cada entrega de EPP, **para** saber qué recibió cada trabajador.

**Criterios de aceptación:**

- Indico trabajador, área o puesto, artículo, cantidad y fecha.
- El trabajador no necesita cuenta en Norvia.
- No puedo entregar más de lo que hay en inventario.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-067 · **Reglas:** art. 47.d, RN-47, RN-48, D18

### HU-069 | Consultar inventario y entregas de EPP

**Como** Responsable SST, **quiero** consultar el inventario y las entregas, **para** saber qué hay disponible y qué se ha entregado.

**Criterios de aceptación:**

- Veo el inventario de cada artículo, calculado a partir de ingresos y entregas.
- Veo las entregas por área, puesto y periodo.

**Módulo:** M8 · **Entrega:** E2 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-068 · **Reglas:** RN-46, D18

---

## M9. Políticas y procedimientos

### HU-070 | Generar un documento

**Como** Responsable SST, **quiero** generar una política o procedimiento desde una plantilla, **para** no empezar desde cero.

**Criterios de aceptación:**

- Veo las plantillas disponibles para mi rubro.
- El documento se llena con los datos de la empresa.
- Incluye al menos la política de SST y el procedimiento de investigación de accidentes.
- Queda como borrador.
- Se avisa que la empresa debe revisar el contenido.

**Módulo:** M9 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-026, HU-097 · **Reglas:** RN-49, D13

### HU-071 | Editar el borrador

**Como** Responsable SST, **quiero** editar el borrador, **para** adaptarlo a mi empresa.

**Criterios de aceptación:**

- Puedo modificar el contenido.
- Los cambios se guardan sin alterar la plantilla.

**Módulo:** M9 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-070 · **Reglas:** D13

### HU-072 | Aprobar un documento

**Como** Responsable SST, **quiero** aprobar un documento, **para** dejarlo vigente.

**Criterios de aceptación:**

- La versión aprobada registra aprobador y fecha.
- Una versión aprobada no se puede editar.
- Cada documento tiene una sola versión vigente.

**Módulo:** M9 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-071 · **Reglas:** RN-50, RN-51, D13

### HU-073 | Crear una versión nueva

**Como** Responsable SST, **quiero** crear una versión nueva, **para** actualizar un documento sin perder el anterior.

**Criterios de aceptación:**

- La versión nueva parte de la vigente y queda como borrador.
- Las versiones anteriores siguen disponibles para consulta.

**Módulo:** M9 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-072 · **Reglas:** RN-50, D13

### HU-074 | Consultar los documentos vigentes

**Como** operador con vínculo en la empresa, **quiero** consultar los documentos vigentes, **para** conocer las políticas y procedimientos.

**Criterios de aceptación:**

- Veo solo las versiones vigentes.
- Puedo buscar por nombre y descargar en PDF.

**Módulo:** M9 · **Entrega:** E3 · **Dónde:** Web y teléfono · **Prioridad:** Should · **Depende de:** HU-072 · **Reglas:** RN-05

---

## M10. Reportes

### HU-075 | Generar la matriz de riesgos en PDF

**Como** Responsable SST, **quiero** descargar la matriz de riesgos, **para** presentarla en una auditoría o inspección.

**Criterios de aceptación:**

- Incluye los riesgos por área, con evaluación inicial, residual y controles.
- Indica la fecha de generación.

**Módulo:** M10 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-038 · **Reglas:** art. 47.b, RN-52

### HU-076 | Generar las políticas en PDF

**Como** Responsable SST, **quiero** descargar las políticas y procedimientos vigentes, **para** presentarlos o compartirlos.

**Criterios de aceptación:**

- Incluye solo las versiones vigentes.
- Cada documento muestra su versión y fecha de aprobación.

**Módulo:** M10 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-072 · **Reglas:** RN-51

### HU-077 | Generar el informe semestral

**Como** Responsable SST, **quiero** generar el informe semestral en PDF, **para** presentarlo a las autoridades de trabajo.

**Criterios de aceptación:**

- Elijo el semestre.
- Incluye reuniones, mantenimientos, accidentes y tareas del periodo.
- Usa los datos ya capturados.
- La empresa descarga el PDF y lo presenta.

**Módulo:** M10 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-047, HU-058, HU-063 · **Reglas:** art. 25.f, RN-52

### HU-078 | Generar el informe anual

**Como** Responsable SST, **quiero** generar el informe anual en PDF, **para** remitirlo a la Secretaría de Trabajo, con copia al IHSS.

**Criterios de aceptación:**

- **Datos de la empresa:** razón social, RTN, dirección, actividad económica y número de trabajadores.
- **Comisión de Seguridad e Higiene:** acta de constitución, integración y funciones de la comisión.
- **Estadísticas de siniestralidad:** accidentes del periodo, enfermedades profesionales diagnosticadas o sospechosas, días de incapacidad y ausentismo.
- **Gestión de prevención:** identificación de peligros, evaluación de riesgos, y mantenimiento de instalaciones y equipos de emergencia.
- **Equipo de protección personal:** inventario y entregas por área o puesto.
- **Plan de acción y mejoras:** objetivos cumplidos durante el año, y retos o medidas correctivas para el siguiente periodo.
- Los objetivos cumplidos salen de las tareas completadas. Los retos y medidas los redacto antes de generar el informe.
- El informe recuerda el plazo de la última quincena de noviembre y la copia al IHSS.

**Módulo:** M10 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-077, HU-026, HU-054, HU-048, HU-038, HU-064, HU-069 · **Reglas:** art. 25.o, RN-52

### HU-079 | Descargar un acta en PDF

**Como** operador con vínculo en la empresa, **quiero** descargar un acta firmada, **para** presentarla ante la autoridad.

**Criterios de aceptación:**

- Incluye contenido, asistentes, firmas y hash.
- Solo se descargan actas firmadas.

**Módulo:** M10 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-058 · **Reglas:** art. 33, D12

### HU-080 | Consultar los informes generados

**Como** Responsable SST, **quiero** ver los reportes generados, **para** volver a descargarlos.

**Criterios de aceptación:**

- Veo tipo, periodo, autor y fecha.
- Puedo descargar cada reporte de nuevo.

**Módulo:** M10 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-077 · **Reglas:** ninguna

---

## M11. Notificaciones

### HU-081 | Llevar las tareas al calendario

**Como** responsable de una tarea, **quiero** que su fecha límite aparezca en mi calendario, **para** no olvidarla.

**Criterios de aceptación:**

- Al asignar una tarea se crea un evento en su fecha límite e invita al responsable.
- El recordatorio lo envía Google Calendar, también en el teléfono.

**Módulo:** M11 · **Entrega:** E3 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-025, HU-043 · **Reglas:** RN-54, D16

### HU-082 | Llevar las reuniones al calendario

**Como** integrante de la comisión, **quiero** recibir la invitación a cada reunión, **para** asistir.

**Criterios de aceptación:**

- Al programar una reunión se crea un evento e invita a sus integrantes.
- El evento indica tipo de reunión, lugar y temas.

**Módulo:** M11 · **Entrega:** E3 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-025, HU-055 · **Reglas:** art. 24, RN-54, D16

### HU-083 | Llevar los mantenimientos al calendario

**Como** responsable de mantenimiento, **quiero** que el próximo mantenimiento aparezca en mi calendario, **para** hacerlo a tiempo.

**Criterios de aceptación:**

- Al programar la próxima fecha de un equipo se crea un evento e invita a su responsable.
- El evento indica el equipo y su identificador.

**Módulo:** M11 · **Entrega:** E3 · **Dónde:** Web y teléfono · **Prioridad:** Should · **Depende de:** HU-025, HU-062 · **Reglas:** RN-54, D16

### HU-084 | Llevar informes y vencimientos al calendario

**Como** Responsable SST, **quiero** ver en mi calendario los informes y el vencimiento de la comisión, **para** cumplir los plazos.

**Criterios de aceptación:**

- Hay eventos para el informe semestral y para el anual, este en la última quincena de noviembre.
- Hay un evento para el fin del periodo de la comisión.

**Módulo:** M11 · **Entrega:** E3 · **Dónde:** Web y teléfono · **Prioridad:** Should · **Depende de:** HU-025, HU-054 · **Reglas:** arts. 21, 25.f, 25.o, RN-54

### HU-085 | Convocar tras un accidente grave

**Como** Responsable SST, **quiero** que un accidente grave convoque a la comisión, **para** cumplir la reunión extraordinaria.

**Criterios de aceptación:**

- Al registrar un accidente grave se propone una reunión extraordinaria.
- Al confirmarla se crea el evento e invita a la comisión y al encargado del área.

**Módulo:** M11 · **Entrega:** E3 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-047, HU-082 · **Reglas:** art. 32, RN-29, RN-54

### HU-086 | Mantener el calendario actualizado

**Como** operador autenticado con vínculo, **quiero** que el calendario refleje los cambios, **para** no ir a reuniones canceladas ni trabajar con fechas viejas.

**Criterios de aceptación:**

- Si una fecha cambia, su evento se actualiza.
- Si algo se cancela o se elimina, su evento se elimina.
- Si Google no responde, el cambio se guarda en Norvia y el evento se vuelve a intentar.

**Módulo:** M11 · **Entrega:** E3 · **Dónde:** Web y teléfono · **Prioridad:** Must · **Depende de:** HU-081 · **Reglas:** RN-55, RN-56, D16

---

## M12. Panel de avance

### HU-087 | Ver el avance general

**Como** Responsable SST, **quiero** ver un panel general, **para** saber cómo va la empresa.

**Criterios de aceptación:**

- Muestra riesgos por nivel, riesgos altos o críticos sin control, y tareas pendientes y vencidas.
- Los datos se calculan a partir de los demás módulos.
- Cada indicador lleva a su detalle.

**Módulo:** M12 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-039, HU-043 · **Reglas:** RN-19

### HU-088 | Ver el estado de equipos y EPP

**Como** Responsable SST, **quiero** ver mantenimientos vencidos e inventario de EPP, **para** anticiparme.

**Criterios de aceptación:**

- Muestra los equipos con mantenimiento vencido, destacando los de emergencia.
- Muestra el inventario de cada artículo de EPP.

**Módulo:** M12 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-087, HU-065, HU-069 · **Reglas:** RN-45, RN-46

### HU-089 | Ver las obligaciones del mes

**Como** Responsable SST, **quiero** ver mis obligaciones del mes, **para** que no se me pasen.

**Criterios de aceptación:**

- Muestra la reunión mensual, los mantenimientos programados y los informes próximos.
- En noviembre destaca el informe anual.

**Módulo:** M12 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-087, HU-055 · **Reglas:** arts. 24, 25.f, 25.o

### HU-090 | Ver la documentación lista

**Como** Responsable SST, **quiero** ver qué documentación tengo, **para** preparar una auditoría.

**Criterios de aceptación:**

- Muestra documentos vigentes, actas firmadas, reportes y evidencias por periodo.
- Señala los periodos sin documentación.

**Módulo:** M12 · **Entrega:** E3 · **Dónde:** Web · **Prioridad:** Should · **Depende de:** HU-087, HU-080 · **Reglas:** ninguna

---

## Trabajo técnico

### HU-091 | Crear la solución con Clean Architecture

**Como** equipo, **quiero** crear la solución .NET por capas, **para** separar responsabilidades.

**Criterios de aceptación:**

- Existen los proyectos `Domain`, `Application`, `Infrastructure` y `API`.
- Las dependencias siguen la arquitectura aprobada.
- Las funcionalidades se organizan por Vertical Slicing.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-013 · **Reglas:** ninguna

### HU-092 | Configurar EF Core Code-First

**Como** equipo, **quiero** crear el modelo con EF Core y PostgreSQL, **para** versionar la base de datos.

**Criterios de aceptación:**

- Las entidades coinciden con el ERD aprobado.
- Las migraciones incluyen restricciones e índices.
- La base se crea desde cero con las migraciones.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-091, HU-011 · **Reglas:** ninguna

### HU-093 | Aplicar filtros globales por empresa

**Como** equipo, **quiero** usar `HasQueryFilter`, **para** aislar los datos automáticamente.

**Criterios de aceptación:**

- Toda entidad con `EmpresaId` tiene filtro global.
- El tenant sale del JWT (`EmpresaId` del vínculo autenticado), nunca del cliente.
- Al guardar, `EmpresaId` se asigna desde el token, no desde el cuerpo del request.
- El uso de `IgnoreQueryFilters` está limitado y justificado.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-092, HU-094 · **Reglas:** RN-04, RN-05, RN-06, RN-07, D15

### HU-094 | Implementar autenticación JWT

**Como** equipo, **quiero** emitir y validar JWT, **para** identificar el vínculo y la empresa de la sesión.

**Criterios de aceptación:**

- El token incluye `VinculoEmpresaId`, `EmpresaId` (cifrado según HU-014) y `RolId`.
- El login previo valida correo institucional y contraseña del vínculo.
- Se validan firma, emisor, audiencia y expiración.
- Un token inválido recibe 401.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-014, HU-091 · **Reglas:** RN-06, RN-57, D1, D21

### HU-095 | Implementar autorización por roles

**Como** equipo, **quiero** proteger los endpoints según permisos del rol del vínculo, **para** que cada operador haga solo lo permitido.

**Criterios de aceptación:**

- Cada endpoint protegido se resuelve contra **Permiso** filtrado por **`Alcance`** y tipo de sesión: vínculo → `RolPermiso`; staff → `RolStaffPlataformaPermiso` (RN-63, RN-64, D24).
- Un rol sin permiso recibe 403.
- El staff de plataforma usa `RolStaffPlataforma`/`RolStaffPlataformaPermiso` (`Alcance = plataforma`), sin permisos de gestionar vínculos ajenos.
- Las acciones de la comisión se validan contra el cargo de la persona.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-094 · **Reglas:** RN-03, RN-61, RN-63, RN-64, D3, D20, D24

### HU-096 | Validar con FluentValidation

**Como** equipo, **quiero** validar las entradas y centralizar los errores, **para** responder de forma uniforme.

**Criterios de aceptación:**

- Cada comando tiene su validador.
- Un middleware global convierte los errores a la estructura acordada.
- Los errores no exponen detalles internos.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-091, HU-012 · **Reglas:** ninguna

### HU-097 | Cargar los catálogos iniciales

**Como** equipo, **quiero** cargar rubros, categorías de riesgo, preguntas exploratorias, peligros y plantillas, **para** que el sistema tenga contenido desde el inicio.

**Criterios de aceptación:**

- Cubre los 4 rubros, cada uno con sus categorías y preguntas.
- Las preguntas que detectan un peligro tienen su peligro y su respuesta de exposición.
- Repetir la carga no duplica datos.
- El contenido usa redacción propia y lo revisa alguien con conocimiento de SST.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-092 · **Reglas:** D7

### HU-098 | Probar el aislamiento entre empresas

**Como** equipo, **quiero** pruebas automáticas de aislamiento, **para** demostrar que ninguna empresa accede a datos ajenos.

**Criterios de aceptación:**

- Con dos empresas de prueba, ninguna lista, consulta ni modifica datos de la otra.
- Referenciar un registro de otra empresa se rechaza.
- Cambiar `EmpresaId` en la petición no tiene efecto.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-093 · **Reglas:** RN-05, RN-06, RN-07, D15

### HU-099 | Registrar la auditoría de acciones

**Como** equipo, **quiero** registrar las acciones importantes, **para** que la evidencia sea verificable.

**Criterios de aceptación:**

- Se registran `VinculoEmpresaId` o `StaffPlataformaId`, empresa (si aplica), acción, entidad y fecha.
- El registro no se puede editar desde la aplicación.
- Cubre al menos firmas, aprobaciones, cambios de rol, mantenimientos y entregas de EPP.

**Módulo:** Técnico · **Entrega:** E3 · **Dónde:** No aplica · **Prioridad:** Should · **Depende de:** HU-093 · **Reglas:** ninguna

### HU-100 | Configurar el almacenamiento de archivos

**Como** equipo, **quiero** guardar fotos y evidencias en un servicio externo gratuito, **para** no perderlas al reiniciar el servidor.

**Criterios de aceptación:**

- El servicio no requiere pago.
- Se validan tipo y tamaño antes de guardar.
- Los archivos sobreviven a un reinicio del backend.
- Los archivos de una empresa no son accesibles para otra.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-091, HU-093 · **Reglas:** RN-05, D14

### HU-101 | Crear el frontend web por funcionalidades

**Como** equipo, **quiero** organizar el proyecto React por funcionalidades, **para** evitar componentes gigantes.

**Criterios de aceptación:**

- Usa React, TypeScript y Vite.
- Hay carpetas `features/` por módulo.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-012 · **Reglas:** ninguna

### HU-102 | Proteger las rutas

**Como** equipo, **quiero** guardias con `react-router-dom`, **para** bloquear el acceso sin JWT válido.

**Criterios de aceptación:**

- Sin sesión, una ruta protegida redirige al inicio de sesión.
- Un rol sin permiso no ve esa pantalla.
- Un token vencido cierra la sesión.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-101, HU-094 · **Reglas:** ninguna

### HU-103 | Validar con Zod y React Hook Form

**Como** equipo, **quiero** validar en vivo los campos de la interfaz, **para** dar respuesta inmediata.

**Criterios de aceptación:**

- Usan Zod y React Hook Form con `mode: 'onChange'`.
- Las reglas coinciden con FluentValidation.
- No hay validaciones manuales con `if/else`.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-101, HU-096 · **Reglas:** ninguna

### HU-104 | Centralizar las peticiones HTTP

**Como** equipo, **quiero** interceptores de Axios y un extractor universal de errores, **para** manejar token y fallos en un solo lugar.

**Criterios de aceptación:**

- Cada petición adjunta el JWT como `Bearer`.
- El extractor convierte cualquier error en un mensaje claro.
- Mientras el servidor se reactiva, se muestra un estado de carga.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-101 · **Reglas:** ninguna

### HU-105 | Crear la base de la app para teléfono

**Como** equipo, **quiero** crear la aplicación para teléfono, **para** hacer el trabajo de campo.

**Criterios de aceptación:**

- La tecnología está decidida y aceptada por el equipo y el catedrático.
- Funciona en Android y en iPhone, o se documenta la limitación.
- Inicia sesión y consume la misma API que la web.
- Puede usar la cámara del teléfono.

**Módulo:** Técnico · **Entrega:** E2 · **Dónde:** Teléfono · **Prioridad:** Must · **Depende de:** HU-094, HU-012 · **Reglas:** ninguna

### HU-106 | Crear el Dockerfile de la API

**Como** equipo, **quiero** un Dockerfile multi-stage, **para** compilar con el SDK y ejecutar en un runtime ligero de Alpine.

**Criterios de aceptación:**

- Usa una etapa de compilación y una de ejecución.
- La imagen final usa runtime Alpine.
- La generación de PDF funciona dentro de esa imagen.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-091 · **Reglas:** ninguna

### HU-107 | Levantar todo con Docker Compose

**Como** equipo, **quiero** un `docker-compose.yml`, **para** levantar el sistema local con un solo comando.

**Criterios de aceptación:**

- Levanta la API, PostgreSQL y el frontend web.
- La API se conecta a la base y aplica migraciones.
- Funciona en una máquina limpia con las instrucciones del repositorio.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-106 · **Reglas:** ninguna

### HU-108 | Desplegar la base de datos

**Como** equipo, **quiero** PostgreSQL en Neon o Supabase, **para** tener una base gratuita en la nube.

**Criterios de aceptación:**

- La base tiene migraciones y catálogos cargados.
- Las credenciales no están en el repositorio.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-092, HU-097 · **Reglas:** ninguna

### HU-109 | Desplegar el backend

**Como** equipo, **quiero** publicar la API en Render o Fly.io, **para** exponerla con HTTPS.

**Criterios de aceptación:**

- El servicio compila desde el Dockerfile y está conectado a GitHub.
- La API responde por HTTPS y usa la base en la nube.
- Solo acepta peticiones de los clientes autorizados.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-106, HU-108 · **Reglas:** ninguna

### HU-110 | Desplegar el frontend web

**Como** equipo, **quiero** publicar el cliente en Vercel o Netlify, **para** tener el sistema completo en la nube.

**Criterios de aceptación:**

- Usa la API de producción por HTTPS.
- Las rutas funcionan al recargar la página.
- El flujo principal funciona de punta a punta en producción.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** Web · **Prioridad:** Must · **Depende de:** HU-101, HU-109 · **Reglas:** ninguna

### HU-111 | Automatizar el despliegue

**Como** equipo, **quiero** que cada `git push` a `main` actualice producción, **para** cumplir la integración continua del curso.

**Criterios de aceptación:**

- Un push a `main` actualiza backend y frontend sin pasos manuales.
- El equipo lo demuestra con un cambio real.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-109, HU-110 · **Reglas:** ninguna

### HU-112 | Distribuir la app para pruebas

**Como** equipo, **quiero** instalar la app en teléfonos reales, **para** probarla y demostrarla.

**Criterios de aceptación:**

- Se puede instalar sin costo en los teléfonos del equipo.
- La app usa la API de producción.

**Módulo:** Técnico · **Entrega:** E2 · **Dónde:** Teléfono · **Prioridad:** Must · **Depende de:** HU-105, HU-109 · **Reglas:** ninguna

### HU-113 | Integrar con Google Forms y Google Calendar

**Como** equipo, **quiero** conectar Norvia con las APIs de Google, **para** generar encuestas, leer respuestas y gestionar eventos.

**Criterios de aceptación:**

- La empresa autoriza el acceso con su cuenta de Google.
- Las credenciales se guardan cifradas y nunca llegan al cliente.
- Se pueden crear formularios, agregar preguntas, publicarlos y leer sus respuestas.
- Se pueden crear, actualizar y eliminar eventos con invitados.
- Los errores y límites de uso de Google se manejan sin perder datos.

**Módulo:** Técnico · **Entrega:** E1 · **Dónde:** No aplica · **Prioridad:** Must · **Depende de:** HU-091, HU-093 · **Reglas:** RN-05, RN-53, D16

---

## Resumen

Total: 113 historias: 90 Must y 23 Should. Por entrega: Diseño 16, E1 44, E2 25 y E3 28.

| ID | Historia | Módulo | Entrega | Dónde | Prioridad |
|---|---|---|---|---|---|
| HU-001 | Aprobar el alcance | Diseño | Diseño | No aplica | Must |
| HU-002 | Documentar los requerimientos funcionales | Diseño | Diseño | No aplica | Must |
| HU-003 | Documentar los requerimientos no funcionales | Diseño | Diseño | No aplica | Must |
| HU-004 | Validar las reglas de negocio | Diseño | Diseño | No aplica | Must |
| HU-005 | Priorizar el backlog | Diseño | Diseño | No aplica | Must |
| HU-006 | Elaborar casos de uso | Diseño | Diseño | No aplica | Should |
| HU-007 | Documentar los flujos principales | Diseño | Diseño | No aplica | Must |
| HU-008 | Elaborar el diccionario de datos | Diseño | Diseño | No aplica | Must |
| HU-009 | Definir el aislamiento multiempresa | Diseño | Diseño | No aplica | Must |
| HU-010 | Diseñar el diagrama entidad-relación | Diseño | Diseño | No aplica | Must |
| HU-011 | Definir restricciones e índices | Diseño | Diseño | No aplica | Must |
| HU-012 | Definir los contratos de la API | Diseño | Diseño | No aplica | Must |
| HU-013 | Diseñar la arquitectura del backend | Diseño | Diseño | No aplica | Must |
| HU-014 | Diseñar autenticación y autorización | Diseño | Diseño | No aplica | Must |
| HU-015 | Redactar el pitch de 1 página | Diseño | Diseño | No aplica | Must |
| HU-016 | Configurar el tablero Kanban | Diseño | Diseño | No aplica | Must |
| HU-017 | Registrar mi empresa | M1 | E1 | Web | Must |
| HU-018 | Iniciar y cerrar sesión | M1 | E1 | Web y teléfono | Must |
| HU-019 | Acceder a otra empresa | M1 | E1 | Web y teléfono | Must |
| HU-020 | Agregar vínculos | M1 | E1 | Web | Must |
| HU-021 | Gestionar roles y vínculos | M1 | E1 | Web | Must |
| HU-022 | Cambiar mi contraseña | M1 | E1 | Web y teléfono | Should |
| HU-023 | Administrar los catálogos | M1 | E3 | Web | Should |
| HU-024 | Consultar las empresas registradas | M1 | E3 | Web | Should |
| HU-025 | Conectar la cuenta de Google | M1 | E1 | Web | Must |
| HU-026 | Completar el perfil | M2 | E1 | Web | Must |
| HU-027 | Registrar áreas | M2 | E1 | Web | Must |
| HU-028 | Calcular la composición de la comisión | M2 | E2 | Web | Must |
| HU-029 | Elegir categorías de riesgo | M3 | E1 | Web | Must |
| HU-030 | Generar la encuesta en Google Forms | M3 | E1 | Web | Must |
| HU-031 | Importar las respuestas | M3 | E1 | Web | Must |
| HU-032 | Ver el resumen de respuestas | M3 | E1 | Web | Must |
| HU-033 | Obtener peligros sugeridos | M3 | E1 | Web | Must |
| HU-034 | Consultar encuestas anteriores | M3 | E3 | Web | Should |
| HU-035 | Confirmar los peligros sugeridos | M4 | E1 | Web | Must |
| HU-036 | Agregar riesgos | M4 | E1 | Web | Must |
| HU-037 | Evaluar un riesgo | M4 | E1 | Web | Must |
| HU-038 | Ver la matriz de riesgos | M4 | E1 | Web | Must |
| HU-039 | Definir controles | M4 | E1 | Web | Must |
| HU-040 | Evaluar el riesgo residual | M4 | E1 | Web | Should |
| HU-041 | Consultar el historial de un riesgo | M4 | E3 | Web | Should |
| HU-042 | Generar el plan | M5 | E1 | Web | Must |
| HU-043 | Asignar tareas | M5 | E1 | Web | Must |
| HU-044 | Atender mis tareas | M5 | E1 | Web y teléfono | Must |
| HU-045 | Adjuntar evidencia | M5 | E1 | Web y teléfono | Must |
| HU-046 | Filtrar el plan | M5 | E3 | Web | Should |
| HU-047 | Reportar un evento | M6 | E2 | Web y teléfono | Must |
| HU-048 | Registrar a las personas afectadas | M6 | E2 | Web | Must |
| HU-049 | Investigar un evento | M6 | E2 | Web | Must |
| HU-050 | Definir medidas correctivas | M6 | E2 | Web | Must |
| HU-051 | Actualizar la matriz tras un evento | M6 | E2 | Web | Should |
| HU-052 | Consultar estadísticas | M6 | E2 | Web | Should |
| HU-053 | Constituir la comisión | M7 | E2 | Web | Must |
| HU-054 | Registrar los integrantes | M7 | E2 | Web | Must |
| HU-055 | Programar reuniones | M7 | E2 | Web | Must |
| HU-056 | Registrar asistencia y quórum | M7 | E2 | Web | Must |
| HU-057 | Redactar el acta | M7 | E2 | Web | Must |
| HU-058 | Aprobar y firmar el acta | M7 | E2 | Web y teléfono | Must |
| HU-059 | Convertir acuerdos en tareas | M7 | E2 | Web | Should |
| HU-060 | Consultar el historial de actas | M7 | E2 | Web | Must |
| HU-061 | Renovar la comisión | M7 | E3 | Web | Should |
| HU-062 | Registrar equipos | M8 | E2 | Web | Must |
| HU-063 | Registrar un mantenimiento o reparación | M8 | E2 | Web y teléfono | Must |
| HU-064 | Consultar el historial de un equipo | M8 | E2 | Web | Must |
| HU-065 | Ver los mantenimientos vencidos | M8 | E2 | Web | Should |
| HU-066 | Crear una tarea de reparación | M8 | E2 | Web y teléfono | Should |
| HU-067 | Registrar artículos e ingresos de EPP | M8 | E2 | Web | Must |
| HU-068 | Registrar entregas de EPP | M8 | E2 | Web | Must |
| HU-069 | Consultar inventario y entregas de EPP | M8 | E2 | Web | Must |
| HU-070 | Generar un documento | M9 | E3 | Web | Must |
| HU-071 | Editar el borrador | M9 | E3 | Web | Must |
| HU-072 | Aprobar un documento | M9 | E3 | Web | Must |
| HU-073 | Crear una versión nueva | M9 | E3 | Web | Should |
| HU-074 | Consultar los documentos vigentes | M9 | E3 | Web y teléfono | Should |
| HU-075 | Generar la matriz de riesgos en PDF | M10 | E3 | Web | Must |
| HU-076 | Generar las políticas en PDF | M10 | E3 | Web | Must |
| HU-077 | Generar el informe semestral | M10 | E3 | Web | Must |
| HU-078 | Generar el informe anual | M10 | E3 | Web | Must |
| HU-079 | Descargar un acta en PDF | M10 | E3 | Web | Must |
| HU-080 | Consultar los informes generados | M10 | E3 | Web | Should |
| HU-081 | Llevar las tareas al calendario | M11 | E3 | Web y teléfono | Must |
| HU-082 | Llevar las reuniones al calendario | M11 | E3 | Web y teléfono | Must |
| HU-083 | Llevar los mantenimientos al calendario | M11 | E3 | Web y teléfono | Should |
| HU-084 | Llevar informes y vencimientos al calendario | M11 | E3 | Web y teléfono | Should |
| HU-085 | Convocar tras un accidente grave | M11 | E3 | Web y teléfono | Must |
| HU-086 | Mantener el calendario actualizado | M11 | E3 | Web y teléfono | Must |
| HU-087 | Ver el avance general | M12 | E3 | Web | Must |
| HU-088 | Ver el estado de equipos y EPP | M12 | E3 | Web | Should |
| HU-089 | Ver las obligaciones del mes | M12 | E3 | Web | Should |
| HU-090 | Ver la documentación lista | M12 | E3 | Web | Should |
| HU-091 | Crear la solución con Clean Architecture | Técnico | E1 | No aplica | Must |
| HU-092 | Configurar EF Core Code-First | Técnico | E1 | No aplica | Must |
| HU-093 | Aplicar filtros globales por empresa | Técnico | E1 | No aplica | Must |
| HU-094 | Implementar autenticación JWT | Técnico | E1 | No aplica | Must |
| HU-095 | Implementar autorización por roles | Técnico | E1 | No aplica | Must |
| HU-096 | Validar con FluentValidation | Técnico | E1 | No aplica | Must |
| HU-097 | Cargar los catálogos iniciales | Técnico | E1 | No aplica | Must |
| HU-098 | Probar el aislamiento entre empresas | Técnico | E1 | No aplica | Must |
| HU-099 | Registrar la auditoría de acciones | Técnico | E3 | No aplica | Should |
| HU-100 | Configurar el almacenamiento de archivos | Técnico | E1 | No aplica | Must |
| HU-101 | Crear el frontend web por funcionalidades | Técnico | E1 | Web | Must |
| HU-102 | Proteger las rutas | Técnico | E1 | Web | Must |
| HU-103 | Validar con Zod y React Hook Form | Técnico | E1 | Web | Must |
| HU-104 | Centralizar las peticiones HTTP | Técnico | E1 | Web | Must |
| HU-105 | Crear la base de la app para teléfono | Técnico | E2 | Teléfono | Must |
| HU-106 | Crear el Dockerfile de la API | Técnico | E1 | No aplica | Must |
| HU-107 | Levantar todo con Docker Compose | Técnico | E1 | No aplica | Must |
| HU-108 | Desplegar la base de datos | Técnico | E1 | No aplica | Must |
| HU-109 | Desplegar el backend | Técnico | E1 | No aplica | Must |
| HU-110 | Desplegar el frontend web | Técnico | E1 | Web | Must |
| HU-111 | Automatizar el despliegue | Técnico | E1 | No aplica | Must |
| HU-112 | Distribuir la app para pruebas | Técnico | E2 | Teléfono | Must |
| HU-113 | Integrar con Google Forms y Google Calendar | Técnico | E1 | No aplica | Must |

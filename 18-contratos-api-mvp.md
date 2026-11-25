# Contratos API — catálogo completo (request / response)

**Para qué sirve:** para **cada endpoint HTTP** del producto Norvia (Must, Should y Could con API): qué **enviar**, qué **responde** el servidor y códigos de error. Incluye lo ya implementado en backend y lo acordado según [12-modelo-datos.md](12-modelo-datos.md) y [10-historias-usuario.md](10-historias-usuario.md).

**Índice de cuerpos JSON:** [Anexo — JSON por endpoint](#anexo--json-por-endpoint) · [Índice maestro de rutas](#indice-maestro-de-rutas) · [Fuera de alcance (sin API)](#fuera-de-alcance-sin-api).

Alcance funcional del MVP (orden de construcción):

1. Registrar empresa y perfil  
2. Catálogos (staff)  
3. Encuestas y encuestados  
4. Reporte anónimo y peligros sugeridos  
5. Matriz de riesgos  
6. Auth, permisos y aislamiento (ya en curso)

**Convenciones:** sufijo `*RequestDto` / `*ResponseDto`; Problem Details en errores; Bearer en rutas protegidas. Detalle de slices: [16-arquitectura-backend-frontend.md](16-arquitectura-backend-frontend.md). Registrar permisos: [17-guia-permisos-seeder-y-pruebas.md](17-guia-permisos-seeder-y-pruebas.md).

**Cuerpos concretos (qué enviar / qué responde):** [Anexo — JSON por endpoint](#anexo--json-por-endpoint).

**Leyenda estado:** ✅ implementado · 🚧 pendiente · ➖ sin endpoint backend (solo front/infra)

**Roles empresa:** `admin_empresa`, `responsable_sst`, `colaborador`, `encuestado`. **Staff:** `admin_plataforma`, `soporte_plataforma` (según catálogo en seed).

### Convenciones HTTP (todos los endpoints)

| Aspecto | Valor |
|---|---|
| Formato | `application/json` |
| Nombres de propiedad | **camelCase** en JSON (serialización por defecto de ASP.NET) |
| Identificadores | `uuid` en string (`"550e8400-e29b-41d4-a716-446655440000"`) |
| Valores de enumeración | Texto en **snake_case**, igual que en la base: `"seleccion_unica"`, `"ergonomico"`, `"politica"`. Un valor desconocido o numérico responde **400** |
| Fechas | `date`: `"2026-11-15"` · `timestamptz`: ISO-8601 UTC `"2026-11-16T02:30:00Z"` |
| Rutas protegidas | Header `Authorization: Bearer {accessToken}` |
| Éxito sin cuerpo | **204 No Content** |
| Error de negocio | **RFC 7807** `application/problem+json` + extensión `codigo` |
| Error de validación (FluentValidation) | **400** `ValidationProblemDetails` con `errors` por campo |

**Ejemplo error de negocio (401):**

```json
{
  "status": 401,
  "title": "Las credenciales no son válidas.",
  "instance": "/api/auth/login/plataforma",
  "codigo": "auth.credenciales_invalidas"
}
```

**Ejemplo validación (400):**

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "email": ["'Email' no es una dirección de correo electrónico válida."]
  }
}
```

Los nombres de propiedad en `errors` coinciden con el **nombre de la propiedad del DTO** (p. ej. `email`, `idEmpresa`).

---

## Auth y permisos (Must)

| HU | Método | Ruta | Request | Response | Permiso (codigo) | Roles | Estado |
|---|---|---|---|---|---|---|---|
| HU-018 | POST | `api/auth/login/plataforma` | `LoginPlataformaRequestDto` | `SesionResponseDto` | — `[AllowAnonymous]` | — | ✅ |
| HU-018 | POST | `api/auth/login/empresa` | `LoginEmpresaRequestDto` | `SesionResponseDto` | — | — | ✅ |
| HU-018 | POST | `api/auth/refresh` | `RefrescarSesionRequestDto` | `SesionResponseDto` | — | — | ✅ |
| HU-018 | POST | `api/auth/logout` | `CerrarSesionRequestDto` | 204 | — | — | ✅ |
| HU-095 | GET | `api/prueba/plataforma` | — | texto | `prueba.plataforma` | `admin_plataforma` | ✅ |
| HU-095 | GET | `api/prueba/empresa` | — | texto | `prueba.empresa` | `admin_empresa` | ✅ |
| HU-095 | — | (cualquier nueva ruta) | — | — | ver §3 doc 17 | según HU | 🚧 |
| HU-102 | — | — | — | — | — | — | ➖ Front (react-router) |
| HU-098 | — | pruebas de integración (`backend/Norvia.Tests`, `dotnet test`) | — | — | — | — | ✅ |

`SesionResponseDto`: `{ accessToken, refreshToken, expiresIn, debeCambiarPassword }`.

---

## M1 — Empresa y acceso (Must)

### HU-017 | Registrar empresa (+ primer admin)

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| POST | `api/empresas` | `RegistrarEmpresaRequestDto` | `RegistrarEmpresaResponseDto` | — `[AllowAnonymous]` o flujo registro | — | 🚧 |

**RegistrarEmpresaRequestDto (propuesta):** `razonSocial`, `rtn`, `email`, `password`, datos mínimos legales.  
**RegistrarEmpresaResponseDto:** `idEmpresaCifrado` (para login empresa), datos públicos de empresa.

Transacción: `Empresa` + `Persona` + `Acceso` + `VinculoEmpresa` con `admin_empresa` (D2).

### HU-020 | Alta de vínculos — ✅

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| POST | `api/vinculos` | `CrearVinculoRequestDto` | 201 `CrearVinculoResponseDto` | `vinculo.crear` | `admin_empresa` | ✅ |

**CrearVinculoRequestDto:** `email`, `primerNombre`, `segundoNombre?`, `primerApellido`, `segundoApellido?`, `rolCodigo`, `passwordTemporal?`. Detalle en el [anexo](#anexo-vinculos).

### HU-021 | Gestionar acceso (rol / estado) — ✅

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| GET | `api/vinculos?estado=&rolCodigo=` | — | `VinculoResponseDto[]` | `vinculo.listar` | `admin_empresa` | ✅ |
| GET | `api/vinculos/{id}` | — | `VinculoResponseDto` | `vinculo.leer` | `admin_empresa` | ✅ |
| PATCH | `api/vinculos/{id}` | `ActualizarVinculoRequestDto` | `VinculoResponseDto` | `vinculo.actualizar` | `admin_empresa` | ✅ |

**ActualizarVinculoRequestDto:** `rolCodigo?`, `estado?`, `motivoCodigo?` (obligatorio al suspender o dar de baja), `motivoDetalle?`. Detalle en el [anexo](#anexo-vinculos).

### HU-115 | Cuentas encuestados (Must) — ✅

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| POST | `api/vinculos/encuestados` | `CrearEncuestadoRequestDto` | 201 `CrearEncuestadoResponseDto` | `vinculo.encuestado.crear` | `admin_empresa` | ✅ |
| POST | `api/vinculos/encuestados/lote` | `CrearEncuestadosLoteRequestDto` | 200 `CrearEncuestadosLoteResponseDto` | `vinculo.encuestado.lote` | `admin_empresa` | ✅ |

El rol `encuestado` lo fija el servidor. Las cuentas nuevas reciben una contraseña temporal **generada por Norvia**, salvo que en el alta individual se envíe una, y se devuelve una sola vez. Detalle en el [anexo](#anexo-vinculos).

---

## M1 — Catálogos plataforma (HU-023, Should) — ✅

Rutas **sin prefijo** (`api/rubros`, `api/peligros`…). Son de alcance **plataforma** porque así está cada fila en `CatalogoPermisos`, no por la URL: una sesión de empresa recibe 403. `soporte_plataforma` solo consulta; `admin_plataforma` crea, edita y activa o desactiva.

- **Editar:** `PATCH {id}` parcial; lo que no se envía se conserva.
- **Activar o desactivar:** `PATCH {id}/estado` con `{ "activo": false }`. No hay borrado físico.
- **Plantillas:** `api/plantillas` son las plantillas de **documento** (políticas y procedimientos). Las plantillas de **tarea** de cada peligro van en `api/plantillas-tarea` (agregadas el 24-11-2026: sugieren los controles de HU-039 y las tareas modelo de HU-042).

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| GET | `api/rubros` | — | `RubroResponseDto[]` | `catalogo.rubro.listar` | `admin_plataforma`, `soporte_plataforma` | ✅ |
| POST | `api/rubros` | `CrearRubroRequestDto` | 201 `RubroResponseDto` | `catalogo.rubro.crear` | `admin_plataforma` | ✅ |
| PATCH | `api/rubros/{id}` | `ActualizarRubroRequestDto` | `RubroResponseDto` | `catalogo.rubro.actualizar` | `admin_plataforma` | ✅ |
| PATCH | `api/rubros/{id}/estado` | `CambiarEstadoRubroRequestDto` | `RubroResponseDto` | `catalogo.rubro.estado` | `admin_plataforma` | ✅ |
| GET | `api/categorias-riesgo?rubroId=` | — | `CategoriaRiesgoResponseDto[]` | `catalogo.categoria.listar` | `admin_plataforma`, `soporte_plataforma` | ✅ |
| POST | `api/categorias-riesgo` | `CrearCategoriaRiesgoRequestDto` | 201 `CategoriaRiesgoResponseDto` | `catalogo.categoria.crear` | `admin_plataforma` | ✅ |
| PATCH | `api/categorias-riesgo/{id}` | `ActualizarCategoriaRiesgoRequestDto` | `CategoriaRiesgoResponseDto` | `catalogo.categoria.actualizar` | `admin_plataforma` | ✅ |
| PATCH | `api/categorias-riesgo/{id}/estado` | `CambiarEstadoCategoriaRiesgoRequestDto` | `CategoriaRiesgoResponseDto` | `catalogo.categoria.estado` | `admin_plataforma` | ✅ |
| GET | `api/peligros` | — | `PeligroResponseDto[]` | `catalogo.peligro.listar` | `admin_plataforma`, `soporte_plataforma` | ✅ |
| POST | `api/peligros` | `CrearPeligroRequestDto` | 201 `PeligroResponseDto` | `catalogo.peligro.crear` | `admin_plataforma` | ✅ |
| PATCH | `api/peligros/{id}` | `ActualizarPeligroRequestDto` | `PeligroResponseDto` | `catalogo.peligro.actualizar` | `admin_plataforma` | ✅ |
| PATCH | `api/peligros/{id}/estado` | `CambiarEstadoPeligroRequestDto` | `PeligroResponseDto` | `catalogo.peligro.estado` | `admin_plataforma` | ✅ |
| GET | `api/preguntas?categoriaRiesgoId=` | — | `PreguntaResponseDto[]` | `catalogo.pregunta.listar` | `admin_plataforma`, `soporte_plataforma` | ✅ |
| POST | `api/preguntas` | `CrearPreguntaRequestDto` | 201 `PreguntaResponseDto` | `catalogo.pregunta.crear` | `admin_plataforma` | ✅ |
| PATCH | `api/preguntas/{id}` | `ActualizarPreguntaRequestDto` | `PreguntaResponseDto` | `catalogo.pregunta.actualizar` | `admin_plataforma` | ✅ |
| PATCH | `api/preguntas/{id}/estado` | `CambiarEstadoPreguntaRequestDto` | `PreguntaResponseDto` | `catalogo.pregunta.estado` | `admin_plataforma` | ✅ |
| GET | `api/plantillas` | — | `PlantillaDocumentoResponseDto[]` | `catalogo.plantilla.listar` | `admin_plataforma`, `soporte_plataforma` | ✅ |
| POST | `api/plantillas` | `CrearPlantillaDocumentoRequestDto` | 201 `PlantillaDocumentoResponseDto` | `catalogo.plantilla.crear` | `admin_plataforma` | ✅ |
| PATCH | `api/plantillas/{id}` | `ActualizarPlantillaDocumentoRequestDto` | `PlantillaDocumentoResponseDto` | `catalogo.plantilla.actualizar` | `admin_plataforma` | ✅ |
| PATCH | `api/plantillas/{id}/estado` | `CambiarEstadoPlantillaDocumentoRequestDto` | `PlantillaDocumentoResponseDto` | `catalogo.plantilla.estado` | `admin_plataforma` | ✅ |
| GET | `api/plantillas-tarea?peligroId=` | — | `PlantillaTareaResponseDto[]` | `catalogo.plantilla_tarea.listar` | `admin_plataforma`, `soporte_plataforma` | ✅ |
| POST | `api/plantillas-tarea` | `CrearPlantillaTareaRequestDto` | 201 `PlantillaTareaResponseDto` | `catalogo.plantilla_tarea.crear` | `admin_plataforma` | ✅ |
| PATCH | `api/plantillas-tarea/{id}` | `ActualizarPlantillaTareaRequestDto` | `PlantillaTareaResponseDto` | `catalogo.plantilla_tarea.actualizar` | `admin_plataforma` | ✅ |
| PATCH | `api/plantillas-tarea/{id}/estado` | `CambiarEstadoPlantillaTareaRequestDto` | `PlantillaTareaResponseDto` | `catalogo.plantilla_tarea.estado` | `admin_plataforma` | ✅ |

Los filtros (`?rubroId=`, `?categoriaRiesgoId=`, `?peligroId=`) son opcionales. Las listas incluyen los elementos desactivados, porque son pantallas de mantenimiento. Los catálogos iniciales vienen de HU-097 (`CatalogoBase` y `CatalogoSst`). Cuerpos JSON en el [anexo](#anexo-catalogos).

### HU-024 | Listar empresas (Should)

| Método | Ruta | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|
| GET | `api/plataforma/empresas` | `EmpresaResumenResponseDto[]` | `empresa.listar` | `admin_plataforma` | 🚧 |

---

## M2 — Perfil empresa (Must HU-026)

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| GET | `api/empresas/perfil` | — | `PerfilEmpresaResponseDto` | `empresa.perfil.leer` | `admin_empresa`, `responsable_sst` | 🚧 |
| PUT | `api/empresas/perfil` | `ActualizarPerfilEmpresaRequestDto` | `PerfilEmpresaResponseDto` | `empresa.perfil.actualizar` | `admin_empresa` | 🚧 |

**ActualizarPerfilEmpresaRequestDto:** `razonSocial`, `rtn`, `direccion`, `actividadEconomica`, `trabajadoresPermanentes`, `rubroId`.

---

## M3 — Encuestas (Must HU-029, 030, 031, 032)

### HU-029 | Categorías por rubro — ✅

| Método | Ruta | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|
| GET | `api/encuestas/categorias-disponibles` | `CategoriaDisponibleResponseDto[]` | `encuesta.categoria.listar` | `responsable_sst` | ✅ |

Se filtra por el `RubroId` de la empresa del JWT (RN-09, RN-11). Incluye la vista previa de las preguntas de cada categoría. Detalle en el [anexo](#anexo-hu-029).

### HU-030 | Crear, editar, publicar encuesta (versiones)

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| POST | `api/encuestas` | `CrearEncuestaRequestDto` | `EncuestaResponseDto` | `encuesta.crear` | `responsable_sst` | 🚧 |
| GET | `api/encuestas/{id}` | — | `EncuestaDetalleResponseDto` | `encuesta.leer` | `responsable_sst` | 🚧 |
| PUT | `api/encuestas/{id}/borrador` | `ActualizarEncuestaBorradorRequestDto` | `EncuestaVersionResponseDto` | `encuesta.editar` | `responsable_sst` | 🚧 |
| POST | `api/encuestas/{id}/versiones/{versionId}/publicacion` | — | `EncuestaVersionResponseDto` | `encuesta.publicar` | `responsable_sst` | 🚧 |
| POST | `api/encuestas/{id}/cierre` | — | 204 | `encuesta.cerrar` | `responsable_sst` | 🚧 |

Ya hay **ejemplo** en catálogo para encuestado:

- `encuesta.responder` → `POST api/encuestas/{id}/respuestas` → `encuestado`

### HU-031 | Responder (anónimo)

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| GET | `api/encuestas/pendientes` | — | `EncuestaPendienteResponseDto[]` | `encuesta.pendientes` | `encuestado` | 🚧 |
| POST | `api/encuestas/{id}/respuestas` | `ResponderEncuestaRequestDto` | 204 o `ConfirmacionResponseDto` | `encuesta.responder` | `encuestado` | 🚧 catálogo ✅ |

**ResponderEncuestaRequestDto:** `versionId`, lista `{ preguntaId, valor }` según tipo (texto / opción / múltiple).

### HU-032 | Reporte anónimo (Must)

| Método | Ruta | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|
| GET | `api/encuestas/{id}/reporte` | `ReporteEncuestaResponseDto` | `encuesta.reporte` | `responsable_sst` | 🚧 |

Regla RN-73: mínimo 3 respuestas para mostrar agregados sensibles.

### HU-033 | Peligros sugeridos — ✅

| Método | Ruta | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|
| GET | `api/encuestas/{id}/peligros-sugeridos` | `PeligrosSugeridosResponseDto` | `encuesta.peligros_sugeridos` | `admin_empresa`, `responsable_sst` | ✅ |

Calcula las sugerencias a partir de las respuestas de todas las versiones y registra cada peligro nuevo una sola vez como `RiesgoEmpresa` `sugerido`, que luego se revisa en HU-035. Detalle en el [anexo](#anexo-hu-033).

---

## M4 — Matriz de riesgos (Should en tablero, Must en doc E1)

| HU | Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|---|
| HU-036 | GET | `api/riesgos` | — | `RiesgoResponseDto[]` | `riesgo.listar` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-036 | GET | `api/riesgos/{id}` | — | `RiesgoResponseDto` | `riesgo.leer` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-036 | GET | `api/riesgos/peligros-disponibles` | — | `PeligroDisponibleResponseDto[]` | `riesgo.peligros` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-036 | POST | `api/riesgos` | `CrearRiesgoRequestDto` | 201 `RiesgoResponseDto` | `riesgo.crear` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-037 | POST | `api/riesgos/{id}/evaluaciones` | `EvaluarRiesgoRequestDto` | 201 `EvaluacionResponseDto` | `riesgo.evaluar` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-038 | GET | `api/riesgos/matriz` | — | `MatrizRiesgosResponseDto` | `riesgo.matriz` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-038 | GET | `api/riesgos?…` (filtros) | `FiltrosRiesgosDto` (consulta) | `RiesgoResponseDto[]` | `riesgo.listar` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-041 | GET | `api/riesgos/{id}/evaluaciones` | — | `EvaluacionResponseDto[]` | `riesgo.historial` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-040 | POST | `api/riesgos/{id}/evaluaciones-residual` | `EvaluarRiesgoResidualRequestDto` | 201 `EvaluacionResponseDto` | `riesgo.evaluar_residual` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-039 | GET | `api/riesgos/{id}/controles` | — | `ControlResponseDto[]` | `riesgo.control.listar` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-039 | GET | `api/riesgos/{id}/controles/sugeridos` | — | `ControlSugeridoResponseDto[]` | `riesgo.control.sugeridos` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-039 | POST | `api/riesgos/{id}/controles` | `CrearControlRequestDto` | 201 `ControlResponseDto` | `riesgo.control.crear` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-035 | PATCH | `api/encuestas/{id}/peligros-sugeridos/{riesgoId}` | `RevisarPeligroSugeridoRequestDto` | `PeligroSugeridoRevisadoResponseDto` | `encuesta.peligro_sugerido.revisar` | `admin_empresa`, `responsable_sst` | ✅ |

---

## M3/M6 — Otros Should relevantes (Sprint 3+)

| HU | Método | Ruta | Notas | Estado |
|---|---|---|---|---|
| HU-047 | POST | `api/eventos` | Reportar accidente, incidente, enfermedad o condición insegura (anónimo) | ✅ |
| HU-047 | GET | `api/eventos` | Listar eventos de la empresa (`admin_empresa`, `responsable_sst`) con filtros | ✅ |
| HU-047 | GET | `api/eventos/{id}` | Detalle completo de evento (`admin_empresa`, `responsable_sst`) | ✅ |
| HU-047 | POST | `api/eventos/{id}/evidencias` | Adjuntar evidencias (`Archivo`; pendiente `HU-100` almacenamiento externo) | 🚧 |
| HU-049 | PUT | `api/eventos/{id}/investigacion` | Registrar o corregir la investigación (`evento.investigar`: `responsable_sst`) | ✅ |
| HU-049 | POST | `api/eventos/{id}/cierre` | Cerrar con investigación y medidas, `RN-28` (`evento.cerrar`: `responsable_sst`) | ✅ |
| HU-049 | PATCH | `api/eventos/{id}/descarte` | Descartar un reporte inválido (`evento.descartar`: `responsable_sst`) | ✅ |
| HU-050 | POST | `api/eventos/{id}/medidas-correctivas` | Agregar una medida, que es una tarea del plan con origen `accidente` (`evento.medida.crear`: `responsable_sst`) | ✅ |
| HU-052 | GET | `api/eventos/estadisticas?desde&hasta` | Cuántos eventos hubo por tipo, gravedad y mes; sin descartados ni datos de personas (`evento.estadisticas`: `admin_empresa`, `responsable_sst`) | ✅ |
| HU-051 | GET | `api/eventos/{id}/riesgos` | Riesgos que el evento reveló o hizo reevaluar (`evento.riesgos`: `admin_empresa`, `responsable_sst`); los enlaces se crean con `accidenteId` en `POST api/riesgos` y `POST api/riesgos/{id}/evaluaciones` | ✅ |
| HU-050 | GET | `api/eventos/{id}/medidas-correctivas` | Medidas del evento con su avance (`evento.medida.listar`: `admin_empresa`, `responsable_sst`) | ✅ |
| HU-042 | GET | `api/plan-trabajo/propuesta` | Vista previa del plan (permiso `plan.propuesta`) | ✅ |
| HU-042 | POST | `api/plan-trabajo/generacion` | Confirmar el plan (permiso `plan.generar`) | ✅ |
| HU-042, HU-046 | GET | `api/plan-trabajo/tareas?…` | Tareas del plan con filtros (permiso `tarea.listar`) | ✅ |
| HU-043 | POST | `api/plan-trabajo/tareas` | Crear una tarea manual, ya asignada (permiso `tarea.crear`) | ✅ |
| HU-043 | PUT | `api/plan-trabajo/tareas/{id}/asignacion` | Asignar o reasignar responsable y fecha límite (permiso `tarea.asignar`) | ✅ |
| HU-043 | GET | `api/plan-trabajo/responsables` | A quién se le puede asignar una tarea (permiso `tarea.responsables`) | ✅ |
| HU-044 | GET | `api/plan-trabajo/tareas/mias` | Mis tareas (permiso `tarea.mias`; también `colaborador`) | ✅ |
| HU-044 | PATCH | `api/plan-trabajo/tareas/{id}/estado` | Cambiar el estado (permiso `tarea.estado`; también `colaborador`, con RN-24 en la aplicación) | ✅ |
| HU-045 | POST | `api/plan-trabajo/tareas/{id}/evidencias` | Adjuntar evidencia | 🚧 |
| HU-075 | GET | `api/riesgos/matriz/pdf` | Impresión matriz (M10) | 🚧 |

---

## Notificaciones (HU-117 ✅)

La bandeja propia, para los cuatro roles de empresa: las políticas avisan a cada vínculo activo (RN-75) y cada quien ve y marca solo las suyas (RN-79). Las políticas y los procedimientos vigentes están en [M9](#anexo-documentos) (HU-074); el permiso provisional `politica.vigentes` (`api/politicas/vigentes`) se retiró.

| Permiso | Método | Ruta | Roles |
|---|---|---|---|
| `notificacion.listar` | GET | `api/notificaciones` | `admin_empresa`, `responsable_sst`, `colaborador`, `encuestado` |
| `notificacion.no_leidas` | GET | `api/notificaciones/no-leidas` | los mismos |
| `notificacion.leer` | PATCH | `api/notificaciones/{id}/lectura` | los mismos |

---

## M9 — Documentos (HU-070 a HU-072 y HU-074 ✅; HU-073 🚧)

Políticas y procedimientos de la empresa (D13). El Responsable SST genera, edita y aprueba el borrador; el admin consulta. Las versiones vigentes las consultan todas las personas de la empresa (HU-074). Detalle en el [anexo](#anexo-documentos).

| HU | Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|---|
| HU-070 | GET | `api/documentos/plantillas` | — | `PlantillaDisponibleResponseDto[]` | `documento.plantillas` | `responsable_sst` | ✅ |
| HU-070 | POST | `api/documentos/generacion` | `GenerarDocumentoRequestDto` | 201 `DocumentoDetalleResponseDto` | `documento.generar` | `responsable_sst` | ✅ |
| HU-070 | GET | `api/documentos` | — | `DocumentoResumenResponseDto[]` | `documento.listar` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-070 | GET | `api/documentos/{id}` | — | `DocumentoDetalleResponseDto` | `documento.ver` | `admin_empresa`, `responsable_sst` | ✅ |
| HU-071 | PUT | `api/documentos/{id}/borrador` | `EditarBorradorRequestDto` | `DocumentoDetalleResponseDto` | `documento.editar` | `responsable_sst` | ✅ |
| HU-072 | POST | `api/documentos/{id}/aprobacion` | — | `DocumentoDetalleResponseDto` | `documento.aprobar` | `responsable_sst` | ✅ |
| HU-074 | GET | `api/documentos/vigentes` | `?buscar=` | `DocumentoVigenteResumenResponseDto[]` | `documento.vigentes` | `admin_empresa`, `responsable_sst`, `colaborador`, `encuestado` | ✅ |
| HU-074 | GET | `api/documentos/vigentes/{id}` | — | `DocumentoVigenteResponseDto` | `documento.vigente.ver` | los mismos | ✅ |

---

## Infra / técnico Must (sin contrato REST de negocio)

| HU | Entregable | Estado |
|---|---|---|
| HU-093 | `HasQueryFilter` + `ITenantActual` | 🚧 |
| HU-096 | FluentValidation + middleware ProblemDetails | ✅ |
| HU-106 | Dockerfile API | 🚧 |
| HU-101, 103, 104 | Front React | ➖ |
| HU-114 | Política de contraseñas (`PoliticaContrasena` en `Application/Common/Validacion`) y `POST /api/auth/contrasena/establecer` | ✅ |

---

## Plantilla al añadir un contrato nuevo

Copiar en la tabla del módulo correspondiente:

```text
| HU-0XX | VERBO | api/modulo/recurso | AlgoRequestDto | AlgoResponseDto | modulo.accion | rol1, rol2 | 🚧 |
```

Y en `CatalogoPermisos.cs`:

```csharp
Empresa("modulo.accion", "Nombre legible", "VERBO", "api/modulo/recurso", "rol1", "rol2");
```

Actualizar este archivo y la bitácora [14-cambios-realizados.md](14-cambios-realizados.md) cuando el endpoint pase a ✅.

---

## Anexo — JSON por endpoint {#anexo--json-por-endpoint}

Contratos que el **cliente debe enviar** y las **respuestas esperadas**. Los marcados 🚧 aún no están en el código; los ✅ coinciden con los DTOs actuales en `ProyectoFinal/backend`.

### Índice maestro de rutas {#indice-maestro-de-rutas}

Cada fila enlaza la sección del anexo con el cuerpo JSON. **Req** = cuerpo de entrada; **Res** = cuerpo de salida.

| HU | Método | Ruta | Req | Res | § |
|---|---|---|---|---|---|
| HU-018 | POST | `/api/auth/login/plataforma` | JSON | `SesionResponseDto` | Auth |
| HU-018 | POST | `/api/auth/login/empresa` | JSON | `SesionResponseDto` | Auth |
| HU-018 | POST | `/api/auth/refresh` | JSON | `SesionResponseDto` | Auth |
| HU-018 | POST | `/api/auth/logout` | JSON | 204 | Auth |
| HU-022 | POST | `/api/auth/contrasena/solicitud` | JSON | 202 | Contraseña |
| HU-022 | POST | `/api/auth/contrasena/confirmacion` | JSON | 204 | Contraseña |
| HU-114 | POST | `/api/auth/contrasena/establecer` | JSON | 204 | Contraseña |
| HU-019 | POST | `/api/auth/login/empresa` | otro `idEmpresa` | `SesionResponseDto` | Auth (nota HU-019) |
| HU-095 | GET | `/api/prueba/plataforma` | — | texto | Prueba |
| HU-095 | GET | `/api/prueba/empresa` | — | texto | Prueba |
| HU-095 | GET | `/api/prueba/sin-permiso` | — | 404 | Prueba |
| HU-017 | POST | `/api/empresas` | JSON | `RegistrarEmpresaResponseDto` | Empresas |
| HU-026 | GET | `/api/empresas/perfil` | — | `PerfilEmpresaResponseDto` | Perfil |
| HU-026 | PUT | `/api/empresas/perfil` | JSON | `PerfilEmpresaResponseDto` | Perfil |
| HU-020 | POST | `/api/vinculos` | JSON | `CrearVinculoResponseDto` (201) | Vínculos |
| HU-021 | GET | `/api/vinculos` | — | `VinculoResponseDto[]` | Vínculos |
| HU-021 | GET | `/api/vinculos/{id}` | — | `VinculoResponseDto` | Vínculos |
| HU-021 | PATCH | `/api/vinculos/{id}` | JSON | `VinculoResponseDto` | Vínculos |
| HU-115 | POST | `/api/vinculos/encuestados` | JSON | `CrearEncuestadoResponseDto` (201) | Vínculos |
| HU-115 | POST | `/api/vinculos/encuestados/lote` | JSON | `CrearEncuestadosLoteResponseDto` | Vínculos |
| HU-023 | GET/POST/PATCH | `/api/rubros`… | JSON | ver catálogos | Catálogos |
| HU-023 | GET/POST/PATCH | `/api/categorias-riesgo`… | JSON | ver catálogos | Catálogos |
| HU-023 | GET/POST/PATCH | `/api/peligros`… | JSON | ver catálogos | Catálogos |
| HU-023 | GET/POST/PATCH | `/api/preguntas`… | JSON | ver catálogos | Catálogos |
| HU-023 | GET/POST/PATCH | `/api/plantillas`… | JSON | ver catálogos | Catálogos |
| HU-024 | GET | `/api/plataforma/empresas` | — | array | Catálogos |
| HU-029 | GET | `/api/encuestas/categorias-disponibles` | — | `CategoriaDisponibleResponseDto[]` | Encuestas |
| HU-030 | GET | `/api/encuestas` | — | array | Encuestas |
| HU-030 | POST | `/api/encuestas` | JSON | `EncuestaResponseDto` | Encuestas |
| HU-030 | GET | `/api/encuestas/{id}` | — | `EncuestaDetalleResponseDto` | Encuestas |
| HU-030 | PUT | `/api/encuestas/{id}/borrador` | JSON | `EncuestaVersionResponseDto` | Encuestas |
| HU-030 | POST | `/api/encuestas/{id}/versiones/{versionId}/publicacion` | — | JSON | Encuestas |
| HU-030 | POST | `/api/encuestas/{id}/cierre` | — | 204 | Encuestas |
| HU-034 | GET | `/api/encuestas/historial` | — | array | Encuestas |
| HU-031 | GET | `/api/encuestas/pendientes` | — | array | Encuestado |
| HU-031 | POST | `/api/encuestas/{id}/respuestas` | JSON | 204/JSON | Encuestado |
| HU-032 | GET | `/api/encuestas/{id}/reporte` | — | JSON | Reporte |
| HU-033 | GET | `/api/encuestas/{id}/peligros-sugeridos` | — | `PeligrosSugeridosResponseDto` | Reporte |
| HU-035 | PATCH | `/api/encuestas/{id}/peligros-sugeridos/{riesgoId}` | JSON | `PeligroSugeridoRevisadoResponseDto` | Riesgos |
| HU-036 | GET | `/api/riesgos` | — | `RiesgoResponseDto[]` | Riesgos |
| HU-036 | GET | `/api/riesgos/peligros-disponibles` | — | `PeligroDisponibleResponseDto[]` | Riesgos |
| HU-036 | POST | `/api/riesgos` | JSON | `RiesgoResponseDto` | Riesgos |
| HU-036 | GET | `/api/riesgos/{id}` | — | `RiesgoResponseDto` | Riesgos |
| HU-037 | POST | `/api/riesgos/{id}/evaluaciones` | JSON | `EvaluacionResponseDto` | Riesgos |
| HU-040 | POST | `/api/riesgos/{id}/evaluaciones-residual` | JSON | `EvaluacionResponseDto` | Riesgos |
| HU-041 | GET | `/api/riesgos/{id}/evaluaciones` | — | `EvaluacionResponseDto[]` | Riesgos |
| HU-038 | GET | `/api/riesgos/matriz` | — | JSON | Riesgos |
| HU-075 | GET | `/api/riesgos/matriz/pdf` | — | PDF | Riesgos |
| HU-039 | POST | `/api/riesgos/{id}/controles` | JSON | `ControlResponseDto` | Riesgos |
| HU-039 | GET | `/api/riesgos/{id}/controles` | — | array | Riesgos |
| HU-039 | GET | `/api/riesgos/{id}/controles/sugeridos` | — | array | Riesgos |
| HU-042 | GET | `/api/plan-trabajo/propuesta` | — | JSON | Plan |
| HU-042 | POST | `/api/plan-trabajo/generacion` | JSON | JSON | Plan |
| HU-043 | POST | `/api/plan-trabajo/tareas` | JSON | `TareaResponseDto` | Plan |
| HU-043 | PUT | `/api/plan-trabajo/tareas/{id}/asignacion` | JSON | `TareaResponseDto` | Plan |
| HU-043 | GET | `/api/plan-trabajo/responsables` | — | array | Plan |
| HU-044 | GET | `/api/plan-trabajo/tareas/mias` | — | array | Plan |
| HU-044 | PATCH | `/api/plan-trabajo/tareas/{id}/estado` | JSON | `TareaResponseDto` | Plan |
| HU-045 | POST | `/api/plan-trabajo/tareas/{id}/evidencias` | multipart | JSON | Plan |
| HU-046 | GET | `/api/plan-trabajo/tareas` | filtros query | `TareaResponseDto[]` | Plan |
| HU-047 | POST | `/api/eventos` | JSON | JSON | Eventos |
| HU-047 | POST | `/api/eventos/{id}/evidencias` | multipart | JSON | Eventos *(pendiente HU-100)* |
| HU-047 | GET | `/api/eventos` | query opcional | array | Eventos |
| HU-047 | GET | `/api/eventos/{id}` | — | JSON | Eventos |
| HU-049 | PUT | `/api/eventos/{id}/investigacion` | JSON | JSON | Eventos |
| HU-049 | POST | `/api/eventos/{id}/cierre` | — | JSON | Eventos |
| HU-049 | PATCH | `/api/eventos/{id}/descarte` | JSON | JSON | Eventos |
| HU-050 | POST | `/api/eventos/{id}/medidas-correctivas` | JSON | JSON | Eventos |
| HU-050 | GET | `/api/eventos/{id}/medidas-correctivas` | — | array | Eventos |
| HU-051 | GET | `/api/eventos/{id}/riesgos` | — | array | Eventos |
| HU-052 | GET | `/api/eventos/estadisticas?desde&hasta` | query | JSON | Eventos |
| HU-117 | GET | `/api/notificaciones` | — | array | Notificaciones |
| HU-117 | PATCH | `/api/notificaciones/{id}/lectura` | — | 204 | Notificaciones |
| HU-070 | GET | `/api/documentos/plantillas` | — | array | Documentos |
| HU-070 | POST | `/api/documentos/generacion` | JSON | JSON | Documentos |
| HU-070 | GET | `/api/documentos` | — | array | Documentos |
| HU-070 | GET | `/api/documentos/{id}` | — | JSON | Documentos |
| HU-071 | PUT | `/api/documentos/{id}/borrador` | JSON | JSON | Documentos |
| HU-072 | POST | `/api/documentos/{id}/aprobacion` | — | JSON | Documentos |
| HU-074 | GET | `/api/documentos/vigentes?buscar=` | query | array | Documentos |
| HU-074 | GET | `/api/documentos/vigentes/{id}` | — | JSON | Documentos |
| HU-076 | GET | `/api/documentos/{id}/pdf` | — | PDF | Documentos |

---

### Auth (HU-018) — ✅ implementado

#### `POST /api/auth/login/plataforma`

**Request** — `LoginPlataformaRequestDto`

| Campo | Tipo | Reglas |
|---|---|---|
| `email` | string | Obligatorio, email, máx. 254 |
| `password` | string | Obligatorio, mín. 8 caracteres |

```json
{
  "email": "admin@norvia.hn",
  "password": "ContraseñaSegura1"
}
```

**Response 200** — `SesionResponseDto`

| Campo | Tipo | Descripción |
|---|---|---|
| `accessToken` | string | JWT (Bearer). Claims: `sub` (Acceso), `tipo_sesion`, `email` (correo de la cuenta, HU-022), rol y, en sesión de empresa, `vinculo_id` y `empresa_id` cifrado |
| `refreshToken` | string | Opaco; solo en body, no en header |
| `expiresIn` | int | Segundos de vida del access token |
| `debeCambiarPassword` | bool | `true` si la cuenta tiene una contraseña temporal (HU-020, HU-115). El front debe mostrar el cambio (`POST /api/auth/contrasena/establecer`) antes de continuar; la API **no** lo bloquea |

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "8f3c2a1b-....",
  "expiresIn": 900,
  "debeCambiarPassword": false
}
```

**Errores:** 400 validación · 401 `auth.credenciales_invalidas`

---

#### `POST /api/auth/login/empresa`

**Request** — `LoginEmpresaRequestDto`

| Campo | Tipo | Reglas |
|---|---|---|
| `email` | string | Igual que plataforma |
| `password` | string | Mín. 8 |
| `idEmpresa` | string | Token **cifrado** devuelto al registrar la empresa (no el `uuid` crudo) |

```json
{
  "email": "representante@miempresa.hn",
  "password": "ContraseñaSegura1",
  "idEmpresa": "CfDJ8..."
}
```

**Response 200:** mismo cuerpo que login plataforma (`SesionResponseDto`).

**Errores:** 401 credenciales / empresa suspendida / vínculo inactivo (mismo mensaje genérico cuando aplique HU-018).

---

#### `POST /api/auth/refresh`

**Request** — `RefrescarSesionRequestDto`

```json
{
  "refreshToken": "8f3c2a1b-...."
}
```

**Response 200:** nuevo `SesionResponseDto` (rotación de refresh).

**Errores:** 401 `auth.sesion_invalida`

---

#### `POST /api/auth/logout`

**Request** — `CerrarSesionRequestDto`

```json
{
  "refreshToken": "8f3c2a1b-...."
}
```

**Response 204:** sin cuerpo.

---

#### HU-019 | Otra empresa (sin endpoint aparte)

Mismo contrato que `POST /api/auth/login/empresa`, cambiando solo `idEmpresa` (otro tenant). No hay “cambiar empresa” en la misma sesión.

---

#### Contraseña (HU-022, HU-114) — ✅

##### `POST /api/auth/contrasena/solicitud` — `SolicitarCambioContrasenaRequestDto`

**Auth:** anónimo. Sirve para cambiar la contraseña con sesión (la web envía el correo de la sesión) y para "¿Olvidaste tu contraseña?" desde el login.

Envía al correo un enlace `{UrlBaseFrontend}/restablecer-contrasena?token=…` (plantilla `cambio_contrasena`). Solo se envía a cuentas verificadas: una sin verificar se activa con su contraseña temporal (RN-67).

**El enlace:**
- **Vigencia:** 30 minutos.
- **Un solo uso:** el token va firmado y no se guarda en la base. Lleva el Acceso, el vencimiento y un sello de la contraseña actual; cuando la contraseña cambia, el sello deja de coincidir.

**Request:**

```json
{
  "email": "operador@miempresa.hn"
}
```

**Response 202** (siempre genérico, sin revelar si el correo existe):

```json
{
  "mensaje": "Si el correo está registrado, recibirá un enlace para cambiar la contraseña."
}
```

##### `POST /api/auth/contrasena/confirmacion` — `ConfirmarCambioContrasenaRequestDto`

**Request:**

```json
{
  "token": "token-del-correo",
  "contrasenaNueva": "NuevaContraseñaSegura1"
}
```

**Auth:** anónimo.

**Response 204.**
- **Alcance:** la contraseña es del Acceso (RN-65), así que vale en todas sus empresas.
- **Sesiones:** se borran todos sus refresh, así que hay que volver a iniciar sesión.
- **Contraseña temporal:** `DebeCambiarPassword` queda en `false`.

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | `contrasenaNueva` no cumple la política de HU-114 (un mensaje por requisito que falla) |
| 400 `auth.contrasena_igual_actual` | La contraseña nueva es igual a la actual. El enlace sigue sirviendo |
| 410 `auth.enlace_invalido` | El enlace venció, ya se usó o fue alterado |

##### `POST /api/auth/contrasena/establecer` — `EstablecerContrasenaRequestDto` (HU-114) — ✅

Cambia la contraseña de la sesión actual. Sirve también para el primer ingreso con contraseña temporal (`DebeCambiarPassword` vuelve a `false`).

**Auth:** Bearer de sesión de **empresa**. Permiso `auth.contrasena.establecer` para los 4 roles de empresa. El staff de plataforma recibe 403, porque una ruta solo tiene un alcance.

**Request:**

```json
{
  "contrasenaActual": "Temporal#2026",
  "contrasenaNueva": "NuevaClave#2026"
}
```

**Response 204.** El Acceso es único por correo (RN-65), así que la nueva contraseña vale para todas sus empresas. Por eso se borran todos sus refresh: hay que volver a iniciar sesión.

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | `contrasenaNueva` no cumple la política (un mensaje por requisito que falla) o es igual a la actual |
| 400 `auth.contrasena_actual_incorrecta` | La contraseña actual no coincide |
| 401 | Sin sesión, o sesión inválida |

**Política de contraseñas (HU-114):** se valida al crear o cambiar una contraseña (registro de empresa, vínculos, encuestados, este endpoint); el login solo compara. El front repite las reglas en Zod.

| Requisito | Mensaje |
|---|---|
| 8 a 64 caracteres | La contraseña debe tener entre 8 y 64 caracteres. |
| Al menos una mayúscula | La contraseña debe incluir al menos una letra mayúscula. |
| Al menos un número | La contraseña debe incluir al menos un número. |
| Al menos un carácter especial (no letra, número ni espacio) | La contraseña debe incluir al menos un carácter especial (por ejemplo ! @ # $ %). |
| No es una contraseña común (sin distinguir mayúsculas) | Esa contraseña es muy común o conocida; elija otra. |

---

#### Prueba permisos (HU-095) — ✅

| Método | Ruta | Response 200 |
|---|---|---|
| GET | `/api/prueba/plataforma` | `"pasó"` (texto plano) |
| GET | `/api/prueba/empresa` | `"pasó"` |
| GET | `/api/prueba/sin-permiso` | **404** `permiso.no_disponible` (ruta no en catálogo) |

**Errores:** 401 sin JWT · 403 `permiso.prohibido` · 404 `permiso.no_disponible` en rutas no catalogadas.

---

### M1 — `POST /api/empresas` (HU-017) — 🚧

**Request** — `RegistrarEmpresaRequestDto`

| Campo | Tipo | Reglas |
|---|---|---|
| `razonSocial` | string | Obligatorio, máx. 200 |
| `rtn` | string | Obligatorio, **14 dígitos** (RN-01) |
| `email` | string | Correo del primer administrador (= `Acceso.Email`) |
| `password` | string | Política HU-114: 8–64 caracteres, al menos una mayúscula, un número y un carácter especial; no puede ser una contraseña común |
| `primerNombre` | string | Obligatorio |
| `segundoNombre` | string? | Opcional |
| `primerApellido` | string | Obligatorio |
| `segundoApellido` | string? | Opcional |

```json
{
  "razonSocial": "Distribuidora Norvia S. de R.L.",
  "rtn": "08019900123456",
  "email": "admin@miempresa.hn",
  "password": "ContraseñaSegura1",
  "primerNombre": "María",
  "primerApellido": "López"
}
```

**Response 201** — `RegistrarEmpresaResponseDto`

| Campo | Tipo | Uso |
|---|---|---|
| `empresaId` | uuid | Referencia interna (no para login) |
| `idEmpresa` | string | **Cifrado** → campo `idEmpresa` del login empresa |
| `razonSocial` | string | |
| `rtn` | string | |
| `estado` | string | `activa` |
| `vinculoId` | uuid | Primer vínculo admin |

```json
{
  "empresaId": "01933f2a-....",
  "idEmpresa": "CfDJ8...",
  "razonSocial": "Distribuidora Norvia S. de R.L.",
  "rtn": "08019900123456",
  "estado": "activa",
  "vinculoId": "01933f2b-...."
}
```

**Errores:** 409 RTN duplicado · 400 validación.

---

### M1 — Vínculos (HU-020, HU-021 y HU-115) — ✅ {#anexo-vinculos}

**Auth:** Bearer (sesión **empresa**), rol `admin_empresa`.

#### `POST /api/vinculos` — `CrearVinculoRequestDto` (HU-020) — ✅

Da acceso a la **empresa de la sesión** (sale del token, RN-06) a una persona identificada por su correo.

```json
{
  "email": "colaborador@miempresa.hn",
  "primerNombre": "Juan",
  "segundoNombre": null,
  "primerApellido": "Pérez",
  "segundoApellido": null,
  "rolCodigo": "colaborador",
  "passwordTemporal": "Temporal#2026"
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `email` | string | Obligatorio, máx. 254. No distingue mayúsculas |
| `primerNombre`, `primerApellido` | string | Obligatorios, máx. 80 |
| `segundoNombre`, `segundoApellido` | string? | Opcionales, máx. 80 |
| `rolCodigo` | string | `admin_empresa`, `responsable_sst`, `colaborador` o `encuestado` |
| `passwordTemporal` | string? | **Obligatoria solo si el correo no tiene cuenta.** Cumple la política de HU-114. La cuenta nueva queda con `DebeCambiarPassword = true` |

**Cuenta existente (RN-02, RN-65):** si el correo ya tiene cuenta en Norvia, se reutilizan la cuenta y su persona. Los nombres y la `passwordTemporal` enviados se ignoran, y la persona entra con su contraseña de siempre. Si la cuenta existe pero no tiene persona (por ejemplo, una cuenta del staff), se crea la persona con los nombres enviados.

**Response 201** — `CrearVinculoResponseDto`

```json
{
  "id": "01933f40-....",
  "personaId": "01933f41-....",
  "email": "colaborador@miempresa.hn",
  "nombreCompleto": "Juan Pérez",
  "rolCodigo": "colaborador",
  "estado": "activo",
  "creadoEn": "2026-11-16T02:30:00Z",
  "cuentaNueva": true
}
```

`cuentaNueva`: `true` si se creó la cuenta con la contraseña temporal; `false` si se reutilizó una existente.

**Errores:**

| HTTP | `codigo` | Cuándo |
|---|---|---|
| 400 | `ValidationProblemDetails` | Datos con formato inválido o `passwordTemporal` que no cumple HU-114 |
| 400 | `vinculos.password_temporal_requerida` | El correo no tiene cuenta y no se envió `passwordTemporal` |
| 400 | `vinculos.rol_invalido` | `rolCodigo` no existe |
| 403 | `permiso.prohibido` | El rol de la sesión no es `admin_empresa`, o es una sesión de staff |
| 409 | `vinculos.duplicado` | La persona ya tiene un vínculo con esta empresa, en cualquier estado. Para cambiarlo se usa HU-021 |

#### `GET /api/vinculos` (HU-021) — ✅

Personas con acceso a la **empresa de la sesión** (las de otras empresas nunca aparecen). Ordenadas por apellido y nombre.

**Query opcional:** `estado=activo|suspendido|baja`, `rolCodigo=admin_empresa|responsable_sst|colaborador|encuestado`.

**Response 200** — `VinculoResponseDto[]`

```json
[
  {
    "id": "01933f40-....",
    "personaId": "01933f41-....",
    "email": "colaborador@miempresa.hn",
    "nombreCompleto": "Juan Pérez",
    "rolCodigo": "colaborador",
    "estado": "activo",
    "creadoEn": "2026-11-16T02:30:00Z"
  }
]
```

#### `GET /api/vinculos/{id}` (HU-021) — ✅

**Response 200:** un `VinculoResponseDto`. **404** `vinculos.no_encontrado` si no existe o es de otra empresa.

#### `PATCH /api/vinculos/{id}` — `ActualizarVinculoRequestDto` (HU-021) — ✅

Edición parcial: se envía solo lo que cambia (al menos `rolCodigo` o `estado`).

```json
{
  "rolCodigo": "responsable_sst",
  "estado": "suspendido",
  "motivoCodigo": "decision_admin",
  "motivoDetalle": "Licencia prolongada"
}
```

| Campo | Notas |
|---|---|
| `rolCodigo` | `admin_empresa`, `responsable_sst`, `colaborador` o `encuestado` (RN-03) |
| `estado` | `activo`, `suspendido` o `baja` |
| `motivoCodigo` | `decision_admin`, `baja_laboral`, `falta_pago_empresa` u `otro`. **Obligatorio** al suspender o dar de baja; al reactivar, si falta se registra `decision_admin` |
| `motivoDetalle` | Obligatorio si `motivoCodigo` es `otro`; máx. 1000 |

**Reglas:**

- Cada cambio de estado agrega una fila a `HistorialEstadoVinculo` en la misma transacción, con estado anterior, nuevo, motivo y el vínculo que lo registró (RN-59). El cambio de rol no genera historial.
- Al suspender o dar de baja, la persona pierde el acceso **de inmediato**: el middleware rechaza su token con 403, se borran sus refresh de **esta** empresa y el login a esta empresa falla. Sus vínculos con otras empresas no cambian.
- La empresa debe conservar al menos un `admin_empresa` activo (RN-08). Quitar el rol o suspender al último responde **409**, aunque sea uno mismo.

**Response 200:** `VinculoResponseDto` actualizado.

**Errores:**

| HTTP | `codigo` | Cuándo |
|---|---|---|
| 400 | `ValidationProblemDetails` | Sin cambios pedidos, falta el motivo, o `otro` sin detalle |
| 400 | `vinculos.rol_invalido` | `rolCodigo` no existe |
| 404 | `vinculos.no_encontrado` | El vínculo no existe o es de otra empresa |
| 409 | `vinculos.ultimo_administrador` | El cambio dejaría a la empresa sin administrador activo |

#### `POST /api/vinculos/encuestados` — `CrearEncuestadoRequestDto` (HU-115) — ✅

Igual que `POST /api/vinculos`, pero **sin `rolCodigo`**: el servidor asigna `encuestado` (RN-74). Con una cuenta existente, se reutilizan la cuenta y su persona (RN-02, RN-65).

```json
{
  "email": "trabajador@miempresa.hn",
  "primerNombre": "Pedro",
  "segundoNombre": null,
  "primerApellido": "García",
  "segundoApellido": null,
  "passwordTemporal": null
}
```

`passwordTemporal` es opcional. Si se envía, debe cumplir HU-114. Si la cuenta es nueva y no se envía, Norvia **genera** una contraseña de 12 caracteres que cumple HU-114, sin caracteres confusos como `0/O` o `1/l/I`.

**Response 201** — `CrearEncuestadoResponseDto`

```json
{
  "id": "01933f50-....",
  "personaId": "01933f51-....",
  "email": "trabajador@miempresa.hn",
  "nombreCompleto": "Pedro García",
  "rolCodigo": "encuestado",
  "estado": "activo",
  "creadoEn": "2026-11-16T02:30:00Z",
  "cuentaNueva": true,
  "passwordTemporal": "Kp7#mx4R?ta9"
}
```

`passwordTemporal` solo viene cuando Norvia la generó. **Se muestra una única vez**: no se guarda en claro. El administrador la entrega a la persona hasta que exista el envío por correo (HU-118), y la persona la cambia en su primer ingreso (`debeCambiarPassword: true` en el login).

**Errores:** 400 validación · 403 `permiso.prohibido` · 409 `vinculos.duplicado`.

#### `POST /api/vinculos/encuestados/lote` — `CrearEncuestadosLoteRequestDto` (HU-115) — ✅

Entre 1 y 500 filas. Cada fila se procesa por separado: las que tienen problemas se informan y **no detienen** a las demás. Las válidas se guardan juntas en una transacción.

```json
{
  "filas": [
    { "email": "a@miempresa.hn", "primerNombre": "Ana", "primerApellido": "Ruiz" },
    { "email": "correo-invalido", "primerNombre": "X", "primerApellido": "Y" }
  ]
}
```

Cada fila acepta además `segundoNombre` y `segundoApellido`. No lleva contraseña: Norvia genera una para cada cuenta nueva.

**Response 200** — `CrearEncuestadosLoteResponseDto`

```json
{
  "creados": 1,
  "cuentas": [
    {
      "fila": 1,
      "vinculoId": "01933f60-....",
      "email": "a@miempresa.hn",
      "nombreCompleto": "Ana Ruiz",
      "cuentaNueva": true,
      "passwordTemporal": "Wn4$hq8Tzc2e"
    }
  ],
  "errores": [
    {
      "fila": 2,
      "email": "correo-invalido",
      "codigo": "vinculos.email_invalido",
      "mensaje": "El correo no es válido."
    }
  ]
}
```

`fila` es la posición en la lista enviada, desde 1. `passwordTemporal` solo viene en las cuentas nuevas y se muestra una única vez.

| `codigo` de error por fila | Cuándo |
|---|---|
| `vinculos.email_invalido` | Falta el correo o no es válido |
| `vinculos.datos_invalidos` | Falta el primer nombre o el primer apellido, o exceden 80 caracteres |
| `vinculos.duplicado_en_lote` | El correo ya aparece en una fila anterior del mismo lote |
| `vinculos.duplicado` | La persona ya tiene acceso a esta empresa |
| `vinculos.fila_invalida` | La fila es `null` |

El lote completo responde **400** solo si `filas` está vacío o tiene más de 500 elementos.

---

### M2 — Perfil (HU-026) — 🚧

#### `GET /api/empresas/perfil`

**Response 200** — `PerfilEmpresaResponseDto`

```json
{
  "empresaId": "01933f2a-....",
  "razonSocial": "Distribuidora Norvia S. de R.L.",
  "rtn": "08019900123456",
  "direccion": "Col. Palmira, Tegucigalpa",
  "actividadEconomica": "Comercio al por mayor",
  "rubroId": 2,
  "rubroNombre": "Comercio",
  "trabajadoresPermanentes": 45,
  "fechaInicioOperaciones": "2015-03-01",
  "estado": "activa",
  "perfilCompleto": true
}
```

`perfilCompleto`: `true` cuando `rubroId` y `trabajadoresPermanentes` están informados (RN-09).

#### `PUT /api/empresas/perfil` — `ActualizarPerfilEmpresaRequestDto`

```json
{
  "razonSocial": "Distribuidora Norvia S. de R.L.",
  "rtn": "08019900123456",
  "direccion": "Col. Palmira, Tegucigalpa",
  "actividadEconomica": "Comercio al por mayor",
  "rubroId": 2,
  "trabajadoresPermanentes": 45,
  "fechaInicioOperaciones": "2015-03-01"
}
```

**Response 200:** mismo shape que GET.

---

### M1 — Catálogos plataforma (HU-023 / HU-024) {#anexo-catalogos}

**Auth:** Bearer de sesión **plataforma**. HU-023 ✅ · HU-024 🚧.

**Convenciones de los catálogos:**

- `PATCH {id}` es **parcial**: un campo ausente (o `null`) se conserva. En `descripcion`, el texto vacío `""` la borra.
- `PATCH {id}/estado` recibe `{ "activo": true | false }` y responde el recurso. Vale igual para los recursos cuya propiedad se llama `activa`.
- El `codigo` de rubros, peligros y plantillas se fija al crear y no se edita.

**Errores comunes:**

| HTTP | `codigo` | Cuándo |
|---|---|---|
| 400 | `ValidationProblemDetails` | Falla una regla de forma (ver cada recurso) |
| 400 | `catalogos.rubro_invalido` · `catalogos.categoria_invalida` · `catalogos.peligro_invalido` | La referencia no existe o está desactivada. Al editar solo se exige activa si cambia |
| 403 | `permiso.prohibido` | `soporte_plataforma` intenta crear o editar, o una sesión de empresa llama a la ruta |
| 404 | `catalogos.rubro_no_encontrado` · `…categoria_no_encontrada` · `…peligro_no_encontrado` · `…pregunta_no_encontrada` · `…plantilla_no_encontrada` | El `{id}` no existe |
| 409 | `catalogos.codigo_duplicado` · `catalogos.nombre_duplicado` · `catalogos.orden_ocupado` | Código o nombre repetido, o posición de pregunta ocupada |

#### Rubros

`GET /api/rubros` → `RubroResponseDto[]`

```json
[{ "id": 1, "codigo": "oficina", "nombre": "Oficina administrativa", "activo": true }]
```

`POST /api/rubros` — `CrearRubroRequestDto` (`codigo`: minúsculas, números y `_`, máx. 30; `nombre` máx. 80, único). El `id` lo asigna el servidor.

```json
{ "codigo": "servicios", "nombre": "Servicios" }
```

**201:** `{ "id": 5, "codigo": "servicios", "nombre": "Servicios", "activo": true }`

`PATCH /api/rubros/{id}` — `ActualizarRubroRequestDto`: `{ "nombre": "Servicios y oficios" }`

`PATCH /api/rubros/{id}/estado`: `{ "activo": false }`

#### Categorías de riesgo

`GET /api/categorias-riesgo?rubroId=3` → `CategoriaRiesgoResponseDto[]`

```json
[{ "id": "01934000-....", "rubroId": 3, "nombre": "Riesgos ergonómicos", "descripcion": null, "activa": true }]
```

`POST /api/categorias-riesgo` — `CrearCategoriaRiesgoRequestDto` (rubro activo; `nombre` máx. 100, único dentro del rubro)

```json
{ "rubroId": 3, "nombre": "Riesgos químicos", "descripcion": "Sustancias y vapores" }
```

`PATCH /api/categorias-riesgo/{id}` — `ActualizarCategoriaRiesgoRequestDto`: `rubroId` (la mueve de rubro), `nombre`, `descripcion`.

```json
{ "nombre": "Riesgos por sustancias", "descripcion": "" }
```

`PATCH /api/categorias-riesgo/{id}/estado`: `{ "activo": false }`

#### Peligros

`GET /api/peligros` → `PeligroResponseDto[]`

```json
[{ "id": "01933000-....", "codigo": "carga_manual", "nombre": "Manipulación manual de cargas",
   "descripcion": null, "clasificacion": "ergonomico", "activo": true }]
```

`POST /api/peligros` — `CrearPeligroRequestDto` (`codigo` máx. 20; `clasificacion`: `fisico`, `mecanico`, `electrico`, `quimico`, `biologico`, `ergonomico`, `psicosocial`, `locativo`, `otro`)

```json
{ "codigo": "contacto_electrico", "nombre": "Contacto eléctrico",
  "descripcion": "Exposición a energía eléctrica", "clasificacion": "electrico" }
```

`PATCH /api/peligros/{id}` — `ActualizarPeligroRequestDto`: `nombre`, `descripcion`, `clasificacion`.

`PATCH /api/peligros/{id}/estado`: `{ "activo": false }`

#### Preguntas exploratorias

`GET /api/preguntas?categoriaRiesgoId={uuid}` → `PreguntaResponseDto[]`, ordenadas por `orden`, con sus opciones.

```json
[
  {
    "id": "01934150-....",
    "categoriaRiesgoId": "01934000-....",
    "texto": "¿Levantas cargas de más de 25 kg?",
    "tipoRespuestaCodigo": "seleccion_unica",
    "instruccionUi": "Seleccione una opción.",
    "obligatoria": true,
    "orden": 1,
    "peligroId": "01933000-....",
    "activa": true,
    "opciones": [
      { "id": "...", "texto": "Sí, a menudo", "orden": 1, "indicaExposicion": true },
      { "id": "...", "texto": "No", "orden": 2, "indicaExposicion": false }
    ]
  }
]
```

`POST /api/preguntas` — `CrearPreguntaRequestDto`. La pregunta se agrega al final de su categoría.

```json
{
  "categoriaRiesgoId": "01934000-....",
  "texto": "¿Levantas cargas de más de 25 kg?",
  "tipoRespuestaCodigo": "seleccion_unica",
  "obligatoria": true,
  "peligroId": "01933000-....",
  "opciones": [
    { "texto": "Sí, a menudo", "orden": 1, "indicaExposicion": true },
    { "texto": "No", "orden": 2, "indicaExposicion": false }
  ]
}
```

Reglas del **bloque de respuesta** (D7, D26, RN-68); el formulario del front aplica las mismas en su esquema Zod:

- `tipoRespuestaCodigo` es obligatorio.
- `respuesta_breve`: `opciones` vacía y sin `peligroId`.
- `seleccion_unica` y `seleccion_multiple`: de 2 a 20 opciones, sin `orden` ni texto repetidos.
- Con `peligroId`, al menos una opción con `indicaExposicion: true`; sin `peligroId`, ninguna.
- Categoría y peligro deben existir y estar activos.

`PATCH /api/preguntas/{id}` — `ActualizarPreguntaRequestDto`. Campos sueltos: `categoriaRiesgoId`, `texto`, `obligatoria`, `orden`. Si `orden` no se envía se conserva (o va al final si cambia de categoría); si otra pregunta ya lo tiene, responde 409 `catalogos.orden_ocupado`.

`tipoRespuestaCodigo`, `peligroId` y `opciones` forman **un bloque**: para cambiar cualquiera se envían `tipoRespuestaCodigo` y `opciones` juntos, y entonces un `peligroId` ausente significa "sin peligro". Las opciones se reemplazan completas y reciben `id` nuevos. Las encuestas ya generadas no cambian, porque guardan su propia copia (RN-12).

```json
{ "texto": "¿Con qué frecuencia levantas cargas pesadas?" }
```

```json
{
  "tipoRespuestaCodigo": "seleccion_unica",
  "peligroId": "01933000-....",
  "opciones": [
    { "texto": "Nunca", "orden": 1, "indicaExposicion": false },
    { "texto": "A veces", "orden": 2, "indicaExposicion": true },
    { "texto": "Siempre", "orden": 3, "indicaExposicion": true }
  ]
}
```

`PATCH /api/preguntas/{id}/estado`: `{ "activo": false }`. Una pregunta inactiva no se copia a encuestas nuevas.

#### Plantillas (de documento)

`GET /api/plantillas` → `PlantillaDocumentoResponseDto[]`

```json
[{ "id": "...", "codigo": "politica_sst", "titulo": "Política de SST", "tipoDocumento": "politica",
   "rubroId": null, "contenido": "{{RazonSocial}} se compromete…", "activa": true }]
```

`POST /api/plantillas` — `CrearPlantillaDocumentoRequestDto` (`codigo` máx. 30, único; `tipoDocumento`: `politica` o `procedimiento`; `rubroId` nulo = todos los rubros)

```json
{ "codigo": "procedimiento_epp", "titulo": "Procedimiento de uso de EPP", "tipoDocumento": "procedimiento",
  "rubroId": 4, "contenido": "# Uso de EPP en {{RazonSocial}}\n..." }
```

`PATCH /api/plantillas/{id}` — `ActualizarPlantillaDocumentoRequestDto`: `titulo`, `tipoDocumento`, `rubroId` (`0` = todos los rubros), `contenido`.

`PATCH /api/plantillas/{id}/estado`: `{ "activo": false }`

#### Plantillas de tarea

Tareas modelo de cada peligro. Con `tipoControl`, Norvia la sugiere como **control** al definir los controles de un riesgo con ese peligro, de la más efectiva a la menos (HU-039, RN-76, RN-21). Sin tipo es una **tarea modelo**, que entra a la propuesta del plan (HU-042). Lo ya aceptado o generado en las empresas guarda su copia y no cambia al editar la plantilla.

`GET /api/plantillas-tarea?peligroId={uuid}` → `PlantillaTareaResponseDto[]`. Por peligro: primero los controles por tipo (eliminación → EPP) y luego las tareas modelo, por título. Incluye las desactivadas.

```json
[{ "id": "...", "peligroId": "...", "tipoControl": "ingenieria", "titulo": "Encerrar o aislar las máquinas más ruidosas",
   "descripcion": null, "prioridadSugerida": 2, "requiereEvidencia": true, "activa": true }]
```

`POST /api/plantillas-tarea` — `CrearPlantillaTareaRequestDto`: `peligroId` (activo), `tipoControl` (opcional: `eliminacion`, `sustitucion`, `ingenieria`, `administrativo`, `epp`), `titulo` (máx. 200), `descripcion` (máx. 2000), `prioridadSugerida` (1 alta a 3 baja) y `requiereEvidencia`. **400** `catalogos.peligro_invalido` si el peligro no existe o está inactivo.

```json
{ "peligroId": "...", "tipoControl": null, "titulo": "Hacer audiometrías al personal expuesto cada año",
  "prioridadSugerida": 2, "requiereEvidencia": true }
```

`PATCH /api/plantillas-tarea/{id}` — `ActualizarPlantillaTareaRequestDto`, parcial: `tipoControl`, `quitarTipoControl` (`true` la vuelve tarea modelo; no se combina con `tipoControl`), `titulo`, `descripcion` (`""` la borra), `prioridadSugerida`, `requiereEvidencia`. El peligro no cambia.

`PATCH /api/plantillas-tarea/{id}/estado`: `{ "activo": false }`. Desactivada, deja de sugerirse y de proponerse en el plan.

#### `GET /api/plataforma/empresas` (HU-024)

```json
[
  {
    "empresaId": "01933f2a-....",
    "razonSocial": "Distribuidora Norvia S. de R.L.",
    "rubroNombre": "Comercio",
    "registradaEn": "2026-11-01",
    "vinculosActivos": 12
  }
]
```

---

### M3 — Encuestas (HU-029 a HU-034) — 🚧

#### `GET /api/encuestas` (listado Responsable SST)

**Response 200:**

```json
[
  {
    "id": "01934100-....",
    "titulo": "Diagnóstico 2026",
    "estado": "publicada",
    "creadaEn": "2026-11-10T08:00:00Z",
    "versionPublicadaNumero": 1,
    "participaciones": 28
  }
]
```

#### `GET /api/encuestas/historial` (HU-034)

Mismas encuestas **cerradas** o con versiones anteriores, para comparar periodos.

**Response 200:**

```json
[
  {
    "id": "01934100-....",
    "titulo": "Diagnóstico 2025",
    "estado": "cerrada",
    "cerradaEn": "2025-12-01T18:00:00Z",
    "resumen": { "participaciones": 40, "respuestasAnonimas": 40 }
  }
]
```

#### `GET /api/encuestas/categorias-disponibles` (HU-029) — ✅ {#anexo-hu-029}

**Auth:** Bearer de sesión de empresa, rol `responsable_sst`.

Devuelve las categorías **activas** del rubro de la empresa del JWT. No se envía `empresaId` ni `rubroId`. Cada categoría trae la vista previa de sus preguntas **activas**, ordenadas por `orden` y con sus opciones, para mostrar lo que incluirá la encuesta antes de crearla. La elección se envía en `POST /api/encuestas` (HU-030); este endpoint no guarda nada.

**Response 200** — `CategoriaDisponibleResponseDto[]`, ordenadas por nombre.

```json
[
  {
    "id": "01934000-....",
    "nombre": "Riesgos ergonómicos",
    "descripcion": null,
    "preguntasPreview": [
      {
        "id": "01934150-....",
        "texto": "¿Levantas cargas de más de 25 kg?",
        "tipoRespuesta": "seleccion_unica",
        "obligatoria": true,
        "orden": 1,
        "opciones": [
          { "texto": "Sí, a menudo", "orden": 1 },
          { "texto": "No", "orden": 2 }
        ]
      },
      {
        "id": "01934151-....",
        "texto": "Comentarios",
        "tipoRespuesta": "respuesta_breve",
        "obligatoria": false,
        "orden": 2,
        "opciones": []
      }
    ]
  }
]
```

La vista previa no muestra qué opción indica exposición ni el peligro asociado: es lo que verá el encuestado.

**Errores:**

| HTTP | `codigo` | Cuándo |
|---|---|---|
| 403 | `permiso.prohibido` | La sesión no es de `responsable_sst`, o es de staff |
| 409 | `encuestas.empresa_sin_rubro` | La empresa todavía no tiene rubro en su perfil (HU-026). Sin rubro no se puede generar una encuesta (RN-10) |

#### `POST /api/encuestas` (HU-030) — `CrearEncuestaRequestDto`

```json
{
  "titulo": "Diagnóstico 2026",
  "categoriaRiesgoIds": [
    "01934000-....",
    "01934001-...."
  ]
}
```

**Response 201** — `EncuestaResponseDto`

```json
{
  "id": "01934100-....",
  "titulo": "Diagnóstico 2026",
  "estado": "borrador",
  "versionBorradorId": "01934101-....",
  "versionPublicadaId": null
}
```

El servidor copia preguntas del catálogo a `EncuestaPregunta` / `EncuestaOpcion` en la versión borrador.

#### `PUT /api/encuestas/{id}/borrador` — `ActualizarEncuestaBorradorRequestDto`

Solo si existe versión en estado `borrador`.

```json
{
  "instrucciones": "Responde con honestidad; tus respuestas son anónimas.",
  "preguntas": [
    {
      "id": "01934110-....",
      "texto": "¿Usas EPP en todas las tareas?",
      "obligatoria": true,
      "orden": 1,
      "opciones": [
        { "id": "01934111-....", "texto": "Siempre", "orden": 1, "indicaExposicion": false },
        { "id": "01934112-....", "texto": "Nunca", "orden": 2, "indicaExposicion": true }
      ]
    }
  ]
}
```

**Response 200** — `EncuestaVersionResponseDto`: `id`, `numeroVersion`, `estado` (`borrador`), `instrucciones`, `publicadaEn`: null.

#### `POST /api/encuestas/{id}/versiones/{versionId}/publicacion`

Body vacío `{}` o sin body.

**Response 200:**

```json
{
  "id": "01934101-....",
  "numeroVersion": 1,
  "estado": "publicada",
  "publicadaEn": "2026-11-16T10:00:00Z"
}
```

**Response:** `409` si ya hay otra versión publicada sin cerrar flujo de reemplazo (RN-70).

#### `POST /api/encuestas/{id}/cierre`

**Response 204**.

#### `GET /api/encuestas/{id}` (detalle SST)

**Response 200** — `EncuestaDetalleResponseDto`:

```json
{
  "id": "01934100-....",
  "titulo": "Diagnóstico 2026",
  "estado": "publicada",
  "versionPublicada": {
    "id": "01934101-....",
    "numeroVersion": 1,
    "instrucciones": "Responde con honestidad...",
    "preguntas": []
  },
  "versionBorrador": null
}
```

---

### M3 — Encuestado (HU-031) — 🚧

#### `GET /api/encuestas/pendientes`

**Response 200:**

```json
[
  {
    "encuestaId": "01934100-....",
    "titulo": "Diagnóstico 2026",
    "versionId": "01934101-....",
    "instrucciones": "Responde con honestidad...",
    "preguntas": [
      {
        "id": "01934110-....",
        "texto": "¿Usas EPP?",
        "tipoRespuesta": "seleccion_unica",
        "obligatoria": true,
        "opciones": [
          { "id": "01934111-....", "texto": "Siempre" },
          { "id": "01934112-....", "texto": "Nunca" }
        ]
      }
    ]
  }
]
```

Solo encuestas `publicada`, no respondidas por este vínculo.

#### `POST /api/encuestas/{encuestaId}/respuestas` — `ResponderEncuestaRequestDto`

`encuestaId` en ruta debe coincidir con la encuesta de `versionId`.

```json
{
  "versionId": "01934101-....",
  "respuestas": [
    {
      "preguntaId": "01934110-....",
      "opcionId": "01934112-...."
    },
    {
      "preguntaId": "01934120-....",
      "textoLibre": "Comentario opcional"
    },
    {
      "preguntaId": "01934130-....",
      "opcionIds": ["01934131-....", "01934132-...."]
    }
  ]
}
```

| Tipo pregunta | Campo en ítem |
|---|---|
| `respuesta_breve` | `textoLibre` |
| `seleccion_unica` | `opcionId` |
| `seleccion_multiple` | `opcionIds` (array, mín. 1) |

**Response 204** (o **200** con confirmación mínima):

```json
{
  "mensaje": "Su respuesta fue registrada."
}
```

**Errores:** 409 si ya participó · 400 si falta obligatoria · 403 si no es `encuestado`.

---

### M3 — Reporte y sugerencias (HU-032, HU-033) — 🚧

#### `GET /api/encuestas/{id}/reporte`

**Response 200** — `ReporteEncuestaResponseDto`

```json
{
  "encuestaId": "01934100-....",
  "totalParticipaciones": 28,
  "totalRespuestasAnonimas": 28,
  "periodoDesde": "2026-11-01",
  "periodoHasta": "2026-11-15",
  "preguntas": [
    {
      "preguntaId": "01934110-....",
      "texto": "¿Usas EPP?",
      "tipoRespuesta": "seleccion_unica",
      "distribucion": [
        { "opcionId": "01934111-....", "etiqueta": "Siempre", "cantidad": 20, "porcentaje": 71.4 }
      ]
    }
  ]
}
```

Si `totalRespuestasAnonimas < 3`: **200** con `detalleOculto: true` y sin distribuciones sensibles (RN-73).

#### `GET /api/encuestas/{id}/peligros-sugeridos` (HU-033) — ✅ {#anexo-hu-033}

**Auth:** Bearer de sesión de empresa, rol `admin_empresa` o `responsable_sst`.

**Cómo se calcula (RN-13, RN-14, D9):**

- Se recorren las respuestas de **todas las versiones** de la encuesta. Cada respuesta usa la copia de su versión: el peligro de la pregunta (`EncuestaPregunta.PeligroId`) y la marca de exposición de la opción (`EncuestaOpcion.IndicaExposicion`). No se usa el catálogo actual (RN-12).
- Un peligro se sugiere si al menos una respuesta eligió una opción de exposición en una pregunta con ese peligro, en selección única o múltiple.
- Si una versión nueva cambia el peligro de una pregunta, las respuestas a esa versión sugieren el peligro nuevo, y las anteriores siguen respaldando el que tenían.
- `respuestasConExposicion` cuenta **respuestas distintas**: una respuesta cuenta una sola vez por peligro, aunque lo indique en varias preguntas. Se calcula al consultar; no se guarda.

**Registro de sugerencias:** cada peligro sugerido se guarda una sola vez como `RiesgoEmpresa` con `estado = sugerido` y `EncuestaId`. El índice único `(EncuestaId, PeligroId)` lo garantiza.

- Consultar varias veces con las mismas respuestas da el mismo resultado (RN-14).
- Las respuestas nuevas actualizan el conteo sin duplicar filas.
- Una sugerencia ya confirmada o descartada en HU-035 conserva su estado.

**Mínimo de respuestas (RN-73):** con menos de 3 respuestas responde `detalleOculto: true`, sin sugerencias, y no registra nada. Con tan pocas respuestas se podría deducir qué contestó cada persona.

**Response 200** — `PeligrosSugeridosResponseDto`

```json
{
  "encuestaId": "01934100-....",
  "totalRespuestas": 28,
  "minimoRespuestas": 3,
  "detalleOculto": false,
  "sugerencias": [
    {
      "riesgoSugeridoId": "01934200-....",
      "peligroId": "01933000-....",
      "peligroNombre": "Manipulación manual de cargas",
      "estado": "sugerido",
      "actividad": null,
      "respuestasConExposicion": 8,
      "preguntas": [
        { "preguntaId": "01934110-....", "texto": "¿Levantas cargas pesadas?", "respuestasConExposicion": 8 }
      ]
    }
  ]
}
```

- `sugerencias` va ordenada de mayor a menor respaldo.
- `riesgoSugeridoId` es el `RiesgoEmpresa` que se confirma o descarta en HU-035.
- `actividad` es la que se indicó al confirmarlo en HU-035; `null` si no se indicó o todavía no se revisó.
- `preguntas` indica qué pregunta originó la sugerencia y cuántas respuestas la respaldan en cada una.

**Errores:** 403 `permiso.prohibido` (otro rol o staff) · 404 `encuestas.no_encontrada` (no existe o es de otra empresa).

---

### M4 — Matriz (HU-036–038, HU-035) — 🚧

#### `GET /api/riesgos` (HU-036, HU-038) — ✅

Riesgos de la empresa de la sesión.
- **Por defecto:** los de la matriz (`confirmado`), vengan de una encuesta (HU-035) o agregados a mano.
- **Orden:** primero el nivel más alto de la última evaluación inicial; los sin evaluar al final y, a igual nivel, los más recientes.

**Filtros (parámetros de la consulta, `FiltrosRiesgosDto`; todos opcionales):**

| Parámetro | Valores | Filtra |
|---|---|---|
| `estado` | `confirmado` (por defecto), `sugerido`, `descartado` | Los de la matriz, los que esperan revisión o los descartados (RN-18) |
| `buscar` | texto, hasta 100 | Nombre o descripción del peligro, o la actividad. No distingue mayúsculas, pero sí tildes |
| `clasificacionPeligro` | `fisico`, `mecanico`, … | Clasificación del peligro del catálogo; los descritos por la empresa no tienen |
| `nivel` | `bajo`, `medio`, `alto`, `critico` | Clasificación de la última evaluación (RN-16) |
| `sinEvaluar` | `true` | Los que no tienen evaluación |
| `sinControl` | `true` | Los altos o críticos que todavía no tienen controles (RN-19, HU-039) |
| `probabilidad` y `severidad` | 1 a 5, las dos o ninguna | Una celda del mapa |

**Response 200:** `RiesgoResponseDto[]` (ver abajo). **400** si `probabilidad` o `severidad` van solas o fuera de 1–5, si se pide `sinEvaluar` junto con un nivel o una celda, o `sinControl` junto con `sinEvaluar` o un nivel bajo o medio.

#### `GET /api/riesgos/peligros-disponibles` (HU-036) — ✅

Peligros **activos** del catálogo global, por nombre, para elegir al agregar un riesgo. `api/peligros` es del staff de plataforma; esta ruta es para sesiones de empresa.

```json
[ { "id": "01933000-....", "nombre": "Caída al mismo nivel", "descripcion": null, "clasificacion": "locativo" } ]
```

#### `POST /api/riesgos` — `CrearRiesgoRequestDto` (HU-036) — ✅

Agrega a la matriz un riesgo que la encuesta no detectó.
- **Estado:** entra como `confirmado`, y quien lo agrega queda como su revisor.
- **Empresa:** `EmpresaId` sale de la sesión, nunca del cliente.

```json
{
  "peligroId": "01933000-....",
  "descripcionPeligro": null,
  "actividad": "Bodega de carga",
  "accidenteId": null
}
```

- **Peligro:** se envía `peligroId` (del catálogo y activo) **o** `descripcionPeligro` (hasta 300 caracteres), no los dos.
- **`actividad`:** obligatoria, hasta 200 caracteres.
- **`accidenteId`** (HU-051): opcional. El evento que reveló el riesgo; tiene que ser de la empresa y no estar descartado.

**Response 201** — `RiesgoResponseDto`

```json
{
  "id": "01935000-....",
  "estado": "confirmado",
  "peligroId": "01933000-....",
  "peligroNombre": "Caída al mismo nivel",
  "peligroClasificacion": "locativo",
  "descripcionPeligro": null,
  "actividad": "Bodega de carga",
  "encuestaId": null,
  "encuestaTitulo": null,
  "accidenteId": null,
  "creadoEn": "2026-11-16T12:00:00Z",
  "evaluacion": null,
  "evaluacionResidual": null,
  "totalControles": 0
}
```

- **`peligroNombre` y `peligroClasificacion`:** son null si el peligro se describió; entonces viene `descripcionPeligro`.
- **`evaluacion`:** es la última evaluación inicial (HU-037, mismo formato que `EvaluacionResponseDto`); null si todavía no se evaluó.
- **`encuestaId` y `encuestaTitulo`:** indican la encuesta que lo sugirió (HU-035); null si se agregó a mano.
- **`accidenteId`:** el evento que lo reveló (HU-051); null si no salió de un evento. Un riesgo tiene como máximo un origen: encuesta o evento.
- **`evaluacionResidual`:** la última evaluación residual, con los controles aplicados (HU-040, mismo formato); null si no hay. La matriz y su orden usan la inicial.
- **`totalControles`:** cuántos controles tiene (HU-039). Un riesgo alto o crítico con 0 se señala como "sin control" (RN-19).

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | Falta el peligro, vienen los dos, falta la actividad o algún texto pasa su largo |
| 400 `riesgos.peligro_invalido` | El peligro no existe o está inactivo |
| 400 `riesgos.evento_invalido` | `accidenteId` no es un evento de la empresa o está descartado (HU-051) |
| 409 `riesgos.duplicado` | La matriz ya tiene ese peligro con la misma actividad (sin distinguir mayúsculas) |

#### `POST /api/riesgos/{id}/evaluaciones` — `EvaluarRiesgoRequestDto` (HU-037) — ✅

Evaluación **inicial** de un riesgo de la matriz. La residual, después de los controles, es HU-040.
- **Historial:** cada evaluación se guarda aparte, con quién y cuándo. Una nueva no reemplaza la anterior (RN-20, D10), y la vigente es la más reciente.
- **Explicación de los valores:** la web muestra qué significa cada valor del 1 al 5 (RN-80).

```json
{
  "probabilidad": 3,
  "severidad": 4,
  "accidenteId": null
}
```

- **`accidenteId`** (HU-051): opcional. El evento a raíz del cual se reevalúa el riesgo; tiene que ser de la empresa y no estar descartado. Queda guardado en la evaluación, y el evento la muestra (`GET /api/eventos/{id}/riesgos`).

**Response 201** — `EvaluacionResponseDto`

```json
{
  "id": "01935100-....",
  "tipo": "inicial",
  "probabilidad": 3,
  "severidad": 4,
  "nivel": 12,
  "clasificacion": "alto",
  "evaluadoPorId": "01932000-....",
  "evaluadoPorNombre": "Lucía Bonilla",
  "evaluadoEn": "2026-11-16T12:05:00Z",
  "accidenteId": null
}
```

`nivel` (P × S) y `clasificacion` (`bajo`, `medio`, `alto`, `critico`) se **calculan** al responder (RN-15, RN-16); no se guardan.

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | Falta la probabilidad o la severidad, o alguna no está entre 1 y 5 |
| 400 `riesgos.evento_invalido` | `accidenteId` no es un evento de la empresa o está descartado (HU-051) |
| 404 `riesgos.no_encontrado` | El riesgo no existe o es de otra empresa |
| 409 `riesgos.no_en_matriz` | El riesgo está sugerido o descartado: solo se evalúan los confirmados (RN-18) |

#### `GET /api/riesgos/matriz` (HU-038) — ✅

El mapa de la matriz: cuántos riesgos confirmados hay en cada celda de probabilidad × severidad, según su última evaluación inicial (art. 47.b). Solo trae las celdas con riesgos; los riesgos de cada una se piden con `GET /api/riesgos?probabilidad=…&severidad=…`. `altosSinControl` cuenta los altos o críticos sin controles (RN-19, HU-039); se listan con `GET /api/riesgos?sinControl=true`.

```json
{
  "total": 5,
  "sinEvaluar": 1,
  "altosSinControl": 2,
  "celdas": [
    { "probabilidad": 4, "severidad": 5, "nivel": 20, "clasificacion": "critico", "cantidad": 1 },
    { "probabilidad": 3, "severidad": 4, "nivel": 12, "clasificacion": "alto", "cantidad": 2 }
  ]
}
```

#### `PATCH /api/encuestas/{id}/peligros-sugeridos/{riesgoId}` (HU-035) — ✅

Confirma o descarta un peligro sugerido por la encuesta. `riesgoId` es el `riesgoSugeridoId` de HU-033.
- **Confirmar:** el riesgo queda en la matriz de la empresa.
- **Descartar:** el riesgo no aparece en la matriz (RN-18).
- **Una sola vez:** cada sugerencia se revisa una sola vez y se guarda quién la revisó y cuándo.

**Auth:** permiso `encuesta.peligro_sugerido.revisar` para `admin_empresa` y `responsable_sst`.

**Request** — `RevisarPeligroSugeridoRequestDto`

```json
{ "estado": "confirmado", "actividad": "Carga de camiones" }
```

- `estado`: `confirmado` o `descartado`.
- `actividad`: opcional al confirmar, hasta 200 caracteres. No se envía al descartar.

**Response 200** — `PeligroSugeridoRevisadoResponseDto`

```json
{
  "riesgoId": "01934200-....",
  "encuestaId": "01934100-....",
  "peligroId": "01933000-....",
  "estado": "confirmado",
  "actividad": "Carga de camiones",
  "revisadoPorId": "01932000-....",
  "revisadoEn": "2026-11-23T18:00:00Z"
}
```

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | `estado` falta o no es `confirmado`/`descartado`; `actividad` pasa de 200 caracteres o viene al descartar |
| 404 `encuestas.sugerencia_no_encontrada` | La sugerencia no es de esa encuesta o es de otra empresa |
| 409 `encuestas.sugerencia_ya_revisada` | Ya se confirmó o descartó |

#### `GET /api/riesgos/{id}`

**Response 200:** `RiesgoResponseDto` en cualquier estado, con la última evaluación inicial en `evaluacion` (HU-037) y la última residual en `evaluacionResidual` (HU-040). **404** `riesgos.no_encontrado` si no existe o es de otra empresa.

#### `GET /api/riesgos/{id}/evaluaciones` (HU-041) — ✅

El historial de evaluaciones del riesgo, para demostrar su evolución (art. 47.b): **todas**, iniciales y residuales, la más reciente primero, con fecha y quién evaluó. Ninguna se borra al evaluar de nuevo (RN-20, D10); la vigente de cada tipo es la primera de su tipo en la lista.

**Response 200:** `EvaluacionResponseDto[]` (mismo item que devuelve evaluar, con `accidenteId` si se hizo a raíz de un evento). Un riesgo sin evaluar devuelve `[]`.

```json
[
  { "id": "…", "tipo": "residual", "probabilidad": 2, "severidad": 3, "nivel": 6, "clasificacion": "medio",
    "evaluadoPorId": "…", "evaluadoPorNombre": "Sara Responsable", "evaluadoEn": "2026-11-24T14:05:00Z" },
  { "id": "…", "tipo": "inicial", "probabilidad": 3, "severidad": 4, "nivel": 12, "clasificacion": "alto",
    "evaluadoPorId": "…", "evaluadoPorNombre": "Sara Responsable", "evaluadoEn": "2026-11-24T14:00:00Z" }
]
```

**Errores:** 404 `riesgos.no_encontrado` (no existe o es de otra empresa).

*(Antes el contrato tenía `GET …/historial` con una línea de tiempo de eventos variados, como "creado". HU-041 pide las evaluaciones, y no hay otros eventos guardados; la ruta es la misma del `POST` de evaluaciones.)*

#### `POST /api/riesgos/{id}/evaluaciones-residual` — `EvaluarRiesgoResidualRequestDto` (HU-040) — ✅

Evaluación **residual**: el riesgo con sus controles aplicados, para saber si bajó.
- **Aparte de la inicial:** se guarda con `tipo` `residual`, que fija el servidor (D10). Una nueva no reemplaza la anterior (RN-20), y la vigente es la más reciente.
- **Mismo cálculo:** probabilidad y severidad del 1 al 5; nivel y clasificación calculados (RN-15, RN-16).
- **Condiciones:** el riesgo tiene que estar en la matriz, tener evaluación inicial y al menos un control.

```json
{
  "probabilidad": 2,
  "severidad": 3
}
```

**Response 201:** `EvaluacionResponseDto` con `tipo`: `"residual"` (mismo formato que la inicial).

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | Falta la probabilidad o la severidad, o alguna no está entre 1 y 5 |
| 404 `riesgos.no_encontrado` | El riesgo no existe o es de otra empresa |
| 409 `riesgos.no_en_matriz` | El riesgo está sugerido o descartado (RN-18) |
| 409 `riesgos.sin_evaluacion_inicial` | Todavía no tiene evaluación inicial: no hay con qué comparar |
| 409 `riesgos.sin_controles` | No tiene controles: no hay "riesgo con los controles aplicados" |

#### `GET /api/riesgos/{id}/controles/sugeridos` (HU-039) — ✅

Controles que Norvia sugiere a partir de las plantillas **activas** del peligro del riesgo que tienen tipo de control (RN-76), ordenados del más efectivo al menos efectivo según la jerarquía (RN-21): eliminación, sustitución, ingeniería, administrativo y equipo de protección personal.
- **No se guardan:** son plantillas del catálogo; solo se guarda la que se acepta con `POST …/controles`.
- **Ya aceptadas:** no se vuelven a sugerir.
- **Peligro descrito por la empresa:** no tiene plantillas; responde `[]`.

```json
[
  { "plantillaId": "01936000-....", "tipo": "eliminacion", "titulo": "Hacer el trabajo desde el suelo", "descripcion": null },
  { "plantillaId": "01936001-....", "tipo": "epp", "titulo": "Usar arnés de cuerpo completo", "descripcion": "Con doble línea de vida." }
]
```

**Errores:** 404 `riesgos.no_encontrado` (no existe o es de otra empresa).

#### `POST /api/riesgos/{id}/controles` — `CrearControlRequestDto` (HU-039) — ✅

Agrega un control propio o acepta una sugerencia, tal cual o editada (tipo y descripción). El control queda `propuesto`; se implementa con el plan de trabajo (M5).

```json
{
  "tipo": "ingenieria",
  "descripcion": "Instalar barandas de 1 m con rodapié en el borde del techo.",
  "plantillaId": "01936000-...."
}
```

| Campo | Regla |
|---|---|
| `tipo` | Obligatorio: `eliminacion` \| `sustitucion` \| `ingenieria` \| `administrativo` \| `epp` (RN-21) |
| `descripcion` | Obligatoria, hasta 1000 caracteres; se guarda sin espacios al inicio ni al final |
| `plantillaId` | Solo al aceptar una sugerencia: la plantilla de la que sale (RN-76). Sin él, el control es propio |

**Response 201** — `ControlResponseDto`

```json
{
  "id": "01935200-....",
  "riesgoId": "01935000-....",
  "tipo": "ingenieria",
  "descripcion": "Instalar barandas de 1 m con rodapié en el borde del techo.",
  "estado": "propuesto",
  "plantillaId": "01936000-....",
  "creadoEn": "2026-11-23T13:00:00Z"
}
```

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | Falta el tipo o no es válido, o falta la descripción o pasa de 1000 caracteres |
| 400 `riesgos.sugerencia_invalida` | La plantilla no es del peligro del riesgo, está inactiva o no tiene tipo de control |
| 404 `riesgos.no_encontrado` | El riesgo no existe o es de otra empresa |
| 409 `riesgos.no_en_matriz` | El riesgo está sugerido o descartado (RN-18) |
| 409 `riesgos.sugerencia_aceptada` | Esa sugerencia ya es un control del riesgo |

#### `GET /api/riesgos/{id}/controles` (HU-039) — ✅

**Response 200:** `ControlResponseDto[]`, del más efectivo al menos efectivo y, dentro de cada tipo, del más antiguo al más reciente. **404** `riesgos.no_encontrado`.

#### `GET /api/riesgos/matriz/pdf` (HU-075)

**Response 200:** `Content-Type: application/pdf` (bytes, sin JSON).

**Request:** sin cuerpo; header `Accept: application/pdf` recomendado.

---

### M5 — Plan de trabajo (HU-042 a HU-046) — 🚧

Las tres rutas de HU-042 son para `admin_empresa` y `responsable_sst`.

#### `GET /api/plan-trabajo/propuesta` (HU-042) — ✅

Las tareas que se agregarían al plan, para revisarlas antes de confirmar. **No guarda nada.** Es determinista: los mismos datos dan la misma propuesta y las mismas claves.

- **De dónde salen** (art. 46.1.e), solo de riesgos **confirmados y evaluados**:
  - cada control `propuesto` sin tarea produce una tarea que lo implementa. Si salió de una sugerencia, usa el título y la evidencia de su plantilla; si es propio, el título es la primera línea de su descripción (hasta 200 caracteres);
  - cada plantilla activa del peligro **sin** tipo de control (tarea modelo) produce una tarea. Las que sugieren un control solo entran cuando el control se acepta (RN-76).
- **Prioridad:** sale del nivel de la última evaluación inicial: alto o crítico 1, medio 2, bajo 3.
- **Orden:** riesgos del nivel más alto primero; dentro de cada uno, controles por efectividad (RN-21) y luego tareas modelo por su prioridad sugerida.
- **Lo que ya tiene tarea** no se vuelve a proponer.

```json
{
  "tareas": [
    {
      "clave": "control:01935200-....",
      "riesgoId": "01935000-....",
      "riesgoNombre": "Trabajo en alturas",
      "riesgoNivel": 10,
      "riesgoClasificacion": "alto",
      "origen": "control",
      "controlId": "01935200-....",
      "tipoControl": "ingenieria",
      "plantillaId": "01936000-....",
      "titulo": "Instalar barandas en el borde",
      "descripcion": "Instalar barandas de 1 m",
      "prioridad": 1,
      "requiereEvidencia": true
    },
    {
      "clave": "plantilla:01935000-....:01936001-....",
      "riesgoId": "01935000-....",
      "riesgoNombre": "Trabajo en alturas",
      "riesgoNivel": 10,
      "riesgoClasificacion": "alto",
      "origen": "plantilla",
      "controlId": null,
      "tipoControl": null,
      "plantillaId": "01936001-....",
      "titulo": "Inspeccionar la línea de vida cada mes",
      "descripcion": null,
      "prioridad": 1,
      "requiereEvidencia": true
    }
  ],
  "riesgosSinEvaluar": 1
}
```

`riesgosSinEvaluar`: riesgos de la matriz que no entran porque no tienen nivel.

#### `POST /api/plan-trabajo/generacion` — `GenerarPlanRequestDto` (HU-042) — ✅

Confirma el plan con las tareas elegidas de la propuesta. Las que se desmarcaron no se envían y vuelven a proponerse.
- **No confía en el cliente:** vuelve a calcular la propuesta y crea solo las claves que siguen en ella. Una clave que ya tiene tarea, o de otra empresa, se ignora.
- **No duplica:** generarlo dos veces crea 0 la segunda vez. La base lo garantiza con los índices únicos `(RiesgoEmpresaId, PlantillaTareaId)` y `ControlId`.
- **Cada tarea queda** `pendiente`, sin responsable ni fecha (HU-043), con su origen: el riesgo y, si lo implementa, el control (RN-23).

```json
{ "claves": ["control:01935200-....", "plantilla:01935000-....:01936001-...."] }
```

**Response 200:**

```json
{ "tareasCreadas": 2 }
```

**Errores:** 400 `ValidationProblemDetails` si `claves` falta o está vacía.

*(Antes el contrato tenía `incluirControlesPropuestos`, `incluirPlantillasRubro` y devolvía un `planId`. No hay entidad de plan ni plantillas por rubro: el plan son las tareas de la empresa.)*

#### `GET /api/plan-trabajo/tareas` (HU-042, HU-046) — ✅

Tareas de la empresa, en orden: prioridad, riesgo de nivel más alto y, dentro de cada riesgo, controles por efectividad y luego tareas modelo.

**Filtros (parámetros de la consulta, `FiltrosTareasDto`; todos opcionales y combinables):**

| Parámetro | Valores | Filtra |
|---|---|---|
| `estado` | `pendiente`, `en_progreso`, `completada`, `cancelada` | El estado guardado |
| `vencidas` | `true` | Pendientes o en progreso con la fecha límite antes de hoy (fecha de Honduras). "Vencida" no es un estado guardado |
| `responsableId` | uuid | Las de esa persona |
| `sinResponsable` | `true` | Las que todavía no tienen responsable |
| `origen` | `riesgo`, `accidente`, `manual` | De dónde sale (RN-23) |
| `prioridad` | 1, 2, 3 | Alta, media, baja |
| `fechaDesde`, `fechaHasta` | aaaa-mm-dd | Fecha límite en el rango, incluidas; las tareas sin fecha quedan fuera |

**400** si se combinan `vencidas` con `estado` `completada` o `cancelada`, `responsableId` con `sinResponsable`, o `fechaDesde` después de `fechaHasta`; también si un valor no es válido (p. ej. `prioridad=4` u `origen=otro`).

**Response 200:**

```json
[
  {
    "id": "01935400-....",
    "titulo": "Instalar barandas en el borde",
    "descripcion": "Instalar barandas de 1 m",
    "estado": "pendiente",
    "prioridad": 1,
    "responsableId": null,
    "responsableNombre": null,
    "fechaLimite": null,
    "requiereEvidencia": true,
    "origen": "riesgo",
    "riesgoId": "01935000-....",
    "riesgoNombre": "Trabajo en alturas",
    "riesgoNivel": 10,
    "riesgoClasificacion": "alto",
    "controlTipo": "ingenieria",
    "accidenteId": null,
    "creadaEn": "2026-11-24T06:00:00Z"
  }
]
```

- `origen`: `riesgo`, `accidente` o `manual` (RN-23).
- `accidenteId`: con origen `accidente`, el evento del que sale la medida correctiva (HU-050); `null` en los demás.
- `riesgoNivel` y `riesgoClasificacion`: la última evaluación inicial del riesgo, en el momento de consultar.

#### `GET /api/plan-trabajo/tareas/mias` (HU-044) — ✅

Las tareas cuyo responsable es el vínculo de la sesión (del token), con el mismo item que `GET …/tareas`. Para `admin_empresa`, `responsable_sst` y `colaborador`; los encuestados no tienen tareas.

**Orden:** primero en progreso y luego pendientes, por fecha límite más próxima y prioridad; al final las completadas y canceladas, las más recientes primero.

El item incluye `completadaEn` (null si no está completada); también lo trae `GET …/tareas`.

#### `GET /api/plan-trabajo/responsables` (HU-043) — ✅

A quién se le puede asignar una tarea: los vínculos **activos** de la empresa con rol `admin_empresa`, `responsable_sst` o `colaborador` (RN-07). Los encuestados no entran: sus cuentas son solo para responder encuestas (HU-115). Orden: por nombre.

```json
[ { "id": "01933f40-....", "nombreCompleto": "Carlos Colaborador", "rolCodigo": "colaborador" } ]
```

#### `PUT /api/plan-trabajo/tareas/{id}/asignacion` — `AsignarTareaRequestDto` (HU-043) — ✅

Asigna o reasigna el responsable y la fecha límite. El estado no cambia: iniciarla es HU-044. Avisar al responsable (RN-77) es HU-081.

```json
{ "responsableId": "01933f40-....", "fechaLimite": "2026-12-15" }
```

- **Los dos son obligatorios** (RN-22).
- **Responsable:** uno de `GET …/responsables`.
- **Fecha límite:** no puede ser anterior a hoy (fecha de Honduras), salvo que se conserve la que ya tenía, aunque esté vencida (design-system § Campo de fecha).

**Response 200:** `TareaResponseDto` (el mismo item de `GET …/tareas`).

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | Falta el responsable o la fecha límite |
| 400 `plan.responsable_invalido` | No es un vínculo activo de la empresa, o es encuestado |
| 400 `plan.fecha_pasada` | La fecha es anterior a hoy y no es la que ya tenía |
| 404 `plan.tarea_no_encontrada` | La tarea no existe o es de otra empresa |
| 409 `plan.tarea_cerrada` | La tarea está completada o cancelada |

#### `POST /api/plan-trabajo/tareas` — `CrearTareaManualRequestDto` (HU-043) — ✅

Tarea manual: no sale de un riesgo ni de un accidente (origen `manual`, RN-23). Nace `pendiente` y **ya asignada**.

```json
{
  "titulo": "Recargar los extintores",
  "descripcion": "Los dos de la bodega",
  "prioridad": 2,
  "responsableId": "01933f40-....",
  "fechaLimite": "2026-12-04",
  "requiereEvidencia": true
}
```

| Campo | Regla |
|---|---|
| `titulo` | Obligatorio, hasta 200 caracteres |
| `descripcion` | Opcional, hasta 2000 |
| `prioridad` | Obligatoria: 1 alta, 2 media, 3 baja |
| `responsableId`, `fechaLimite` | Obligatorios, con las mismas reglas que al asignar |
| `requiereEvidencia` | Opcional; por defecto `false` (RN-25, HU-045) |

**Response 201:** `TareaResponseDto` con `origen: "manual"`. **Errores:** 400 `ValidationProblemDetails`, `plan.responsable_invalido` o `plan.fecha_pasada`.

#### `PATCH /api/plan-trabajo/tareas/{id}/estado` — `CambiarEstadoTareaRequestDto` (HU-044) — ✅

Pasa una tarea por `pendiente`, `en_progreso` y `completada`, en cualquier orden (también para reabrirla). Reemplaza al `PATCH /api/plan-trabajo/tareas/{id}` genérico del contrato anterior: asignar es `PUT …/asignacion` (HU-043), así el permiso de cambiar el estado no permite reasignar.

```json
{ "estado": "en_progreso" }
```

- **Quién (RN-24):** el responsable de la tarea o un Responsable SST. El permiso de la ruta lo tienen también `admin_empresa` y `colaborador`, pero la aplicación rechaza a quien no sea ninguno de los dos.
- **Iniciar o completar (RN-22):** la tarea necesita responsable y fecha límite.
- **Completar (RN-25):** si la tarea pide evidencia, no se completa sin ella. Hasta HU-045 no hay dónde adjuntarla, así que esas tareas no se pueden completar todavía.
- **`completadaEn`:** se guarda al completar y se borra al reabrir. Pedir el mismo estado no cambia nada.
- **Cancelar** no es parte de atender una tarea: `cancelada` se rechaza aquí.

**Response 200:** `TareaResponseDto`.

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | Falta el estado, o no es `pendiente`, `en_progreso` ni `completada` |
| 403 `plan.tarea_ajena` | No es su responsable ni Responsable SST (RN-24) |
| 404 `plan.tarea_no_encontrada` | La tarea no existe o es de otra empresa |
| 409 `plan.tarea_sin_asignar` | Se quiere iniciar o completar sin responsable o sin fecha límite (RN-22) |
| 409 `plan.falta_evidencia` | Se quiere completar una tarea que pide evidencia y no la tiene (RN-25) |
| 409 `plan.tarea_cancelada` | La tarea está cancelada |

#### `POST /api/plan-trabajo/tareas/{id}/evidencias` (HU-045)

**Request:** `multipart/form-data`

| Parte | Tipo |
|---|---|
| `archivo` | file (pdf, jpg, png; tamaño máx. según RNF) |
| `descripcion` | string opcional |

**Response 201:**

```json
{
  "evidenciaId": "01935500-....",
  "nombreArchivo": "foto-señalizacion.jpg",
  "subidaEn": "2026-11-16T14:00:00Z"
}
```

---

### Notificaciones (HU-117 ✅)

#### `GET /api/notificaciones?limite=50` (HU-117)

Las propias, de la más reciente a la más antigua (`limite` por defecto 50, máximo 100), y cuántas no se han leído. El front arma el enlace con `tipo` y el origen: `tareaId` (tarea asignada) o `documentoId` (política publicada: abre su versión vigente, HU-074 y HU-116).

```json
{
  "noLeidas": 1,
  "notificaciones": [
    {
      "id": "01936000-....",
      "tipo": "politica_publicada",
      "titulo": "Nueva política: Política SST 2026",
      "mensaje": "Se aprobó una nueva versión de «Política SST 2026». Puedes consultarla en Norvia.",
      "creadaEn": "2026-11-25T19:40:00Z",
      "leidaEn": null,
      "tareaId": null,
      "versionDocumentoId": "01938101-....",
      "documentoId": "01938100-...."
    }
  ]
}
```

Las políticas vigentes están en M9: `GET /api/documentos/vigentes` (HU-074).

#### `PATCH /api/notificaciones/{id}/lectura` (HU-117)

**Request:** sin cuerpo.

**Response 204.**

---

### M6 — Eventos y accidentes (HU-047 ✅ base, evidencias 🚧 HU-100; HU-049 ✅; HU-050 ✅; HU-051 ✅; HU-052 ✅)

Reporte **anónimo** con sesión de vínculo (`admin_empresa`, `responsable_sst`, `colaborador`, `encuestado`): el servidor toma `EmpresaId` del JWT, pero no guarda `ReportadoPorId` ni expondrá `SubidoPorId` en los adjuntos del evento (`D11`, `RN-27`, `RN-74`). Los permisos de consulta (`GET`) corresponden a `admin_empresa` y `responsable_sst`.

#### `POST /api/eventos` (HU-047 — ✅) — `ReportarEventoRequestDto`

**Auth:** Bearer de empresa (`evento.reportar`: `admin_empresa`, `responsable_sst`, `colaborador`, `encuestado`).

```json
{
  "tipo": "incidente",
  "estadoEnfermedad": null,
  "esGrave": false,
  "fechaHoraEvento": "2026-11-14T15:30:00Z",
  "lugar": "Pasillo de empaque",
  "descripcion": "Resbalón en pasillo sin señalizar"
}
```

| Campo | Valores / regla |
|---|---|
| `tipo` | `accidente` \| `incidente` \| `enfermedad_profesional` \| `condicion_insegura` (obligatorio) |
| `estadoEnfermedad` | `sospechosa` \| `diagnosticada` (obligatorio si y solo si `tipo = enfermedad_profesional`; `null` en otro caso) |
| `esGrave` | booleano (opcional, `false` por defecto; aplica a cualquier tipo) |
| `fechaHoraEvento` | ISO-8601 obligatorio, en UTC o con zona (la web envía la hora de Honduras con `-06:00`, p. ej. `2026-11-14T09:30:00-06:00`; se guarda en UTC); no puede ser futura (margen de 5 min por desfase de reloj) |
| `lugar` | string opcional, máx. 200 caracteres |
| `descripcion` | string obligatorio, no vacío ni solo espacios |

**Response 201 (`ReportarEventoResponseDto`):**

```json
{
  "id": "01935600-....",
  "tipo": "incidente",
  "estado": "abierto",
  "estadoEnfermedad": null,
  "esGrave": false,
  "fechaHoraEvento": "2026-11-14T15:30:00Z",
  "registradoEn": "2026-11-15T09:00:00Z"
}
```

**Errores:** 400 validación · 400 `eventos.fecha_futura` · 401 · 403.

#### `POST /api/eventos/{id}/evidencias` (HU-047, opcional — 🚧 pendiente `HU-100`)

`multipart/form-data` con imagen o PDF (`Archivo`). Se guardará asociado al evento con `SubidoPorId = null` para preservar el anonimato (`D11`) una vez exista el almacenamiento externo de `HU-100`.

#### `GET /api/eventos` (HU-047 — ✅)

**Auth:** Bearer de empresa (`evento.listar`: `admin_empresa`, `responsable_sst`).

**Query opcional (`snake_case`):** `?estado=abierto&tipo=condicion_insegura&esGrave=true`

**Response 200 (`EventoResumenResponseDto[]`):** lista ordenada del más reciente al más antiguo (`registradoEn DESC`, `fechaHoraEvento DESC`) con `id`, `tipo`, `estado`, `estadoEnfermedad`, `esGrave`, `fechaHoraEvento`, `lugar`, `descripcion` (acortada a máx. 200 caracteres) y `registradoEn`.

**Errores:** 400 `eventos.filtro_invalido` (si `estado` o `tipo` no coinciden con los valores válidos en `snake_case`) · 401 · 403.

#### `GET /api/eventos/estadisticas` (HU-052 — ✅)

**Auth:** Bearer de empresa (`evento.estadisticas`: `admin_empresa`, `responsable_sst`).

Cuántos eventos hubo en un periodo, para detectar patrones (art. 47.e). **Solo cifras:** no trae quién reportó (no se guarda, D11), ni descripciones ni lugares. **No cuenta los descartados** (RN-28).

**Query (obligatoria):** `?desde=2025-12-01&hasta=2026-11-24`

- Fechas de Honduras (aaaa-mm-dd), incluidas, sobre **cuándo ocurrió** el evento (`fechaHoraEvento`), no cuándo se reportó.
- `hasta` no puede ser anterior a `desde`, y el periodo abarca como máximo 24 meses.

**Response 200 (`EstadisticasEventosResponseDto`):**

```json
{
  "desde": "2025-12-01",
  "hasta": "2026-11-24",
  "total": 4,
  "graves": 1,
  "porTipo": [
    { "tipo": "accidente", "cantidad": 2, "graves": 1 },
    { "tipo": "incidente", "cantidad": 1, "graves": 0 },
    { "tipo": "enfermedad_profesional", "cantidad": 0, "graves": 0 },
    { "tipo": "condicion_insegura", "cantidad": 1, "graves": 0 }
  ],
  "porMes": [
    { "anio": 2025, "mes": 12, "cantidad": 0, "graves": 0 },
    "…",
    { "anio": 2026, "mes": 11, "cantidad": 2, "graves": 1 }
  ]
}
```

- `porTipo`: los cuatro tipos en orden fijo, también con 0.
- `porMes`: todos los meses del periodo (mes de Honduras), del primero al último, también con 0, para compararlos sobre la misma base.

**Errores:** 400 validación (faltan las fechas, `hasta` antes de `desde` o más de 24 meses) · 401 · 403.

#### `GET /api/eventos/{id}` (HU-047 — ✅)

**Auth:** Bearer de empresa (`evento.ver`: `admin_empresa`, `responsable_sst`).

**Response 200 (`EventoDetalleResponseDto`):** detalle completo (`id`, `tipo`, `estado`, `estadoEnfermedad`, `esGrave`, `fechaHoraEvento`, `lugar`, `descripcion` completa, `registradoEn`). Desde `HU-049` también trae `investigacion` (`null` o `{ causasInmediatas, causasBasicas, conclusiones, investigadaPorId, investigadaPorNombre, fechaInvestigacion }`), `totalMedidas` (tareas con origen en el evento que no están canceladas), `cerradoEn`, `descartadoEn`, `descartadoPorNombre` y `motivoDescarte`. Los adjuntos llegan con `HU-100`. Nunca incluye datos de quien reportó.

**Errores:** 404 `eventos.no_encontrado` · 401 · 403.

#### `PUT /api/eventos/{id}/investigacion` (HU-049 — ✅) — `RegistrarInvestigacionRequestDto`

**Auth:** Bearer de empresa (`evento.investigar`: `responsable_sst`). El `admin_empresa` solo consulta.

Registra la investigación del evento o la corrige (una sola por evento; volver a enviarla la reemplaza, no la duplica). La primera vez el evento pasa de `abierto` a `en_investigacion`. Ya no cierra el evento: el cierre es una acción aparte (`POST …/cierre`).

```json
{
  "causasInmediatas": "Piso mojado sin señalización",
  "causasBasicas": "Falta de procedimiento de limpieza",
  "conclusiones": "Capacitar al personal de limpieza y colocar conos",
  "investigadaPorId": "01933f40-....",
  "fechaInvestigacion": "2026-11-15"
}
```

- `causasInmediatas` y `causasBasicas`: obligatorias, máx. 4000 caracteres (se recortan los espacios).
- `conclusiones`: opcional, máx. 4000.
- `investigadaPorId`: `VinculoEmpresa` activo de la empresa con rol `admin_empresa`, `responsable_sst` o `colaborador` (la lista sale de `GET /api/plan-trabajo/responsables`).
- `fechaInvestigacion`: fecha sin hora; no puede ser futura (fecha de Honduras) ni anterior al día del evento.

**Response 200 (`EventoDetalleResponseDto`):** el evento con su `investigacion`.

**Errores:** 400 validación · 400 `eventos.investigador_invalido` · 400 `eventos.fecha_investigacion_invalida` · 404 `eventos.no_encontrado` · 409 `eventos.terminado` (ya cerrado o descartado) · 401 · 403.

*(Antes el contrato tenía `PATCH …/investigacion` sin investigador, y el evento se cerraba solo al cumplir `RN-28`. Se cambió a `PUT` porque reemplaza la investigación completa, y a un cierre explícito para que el Responsable SST decida cuándo terminó.)*

#### `POST /api/eventos/{id}/cierre` (HU-049 — ✅)

**Auth:** Bearer de empresa (`evento.cerrar`: `responsable_sst`). Sin cuerpo.

Cierra el evento si cumple `RN-28`: tiene investigación y al menos una medida correctiva (tarea del plan con origen en el evento que no esté cancelada; las crea `HU-050`). Guarda `CerradoEn`. Cerrado, ya no se edita la investigación; las medidas siguen en el plan de trabajo.

**Response 200 (`EventoDetalleResponseDto`):** evento con `estado: "cerrado"` y `cerradoEn`.

**Errores:** 404 `eventos.no_encontrado` · 409 `eventos.sin_investigacion` · 409 `eventos.sin_medidas` · 409 `eventos.terminado` · 401 · 403.

#### `PATCH /api/eventos/{id}/descarte` (HU-049 — ✅) — `DescartarEventoRequestDto`

**Auth:** Bearer de empresa (`evento.descartar`: `responsable_sst`). Marca un reporte falso, inválido o duplicado como `descartado` sin investigación ni medidas (`RN-28`). Guarda quién lo descartó y cuándo. Un evento descartado no se investiga ni se cierra.

```json
{
  "motivo": "Reporte duplicado del incidente en empaque"
}
```

- `motivo`: opcional, máx. 1000 caracteres; vacío se guarda como `null`.

**Response 200 (`EventoDetalleResponseDto`):** evento con `estado: "descartado"`, `motivoDescarte`, `descartadoEn` y `descartadoPorNombre`.

**Errores:** 400 validación · 404 `eventos.no_encontrado` · 409 `eventos.terminado` · 401 · 403.

#### `GET /api/eventos/{id}/riesgos` (HU-051 — ✅)

**Auth:** Bearer de empresa (`evento.riesgos`: `admin_empresa`, `responsable_sst`).

Lo que el evento cambió en la matriz (art. 47.b). Los enlaces se hacen desde riesgos: `POST /api/riesgos` y `POST /api/riesgos/{id}/evaluaciones` con `accidenteId`.

**Response 200 (`RiesgoDelEventoResponseDto[]`):**

```json
[
  { "riesgoId": "…", "nombre": "Estantes sin anclar a la pared", "actividad": "Almacenaje en bodega", "relacion": "revelado",
    "nivelAnterior": null, "clasificacionAnterior": null, "nivel": 12, "clasificacion": "alto", "evaluadoEn": "2026-11-24T17:10:00Z" },
  { "riesgoId": "…", "nombre": "Cajas apiladas sin sujetar", "actividad": "Almacenaje en bodega", "relacion": "reevaluado",
    "nivelAnterior": 4, "clasificacionAnterior": "bajo", "nivel": 16, "clasificacion": "critico", "evaluadoEn": "2026-11-24T17:12:00Z" }
]
```

- **`revelado`:** el riesgo se agregó a raíz del evento (`RiesgoEmpresa.AccidenteId`). `nivel` es su nivel inicial actual (null si todavía no se evalúa).
- **`reevaluado`:** el riesgo ya estaba en la matriz y se reevaluó a raíz del evento (`EvaluacionRiesgo.AccidenteId`). `nivel` es el de esa evaluación y `nivelAnterior` el de la evaluación inicial previa (null si no había). Si se reevaluó varias veces por el mismo evento, cuenta la última.
- **Orden:** primero los revelados y luego los reevaluados; dentro de cada grupo, la evaluación más reciente primero.

**Errores:** 404 `eventos.no_encontrado` · 401 · 403.

#### `POST /api/eventos/{id}/medidas-correctivas` (HU-050 — ✅) — `CrearMedidaCorrectivaRequestDto`

**Auth:** Bearer de empresa (`evento.medida.crear`: `responsable_sst`). El `admin_empresa` solo consulta.

Cada medida correctiva crea una `Tarea` del plan de trabajo con origen `accidente` (`AccidenteId` = el evento; RN-23, D6). Pide lo mismo que una tarea manual (`POST /api/plan-trabajo/tareas`): nace pendiente y asignada. Se trabaja desde el plan (`HU-044`) como cualquier otra tarea. Solo se agrega mientras el evento esté `abierto` o `en_investigacion`.

```json
{
  "titulo": "Señalizar el piso mojado",
  "descripcion": "Conos amarillos en la entrada de la bodega",
  "prioridad": 1,
  "responsableId": "01933f40-....",
  "fechaLimite": "2026-11-30",
  "requiereEvidencia": false
}
```

- `titulo`: obligatorio, máx. 200. `descripcion`: opcional, máx. 2000.
- `prioridad`: 1 (alta), 2 (media) o 3 (baja).
- `responsableId`: vínculo activo de la empresa con rol `admin_empresa`, `responsable_sst` o `colaborador` (lista en `GET /api/plan-trabajo/responsables`).
- `fechaLimite`: no anterior a hoy (fecha de Honduras).

**Response 201 (`MedidaCorrectivaResponseDto`):**

```json
{
  "id": "01935a10-....",
  "titulo": "Señalizar el piso mojado",
  "descripcion": "Conos amarillos en la entrada de la bodega",
  "estado": "pendiente",
  "prioridad": 1,
  "responsableId": "01933f40-....",
  "responsableNombre": "Carlos Colaborador",
  "fechaLimite": "2026-11-30",
  "requiereEvidencia": false,
  "creadaEn": "2026-11-24T16:40:00Z",
  "completadaEn": null
}
```

**Errores:** 400 validación · 400 `eventos.responsable_invalido` · 400 `eventos.fecha_pasada` · 404 `eventos.no_encontrado` · 409 `eventos.terminado` (cerrado o descartado) · 401 · 403.

*(Antes el contrato pedía solo `descripcion`, `fechaLimite` y `responsableId`. Ahora pide lo mismo que una tarea manual, porque la medida es una tarea del plan y necesita título y prioridad.)*

#### `GET /api/eventos/{id}/medidas-correctivas` (HU-050 — ✅)

**Auth:** Bearer de empresa (`evento.medida.listar`: `admin_empresa`, `responsable_sst`).

**Response 200 (`MedidaCorrectivaResponseDto[]`):** las medidas del evento con su avance, también las canceladas y también si el evento ya está cerrado. **Orden:** primero las pendientes y en progreso, por fecha límite más próxima y prioridad; luego las completadas y al final las canceladas. "Vencida" no se guarda: la web la calcula (pendiente o en progreso con la fecha límite pasada).

**Errores:** 404 `eventos.no_encontrado` · 401 · 403.

---

### M9 — Documentos (HU-070 a HU-072 y HU-074 ✅; HU-073 🚧) {#anexo-documentos}

La **versión de trabajo** de un documento es su borrador si tiene uno; si no, la vigente. Los enums van en snake_case: `tipoDocumento` (`politica`, `procedimiento`) y `estado` (`borrador`, `vigente`, `reemplazada`).

#### `GET /api/documentos/plantillas` (HU-070)

Plantillas activas del rubro de la empresa o de todos los rubros, por tipo y título.

```json
[{ "id": "01938000-....", "codigo": "politica_sst", "titulo": "Política de seguridad y salud en el trabajo", "tipoDocumento": "politica" }]
```

**Errores:** 409 `documentos.sin_rubro` (el perfil no tiene rubro) · 401 · 403.

#### `POST /api/documentos/generacion` (HU-070)

```json
{ "plantillaDocumentoId": "01938000-....", "titulo": "Política SST 2026" }
```

- `plantillaDocumentoId` es obligatorio. `titulo` es opcional (hasta 200): sin él, el documento toma el título de la plantilla.
- Los marcadores se reemplazan con los datos del perfil (lista en `12-modelo-datos.md` § PlantillaDocumento). Un dato vacío queda como `[Completar: dirección]`.
- Crea el documento con la versión 1 en `borrador` (RN-49). La plantilla no cambia.

**Response 201 (`DocumentoDetalleResponseDto`):**

```json
{
  "id": "01938100-....",
  "titulo": "Política SST 2026",
  "tipoDocumento": "politica",
  "plantillaTitulo": "Política de seguridad y salud en el trabajo",
  "creadoEn": "2026-11-25T19:20:00Z",
  "version": {
    "id": "01938101-....",
    "numeroVersion": 1,
    "estado": "borrador",
    "contenido": "# Política de seguridad y salud en el trabajo\n\n**Ferretería El Roble S. de R.L.** (RTN 08011990123456), con domicilio en [Completar: dirección]…",
    "creadaEn": "2026-11-25T19:20:00Z",
    "creadaPorNombre": "Sara Seguridad",
    "aprobadaEn": null,
    "aprobadaPorNombre": null
  },
  "porCompletar": ["dirección", "nombre y cargo de quien aprueba"]
}
```

`porCompletar` lista, sin repetir y en orden, el texto de cada `[Completar: …]` que queda en la versión de trabajo, también los que la plantilla trae escritos.

**Errores:** 400 validación · 404 `documentos.plantilla_no_disponible` (no existe, está desactivada o es de otro rubro) · 409 `documentos.sin_rubro` · 401 · 403.

#### `GET /api/documentos` (HU-070)

Los documentos de la empresa, el último actualizado primero. `actualizadoEn` es la fecha de aprobación de la versión de trabajo o, si es un borrador, la de su creación.

```json
[{ "id": "01938100-....", "titulo": "Política SST 2026", "tipoDocumento": "politica", "numeroVersion": 1, "estado": "borrador", "actualizadoEn": "2026-11-25T19:20:00Z" }]
```

#### `GET /api/documentos/{id}` (HU-070)

**Response 200:** `DocumentoDetalleResponseDto`, igual que la generación, con la versión de trabajo.

**Errores:** 404 `documentos.no_encontrado` (también si es de otra empresa) · 401 · 403.

#### `PUT /api/documentos/{id}/borrador` (HU-071)

```json
{ "contenido": "# Política de seguridad y salud en el trabajo\n\n**Ferretería El Roble S. de R.L.**, con domicilio en Col. Palmira…" }
```

- Reemplaza el contenido completo del borrador (Markdown). Es obligatorio, no puede quedar en blanco y tiene hasta 50 000 caracteres.
- Los saltos de línea se guardan como `\n` y se quitan los espacios del final.
- Los marcadores `{{…}}` ya no se reemplazan: eso pasa solo al generar (HU-070). La plantilla no cambia.
- Solo se edita la versión en `borrador` (RN-50). Se conservan su número y su estado.

**Response 200 (`DocumentoDetalleResponseDto`):** igual que la generación, con `porCompletar` calculado sobre el contenido nuevo.

**Errores:** 400 validación (`Contenido`) · 404 `documentos.no_encontrado` (también si es de otra empresa) · 409 `documentos.sin_borrador` (el documento no tiene borrador: su versión está aprobada) · 401 · 403.

#### `POST /api/documentos/{id}/aprobacion` (HU-072)

Sin body.

- Aprueba el borrador: queda `vigente` con quién lo aprobó y cuándo, y ya no se edita (RN-50).
- Si el documento tenía una versión vigente, pasa a `reemplazada`: una sola vigente por documento (RN-51).
- No se aprueba mientras el borrador tenga un `[Completar: …]` (RN-49): la versión aprobada ya no cambia.
- Si es una `politica`, crea una notificación `politica_publicada` para cada vínculo activo de la empresa, también quien aprueba (RN-75, HU-116). Se guarda con la aprobación y el correo sale después, con reintentos (RN-78). Un procedimiento no avisa.

**Response 200 (`DocumentoDetalleResponseDto`):** igual que la generación, con la versión ya vigente (`aprobadaEn` y `aprobadaPorNombre` con valor) y `porCompletar` vacío.

**Errores:** 404 `documentos.no_encontrado` (también si es de otra empresa) · 409 `documentos.sin_borrador` (no tiene borrador: ya está aprobado) · 409 `documentos.por_completar` (quedan datos por completar) · 401 · 403.

#### `GET /api/documentos/vigentes?buscar=` (HU-074)

Para todas las personas de la empresa. Solo los documentos con versión vigente: los borradores y las versiones reemplazadas no aparecen. Primero las políticas y después los procedimientos, cada grupo por título. `buscar` (opcional, hasta 100) filtra por el título sin distinguir mayúsculas. `id` es el del documento y `vigenteDesde`, la fecha de aprobación.

```json
[{ "id": "01938100-....", "titulo": "Política SST 2026", "tipoDocumento": "politica", "numeroVersion": 2, "vigenteDesde": "2026-11-25T19:40:00Z" }]
```

**Errores:** 400 validación (`Buscar`) · 401 · 403.

#### `GET /api/documentos/vigentes/{id}` (HU-074)

La versión vigente del documento, solo con lo que se publica: sin plantilla, sin quién la generó y sin borradores.

```json
{
  "id": "01938100-....",
  "titulo": "Política SST 2026",
  "tipoDocumento": "politica",
  "numeroVersion": 2,
  "contenido": "# Política de seguridad y salud en el trabajo\n\n…",
  "vigenteDesde": "2026-11-25T19:40:00Z",
  "aprobadaPorNombre": "Sara Seguridad"
}
```

**PDF:** no hay endpoint. La web imprime la vista del documento (16-arquitectura §9): el navegador lo guarda como PDF o lo imprime, y no se guarda nada.

**Errores:** 404 `documentos.no_encontrado` (no existe, es de otra empresa o solo tiene un borrador) · 401 · 403.

#### `GET /api/documentos/{id}/pdf` (HU-076)

**Response 200:** `application/pdf`.

---

### Fuera de alcance (sin API) {#fuera-de-alcance-sin-api}

Recorte 13-11-2026 y prioridad WONT: **no se define contrato HTTP** (el front no debe llamarlos).

| HU | Motivo |
|---|---|
| HU-025, HU-027, HU-028 | Calendario Google, áreas, comisión |
| HU-053–061, HU-079, HU-082–086 | Comisión, actas, calendario externo |
| HU-062–069, HU-088 | Equipos, EPP, inventario |
| HU-077–078, HU-080 | Informes fuera del MVP actual (HU-052, las estadísticas de eventos, sí está en E2 y tiene contrato) |
| HU-105, HU-112, HU-113 | App móvil, distribución, Google Forms/Calendar |
| HU-101–104, HU-102 | Solo frontend / infra local |
| HU-098 | Pruebas automatizadas, no endpoint público |

Si una HU de esta lista vuelve al alcance, agregar fila al [índice maestro](#indice-maestro-de-rutas) y sección JSON aquí.

---

## Orden sugerido de implementación (coincide con el diagrama MVP)

1. HU-017 → HU-018 (✅) → HU-026  
2. HU-020, HU-115, HU-021  
3. HU-029 → HU-030 → HU-031 → HU-032 → HU-033  
4. HU-036 → HU-037 → HU-038  
5. HU-023 (catálogos plataforma) en paralelo si hay staff  
6. HU-098 (tests aislamiento)

Cada paso: **endpoint + fila en `CatalogoPermisos` + fila en este doc + request en colección Postman** (export JSON al repo cuando esté estable).
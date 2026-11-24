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
- **Plantillas:** `api/plantillas` son las plantillas de **documento** (políticas y procedimientos). Las plantillas de tarea no tienen API en HU-023.

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

Los filtros (`?rubroId=`, `?categoriaRiesgoId=`) son opcionales. Las listas incluyen los elementos desactivados, porque son pantallas de mantenimiento. Los catálogos iniciales vienen de HU-097 (`CatalogoBase`). Cuerpos JSON en el [anexo](#anexo-catalogos).

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
| HU-037 | POST | `api/riesgos/{id}/evaluaciones` | `CrearEvaluacionRequestDto` | `EvaluacionResponseDto` | `riesgo.evaluar` | `responsable_sst` | 🚧 |
| HU-038 | GET | `api/riesgos/matriz` | — | `MatrizRiesgosResponseDto` | `riesgo.matriz` | `admin_empresa`, `responsable_sst` | 🚧 |
| HU-035 | PATCH | `api/encuestas/{id}/peligros-sugeridos/{riesgoId}` | `RevisarPeligroSugeridoRequestDto` | `PeligroSugeridoRevisadoResponseDto` | `encuesta.peligro_sugerido.revisar` | `admin_empresa`, `responsable_sst` | ✅ |

---

## M3/M6 — Otros Should relevantes (Sprint 3+)

| HU | Método | Ruta | Notas | Estado |
|---|---|---|---|---|
| HU-047 | POST | `api/eventos` | Reportar accidente, incidente, enfermedad o condición insegura (anónimo) | ✅ |
| HU-047 | GET | `api/eventos` | Listar eventos de la empresa (`admin_empresa`, `responsable_sst`) con filtros | ✅ |
| HU-047 | GET | `api/eventos/{id}` | Detalle completo de evento (`admin_empresa`, `responsable_sst`) | ✅ |
| HU-047 | POST | `api/eventos/{id}/evidencias` | Adjuntar evidencias (`Archivo`; pendiente `HU-100` almacenamiento externo) | 🚧 |
| HU-039 | POST | `api/riesgos/{id}/controles` | Definir controles | 🚧 |
| HU-042–045 | varios | `api/plan-trabajo/...` | Plan de acción | 🚧 |
| HU-075 | GET | `api/riesgos/matriz/pdf` | Impresión matriz (M10) | 🚧 |

---

## Notificaciones y políticas (encuestado — ya en catálogo ejemplo)

| Permiso actual en seed | Método | Ruta | Rol |
|---|---|---|---|
| `notificacion.listar` | GET | `api/notificaciones` | `encuestado` |
| `politica.vigentes` | GET | `api/politicas/vigentes` | `encuestado` |

Implementación de endpoints: 🚧.

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
| HU-041 | GET | `/api/riesgos/{id}/historial` | — | JSON | Riesgos |
| HU-038 | GET | `/api/riesgos/matriz` | — | JSON | Riesgos |
| HU-075 | GET | `/api/riesgos/matriz/pdf` | — | PDF | Riesgos |
| HU-039 | POST | `/api/riesgos/{id}/controles` | JSON | `ControlResponseDto` | Riesgos |
| HU-039 | GET | `/api/riesgos/{id}/controles` | — | array | Riesgos |
| HU-042 | POST | `/api/plan-trabajo/generacion` | JSON | JSON | Plan |
| HU-043 | PATCH | `/api/plan-trabajo/tareas/{id}` | JSON | `TareaResponseDto` | Plan |
| HU-044 | GET | `/api/plan-trabajo/tareas/mias` | — | array | Plan |
| HU-044 | GET | `/api/plan-trabajo/tareas` | query | array | Plan |
| HU-045 | POST | `/api/plan-trabajo/tareas/{id}/evidencias` | multipart | JSON | Plan |
| HU-046 | GET | `/api/plan-trabajo/tareas` | filtros query | array | Plan |
| HU-047 | POST | `/api/eventos` | JSON | JSON | Eventos |
| HU-047 | POST | `/api/eventos/{id}/evidencias` | multipart | JSON | Eventos *(pendiente HU-100)* |
| HU-047 | GET | `/api/eventos` | query opcional | array | Eventos |
| HU-047 | GET | `/api/eventos/{id}` | — | JSON | Eventos |
| HU-049 | PATCH | `/api/eventos/{id}/investigacion` | JSON | JSON | Eventos |
| HU-049 | PATCH | `/api/eventos/{id}/descarte` | JSON | JSON | Eventos |
| HU-050 | POST | `/api/eventos/{id}/medidas-correctivas` | JSON | JSON | Eventos |
| HU-117 | GET | `/api/notificaciones` | — | array | Notificaciones |
| HU-117 | PATCH | `/api/notificaciones/{id}/lectura` | — | 204 | Notificaciones |
| encuestado | GET | `/api/politicas/vigentes` | — | array | Políticas |
| HU-070 | POST | `/api/documentos/generacion` | JSON | JSON | Documentos |
| HU-071 | PUT | `/api/documentos/{id}/borrador` | JSON | JSON | Documentos |
| HU-072 | POST | `/api/documentos/{id}/aprobacion` | — | JSON | Documentos |
| HU-074 | GET | `/api/documentos/vigentes` | — | array | Documentos |
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
    "tipoRespuesta": "seleccion_unica",
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
  "tipoRespuesta": "seleccion_unica",
  "obligatoria": true,
  "peligroId": "01933000-....",
  "opciones": [
    { "texto": "Sí, a menudo", "orden": 1, "indicaExposicion": true },
    { "texto": "No", "orden": 2, "indicaExposicion": false }
  ]
}
```

Reglas del **bloque de respuesta** (D7, D26, RN-68); el formulario del front aplica las mismas en su esquema Zod:

- `tipoRespuesta` es obligatorio.
- `respuesta_breve`: `opciones` vacía y sin `peligroId`.
- `seleccion_unica` y `seleccion_multiple`: de 2 a 20 opciones, sin `orden` ni texto repetidos.
- Con `peligroId`, al menos una opción con `indicaExposicion: true`; sin `peligroId`, ninguna.
- Categoría y peligro deben existir y estar activos.

`PATCH /api/preguntas/{id}` — `ActualizarPreguntaRequestDto`. Campos sueltos: `categoriaRiesgoId`, `texto`, `obligatoria`, `orden`. Si `orden` no se envía se conserva (o va al final si cambia de categoría); si otra pregunta ya lo tiene, responde 409 `catalogos.orden_ocupado`.

`tipoRespuesta`, `peligroId` y `opciones` forman **un bloque**: para cambiar cualquiera se envían `tipoRespuesta` y `opciones` juntos, y entonces un `peligroId` ausente significa "sin peligro". Las opciones se reemplazan completas y reciben `id` nuevos. Las encuestas ya generadas no cambian, porque guardan su propia copia (RN-12).

```json
{ "texto": "¿Con qué frecuencia levantas cargas pesadas?" }
```

```json
{
  "tipoRespuesta": "seleccion_unica",
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

#### `GET /api/riesgos` (HU-036) — ✅

Riesgos de la matriz de la empresa de la sesión: solo los `confirmado`, los más recientes primero.
- **Origen:** pueden venir de una encuesta (HU-035) o haberse agregado a mano.
- **Fuera de la matriz:** los sugeridos sin revisar y los descartados no aparecen (RN-18).

**Response 200:** `RiesgoResponseDto[]` (ver abajo).

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
  "actividad": "Bodega de carga"
}
```

- **Peligro:** se envía `peligroId` (del catálogo y activo) **o** `descripcionPeligro` (hasta 300 caracteres), no los dos.
- **`actividad`:** obligatoria, hasta 200 caracteres.

**Response 201** — `RiesgoResponseDto`

```json
{
  "id": "01935000-....",
  "estado": "confirmado",
  "peligroId": "01933000-....",
  "peligroNombre": "Caída al mismo nivel",
  "descripcionPeligro": null,
  "actividad": "Bodega de carga",
  "encuestaId": null,
  "encuestaTitulo": null,
  "creadoEn": "2026-11-16T12:00:00Z"
}
```

- **`peligroNombre`:** es null si el peligro se describió; entonces viene `descripcionPeligro`.
- **`encuestaId` y `encuestaTitulo`:** indican la encuesta que lo sugirió (HU-035); null si se agregó a mano.

**Errores:**

| HTTP | Cuándo |
|---|---|
| 400 `ValidationProblemDetails` | Falta el peligro, vienen los dos, falta la actividad o algún texto pasa su largo |
| 400 `riesgos.peligro_invalido` | El peligro no existe o está inactivo |
| 409 `riesgos.duplicado` | La matriz ya tiene ese peligro con la misma actividad (sin distinguir mayúsculas) |

#### `POST /api/riesgos/{id}/evaluaciones` — `CrearEvaluacionRequestDto`

```json
{
  "tipo": "inicial",
  "probabilidad": 3,
  "severidad": 4
}
```

**Response 201** — `EvaluacionResponseDto`

```json
{
  "id": "01935100-....",
  "tipo": "inicial",
  "probabilidad": 3,
  "severidad": 4,
  "nivel": 12,
  "clasificacion": "alto",
  "evaluadoEn": "2026-11-16T12:05:00Z"
}
```

`nivel` y `clasificacion` se **calculan** en servidor (RN-15, RN-16), no se persisten.

#### `GET /api/riesgos/matriz`

```json
{
  "riesgos": [
    {
      "id": "01935000-....",
      "peligroNombre": "Caída al mismo nivel",
      "estado": "confirmado",
      "evaluacionInicial": {
        "probabilidad": 3,
        "severidad": 4,
        "nivel": 12,
        "clasificacion": "alto"
      },
      "evaluacionResidual": null
    }
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

**Response 200:** `RiesgoResponseDto` (HU-036, en cualquier estado). HU-037 le agregará la última evaluación inicial y residual. **404** `riesgos.no_encontrado` si no existe o es de otra empresa.

#### `GET /api/riesgos/{id}/historial` (HU-041)

```json
{
  "riesgoId": "01935000-....",
  "eventos": [
    {
      "tipo": "creado",
      "fecha": "2026-11-16T12:00:00Z",
      "detalle": "Riesgo confirmado manualmente"
    },
    {
      "tipo": "evaluacion_inicial",
      "fecha": "2026-11-16T12:05:00Z",
      "probabilidad": 3,
      "severidad": 4,
      "nivel": 12
    }
  ]
}
```

#### `POST /api/riesgos/{id}/evaluaciones-residual` (HU-040)

Mismo body que evaluación inicial; `tipo` fijo `residual` en servidor o en body:

```json
{
  "probabilidad": 2,
  "severidad": 3
}
```

**Response 201:** `EvaluacionResponseDto` con `tipo`: `"residual"`.

#### `POST /api/riesgos/{id}/controles` (HU-039) — `CrearControlRequestDto`

```json
{
  "tipo": "administrativo",
  "descripcion": "Capacitación trimestral en ergonomía"
}
```

| `tipo` | `eliminacion` \| `sustitucion` \| `ingenieria` \| `administrativo` \| `epp` |

**Response 201:**

```json
{
  "id": "01935200-....",
  "riesgoId": "01935000-....",
  "tipo": "administrativo",
  "descripcion": "Capacitación trimestral en ergonomía",
  "estado": "propuesto",
  "creadoEn": "2026-11-16T13:00:00Z"
}
```

#### `GET /api/riesgos/{id}/controles`

**Response 200:** array de `ControlResponseDto`.

#### `GET /api/riesgos/matriz/pdf` (HU-075)

**Response 200:** `Content-Type: application/pdf` (bytes, sin JSON).

**Request:** sin cuerpo; header `Accept: application/pdf` recomendado.

---

### M5 — Plan de trabajo (HU-042 a HU-046) — 🚧

#### `POST /api/plan-trabajo/generacion` (HU-042)

**Request** — `GenerarPlanTrabajoRequestDto`:

```json
{
  "incluirControlesPropuestos": true,
  "incluirPlantillasRubro": true
}
```

**Response 201:**

```json
{
  "tareasCreadas": 15,
  "planId": "01935300-...."
}
```

#### `GET /api/plan-trabajo/tareas` (HU-043, HU-046)

**Query:** `estado=pendiente|en_progreso|completada`, `prioridad=1|2|3`, `responsableId={uuid}`

**Response 200:**

```json
[
  {
    "id": "01935400-....",
    "titulo": "Implementar señalización",
    "estado": "pendiente",
    "prioridad": 1,
    "fechaLimite": "2026-12-01",
    "responsableId": "01933f40-....",
    "responsableNombre": "Juan Pérez",
    "requiereEvidencia": true
  }
]
```

#### `GET /api/plan-trabajo/tareas/mias` (HU-044)

Mismo item que arriba; filtrado por vínculo del JWT.

#### `PATCH /api/plan-trabajo/tareas/{id}` — `ActualizarTareaRequestDto`

```json
{
  "estado": "en_progreso",
  "responsableId": "01933f40-....",
  "fechaLimite": "2026-12-15",
  "prioridad": 2
}
```

**Response 200:** `TareaResponseDto`.

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

### Notificaciones y políticas — 🚧

#### `GET /api/notificaciones`

```json
[
  {
    "id": "01936000-....",
    "titulo": "Nueva encuesta disponible",
    "cuerpo": "Diagnóstico 2026 ya puede responderse.",
    "leida": false,
    "creadaEn": "2026-11-16T09:00:00Z"
  }
]
```

#### `GET /api/politicas/vigentes`

```json
[
  {
    "id": "01937000-....",
    "titulo": "Política de seguridad 2026",
    "version": 2,
    "publicadaEn": "2026-01-10"
  }
]
```

#### `PATCH /api/notificaciones/{id}/lectura` (HU-117)

**Request:** sin cuerpo.

**Response 204.**

---

### M6 — Eventos y accidentes (HU-047 ✅ base, evidencias 🚧 HU-100; HU-049, HU-050 🚧)

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
| `fechaHoraEvento` | ISO-8601 UTC obligatorio; no puede ser futura (margen de 5 min por desfase de reloj) |
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

#### `GET /api/eventos/{id}` (HU-047 — ✅)

**Auth:** Bearer de empresa (`evento.ver`: `admin_empresa`, `responsable_sst`).

**Response 200 (`EventoDetalleResponseDto`):** detalle completo (`id`, `tipo`, `estado`, `estadoEnfermedad`, `esGrave`, `fechaHoraEvento`, `lugar`, `descripcion` completa, `registradoEn`). Adjuntos (`HU-100`) e investigación/cierre (`HU-049`) se integrarán al implementar dichas HUs; nunca incluye datos de quien reportó.

**Errores:** 404 `eventos.no_encontrado` · 401 · 403.

#### `PATCH /api/eventos/{id}/investigacion` (HU-049) — `ActualizarInvestigacionRequestDto`

Roles: `responsable_sst`.

```json
{
  "causasInmediatas": "Piso mojado sin señalización",
  "causasBasicas": "Falta de procedimiento de limpieza",
  "conclusiones": "Capacitar al personal de limpieza y colocar conos",
  "fechaInvestigacion": "2026-11-15"
}
```

**Response 200:** evento actualizado (`estado`: `"en_investigacion"` o `"cerrado"` si cumple `RN-28`).

#### `PATCH /api/eventos/{id}/descarte` (HU-049) — `DescartarEventoRequestDto`

Roles: `responsable_sst`. Marca un reporte inválido o duplicado como `descartado` sin requerir investigación ni medidas (`RN-28`).

```json
{
  "motivo": "Reporte duplicado del incidente en empaque"
}
```

**Response 200:** evento con `estado`: `"descartado"`, `motivoDescarte` y `descartadoEn`.

#### `POST /api/eventos/{id}/medidas-correctivas` (HU-050)

```json
{
  "descripcion": "Instalar señalización de piso mojado",
  "fechaLimite": "2026-11-30",
  "responsableId": "01933f40-...."
}
```

**Response 201:** crea `Tarea` vinculada al evento.

---

### M10 — Documentos (HU-070 a HU-074, HU-076) — 🚧

#### `POST /api/documentos/generacion` (HU-070)

```json
{
  "plantillaDocumentoId": "01938000-....",
  "titulo": "Política SST 2026"
}
```

**Response 201:**

```json
{
  "id": "01938100-....",
  "titulo": "Política SST 2026",
  "estado": "borrador",
  "versionNumero": 1
}
```

#### `PUT /api/documentos/{id}/borrador` (HU-071)

```json
{
  "contenidoMarkdown": "# Política\n\nLa empresa se compromete..."
}
```

**Response 200:** documento actualizado.

#### `POST /api/documentos/{id}/aprobacion` (HU-072)

Sin body. **Response 200:** `{ "id": "...", "estado": "vigente", "aprobadoEn": "..." }`

#### `GET /api/documentos/vigentes` (HU-074)

```json
[
  {
    "id": "01938100-....",
    "titulo": "Política SST 2026",
    "tipo": "politica_sst",
    "versionNumero": 2,
    "vigenteDesde": "2026-01-15"
  }
]
```

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
| HU-052, HU-077–078, HU-080 | Estadísticas e informes fuera del MVP actual |
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
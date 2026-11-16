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
| HU-098 | — | pruebas integración | — | — | — | — | 🚧 |

`SesionResponseDto`: `{ accessToken, refreshToken, expiresIn }`.

---

## M1 — Empresa y acceso (Must)

### HU-017 | Registrar empresa (+ primer admin)

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| POST | `api/empresas` | `RegistrarEmpresaRequestDto` | `RegistrarEmpresaResponseDto` | — `[AllowAnonymous]` o flujo registro | — | 🚧 |

**RegistrarEmpresaRequestDto (propuesta):** `razonSocial`, `rtn`, `email`, `password`, datos mínimos legales.  
**RegistrarEmpresaResponseDto:** `idEmpresaCifrado` (para login empresa), datos públicos de empresa.

Transacción: `Empresa` + `Persona` + `Acceso` + `VinculoEmpresa` con `admin_empresa` (D2).

### HU-020 | Alta de vínculos

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| POST | `api/vinculos` | `CrearVinculoRequestDto` | `VinculoResponseDto` | `vinculo.crear` | `admin_empresa` | 🚧 |

**CrearVinculoRequestDto:** `email`, `nombrePersona`, `rolCodigo`, …

### HU-021 | Gestionar acceso (rol / estado)

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| PATCH | `api/vinculos/{id}` | `ActualizarVinculoRequestDto` | `VinculoResponseDto` | `vinculo.actualizar` | `admin_empresa` | 🚧 |

**ActualizarVinculoRequestDto:** `rolCodigo?`, `estado?`, `motivoCodigo?` (si suspende/baja).

### HU-115 | Cuentas encuestados (Must)

| Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|
| POST | `api/vinculos/encuestados` | `CrearEncuestadoRequestDto` | `VinculoResponseDto` | `vinculo.encuestado.crear` | `admin_empresa` | 🚧 |
| POST | `api/vinculos/encuestados/lote` | `CrearEncuestadosLoteRequestDto` | `CrearEncuestadosLoteResponseDto` | `vinculo.encuestado.lote` | `admin_empresa` | 🚧 |

Rol fijo `encuestado` en servidor.

---

## M1 — Catálogos plataforma (Should en HU-023, Must en issues Back)

Prefijo sugerido: `api/plataforma/...`, alcance **plataforma**, rol típico `admin_plataforma`.

| Recurso | GET listar | POST crear | PATCH actualizar | Desactivar | Estado |
|---|---|---|---|---|---|
| Rubros | `api/plataforma/rubros` | `api/plataforma/rubros` | `api/plataforma/rubros/{id}` | `DELETE` o `PATCH` estado | 🚧 |
| Categorías riesgo | `.../categorias-riesgo` | … | … | … | 🚧 |
| Preguntas | `.../preguntas` | … | … | … | 🚧 |
| Peligros | `.../peligros` | … | … | … | 🚧 |
| Plantillas | `.../plantillas` | … | … | … | 🚧 |

DTOs: `CrearRubroRequestDto`, `RubroResponseDto`, etc. (un par por recurso). Los catálogos fijos iniciales vienen de HU-097 (`CatalogoBase`); estos endpoints son **mantenimiento** autorizado.

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

### HU-029 | Categorías por rubro

| Método | Ruta | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|
| GET | `api/encuestas/categorias-disponibles` | `CategoriaRiesgoResponseDto[]` | `encuesta.categoria.listar` | `responsable_sst` | 🚧 |

Filtrado por `rubroId` de la empresa del tenant (JWT).

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

### HU-033 | Peligros sugeridos (Must en doc / Should en tablero)

| Método | Ruta | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|
| GET | `api/encuestas/{id}/peligros-sugeridos` | `PeligroSugeridoResponseDto[]` | `encuesta.peligros_sugeridos` | `responsable_sst` | 🚧 |

---

## M4 — Matriz de riesgos (Should en tablero, Must en doc E1)

| HU | Método | Ruta | Request | Response | Permiso | Roles | Estado |
|---|---|---|---|---|---|---|---|
| HU-036 | POST | `api/riesgos` | `CrearRiesgoRequestDto` | `RiesgoResponseDto` | `riesgo.crear` | `responsable_sst` | 🚧 |
| HU-037 | POST | `api/riesgos/{id}/evaluaciones` | `CrearEvaluacionRequestDto` | `EvaluacionResponseDto` | `riesgo.evaluar` | `responsable_sst` | 🚧 |
| HU-038 | GET | `api/riesgos/matriz` | — | `MatrizRiesgosResponseDto` | `riesgo.matriz` | `admin_empresa`, `responsable_sst` | 🚧 |
| HU-035 | POST | `api/riesgos/sugeridos/{id}/confirmacion` | — | `RiesgoResponseDto` | `riesgo.confirmar_sugerido` | `responsable_sst` | 🚧 |

---

## M3/M6 — Otros Should relevantes (Sprint 3+)

| HU | Método | Ruta | Notas | Estado |
|---|---|---|---|---|
| HU-047 | POST | `api/eventos` | Reportar accidente/incidente | 🚧 |
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
| HU-114 | Política contraseñas (validador) | 🚧 parcial (validators 8+ chars) |

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
| HU-020 | POST | `/api/vinculos` | JSON | `VinculoResponseDto` | Vínculos |
| HU-021 | GET | `/api/vinculos` | — | array | Vínculos |
| HU-021 | GET | `/api/vinculos/{id}` | — | `VinculoResponseDto` | Vínculos |
| HU-021 | PATCH | `/api/vinculos/{id}` | JSON | `VinculoResponseDto` | Vínculos |
| HU-115 | POST | `/api/vinculos/encuestados` | JSON | `VinculoResponseDto` | Vínculos |
| HU-115 | POST | `/api/vinculos/encuestados/lote` | JSON | `CrearEncuestadosLoteResponseDto` | Vínculos |
| HU-023 | GET/POST/PATCH | `/api/plataforma/rubros`… | JSON | ver catálogos | Catálogos |
| HU-023 | * | `/api/plataforma/categorias-riesgo`… | JSON | ver catálogos | Catálogos |
| HU-023 | * | `/api/plataforma/preguntas`… | JSON | ver catálogos | Catálogos |
| HU-023 | * | `/api/plataforma/peligros`… | JSON | ver catálogos | Catálogos |
| HU-023 | * | `/api/plataforma/plantillas-documento`… | JSON | ver catálogos | Catálogos |
| HU-024 | GET | `/api/plataforma/empresas` | — | array | Catálogos |
| HU-029 | GET | `/api/encuestas/categorias-disponibles` | — | array | Encuestas |
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
| HU-033 | GET | `/api/encuestas/{id}/peligros-sugeridos` | — | array | Reporte |
| HU-035 | POST | `/api/riesgos/sugeridos/{id}/confirmacion` | — | `RiesgoResponseDto` | Riesgos |
| HU-035 | POST | `/api/riesgos/sugeridos/{id}/descarte` | JSON opc. | `RiesgoResponseDto` | Riesgos |
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
| HU-047 | GET | `/api/eventos` | — | array | Eventos |
| HU-049 | PATCH | `/api/eventos/{id}/investigacion` | JSON | JSON | Eventos |
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
| `accessToken` | string | JWT (Bearer) |
| `refreshToken` | string | Opaco; solo en body, no en header |
| `expiresIn` | int | Segundos de vida del access token |

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "8f3c2a1b-....",
  "expiresIn": 900
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

#### Contraseña (HU-022, HU-114) — 🚧

##### `POST /api/auth/contrasena/solicitud` — `SolicitarCambioContrasenaRequestDto`

**Request:**

```json
{
  "email": "operador@miempresa.hn"
}
```

**Response 202** (siempre genérico, sin revelar si el correo existe):

```json
{
  "mensaje": "Si el correo está registrado, recibirá instrucciones."
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

**Response 204.** **Errores:** 400 política HU-114 · 410 token expirado.

##### `POST /api/auth/contrasena/establecer` — `EstablecerContrasenaRequestDto` (primer ingreso / temporal)

**Request:**

```json
{
  "contrasenaActual": "Temporal123456",
  "contrasenaNueva": "NuevaContraseñaSegura1"
}
```

**Auth:** Bearer obligatorio.

**Response 204.**

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
| `password` | string | 8–64 (HU-114 cuando esté completo) |
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

### M1 — Vínculos (HU-020, HU-021, HU-115) — 🚧

**Auth:** Bearer (sesión **empresa**), rol `admin_empresa`.

#### `POST /api/vinculos` — `CrearVinculoRequestDto`

```json
{
  "email": "colaborador@miempresa.hn",
  "primerNombre": "Juan",
  "primerApellido": "Pérez",
  "rolCodigo": "colaborador",
  "passwordTemporal": "Temporal123456"
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `rolCodigo` | string | `admin_empresa`, `responsable_sst`, `colaborador`, `encuestado` |
| `passwordTemporal` | string? | Si la cuenta es nueva; encuestados suelen requerir cambio en primer login |

**Response 201** — `VinculoResponseDto`

```json
{
  "id": "01933f40-....",
  "personaId": "01933f41-....",
  "email": "colaborador@miempresa.hn",
  "nombreCompleto": "Juan Pérez",
  "rolCodigo": "colaborador",
  "estado": "activo",
  "creadoEn": "2026-11-16T02:30:00Z"
}
```

#### `PATCH /api/vinculos/{id}` — `ActualizarVinculoRequestDto`

Todos los campos opcionales; enviar solo lo que cambia.

```json
{
  "rolCodigo": "responsable_sst",
  "estado": "suspendido",
  "motivoCodigo": "decision_admin",
  "motivoDetalle": "Licencia prolongada"
}
```

| `estado` | `activo` \| `suspendido` \| `baja` |
| `motivoCodigo` | Obligatorio si `estado` ≠ `activo` |

**Response 200:** `VinculoResponseDto` actualizado.

#### `GET /api/vinculos`

**Query opcional:** `estado=activo|suspendido|baja`, `rolCodigo=...`

**Response 200:**

```json
[
  {
    "id": "01933f40-....",
    "email": "colaborador@miempresa.hn",
    "nombreCompleto": "Juan Pérez",
    "rolCodigo": "colaborador",
    "estado": "activo",
    "creadoEn": "2026-11-16T02:30:00Z"
  }
]
```

#### `GET /api/vinculos/{id}`

**Response 200:** un `VinculoResponseDto` (mismo shape que POST).

#### `POST /api/vinculos/encuestados` — `CrearEncuestadoRequestDto`

**Request** (sin `rolCodigo`; servidor asigna `encuestado`):

```json
{
  "email": "trabajador@miempresa.hn",
  "primerNombre": "Pedro",
  "primerApellido": "García",
  "passwordTemporal": "Temporal123456"
}
```

**Response 201:** `VinculoResponseDto` con `rolCodigo`: `"encuestado"`.

#### `POST /api/vinculos/encuestados/lote` — `CrearEncuestadosLoteRequestDto`

```json
{
  "filas": [
    { "email": "a@miempresa.hn", "primerNombre": "Ana", "primerApellido": "Ruiz" },
    { "email": "correo-invalido", "primerNombre": "X", "primerApellido": "Y" }
  ]
}
```

**Response 200** — `CrearEncuestadosLoteResponseDto`

```json
{
  "creados": 1,
  "errores": [
    {
      "fila": 2,
      "email": "correo-invalido",
      "codigo": "vinculo.email_invalido",
      "mensaje": "El correo no es válido."
    }
  ]
}
```

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

### M1 — Catálogos plataforma (HU-023 / HU-024) — 🚧

**Auth:** Bearer sesión **plataforma**, rol `admin_plataforma`.

Patrón CRUD (ejemplo **rubros**); el resto de recursos replica la misma forma.

#### `GET /api/plataforma/rubros`

```json
[
  { "id": 1, "codigo": "industria", "nombre": "Industria", "activo": true },
  { "id": 2, "codigo": "comercio", "nombre": "Comercio", "activo": true }
]
```

#### `POST /api/plataforma/rubros` — `CrearRubroRequestDto`

```json
{
  "codigo": "servicios",
  "nombre": "Servicios"
}
```

**Response 201** — `RubroResponseDto`: `{ "id": 3, "codigo": "servicios", "nombre": "Servicios", "activo": true }`

#### `PATCH /api/plataforma/rubros/{id}`

```json
{
  "nombre": "Servicios y oficios",
  "activo": false
}
```

#### `GET /api/plataforma/categorias-riesgo`

**Response 200:**

```json
[
  {
    "id": "01934000-....",
    "rubroId": 2,
    "nombre": "Riesgos ergonómicos",
    "activo": true
  }
]
```

#### `POST /api/plataforma/categorias-riesgo` — `CrearCategoriaRiesgoRequestDto`

```json
{
  "rubroId": 2,
  "nombre": "Riesgos químicos"
}
```

**Response 201:** `{ "id": "...", "rubroId": 2, "nombre": "Riesgos químicos", "activo": true }`

#### `PATCH /api/plataforma/categorias-riesgo/{id}`

```json
{ "nombre": "Riesgos por sustancias", "activo": true }
```

**Response 200:** recurso actualizado.

#### `GET /api/plataforma/preguntas?categoriaRiesgoId={uuid}`

**Response 200:**

```json
[
  {
    "id": "01934150-....",
    "categoriaRiesgoId": "01934000-....",
    "texto": "¿Mantienes posturas forzadas?",
    "tipoRespuesta": "seleccion_unica",
    "peligroId": "01933000-....",
    "activo": true,
    "opciones": [
      { "id": "...", "texto": "Sí, a menudo", "orden": 1, "indicaExposicion": true },
      { "id": "...", "texto": "No", "orden": 2, "indicaExposicion": false }
    ]
  }
]
```

#### `POST /api/plataforma/preguntas` — `CrearPreguntaRequestDto`

```json
{
  "categoriaRiesgoId": "01934000-....",
  "texto": "¿Levantas cargas mayores a 25 kg?",
  "tipoRespuesta": "seleccion_unica",
  "peligroId": "01933000-....",
  "opciones": [
    { "texto": "Sí", "orden": 1, "indicaExposicion": true },
    { "texto": "No", "orden": 2, "indicaExposicion": false }
  ]
}
```

**Response 201:** pregunta con `id` y `opciones[]` con `id` generados.

#### `PATCH /api/plataforma/preguntas/{id}`

```json
{
  "texto": "Texto actualizado",
  "activo": false
}
```

**Response 200.**

#### `GET /api/plataforma/peligros`

**Response 200:** `[{ "id": "...", "codigo": "caida_mismo_nivel", "nombre": "Caída al mismo nivel", "activo": true }]`

#### `POST /api/plataforma/peligros` — `CrearPeligroRequestDto`

```json
{
  "codigo": "contacto_electrico",
  "nombre": "Contacto eléctrico",
  "descripcion": "Exposición a energía eléctrica"
}
```

**Response 201.**

#### `PATCH /api/plataforma/peligros/{id}` — body parcial; **Response 200.**

#### `GET /api/plataforma/plantillas-documento`

```json
[{ "id": "...", "rubroId": 2, "tipo": "politica_sst", "nombre": "Política SST base", "activo": true }]
```

#### `POST /api/plataforma/plantillas-documento`

```json
{
  "rubroId": 2,
  "tipo": "procedimiento",
  "nombre": "Procedimiento EPP",
  "contenidoMarkdown": "# Uso de EPP\n..."
}
```

**Response 201:** incluye `id`.

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

#### `GET /api/encuestas/categorias-disponibles` (HU-029)

Usa el rubro de la empresa del JWT (no enviar `empresaId` en query).

**Response 200:**

```json
[
  {
    "id": "01934000-....",
    "nombre": "Riesgos ergonómicos",
    "preguntasPreview": [
      { "id": "...", "texto": "¿Mantienes posturas forzadas?", "tipoRespuesta": "seleccion_unica" }
    ]
  }
]
```

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

#### `GET /api/encuestas/{id}/peligros-sugeridos`

```json
[
  {
    "riesgoSugeridoId": "01934200-....",
    "peligroId": "01933000-....",
    "peligroNombre": "Caída al mismo nivel",
    "preguntaId": "01934110-....",
    "respuestasConExposicion": 8
  }
]
```

---

### M4 — Matriz (HU-036–038, HU-035) — 🚧

#### `POST /api/riesgos` — `CrearRiesgoRequestDto`

```json
{
  "peligroId": "01933000-....",
  "descripcionPeligro": null,
  "actividad": "Bodega de carga"
}
```

Uno de `peligroId` o `descripcionPeligro` obligatorio.

**Response 201** — `RiesgoResponseDto`

```json
{
  "id": "01935000-....",
  "estado": "confirmado",
  "peligroId": "01933000-....",
  "peligroNombre": "Caída al mismo nivel",
  "actividad": "Bodega de carga",
  "creadoEn": "2026-11-16T12:00:00Z"
}
```

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

#### `POST /api/riesgos/sugeridos/{id}/confirmacion` (HU-035)

Body vacío. Pasa `estado` de `sugerido` → `confirmado`.

**Response 200:** `RiesgoResponseDto` actualizado.

#### `POST /api/riesgos/sugeridos/{id}/descarte` (HU-035)

**Request opcional:**

```json
{ "motivo": "No aplica a nuestra operación" }
```

**Response 200:** `RiesgoResponseDto` con `estado`: `"descartado"`.

#### `GET /api/riesgos/{id}`

**Response 200:** `RiesgoResponseDto` + última evaluación inicial/residual embebida.

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

### M6 — Eventos y accidentes (HU-047, HU-049, HU-050) — 🚧

#### `POST /api/eventos` — `ReportarEventoRequestDto`

```json
{
  "tipo": "incidente",
  "ocurridoEn": "2026-11-14",
  "descripcion": "Resbalón en pasillo sin señalizar",
  "severidadAparente": "leve"
}
```

| `tipo` | `accidente` \| `incidente` \| `casi_accidente` |

**Response 201:**

```json
{
  "id": "01935600-....",
  "tipo": "incidente",
  "estado": "registrado",
  "ocurridoEn": "2026-11-14",
  "registradoEn": "2026-11-15T09:00:00Z"
}
```

#### `GET /api/eventos`

**Response 200:** array resumen (`id`, `tipo`, `estado`, `ocurridoEn`, `descripcion` corta).

#### `GET /api/eventos/{id}`

**Response 200:** detalle completo + investigación si existe.

#### `PATCH /api/eventos/{id}/investigacion` (HU-049) — `ActualizarInvestigacionRequestDto`

```json
{
  "estado": "en_investigacion",
  "hallazgos": "Piso mojado sin señalización",
  "causaRaiz": "Falta de procedimiento de limpieza"
}
```

**Response 200:** evento actualizado.

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
# Guía: añadir rutas al catálogo de permisos y probarlas

**Para qué sirve:** pasos concretos cuando el equipo **crea un endpoint nuevo** en `ProyectoFinal/backend`: registrar la ruta en el seed, asignar roles y probar con Postman/Scalar.

**Código:** `Norvia.Infrastructure/Persistence/Seed/CatalogoPermisos.cs` → `PermisosSeeder` (al arrancar la API).  
**Arquitectura:** [16-arquitectura-backend-frontend.md](16-arquitectura-backend-frontend.md) · **Actores:** [05-actores-roles.md](05-actores-roles.md).

---

## 1. Qué hace el middleware

Antes del controller, `AutorizacionPermisosMiddleware` + `PermitirAccesoRecursoServicio`:

1. Si el endpoint tiene `[AllowAnonymous]` → no evalúa permisos.
2. Si no hay JWT → **401** `auth.no_autenticado`.
3. Busca en BD un `Permiso` activo con mismo **método HTTP** y **ruta patrón**.
4. Compara **alcance** de la sesión con el del permiso (empresa vs plataforma).
5. Pregunta si el **rol** del vínculo o del staff tiene ese permiso (`RolPermiso` / `RolStaffPlataformaPermiso`).

| Resultado | HTTP | `codigo` | Mensaje (`title` en ProblemDetails) |
|---|---|---|---|
| Ruta no catalogada o permiso inactivo | **404** | `permiso.no_disponible` | La ruta no está registrada. Contacte con un administrador. |
| Catalogada, rol/alcance no alcanza | **403** | `permiso.prohibido` | No tiene permiso para realizar esta acción. |
| Sin JWT en ruta protegida | **401** | `auth.no_autenticado` | Debe iniciar sesión. |

El body siempre es **RFC 7807** (`application/problem+json`), con extensión `codigo`.

---

## 2. Checklist al crear un endpoint

1. Implementar slice: `Features/<Modulo>/<Caso>/` con `DTOs/`, `Validators/`, `*Servicio`, `I*Repositorio` (ver doc 16).
2. Action en el controller con el verbo y ruta definitivos.
3. **Añadir fila** en `CatalogoPermisos.Todos` (mismo commit que el endpoint).
4. Reiniciar API → `PermisosSeeder` sincroniza `Permiso` + asignaciones a roles.
5. Registrar el contrato en [18-contratos-api-mvp.md](18-contratos-api-mvp.md).
6. Probar con JWT del rol correcto (ver §5).

---

## 3. Cómo escribir la fila en `CatalogoPermisos`

Archivo: `Norvia.Infrastructure/Persistence/Seed/CatalogoPermisos.cs`.

```csharp
// Empresa → roles de VinculoEmpresa: admin_empresa, responsable_sst, colaborador, encuestado
Empresa("encuesta.publicar", "Publicar encuesta", "POST", "api/encuestas/{id}/versiones/{versionId}/publicacion",
    "responsable_sst");

// Plataforma → admin_plataforma, soporte_plataforma, …
Plataforma("catalogo.rubro.actualizar", "Actualizar rubro", "PATCH", "api/plataforma/rubros/{id}",
    "admin_plataforma");
```

| Campo | Regla |
|---|---|
| `Codigo` | Único y estable: `modulo.accion` |
| `Metodo` | Igual que `[HttpGet]`, `[HttpPost]`, … |
| `Ruta` | Patrón **sin** `/` inicial; `{id}` en minúscula (el seeder normaliza constraints `:guid`) |
| `Roles` | Quién **puede** llamar el endpoint; no es asignación a una persona (eso es `VinculoEmpresa.RolId` vía HU-021) |

**Varios roles en el mismo permiso:**

```csharp
Empresa("riesgo.listar", "Listar riesgos", "GET", "api/riesgos", "admin_empresa", "responsable_sst");
```

**Quitar un permiso:** borrarlo de `Todos`; en el próximo arranque queda `Activo = false` (Code First, sin SQL manual).

**Validación:** códigos duplicados o mismo par verbo+ruta → la API **falla al iniciar** (error en `ValidarCatalogo`).

### Alinear ruta con ASP.NET

| Controller | En catálogo |
|---|---|
| `[Route("api/encuestas")]` + `[HttpPost("{id}/respuestas")]` | `api/encuestas/{id}/respuestas` |
| `[Route("api/prueba")]` + `[HttpGet("plataforma")]` | `api/prueba/plataforma` |

Misma función que usa el middleware: `RutaNormalizada.De` en `Features/AccesoRecurso/RutaNormalizada.cs`.

---

## 4. Permiso vs persona (rol)

- **Desarrollo (seed):** define qué **roles** pueden usar cada ruta.
- **Admin empresa (HU-021):** asigna **rol** a cada vínculo (`encuestado`, `responsable_sst`, …).
- **Staff plataforma** no recibe permisos `Alcance = empresa`.

No hay endpoint para “editar la matriz RolPermiso” en runtime.

---

## 5. Pruebas rápidas (Postman)

Base: `http://localhost:5167`.

### Auth (sin permiso de catálogo)

| Método | Ruta | Body |
|---|---|---|
| POST | `/api/auth/login/plataforma` | `{ "email", "password" }` |
| POST | `/api/auth/login/empresa` | `{ "email", "password", "idEmpresa" }` |
| POST | `/api/auth/refresh` | `{ "refreshToken" }` |
| POST | `/api/auth/logout` | `{ "refreshToken" }` |

Staff seed: variables `StaffSeed__*` en `Norvia.API/.env`.

### Rutas protegidas

Header: `Authorization: Bearer {{accessToken}}`.

| GET | Comportamiento esperado |
|---|---|
| `/api/prueba/plataforma` | 200 con staff `admin_plataforma` |
| `/api/prueba/empresa` | 403 (staff no tiene alcance empresa) |
| `/api/prueba/sin-permiso` | 404 + mensaje ruta no registrada |

**Variables automáticas** (script post-response en login):

```js
const res = pm.response.json();
pm.environment.set("accessToken", res.accessToken);
pm.environment.set("refreshToken", res.refreshToken);
```

Collection → Auth → Bearer → `{{accessToken}}`.

---

## 6. Errores frecuentes

- **405:** verbo incorrecto (login = POST).
- **404 permiso** con ruta “correcta”: falta fila en `CatalogoPermisos` o API sin reiniciar.
- **403** con catálogo bien: rol del vínculo no está en el array `Roles` del permiso.
- Staff llama API de empresa: 403 por cruce de alcance.

---

## 7. Relación con contratos MVP

Cada fila nueva de `CatalogoPermisos` debe tener su par en [18-contratos-api-mvp.md](18-contratos-api-mvp.md) (método, ruta, DTOs, roles, estado).
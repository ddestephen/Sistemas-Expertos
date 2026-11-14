# Arquitectura del backend y del frontend

**Para qué sirve:** fija las reglas de Clean Architecture y Vertical Slicing que debe seguir todo el código de Norvia (backend .NET y frontend React). Sirve de referencia al programar, al revisar un PR y al defender la arquitectura ante la rúbrica del [curso](02-requisitos-curso.md).

Es un documento técnico: aquí sí se nombran tecnologías.

**Decisiones del equipo (13-11-2026):**
- **Un servicio por caso de uso** (`LoginEmpresaServicio`), no un servicio por módulo, y sin MediatR.
- **Un repositorio por caso de uso**, más una **unidad de trabajo** (`IUnidadDeTrabajo`) que controla el guardado.
- **FluentValidation** es la única forma de validar las entradas.

---

## 1. Capas y dependencias permitidas

La solución `backend/Norvia.slnx` tiene 4 proyectos. Las flechas indican quién puede referenciar a quién; **nunca al revés**.

```text
Norvia.API ──► Norvia.Application ──► Norvia.Domain
     │                 ▲
     └──► Norvia.Infrastructure ──┘
```

| Proyecto | Puede referenciar | Paquetes permitidos | Contiene | No puede contener |
|---|---|---|---|---|
| `Norvia.Domain` | Nada | Ninguno | Entidades, enums, `ITieneEmpresa` y reglas puras de una entidad | EF Core, ASP.NET, FluentValidation, DTOs |
| `Norvia.Application` | Domain | `FluentValidation`, `FluentValidation.DependencyInjectionExtensions`, `Microsoft.Extensions.DependencyInjection.Abstractions` | Slices (casos de uso), sus interfaces de repositorio, validadores, DTOs, abstracciones comunes y `Resultado<T>` | `DbContext`, `Include`, `IConfiguration`, `HttpContext`, criptografía concreta |
| `Norvia.Infrastructure` | Application (y Domain por transitividad) | EF Core, Npgsql, `System.IdentityModel.Tokens.Jwt`, hash de contraseñas | `NorviaDbContext`, configuraciones, migraciones, repositorios, `UnidadDeTrabajo`, seeders, generación de JWT, cifrado y reloj | Controllers, middleware, configuración del pipeline HTTP |
| `Norvia.API` | Application e Infrastructure (solo en `Program.cs` y en las extensiones de registro) | ASP.NET Core, `Microsoft.AspNetCore.Authentication.JwtBearer`, OpenAPI/Scalar, DotNetEnv | `Program.cs`, controllers, middleware de errores, filtro de validación, `AddJwtBearer`, implementación de `ITenantActual` | Lógica de negocio, consultas a la base |

Reglas:

1. **Los controllers solo usan tipos de Application** (requests, responses y servicios), nunca de Infrastructure.
2. **Una interfaz se declara donde se usa.** Si la usa un solo slice, va en ese slice; si la usan dos o más, va en `Application/Common/Interfaces`. Siempre la implementa Infrastructure (o API, si depende de HTTP).
3. **Ningún servicio lee `IConfiguration`.** La configuración entra con el patrón Options (sección 8).

## 2. Estructura de carpetas

```text
backend/
├── Norvia.Domain/
│   ├── Common/                 ITieneEmpresa
│   ├── Entities/<Area>/        Acceso, Empresas, Catalogos, Riesgos, Encuestas…
│   └── Enums/
├── Norvia.Application/
│   ├── Common/
│   │   ├── Interfaces/         IUnidadDeTrabajo, ITenantActual, IReloj, IHasherPassword,
│   │   │                       ICifradorEmpresaId, ITokenServicio
│   │   ├── Resultados/         Resultado, Resultado<T>, Error, TipoError
│   │   ├── Seguridad/          SesionToken
│   │   └── CasosDeUso/         IServicioCasoDeUso (marcador)
│   ├── Features/
│   │   └── <Modulo>/           Auth, Empresas, Vinculos, Encuestas, Riesgos…
│   │       ├── Errores.cs      errores del módulo (y otras piezas compartidas solo por sus slices)
│   │       └── <CasoDeUso>/    LoginEmpresa, RefrescarSesion, CrearRiesgo…
│   └── DependencyInjection.cs
├── Norvia.Infrastructure/
│   ├── Persistence/
│   │   ├── Configurations/<Area>/
│   │   ├── Conversiones/
│   │   ├── Interceptores/      AsignarEmpresaInterceptor
│   │   ├── Migrations/
│   │   ├── Repositorios/<Modulo>/   LoginEmpresaRepositorio…
│   │   ├── Seed/               StaffSeeder, InicializacionBaseDatos (se llama desde Program.cs)
│   │   ├── NorviaDbContext.cs
│   │   └── UnidadDeTrabajo.cs
│   ├── Seguridad/              JwtTokenServicio, CifradorEmpresaId, HasherPassword
│   ├── Tiempo/                 RelojBaseDatos
│   ├── Opciones/               JwtOpciones, CifradoOpciones, StaffSeedOpciones
│   └── DependencyInjection.cs
└── Norvia.API/
    ├── Controllers/            <Modulo>Controller (delgados)
    ├── Middleware/             ManejoErroresMiddleware
    ├── Filtros/                ValidacionFiltro
    ├── Seguridad/              TenantActual (lee el JWT)
    ├── Extensiones/            ResultadoExtensiones (Resultado → IActionResult), AutenticacionExtensiones
    └── Program.cs
```

## 3. Anatomía de un slice

Un **slice** es una carpeta con todo lo que necesita **un** caso de uso. No se divide por tipo técnico: no hay subcarpetas `DTOs/`, `Interfaces/` ni `Validators/` dentro de un módulo.

| Archivo | Qué es |
|---|---|
| `<CasoDeUso>Request.cs` | Datos de entrada (record) |
| `<CasoDeUso>Response.cs` | Datos de salida (record). Se omite si el caso de uso no devuelve datos |
| `<CasoDeUso>Validator.cs` | `AbstractValidator<<CasoDeUso>Request>` de FluentValidation |
| `I<CasoDeUso>Repositorio.cs` | Solo las consultas y altas que necesita este caso de uso |
| `<CasoDeUso>Servicio.cs` | Las reglas de negocio. Un único método `EjecutarAsync` |

### Ejemplo: `Features/Auth/LoginEmpresa/`

```csharp
// LoginEmpresaRequest.cs
public sealed record LoginEmpresaRequest(string Email, string Password, string IdEmpresa);

// Respuesta: los tres slices que abren o renuevan sesión devuelven la misma forma,
// así que vive a nivel de módulo (Features/Auth/SesionResponse.cs).
public sealed record SesionResponse(string AccessToken, string RefreshToken, int ExpiresIn);

// LoginEmpresaValidator.cs
public sealed class LoginEmpresaValidator : AbstractValidator<LoginEmpresaRequest>
{
    public LoginEmpresaValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
        RuleFor(x => x.IdEmpresa).NotEmpty();
    }
}

// ILoginEmpresaRepositorio.cs
public interface ILoginEmpresaRepositorio
{
    Task<Acceso?> BuscarAccesoAsync(string emailNormalizado, CancellationToken ct);
    /// <remarks>Incluye Empresa y Rol.</remarks>
    Task<VinculoEmpresa?> BuscarVinculoAsync(Guid accesoId, Guid empresaId, CancellationToken ct);
    void AgregarRefresh(RefreshToken refresh);          // no guarda
}

// LoginEmpresaServicio.cs
public sealed class LoginEmpresaServicio(
    ILoginEmpresaRepositorio repo,
    IUnidadDeTrabajo uow,
    ICifradorEmpresaId cifrador,
    IHasherPassword hasher,
    IReloj reloj,
    EmisorSesion emisor) : IServicioCasoDeUso      // EmisorSesion: pieza del módulo Auth
{
    public async Task<Resultado<SesionResponse>> EjecutarAsync(LoginEmpresaRequest req, CancellationToken ct)
    {
        if (!cifrador.TryDescifrar(req.IdEmpresa, out var empresaId))
            return Errores.CredencialesInvalidas;

        var acceso = await repo.BuscarAccesoAsync(req.Email.Trim().ToLowerInvariant(), ct);
        if (acceso is null || !acceso.Verificado || !hasher.Verificar(acceso, req.Password))
            return Errores.CredencialesInvalidas;

        var vinculo = await repo.BuscarVinculoAsync(acceso.Id, empresaId, ct);
        if (vinculo is null || vinculo.Estado != EstadoVinculo.Activo || vinculo.Empresa.Estado != EstadoEmpresa.Activa)
            return Errores.CredencialesInvalidas;          // RN-57, RN-60: mismo mensaje, no revela qué falló

        var ahora = await reloj.AhoraAsync(ct);
        var sesion = new SesionToken(acceso.Id, TipoSesion.Empresa, vinculo.Id, vinculo.EmpresaId, vinculo.Rol.Codigo);
        var (fila, respuesta) = emisor.Emitir(sesion, ahora);   // arma JWT + fila de refresh, no guarda

        repo.AgregarRefresh(fila);
        await uow.GuardarCambiosAsync(ct);                  // una sola vez por caso de uso
        return respuesta;
    }
}
```

El controller del módulo solo conecta HTTP con el servicio:

```csharp
[ApiController, Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    [HttpPost("login/empresa")]
    public async Task<IActionResult> LoginEmpresa(
        LoginEmpresaRequest request, [FromServices] LoginEmpresaServicio servicio, CancellationToken ct)
        => (await servicio.EjecutarAsync(request, ct)).AHttp(this);
}
```

## 4. Reglas de Vertical Slicing

1. **Un caso de uso = una carpeta = un servicio.** Un servicio no tiene métodos públicos de otros casos de uso.
2. **Un slice no importa otro slice.** Si dos slices necesitan lo mismo, se mueve a `Common`. Si solo es parecido, se duplica: la duplicación entre slices es aceptable; el acoplamiento no.
3. **Algo pasa a `Common` solo cuando lo usan dos o más slices** y es transversal (tiempo, seguridad, tenant, resultados). Si solo lo comparten slices **del mismo módulo**, va en la raíz del módulo (`Features/Auth/Errores.cs`, `SesionResponse.cs`, `EmisorSesion.cs`) y no en `Common`.
4. **Nombres en español y PascalCase**, con el verbo del caso de uso: `CrearRiesgo`, `EvaluarRiesgo`, `PublicarVersionEncuesta`, `ResponderEncuesta`.
5. **Un controller por módulo,** y cada acción inyecta solo el servicio de su caso de uso (`[FromServices]`).
6. **Registro automático:** `AddApplication()` registra como *scoped* toda clase que implemente `IServicioCasoDeUso`, y todos los validadores (`AddValidatorsFromAssembly`). `AddInfrastructure()` registra los repositorios por convención (`I<X>Repositorio` → `<X>Repositorio`).
7. **El repositorio vive en Infrastructure,** en `Persistence/Repositorios/<Modulo>/`, con el mismo nombre que el slice.

## 5. Acceso a datos

1. **Los repositorios no llaman a `SaveChanges`.** Solo consultan, agregan (`Add`) o marcan para borrar (`Remove`).
2. **`IUnidadDeTrabajo.GuardarCambiosAsync`** confirma todo en una sola transacción, y el servicio lo invoca **una vez** por caso de uso. Ejemplo: la rotación del refresh (borrar el token anterior y crear el nuevo, RN-66) queda en un único guardado.
3. **Los `Include` son responsabilidad del repositorio** y se documentan en la interfaz (`/// Incluye Empresa y Rol`), porque el servicio depende de ellos.
4. **Las consultas de solo lectura** (listados, matriz y reportes) proyectan directo al Response con `Select` dentro del repositorio y usan `AsNoTracking`.
5. **Application no conoce EF Core:** no hay `IQueryable`, `DbSet` ni `Include` en sus firmas.
6. **Esquema 100 % Code-First:** las restricciones van en `Persistence/Configurations/` (una clase por entidad) y no se usa `migrationBuilder.Sql`.

## 6. Multiempresa (aislamiento por `EmpresaId`)

1. **`ITenantActual`** (`Application/Common/Interfaces`) expone `EmpresaId`, `VinculoEmpresaId` y `TipoSesion`. Lo implementa la API (`Seguridad/TenantActual`) descifrando el claim `empresa_id` del JWT.
2. **`NorviaDbContext`** aplica `HasQueryFilter(e => e.EmpresaId == tenant.EmpresaId)` a toda entidad que implemente `ITieneEmpresa`.
3. **`AsignarEmpresaInterceptor`** asigna `EmpresaId` desde `ITenantActual` al insertar. **El request nunca trae `EmpresaId`** (RN-06).
4. **`IgnoreQueryFilters()`** solo se permite en el login, en los seeders y en operaciones de staff de plataforma, con un comentario que lo justifique.
5. Las relaciones entre tablas de empresa son **FK compuestas** con `EmpresaId` (ver [modelo de datos](12-modelo-datos.md) §2).

## 7. Validación y errores

**FluentValidation es obligatorio.** Toda validación de entrada se escribe como un `AbstractValidator<Request>` (FluentValidation v12, en Application) dentro del slice. No hay validaciones de entrada con `if` en controllers ni en servicios.

Flujo:

```text
Request → ValidacionFiltro → IValidator<Request> (FluentValidation)
            │ inválido: lanza FluentValidation.ValidationException
            ▼
        ManejoErroresMiddleware → 400 ProblemDetails (RFC 7807) con errores por campo
            │ válido
            ▼
        <CasoDeUso>Servicio → Resultado<T> → ResultadoExtensiones.AHttp → 200/201/204 o error
```

1. **`ValidacionFiltro`** (API) busca en el contenedor el `IValidator<T>` del argumento, lo ejecuta y, si hay errores, lanza `FluentValidation.ValidationException`. Reemplaza al paquete `FluentValidation.AspNetCore`, que está deprecado por sus autores y es incompatible con FluentValidation 12. **Se sigue usando FluentValidation;** solo cambia cómo se invoca.
2. **`ManejoErroresMiddleware`** (API) es el middleware global:
   - `ValidationException` → 400 con `errors` por campo.
   - Cualquier otra excepción → 500 sin detalles internos (se registra en el log).

   Así se cumple el criterio de la rúbrica: "middleware que intercepta FluentValidation".
3. **Los fallos de negocio no son excepciones.** El servicio devuelve `Resultado<T>` con un `Error(Codigo, Mensaje, TipoError)`. `TipoError` es uno de `Validacion`, `NoAutorizado`, `Prohibido`, `NoEncontrado`, `Conflicto`, y se traduce a 400/401/403/404/409 en `ResultadoExtensiones`, también como ProblemDetails. `Resultado<T>` tiene conversiones implícitas desde `T` (éxito) y desde `Error` (fallo); por eso el ejemplo de la sección 3 puede hacer `return Errores.CredencialesInvalidas;`. Los errores de cada módulo se declaran como campos estáticos en una clase `Errores` del módulo (`Features/Auth/Errores.cs`), compartida solo por los slices de ese módulo.
4. **Simetría con el frontend:** cada validador tiene su esquema Zod equivalente en la feature del frontend (sección 9).

## 8. Configuración

1. **Patrón Options:**
   - `JwtOpciones` (Key, Issuer, Audience, AccessMinutos, RefreshDias), `CifradoOpciones` (EmpresaIdKey) y `StaffSeedOpciones`;
   - se enlazan una sola vez con `AddOptions<T>().Bind(...).ValidateDataAnnotations().ValidateOnStart()`.
2. **Los servicios reciben `IOptions<T>`,** nunca `IConfiguration`. Así la clave del JWT se lee en un solo lugar.
3. **La autenticación HTTP (`AddJwtBearer`) se configura en la API** (`Extensiones/AutenticacionExtensiones`), usando `JwtOpciones`. Infrastructure solo **genera** tokens.
4. **Los secretos van en `.env`** (`Norvia.API/.env`, a partir de `example.env`) y nunca en el código ni en `appsettings.json`.

## 9. Frontend (React + TypeScript + Vite)

```text
src/
├── app/                 router, providers, rutas protegidas
├── shared/              api (Axios + interceptores + extractor de errores), components, hooks, utils
└── features/
    └── <modulo>/        auth, empresas, encuestas, riesgos, politicas…
        ├── api/         llamadas HTTP de la feature
        ├── components/
        ├── hooks/
        ├── pages/
        ├── schemas/     esquemas Zod (espejo de los validadores del backend)
        └── types/
```

1. **Una feature no importa otra feature;** lo común va en `shared/`.
2. **Formularios:** React Hook Form con `zodResolver` y `mode: 'onChange'`. El formulario dinámico de encuestas arma su esquema Zod a partir del tipo de cada pregunta (`respuesta_breve`, `seleccion_unica`, `seleccion_multiple`).
3. **Axios** adjunta el JWT como `Bearer` en un interceptor, y el extractor convierte cualquier ProblemDetails en mensajes por campo o en uno general.
4. **Rutas protegidas** con `react-router-dom`: sin sesión se redirige al login, y sin permiso no se muestra la ruta.

## 10. Checklist para cada PR

- [ ] Las referencias entre proyectos respetan la tabla de la sección 1 (revisar los `.csproj`).
- [ ] Cada caso de uso nuevo es una carpeta en `Features/<Modulo>/<CasoDeUso>/` con Request, Validator, Repositorio y Servicio.
- [ ] Ningún slice importa otro slice.
- [ ] Los repositorios no llaman a `SaveChanges`; el servicio llama a `IUnidadDeTrabajo` una vez.
- [ ] Las entidades de empresa implementan `ITieneEmpresa` y quedan bajo `HasQueryFilter`; el request no trae `EmpresaId`.
- [ ] Toda validación de entrada está en un validador de FluentValidation, y sus errores salen como ProblemDetails.
- [ ] Ningún servicio lee `IConfiguration`.
- [ ] El controller no tiene lógica: llama al servicio y convierte el `Resultado`.
- [ ] En el frontend, el esquema Zod coincide con el validador.

---

## Anexo: evaluación de la rama `feature/acceso-auth` (13-11-2026)

Revisión del commit `9aa2517 feature/Jwt incoporation` (login, refresh y logout con JWT).

**Lo que está bien:**
- La dirección de las referencias entre proyectos es correcta, y Domain no tiene paquetes.
- Las interfaces están en Application y las implementa Infrastructure; el controller es delgado.
- El refresh se guarda solo como hash, el `EmpresaId` va cifrado en el JWT y los secretos vienen del entorno.

**Lo que se debe corregir:**

| # | Problema | Regla que incumple | Corrección |
|---|---|---|---|
| 1 | `AuthServicio` reúne 4 casos de uso, y `Features/Auth/` se divide en `DTOs/`, `Interfaces/` y `Validators/` | Secciones 3 y 4 | Crear los slices `LoginEmpresa/`, `LoginPlataforma/`, `RefrescarSesion/` y `CerrarSesion/`, cada uno con su request, validador, repositorio y servicio |
| 2 | `AuthRepositorio` llama a `SaveChanges` en cada método; la rotación del refresh se hace en dos transacciones | Sección 5 | Agregar `IUnidadDeTrabajo`/`UnidadDeTrabajo` y dejar los repositorios sin `SaveChanges` |
| 3 | No hay middleware global ni ProblemDetails; `FluentValidation.AspNetCore` 11 (deprecado) choca con FluentValidation 12 | Sección 7 | Mantener los validadores de FluentValidation y agregar `ValidacionFiltro` + `ManejoErroresMiddleware`; quitar solo el paquete de integración |
| 4 | `IRelojBaseDatos`, `ICifradorEmpresaId`, `ITokenServicio` e `IVerificadorPassword` están dentro del slice Auth | Secciones 1 y 2 | Moverlas a `Application/Common/Interfaces` (renombrar `IVerificadorPassword` a `IHasherPassword`, con `Hashear` y `Verificar`) |
| 5 | Infrastructure configura `AddJwtBearer`, la clave del JWT se lee en dos lugares, y los servicios leen `IConfiguration` | Secciones 1 y 8 | Crear `JwtOpciones`/`CifradoOpciones`/`StaffSeedOpciones` y mover `AddJwtBearer` a la API |
| 6 | `ResultadoAuth` es un booleano y todo fallo responde 401 | Sección 7 | Usar `Resultado<T>` + `Error` y `ResultadoExtensiones.AHttp` |
| 7 | `StaffSeeder` usa `PasswordHasher` directamente y está en `Infrastructure/Auth/` | Secciones 2 y 4 | Moverlo a `Persistence/Seed/` y usar `IHasherPassword` |
| 8 | `Features/Personas/DTOs/PersonaCreateDTO.cs` es una clase vacía | Sección 3 | Borrarla; se crea dentro del slice de HU-017/HU-020 cuando se implemente |
| 9 | Faltan `ITenantActual`, `HasQueryFilter` y la asignación de `EmpresaId` al guardar | Sección 6 | No es una violación: es la siguiente historia (HU-093) |

**Estado:** las correcciones 1 a 8 se aplicaron en la rama `fix/acceso-auth` (13-11-2026). La 9 queda para HU-093.

**Orden sugerido para corregir:** 3 (rúbrica) → 2 (integridad de la sesión) → 4 y 5 (base común) → 1 y 6 (slices y resultados) → 7 y 8 (limpieza) → 9 (HU-093).

# Guía para editar la documentación

**Para qué sirve:** mantiene coherente la documentación de **Norvia** cuando la edita el equipo o una IA. El nombre del producto es siempre **Norvia** (no SST360), salvo la entrada histórica en el glosario.

## Cadena de verdad

Seguir este orden al cambiar el modelo o las reglas:

1. [08-decisiones-bd.md](08-decisiones-bd.md) — decisiones D1–D24  
2. [07-reglas-negocio.md](07-reglas-negocio.md) — reglas RN  
3. [09-entidades.md](09-entidades.md) — lista de entidades  
4. [12-modelo-datos.md](12-modelo-datos.md) — diccionario, relaciones, trazabilidad §9  
5. [10-historias-usuario.md](10-historias-usuario.md) — criterios de aceptación  
6. [14-cambios-realizados.md](14-cambios-realizados.md) — bitácora autocontenida (problema, por qué, qué hizo quién); último paso  
7. [11-glosario.md](11-glosario.md) — términos y sinónimos históricos  

## Reglas obligatorias

1. **Búsqueda global:** antes de renombrar un término (p. ej. Membresia → VinculoEmpresa), buscar en `Sistemas-Expertos/docs/` y actualizar todas las apariciones o documentar el alias una vez en el glosario.
2. **Cada cambio citable:** indicar sección, qué cambió y motivo (D# o RN-#).
3. **3FN:** `Persona` sin login; **`Usuario`** solo `Activo` (+ `PersonaId`); credenciales en `VinculoEmpresa` o `StaffPlataforma`.
4. **Trazabilidad:** al añadir reglas, actualizar la tabla RN ↔ implementación en [12-modelo-datos.md](12-modelo-datos.md) §9.
5. **Checklist de cierre:** glosario actualizado; HUs M1 (HU-017–022) coherentes con vínculos; diagramas sin `Membresia`; FK operativas apuntan a `VinculoEmpresa`.
6. **Bitácora:** al terminar, añadir entrada en **Últimos cambios** y el bloque de detalle en [14-cambios-realizados.md](14-cambios-realizados.md) (plantilla al final del archivo).
7. **Tablero:** si actualizan la issue en GitHub Projects, marcar `[x]` en la tabla de HUs del cambio correspondiente en el `14`.

## Términos clave (resumen)

| Término | Significado breve |
|---------|-------------------|
| **Persona** | Identidad humana sin correo ni contraseña |
| **VinculoEmpresa** | Persona en una empresa: rol, correo institucional, contraseña, estado |
| **Usuario** | Persona habilitada en la plataforma (`Activo`); no es el login |
| **StaffPlataforma** | Login del staff Norvia (`RolStaffPlataforma`) |
| **Rol** | Permisos de empresa en un vínculo |
| **RolStaffPlataforma** | Permisos globales; no gestiona roles de empresa |
| **Cargo** | Solo comisión (`IntegranteComision.Cargo`), no rol |
| **Operador** | Quien usa la app con un vínculo activo; no confundir con `StaffPlataforma` |
| **Permiso.Alcance** | `empresa` = API del tenant (vínculo); `plataforma` = API global (staff). No renombrar a `staff` ni confundir con la tabla `StaffPlataforma` (D24, RN-63, RN-64) |

## Revisión de coherencia (checklist)

Tras un cambio de acceso o modelo, buscar en `docs/`:

- `Membresia`, `cambiar-empresa`, `/api/usuarios`, “empresa activa” (como selector), “usuario de la empresa” (usar **operador con vínculo**).
- Endpoints M1 en `13-sprint-backlog.md` alineados a vínculos.
- `Usuario.Activo` vs `VinculoEmpresa.Estado`; credenciales solo en vínculo o `StaffPlataforma`.
- `Permiso.Alcance = plataforma` vs tabla `StaffPlataforma` (alcance = tipo de operación; tabla = login del staff).

**Fuera de `docs/`:** `HUs.txt` y código en `ProyectoFinal/` pueden quedar desfasados hasta que el equipo los actualice.

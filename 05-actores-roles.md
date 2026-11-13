# Actores y roles

**Para qué sirve:** define quién usa Norvia y qué puede hacer.

Hay cuatro conceptos distintos en acceso:

- **Rol de empresa:** permisos **dentro del tenant**. Cada **vínculo activo** (`VinculoEmpresa`) tiene un `RolId` (`admin_empresa`, `responsable_sst`, `colaborador`, `encuestado`). Gestionar vínculos y roles de la empresa lo hace un vínculo con `admin_empresa`, no el staff Norvia.
- **Usuario (`Activo`):** si la persona tiene fila `Usuario` y está activa, puede autenticarse con algún vínculo. Trabajadores solo en **Persona** (sin `Usuario`) no entran a la app.
- **Staff de plataforma:** permisos **globales** (catálogos, listado de empresas, suspender tenant). Quien inicia sesión con **`StaffPlataforma`** tiene un `RolStaffPlataforma` (soporte o admin); **no** asigna roles de empresa a clientes. En BD esos permisos son filas **Permiso** con **`Alcance = plataforma`** (D24); la cuenta de login sigue llamándose **`StaffPlataforma`**, no “Plataforma”.
- **Asignación:** describe un papel concreto, como responsable de una tarea. No sustituye al rol.

El cargo en la Comisión Mixta quedó fuera de alcance junto con M7 (recorte del 13-11-2026).

## Roles del sistema

| Rol | Alcance | Puede |
|---|---|---|
| Staff con **RolStaffPlataforma** | Toda la plataforma | Catálogos globales, datos básicos de empresas, suspensión SaaS. Sin acceso SST de clientes ni asignación de `Rol` en vínculos |
| Administrador de empresa (vínculo `admin_empresa`) | Su empresa | Configurar la empresa, **altas y roles de vínculos** en esa empresa, incluidas las cuentas de encuestados |
| Responsable SST | Su empresa | Gestionar encuestas (es quien las crea y publica: el **encuestador**), riesgos, plan, accidentes, documentos y la matriz impresa |
| Colaborador | Su empresa | Atender sus tareas y reportar accidentes |
| Encuestado | Su empresa | Responder las encuestas publicadas, una vez cada una; ver sus notificaciones y consultar las políticas vigentes |

## Asignaciones

| Asignación | Qué significa |
|---|---|
| Responsable de una tarea | Vínculo activo que debe atender una tarea del plan |
| Investigador de un accidente | Vínculo que registra la investigación de un evento |

**Ejemplo:** Ana tiene el rol Colaborador y es responsable de una tarea del plan. Su rol le permite atender sus tareas; la asignación indica cuál le toca.

## Personas que no usan el sistema

Quien no tiene vínculo existe solo como **Persona** y no entra a Norvia. Los trabajadores que deben responder encuestas reciben una cuenta de **encuestado**: así cada uno responde una sola vez, aunque su respuesta sigue siendo anónima.

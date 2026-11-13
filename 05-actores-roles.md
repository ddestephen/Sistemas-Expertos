# Actores y roles

**Para qué sirve:** define quién usa Norvia y qué puede hacer.

Hay cuatro conceptos distintos en acceso:

- **Rol de empresa:** permisos **dentro del tenant**. Cada **vínculo activo** (`VinculoEmpresa`) tiene un `RolId` (`admin_empresa`, `responsable_sst`, `colaborador`). Gestionar vínculos y roles de la empresa lo hace un vínculo con `admin_empresa`, no el staff Norvia.
- **Usuario (`Activo`):** si la persona tiene fila `Usuario` y está activa, puede autenticarse con algún vínculo. Trabajadores solo en **Persona** (sin `Usuario`) no entran a la app.
- **Staff de plataforma:** permisos **globales** (catálogos, listado de empresas, suspender tenant). Quien inicia sesión con **`StaffPlataforma`** tiene un `RolStaffPlataforma` (soporte o admin); **no** asigna roles de empresa a clientes. En BD esos permisos son filas **Permiso** con **`Alcance = plataforma`** (D24); la cuenta de login sigue llamándose **`StaffPlataforma`**, no “Plataforma”.
- **Cargo:** función en la Comisión Mixta (`presidente`, `secretario`, `miembro`). No sustituye al rol.
- **Asignación:** describe el papel organizacional (encargado de área, etc.). Una persona puede tener varias.

## Roles del sistema

| Rol | Alcance | Puede |
|---|---|---|
| Staff con **RolStaffPlataforma** | Toda la plataforma | Catálogos globales, datos básicos de empresas, suspensión SaaS. Sin acceso SST de clientes ni asignación de `Rol` en vínculos |
| Administrador de empresa (vínculo `admin_empresa`) | Su empresa | Configurar la empresa, Google, **altas y roles de vínculos** en esa empresa |
| Responsable SST | Su empresa | Gestionar encuestas, riesgos, plan, accidentes, comisión, equipos, EPP, documentos y reportes |
| Colaborador | Su empresa | Atender sus tareas, reportar accidentes, registrar mantenimientos y firmar actas cuando le corresponda |

## Asignaciones

| Asignación | Qué significa |
|---|---|
| Presidente de la comisión | La representa y dirige sus reuniones. Lo designa el empleador |
| Secretario de la comisión | Convoca, verifica asistencia y elabora las actas. Lo elige la comisión |
| Integrante propietario | Miembro titular de la comisión |
| Integrante suplente | Reemplaza al propietario cuando este falta |
| Encargado de área | Responsable de un área de la empresa |
| Responsable de mantenimiento | Persona a cargo del mantenimiento de un equipo |

**Ejemplo:** Ana tiene el rol Colaborador y además es secretaria de la comisión. Su rol le permite atender tareas; su asignación le permite redactar actas.

## Personas que no usan el sistema

Un trabajador no necesita cuenta para participar:

- **Responde la encuesta** desde el enlace de Google Forms.
- **Recibe equipo de protección,** y la entrega se registra con su nombre, área y puesto.
- **Si sufre un accidente,** sus datos se registran en el reporte.

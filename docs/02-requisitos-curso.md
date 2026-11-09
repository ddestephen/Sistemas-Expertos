# Requisitos del curso

**Para qué sirve:** resume lo que exige el proyecto final de la clase y cómo se califica.

Este es el único archivo de producto que habla de tecnologías, porque aquí son requisitos obligatorios del curso.

## Objetivo del proyecto

Diseñar, desarrollar, contenerizar y desplegar una plataforma web transaccional bajo el modelo SaaS multiempresa, con temática definida por el equipo. Debe respetar Clean Architecture y Vertical Slicing, y desplegarse en la nube a costo cero.

## Fases y porcentajes

| Fase | Peso | Tema |
|---|---|---|
| 1 | 15 % | Ideación, análisis y gestión ágil |
| 2 | 25 % | Backend transaccional (.NET y PostgreSQL) |
| 3 | 25 % | Frontend web (React y TypeScript) |
| 4 | 15 % | Contenerización local con Docker |
| 5 | 20 % | Despliegue automatizado en la nube, sin costo |

## Fase 1: ideación, análisis y gestión ágil

- **Definición del SaaS:** pitch de 1 página que describa la plataforma.
- **Diseño multiempresa:** diagrama entidad-relación (ERD) en tercera forma normal (3FN). Todas las tablas transaccionales principales deben incluir `EmpresaId` como llave foránea.
- **Tablero Kanban:** GitHub Projects con historias de usuario claras.
- **Contratos de interfaz:** diseño de la API, con endpoints y DTOs de entrada y salida.

## Fase 2: backend

- **Clean Architecture:** capas `Domain`, `Application`, `Infrastructure` y `API`.
- **Persistencia y aislamiento:** Entity Framework Core (Code-First) y Global Query Filters (`HasQueryFilter`), para que las consultas filtren automáticamente por el `EmpresaId` del usuario actual.
- **Seguridad:** autenticación con tokens JWT. `EmpresaId` debe viajar encriptado como claim dentro del token, para que el backend sepa a qué empresa pertenece quien hace la petición.
- **Validación:** FluentValidation, con los errores propagados a la capa API mediante un middleware global.

## Fase 3: frontend

- **Vertical Slicing:** agrupación por funcionalidades, por ejemplo `features/auth`.
- **Rutas protegidas:** guardias de navegación con `react-router-dom` para bloquear usuarios sin JWT.
- **Validación en vivo:** Zod y React Hook Form con `mode: 'onChange'`, en simetría con FluentValidation.
- **Resiliencia HTTP:** extractor universal de errores, el programado en la Clase 16, e interceptores de Axios para adjuntar el JWT como `Bearer`.

## Fase 4: contenerización

- **Dockerfile multi-stage para la API:** SDK para compilar y runtime ligero de Alpine para ejecutar.
- **Docker Compose:** `docker-compose.yml` que levante la API conectada a un contenedor efímero de PostgreSQL.

## Fase 5: despliegue

1. **Base de datos:** PostgreSQL en Neon o Supabase.
2. **Backend:** Render o Fly.io, conectado a GitHub, con HTTPS automático.
3. **Frontend:** cliente React/Vite en Vercel o Netlify, conectado a la rama `main`.
4. **Integración continua:** cada `git push` a la rama principal actualiza todo en producción.

## Rúbrica

| Criterio | Deficiente (0–50 %) | Aceptable (51–80 %) | Excelente (81–100 %) |
|---|---|---|---|
| Análisis y base de datos | Lógica pobre; tablas sin aislar por empresa | Temática definida, ERD normalizado | Regla multiempresa clara, restricciones e índices correctos, backlog ágil |
| Backend | Capas mezcladas, contraseñas planas, aislamiento manual o fallido | Clean Architecture respetada, JWT y EF Core funcionando | Filtros globales, simetría de DTOs, middleware que intercepta FluentValidation |
| Frontend | Componentes gigantes, validaciones manuales con `if/else` | Módulos separados, rutas protegidas básicas, Axios | Arquitectura vertical, Zod en tiempo real, extractor de errores, buena experiencia de uso |
| DevOps local | No compila en Docker | Dockerfile básico funcional | `docker-compose.yml` levanta el sistema completo con un solo comando |
| Despliegue | Solo funciona en localhost | Despliegue parcial | Todo en la nube: Vercel, Render y Neon, con HTTPS |

## Qué implica para Norvia

- La nota evalúa sobre todo la calidad de ingeniería, no la cantidad de módulos. Un módulo bien aislado y validado vale más que tres a medias.
- La versión para teléfono no aparece en estos requisitos. El frontend calificado es el web, por lo que no debe sacrificarse.

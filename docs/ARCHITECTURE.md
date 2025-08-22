# Arquitectura del Proyecto: HonorTrading-Staff-Dashboard

Este documento describe la estructura de carpetas y archivos del proyecto HonorTrading-Staff-Dashboard, diseñado para gestionar el acceso y funciones del staff.


```
honor-trading-staff-dashboard/
│
├── src/                           # Carpeta raíz del código de la aplicación
│   ├── root.tsx                    # Root layout (Sidebar, Header, <Outlet />)
│   ├── routes.ts                   # Registro central de rutas (opcional si no autogeneras)
│   │
│   ├── modules/                    # Módulos funcionales del dashboard
│   │   ├── auth/                   # Módulo de autenticación
│   │   │   ├── routes/             # Páginas del módulo
│   │   │   │   ├── login.tsx       # /auth/login
│   │   │   │   ├── change-password.tsx
│   │   │   │   └── profile.tsx
│   │   │   ├── services/auth.api.ts
│   │   │   ├── components/AuthForm.tsx
│   │   │   └── types.d.ts
│   │   │
│   │   ├── ranks/                  # Módulo de gestión de rangos
│   │   │   ├── routes/
│   │   │   │   ├── _index.tsx      # /ranks
│   │   │   │   └── form.tsx        # /ranks/form
│   │   │   ├── services/ranks.api.ts
│   │   │   └── types.d.ts
│   │   │
│   │   ├── educational/            # Módulo de contenido educativo
│   │   │   ├── routes/
│   │   │   │   ├── _index.tsx
│   │   │   │   └── form.tsx
│   │   │   ├── services/educational.api.ts
│   │   │   └── types.d.ts
│   │   │
│   │   ├── admin/                   # Módulo de administración de usuarios staff
│   │   │   ├── routes/
│   │   │   │   ├── _index.tsx
│   │   │   │   └── form.tsx
│   │   │   ├── services/admin.api.ts
│   │   │   └── types.d.ts
│   │
│   ├── components/                  # Componentes globales
│   │   ├── layout/                   # Layouts reutilizables
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── ui/                       # UI genérica
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Table.tsx
│   │
│   ├── hooks/                        # Hooks globales
│   │   ├── useAuth.ts
│   │   └── useApi.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── types/                        # Tipos globales
│   │   ├── pagination.d.ts
│   │   └── api.d.ts
│   │
│   └── apiClient.ts                  # Configuración Axios/fetch global
│
├── public/                           # Recursos estáticos
|
├── docs/                             # Documentación del proyecto
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📌 Convenciones clave

- **File-based routing**  
  - Cada archivo dentro de `modules/**/routes` representa una ruta.  
  - Los archivos `_index.tsx` representan la ruta raíz de un segmento.  
  - Ejemplo:  
    - `modules/ranks/routes/_index.tsx` → `/ranks`  
    - `modules/ranks/routes/form.tsx` → `/ranks/form`

- **Módulos autónomos**  
  Cada módulo contiene:
  - `routes/` → Páginas del módulo.
  - `services/` → API y lógica de datos.
  - `components/` → UI específica del módulo.
  - `types.d.ts` → Tipos propios del módulo.

- **Componentes globales**  
  Se ubican en `app/components/` e incluyen:
  - `layout/` → Layouts reutilizables (Sidebar, Header, DashboardLayout).
  - `ui/` → Elementos de interfaz genéricos (Button, Input, Table).

- **Estado global y configuración**  
  Definidos en `app/`:
  - `apiClient.ts` → Configuración global de Axios o fetch.
  - Hooks globales en `app/hooks/` (`useAuth.ts`, `useApi.ts`).
  - Tipos globales en `app/types/`.

- **Estilos globales**  
  Definidos en `app/styles/globals.css`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#  Joyería Márquez - Sistema Web

Aplicación web desarrollada con React y Supabase para la gestión de productos, pedidos y usuarios con roles (admin / cliente).



#  Tecnologías utilizadas

 React
 Vite
 Tailwind CSS
 Supabase (Auth + Database)
 Supabase Auth (login, registro, sesiones)
 React Router DOM


#  Instalación del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/joyeria-marquez.git
cd joyeria-marquez
```

## 2. Instalar dependencias

```bash
npm install
```
## 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

## 4. Ejecutar el proyecto

```bash
npm run dev
```

Luego abre en el navegador:

```bash
http://localhost:5173
```



#  Autenticación

El sistema usa Supabase Auth:

 Registro de usuarios
 Inicio de sesión
 Cierre de sesión
 Persistencia de sesión



#  Roles de usuario

Se manejan dos roles:

admin

   Acceso completo
   Gestión de productos
   Gestión de pedidos
   Gestión de categorías

client

   Puede ver productos
   Realizar pedidos



#  Arquitectura del proyecto

```
src/
│
├── features/
│   └── auth/
│       ├── AuthProvider.jsx
│       ├── ProtectedRoute.jsx
│       ├── LoginPage.jsx
│       └── SignupPage.jsx
│
├── Pages/
│   ├── DashboardPage.jsx
│   ├── ProductsPage.jsx
│   ├── OrdersPage.jsx
│   └── OrderCategoriesPage.jsx
│
├── lib/
│   └── supabaseClient.js
│
└── router/
    └── Router.jsx
```

---

#  Flujo de autenticación

1. Usuario inicia sesión
2. Supabase devuelve la sesión
3. `AuthProvider` obtiene el usuario
4. Se consulta la tabla `profiles` para obtener el rol
5. `ProtectedRoute` valida acceso

---

# Protección de rutas

```jsx
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

Para admin:

```jsx
<ProtectedRoute requireAdmin={true}>
  <OrderCategoriesPage />
</ProtectedRoute>
```

---

# Base de datos (Supabase)

# Tablas principales

# profiles
 id (uuid)
 email
 role (admin / client)

# products
 id
 name
 price
 image

# orders

 id
 product_id (FK)
 user_id (FK)
 quantity
 status


#  Relaciones importantes
sql
orders.product_id → products.id
orders.user_id → profiles.id

# Scripts disponibles
bash
npm run dev     # Ejecutar en desarrollo
npm run build   # Build de producción
npm run preview # Vista previa del build

#  Nota final
Este proyecto implementa:

 Autenticación real
 Roles dinámicos
 Protección de rutas
 Integración completa con backend (Supabase)



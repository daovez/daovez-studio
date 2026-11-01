# Daovez Studio

Web corporativa B2B construida con Astro, React, TypeScript y Tailwind CSS 4.

## Desarrollo

```sh
npm install
npm run dev
```

Para validar la aplicación:

```sh
npm run astro -- check
npm run build
```

## Estructura

- `src/components/`: secciones Astro y componentes React interactivos.
- `src/pages/`: páginas públicas (`/`, `/demos`, `/contacto`).
- `src/actions/`: Astro Actions con validación server-side.
- `src/lib/`: interfaces de servicios para futuras integraciones.
- `src/styles/`: tokens y estilos globales.

La home y las demos se prerenderizan. La página de contacto se ejecuta bajo demanda para poder procesar `submitAudit`. El flujo actual valida, aplica honeypot y rate limit en memoria, pero no persiste ni envía datos a terceros. La conexión futura con n8n debe configurarse únicamente en el servidor usando las variables de `.env.example`.

## Despliegue

El proyecto usa el adaptador oficial de Vercel y `output: 'server'`. No se deben exponer secretos en componentes Astro o React; las variables `N8N_*` están reservadas para la integración backend futura.

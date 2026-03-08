# GitHub OAuth con Supabase

Guía para configurar GitHub como proveedor OAuth en un proyecto Supabase.

## Diagnóstico de problemas comunes

| Síntoma | Causa probable |
|---------|----------------|
| Pantalla en blanco al hacer clic en "Continuar con GitHub" | `VITE_SUPABASE_URL` apunta a un host incorrecto |
| No aparece la pantalla de autorización de GitHub | La URL de authorize es inválida |
| `redirect_to` con puerto inesperado | Normal — el adapter usa `window.location.origin` dinámicamente |

---

## Configuración paso a paso

### 1. Crear proyecto Supabase

1. Ir a [supabase.com](https://supabase.com) → **New project**
2. En **Project Settings → API**, anotar:
   - **Project URL**: `https://[id].supabase.co`
   - **anon public key**

### 2. Crear GitHub OAuth App

En [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps → New OAuth App**:

| Campo | Valor |
|-------|-------|
| Homepage URL | `http://localhost:4200` (o el origen donde corre la app) |
| Authorization callback URL | `https://[tu-id].supabase.co/auth/v1/callback` |

Guardar el **Client ID** y **Client Secret** que genera GitHub.

### 3. Habilitar GitHub en Supabase

En el dashboard de Supabase → **Authentication → Providers → GitHub**:
- Activar GitHub
- Pegar el **Client ID** y **Client Secret** del paso anterior

### 4. Configurar URLs permitidas en Supabase

En **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:4200`
- **Redirect URLs**: agregar `http://localhost:4200/auth/callback`

### 5. Actualizar `.env`

```env
VITE_SUPABASE_URL="https://[tu-project-id].supabase.co"
VITE_SUPABASE_ANON_KEY="[tu-anon-key]"
```

> `VITE_SUPABASE_CLIENT_ID` no es necesario — el adapter usa `window.location.origin` dinámicamente.

---

## Verificación

Una vez actualizado el `.env`, reiniciar el dev server:

```bash
npm start
```

Flujo esperado:
1. Abrir la app en `http://localhost:4200`
2. Click en "Continuar con GitHub" → redirige a `github.com/login/oauth/authorize`
3. Autorizar → regresa a `/auth/callback` → redirige a `/dashboard`

---

## Notas de implementación

- `SupabaseAuthAdapter` usa `window.location.origin` para `redirectTo` — funciona en cualquier puerto sin cambios
- `ProcessAuthCallbackUseCase` lee la sesión de Supabase post-redirect automáticamente
- Las rutas `/auth/callback` y `/dashboard` deben estar registradas en el router

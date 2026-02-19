# Subir y publicar como android-bbm en GitHub Pages

El proyecto está configurado para la URL: **`https://<tu-usuario>.github.io/android-bbm/`**

## Pasos

### 1. Crear el repositorio en GitHub

1. Entra en [github.com](https://github.com) y haz clic en **New repository**.
2. **Repository name:** `android-bbm`
3. Elige **Public**.
4. No marques "Add a README" (ya tienes uno en el proyecto).
5. Clic en **Create repository**.

### 2. Subir el código desde tu PC

En la carpeta del proyecto (donde está `package.json`), abre la terminal y ejecuta:

```bash
git init
git add .
git commit -m "Initial commit: Android BBM"
git branch -M main
git remote add origin https://github.com/<TU-USUARIO>/android-bbm.git
git push -u origin main
```

Sustituye `<TU-USUARIO>` por tu usuario de GitHub (ej. si eres `juan`, la URL es `https://github.com/juan/android-bbm.git`).

Si ya tienes el repo enlazado, basta con:

```bash
git add .
git commit -m "Deploy android-bbm"
git push origin main
```

### 3. Activar GitHub Pages

1. En GitHub, abre el repo **android-bbm**.
2. Ve a **Settings** → **Pages** (menú izquierdo).
3. En **Build and deployment** → **Source** elige **GitHub Actions**.

### 4. Publicar el sitio

- El workflow **Deploy to GitHub Pages** se ejecuta al hacer push a `main`.
- Si acabas de hacer push, espera 1–2 minutos y entra en la pestaña **Actions** del repo para ver el estado.
- Si no se ha lanzado, haz un pequeño cambio (ej. en el README), commit y push de nuevo.

### 5. Abrir la app

Cuando el workflow termine en verde:

**URL del sitio:** `https://<TU-USUARIO>.github.io/android-bbm/`

Ejemplo: si tu usuario es `juan`, la URL es `https://juan.github.io/android-bbm/`.

---

## Resumen rápido

| Paso | Acción |
|------|--------|
| 1 | Crear repo en GitHub llamado `android-bbm` |
| 2 | `git init`, `git add .`, `git commit`, `git remote add origin ...`, `git push` |
| 3 | Settings → Pages → Source: **GitHub Actions** |
| 4 | El push a `main` dispara el deploy (o lanzar el workflow a mano) |
| 5 | Abrir `https://<usuario>.github.io/android-bbm/` |

La persistencia (proyectos, notas, checklist) funciona en el navegador de cada usuario; no hace falta backend.

---

## Publicar en la organización The-Bitless

Si quieres que el repo viva en [The-Bitless](https://github.com/The-Bitless) en lugar de en tu usuario:

### 1. Crear el repo en la organización

1. Entra en [github.com/organizations/The-Bitless](https://github.com/organizations/The-Bitless) (o en la org desde el menú de GitHub).
2. Clic en **Repositories** → **New repository** (o ve a [github.com/new?organization=The-Bitless](https://github.com/new?organization=The-Bitless)).
3. **Repository name:** `android-bbm`
4. **Public**, sin README.
5. **Create repository**.

### 2. Subir el código

En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Initial commit: Android BBM"
git branch -M main
git remote add origin https://github.com/The-Bitless/android-bbm.git
git push -u origin main
```

(Si ya tenías otro `origin`, cámbialo: `git remote set-url origin https://github.com/The-Bitless/android-bbm.git`)

### 3. Activar GitHub Pages

1. Repo **The-Bitless/android-bbm** → **Settings** → **Pages**.
2. **Build and deployment** → **Source:** **GitHub Actions**.

### 4. URL del sitio

Cuando el workflow termine correctamente:

**`https://the-bitless.github.io/android-bbm/`**

No hace falta cambiar `next.config.js`: el `basePath` `/android-bbm` vale igual para usuario o organización.

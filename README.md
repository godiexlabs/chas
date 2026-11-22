# Web de Chas

Web estática (HTML, CSS y JS, sin dependencias): portada, política de privacidad y condiciones de uso. Los textos legales salen de [docs/LEGAL.md](../docs/LEGAL.md); si cambia uno, se cambia el otro.

| Archivo | Para qué |
|---|---|
| `index.html` | Portada con la pregunta de prueba |
| `privacidad.html` | Política de privacidad: su URL va en las tiendas y en `PRIVACY_URL` de la app |
| `condiciones.html` | Condiciones de uso: su URL va en `TERMS_URL` |
| `styles.css` | Colores y tipos del Design System de la app |
| `main.js` | Pregunta de prueba y año del pie |
| `assets/` | Icono, favicon y la cara de Chas |

## Antes de publicar
- Rellena todo lo marcado en amarillo (`[NOMBRE O RAZÓN SOCIAL]`, `[DIRECCIÓN]`, `[CORREO DE PRIVACIDAD]`, `[CORREO DE CONTACTO]`, `[FECHA]`, `[CONFIRMAR CON ASESORÍA]`). Busca `[` en los tres HTML.
- Que un abogado revise los textos (OD-17).

## Verla en local
```bash
python3 -m http.server 5186 --directory web
```

## Publicarla en GitHub Pages
1. Crea un repositorio **público** solo para la web (con una cuenta u organización que no muestre tu nombre real, por ejemplo `chas-app`).
2. Sube el **contenido** de esta carpeta (no la carpeta entera) a la raíz del repositorio, incluido `.nojekyll`.
3. En el repositorio: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
4. La web queda en `https://<cuenta>.github.io/<repositorio>/`. Cuando haya dominio propio, se añade en **Settings → Pages → Custom domain**.

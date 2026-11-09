# Conocete · Tests de personalidad gratis

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni servidor). Cinco tests con resultados completos y gratuitos:
Cinco Grandes (Big Five), Intereses vocacionales (RIASEC), Estilo personal (16 perfiles propios), Valores y Inteligencia emocional.

## Publicarlo en GitHub Pages (desde el celular)
1. Creá un repositorio nuevo en github.com (público), por ejemplo `conocete`.
2. Subí **todos los archivos de esta carpeta** a la raíz del repo (Add file → Upload files). `index.html` tiene que quedar en la raíz.
3. En el repo: Settings → Pages → Source: "Deploy from a branch", Branch: `main`, carpeta `/ (root)` → Save.
4. En 1–2 minutos tu sitio queda en `https://TU-USUARIO.github.io/conocete/`.

## Personalizar
Editá `config.js`: nombre, eslogan, contacto, texto de apoyo voluntario (`apoyo`) y publicidad (`publicidad`). Si activás publicidad, la página de Privacidad lo refleja.

## Estructura
- `motor.js`: registro de tests, puntajes, calidad de respuestas, almacenamiento local, exportar/importar.
- `datos-*.js`: preguntas y escalas de cada test. `textos-*.js`: textos de los resultados.
- `graficos.js`: gráficos SVG. `ui*.js`, `compartir.js`: pantallas, enlaces, imagen, impresión.
- `estilos.css`, `sw.js`, `manifest.webmanifest`: diseño y modo sin conexión/instalable.

## Agregar un test
Creá `datos-xxx.js` con `Motor.registrar({...})` (copiá uno existente), `textos-xxx.js` con los textos, y agregalos en `index.html` y `sw.js`.

## Honestidad científica (importante)
- Big Five: marcadores IPIP (dominio público); traducción propia **no validada**.
- RIASEC, valores, estilo e inteligencia emocional: preguntas originales inspiradas en Holland, Schwartz, Jung y Goleman/Salovey-Mayer.
- El test de 16 perfiles **no es MBTI** y tiene respaldo científico débil; está presentado como herramienta de reflexión.
- No son diagnósticos. No uses el nombre de marcas registradas (MBTI, etc.).
- Privacidad: todo se calcula en el navegador; nada se envía a ningún servidor.

# Ro Bassetto Surf

Sitio web de **Ro Bassetto Surf · Coaching & Training Integral 360°** (Club Ocampo · Costa Salguero, CABA).

## Estructura

```
index.html            Página principal
css/styles.css        Estilos (modo claro y oscuro)
js/main.js            Pestañas del programa, carrusel, calculadora de packs y botón para copiar el alias
data/planes.json      Precios de la clase individual y los packs (la calculadora los lee de acá)
data/contenido.json   Datos del negocio: programa, herramientas, contacto
assets/img/           Fotos
```

## Cambiar precios

Editá `data/planes.json`. La calculadora toma los valores de ese archivo cuando el sitio está publicado en un servidor. La lista de precios visible en `index.html` también hay que actualizarla a mano.

## Ver el sitio en tu compu

Abrí `index.html` en el navegador. Para que se lean los JSON, levantá un servidor local:

```
python3 -m http.server 8000
```

y entrá a http://localhost:8000.

## Publicar

Es un sitio estático: sirve tal cual en GitHub Pages, Netlify o Vercel.

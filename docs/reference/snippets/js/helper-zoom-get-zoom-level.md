# Calcul de la valeur du zoom de la fenêtre en cours

Fonction pour les zoom dans le navigateur & les zoom dans windows


```js
const zoomLevel = () => {
    const browserZoomLevel = Math.round(window.devicePixelRatio * 100)
    document.documentElement.dataset.zoom = browserZoomLevel
}

export const getZoomLevel = () => {
    window.addEventListener('resize', zoomLevel)

    zoomLevel()
}
```

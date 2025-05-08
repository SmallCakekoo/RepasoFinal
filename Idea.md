## Miniapp Valorant - Web Components + FLUX

Voy a desarrollar una miniapp usando **HTML, CSS y JavaScript**, implementando **Web Components autogestionados** que renderizan su contenido utilizando **Shadow DOM**. Usaré un enfoque basado en **FLUX** con un **estado global centralizado (SSOT)**, conectado mediante el método **GET** a la **API de Valorant**.

La aplicación permitirá mostrar agentes en forma de cards, darles **like** y guardar esos likes con **persistencia de datos**. Además, habrá un componente adicional (`<favorite-agents>`) que mostrará los agentes favoritos del usuario, sincronizado con el estado global.

Actualmente ya tengo implementados **cuatro componentes principales**:

- `<container-cards>`
- `<agent-card>`
- `<favorite-agents>`
- `<rooter>`

Todos están importados correctamente, con la **API tipada** y lista para integrarse.  
Parto de la base entregada por los profes, la API… y **mucha fe** 🙌.

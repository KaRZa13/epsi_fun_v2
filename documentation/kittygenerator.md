# Documentation pour KittyGenerator

[(Revenir à la page d'accueil)](../README.md)

Le composant KittyGenerator est une page Vue permettant d'afficher une galerie d’images de chats de manière esthétique et interactive. Il utilise l’API <code>/api/kitty/kitty</code> pour récupérer dynamiquement les données à afficher et intègre une animation visuelle via la librairie GSAP (avec le plugin Flip) pour rendre l’expérience utilisateur plus fluide et engageante.



## Fonctionnalités principales
- Récupération d’images dynamiques : appels API via useFetch.

- Affichage conditionnel : gestion des états pending, error et loaded.

- Galerie interactive : les images peuvent être animées et échangées.

- Animation avec GSAP Flip : transition fluide entre les emplacements des images.

- Bouton de rafraîchissement : pour recharger aléatoirement les images.

## Structure du composant

#### KittyGenerator.vue

- Gère la logique de récupération de données avec useFetch.

- Affiche un état de chargement ou une erreur si nécessaire.

- Passe les données au composant Gallery.

```ts
const { data: catImages, status, error, refresh } = useFetch('/api/kitty/kitty')
```

#### Gallery.vue
- Reçoit imagesProp (tableau d’objets { id, url }) et une fonction onRefresh.

- Dispose les images selon une grille CSS définie (grid-cols-9, grid-rows-9).

- Permet de cliquer sur une image pour l’échanger avec la principale via GSAP Flip.

- Un bouton permet de rafraîchir la galerie.

## Props du composant Gallery

| Nom          | Type          | Description                        |
| ------------ | ------------- | ---------------------------------- |
| `imagesProp` | `ImageItem[]` | Tableau d’objets image à afficher  |
| `onRefresh`  | `() => void`  | Fonction à appeler pour rafraîchir |


## Exemple d'objet ImageItem
```ts
{
  id: number | string,
  url: string
}
```

## Dépendances 

- GSAP : pour les animations (Flip).
- TailwindCSS : pour le style et la mise en page.
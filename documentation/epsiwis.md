# Documentation pour EPSI vs WIS

[(Revenir à la page d'accueil)](../README.md)

## 📦 Structure du composant
#### Template :
- Deux zones interactives (EPSI & WIS)

- Double affichage (visuel de fond + éléments interactifs transparents en overlay)

- Logo animé verticalement selon la position du "slider"

- Clip-path sur une div pour simuler une domination visuelle d’un camp

#### Script :
- Récupère et met à jour les compteurs via Supabase

- Calcule les "clics par seconde" (CPS) pour chaque camp

- Anime la position des logos via GSAP

- Gère la position d’un curseur (entre 0 et 100) influencé par les clics

- Remise à l’équilibre automatique en cas d’inactivité

## ⚙️ Comportement
### 1. Récupération des compteurs
Au onMounted, une requête vers Supabase est effectuée pour initialiser les compteurs EPSI et WIS :

```ts
await client.from('counter-epsi-wis').select('*')
```

### 2. Incrément d’un compteur
Chaque bouton +1 EPSI / +1 WIS appelle incrementCounter(type: 'epsi' | 'wis') :

- Incrémente le compteur localement

- Sauvegarde la valeur dans la table counter-epsi-wis

### 3. Calcul du nombre de clics par seconde
Toutes les 100 ms, calculateClicksPerSecond() est appelée :

- Enregistre les clics des 10 dernières itérations

- Calcule la somme pour afficher les CPS

Modifie la sliderPosition (+1 ou -1 selon le différentiel de clics)

### 4. Animation du curseur
sliderPosition est observée via watch :

- Calcule un offset vertical

- Anime les logos EPSI/WIS avec GSAP pour les faire monter ou descendre

### 5. Rééquilibrage automatique
Toutes les 200 ms, si aucun clic n’est détecté, le curseur revient progressivement vers 50 :

```ts
if (sliderPosition.value > 50) sliderPosition.value--
if (sliderPosition.value < 50) sliderPosition.value++
```

### 6. Clip-path dynamique
Permet d'afficher une "zone de domination" visuelle EPSI ou WIS selon le score :

```ts
clipPath: `inset(0 ${100 - sliderPosition.value}% 0 0)`
```

### 🖼️ Variables principales

| Variable         | Type          | Description                               |
| ---------------- | ------------- | ----------------------------------------- |
| `epsiCounter`    | `Ref<number>` | Score EPSI                                |
| `wisCounter`     | `Ref<number>` | Score WIS                                 |
| `epsiPerSecond`  | `Ref<number>` | CPS EPSI                                  |
| `wisPerSecond`   | `Ref<number>` | CPS WIS                                   |
| `sliderPosition` | `Ref<number>` | Position du curseur (0 = WIS, 100 = EPSI) |

### 🧪 Reférences d’éléments HTML (GSAP)

| Référence             | Élément associé           |
| --------------------- | ------------------------- |
| `epsiLogoRef`         | Logo EPSI sur fond orange |
| `epsiInvertedLogoRef` | Logo EPSI sur fond bleu   |
| `wisLogoRef`          | Logo WIS sur fond bleu    |
| `wisInvertedLogoRef`  | Logo WIS sur fond orange  |

### 📁 Supabase – Table counter-epsi-wis
| Champ     | Type     | Description         |
| --------- | -------- | ------------------- |
| `name`    | `string` | `'epsi'` ou `'wis'` |
| `counter` | `number` | Score actuel        |

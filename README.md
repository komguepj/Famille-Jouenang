# La Faille Jouenang — site de famille

Un petit site en HTML / CSS / JavaScript simple, sans installation
ni serveur nécessaire, pour découvrir l'arbre généalogique de la
famille Jouenang.

## Ouvrir le site

Double-cliquez simplement sur **index.html** — il s'ouvre dans votre
navigateur. Vous pouvez aussi héberger le dossier tel quel sur
n'importe quel hébergement web gratuit (GitHub Pages, Netlify,
Vercel...) si vous voulez un lien à partager avec la famille.

## Structure du site

- **index.html** — la page qui charge tout le reste (à ne pas modifier)
- **style.css** — les couleurs et la mise en page (à ne modifier que
  si vous voulez changer l'apparence)
- **app.js** — la logique qui construit les pages automatiquement
  à partir des données (à ne pas modifier)
- **data.js** — **le seul fichier à modifier au quotidien** : les
  noms, les photos et les liens de parenté de chaque personne
- **photos/** — le dossier où déposer les photos de chaque personne

## Mettre à jour l'arbre

Toutes les instructions détaillées (ajouter une personne, une
photo, ou une nouvelle génération) sont écrites en commentaire en
haut du fichier **data.js**. Ouvrez-le avec un simple éditeur de
texte (Bloc-notes, TextEdit, ou VS Code) pour le modifier — aucune
connaissance en programmation n'est nécessaire, il suffit de suivre
le modèle déjà en place.

## Pages du site

- `#/` — page d'accueil avec le message de bienvenue
- `#/arbre` — l'arbre généalogique complet de la famille
- `#/personne/<identifiant>` — la page dédiée à une personne,
  ouverte automatiquement en cliquant sur son nom ou sa photo
  dans l'arbre

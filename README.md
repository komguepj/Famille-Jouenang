# Plusieurs Branches, une Même Racine — site familial

## Fichiers

- **index.html**: le site public (page principale avec une carte par famille, une fiche par personne, un arbre par Grande Famille)
- **admin.html**: l'administration (ajouter ou modifier les Grandes Familles, les familles, les personnes et les relations)
- **family-data.json**: toutes les données.
- **family-data.js**: la même chose, lisible quand on ouvre le site par double-clic. admin.html produit les deux fichiers ensemble.
- **photos/**: les photos des personnes (par exemple `photos/gilbert.jpg`)
- **photos/evenements/**: les photos des évènements (onglet « Nouvelles & photos »)

## Ouvrir le site

Double-cliquez simplement sur **index.html** : le site lit alors `family-data.js`, une copie des données faite pour ça. Quand le site est hébergé (GitHub Pages, Netlify…), il lit `family-data.json`. Gardez toujours les deux fichiers ensemble, dans le même dossier que index.html.

## Mettre à jour les informations (admin.html)

1. Ouvrez **admin.html**. Les données actuelles de `family-data.json` se chargent.
2. Dans l'ordre :
   - **Grandes Familles** : créez la Grande Famille (par exemple « Jouenang »).
   - **Familles** : créez la famille (son nom, sa Grande Famille, le père et la mère). Le bouton **+** à côté de Père ou Mère crée la personne directement.
   - **+ Enfant** : ajoutez les enfants avec leur prénom, nom, sexe, mois et année de naissance, et leur photo.
   - **Relations** : ajoutez seulement les liens qui ne viennent pas déjà des familles (par exemple « X est cousin de Y » quand les parents ne sont pas saisis).
   - **Ordre d'affichage** : dans l'onglet Familles, chaque carte a un champ **N°**. Le 1 s'affiche en premier sur la page principale. Les familles fondatrices restent seules sur la première rangée. À égalité de numéro, ou sans numéro, c'est l'ordre de l'arbre qui s'applique. « Renuméroter 1, 2, 3… » redonne des numéros qui se suivent, et « Ordre de l'arbre » efface tous les numéros.
3. Cliquez sur **Aperçu du site** pour voir le résultat avant de le publier.
4. Cliquez sur **⬇ Exporter les données**. Deux fichiers sont téléchargés, `family-data.json` et `family-data.js` : remplacez les anciens par ceux-ci. Si le navigateur le demande, autorisez les téléchargements multiples.
5. Copiez les nouvelles photos dans le dossier `photos/`. Le nom du fichier doit être le même que celui indiqué dans la fiche.

Tant que vous n'avez pas exporté, vos modifications restent enregistrées dans le navigateur (brouillon).

> admin.html ne peut rien modifier sur le serveur : il produit seulement un fichier à télécharger. Si vous ne voulez pas que la famille voie cette page, vous pouvez quand même ne pas la publier et la garder uniquement sur votre ordinateur.

## Calendrier des anniversaires

La page **Anniversaires** classe les personnes par mois de naissance, en commençant par le mois en cours, et indique l'âge atteint cette année. La page d'accueil rappelle aussi les anniversaires du mois. Seules les personnes qui ont un mois de naissance y apparaissent. Le jour de naissance est facultatif : ajoutez-le dans la fiche de la personne pour un classement plus précis.

## Nouvelles et photos de famille

Dans admin.html, onglet **Nouvelles & photos**, cliquez sur **+ Nouvelle publication** et remplissez :
- le titre, la date et le texte ;
- les photos (plusieurs à la fois, avec une légende facultative et un ordre modifiable) ;
- les personnes concernées : la publication apparaîtra aussi sur leur fiche.

Copiez ensuite les photos choisies dans `photos/evenements/`, avec le même nom de fichier. Sur le site, les photos s'ouvrent en grand quand on clique dessus, et les flèches permettent de passer de l'une à l'autre.

## Relations déduites automatiquement

À partir des familles (père, mère, enfants) et des relations déclarées, le site calcule :

- les frères et sœurs, de façon transitive (A frère de B et B frère de C, donc A frère de C). Il distingue aussi les demi-frères et demi-sœurs.
- les grands-parents, arrière-grands-parents, petits-enfants…
- les oncles et tantes, grands-oncles, neveux et nièces, cousins germains, cousins issus de germain…
- les cousins, oncles et neveux **transmis par la fratrie** (le cousin de B est aussi le cousin de C si B et C sont frère et sœur).
- la belle-famille : mari et épouse, beau-père et belle-mère, gendre et belle-fille, beau-frère et belle-sœur (y compris le conjoint d'un frère ou d'une sœur, et le frère ou la sœur du conjoint), oncle ou tante par alliance…

Remarque : « le cousin de mon cousin » n'est **pas** automatiquement mon cousin, car il peut être cousin par l'autre parent. Le site applique donc la règle en passant par les frères et sœurs, ce qui est toujours exact.

Dans les fiches, les relations calculées portent la mention **déduit**.

## Format de family-data.json

```json
{
  "site": { "titre": "...", "sousTitre": "..." },
  "grandesFamilles": [ { "id": "jouenang", "nom": "Jouenang", "description": "" } ],
  "familles": [ { "id": "...", "nom": "Famille Abel & Martine", "grandeFamilleId": "jouenang", "pereId": "abel", "mereId": "martine", "ordre": 1 } ],
  "personnes": [ { "id": "gilbert", "prenom": "Gilbert", "nom": "Kamnang", "sexe": "M",
                   "jourNaissance": 12, "moisNaissance": 3, "anneeNaissance": 1965, "photo": "photos/gilbert.jpg",
                   "familleId": "famille-abel-martine", "grandeFamilleId": "jouenang" } ],
  "relations": [ { "a": "x", "type": "cousin", "b": "y" } ],
  "nouvelles": [ { "id": "...", "titre": "Réunion de famille", "date": "2026-08-15", "texte": "...",
                   "photos": [ { "src": "photos/evenements/groupe.jpg", "legende": "Photo de groupe" } ],
                   "personnes": ["jules"], "grandeFamilleId": null } ]
}
```

Une relation se lit ainsi : « **a** est *type* de **b** ». Les types possibles sont `parent`, `enfant`, `fratrie`, `conjoint`, `grand-parent`, `petit-enfant`, `oncle`, `neveu`, `cousin`, `grand-oncle`, `petit-neveu`, `arriere-grand-parent`, `arriere-petit-enfant`, `beau-frere`, `beau-parent` et `gendre`.

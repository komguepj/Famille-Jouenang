/* ============================================================
   DONNÉES DE LA FAMILLE JOUENANG
   ============================================================
   C'est le SEUL fichier que vous avez besoin de modifier pour
   mettre à jour l'arbre généalogique (ajouter une personne,
   changer une photo, corriger un nom...). Pas besoin de savoir
   programmer : il suffit de suivre le modèle ci-dessous.

   STRUCTURE D'UNE PERSONNE
   -------------------------------------------------------------
   {
     id:     "identifiant-unique-sans-espace-ni-accent",
     name:   "Nom complet affiché",
     photo:  "photos/nom-du-fichier.jpg",   (laisser "" si pas de photo)
     role:   "Texte du badge (optionnel)",   ex: "Épouse", "Époux"...
     unions: [ ... ]   (optionnel — voir plus bas)
   }

   AJOUTER UNE PHOTO
   -------------------------------------------------------------
   1. Déposez le fichier image dans le dossier "photos/"
      (formats acceptés : .jpg, .jpeg, .png, .webp)
   2. Indiquez son nom dans le champ "photo" de la personne,
      par exemple : photo: "photos/gilbert.jpg"
   3. Si vous ne mettez pas de photo, un avatar coloré avec les
      initiales de la personne s'affiche automatiquement.

   AJOUTER UN ENFANT
   -------------------------------------------------------------
   Ajoutez un nouvel objet {...} dans le tableau "children" de
   l'union concernée, en copiant le modèle d'un enfant existant.

   AJOUTER UNE NOUVELLE GÉNÉRATION
   -------------------------------------------------------------
   Ajoutez un champ "unions" à la personne concernée, avec la
   même structure que celle d'Abel : un tableau contenant un
   objet { spouse: {...}, children: [ {...}, {...} ] } par
   union/mariage. L'arbre et les pages s'adaptent automatiquement.

   REMARQUE IMPORTANTE
   -------------------------------------------------------------
   Les conjoint(e)s et enfants de la 3e génération (les enfants
   de Gilbert, Jean-Lebel, Berthine, etc.) ont été ajoutés avec
   des noms provisoires du type "Épouse de Gilbert" ou "Enfant 1
   de Gilbert", car leurs vrais noms n'avaient pas encore été
   fournis. Remplacez simplement ces noms provisoires par les
   vrais noms et prénoms — la structure de l'arbre restera la
   même, il suffit d'éditer le champ "name" (et "photo" si vous
   avez une image).
   ============================================================ */

const familyTree = {
  id: "abel",
  name: "Jouenang Abel",
  photo: "photos/abel.jpg",
  role: "Ancêtre fondateur",
  unions: [
    {
      spouse: {
        id: "martine",
        name: "Menzefo Martine",
        photo: "photos/martine.jpg",
        role: "Maman"
      },
      children: [
        {
          id: "gilbert", name: "Gilbert Kamnang", photo: "photos/gilbert.jpg",
          unions: [{
            spouse: { id: "gilbert-epouse", name: "Marie Chimi", photo: "", role: "Épouse" },
            children: [
              { id: "gilbert-enfant-1", name: "Nina Arlette Djomo", photo: "" },
              { id: "gilbert-enfant-2", name: "Yannick Valère Jouenang", photo: "" },
              { id: "gilbert-enfant-3", name: "Brice Piegouong", photo: "" },
              { id: "gilbert-enfant-4", name: "Ines Menzefo", photo: "" },
              { id: "gilbert-enfant-5", name: "Ange Dany Lowe", photo: "" },
              { id: "gilbert-enfant-6", name: "Darlene Wakam", photo: "" }
            ]
          }]
        },
        {
          id: "jean-lebel", name: "Jean-Lebel Ngopnang", photo: "photos/jean-lebel.jpg",
          unions: [{
            spouse: { id: "jean-lebel-epouse", name: "Caroline Wandji", photo: "", role: "Épouse" },
            children: [
              { id: "jean-lebel-enfant-1", name: "Nélaine Menzefo", photo: "" },
              { id: "jean-lebel-enfant-2", name: "Wilson Ketcheuzeu", photo: "" },
              { id: "jean-lebel-enfant-3", name: "Johanna Ngopnang", photo: "" }
            ]
          }]
        },
        {
          id: "berthine", name: "Berthine Tchatchouang", photo: "photos/berthine.jpg",
          unions: [{
            spouse: { id: "berthine-epoux", name: "Joseph Fokoua", photo: "", role: "Époux" },
            children: [
              { id: "berthine-enfant-1", name: "Kevin Fotso", photo: "" },
              { id: "berthine-enfant-2", name: "Marlene Massuedom", photo: "" },
              { id: "berthine-enfant-3", name: "Guilene Menzefo", photo: "" }
            ]
          }]
        },
        {
          id: "dagobert", name: "Dagobert Djapou", photo: "photos/dagobert.jpg",
          unions: [{
            spouse: { id: "dagobert-epouse", name: "Laure Podjie", photo: "", role: "Épouse" },
            children: [
              { id: "dagobert-enfant-1", name: "Grâce Menzefo", photo: "" },
              { id: "dagobert-enfant-2", name: "Gloria", photo: "" }
            ]
          }]
        },
        {
          id: "claude", name: "Claude Djinang", photo: "photos/claude.jpg",
          unions: [{
            spouse: { id: "claude-epouse", name: "Jeanine Tchapdie", photo: "", role: "Épouse" },
            children: [
              { id: "claude-enfant-1", name: "Stephan Karen Miyo", photo: "" },
              { id: "claude-enfant-2", name: "Pharel Valery Tankoua", photo: "" },
              { id: "claude-enfant-3", name: "Sorel Carine Menzefo", photo: "" },
              { id: "claude-enfant-4", name: "Allan Chris Djinang", photo: "" }
            ]
          }]
        },
        {
          id: "jules", name: "Jules Komguep", photo: "photos/jules.jpg",
          unions: [{
            spouse: { id: "jules-epouse", name: "Claire Ngantcha", photo: "", role: "Épouse" },
            children: [
              { id: "jules-enfant-1", name: "Steve Jouenang", photo: "" },
              { id: "jules-enfant-2", name: "Ornela Yimga", photo: "" },
              { id: "jules-enfant-3", name: "Ivika Tchatchouang", photo: "" },
              { id: "jules-enfant-4", name: "Lorick Komguep-Tchonkap", photo: "" }
            ]
          }]
        }
      ]
    },
    {
      spouse: {
        id: "cecile",
        name: "Miyou Cécile",
        photo: "photos/cecile.jpg",
        role: "Maman"
      },
      children: [
        { id: "alain", name: "Alain Tchiemegne", photo: "photos/alain.jpg" },
        { id: "valerie", name: "Valérie Nagfack", photo: "photos/valerie.jpg" },
        {
          id: "bertin", name: "Bertin Poka'a", photo: "photos/bertin.jpg",
          unions: [{
            spouse: { id: "bertin-epouse", name: "Gisèle", photo: "", role: "Épouse" },
            children: [
              { id: "bertin-enfant-1", name: "Enfant 1 de Bertin", photo: "" },
              { id: "bertin-enfant-2", name: "Enfant 2 de Bertin", photo: "" },
              { id: "bertin-enfant-3", name: "Enfant 3 de Bertin", photo: "" }
            ]
          }]
        },
        {
          id: "nadege", name: "Nadège Kouokam", photo: "photos/nadege.jpg",
          unions: [{
            spouse: { id: "nadege-epoux", name: "Lucas Mouafo", photo: "", role: "Époux" },
            children: [
              { id: "nadege-enfant-1", name: "Enfant 1 de Nadège", photo: "" },
              { id: "nadege-enfant-2", name: "Enfant 2 de Nadège", photo: "" },
              { id: "nadege-enfant-3", name: "Enfant 3 de Nadège", photo: "" },
              { id: "nadege-enfant-4", name: "Enfant 4 de Nadège", photo: "" }
            ]
          }]
        },
        { id: "sylvia", name: "Sylvia Sotche", photo: "photos/sylvia.jpg" },
        {
          id: "alvine", name: "Alvine Guenang", photo: "photos/alvine.jpg",
          unions: [{
            spouse: { id: "alvine-epoux", name: "Époux d'Alvine", photo: "", role: "Époux" },
            children: [
              { id: "alvine-enfant-1", name: "Franck-Patrick Komguep", photo: "" }
            ]
          }]
        }
      ]
    }
  ]
};

// Nom affiché du site et message d'accueil : modifiables ici aussi.
const siteConfig = {
  siteName: "La Famille Jouenang",
  welcomeTitle: "Bienvenue dans la Famille Jouenang",
  welcomeSubtitle: "Main dans la main, de génération en génération.",
  treeTitle: "Arbre généalogique de la Famille Jouenang"
};

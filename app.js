/* ==========================================================
   FAMILLE JOUENANG — application
   Lit les données dans data.js et construit les pages.
   Rien ici n'a besoin d'être modifié pour mettre à jour la
   famille : voir data.js pour ça.
   ========================================================== */

(function(){
  const app = document.getElementById("app");

  // Palette utilisée pour les avatars-initiales (quand il n'y a pas de photo)
  const AVATAR_COLORS = ["#F4B942", "#7FE0A8", "#E8935A", "#FFD873", "#2E9B63", "#FF9F6E"];

  /* ---------- Indexation de l'arbre (parcours récursif) ---------- */
  // registry[id] = { person, chain: [id des ancêtres, du plus ancien au parent direct], role }
  const registry = {};

  function indexPerson(person, chain, role){
    registry[person.id] = { person, chain, role };
    (person.unions || []).forEach(function(union){
      const spouseRole = union.spouse.role || "Épouse";
      indexPerson(union.spouse, chain.concat([person.id]), spouseRole);
      (union.children || []).forEach(function(child){
        const childRole = child.role || "Enfant";
        indexPerson(child, chain.concat([person.id, union.spouse.id]), childRole);
      });
    });
  }
  indexPerson(familyTree, [], familyTree.role || "Ancêtre fondateur");

  /* ---------- Utilitaires ---------- */
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  function initials(name){
    const words = name.split(/[\s-]+/).filter(Boolean);
    if(words.length >= 2){
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return (words[0] || "?").slice(0, 2).toUpperCase();
  }

  function colorForId(id){
    let hash = 0;
    for(let i = 0; i < id.length; i++){ hash = id.charCodeAt(i) + ((hash << 5) - hash); }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  }

  function avatarHtml(person){
    const label = escapeHtml(initials(person.name));
    const color = colorForId(person.id);
    if(person.photo){
      return (
        '<span class="avatar" style="--avatar-color:' + color + '">' +
          '<img src="' + escapeHtml(person.photo) + '" alt="Photo de ' + escapeHtml(person.name) + '" ' +
               'onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
          '<span class="avatar-fallback" style="display:none">' + label + '</span>' +
        '</span>'
      );
    }
    return (
      '<span class="avatar" style="--avatar-color:' + color + '">' +
        '<span class="avatar-fallback">' + label + '</span>' +
      '</span>'
    );
  }

  // Génère une ligne de branche SVG reliant un parent à N descendants,
  // en pourcentages (0-100) afin de s'adapter à n'importe quelle largeur.
  function connectorSvg(n, extraClass){
    let d = "M50,0 L50,20 ";
    if(n > 1){
      const minX = (0.5 / n) * 100;
      const maxX = ((n - 0.5) / n) * 100;
      d += "M" + minX + ",20 L" + maxX + ",20 ";
    }
    for(let i = 0; i < n; i++){
      const x = ((i + 0.5) / n) * 100;
      d += "M" + x + ",20 L" + x + ",40 ";
    }
    return (
      '<svg class="connector' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 100 40" preserveAspectRatio="none">' +
        '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>' +
      '</svg>'
    );
  }

  // Sur une page donnée, on n'affiche que 2 générations sous la personne
  // "racine" de cette page (elle-même + ses conjoint(e)s + leurs enfants).
  // Les descendants plus lointains n'apparaissent que sur la page de
  // l'enfant concerné (voir renderPersonBranch ci-dessous).
  const MAX_LEVEL = 2;

  function nodeHtml(person, role, extraClass, focus, hasMore){
    return (
      '<div class="node ' + extraClass + (focus ? ' focus' : '') + '">' +
        '<a class="node-link" href="#/personne/' + encodeURIComponent(person.id) + '">' +
          avatarHtml(person) +
          '<span class="node-role">' + escapeHtml(role || "") + '</span>' +
          '<span class="node-name">' + escapeHtml(person.name) +
            (hasMore ? '<span class="more-badge" title="Voir sa descendance">＋</span>' : '') +
          '</span>' +
        '</a>' +
      '</div>'
    );
  }

  // Rend une personne + sa descendance directe (conjoint(e)s et enfants),
  // récursivement, mais en s'arrêtant à MAX_LEVEL générations sous "person".
  function renderPersonBranch(person, role, extraClass, focusId, level){
    level = level || 0;
    const isFocus = focusId && person.id === focusId;
    const unions = person.unions || [];
    const canExpand = level < MAX_LEVEL;
    const hasMore = unions.length > 0 && !canExpand;
    let html = '<li><div class="node-col">' + nodeHtml(person, role, extraClass, isFocus, hasMore);
    if(unions.length && canExpand){
      html += '<div class="branch">' + connectorSvg(unions.length, "unions-connector") + '<ul class="row unions">';
      unions.forEach(function(union){
        html += renderUnion(union, focusId, level + 1);
      });
      html += '</ul></div>';
    }
    html += '</div></li>';
    return html;
  }

  function renderUnion(union, focusId, level){
    const spouseRole = union.spouse.role || "Épouse";
    const isFocus = focusId && union.spouse.id === focusId;
    let html = '<li><div class="node-col">' + nodeHtml(union.spouse, spouseRole, "spouse", isFocus);
    const children = union.children || [];
    if(children.length){
      html += '<div class="branch">' + connectorSvg(children.length) + '<ul class="row children">';
      children.forEach(function(child){
        html += renderPersonBranch(child, child.role || "Enfant", "child", focusId, level + 1);
      });
      html += '</ul></div>';
    }
    html += '</div></li>';
    return html;
  }

  function fullTreeHtml(focusId){
    return (
      '<ul class="tree">' +
        renderPersonBranch(familyTree, familyTree.role || "Ancêtre fondateur", "ancestor", focusId) +
      '</ul>'
    );
  }

  function breadcrumbHtml(entry){
    const chainPeople = entry.chain.map(function(id){ return registry[id].person; });
    const parts = chainPeople.map(function(p){
      return '<a href="#/personne/' + encodeURIComponent(p.id) + '">' + escapeHtml(p.name) + '</a><span class="sep">›</span>';
    }).join(" ");
    return (
      '<nav class="breadcrumb">' +
        '<a href="#/arbre">Arbre</a><span class="sep">›</span> ' +
        parts +
        '<span class="current">' + escapeHtml(entry.person.name) + '</span>' +
      '</nav>'
    );
  }

  /* ---------- Pages ---------- */
  function renderWelcome(){
    document.title = siteConfig.welcomeTitle;
    app.innerHTML = (
      '<section class="welcome">' +
        rootsSvg() +
        '<div class="welcome-content">' +
          '<p class="welcome-eyebrow">' + escapeHtml(siteConfig.siteName) + '</p>' +
          '<h1 class="welcome-title">' + escapeHtml(siteConfig.welcomeTitle) + '</h1>' +
          '<p class="welcome-subtitle">' + escapeHtml(siteConfig.welcomeSubtitle) + '</p>' +
          '<a class="plaque-link" href="#/arbre">Voir l\'arbre généalogique <span class="arrow">→</span></a>' +
        '</div>' +
      '</section>'
    );
  }

  function rootsSvg(){
    return (
      '<svg class="welcome-roots" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
        '<path d="M400,500 C400,380 320,340 260,280 C210,230 200,160 230,60"/>' +
        '<path class="sage" d="M400,500 C400,380 480,340 540,280 C590,230 600,160 570,60"/>' +
        '<path d="M400,500 C400,400 360,360 300,340 C250,320 190,320 140,280"/>' +
        '<path class="sage" d="M400,500 C400,400 440,360 500,340 C550,320 610,320 660,280"/>' +
        '<path d="M400,500 C400,420 400,360 400,260 C400,180 380,120 340,40"/>' +
        '<path class="sage" d="M400,500 C400,420 400,360 400,260 C400,180 420,120 460,40"/>' +
      '</svg>'
    );
  }

  function renderTreePage(){
    document.title = siteConfig.treeTitle + " — " + siteConfig.siteName;
    app.innerHTML = (
      headerHtml() +
      '<header class="page-heading">' +
        '<p class="page-eyebrow">' + escapeHtml(siteConfig.siteName) + '</p>' +
        '<h1 class="page-title">' + escapeHtml(siteConfig.treeTitle) + '</h1>' +
      '</header>' +
      '<p class="scroll-hint">← Faites glisser pour explorer l\'arbre →</p>' +
      '<div class="tree-scroll">' + fullTreeHtml(null) + '</div>' +
      footerHtml()
    );
  }

  function renderPersonPage(id){
    const entry = registry[id];
    if(!entry){
      renderNotFound(id);
      return;
    }
    document.title = entry.person.name + " — " + siteConfig.siteName;

    const hasDescendants = entry.person.unions && entry.person.unions.length;
    let bodyHtml;
    if(hasDescendants){
      bodyHtml = '<div class="tree-scroll"><ul class="tree">' + renderPersonBranch(entry.person, entry.role, roleToClass(entry.role), entry.person.id) + '</ul></div>';
    }else{
      bodyHtml = (
        '<div class="focus-wrap"><ul class="tree">' + renderPersonBranch(entry.person, entry.role, roleToClass(entry.role), entry.person.id) + '</ul></div>' +
        '<p class="empty-branch">Aucune descendance enregistrée pour <strong>' + escapeHtml(entry.person.name) + '</strong> pour le moment. ' +
        'Cette branche s\'affichera automatiquement dès qu\'elle sera ajoutée dans les données de la famille.</p>'
      );
    }

    app.innerHTML = (
      headerHtml() +
      '<header class="page-heading">' +
        '<p class="page-eyebrow">' + escapeHtml(entry.role || "") + '</p>' +
        '<h1 class="page-title">' + escapeHtml(entry.person.name) + '</h1>' +
      '</header>' +
      breadcrumbHtml(entry) +
      bodyHtml +
      footerHtml()
    );
  }

  function roleToClass(role){
    if(!role) return "child";
    if(role === (familyTree.role || "Ancêtre fondateur")) return "ancestor";
    if(/épou|conjoint/i.test(role)) return "spouse";
    return "child";
  }

  function renderNotFound(id){
    document.title = "Personne introuvable — " + siteConfig.siteName;
    app.innerHTML = (
      headerHtml() +
      '<div class="empty-branch" style="margin-top:4rem;">Aucune personne ne correspond à « ' + escapeHtml(id) + ' ». ' +
      '<br><a class="back-link" style="margin-top:1rem;display:inline-flex;" href="#/arbre">← Retour à l\'arbre</a></div>' +
      footerHtml()
    );
  }

  function headerHtml(){
    return (
      '<header class="site-header">' +
        '<a class="back-link" href="#/">← Accueil</a>' +
        '<span class="brand">' + escapeHtml(siteConfig.siteName) + '</span>' +
      '</header>'
    );
  }

  function footerHtml(){
    return '<footer class="site-footer">Famille Jouenang — arbre généalogique de famille</footer>';
  }

  /* ---------- Routage ---------- */
  function route(){
    const hash = window.location.hash || "#/";
    const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

    if(parts.length === 0){
      renderWelcome();
    }else if(parts[0] === "arbre"){
      renderTreePage();
    }else if(parts[0] === "personne" && parts[1]){
      renderPersonPage(decodeURIComponent(parts[1]));
    }else{
      renderWelcome();
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("DOMContentLoaded", route);
})();

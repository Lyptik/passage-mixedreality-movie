# PASSAGE — The mixed reality short movie

Version statique du site WordPress https://www.passage-mixedreality.com/, préparée le 21 octobre 2026 pour GitHub Pages.

**Site : https://lyptik.github.io/passage-mixedreality-movie/**

## Fonctionnement

HTML, CSS et JavaScript natifs, sans compilation ni installation. La publication GitHub Pages utilise la branche `main`, dossier racine `/`. Le fichier `.nojekyll` désactive le traitement Jekyll.

- `index.html` : accueil, présentation, making of, crédits et contact.
- `home/passage-the-movie/index.html` : film complet ; chemin conservé depuis WordPress.
- `assets/` : images et polices locales, styles et interactions.
- `wp-content/uploads/2020/05/Kit_press.zip` : kit presse original, à son ancien chemin.
- `sitemap.xml`, `robots.txt`, `404.html` : indexation et page introuvable.

Les visuels, le logo, les textes et les crédits proviennent du site d'origine. Les grandes images sont optimisées en WebP. Les sections remplacent Slider Revolution et restent accessibles sans JavaScript. Les polices Open Sans sont hébergées localement avec leur licence OFL.

Les vidéos restent sur Vimeo, avec les identifiants d'origine : bande-annonce `266423627`, film `417619659`, making of `244240335`. Le lecteur se charge uniquement après un clic ; le paramètre Vimeo `dnt=1` est activé. Les liens Vimeo restent utilisables sans JavaScript. Aucun script WordPress, WooCommerce, Jetpack, Google Fonts distant ou appel à Bluehost n'est nécessaire.

## Modifier le site

Éditer les textes dans les fichiers HTML et le style dans `assets/site.css`. Enregistrer les modifications sur `main` : GitHub Pages republie le site automatiquement. Pour vérifier localement, utiliser un serveur HTTP statique et ouvrir `index.html` ainsi que la page du film. Les chemins relatifs fonctionnent sous le sous-dossier GitHub Pages et à la racine d'un domaine personnalisé.

## Domaine personnalisé : étape ultérieure

Le domaine `passage-mixedreality.com` reste chez Bluehost pendant la validation. Aucun fichier `CNAME` n'est présent pour l'instant.

Après validation :

1. Vérifier la propriété du domaine dans les paramètres GitHub Pages du compte et préparer les DNS selon la documentation GitHub à jour.
2. Configurer le domaine personnalisé dans les paramètres Pages du dépôt, puis les enregistrements DNS du domaine. Conserver tous les enregistrements de messagerie (MX, SPF, DKIM, DMARC).
3. Remplacer `https://lyptik.github.io/passage-mixedreality-movie/` par l'adresse canonique retenue dans les métadonnées HTML, `sitemap.xml`, `robots.txt` et `404.html`.
4. Activer HTTPS une fois le certificat disponible et vérifier les deux variantes du domaine et la page du film.
5. Vérifier `press@passage-mixedreality.com` avant toute résiliation Bluehost : GitHub Pages ne fournit pas de messagerie. Sauvegarder séparément les fichiers et la base WordPress avant une éventuelle suppression de l'hébergement.

Documentation : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

Cette migration porte sur les pages publiques du film. Elle ne constitue pas une sauvegarde de la base WordPress ni des éléments privés d'administration.

## Droits

Les contenus et médias du film restent la propriété de leurs ayants droit. Ce dépôt ne leur attribue pas de licence libre. Open Sans possède sa propre licence dans `assets/Open-Sans-OFL.txt`.

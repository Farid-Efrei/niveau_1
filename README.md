# Niveau_2 : API DE CITATIONS : Elle a un nom desormais : Pop'Quotes Api !

** POP'QUOTES : ça évolue !!! **

1. Le backend a été construit avec NodeJs, ExpressJS et se connecte bien à la base de données en MongoDB.
2. Il y a plus de 5 endpoints différents désormais:

- un GET pour lister toutes les citations présentes dans l'App en allant sur la page dédiée : Toutes les Citations (Composant "CitationsListe.vue"),
- un POST pour ajouter une citation manuellement en fournissant la "citation" (le texte) et l'Auteur ainsi que la source \* mais UNIQUEMENT pour les users connectés.
- La connexion utilise également un protocole POST (Login;Vue) page dédiée,
- mais également la page "Register.vue" évidemment (donc nous avons bien au moins 3 POST)
- La méthode Delete n'est accessible que par la connexion (sinon n'importe qui va s'amuser à tout supprimer, ça me permettra d'avoir des logs ^^), et l'avantage, c'est que la suppression n'apparait qu'une fois connecté dans la page de toutes les citations. (conditionnelles).
- un autre GET est actif via Postman mais pas encore en page (je le dédie au niveau 2 :ce sera une page de citations aléaoires).

3. L'Application possède bien plusieurs écrans / page en VueJS3 qui se mettent à jour à l'ajout ou suppression directement sans recharger la page. J'ai utilisé TailwindCSS pour la mise en page sobre et il y a désormais une page d'accueil, une page de citations, une page de connexion, d'inscription, d'ajout de citation, et d'autres pages sont à l'étude (à propos, page de citation aléatoire, page de contact, etc.).
4. J'ai fourni la collection de ma base de données (avec 10 entrées) afin d'avoir un exemple concret et de pratiquer la connexion : la base de données est "dbtest" et la collection s'intitule : "citationsDB".
5. J'ai créé un logo aussi et une navbar présente dans toutes les pages pour naviguer facilement et s'y retrouver partout.
   Les menus sont conditionnels selon que vous êtes connectés ou non. (se connecter / se deconnecter, ajouter une citation etc.).
6. L'application est responsive. (les tests sont opérationnels avec Postman dans un premier temps).
7. Les tests en Backend ou front avec Jest ont été instaurés. (Ils sont OK) pour tester la création d'un compte, le login ou l'affichage de la liste des citations en Back. En front, les tests sont sur la page Login.vue.
8. Ajout des tests Cypress (End to End) sur la page Login.vue. (en lançant "npx cypress open" ça ouvre un GUI Pour les tests.)
9. La pipeline a été ajoutée également.

# Pour lancer ne pas oublier de faire npm install.

Pour lancer le frontend : npm run dev.
Pour le backend: node server.js.
Pour la base de données les informations sont au dessus. (créer la base "dbtest") et la collection à copier porte le nom "citationsDB".
J'ai fourni une capture d'écran afin de voir comment elle s'organise ou pour illustrer en vrai.

**_ N'hésitez pas à alimenter la base de données avec des citations d'Animes, de Séries, Films, Auteurs littéraires, ou toutes autres sources bien inspirantes. _**

# PS : **\*_ J'ai choisi de faire ce travail seul pour vraiment tout comprendre même si je galere énormément ^^ J'apprends. _**

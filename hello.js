ListeArticles = new Mongo.Collection('articles'); //variable globale
console.log("Hello world");

if (Meteor.isClient) { // exécuté uniquement sur le client

  //Template.article.events({ //permet de créer des fonctions pour nos articles
  //  'click': function(){
  //    console.log("You clicked something");
  //  },
  //  'click .title': function(){
  //    console.log("You clicked an title element");
  //    var titleId = this._id;
  //    Session.set('selectedTitle', 'session value test'); //nom de la session + valeur
  //    var selectedTitle =  Session.get('selectedTitle');
  //    console.log(selectedTitle);
  //
  //  } //Autres fonctions que le click :  dblclick, focus, blur, mouseove, change
  //});

  Template.articles.helpers({
    'article': function ()
    {
      return ListeArticles.find(); // ({}, {sort: {title: 1}}) on affiche les titres, triés selon le score puis selon le nom! (-1 : croissant, 1 : décroissant)
    }
    //,
    //'showSelectedArticle': function(){
    //  var selectedArticle = Session.get('selectedArticle');
    //  return ListeArticles.findOne(selectedArticle); //le findOne cherche les id (+ efficace que find)
    //}
  });

  Template.addArticle.events({
    'submit form': function(){
      event.preventDefault(); //empêche le navigateur de rafraichir la page (peut aussi servir à modifier le fonctionnement des liens..)
      var articleTitleVar  = event.target.articleTitle.value;
      var articleContentVar  = event.target.articleContent.value;

      ListeArticles.insert({
        title: articleTitleVar,
        content: articleContentVar
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

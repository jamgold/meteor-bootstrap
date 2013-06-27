if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to bootstrap.";
  };

  Template.hello.rendered = function() {
    console.log('Template.hello.rendered');
  };

  Template.tabs.pages = function() {
    return [
      {href: "#home", text: "Home"},
      {href: "#page1", text: "Page 1"},
      {href: "#page2", text: "Page 2"},
      {href: "#page3", text: "Page 3"},
      {href: "#page4", text: "Page 4"}
    ];
  };

  Template.tabs.rendered = function() {
    console.log('Template.tabs.rendered');
  };

  Template.tab.rendered = function() {
    console.log('Template.tab.rendered');
  };

  Template.tabs.events({
    'click ul.nav-tabs li a': function (e, tmpl) {
      Session.set('url',$(e.target).attr('href'));
    }
  });

  Template.hello.events({
    'click button.btn-primary' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Handlebars.registerHelper('TabActive', function (route) {
      var url = Session.get("url");
      var index = $.inArray(route.href, [url]);
      return (index != -1) ? "active" : "";
  });

  Session.setDefault('url', '#home');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

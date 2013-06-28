if (Meteor.isClient) {

  var url = "#home";

  Template.hello.greeting = function () {
    return "Welcome to bootstrap.";
  };

  Template.hello.rendered = function() {
    console.log('Template.hello.rendered');
  };

  Template.tabs.pages = function() {
    // url = Session.get('url');
    return [
      {href: "#home", text: "Home"},
      {href: "#page1", text: "Page 1"},
      {href: "#page2", text: "Page 2"},
      {href: "#page3", text: "Page 3"},
      {href: "#page4", text: "Page 4"}
    ];
  };

  Template.tabs.TabsHelper = function() {
      return new Date();
  };

  Template.tabs.rendered = function() {
    console.log('Template.tabs.rendered');
  };

  Template.tab.rendered = function() {
    console.log('Template.tab.rendered');
  };

  Template.button_group.events({
    'click .btn': function(e, tmpl) {
      Session.set("button_group",$(e.target).text().toLowerCase());
      console.log(Session.get('button_group'));
    }
  });

  Template.button_group.rendered = function() {
    console.log("Template.button_group.rendered");
  };

  Template.tabs.events({
    'click ul.nav-tabs li a': function (e, tmpl) {
      url = $(e.target).attr('href');
      // Session.set('url',url);
      $('ul.nav-tabs li.active').removeClass('active');
      $(e.target).parent().addClass('active');
      localStorage.setItem('url',url);
      if(url=='#page4')
      {
        if(Session.get('main-click'))
          Session.set('main-click', null);
        else
          Session.set('main-click',new Date());
      }
    }
  });

  Template.hello.events({
    'click button.main-click' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Handlebars.registerHelper('TabActive', function (route) {
    // url is now a global var
      var index = $.inArray(route.href, [url]);
      return (index != -1) ? "active" : "";
  });

  Handlebars.registerHelper('buttonGroup', function(id) {
    return Session.get('button_group') == id ? "active" : "";
  });

  Handlebars.registerHelper('buttonStatus', function (id) {
    if(Session.get(id))
    {
      return "disabled";
    }
    else
      return "";
  });

  Session.setDefault('url', url);
  if(localStorage.getItem('url') === null) localStorage.setItem('url', url);
  else url = localStorage.getItem('url');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

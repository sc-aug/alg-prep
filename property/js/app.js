$(document).ready(function(){
    // init
    Controller.welcomePage();

    $("#home").click(Controller.welcomePage);
    $("#all-prob").click(Controller.allProblemPage);
});


/********* Model *******************/
var Model = {
};

/********* Controller **************/
var Controller = {
    welcomePage: function() {
        View.welcomePage(welcome_page);
    },

    allProblemPage: function() {
        // Model get all data
        View.allProblemPage(all_prob_wrapper);
    }
};

/********* View ********************/
var View = {
    welcomePage: function() {
        View.toggle(50);
        View.changeContent(welcome_page);
        View.toggle(100);
    },

    allProblemPage: function(all_prob) {
        View.toggle(50);
        View.changeContent(all_prob);
        View.toggle(100);
    },

    toggle: function(time) {
        $("#dynamic-page").toggle(time);
    },

    changeContent: function(content) {
        $("#dynamic-page").html(content);
    }
};
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
        View.allProblemPage(prob_data);
    }
};

/********* View ********************/
var View = {
    welcomePage: function() {
        View.toggle(50);
        View.updateWelcomePage();
        View.toggle(100);
    },

    allProblemPage: function(all_prob) {
        View.toggle(50);
        View.prepareContent(all_prob_wrapper);
        View.appendAllProbTableRow(all_prob);
        View.toggle(100);
    },

    toggle: function(time) {
        $("#dynamic-page").toggle(time);
    },

    updateWelcomePage: function() {
        View.changeContentHTML(welcome_page);
    },

    prepareContent: function(wrapper) {
        var content = $("#dynamic-page").html(wrapper);
    },

    appendAllProbTableRow: function(prob) {
        // for (var i = all_prob.length-1; i >= 0; i ++) {
        for (var i = prob.length-1; i >= 0; i --) {
            var p = prob[i];
            var tr_obj = $("<tr>");
            var td_obj;
            // id
            td_obj = $("<td>");
            td_obj.html(p.stat.question_id);
            tr_obj.append(td_obj);
            // title
            td_obj = $("<td>");
            a_obj = $("<a>");
            a_obj.attr("href", "https://leetcode.com/problems/" + p.stat.question__title_slug);
            a_obj.attr("target", "_blank");
            a_obj.html(p.stat.question__title);
            td_obj.append(a_obj);
            tr_obj.append(td_obj);
            // diff
            td_obj = $("<td>");
            td_obj.html(p.difficulty.level);
            tr_obj.append(td_obj);
            // freq
            td_obj = $("<td>");
            td_obj.html(p.frequency.toFixed(0));
            tr_obj.append(td_obj);
            // prog
            td_obj = $("<td>");
            td_obj.html(p.progress.toFixed(0));
            tr_obj.append(td_obj);

            $("#t-body").append(tr_obj);
        }
    },

    changeContentHTML: function(content) {
        $("#dynamic-page").html(content);
    }
};
/*
var all_prob_wrapper = "<h4 class=\"sub-header\">Section title</h4>\
          <div class=\"table-responsive\">\
            <table class=\"table table-stripe\">\
              <thead id=\"t-head\">\
                <tr>\
                  <th>No.</th>\
                  <th>Title</th>\
                  <th>Difficulty</th>\
                  <th>Frequency</th>\
                  <th>Progress</th>\
                </tr>\
              </thead>\
              <tbody id=\"t-body\">\
                <tr>\
                  <td>1</td>\
                  <td><a href=\"https://leetcode.com/problems/two-sum/\" target=\"_blank\">Two Sum</a></td>\
                  <td>Hard</td>\
                  <td>36.1</td>\
                  <td>23.1</td>\
                </tr>\
                <tr>\
                  <td>1,002</td>\
                  <td>amet</td>\
                  <td>consectetur</td>\
                  <td>adipiscing</td>\
                  <td>elit</td>\
                </tr>\
              </tbody>\
            </table>\
          </div>";*/
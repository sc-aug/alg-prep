$(document).ready(function(){
    // init page
    initPage();
});


function initPage() {
    /* init */
    initNavBar(); // init NavBar
    initHandler(); // init click handler

    /* welcome page & show list */
    $('#home').trigger( 'click' ); // show welcome page
    // $('.nav-sidebar.category-title a:nth-child(1)').trigger('click'); // show all nav-list
    $('.nav-sidebar.category-title a').first().trigger('click'); // show first nav-list
    // $($('.nav-sidebar.category-title a')[1]).trigger('click'); // show second nav-list
}

// init NavBar
function initNavBar() {
    $.ajax({ 
        type: 'GET',
        async: false,
        url: 'property/data/map_category_tag.json',
        dataType: 'json',
        success: function (data) {
            $.each(data, function(i, obj) {
                var tmp = $('<div>', { 'class': 'category_wrapper' });
                var head = $('<div>', { 'class': 'nav-sidebar category-title' });
                var list = $('<ul>', { 'id': obj.category_id, 'class': 'nav nav-sidebar collapse' });

                $("#nav-sidebar").append(tmp);
                tmp.append(head);
                tmp.append(list);
                
                // head 
                head.append($('<a>', {
                    "data-toggle": "collapse",
                    "href": "#" + obj.category_id,
                    "text": obj.category_name
                }));
                
                $(obj.tags).each(function(index, item) {
                    list.append($('<li>').append($('<a>', {'id': item.tag_id, 'text': item.tag_name})));
                });
            });
        }
    });
}

// init click Handler
function initHandler() {
    $.ajax({ 
        type: 'GET',
        async: false,
        url: 'property/data/map_tag_content.json',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(i, obj) {
                $('#'+obj.id).click(clickHandler);
            });
        }
    });
}

function clickHandler(obj) {
    updatePage(obj.target.id);
    var id = $(obj.target).attr('id');
    updatePage(id);
}

function updatePage(id) { // clean
    cleanDynamicPage();
    scrollToTop();

    // add content
    if (id == 'home') { // welcome page
        welcome(getItem(id));
    } else { // problem page
        problems(getItem(id));
    }
}

// welcome page content 
function welcome(obj) {
    $('#dynamic-page').html(obj.content);
}

// problem list page content
function problems(obj) {
    var header = $('<h4>', {'class': 'sub-header', 'text': obj.name });
    var table_wrapper = $('<div>', {'class': 'table-responsive'});
    var table = $('<table>', {'class': 'table table-striped'});
    var thead = $('<thead>');
    var tbody = $('<tbody>');

    $('#dynamic-page').append(header);
    $('#dynamic-page').append(table_wrapper);
    table_wrapper.append(table);
    table.append(thead);
    table.append(tbody);

    // head
    $(thead).append($('<th>', {'text': 'No.'}));
    $(thead).append($('<th>', {'text': 'Title.'}));
    $(thead).append($('<th>', {'text': 'Diff.'}));
    $(thead).append($('<th>', {'text': 'Freq.'}));

    // body
    var data = loadProbData();
    var map = getIndexMapping(data);
    var prob_ids = obj.content;

    $(prob_ids).each(function(i, ind) {
        var prob = data[map[ind]];
        var tr = $('<tr>');
        tbody.append(tr);
        // ID
        tr.append($('<td>', {
            'text': prob.stat.question_id + (prob.paid_only ? " $": "")}
        ));
        // url
        tr.append($('<td>').append($('<a>', {
            'text': prob.stat.question__title,
            'target': '_blank',
            'href': 'https://leetcode.com/problems/' + prob.stat.question__title_slug
        })));
        // difficulty
        var lvl = prob.difficulty.level;
        var diff = (lvl == 1 ? 'E' : (lvl == 2 ? 'M' : 'H'));
        tr.append($('<td>', {
            'text': diff
        }));
        // freq
        tr.append($('<td>', {
            'text': prob.frequency.toFixed(0)
        }));
    });
}

// get item by category id (e.g. 'home', 'array', 'bs', 'dp', 'bst' ...)
function getItem(id) {
    var item = null;
    $.ajax({ 
        type: 'GET',
        async: false,
        url: 'property/data/map_tag_content.json',
        dataType: 'json',
        success: function (data) {
            $.each(data, function(i, obj) {
                if (obj.id == id) {
                    item = obj;
                    return false;
                }
            });
        }
    });
    return item;
}

// load data
function loadProbData() {
    var d = null;
    $.ajax({ 
        type: 'GET',
        async: false,
        url: 'property/data/prob_data.json',
        dataType: 'json',
        success: function (data) {
            d = data;
        }
    });
    return d;
}

// index mapping
function getIndexMapping(d) {
    if (d == null) {
        d = loadProbData();
    }
    var map = null;
    if (d != null) {
        $(d).each(function(i, e) {
            var id = e.stat.question_id;
            if (map == null) {
                map = new Array(id+1);
            }
            map[id] = i;
        });
    }
    return map;
}

// clean page
function cleanDynamicPage() {
    $('#dynamic-page').empty();
}

// scroll to top
function scrollToTop() {
    window.scrollTo(0,0);
}
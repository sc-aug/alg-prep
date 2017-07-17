$(document).ready(function(){
    // init page
    initPage();
});


function initPage() {
    // init NavBar
    initNavBar();
    // init click handler
    initHandler();
}

// init NavBar
function initNavBar() {
    $.ajax({ 
        type: 'GET',
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
        url: 'property/data/map_tag_content.json',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(i, obj) {
                console.log(obj.id);
                $('#'+obj.id).click(clickHandler);
            });
        }
    });
}

function clickHandler(obj) {
    updatePage(obj.target.id);
    //updatePage($(obj).attr('id'));
}

function updatePage(id) {// clean
    cleanDynamicPage();

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
    var table = $('<table>', {'class': 'table table-stripe'});
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
    var prob_ids = obj.content;

    $.ajax({
        type: 'GET',
        url: 'property/data/prob_data.json',
        dataType: 'json',
        success: function (data) {
            $(data).each(function(index, prob) {
                if (prob_ids.indexOf(prob.stat.question_id) >= 0) {
                    var tr = $('<tr>');
                    tbody.append(tr);
                    
                    tr.append($('<td>', {
                        'text': prob.stat.question_id}
                    ));
                    tr.append($('<td>').append($('<a>', {
                        'text': prob.stat.question__title,
                        'target': '_blank',
                        'href': 'https://leetcode.com/problems/' + prob.stat.question__title_slug
                    })));
                    tr.append($('<td>', {
                        'text': prob.difficulty.level
                    }));
                    tr.append($('<td>', {
                        'text': prob.frequency.toFixed(0)
                    }));
                }
            });
        }
    });
}

// get item by category id (e.g. 'home', 'array', 'bs', 'dp', 'bst' ...)
function getItem(id) {
    var item = null;
    $.ajax({ 
        type: 'GET',
        async:false,
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

// clean page
function cleanDynamicPage() {
    $('#dynamic-page').empty();
}
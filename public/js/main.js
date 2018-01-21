window.onload = function () {
    createFirstElement();
    document.getElementById('query-filter').oncontextmenu = function () {
        return false;
    };
};

function createFirstElement() {
    var parentContainer = document.getElementById('query-filter');
    var createFirstElement = document.createElement('div');
    parentContainer.appendChild(createFirstElement);
    createFirstElement.setAttribute('class', 'query query-border');
    createFirstElement.setAttribute('id', '0');
    createFirstElement.innerHTML =
        " <div class='query-left'></div>" +
        " <div class='query-middle'>" +
        " <input type='text' class='form-field' id='market' value='Market'>" +
        " <select class='form-field form-small'>" +
        " <option selected>=</option>" +
        " <option>+</option>" +
        " </select>" +
        " <input type='text' class='form-field' value='UA'>" +
        " <select class='form-field form-medium'>" +
        " <option selected>None</option>" +
        " </select>" +
        " </div>" +
        " <div class='query-right'>" +
        " <a class='btn right' onclick='createSecondLevel(this)'>Add 2nd Level</a>" +
        " <a class='btn right' onclick='createOrLevel(this)'>Add 'OR'</a>" +
        " </div>";
}

function createSecondLevel(el) {
    var parentId = 0;
    var existingElements = document.getElementsByClassName('query');
    var currentParent = el.parentNode.parentNode;
    var createSecondLevelElement = document.createElement('div');
    createSecondLevelElement.setAttribute('class', 'query query-border');
    createSecondLevelElement.setAttribute('oncontextmenu', 'removeElement(event, this)');
    for ( var i = 0; i < existingElements.length; i++ ) {
        console.log(parseInt(i));
        console.log(parseInt(existingElements[i].id));
        if (parseInt(existingElements[i].id) === i) {
            console.log('met');
            createSecondLevelElement.setAttribute('id', parseInt(existingElements[i].id) + parseInt(i) + 1);
        } else {
            console.log('not met');
            createSecondLevelElement.setAttribute('id', parseInt(existingElements[i].id) + i);
        }
    }
    createSecondLevelElement.innerHTML =
        " <div class='query-left'></div>" +
        " <div class='query-middle'>" +
        " <input type='text' class='form-field' placeholder='Select Item'>" +
        " <select class='form-field form-small'>" +
        " <option selected>=</option>" +
        " <option>+</option>" +
        " </select>" +
        " <input type='text' class='form-field' placeholder='Values'>" +
        " <select class='form-field form-medium'>" +
        " <option selected>None</option>" +
        " </select>" +
        " </div>" +
        " <div class='query-right'>" +
        " <a class='btn right' onclick='createSecondLevel(this)'>Add 2nd Level</a>" +
        " <a class='btn right' onclick='createOrLevel(this)'>Add 'OR'</a>" +
        " <input type='checkbox'>" +
        " </div>";
    currentParent.insertAdjacentElement('afterend', createSecondLevelElement);
}

function createOrLevel(el) {
    var parentId = 0;
    var existingRows = document.getElementsByClassName('query');
    var currentParent = el.parentNode.parentNode;
    var createSecondLevelElement = document.createElement('div');
    createSecondLevelElement.setAttribute('class', 'query intent query-border-or');
    createSecondLevelElement.setAttribute('oncontextmenu', 'removeElement(event, this)');
    createSecondLevelElement.setAttribute('id', 'or_level_row_' + parentId);
    createSecondLevelElement.innerHTML =
        " <div class='query-left'><span>OR</span></div>" +
        " <div class='query-middle'>" +
        " <input type='text' class='form-field' placeholder='Select Item'>" +
        " <select class='form-field form-small'>" +
        " <option selected>=</option>" +
        " <option>+</option>" +
        " </select>" +
        " <input type='text' class='form-field' placeholder='Values'>" +
        " <select class='form-field form-medium'>" +
        " <option selected>None</option>" +
        " </select>" +
        " </div>" +
        " <div class='query-right'>" +
        " <a class='btn right' onclick='createSecondLevel(this)'>Add 2nd Level</a>" +
        " <a class='btn right' onclick='createOrLevel(this)'>Add 'OR'</a>" +
        " </div>";
    currentParent.insertAdjacentElement('afterend', createSecondLevelElement);
}

function removeElement(event, el) {
    var keycode = ( event.keyCode ? event.keyCode : event.which );
    if (keycode === 3) {
        var selectedRows = document.querySelectorAll('input[type=checkbox]:checked');
        if (selectedRows.length > 0) {
            var deleteRow = confirm('Are you sure? Do you want to delete the selected rows?');
            if (deleteRow) {
                for (var i = 0; i < selectedRows.length; i++) {
                    var el = document.getElementById(selectedRows[i].parentNode.parentNode.id);
                    el.remove();
                }
            }
        } else {
            var deleteRow = confirm('Are you sure? Do you want to delete this row?');
            if (deleteRow) {
                el.remove();
            }
        }
    }
}

function searchItems(event) {
    var formElement = document.getElementById('queryFilter');
    var selectedId = event.target.id;
    for (var i=0; i < formElement.elements.length; i++) {
        var elementId = formElement.elements[i].id;
        if (selectedId === elementId) {
            alert(selectedId + ' table already exists!');
        }
    }
}

function bulkDelete() {
    var selectedRows = document.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < selectedRows.length; i++) {
        var el = document.getElementById(selectedRows[i].parentNode.parentNode.id);
        el.remove();
    }
}

window.onload = function () {
    createFirstElement();
    document.getElementById('query-filter').oncontextmenu = function () {
        return false;
    };
};

var parentIdArray = [];
var parentId = 0;

function createFirstElement() {
    var parentContainer = document.getElementById('query-filter');
    var createFirstElement = document.createElement('div');
    parentContainer.appendChild(createFirstElement);
    createFirstElement.setAttribute('class', 'query query-border');
    createFirstElement.setAttribute('id', '0');
    createFirstElement.innerHTML =
        " <div class='query-left'><span>2nd</span></div>" +
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
    var existingElements = document.getElementsByClassName('query');
    var currentParent = el.parentNode.parentNode;
    var createSecondLevelElement = document.createElement('div');
    createSecondLevelElement.setAttribute('class', 'query query-border');
    createSecondLevelElement.setAttribute('oncontextmenu', 'removeElement(event, this)');

    for ( var i = 0; i < existingElements.length; i++ ) {
        parentIdArray.push(parseInt(existingElements[i].id));
    }
    parentId = Math.max.apply(null, parentIdArray) + 1;
    createSecondLevelElement.setAttribute('id', parentId.toString());

    createSecondLevelElement.innerHTML =
        " <div class='query-left'><span>2nd</span></div>" +
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
        " <input type='checkbox' class='multi-select'>" +
        " <div class='checkbox_container' onclick='selectRow(event, this)'></div>" +
        " </div>";
    currentParent.insertAdjacentElement('afterend', createSecondLevelElement);
    enableHelp();
}

function createOrLevel(el) {
    var existingElements = document.getElementsByClassName('query');
    var currentParent = el.parentNode.parentNode;
    var createOrLevel = document.createElement('div');
    createOrLevel.setAttribute('class', 'query intent query-border-or');
    createOrLevel.setAttribute('oncontextmenu', 'removeElement(event, this)');

    for ( var i = 0; i < existingElements.length; i++ ) {
        parentIdArray.push(parseInt(existingElements[i].id));
    }

    parentId = Math.max.apply(null, parentIdArray) + 1;
    createOrLevel.setAttribute('id', parentId.toString());

    createOrLevel.innerHTML =
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
        " <input type='checkbox' class='multi-select'>" +
        " <div class='checkbox_container' onclick='selectRow(event, this)'></div>" +
        " </div>";
    currentParent.insertAdjacentElement('afterend', createOrLevel);
    enableHelp();
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
    enableHelp();
}

function searchItems(event) {
    var existingElements = document.getElementsByClassName('query');
    var formElement = document.getElementById('queryFilter');
    var selectedId = event.target.id;
    var selectedText = event.target.innerText;
    for (var i=0; i < formElement.elements.length; i++) {
        var elementId = formElement.elements[i].id;
        if (selectedId === elementId) {
            alert(selectedText + ' table already exists!');
            return false;
        }
    }

    var parentContainer = document.getElementById('query-filter');
    var createElementFromSearch = document.createElement('div');
    createElementFromSearch.setAttribute('class', 'query query-border');
    createElementFromSearch.setAttribute('oncontextmenu', 'removeElement(event, this)');

    for ( var i = 0; i < existingElements.length; i++ ) {
        parentIdArray.push(parseInt(existingElements[i].id));
    }
    parentId = Math.max.apply(null, parentIdArray) + 1;
    createElementFromSearch.setAttribute('id', parentId.toString());

    createElementFromSearch.innerHTML =
        " <div class='query-left'><span>2nd</span></div>" +
        " <div class='query-middle'>" +
        " <input type='text' class='form-field' id='" + selectedId + "' value='" + selectedText + "'>"+
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
        " <input type='checkbox' class='multi-select'>" +
        " <div class='checkbox_container' onclick='selectRow(event, this)'></div>" +
        " </div>";
    parentContainer.appendChild(createElementFromSearch);
    enableHelp();
}

function bulkDelete() {
    var selectedRows = document.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < selectedRows.length; i++) {
        var el = document.getElementById(selectedRows[i].parentNode.parentNode.id);
        el.remove();
    }
    enableHelp();
}

function selectRow(event, el) {
    if (!el.parentNode.querySelector('input[type="checkbox"]').checked) {
        el.parentNode.querySelector('input[type="checkbox"]').checked = true;
        el.classList.add('highlight');
    } else {
        el.parentNode.querySelector('input[type="checkbox"]').checked = false;
        el.classList.remove('highlight');

    }

}

function enableHelp() {
    var helpContainer = document.getElementById('help');
    var numberOfRows = document.getElementsByClassName('query');
    if (numberOfRows.length > 1) {
        helpContainer.classList.add('show');
    } else {
        helpContainer.classList.remove('show');
    }
}
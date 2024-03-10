var ingredients = document.getElementsByClassName("ingredients")[0];
var directions = document.getElementsByClassName("directions")[0];

var countI = 1;
var countD = 1;

function addIngredient() {
    countI ++;

    var span = document.createElement("span");
    span.classList = `${countI} order`;
    span.innerHTML = `${countI}.`;

    var name = document.createElement("input");
    name.name = `ingredient-${countI}`;
    name.placeholder = `Ingredient (${countI})`;
    name.type = "text";
    name.required = true;

    var amount = document.createElement("input");
    amount.name = `amount-${countI}`;
    amount.placeholder = `Amount (${countI})`;
    amount.type = "text";
    amount.required = true;

    var button = document.createElement("button");
    button.classList = "delete glyphicon";
    button.innerHTML = "&#xe020;"
    button.name = countI;
    button.type = "button";
    button.addEventListener("click", deleteIngredient(countI));

    ingredients.appendChild(span);
    ingredients.appendChild(name);
    ingredients.appendChild(amount);
    ingredients.appendChild(button);

    updateCount();
}

function addDirection() {
    countD ++;

    var span = document.createElement("span");
    span.classList = `${countD} order`;
    span.innerHTML = `${countD}.`;

    var content = document.createElement("input");
    content.classList = "di";
    content.name = `direction-${countD}`;
    content.placeholder = `Direction (${countD})`;
    content.type = "text";
    content.required = true;

    var button = document.createElement("button");
    button.classList = "delete glyphicon";
    button.innerHTML = "&#xe020;"
    button.name = countD;
    button.type = "button";
    button.addEventListener("click", deleteDirection(countD));

    directions.appendChild(span);
    directions.appendChild(content);
    directions.appendChild(button);

    updateCount();
}

function deleteIngredient(target) {
    return function() {
        for (var i = target; i < countI; i ++) {
            getI(i).value = getI(i+1).value;
            getA(i).value = getA(i+1).value;
        }
        ingredients.removeChild(getSpanI(countI));
        ingredients.removeChild(getI(countI));
        ingredients.removeChild(getA(countI));
        ingredients.removeChild(getDeleteI(countI));
        countI --;

        updateCount();
    }
}

function deleteDirection(target) {
    return function() {
        for (var i = target; i < countD; i ++) {
            getD(i).value = getD(i+1).value;
        }
        directions.removeChild(getSpanD(countD));
        directions.removeChild(getD(countD));
        directions.removeChild(getDeleteD(countD));
        countD --;

        updateCount();
    }
}

function getSpanI(target) {
    return document.getElementsByClassName(countI)[0];
}
function getI(target) {
    return document.getElementsByName(`ingredient-${target}`)[0];
}
function getA(target) {
    return document.getElementsByName(`amount-${target}`)[0];
}
function getDeleteI(target) {
    return document.getElementsByName(countI)[0];
}

function getSpanD(target) {
    return directions.getElementsByClassName("order")[target-1];
}
function getD(target) {
    return document.getElementsByName(`direction-${target}`)[0];
}
function getDeleteD(target) {
    return directions.getElementsByTagName("button")[target-1];
}

function updateCount() {
    document.getElementsByName("countI")[0].value = countI;
    document.getElementsByName("countD")[0].value = countD;
}
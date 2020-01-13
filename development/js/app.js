const formEl = document.querySelector('.name-insert');
const userDefault = document.querySelector('.user h2');
const greetingSection = document.querySelector('.greeting-section');

function loadPage() {
    if (localStorage.getItem('savedName') !== null && localStorage.savedName.length > 0) {
        userDefault.innerText = JSON.parse(localStorage.savedName);
        if (greetingSection !== null) {
            greetingSection.style.display = "none";
        }
    }
}
if (formEl !== null) {
    formEl.addEventListener('submit', function (event) {
        event.preventDefault();
        const userName = document.querySelector('#user-name').value;
        console.log(userName);

        localStorage.setItem('savedName', JSON.stringify(userName));
        userDefault.innerText = JSON.parse(localStorage.savedName);


        greetingSection.style.display = "none";
    });
}

loadPage();



//    adding recipe

const addRecipeButton = document.querySelector('.top-bar .fa-plus-square.add-recipe');
const listRecipesSection = document.querySelector('section.list-of-recipes');
const addRecipeSection = document.querySelector('section.add-receipe-form');
const saveCloseButton = document.querySelector('button.save-close');
const addInstructionsButton = document.querySelector('.recipe-instruction .add-recipe');
const addDescriptionButton = document.querySelector('.recipe-description .add-recipe');
const instructionListEl = document.querySelector('.instruction-list');
const descriptionList = document.querySelector('.description-list ul');
let counter = 0;
let allRecipes = [];

    if (localStorage.getItem("recipe") !== "null") {
        JSON.parse(localStorage.recipe).forEach(function (element) {
            allRecipes.push(element);
        })
    }



function correctLiNumber() {
    const allLiCounters = document.querySelectorAll('#recipeCounter');
    let counter = 1;
    allLiCounters.forEach(function (element) {
        element.innerText = counter;
        counter++;
    })
}



addRecipeButton.addEventListener('click', function (event) {
        listRecipesSection.style.display = 'none';
        addRecipeSection.classList.toggle('hidden');
});

saveCloseButton.addEventListener('click', function (event) {
    listRecipesSection.style.display = 'inherit';
    addRecipeSection.classList.toggle('hidden');
});


addInstructionsButton.addEventListener('click', function () {
    let instructionFieldValue = document.querySelector('#new-receipe-instruction').value;


        const instructionUlEl = document.createElement('ul');
        const ulInner = `
              <li id="recipeCounter"></li>
              <li>${instructionFieldValue}.<i class="far fa-edit" id="instr-edit-button"></i><i class="far fa-trash-alt" id="instr-basket"></i></li>
         `;
        instructionUlEl.innerHTML = ulInner;

        if (instructionFieldValue.length > 0) {
            instructionListEl.appendChild(instructionUlEl);
        }

    document.querySelector('#new-receipe-instruction').value = ""


    // editing/deleting elements in new recipes

    const removeButton = document.querySelectorAll('#instr-basket');
    const editButton = document.querySelectorAll('#instr-edit-button');

    removeButton.forEach(function (element) {
        element.addEventListener('click', function (event) {
            const liEl = this.parentElement;
            const ulEl = liEl.parentElement;
            ulEl.parentElement.removeChild(ulEl);
        });
    });

});


addDescriptionButton.addEventListener('click', function (event) {
    let descriptionFieldValue = document.querySelector('#new-receipe-ingredient').value;
    const removeButton = document.querySelectorAll('#description-basket');
    const editButton = document.querySelectorAll('#description-edit');

    const newElInner = `
    ${descriptionFieldValue}
        <i class="far fa-edit" id="description-edit"></i>
        <i class="far fa-trash-alt" id="description-basket"></i>
    `;
    const newLiEl = document.createElement('li');
    newLiEl.innerHTML = newElInner;
    if(descriptionFieldValue.length > 0) {
        descriptionList.appendChild(newLiEl);
    }
    document.querySelector('#new-receipe-ingredient').value = ""

// editing/deleting elements in new recipes

    removeButton.forEach(function (element) {
        element.addEventListener('click', function (event) {
            const liEl = element.parentElement;
            const ulEl = liEl.parentElement;
            ulEl.removeChild(liEl);
        });
    });

});

// correct list numbers in instructions

document.querySelector('.recipe-instruction').addEventListener('click', function () {
    const allLiCounters = document.querySelectorAll('#recipeCounter');
    let counter = 1;
    allLiCounters.forEach(function (element) {
        element.innerText = counter + '.';
        counter++;
    })
});

//  ******************************
//  new recipe to the list
// ***********************************

saveCloseButton.addEventListener('click',function () {
    function Recipe(id, title, description) {
        this.id = id; // id przepisu
        this.title = title; // nazwa przepisu
        this.description = description; // opis przepisu
        this.ingredients = []; // składniki przepisu
        this.instructions = []; // instrukcje przepisu
    }

    const nameRecipeValue = document.querySelector('#new-receipe-name').value;
    const descriptionFieldValue = document.querySelector('#new-receipe-description').value;
    const allRecipesDivEl = document.querySelector('.all-recipes');




 if (nameRecipeValue.length > 0 && descriptionFieldValue.length > 0) {
     // let recipeKey = 'recipe' + counter;
     // console.log(recipeKey);
     // console.log(counter);

     const recipeKey = new Recipe(allRecipes.length + 1, nameRecipeValue, descriptionFieldValue);
     allRecipes.push(recipeKey);

     console.log(recipeKey);
     localStorage.setItem("recipe", JSON.stringify(allRecipes));
     const newUl = document.createElement('ul');
     newUl.classList.add('recipe');

     newUl.innerHTML = `
                    <li id="recipeCounter">1</li>
                    <li>${recipeKey.title}</li>
                    <li>${recipeKey.description}</li>
                    <li>
                        <i class="far fa-edit edit-recipe"></i>
                        <i class="far fa-trash-alt delete-recipe"></i>
                        <br>
                        <i class="far fa-clone"></i>
                        <i class="far fa-file-pdf"></i>
                        <i class="fas fa-print"></i>
                    </li>
         `;

     allRecipesDivEl.appendChild(newUl);
     counter++;
     document.querySelector('#new-receipe-name').value = "";
     document.querySelector('#new-receipe-description').value = ""
 }
    // correct recipe numbers in list

    document.querySelector('.list-of-recipes').addEventListener('click', correctLiNumber);
    saveCloseButton.addEventListener('click', correctLiNumber);
});
function loadRecipesList() {
    if (localStorage.getItem("recipe") !== "null") {
        const recipeObjects = JSON.parse(localStorage.recipe);
        recipeObjects.forEach(function (element) {
            const newUl = document.createElement('ul');
            newUl.classList.add('recipe');
            const allRecipesDivEl = document.querySelector('.all-recipes');

            newUl.innerHTML = `
                    <li id="recipeCounter">1</li>
                    <li>${element.title}</li>
                    <li>${element.description}</li>
                    <li>
                        <i class="far fa-edit edit-recipe"></i>
                        <i class="far fa-trash-alt delete-recipe"></i>
                        <br>
                        <i class="far fa-clone"></i>
                        <i class="far fa-file-pdf"></i>
                        <i class="fas fa-print"></i>
                    </li>
         `;
            allRecipesDivEl.appendChild(newUl);
        })
        }
}
loadRecipesList();
correctLiNumber();

/*
 **********************************************************************
 * ********************************************************************
 */

function Recipe(id, title, description) {
    this.id = id; // id przepisu
    this.title = title; // nazwa przepisu
    this.description = description; // opis przepisu
    this.ingredients = []; // składniki przepisu
    this.instructions = []; // instrukcje przepisu
}
/*
 Metoda `.showInfo()`
 wyświetlająca w konsoli wszystkie informacje o przepisie */
Recipe.prototype.showInfo = function() {
    console.warn(this.id, this.title); // wyświetl id oraz tytuł
    console.warn(this.description); // wyświetl opis
    this.ingredients.map(function(elem, i) {
        console.warn(i, elem); // wyświetl każdy element
    })
    this.instructions.map(function(elem, i) {
        console.warn(i, elem); // wyświetl każdy element
    })
}

/*
Metoda `.saveToLocalStorage()`
zapisująca do localStorage informacje o przepisie */
Recipe.prototype.saveToLocalStorage = function() {
    /* if(){
        // uzupełnij
      }else{
        // uzupełnij
      } */
}

// przygotowanie globalnej zmiennej przechowującej wszystkie przepisy
var allRecipies = [];

// utworzenie kilku przykładowych przepisów
var newRecipe1 = new Recipe(allRecipies.length + 1, "Jajecznica na boczku", "Taką jajecznicę lubie najbardziej ;p ");
allRecipies.push(newRecipe1); // dodanie przepisu do globalnej tablicy
var newRecipe2 = new Recipe(allRecipies.length + 1, "Fasolka po bretońsku", "Taka fasolka że kołdrę podnosi!");
allRecipies.push(newRecipe2);
var newRecipe3 = new Recipe(allRecipies.length + 1, "Sałatka grecka", "Oryginalna sałatka grecka z pomidora, ogórka, czerwonej cebuli i czarnych oliwek, z oliwą i oregano. ");
allRecipies.push(newRecipe3);

// dodawanie składników do przepisu (newRecipe1, allRecipies[0])
newRecipe1.ingredients.push("3 jajka");
newRecipe1.ingredients.push("mała cebula");
newRecipe1.ingredients.push("szczypiorek");
newRecipe1.ingredients.push("5 plasterków boczku");

newRecipe1.instructions.push("Rozpuść masło na patelni i podgrzej.");
newRecipe1.instructions.push("Dodaj boczek.");
newRecipe1.instructions.push("Na rozgrzaną patelnię wbij jajaka i mieszaj doprawiając.");
newRecipe1.instructions.push("Podawaj z grzankami. Smacznego!");

console.clear();
allRecipies[0].showInfo(); // wyświetla pierwszy przepis w konsoli


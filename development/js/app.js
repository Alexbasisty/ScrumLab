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
    function fillArrWithRecipes () {
        if (localStorage.getItem("recipe") !== null) {
            const everyObject = JSON.parse(localStorage.recipe);
            everyObject.forEach(function (element) {
                allRecipes.push(element);
            })
        } else {
            allRecipes = [];
        }
    }
fillArrWithRecipes();

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
        instructionUlEl.innerHTML = `
              <li id="recipeCounter"></li>
              <li class="instruction">${instructionFieldValue}.<i class="far fa-edit" id="instr-edit-button"></i><i class="far fa-trash-alt" id="instr-basket"></i></li>
         `;

        if (instructionFieldValue.length > 0) {
            instructionListEl.appendChild(instructionUlEl);
        }

    document.querySelector('#new-receipe-instruction').value = ""
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
    if (descriptionFieldValue.length > 0) {
        descriptionList.appendChild(newLiEl);
    }
    document.querySelector('#new-receipe-ingredient').value = ""
});
// correct list numbers in instructions
function correctLiNum() {
    const allLiCounters = document.querySelectorAll('#recipeCounter');
    let counter = 1;
    allLiCounters.forEach(function (element) {
        element.innerText = counter + '.';
        counter++;
    });
}
document.querySelector('.recipe-instruction').addEventListener('click', correctLiNum);

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
     const recipeKey = new Recipe(allRecipes.length + 1, nameRecipeValue, descriptionFieldValue);

     const allInstructionContent = document.querySelectorAll('.instruction');
     allInstructionContent.forEach(function (element) {
         recipeKey.instructions.push(element.innerText);
     });

     const allDescriptions = document.querySelectorAll('.description-list li');
     allDescriptions.forEach(function (element) {
         recipeKey.ingredients.push(element.innerText);
         console.log(element.textContent);
     });

     allRecipes.push(recipeKey);

     console.log(recipeKey);
     localStorage.setItem("recipe", JSON.stringify(allRecipes));
     const newUl = document.createElement('ul');
     newUl.classList.add('recipe');

     newUl.innerHTML = `
                    <li>${recipeKey.id}</li>
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
     document.querySelector('#new-receipe-description').value = "";
     document.querySelector('.instruction-list').textContent = "";
     document.querySelector('.description-list ul').textContent = "";





 }
});
function loadRecipesList() {
    if (localStorage.getItem("recipe") !== null) {
        const recipeObjects = JSON.parse(localStorage.recipe);
        recipeObjects.forEach(function (element) {
            const newUl = document.createElement('ul');
            newUl.classList.add('recipe');
            const allRecipesDivEl = document.querySelector('.all-recipes');

            newUl.innerHTML = `
                    <li>${element.id}</li>
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

if (localStorage.getItem("recipe") !== null) {
    const editButton = document.querySelectorAll('.edit-recipe');
    editButton.forEach(function (element) {
        element.addEventListener('click', function () {
            listRecipesSection.style.display = 'none';
            addRecipeSection.classList.toggle('hidden');

            const currRecipeID = JSON.parse(element.parentElement.parentElement.firstElementChild.innerText);
            const currRecipeObject = JSON.parse(localStorage.recipe)[currRecipeID - 1];
            let currRecipeName = currRecipeObject.title;
            let currRecipeDescription = currRecipeObject.description;
            let currRecipeInstructions = currRecipeObject.instructions;
            let currRecipeIngredients = currRecipeObject.ingredients;

            currRecipeInstructions.forEach(function (element) {
                const instructionUlEl = document.createElement('ul');
                instructionUlEl.innerHTML = `
              <li id="recipeCounter"></li>
              <li class="instruction">${element}<i class="far fa-edit" id="instr-edit-button"></i><i class="far fa-trash-alt" id="instr-basket"></i></li>
         `;
                instructionListEl.appendChild(instructionUlEl);
                correctLiNum();
            });

            currRecipeIngredients.forEach(function (element) {
                const newElInner = `
    ${element}
        <i class="far fa-edit" id="description-edit"></i>
        <i class="far fa-trash-alt" id="description-basket"></i>
    `;
                const newLiEl = document.createElement('li');

                newLiEl.innerHTML = newElInner;
                    descriptionList.appendChild(newLiEl);
            });
            document.querySelector('#new-receipe-name').value = currRecipeName;
            document.querySelector('#new-receipe-description').value = currRecipeDescription;

            saveCloseButton.addEventListener('click', function () {
                currRecipeName = document.querySelector('#new-receipe-name').value;
                currRecipeDescription = document.querySelector('#new-receipe-description').value

            })


        })
    })
}



/*
 **********************************************************************
 * ********************************************************************
 */

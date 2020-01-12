
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

saveCloseButton.addEventListener('click',function () {
    class Recipe{
        constructor(name, description, instruction, ingredients){
            this.name = name;
            this.description = description;
            this.instruction = instruction;
            this.ingredients = ingredients;
        }
    }
    const nameRecipeValue = document.querySelector('#new-receipe-name').value;
    const descriptionFieldValue = document.querySelector('#new-receipe-description').value;
    const allRecipesDivEl = document.querySelector('.all-recipes');

    const recipe = new Recipe(nameRecipeValue, descriptionFieldValue);
    localStorage.setItem('recipe', JSON.stringify(recipe));
    const newUl = document.createElement('ul');
    newUl.classList.add('recipe');

    const recipeFromLS = JSON.parse(localStorage.recipe);

    const newUlElments = `                             
                    <li>1</li>
                    <li>$recipeFromLS.name}</li>
                    <li>${recipeFromLS.description}</li>
                    <li>
                        <i class="far fa-edit edit-recipe"></i>
                        <i class="far fa-trash-alt delete-recipe"></i>
                        <br>
                        <i class="far fa-clone"></i>
                        <i class="far fa-file-pdf"></i>
                        <i class="fas fa-print"></i>
                    </li>
         `;
    newUl.innerHTML = newUlElments;
    allRecipesDivEl.appendChild(newUl);

});



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

class Recipe{
    constructor(name, description, instruction){
        this.name = name;
        this.description = description;
        this.instruction = instruction
    }
}

addInstructionsButton.addEventListener('click', function () {
    let instructionFieldValue = document.querySelector('#new-receipe-instruction').value;

    if (instructionListEl.hasChildNodes() === true) {
        const recipeCounter = parseInt(instructionListEl.lastElementChild.firstElementChild.innerText);

        const instructionUlEl = document.createElement('ul');
        const ulInner = `
              <li>${recipeCounter + 1}.</li>
              <li>${instructionFieldValue}.<i class=\"far fa-edit\"></i><i class=\"far fa-trash-alt\"></i></li>
         `;
        instructionUlEl.innerHTML = ulInner;
        if (instructionFieldValue.length > 0) {
            instructionListEl.appendChild(instructionUlEl);
        }
    } else {
        const instructionUlEl = document.createElement('ul');
        const recipeCounter = 1;
        const ulInner = `
              <li>${recipeCounter}.</li>
              <li>${instructionFieldValue}.<i class="far fa-edit"></i><i class="far fa-trash-alt"></i></li>
         `;
        instructionUlEl.innerHTML = ulInner;
        if (instructionFieldValue.length > 0) {
            instructionListEl.appendChild(instructionUlEl);
        }
    }
    document.querySelector('#new-receipe-instruction').value = ""
});


addDescriptionButton.addEventListener('click', function (event) {
    let descriptionFieldValue = document.querySelector('#new-receipe-ingredient').value;

    const newElInner = `
    ${descriptionFieldValue}
        <i class="far fa-edit"></i>
        <i class="far fa-trash-alt"></i>
    `;
    const newLiEl = document.createElement('li');
    newLiEl.innerHTML = newElInner;
    if(descriptionFieldValue.length > 0) {
        descriptionList.appendChild(newLiEl);
    }
    document.querySelector('#new-receipe-ingredient').value = ""
});

// editing/deleting elements in new recipes


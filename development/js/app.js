
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
    const instructionFieldValue = document.querySelector('#new-receipe-instruction').value;

    const newRecipe = new Recipe();
    newRecipe.instruction = instructionFieldValue;
    localStorage.setItem('recipe', JSON.stringify(newRecipe));

    if (instructionListEl.hasChildNodes() === true) {
        const recipeCounter = parseInt(instructionListEl.lastElementChild.firstElementChild.innerText);

        const instructionUlEl = document.createElement('ul');
        const ulInner = `
              <li>${recipeCounter + 1}.</li>
              <li>${instructionFieldValue}.<i class=\"far fa-edit\"></i><i class=\"far fa-trash-alt\"></i></li>
`;
        instructionUlEl.innerHTML = ulInner;
        instructionListEl.appendChild(instructionUlEl);
    } else {
        const instructionUlEl = document.createElement('ul');
        const recipeCounter = 1;
        const ulInner = `
              <li>${recipeCounter}.</li>
              <li>${instructionFieldValue}.<i class=\"far fa-edit\"></i><i class=\"far fa-trash-alt\"></i></li>
`;
        instructionUlEl.innerHTML = ulInner;
        instructionListEl.appendChild(instructionUlEl);
        console.log(instructionFieldValue);
    }
});

addDescriptionButton.addEventListener('click', function (event) {
    const descriptionFieldValue = document.querySelector('#new-receipe-ingredient').value;
    console.log(descriptionFieldValue);
});
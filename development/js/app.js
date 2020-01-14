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
              <li>${instructionFieldValue}.<i class="far fa-edit" id="instr-edit-button"></i><i class="far fa-trash-alt" id="instr-basket"></i></li>
         `;

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

//------------------------------------------
//editing

const removeButton = document.querySelectorAll('#instr-basket');
const editButton = document.querySelectorAll('#instr-edit-button');

editButton.forEach(function (element){
    element.addEventListener('click', function (event) {
        event.preventDefault();
        const liEl = this.parentElement;
        const ulEl = liEl.parentElement;
        ulEl.toggleClass("editable");

        if (ulEl.classList.contains('editable')) {
            let liText = liEl.innerText;
            ulEl.childNodes.replaceWith(`
                <input value="${liText}">
            `)
        } else {
            let liText = liEl.innerText;
            ulEl.childNodes.replaceWith(`
            <li>${liText}<i class="far fa-edit"></i>
            <i class="far fa-trash-alt"></i></li>
            `)
        }

    //     if (liText.length > 0) {
    //         // recipe.description = liText;?
    //         localStorage.setItem("description", liText);
    //     }
    // })

    //czy będzie jakiś button do zapisywania zmian?

})
//------------------------------------------
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
                    <li id="recipeCounter">${recipeKey.id}</li>
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

});
function loadRecipesList() {
    if (localStorage.getItem("recipe") !== null) {
        const recipeObjects = JSON.parse(localStorage.recipe);
        recipeObjects.forEach(function (element) {
            const newUl = document.createElement('ul');
            newUl.classList.add('recipe');
            const allRecipesDivEl = document.querySelector('.all-recipes');

            newUl.innerHTML = `
                    <li id="recipeCounter">${element.id}</li>
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

/*
 **********************************************************************
 * ********************************************************************
 */

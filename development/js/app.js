
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


///////////////////////////////// add new plan 6.2

//zmienne:

//sekcja z formularzem dla nowego planu:
const addNewPlanSection = document.querySelector('section.add-new-plan');

//button dodawania nowego planu na pulpicie(zielony krzyżyk):
const buttonAddNewPlan = document.querySelector('.widgets .add-plan');

// sekcja pulpitu
const pulpit = document.querySelector('section.pulpit');


// eventListener na button-> pokaże okno dodaj nowy plan, zamknie okno pulpit

buttonAddNewPlan.addEventListener('click', function(event){
    addNewPlanSection.style.display = 'block';
    pulpit.style.display = 'none';
});


// zmienne pobierające dane z formularza:
// nazwa planu:
const planNameElement = document.querySelector('.plan-form input.plan-name');
// wartość pobrana z inputa plan-name:
const planName = planNameElement.value;
// opis planu:
const planDescriptionElement = document.querySelector('.plan-form input.plan-description');
// wartość pobrana z inputa plan-description:
const planDescription = planDescriptionElement.value;
//numer tygdnia:
const weekNumberElement = document.querySelector('.plan-form .plan-week-number');
//wartość pobrana z numeru tygodnia:
const weekNumber = weekNumberElement.value;
// button mocy- zapisz i zamknij!
const buttonSubmitSaveAndClose = document.querySelector('.add-new-plan button.submit');
//lista select- class meal w stringu- będziemy dodawać do options przepisy pobrane z listy przepisów
let allSelectElements = document.querySelectorAll('.week-schedule-select ul li select.meal');
// console.log(allSelectElements);
//widzimy, że poszczególne selecty są przypożądkowane do dni tygodnia, trzeba będzie podobnie zbudować listę planów, żeby można było przepisać przepisy w pętli


//funkcja pobierz listę nazw przepisów i wpisz je do listy // ALEX to już zrobił
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

//* musze z niej skorzystać, żeby pobrać dane z JSON
// klucz do listy przepisów:
const recipeKey = new Recipe(allRecipes.length + 1, nameRecipeValue, descriptionFieldValue);
allRecipes.push(recipeKey);

console.log(recipeKey);











//event do buttona będzie zawierał funkcje pisane wyżej
buttonSubmitSaveAndClose.addEventListener('click', function(event){
    
    //jeżeli w localstorage znajdują się przepisy (lub na liście, muszę sprawdzić)
    



    // na sam koniec zmieniamy display- ukrywamy add-plan-form a pokazujemy pulpit
    addNewPlanSection.style.display = 'none';
    pulpit.style.display = 'block';
})

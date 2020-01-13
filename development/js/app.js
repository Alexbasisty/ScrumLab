
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


// ****************** kod Alexa, któ©y pobiera imię osoby do LS i przełącza pulpit ****************//

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
        // console.log(userName);

        localStorage.setItem('savedName', JSON.stringify(userName));
        userDefault.innerText = JSON.parse(localStorage.savedName);


        greetingSection.style.display = "none";
    });
}

loadPage();


// ****************** koniec kodu tablicy powitalnej ****************//


////*************************  add new plan 6.2  ***********************//


//zmienne:


//sekcja z formularzem dla nowego planu:
const addNewPlanSection = document.querySelector('section.add-new-plan');
//button dodawania nowego planu na pulpicie(zielony krzyżyk):
const buttonAddNewPlan = document.querySelector('.widgets .add-plan');
// sekcja pulpitu
const pulpit = document.querySelector('section.pulpit');


// eventListener na button-> pokaże okno dodaj nowy plan, zamknie okno pulpit
if(pulpit !== null){ 
    buttonAddNewPlan.addEventListener('click', function(event){
        addNewPlanSection.style.display = 'block';
        pulpit.style.display = 'none';
    });
}





// zmienne pobierające dane z formularza:
// nazwa planu:
const planNameElement = document.querySelector('.plan-form input.plan-name');
// wartość pobrana z inputa plan-name:
// const planName = planNameElement.value;
// opis planu:
const planDescriptionElement = document.querySelector('.plan-form input.plan-description');
// wartość pobrana z inputa plan-description:
// const planDescription = planDescriptionElement.value;
//numer tygdnia:
const weekNumberElement = document.querySelector('.plan-form .plan-week-number');
//wartość pobrana z numeru tygodnia:
// const weekNumber = weekNumberElement.value;
// button mocy- zapisz i zamknij!
const buttonSubmitSaveAndClose = document.querySelector('.add-new-plan button.submit');
//lista select- class meal w stringu- będziemy dodawać do options przepisy pobrane z listy przepisów
let allSelectElements = document.querySelectorAll('.week-schedule-select ul li select.meal');
// console.log(allSelectElements);
//widzimy, że poszczególne selecty są przypożądkowane do dni tygodnia, trzeba będzie podobnie zbudować listę planów, żeby można było przepisać przepisy w pętli





//event do buttona będzie zawierał funkcje pisane niżej

if(pulpit !== null){ 
    buttonSubmitSaveAndClose.addEventListener('click', function(event){
    
        //jeżeli w localstorage znajdują się przepisy (lub na liście, muszę sprawdzić)
        
    
    
    
        // na sam koniec zmieniamy display- ukrywamy add-plan-form a pokazujemy pulpit
    addNewPlanSection.style.display = 'none';
    pulpit.style.display = 'block';
    });
}



//cała reszta magii, która zadziała po naciśnięciu buttona:

// tworzę obiekt, który będzie łapał informacje z formularza dodawania nowego planu do LS



//funkcja która będzie renderować każdy nowy plan w DOM i tworzyć el. listy i dodawać je w pliku schedules
//zmienne:
//lista planów div z ul i li:
const schedulesListElement = document.querySelector(".all-schedules");
//cały kontener pokazujący listę dodanych planów:
const schedulesPage = document.querySelector('.list-of-schedules');


// jeżeli jesteśmy na stronie listy z planami -
if(schedulesPage !== null){
    console.log("strona z listą przepisów");
    function Plan(id, title, description, weekNumber) {
        this.id = id; //nr porządkowy planu-wg kolejności
        this.title = title; //nazwa planu
        this.description = description; // opis planu
        this.weekNumber = weekNumber;  //nr tygodnia
    };
    //przyykładowy obiekt:
    const dzien1 = new Plan(1, "tytul", "opisPLanu", "tydzien3");
    renderPlanElement(dzien1);
}


//funckja, która dodaje do Drzewa DOM nowy element listy z danymi nowego planu
function renderPlanElement(){
    console.log('działam')
    //tworzę nowy element UL:
    const newUl = document.createElement('ul');
    newUl.classList.add('schedule');
    //ustawiam mu wewnętrny html, żeby się nie nadoawać elementów:
    newUl.innerHTML = `
    
        <li>${Plan.id}</li>
        <li>${Plan.title}</li>
        <li>${Plan.description}</li>
        <li>${Plan.weekNumber}</li>
        <li>
            <i class="far fa-edit edit-recipe edit-schedule"></i>
            <i class="far fa-trash-alt delete-recipe delete-schedule"></i>
            <br>
            <i class="far fa-clone"></i>
            <i class="far fa-file-pdf"></i>
            <i class="fas fa-print"></i>
    </li>
    
    `;
    //dodaję do DOM
    schedulesListElement.appendChild(newUl);

};






const formEl = document.querySelector('.name-insert');
const userDefault = document.querySelector('.user h2');
const greetingSection = document.querySelector('.greeting-section');

function loadPage(){
    if (localStorage.getItem('savedName') !== null && localStorage.savedName.length > 0) {
        userDefault.innerText = localStorage.savedName;
        greetingSection.style.display = "none";
    }
}
formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    const userName = document.querySelector('#user-name').value;
    console.log(userName);

    localStorage.setItem('savedName', userName);
    userDefault.innerText = localStorage.savedName;
    greetingSection.style.display = "none";
});

loadPage();


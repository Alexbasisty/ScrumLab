
const formEl = document.querySelector('.name-insert');
const userDefault = document.querySelector('.user h2');


formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    const userName = document.querySelector('#user-name').value;
    console.log(userName);

    localStorage.setItem('savedName', userName);
    userDefault.innerText = localStorage.savedName;

});

console.log(localStorage.savedName);
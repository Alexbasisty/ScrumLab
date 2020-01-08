console.clear();
/*
 ****** ZAPISYWANIE
 */

/*
	Metoda `.setItem(string)`:
  > Aby zapisać wartość zmiennej `userName` w Local Storage pod nazwą `savedName` użyj: */
const userName = document.querySelector('#user-name').value();
localStorage.setItem('savedName', userName);

/*
 ****** USUWANIE:
 */
/*
  Metoda `.removeItem(string)`:
  > Wywołanie tej metody z podaną nazwą klucza np.: `userName` usunie go z pól obiektu `localStorage` :
*/

localStorage.removeItem('userName');

/*
 ****** ODCZYTYWANIE:
 */
/*
  Pole obiektu localStorage:
  > Możesz teraz odczytać wartość z Local Storage pod nazwą `savedName`, zobacz:
*/

console.log("Twoje imię to: ", localStorage.savedName);

/*
  Metoda `.getItem(string)`:
  > Możesz teraz odczytać wartość z Local Storage pod nazwą `savedName`, zobacz:
*/

var savedData = localStorage.getItem("savedName");
console.log("Masz na imię: ", savedData);

/*
  Jak sprawdzić czy istnieje wartość w localStorage `.getItem(string)`:
  > wszystkie zarejestrowane `item` są widoczne jako pola obiektu `localStorage`:
*/

console.log(localStorage);

// W konsoli wyświetlą się klucze obiektu `localStorage`
/* Storage {ga:clientId: "1481497111.1494013640", savedName: "Yanush", length: 2}

  Jeśli klucz np.: `notExisting` nie był zapisywany, metoda .getItem(string) zwróci `null`
*/
console.log("Zwracana wartość: ", localStorage.getItem("notExisting"));

/*
 ****** CZYSZCZENIE PAMIĘCI LOCAL STORAGE:
 https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
 */

/* ****** POBIERANIE KLUCZY JAKO WARTOŚCI:
https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
 */

/* console.clear(); */
console.warn("SNIPPETY **********************************")
localStorage.clear();
/* *************************** * ***************************** */
/*                         SNIPPETY:                           */
/*  JAK ZAPISAĆ DANE I SPRAWDZIĆ CZY PRZY PONOWNYCH ODWIEDZINACH JUŻ ISTNIEJĄ?
 */
/* Sprawdzamy czy klucz `data` istnieje w localStorage: */
if (localStorage.getItem("data") !== "null") {
    // tutaj umieszczamy kod który nastawia dane do zapisu
    // przykładowo tablica owoców ;p
    var fruits = ["Ananas", "Brzoskwinia", "Pomidor"];
    localStorage.setItem("data", fruits);
    // tablica jest zamieniona na string: "Ananas,Brzoskwinia,Pomidor"
} else {
    // Jeśli nie istnieje wyświetl komunikat:
    console.warn("Brak klucza data!", localStorage.getItem("data"))

}

/*  JAK WYŚWIETLIĆ ELEMENTY TABLICY ZAPISANEJ W LOCAL STORAGE?
 */
var dataArray = localStorage.getItem("data").split(",");// Do zmiennej `dataArray` przypisujemy zamieniony na tablicę string z localStorage:
console.log(dataArray);//(3) ["Ananas", "Brzoskwinia", "Pomidor"]

for (let i = 0; i < dataArray.length; i++) {
    console.log(i,dataArray[i]); // wyświetli każdy (index, element)
}


/* JAK DODAĆ ZAPISAĆ NOWĄ WARTOŚĆ W TABLICY */

dataArray.push("Liczi");// Dodajemy nowy owoc do tablicy.
localStorage.setItem("data",dataArray);//Zapisujemy do localStorage nowe dane
console.log(localStorage.getItem("data"));// "Ananas,Brzoskwinia,Pomidor,Liczi"

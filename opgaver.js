let persons = [
  { name: "Alice", age: 30, Number: "12345678", id: 1 },
  { name: "Bob", age: 25, Number: "87654321", id: 2 },
  { name: "Charlie", age: 35, Number: "11223344", id: 3 },
];
//console.log(persons);

// Opgaver 9.1
getname = (person) => {
  return person.name;
};

let names = persons.map(getname);
console.log(names);

getNumber = (person) => person.Number === "87654321";

let personWithNumber = persons.find(getNumber);
console.log(personWithNumber);

lowestAge = (person1, person2) => {
  return person1.age < person2.age ? person1 : person2;
};

let youngestPerson = persons.reduce(lowestAge);
console.log(youngestPerson);

// Opgave: Kommasepareret og sorteret navnestreng
let sortedNamesString = persons
  .map((person) => person.name)
  .sort()
  .join(", ");

console.log(sortedNamesString);

// Array med navn og mobilnummer på personer under 30
let under30NameNumber = persons
  .filter((person) => person.age < 30)
  .map((person) => ({ name: person.name, Number: person.Number }));

console.log(under30NameNumber);

//Opgave 9.2
function compareSort(compareFn) {
  return function (arr) {
    return [...arr].sort(compareFn);
  };
}

// Eksempel compare-funktioner
function compareLen(a, b) {
  return a.length - b.length;
}

function compareIgnoreCase(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

// Generer sorteringsfunktioner
const lenSort = compareSort(compareLen);
const ignoreCaseSort = compareSort(compareIgnoreCase);

// Test
console.log(lenSort(["Bob", "Alice", "Charlie"])); // Sorteret efter længde
console.log(ignoreCaseSort(["bob", "Alice", "charlie"])); // Sorteret case-insensitive

// Opgave 9.3
function compareSortValidated(compareFn) {
  return function (arr) {
    if (!Array.isArray(arr)) throw new Error("Parameter skal være et array");
    if (!arr.every((item) => typeof item === "string"))
      throw new Error("Alle elementer skal være strenge");
    return [...arr].sort(compareFn);
  };
}

const lenSortValidated = compareSortValidated(compareLen);
const ignoreCaseSortValidated = compareSortValidated(compareIgnoreCase);

// Test validering
try {
  console.log(lenSortValidated(["Bob", "Alice", "Charlie"]));
  console.log(lenSortValidated([1, 2, 3])); // Fejl
} catch (e) {
  console.error(e.message);
}

// Opgave 9.4 - Observer pattern
function subject() {
  const observers = [];
  function registerObserver(fn) {
    observers.push(fn);
  }
  function notifyObservers(...args) {
    observers.forEach((fn) => fn(...args));
  }
  return { registerObserver, notifyObservers };
}

// Test observer pattern
const mySubject = subject();

function observer1(msg) {
  console.log("Observer 1 modtog:", msg);
}
function observer2(msg) {
  console.log("Observer 2 modtog:", msg);
}

mySubject.registerObserver(observer1);
mySubject.registerObserver(observer2);

mySubject.notifyObservers("Hej Observers!");

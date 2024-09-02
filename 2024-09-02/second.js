// 1. Ulesanne - luua array numbritega ja leida spetsiifilise numbri index

// let array = [1,2,3,4,5,6,7,8,9];

// function findIndex(array, num) {
//     return array.indexOf(num);
// }

// console.log(findIndex(array, 5))

// 2. Arrow functions, kirjuta func kus liidad numbrid

function sumNum(num1, num2) {
    return num1 + num2;
}
console.log(sumNum(1,2));

// Kirjutada umber arrow functionina

const sumNumArrowFn = (num1, num2) => {
    return num1 + num2;
}
console.log(sumNumArrowFn(1, 4))

// Kirjutada umber shorthand arrow functionina
const sumNumShorthandArrowFn = (num1, num2) => num1 + num2;

console.log(sumNumShorthandArrowFn(1, 1));

// 3. Kirjutada func sellisel kujul, et saaks valja kutsuda nii ja saada vastus 7
function addNumbersNested(num1) {
    return function(num2){
        return num1 + num2;
    }
}
console.log(addNumbersNested(3)(4));

// Kirjutada umber arrow func
const addNumbersNestedArrowFn = (num1) => (num2) => num1 + num2
console.log(addNumbersNestedArrowFn(3)(5));

// 7. ulesanne AF printida "Hello (nimi)" ja kasutada string literals

const greet = (name = "World") => `Hello ${name}`;

console.log(greet());
console.log(greet("Jorgen"));

// Map ja filter
// Ulesanne liita igale elemendile juurde +5

const newArray = [1, 2, 3, 4, 5]
const addedArray = newArray.map(element => element + 5);

console.log(addedArray)

// kaime labi ka erinevad 3 parameetrit

const threeParameters = newArray.map((element, index, array) => {
    console.log(element, index, array)
    const added = 1+2

    return element + 5
});
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

// ulesanne 11
const array = [1, 2, 3, 4, 5];
// const filteredArray = newNewArray.filter(element => element > 3);

const filteredArray = array.filter((element) => {
    console.log(element > 4);

    return element > 4;
})

console.log({ filteredArray });
console.log(filteredArray);

// ulesanne 12
const names = ['Anni', 'Mari', 'Mati', 'Juku'];

const objectifiedNames = names.map(name => {
    return {
        name: name,
        age: name.length + 20,
        email: `${name}@company.com`,
        address: `${name} Street 10`,
        username: name.split('').reverse().join('')
    }
})

console.log({ objectifiedNames })

// ulesanne 13

let jorgen = {
    name: 'Jorgen',
    school: 'TLU',
}

jorgen = {...jorgen, height: 185}

console.log({ jorgen })


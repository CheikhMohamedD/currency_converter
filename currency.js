let rate1 = document.querySelector('.rate1');
let rate2 = document.querySelector('.rate2');
let resultBtn = document.querySelector('.result');
// let swap = document.querySelector('.swap');
// let options = document.querySelector('.options');

let selects = document.querySelectorAll('.options select');
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll('.input input');
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates = {};

let requestURL = 'https://api.exchangerate-api.com/v4/latest/USD';

fetchRates();

// Fetch the rates from the API
async function fetchRates() {
    let res = await fetch(requestURL);
    let data = await res.json();
    console.log(data);
    rates = data.rates;
    populateOptions();
}

//Populate the select options
function populateOptions() {
    let val = "";
    Object.keys(rates).forEach((code) => {
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach(s => s.innerHTML = val);
}

// Convert the values
function convert(val, fromCurr, toCurr) {
    let v = (val / rates[fromCurr]) * rates[toCurr];
    let v1 = v.toFixed(3);
    return v1 = 0.0 ? v.toFixed(5) : v1;
}

// Display the rate on input change
function displayRate(){
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2);

    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

resultBtn.addEventListener('click', () => {
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inpt1.value);
    let toCurr = sel2.value;

    if(isNaN(fromVal)){
        alert('Enter a valid number');
    }else{
        let cVal = convert(fromVal, fromCurr, toCurr);
        inpt2.value = cVal;
    }
});

selects.forEach(s => s.addEventListener('change', displayRate));

document.querySelector('.swap').addEventListener('click', () => {
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    displayRate();
});



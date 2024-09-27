const inLibra = document.querySelector('#inLibra');
const inYears = document.querySelector('#inYears');
const inRate = document.querySelector('#inRate');
const iconLibra = document.querySelector('#inputIcon')
const iconYears = document.querySelector('.iconYears')
const iconRate = document.querySelector('.iconRate')
const calcBtn = document.querySelector('.buttonCalc')
const clearButton = document.querySelector('.clearBut');
const iO = document.querySelector('#interOnly')
const repay = document.querySelector('#repayment')
const modal = document.querySelector('.modalContainer')
const res = document.querySelector('#output')
const tot = document.querySelector('#output2')
const form = document.querySelector('form');

/* Variables */
let m = null;
let r = null;
let n = null;
let interestOnly = null;
let total = null;

/* Events */

form.addEventListener('submit',
    function (e) {
        e.preventDefault()
        
        const format = new FormData(form)
        let libra = parseFloat(format.get('libra').replace(/,/, ''))
        let years = parseFloat(format.get('years').replace(/,/, '') * 12)
        let rate = parseFloat(format.get('rate') / 12)
        let pay = calculate(libra, years, rate)
    })

inLibra.addEventListener('input', () => {
    const libra = inLibra.value
    const data = libra.replaceAll(',', '');
    const formLibra = parseFloat(data).toLocaleString('en')
    inLibra.value = formLibra

})

inYears.addEventListener('input', () => {
    const years = inYears.value
    const data = years.replaceAll(',', '');
    const formYears = parseFloat(data).toLocaleString('en')
    inYears.value = formYears

})

inRate.addEventListener('input', () => {
    const rate = inRate.value
    const data = rate.replace(/[^0-9,.]/g, '');
    const formRate = parseFloat(data).toLocaleString('en')
    inRate.value = formRate
})

inLibra.addEventListener('click', () => {
    iconLibra.style.background = '#d4da2c'
})

inLibra.addEventListener('blur', () => {
    iconLibra.style.background = '#e3f4fc'
})

inYears.addEventListener('click', () => {
    iconYears.style.background = '#d4da2c'
})

inYears.addEventListener('blur', () => {
    iconYears.style.background = '#e3f4fc'
})

inRate.addEventListener('click', () => {
    iconRate.style.background = '#d4da2c'
})

inRate.addEventListener('blur', () => {
    iconRate.style.background = '#e3f4fc'
})

calcBtn.addEventListener('click',
    function inter() {

        if (interestOnly > 0) {

            let data = iO.value
            if (data === 'interest') {
                modal.classList.remove('visually-hidden')
                res.textContent = `${m}`
                tot.textContent = `${total.toFixed(2)}`
            } else {
                modal.classList.remove('visually-hidden')
                res.textContent = `${total.toFixed(2)}`
                tot.textContent = `${total.toFixed(2)}`
            }
        }

    })

clearButton.addEventListener('click', () => {
    form.reset();
    inLibra.value = '';
    inYears.value = '';
    inRate.value = '';
    res.textContent = '';
    tot.textContent = '';
    modal.classList.add('visually-hidden');
})

/* Functions */

function calculate(libra, years, rate) {
    r = ((rate / 100));
    n = ((1 + r) ** years);
    m = (((libra * r) * (n)) / ((n) - 1)).toFixed(2);
    interestOnly = (libra - m).toFixed(2);
    total = (m * years)
}

(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

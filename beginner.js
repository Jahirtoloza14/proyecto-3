document.addEventListener('DOMContentLoaded', () => {
    let get = sessionStorage.getItem("valor");
    document.getElementById('valor').textContent = get;

})


/* funcionamiento */
const clickButton = document.getElementById('miBoton');
const display = document.querySelector('.container');
const buttons = document.querySelector('.botones');
const coloresGuardados = JSON.parse(sessionStorage.getItem("coloresSeleccionados")) || [];



let codeLenght = 4;
let trys = 10;
let crackTry = 1;

beginner();

function beginner () {
    randomColors = [];
    crackTry = 1;
    display.innerHTML = '';
    buttons.innerHTML = '';
//* creacion de elementos y atributos *//
    for (let i = 1; i <= trys; i++) {
        let divTry = document.createElement('div');
        divTry.setAttribute('id', 'try-' + i);
        divTry.setAttribute('class', 'try');

        let tryLeft = document.createElement('div');
        tryLeft.setAttribute('class', 'left');

        let tryRight = document.createElement('div');
        tryRight.setAttribute('class', 'right');

        for (let i = 1; i <= codeLenght; i++) {
            let divL = document.createElement('div');
            let divR = document.createElement('div');

            tryLeft.append(divL);
            tryRight.append(divR);
        }

        divTry.append(tryLeft);
        divTry.append(tryRight);
        display.prepend(divTry);
        console.log(tryLeft, tryRight, divTry);
    }

    for (let i = 1; i <= codeLenght; i++) {
        let div_select_wrapper = document.createElement('div');
        div_select_wrapper.setAttribute('class', 'fondo');
        let select = document.createElement('select');


        for (let color of coloresGuardados) {
            let option = document.createElement('option');
            option.setAttribute('style', 'background-color:' + color);
            option.setAttribute('value', color);
            select.append(option);
        }
        select.setAttribute('style', 'background-color:' + coloresGuardados[0]);

        select.addEventListener('change', (e) => {
            e.target.setAttribute('style', 'background-color:' + e.target.value);
        });

        div_select_wrapper.append(select);
        buttons.append(div_select_wrapper);
    }
    randomCode();
}




//* adivinar los colores *//
function randomCode() {
    for (let i = 1; i <= codeLenght; i++) {
        let random_color = coloresGuardados[Math.floor(Math.random() * coloresGuardados.length)]
        randomColors.push(random_color);

    }

}
//* mostrar los colores *//
clickButton.addEventListener('click', (e) => {

    let input_colors = document.querySelectorAll('.fondo>select');
    let input_colors_arr = [];
    for (let valor of input_colors) {
        input_colors_arr.push(valor.value);
    }
    show('left', input_colors_arr);
    correction_Array = createCorrectionArray(input_colors_arr);
    show('right', correction_Array);
    crackTry++;
    checkWin(correction_Array);

});


function show(type, coloresGuardados) {
    let tryView = document.querySelectorAll('#try-' + crackTry + '>.' + type + '>div');
    tryView.forEach((valor, i) => {
        valor.setAttribute('style', 'background-color:' + coloresGuardados[i]);
    });
}

function createCorrectionArray(input_colors_arr) {
    let random_code_copy = [...randomColors];
    let correction_Array = [];


    for (let it in random_code_copy) {
        if (random_code_copy[it] == input_colors_arr[it]) {
            random_code_copy[it] = null;
            input_colors_arr[it] = null;
            correction_Array.push('purple');
        }
    }

    for (let it in random_code_copy) {
        for (joy in input_colors_arr) {
            if (random_code_copy[it] != null && random_code_copy[it] == input_colors_arr[joy]) {
                random_code_copy[it] = null;
                input_colors_arr[joy] = null;
                correction_Array.push('white');
            }
        }
    }
    return correction_Array;
}

function checkWin(correction_Array) {
    let countCorrect = 0;
    for (let valor of correction_Array) {
        if (valor == 'purple') {
            countCorrect++;
        }
    }
    if (countCorrect == codeLenght) {
        window.location.href = 'win.html';
        beginner();
    } else if (crackTry > trys) {
        window.location.href = 'gameover.html';
        beginner();
    }
}
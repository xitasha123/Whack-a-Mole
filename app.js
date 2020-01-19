const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const score = document.querySelector('.score');
const startBtn = document.querySelector('.start');
const menu = document.querySelector('.menu');
const currentName = document.querySelector('#name');
const nameWarning = document.querySelector('.name-warning');
const level = document.querySelector('.level-select');
const finish = document.querySelector('.finish');
const allMoles = document.querySelector('.all-moles');
const catchedMoles = document.querySelector('.catched-moles');
const close = document.querySelector('.close');
const table = document.querySelector('.table');
const rateBtn = document.querySelector('.show-result')
const btnCloseResult = document.querySelector('.close-result');
const resultDiv = document.querySelector('.close-result-holder');

let isPlaying = false;
let countMoles = 0;
let allCount = 0;

btnCloseResult.addEventListener('click', closeResult);
rateBtn.addEventListener('click', showRate);
startBtn.addEventListener('click', startGame);
moles.forEach((mole) => {
    mole.addEventListener('click', catchMole)
})
close.addEventListener('click', closeModal);


function closeModal() {
    finish.style.display = 'none';
}

function catchMole() {
    countMoles++;
    score.textContent = countMoles;
    this.parentElement.classList.remove('up');
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
   const id =  Math.floor(Math.random() * holes.length);
   const hole = holes[id];
   return hole;
}

function showMole() {
    let time = 0;
    if (level.value === 'light') {
        time = randomTime(1000, 2000);
    } else if (level.value === 'medium') {
        time = randomTime(800, 1500);
    } else if (level.value === 'hard') {
        time = randomTime(400, 1000);
    } 
    const hole = randomHole(holes);
    allCount++;
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (isPlaying) showMole();
        else finishGame();
    }, time);
}

function startGame() {
    if(currentName.value) {
        menu.style.display = 'none';
        showMole();
        isPlaying =true;
        setTimeout(() =>{
            isPlaying = false;
        }, 23000)
    } 
    else {
        nameWarning.style.display = 'block';
    }
}


function finishGame() {
    menu.style.display = 'block';
    nameWarning.style.display = 'none';
    finish.style.display = 'block';
    catchedMoles.textContent = `Поймано кротов: ${countMoles}`;
    allMoles.textContent = `Всего было кротов: ${allCount}`;
    const list = JSON.parse(localStorage.getItem('usersList')) || [];
    list.push({name: currentName.value, count: countMoles})
    localStorage.setItem('usersList', JSON.stringify(list))


    allCount = 0;
    countMoles = 0;
    score.textContent = 0;
    currentName.value = '';
}


function showRate() {
    table.innerHTML = '';
    const list = JSON.parse(localStorage.getItem('usersList'));
    const a = '<tr><th>Результаты</th></tr>';
    btnCloseResult.style.display = 'block';
    table.insertAdjacentHTML('beforeend', a)
    if (list.length > 10) {
        list.slice(-10).forEach(item => {
            const html = `<tr><td>${item.name}</td><td>${item.count}</td></tr>`
            table.insertAdjacentHTML('beforeend', html)

        })
    console.log(list)
    } else list.forEach(item => {
        console.log(item.name, item.count)
        const html = `<tr><td>${item.name}</td><td>${item.count}</td></tr>`
        table.insertAdjacentHTML('afterbegin', html)

    })
}


function closeResult() {
    table.innerHTML = '';
    btnCloseResult.style.display = 'none';

}


// localStorage.setItem('user', '1234');

// console.log(localStorage.getItem('user'))


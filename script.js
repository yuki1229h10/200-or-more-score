const bodyWrap = document.querySelector('body');
const title = document.querySelector('#title');
const mass = document.querySelectorAll('td');
const max = 30, min = 1;

const countNumber = document.querySelector('#count-number');
const randomNumber = [];
const showNumber = document.querySelector('#show-number');

const div = document.createElement('div');
const button = document.createElement('button');

let counter = 12;
let scores = [];
let j = 0;

const massOne = Array.from(mass).map(a => {
    a.addEventListener('click', function () {
        if (a.textContent === '' && counter > 0) {
            this.textContent = createNumber();
            this.style.backgroundColor = 'orange';
            calcNumber();
            lessCounter();
        } 
    });
    return a;
});

function createNumber() {
    while (randomNumber.length < max) {
        let r = Math.floor(Math.random() * max) + min;
        if (randomNumber.indexOf(r) === -1) {
            randomNumber.push(r);
            return r;
        }
    }
};

function calcNumber() {
    showNumber.textContent = randomNumber.reduce(function (a, b) {
        return a + b;
    });
    if (showNumber.textContent >= 200) {
        bodyWrap.style.backgroundColor = 'green';
        title.textContent = 'Congratulations 🥳';
        createButton();
        saveScore();
    } else if (counter === 1 && showNumber.textContent < 200) {
        bodyWrap.style.backgroundColor = 'purple';
        title.textContent = 'You lost the game 😢';
        setTimeout(() => {
            alert('GAME OVER !!');
            createButton();
            saveScore();
        }, 1000);
    }
};

function lessCounter() {
    if (counter > 0) {
        counter--;
        countNumber.innerHTML = counter;
    } else if (counter === 0) {
        counter = 0;
    }
};

function createButton() {
    div.removeAttribute('style');
    if (j !== 1) {
        div.classList.add('btn-wrapper');
        button.classList.add('btn');
        button.innerHTML = 'Restart';
        document.body.appendChild(div);
        div.appendChild(button);

        button.onclick = function () {
            initFn();
        }
    }
};

function initFn() {
    counter = 12;
    countNumber.innerHTML = counter;

    bodyWrap.style.backgroundColor = 'gray';
    title.textContent = 'Get 200 or more score 😃';
    showNumber.textContent = 0;
    randomNumber.length = 0;

    j = 1;
    if (j !== 0) {
        div.style.display = 'none';
    }

    massOne.forEach(function (a) {
        a.textContent = '';
        a.removeAttribute('style');
    })
};

function saveScore() {
    let newScore = showNumber.textContent;

    document.querySelector('#high-number').textContent = newScore;
    scores.push(newScore);

    if (scores.length !== '') {
        let maxScore = Math.max(...scores);
        document.querySelector('#high-number').textContent = maxScore;
    }
};
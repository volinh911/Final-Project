const msg = document.querySelector('.msg');
const guess = document.querySelector('input');
const mainbtn = document.querySelector('.btn#main-btn');
const rst = document.querySelector('.btn#restart');
const noti = document.querySelector('.notifier');
var scr = document.querySelector('#score');

// ===================================

const dif1 = document.querySelector(".mode-btn#simple");
const dif2 = document.querySelector(".mode-btn#inter");
const dif3 = document.querySelector(".mode-btn#advance");
const dif4 = document.querySelector(".mode-btn#cringe");

// ===================================

let points = 0;

let mode = 0;
let play = -1;
let choosen_word = [];
let scrambled_word = [];
let index = -1;
let arr_words = ['sea', 'cow', 'banana', 'ladder', 'book', 'temple', 'king', 'bay', 'beach', 'lost', 'love', 'away', 'clear', 'time'];

//Functions, functions, plenty o' functions

const pickMode = (btn) => {
    switch (btn.innerHTML) {
        case "Simple":
            mode = 1;
            break;
        case "Intermediate":
            mode = 2;
            break;
        case "Advance":
            mode = 3;
            break;
        case "Cringe":
            mode = 4;
            break;
        default:
            break;
    }
    start("Click to begin");
}

const chooseWord = (type) => {
    let temp = [];
    for (var i = 0; i < 10; i++) {
        let ran = Math.floor(Math.random() * arr_words.length);
        if (!temp.includes(arr_words[ran]))
            temp.push(arr_words[ran])
    }
    return temp;
}

// const scrambler = (w_arr) => {
//     for (let i = w_arr.length - 1; i > 0; i--) {
//         let temp = w_arr[i];
//         let j = Math.floor(Math.random() * (i + 1));

//         w_arr[i] = w_arr[j];
//         w_arr[j] = temp;
//     }

//     if (choosen_word == w_arr.join(""))
//         return generateScrambles(w_arr);
//     else
//         return w_arr;
// }

const printStringFArr = (arr) => {
    let temp = "";
    arr.forEach(s => {
        temp += s + " ";
    });
    console.log(temp);
    temp[temp.length] = "";
    console.log(temp);
    return temp;
}

const generateScramble = (w_arr) => {
    for (let i = w_arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = w_arr[i];
        w_arr[i] = w_arr[j];
        w_arr[j] = temp;
    }

    if (choosen_word[index] == w_arr.join(""))
        return generateScramble(w_arr);
    else
        return w_arr;
}

const start = (start_msg) => {
    play = false;
    mainbtn.innerHTML = start_msg;
    choosen_word = chooseWord();
    index = 0;
}

const updateGame = () => {
    guess.value = "";
    if (index < 10) {
        scrambled_word = generateScramble(choosen_word[index].split(""));
        msg.innerHTML = printStringFArr(scrambled_word);
        index++;
    } else {
        msg.innerHTML = "You score: " + points + "/10";
        guess.classList.toggle("hidden");
        start("Play Again ?");
    }
}

const updateMsg = () => {
    msg.innerHTML = "";
}

//Event Listeners

msg.addEventListener('keyup', () => {

})

mainbtn.addEventListener('click', function() {
    if (!play) {
        play = true;
        mainbtn.innerHTML = "Guess";
        guess.classList.toggle('hidden');
        updateGame();
        console.log(scrambled_word);
    } else
    if (play == true) {
        let temp = guess.value;
        if (temp == choosen_word[index - 1]) {
            points++;
        } else {
            setTimeout(() => {
                fadeIn(noti);
            }, 10);
            setTimeout(() => {
                fadeOut(noti);
            }, 2000);
        }
        updateGame();
        scr.textContent = points;
    }
});

dif1.addEventListener("click", () => {
    if (mode == 0) {
        pickMode(dif1);
    }
});

dif2.addEventListener("click", () => {
    if (mode == 0) {
        pickMode(dif2);
    }
});

dif3.addEventListener("click", () => {
    if (mode == 0) {
        pickMode(dif3);
    }
});

dif4.addEventListener("click", () => {
    if (mode == 0) {
        pickMode(dif4);
    }
});

//Helpers

function fadeOut(el) {
    el.style.opacity = "0";
    setTimeout(() => {
        el.style.display = "none";
    }, 100);
}

function fadeIn(el) {
    el.style.display = "initial";
    setTimeout(() => {
        el.style.opacity = "1";
    }, 10);
}
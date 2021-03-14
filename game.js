const msg = document.querySelector('.msg');
const guess = document.querySelector('input');
const btn = document.querySelector('.btn#main-btn');
const rst = document.querySelector('.btn#restart');
var scr = document.querySelector('#score');

let points = 0;

let play = false;
let choosen_word = "";
let scrambled_word = "";
let arr_words = ['sea', 'cow'];

const chooseWord = (type) => {
  let ran = Math.floor(Math.random() * arr_words.length);
  return arr_words[ran];
}

const generateScrambles = (w_arr) => {
  for (let i = w_arr.length - 1; i > 0; i--) {
    let temp = w_arr[i];
    let j = Math.floor(Math.random() * (i + 1));

    w_arr[i] = w_arr[j];
    w_arr[j] = temp;
  }

  if (choosen_word == w_arr.join(""))
    return generateScrambles(w_arr);
  else
    return w_arr;
}

const update = () => {

}

btn.addEventListener('click', function() {
  if (!play) {
    play = true;
    btn.innerHTML = "Guess";
    guess.classList.toggle('hidden');
    choosen_word = chooseWord();
    scrambled_word = generateScrambles(choosen_word.split(""));
    console.log(scrambled_word);
    msg.innerHTML = scrambled_word;
  } else {
    let temp = guess.value;
    if (temp == choosen_word) {
      points++;
    } else {
      points--;
    }

    scr.textContent = points;
  }
})

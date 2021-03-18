let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let searchSyn = document.querySelector("#searchsynonym");
let notFound = document.querySelector(".not_found");
let apiKey = "7f902b11-3b75-443e-9ef8-39ce3d7f5387";
let apiKeySyn = "GKrbi2DYOSSSxC69tQ1i";
let defBox = document.querySelector(".def");
let phoneticBox = document.querySelector(".phonetic");
let audioBox = document.querySelector(".audio");
let loading = document.querySelector(".loading");
let loadingSyn = document.querySelector(".loading-syn");
let allDictionary = document.querySelector(".data");
let allThesaurus = document.querySelector(".synonym");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  audioBox.innerHTML = "";
  notFound.innerText = "";
  defBox.innerText = "";
  loadingSyn.style.display = "none";
  allDictionary.style.display = "block";
  allThesaurus.style.display = "none";
  //get input data
  let word = input.value;
  //call API get data
  if (word === "") {
    alert("Word is required");
    return;
  }
  getData(word);
});

searchSyn.addEventListener("click", (e) => {
  e.preventDefault();
  loading.style.display = "none";
  allDictionary.style.display = "none";
  allThesaurus.style.display = "block";
  let word = input.value;
  if (word === "") {
    alert("Word is required");
    return;
  }

  getSyn(word);
});

async function getSyn(word) {
  loadingSyn.style.display = "block";
  const respones = await fetch(
    `http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=${apiKeySyn}`
  );
  const data = await respones.json();
  // console.log(data);

  //Result got
  loadingSyn.style.display = "none";

  let words = [];
  for (let entry of data.response) {
    words = [...words, ...entry.list.synonyms.split("|").slice(2, 5)];
  }
  console.log(words);

  let ul = document.getElementById("list");
  ul.innerHTML = "";

  for (let aWord of words) {
    let li = document.createElement("span");
    li.classList.add("synonym-words");
    li.innerHTML = aWord;
    ul.appendChild(li);
  }
}

async function getData(word) {
  loading.style.display = "block";
  //Ajax call
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
  );
  const data = await response.json();
  console.log(data);

  //if not have result
  if (!data.length) {
    loading.style.display = "none";
    notFound.innerHTML = "<h5>No Result Found</h5>";
    return;
  }

  //result is suggestion
  if (typeof data[0] === "string") {
    loading.style.display = "none";
    let heading = document.createElement("h5");
    heading.innerHTML = "<h5>Did you mean ?</h5>";
    notFound.appendChild(heading);
    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("suggested");
      suggestion.innerHTML = element;
      notFound.appendChild(suggestion);
    });
    return;
  }

  //Result Found
  loading.style.display = "none";
  let definition = data[0].shortdef[0];
  defBox.innerHTML = definition;
  //  let phonetic = data[0].hwi.prs[0].ipa;
  //  phoneticBox.innerHTML = `/${phonetic}/`;

  //Sound
  let soundName = data[0].hwi.prs[0].sound.audio;
  if (soundName) {
    renderSound(soundName);
  } else if ((soundName = data[0].hwi.prs[0] === "")) {
    phoneticBox.style.display = "none";
  }
  //console.log(data);
}

function renderSound(soundName) {
  // https://media.merriam-webster.com/soundc11
  let subfolder = soundName.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

  let aud = document.createElement("audio");
  aud.src = soundSrc;
  aud.controls = true;
  audioBox.appendChild(aud);
}

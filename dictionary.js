let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector(".not_found");
let apiKey = "7f902b11-3b75-443e-9ef8-39ce3d7f5387";
let defBox = document.querySelector('.def');
let audioBox = document.querySelector(".audio");
let loading = document.querySelector('.loading');
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  audioBox.innerHTML = "";
  notFound.innerText = "";
  defBox.innerText = "";
  //get input data
  let word = input.value;
  //call API get data
  if (word === '') {
    alert('Word is required');
    return;
  }
  getData(word);
})

async function getData(word) {
  loading.style.display = "block";
  //Ajax call
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
  );
  const data = await response.json();
  // console.log(data);

  //if not have result
  if (!data.length) {
    loading.style.display = 'none';
    notFound.innerHTML = '<h5>No Result Found</h5>';
    return;
  }

  //result is suggestion
  if (typeof data[0] === 'string') {
    loading.style.display = 'none';
    let heading = document.createElement('h5');
    heading.innerHTML = "<h5>Did you mean ?</h5>";
    notFound.appendChild(heading);
    data.forEach(element => {
      let suggestion = document.createElement('span');
      suggestion.classList.add('suggested');
      suggestion.innerHTML = element;
      notFound.appendChild(suggestion);

    });
    return;
  }

  //Result Found
  loading.style.display = "none";
  let definition = data[0].shortdef[0];
  defBox.innerHTML = definition;

  //Sound
  let soundName = data[0].hwi.prs[0].sound.audio;
  if (soundName) {
    renderSound(soundName);

  }
  // console.log(data);
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

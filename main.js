/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),
  toggleMenu = document.getElementById('nav-toggle'),
  closeMenu = document.getElementById('nav-close')

// SHOW
toggleMenu.addEventListener('click', () => {
  navMenu.classList.toggle('show')
})

// HIDDEN
closeMenu.addEventListener('click', () => {
  navMenu.classList.remove('show')
})

/*===== MOUSEMOVE HOME IMG =====*/
document.addEventListener('mousemove', move);

function move(e) {
  this.querySelectorAll('.move').forEach(layer => {
    const speed = layer.getAttribute('data-speed')

    const x = (window.innerWidth - e.pageX * speed) / 120
    const y = (window.innerHeight - e.pageY * speed) / 120

    layer.style.transform = `translateX(${x}px) translateY(${y}px)`
  })
}

/*===== GSAP ANIMATION =====*/
// NAV
gsap.from('.nav__logo, .nav__toggle', {
  opacity: 0,
  duration: 1,
  delay: 2,
  y: 10
})
gsap.from('.nav__item', {
  opacity: 0,
  duration: 1,
  delay: 2.1,
  y: 30,
  stagger: 0.2,
})

// HOME
gsap.from('.home__title', {
  opacity: 0,
  duration: 1,
  delay: 1.6,
  y: 30
})
gsap.from('.home__description', {
  opacity: 0,
  duration: 1,
  delay: 1.8,
  y: 30
})
gsap.from('.home__button', {
  opacity: 0,
  duration: 1,
  delay: 2.1,
  y: 30
})
gsap.from('.home__img', {
  opacity: 0,
  duration: 1,
  delay: 1.3,
  y: 30
})


/*SUMMARY SECTION*/
let options = {
  startAngle: -1.55,
  value: 0.85,
  size: 150,
  fill: {
    gradient: ["#f08700", "#ffdc62"]
  }
}

$('.circle .bar').circleProgress(options).on('circle-animation-progress',
  function(event, progress, stepValue) {
    $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
  });

/*IMAGE SLIDER - END SECTION*/
var counter = 1;
setInterval(function() {
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if (counter > 3) {
    counter = 1;
  }
}, 4000);

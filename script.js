
// CONSTANTS

const neonClasses = ['neon-pink','neon-yellow','neon-blue','neon-green','neon-purple','neon-orange']
const greyscaleClasses = ['grey-mid','grey-light','grey-dark','grey-extradark']

let decorations = null
let title = null
let subtitle = null
let titleLinks = null
let sections = null
let bodyEl = null
let headerBand = null
let portfolioLinks = null
const portfolioLinkEl = []
let portfolioElem = []


// FUNCTIONS

//Randomise the decorations
function randomiseDecoration(decoration){
  //randomly assign the colour class
  //identify which colour type to apply to the item
  decoration.classList.contains('greyscale') ? 
    // add a grey class to the item
    decoration.classList.add(greyscaleClasses[Math.floor(Math.random() * 4)]) :
    // add a neon colour to the item
    decoration.classList.add(neonClasses[Math.floor(Math.random() * 6)])

  //shift the horizontal placement
  decoration.style.left = `${Math.floor(Math.random() * 50)}vw`

  //randomise the width
  decoration.style.width = `${Math.floor(Math.random() * 20) + 20}vw`

  //make the movement seem more random
  decoration.style.animationDuration = `${Math.floor(Math.random() * 30) + 30}s`
  decoration.style.animationDirection = Math.random() > 0.5 ? 'alternate' : 'alternate-reverse'
  
}

// Change the heading based on scroll position
function scrollHandler() {
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  
  //work out if the first section has been scrolled past
  if (document.documentElement.scrollTop > viewHeight) {
    headerBand.classList.add('scrolled')
  } else {
    headerBand.classList.remove('scrolled')
    addTitleOffset(document.documentElement.scrollTop / 2)
  }

  sections.forEach(section => {
    //apply the menu class for the section in focus
    checkVisible(section) ? 
      headerBand.classList.add(section.id) :
      headerBand.classList.remove(section.id)
    
    //apply a class to the section once each section is visible
    if (checkVisible(section)) section.classList.add('show')
  })

}

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect()
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)  
  return rect.top < viewHeight / 2 && rect.bottom > viewHeight / 2
}


function addTitleOffset(offset){
  title.style.transform = `translateY(${offset}px)`
  subtitle.style.transform = `translateY(${offset}px)`
  titleLinks.style.transform = `translateY(${offset}px)`
}

function populatePortfolio(portfolioId){
  portfolioElem.forEach(el => {
    const thisElClass = [...el.classList].filter(item => item !== 'portfolio-item').toString()
    switch (thisElClass) {
      case 'portfolio-name':
        el.innerHTML = portfolioContent[portfolioId].name
        break
      case 'portfolio-subtitle':
        el.innerHTML = portfolioContent[portfolioId].subtitle
        break
      case 'portfolio-siteLink':
        el.href = portfolioContent[portfolioId].siteLink
        break
      case 'portfolio-githubLink':
        el.style.display = portfolioContent[portfolioId].githubLink === 'private' ? 'none' : 'inline'
        el.href = portfolioContent[portfolioId].githubLink
        break
      case 'portfolio-description':
        el.innerHTML = portfolioContent[portfolioId].description
        break
      case 'portfolio-tech':
        el.innerHTML = portfolioContent[portfolioId].tech
        break
      case 'portfolio-image':
        el.src = portfolioContent[portfolioId].screen
        break
    }
  })
  setActivePortfolioLink(portfolioId)
}

function setActivePortfolioLink(id) {
  portfolioLinkEl.forEach((item, index) => {
    item.classList.remove('active')
    if (index === id) item.classList.add('active')
  })
}

function buildPortfolioLinks() {
  portfolioLinks.innerHTML = ''
  portfolioContent.forEach((item, index) => {
    const el = document.createElement('a')
    el.classList.add('portfolio-switch')
    el.innerText = item.name
    el.addEventListener('click', ()=>populatePortfolio(index))
    portfolioLinks.appendChild(el)
    portfolioLinkEl.push(el)
  })
  setActivePortfolioLink(0)
}




function domLoaded(){
  //fetch the DOM items
  headerBand = document.getElementById('header-band')
  title = document.querySelector('#section-one h1.title')
  subtitle = document.querySelector('#section-one div.subtitle')
  titleLinks = document.querySelector('#section-one div.links')
  portfolioLinks = document.getElementById('section-five-links')
  decorations = document.querySelectorAll('.decoration')
  portfolioElem = [...document.querySelectorAll('.portfolio-item')]
  bodyEl = document.querySelector('body')
  sections = document.querySelectorAll('section')

  //add the loaded class to the body
  bodyEl.classList.add('loaded')
  
  //Set events
  //on font load - there was an issue with document sizing due to a delay with font rendering, 
  //so I included this check for external fonts before rendering the decoration randomisation
  document.fonts.onloadingdone = ()=>{
    decorations.forEach(randomiseDecoration)
  }

  // Update scroll position for first time
  window.onscroll = () => scrollHandler()
  scrollHandler()
  // set up the portfolio section
  populatePortfolio(0)
  buildPortfolioLinks()
}

//On DOM load
document.addEventListener('DOMContentLoaded', domLoaded)


const portfolioContent = [
  {
    name: 'Arma tu Sketch',
    subtitle: 'A sharable room sketching application',
    description: 'An interactive shopping experience for a Mexican Furniture retailer. Built using fabric.js to create a canvas where produts can be dragged around, and the perfect room design can be created.',
    tech: 'fabric.js, JavaScript, Vue.js, Python',
    siteLink: 'https://www.gaiadesign.com.mx/menu-galeria',
    githubLink: 'private',
    screen: './img/sketch.png'
  },
  {
    name: 'picoBank',
    subtitle: 'A modern bank app with analytics.',
    description: 'App with customer spending analysis with interactive charts. Capability includes: ‘instant’ messaging, linking accounts, transactions and analysis. Also demonstrates complex database seeding, with random transactions, bills and salary payments',
    tech: 'React, Flask, Python, PostgreSQL',
    siteLink: 'https://picobank.herokuapp.com/',
    githubLink: 'https://github.com/tomtidswell/sei-picobank',
    screen: './img/picobank.jpg'
  },
  {
    name: 'Pacman',
    subtitle: 'The classic arcade game built in JavaScript.',
    description: 'My first attempt at a game with complex logic. The ghosts all think independently, and have different strategy for getting to pacman. To top it off, it has a gloriously retro 80s vibe.',
    tech: 'JavaScript',
    siteLink: 'https://sei-pacman.herokuapp.com/',
    githubLink: 'https://github.com/tomtidswell/sei-pacman',
    screen: './img/pacman.jpg'
  },
  {
    name: 'Buddle!',
    subtitle: 'A social event finding app.',
    description: 'Connect with other users, and attend their events by subscribing to their listings. Includes user registration, authentication and industry standard security measures.',
    tech: 'React, JavaScript, Node.js, MongoDB, Express',
    siteLink: 'https://buddle-sst.herokuapp.com/',
    githubLink: 'https://github.com/tomtidswell/sei-buddle',
    screen: './img/buddle.jpg'
  },
  {
    name: 'JavaDrip',
    subtitle: 'Start your morning the right way, every day.',
    description: 'Morning routine app designed to provide a morning briefing of travel info and what to wear (computed from weather data), based on location.',
    tech: 'React, JavaScript, Node.js, MongoDB, Express',
    siteLink: 'https://www.tomtidswell.co.uk/sei-javadrip/',
    githubLink: 'https://github.com/tomtidswell/sei-javadrip',
    screen: './img/javadrip.jpg'
  },
  {
    name: 'Rock, paper, scissors',
    subtitle: 'Even more fun with lizard and spock too.',
    description: 'Either play the computer, or watch the computer play its self. I used this game as an opportunity to try out some 3D transitions to immerse the player into the game.'  ,
    tech: 'JavaScript',
    siteLink: 'https://tomtidswell.github.io/es6-rock-paper-scissors/',
    githubLink: 'https://github.com/tomtidswell/es6-rock-paper-scissors/',
    screen: './img/rockpaperscissors.jpg'
  },
  {
    name: 'PlantSwap',
    subtitle: 'Plant swapping social network.',
    description: 'Want to trade plants with like minded people? This is the app for you!'  ,
    tech: 'React, JavaScript, Node.js, MongoDB, Express',
    siteLink: 'https://plantswaps.herokuapp.com/',
    githubLink: 'https://github.com/tomtidswell/plantswap',
    screen: './img/plantswap.jpg'
  },
  {
    name: 'Memory Game',
    subtitle: 'Interactive card game.',
    description: 'This game was originally part of my General Assembly coursework. I enhanced the functionality: its now randomised and will track your score.',
    tech: 'Javascript',
    siteLink: 'https://www.tomtidswell.co.uk/sei-memorygame/',
    githubLink: 'https://github.com/tomtidswell/sei-memorygame',
    screen: './img/memorygame.jpg'
  }
]

document.addEventListener('DOMContentLoaded', () => {

  //card options
  const cardArray = [
    {
      name: 'one',
      img: 'images/one.jpg'
    },
    {
      name: 'three',
      img: 'images/three.jpg'
    },
    {
      name: 'two',
      img: 'images/two.jpg'
    },
    {
      name: 'four',
      img: 'images/four.jpg'
    },
    {
      name: 'five',
      img: 'images/five.jpg'
    },
    {
      name: 'six',
      img: 'images/six.jpg'
    },
    {
      name: 'one',
      img: 'images/one.jpg'
    },
    {
      name: 'three',
      img: 'images/three.jpg'
    },
    {
      name: 'two',
      img: 'images/two.jpg'
    },
    {
      name: 'four',
      img: 'images/four.jpg'
    },
    {
      name: 'five',
      img: 'images/five.jpg'
    },
    {
      name: 'six',
      img: 'images/six.jpg'
    }
  ]
  const userInfo = document.querySelector('.userInfo')
  const playAgainRef = document.querySelector('.playAgain')
  const GameDiv = document.querySelector('.GameDiv')
  const resultDisplay = document.querySelector('#Winresult')
  const LoseresultDisplay = document.querySelector('#Loseresult')
  const finalOutCome = document.querySelector('#final')
  const TimeLimit = document.querySelector("#time")
  const infoIcon = document.querySelector(".infoIcon")

  var cardsChosen = []
  var cardsChosenId = []
  var cardsWon = []
  var winScore = []
  var loesScore = []

  // create Input for user Name
  var input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('id', 'nameInput')
  input.setAttribute('placeholder', 'Enter you\'r name')

  // create Input for user Age
  var age = document.createElement('input')
  age.setAttribute('type', 'number')
  age.setAttribute('id', 'ageInput')
  age.setAttribute('placeholder', 'Enter you\'r age')

  // create button for start a game
  var button = document.createElement('input')
  button.setAttribute('type', 'button')
  button.setAttribute('id', 'start')
  button.setAttribute('value', 'Play')

  // create h4 for alert messages
  var h4 = document.createElement('h4')
  h4.setAttribute('id', 'messageSpan')

  var playAgainBtn = document.createElement('input')
  playAgainBtn.setAttribute('type', 'button')
  playAgainBtn.setAttribute('id', 'playAgainId')
  playAgainBtn.setAttribute('value', 'Play Again')

  userInfo.appendChild(h4)
  userInfo.appendChild(input)
  userInfo.appendChild(age)
  userInfo.appendChild(button)

  playAgainRef.appendChild(playAgainBtn);

  playAgainRef.style.display = 'none'

  const startBtn = document.querySelector('#start')
  const spanMe = document.querySelector('#messageSpan')
  const ageInput = document.querySelector('#ageInput')
  const nameInput = document.querySelector('#nameInput')

  // play's data
  var playName = '';
  var playAge = '';
  var ss = 30;

  // game start
  startBtn.addEventListener("click", () => {
    if (ageInput.value !== '' && nameInput.value !== '') {
      userInfo.style.display = 'none'
      GameDiv.style.pointerEvents = 'auto'
      playName += nameInput.value
      playAge += ageInput.value

      ss = 29;
      interval(false)
    } else {
      spanMe.style.background = 'white';
      spanMe.textContent = 'Name and Age are required';
    }
  })

  playAgainRef.addEventListener("click", () => {
    GameDiv.textContent = ''
    createBoard()

    ss = 29
    interval(false)
    finalOutCome.style.display = 'none'
    playAgainRef.style.display = 'none'
    loadScreen()
    cardsChosen = []
    cardsChosenId = []
    cardsWon = []
  })

  loadScreen()
  function loadScreen() {
    cardArray.sort(() => 0.5 - Math.random())
  }

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img')
      card.setAttribute('src', 'images/blank.jpg')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      GameDiv.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    // console.log(cardsChosen + " || " + cardsChosenId + " || " + cardsWon);
    finalOutCome.style.display = 'block'
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.jpg')
      cards[optionTwoId].setAttribute('src', 'images/blank.jpg')
      finalOutCome.textContent = 'You have clicked the same image!'
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      finalOutCome.textContent = playName + ' you found a match'
      finalOutCome.style.background = 'lightGreen';
      cards[optionOneId].setAttribute('src', 'images/white.jpg')
      cards[optionTwoId].setAttribute('src', 'images/white.jpg')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.jpg')
      cards[optionTwoId].setAttribute('src', 'images/blank.jpg')
      finalOutCome.textContent = 'Sorry ' + playName + ', try again'
      finalOutCome.style.background = 'aquamarine'
    }
    cardsChosen = []
    cardsChosenId = []
    if (cardsWon.length === cardArray.length / 2) {
      finalOutCome.textContent = 'Congratulations ' + playName + '! You win!'
      // console.log(winScore);
      winScore.push('win');
      resultDisplay.textContent = winScore.length
      playAgainRef.style.display = 'flex'
      interval(true)
      cardsChosen = []
      cardsChosenId = []
      cardsWon = []
    }
  }

  //flip your card
  function flipCard() {
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }
  createBoard()

  var EndInterval = null
  function interval(flag) {
    if (flag) {
      clearInterval(EndInterval)
    } else {
      EndInterval = setInterval(() => {
        TimeLimit.innerHTML = ss;
        if (ss == 30) {
          return false
        } else if (ss == 0 || ss < 0) {
          playAgainRef.style.display = 'flex'
          loesScore.push('ups');
          LoseresultDisplay.textContent = loesScore.length
          // console.log(loesScore);
          finalOutCome.style.background = 'Red'
          finalOutCome.style.display = 'block'
          finalOutCome.textContent = 'Ups ' + playName + '! You lose!'
          interval(true)
        } else {
          ss--
        }
      }, 1000)
    }
  }

  infoIcon.addEventListener("mouseover", () => {
    document.querySelector('.detail').style.display = 'block'
  })
  infoIcon.addEventListener("mouseout", () => {
    document.querySelector('.detail').style.display = 'none'
  })
})

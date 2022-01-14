const startGame = document.querySelector('button');
const cards = document.querySelectorAll('.memorycard');
const currentScore = document.querySelector('#score div');
const restart = document.querySelector('#finished button');
const bestscoreDiv = document.querySelector('.best-score');
const cardGameDiv = document.querySelector('#cardGameDiv');

const gameCards = document.querySelectorAll('.cards')


let bestscore = 0;
let firstCard;
let secondCard;
let imgArray = ['gifs/1.gif', 'gifs/1.gif', 'gifs/2.gif', 'gifs/2.gif', 'gifs/3.gif', 'gifs/3.gif', 'gifs/4.gif', 'gifs/4.gif', 'gifs/5.gif', 'gifs/5.gif', 'gifs/6.gif', 'gifs/6.gif', 'gifs/7.gif', 'gifs/7.gif', 'gifs/8.gif', 'gifs/8.gif'];
let newImgArray = [];

//when clicked this function will fun. It will set the flip
//class to include the flip animation
function flipcard(){
  this.className = 'memorycard flip'
}

for(let card of cards) {
  card.addEventListener('click', flipcard)
}

startGame.addEventListener('click', () => {
  //shows cards at 
  cardGameDiv.style.display = 'block';
const header = document.querySelector('header')
header.className = 'clicked'
})
startGame.addEventListener('click', () => {
  const header = document.querySelector('.cardgame')
  header.className = 'cardgame clickedGame'
  })

  //This will only flip the card if the 
  //className is 'front-face'
for(let card of cards) {
  card.addEventListener('click', (e) => {
    const cardDiv = e.target;
    //if there is only 1 card flipped the code will run
    if(cardDiv.className === 'front-face unflipped' && firstCard === undefined || secondCard === undefined) {
    //I added the class unflipped above and in the HTML. If it has both those classes the following code will run. 
    //As soon as the click happens I instantly remove the flip class thereby preventing the doubleclicking of the same 
    //card to cause it to dissapear. This would happen because the "hide" class would be applied to the card 2 times and would
    //then cause the card to dissapear. 
    cardDiv.className === 'front-face'
    //This waits for the card to be flipped half way to then 
    //hide the front image
    async function delay() {
      await new Promise(resolve => setTimeout(resolve, 300));
      cardDiv.classList.toggle('hide');
      cardDiv.className === 'front-face unflipped'
    }

    delay()



    //this updates the current score
    let scoreNum = parseInt(currentScore.innerText)
    currentScore.innerText = scoreNum+1
    //Using this i can find the source of the 
    //img using 'backface.src'
    const backface = cardDiv.parentElement.firstElementChild;
    if(firstCard === undefined) {
    firstCard = backface; 
    } else if(firstCard !== undefined) {
      secondCard = backface;
    }
    } 
    //if 2 cards are flipped this code will prevent the card
    //flip from occouring until all cards are flipped to their 
    //original state
    else {
      cardDiv.parentElement.className = 'memorycard unflip'
    }
    //if 1st and 2nd cards are equal the values are reset to undefined
    if(firstCard && secondCard !== undefined){
      if(firstCard.src === secondCard.src) {
        firstCard.classList = 'back-face match'
        secondCard.classList = 'back-face match'
        
        firstCard = undefined;
        secondCard = undefined;

        let match = document.querySelectorAll('.match')
        
        //This determines when the game is over. Everytime a card is matched the class of 
        //'match' is added. Once the amount of div's that contain the 'match' class equals
        //16 (the total amout of cards) the game is over and the following code runs 
        if(match.length === 16) {

          //Here we select the div with the id of #finished. This allows me to 
          //then apply the class of 'showScore'. This will cause a CSS animation to happen.
          //I also select the div with the #finalscore id. This allows me to dynamically change
          //the score that will appear in the finish animation
          
          const finished = document.querySelector('#finished');
          const finalscore = document.querySelector('#finalscore')
          finalscore.innerText = currentScore.innerText
          finished.className = 'showScore';

          //I then take the current score and turn it into a number

          let currentScoreNum = parseInt(currentScore.innerText)

          //I compare the bestscore with the current score. If the current score is less
          //i updated the local storage item to contain the new score. 
          if(bestscore === 0) {
            bestscore = parseInt(currentScoreNum);
            localStorage.setItem('bestscore', bestscore);
          } else if(bestscore > currentScoreNum){
             bestscore = parseInt(currentScoreNum);
             localStorage.setItem('bestscore', bestscore);
          }
          
          
        }
        
      } else if(firstCard.src !== secondCard.src){
        //this will wait one sec before flipping cards
        async function delay() {
          await new Promise(resolve => setTimeout(resolve, 1000));
          firstCard.parentElement.lastElementChild.className = 'front-face';
          secondCard.parentElement.lastElementChild.className = 'front-face';
          //I toggle the following classes to make the flip back to 
          //the normal state and set the class to include the unflip

          firstCard.parentElement.className = 'memorycard unflip';
          secondCard.parentElement.className = 'memorycard unflip';

          //This prevents the front image from instantly popping up
          //before the transition happens
          firstCard.parentElement.lastElementChild.classList.toggle('hide');
          secondCard.parentElement.lastElementChild.classList.toggle('hide');
          console.log(firstCard.parentElement)


          //This then allows the front image to pop back up after the midway
          //point of the turn
          async function delay2() {
            await new Promise(resolve => setTimeout(resolve, 300));
            firstCard.parentElement.lastElementChild.classList.toggle('hide');
            secondCard.parentElement.lastElementChild.classList.toggle('hide');
            firstCard = undefined;
            secondCard = undefined;
          }
      
          delay2()
        }

        delay()
       
      }




    }

  })
}

//this allows the Restart Button to refresh the page
restart.addEventListener('click', () => location.reload() )

//When the page is loaded the best score will be reloaded into the document
document.addEventListener('DOMContentLoaded', () => {
let string = localStorage.getItem('bestscore');
let num = parseInt(string);

if(string === null) {
bestscore = 0;
bestscoreDiv.innerText = 0;
} 
 else {
   bestscore = num;
   bestscoreDiv.innerText = num;
 }


 //the following code is to randomize the images and shuffle them
 function shuffle(){
  for(let i = 0; i < imgArray.length; i++) {
    let num = Math.random()
    if(num < .5) {
      newImgArray.push(imgArray[i])
    } else {
      newImgArray.unshift(imgArray[i])
    }
  }
 }

 shuffle();

 //then I use DOM manipulation to set the new img
 let backFaces = document.querySelectorAll('.back-face')

 for(let i = 0; i < newImgArray.length; i++) {
   backFaces[i].src = newImgArray[i]
 }

})
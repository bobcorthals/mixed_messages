
// dummy: mythology, easy, multiple
// let url = 'https://opentdb.com/api.php?amount=1&category=20&difficulty=easy&type=multiple'

// categoryOptions = ['Mythology', 'History', 'Art'];
// difficultyOptions = ['easy', 'medium', 'hard'];
// typeOptions = ['multiple'];

let answersOrderedList = [];
let answersId = document.getElementById('answersOrderedList');
let questionId = document.getElementById('question');
let correct_answer;

// function used to reset (or reassert) border-style to regular "on change"
// used when user has clicked the button "Hit me!", while failing to choose an option (which sets border-color to "red")
function border(str) {
  document.getElementById(str).style.border = "0.125rem solid black";
}

// function used to process user input to generate a question & multiple answers
function processInput() {
  
  document.getElementById('comment').style.display = 'none';
  document.getElementById('question').style.display = 'none';
  document.getElementById('answers').style.display = 'none';

  let difficulty = document.getElementById('difficulty');
  let value_difficulty = difficulty.options[difficulty.selectedIndex].value;

  let category = document.getElementById('category');
  let value_category = category.options[category.selectedIndex].value;

  if (value_difficulty === '' && value_category === '') {
    // console.log('Houston, we have two problems!');
    document.getElementById('category').style.border = "0.125rem solid red";
    document.getElementById('difficulty').style.border = "0.125rem solid red";
    return false;
  } else if (value_category === '') {
    // console.log('Houston, we have a problem!');
    document.getElementById('category').style.border = "0.125rem solid red";
    return false;
  } else if (value_difficulty === '') {
    // console.log('Houston, we have a problem!');
    document.getElementById('difficulty').style.border = "0.125rem solid red";
    return false;
  }

  let category_id;

  // convert category to num used by API
  switch (value_category) {
    case 'mythology':
      category_id = 20;
      break;
    case 'history':
      category_id = 23;
      break;
    case 'art':
      category_id = 25; 
      break;
  }

  // create correct url
  url = `https://opentdb.com/api.php?amount=1&category=${category_id}&difficulty=${value_difficulty}&type=multiple`

  // get response api, store the correct answer, and pipe data through to function generateQuestion
  let data = getData(url).then(data => {
    correct_answer = decodeEntity(data.results[0].correct_answer);
    generateQuestion(data);
  })

  // gets rid of eventlistener after first click.
  console.log('got here')
  document.getElementById('button').removeAttribute("onclick");

}

// async function to capture response api
async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

// helper function to convert inputStr to unicode
function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}

// function used to generate question, randomly ordered answer options, and HTML formatting
function generateQuestion(data) {
  
  answersOrderedList = [];

  document.getElementById('question').style.display = 'block';
  document.getElementById('question').style.backgroundColor = 'aliceblue';

  document.getElementById('answers').style.display = 'block';
  document.getElementById('answers').style.backgroundColor = 'white';

  let question = data.results[0].question;
  let incorrect_answers = data.results[0].incorrect_answers;

  let answersArr = incorrect_answers;
  answersArr.push(correct_answer);
  answersArr.sort(() => Math.random() > 0.5 ? 1 : -1);

  let counter = 0;
  answersArr.forEach(element => {
    counter += 1;
    answersOrderedList.push(`<li class="answers2" id="${counter}" onclick="checkAnswer(${counter})">` + element + "</li>");
  });

  questionId.innerHTML = question;
  answersId.innerHTML = answersOrderedList.join('');

  window.location.href = '#question-container';

  return data;
}

// function used to evaluate the choice made by the user
function checkAnswer(num) {

  let choice = document.getElementById(num).textContent;
  
  [1, 2, 3, 4].forEach(number => {
    document.getElementById(number).style.backgroundColor = 'inherit';
    document.getElementById(number).style.border = 'none';
  });

  if (choice === correct_answer) {
    // console.log(`${choice} is the correct answer`);
    document.getElementById(num).style.backgroundColor = 'green';
    document.getElementById(num).style.border = '0.125rem solid black';

    document.getElementById('comment').style.display = 'block';
    document.getElementById('comment').style.borderColor = 'green';
    
    killInteraction();

    window.location.href = '#comment';

    createRandomPraise();

    document.getElementById('button').setAttribute("onclick","processInput()");

  } else {
    // console.log(`Incorrect. The correct answer is ${correct_answer}`);
    document.getElementById(num).style.backgroundColor = 'red';
    document.getElementById(num).style.border = '0.125rem solid black';

    document.getElementById('comment').style.display = 'block';
    document.getElementById('comment').style.borderColor = 'red';

    window.location.href = '#comment';

    createRandomEncouragement()

  };

}

// function to shut down interaction with the answer options, since the correct answer has been given
function killInteraction() {
  [1, 2, 3, 4].forEach(number => {
    document.getElementById(number).onclick = 'null'; 
    document.getElementById(number).style.cursor = 'auto'; 

  });
}

// after a wrong answer, generate a random comment to encourage the user to continue
function createRandomEncouragement() {
  let arrRandomEncouragment = [
    'Not quite the answer we\'re looking for. Have another quess!',
    'So close! The answer is out there, trust me!',
    'Ai, that\'s unfortunate! Give it another try!',
    'Nope! But just keep seeking, and surely you will find!'
  ]

  let randomNum = Math.floor(Math.random()*4);

  document.getElementById('randomComment').innerHTML = arrRandomEncouragment[randomNum];
}

// after a correct answer, generate a random comment to praise the user and to encourage the user to take another question 
function createRandomPraise() {

  let arrRandomPraise = [
    'Amazing! Why not try another question.',
    'You\'re on fire today! Ready for your next question?',
    'Spot on! Let\'s find out if you can continue the streak.',
    'That is... CORRECT! Fancy another question?'
  ]

  let randomNum = Math.floor(Math.random()*4);

  document.getElementById('randomComment').innerHTML = arrRandomPraise[randomNum];
}
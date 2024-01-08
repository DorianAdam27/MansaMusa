const quizData = [
    {
      question: 'Mansa Musa was known for his immense generosity, especially when he distributed gold to the poor during his pilgrimage to Mecca. This act is associated with which Islamic principle?',
      options: ['Hajj', 'Zakat', 'Salah', 'Sawm'],
      answer: 'Zakat',
    },
    {
      question: 'When Mansa Musa embarked on his famous journey to Mecca, he was fulfilling one of the Five Pillars of Islam. Which pillar does his pilgrimage represent?',
      options: ['Shahada', 'Hajj', 'Zakat', 'Salah'],
      answer: 'Hajj',
    },
    {
      question: 'Mansa Musa was known for his wisdom and intelligence in governing the Mali Empire. His commitment to justice and fairness aligns with which Islamic principle?',
      options: ['Ihsan', 'Tawhid', 'Adl (Justice)', 'Taqwa'],
      answer: 'Adl (Justice)',
    },
    {
      question: 'Mansa Musa actively supported education, promoting learning and scholarship in his kingdom. This is in line with the Islamic emphasis on acquiring knowledge. Which Islamic value does this reflect?',
      options: ['Adab (Good Manners)', 'Ilm (Knowledge)', 'Shura (Consultation)', 'Tawakkul (Trust in Allah)'],
      answer: 'Ilm (Knowledge)',
    },
    {
      question: 'Despite his vast wealth and influence, Mansa Musa was known for his humility. This quality is associated with which Islamic concept?',
      options: ['Karam (Generosity)','Dhikr (Remembrance of Allah)','Tawadhu (Humility)','Sabr (Patience)',],
      answer: 'Tawadhu (Humility)',
    }
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  document.querySelector('.x-popup').style.display = 'none';
  document.querySelector('.mosque-popup').style.display = 'none';
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  async function displayMosque() {
    document.querySelector('.mosque-popup').style.display = 'block';
    document.querySelector('.container').style.display = 'none';

    await delay(1500);
    
    document.querySelector('.mosque-popup').style.marginTop = (25-(5 * (score + 1)) + score).toString() + "%";
    document.querySelector('.mosque-popup').style.width = (10 * (score + 1) - score).toString() + "%";
    document.querySelector('.mosque-popup').style.height = (17 * (score + 1) - score).toString() + "%";

    await delay(1500);

    document.querySelector('.mosque-popup').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
  }

  async function displayX() {
    document.querySelector('.x-popup').style.display = 'block';
    document.querySelector('.container').style.display = 'none';

    await delay(2000);

    document.querySelector('.x-popup').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
  }

  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
        displayMosque();
      } else {
        displayX();
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayMosque()
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  

  displayMosque();
  displayQuestion();
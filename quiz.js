const quizData = [
  {
    question: "What is the main characteristic of voting patterns in U.S. urban versus rural areas?",
    options: [
      "Urban areas mostly vote Democratic, rural areas Republican",
      "Both always vote for third parties",
      "Urban and rural areas vote exactly the same way",
      "Urban areas support rural values"
    ],
    correct: 0,
    explanation: "Urban areas in the U.S. usually vote Democratic, while rural regions tend to vote Republican. This creates a visible political divide."
  },
  {
    question: "Why are suburbs politically important?",
    options: [
      "They have no impact on elections",
      "People there never vote",
      "Suburban voters often decide elections because they are not always loyal to one party",
      "Only rural areas matter"
    ],
    correct: 2,
    explanation: "Suburban residents are often swing voters, so their decisions can determine the outcome of national elections."
  },
  {
    question: "Which description best fits 'suburbs'?",
    options: [
      "Industrial districts inside city centers",
      "Residential areas around big cities, not as dense as urban but busier than rural",
      "Remote villages in the countryside",
      "Only shopping centers"
    ],
    correct: 1,
    explanation: "Suburbs are mostly residential areas near cities, less dense than cities but more connected and populous than rural areas."
  },
  {
    question: "What does the 'neighborhood effect' mean?",
    options: [
      "People in a community influence each other's opinions",
      "Only politicians matter",
      "Media is the only influencer",
      "Laws have no effect on opinions"
    ],
    correct: 0,
    explanation: "People living in the same area share experiences and local problems, which can influence their perspectives and political choices."
  },
  {
    question: "In the simulation, what did moving to different parts of the room represent?",
    options: [
      "Changing opinions and priorities within a diverse community",
      "A dance class",
      "Voting in rural areas only",
      "Choosing a new classroom"
    ],
    correct: 0,
    explanation: "Moving in the classroom simulated how people's choices and views in a suburb can shift based on questions or priorities."
  },
  {
    question: "What are some top issues that influence suburban voters?",
    options: [
      "Public education, safety, taxes, and cost of living",
      "Number of cows",
      "Internet memes",
      "None; they don't care"
    ],
    correct: 0,
    explanation: "Key issues include quality of schools, safety, taxes, cost of living, and increasingly, environmental concerns."
  },
  {
    question: "How have suburbs changed since 1950?",
    options: [
      "They have become more diverse and less dominated by a single group",
      "They did not change at all",
      "All suburbs became rural",
      "Cities disappeared"
    ],
    correct: 0,
    explanation: "Since 1950, suburbs have become home to younger, more diverse and more educated populations."
  },
  {
    question: "Why do political campaigns focus so much on suburbs?",
    options: [
      "Because suburban voters are many and often undecided",
      "Because nobody lives there",
      "Because only cities matter",
      "Because suburbs set tax rates"
    ],
    correct: 0,
    explanation: "With a large and growing population of swing voters, suburbs are key to election outcomes."
  }
];

let currentQuestion = 0;
let score = 0;
const userAnswers = [];

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('quiz-intro');
  const quizBox = document.getElementById('quiz-box');
  const questionDiv = document.getElementById('question');
  const answersForm = document.getElementById('answers');
  const feedbackDiv = document.getElementById('feedback');
  const nextBtn = document.getElementById('next-btn');
  const resultBox = document.getElementById('result-box');
  const scoreText = document.getElementById('score');
  const explanationsList = document.getElementById('explanations');
  const startBtn = document.getElementById('start-btn');

  startBtn.onclick = () => {
    intro.classList.add('hidden');
    quizBox.classList.remove('hidden');
    showQuestion();
  };

  function showQuestion() {
    const q = quizData[currentQuestion];
    questionDiv.textContent = `Question ${currentQuestion + 1} of ${quizData.length}: ${q.question}`;
    answersForm.innerHTML = '';
    feedbackDiv.textContent = '';
    nextBtn.classList.add('hidden');

    q.options.forEach((opt, idx) => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="radio" name="answer" value="${idx}"> ${opt}`;
      answersForm.appendChild(label);
    });

    answersForm.onclick = (e) => {
      if (e.target.name === "answer") {
        Array.from(answersForm.querySelectorAll('label')).forEach(lab => lab.classList.remove('selected'));
        e.target.parentElement.classList.add('selected');
        checkAnswer(Number(e.target.value));
      }
    };
  }

  function checkAnswer(selected) {
    answersForm.onclick = null; // Prevent further answering
    const q = quizData[currentQuestion];
    userAnswers.push(selected);
    if (selected === q.correct) {
      feedbackDiv.textContent = "Correct!";
      feedbackDiv.style.color = "#329932";
      score++;
    } else {
      feedbackDiv.textContent = `Incorrect.`;
      feedbackDiv.style.color = "#d14343";
    }
    nextBtn.classList.remove('hidden');
    nextBtn.disabled = false;
  }

  nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResults();
    }
  };

  function showResults() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    scoreText.textContent = `You scored ${score} out of ${quizData.length}.`;
    explanationsList.innerHTML = quizData.map((q, idx) => {
      const gotIt = userAnswers[idx] === q.correct;
      return `<li>
        <strong>Q${idx + 1}:</strong> ${q.question}<br>
        <span style="color:${gotIt ? '#329932':'#d14343'}">${gotIt ? "✔" : "✘"}</span>
        <span style="font-style:italic;margin-left:7px;">${q.explanation}</span>
      </li>`;
    }).join('');
  }
});

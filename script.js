const questions = [
    {
        question: "Яке місто є столицею Болгарії?",
        answers: ["Варна", "Софія", "Бургас"],
        correct: 1
    },
    {
        question: "Яким морем омивається Болгарія?",
        answers: ["Середземним", "Азовським", "Чорним"],
        correct: 2
    },
    {
        question: "Яку квітку називають символом Болгарії?",
        answers: ["Тюльпан", "Троянда", "Ромашка"],
        correct: 1
    },
    {
        question: "Як називається найвища вершина Болгарії?",
        answers: ["Мусала", "Говерла", "Монблан"],
        correct: 0
    },
    {
        question: "Яке місто називають морською столицею Болгарії?",
        answers: ["Софія", "Варна", "Пловдив"],
        correct: 1
    },
    {
        question: "Як називається болгарський народний танець?",
        answers: ["Гопак", "Хоро", "Полька"],
        correct: 1
    },
    {
        question: "Для чого використовують трояндову олію?",
        answers: [
            "Для косметики та парфумів",
            "Для фарбування тканин",
            "Для будівництва"
        ],
        correct: 0
    },
    {
        question: "Яка популярна болгарська страва схожа на пиріг із сиром?",
        answers: ["Баніца", "Борщ", "Піца"],
        correct: 0
    },
    {
        question: "Який відомий скарб знайшли біля Варни?",
        answers: [
            "Варненський золотий скарб",
            "Київський скарб",
            "Римський скарб"
        ],
        correct: 0
    },
    {
        question: "Яка тварина любить мед і взимку впадає у сплячку?",
        answers: ["Лисиця", "Олень", "Ведмідь"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});

function showQuestion() {
    feedbackEl.textContent = "";
    nextBtn.classList.add("hidden");

    const q = questions[currentQuestion];

    progressEl.textContent =
        `Питання ${currentQuestion + 1} з ${questions.length}`;

    questionEl.textContent = q.question;

    answersEl.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => checkAnswer(index));

        answersEl.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        score++;

        buttons[selectedIndex].classList.add("correct");

        feedbackEl.textContent = "✓ Правильно!";
        feedbackEl.style.color = "green";
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[q.correct].classList.add("correct");

        feedbackEl.textContent =
            `✗ Неправильно! Правильна відповідь: ${q.answers[q.correct]}`;
        feedbackEl.style.color = "red";
    }

    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    scoreEl.textContent =
        `Твій результат: ${score} із ${questions.length}`;

    if (score >= 9) {
        messageEl.textContent =
            "🏆 Справжній знавець Болгарії!";
    } else if (score >= 6) {
        messageEl.textContent =
            "👏 Молодець! Ти уважно слухав подорож.";
    } else {
        messageEl.textContent =
            "📚 Варто ще більше дізнатися про Болгарію.";
    }
}

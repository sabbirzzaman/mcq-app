// selectors
const submitForm = document.getElementById('quiz-container');

// initial values
let score = 0;
let quizItems = undefined;

// get quiz data
const getQuizData = () => {
    fetch('../data.json')
        .then((res) => res.json())
        .then((data) => displayQuiz(data));
};

getQuizData();

// display quiz
const displayQuiz = (quiz) => {
    const quizContainer = document.getElementById('quiz-container');

    // set quiz
    quizItems = quiz;

    quiz.forEach((q) => {
        // value destructure from data
        const { id, title, options, answer } = q || {};

        // crate elements
        const quizItem = document.createElement('div');
        const questionEl = document.createElement('h4');

        // add class name and inner text
        quizItem.classList.add('quiz-item');
        questionEl.innerText = `${id}. ${title}`;

        // append child
        quizContainer.appendChild(quizItem);
        quizItem.appendChild(questionEl);

        // display options
        options.forEach((option) => {
            // create elements
            const quizEl = document.createElement('div');
            const quizOptionEl = document.createElement('div');

            // class name added
            quizEl.classList.add('quiz');
            quizOptionEl.classList.add('option');

            // show inner text
            quizOptionEl.innerHTML = `
            <input type="radio" name="${id}" id="${option}" value="${option}" required>
            <label for="${option}">${option}</label>
            `;

            quizItem.appendChild(quizEl);
            quizEl.appendChild(quizOptionEl);
        });
    });
};

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    quizItems.forEach((quiz) => {
        for (const property in formProps) {
            const answer = formProps[property];

            if (answer === quiz.answer) {
                score = score + 1;
            }
            localStorage.setItem('score', score);
            window.location.replace('../result.html');
        }
    });
});


/* ===========================
   QUIZ FUNCTIONALITY
   =========================== */

let currentQuiz = null;
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];

const quizData = {
    math: [
        {
            question: "What is 5 + 3?",
            options: ["7", "8", "9", "10"],
            correct: 1
        },
        {
            question: "What is 12 - 4?",
            options: ["6", "7", "8", "9"],
            correct: 2
        },
        {
            question: "What is 6 × 7?",
            options: ["36", "40", "42", "48"],
            correct: 2
        },
        {
            question: "What is 20 ÷ 4?",
            options: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "What is 15 + 8?",
            options: ["22", "23", "24", "25"],
            correct: 1
        }
    ],
    reading: [
        {
            question: "What is the main idea of a story?",
            options: ["The setting", "The central message or theme", "The characters' names", "The time it takes to read"],
            correct: 1
        },
        {
            question: "Which word means 'very happy'?",
            options: ["Sad", "Delighted", "Angry", "Tired"],
            correct: 1
        },
        {
            question: "What does it mean to 'infer'?",
            options: ["To read out loud", "To make a guess based on clues", "To skip a page", "To highlight text"],
            correct: 1
        },
        {
            question: "In a story, the 'conflict' is:",
            options: ["A conversation", "The problem the character faces", "The ending", "The title"],
            correct: 1
        },
        {
            question: "What is a 'plot'?",
            options: ["The setting of the story", "The sequence of events in a story", "The author's name", "The book cover"],
            correct: 1
        }
    ],
    vocabulary: [
        {
            question: "What does 'benevolent' mean?",
            options: ["Mean and cruel", "Kind and generous", "Fast and quick", "Slow and lazy"],
            correct: 1
        },
        {
            question: "What does 'abundant' mean?",
            options: ["Very little", "Plentiful or a lot", "Empty", "Broken"],
            correct: 1
        },
        {
            question: "What does 'persevere' mean?",
            options: ["To give up", "To keep trying despite difficulties", "To run away", "To sleep"],
            correct: 1
        },
        {
            question: "What does 'meticulous' mean?",
            options: ["Messy", "Careful and precise", "Loud", "Quiet"],
            correct: 1
        },
        {
            question: "What does 'resilient' mean?",
            options: ["Weak", "Able to recover quickly", "Sad", "Angry"],
            correct: 1
        }
    ]
};

function startQuiz(subject) {
    currentQuiz = subject;
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    showQuizModal();
}

function showQuizModal() {
    // Create quiz modal
    const modalHTML = `
        <div id="quiz-modal" class="modal" style="display: flex;">
            <div class="modal-content quiz-container">
                <span class="close" onclick="closeQuizModal()">&times;</span>
                <div id="quiz-content"></div>
            </div>
        </div>
    `;
    
    // Remove existing quiz modal if any
    const existingModal = document.getElementById('quiz-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showQuestion();
}

function showQuestion() {
    const quiz = quizData[currentQuiz];
    const question = quiz[currentQuestionIndex];
    const quizContent = document.getElementById('quiz-content');
    
    let html = `
        <h2>${currentQuiz.charAt(0).toUpperCase() + currentQuiz.slice(1)} Quiz</h2>
        <div class="quiz-progress">
            <p>Question ${currentQuestionIndex + 1} of ${quiz.length}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${((currentQuestionIndex + 1) / quiz.length) * 100}%"></div>
            </div>
        </div>
        
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <label class="quiz-option">
                <input type="radio" name="answer" value="${index}" onchange="selectAnswer(${index})">
                <span>${option}</span>
            </label>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="quiz-buttons">
            <button class="btn btn-delete" onclick="closeQuizModal()">❌ Exit Quiz</button>
            <button class="btn btn-success" id="next-btn" onclick="nextQuestion()" disabled>Next Question →</button>
        </div>
    `;
    
    quizContent.innerHTML = html;
}

function selectAnswer(index) {
    quizAnswers[currentQuestionIndex] = index;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    const quiz = quizData[currentQuiz];
    
    if (currentQuestionIndex < quiz.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quiz = quizData[currentQuiz];
    
    // Calculate score
    quizScore = 0;
    quiz.forEach((question, index) => {
        if (quizAnswers[index] === question.correct) {
            quizScore++;
        }
    });
    
    const percentage = Math.round((quizScore / quiz.length) * 100);
    const quizContent = document.getElementById('quiz-content');
    
    let message = '';
    if (percentage === 100) {
        message = '🌟 Perfect! You got them all right!';
    } else if (percentage >= 80) {
        message = '🎉 Great job! You did very well!';
    } else if (percentage >= 60) {
        message = '👍 Good effort! Keep practicing!';
    } else {
        message = '💪 Keep learning! You\'ll do better next time!';
    }
    
    let html = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <div class="results-score">
                <h3>Your Score</h3>
                <div class="score-circle">
                    <div class="score-percent">${percentage}%</div>
                    <p>${quizScore} out of ${quiz.length}</p>
                </div>
            </div>
            
            <p class="results-message">${message}</p>
            
            <div class="results-breakdown">
                <h4>Review Your Answers:</h4>
    `;
    
    quiz.forEach((question, index) => {
        const isCorrect = quizAnswers[index] === question.correct;
        const userAnswer = question.options[quizAnswers[index]] || 'Not answered';
        const correctAnswer = question.options[question.correct];
        
        html += `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <h5>Question ${index + 1}: ${question.question}</h5>
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                ${!isCorrect ? `<p><strong>Correct answer:</strong> ${correctAnswer}</p>` : ''}
                <p class="result-status">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</p>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <div class="quiz-buttons">
                <button class="btn btn-delete" onclick="closeQuizModal()">❌ Close</button>
                <button class="btn btn-primary" onclick="startQuiz('${currentQuiz}')">🔄 Retake Quiz</button>
            </div>
        </div>
    `;
    
    quizContent.innerHTML = html;
}

function closeQuizModal() {
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.remove();
    currentQuiz = null;
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
}

/* ===========================
   QUIZ FUNCTIONALITY
   =========================== */

let currentQuiz = null;
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];
let quizTimeLeft = 10;
let quizTimer = null;

const quizData = {
    math: [
        {
            question: "What is 47 + 38?",
            options: ["85", "84", "86", "83"],
            correct: 0
        },
        {
            question: "What is 156 - 87?",
            options: ["68", "69", "70", "71"],
            correct: 1
        },
        {
            question: "What is 23 × 12?",
            options: ["276", "265", "286", "256"],
            correct: 0
        },
        {
            question: "What is 144 ÷ 12?",
            options: ["11", "12", "13", "14"],
            correct: 1
        },
        {
            question: "If a book costs $8.75 and you buy 3, how much do you spend?",
            options: ["$25.25", "$26.25", "$27.25", "$24.25"],
            correct: 1
        },
        {
            question: "What is 15% of 200?",
            options: ["25", "30", "35", "40"],
            correct: 1
        },
        {
            question: "A rectangle has a length of 12 cm and width of 8 cm. What is its area?",
            options: ["86 cm²", "96 cm²", "106 cm²", "76 cm²"],
            correct: 1
        },
        {
            question: "What is 2³ + 3²?",
            options: ["15", "16", "17", "18"],
            correct: 2
        },
        {
            question: "If you have 48 apples and divide them equally among 6 people, how many does each person get?",
            options: ["6", "7", "8", "9"],
            correct: 2
        },
        {
            question: "What is the least common multiple of 4 and 6?",
            options: ["12", "24", "18", "20"],
            correct: 0
        },
        {
            question: "A triangle has sides of 3, 4, and 5 cm. What is its perimeter?",
            options: ["10 cm", "11 cm", "12 cm", "13 cm"],
            correct: 2
        },
        {
            question: "What is 25% of 80?",
            options: ["15", "20", "25", "30"],
            correct: 1
        },
        {
            question: "If a shirt costs $45 and is on sale for 20% off, what's the new price?",
            options: ["$30", "$36", "​$35", "$40"],
            correct: 1
        },
        {
            question: "What is 9² - 7²?",
            options: ["30", "31", "32", "33"],
            correct: 2
        },
        {
            question: "A circle has a radius of 5 cm. What is its circumference? (use π ≈ 3.14)",
            options: ["31.4 cm", "32.4 cm", "33.4 cm", "30.4 cm"],
            correct: 0
        },
        {
            question: "What is the greatest common factor of 24 and 36?",
            options: ["6", "12", "8", "4"],
            correct: 1
        },
        {
            question: "If you save $12 each week for 8 weeks, how much will you have?",
            options: ["$92", "$94", "$96", "$98"],
            correct: 2
        },
        {
            question: "What is 3/4 + 1/4?",
            options: ["1", "2", "3", "4"],
            correct: 0
        },
        {
            question: "What is 40% of 250?",
            options: ["90", "100", "110", "120"],
            correct: 1
        },
        {
            question: "If a train travels 60 km/hour for 3 hours, how far does it go?",
            options: ["150 km", "160 km", "170 km", "180 km"],
            correct: 3
        }
    ],
    reading: [
        {
            question: "What is the primary purpose of a fable?",
            options: ["To entertain with fantasy", "To teach a moral lesson", "To describe historical events", "To provide facts about science"],
            correct: 1
        },
        {
            question: "Which literary device compares two things using 'like' or 'as'?",
            options: ["Metaphor", "Simile", "Personification", "Alliteration"],
            correct: 1
        },
        {
            question: "What does 'antagonist' mean in a story?",
            options: ["The main character", "A character who opposes the protagonist", "A supporting character", "A character who tells the story"],
            correct: 1
        },
        {
            question: "In literature, what is 'foreshadowing'?",
            options: ["A flashback to the past", "Hints that suggest what will happen later", "A sudden plot twist", "The climax of the story"],
            correct: 1
        },
        {
            question: "What is the theme of a story?",
            options: ["The setting where it takes place", "The main message or underlying idea", "The sequence of events", "The dialogue between characters"],
            correct: 1
        },
        {
            question: "Which point of view uses 'he/she/they' to tell the story?",
            options: ["First person", "Second person", "Third person", "Fourth person"],
            correct: 2
        },
        {
            question: "What does 'characterization' refer to?",
            options: ["The number of characters in a story", "How an author reveals a character's traits and personality", "The names of all characters", "The dialogue characters speak"],
            correct: 1
        },
        {
            question: "What is irony?",
            options: ["A comparison between two things", "When the opposite of what is expected happens", "A repeated sound at the beginning of words", "A person's perspective on events"],
            correct: 1
        },
        {
            question: "In a story, what is the 'climax'?",
            options: ["The beginning of the story", "The point of greatest tension or turning point", "The resolution of the conflict", "A description of the setting"],
            correct: 1
        },
        {
            question: "What is the purpose of a 'flashback' in a narrative?",
            options: ["To show what happens next", "To jump to the ending", "To reveal past events that explain the present", "To confuse the reader"],
            correct: 2
        },
        {
            question: "What is a 'metaphor'?",
            options: ["A comparison using 'like' or 'as'", "A direct comparison without using 'like' or 'as'", "A word that sounds like what it means", "The repetition of sounds"],
            correct: 1
        },
        {
            question: "What does 'symbolism' mean in literature?",
            options: ["Using punctuation marks", "When an object represents a larger idea or theme", "The setting of a story", "The dialogue between characters"],
            correct: 1
        },
        {
            question: "What is 'alliteration'?",
            options: ["The repetition of vowel sounds", "The repetition of consonant sounds at the beginning of words", "A comparison between two things", "A sudden change in the story"],
            correct: 1
        },
        {
            question: "In a story, what is the 'exposition'?",
            options: ["The most exciting part", "The introduction that provides background information", "The ending of the story", "A conversation between characters"],
            correct: 1
        },
        {
            question: "What does 'inference' mean?",
            options: ["Reading the words out loud", "Making a logical conclusion based on evidence", "Skipping parts of the text", "Guessing without thinking"],
            correct: 1
        },
        {
            question: "What is the 'resolution' of a story?",
            options: ["The introduction", "The climax", "The part where conflicts are resolved", "The middle section"],
            correct: 2
        },
        {
            question: "What does 'pacing' refer to in a narrative?",
            options: ["Walking around while reading", "The speed at which the story unfolds", "The number of pages", "The author's name"],
            correct: 1
        },
        {
            question: "What is 'onomatopoeia'?",
            options: ["A comparison using 'like'", "A word that imitates the sound it represents", "A repeated phrase", "The main character"],
            correct: 1
        },
        {
            question: "What does 'tone' mean in literature?",
            options: ["The volume of the voice", "The author's attitude or feeling toward the subject", "The music in the background", "The setting of the story"],
            correct: 1
        },
        {
            question: "What is the difference between 'plot' and 'story'?",
            options: ["They mean the same thing", "Plot is what happens; story is how it's told", "Story is what happens; plot is how it's told", "Neither is important"],
            correct: 2
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
        },
        {
            question: "What does 'eloquent' mean?",
            options: ["Quiet", "Fluent and persuasive in speech", "Angry", "Confused"],
            correct: 1
        },
        {
            question: "What does 'diligent' mean?",
            options: ["Lazy", "Hardworking and careful", "Dishonest", "Rude"],
            correct: 1
        },
        {
            question: "What does 'ambiguous' mean?",
            options: ["Clear and obvious", "Having more than one possible meaning", "Simple", "Complex"],
            correct: 1
        },
        {
            question: "What does 'eloquence' refer to?",
            options: ["A type of music", "Fluent and expressive speaking", "A feeling", "A place"],
            correct: 1
        },
        {
            question: "What does 'pragmatic' mean?",
            options: ["Idealistic", "Based on practical considerations rather than theory", "Religious", "Artistic"],
            correct: 1
        },
        {
            question: "What does 'meager' mean?",
            options: ["Large", "Scanty or insufficient in quantity", "Generous", "Abundant"],
            correct: 1
        },
        {
            question: "What does 'commemorate' mean?",
            options: ["To forget", "To honor the memory of", "To ignore", "To disrespect"],
            correct: 1
        },
        {
            question: "What does 'transient' mean?",
            options: ["Permanent", "Lasting only a short time", "Strong", "Weak"],
            correct: 1
        },
        {
            question: "What does 'meticulous' mean?",
            options: ["Careless", "Showing great attention to detail", "Quick", "Slow"],
            correct: 1
        },
        {
            question: "What does 'benign' mean?",
            options: ["Evil", "Harmful", "Gentle or not harmful", "Dangerous"],
            correct: 2
        },
        {
            question: "What does 'audacious' mean?",
            options: ["Fearful", "Bold and daring", "Quiet", "Timid"],
            correct: 1
        },
        {
            question: "What does 'candid' mean?",
            options: ["Dishonest", "Honest and straightforward", "Angry", "Confused"],
            correct: 1
        },
        {
            question: "What does 'nostalgia' mean?",
            options: ["Hatred of the past", "A sentimental longing for the past", "Fear of the future", "Confusion"],
            correct: 1
        },
        {
            question: "What does 'plausible' mean?",
            options: ["Impossible", "Seeming reasonable or probable", "Obvious", "Clear"],
            correct: 1
        },
        {
            question: "What does 'enigmatic' mean?",
            options: ["Clear", "Mysterious or puzzling", "Simple", "Easy"],
            correct: 1
        }
    ]
};

function startQuiz(subject) {
    currentQuiz = subject;
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    quizTimeLeft = 10;
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
    
    quizTimeLeft = 10;
    
    let html = `
        <h2>${currentQuiz.charAt(0).toUpperCase() + currentQuiz.slice(1)} Quiz</h2>
        <div class="quiz-progress">
            <p>Question ${currentQuestionIndex + 1} of ${quiz.length}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${((currentQuestionIndex + 1) / quiz.length) * 100}%"></div>
            </div>
        </div>
        
        <div class="quiz-timer">
            <span id="timer" class="timer-display">10s</span>
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
    
    // Start timer
    clearInterval(quizTimer);
    quizTimer = setInterval(() => {
        quizTimeLeft--;
        document.getElementById('timer').textContent = quizTimeLeft + 's';
        
        if (quizTimeLeft <= 0) {
            clearInterval(quizTimer);
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer(index) {
    quizAnswers[currentQuestionIndex] = index;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    clearInterval(quizTimer);
    const quiz = quizData[currentQuiz];
    
    if (currentQuestionIndex < quiz.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(quizTimer);
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
        const userAnswer = question.options[quizAnswers[index]] || 'Not answered (Time ran out)';
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
    clearInterval(quizTimer);
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.remove();
    currentQuiz = null;
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
}

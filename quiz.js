/* ===========================
   QUIZ SYSTEM - quiz.js
   SSAT Study Planner
   =========================== */

// ===========================
//  QUESTION BANK
// ===========================

const quizCategories = [
    {
        id: 'vocabulary',
        name: '📝 Vocabulary & Word Analogies',
        description: 'Test your vocabulary and word relationship skills',
        questions: [
            {
                q: 'Which word means "very happy"?',
                options: ['Gloomy', 'Elated', 'Tired', 'Nervous'],
                answer: 1
            },
            {
                q: 'KITTEN is to CAT as PUPPY is to ___',
                options: ['Rabbit', 'Dog', 'Hamster', 'Fish'],
                answer: 1
            },
            {
                q: 'Which word is the opposite of "ancient"?',
                options: ['Old', 'Huge', 'Modern', 'Quiet'],
                answer: 2
            },
            {
                q: 'BOOK is to READ as SONG is to ___',
                options: ['Draw', 'Listen', 'Eat', 'Run'],
                answer: 1
            },
            {
                q: 'Which word means "to make larger"?',
                options: ['Shrink', 'Expand', 'Flatten', 'Remove'],
                answer: 1
            },
            {
                q: 'PENCIL is to WRITE as SCISSORS is to ___',
                options: ['Glue', 'Cut', 'Color', 'Fold'],
                answer: 1
            },
            {
                q: 'Which word means "brave and daring"?',
                options: ['Cowardly', 'Clumsy', 'Bold', 'Lazy'],
                answer: 2
            },
            {
                q: 'COLD is to HOT as WET is to ___',
                options: ['Warm', 'Dry', 'Dark', 'Soft'],
                answer: 1
            },
            {
                q: 'Which word means "a long trip or journey"?',
                options: ['Rest', 'Voyage', 'Nap', 'Sit'],
                answer: 1
            },
            {
                q: 'FINGER is to HAND as TOE is to ___',
                options: ['Arm', 'Knee', 'Foot', 'Elbow'],
                answer: 2
            },
            {
                q: 'Which word means "to keep something safe"?',
                options: ['Destroy', 'Protect', 'Ignore', 'Scatter'],
                answer: 1
            },
            {
                q: 'EAGLE is to NEST as FISH is to ___',
                options: ['Sky', 'River', 'Forest', 'Desert'],
                answer: 1
            },
            {
                q: 'Which word is the opposite of "generous"?',
                options: ['Kind', 'Selfish', 'Friendly', 'Polite'],
                answer: 1
            },
            {
                q: 'HEAT is to MELT as COLD is to ___',
                options: ['Warm', 'Float', 'Freeze', 'Glow'],
                answer: 2
            },
            {
                q: 'Which word means "very small"?',
                options: ['Enormous', 'Tiny', 'Bright', 'Loud'],
                answer: 1
            }
        ]
    },
    {
        id: 'reading',
        name: '📖 Reading Comprehension',
        description: 'Read short passages and answer questions',
        questions: [
            {
                passage: 'Maya loved going to the library every Saturday. She would spend hours reading books about animals, especially dolphins. One day she found a book about how dolphins communicate using clicks and whistles. She was so amazed that she checked out five books about ocean animals.',
                q: 'What was Maya\'s favorite topic to read about?',
                options: ['Dinosaurs', 'Animals', 'Space', 'Plants'],
                answer: 1
            },
            {
                passage: 'The school garden had tomatoes, carrots, and sunflowers. Every Monday and Friday, the students watered the plants. It took six weeks before the first tomato turned red. The class was very proud when they ate their first salad made from garden vegetables.',
                q: 'How often did the students water the plants?',
                options: ['Every day', 'Once a week', 'Twice a week', 'Once a month'],
                answer: 2
            },
            {
                passage: 'Ben and his dad built a birdhouse together using wood and paint. They placed it in the backyard oak tree. Within two days, a family of blue birds moved in. Every morning Ben would watch them from his bedroom window.',
                q: 'Where did Ben and his dad place the birdhouse?',
                options: ['On the roof', 'In the oak tree', 'Near the fence', 'In the garage'],
                answer: 1
            },
            {
                passage: 'The snow had been falling all night. By morning, there were three feet of snow in the yard. School was cancelled, and all the kids on the street came outside to build snow forts and have snowball fights.',
                q: 'Why was school cancelled?',
                options: ['It was a holiday', 'There was a storm', 'It was too hot', 'There was heavy snow'],
                answer: 3
            },
            {
                passage: 'Sara practiced piano for thirty minutes every afternoon after school. Her teacher said that regular practice was the key to getting better. After three months, Sara could play her favorite song without looking at the music.',
                q: 'According to the passage, what is the key to getting better at piano?',
                options: ['Buying a new piano', 'Regular practice', 'Watching videos', 'Taking a long break'],
                answer: 1
            },
            {
                passage: 'The rainforest is home to more than half of all the world\'s plant and animal species. Even though rainforests cover only about six percent of Earth\'s surface, they are incredibly important. Many medicines used today were discovered from plants found in rainforests.',
                q: 'What percentage of Earth\'s surface do rainforests cover?',
                options: ['About half', 'About six percent', 'About twenty percent', 'About one percent'],
                answer: 1
            },
            {
                passage: 'Leo forgot to study for his spelling test and got a low score. He felt disappointed. That evening he made a plan: he would study new words every night before bed. The next week, he got a perfect score and felt very proud.',
                q: 'What did Leo do after he got a low score?',
                options: ['He quit school', 'He made a study plan', 'He asked his friend for answers', 'He ignored the grade'],
                answer: 1
            },
            {
                passage: 'The sun is a star at the center of our solar system. It is so large that about one million Earths could fit inside it. The sun gives us heat and light, which plants need to grow. Without the sun, life on Earth would not be possible.',
                q: 'Why is the sun important to life on Earth?',
                options: ['It gives heat and light', 'It moves the oceans', 'It makes the wind blow', 'It creates the moon'],
                answer: 0
            },
            {
                passage: 'Mia entered her dog Biscuit in the local pet show. Biscuit had a shiny coat and could do three tricks: sit, shake, and roll over. The judges were impressed and awarded Biscuit first place in the "Tricks" category.',
                q: 'How many tricks could Biscuit perform?',
                options: ['Two', 'Four', 'Three', 'Five'],
                answer: 2
            },
            {
                passage: 'Recycling helps protect the environment. When we recycle paper, plastic, and glass, we reduce the amount of trash that goes into landfills. Recycling also uses less energy than making new products from raw materials.',
                q: 'According to the passage, what does recycling reduce?',
                options: ['The cost of shopping', 'The amount of trash in landfills', 'The price of electricity', 'The number of factories'],
                answer: 1
            },
            {
                passage: 'Jake wanted to earn money to buy a new video game. He offered to wash neighbors\' cars for five dollars each. In one weekend, he washed seven cars. He saved all the money and bought the game the following Monday.',
                q: 'How much money did Jake earn washing cars?',
                options: ['Twenty dollars', 'Thirty dollars', 'Thirty-five dollars', 'Forty dollars'],
                answer: 2
            },
            {
                passage: 'Frogs are amphibians, which means they can live both in water and on land. Young frogs, called tadpoles, live entirely in water and breathe through gills. As they grow, they develop lungs and legs, allowing them to also move on land.',
                q: 'What are young frogs called?',
                options: ['Kittens', 'Tadpoles', 'Larvae', 'Hatchlings'],
                answer: 1
            }
        ]
    },
    {
        id: 'math',
        name: '🔢 Math Concepts',
        description: 'Practice math problem-solving skills',
        questions: [
            {
                q: 'What is 48 ÷ 6?',
                options: ['6', '7', '8', '9'],
                answer: 2
            },
            {
                q: 'A rectangle has a length of 9 cm and a width of 5 cm. What is its area?',
                options: ['14 cm²', '28 cm²', '45 cm²', '50 cm²'],
                answer: 2
            },
            {
                q: 'What is 125 + 87?',
                options: ['202', '212', '222', '232'],
                answer: 1
            },
            {
                q: 'Emma has 3 bags of marbles. Each bag has 15 marbles. How many marbles does she have in all?',
                options: ['35', '40', '45', '50'],
                answer: 2
            },
            {
                q: 'Which fraction is greater: 3/4 or 2/3?',
                options: ['2/3', '3/4', 'They are equal', 'Cannot tell'],
                answer: 1
            },
            {
                q: 'A clock shows 3:45 PM. What time will it be in 30 minutes?',
                options: ['3:75 PM', '4:00 PM', '4:15 PM', '4:30 PM'],
                answer: 2
            },
            {
                q: 'If a pencil costs $0.25 and you buy 8 pencils, how much do you spend?',
                options: ['$1.50', '$2.00', '$2.25', '$2.50'],
                answer: 1
            },
            {
                q: 'What is the next number in the pattern: 2, 4, 8, 16, ___?',
                options: ['20', '24', '28', '32'],
                answer: 3
            },
            {
                q: 'What is 300 − 147?',
                options: ['143', '153', '163', '173'],
                answer: 1
            },
            {
                q: 'There are 24 students in a class. They are split into groups of 4. How many groups are there?',
                options: ['4', '5', '6', '8'],
                answer: 2
            },
            {
                q: 'What is the perimeter of a square with sides of 7 cm?',
                options: ['14 cm', '21 cm', '28 cm', '49 cm'],
                answer: 2
            },
            {
                q: 'Which number is divisible by both 2 and 5?',
                options: ['15', '22', '30', '44'],
                answer: 2
            },
            {
                q: 'A store sells apples for $0.50 each. How much do 12 apples cost?',
                options: ['$5.00', '$5.50', '$6.00', '$6.50'],
                answer: 2
            },
            {
                q: 'What is 7 × 8?',
                options: ['54', '56', '58', '60'],
                answer: 1
            },
            {
                q: 'What fraction of 20 is 5?',
                options: ['1/5', '1/4', '1/3', '2/5'],
                answer: 1
            }
        ]
    },
    {
        id: 'verbal',
        name: '🧠 Verbal Reasoning',
        description: 'Test your logical and verbal reasoning skills',
        questions: [
            {
                q: 'Which word does NOT belong with the others?\nApple, Orange, Banana, Carrot',
                options: ['Apple', 'Orange', 'Banana', 'Carrot'],
                answer: 3
            },
            {
                q: 'If all birds can fly, and a robin is a bird, then a robin ___.',
                options: ['Cannot fly', 'Can fly', 'Is a fish', 'Lives underground'],
                answer: 1
            },
            {
                q: 'Which word does NOT belong with the others?\nHappy, Sad, Joyful, Cheerful',
                options: ['Happy', 'Sad', 'Joyful', 'Cheerful'],
                answer: 1
            },
            {
                q: 'Tom is taller than Sam. Sam is taller than Jake. Who is the tallest?',
                options: ['Sam', 'Jake', 'Tom', 'They are all the same height'],
                answer: 2
            },
            {
                q: 'Which word does NOT belong with the others?\nCar, Truck, Bus, Bicycle, Airplane',
                options: ['Car', 'Truck', 'Bicycle', 'Airplane'],
                answer: 2
            },
            {
                q: 'Anna has more stickers than Beth. Beth has more stickers than Cora. Who has the fewest stickers?',
                options: ['Anna', 'Beth', 'Cora', 'They all have the same'],
                answer: 2
            },
            {
                q: 'Which word does NOT belong with the others?\nRed, Blue, Circle, Green',
                options: ['Red', 'Blue', 'Circle', 'Green'],
                answer: 2
            },
            {
                q: 'Every Friday, Leo goes to swimming practice. This week has a Friday. Does Leo have swimming practice this week?',
                options: ['No', 'Yes', 'Only if he wants to', 'Cannot tell'],
                answer: 1
            },
            {
                q: 'Which word does NOT belong with the others?\nPiano, Guitar, Violin, Painting',
                options: ['Piano', 'Guitar', 'Violin', 'Painting'],
                answer: 3
            },
            {
                q: 'If a square has 4 sides and a triangle has 3 sides, how many sides do 2 squares and 1 triangle have in total?',
                options: ['9', '10', '11', '12'],
                answer: 2
            },
            {
                q: 'Which word does NOT belong with the others?\nRose, Daisy, Oak, Tulip',
                options: ['Rose', 'Daisy', 'Oak', 'Tulip'],
                answer: 2
            },
            {
                q: 'Maria is younger than Luke. Luke is younger than Nina. Who is the oldest?',
                options: ['Maria', 'Luke', 'Nina', 'They are all the same age'],
                answer: 2
            },
            {
                q: 'Which word does NOT belong with the others?\nSwim, Run, Jump, Sleep',
                options: ['Swim', 'Run', 'Jump', 'Sleep'],
                answer: 3
            },
            {
                q: 'All cats have tails. Fluffy is a cat. Does Fluffy have a tail?',
                options: ['No', 'Yes', 'Sometimes', 'Cannot tell'],
                answer: 1
            },
            {
                q: 'Which word does NOT belong with the others?\nCup, Plate, Spoon, Hammer',
                options: ['Cup', 'Plate', 'Spoon', 'Hammer'],
                answer: 3
            }
        ]
    }
];

// ===========================
//  QUIZ STATE
// ===========================

let currentQuiz = null; // { categoryId, questions, currentIndex, score, startTime }

// ===========================
//  OPEN QUIZ MODAL
// ===========================

function openQuiz(categoryId) {
    const category = quizCategories.find(c => c.id === categoryId);
    if (!category) return;

    // Shuffle and pick 10 questions
    const shuffled = [...category.questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);

    currentQuiz = {
        categoryId,
        categoryName: category.name,
        questions: selected,
        currentIndex: 0,
        score: 0,
        startTime: Date.now(),
        answered: false
    };

    // Mark schedule as "In Progress"
    updateScheduleForQuiz('In Progress');

    renderQuizQuestion();
    document.getElementById('quiz-modal').style.display = 'block';
}

// ===========================
//  RENDER QUIZ QUESTION
// ===========================

function renderQuizQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const total = currentQuiz.questions.length;
    const idx = currentQuiz.currentIndex;

    document.getElementById('quiz-progress-text').textContent =
        `Question ${idx + 1} of ${total}`;

    const progressPct = ((idx) / total) * 100;
    document.getElementById('quiz-progress-bar-fill').style.width = progressPct + '%';

    document.getElementById('quiz-score-live').textContent =
        `Score: ${currentQuiz.score} / ${idx}`;

    const questionArea = document.getElementById('quiz-question-area');
    questionArea.innerHTML = '';

    // Passage (reading comprehension)
    if (q.passage) {
        const passageDiv = document.createElement('div');
        passageDiv.className = 'quiz-passage';
        passageDiv.textContent = q.passage;
        questionArea.appendChild(passageDiv);
    }

    const questionText = document.createElement('p');
    questionText.className = 'quiz-question-text';
    questionText.textContent = q.q;
    questionArea.appendChild(questionText);

    const optionsList = document.createElement('div');
    optionsList.className = 'quiz-options';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = `${String.fromCharCode(65 + i)}) ${opt}`;
        btn.dataset.index = i;
        btn.addEventListener('click', function () {
            selectAnswer(i);
        });
        optionsList.appendChild(btn);
    });

    questionArea.appendChild(optionsList);

    // Next/Submit button (hidden until answer selected)
    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.style.display = 'none';
    nextBtn.textContent = idx + 1 < total ? 'Next Question ➡️' : 'Finish Quiz 🏁';

    currentQuiz.answered = false;
}

// ===========================
//  SELECT ANSWER
// ===========================

function selectAnswer(selectedIndex) {
    if (currentQuiz.answered) return;
    currentQuiz.answered = true;

    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const correct = q.answer;
    const buttons = document.querySelectorAll('.quiz-option-btn');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) {
            btn.classList.add('correct');
        } else if (i === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    if (selectedIndex === correct) {
        currentQuiz.score++;
    }

    // Update live score display
    const idx = currentQuiz.currentIndex + 1;
    document.getElementById('quiz-score-live').textContent =
        `Score: ${currentQuiz.score} / ${idx}`;

    document.getElementById('quiz-next-btn').style.display = 'inline-block';
}

// ===========================
//  NEXT QUESTION
// ===========================

function quizNext() {
    if (!currentQuiz.answered) return;

    currentQuiz.currentIndex++;

    if (currentQuiz.currentIndex >= currentQuiz.questions.length) {
        finishQuiz();
    } else {
        renderQuizQuestion();
    }
}

// ===========================
//  FINISH QUIZ
// ===========================

function finishQuiz() {
    const total = currentQuiz.questions.length;
    const score = currentQuiz.score;
    const pct = Math.round((score / total) * 100);
    const timeMs = Date.now() - currentQuiz.startTime;
    const timeMins = Math.round(timeMs / 60000);

    // Update progress bar to 100%
    document.getElementById('quiz-progress-bar-fill').style.width = '100%';
    document.getElementById('quiz-progress-text').textContent = 'Quiz Complete!';
    document.getElementById('quiz-score-live').textContent = `Final Score: ${score} / ${total}`;

    // Show results panel
    const questionArea = document.getElementById('quiz-question-area');
    questionArea.innerHTML = '';

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';

    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : pct >= 30 ? '👍' : '💪';
    resultsDiv.innerHTML = `
        <div class="quiz-results-emoji">${emoji}</div>
        <h3 class="quiz-results-title">Quiz Complete!</h3>
        <div class="quiz-results-score">${score} / ${total}</div>
        <div class="quiz-results-pct">${pct}% Correct</div>
        <p class="quiz-results-msg">${getResultMessage(pct)}</p>
        <p class="quiz-results-time">⏱️ Time: ${timeMins > 0 ? timeMins + ' min' : 'Under 1 min'}</p>
    `;
    questionArea.appendChild(resultsDiv);

    document.getElementById('quiz-next-btn').style.display = 'none';

    const doneBtn = document.getElementById('quiz-done-btn');
    doneBtn.style.display = 'inline-block';
    doneBtn.onclick = function () {
        closeQuizAndUpdate(pct, timeMins);
    };
}

function getResultMessage(pct) {
    if (pct >= 80) return 'Outstanding work! You are really mastering this material! 🌟';
    if (pct >= 60) return 'Great job! Keep practicing and you\'ll ace the SSAT! 📚';
    if (pct >= 30) return 'Good effort! Review the material and try again. You\'re getting there! 💡';
    return 'Keep practicing! Every attempt makes you stronger. Don\'t give up! 💪';
}

// ===========================
//  CLOSE QUIZ & UPDATE SCHEDULE
// ===========================

function closeQuizAndUpdate(pct, timeMins) {
    // Mark schedule as "Completed"
    updateScheduleForQuiz('Completed', timeMins);

    // Save quiz score to localStorage
    saveQuizScore(currentQuiz.categoryId, currentQuiz.score, currentQuiz.questions.length);

    document.getElementById('quiz-modal').style.display = 'none';
    currentQuiz = null;

    // Conditional break popup
    if (pct > 30) {
        openBreakPopup();
    } else {
        showKeepPracticingMessage();
    }
}

function showKeepPracticingMessage() {
    const msgDiv = document.getElementById('keep-practicing-msg');
    if (msgDiv) {
        msgDiv.style.display = 'block';
        setTimeout(() => { msgDiv.style.display = 'none'; }, 5000);
    }
}

// ===========================
//  CLOSE QUIZ (abandon)
// ===========================

function closeQuiz() {
    if (currentQuiz) {
        // Revert to "Not Started" if abandoned mid-quiz
        updateScheduleForQuiz('Not Started');
        currentQuiz = null;
    }
    document.getElementById('quiz-modal').style.display = 'none';
}

// ===========================
//  AUTO-UPDATE SCHEDULE
// ===========================

function updateScheduleForQuiz(status, timeMins) {
    const plans = JSON.parse(localStorage.getItem('studyPlans') || '[]');
    if (!plans.length) return;

    // Update the first non-paused plan's first incomplete day
    const plan = plans.find(p => !p.isPaused) || plans[0];
    if (!plan || !plan.schedule) return;

    const weeks = Object.keys(plan.schedule);
    let updated = false;

    for (const week of weeks) {
        if (updated) break;
        const days = Object.keys(plan.schedule[week]);
        for (const day of days) {
            if (updated) break;
            const dayData = plan.schedule[week][day];
            if (dayData.weekComplete) continue;

            // Find the first non-break, non-completed chunk
            for (let i = 0; i < dayData.chunks.length; i++) {
                const chunk = dayData.chunks[i];
                if (chunk.status === 'Break') continue;
                if (chunk.status === 'Completed') continue;

                if (status === 'In Progress' && chunk.status === 'Not Started') {
                    chunk.status = 'In Progress';
                    if (currentQuiz) {
                        chunk.activity = chunk.activity || currentQuiz.categoryName;
                    }
                    updated = true;
                    break;
                } else if (status === 'Completed' && chunk.status === 'In Progress') {
                    chunk.status = 'Completed';
                    if (timeMins && timeMins > 0) {
                        chunk.duration = timeMins + ' min (quiz)';
                    }
                    updated = true;
                    break;
                } else if (status === 'Not Started' && chunk.status === 'In Progress') {
                    chunk.status = 'Not Started';
                    updated = true;
                    break;
                }
            }
        }
    }

    if (updated) {
        const idx = plans.findIndex(p => p.id === plan.id);
        plans[idx] = plan;
        localStorage.setItem('studyPlans', JSON.stringify(plans));
        // Refresh plan display if visible
        if (typeof loadPlans === 'function') loadPlans();
    }
}

// ===========================
//  SAVE QUIZ SCORE
// ===========================

function saveQuizScore(categoryId, score, total) {
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    scores.push({
        categoryId,
        score,
        total,
        pct: Math.round((score / total) * 100),
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('quizScores', JSON.stringify(scores));
}

// ===========================
//  RENDER QUIZ HISTORY
// ===========================

function renderQuizHistory() {
    const container = document.getElementById('quiz-history-list');
    if (!container) return;

    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    container.innerHTML = '';

    if (!scores.length) {
        container.innerHTML = '<p class="empty-message">No quiz history yet. Take a quiz above! ⬆️</p>';
        return;
    }

    // Show latest 5
    const recent = scores.slice(-5).reverse();
    recent.forEach(entry => {
        const cat = quizCategories.find(c => c.id === entry.categoryId);
        const div = document.createElement('div');
        div.className = 'quiz-history-entry';
        div.innerHTML = `
            <span class="qh-cat">${cat ? cat.name : entry.categoryId}</span>
            <span class="qh-score">${entry.score}/${entry.total} (${entry.pct}%)</span>
            <span class="qh-date">${entry.date}</span>
        `;
        container.appendChild(div);
    });
}

// ===========================
//  INIT LEARNING SECTION
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    renderQuizHistory();

    // Close quiz modal on outside click
    const quizModal = document.getElementById('quiz-modal');
    if (quizModal) {
        quizModal.addEventListener('click', function (e) {
            if (e.target === quizModal) {
                closeQuiz();
            }
        });
    }
});

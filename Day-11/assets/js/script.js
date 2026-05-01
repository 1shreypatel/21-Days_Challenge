const QUESTIONS = [
    {
        category: "🔬 Science",
        text: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        answer: 2
    },
    {
        category: "🌍 Geography",
        text: "Which is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: 3
    },
    {
        category: "🏛️ History",
        text: "In which year did the Berlin Wall fall?",
        options: ["1987", "1989", "1991", "1993"],
        answer: 1
    },
    {
        category: "🎨 Arts",
        text: "Who painted the Mona Lisa?",
        options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
        answer: 2
    },
    {
        category: "🔬 Science",
        text: "How many bones are in the adult human body?",
        options: ["186", "196", "206", "216"],
        answer: 2
    },
    {
        category: "🌍 Geography",
        text: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
        answer: 3
    },
    {
        category: "💻 Technology",
        text: "What does 'HTTP' stand for?",
        options: ["HyperText Transfer Protocol", "High Transfer Text Program", "Hyper Transfer Text Process", "HyperText Transmission Path"],
        answer: 0
    },
    {
        category: "🎬 Pop Culture",
        text: "Which movie features the quote: 'To infinity and beyond!'?",
        options: ["A Bug's Life", "Toy Story", "The Incredibles", "WALL-E"],
        answer: 1
    },
    {
        category: "🔬 Science",
        text: "What planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        answer: 2
    },
    {
        category: "🏛️ History",
        text: "Who was the first person to walk on the Moon?",
        options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
        answer: 2
    }
];

const TIMER_MAX = 20;
const CIRCUMFERENCE = 226;
const LETTERS = ['A', 'B', 'C', 'D'];

let currentQ = 0, score = 0, streak = 0, bestStreak = 0;
let timeLeft = TIMER_MAX, timerInterval = null;
let answered = false;
let history = [];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startQuiz() {
    currentQ = 0; score = 0; streak = 0; bestStreak = 0; history = [];
    document.getElementById('scoreDisplay').textContent = '0';
    showScreen('screenQuiz');
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    const q = QUESTIONS[currentQ];

    document.getElementById('qNum').textContent = currentQ + 1;
    document.getElementById('qCategory').textContent = q.category;
    document.getElementById('qText').textContent = q.text;
    document.getElementById('progressFill').style.width = (currentQ / QUESTIONS.length * 100) + '%';

    const fb = document.getElementById('feedbackBar');
    fb.className = 'feedback-bar';
    fb.textContent = '';

    const btn = document.getElementById('btnNext');
    btn.classList.remove('show');
    btn.textContent = currentQ < QUESTIONS.length - 1 ? 'NEXT QUESTION →' : 'SEE RESULTS →';

    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = '';
    q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'option-btn';
        b.setAttribute('data-letter', LETTERS[i]);
        b.textContent = opt;
        b.onclick = () => selectAnswer(i);
        grid.appendChild(b);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIMER_MAX;
    updateTimerUI();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 5) {
            document.getElementById('timerRing').classList.add('urgent');
        }
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    const pct = timeLeft / TIMER_MAX;
    const offset = CIRCUMFERENCE * (1 - pct);
    document.getElementById('timerRing').style.strokeDashoffset = offset;
    document.getElementById('timerNum').textContent = timeLeft;

    if (timeLeft <= 5) {
        document.getElementById('timerNum').style.color = 'var(--wrong)';
    } else {
        document.getElementById('timerNum').style.color = 'var(--gold)';
        document.getElementById('timerRing').classList.remove('urgent');
    }
}

function selectAnswer(idx) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const q = QUESTIONS[currentQ];
    const btns = document.querySelectorAll('.option-btn');
    const fb = document.getElementById('feedbackBar');

    btns.forEach(b => b.disabled = true);
    btns[q.answer].classList.add('correct');

    const timeBonus = Math.max(0, Math.round((timeLeft / TIMER_MAX) * 50));

    if (idx === q.answer) {
        streak++;
        if (streak > bestStreak) bestStreak = streak;
        const pts = 100 + timeBonus + (streak > 1 ? (streak - 1) * 20 : 0);
        score += pts;
        document.getElementById('scoreDisplay').textContent = score;

        fb.textContent = streak > 2
            ? `🔥 ${streak}x STREAK! +${pts} pts`
            : `✓ Correct! +${pts} pts (time bonus: +${timeBonus})`;
        fb.className = 'feedback-bar ok show';

        history.push({ correct: true, q: q.text, userAns: q.options[idx], rightAns: q.options[q.answer] });

        if (streak > 2) triggerCombo(streak);
    } else {
        btns[idx].classList.add('wrong');
        btns[idx].parentElement.classList.add('shake');
        setTimeout(() => btns[idx].parentElement.classList.remove('shake'), 400);

        streak = 0;
        fb.textContent = `✗ Wrong! Correct answer: ${q.options[q.answer]}`;
        fb.className = 'feedback-bar bad show';

        history.push({ correct: false, q: q.text, userAns: q.options[idx], rightAns: q.options[q.answer] });
    }

    document.getElementById('btnNext').classList.add('show');
}

function timeOut() {
    if (answered) return;
    answered = true;
    streak = 0;

    const q = QUESTIONS[currentQ];
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);
    btns[q.answer].classList.add('correct');

    const fb = document.getElementById('feedbackBar');
    fb.textContent = `⏱ Time's up! The answer was: ${q.options[q.answer]}`;
    fb.className = 'feedback-bar timeout show';

    history.push({ correct: false, q: q.text, userAns: 'No answer', rightAns: q.options[q.answer] });

    document.getElementById('btnNext').classList.add('show');
}

function triggerCombo(n) {
    const el = document.getElementById('comboFlash');
    el.textContent = n + 'x STREAK! 🔥';
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
}

function nextQuestion() {
    currentQ++;
    if (currentQ >= QUESTIONS.length) {
        showResults();
    } else {
        loadQuestion();
    }
}

function showResults() {
    document.getElementById('progressFill').style.width = '100%';
    showScreen('screenResults');

    const correct = history.filter(h => h.correct).length;
    const pct = correct / QUESTIONS.length;

    let grade, tagline, gradeClass;
    if (pct >= 0.9) { grade = 'S'; tagline = 'Perfect! You\'re a true master.'; gradeClass = 'grade-S'; }
    else if (pct >= 0.7) { grade = 'A'; tagline = 'Outstanding performance!'; gradeClass = 'grade-A'; }
    else if (pct >= 0.5) { grade = 'B'; tagline = 'Good job! Keep practicing.'; gradeClass = 'grade-B'; }
    else if (pct >= 0.3) { grade = 'C'; tagline = 'Not bad, but room to grow.'; gradeClass = 'grade-C'; }
    else { grade = 'D'; tagline = 'Keep learning and try again!'; gradeClass = 'grade-D'; }

    document.getElementById('resultsGrade').textContent = grade;
    document.getElementById('resultsGrade').className = 'results-grade ' + gradeClass;
    document.getElementById('resultsTagline').textContent = tagline;
    document.getElementById('rCorrect').textContent = correct + '/10';
    document.getElementById('rScore').textContent = score;
    document.getElementById('rStreak').textContent = bestStreak;

    const list = document.getElementById('reviewList');
    list.innerHTML = '';
    history.forEach((h, i) => {
        const item = document.createElement('div');
        item.className = 'review-item';
        const dot = document.createElement('div');
        dot.className = 'review-dot ' + (h.correct ? 'ok' : 'bad');
        dot.textContent = h.correct ? '✓' : '✗';
        const info = document.createElement('div');
        info.innerHTML = `<div class="review-q">Q${i + 1}: ${h.q}</div>
      <div class="review-a ${h.correct ? 'review-correct' : ''}">
        ${h.correct ? 'Your answer: ' + h.userAns : 'You said: ' + h.userAns + ' — Correct: ' + h.rightAns}
      </div>`;
        item.appendChild(dot);
        item.appendChild(info);
        list.appendChild(item);
    });
}

function restartQuiz() {
    showScreen('screenStart');
}
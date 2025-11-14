// Minimal wiring for TypeRacer controls: Start, Stop, Retry
(function () {
    const btnStart = document.getElementById('btn-start');
    const btnStop = document.getElementById('btn-stop');
    const btnRetry = document.getElementById('btn-retry');
    const typingInput = document.getElementById('typing-input');
    const difficultySelect = document.getElementById('difficulty-select');
    const resultLevel = document.getElementById('result-level');
    const resultTime = document.getElementById('result-time');
    const resultWpm = document.getElementById('result-wpm');
    const btnInstructions = document.getElementById('btn-instructions');
    const sampleText = document.getElementById('sample-text');

    // Predefined samples by difficulty
    const SAMPLES = {
        easy: [
            'The quick brown fox jumps over the lazy dog.',
            'Pack my box with five dozen liquor jugs.',
            'Typing practice helps improve speed and accuracy.'
        ],
        medium: [
            'Practice makes perfect: focus on accuracy before speed when you start.',
            'A good typist develops rhythm and gradually increases words per minute through daily drills.',
            'Keep your fingers on the home row and look at the screen, not your hands.'
        ],
        hard: [
            'Sphinx of black quartz, judge my vow — a pangram that exercises punctuation and unusual letter combos.',
            'When speed and accuracy converge, mastery follows; train deliberately with varied passages and timed drills.',
            'Concentrate on consistent keystrokes, minimize corrections, and measure progress over weeks, not minutes.'
        ]
    };

    let currentSample = '';

    function chooseRandomSample(level) {
        const arr = SAMPLES[level] || SAMPLES.easy;
        const idx = Math.floor(Math.random() * arr.length);
        return arr[idx];
    }

    function setSampleForCurrentDifficulty() {
        const level = difficultySelect.value || 'easy';
        const text = chooseRandomSample(level);
        currentSample = text;
        // display the text
        sampleText.innerHTML = `<p class="mb-0">${text}</p>`;
    }

    let startTime = null;
    let timerId = null;

    function formatTime(seconds) {
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateTimer() {
        if (!startTime) return;
        const secs = (Date.now() - startTime) / 1000;
        resultTime.textContent = formatTime(secs);
    }

    function startTest() {
        // reset
        typingInput.value = '';
        resultWpm.textContent = '-';
        resultTime.textContent = '00:00';
        resultLevel.textContent = difficultySelect.options[difficultySelect.selectedIndex].text;

    // ensure sample text matches selected difficulty (choose randomly on start)
    setSampleForCurrentDifficulty();

    startTime = Date.now();
        timerId = setInterval(updateTimer, 250);
        typingInput.focus();

        btnStart.setAttribute('disabled', '');
        btnStop.removeAttribute('disabled');
        btnRetry.setAttribute('disabled', '');
    }

    function stopTest() {
        if (!startTime) return;
        const elapsed = (Date.now() - startTime) / 1000; // seconds
        clearInterval(timerId);
        timerId = null;

        const chars = typingInput.value.length;
        const minutes = elapsed / 60 || 1/60; // avoid div by zero
        const wpm = Math.round((chars / 5) / minutes);

        resultWpm.textContent = isFinite(wpm) ? wpm : 0;
        resultTime.textContent = formatTime(elapsed);

        startTime = null;
        btnStart.removeAttribute('disabled');
        btnStop.setAttribute('disabled', '');
        btnRetry.removeAttribute('disabled');
    }

    function retryTest() {
        clearInterval(timerId);
        timerId = null;
        startTime = null;
        typingInput.value = '';
        resultWpm.textContent = '-';
        resultTime.textContent = '00:00';
        resultLevel.textContent = '-';

        btnStart.removeAttribute('disabled');
        btnStop.setAttribute('disabled', '');
        btnRetry.setAttribute('disabled', '');
        typingInput.blur();
    }

    function init() {
        // initial button states
        btnStop.setAttribute('disabled', '');
        btnRetry.setAttribute('disabled', '');

        // show an initial sample for the default difficulty
        setSampleForCurrentDifficulty();

        // when difficulty changes, pick a new random sample for the user
        difficultySelect.addEventListener('change', () => {
            setSampleForCurrentDifficulty();
        });

        btnStart.addEventListener('click', startTest);
        btnStop.addEventListener('click', stopTest);
        btnRetry.addEventListener('click', retryTest);

        btnInstructions.addEventListener('click', () => {
            // placeholder - we'll wire a modal later
            alert('Instructions will be added here later.');
        });

        // allow Ctrl+Enter in textarea to stop test
        typingInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                stopTest();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();

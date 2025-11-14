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

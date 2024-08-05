document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const endButton = document.getElementById('endButton');
    const timerDisplay = document.getElementById('timerDisplay');
    const feedbackDisplay = document.getElementById('feedbackDisplay');
    const auftragsnummer = document.getElementById('auftragsnummer');
    const kunde = document.getElementById('kunde');
    const artikelnummer = document.getElementById('artikelnummer');
    const arbeitsgang = document.getElementById('arbeitsgang');
    const mitarbeiternummer = document.getElementById('mitarbeiternummer');
    let startTime;
    let interval;

    function validateForm() {
        let isValid = true;
        if (auftragsnummer.value.trim() === '') {
            document.getElementById('auftragsnummer-feedback').textContent = 'Bitte Auftragsnummer eingeben.';
            isValid = false;
        } else {
            document.getElementById('auftragsnummer-feedback').textContent = '';
        }
        if (kunde.value.trim() === '') {
            document.getElementById('kunde-feedback').textContent = 'Bitte Kunde eingeben.';
            isValid = false;
        } else {
            document.getElementById('kunde-feedback').textContent = '';
        }
        if (artikelnummer.value.trim() === '') {
            document.getElementById('artikelnummer-feedback').textContent = 'Bitte Artikelnummer eingeben.';
            isValid = false;
        } else {
            document.getElementById('artikelnummer-feedback').textContent = '';
        }
        if (arbeitsgang.value.trim() === '') {
            document.getElementById('arbeitsgang-feedback').textContent = 'Bitte Arbeitsgang auswählen.';
            isValid = false;
        } else {
            document.getElementById('arbeitsgang-feedback').textContent = '';
        }
        if (mitarbeiternummer.value.trim() === '') {
            document.getElementById('mitarbeiternummer-feedback').textContent = 'Bitte Mitarbeiterrnummer eingeben.';
            isValid = false;
        } else {
            document.getElementById('mitarbeiternummer-feedback').textContent = '';
        }
        return isValid;
    }

    function startTimer() {
        startTime = new Date();
        interval = setInterval(updateTimer, 1000);
        timerDisplay.textContent = 'Zeiterfassung läuft...';
        startButton.disabled = true;
        endButton.disabled = false;
        feedbackDisplay.textContent = '';
        auftragsnummer.disabled = true;
        kunde.disabled = true;
        artikelnummer.disabled = true;
        arbeitsgang.disabled = true;
        mitarbeiternummer.disabled = true;
    }

    function updateTimer() {
        const currentTime = new Date();
        const elapsedTime = new Date(currentTime - startTime);
        const minutes = elapsedTime.getUTCMinutes();
        const seconds = elapsedTime.getUTCSeconds();
        timerDisplay.textContent = `Laufzeit: ${minutes}m ${seconds}s`;
    }

    function endTimer() {
        clearInterval(interval);
        const endTime = new Date();
        const elapsedTime = new Date(endTime - startTime);
        const minutes = elapsedTime.getUTCMinutes();
        const seconds = elapsedTime.getUTCSeconds();
        timerDisplay.textContent = `Erfasste Zeit: ${minutes}m ${seconds}s`;
        startButton.disabled = false;
        endButton.disabled = true;
        saveLog(startTime, endTime, minutes, seconds);
        auftragsnummer.disabled = false;
        kunde.disabled = false;
        artikelnummer.disabled = false;
        arbeitsgang.disabled = false;
        mitarbeiternummer.disabled = false;
    }

    function saveLog(start, end, minutes, seconds) {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const log = {
            auftragsnummer: auftragsnummer.value,
            kunde: kunde.value,
            artikelnummer: artikelnummer.value,
            arbeitsgang: arbeitsgang.value,
            mitarbeiternummer: mitarbeiternummer.value,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            duration: `${minutes}m ${seconds}s`
        };
        logs.push(log);
        localStorage.setItem('logs', JSON.stringify(logs));
    }

    startButton.addEventListener('click', function () {
        if (validateForm()) {
            startTimer();
        }
    });

    endButton.addEventListener('click', function () {
        endTimer();
    });
});

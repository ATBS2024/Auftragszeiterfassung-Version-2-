document.addEventListener('DOMContentLoaded', function () {
    const logTableBody = document.querySelector('#logTable tbody');
    const exportButton = document.getElementById('exportButton');

    function loadLogs() {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        logTableBody.innerHTML = logs.map((log, index) => `
            <tr>
                <td>${log.auftragsnummer}</td>
                <td>${log.kunde}</td>
                <td>${log.artikelnummer}</td>
                <td>${log.arbeitsgang}</td>
                <td>${log.mitarbeiternummer}</td>
                <td>${new Date(log.startTime).toLocaleString()}</td>
                <td>${new Date(log.endTime).toLocaleString()}</td>
                <td>${log.duration}</td>
                <td><button onclick="deleteLog(${index})">Löschen</button></td>
            </tr>
        `).join('');
    }

    function deleteLog(index) {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        logs.splice(index, 1);
        localStorage.setItem('logs', JSON.stringify(logs));
        loadLogs();
    }

    function exportToExcel() {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Auftragsnummer,Kunde,Artikelnummer,Arbeitsgang,Mitarbeiternummer,Startzeit,Endzeit,Dauer\n";

        logs.forEach(log => {
            const row = [
                log.auftragsnummer,
                log.kunde,
                log.artikelnummer,
                log.arbeitsgang,
                log.mitarbeiternummer,
                new Date(log.startTime).toLocaleString(),
                new Date(log.endTime).toLocaleString(),
                log.duration
            ].join(",");
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "zeiterfassungsprotokoll.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    exportButton.addEventListener('click', exportToExcel);
    loadLogs();
});

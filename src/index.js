let holidayCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch(`https://www.gov.uk/bank-holidays.json`)
    .then(resp => resp.json())
    .then(data => {
        const holidays = data['england-and-wales'].events;

        function updateHolidayInfo() {
            const holiday = holidays[holidayCounter];
            document.getElementById('holiday').textContent = `Holiday: ${holiday.title}`;
            document.getElementById('date').textContent = `Date: ${holiday.date}`;
            document.getElementById('buntingStatus').textContent = `Bunting Status: ${holiday.bunting ? 'Yes' : 'No'}`;
            document.getElementById('notes').textContent = `Notes: ${holiday.notes}`;
        }

        updateHolidayInfo();

        const nextButton = document.getElementById('nextHoliday');
        nextButton.addEventListener('click', () => {
            holidayCounter++;
            if (holidayCounter >= holidays.length) {
                holidayCounter = holidays.length - 1;
            }
            updateHolidayInfo();
        });

        const prevButton = document.getElementById('previousHoliday');
        prevButton.addEventListener('click', () => {
            holidayCounter--;
            if (holidayCounter < 0) {
                holidayCounter = 0;
            }
            updateHolidayInfo();
        });
    })

            .catch(error => {
        console.error('Fetch error:', error);
    });
});
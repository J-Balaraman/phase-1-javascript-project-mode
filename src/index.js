document.addEventListener('DOMContentLoaded', () => {
    const holidayElement = document.getElementById('holiday');
    const dateElement = document.getElementById('date');
    const buntingStatusElement = document.getElementById('buntingStatus');
    const notesElement = document.getElementById('notes');
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('comments');
    const commentSection = document.getElementById('commentSection');

    let holidays;
    let holidayCounter = 0;

    function updateHolidayInfo(holidayIndex) {
        const holiday = holidays[holidayIndex];
        holidayElement.textContent = `Holiday: ${holiday.title}`;
        dateElement.textContent = `Date: ${holiday.date}`;
        buntingStatusElement.textContent = `Bunting Status: ${holiday.bunting ? 'Yes' : 'No'}`;
        notesElement.textContent = `Notes: ${holiday.notes}`;
    }

    function updateCurrentHoliday() {
        updateHolidayInfo(holidayCounter);
    }

    const nextButton = document.getElementById('nextHoliday');
    nextButton.addEventListener('click', () => {
        holidayCounter++;
        if (holidayCounter >= holidays.length) {
            holidayCounter = holidays.length - 1;
        }
        updateCurrentHoliday();
    });

    const prevButton = document.getElementById('previousHoliday');
    prevButton.addEventListener('click', () => {
        holidayCounter--;
        if (holidayCounter < 0) {
            holidayCounter = 0;
        }
        updateCurrentHoliday();
    });

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = commentInput.value.trim();

        if (commentText !== '') {
            const currentHoliday = holidayElement.textContent;
            const currentDate = dateElement.textContent;
            const comment = `${currentHoliday}, ${currentDate} --- Comment: ${commentText}`;

            const commentElement = document.createElement('div');
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);

            commentInput.value = '';
        }
    });

    fetch(`https://www.gov.uk/bank-holidays.json`)
        .then(resp => resp.json())
        .then(data => {
            holidays = data['england-and-wales'].events;
            updateCurrentHoliday();

            holidays.forEach((holiday, index) => {
                console.log(`Holiday ${index + 1}: ${holiday.title}`);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

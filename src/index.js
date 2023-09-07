document.addEventListener('DOMContentLoaded', () => {
    //Some of the DOM Elements' definitions
    const holidayElement = document.getElementById('holiday');
    const dateElement = document.getElementById('date');
    const buntingStatusElement = document.getElementById('buntingStatus');
    const notesElement = document.getElementById('notes');
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('comments');
    const commentSection = document.getElementById('commentSection');

    let holidays;
    let holidayCounter = 0;

    //Updates the holiday info
    function updateHolidayInfo(holidayIndex) {
        const holiday = holidays[holidayIndex];
        holidayElement.textContent = `Holiday: ${holiday.title}`;
        dateElement.textContent = `Date: ${holiday.date}`;
        buntingStatusElement.textContent = `Bunting Display: ${holiday.bunting ? 'Yes' : 'No'}`;
        notesElement.textContent = `Notes: ${holiday.notes}`;
    }

    //Calls the function above, uses the holidayCounter variable
    function updateCurrentHoliday() {
        updateHolidayInfo(holidayCounter);
    }

    //Forward and back buttons code for updating the holiday card
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

    //functionality for the comment section feature, code for the submit button
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

    //grabs the data from the API
    fetch(`https://www.gov.uk/bank-holidays.json`)
    .then(resp => resp.json())
    .then(data => {
        holidays = data['england-and-wales'].events;
        updateCurrentHoliday();

        //displays list of the holidays below the comment section
        const allHolidaysList = document.getElementById('allHolidaysList');
        holidays.forEach((holiday, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Holiday ${index + 1}: ${holiday.title}`;
            listItem.classList.add('holiday-list-item');
            allHolidaysList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
});
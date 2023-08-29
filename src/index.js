document.addEventListener('DOMContentLoaded', () => {
    fetch(`https://www.gov.uk/bank-holidays.json`)
    .then(resp => resp.json())
    .then((data) => {
        const holiday = data['england-and-wales'].events[0];

        const currentHolidayList = document.getElementById('current-holiday');

        const holidayListItem = document.createElement('li');
        holidayListItem.textContent = `Holiday: ${holiday.title}`;
        holidayListItem.id = `holiday`

        const dateListItem = document.createElement('li');
        dateListItem.textContent = `Date: ${holiday.date}`;
        dateListItem.id = `date`

        const buntingStatusListItem = document.createElement('li');
        buntingStatusListItem.textContent = `Bunting Status: ${holiday.bunting ? 'Yes' : 'No'}`;
        buntingStatusListItem.id = `buntingStatus`

        const notesListItem = document.createElement('li');
        notesListItem.textContent = `Notes: ${holiday.notes}`;
        notesListItem.id = `notes`

        currentHolidayList.appendChild(holidayListItem);
        currentHolidayList.appendChild(dateListItem);
        currentHolidayList.appendChild(buntingStatusListItem);
        currentHolidayList.appendChild(notesListItem);
    });
});

//button.addEventListener('click', update the card)

//submitButton.addEventListener('submit', add a new comment in the seperate comments section)
/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

const fullDayRate = 35;
const halfDayRate = 20;

let selectedDays = [];
let currentRate = fullDayRate;


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

const days = document.querySelectorAll('.day-selector li');
const fullButton = document.getElementById('full');
const halfButton = document.getElementById('half'); 
const clearButton = document.getElementById('clear-button');
const calculatedCostElement = document.getElementById('calculated-cost');
const weeklyCostText = document.querySelector('.large-text')

function handleDaySelection(event)
{
    const clickedDay = event.target;

    if (!selectedDays.includes(clickedDay.id))
    {
        selectedDays.push(clickedDay.id);
        clickedDay.style.backgroundColor = '#E5AF42';
    }
    else
    {
        const index = selectedDays.indexOf(clickedDay.id);
        selectedDays.splice(index, 1);
        clickedDay.style.backgroundColor = '';
    }
    calculateCost();
}


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

function clearDays()
{
    selectedDays.forEach((dayId) =>
    {
        const element = document.getElementById(dayId);
        element.style.backgroundColor = ''
    });
    selectedDays = [];
    calculateCost();
}



/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

function handleRateChange(isFullDay)
{
    if (isFullDay)
    {
        currentRate = fullDayRate;
        fullButton.classList.add('clicked')
        halfButton.classList.remove('clicked')
    } 

    else 
    {
        currentRate = halfDayRate;
        halfButton.classList.add('clicked');
        fullButton.classList.remove('clicked');
    }

    calculateCost();

}


/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateCost()
{
    const totalCost = selectedDays.length * currentRate;
    calculatedCostElement.textContent = totalCost.toFixed(2);
    weeklyCostText.textContent = `My weekly cost will be $${totalCost}.`;

}

days.forEach((day) =>
{
    day.addEventListener('click', handleDaySelection);
});

fullButton.addEventListener('click', () => handleRateChange(true));
halfButton.addEventListener('click', () => handleRateChange(false));
clearButton.addEventListener('click', clearDays);
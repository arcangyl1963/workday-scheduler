// Create an object with keys and empty values for wdObject
let wdObject = {
    '9 AM': '',
    '10 AM': '',
    '11 AM': '',
    '12 PM': '',
    '1 PM': '',
    '2 PM': '',
    '3 PM': '',
    '4 PM': '',
    '5 PM': '',
    '6 PM': '',
    '7 PM': '',
    '8 PM': '',
  };
  // Immediately update the shedule tasks with any new data
  $(document).ready(function() {
      if(!localStorage.getItem('wdObject')) {
          updateCalendarTasks(wdObject);
      } else {
          updateCalendarTasks(JSON.parse(localStorage.getItem('wdObject')));
      }
  })
  // Set the current date string and define its displayformat

  $('#currentDay').text(moment().format('dddd') + ', ' + moment().format('MMMM Do YYYY, h:mm a'));

  // Set the text block background colors according past, current and future time states
  let count = 1;
  for (const myItems in wdObject) {
    let eventText = '#event-text-' + count;
    $(eventText).text(wdObject[myItems]);
    let timeID = '#time-' + count;
    let currentHour = moment().hour();
    let timeText = $(timeID).text();
    let timeNum = getHourFromTxt(timeText);
    if (timeNum < currentHour) {
      $(eventText).addClass('prev-hour');
    } else if (timeNum > currentHour) {
      $(eventText).addClass('future-hour');
    } else {
      $(eventText).addClass('current-hour');
    }
    if (currentHour >= 18) {
      $("body").addClass("dark-mode");
    } else {
      $("body").addClass("light-mode");
    }
    count++;
  }
  // Load the text entered by a user and the corresponding hour text into variables for the save function
  $('button').click(function() {
      theVal = $(this).siblings('textarea').val();
      hrText = $(this).siblings('div').text();

      saveTheSchedule(hrText, theVal);
  });
  // Convert the hour text into an integer
  function getHourFromTxt(timeText) {
      switch(timeText) {
          case '9 AM': return 9;
          case '10 AM': return 10;
          case '11 AM': return 11;
          case '12 PM': return 12;
          case '1 PM': return 13;
          case '2 PM': return 14;
          case '3 PM': return 15;
          case '4 PM': return 16;
          case '5 PM': return 17;
          case '6 PM': return 18;
          case '7 PM': return 19; 
          case '8 PM': return 20; 
      }
  }
  // Retrieve the object data from local storage
  function retrieveData() {
      result = localStorage.getItem('wdObject')
      return (result ? result : wdObject);
  }
  // Save entered data to local storage as text
  function stringifywdObject() {
      localStorage.setItem('wdObject', JSON.stringify(wdObject));
  };

  function savetoLS(dayObject) {
      localStorage.setItem('wdObject', JSON.stringify(dayObject));
  }

  function saveTheSchedule(hrText, val) {
      if(!localStorage.getItem('wdObject')) {
          stringifywdObject();
      }

      let workHours = JSON.parse(localStorage.getItem('wdObject'));
      workHours[hrText] = val
      savetoLS(workHours);
  }
// Update the calendar elements with saved task data from local storage 
  function updateCalendarTasks(dayObject) {
      $('.calendar-row').each(function(index) {
         let calRow = $(this).children('div');
         $(this).children('textarea').text(dayObject[calRow.text()]);
      })

  }
// Refresh the page every 1 minute to update currentDay time and invoke the dark / light mode switch
$(document).ready(function() {
    setInterval('refreshPage()', 60000);
});

function refreshPage() { 
    location.reload(); 
}  
// const moment = require("moment");

let workDay = {
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

  $(document).ready(function() {
      if(!localStorage.getItem('workDay')) {
          updateCalendarTasks(workDay);
      } else {
          updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
      }
  })

  $('#currentDay').text(moment().format('dddd') + ', ' + moment().format('MMMM Do YYYY, h:mm:ss a'));

  let count = 1;
  for ( const property in workDay ) {
      let eventText = '#event-text-' + count;
      $(eventText).text(workDay[property]);
      let timeID = '#time-' + count;
      let currentHour = moment().hour();
      let timeText = $(timeID).text();
      let timeNum = getHourFromTxt(timeText);
      if(timeNum < currentHour) {
          $(eventText).addClass('prev-hour');
      } else if (timeNum > currentHour) {
          $(eventText).addClass('future-hour');
      }else {
          $(eventText).addClass('current-hour');
      }
      count++
  }

  $('button').click(function() {
      theVal = $(this).siblings('textarea').val();
      hrText = $(this).siblings('div').text();

      saveSchedule(hrText, theVal);
  });

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

  function loadDataset() {
      result = localStorage.getItem('workDay')
      return (result ? result : workDay);
  }

  function stringifyworkDay() {
      localStorage.setItem('workDay', JSON.stringify(workDay));
  };

  function savetoLS(dayObject) {
      localStorage.setItem('workDay', JSON.stringify(dayObject));
  }

  function saveSchedule(hrText, val) {
      if(!localStorage.getItem('workDay')) {
          stringifyworkDay();
      }

      let workHours = JSON.parse(localStorage.getItem('workDay'));
      workHours[hrText] = val
      savetoLS(workHours);
  }

  function updateCalendarTasks(dayObject) {
      $('.calendar-row').each(function(index) {
         let calRow = $(this).children('div');
         $(this).children('textarea').text(dayObject[calRow.text()]);
      })
  }
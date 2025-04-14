
function dateFormatter(dateObj) {
  
  const dateParse = new Date(dateObj);

  const dateOptions = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit'
  }
   
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  let dateString = dateParse.toLocaleDateString('en-GB', dateOptions);
  let timeString = dateParse.toLocaleTimeString('en-US', timeOptions);

  const fmtr = `${dateString} ${timeString}`
  return fmtr
}


export { dateFormatter }
export function convertTo12HourFormat(time) {
  // Extract hours and minutes from the input
  let [hours, minutes] = time.split(':');

  // Convert hours to a number
  hours = parseInt(hours);

  // Determine AM or PM suffix
  let suffix = hours >= 12 ? 'PM' : 'AM';

  // Adjust hours for 12-hour format
  hours = hours % 12 || 12;

  // Return the formatted time with hours, minutes, and AM/PM
  return `${hours}:${minutes} ${suffix}`;
}

export function convertISOTo12HourFormat(isoTime) {
    // Create a Date object from the ISO string
    let date = new Date(isoTime);
    
    // Extract hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    // Determine AM or PM suffix
    let suffix = hours >= 12 ? "PM" : "AM";
    
    // Adjust hours for 12-hour format
    hours = hours % 12 || 12;
    
    // Pad minutes with leading zeros if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    // Extract the date components (year, month, day)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    let day = date.getDate().toString().padStart(2, '0');
    
    // Return the formatted date and time
    return `${year}-${month}-${day} ${hours}:${minutes} ${suffix}`;
}

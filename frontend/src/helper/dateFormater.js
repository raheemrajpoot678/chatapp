// Original ISO timestamp

export function dateFormat(dataStr) {
  // Convert to Date object
  const messageDate = new Date(dataStr);
  const currentDate = new Date(); // Current date for comparison

  // Helper function to format time in 12-hour format
  function formatTime(date) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  }

  // Helper function to check if two dates are on the same day
  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  // Calculate if the message is from today, yesterday, or earlier
  let formattedDate = "";
  if (isSameDay(messageDate, currentDate)) {
    formattedDate = formatTime(messageDate); // Only show the time for today
  } else {
    // Create a date object for yesterday
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);

    if (isSameDay(messageDate, yesterday)) {
      formattedDate = `Yesterday`; // Only show 'Yesterday'
    } else {
      // If it's older than yesterday, show the full date without time
      formattedDate = messageDate.toLocaleDateString("en-GB"); // DD/MM/YYYY format for older messages
    }
  }

  return formattedDate;
}

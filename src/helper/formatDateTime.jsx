const formatDateTime = (dateTimeString) => {
    const messageDate = new Date(dateTimeString);
    const now = new Date();
    
    // Today
    if (isToday(messageDate)) {
      return 'Today';
    }
    
    // Yesterday
    if (isYesterday(messageDate)) {
      return 'Yesterday';
    }
    
    // Other Dates
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return messageDate.toLocaleDateString('en-US', options);
  };
  
  const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
  };
  
  const isYesterday = (someDate) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return someDate.getDate() === yesterday.getDate() &&
           someDate.getMonth() === yesterday.getMonth() &&
           someDate.getFullYear() === yesterday.getFullYear();
  };
  
  export default formatDateTime;
  
const formatTimeForActivityLog = (dateObj) => {
    return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
}

module.exports = formatTimeForActivityLog;
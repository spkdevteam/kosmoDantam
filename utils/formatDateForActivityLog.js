const formatDateForActivityLog = (dateObj) => {
    const dateSeparatedBySlash = dateObj.toLocaleDateString();
    const date = dateSeparatedBySlash.split("/")[0];
    const month = dateSeparatedBySlash.split("/")[1];
    const year = dateSeparatedBySlash.split("/")[2];
    return `${date}/${month < 10 ? `0${month}` : month}/${year}`;
}

module.exports = formatDateForActivityLog;
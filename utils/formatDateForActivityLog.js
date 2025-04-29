const formatDateForActivityLog = (dateObj) => {
    const dateSeparatedBySlash = dateObj.toLocaleDateString();
    const date = dateSeparatedBySlash.split("/")[1];
    const month = dateSeparatedBySlash.split("/")[0];
    const year = dateSeparatedBySlash.split("/")[2];
    return `${date}/${month}/${year}`;
}

module.exports = formatDateForActivityLog;
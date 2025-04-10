function formatDate(date) {
    return new Date(date).toISOString().split('T')[0];
}

function formatTitle(title) {
    return title.length > 20 ? title.slice(0, 20) + '...' : title;
}

module.exports = { formatDate, formatTitle };
function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
}

function formatTitle(title) {
    return title.length > 20 ? title.slice(0, 20) + '...' : title;
}

module.exports = { formatDate, formatTitle };
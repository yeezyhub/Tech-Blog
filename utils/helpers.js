//Date function to be used on posts
function formatDate(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    date
  ).getFullYear()}`;
}

module.exports = {
  formatDate
}
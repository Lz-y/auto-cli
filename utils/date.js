function formatTime (time) {
  return time < 10 ? `0${time}` : time
}

module.exports = function getDate (format = '-') {
  const date = new Date()
  const year = date.getFullYear()
  const month = formatTime(date.getMonth() + 1)
  const day = formatTime(date.getDate())
  const hours = formatTime(date.getHours())
  const minutes = formatTime(date.getMinutes())
  const seconds = formatTime(date.getSeconds())
  return `${year}${format}${month}${format}${day} ${hours}:${minutes}:${seconds}`
}
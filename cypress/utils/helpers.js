// eslint-disable-next-line import/prefer-default-export
export const getDateInFormat = key => {
  const date = new Date()

  date.setDate(date.getDate() + key)

  const pubDate = date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  })

  return pubDate
}

const metadataValues = require('./metadataValues')
const resourcesData = require('./resourcesData')

const flatten = () => {
  const result = {}

  const extractLabelValuePairs = item => {
    if (!item || typeof item !== 'object') return
    const { label, value, ...rest } = item
    if (label && value) result[value] = label

    Object.keys(rest).forEach(r => {
      if (Array.isArray(item[r])) {
        item[r].forEach(i => {
          extractLabelValuePairs(i)
        })
      } else {
        extractLabelValuePairs(item[r])
      }
    })
  }

  extractLabelValuePairs(metadataValues)

  resourcesData.forEach(o => {
    const { label, value } = o
    if (label && value) result[value] = label
  })

  return result
}

module.exports = flatten

const metadataValues = require('./metadataValues')
const { getResources } = require('./resources.controllers')

const flatten = async () => {
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

  const resourcesData = await getResources()

  resourcesData.result.forEach(o => {
    const { label, id } = o
    if (label && id) result[id] = label
  })

  return result
}

module.exports = flatten

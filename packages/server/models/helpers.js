/* eslint-disable import/prefer-default-export */

const { cloneDeep } = require('lodash')

// TO DO -- move to cokoapps
const applyListQueryOptions = async (query, options = {}) => {
  let q = cloneDeep(query)
  const { orderBy, ascending, page, pageSize, related } = options

  let ascendingValue
  if (ascending === true) ascendingValue = 'asc'
  if (ascending === false) ascendingValue = 'desc'
  if (orderBy) q = q.orderBy(orderBy, ascendingValue)

  if (
    (Number.isInteger(page) && !Number.isInteger(pageSize)) ||
    (!Number.isInteger(page) && Number.isInteger(pageSize))
  ) {
    throw new Error(
      'both page and pageSize integers needed for paginated results',
    )
  }

  if (Number.isInteger(page) && Number.isInteger(pageSize)) {
    if (page < 0) {
      throw new Error(
        'invalid index for page (page should be an integer and greater than or equal to 0)',
      )
    }

    if (pageSize <= 0) {
      throw new Error(
        'invalid size for pageSize (pageSize should be an integer and greater than 0)',
      )
    }

    q = q.page(page, pageSize)
  }

  if (related) {
    q = q.withGraphFetched(related)
  }

  // q.debug()

  const result = await q
  const { results, total } = result

  return {
    result: page !== undefined ? results : result,
    totalCount: total !== undefined ? total : result.length,
  }
}

module.exports = {
  applyListQueryOptions,
}

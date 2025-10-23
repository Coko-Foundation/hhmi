const { logger } = require('@coko/server')

const {
  getMetadata,
  getMetadataOptimized,
} = require('../courseMetadata.controller')

describe('Metadata Controller', () => {
  test("retrieve all courses' from the db", async () => {
    global.structuredClone = val => {
      return JSON.parse(JSON.stringify(val))
    }

    const startTime = performance.now()
    await getMetadata()
    const endTime = performance.now()
    const startTime2 = performance.now()
    await getMetadataOptimized()
    const endTime2 = performance.now()

    logger.info(`Call to getMetadata took ${endTime - startTime} milliseconds`)
    logger.info(
      `Call to getMetadataOptimized took ${endTime2 - startTime2} milliseconds`,
    )
    expect(endTime2 - startTime2).toBeLessThanOrEqual(endTime - startTime)
  })
})

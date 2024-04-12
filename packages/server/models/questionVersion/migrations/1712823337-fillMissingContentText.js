const { logger, useTransaction } = require('@coko/server')

const extractDocumentText = data => {
  let allContent = ''

  const extract = obj => {
    const { content } = obj
    if (!Array.isArray(content)) return

    content.forEach(item => {
      const { text, content: itemContent } = item

      if (text) allContent += `${text} `
      if (itemContent) extract(item)
    })
  }

  extract(data)
  return allContent
}

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      const problematicQuestionVersions = await knex('question_versions')
        .transacting(trx)
        .whereNull('content_text')
        .where('submitted', true)

      await Promise.all(
        problematicQuestionVersions.map(async qv => {
          await knex('question_versions')
            .transacting(trx)
            .where('id', qv.id)
            .update({
              contentText: extractDocumentText(qv.content),
            })
        }),
      )
    })
  } catch (e) {
    logger.error(
      'Question Version: migration filling up missing content_text for table question_versions failed!',
    )
    throw new Error(e)
  }
}

// exports.down = knex =>
//   knex.schema.table('question_versions', table => {
//     table.dropColumn('unpublished')
//   })

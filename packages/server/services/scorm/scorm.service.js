const fs = require('fs')
const xml = require('xml')
const archiver = require('archiver')
const path = require('path')

const metadataResolver = require('../../controllers/metadataHandler')
const { getResources } = require('../../controllers/resources.controllers')

class WaxToScormConverter {
  #correctAnswers = []
  #questionIds = []

  #questionVersion = {}
  #organizationTitle = ''
  #courseTitle = ''

  #baseMessage = ''

  doc = []

  constructor(questionVersion, imageData, options = {}) {
    this.#baseMessage = 'WaxToScormConverter:'
    if (!questionVersion || !questionVersion.content)
      this.#error(`No document provided`)

    if (!questionVersion.content.type === 'doc')
      this.#error(`Document provided is not of type "doc"`)

    if (!questionVersion.content.content)
      this.#error(`Document provided has no children`)

    if (!Array.isArray(questionVersion.content.content))
      this.#error(`Document content is not an array`)

    this.#questionVersion = questionVersion
    this.doc = questionVersion.content
  }

  #error = e => {
    throw new Error(`${this.#baseMessage} ${e}`)
  }

  #essayAnswerHandler = container => {
    const answerContent = container.content.filter(
      contentItem => contentItem.type === 'essay_answer',
    )

    const answerId = { content: answerContent[0].attrs.id, correct: true }

    this.#questionIds.push(container.attrs.id)

    this.#correctAnswers.push({
      containerId: container.attrs.id,
      answers: [answerId],
      containerType: 'essay',
      answerType: 'single',
    })
  }

  #metadataHandler = async () => {
    const metadata = metadataResolver()
    const metadataContent = {}

    const recommendedOptions = metadata.questionTypes.find(
      q => q.label === 'Recommended',
    ).options

    const formativeOptions = metadata.questionTypes.find(
      q => q.label === 'Formative only',
    ).options

    if (
      recommendedOptions.some(
        options => options.value === this.#questionVersion.questionType,
      )
    ) {
      metadataContent.questionType = recommendedOptions.find(q => {
        return q.value === this.#questionVersion.questionType
      }).label
    } else {
      metadataContent.questionType = formativeOptions.find(q => {
        return q.value === this.#questionVersion.questionType
      }).label
    }

    const topics = this.#questionVersion.topics.map(
      selectedTopic => selectedTopic.topic,
    )

    const selectedTopics = metadata.topics.filter(t => topics.includes(t.value))

    metadataContent.topics = selectedTopics.map(selectedTopic => {
      const subtopicValue = this.#questionVersion.topics.find(
        t => t.topic === selectedTopic.value,
      ).subtopic

      const topic = selectedTopic.label

      const subtopic = selectedTopic.subtopics.find(
        s => s.value === subtopicValue,
      ).label

      return {
        topic,
        subtopic,
      }
    })

    const courses = this.#questionVersion.courses.map(courseItem => {
      const ret = {}

      const courseMetadata = metadata.frameworks.find(
        f => f.value === courseItem.course,
      )

      ret.course = courseMetadata.label

      if (
        courseItem.course === 'apBiology' ||
        courseItem.course === 'apEnvironmentalScience'
      ) {
        ret.units = courseItem.units.map(u => {
          return {
            'Course Unit': courseMetadata.units.find(cu => cu.value === u.unit)
              .label,
            'Course Topic': courseMetadata.topics.find(
              t => t.value === u.courseTopic,
            ).label,
            'Learning Objective': courseMetadata.learningObjectives.find(
              l => l.value === u.learningObjective,
            ).label,
            'Essential Knowledge': courseMetadata.essentialKnowledge.find(
              e => e.value === u.essentialKnowledge,
            ).label,
          }
        })
      } else if (
        courseItem.course === 'biBiology' ||
        courseItem.course === 'biEnvironmentalScience'
      ) {
        ret.units = courseItem.units.map(u => {
          return {
            'Course Unit': courseMetadata.units.find(cu => cu.value === u.unit)
              .label,
            'Course Topic': courseMetadata.topics.find(
              t => t.value === u.courseTopic,
            ).label,
            Application: courseMetadata.applications.find(
              a => a.value === u.application,
            ).label,
            Skill: u.skill
              ? courseMetadata.skills.find(s => s.value === u.skill).label
              : '',
            Understanding: courseMetadata.understandings.find(
              n => n.value === u.understanding,
            ).label,
          }
        })
      }

      return ret
    })

    metadataContent.courses = courses

    metadataContent.keywords = this.#questionVersion.keywords

    const resources = await getResources()

    const selectedBiointeractiveResources = resources.result.filter(resource =>
      this.#questionVersion.biointeractiveResources.includes(resource.value),
    )

    metadataContent.biointeractiveResources =
      selectedBiointeractiveResources.map(r => r.label)

    const cognitiveOrderText = this.#questionVersion.cognitiveLevel.includes(
      'higher',
    )
      ? 'Higher-order'
      : 'Lower-order'

    const cognitiveOrder = metadata.blooms.cognitive.find(
      c => c.label === cognitiveOrderText,
    )

    const cognitiveLevel = cognitiveOrder.options.find(
      o => o.value === this.#questionVersion.cognitiveLevel,
    ).label

    metadataContent.cognitiveLevel = `${cognitiveOrderText}: ${cognitiveLevel}`

    const affectiveLevel = metadata.blooms.affective.find(
      a => a.value === this.#questionVersion.affectiveLevel,
    )

    metadataContent.affectiveLevel = affectiveLevel ? affectiveLevel.label : ''

    const psychomotorLevel = metadata.blooms.psychomotor.find(
      p => p.value === this.#questionVersion.psychomotorLevel,
    )

    metadataContent.psychomotorLevel = psychomotorLevel
      ? psychomotorLevel.label
      : ''

    return metadataContent
  }

  /* eslint-disable-next-line class-methods-use-this */
  #buildManifest = manifestDetails => {
    const jsonManifest = {
      manifest: [
        {
          _attr: {
            identifier: manifestDetails.manifestIdentifier,
            version: manifestDetails.manifestVersion,
          },
        },
        {
          metadata: [
            { schema: 'ADL SCORM' },
            { schemaversion: '1.2' },
            { 'adlcp:location': 'metadata_course.xml' },
          ],
        },
        {
          organizations: [
            {
              _attr: {
                default: manifestDetails.organizationIdentifier,
              },
            },
            {
              organization: [
                {
                  _attr: {
                    identifier: manifestDetails.organizationIdentifier,
                  },
                },
                { title: manifestDetails.organizationTitle },
                {
                  item: [
                    {
                      _attr: {
                        identifier: manifestDetails.itemIdentifier,
                        identifierref: manifestDetails.resourceIdentifier,
                      },
                    },
                    { title: manifestDetails.itemTitle },
                  ],
                },
              ],
            },
          ],
        },
        {
          resources: [
            {
              resource: [
                {
                  _attr: {
                    identifier: manifestDetails.resourceIdentifier,
                    type: 'webcontent',
                    'adlcp:scormtype': 'sco',
                    href: `content/${manifestDetails.resourceIdentifier}.html`,
                  },
                },
                {
                  file: {
                    _attr: {
                      href: `content/${manifestDetails.resourceIdentifier}.html`,
                    },
                  },
                },
                {
                  file: {
                    _attr: {
                      href: `content/index.js`,
                    },
                  },
                },
                {
                  file: {
                    _attr: {
                      href: `content/scorm_api.js`,
                    },
                  },
                },
                {
                  file: {
                    _attr: {
                      href: `content/style.css`,
                    },
                  },
                },
                {
                  file: {
                    _attr: {
                      href: 'content/doc.json',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    }

    // push files to resource
    // eslint-disable-next-line array-callback-return
    manifestDetails.resourceFileNames.map(fileName => {
      jsonManifest.manifest[3].resources[0].resource.push({
        file: {
          _attr: {
            href: `content/${fileName}`,
          },
        },
      })
    })

    const xmlManifest = xml(jsonManifest, { declaration: true, indent: '  ' })

    return xmlManifest
  }

  #buildMetadata = () => {
    const metadata = this.#metadataHandler()

    const courseTopics = metadata.topics.map(t => t.topic)
    const courseTitles = metadata.courses.map(c => c.course)
    this.#organizationTitle = courseTopics.join(' & ')
    this.#courseTitle = courseTitles.join(' & ')

    const jsonMetadata = {
      lom: [
        {
          general: [
            {
              identifier: [
                { catalog: 'ID' },
                { entry: this.#questionVersion.questionId },
              ],
            },
            {
              identifier: [
                { catalog: 'Question Type' },
                { entry: metadata.questionType },
              ],
            },
            {
              title: [
                {
                  string: [
                    {
                      _attr: {
                        language: 'en-US',
                      },
                    },
                    this.#organizationTitle,
                  ],
                },
              ],
            },
            { language: 'en' },
          ],
        },
        {
          technical: [
            { format: 'text/html' },
            { format: 'text/css' },
            { format: 'application/x-javascript' },
            { format: 'image/jpeg' },
            { format: 'image/png' },
            { location: '.' },
          ],
        },
      ],
    }

    metadata.topics.forEach((topic, index, topics) => {
      jsonMetadata.lom[0].general.push({
        identifier: [
          { catalog: `Topic ${topics.length > 1 ? index + 1 : ''}` },
          { entry: topic.topic },
        ],
      })
      jsonMetadata.lom[0].general.push({
        identifier: [
          { catalog: `Subtopic ${topics.length > 1 ? index + 1 : ''}` },
          { entry: topic.subtopic },
        ],
      })
    })

    metadata.courses.forEach((course, index, courses) => {
      jsonMetadata.lom[0].general.push({
        identifier: [
          { catalog: `Course ${courses.length > 1 ? index + 1 : ''}` },
          { entry: course.course },
        ],
      })

      course.units.forEach(unitItem => {
        Object.keys(unitItem).forEach(key => {
          jsonMetadata.lom[0].general.push({
            identifier: [{ catalog: key }, { entry: unitItem[key] }],
          })
        })
      })
    })

    metadata.keywords.forEach(key => {
      jsonMetadata.lom[0].general.push({
        keyword: [
          {
            string: [
              {
                _attr: {
                  language: 'en-US',
                },
              },
              key,
            ],
          },
        ],
      })
    })

    metadata.biointeractiveResources.forEach(bi => {
      jsonMetadata.lom[0].general.push({
        identifier: [{ catalog: 'Biointeractive Resource' }, { catalog: bi }],
      })
    })

    jsonMetadata.lom[0].general.push({
      identifier: [
        { catalog: 'Cognitive Level' },
        { entry: metadata.cognitiveLevel },
      ],
    })

    metadata.affectiveLevel !== '' &&
      jsonMetadata.lom[0].general.push({
        identifier: [
          { catalog: 'Affective Level' },
          { entry: metadata.affectiveLevel },
        ],
      })

    metadata.psychomotorLevel !== '' &&
      jsonMetadata.lom[0].general.push({
        identifier: [
          { catalog: 'Psychomotor Level' },
          { entry: metadata.psychomotorLevel },
        ],
      })

    const xmlMetadata = xml(jsonMetadata, { declaration: true, indent: '  ' })

    return xmlMetadata
  }

  buildScormExport = async () => {
    const id = this.#questionVersion.questionId

    const xmlMetadata = this.#buildMetadata()

    const manifestOptions = {
      manifestIdentifier: `foundation.coko.hhmi.${id}`,
      manifestVersion: '1',

      organizationIdentifier: `organization_${
        this.#questionVersion.questionId
      }`,
      organizationTitle: this.#organizationTitle,
      itemIdentifier: `item_${this.#questionVersion.id}`,
      itemTitle: this.#courseTitle,

      resourceIdentifier: this.#questionVersion.questionId,
      resourceFileNames: [],
    }

    const xmlManifest = this.#buildManifest(manifestOptions)

    const dir = path.join(__dirname, '..', '..', 'tmp', id)
    const mainPageFile = path.join(__dirname, 'helpers', 'mainPage.html')
    const stylesheet = path.join(__dirname, 'helpers', 'style.css')
    const scormAPI = path.join(__dirname, 'helpers', 'scormApi.js')
    const indexJs = path.join(__dirname, 'helpers', 'index.js')

    try {
      fs.mkdirSync(`${dir}/content/`, { recursive: true })

      fs.writeFileSync(`${dir}/imsmanifest.xml`, xmlManifest, 'utf-8')
      fs.writeFileSync(`${dir}/metadata_course.xml`, xmlMetadata, 'utf-8')

      fs.writeFileSync(
        `${dir}/content/doc.json`,
        JSON.stringify(this.doc.content),
        'utf-8',
      )

      fs.copyFileSync(mainPageFile, `${dir}/content/${id}.html`)
      fs.copyFileSync(stylesheet, `${dir}/content/style.css`)
      fs.copyFileSync(scormAPI, `${dir}/content/scorm_api.js`)
      fs.copyFileSync(indexJs, `${dir}/content/index.js`)

      const output = fs.createWriteStream(`${dir}.zip`)
      const archive = archiver('zip', { zlib: { level: 9 } })

      output.on('close', () => {})
      output.on('error', e => {
        throw e
      })

      archive.pipe(output)
      archive.directory(dir, false)
      await archive.finalize()

      fs.rmdirSync(dir, { recursive: true, force: true })
    } catch (e) {
      console.error(e)
    }

    return `${id}.zip`
  }
}

module.exports = WaxToScormConverter

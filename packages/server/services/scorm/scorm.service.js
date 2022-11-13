const fs = require('fs')
// const imageSize = require('image-size')
const xml = require('xml')
const archiver = require('archiver')
const path = require('path')

const buildIndex = require('./helpers/buildIndex')
const metadataResolver = require('../../controllers/metadataHandler')
const resources = require('../../controllers/resourcesData')

const answerTypes = [
  'true_false',
  'multiple_choice',
  'true_false_single_correct',
  'multiple_choice_single_correct',
]

const answerContainers = [
  'true_false_container',
  'multiple_choice_container',
  'true_false_single_correct_container',
  'multiple_choice_single_correct_container',
  'fill_the_gap_container',
  'multiple_drop_down_container',
  'matching_container',
  'essay_container',
]

class WaxToScormConverter {
  #correctAnswers = []
  #feedback = []
  #questionIds = []

  #questionVersion = {}
  #organizationTitle = ''
  #courseTitle = ''

  #baseMessage = ''

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
    this.listInstance = 0

    this.typeToHandlerMap = {
      bulletlist: this.bulletListHandler,
      figure: this.figureHandler,
      image: this.imageHandler,
      list_item: this.listItemHandler,
      orderedlist: this.orderedListHandler,
      paragraph: this.paragraphHandler,
      table: this.tableHandler,
      table_cell: this.tableCellHandler,
      table_row: this.tableRowHandler,
      text: this.textHandler,
    }

    this.imageData = imageData

    this.baseFontSize = options.baseFontSize || '22pt'
    this.fontFamily = options.fontFamily || 'Verdana'
  }

  #error = e => {
    throw new Error(`${this.#baseMessage} ${e}`)
  }

  #answerHandler = container => {
    if (
      container.type === 'fill_the_gap_container' ||
      container.type === 'multiple_drop_down_container' ||
      container.type === 'matching_container'
    ) {
      let contentType
      if (container.type === 'fill_the_gap_container')
        contentType = 'fill_the_gap'
      else if (container.type === 'multiple_drop_down_container')
        contentType = 'multiple_drop_down_option'
      else contentType = 'matching_option'

      container.content.map(contentItem => {
        const options =
          contentItem.content !== undefined
            ? contentItem.content.filter(item => item.type === contentType)
            : []

        return options.map(option => {
          this.#questionIds.push(option.attrs.id)

          return this.#correctAnswers.push({
            containerType:
              container.type === 'fill_the_gap_container' ? 'value' : 'id',
            containerId: option.attrs.id,
            answerType: 'single',
            answers: [
              {
                content:
                  container.type === 'fill_the_gap_container'
                    ? this.#contentHandler(option.content, { textOnly: true })
                    : option.attrs.correct,
                correct: true,
              },
            ],
          })
        })
      })

      const containers = container.content.map(contentItem =>
        this.#contentHandler(contentItem.content, {
          textOnly: true,
          noNewLine: true,
        }),
      )

      const fullQuestionText = containers.join(' ')

      this.#feedback.push({
        responseId: container.attrs.id,
        questionText: fullQuestionText,
        feedback: container.attrs.feedback,
      })
    } else if (container.type === 'essay_container') {
      const essayAnswerContainer = container.content.filter(
        content => content.type === 'essay_answer',
      )[0]

      this.#questionIds.push(essayAnswerContainer.attrs.id)

      this.#correctAnswers.push({
        containerType: 'essay',
        containerId: essayAnswerContainer.attrs.id,
        answerType: 'single',
        answers: [],
      })
    } else {
      const responses = container.content.filter(response =>
        answerTypes.includes(response.type),
      )

      const answerContent = container.content.filter(
        contentItem => answerTypes.includes(contentItem.type), // && contentItem.attrs.correct,
      )

      const answerIds = answerContent.map(answer => {
        return { content: answer.attrs.id, correct: answer.attrs.correct }
      })

      this.#questionIds.push(container.attrs.id)

      const isMulti =
        container.type === 'true_false_container' ||
        container.type === 'multiple_choice_container'

      this.#correctAnswers.push({
        containerType: 'id',
        containerId: container.attrs.id,
        answerType: isMulti ? 'multi' : 'single',
        answers: answerIds,
      })

      responses.map(response =>
        this.#feedback.push({
          responseId: response.attrs.id,
          questionText: container.content.length
            ? `${this.#contentHandler(container.content[0].content, {
                textOnly: true,
              })} - ${this.#contentHandler(response.content, {
                textOnly: true,
              })}`
            : '',
          feedback: response.attrs.feedback,
        }),
      )
    }
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

  #marksHandler = (text, marks) => {
    if (!marks.length) return text

    const mark = marks[0]

    if (mark.type === 'link') {
      const protocol = mark.attrs.href.slice(0, 5)
      let link = ''

      if (protocol === 'https') {
        link = mark.attrs.href.slice(6)
      } else if (protocol === 'http/') {
        link = mark.attrs.href.slice(5)
      } else link = mark.attrs.href

      return ` <a href='//${link}' rel target='_${
        mark.attrs.target
      }'>${this.#marksHandler(text, marks.slice(1))}</a> `
    }

    if (mark.type === 'strikethrough') {
      return `<span class="${
        mark.attrs.class
      }" style={{textDecorationLine: 'line-through'}}>${this.#marksHandler(
        text,
        marks.slice(1),
      )}</span>`
    }

    if (mark.type === 'underline') {
      return `<u>${this.#marksHandler(text, marks.slice(1))}</u>`
    }

    if (mark.type === 'subscript') {
      return `<sub>${this.#marksHandler(text, marks.slice(1))}</sub>`
    }

    if (mark.type === 'superscript') {
      return `<sup>${this.#marksHandler(text, marks.slice(1))}</sup>`
    }

    if (mark.type === 'smallcaps') {
      return `<span class='${mark.attrs.class}'>${this.#marksHandler(
        text,
        marks.slice(1),
      )}</span>`
    }

    return `<${mark.type}>${this.#marksHandler(text, marks.slice(1))}</${
      mark.type
    }>`
  }

  #contentHandler = (contentArray, options = {}) => {
    if (!Array.isArray(contentArray)) return ''
    return contentArray
      .map(contentItem => {
        if (answerContainers.includes(contentItem.type)) {
          this.#answerHandler(contentItem)
        }

        // leaf node, type text
        if (
          contentItem.type === 'text' &&
          typeof contentItem.marks === 'undefined'
        ) {
          return `<span>${contentItem.text}</span>`
        }

        if (contentItem.type === 'text') {
          return this.#marksHandler(contentItem.text, contentItem.marks)
        }

        if (
          contentItem.type === 'paragraph' &&
          contentItem.content === undefined
        ) {
          return '<br/>'
        }

        if (contentItem.type === 'paragraph' && options.textOnly) {
          return this.#contentHandler(contentItem.content)
        }

        if (contentItem.type === 'paragraph' && !options.isRadio) {
          return `<p class="${contentItem.attrs.class}">${this.#contentHandler(
            contentItem.content,
          )}</p>`
        }

        if (contentItem.type === 'paragraph' && options.isRadio) {
          return null
        }

        // type true_false_container
        if (
          contentItem.type === 'true_false_container' ||
          contentItem.type === 'multiple_choice_container'
        ) {
          return `<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }">${this.#contentHandler(contentItem.content, {
            containerId: contentItem.attrs.id,
          })}</div>`
        }

        if (
          contentItem.type === 'question_node_true_false' ||
          contentItem.type === 'question_node_multiple'
        ) {
          return `<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }">${this.#contentHandler(contentItem.content)}</div>`
        }

        if (
          contentItem.type === 'true_false_single_correct_container' ||
          contentItem.type === 'multiple_choice_single_correct_container'
        ) {
          return `
					<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }">${this.#contentHandler(contentItem.content)}
						<div onChange={(e) => this.handleAnswer(e, {containerId: "${
              contentItem.attrs.id
            }", type: "single"})}>
							${this.#contentHandler(contentItem.content, {
                isRadio: true,
                containerId: contentItem.attrs.id,
              })}
						</div>
					</div>`
        }

        if (
          (contentItem.type === 'question_node_true_false_single' ||
            contentItem.type === 'question_node_multiple_single') &&
          !options.isRadio
        ) {
          return `<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }">${this.#contentHandler(contentItem.content)}</div>`
        }

        // type true_false, multiple_choice
        if (
          contentItem.type === 'true_false' ||
          contentItem.type === 'multiple_choice'
        ) {
          // TODO: answer should move to JS/React code
          return `<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }" answer="${contentItem.attrs.answer}" correct="${
            contentItem.attrs.correct
          }" feedback="${
            contentItem.attrs.feedback
          }"><input type="checkbox" name="${options.containerId}" id="${
            contentItem.attrs.id
          }" value="${contentItem.attrs.id}" containerId="${
            options.containerId
          }" checked={this.state['q${options.containerId}'].includes("${
            contentItem.attrs.id
          }")} onChange={(e) => this.handleAnswer(e, {containerId: "${
            options.containerId
          }", type: "multi"})} /><label for="${
            contentItem.attrs.id
          }">${this.#contentHandler(contentItem.content, {
            textOnly: true,
          })}</label></div>`
        }

        if (
          (contentItem.type === 'true_false_single_correct' ||
            contentItem.type === 'multiple_choice_single_correct') &&
          !options.isRadio
        ) {
          return null
        }

        if (
          contentItem.type === 'true_false_single_correct' ||
          contentItem.type === 'multiple_choice_single_correct'
        ) {
          return `
					<div>
						<input type="radio" id="${contentItem.attrs.id}" name="${
            options.containerId
          }" value="${contentItem.attrs.id}"/><label for="${
            contentItem.attrs.id
          }">${this.#contentHandler(contentItem.content, {
            textOnly: true,
          })}</label>
					</div>`
        }

        if (contentItem.type === 'orderedlist') {
          return `<ol>${this.#contentHandler(contentItem.content)}</ol>`
        }

        if (contentItem.type === 'bulletlist') {
          return `<ul>${this.#contentHandler(contentItem.content)}</ul>`
        }

        if (contentItem.type === 'list_item') {
          return `<li>${this.#contentHandler(contentItem.content)}</li>`
        }

        if (contentItem.type === 'table') {
          return `
						<table>
							<tbody>
								${this.#contentHandler(contentItem.content)}
							</tbody>
						</table>`
        }

        if (contentItem.type === 'table_row') {
          return `<tr>${this.#contentHandler(contentItem.content)}</tr>`
        }

        if (contentItem.type === 'table_cell') {
          return `<td colspan="${contentItem.attrs.colspan}" rowspan="${
            contentItem.attrs.rowspan
          }">${this.#contentHandler(contentItem.content)}</td>`
        }

        if (
          contentItem.type === 'essay_container' ||
          contentItem.type === 'essay_question'
        ) {
          return `<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }">${this.#contentHandler(contentItem.content)}</div>`
        }

        if (contentItem.type === 'essay_answer') {
          return `
					<div class="${contentItem.attrs.class}">
						<textarea id="${contentItem.attrs.id}" value={this.state['q${
            contentItem.attrs.id
          }'][0]} onChange={(e) => this.handleAnswer(e, {containerId: "${
            contentItem.attrs.id
          }", type: "single"})} placeholder="Type your essay answer"/>
						${this.#contentHandler(contentItem.content)}
					</div>`
        }

        if (contentItem.type === 'fill_the_gap_container') {
          return `
					<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }" feedback="${contentItem.attrs.feedback}">
						${this.#contentHandler(contentItem.content)}
					</div>`
        }

        if (contentItem.type === 'fill_the_gap' && options.textOnly) {
          return `${this.#contentHandler(contentItem.content)}`
        }

        if (contentItem.type === 'fill_the_gap') {
          return `
						<span answer="${this.#contentHandler(contentItem.content)}" class="portal">
							<input type="text" id="${contentItem.attrs.id}" value={this.state['q${
            contentItem.attrs.id
          }'][0]} onChange={(e) => this.handleAnswer(e, {containerId: "${
            contentItem.attrs.id
          }", type: "single"})} />
						</span>
					`
        }

        if (contentItem.type === 'multiple_drop_down_container') {
          return `<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }" feedback="${contentItem.attrs.feedback}">${this.#contentHandler(
            contentItem.content,
          )}</div>`
        }

        if (
          contentItem.type === 'multiple_drop_down_option' &&
          options.textOnly
        ) {
          const correctAnswer = contentItem.attrs.options.filter(
            option => option.value === contentItem.attrs.correct,
          )

          return `${correctAnswer.length ? correctAnswer[0].label : ''}`
        }

        if (contentItem.type === 'multiple_drop_down_option') {
          return `
					<select id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }" answer="${contentItem.attrs.answer}" correct="${
            contentItem.attrs.correct
          }" value={this.state['q${
            contentItem.attrs.id
          }'][0]} onChange={(e) => this.handleAnswer(e, {containerId: "${
            contentItem.attrs.id
          }", type: "single"})}>
							<option value="" selected={true} disabled={true}>Select option</option>
							${contentItem.attrs.options.map(option => {
                return `<option value="${option.value}">${option.label}</option>`
              })}
					</select>`
        }

        if (contentItem.type === 'matching_container') {
          // TODO: handle content[i].attrs.isfirst
          return `<div id="${contentItem.attrs.id}" class="${
            contentItem.attrs.class
          }" feedback="${contentItem.attrs.feedback}">${this.#contentHandler(
            contentItem.content,
          )}</div>`
        }

        if (contentItem.type === 'matching_option' && options.textOnly) {
          const correctAnswer = contentItem.attrs.options.filter(
            option => option.value === contentItem.attrs.correct,
          )

          return `${this.#contentHandler(contentItem.content, {
            textOnly: true,
          })} ${correctAnswer.length ? correctAnswer[0].label : ''}<br/>`
        }

        if (contentItem.type === 'matching_option') {
          return `
					<div class="${contentItem.attrs.class}">
						${this.#contentHandler(contentItem.content)}
						<select id="${contentItem.attrs.id}" answer="${
            contentItem.attrs.answer
          }" correct="${contentItem.attrs.correct}" value={this.state['q${
            contentItem.attrs.id
          }'][0]} onChange={(e) => this.handleAnswer(e, {containerId: "${
            contentItem.attrs.id
          }", type: "single"})}>
							<option value="" selected={true} disabled={true}>Select option</option>
							${contentItem.attrs.options.map(option => {
                return `<option value="${option.value}">${option.label}</option>`
              })}
						</select>
					</div>`
        }

        if (contentItem.type === 'figure') {
          return `
					<figure>
						${this.#contentHandler(contentItem.content)}
					</figure>`
        }

        if (contentItem.type === 'image') {
          return `
					<img src="${contentItem.attrs.src}" alt="${contentItem.attrs.alt}" />`
        }

        if (contentItem.type === 'figcaption') {
          return `
					<figcaption class="${contentItem.attrs.class}">
						${this.#contentHandler(contentItem.content)}
					</figcaption>`
        }

        // go again, one level down
        if (contentItem.content.length) {
          return this.#contentHandler()
        }

        return ''
      })
      .join(options.noNewLine ? '' : '\n')
  }

  #metadataHandler = () => {
    const metadata = metadataResolver()
    const metadataContent = {}

    metadataContent.questionType = metadata.questionTypes.find(
      q => q.value === this.#questionVersion.questionType,
    ).label

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

    const selectedBiointeractiveResources = resources.filter(resource =>
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

    const index = buildIndex(
      this.#contentHandler(this.doc.content),
      this.#correctAnswers,
      this.#feedback,
      this.#questionIds,
    )

    const dir = path.join(__dirname, '..', '..', 'tmp', id)
    const mainPageFile = path.join(__dirname, 'helpers', 'mainPage.html')
    const stylesheet = path.join(__dirname, 'helpers', 'style.css')
    const scormAPI = path.join(__dirname, 'helpers', 'scormApi.js')

    try {
      fs.mkdirSync(`${dir}/content/`, { recursive: true })
      fs.writeFileSync(`${dir}/imsmanifest.xml`, xmlManifest, 'utf-8')
      fs.writeFileSync(`${dir}/metadata_course.xml`, xmlMetadata, 'utf-8')
      fs.copyFileSync(mainPageFile, `${dir}/content/${id}.html`)
      fs.copyFileSync(stylesheet, `${dir}/content/style.css`)
      fs.copyFileSync(scormAPI, `${dir}/content/scorm_api.js`)
      fs.writeFileSync(`${dir}/content/index.js`, index, 'utf-8')

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

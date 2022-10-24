const cloneDeep = require('lodash/cloneDeep')

const {
  AlignmentType,
  Document,
  LevelFormat,
  Paragraph,
  TextRun,

  convertMillimetersToTwip,
} = require('docx')

const WaxToDocxConverter = require('./docx.service')

/**
 * TO DO
 *
 * match
 * essay
 */

const labels = {
  questionType: 'Question type',

  topics: 'Topics',
  topic: 'Topic',
  subtopic: 'Subtopic',

  courses: 'Courses',
  course: 'Course',
  unit: 'Unit',
  courseTopic: 'Course Topic',
  learningObjective: 'Learning objective',
  essentialKnowledge: 'Essential knowledge',
  application: 'Application',
  coreCompetence: 'Core competence',
  coreConcept: 'Core concept',
  skill: 'Skill',
  subcompetence: 'Subcompetence',
  subcompetenceStatement: 'Subcompetence statement',
  subdiscipline: 'Subdiscipline',
  subdisciplineStatement: 'Subdiscipline statement',
  understanding: 'Understanding',

  keywords: 'Keywords',
  biointeractiveResources: 'BioInteractive resources',

  cognitiveLevel: "Bloom's Cognitive Level",
  affectiveLevel: "Bloom's Affective Level",
  psychomotorLevel: "Bloom's Psychomotor Level",
  readingLevel: "Bloom's Reading Level",

  publicationDate: 'Publication date',
}

class HHMIWaxToDocxConverter extends WaxToDocxConverter {
  constructor(doc, imageData, metadata, options = {}) {
    super(doc, imageData, options)
    this.metadata = metadata

    const newHandlers = {
      multiple_choice_container: this.multipleChoiceHandler,
      question_node_multiple: this.multipleChoiceQuestionHandler,
      multiple_choice: this.multipleChoiceOptionHandler,

      multiple_choice_single_correct_container: this.multipleChoiceHandler,
      question_node_multiple_single: this.multipleChoiceQuestionHandler,
      multiple_choice_single_correct: this.multipleChoiceOptionHandler,

      true_false_container: this.trueFalseHandler,
      question_node_true_false: this.trueFalseQuestionHandler,
      true_false: this.trueFalseOptionHandler,

      fill_the_gap_container: this.fillTheGapContainerHandler,
      fill_the_gap: this.fillTheGapHandler,
    }

    this.typeToHandlerMap = {
      ...this.typeToHandlerMap,
      ...newHandlers,
    }

    this.listTypes = {
      ...this.listTypes,
      MULTIPLE_CHOICE: 'multiple_choice',
    }

    this.config.numbering.config.push({
      levels: [
        {
          level: 0,
          format: LevelFormat.UPPER_LETTER,
          text: '%1.',
          alignment: AlignmentType.START,
          style: {
            paragraph: {
              indent: {
                left: convertMillimetersToTwip(7),
                hanging: this.listIndentFirstLevelHanging,
              },
              spacing: {
                before: 200,
                after: 200,
              },
            },
          },
        },
      ],
      reference: this.listTypes.MULTIPLE_CHOICE,
    })

    this.appendixHeaderStyles = {
      bold: true,
      size: this.baseFontSize + 4,
    }

    this.showFeedback = options.showFeedback || false
    this.showMetadata = options.showMetadata || false
    this.multipleChoiceSolutions = {}
    this.trueFalseSolutions = {}
    this.fillTheGapSolutions = {}
    this.fillTheGapFeedback = {}

    this.metadataSpacing = new TextRun({ text: '  ' })
  }

  // #region multiple-choice
  multipleChoiceHandler = multipleChoice => {
    const groupId = multipleChoice.attrs.id
    this.listInstance += 1
    this.multipleChoiceSolutions[groupId] = []

    return [
      new Paragraph({
        children: [],
      }),
      ...this.contentParser(multipleChoice.content, {
        multipleChoiceGroupId: groupId,
        instance: this.listInstance,
        listType: this.listTypes.MULTIPLE_CHOICE,
        level: 0,
      }),
    ]
  }

  multipleChoiceQuestionHandler = question =>
    this.contentParser(question.content)

  multipleChoiceOptionHandler = (multipleChoiceOption, options = {}) => {
    const { /* id, */ correct, feedback } = multipleChoiceOption.attrs
    const { multipleChoiceGroupId } = options

    this.multipleChoiceSolutions[multipleChoiceGroupId].push({
      correct,
      feedback,
    })

    return this.contentParser(multipleChoiceOption.content, options)
  }
  // #endregion multiple-choice

  // #region true-false
  trueFalseHandler = trueFalse => {
    const groupId = trueFalse.attrs.id
    this.listInstance += 1
    this.trueFalseSolutions[groupId] = []

    return [
      new Paragraph({
        children: [],
      }),
      ...this.contentParser(
        // remove last item, as it's an empty paragraph that wax generates
        trueFalse.content.slice(0, trueFalse.content.length - 1),
        {
          trueFalseGroupId: groupId,
          instance: this.listInstance,
          listType: this.listTypes.MULTIPLE_CHOICE,
          level: 0,
        },
      ),
    ]
  }

  trueFalseQuestionHandler = question => {
    return this.contentParser(question.content)
  }

  trueFalseOptionHandler = (trueFalseOption, options = {}) => {
    const { /* id, */ correct, feedback } = trueFalseOption.attrs
    const { trueFalseGroupId } = options

    this.trueFalseSolutions[trueFalseGroupId].push({
      correct,
      feedback,
    })

    const { content } = cloneDeep(trueFalseOption)
    const lastChild = content[content.length - 1]

    lastChild.content.push({
      type: 'text',
      text: '      True / False',
    })

    return this.contentParser(content, options)
  }
  // #endregion true-false

  // #region fill-the-gap
  fillTheGapContainerHandler = container => {
    const groupId = container.attrs.id
    this.fillTheGapSolutions[groupId] = []
    this.fillTheGapFeedback[groupId] = container.attrs.feedback

    return [
      new Paragraph({ children: [] }),
      ...this.contentParser(container.content, { fillTheGapGroupId: groupId }),
    ]
  }

  fillTheGapHandler = (gap, options = {}) => {
    const groupId = options.fillTheGapGroupId
    const solutions = this.fillTheGapSolutions[groupId]
    // solutions.push(gap.attrs.answer)
    solutions.push(
      gap.content[0].text
        .split(',')
        .map(i => i.trim())
        .join(', '),
    )

    return new TextRun({ text: '  ______  ' })
  }
  // #endregion fill-the-gap

  feedbackParser = () => {
    let content = [
      new Paragraph({
        children: [
          new TextRun({
            text: 'Solutions',
            ...this.appendixHeaderStyles,
          }),
        ],
      }),
    ]

    const multipleChoiceSolutionKeys = Object.keys(this.multipleChoiceSolutions)

    multipleChoiceSolutionKeys.forEach((groupId, i) => {
      this.listInstance += 1
      const groupSolutions = this.multipleChoiceSolutions[groupId]

      let listContent = []

      if (multipleChoiceSolutionKeys.length > 1) {
        listContent.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Multiple choice question ${i + 1}`,
                bold: true,
              }),
            ],
          }),
        )
      }

      groupSolutions.forEach(option => {
        const isCorrect = new Paragraph({
          children: [
            new TextRun({
              text: option.correct ? 'Correct' : 'Not correct',
            }),
          ],
          numbering: {
            reference: this.listTypes.MULTIPLE_CHOICE,
            level: 0,
            instance: this.listInstance,
          },
          spacing: {
            after: 50,
          },
        })

        const feedback = new Paragraph({
          children: [new TextRun({ text: option.feedback })],
          indent: {
            left: convertMillimetersToTwip(7),
          },
        })

        listContent = listContent.concat([isCorrect, feedback])
      })

      content = content.concat(listContent)
    })

    // TO DO -- refactor with multiple choice
    const trueFalseSolutionKeys = Object.keys(this.trueFalseSolutions)

    trueFalseSolutionKeys.forEach((groupId, i) => {
      this.listInstance += 1
      const groupSolutions = this.trueFalseSolutions[groupId]

      let listContent = []

      if (trueFalseSolutionKeys.length > 1) {
        listContent.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Multiple choice question ${i + 1}`,
                bold: true,
              }),
            ],
          }),
        )
      }

      groupSolutions.forEach(option => {
        const isCorrect = new Paragraph({
          children: [
            new TextRun({
              text: option.correct ? 'Correct' : 'Not correct',
            }),
          ],
          numbering: {
            reference: this.listTypes.MULTIPLE_CHOICE,
            level: 0,
            instance: this.listInstance,
          },
          spacing: {
            after: 50,
          },
        })

        const feedback = new Paragraph({
          children: [new TextRun({ text: option.feedback })],
          indent: {
            left: convertMillimetersToTwip(7),
          },
        })

        listContent = listContent.concat([isCorrect, feedback])
      })

      content = content.concat(listContent)
    })

    const fillTheGapSolutionKeys = Object.keys(this.fillTheGapSolutions)

    fillTheGapSolutionKeys.forEach((groupId, i) => {
      this.listInstance += 1
      const groupSolutions = this.fillTheGapSolutions[groupId]

      const listContent = []

      if (fillTheGapSolutionKeys.length > 1) {
        listContent.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Fill the gap ${i + 1}`,
                bold: true,
              }),
            ],
          }),
        )
      }

      groupSolutions.forEach(gapSolution => {
        const acceptedAnswers = gapSolution
          .split(';')
          .map(s => s.trim())
          .join(', ')

        const solution = new Paragraph({
          children: [
            new TextRun({
              text: acceptedAnswers,
            }),
          ],
          numbering: {
            reference: this.listTypes.ORDERED,
            level: 0,
            instance: this.listInstance,
          },
          contextualSpacing: false,
          indent: {
            left: convertMillimetersToTwip(7),
          },
          spacing: {
            after: 100,
          },
        })

        listContent.push(solution)
      })

      const feedbackParagraph = new Paragraph({
        children: [
          new TextRun({
            text: this.fillTheGapFeedback[groupId],
          }),
        ],
      })

      listContent.push(feedbackParagraph)

      content = content.concat(listContent)
    })

    return content
  }

  // #region metadata
  metadataBulletFactory = (key, value, level = 0) => {
    return new Paragraph({
      children: [
        key &&
          new TextRun({
            text: `${key}:`,
            bold: true,
          }),
        key && this.metadataSpacing,
        new TextRun({
          text: value,
        }),
      ].filter(Boolean),
      numbering: {
        reference: this.listTypes.BULLET,
        level,
        instance: this.listInstance,
      },
    })
  }

  /* eslint-disable-next-line class-methods-use-this */
  metadataBulletHeaderFactory = label => {
    return new Paragraph({
      children: [
        new TextRun({
          text: `${label}:`,
          bold: true,
        }),
      ],
    })
  }

  metadataArrayOfObjectsParser = (content, key, value) => {
    // value is an array by definition
    value.forEach((item, pos) => {
      this.listInstance += 1

      const textLabel =
        value.length > 1 ? `${labels[key]} ${pos + 1}` : labels[key]

      content.push(this.metadataBulletHeaderFactory(textLabel))

      Object.keys(item).forEach(propertyKey => {
        if (typeof item[propertyKey] === 'string') {
          content.push(
            this.metadataBulletFactory(propertyKey, item[propertyKey]),
          )
          return
        }

        this.metadataValueParser(content, propertyKey, item[propertyKey])
      })
    })
  }

  /* eslint-disable-next-line class-methods-use-this */
  metadataArrayOfStringsParser = (content, key, value) => {
    const items = []

    value.forEach((s, pos) => {
      items.push(
        new TextRun({
          text: s,
        }),
      )

      // separate with commas
      if (pos !== value.length - 1) {
        items.push(
          new TextRun({
            text: ', ',
          }),
        )
      }
    })

    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${labels[key]}:`,
            bold: true,
          }),
          this.metadataSpacing,
          ...items,
        ],
      }),
    )
  }

  metadataArrayOfStringsAsBulletListParser = (content, key, value) => {
    content.push(this.metadataBulletHeaderFactory(labels[key]))

    value.forEach(v => {
      content.push(this.metadataBulletFactory(null, v))
    })
  }

  /* eslint-disable-next-line class-methods-use-this */
  metadataStringFactory = (key, value) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: `${labels[key]}:`,
          bold: true,
        }),
        this.metadataSpacing,
        new TextRun({
          text: value,
        }),
      ],
    })
  }

  metadataValueParser = (content, key, value) => {
    if (typeof value === 'string') {
      content.push(this.metadataStringFactory(key, value))
    }

    if (Array.isArray(value)) {
      const hasStringValues = value.every(s => typeof s === 'string')
      const hasObjectValues = value.every(o => typeof o === 'object')

      if (hasStringValues) {
        this.metadataArrayOfStringsParser(content, key, value)
        return
      }

      if (hasObjectValues) {
        this.metadataArrayOfObjectsParser(content, key, value)
      }
    }
  }

  metadataTopicsParser = (content, key, value) => {
    content.push(this.metadataBulletHeaderFactory(labels[key]))

    value.forEach(v => {
      const { topic, subtopic } = v

      content.push(this.metadataBulletFactory(labels.topic, topic))
      content.push(this.metadataBulletFactory(labels.subtopic, subtopic, 1))
    })
  }

  metadataCoursesParser = (content, key, value) => {
    content.push(this.metadataBulletHeaderFactory(labels[key]))

    value.forEach(v => {
      const { course, units } = v
      content.push(this.metadataBulletFactory(labels.course, course))

      units.forEach(u => {
        const { unit, ...rest } = u
        content.push(this.metadataBulletFactory(labels.unit, unit, 1))

        Object.keys(rest).forEach(i => {
          content.push(this.metadataBulletFactory(labels[i], u[i], 2))
        })
      })
    })
  }

  metadataParser = () => {
    const content = [
      new Paragraph({
        children: [
          new TextRun({
            text: 'Metadata',
            ...this.appendixHeaderStyles,
          }),
        ],
      }),
    ]

    Object.keys(this.metadata).forEach(key => {
      const value = this.metadata[key]

      if (key === 'topics') {
        this.metadataTopicsParser(content, key, value)
        return
      }

      if (key === 'courses') {
        this.metadataCoursesParser(content, key, value)
        return
      }

      if (key === 'biointeractiveResources') {
        this.metadataArrayOfStringsAsBulletListParser(content, key, value)

        return
      }

      this.metadataValueParser(content, key, value)
    })

    return content
  }
  // #endregion metadata

  buildDocx = () => {
    const sections = [
      {
        children: this.contentParser(this.doc.content),
      },
    ]

    if (this.showFeedback) {
      sections.push({
        children: this.feedbackParser(),
      })
    }

    if (this.showMetadata) {
      sections.push({
        children: this.metadataParser(),
      })
    }

    return new Document({
      ...this.config,
      sections,
    })
  }
}

module.exports = HHMIWaxToDocxConverter

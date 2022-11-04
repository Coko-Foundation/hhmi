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

const convertListPositionToLetter = (pos, options = {}) => {
  if (pos > 25)
    throw new Error(
      'Function only supports up to 26 positions! (0-25 as input)',
    )

  // 65 is the code for 'A', 97 is the code for 'a'
  let baseCode = 65
  if (options.lowerCase) baseCode = 97

  const code = baseCode + pos
  return String.fromCharCode(code)
}

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

    // #region handler-mapper
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

      true_false_single_correct_container: this.trueFalseHandler,
      question_node_true_false_single: this.trueFalseQuestionHandler,
      true_false_single_correct: this.trueFalseOptionHandler,

      fill_the_gap_container: this.fillTheGapContainerHandler,
      fill_the_gap: this.fillTheGapHandler,

      matching_container: this.matchingContainerHanlder,

      multiple_drop_down_container: this.multipleDropdownContainerHandler,
      multiple_drop_down_option: this.multipleDropdownOptionHandler,

      essay_container: this.essayContainerHandler,
    }

    this.typeToHandlerMap = {
      ...this.typeToHandlerMap,
      ...newHandlers,
    }
    // #endregion handler-mapper

    // #region list-types
    this.listTypes = {
      ...this.listTypes,
      MULTIPLE_CHOICE: 'multiple_choice',
      MATCHING_QUESTION: 'matching_question',
      MATCHING_ANSWER: 'matching_answer',
      MULTIPLE_DROPDOWN_OPTION: 'multiple_dropdown_option',
    }

    const multipleChoiceListType = {
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
    }

    const matchingQuestionListType = {
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
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
      reference: this.listTypes.MATCHING_QUESTION,
    }

    const matchingAnswerListType = {
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
      reference: this.listTypes.MATCHING_ANSWER,
    }

    const multipleDropdownOptionListType = {
      levels: [
        {
          level: 0,
          format: LevelFormat.LOWER_LETTER,
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
      reference: this.listTypes.MULTIPLE_DROPDOWN_OPTION,
    }

    this.config.numbering.config.push(multipleChoiceListType)
    this.config.numbering.config.push(matchingQuestionListType)
    this.config.numbering.config.push(matchingAnswerListType)
    this.config.numbering.config.push(multipleDropdownOptionListType)

    this.appendixHeaderStyles = {
      bold: true,
      size: this.baseFontSize + 4,
    }
    // #endregion list-types

    this.showFeedback = options.showFeedback || false
    this.showMetadata = options.showMetadata || false

    this.multipleChoiceSolutions = {}
    this.trueFalseSolutions = {}

    this.fillTheGapSolutions = {}
    this.fillTheGapFeedback = {}

    this.matchingSolutions = {}
    this.matchingFeedback = {}

    this.multipleDropdownCounter = {}
    this.multipleDropdownOptions = {}
    this.multipleDropdownSolutions = {}
    this.multipleDropdownFeedback = {}

    this.metadataSpacing = new TextRun({ text: '  ' })
  }

  /* eslint-disable-next-line class-methods-use-this */
  createGap = marker => {
    return new TextRun({ text: `  ${marker || ''} ______  ` })
  }

  /* eslint-disable-next-line class-methods-use-this */
  createEmptyParagraph = () => {
    return new Paragraph({ children: [] })
  }

  // #region multiple-choice
  multipleChoiceHandler = multipleChoice => {
    const groupId = multipleChoice.attrs.id
    this.listInstance += 1
    this.multipleChoiceSolutions[groupId] = []

    return [
      new Paragraph({ children: [] }),
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

    return this.createGap()
  }
  // #endregion fill-the-gap

  // #region matching
  matchingContainerHanlder = node => {
    const { id, options, feedback } = node.attrs
    this.matchingSolutions[id] = []
    this.matchingFeedback[id] = feedback

    const questionRuns = []
    const optionRuns = []

    // create all questions
    const questionNodes = node.content[0].content // content[0] because we start with an empty paragraph which includes the question nodes
    this.listInstance += 1

    questionNodes.forEach((questionNode, i) => {
      if (questionNode.type !== 'matching_option')
        throw new Error('Docx service: malformed question node!')

      // capture solution
      const correctId = questionNode.attrs.correct
      const optionPosition = options.findIndex(o => o.value === correctId)

      const optionPositionAsLetter = convertListPositionToLetter(optionPosition)

      this.matchingSolutions[id].push(optionPositionAsLetter)

      // create content
      questionRuns.push(
        this.paragraphHandler(
          {
            content: questionNode.content,
          },
          {
            listType: this.listTypes.MATCHING_QUESTION,
            instance: this.listInstance,
            level: 0,
          },
        ),
      )
    })

    // then create all possible answers
    this.listInstance += 1

    options.forEach(option => {
      optionRuns.push(
        this.paragraphHandler(
          {
            content: [
              {
                type: 'text',
                text: option.label,
              },
            ],
          },
          {
            listType: this.listTypes.MATCHING_ANSWER,
            instance: this.listInstance,
            level: 0,
          },
        ),
      )
    })

    return [...questionRuns, new Paragraph({ children: [] }), ...optionRuns]
  }
  // #endregion matching

  // #region mulitple-dropdown
  multipleDropdownContainerHandler = node => {
    const { id, feedback } = node.attrs
    this.multipleDropdownCounter[id] = -1
    this.multipleDropdownOptions[id] = []
    this.multipleDropdownSolutions[id] = []
    this.multipleDropdownFeedback[id] = feedback

    // this line will go through the content and will populate this.multipleDropdownOptions[id]
    const mainText = this.contentParser(node.content, { containerId: id })

    const optionsHeader = new Paragraph({
      children: [new TextRun({ text: 'Options:', bold: true })],
    })

    // use now populated this.multipleDropdownOptions[id]
    const options = this.multipleDropdownOptions[id].map(nodeOptions => {
      const value = nodeOptions.map(o => o.label).join(', ')

      return this.paragraphHandler(
        {
          content: [
            {
              type: 'text',
              text: value,
            },
          ],
        },
        {
          listType: this.listTypes.MULTIPLE_DROPDOWN_OPTION,
          instance: this.listInstance,
          level: 0,
        },
      )
    })

    return [...mainText, optionsHeader, ...options]
  }

  multipleDropdownOptionHandler = (node, options) => {
    const { containerId } = options

    // capture options
    this.multipleDropdownOptions[containerId].push(node.attrs.options)

    // capture correct
    const correctOption = node.attrs.options.find(
      o => o.value === node.attrs.correct,
    )

    const correctLabel = correctOption && correctOption.label
    this.multipleDropdownSolutions[containerId].push(correctLabel)

    // create lowercase numbering
    this.multipleDropdownCounter[containerId] += 1
    const position = this.multipleDropdownCounter[containerId]
    const letter = convertListPositionToLetter(position, { lowerCase: true })
    const marker = `(${letter})`

    return this.createGap(marker)
  }
  // #endregion multiple-dropdown

  // #region essay
  essayContainerHandler = node => {
    return [
      this.createEmptyParagraph(),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Write your essay below:',
            bold: true,
          }),
        ],
      }),
      this.createEmptyParagraph(),
    ]
  }
  // #endregion essay

  // #region feedback
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

    const matchingSolutionKeys = Object.keys(this.matchingSolutions)

    matchingSolutionKeys.forEach((groupId, i) => {
      this.listInstance += 1
      const groupSolutions = this.matchingSolutions[groupId]

      const listContent = []

      if (matchingSolutionKeys.length > 1) {
        listContent.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Matching ${i + 1}`,
                bold: true,
              }),
            ],
          }),
        )
      }

      groupSolutions.forEach(matchingSolution => {
        const solution = new Paragraph({
          children: [
            new TextRun({
              text: matchingSolution,
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
            text: this.matchingFeedback[groupId],
          }),
        ],
      })

      listContent.push(feedbackParagraph)

      content = content.concat(listContent)
    })

    const multipleDropdownSolutionKeys = Object.keys(
      this.multipleDropdownSolutions,
    )

    multipleDropdownSolutionKeys.forEach((groupId, i) => {
      this.listInstance += 1
      const groupSolutions = this.multipleDropdownSolutions[groupId]
      const listContent = []

      if (multipleDropdownSolutionKeys.length > 1) {
        listContent.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Multiple Dropdown ${i + 1}`,
                bold: true,
              }),
            ],
          }),
        )
      }

      groupSolutions.forEach(multipleDropdownSolution => {
        const solution = new Paragraph({
          children: [
            new TextRun({
              text: multipleDropdownSolution,
            }),
          ],
          numbering: {
            reference: this.listTypes.MULTIPLE_DROPDOWN_OPTION,
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
            text: this.multipleDropdownFeedback[groupId],
          }),
        ],
      })

      listContent.push(feedbackParagraph)

      content = content.concat(listContent)
    })

    return content
  }
  // #endregion feedback

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

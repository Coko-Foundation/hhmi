const cloneDeep = require('lodash/cloneDeep')

const {
  AlignmentType,
  Document,
  LevelFormat,
  Paragraph,
  TextRun,
  BorderStyle,
  convertMillimetersToTwip,
} = require('docx')

const WaxToDocxConverter = require('./docx.service')
const flattenLabels = require('../../controllers/flattenMetadataValues')

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

const flattenedMetadata = flattenLabels()

const labels = {
  ...flattenedMetadata,

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
      essay_question: this.essayQuestionHandler,
      essay_prompt: this.essayFeedbackHandler,
      essay_answer: this.essayAnswerHandler,

      question_list: this.questionListHandler,
      question: this.questionHandler,
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
                left: convertMillimetersToTwip(10),
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
                left: convertMillimetersToTwip(10),
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
                left: convertMillimetersToTwip(10),
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
                left: convertMillimetersToTwip(10),
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

    // initialize an empty array if we're dealing with a question list (questionListHandler will add an object of references for each question)
    // otherwise, initialize array with 1 element
    this.questionReference =
      doc.content[0].type === 'question_list'
        ? []
        : [
            {
              multipleChoiceSolutions: {},
              trueFalseSolutions: {},

              fillTheGapSolutions: {},
              fillTheGapFeedback: {},

              matchingSolutions: {},
              matchingFeedback: {},

              multipleDropdownCounter: {},
              multipleDropdownOptions: {},
              multipleDropdownSolutions: {},
              multipleDropdownFeedback: {},
              essaySolutions: {},
            },
          ]

    // if question_list initialize the counter to -1 (questionHandler will increment it by 1 for every question)
    // otherwise set it to 0
    this.questionCounter = doc.content[0].type === 'question_list' ? -1 : 0

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

    this.questionReference[this.questionCounter].multipleChoiceSolutions[
      groupId
    ] = []

    const lastItem = multipleChoice.content[multipleChoice.content.length - 1]

    // wax might or might not insert an empty paragraph at the bottom of the widget
    const isLastItemEmptyParagraph =
      lastItem.type === 'paragraph' &&
      lastItem.content.length === 1 &&
      lastItem.content[0].type === 'text' &&
      !lastItem.content[0].text.trim()

    const contentToParse = isLastItemEmptyParagraph
      ? multipleChoice.content.slice(0, multipleChoice.content.length - 1)
      : multipleChoice.content

    return [
      new Paragraph({ children: [] }),
      ...this.contentParser(contentToParse, {
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

    this.questionReference[this.questionCounter].multipleChoiceSolutions[
      multipleChoiceGroupId
    ].push({
      correct,
      feedback,
    })

    return this.contentParser(multipleChoiceOption.content, {
      ...options,
      renderEmpty: true,
    })
  }
  // #endregion multiple-choice

  // #region true-false
  trueFalseHandler = trueFalse => {
    const groupId = trueFalse.attrs.id
    const { content } = trueFalse
    this.listInstance += 1

    this.questionReference[this.questionCounter].trueFalseSolutions[groupId] =
      []
    let contentToParse

    if (content) {
      const lastItem = content[content.length - 1]

      // wax might or might not insert an empty paragraph at the bottom of the widget
      const isLastItemEmptyParagraph =
        lastItem.type === 'paragraph' &&
        lastItem.content.length === 1 &&
        lastItem.content[0].type === 'text' &&
        !lastItem.content[0].text.trim()

      contentToParse = isLastItemEmptyParagraph
        ? content.slice(0, content.length - 1)
        : content
    }

    return [
      new Paragraph({
        children: [],
      }),
      ...this.contentParser(contentToParse, {
        trueFalseGroupId: groupId,
        instance: this.listInstance,
        listType: this.listTypes.MULTIPLE_CHOICE,
        level: 0,
      }),
    ]
  }

  trueFalseQuestionHandler = question => {
    return this.contentParser(question.content)
  }

  trueFalseOptionHandler = (trueFalseOption, options = {}) => {
    const { /* id, */ correct, feedback } = trueFalseOption.attrs
    const { trueFalseGroupId } = options

    this.questionReference[this.questionCounter].trueFalseSolutions[
      trueFalseGroupId
    ].push({
      correct,
      feedback,
    })

    const { content } = cloneDeep(trueFalseOption)

    if (content) {
      const lastChild = content[content.length - 1]

      lastChild.content.push({
        type: 'text',
        text: '      True / False',
      })
    }

    return this.contentParser(content, { ...options, renderEmpty: true })
  }
  // #endregion true-false

  // #region fill-the-gap
  fillTheGapContainerHandler = container => {
    const groupId = container.attrs.id
    this.questionReference[this.questionCounter].fillTheGapSolutions[groupId] =
      []
    this.questionReference[this.questionCounter].fillTheGapFeedback[groupId] =
      container.attrs.feedback

    return [
      new Paragraph({ children: [] }),
      ...this.contentParser(container.content, { fillTheGapGroupId: groupId }),
    ]
  }

  fillTheGapHandler = (gap, options = {}) => {
    const groupId = options.fillTheGapGroupId

    const solutions =
      this.questionReference[this.questionCounter].fillTheGapSolutions[groupId]

    let solution

    if (gap.content) {
      solution = gap.content[0].text
        .split(',')
        .map(i => i.trim())
        .join(', ')
    } else {
      solution = ''
    }

    solutions.push(solution)
    return this.createGap()
  }
  // #endregion fill-the-gap

  // #region matching
  matchingContainerHanlder = node => {
    const { id, options, feedback } = node.attrs
    this.questionReference[this.questionCounter].matchingSolutions[id] = []
    this.questionReference[this.questionCounter].matchingFeedback[id] = feedback

    const questionRuns = []
    const optionRuns = []

    // create all questions
    const questionNodes = node.content[0].content // content[0] because we start with an empty paragraph which includes the question nodes
    this.listInstance += 1

    questionNodes.forEach((questionNode, i) => {
      // return if node type is not matching_option instead of throwing error
      if (questionNode.type !== 'matching_option') return
      // throw new Error('Docx service: malformed question node!')

      // capture solution
      const correctId = questionNode.attrs.correct
      const optionPosition = options.findIndex(o => o.value === correctId)

      const optionPositionAsLetter = convertListPositionToLetter(optionPosition)

      this.questionReference[this.questionCounter].matchingSolutions[id].push(
        optionPositionAsLetter,
      )

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
    this.questionReference[this.questionCounter].multipleDropdownCounter[id] =
      -1
    this.questionReference[this.questionCounter].multipleDropdownOptions[id] =
      []
    this.questionReference[this.questionCounter].multipleDropdownSolutions[id] =
      []
    this.questionReference[this.questionCounter].multipleDropdownFeedback[id] =
      feedback

    // this line will go through the content and will populate this.questionReference[this.questionCounter].multipleDropdownOptions[id]
    const mainText = this.contentParser(node.content, { containerId: id })

    const optionsHeader = new Paragraph({
      children: [new TextRun({ text: 'Options:', bold: true })],
    })

    // use now populated this.questionReference[this.questionCounter].multipleDropdownOptions[id]
    const options = this.questionReference[
      this.questionCounter
    ].multipleDropdownOptions[id].map(nodeOptions => {
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
    this.questionReference[this.questionCounter].multipleDropdownOptions[
      containerId
    ].push(node.attrs.options)

    // capture correct
    const correctOption = node.attrs.options.find(
      o => o.value === node.attrs.correct,
    )

    const correctLabel = correctOption && correctOption.label
    this.questionReference[this.questionCounter].multipleDropdownSolutions[
      containerId
    ].push(correctLabel)

    // create lowercase numbering
    this.questionReference[this.questionCounter].multipleDropdownCounter[
      containerId
    ] += 1

    const position =
      this.questionReference[this.questionCounter].multipleDropdownCounter[
        containerId
      ]

    const letter = convertListPositionToLetter(position, { lowerCase: true })
    const marker = `(${letter})`

    return this.createGap(marker)
  }
  // #endregion multiple-dropdown

  // #region essay
  essayContainerHandler = node => {
    const groupId = node.attrs.id
    this.questionReference[this.questionCounter].essaySolutions[groupId] = []

    return [
      this.createEmptyParagraph(),
      ...this.contentParser(node.content, { essayGroupId: groupId }),
    ]
  }

  essayQuestionHandler = node => {
    return this.contentParser(node.content)
  }

  essayFeedbackHandler = (node, options = {}) => {
    const groupId = options.essayGroupId

    this.questionReference[this.questionCounter].essaySolutions[groupId].push(
      ...node.content,
    )
  }

  essayAnswerHandler = node => {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: 'Write your essay below:',
            bold: true,
          }),
        ],
      }),
      this.createEmptyParagraph(),
      this.createEmptyParagraph(),
      this.createEmptyParagraph(),
      this.createEmptyParagraph(),
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

    this.questionReference.forEach((question, index, questionsArray) => {
      if (questionsArray.length > 1) {
        content.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Question ${index + 1}`,
              }),
            ],
            style: 'questionCounter',
          }),
        )
      }

      const multipleChoiceSolutionKeys = Object.keys(
        question.multipleChoiceSolutions,
      )

      multipleChoiceSolutionKeys.forEach((groupId, i) => {
        this.listInstance += 1
        const groupSolutions = question.multipleChoiceSolutions[groupId]

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
      const trueFalseSolutionKeys = Object.keys(question.trueFalseSolutions)

      trueFalseSolutionKeys.forEach((groupId, i) => {
        this.listInstance += 1
        const groupSolutions = question.trueFalseSolutions[groupId]

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

      const fillTheGapSolutionKeys = Object.keys(question.fillTheGapSolutions)

      fillTheGapSolutionKeys.forEach((groupId, i) => {
        this.listInstance += 1
        const groupSolutions = question.fillTheGapSolutions[groupId]

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
              text: question.fillTheGapFeedback[groupId],
            }),
          ],
        })

        listContent.push(feedbackParagraph)

        content = content.concat(listContent)
      })

      const matchingSolutionKeys = Object.keys(question.matchingSolutions)

      matchingSolutionKeys.forEach((groupId, i) => {
        this.listInstance += 1
        const groupSolutions = question.matchingSolutions[groupId]

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
              text: question.matchingFeedback[groupId],
            }),
          ],
        })

        listContent.push(feedbackParagraph)

        content = content.concat(listContent)
      })

      const multipleDropdownSolutionKeys = Object.keys(
        question.multipleDropdownSolutions,
      )

      multipleDropdownSolutionKeys.forEach((groupId, i) => {
        this.listInstance += 1
        const groupSolutions = question.multipleDropdownSolutions[groupId]
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
              text: question.multipleDropdownFeedback[groupId],
            }),
          ],
        })

        listContent.push(feedbackParagraph)

        content = content.concat(listContent)
      })

      const essaySolutionKeys = Object.keys(question.essaySolutions)

      essaySolutionKeys.forEach((groupId, i) => {
        const feedback = question.essaySolutions[groupId]

        const feedbackContent = this.contentParser(feedback)

        content = content.concat(feedbackContent)
      })
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
          text: labels[value] || value,
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
          text: labels[value] || value,
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

  // #region question lists
  /* eslint-disable-next-line class-methods-use-this */
  questionListHandler = questionList => {
    const numberedQuestions = []

    for (let index = 0; index < questionList.content.length; index += 1) {
      const question = cloneDeep(questionList.content[index])
      question.index = index + 1
      numberedQuestions.push(question)

      this.questionReference.push({
        multipleChoiceSolutions: {},
        trueFalseSolutions: {},

        fillTheGapSolutions: {},
        fillTheGapFeedback: {},

        matchingSolutions: {},
        matchingFeedback: {},

        multipleDropdownCounter: {},
        multipleDropdownOptions: {},
        multipleDropdownSolutions: {},
        multipleDropdownFeedback: {},
        essaySolutions: {},
      })
    }

    const parsedList = this.contentParser(numberedQuestions)

    return [...parsedList]
  }

  /* eslint-disable-next-line class-methods-use-this */
  questionHandler = question => {
    const { index } = question
    this.questionCounter += 1

    return [
      new Paragraph({
        children: [new TextRun({ text: `Question ${index}` })],
        style: 'questionCounter',
      }),
      ...this.contentParser(question.content),
      new Paragraph({
        children: [],
        border: {
          bottom: {
            color: 'auto',
            space: 1,
            style: BorderStyle.SINGLE,
            size: 1,
          },
        },
      }),
    ]
  }
  // #endregion question lists

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

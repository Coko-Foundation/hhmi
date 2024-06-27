/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
const fs = require('fs')
// const xml = require('xml')
const archiver = require('archiver')
const path = require('path')
const { findImages } = require('../../controllers/utils')

const {
  prepareAssessmentItem,
  prepareAssessmentTest,
  prepareManifest,
  createXmlFile,
} = require('./fileCreators')

class WaxToQTIConverter {
  #id = null
  #correctAnswers = {}

  #questionVersions = []
  #title = ''

  #baseMessage = ''

  #imageData = {}
  #packageFiles = {}

  doc = []

  // file creation methods
  #createXmlFile = null
  #prepareAssessmentItem = null
  #prepareAssessmentTest = null
  #prepareManifest = null

  constructor(questionVersions, exportId) {
    this.#baseMessage = 'WaxToQTIConverter:'

    if (questionVersions.length > 0) {
      this.#id = exportId || questionVersions[0].questionId

      // console.log(questionVersions)

      questionVersions.forEach(questionVersion => {
        if (!questionVersion || !questionVersion.content)
          this.#error(`No document provided`)

        if (questionVersion.content.type !== 'doc')
          this.#error(`Document provided is not of type "doc"`)

        if (!questionVersion.content.content)
          this.#error(`Document provided has no children`)

        if (!Array.isArray(questionVersion.content.content))
          this.#error(`Document content is not an array`)

        this.#questionVersions.push(questionVersion)
      })
    }

    this.#createXmlFile = createXmlFile
    this.#prepareAssessmentItem = prepareAssessmentItem
    this.#prepareAssessmentTest = prepareAssessmentTest
    this.#prepareManifest = prepareManifest
  }

  #error = e => {
    throw new Error(`${this.#baseMessage} ${e}`)
  }

  // #region text formaters
  #bulletListHandler = content => {
    return {
      ul: this.#contentParser(content.content),
    }
  }

  #figureHandler = content => {
    return {
      div: [
        {
          _attr: {
            role: 'figure',
          },
        },
        ...this.#contentParser(content.content),
      ],
    }
  }

  #captionHandler = content => {
    return {
      figcaption: this.#contentParser(content.content),
    }
  }

  #hardBreakHandler = () => {
    return {
      br: null,
    }
  }

  #imageHandler = content => {
    const {
      id,
      alt,
      'aria-description': ariaDescription,
      'aria-describedby': ariaDescribedBy,
    } = content.attrs

    const fileLocationIndex = this.#imageData[id].indexOf('/resources')

    return [
      {
        img: [
          {
            _attr: {
              alt,
              src: `..${this.#imageData[id].substr(fileLocationIndex)}`,
              ...(ariaDescribedBy
                ? { 'aria-describedby': ariaDescribedBy }
                : {}),
            },
          },
        ],
      },
      ...[
        ariaDescription
          ? {
              div: [
                {
                  _attr: {
                    id: ariaDescribedBy,
                    style: 'display:none',
                  },
                },
                { p: ariaDescription },
              ],
            }
          : {},
      ],
    ]
  }

  #listItemHandler = content => {
    return {
      li: this.#contentParser(content.content),
    }
  }

  #orderedListHandler = content => {
    return {
      ol: this.#contentParser(content.content),
    }
  }

  #paragraphHandler = (content, options) => {
    return {
      p: this.#contentParser(content.content, options),
    }
  }

  #tableHandler = content => {
    return {
      table: this.#contentParser(content.content),
    }
  }

  #tableCaptionHandler = content => {
    return {
      caption: this.#contentParser(content.content),
    }
  }

  #tableBodyHandler = content => {
    return {
      tbody: this.#contentParser(content.content),
    }
  }

  #tableCellHandler = content => {
    return {
      td: this.#contentParser(content.content),
    }
  }

  #tableRowHandler = content => {
    return {
      tr: this.#contentParser(content.content),
    }
  }

  #textHandler = content => {
    // check for marker (strong, italic, etc)
    const { marks } = content

    let styledText = { span: content.text }

    if (marks) {
      if (!Array.isArray(marks))
        this.#error('Text object marks should be an array')

      marks.forEach(mark => {
        if (mark.type === 'strong' || mark.type === 'bold')
          styledText = { strong: [styledText] }
        else if (mark.type === 'em' || mark.type === 'i')
          styledText = { em: [styledText] }
        else if (mark.type === 'strikethrough') styledText = { s: [styledText] }
        else if (mark.type === 'superscript') styledText = { sup: [styledText] }
        else if (mark.type === 'subscript') styledText = { sub: [styledText] }
        else if (mark.type === 'underline') styledText = { u: [styledText] }
        else if (mark.type === 'code') styledText = { code: [styledText] }
        else if (mark.type === 'link')
          styledText = {
            a: [
              {
                _attr: {
                  href: mark.attrs.href,
                  target: '_blank',
                },
              },
              styledText,
            ],
          }
      })

      return styledText
    }

    return styledText
  }
  // #endregion text formaters

  // #region question types
  // #region multiple-choice
  #multipleChoiceHandler = content => {
    const responseIdentifier = content.attrs.id

    const singleCorrect =
      content.attrs.class === 'multiple-choice-single-correct'

    this.#correctAnswers.multipleChoiceSolutions[responseIdentifier] = [
      { singleCorrect },
    ]

    return {
      choiceInteraction: [
        {
          _attr: {
            maxChoices: singleCorrect ? '1' : content.content.length - 1,
            responseIdentifier,
            shuffle: 'false',
          },
        },
        ...this.#contentParser(content.content, {
          multipleChoiceGroupId: responseIdentifier,
        }),
      ],
    }
  }

  #multipleChoiceQuestionHandler = (content, options) => {
    return {
      prompt: this.#contentParser(content.content, options),
    }
  }

  #multipleChoiceOptionHandler = (content, options) => {
    const { id, correct, feedback } = content.attrs
    const { multipleChoiceGroupId } = options

    this.#correctAnswers.multipleChoiceSolutions[multipleChoiceGroupId].push({
      id,
      correct,
      feedback,
    })

    return {
      simpleChoice: [
        {
          _attr: {
            identifier: content.attrs.id,
            fixed: 'true',
          },
        },
        ...this.#contentParser(content.content),
      ],
    }
  }
  // #endregion multiple-choice

  // #region true-false
  #trueFalseHandler = content => {
    const responseIdentifier = content.attrs.id

    const singleCorrect = content.attrs.class === 'true-false-single-correct'

    this.#correctAnswers.trueFalseSolutions[responseIdentifier] = []

    return {
      matchInteraction: [
        {
          _attr: {
            maxAssociations: content.content.length - 1,
            minAssociations: content.content.length - 1,
            responseIdentifier,
            shuffle: 'false',
          },
        },
        // the prompt
        ...this.#contentParser([content.content[0]]),
        // the set of options to be marked as true or false
        {
          simpleMatchSet: [
            ...this.#contentParser(content.content.slice(1), {
              trueFalseGroupId: responseIdentifier,
            }),
          ],
        },
        // the true/false choices
        {
          simpleMatchSet: [
            {
              simpleAssociableChoice: [
                {
                  _attr: {
                    identifier: 'false',
                    matchMax: 0,
                  },
                },
                'False',
              ],
            },
            {
              simpleAssociableChoice: [
                {
                  _attr: {
                    identifier: 'true',
                    matchMax: singleCorrect ? 1 : 0,
                  },
                },
                'True',
              ],
            },
          ],
        },
      ],
    }
  }

  #trueFalseQuestionHandler = (content, options) => {
    return {
      prompt: this.#contentParser(content.content, options),
    }
  }

  #trueFalseOptionHandler = (content, options) => {
    const { id, correct, feedback } = content.attrs
    const { trueFalseGroupId } = options

    this.#correctAnswers.trueFalseSolutions[trueFalseGroupId].push({
      id,
      correct,
      feedback,
    })

    return {
      simpleAssociableChoice: [
        {
          _attr: {
            identifier: id,
            matchMax: 1,
          },
        },
        ...this.#contentParser(content.content),
      ],
    }
  }
  // #endregion multiple-choice

  // #region fill-the-gap
  #fillTheGapContainerHandler = content => {
    const { id, feedback } = content.attrs

    this.#correctAnswers.fillTheGapSolutions[id] = [
      {
        feedback,
      },
    ]

    return {
      div: this.#contentParser(content.content, {
        fillTheGapGroupId: id,
        feedback,
      }),
    }
  }

  #fillTheGapHandler = (content, options) => {
    const { id } = content.attrs
    const { fillTheGapGroupId } = options

    this.#correctAnswers.fillTheGapSolutions[fillTheGapGroupId].push({
      id,
      correct: content.content[0].text.trim(),
    })

    return {
      textEntryInteraction: [
        {
          _attr: {
            responseIdentifier: id,
            expectedLength: content.content[0].text.trim().length,
          },
        },
      ],
    }
  }
  // #endregion fill-the-gap

  // #region matching
  #matchingContainerHanlder = content => {
    const responseIdentifier = content.attrs.id
    const matchingOptions = content.attrs.options
    const { feedback } = content.attrs

    this.#correctAnswers.matchingSolutions[responseIdentifier] = [
      {
        feedback,
      },
    ]

    return {
      matchInteraction: [
        {
          _attr: {
            maxAssociations: content.content.length - 1,
            minAssociations: content.content.length - 1,
            responseIdentifier,
            shuffle: 'false',
          },
        },
        // the statements to match
        {
          simpleMatchSet: [
            ...this.#contentParser(content.content[0].content, {
              matchingGroupId: responseIdentifier,
            }),
          ],
        },
        // the matching options
        {
          simpleMatchSet: matchingOptions.map(option => ({
            simpleAssociableChoice: [
              {
                _attr: {
                  identifier: option.value,
                  matchMax: 0,
                },
              },
              option.label,
            ],
          })),
        },
      ],
    }
  }

  #matchingOptionHandler = (content, options) => {
    const { id, correct } = content.attrs
    const { matchingGroupId } = options

    this.#correctAnswers.matchingSolutions[matchingGroupId].push({
      id,
      correct,
    })

    return {
      simpleAssociableChoice: [
        {
          _attr: {
            identifier: content.attrs.id,
            matchMax: 1,
          },
        },
        ...this.#contentParser(content.content),
      ],
    }
  }
  // #endregion matching

  // #region multiple-dropdowns
  #multipleDropdownContainerHandler = content => {
    const responseIdentifier = content.attrs.id
    const { feedback } = content.attrs

    this.#correctAnswers.multipleDropdownSolutions[responseIdentifier] = [
      {
        feedback,
      },
    ]

    return {
      div: this.#contentParser(content.content, {
        multipleDropdownGroupId: responseIdentifier,
      }),
    }
  }

  #multipleDropdownOptionHandler = (content, options) => {
    const { id, correct, options: dropdownOptions } = content.attrs
    const { multipleDropdownGroupId } = options

    this.#correctAnswers.multipleDropdownSolutions[
      multipleDropdownGroupId
    ].push({
      id,
      correct,
    })

    return {
      inlineChoiceInteraction: [
        {
          _attr: {
            responseIdentifier: id,
            shuffle: 'false',
          },
        },
        ...dropdownOptions.map(({ value, label }) => ({
          inlineChoice: [
            {
              _attr: {
                identifier: value,
              },
            },
            label,
          ],
        })),
      ],
    }
  }
  // #endregion multiple-dropdowns

  // #region essay
  #essayContainerHandler = content => {
    const responseIdentifier = content.attrs.id

    return {
      div: this.#contentParser(content.content, {
        essayGroupId: responseIdentifier,
      }),
    }
  }

  #essayQuestionHandler = (content, options) => {
    const { essayGroupId } = options
    return {
      extendedTextInteraction: [
        {
          _attr: {
            identifier: essayGroupId,
            expectedLength: 0,
            expectedLines: 0,
          },
        },
        {
          prompt: this.#contentParser(content.content),
        },
      ],
    }
  }

  #essayFeedbackHandler = (content, options) => {
    const { essayGroupId } = options

    this.#correctAnswers.essaySolutions[essayGroupId] = this.#contentParser(
      content.content,
    )
  }

  #essayAnswerHandler = (content, options) => {}
  // #endregion essay

  // #region numerical
  #numericalAnswerHandler = (content, options) => {
    const responseIdentifier = content.attrs.id

    // eslint-disable-next-line no-unused-vars
    const {
      answerType,
      feedback,
      answersPrecise: { preciseAnswer } = {},
      answersRange: { maxAnswer, minAnswer } = {},
      answersExact: { exactAnswer, marginError } = {},
    } = content.attrs

    this.#correctAnswers.numericalSolutions[responseIdentifier] = {
      answerType,
      preciseAnswer,
      maxAnswer,
      minAnswer,
      exactAnswer,
      marginError,
    }
    this.#correctAnswers.numericalFeedback = feedback

    return [
      {
        material: [
          {
            mattext: [
              {
                _attr: {
                  texttype: 'text/html',
                },
              },
              {
                div: this.#contentParser(content.content, {
                  numericalGroupId: responseIdentifier,
                }),
              },
            ],
          },
        ],
      },
      {
        response_str: [
          {
            _attr: {
              ident: responseIdentifier,
              rcardinality: 'Single',
            },
          },
          {
            render_fib: [
              {
                _attr: {
                  fibtype: 'Decimal',
                },
              },
              {
                response_label: [
                  {
                    _attr: {
                      ident: `answer-${responseIdentifier}`,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  }
  // #endregion numerical

  // #endregion question types

  #typeToHandlerMap = {
    bulletlist: this.#bulletListHandler,
    figure: this.#figureHandler,
    figcaption: this.#captionHandler,
    hard_break: this.#hardBreakHandler,
    image: this.#imageHandler,
    list_item: this.#listItemHandler,
    orderedlist: this.#orderedListHandler,
    paragraph: this.#paragraphHandler,
    table: this.#tableHandler,
    table_caption: this.#tableCaptionHandler,
    table_body: this.#tableBodyHandler,
    table_cell: this.#tableCellHandler,
    table_header: this.#tableCellHandler,
    table_row: this.#tableRowHandler,
    text: this.#textHandler,
    // question types
    multiple_choice_container: this.#multipleChoiceHandler,
    question_node_multiple: this.#multipleChoiceQuestionHandler,
    multiple_choice: this.#multipleChoiceOptionHandler,

    multiple_choice_single_correct_container: this.#multipleChoiceHandler,
    question_node_multiple_single: this.#multipleChoiceQuestionHandler,
    multiple_choice_single_correct: this.#multipleChoiceOptionHandler,

    true_false_container: this.#trueFalseHandler,
    question_node_true_false: this.#trueFalseQuestionHandler,
    true_false: this.#trueFalseOptionHandler,

    true_false_single_correct_container: this.#trueFalseHandler,
    question_node_true_false_single: this.#trueFalseQuestionHandler,
    true_false_single_correct: this.#trueFalseOptionHandler,

    fill_the_gap_container: this.#fillTheGapContainerHandler,
    fill_the_gap: this.#fillTheGapHandler,

    matching_container: this.#matchingContainerHanlder,
    matching_option: this.#matchingOptionHandler,

    multiple_drop_down_container: this.#multipleDropdownContainerHandler,
    multiple_drop_down_option: this.#multipleDropdownOptionHandler,

    essay_container: this.#essayContainerHandler,
    essay_question: this.#essayQuestionHandler,
    essay_prompt: this.#essayFeedbackHandler,
    essay_answer: this.#essayAnswerHandler,

    numerical_answer_container: this.#numericalAnswerHandler,
  }

  #findHandler = type => {
    return this.#typeToHandlerMap[type]
  }

  #contentParser = (content, options = {}) => {
    let children = []

    if (content) {
      if (!Array.isArray(content))
        throw new Error('Content needs to be an array')
      else
        content.forEach(item => {
          const { type } = item
          const handler = this.#findHandler(type)

          if (!handler) throw new Error(`Unknown content type "${type}"`)

          const childrenToAdd = handler(item, options)
          // handlers could return a single item or an array of items
          children = children.concat(childrenToAdd)
        })
    }

    return children
  }

  #createModaFeedback = id => {
    return [
      {
        _attr: {
          outcomeIdentifier: 'FEEDBACK',
          identifier: id,
          showHide: 'show',
        },
      },
    ]
  }

  #feedbackParser = () => {
    const responses = []

    const multipleChoiceSolutionKeys = Object.keys(
      this.#correctAnswers.multipleChoiceSolutions,
    )

    const trueFalseSolutionKeys = Object.keys(
      this.#correctAnswers.trueFalseSolutions,
    )

    const fillTheGapSolutionsKeys = Object.keys(
      this.#correctAnswers.fillTheGapSolutions,
    )

    const matchingSolutionsKeys = Object.keys(
      this.#correctAnswers.matchingSolutions,
    )

    const multipleDropdownSolutionsKeys = Object.keys(
      this.#correctAnswers.multipleDropdownSolutions,
    )

    const essaySolutionsKeys = Object.keys(this.#correctAnswers.essaySolutions)

    const numericalSolutionKeys = Object.keys(
      this.#correctAnswers.numericalSolutions,
    )

    let singleCorrect

    if (multipleChoiceSolutionKeys.length) {
      singleCorrect =
        this.#correctAnswers.multipleChoiceSolutions[
          multipleChoiceSolutionKeys[0]
        ].singleCorrect

      responses.push({
        responseProcessing: [
          {
            _attr: {
              template:
                'http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct',
            },
          },
        ],
      })

      const responseDeclaration = [
        {
          _attr: {
            baseType: 'identifier',
            cardinality: singleCorrect ? 'single' : 'multiple',
            identifier: multipleChoiceSolutionKeys,
          },
        },
        {
          correctResponse: [],
        },
        {
          mapping: [],
        },
      ]

      const modalFeedback = this.#createModaFeedback('general_comments')

      multipleChoiceSolutionKeys.forEach((groupId, i) => {
        const groupSolutions =
          this.#correctAnswers.multipleChoiceSolutions[groupId]

        groupSolutions.slice(1).forEach(({ id, correct, feedback }, index) => {
          if (correct) {
            responseDeclaration[1].correctResponse.push({
              value: id,
            })
          }

          responseDeclaration[2].mapping.push({
            mapEntry: [
              {
                _attr: {
                  mapKey: id,
                  mappedValue: correct ? '1' : '0',
                },
              },
            ],
          })

          if (feedback) {
            modalFeedback.push({
              p: `Option ${index + 1}: ${feedback}`,
            })
          }
        })

        responseDeclaration[2].mapping.push({
          _attr: {
            lowerBound: '0',
            defaultValue: '0',
            upperBound: groupSolutions.slice(1).filter(o => o.correct)?.length,
          },
        })
      })

      responses.push({ responseDeclaration })

      responses.push({ modalFeedback })
    }

    if (trueFalseSolutionKeys.length) {
      const responseDeclaration = [
        {
          _attr: {
            baseType: 'directedPair',
            cardinality: 'multiple',
            identifier: trueFalseSolutionKeys,
          },
        },
        {
          correctResponse: [],
        },
        {
          mapping: [
            {
              _attr: {
                defaultValue: 0,
              },
            },
          ],
        },
      ]

      responses.push({
        responseProcessing: [
          {
            _attr: {
              template:
                'http://www.imsglobal.org/question/qti_v2p1/rptemplates/map_response',
            },
          },
        ],
      })

      const modalFeedback = this.#createModaFeedback('general_comments')

      trueFalseSolutionKeys.forEach((groupId, i) => {
        this.#correctAnswers.trueFalseSolutions[groupId].forEach(
          ({ id, correct, feedback }, index) => {
            responseDeclaration[1].correctResponse.push({
              value: `${id} ${correct}`,
            })

            responseDeclaration[2].mapping.push({
              mapEntry: [
                {
                  _attr: {
                    mapKey: `${id} ${correct}`,
                    mappedValue: '1',
                  },
                },
              ],
            })

            if (feedback) {
              const feedbackObject = {
                p: `Option ${index + 1}: ${feedback}`,
              }

              modalFeedback.push(feedbackObject)
            }
          },
        )
      })

      responses.push({ responseDeclaration })

      responses.push({ modalFeedback })
    }

    if (fillTheGapSolutionsKeys.length) {
      responses.push({
        responseProcessing: [
          {
            _attr: {
              template:
                'http://www.imsglobal.org/question/qti_v2p1/rptemplates/map_response',
            },
          },
        ],
      })

      this.#correctAnswers.fillTheGapSolutions[fillTheGapSolutionsKeys]
        .slice(1)
        .forEach(({ correct, id }) => {
          const responseDeclaration = [
            {
              _attr: {
                baseType: 'string',
                cardinality: 'single',
                identifier: id,
              },
            },
            {
              correctResponse: [
                {
                  value: correct,
                },
              ],
            },
            {
              mapping: [
                {
                  _attr: {
                    defaultValue: 0,
                  },
                },
                {
                  mapEntry: [
                    {
                      _attr: {
                        mapKey: correct,
                        mappedValue: 1,
                        caseSensitive: false,
                      },
                    },
                  ],
                },
              ],
            },
          ]

          responses.push({ responseDeclaration })
        })

      const modalFeedback = this.#createModaFeedback('general_comments')

      const feedbackObject = [
        {
          p: this.#correctAnswers.fillTheGapSolutions[
            fillTheGapSolutionsKeys
          ][0].feedback,
        },
        {
          p: '',
        },
      ]

      modalFeedback.push(...feedbackObject)

      responses.push({ modalFeedback })
    }

    if (matchingSolutionsKeys.length) {
      const responseDeclaration = [
        {
          _attr: {
            baseType: 'directedPair',
            cardinality: 'multiple',
            identifier: matchingSolutionsKeys,
          },
        },
        {
          correctResponse: [],
        },
        {
          mapping: [
            {
              _attr: {
                defaultValue: 0,
                lowerBound: 0,
                upperBound:
                  this.#correctAnswers.matchingSolutions[matchingSolutionsKeys]
                    .length,
              },
            },
          ],
        },
      ]

      matchingSolutionsKeys.forEach(groupId => {
        this.#correctAnswers.matchingSolutions[groupId]
          .slice(1)
          .forEach(({ id, correct }) => {
            responseDeclaration[1].correctResponse.push({
              value: `${id} ${correct}`,
            })

            responseDeclaration[2].mapping.push({
              mapEntry: [
                {
                  _attr: {
                    mapKey: `${id} ${correct}`,
                    mappedValue: '1',
                  },
                },
              ],
            })
          })
      })

      responses.push({
        responseDeclaration,
      })

      const modalFeedback = this.#createModaFeedback('general_comments')

      const feedbackObject = [
        {
          p: this.#correctAnswers.matchingSolutions[matchingSolutionsKeys][0]
            .feedback,
        },
        {
          p: '',
        },
      ]

      modalFeedback.push(...feedbackObject)

      responses.push({ modalFeedback })
    }

    if (multipleDropdownSolutionsKeys.length) {
      responses.push({
        responseProcessing: [
          {
            _attr: {
              template:
                'http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct',
            },
          },
        ],
      })

      this.#correctAnswers.multipleDropdownSolutions[
        multipleDropdownSolutionsKeys
      ]
        .slice(1)
        .forEach(({ correct, id }) => {
          const responseDeclaration = [
            {
              _attr: {
                baseType: 'identifier',
                cardinality: 'single',
                identifier: id,
              },
            },
            {
              correctResponse: [
                {
                  value: correct,
                },
              ],
            },
            {
              mapping: [
                {
                  _attr: {
                    defaultValue: 0,
                  },
                },
                {
                  mapEntry: [
                    {
                      _attr: {
                        mapKey: correct,
                        mappedValue: '1',
                      },
                    },
                  ],
                },
              ],
            },
          ]

          responses.push({ responseDeclaration })
        })

      const modalFeedback = this.#createModaFeedback('general_comments')

      const feedbackObject = [
        {
          p: this.#correctAnswers.multipleDropdownSolutions[
            multipleDropdownSolutionsKeys
          ][0].feedback,
        },
        {
          p: '',
        },
      ]

      modalFeedback.push(...feedbackObject)

      responses.push({ modalFeedback })
    }

    if (essaySolutionsKeys.length) {
      const responseDeclaration = [
        {
          _attr: {
            baseType: 'identifier',
            cardinality: 'single',
            identifier: essaySolutionsKeys[0],
          },
        },
      ]

      responses.push({ responseDeclaration })

      const modalFeedback = this.#createModaFeedback('general_comments')

      modalFeedback.push(
        ...this.#correctAnswers.essaySolutions[essaySolutionsKeys],
      )

      responses.push({ modalFeedback })
    }

    if (numericalSolutionKeys.length) {
      const {
        answerType,
        preciseAnswer,
        minAnswer,
        maxAnswer,
        exactAnswer,
        marginError,
      } = this.#correctAnswers.numericalSolutions[numericalSolutionKeys[0]]

      // variables for precise answer convertion
      let additionalDigits
      let lowerBound
      let upperBound

      switch (answerType) {
        case 'preciseAnswer':
          additionalDigits = 10 - preciseAnswer.length

          lowerBound =
            Number(Number(preciseAnswer).toFixed(additionalDigits)) -
            Number(5 / 10 ** additionalDigits)

          upperBound =
            Number(Number(preciseAnswer).toFixed(additionalDigits)) +
            Number(5 / 10 ** additionalDigits)

          responses.push({
            respcondition: [
              {
                _attr: {
                  continue: 'no',
                },
              },
              {
                conditionvar: [
                  {
                    or: [
                      {
                        varequal: [
                          {
                            _attr: {
                              respident: numericalSolutionKeys[0],
                            },
                          },
                          preciseAnswer,
                        ],
                      },
                      {
                        and: [
                          {
                            vargt: [
                              {
                                _attr: {
                                  respident: numericalSolutionKeys[0],
                                },
                              },
                              lowerBound,
                            ],
                          },
                          {
                            varlte: [
                              {
                                _attr: {
                                  respident: numericalSolutionKeys[0],
                                },
                              },
                              upperBound,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          })
          break
        case 'rangeAnswer':
          responses.push({
            respcondition: [
              {
                _attr: {
                  continue: 'no',
                },
              },
              {
                conditionvar: [
                  {
                    vargte: [
                      {
                        _attr: {
                          respident: numericalSolutionKeys[0],
                        },
                      },
                      minAnswer,
                    ],
                  },
                  {
                    varlte: [
                      {
                        _attr: {
                          respident: numericalSolutionKeys[0],
                        },
                      },
                      maxAnswer,
                    ],
                  },
                ],
              },
            ],
          })
          break
        case 'exactAnswer':
          responses.push({
            respcondition: [
              {
                _attr: {
                  continue: 'no',
                },
              },
              {
                conditionvar: [
                  {
                    or: [
                      {
                        varequal: [
                          {
                            _attr: {
                              respident: numericalSolutionKeys[0],
                            },
                          },
                          exactAnswer,
                        ],
                      },
                      {
                        and: [
                          {
                            vargte: [
                              {
                                _attr: {
                                  respident: numericalSolutionKeys[0],
                                },
                              },
                              Number(exactAnswer) -
                                Number(
                                  (Math.abs(exactAnswer) * marginError) / 100,
                                ),
                            ],
                          },
                          {
                            varlte: [
                              {
                                _attr: {
                                  respident: numericalSolutionKeys[0],
                                },
                              },
                              Number(exactAnswer) +
                                Number(
                                  (Math.abs(exactAnswer) * marginError) / 100,
                                ),
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          })
          break
        default:
          break
      }

      // push numerical answer feedback
      responses.push({
        flow_mat: [
          {
            material: [
              {
                mattext: [
                  {
                    _attr: {
                      texttype: 'text/html',
                    },
                  },
                  {
                    div: this.#correctAnswers.numericalFeedback,
                  },
                ],
              },
            ],
          },
        ],
      })
    }

    return responses
  }

  buildQtiExport = async () => {
    const dir = path.join(__dirname, '..', '..', 'tmp', this.#id)

    try {
      if (this.#questionVersions.length === 0) {
        throw new Error('NoQuestionsToExport')
      }

      fs.mkdirSync(`${dir}/content/`, { recursive: true })
      fs.mkdirSync(`${dir}/resources/`, { recursive: true })

      // eslint-disable-next-line no-restricted-syntax
      for await (const question of this.#questionVersions) {
        // initialize imageData for question
        this.#imageData = {}
        this.#correctAnswers = {
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

          numericalSolutions: {},
          numericalFeedback: {},
        }

        await Promise.all(
          question.content.content.map(async node =>
            findImages(node, this.#imageData, `${dir}/resources/`),
          ),
        )

        this.#packageFiles[question.questionId] = {
          assessmentItems: [],
          assets: [],
        }

        this.#packageFiles[question.questionId].assets.push(
          ...Object.keys(this.#imageData).map(
            imageId =>
              `${this.#imageData[imageId].substr(
                this.#imageData[imageId].indexOf('resources/'),
              )}`,
            // `resources/${imageId}`,
          ),
        )

        const assessmentItem = this.#prepareAssessmentItem(question)

        if (question.questionType === 'numerical') {
          assessmentItem.questestinterop[1].item[2].presentation.push(
            ...this.#contentParser(question.content.content),
          )
          // assessmentItem.questestinterop[1].item[2].presentation[0].material[0].mattext.push(
          //   ...this.#contentParser(question.content.content),
          // )
          const numericalFeedback = this.#feedbackParser()
          assessmentItem.questestinterop[1].item[3].resprocessing.push(
            numericalFeedback[0],
          )
          assessmentItem.questestinterop[1].item[4].itemfeedback.push(
            numericalFeedback[1],
          )
        } else {
          assessmentItem.assessmentItem[3].itemBody = this.#contentParser(
            question.content.content,
          )

          assessmentItem.assessmentItem.push(...this.#feedbackParser())
        }

        this.#createXmlFile(
          assessmentItem,
          `${dir}/content/${question.questionId}.xml`,
        )

        this.#packageFiles[question.questionId].assessmentItems.push(
          `content/${question.questionId}.xml`,
        )
      }

      const itemResources = {
        resources: [],
      }

      if (this.#questionVersions.length > 1) {
        // create assessmentText.xml
        const assessmentTest = this.#prepareAssessmentTest(
          this.#id,
          this.#packageFiles,
        )

        this.#createXmlFile(assessmentTest, `${dir}/test-${this.#id}.xml`)

        itemResources.resources.push({
          resource: [
            {
              _attr: {
                type: 'imsqti_test_xmlv2p1',
                href: `test-${this.#id}.xml`,
                identifier: this.#id, // this may be a reason for it to fail
              },
            },
            {
              file: [
                {
                  _attr: {
                    href: `test-${this.#id}.xml`,
                  },
                },
              ],
            },
          ],
        })
      }

      // clean up resources folder if there are no assets (images) in it
      await fs.promises.readdir(`${dir}/resources/`).then(files => {
        if (files.length === 0) {
          fs.rmdirSync(`${dir}/resources/`)
        }
      })

      const jsonManifest = this.#prepareManifest(
        this.#id,
        this.#title,
        this.#questionVersions[0].questionType === 'numerical',
      )

      itemResources.resources = [
        ...itemResources.resources,
        ...[
          ...Object.keys(this.#packageFiles).map(resourceId => {
            return {
              resource: [
                {
                  _attr: {
                    // eslint-disable-next-line no-nested-ternary
                    type: this.#packageFiles[resourceId].test
                      ? 'imsqti_test_xmlv2p1'
                      : this.#questionVersions[0].questionType === 'numerical'
                      ? 'imsqti_xmlv1p2'
                      : 'imsqti_item_xmlv2p1',
                    href: `${
                      this.#packageFiles[resourceId].assessmentItems[0]
                    }`,
                    identifier: resourceId,
                  },
                },
                {
                  file: [
                    {
                      _attr: {
                        href: `${
                          this.#packageFiles[resourceId].assessmentItems[0]
                        }`,
                      },
                    },
                  ],
                },
                ...this.#packageFiles[resourceId].assets.map(imageLocation => ({
                  file: [
                    {
                      _attr: {
                        href: `${imageLocation}`,
                      },
                    },
                  ],
                })),
              ],
            }
          }),
        ],
      ]

      jsonManifest.manifest.push(itemResources)

      this.#createXmlFile(jsonManifest, `${dir}/imsmanifest.xml`)

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
      return `${this.#id}.zip`
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }
}

module.exports = WaxToQTIConverter

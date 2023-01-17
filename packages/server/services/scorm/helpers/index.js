/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-undef
const { PropTypes } = window
// eslint-disable-next-line no-undef
const { useState, useEffect } = React

// eslint-disable-next-line no-undef
const api = getAPI()

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

const answerTypes = [
  'true_false',
  'multiple_choice',
  'true_false_single_correct',
  'multiple_choice_single_correct',
]

const MarkItem = props => {
  const { text, marks } = props

  if (!marks.length) return text

  const [mark, ...otherMarks] = marks

  if (mark.type === 'link') {
    const protocol = mark.attrs.href.slice(0, 5)
    let link = ''

    if (protocol === 'https') {
      link = mark.attrs.href.slice(8)
    } else if (protocol === 'http/') {
      link = mark.attrs.href.slice(7)
    } else {
      link = mark.attrs.href
    }

    return (
      <a href={`//${link}`} rel="external" target={`_${mark.attrs.target}`}>
        <MarkItem marks={otherMarks} text={text} />
      </a>
    )
  }

  if (mark.type === 'strikethrough') {
    return (
      <span
        className={mark.attrs.class}
        style={{ textDecorationLine: 'line-through' }}
      >
        <MarkItem marks={otherMarks} text={text} />
      </span>
    )
  }

  if (mark.type === 'underline') {
    return (
      <u>
        <MarkItem marks={otherMarks} text={text} />
      </u>
    )
  }

  if (mark.type === 'subscript') {
    return (
      <sub>
        <MarkItem marks={otherMarks} text={text} />
      </sub>
    )
  }

  if (mark.type === 'superscript') {
    return (
      <sup>
        <MarkItem marks={otherMarks} text={text} />
      </sup>
    )
  }

  if (mark.type === 'smallcaps') {
    return (
      <span className={mark.attrs.class}>
        <MarkItem marks={otherMarks} text={text} />
      </span>
    )
  }

  if (mark.type === 'strong') {
    return (
      <strong>
        <MarkItem marks={otherMarks} text={text} />
      </strong>
    )
  }

  if (mark.type === 'em') {
    return (
      <em>
        <MarkItem marks={otherMarks} text={text} />
      </em>
    )
  }

  if (mark.type === 'code') {
    return (
      <code>
        <MarkItem marks={otherMarks} text={text} />
      </code>
    )
  }

  return ''
}

const ContentItem = props => {
  const { contentArray, handleAnswer, state, options } = props

  if (!Array.isArray(contentArray)) return ''
  return contentArray.map(contentItem => {
    if (
      contentItem.type === 'text' &&
      typeof contentItem.marks === 'undefined'
    ) {
      return <span>{contentItem.text}</span>
    }

    if (contentItem.type === 'text') {
      return <MarkItem marks={contentItem.marks} text={contentItem.text} />
    }

    if (contentItem.type === 'paragraph' && contentItem.content === undefined) {
      return <br />
    }

    if (contentItem.type === 'paragraph' && options.textOnly) {
      return <ContentItem contentArray={contentItem.content} />
    }

    if (contentItem.type === 'paragraph' && !options.isRadio) {
      return (
        <p className={contentItem.attrs.class}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            options={options}
            state={state}
          />
        </p>
      )
    }

    if (contentItem.type === 'paragraph' && options.isRadio) {
      return null
    }

    let currentResponses = state.find(r => `q${options.containerId}` in r)

    if (
      contentItem.type === 'true_false_container' ||
      contentItem.type === 'multiple_choice_container'
    ) {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            options={{ containerId: contentItem.attrs.id }}
            state={state}
          />
        </div>
      )
    }

    if (
      contentItem.type === 'question_node_true_false' ||
      contentItem.type === 'question_node_multiple'
    ) {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            state={state}
          />
        </div>
      )
    }

    if (
      contentItem.type === 'true_false_single_correct_container' ||
      contentItem.type === 'multiple_choice_single_correct_container'
    ) {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem contentArray={contentItem.content} />
          <div
            onChange={e =>
              handleAnswer(e, {
                containerId: contentItem.attrs.id,
                type: 'single',
              })
            }
          >
            <ContentItem
              contentArray={contentItem.content}
              options={{ containerId: contentItem.attrs.id, isRadio: true }}
              state={state}
            />
          </div>
        </div>
      )
    }

    if (
      (contentItem.type === 'question_node_true_false_single' ||
        contentItem.type === 'question_node_multiple_single') &&
      !options.isRadio
    ) {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            state={state}
          />
        </div>
      )
    }

    if (
      contentItem.type === 'true_false' ||
      contentItem.type === 'multiple_choice'
    ) {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <input
              checked={currentResponses[`q${options.containerId}`].includes(
                contentItem.attrs.id,
              )}
              id={contentItem.attrs.id}
              name={options.containerId}
              onChange={e =>
                handleAnswer(e, {
                  containerId: options.containerId,
                  type: 'multi',
                })
              }
              type="checkbox"
              value={contentItem.attrs.id}
            />
            <ContentItem
              contentArray={contentItem.content}
              options={{ textOnly: true }}
            />
          </label>
        </div>
      )
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
      return (
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <input
              id={contentItem.attrs.id}
              name={options.containerId}
              type="radio"
              value={contentItem.attrs.id}
            />
            <ContentItem
              contentArray={contentItem.content}
              options={{ textOnly: true }}
            />
          </label>
        </div>
      )
    }

    if (contentItem.type === 'orderedlist') {
      return (
        <ol>
          <ContentItem contentArray={contentItem.content} />
        </ol>
      )
    }

    if (contentItem.type === 'bulletlist') {
      return (
        <ul>
          <ContentItem contentArray={contentItem.content} />
        </ul>
      )
    }

    if (contentItem.type === 'list_item') {
      return (
        <li>
          <ContentItem contentArray={contentItem.content} />
        </li>
      )
    }

    if (contentItem.type === 'table') {
      return (
        <table>
          <tbody>
            <ContentItem contentArray={contentItem.content} />
          </tbody>
        </table>
      )
    }

    if (contentItem.type === 'table_row') {
      return (
        <tr>
          <ContentItem contentArray={contentItem.content} />
        </tr>
      )
    }

    if (contentItem.type === 'table_cell') {
      return (
        <td
          colSpan={contentItem.attrs.colspan}
          rowSpan={contentItem.attrs.rowspan}
        >
          <ContentItem contentArray={contentItem.content} />
        </td>
      )
    }

    if (
      contentItem.type === 'essay_container' ||
      contentItem.type === 'essay_question'
    ) {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            options={options}
            state={state}
          />
        </div>
      )
    }

    if (contentItem.type === 'essay_answer') {
      currentResponses = state.find(r => `q${contentItem.attrs.id}` in r)
      return (
        <div className={contentItem.attrs.class}>
          <textarea
            id={contentItem.attrs.id}
            onChange={e =>
              handleAnswer(e, {
                containerId: contentItem.attrs.id,
                type: 'single',
              })
            }
            placeholder="Type your essay answer"
            value={currentResponses[`q${contentItem.attrs.id}`][0]}
          />
          <ContentItem contentArray={contentItem.content} />
        </div>
      )
    }

    if (contentItem.type === 'fill_the_gap_container') {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            options={options}
            state={state}
          />
        </div>
      )
    }

    if (contentItem.type === 'fill_the_gap' && options.textOnly) {
      return (
        <ContentItem
          contentArray={contentItem.content}
          handleAnswer={handleAnswer}
          options={options}
          state={state}
        />
      )
    }

    if (contentItem.type === 'fill_the_gap') {
      currentResponses = state.find(r => `q${contentItem.attrs.id}` in r)
      return (
        <span className="portal">
          <input
            id={contentItem.attrs.id}
            onChange={e =>
              handleAnswer(e, {
                containerId: contentItem.attrs.id,
                type: 'single',
              })
            }
            type="text"
            value={currentResponses[`q${contentItem.attrs.id}`][0]}
          />
        </span>
      )
    }

    if (contentItem.type === 'multiple_drop_down_container') {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            options={options}
            state={state}
          />
        </div>
      )
    }

    if (contentItem.type === 'multiple_drop_down_option' && options.textOnly) {
      const correctAnswer = contentItem.attrs.options.filter(
        option => option.value === contentItem.attrs.correct,
      )

      return `${correctAnswer.length ? correctAnswer[0].label : ''}`
    }

    if (contentItem.type === 'multiple_drop_down_option') {
      currentResponses = state.find(r => `q${contentItem.attrs.id}` in r)
      return (
        <select
          className={contentItem.attrs.class}
          defaultValue="DEFAULT"
          id={contentItem.attrs.id}
          onChange={e =>
            handleAnswer(e, {
              containerId: contentItem.attrs.id,
              type: 'single',
            })
          }
          value={currentResponses[`q${contentItem.attrs.id}`][0]}
        >
          <option disabled value="DEFAULT">
            Select option
          </option>
          {contentItem.attrs.options.map(option => {
            return <option value={option.value}>{option.label}</option>
          })}
        </select>
      )
    }

    if (contentItem.type === 'matching_container') {
      return (
        <div className={contentItem.attrs.class} id={contentItem.attrs.id}>
          <ContentItem
            contentArray={contentItem.content}
            handleAnswer={handleAnswer}
            options={options}
            state={state}
          />
        </div>
      )
    }

    if (contentItem.type === 'matching_option' && options.textOnly) {
      const correctAnswer = contentItem.attrs.options.filter(
        option => option.value === contentItem.attrs.correct,
      )

      return (
        <span>
          <ContentItem
            contentArray={contentItem.content}
            options={{ textOnly: true }}
          />{' '}
          {correctAnswer.length ? correctAnswer[0].label : ''}
          <br />
        </span>
      )
    }

    if (contentItem.type === 'matching_option') {
      currentResponses = state.find(r => `q${contentItem.attrs.id}` in r)
      return (
        <div className={contentItem.attrs.class}>
          <ContentItem contentArray={contentItem.content} />
          <select
            defaultValue="DEFAULT"
            id={contentItem.attrs.id}
            onChange={e =>
              handleAnswer(e, {
                containerId: contentItem.attrs.id,
                type: 'single',
              })
            }
            value={currentResponses[`q${contentItem.attrs.id}`][0]}
          >
            <option disabled value="DEFAULT">
              Select option
            </option>
            {contentItem.attrs.options.map(option => {
              return <option value={option.value}>{option.label}</option>
            })}
          </select>
        </div>
      )
    }

    if (contentItem.type === 'figure') {
      return (
        <figure>
          <ContentItem contentArray={contentItem.content} />
        </figure>
      )
    }

    if (contentItem.type === 'image') {
      return <img alt={contentItem.attrs.alt} src={contentItem.attrs.src} />
    }

    if (contentItem.type === 'figcaption') {
      return (
        <figcaption className={contentItem.attrs.class}>
          <ContentItem contentArray={contentItem.content} />
        </figcaption>
      )
    }

    return ''
  })
}

const Index = props => {
  const { content } = props

  const [correctAnswers, setCorrectAnswers] = useState([])
  const [responses, setResponses] = useState([])
  const [feedback, setFeedback] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const qids = []
    const answers = []
    const fb = []

    if (Array.isArray(content)) {
      content.forEach(container => {
        if (answerContainers.includes(container.type)) {
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

            container.content.forEach(contentItem => {
              const options =
                contentItem.content !== undefined
                  ? contentItem.content.filter(
                      item => item.type === contentType,
                    )
                  : []

              options.forEach(option => {
                qids.push(option.attrs.id)

                const newCorrectAnswer = {
                  containerType:
                    container.type === 'fill_the_gap_container'
                      ? 'value'
                      : 'id',
                  containerId: option.attrs.id,
                  answerType: 'single',
                  answers: [
                    {
                      content:
                        container.type === 'fill_the_gap_container'
                          ? getFillTheGapAnswer(container)
                          : option.attrs.correct,
                      correct: true,
                    },
                  ],
                }

                answers.push(newCorrectAnswer)
              })
            })

            const fullQuestionText = container.content.map(contentItem => {
              return (
                <span>
                  <ContentItem
                    contentArray={contentItem.content}
                    options={{ textOnly: true, noNewLine: true }}
                  />{' '}
                </span>
              )
            })

            fb.push({
              responseId: container.attrs.id,
              questionText: fullQuestionText,
              feedbackText: container.attrs.feedback,
            })
          } else if (container.type === 'essay_container') {
            const essayAnswerContainer = container.content.filter(
              contentItem => contentItem.type === 'essay_answer',
            )[0]

            qids.push(essayAnswerContainer.attrs.id)

            answers.push({
              containerType: 'essay',
              containerId: essayAnswerContainer.attrs.id,
              answerType: 'single',
              answers: [],
            })
          } else {
            const responsesForType = container.content.filter(response =>
              answerTypes.includes(response.type),
            )

            const answerContent = container.content.filter(
              contentItem => answerTypes.includes(contentItem.type), // && contentItem.attrs.correct,
            )

            const answerIds = answerContent.map(answer => {
              return { content: answer.attrs.id, correct: answer.attrs.correct }
            })

            qids.push(container.attrs.id)

            const isMulti =
              container.type === 'true_false_container' ||
              container.type === 'multiple_choice_container'

            answers.push({
              containerType: 'id',
              containerId: container.attrs.id,
              answerType: isMulti ? 'multi' : 'single',
              answers: answerIds,
            })

            responsesForType.map(response =>
              fb.push({
                responseId: response.attrs.id,
                questionText: container.content.length ? (
                  <span>
                    <ContentItem
                      contentArray={container.content[0].content}
                      options={{ textOnly: true }}
                    />{' '}
                    -{' '}
                    <ContentItem
                      contentArray={response.content}
                      options={{ textOnly: true }}
                    />
                  </span>
                ) : (
                  ''
                ),
                feedbackText: response.attrs.feedback,
              }),
            )
          }
        }
      })
    }

    setCorrectAnswers(answers)
    setFeedback(fb)

    const formattedQuestionIds = qids.map(questionId => ({
      [`q${questionId}`]: [],
    }))

    setResponses(formattedQuestionIds)

    setReady(true)

    return () => {
      api.LMSFinish('')
    }
  }, [])

  const getFillTheGapAnswer = container => {
    return container.content[0].content.find(c => c.type === 'fill_the_gap')
      .content[0].text
  }

  const handleSubmit = () => {
    let score = 0
    let total = 0

    correctAnswers.forEach(container => {
      // eslint-disable-next-line react/destructuring-assignment
      const userResponses = responses.find(
        r => `q${container.containerId}` in r,
      )[`q${container.containerId}`]

      if (container.containerType === 'id') {
        if (container.answerType === 'single') {
          container.answers.forEach(correctAnswerId => {
            total += correctAnswerId.correct ? 1 : 0
            score += userResponses.includes(correctAnswerId.content) ? 1 : 0
          })
        } else {
          const containerCorrectAnswers = container.answers.filter(
            answer => answer.correct,
          )

          const containerIncorrectAnswers = container.answers.filter(
            answer => !answer.correct,
          )

          total += container.answers.length

          // check if correct are selected
          containerCorrectAnswers.forEach(answer => {
            score += userResponses.includes(answer.content) ? 1 : 0
          })

          // check if incorrect are not selected
          containerIncorrectAnswers.forEach(answer => {
            score += !userResponses.includes(answer.content) ? 1 : 0
          })
        }
      } else if (container.containerType === 'value') {
        total += 1
        score += userResponses.includes(container.answers[0].content) ? 1 : 0
      } else if (container.containerType === 'essay') {
        total += 1
        score += userResponses.length && userResponses[0].length ? 1 : 0
      }
    })

    const didPass = score === total
    api.LMSSetValue('cmi.core.score.raw', score)
    api.LMSSetValue('cmi.core.score.min', '0')
    api.LMSSetValue('cmi.core.score.max', total.toString())
    // this.api.LMSSetValue("cmi.core.lesson_status", "completed");
    api.LMSSetValue('cmi.core.lesson_status', didPass ? 'passed' : 'failed')
    api.LMSSetValue('cmi.core.exit', '')
    setSubmitted(true)
  }

  const handleAnswer = (event, options = {}) => {
    const { containerId, type } = options
    const { id } = event.target

    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    const selectedValues = responses.find(r => `q${options.containerId}` in r)

    const restResponses = responses.filter(
      otherResponse => otherResponse[`q${options.containerId}`] === undefined,
    )

    if (type === 'multi') {
      selectedValues['q'.concat(containerId)] = value
        ? [...selectedValues['q'.concat(containerId)], id]
        : selectedValues['q'.concat(containerId)].filter(
            selected => selected !== id,
          )
    } else if (type === 'single') {
      selectedValues['q'.concat(containerId)] = [value]
    }

    setResponses([...restResponses, selectedValues])
  }

  if (!api) {
    return 'Failed to connect to API'
  }

  if (!ready) {
    return 'Loading'
  }

  return (
    <div>
      {!submitted && (
        <form>
          <ContentItem
            contentArray={content}
            handleAnswer={handleAnswer}
            state={responses}
          />
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
          {/* <input type="submit" value="Submit" /> */}
        </form>
      )}
      {submitted && (
        <div>
          <h1>Feedback</h1>
          <br />
          {feedback.map(({ responseId, questionText, feedbackText }) => (
            <div key={responseId}>
              <h3>{questionText}</h3>
              <p className="paragraph">{feedbackText}</p>
            </div>
          ))}
          {feedback.forEach(fb => (
            <div>
              {fb.questionText}
              <p className="paragraph">{fb.feedback}</p>
            </div>
          ))}
          <br />
          <p>You can safely exit the test. Your score has been saved.</p>
        </div>
      )}
    </div>
  )
}

MarkItem.propTypes = {
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ).isRequired,
  text: PropTypes.string.isRequired,
}

ContentItem.propTypes = {
  contentArray: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      attrs: PropTypes.shape({
        class: PropTypes.string,
        id: PropTypes.string,
      }),
    }),
  ).isRequired,
  handleAnswer: PropTypes.func,
  state: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)),
  options: PropTypes.shape({
    isRadio: PropTypes.bool,
  }),
}

ContentItem.defaultProps = {
  handleAnswer: () => {},
  state: [],
  options: {},
}

Index.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      attrs: PropTypes.shape({
        class: PropTypes.string,
        id: PropTypes.string,
      }),
    }),
  ).isRequired,
}

const renderPage = async () => {
  api.LMSInitialize('')

  const contentRes = await fetch('./doc.json')
  const content = await contentRes.json()

  const domContainer = document.querySelector('#contentWrapper')
  // eslint-disable-next-line no-undef
  const root = ReactDOM.createRoot(domContainer)
  root.render(<Index content={content} />)
}

renderPage()

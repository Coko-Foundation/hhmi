import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'

const Wrapper = styled.div`
  overflow-y: auto;
  padding: ${grid(4)};
`

const StyledDetails = styled.details`
  summary {
    cursor: pointer;
    margin-bottom: 1em;

    /* &:hover, */
    &:focus {
      outline: 1px solid ${th('colorPrimary')};
    }
  }

  ol {
    padding-left: 15px;
  }
`

const MetadataInfo = props => {
  const { values, metadata, resources } = props

  const aggregateTopicsAndSubtopics = topics =>
    topics
      .map(topic => {
        const topicObject = metadata.topics.find(t => t.value === topic?.topic)

        const subtopicObject = topicObject?.subtopics.find(
          s => s.value === topic.subtopic,
        )

        return {
          topic: topicObject.label,
          subtopic: subtopicObject.label,
        }
      })
      .reduce(
        (accumulator, topic, index, array) => {
          return {
            topics: `${accumulator.topics}${topic.topic}${
              index < array.length - 1 ? ', ' : ''
            }`,
            subtopics: `${accumulator.subtopics}${topic.subtopic}${
              index < array.length - 1 ? ', ' : ''
            }`,
          }
        },
        { topics: '', subtopics: '' },
      )

  return (
    <Wrapper>
      <p>
        <strong>Question type</strong>
      </p>
      <p>
        {
          metadata.questionTypes.find(
            qType => qType.value === values.questionType,
          )?.label
        }
      </p>
      <p>
        <strong>Topic(s)</strong>
      </p>
      <p>{aggregateTopicsAndSubtopics(values.topics).topics}</p>
      <p>
        <strong>Subtopic(s)</strong>
      </p>
      <p>{aggregateTopicsAndSubtopics(values.topics).subtopics}</p>
      <p>
        <strong>Courses</strong>
      </p>
      {values.courses.map(course => {
        const courseObject = metadata.frameworks.find(
          f => f.value === course.course,
        )

        const courseUnits = course.units.map(unitData => {
          const unit = courseObject.units.find(u => u.value === unitData.unit)

          const courseTopic = courseObject.topics.find(
            u => u.value === unitData.courseTopic,
          )

          let additionalCourseMeta

          if (
            course.course === 'apBiology' ||
            course.course === 'apEnvironmentalScience'
          ) {
            const learningObjective = courseObject.learningObjectives.find(
              l => l.value === unitData.learningObjective,
            )

            const essentialKnowledge = courseObject.essentialKnowledge.find(
              e => e.value === unitData.essentialKnowledge,
            )

            additionalCourseMeta = (
              <>
                <p>
                  <strong>Learning objective</strong>
                </p>
                <p>{learningObjective.label}</p>
                <p>
                  <strong>Essential knowledge</strong>
                </p>
                <p>{essentialKnowledge.label}</p>
              </>
            )
          }

          if (
            course.course === 'biBiology' ||
            course.course === 'biEnvironmentalScience'
          ) {
            const application = courseObject.applications.find(
              a => a.value === unitData.application,
            )

            const skill = courseObject.skills.find(
              s => s.value === unitData.skill,
            )

            const understanding = courseObject.understandings.find(
              u => u.value === unitData.understanding,
            )

            additionalCourseMeta = (
              <>
                {application && (
                  <>
                    <p>
                      <strong>Application</strong>
                    </p>
                    <p>{application.label}</p>
                  </>
                )}
                {skill && (
                  <>
                    <p>
                      <strong>Skill</strong>
                    </p>
                    <p>{skill.label}</p>
                  </>
                )}
                {understanding && (
                  <>
                    <p>
                      <strong>Understanding</strong>
                    </p>
                    <p>{understanding.label}</p>
                  </>
                )}
              </>
            )
          }

          return (
            <li>
              <p>
                <strong>Unit</strong>
              </p>
              <p>{unit?.label}</p>
              <p>
                <strong>Topic</strong>
              </p>
              <p>{courseTopic?.label}</p>
              {additionalCourseMeta}
            </li>
          )
        })

        return (
          <StyledDetails key={course.course}>
            <summary>{courseObject.label}</summary>
            <ol>{courseUnits}</ol>
          </StyledDetails>
        )
      })}
      {values.keywords?.length && (
        <>
          <p>
            <strong>Keywords</strong>
          </p>
          <p>{values.keywords.join(', ')}</p>
        </>
      )}
      <p>
        <strong>Bloom&apos;s cognitive level</strong>
      </p>
      <p>
        {
          [
            ...metadata.blooms.cognitive[0].options,
            ...metadata.blooms.cognitive[1].options,
          ].find(cLevel => cLevel.value === values.cognitiveLevel)?.label
        }
      </p>
      {values.affectiveLevel && (
        <>
          <p>
            <strong>Bloom&apos;s affective level</strong>
          </p>
          <p>
            {
              metadata.blooms.affective.find(
                aLevel => aLevel.value === values.affectiveLevel,
              )?.label
            }
          </p>
        </>
      )}
      {values.psychomotorLevel && (
        <>
          <p>
            <strong>Bloom&apos;s psychomotor level</strong>
          </p>
          <p>
            {
              metadata.blooms.psychomotor.find(
                pLevel => pLevel.value === values.psychomotorLevel,
              )?.label
            }
          </p>
        </>
      )}
      {values.biointeractiveResources.length > 0 && (
        <>
          <p>
            <strong>Biointeractive resources</strong>
          </p>
          <p>
            {values.biointeractiveResources.map(resource => {
              const resourceObject = resources.find(r => r.value === resource)

              return (
                <li key={resourceObject.value}>
                  <a href={resourceObject.url} rel="noreferrer" target="_blank">
                    {resourceObject.label}
                  </a>
                </li>
              )
            })}
          </p>
        </>
      )}
    </Wrapper>
  )
}

MetadataInfo.propTypes = {
  metadata: PropTypes.shape({
    questionTypes: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        subtopics: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
          }),
        ),
      }),
    ),
    blooms: PropTypes.shape({
      cognitive: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          options: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
        }),
      ),
      affective: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
      psychomotor: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
    }),
    frameworks: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          learningObjectives: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          essentialKnowledge: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
              learningObjective: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          applications: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          skills: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          understandings: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      ]),
    ),
    introToBioMeta: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          coreConcepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              explanatoryItems: PropTypes.arrayOf(PropTypes.string),
            }),
          ),
          subdisciplines: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subdisciplineStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreConcept: PropTypes.string,
              subdiscipline: PropTypes.string,
            }),
          ),
          coreCompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subcompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
          subcompetenceStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              subcompetence: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          concepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          categories: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              concept: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
        }),
      ]),
    ),
  }).isRequired,
  values: PropTypes.shape({
    questionType: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        topic: PropTypes.string,
        subtopic: PropTypes.string,
      }),
    ),
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        course: PropTypes.string,
        units: PropTypes.arrayOf(
          PropTypes.shape({
            unit: PropTypes.string,
            courseTopic: PropTypes.string,
            learningObjective: PropTypes.string,
            essentialKnowledge: PropTypes.string,
            application: PropTypes.string,
            skill: PropTypes.string,
            understanding: PropTypes.string,
          }),
        ),
      }),
    ),
    keywords: PropTypes.arrayOf(PropTypes.string),
    biointeractiveResources: PropTypes.arrayOf(PropTypes.string),
    cognitiveLevel: PropTypes.string,
    affectiveLevel: PropTypes.string,
    psychomotorLevel: PropTypes.string,
    readingLevel: PropTypes.string,
  }).isRequired,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      url: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string),
      subtopics: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
}

export default MetadataInfo

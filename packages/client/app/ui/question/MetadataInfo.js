/* eslint-disable no-case-declarations */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { LinkOutlined } from '@ant-design/icons'
import {
  extractTopicsAndSubtopics,
  extractComplexItemSet,
  extractAPCourseMetadata,
  extractIBCourseMetadata,
  extractIntroBioCourseMetadata,
} from '../../utilities'
import { Link, VisuallyHiddenElement } from '../common'

const Wrapper = styled.div`
  font-size: ${th('fontSizeBase')};
  overflow-y: auto;
  padding: ${grid(4)};
`

const MetadataHeading = styled.h3`
  font-size: ${th('fontSizeBase')};
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

    li::marker {
      font-weight: bold;
    }
  }
`

const StyledList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`

const MetadataInfo = props => {
  const { values, metadata, resources, complexItemSetOptions } = props

  const questionTopics = extractTopicsAndSubtopics(
    values.topics,
    metadata.topics,
  )

  const complexItemSet = extractComplexItemSet(
    values.complexItemSetId,
    complexItemSetOptions,
  )

  return (
    <Wrapper tabIndex={0}>
      <VisuallyHiddenElement as="h2">Question Metadata</VisuallyHiddenElement>
      {complexItemSet && (
        <>
          <MetadataHeading>Context-dependent item set</MetadataHeading>
          <p>
            <Link to={`/set/${complexItemSet.value}`}>
              <LinkOutlined /> {complexItemSet.label}
            </Link>
          </p>
        </>
      )}
      <MetadataHeading>Question type</MetadataHeading>
      <p>
        {
          metadata.questionTypes
            .flatMap(group => group.options)
            .find(qType => qType.value === values.questionType)?.label
        }
      </p>
      <MetadataHeading>Topic(s)</MetadataHeading>
      <p>{questionTopics.topics}</p>
      <MetadataHeading>Subtopic(s)</MetadataHeading>
      <p>{questionTopics.subtopics}</p>
      <MetadataHeading>Courses</MetadataHeading>
      {values.courses.map(course => {
        const courseObject = metadata.frameworks.find(
          f => f.value === course.course,
        )

        const courseUnits = course.units.map(unitData => {
          switch (course.course) {
            case 'apBiology':
            case 'apEnvironmentalScience':
              return (
                <li key={`${JSON.stringify(unitData)}`}>
                  {extractAPCourseMetadata(unitData, courseObject).map(cm => {
                    return (
                      cm.value && (
                        <div key={JSON.stringify(cm)}>
                          <p>
                            <strong>{cm.label}</strong>
                          </p>
                          <p>{cm.value}</p>
                        </div>
                      )
                    )
                  })}
                </li>
              )
            case 'biBiology':
            case 'biEnvironmentalScience':
              return (
                <li key={`${JSON.stringify(unitData)}`}>
                  {extractIBCourseMetadata(unitData, courseObject).map(cm => {
                    return (
                      cm.value && (
                        <div key={JSON.stringify(cm)}>
                          <p>
                            <strong>{cm.label}</strong>
                          </p>
                          <p>{cm.value}</p>
                        </div>
                      )
                    )
                  })}
                </li>
              )
            case 'introBioForMajors':
              return (
                <li key={`${JSON.stringify(unitData)}`}>
                  {extractIntroBioCourseMetadata(
                    unitData,
                    courseObject,
                    metadata.introToBioMeta,
                  ).map(cm => {
                    return (
                      cm.value && (
                        <div key={JSON.stringify(cm)}>
                          <p>
                            <strong>{cm.label}</strong>
                          </p>
                          <p>{cm.value}</p>
                        </div>
                      )
                    )
                  })}
                </li>
              )
            default:
              return null
          }
        })

        return (
          <StyledDetails key={course.course}>
            <summary>{courseObject.label}</summary>
            <ol>{courseUnits}</ol>
          </StyledDetails>
        )
      })}
      {values.keywords?.length ? (
        <>
          <MetadataHeading>Keywords</MetadataHeading>
          <p>{values.keywords.join(', ')}</p>
        </>
      ) : (
        ''
      )}
      <MetadataHeading>Bloom&apos;s cognitive level</MetadataHeading>
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
          <MetadataHeading>Bloom&apos;s affective level</MetadataHeading>
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
          <MetadataHeading>Bloom&apos;s psychomotor level</MetadataHeading>
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
          <MetadataHeading>Biointeractive Resources</MetadataHeading>
          <StyledList>
            {values.biointeractiveResources.map(resource => {
              const resourceObject = resources.find(r => r.value === resource)

              return (
                <li key={resourceObject.value}>
                  <Link
                    as="a"
                    href={resourceObject.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {resourceObject.label}
                  </Link>
                </li>
              )
            })}
          </StyledList>
        </>
      )}
    </Wrapper>
  )
}

MetadataInfo.propTypes = {
  complexItemSetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
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
    complexItemSetId: PropTypes.string,
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

MetadataInfo.defaultProps = {
  complexItemSetOptions: [],
}

export default MetadataInfo

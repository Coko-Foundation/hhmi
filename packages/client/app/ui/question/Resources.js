import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Select, Link } from '../common'

const StyledFormItem = styled(Form.Item)`
  .ant-col.ant-form-item-label label {
    width: 100%;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Resources = props => {
  const { readOnly, resources, selectedTopics, getFieldValue, name } = props

  const [availableResourses, setAvailableResources] = useState([])
  const [selectedResourses, setSelectedResources] = useState([])

  useEffect(() => {
    if (selectedTopics.length) {
      const relevantResources = resources.filter(r =>
        r.topics.some(t => selectedTopics.includes(t)),
      )

      setAvailableResources(relevantResources)
    } else {
      setAvailableResources(resources)
    }

    const preselectedResources = getFieldValue('biointeractiveResources')

    if (preselectedResources) {
      setSelectedResources(preselectedResources)
    }
  }, [selectedTopics])

  const renderSelectedResourseLink = () => {
    return selectedResourses.map(resource => {
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
    })
  }

  return (
    <>
      <StyledFormItem
        label={
          <LabelWrapper>
            <span>Biointeractive Resources</span>
            <Link
              as="a"
              href="https://www.biointeractive.org/classroom-resources"
              rel="noreferrer"
              target="_blank"
            >
              View all resources
            </Link>
          </LabelWrapper>
        }
        name={name}
      >
        <Select
          // allowClear
          data-testid="biointeractiveResources-select"
          disabled={readOnly}
          mode="multiple"
          onChange={setSelectedResources}
          optionFilterProp="label"
          options={availableResourses}
          showSearch
          wrapOptionText
        />
      </StyledFormItem>
      <ul>{renderSelectedResourseLink()}</ul>
      {/* <ul>
        {selectedResourses.map(resource => {
          const resourceObject = resources.find(r => r.value === resource)

          console.log(resourceObject)

          return (
            <li key={resourceObject.value}>
              <a href={resourceObject.url} rel="noreferrer" target="_blank">
                {resourceObject.label}
              </a>
            </li>
          )
        })}
      </ul> */}
    </>
  )
}

Resources.propTypes = {
  getFieldValue: PropTypes.func.isRequired,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  resources: PropTypes.arrayOf(PropTypes.shape()),
  selectedTopics: PropTypes.arrayOf(PropTypes.string),
}

Resources.defaultProps = {
  name: 'biointeractiveResources',
  readOnly: false,
  resources: [],
  selectedTopics: [],
}

export default Resources

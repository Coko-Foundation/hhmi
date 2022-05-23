import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Select } from '../common'

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
  const { readOnly, resources } = props

  const [selectedResourse, setSelectedResource] = useState([])

  const renderSelectedResourseLink = () => {
    return selectedResourse.map(resource => {
      const resourceObject = resources.find(r => r.value === resource)

      return (
        <li key={resourceObject.value}>
          <a href={resourceObject.url} rel="noreferrer" target="_blank">
            {resourceObject.label}
          </a>
        </li>
      )
    })
  }

  return (
    <>
      <StyledFormItem
        label={
          <LabelWrapper>
            <span>Biointeractive resources</span>
            <a
              href="https://www.biointeractive.org/classroom-resources"
              rel="noreferrer"
              target="_blank"
            >
              View all resources
            </a>
          </LabelWrapper>
        }
        name="biointeractiveResources"
      >
        <Select
          allowClear
          disabled={readOnly}
          mode="multiple"
          onChange={setSelectedResource}
          optionFilterProp="label"
          options={resources}
          wrapOptionText
        />
      </StyledFormItem>
      <ul>{renderSelectedResourseLink()}</ul>
    </>
  )
}

Resources.propTypes = {
  readOnly: PropTypes.bool,
  resources: PropTypes.arrayOf(PropTypes.shape()),
}

Resources.defaultProps = {
  readOnly: false,
  resources: [],
}

export default Resources

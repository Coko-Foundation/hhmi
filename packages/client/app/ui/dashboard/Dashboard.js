import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'
import { Button, Collapse, QuestionList } from '../common'

const Wrapper = styled.div`
  > div.ant-collapse > div.ant-collapse-item > .ant-collapse-header {
    align-items: center;
    display: flex;
    padding-left: ${grid(4)};

    > .anticon.ant-collapse-arrow {
      padding: 0 ${grid(3)} 0 0;
      position: initial;
    }

    > .ant-collapse-extra {
      margin-left: auto;
    }
  }
`

// QUESTION how to handle search, filter and pagination with multiple sections
const Dashboard = props => {
  const {
    className,
    authorItems,
    editorItems,
    reviewerItems,
    onClickCreateQuestion,
  } = props

  const handleClickCreate = e => {
    e.stopPropagation()
    onClickCreateQuestion()
  }

  return (
    <Wrapper className={className}>
      <Collapse defaultActiveKey="author">
        <Collapse.Panel
          extra={
            <Button onClick={handleClickCreate} type="primary">
              Create question
            </Button>
          }
          header="Author items"
          key="author"
        >
          <QuestionList
            questions={authorItems}
            showSearch={false}
            showSort={false}
          />
        </Collapse.Panel>

        <Collapse.Panel header="Reviewer items" key="reviewer">
          <QuestionList
            questions={reviewerItems}
            showSearch={false}
            showSort={false}
            showTotalCount={false}
          />
        </Collapse.Panel>

        <Collapse.Panel header="Editor items" key="editor">
          <QuestionList
            questions={editorItems}
            showSearch={false}
            showSort={false}
            showTotalCount={false}
          />
        </Collapse.Panel>
      </Collapse>
    </Wrapper>
  )
}

const itemProps = PropTypes.arrayOf(
  PropTypes.shape({
    metadata: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
  }),
)

Dashboard.propTypes = {
  authorItems: itemProps,
  editorItems: itemProps,
  reviewerItems: itemProps,
  onClickCreateQuestion: PropTypes.func.isRequired,
}

Dashboard.defaultProps = {
  authorItems: [],
  editorItems: [],
  reviewerItems: [],
}

export default Dashboard

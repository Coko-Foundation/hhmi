import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { grid, th } from '@coko/client'
import { Button, Collapse, List, QuestionItem } from '../common'

const LinkWithoutStyles = styled.a`
  color: inherit;
  text-decoration: none;
  width: 100%;

  &:hover,
  &:focus,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`

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

  ul > li:not(:last-child) {
    border-bottom: 1px solid ${th('colorSecondary')};
    padding: ${grid(3)} 0;
  }
`

// QUESTION how to handle search, filter and pagination with multiple sections
const Dashboard = props => {
  const {
    className,

    authorItems,
    editorItems,
    reviewerItems,
    withTotalCount,
    authorTotalCountNumber,
    onClickCreateQuestion,
  } = props

  const history = useHistory()

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
          <List
            dataSource={authorItems}
            renderItem={itemProps => (
              <List.Item>
                <LinkWithoutStyles
                  href={`question/${itemProps.id}`}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    history.push(`question/${itemProps.id}`)
                  }}
                >
                  <QuestionItem {...itemProps} />
                </LinkWithoutStyles>
              </List.Item>
            )}
            showTotalCount={withTotalCount}
            totalCount={authorTotalCountNumber}
          />
        </Collapse.Panel>

        <Collapse.Panel header="Reviewer items" key="reviewer">
          <List
            dataSource={reviewerItems}
            renderItem={itemProps => (
              <li>
                <QuestionItem {...itemProps} />
              </li>
            )}
          />
        </Collapse.Panel>

        <Collapse.Panel header="Editor items" key="editor">
          <List
            dataSource={editorItems}
            renderItem={itemProps => (
              <li>
                <QuestionItem {...itemProps} />
              </li>
            )}
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
  authorTotalCountNumber: PropTypes.number,
  editorItems: itemProps,
  reviewerItems: itemProps,
  withTotalCount: PropTypes.bool,

  onClickCreateQuestion: PropTypes.func.isRequired,
}

Dashboard.defaultProps = {
  authorItems: [],
  authorTotalCountNumber: 0,
  editorItems: [],
  reviewerItems: [],
  withTotalCount: false,
}

export default Dashboard

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Wax } from 'wax-prosemirror-core'
import { DefaultSchema } from 'wax-prosemirror-utilities'
import {
  AnnotationToolGroupService,
  DisplayToolGroupService,
  InlineAnnotationsService,
  LinkService,
  ListsService,
  ListToolGroupService,
} from 'wax-prosemirror-services'

const waxConfig = () => ({
  SchemaService: DefaultSchema,
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: [
        {
          name: 'Annotations',
          exclude: ['StrikeThrough', 'Code'],
        },
        'Lists',
      ],
    },
  ],

  services: [
    new AnnotationToolGroupService(),
    new DisplayToolGroupService(),
    new InlineAnnotationsService(),
    new LinkService(),
    new ListsService(),
    new ListToolGroupService(),
  ],
})

const EditorWrapper = styled.div`
  border: none;
  display: flex;
  flex: 2 1 auto;
  justify-content: left;
  margin-right: 15px;

  .ProseMirror {
    white-space: break-spaces;
    width: 100%;
    word-wrap: break-word;

    &:focus {
      outline: none;
    }

    p.empty-node:first-child::before {
      content: attr(data-content);
    }

    .empty-node::before {
      color: rgb(170 170 170);
      float: left;
      font-style: italic;
      height: 0;
      pointer-events: none;
    }
  }
`

const PmEditor = props => {
  const { content, readonly } = props

  return (
    <EditorWrapper>
      <Wax
        config={waxConfig()}
        placeholder="Type your answer"
        readonly={readonly}
        value={content}
      />
    </EditorWrapper>
  )
}

PmEditor.propTypes = {
  content: PropTypes.string,
  readonly: PropTypes.bool,
}

PmEditor.defaultProps = {
  content: '',
  readonly: false,
}

export default PmEditor

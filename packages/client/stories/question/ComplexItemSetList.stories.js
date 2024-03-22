import React from 'react'
import { uuid } from '@coko/client'
import styled from 'styled-components'
import { ComplexItemSetList } from 'ui'

const Wrapper = styled.section`
  height: 70vh;
`

export const Base = () => {
  return (
    <Wrapper>
      <ComplexItemSetList
        data={[
          {
            title: 'First context-dependent item set',
            leadingContent: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    class: 'paragraph',
                  },
                  content: [
                    {
                      text: 'Content for First context-dependent item set',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            id: uuid(),
            metadata: [
              {
                label: 'author',
                value: 'Filan fisteku',
              },
              {
                label: 'created at',
                value: '2023-03-07 09:37:27.659+00',
                type: 'date',
              },
              {
                label: 'updated at',
                value: '2023-03-07 09:37:27.659+00',
                type: 'date',
              },
            ],
          },
          {
            title: 'Second context-dependent item set',
            leadingContent: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    class: 'paragraph',
                  },
                  content: [
                    {
                      text: 'Content for Second context-dependent item set',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            metadata: [
              {
                label: 'author',
                value: 'Filan Fisteku 2',
              },
              {
                label: 'created at',
                value: '2023-03-07 09:37:27.659+00',
                type: 'date',
              },
              {
                label: 'updated at',
                value: '2023-03-07 09:37:27.659+00',
                type: 'date',
              },
            ],
          },
        ]}
      />
    </Wrapper>
  )
}

export default {
  component: ComplexItemSetList,
  title: 'Question/ComplexItemSetList',
}

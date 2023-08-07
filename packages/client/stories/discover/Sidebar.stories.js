import React from 'react'
import styled from 'styled-components'
import { Sidebar, Form } from 'ui'
import { lorem } from 'faker'
import metadata from '../../app/utilities/question/metadataValues'
import { metadataTransformer } from '../../app/utilities/question/metadataTransformations'

const Wrapper = styled.section``

const sidebarText = lorem.sentences(7)

export const Base = () => {
  const applyFilters = filters => {
    // eslint-disable-next-line no-console
    console.log(filters)
  }

  const [filtersForm] = Form.useForm()

  return (
    <Wrapper>
      <Sidebar
        form={filtersForm}
        metadata={metadataTransformer(metadata)}
        setFilters={applyFilters}
        text={sidebarText}
      />
    </Wrapper>
  )
}

export default {
  component: Sidebar,
  title: 'Discover/Sidebar',
}

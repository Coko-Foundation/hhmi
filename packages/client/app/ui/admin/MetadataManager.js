import React from 'react'
import PropTypes from 'prop-types'
import CourseMetadataTable from './CourseMetadataTable'
import ResourcesTable from './ResourcesTable'
import { TabsStyled as Tabs } from '../common'

const MetadataManager = props => {
  const {
    courses,
    introToBioMeta,
    onMetadataUpdate,
    onMetadataDisable,
    onMetadataEnable,
    onDataReordered,
    onMetadataAdd,
    currentPage,
    dataSource,
    onPageChange,
    onResourceCreate,
    onResourceDelete,
    onResourceUpdate,
    onSearch,
    subtopics,
    topics,
    totalCount,
  } = props

  return (
    <Tabs
      $activebg="#fff"
      items={[
        {
          label: 'Course metadata',
          key: 'courseMetadata',
          children: (
            <CourseMetadataTable
              courses={courses}
              introToBioMeta={introToBioMeta}
              onDataReordered={onDataReordered}
              onMetadataAdd={onMetadataAdd}
              onMetadataDisable={onMetadataDisable}
              onMetadataEnable={onMetadataEnable}
              onMetadataUpdate={onMetadataUpdate}
            />
          ),
        },
        {
          label: 'Biointeractive resources',
          key: 'resources',
          children: (
            <ResourcesTable
              currentPage={currentPage}
              dataSource={dataSource}
              onPageChange={onPageChange}
              onResourceCreate={onResourceCreate}
              onResourceDelete={onResourceDelete}
              onResourceUpdate={onResourceUpdate}
              onSearch={onSearch}
              subtopics={subtopics}
              topics={topics}
              totalCount={totalCount}
            />
          ),
        },
      ]}
    />
  )
}

MetadataManager.propTypes = {
  // courses tab
  courses: PropTypes.arrayOf(PropTypes.shape()),
  introToBioMeta: PropTypes.arrayOf(PropTypes.shape()),
  onMetadataAdd: PropTypes.func,
  onMetadataDisable: PropTypes.func,
  onMetadataEnable: PropTypes.func,
  onMetadataUpdate: PropTypes.func,
  onDataReordered: PropTypes.func,
  // resources tab
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onResourceCreate: PropTypes.func,
  onResourceDelete: PropTypes.func,
  onResourceUpdate: PropTypes.func,
  onSearch: PropTypes.func,
  subtopics: PropTypes.arrayOf(PropTypes.shape()),
  topics: PropTypes.arrayOf(PropTypes.shape()),
  totalCount: PropTypes.number,
}

MetadataManager.defaultProps = {
  // courses tab
  courses: [],
  introToBioMeta: [],
  onMetadataAdd: null,
  onMetadataDisable: null,
  onMetadataEnable: null,
  onMetadataUpdate: null,
  onDataReordered: null,
  // resources tab
  dataSource: [],
  currentPage: 0,
  onPageChange: null,
  onResourceCreate: null,
  onResourceDelete: null,
  onResourceUpdate: null,
  onSearch: null,
  subtopics: [],
  topics: [],
  totalCount: 0,
}

export default MetadataManager

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { useHistory } from 'react-router-dom'
import { List, Button, Modal } from '../common'
import ComplexItemSetListItem from './ComplexItemSetListItem'
import ExportListToWordButton from '../myList/ExportModal'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StyledHeading = styled.div`
  align-items: center;
  border-bottom: 1px solid ${th('colorBorder')};
  display: flex;
  font-size: ${th('fontSizeBase')};
  height: 50px;
  justify-content: space-between;
  padding-inline: ${grid(7)} ${grid(3)};

  h1 {
    font-size: inherit;
    text-transform: uppercase;
  }
`

const StyledList = styled(List)`
  /* padding-block-start: ${grid(5)}; */

  ul.ant-list-items > * + * {
    border-top: 1px solid ${th('colorBorder')};
  }

  ul.ant-list-items > li {
    border-left: 5px solid transparent;
    transition: border-left-color 0.15s ease-in-out,
      background-color 0.15s ease-in-out;

    &:hover,
    &:focus-within {
      background-color: ${th('colorBackgroundHue')};
      border-left-color: ${th('colorPrimary')};
    }
  }
`

const BulkActionWrapper = styled.div`
  display: flex;
  gap: ${grid(2)};
`

const ComplexItemSetList = props => {
  const {
    data,
    loading,
    total,
    onSearch,
    pageSize,
    sortOptions,
    onSortOptionChange,
    searchParams,
    onWordExport,
    onQTIExport,
    onDeleteSets,
  } = props

  const history = useHistory()
  const [modal, contextHolder] = Modal.useModal()
  const [selectedSets, setSelectedSets] = useState([])

  const handlePageChange = page => {
    onSearch({ ...searchParams, page })
  }

  const handleSearch = searchQuery => {
    onSearch({ searchQuery, page: 1 })
  }

  const handleCreateNewSetClick = () => {
    history.push('/set/new')
  }

  const onSetsSelected = ids => {
    setSelectedSets(ids)
  }

  const handleWordExport = showFeedback => {
    return onWordExport(selectedSets, showFeedback)
  }

  const handleQTIExport = () => {
    return onQTIExport(selectedSets)
  }

  const handleDeleteSets = () => {
    const warningModal = modal.warning()
    warningModal.update({
      title: <ModalHeader>Delete sets</ModalHeader>,
      content: (
        <p>
          This action will permanently delete the selected context-dependent
          item sets and remove their reference from any items associated with
          these sets. The items themselves will not be deleted. Are you sure you
          want to continue?
        </p>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button onClick={warningModal.destroy}>Cancel</Button>
          <Button
            onClick={() => {
              onDeleteSets(selectedSets)
              warningModal.destroy()
            }}
            status="danger"
            type="primary"
          >
            Delete sets
          </Button>
        </ModalFooter>,
      ],
    })
    // return onDeleteSets(selectedSets)
  }

  return (
    <ModalContext.Provider value={null}>
      <Wrapper>
        <StyledHeading>
          <h1>Context-dependent item sets</h1>
          <Button onClick={handleCreateNewSetClick} type="primary">
            Create Set
          </Button>
        </StyledHeading>
        <StyledList
          dataSource={data}
          footerContent={
            selectedSets.length ? (
              <BulkActionWrapper>
                <ExportListToWordButton
                  // afterClose={() =>
                  //   document.body.querySelector('#export-popup-toggle').focus()
                  // }
                  onExport={handleWordExport}
                  text="All questions of the selected set(s) will be exported in the order of publication."
                >
                  Export to Word
                </ExportListToWordButton>
                <Button onClick={handleQTIExport} type="primary">
                  Export QTI
                </Button>
                <Button
                  onClick={handleDeleteSets}
                  status="danger"
                  type="primary"
                >
                  Delete
                </Button>
              </BulkActionWrapper>
            ) : null
          }
          itemSelection={{
            onChange: id => onSetsSelected(id),
          }}
          loading={loading}
          onSearch={handleSearch}
          onSortOptionChange={onSortOptionChange}
          pagination={{
            pageSize,
            current: searchParams?.page,
            onChange: handlePageChange,
          }}
          renderItem={item => (
            <ComplexItemSetListItem
              href={item.href}
              id={item.id}
              leadingContent={item.leadingContent}
              metadata={item.metadata}
              title={item.title}
            />
          )}
          searchPlaceholder="Search..."
          showSearch
          showSort
          showTotalCount
          sortOptions={sortOptions}
          totalCount={total}
        />
      </Wrapper>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ComplexItemSetList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  sortOptions: PropTypes.arrayOf(PropTypes.shape()),
  onSortOptionChange: PropTypes.func,
  searchParams: PropTypes.shape({
    page: PropTypes.number,
  }),
  onWordExport: PropTypes.func,
  onQTIExport: PropTypes.func,
  onDeleteSets: PropTypes.func,
}
ComplexItemSetList.defaultProps = {
  data: [],
  loading: false,
  onSearch: () => {},
  pageSize: 10,
  total: 0,
  sortOptions: [],
  onSortOptionChange: () => {},
  searchParams: {},
  onWordExport: null,
  onQTIExport: null,
  onDeleteSets: null,
}

export default ComplexItemSetList

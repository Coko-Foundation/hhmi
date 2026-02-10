import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { serverUrl } from '@coko/client'
import { MyLists, Link } from 'ui'
import {
  GET_LISTS,
  CREATE_LIST,
  EDIT_LIST,
  DELETE_LISTS,
  EXPORT_LIST,
  EXPORT_LIST_QTI,
} from '../graphql'

const PAGE_SIZE = 10

const ListsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [order, setOrder] = useState({
    orderBy: 'created',
    ascending: true,
  })

  const {
    data: { myLists: { result: lists, totalCount } = {} } = {},
    loading,
  } = useQuery(GET_LISTS, {
    variables: {
      page: currentPage - 1,
      pageSize: PAGE_SIZE,
      searchQuery,
      orderBy: order.orderBy,
      ascending: order.ascending,
    },
  })

  const [createNewList] = useMutation(CREATE_LIST, {
    refetchQueries: [GET_LISTS],
  })

  const [renameList] = useMutation(EDIT_LIST, {
    refetchQueries: [GET_LISTS],
  })

  const [deleteLists] = useMutation(DELETE_LISTS, {
    refetchQueries: [GET_LISTS],
  })

  const [exportListMutation] = useMutation(EXPORT_LIST)
  const [exportListToQTIMutation] = useMutation(EXPORT_LIST_QTI)

  const handleCreateList = title => {
    const mutationData = {
      variables: {
        title,
      },
    }

    return createNewList(mutationData)
  }

  const handleRenameList = (id, title) => {
    const mutationData = {
      variables: {
        id,
        title,
      },
    }

    return renameList(mutationData)
  }

  const handleDelete = selectedLits => {
    const mutationData = {
      variables: {
        ids: selectedLits,
      },
    }

    deleteLists(mutationData)
  }

  const handleSort = (orderBy, ascending) => {
    setOrder({ orderBy, ascending })
  }

  const handleExport = async (listId, showFeedback, showMetadata) => {
    const mutationData = {
      variables: {
        listId,
        orderBy: 'custom',
        options: {
          showFeedback,
          showMetadata,
        },
      },
    }

    return exportListMutation(mutationData)
      .then(res => {
        const filename = res.data.exportList
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        return new Promise((_resolve, reject) => {
          reject(e.message)
        })
      })
  }

  const handleExportQTI = listId => {
    const mutationData = {
      variables: {
        listId,
        orderBy: 'custom',
      },
    }

    return exportListToQTIMutation(mutationData)
      .then(res => {
        const filename = res.data.exportListQTI
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        return new Promise((_resolve, reject) => {
          reject(e.message)
        })
      })
  }

  return (
    <MyLists
      currentPage={currentPage}
      data={lists?.map(list => ({
        key: list.id,
        title: <Link to={`/list/${list.id}`}>{list.title}</Link>,
        created: list.created,
        titleText: list.title,
        onRenameList: handleRenameList,
        numberOfQuestions: list.questions?.result.length,
        numberOfNumericalQuestions: list.questions?.result.filter(
          q => q.versions[0].questionType === 'numerical',
        ).length,
      }))}
      loading={loading}
      onCreateNewList={handleCreateList}
      onDeleteRows={handleDelete}
      onExport={handleExport}
      onExportQTI={handleExportQTI}
      onPageChange={setCurrentPage}
      onRenameList={handleRenameList}
      onSearch={setSearchQuery}
      onSort={handleSort}
      pageSize={PAGE_SIZE}
      totalListCount={totalCount}
    />
  )
}

ListsPage.propTypes = {}

ListsPage.defaultProps = {}

export default ListsPage

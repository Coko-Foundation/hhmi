/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Empty } from 'antd'
import { useCurrentUser } from '@coko/client'
import { UserList, Modal, Result } from 'ui'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import {
  FILTER_USERS,
  DELETE_USERS,
  DEACTIVATE_USERS,
  ACTIVATE_USERS,
} from '../graphql'
import { hasGlobalRole } from '../utilities'

const { confirm, error } = Modal

const usersApiToUi = users => {
  if (!users) return []

  return users.map(user => {
    let isReviewer = false

    if (user.teams && user.teams.length) {
      user.teams.forEach(team => {
        if (team.role === 'reviewer') isReviewer = true
      })
    }

    return {
      id: user.id,
      displayName: user.displayName,
      email: user.defaultIdentity.email,
      expertise: user.coursesTeaching,
      isReviewer,
      signUpDate: user.created,
    }
  })
}

const PAGE_SIZE = 10
const DELETE_ACTION = 'delete'
const DEACTIVATE_ACTION = 'deactivate'
const ACTIVATE_ACTION = 'activate'

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedRows, setSelectedRows] = useState([])
  const [search, setSearch] = useState('')
  const [showDeactivated, setShowDeactivated] = useState(false)

  const { currentUser } = useCurrentUser()

  const { loading: usersLoading, data: usersData } = useQuery(FILTER_USERS, {
    variables: {
      params: {
        isActive: !showDeactivated,
        search,
      },
      options: {
        page: currentPage,
        pageSize: PAGE_SIZE,
      },
    },
  })

  const [deleteUsersMutation] = useMutation(DELETE_USERS, {
    update(cache) {
      cache.modify({
        fields: {
          filterUsers() {},
        },
      })
    },
    onCompleted({ deleteUsers }) {
      const total = usersData?.filterUsers.totalCount
      const nrOfPages = Math.ceil(total / PAGE_SIZE)
      const usersInCurrentPage = usersData?.filterUsers.result.length

      // if current page is the last page && you delete all users in that page, load currentPage - 1
      if (
        currentPage === nrOfPages - 1 &&
        usersInCurrentPage === deleteUsers.length
      ) {
        setCurrentPage(currentPage - 1)
      }
    },
  })

  const [deactivateUsersMutation] = useMutation(DEACTIVATE_USERS, {
    update(cache) {
      cache.modify({
        fields: {
          filterUsers() {},
        },
      })
    },
    onCompleted({ deactivateUsers }) {
      const total = usersData?.filterUsers.totalCount
      const nrOfPages = Math.ceil(total / PAGE_SIZE)
      const usersInCurrentPage = usersData?.filterUsers.result.length

      // if current page is the last page && you deactivate all users in that page, load currentPage - 1
      if (
        currentPage === nrOfPages - 1 &&
        usersInCurrentPage === deactivateUsers.length
      ) {
        setCurrentPage(currentPage - 1)
      }
    },
  })

  const [activateUsersMutation] = useMutation(ACTIVATE_USERS, {
    update(cache) {
      cache.modify({
        fields: {
          filterUsers() {},
        },
      })
    },
    onCompleted({ activateUsers }) {
      const total = usersData?.filterUsers.totalCount
      const nrOfPages = Math.ceil(total / PAGE_SIZE)
      const usersInCurrentPage = usersData?.filterUsers.result.length

      // if current page is the last page && you activate all users in that page, load currentPage - 1
      if (
        currentPage > 1 &&
        currentPage === nrOfPages - 1 &&
        usersInCurrentPage === activateUsers.length
      ) {
        setCurrentPage(currentPage - 1)
      }
    },
  })

  const handlePageChange = page => {
    setCurrentPage(page - 1)
  }

  const handleSearch = query => {
    setCurrentPage(0)
    setSearch(query)
  }

  const handleShowDeactivatedChange = () => {
    setSelectedRows([])
    setShowDeactivated(!showDeactivated)
  }

  const bulkAction = action => {
    if (selectedRows.indexOf(currentUser.id) !== -1) {
      showErrorModal(
        'Cannot delete or deactivate current user',
        'You cannot delete or deactivate the user you are currently logged in as. Please deselect your current user and try again',
      )
    } else if (action === DEACTIVATE_ACTION) {
      showDeactivateModal()
    } else if (action === DELETE_ACTION) {
      showDeleteModal()
    } else if (action === ACTIVATE_ACTION) {
      showActivateModal()
    }
  }

  const showActivateModal = () => {
    confirm({
      title: `Activate User${selectedRows.length > 1 ? 's' : ''}`,
      content: `Are you sure you want to activate the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      okText: 'Activate',
      okType: 'primary',
      onOk() {
        return activateUsersMutation({
          variables: { ids: selectedRows },
        })
          .then(() => {
            setSelectedRows([])
          })
          .catch(() => {
            showErrorModal(
              'Activation error',
              'There was an error trying to activate the user(s)',
            )
          })
      },
      onCancel() {},
    })
  }

  const showDeactivateModal = () => {
    confirm({
      title: `Deactivate User${selectedRows.length > 1 ? 's' : ''}`,
      content: `Are you sure you want to deactivate the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,

      okText: 'Deactivate',
      okType: 'danger',
      onOk() {
        return deactivateUsersMutation({
          variables: { ids: selectedRows },
        })
          .then(() => {
            setSelectedRows([])
          })
          .catch(() => {
            showErrorModal(
              'Deactivate error',
              'There was an error trying to deactivate the user(s)',
            )
          })
      },
      onCancel() {},
    })
  }

  const showDeleteModal = () => {
    confirm({
      title: `Delete User${selectedRows.length > 1 ? 's' : ''}`,
      content: `Are you sure you want to delete the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        return deleteUsersMutation({
          variables: { ids: selectedRows },
        })
          .then(() => {
            setSelectedRows([])
          })
          .catch(() => {
            showErrorModal(
              'Delete error',
              'There was an error trying to delete the user(s)',
            )
          })
      },
      onCancel() {},
    })
  }

  const showErrorModal = (title, content) => {
    error({
      title,
      content,
    })
  }

  if (!hasGlobalRole(currentUser, 'admin')) {
    return (
      <Result
        // replace link with a Button with to="/dashboard" after MR is merged
        extra={<Link to="/dashboard">Back to Dashboard</Link>}
        status="403"
        subTitle="Sorry, you are not authorized to access this page."
        title="403"
      />
    )
  }

  return (
    <UserList
      currentPage={currentPage + 1}
      data={usersApiToUi(usersData?.filterUsers.result)}
      loading={usersLoading}
      // table can be empty only for deactivated users, hence the wording
      locale={{
        emptyText: (
          <Empty
            description="No Deactivated Users"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ),
      }}
      onBulkActivate={() => bulkAction(ACTIVATE_ACTION)}
      onBulkDeactivate={() => bulkAction(DEACTIVATE_ACTION)}
      onBulkDelete={() => bulkAction(DELETE_ACTION)}
      onClickShowDeactivated={handleShowDeactivatedChange}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      pageSize={PAGE_SIZE}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      showDeactivated={showDeactivated}
      totalUserCount={usersData?.filterUsers.totalCount}
    />
  )
}

ManageUsers.propTypes = {}

ManageUsers.defaultProps = {}

export default ManageUsers

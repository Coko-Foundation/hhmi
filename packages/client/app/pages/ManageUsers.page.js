/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react'
import { serverUrl, useCurrentUser } from '@coko/client'
import { UserList, Result } from 'ui'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import {
  FILTER_USERS,
  DELETE_USERS,
  DEACTIVATE_USERS,
  ACTIVATE_USERS,
  DELETE_RELATED_ITEMS,
  DOWNLOAD_USERS_DATA,
} from '../graphql'
import { hasGlobalRole, useMetadata } from '../utilities'
import { userRoleFilters } from '../ui/_helpers/searchFilters'
import { Spin } from '../ui/common'

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
      expertise: isReviewer ? user.topicsReviewing : user.coursesTeaching,
      isReviewer,
      signUpDate: user.created,
    }
  })
}

const DEFAULT_PAGE_SIZE = 10

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [selectedRows, setSelectedRows] = useState([])
  const [searchParams, setSearchParams] = useState('')
  const [sortOptions, setSortOptions] = useState('')
  const [showDeactivated, setShowDeactivated] = useState(false)

  const { currentUser } = useCurrentUser()
  const { metadata } = useMetadata()

  const expertiseOptions = metadata
    ? [...metadata?.profileOptions.courses, ...metadata?.profileOptions.topics]
        .filter((expertise, index, self) => {
          return index === self.findIndex(v => v.value === expertise.value)
        })
        .sort((a, b) => a.label > b.label)
    : []

  const { loading: usersLoading, data: usersData } = useQuery(FILTER_USERS, {
    variables: {
      params: {
        isActive: !showDeactivated,
        ...searchParams,
      },
      options: {
        page: currentPage,
        pageSize,
        ...sortOptions,
      },
    },
    onCompleted: () => {
      setSelectedRows([])
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
      const nrOfPages = Math.ceil(total / pageSize)
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

  const [deleteUsersRelatedItems] = useMutation(DELETE_RELATED_ITEMS)

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
      const nrOfPages = Math.ceil(total / pageSize)
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
      const nrOfPages = Math.ceil(total / pageSize)
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

  const [downloadUsersDataMutation] = useMutation(DOWNLOAD_USERS_DATA)

  const handleDeleteUsers = async vars => {
    await deleteUsersRelatedItems(vars)
    await deleteUsersMutation(vars)
  }

  const handlePageChange = page => {
    setCurrentPage(page - 1)
  }

  const handleChangePageSize = (_, newPageSize) => {
    setPageSize(newPageSize)
  }

  const handleSearch = ({ role, searchQuery: search, expertise }) => {
    setCurrentPage(0)
    setSearchParams({ role, search, expertise })
  }

  const handleSortChange = (_, __, { columnKey, order }) => {
    setSortOptions({
      orderBy: columnKey,
      ascending: order === 'ascend',
    })
  }

  const handleShowDeactivatedChange = () => {
    setSelectedRows([])
    setShowDeactivated(!showDeactivated)
  }

  const handleUsersDataDownload = variables => {
    downloadUsersDataMutation(variables)
      .then(res => {
        const filename = res.data.downloadUsersData
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        return new Promise((_resolve, reject) => {
          reject()
        })
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

  if (!metadata) {
    return <Spin />
  }

  const filters = [
    ...userRoleFilters,
    {
      key: { label: 'Expertise', value: 'expertise' },
      values: expertiseOptions,
    },
  ]

  return (
    <UserList
      currentPage={currentPage + 1}
      currentUserId={currentUser.id}
      data={usersApiToUi(usersData?.filterUsers.result)}
      expertiseOptions={expertiseOptions}
      filters={filters}
      loading={usersLoading}
      onBulkActivate={activateUsersMutation}
      onBulkDeactivate={deactivateUsersMutation}
      onBulkDelete={handleDeleteUsers}
      onBulkDownload={handleUsersDataDownload}
      onChangePageSize={handleChangePageSize}
      onClickShowDeactivated={handleShowDeactivatedChange}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      onSortChange={handleSortChange}
      pageSize={pageSize}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      showDeactivated={showDeactivated}
      totalUserCount={usersData?.filterUsers.totalCount}
      withFilters={hasGlobalRole(currentUser, 'admin')}
    />
  )
}

ManageUsers.propTypes = {}

ManageUsers.defaultProps = {}

export default ManageUsers

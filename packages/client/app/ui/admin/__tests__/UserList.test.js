import React from 'react'
import { uuid } from '@coko/client'

import { axe, fireEvent, render, renderer, screen } from '../../../testUtils'

import UserList from '../UserList'

let data = [
  {
    id: '6e2655a0-9650-4add-89f6-d1f35c892afe',
    displayName: 'user1',
    email: 'user1@gmail.com',
    expertise: [],
    isReviewer: false,
    isActive: true,
    signUpDate: '2022-12-12T10:53:42.215Z',
  },
  {
    id: '6e2655a0-9650-4add-89f6-d1f35c812afe',
    displayName: 'user1',
    email: 'user2@gmail.com',
    expertise: [],
    isReviewer: false,
    isActive: true,
    signUpDate: '2022-12-12T10:53:42.215Z',
  },
  {
    id: '6e2655a0-9650-4add-89f6-d1f35c894afe',
    displayName: 'deactivedUser',
    email: 'deactivedUser@gmail.com',
    expertise: [],
    isReviewer: false,
    isActive: false,
    signUpDate: '2022-12-12T10:53:42.215Z',
  },
]

const MockUserList = props => {
  return (
    <UserList
      currentPage={1}
      currentUserId={uuid()}
      data={data}
      onBulkActivate={jest.fn()}
      onBulkDeactivate={jest.fn()}
      onBulkDelete={jest.fn()}
      onClickShowDeactivated={jest.fn()}
      onPageChange={jest.fn()}
      onSearch={jest.fn()}
      pageSize={10}
      selectedRows={[]}
      setSelectedRows={jest.fn()}
      showDeactivated={false}
      totalUserCount={10}
      {...props}
    />
  )
}

const createNodeMock = _ => {
  return {
    querySelectorAll: () => [],
    // for some reason createNodeMock affects the global scope and causes errors related to getAttribute function
    // so we are providing mock for getAttribute
    getAttribute: jest.fn(),
  }
}

describe('UserList', () => {
  it('matches snapshot', () => {
    const options = { createNodeMock }

    const getElementByIdMock = jest
      .spyOn(document, 'getElementById')
      .mockReturnValue({
        addEventListener: jest.fn(),
        innerHTML: '',
        getAttribute: jest.fn(),
      })

    const userListComponent = renderer
      .create(<MockUserList />, options)
      .toJSON()

    expect(userListComponent).toMatchSnapshot()
    getElementByIdMock.mockRestore()
    // jest.clearAllMocks()
  })

  it('renders correct number of users', () => {
    render(<MockUserList />)

    jest.spyOn(document, 'getElementById').mockReturnValue({
      addEventListener: jest.fn(),
      innerHTML: '',
      getAttribute: jest.fn(),
    })
    const tableRows = screen.getAllByRole('row')
    expect(tableRows.length).toBe(4)
  })

  it('checking show deactivated users', async () => {
    let showDeactivated = false

    const onClickShowDeactivated = () => {
      showDeactivated = !showDeactivated
      data = data.filter(d => d.isActive === !showDeactivated)
    }

    const { rerender } = render(
      <MockUserList onClickShowDeactivated={onClickShowDeactivated} />,
    )

    const checkBoxElement = screen.getByTestId('show-inactive-users')
    fireEvent.click(checkBoxElement)
    expect(showDeactivated).toBeTruthy()
    rerender(<MockUserList data={data} />)
    const deactivatedRow = screen.queryByText('deactivedUser')
    expect(deactivatedRow).toBeTruthy()
  })

  it('renders with no accessibility errors with data', async () => {
    const { container } = render(<MockUserList />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders with no accessibility errors with empty data array', async () => {
    const { container } = render(<MockUserList data={[]} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 10000)
})

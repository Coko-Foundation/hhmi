import React from 'react'
import { axe, render, renderer, fireEvent } from '../../../testUtils'
import MyLists from '../MyLists'
import { Empty } from '../../common'

const onCreateNewList = jest.fn()
const onDeleteRows = jest.fn()
const onExport = jest.fn()
const onPageChange = jest.fn()
const onSearch = jest.fn()
const onSort = jest.fn()

const data = [
  {
    key: '1',
    name: 'soluta',
    createdAt: '11/20/2030',
  },
  {
    key: '2',
    name: 'quidem',
    createdAt: '1/31/2032',
  },
  {
    key: '3',
    name: 'dolore',
    createdAt: '6/23/2028',
  },
  {
    key: '4',
    name: 'labore',
    createdAt: '12/17/2023',
  },
  {
    key: '5',
    name: 'cumque',
    createdAt: '10/2/2028',
  },
]

const loading = false
const locale = {}
const pageSize = 10
const totalListCount = 20

const MockMyLists = props => (
  <MyLists
    currentPage={1}
    data={data}
    loading={loading}
    locale={locale}
    onCreateNewList={onCreateNewList}
    onDeleteRows={onDeleteRows}
    onExport={onExport}
    onPageChange={onPageChange}
    onSearch={onSearch}
    onSort={onSort}
    pageSize={pageSize}
    totalListCount={totalListCount}
    {...props}
  />
)

const createNodeMock = () => ({
  querySelectorAll: () => [],
  getAttribute: jest.fn(),
})

describe('MyList', () => {
  it('Matches snapshot', () => {
    const options = { createNodeMock }
    const MyListsComponent = renderer.create(<MockMyLists />, options).toJSON()
    expect(MyListsComponent).toMatchSnapshot()
  })

  it('displays custom locale', () => {
    const customLocale = {
      emptyText: <Empty description="custom locale text" role="status" />,
    }

    const { getByText } = render(
      <MockMyLists data={[]} locale={customLocale} />,
    )

    const localeText = getByText('custom locale text')
    expect(localeText).toBeTruthy()
  })

  it('onCreateNewList is called', () => {
    const { getByPlaceholderText, getByTestId } = render(<MockMyLists />)

    const newListInput = getByPlaceholderText('create your list')
    const createBtn = getByTestId('create-btn')
    fireEvent.change(newListInput, { target: { value: 'list1' } })
    fireEvent.click(createBtn)
    expect(onCreateNewList).toBeCalled()
  })

  it('onSort is called', () => {
    const { getByText } = render(<MockMyLists />)
    const creationDateHeaderCell = getByText('Creation Date')
    fireEvent.click(creationDateHeaderCell)
    expect(onSort).toBeCalled()
  })

  it('renders without any accessibility errors', async () => {
    const { container } = render(<MockMyLists />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  }, 10000)
})

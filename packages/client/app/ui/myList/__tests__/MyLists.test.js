import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  axe,
  render,
  renderer,
  fireEvent,
  waitFor,
  userEvent,
} from '../../../testUtils'
import MyLists from '../MyLists'
import { Empty, Link } from '../../common'

const onCreateNewList = jest.fn()
const onDeleteRows = jest.fn()
const onExport = jest.fn()
const onExportQTI = jest.fn()
const onPageChange = jest.fn()
const onSearch = jest.fn()
const onSort = jest.fn()

const data = [
  {
    key: '1',
    title: <Link to="/">soluta</Link>,
    created: '11/20/2020',
    titleText: 'soluta',
  },
  {
    key: '2',
    title: <Link to="/">quidem</Link>,
    created: '1/31/2020',
    titleText: 'quidem',
  },
  {
    key: '3',
    title: <Link to="/">dolore</Link>,
    created: '6/23/2019',
    titleText: 'dolore',
  },
  {
    key: '4',
    title: <Link to="/">labore</Link>,
    created: '12/17/2020',
    titleText: 'labore',
  },
  {
    key: '5',
    title: <Link to="/">cumque</Link>,
    created: '10/2/2020',
    titleText: 'cumque',
  },
]

const loading = false
const locale = {}
const pageSize = 10
const totalListCount = 20

const MockMyLists = props => (
  <BrowserRouter>
    <MyLists
      currentPage={1}
      data={data}
      loading={loading}
      locale={locale}
      onCreateNewList={onCreateNewList}
      onDeleteRows={onDeleteRows}
      onExport={onExport}
      onExportQTI={onExportQTI}
      onPageChange={onPageChange}
      onSearch={onSearch}
      onSort={onSort}
      pageSize={pageSize}
      totalListCount={totalListCount}
      {...props}
    />
  </BrowserRouter>
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
  it('onCreateNewList is called', async () => {
    const { getByPlaceholderText, getByTestId } = render(<MockMyLists />)

    const newListInput = getByPlaceholderText('Create a new list')
    const createBtn = getByTestId('create-btn')
    fireEvent.change(newListInput, { target: { value: 'list1' } })
    fireEvent.click(createBtn)
    await waitFor(() => expect(onCreateNewList).toBeCalled())
  })

  it('onRenameList is called', async () => {
    const onRenameList = jest.fn()

    const tempData = [
      {
        key: '1',
        title: <Link to="/">list1</Link>,
        created: '11/20/2030',
        titleText: 'list1',
        onRenameList,
      },
    ]

    const { getByTestId, getByPlaceholderText, getByLabelText } = render(
      <MockMyLists data={tempData} />,
    )

    const mainBtn = getByLabelText('Rename list list1')
    const input = getByPlaceholderText('List name')
    const renameBtn = getByTestId('rename-btn')
    await userEvent.click(mainBtn)
    await userEvent.type(input, `{backspace}2`)
    await userEvent.click(renameBtn)
    await waitFor(() => expect(onRenameList).toHaveBeenCalled())
  }, 40000)
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
  }, 40000)
})

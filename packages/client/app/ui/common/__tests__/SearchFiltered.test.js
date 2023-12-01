/* eslint-disable jest/no-commented-out-tests */
import React from 'react'
import {
  renderer,
  render,
  axe,
  userEvent,
  screen,
  waitFor,
} from '../../../testUtils'

import SearchFiltered from '../searchFiltered/SearchFiltered'

const defaultFilters = [
  {
    key: { label: 'status', value: 'status' },
    values: [
      {
        label: 'submitted',
        value: 'submitted',
      },
      {
        label: 'published',
        value: 'published',
      },
    ],
  },
  {
    key: { label: 'Assigned to HE', value: 'heAssigned' },
    values: [
      {
        label: 'Is',
        value: true,
      },
      {
        label: 'Is not',
        value: false,
      },
    ],
  },
]

const MockSearcFiltered = props => {
  return (
    <SearchFiltered
      filters={defaultFilters}
      loading={false}
      onSearch={jest.fn()}
      placeholder="Search..."
      {...props}
    />
  )
}

describe('SearchFiltered tests', () => {
  const $input = () => screen.getByPlaceholderText('Search...')

  const $filters = options => screen.queryAllByRole('option', options)

  it('Matches snapshot', () => {
    const searchFilteredComponent = renderer
      .create(<MockSearcFiltered />)
      .toJSON()

    expect(searchFilteredComponent).toMatchSnapshot()
  })

  it('renders the filter items correctly based on the filters pro', async () => {
    render(<MockSearcFiltered />)

    const filterOptions = $filters()
    expect(filterOptions.length).toEqual(defaultFilters.length)

    defaultFilters.forEach((filter, index) => {
      expect($filters()[index]).toHaveTextContent(filter.key.label)
    })
  })

  it('onSearch function is called with the specified search query', async () => {
    const onSearch = jest.fn()
    render(<MockSearcFiltered onSearch={onSearch} />)
    const input = $input()
    await userEvent.type(input, 'user{enter}')
    await waitFor(() => expect(onSearch).toHaveBeenCalled())
    await waitFor(() =>
      expect(onSearch).toHaveBeenCalledWith({ searchQuery: 'user' }),
    )
  })

  it('renders without any accessebility error', async () => {
    const { container } = render(<MockSearcFiltered />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})

// const avaiableFilters = ['author', 'topic', 'question', 'date']
// SELECTORS
// const $input = () => screen.getByRole('textbox')
// const $popup = () => screen.queryByRole('listbox')
// const $filters = options => screen.queryAllByRole('option', options)

// describe('FilterList', () => {
//   it('renders the filter items correctly based on the filters prop', () => {
//     render(<FilterList filters={avaiableFilters} selectedFilter={null} show />)
//     expect($filters()).toHaveLength(avaiableFilters.length)
//     avaiableFilters.forEach((filter, index) => {
//       expect($filters()[index]).toHaveTextContent(filter)
//     })
//   })
// it('calls the setSelected when a filter item is clicked', () => {
//   const setSelected = jest.fn()
//   render(
//     <FilterList
//       filters={avaiableFilters}
//       selectedFilter={null}
//       setSelected={setSelected}
//       show
//     />,
//   )
//   userEvent.click($filters()[2])
/* this is not working */
//   expect(setSelected).toHaveBeenCalledWith($filters()[2])
// })
// })

// describe('SearchFiltered', () => {
//   it('matches snapshot', () => {
//     const component = renderer.create(<SearchFiltered />).toJSON()

//     expect(component).toMatchSnapshot()
//   })
//   it('render only the search input when withFilters prop is false', () => {
//     render(<SearchFiltered withFilters={false} />)

//     expect($input()).toBeInTheDocument()
//     expect($popup()).not.toBeInTheDocument()
//   })

//   it('render the filter list popup and search input when withFilters prop is true', () => {
//     render(<SearchFiltered filters={avaiableFilters} withFilters />)

//     expect($popup()).toBeInTheDocument()
//     expect($input()).toBeInTheDocument()
//   })

//   it('calls onSearch and it returns object with query and filter', () => {
//     const onSearch = jest.fn()

//     render(<SearchFiltered filters={avaiableFilters} onSearch={onSearch} />)
//     fireEvent.mouseDown($filters()[0])
//     fireEvent.change($input(), { target: { value: 'Search query' } })
//     fireEvent.keyDown($input(), { key: 'Enter' })

//     expect(onSearch).toHaveBeenCalled()
//     expect(onSearch).toHaveBeenCalledWith('Search query')
//   })
// })

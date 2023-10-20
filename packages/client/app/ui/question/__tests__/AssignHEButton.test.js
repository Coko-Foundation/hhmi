import React from 'react'
import AssignHEButton from '../AssignHEButton'
import { axe, render, renderer } from '../../../testUtils'

const handlingEditors = [
  {
    label: 'nuaduslaine',
    value: '4f089b88-b88c-4cc0-99b2-23035ed6247d',
  },
  {
    label: 'elleryemil',
    value: '4f089b88-b89c-4bc0-99b2-23035ed6247d',
  },
]

const currentHandlingEditors = [
  {
    label: 'galanosalexandra',
    value: '4f089b88-b88c-4cc0-99b2-23035ed6247d',
  },
  {
    label: 'theodre',
    value: '4f089b88-b89c-4bc0-99b2-23035ed6247d',
  },
]

const MockAssignHEButton = props => {
  return (
    <AssignHEButton
      currentHandlingEditors={currentHandlingEditors}
      expanded={false}
      handlingEditors={handlingEditors}
      loading={false}
      onAssign={jest.fn()}
      onSearchHE={jest.fn()}
      onUnassign={jest.fn()}
      searchLoading={false}
      updateSelectedQuestions={jest.fn()}
      {...props}
    />
  )
}

describe('AssignHEButton', () => {
  it('Matches snapshot', () => {
    const AssignHEButtonComponent = renderer
      .create(<MockAssignHEButton />)
      .toJSON()

    expect(AssignHEButtonComponent).toMatchSnapshot()
  })
  it("Display's right text on the toggle button", () => {
    const { getByLabelText } = render(<MockAssignHEButton />)
    const minisedBtn = getByLabelText('Assign Handling Editor')
    expect(minisedBtn).toHaveTextContent('Assign HE')
  })

  it('renders without accessebility error', async () => {
    const { container } = render(<MockAssignHEButton />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})

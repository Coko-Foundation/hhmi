import React from 'react'
import { renderer, render, axe, screen, fireEvent } from '../../../testUtils'
import Switch from '../index'

const MockSwitch = ({ ...props }) => {
  return (
    <Switch
      checkedChildren="Show"
      data-testid="metadata-toggle"
      onChange={jest.fn()}
      unCheckedChildren="Hide"
      {...props}
    />
  )
}

describe('Switch', () => {
  it('matches snapshot', () => {
    const switchComponent = renderer.create(<MockSwitch checked />).toJSON()
    expect(switchComponent).toMatchSnapshot()
  })
  it('renders correct text', () => {
    render(<MockSwitch checked />)
    const showText = screen.getByText('Show')
    const hideText = screen.getByText('Hide')
    expect(showText).toBeVisible()
    fireEvent.click(showText)
    expect(hideText).toBeVisible()
  })
  it('onChange is being called once on click', () => {
    const setStateMock = jest.fn()
    render(<MockSwitch onChange={setStateMock} />)
    const metadataToggle = screen.getByTestId('metadata-toggle')
    fireEvent.click(metadataToggle)
    expect(setStateMock).toHaveBeenCalledTimes(1)
  })
  it('renders without accessibility errors', async () => {
    const { container } = render(<MockSwitch on />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})

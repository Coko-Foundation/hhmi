import React from 'react'
import { renderer, render, screen, axe } from '../../../testUtils'
import Form from '../Form'
import Input from '../Input'
import Button from '../Button'

const MockForm = props => (
  <Form {...props}>
    <Input placeholder="enter your email" type="email" />
    <Input placeholder="enter your password" type="password" />
    <Button data-testid="submit-btn" type="button">
      submit
    </Button>
  </Form>
)

describe('Form', () => {
  it('matches snapshot', () => {
    const FormComponent = renderer.create(<MockForm />).toJSON()
    expect(FormComponent).toMatchSnapshot()
  })
  it('renders correct children', () => {
    render(<MockForm />)
    const email = screen.getByPlaceholderText('enter your email')
    const password = screen.getByPlaceholderText('enter your password')
    const button = screen.getByTestId('submit-btn')
    expect(email).toBeVisible()
    expect(password).toBeVisible()
    expect(button).toBeVisible()
  })

  it('renders ribbon with correct message', () => {
    render(
      <MockForm ribbonMessage="Failed to submit" submissionStatus="error" />,
    )
    const ribbonText = screen.queryByText('Failed to submit')
    expect(ribbonText).toBeTruthy()
  })

  it('renders without accessibility errors', async () => {
    const { container } = render(<MockForm />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})

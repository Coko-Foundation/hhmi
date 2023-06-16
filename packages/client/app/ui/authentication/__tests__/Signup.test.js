import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import {
  render,
  renderer,
  screen,
  axe,
  fireEvent,
  waitFor,
} from '../../../testUtils'
import Signup from '../Signup'

const onSubmit = jest.fn()

const MockSignup = props => (
  <BrowserRouter>
    <Signup {...props} />
  </BrowserRouter>
)

describe('Signup', () => {
  beforeEach(() => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    })

    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock)
  })

  it('matches snapshot', () => {
    const loginComponent = renderer
      .create(<MockSignup onSubmit={onSubmit} />)
      .toJSON()

    expect(loginComponent).toMatchSnapshot()
  })

  it('calls onSubmit once when submit button is clicked', async () => {
    render(<MockSignup onSubmit={onSubmit} />)
    onSubmit.mockClear()
    const firstName = screen.getByPlaceholderText('Fill in your first name')
    const lastName = screen.getByPlaceholderText('Fill in your last name')
    const email = screen.getByPlaceholderText('Fill in your email')
    const password = screen.getByPlaceholderText('Fill in your password')

    const confirmPassword = screen.getByPlaceholderText(
      'Fill in your password again',
    )

    const checkBox = screen.getByLabelText(
      'I agree to the terms and conditions',
    )

    const submit = screen.getByRole('button')
    fireEvent.change(firstName, { target: { value: 'user' } })
    fireEvent.change(lastName, { target: { value: '12' } })
    fireEvent.change(email, { target: { value: 'user@gmail.com' } })

    fireEvent.change(password, {
      target: { value: 'Password@123' },
    })

    fireEvent.change(confirmPassword, {
      target: { value: 'Password@123' },
    })
    fireEvent.click(checkBox)

    fireEvent.click(submit)
    await waitFor(() => expect(onSubmit).toBeCalledTimes(1))
  })

  it('displays correct error message that is passed', () => {
    const errorMessage = "User doesn't exist"
    render(
      <MockSignup errorMessage={errorMessage} hasError onSubmit={onSubmit} />,
    )
    const errText = screen.getByText(errorMessage)
    expect(errText.innerHTML).toBe(errorMessage)
  })

  it('displays spinner on loading', () => {
    render(<MockSignup loading onSubmit={onSubmit} />)
    const spinner = screen.getByRole('img', { name: 'loading' })
    expect(spinner).toBeTruthy()
  })

  it('renders without accessibility errors', async () => {
    const { container } = render(<MockSignup onSubmit={onSubmit} />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  }, 10000)
})

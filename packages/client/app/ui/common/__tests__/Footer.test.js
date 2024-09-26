import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies

import { BrowserRouter } from 'react-router-dom'
import { render, screen, axe, renderer } from '../../../testUtils'
import Footer from '../Footer'

const MockFooter = props => (
  <BrowserRouter>
    <Footer {...props} />
  </BrowserRouter>
)

describe('Footer', () => {
  it('matches snapshot', () => {
    const FooterComponent = renderer.create(<MockFooter />).toJSON()
    expect(FooterComponent).toMatchSnapshot()
  })
  it('renders correct link', () => {
    const items = [
      'Terms of Use',
      'Privacy Policy',
      'A project of HHMI Biointeractive',
    ]

    render(<MockFooter />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(3)
    links.forEach((link, i) => {
      expect(link.textContent).toBe(items[i])
    })
  })
  it('renders with no accessibility errors', async () => {
    const { container } = render(<MockFooter />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})

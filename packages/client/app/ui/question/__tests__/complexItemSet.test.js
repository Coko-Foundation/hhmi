import React from 'react'
import ComplexItemSetForm from '../ComplexItemSetForm'
import { render, renderer, userEvent, waitFor } from '../../../testUtils'

const onSave = jest.fn()

const MockForm = props => {
  return <ComplexItemSetForm onSave={onSave} {...props} />
}

const title = 'Test set 1'

const editorText =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.'

const titlePlaceholder = 'Enter title for Complex item set'

describe('ComplexItemSetForm', () => {
  it('matches snapshot', () => {
    const FormComponent = renderer.create(<MockForm />).toJSON()
    expect(FormComponent).toMatchSnapshot()
  })

  it('displays correct title and content', () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [{ type: 'text', text: editorText }],
        },
      ],
    }

    const { getByPlaceholderText, container } = render(
      <MockForm content={content} title={title} />,
    )

    const titleInput = getByPlaceholderText(titlePlaceholder)
    const waxEditor = container.querySelector('#wax-editor')

    expect(titleInput.value).toBe(title)
    expect(waxEditor).toHaveTextContent(editorText)
  })

  it('calls onSave on submitting the form', async () => {
    const { getByText, getByPlaceholderText } = render(<MockForm />)

    const titleInput = getByPlaceholderText(titlePlaceholder)
    await userEvent.type(titleInput, 'set 1')
    const saveBtn = getByText('Save')
    await userEvent.click(saveBtn)
    await waitFor(() => {
      expect(onSave).toHaveBeenCalled()
    })
  })

  it('displays spinner on loadingData is true', () => {
    const { getByTestId } = render(<MockForm loadingData />)
    const spinner = getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('displays popup when warning is true', async () => {
    const { getByText } = render(<MockForm title={title} warning />)

    const saveBtn = getByText('Save')
    await userEvent.click(saveBtn)

    const modalText = getByText(
      'Are you sure you want to update this complex set?',
    )

    await waitFor(() => expect(modalText).toBeInTheDocument())
  })

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('renders without accessibility error', async () => {
  //   const { container } = render(<MockForm />)
  //   const result = await axe(container)
  //   expect(result).toHaveNoViolations()
  // }, 15000)
})

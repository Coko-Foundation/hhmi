const { createUser } = require('../../../models/__tests__/__helpers__/users')
const { createQuestion } = require('../../question.controllers')

const waxDocumentOne = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        { text: 'Here’s all the possible question types:', type: 'text' },
      ],
    },
    {
      type: 'true_false_container',
      attrs: {
        id: '549db3a4-554e-4dd5-9948-6d2339b7fd1f',
        class: 'true-false',
      },
      content: [
        {
          type: 'question_node_true_false',
          attrs: {
            id: '130486dd-096f-4850-b545-a3594b0d20ef',
            class: 'true-false-question',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                {
                  text: 'Question 1: True/false, multiple can be correct',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          type: 'true_false',
          attrs: {
            id: '75e18065-cb64-435e-8a62-41c344b1358f',
            class: 'true-false-option',
            answer: false,
            correct: false,
            feedback: 'Feedback 1',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 1 is false.', type: 'text' }],
            },
          ],
        },
        {
          type: 'true_false',
          attrs: {
            id: '812d513b-43d2-4cab-9d4b-2e1d7028f9d6',
            class: 'true-false-option',
            answer: false,
            correct: false,
            feedback: 'Feedback 2',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 2 is false.', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      type: 'multiple_choice_container',
      attrs: {
        id: '0a2715e0-fb88-413f-a55a-30562d9bb57c',
        class: 'multiple-choice',
      },
      content: [
        {
          type: 'question_node_multiple',
          attrs: {
            id: 'c7696205-f64b-46a5-bb00-62dbb0253f8f',
            class: 'multiple-choice-question',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                {
                  text: 'Question 2: multiple choice, multiple can be correct',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: '0f49fd09-a13c-46cf-9bca-120518576cc0',
            class: 'multiple-choice-option',
            answer: true,
            correct: true,
            feedback: 'Feedback 3',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 3 is correct', type: 'text' }],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: '36ce7d1b-1899-4d74-814c-8db151b3e5dc',
            class: 'multiple-choice-option',
            answer: false,
            correct: false,
            feedback: 'Feedback 4',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 4 is incorrect', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      type: 'true_false_single_correct_container',
      attrs: {
        id: '0845f14f-dddb-42ae-8835-38b63d7a25ef',
        class: 'true-false-single-correct',
      },
      content: [
        {
          type: 'question_node_true_false_single',
          attrs: {
            id: '6e74a71c-ac42-477c-b6be-f8d180488c7e',
            class: 'true-false-question-single',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                {
                  text: 'Question 3: true/false, single correct',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          type: 'true_false_single_correct',
          attrs: {
            id: 'cc2c31fe-60f7-49c9-b048-7a688a78dd1e',
            class: 'true-false-single-correct-option',
            answer: true,
            correct: true,
            feedback: 'Feedback 5',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 5 is correct', type: 'text' }],
            },
          ],
        },
        {
          type: 'true_false_single_correct',
          attrs: {
            id: '675b6ba0-7e1d-448b-acc7-d5ff9bae528f',
            class: 'true-false-single-correct-option',
            answer: false,
            correct: false,
            feedback: 'Feeback 6',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 6 is incorrect', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      type: 'multiple_choice_single_correct_container',
      attrs: {
        id: 'd8a33023-2a61-4f98-8786-915b3867acfe',
        class: 'multiple-choice-single-correct',
        correctId: '',
      },
      content: [
        {
          type: 'question_node_multiple_single',
          attrs: {
            id: '6f124606-e2b7-48c8-b339-3d45fb6a844e',
            class: 'multiple-choice-question-single',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                {
                  text: 'Question 4: multiple choice, single correct',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice_single_correct',
          attrs: {
            id: '456162dc-4cbc-48ef-922d-39968fca2879',
            class: 'multiple-choice-option-single-correct',
            answer: false,
            correct: false,
            feedback: 'Feedback 7',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 7 is incorrect', type: 'text' }],
            },
          ],
        },
        {
          type: 'multiple_choice_single_correct',
          attrs: {
            id: '076b7466-3eb4-401b-9379-82a35d61dc3e',
            class: 'multiple-choice-option-single-correct',
            answer: true,
            correct: true,
            feedback: 'Feedback 8',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Answer 8 is correct', type: 'text' }],
            },
          ],
        },
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [{ text: '', type: 'text' }],
        },
      ],
    },
  ],
}

const waxDocumentTwo = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'More test cases', type: 'text' }],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        { text: 'Bold text', type: 'text', marks: [{ type: 'strong' }] },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'Italic text', type: 'text', marks: [{ type: 'em' }] }],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'Code line', type: 'text', marks: [{ type: 'code' }] }],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        {
          text: 'Hyperlink',
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                rel: '',
                href: 'google.com',
                title: null,
                target: 'blank',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        {
          text: 'Strikethrough',
          type: 'text',
          marks: [
            {
              type: 'strikethrough',
              attrs: {
                class: 'strikethrough',
                style: 'text-decoration:line-through',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        { text: 'Underline', type: 'text', marks: [{ type: 'underline' }] },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        { text: 'Subscript', type: 'text' },
        { text: 'base', type: 'text', marks: [{ type: 'subscript' }] },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        { text: 'Superscript', type: 'text' },
        { text: 'power', type: 'text', marks: [{ type: 'superscript' }] },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        {
          text: 'Small Caps',
          type: 'text',
          marks: [{ type: 'smallcaps', attrs: { class: 'small-caps' } }],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'Ordered list:', type: 'text' }],
    },
    {
      type: 'orderedlist',
      attrs: { order: 1, track: [] },
      content: [
        {
          type: 'list_item',
          attrs: { track: [] },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'First', type: 'text' }],
            },
          ],
        },
        {
          type: 'list_item',
          attrs: { track: [] },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Second', type: 'text' }],
            },
          ],
        },
        {
          type: 'list_item',
          attrs: { track: [] },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Third', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'Unordered list:', type: 'text' }],
    },
    {
      type: 'bulletlist',
      attrs: { track: [] },
      content: [
        {
          type: 'list_item',
          attrs: { track: [] },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Item', type: 'text' }],
            },
          ],
        },
        {
          type: 'list_item',
          attrs: { track: [] },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Item', type: 'text' }],
            },
          ],
        },
        {
          type: 'list_item',
          attrs: { track: [] },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Item', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      type: 'table',
      content: [
        {
          type: 'table_row',
          content: [
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: '[0,0]', type: 'text' }],
                },
              ],
            },
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: '[0,1]', type: 'text' }],
                },
              ],
            },
          ],
        },
        {
          type: 'table_row',
          content: [
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: '[1,0]', type: 'text' }],
                },
              ],
            },
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: '[1,1]', type: 'text' }],
                },
              ],
            },
          ],
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'Essay upcoming', type: 'text' }],
    },
    {
      type: 'essay_container',
      attrs: { id: 'd0d29cd9-9060-4b53-85ec-cc8f09191111', class: 'essay' },
      content: [
        {
          type: 'essay_question',
          attrs: {
            id: 'a83866b8-ca51-437d-b00b-c4144bcc82c5',
            class: 'essay-question',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                { text: 'Here is an example of an essay.', type: 'text' },
              ],
            },
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Paragragh two, looking good.', type: 'text' }],
            },
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                {
                  text: 'Some bold text in the essay',
                  type: 'text',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Is it still bold?', type: 'text' }],
            },
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                { text: 'code//', type: 'text', marks: [{ type: 'code' }] },
              ],
            },
          ],
        },
        {
          type: 'essay_answer',
          attrs: {
            id: 'cf8298b8-71ca-41fc-9853-3b3742112f80',
            class: 'essay-answer',
          },
          content: [{ type: 'paragraph', attrs: { class: 'paragraph' } }],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'Fill the gap', type: 'text' }],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'fill_the_gap_container',
      attrs: {
        id: 'a6511b6a-07c3-4312-9193-38838ba80fcd',
        class: 'fill-the-gap',
        feedback: 'Fill the gap feedback',
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            { text: 'The earth is ', type: 'text' },
            {
              type: 'fill_the_gap',
              attrs: {
                id: '016ab874-0277-4701-93d5-fc70d0026072',
                class: 'fill-the-gap',
                answer: '',
              },
              content: [{ text: 'round', type: 'text' }],
            },
            { text: '.', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'fill_the_gap_container',
      attrs: {
        id: 'b263029e-d504-4e12-96fc-8953e83ff43d',
        class: 'fill-the-gap',
        feedback: 'Fill the gap container feedback, 2?',
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            { text: 'Testing ', type: 'text' },
            {
              type: 'fill_the_gap',
              attrs: {
                id: 'e5bbd357-fa78-4d5d-b8ba-14d887426871',
                class: 'fill-the-gap',
                answer: '',
              },
              content: [{ text: 'this', type: 'text' }],
            },
            { text: '.', type: 'text' },
          ],
        },
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            { text: 'Another paragraph ', type: 'text' },
            {
              type: 'fill_the_gap',
              attrs: {
                id: 'a55b7dec-8614-404e-abbf-5fc95c3d974f',
                class: 'fill-the-gap',
                answer: '',
              },
              content: [{ text: 'okay', type: 'text' }],
            },
            { text: '.', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'multiple dropdown', type: 'text' }],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'multiple_drop_down_container',
      attrs: {
        id: '6c2eded5-5ade-4af7-acb2-5c26c8a18764',
        class: 'multiple-drop-down-container',
        feedback: 'Multi drop down feedback 1',
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            { text: ' One ', type: 'text' },
            {
              type: 'multiple_drop_down_option',
              attrs: {
                id: 'be618399-c319-44cf-9f74-59b0aeda7249',
                class: 'multiple-drop-down-option',
                answer: '',
                correct: 'b7ab3b6d-c481-4615-bc1b-e884a9c7d5cb',
                options: [
                  {
                    label: 'two',
                    value: 'b7ab3b6d-c481-4615-bc1b-e884a9c7d5cb',
                  },
                  {
                    label: '2',
                    value: 'b56fb3b7-c35a-4a68-a4c4-0faddb53021b',
                  },
                ],
              },
            },
            { text: 'three ', type: 'text' },
            {
              type: 'multiple_drop_down_option',
              attrs: {
                id: '83d50d84-0d08-433f-862e-89f33c6e8ce0',
                class: 'multiple-drop-down-option',
                answer: '',
                correct: '03e2367a-097a-4607-9c42-b000fb871212',
                options: [
                  {
                    label: 'four',
                    value: '03e2367a-097a-4607-9c42-b000fb871212',
                  },
                  {
                    label: '4',
                    value: '31052123-202e-4fa1-bbff-98a57e5aa744',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      type: 'multiple_drop_down_container',
      attrs: {
        id: '169c0cb1-837e-451e-b9e4-a70be2c0cd2c',
        class: 'multiple-drop-down-container',
        feedback: 'Multi drop down feedback 2',
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            { text: 'So here is a ', type: 'text' },
            {
              type: 'multiple_drop_down_option',
              attrs: {
                id: '347dd59c-b405-47d8-85b3-6b0d779cf7e6',
                class: 'multiple-drop-down-option',
                answer: '',
                correct: '2d979d2d-132e-4460-bebe-8e6f4a15bf37',
                options: [
                  {
                    label: 'dropdown option',
                    value: '2d979d2d-132e-4460-bebe-8e6f4a15bf37',
                  },
                  {
                    label: 'another option',
                    value: 'a578c9ff-836f-4de4-97fc-b5d2d8e7293d',
                  },
                ],
              },
            },
            { text: '. Here is another ', type: 'text' },
            {
              type: 'multiple_drop_down_option',
              attrs: {
                id: '7d35657a-20ba-4fea-9865-9f7b9872a17d',
                class: 'multiple-drop-down-option',
                answer: '',
                correct: '6ae4b01d-c154-4ff4-b1ff-5d6f5643e19a',
                options: [
                  {
                    label: 'yo',
                    value: 'a0184b2b-e0c9-4354-822d-10cbcf3b39ee',
                  },
                  { label: '2', value: '6ae4b01d-c154-4ff4-b1ff-5d6f5643e19a' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: 'Matching', type: 'text' }],
    },
    {
      type: 'matching_container',
      attrs: {
        id: 'b86a78b3-b686-4ba6-a2e9-99a7eaeef5d4',
        class: 'matching-container',
        options: [
          { label: 'Option 1', value: '99d65aba-c9a5-473b-8ec9-f426a85eb5dd' },
          { label: 'Option 2', value: '3f07aa28-309b-4602-a151-9d0edaab77dd' },
        ],
        feedback: 'Matching container feedback',
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            {
              type: 'matching_option',
              attrs: {
                id: 'bc7c09e0-9a6d-499f-ae16-c09fc2ec4bae',
                class: 'matching-option',
                answer: '',
                correct: '99d65aba-c9a5-473b-8ec9-f426a85eb5dd',
                isfirst: true,
                options: [
                  {
                    label: 'Option 1',
                    value: '99d65aba-c9a5-473b-8ec9-f426a85eb5dd',
                  },
                  {
                    label: 'Option 2',
                    value: '3f07aa28-309b-4602-a151-9d0edaab77dd',
                  },
                ],
              },
              content: [{ text: 'Matching text 1', type: 'text' }],
            },
            {
              type: 'matching_option',
              attrs: {
                id: '7bfa9115-7339-4d9e-8432-1bfa1f854cd7',
                class: 'matching-option',
                answer: '',
                correct: '3f07aa28-309b-4602-a151-9d0edaab77dd',
                isfirst: false,
                options: [
                  {
                    label: 'Option 1',
                    value: '99d65aba-c9a5-473b-8ec9-f426a85eb5dd',
                  },
                  {
                    label: 'Option 2',
                    value: '3f07aa28-309b-4602-a151-9d0edaab77dd',
                  },
                ],
              },
              content: [{ text: 'Matching text 2', type: 'text' }],
            },
          ],
        },
        { type: 'paragraph', attrs: { class: 'paragraph' } },
      ],
    },
  ],
}

const waxDocumentThree = {
  type: 'doc',
  content: [
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'figure',
      content: [
        {
          type: 'image',
          attrs: {
            alt: null,
            src: 'data:image/png;base64,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',
            title: null,
            fileid: null,
          },
        },
        {
          type: 'figcaption',
          attrs: { class: 'decoration' },
          content: [{ text: 'Image caption', type: 'text' }],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [{ text: ' ', type: 'text' }],
    },
  ],
}

const waxDocumentFour = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        {
          text: 'Welcome',
          type: 'text',
          marks: [{ type: 'smallcaps', attrs: { class: 'small-caps' } }],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        { text: 'Wilkommen', type: 'text', marks: [{ type: 'strong' }] },
        { text: '.', type: 'text' },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        {
          text: 'Let’s give this a good test. Or a more in-depth one at least 😉',
          type: 'text',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        {
          text: 'Below we have a number of questions. What do celebrities know? Do they know anything? Let’s find out.',
          type: 'text',
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'figure',
      content: [
        {
          type: 'image',
          attrs: {
            alt: null,
            src: 'data:image/png;base64,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',
            title: null,
            fileid: null,
          },
        },
        {
          type: 'figcaption',
          attrs: { class: 'decoration' },
          content: [
            {
              text: 'Here’s a little screenshot. Nothing major.',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      type: 'multiple_choice_single_correct_container',
      attrs: {
        id: '2fb31336-f644-490a-8666-8db4f89ee2d5',
        class: 'multiple-choice-single-correct',
        correctId: '',
      },
      content: [
        {
          type: 'question_node_multiple_single',
          attrs: {
            id: '5d88afd6-7c56-45e3-a566-24bf65df95fc',
            class: 'multiple-choice-question-single',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                { text: 'What kind of document is above?', type: 'text' },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice_single_correct',
          attrs: {
            id: '0dff712f-efd9-43c6-b7bb-aa0b4eaee7a4',
            class: 'multiple-choice-option-single-correct',
            answer: false,
            correct: false,
            feedback: "No, it's not...",
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Keynote presentation', type: 'text' }],
            },
          ],
        },
        {
          type: 'multiple_choice_single_correct',
          attrs: {
            id: 'f27b73b8-8d17-486c-a962-b1ce1ecfe1ba',
            class: 'multiple-choice-option-single-correct',
            answer: false,
            correct: false,
            feedback: 'Ha, nice one, but no.',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Wax document...?', type: 'text' }],
            },
          ],
        },
        {
          type: 'multiple_choice_single_correct',
          attrs: {
            id: '4c9052cb-d333-4f18-9085-090401373ace',
            class: 'multiple-choice-option-single-correct',
            answer: false,
            correct: true,
            feedback: 'Hooray!',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Word document', type: 'text' }],
            },
          ],
        },
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [{ text: ' ', type: 'text' }],
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'true_false_single_correct_container',
      attrs: {
        id: '7abdb234-78e7-4614-95be-d3529f303862',
        class: 'true-false-single-correct',
      },
      content: [
        {
          type: 'question_node_true_false_single',
          attrs: {
            id: 'a5b82f59-04f8-4825-b6db-1985e3c8df9c',
            class: 'true-false-question-single',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                { text: 'This file was downloaded on Safari.', type: 'text' },
              ],
            },
          ],
        },
        {
          type: 'true_false_single_correct',
          attrs: {
            id: '27741640-6e5b-44da-b06a-71c0462097d4',
            class: 'true-false-single-correct-option',
            answer: false,
            correct: true,
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'True', type: 'text' }],
            },
          ],
        },
        {
          type: 'true_false_single_correct',
          attrs: {
            id: 'b1a52323-aaf2-46c4-8a18-f6d01cc47cd7',
            class: 'true-false-single-correct-option',
            answer: false,
            correct: false,
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'False', type: 'text' }],
            },
          ],
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'multiple_choice_container',
      attrs: {
        id: '1c99733e-0d28-4a0b-afbb-c4e2d1e93286',
        class: 'multiple-choice',
      },
      content: [
        {
          type: 'question_node_multiple',
          attrs: {
            id: '77e77d2b-2e3c-4b4d-b829-22d9141d7a19',
            class: 'multiple-choice-question',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'The sky is', type: 'text' }],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: 'd9b8e975-3837-4a30-aed6-bcb47aa72622',
            class: 'multiple-choice-option',
            answer: false,
            correct: true,
            feedback: "Eh, I'll give it to you",
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'Infinite', type: 'text' }],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: '2a7ffb6f-08f0-4247-8d14-64435c46be0f',
            class: 'multiple-choice-option',
            answer: false,
            correct: false,
            feedback: 'not this again...',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [
                { text: 'a glass dome over the flat earth', type: 'text' },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: 'f9c33920-af2b-43fe-ad43-f62c12585172',
            class: 'multiple-choice-option',
            answer: false,
            correct: true,
            feedback: 'I guess it is.',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'blue?', type: 'text' }],
            },
          ],
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'true_false_container',
      attrs: {
        id: '2ed55431-3735-44eb-b729-66f0c161e334',
        class: 'true-false',
      },
      content: [
        {
          type: 'question_node_true_false',
          attrs: {
            id: '726551b0-6346-4e68-a668-856f9dde872e',
            class: 'true-false-question',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'True is correct?', type: 'text' }],
            },
          ],
        },
        {
          type: 'true_false',
          attrs: {
            id: '8d937fb2-6ad4-4f92-81cf-590f81479c4c',
            class: 'true-false-option',
            answer: false,
            correct: false,
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'False', type: 'text' }],
            },
          ],
        },
        {
          type: 'true_false',
          attrs: {
            id: '5a7ed737-5288-45da-85fc-da68513bf27f',
            class: 'true-false-option',
            answer: false,
            correct: true,
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'True', type: 'text' }],
            },
          ],
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'essay_container',
      attrs: { id: 'dc87bdbb-a422-4fe6-8790-98d2529f2d27', class: 'essay' },
      content: [
        {
          type: 'essay_question',
          attrs: {
            id: '25fd48e0-e6e8-4503-88af-82587225e694',
            class: 'essay-question',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'paragraph' },
              content: [{ text: 'What is the meaning of life?', type: 'text' }],
            },
          ],
        },
        {
          type: 'essay_answer',
          attrs: {
            id: '32aff1db-906a-4e0c-a9ed-dfee65af2d05',
            class: 'essay-answer',
          },
          content: [{ type: 'paragraph', attrs: { class: 'paragraph' } }],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: { class: 'paragraph' },
      content: [
        { text: 'Here’s a ', type: 'text' },
        {
          text: 'random link',
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                rel: '',
                href: 'https://www.netflix.com/watch/80215734?trackId=14170289&tctx=2%2C0%2Cd8dbf036-7129-4be1-9f3f-1cfbf855b9e3-74880737%2CNES_E4FBAB14202BCDD9EC7A3736AABC00-B9F225DDE3A711-225509BFF3_p_1666791331821%2CNES_E4FBAB14202BCDD9EC7A3736AABC00_p_1666791331821%2C%2C%2C%2C80025678',
                title: null,
                target: 'blank',
              },
            },
          ],
        },
        { text: ' to an episode of The Crown.', type: 'text' },
      ],
    },
    {
      type: 'table',
      content: [
        {
          type: 'table_row',
          content: [
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: 'Here’s ', type: 'text' }],
                },
              ],
            },
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: 'a ', type: 'text' }],
                },
              ],
            },
          ],
        },
        {
          type: 'table_row',
          content: [
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: 'random', type: 'text' }],
                },
              ],
            },
            {
              type: 'table_cell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { class: 'paragraph' },
                  content: [{ text: 'table', type: 'text' }],
                },
              ],
            },
          ],
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'fill_the_gap_container',
      attrs: {
        id: '87b57e10-b6bf-4113-9491-8667f7a0dcc8',
        class: 'fill-the-gap',
        feedback: "It's the big news lately.",
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            { text: 'Rishi ', type: 'text' },
            {
              type: 'fill_the_gap',
              attrs: {
                id: 'ddbb3487-e708-419e-b17f-2e59bfba7223',
                class: 'fill-the-gap',
                answer: '',
              },
              content: [{ text: 'Sunak', type: 'text' }],
            },
            { text: 'is the new Prime Minister of the UK.', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'multiple_drop_down_container',
      attrs: {
        id: '4335e4f9-26ae-4254-84c6-6bb58d7a919c',
        class: 'multiple-drop-down-container',
        feedback: 'Cool.',
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            { text: 'Anywho, ', type: 'text' },
            {
              type: 'multiple_drop_down_option',
              attrs: {
                id: '0858df9d-6096-4b79-9e42-fbfd5eec262b',
                class: 'multiple-drop-down-option',
                answer: '',
                correct: '1454ae35-db54-4226-8903-3e7734ec90f5',
                options: [
                  {
                    label: 'Liz Truss',
                    value: '1454ae35-db54-4226-8903-3e7734ec90f5',
                  },
                  {
                    label: 'Boris Johnson',
                    value: 'fe225c03-c094-4083-b05e-a2f7b8cc4c67',
                  },
                ],
              },
            },
            { text: ' served as PM before ', type: 'text' },
            {
              type: 'multiple_drop_down_option',
              attrs: {
                id: '71febd08-9997-403b-bfeb-a3e553057199',
                class: 'multiple-drop-down-option',
                answer: '',
                correct: '3a4c5cd2-aea5-42f2-bb80-e1b0d76107ef',
                options: [
                  {
                    label: 'Boris Johnson',
                    value: '9dc503a2-e3a9-4815-973e-f9084888bf3c',
                  },
                  {
                    label: 'Rishi Sunak',
                    value: '3a4c5cd2-aea5-42f2-bb80-e1b0d76107ef',
                  },
                ],
              },
            },
            { text: '.', type: 'text' },
          ],
        },
      ],
    },
    { type: 'paragraph', attrs: { class: 'paragraph' } },
    {
      type: 'matching_container',
      attrs: {
        id: 'a9449d96-97c9-4a51-9bc3-9f2e8f26b6cc',
        class: 'matching-container',
        options: [
          {
            label: 'made of soy beans',
            value: '4fda9a5e-08d2-4914-89c8-1fc8bf74df53',
          },
          { label: 'cold', value: '95db66c4-db7d-487f-8b6b-2edb7408ee4f' },
          { label: 'nice', value: '9aa51d5b-f53d-4ab4-8aba-7728cae6f4fb' },
        ],
        feedback: 'Gotta think about the box with this one.',
      },
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [
            {
              type: 'matching_option',
              attrs: {
                id: 'ad9da566-b7ab-4a44-acd6-f86405cbc350',
                class: 'matching-option',
                answer: '',
                correct: '9aa51d5b-f53d-4ab4-8aba-7728cae6f4fb',
                isfirst: true,
                options: [
                  {
                    label: 'made of soy beans',
                    value: '4fda9a5e-08d2-4914-89c8-1fc8bf74df53',
                  },
                  {
                    label: 'cold',
                    value: '95db66c4-db7d-487f-8b6b-2edb7408ee4f',
                  },
                  {
                    label: 'nice',
                    value: '9aa51d5b-f53d-4ab4-8aba-7728cae6f4fb',
                  },
                ],
              },
              content: [{ text: 'Cold meats are', type: 'text' }],
            },
            {
              type: 'matching_option',
              attrs: {
                id: '467d6041-026a-4957-9ec1-91be188391f9',
                class: 'matching-option',
                answer: '',
                correct: '95db66c4-db7d-487f-8b6b-2edb7408ee4f',
                isfirst: false,
                options: [
                  {
                    label: 'made of soy beans',
                    value: '4fda9a5e-08d2-4914-89c8-1fc8bf74df53',
                  },
                  {
                    label: 'cold',
                    value: '95db66c4-db7d-487f-8b6b-2edb7408ee4f',
                  },
                  {
                    label: 'nice',
                    value: '9aa51d5b-f53d-4ab4-8aba-7728cae6f4fb',
                  },
                ],
              },
              content: [{ text: 'Words are', type: 'text' }],
            },
            {
              type: 'matching_option',
              attrs: {
                id: 'bfd8fde9-ca92-4822-87cd-5802d7cf5edb',
                class: 'matching-option',
                answer: '',
                correct: '4fda9a5e-08d2-4914-89c8-1fc8bf74df53',
                isfirst: false,
                options: [
                  {
                    label: 'made of soy beans',
                    value: '4fda9a5e-08d2-4914-89c8-1fc8bf74df53',
                  },
                  {
                    label: 'cold',
                    value: '95db66c4-db7d-487f-8b6b-2edb7408ee4f',
                  },
                  {
                    label: 'nice',
                    value: '9aa51d5b-f53d-4ab4-8aba-7728cae6f4fb',
                  },
                ],
              },
              content: [{ text: 'Soy milk is', type: 'text' }],
            },
          ],
        },
        { type: 'paragraph', attrs: { class: 'paragraph' } },
      ],
    },
  ],
}

const apBioCourse = [
  {
    units: [
      {
        unit: 'naturalSelection',
        courseTopic: 'populationGenetics',
        learningObjective: 'EVO-1.I',
        essentialKnowledge: 'EVO-1.I.1',
      },
    ],
    course: 'apBiology',
  },
]

const exampleQuestionVersion = {
  affectiveLevel: 'characterization',
  biointeractiveResources: [
    'aTPSynthesis',
    'biochemistryAndCellSignalingPathwayOfTheMc1rGene',
  ],
  cognitiveLevel: 'higher-create',
  content: waxDocumentOne,
  courses: apBioCourse,
  keywords: ['test this', 'yo'],
  psychomotorLevel: 'skilledMovements',
  published: false,
  questionType: 'multipleChoice',
  submitted: false,
  underReview: false,
  topics: [
    { topic: 'biochemistryMolecularBiology', subtopic: 'generalChemistry' },
  ],
}

const exampleQuestionVersionTwo = {
  affectiveLevel: 'characterization',
  biointeractiveResources: [
    'aTPSynthesis',
    'biochemistryAndCellSignalingPathwayOfTheMc1rGene',
  ],
  cognitiveLevel: 'higher-create',
  content: waxDocumentThree,
  courses: apBioCourse,
  keywords: ['test this', 'yo'],
  psychomotorLevel: 'skilledMovements',
  published: false,
  questionType: 'multipleChoice',
  submitted: false,
  underReview: false,
  topics: [
    { topic: 'biochemistryMolecularBiology', subtopic: 'generalChemistry' },
  ],
}

const createEmptyQuestion = async () => {
  const user = await createUser()
  const question = await createQuestion(user.id)

  return question
}

module.exports = {
  createEmptyQuestion,
  exampleQuestionVersion,
  exampleQuestionVersionTwo,
  waxDocumentTwo,
  waxDocumentFour,
}

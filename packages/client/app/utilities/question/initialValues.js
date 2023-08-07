const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Initial value: simple paragraph. Type your question content here. Go to Editor View story for more complex initial value',
        },
      ],
    },
  ],
}

const complexItemLeadingContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Leading content for the complex item set. Here is given the context for the following questions',
        },
      ],
    },
  ],
}

const editorInitialContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: {
        class: 'paragraph',
      },
      content: [
        {
          type: 'text',
          text: 'test test 1234',
        },
      ],
    },
    {
      type: 'multiple_choice_container',
      attrs: {
        id: '8fbb4bf0-dc85-4d5c-b07c-78ce9ff3066b',
        class: 'multiple-choice',
      },
      content: [
        {
          type: 'question_node_multiple',
          attrs: {
            class: 'multiple-choice-question',
            id: '5a5659c1-6c0a-48c2-93f9-7588d2728083',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: 'paragraph',
              },
              content: [
                {
                  type: 'text',
                  text: 'check the true ones',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            class: 'multiple-choice-option',
            id: 'c5a851e9-70a4-4857-bfc9-9be5e1e1fcc2',
            correct: true,
            answer: false,
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: 'paragraph',
              },
              content: [
                {
                  type: 'text',
                  text: 'true',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            class: 'multiple-choice-option',
            id: 'a64ed837-186a-42cc-8085-a98f8a91eec5',
            correct: false,
            answer: false,
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: 'paragraph',
              },
              content: [
                {
                  type: 'text',
                  text: 'false',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            class: 'multiple-choice-option',
            id: '6eb402e1-76fe-4f71-84fc-cfa2f80fb957',
            correct: true,
            answer: false,
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: 'paragraph',
              },
              content: [
                {
                  type: 'text',
                  text: 'also true',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const initialMetadataValues = {
  topics: [
    {
      topic: 'genetics',
      subtopic: 'patternsOfInheritance',
    },
    {
      topic: 'cellBiology',
      subtopic: 'cellStructureFunction',
    },
  ],
  courses: [
    {
      course: 'apEnvironmentalScience',
      units: [
        {
          unit: 'populations',
          courseTopic: 'generalistAndSpecialistSpecies',
          learningObjective: 'ERT-3.A',
          essentialKnowledge: 'ERT-3.A.1',
        },
        {
          unit: 'theLivingWorldEcosystems',
          courseTopic: 'terrestrialBiomes',
          learningObjective: 'ERT-1.B',
          essentialKnowledge: 'ERT-1.B.2',
        },
      ],
    },
    {
      course: 'biEnvironmentalScience',
      units: [
        {
          unit: 'ecosystemsAndEcology',
          courseTopic: 'communitiesAndEcosystems',
          application: 'IBES-A2.2.3',
          understanding: 'IBES-U2.2.4',
        },
      ],
    },
  ],
  biointeractiveResources: [
    'biochemistryAndCellSignalingPathwayOfTheMc1rGene',
    'cysticFibrosisMechanismAndTreatment',
  ],
  cognitiveLevel: 'higher-understand',
  questionType: 'multipleChoice',
}

export {
  initialContent,
  complexItemLeadingContent,
  editorInitialContent,
  initialMetadataValues,
}

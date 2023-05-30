const biochemistry = {
  // questionId: '',
  questionType: 'multipleChoice',
  topics: [
    {
      topic: 'biochemistryMolecularBiology',
      subtopic: 'generalChemistry',
    },
  ],
  courses: [
    {
      course: 'apBiology',
      units: [
        {
          courseTopic: 'structureOfWaterAndHydrogenBonding',
          essentialKnowledge: 'SYI-1.A.1',
          learningObjective: 'SYI-1.A',
          unit: 'chemistryOfLife',
        },
      ],
    },
  ],
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
          class: 'paragraph',
        },
      },
      {
        type: 'multiple_choice_single_correct_container',
        attrs: {
          id: '243cc28f-8082-4bae-b7a2-7d6d0d85f5ba',
          class: 'multiple-choice-single-correct',
          correctId: '',
        },
        content: [
          {
            type: 'question_node_multiple_single',
            attrs: {
              id: '9a10bfec-a570-42f0-b088-799f0d7d92d0',
              class: 'multiple-choice-question-single',
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: 'paragraph',
                },
                content: [
                  {
                    text: 'Energy: carbohydrates :: structural materials:',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: 'ea2ca3f1-f720-41c6-8ddf-13de737e95e6',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: false,
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
                    text: 'water',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: 'ce77193c-a4fe-4b1a-a6e1-206e1875439a',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: false,
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
                    text: 'nucleotides',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: '1b8467e6-4f73-4f11-8280-a977e2ded186',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: false,
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
                    text: 'lipids',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: '8ad9cfa7-3a47-43a6-9437-13d567d727a2',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: true,
              feedback: 'correct answer',
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: 'paragraph',
                },
                content: [
                  {
                    text: 'proteins',
                    type: 'text',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  contentText:
    'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',

  keywords: ['generalchemistry', 'biochemistry'],
  biointeractiveResources: ['biochemistryAndCellSignalingPathwayOfTheMc1rGene'],
  cognitiveLevel: 'higher-create',
  affectiveLevel: 'valuing',
  psychomotorLevel: 'perceptualAbilities',
  readingLevel: null,
}

const anatomy = {
  questionType: 'multipleChoiceSingleCorrect',
  topics: [{ topic: 'anatomyPhysiology', subtopic: 'cardiovascularSystem' }],
  courses: [
    {
      units: [
        {
          unit: 'cellularEnergetics',
          courseTopic: 'enzymeStructure',
          learningObjective: 'ENE-1.D',
          essentialKnowledge: 'ENE-1.D.2',
        },
      ],
      course: 'apBiology',
    },
  ],

  keywords: ['anatomy', 'physiology'],
  biointeractiveResources: [],
  content: {
    type: 'doc',
    content: [
      {
        type: 'multiple_choice_single_correct_container',
        attrs: {
          id: 'c61c3ed2-14bc-4d50-ac83-3a1177992d87',
          class: 'multiple-choice-single-correct',
          correctId: '',
        },
        content: [
          {
            type: 'question_node_multiple_single',
            attrs: {
              id: '982d3292-77d0-41a8-a68b-31a361dd332e',
              class: 'multiple-choice-question-single',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [
                  { text: 'What substance from ', type: 'text' },
                  {
                    text: 'Bacillus thuringiensis ',
                    type: 'text',
                    marks: [{ type: 'em' }],
                  },
                  {
                    text: 'was most likely inserted into rice plants in the development of insect-resistant rice?',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: 'f462cf01-a08e-4ba7-823a-5f08a0b61fb5',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: false,
              feedback: '',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'sugar', type: 'text' }],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: 'fbeead5f-3afa-4a5b-939b-a68d2f6c4245',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: false,
              feedback: '',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'enzyme', type: 'text' }],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: 'e979c402-f948-4659-9628-95e36a102bec',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: false,
              feedback: '',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'protien', type: 'text' }],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              id: '061378b2-f9ba-4df3-8ff7-d885c2785b23',
              class: 'multiple-choice-option-single-correct',
              answer: false,
              correct: true,
              feedback: '',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'DNA', type: 'text' }],
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
    ],
  },
  contentText:
    'What substance from  Bacillus thuringiensis  was most likely inserted into rice plants in the development of insect-resistant rice? sugar enzyme protien DNA',
  cognitiveLevel: 'higher-analyze',
  affectiveLevel: 'valuing',
  psychomotorLevel: 'physicalAbilities',
  readingLevel: null,
}

const population = {
  questionType: 'multipleChoice',
  topics: [
    {
      topic: 'environmentalScience',
      subtopic: 'humanPopulationImpacts',
    },
  ],
  courses: [
    {
      course: 'apEnvironmentalScience',
      units: [
        {
          application: null,
          courseTopic: 'populationGrowthAndResourceAvailability',
          essentialKnowledge: 'ERT-3.F.1',
          learningObjective: 'ERT-3.F',
          skill: null,
          understanding: null,
          unit: 'populations',
        },
      ],
    },
  ],
  contentText:
    'By 2040, the world s population is expected to rise to approximately 20 billion 10 billion 7 billion 9 billion',
  keywords: ['population', 'environment'],
  biointeractiveResources: [],

  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
          class: 'paragraph',
        },
      },
      {
        type: 'multiple_choice_single_correct_container',
        attrs: {
          id: 'de3bebb1-4d9c-497f-b976-e6d27ba83993',
          class: 'multiple-choice-single-correct',
          correctId: '',
        },
        content: [
          {
            type: 'question_node_multiple_single',
            attrs: {
              id: 'd049d160-09f0-4164-89ea-ce68206e036a',
              class: 'multiple-choice-question-single',
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
                    text: 'By 2040, the world s population is expected to rise to approximately',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              class: 'multiple-choice-option-single-correct',
              id: '62c9a024-b7df-4b1c-a884-3cb29fa03dff',
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
                    text: '20 billion',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              class: 'multiple-choice-option-single-correct',
              id: '8cf0e956-b4df-49eb-9be5-accb344fa3ff',
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
                    text: '10 billion',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              class: 'multiple-choice-option-single-correct',
              id: 'e79e6d30-c6ce-4df8-8f64-c2e031918e73',
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
                    text: '7 billion',
                  },
                ],
              },
            ],
          },
          {
            type: 'multiple_choice_single_correct',
            attrs: {
              class: 'multiple-choice-option-single-correct',
              id: 'f845db43-69c8-461b-bb1e-5a25b6d6b2b9',
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
                    text: '9 billion',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  cognitiveLevel: 'higher-evaluate',
  affectiveLevel: 'valuing',
  psychomotorLevel: 'nonDiscursiveCommunication',
  readingLevel: null,
}

module.exports = { biochemistry, anatomy, population }

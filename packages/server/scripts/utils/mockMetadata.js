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
        type: 'multiple_choice_container',
        attrs: {
          id: '3750db93-b005-48f6-93e3-e589404a0257',
          class: 'multiple-choice',
        },
        content: [
          {
            type: 'question_node_multiple',
            attrs: {
              id: '8325dfb6-9bef-446d-a144-b064f796d8f3',
              class: 'multiple-choice-question',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
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
            type: 'multiple_choice',
            attrs: {
              id: '2fcdf010-63bb-4802-8d5e-69103acdb358',
              class: 'multiple-choice-option',
              answer: false,
              correct: false,
              feedback: '',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'water', type: 'text' }],
              },
            ],
          },
          {
            type: 'multiple_choice',
            attrs: {
              id: '5db539f3-bcf7-4c34-8959-3c2339887085',
              class: 'multiple-choice-option',
              answer: false,
              correct: false,
              feedback: '',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'nucleotides', type: 'text' }],
              },
            ],
          },
          {
            type: 'multiple_choice',
            attrs: {
              id: 'd8b3f0e7-4595-4ad9-88e4-fda03a3e5e60',
              class: 'multiple-choice-option',
              answer: false,
              correct: false,
              feedback: '',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'lipids', type: 'text' }],
              },
            ],
          },
          {
            type: 'multiple_choice',
            attrs: {
              id: '3b51e422-cc5f-4937-af9e-3894ad313d74',
              class: 'multiple-choice-option',
              answer: false,
              correct: true,
              feedback: 'correct answer',
            },
            content: [
              {
                type: 'paragraph',
                attrs: { class: 'paragraph' },
                content: [{ text: 'proteins', type: 'text' }],
              },
            ],
          },
        ],
      },
    ],
  },
  contentText:
    'Energy: carbohydrates :: structural materials: water nucleotides lipids protiens ',

  keywords: ['generalchemistry', 'biochemistry'],
  biointeractiveResources: ['biochemistryAndCellSignalingPathwayOfTheMc1rGene'],
  cognitiveLevel: 'higher-create',
  affectiveLevel: 'valuing',
  psychomotorLevel: 'perceptualAbilities',
  readingLevel: null,
}

const anatomy = {
  questionType: 'multipleDropdowns',
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
        type: 'multiple_drop_down_container',
        attrs: {
          id: 'b42e5e37-2c59-4502-b5af-dee7e0bf19c3',
          class: 'multiple-drop-down-container',
          feedback: 'Protien is the right answer',
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
          {
            type: 'paragraph',
            attrs: { class: 'paragraph' },
            content: [
              {
                type: 'multiple_drop_down_option',
                attrs: {
                  id: '86d5e576-766e-4039-b1e1-ece3e109a00a',
                  class: 'multiple-drop-down-option',
                  answer: '',
                  correct: '3ca07851-382b-4ead-995c-9c3d55a63582',
                  options: [
                    {
                      label: 'protien',
                      value: '3ca07851-382b-4ead-995c-9c3d55a63582',
                    },
                    {
                      label: 'enzymes',
                      value: '67ace336-f3d6-486b-8e76-5dd164e7fe77',
                    },
                    {
                      label: 'nucleoids',
                      value: '04d6c259-01a9-41aa-81f7-858847ff1214',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  contentText:
    'What substance from  Bacillus thuringiensis  was most likely inserted into rice plants in the development of insect-resistant rice? ',
  cognitiveLevel: 'higher-analyze',
  affectiveLevel: 'valuing',
  psychomotorLevel: 'physicalAbilities',
  readingLevel: null,
}

const population = {
  questionType: 'fillInTheBlank',
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
    ' By 2040, the world s population is expected to rise to approximately 9 billion . ',
  keywords: ['population', 'environment'],
  biointeractiveResources: [],

  content: {
    type: 'doc',
    content: [
      {
        type: 'fill_the_gap_container',
        attrs: {
          id: '3e4771d8-e784-4e9e-8319-e3ee77bd297a',
          class: 'fill-the-gap',
          feedback: 'The world population will reach 9 billion',
        },
        content: [
          {
            type: 'paragraph',
            attrs: { class: 'paragraph' },
            content: [
              {
                text: ' By 2040, the world s population is expected to rise to approximately',
                type: 'text',
              },
              {
                type: 'fill_the_gap',
                attrs: {
                  id: '20ea2b4f-19c6-4f7f-824d-a213d41fcb62',
                  class: 'fill-the-gap',
                  answer: '',
                },
                content: [{ text: '9 billion', type: 'text' }],
              },
              { text: '.', type: 'text' },
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

const ecology = {
  questionType: 'matching',
  topics: [{ topic: 'ecology', subtopic: 'ecosystems' }],
  courses: [
    {
      units: [
        {
          unit: 'theLivingWorldEcosystems',
          skill: null,
          application: null,
          courseTopic: 'primaryProductivity',
          understanding: null,
          learningObjective: 'ENG-1.A',
          essentialKnowledge: 'ENG-1.A.1',
        },
      ],
      course: 'apEnvironmentalScience',
    },
  ],
  contentText:
    'Plants growing under direct sunlight are known as Plants growing under direct sunlight are known as Plants growing under direct sunlight are known as Plants growing under direct sunlight are known as',
  keywords: ['ecosystem', 'plants'],
  biointeractiveResources: [],

  content: {
    type: 'doc',
    content: [
      {
        type: 'matching_container',
        attrs: {
          id: '1b63d399-6706-4509-82f8-87d7bc6d0627',
          class: 'matching-container',
          options: [
            {
              label: 'climate ecosystem',
              value: '58c5c4e1-52ef-4471-927c-243d4a40cef4',
            },
            {
              label: 'ecological niche',
              value: '6fd4c66d-19ee-4807-951b-de1ada954f6c',
            },
            { label: 'biome', value: 'ae80d850-1a5c-4f9d-b534-896f89c91a58' },
            {
              label: 'edge effect',
              value: '20c7b886-401a-442e-8559-c94e786de746',
            },
          ],
          feedback: 'biome, edge effect, climate ecosystem, ecological niche',
        },
        content: [
          {
            type: 'paragraph',
            attrs: { class: 'paragraph' },
            content: [
              {
                type: 'matching_option',
                attrs: {
                  id: '37644703-a192-472a-b033-a93fd1f0f3f3',
                  class: 'matching-option',
                  answer: '',
                  correct: '6fd4c66d-19ee-4807-951b-de1ada954f6c',
                  isfirst: true,
                  options: [
                    {
                      label: 'climate ecosystem',
                      value: '58c5c4e1-52ef-4471-927c-243d4a40cef4',
                    },
                    {
                      label: 'ecological niche',
                      value: '6fd4c66d-19ee-4807-951b-de1ada954f6c',
                    },
                    {
                      label: 'biome',
                      value: 'ae80d850-1a5c-4f9d-b534-896f89c91a58',
                    },
                    {
                      label: 'edge effect',
                      value: '20c7b886-401a-442e-8559-c94e786de746',
                    },
                  ],
                },
                content: [
                  {
                    text: 'Plants growing under direct sunlight are known as',
                    type: 'text',
                  },
                ],
              },
              {
                type: 'matching_option',
                attrs: {
                  id: '4b3ddf9d-025f-430d-ae63-0d7df48f9a93',
                  class: 'matching-option',
                  answer: '',
                  correct: '20c7b886-401a-442e-8559-c94e786de746',
                  isfirst: false,
                  options: [
                    {
                      label: 'climate ecosystem',
                      value: '58c5c4e1-52ef-4471-927c-243d4a40cef4',
                    },
                    {
                      label: 'ecological niche',
                      value: '6fd4c66d-19ee-4807-951b-de1ada954f6c',
                    },
                    {
                      label: 'biome',
                      value: 'ae80d850-1a5c-4f9d-b534-896f89c91a58',
                    },
                    {
                      label: 'edge effect',
                      value: '20c7b886-401a-442e-8559-c94e786de746',
                    },
                  ],
                },
                content: [
                  {
                    text: 'Plants growing under direct sunlight are known as',
                    type: 'text',
                  },
                ],
              },
              {
                type: 'matching_option',
                attrs: {
                  id: '95fb42e3-d54b-4542-b5d9-11c9d6116fc4',
                  class: 'matching-option',
                  answer: '',
                  correct: '58c5c4e1-52ef-4471-927c-243d4a40cef4',
                  isfirst: false,
                  options: [
                    {
                      label: 'climate ecosystem',
                      value: '58c5c4e1-52ef-4471-927c-243d4a40cef4',
                    },
                    {
                      label: 'ecological niche',
                      value: '6fd4c66d-19ee-4807-951b-de1ada954f6c',
                    },
                    {
                      label: 'biome',
                      value: 'ae80d850-1a5c-4f9d-b534-896f89c91a58',
                    },
                    {
                      label: 'edge effect',
                      value: '20c7b886-401a-442e-8559-c94e786de746',
                    },
                  ],
                },
                content: [
                  {
                    text: 'Plants growing under direct sunlight are known as',
                    type: 'text',
                  },
                ],
              },
              {
                type: 'matching_option',
                attrs: {
                  id: '0e838852-f525-44f5-91d5-840c63848e6e',
                  class: 'matching-option',
                  answer: '',
                  correct: 'ae80d850-1a5c-4f9d-b534-896f89c91a58',
                  isfirst: false,
                  options: [
                    {
                      label: 'climate ecosystem',
                      value: '58c5c4e1-52ef-4471-927c-243d4a40cef4',
                    },
                    {
                      label: 'ecological niche',
                      value: '6fd4c66d-19ee-4807-951b-de1ada954f6c',
                    },
                    {
                      label: 'biome',
                      value: 'ae80d850-1a5c-4f9d-b534-896f89c91a58',
                    },
                    {
                      label: 'edge effect',
                      value: '20c7b886-401a-442e-8559-c94e786de746',
                    },
                  ],
                },
                content: [
                  {
                    text: 'Plants growing under direct sunlight are known as',
                    type: 'text',
                  },
                ],
              },
              { text: ' ', type: 'text' },
            ],
          },
        ],
      },
    ],
  },

  cognitiveLevel: 'higher-analyze',
  affectiveLevel: null,
  psychomotorLevel: null,
  readingLevel: null,
}

module.exports = { biochemistry, anatomy, population, ecology }

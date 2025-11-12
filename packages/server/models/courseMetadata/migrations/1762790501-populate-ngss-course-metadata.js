const { logger, useTransaction, uuid } = require('@coko/server')

const ngss = {
  label: 'Next Generation Science Standards',
  value: 'ngss',
  practice: [
    {
      label: 'Asking Questions and Defining Problems',
    },
    {
      label: 'Developing and Using Models',
    },
    {
      label: 'Planning and Carrying Out Investigations',
    },
    {
      label: 'Analyzing and Interpreting Data',
    },
    {
      label: 'Using Mathematics and Computational Thinking',
    },
    {
      label: 'Constructing Explanations and Designing Solutions',
    },
    {
      label: 'Engaging in Argument from Evidence',
    },
    {
      label: 'Obtaining, Evaluating, and Communicating Information',
    },
  ],
  crosscuttingConcept: [
    {
      label: 'Patterns',
    },
    {
      label: 'Cause and Effect',
    },
    {
      label: 'Scale, Proportion, and Quantity',
    },
    {
      label: 'Systems and System Models',
    },
    {
      label: 'Energy and Matter',
    },
    {
      label: 'Structure and Function',
    },
    {
      label: 'Stability and Change',
    },
    {
      label: 'Interdependence of Science, Engineering, and Technology',
    },
    {
      label:
        'Influence of Engineering, Technology, and Science and the Natural World',
    },
  ],
  disciplinaryCoreIdea: [
    {
      label: 'PS1A: Structure and Properties of Matter',
    },
    {
      label: 'PS18: Chemical Reactions',
    },
    {
      label: 'PS1C: Nuclear Processes',
    },
    {
      label: 'PS2A: Forces and Motion',
    },
    {
      label: 'PS2B: Types of Interactions',
    },
    {
      label: 'PS3A: Definitions of Energy',
    },
    {
      label: 'PS3B: Conservation of Energy and Energy Transfer',
    },
    {
      label: 'PS3C: Relationship Between Energy and Forces',
    },
    {
      label: 'PS3D: Energy in Chemical Processes and Everyday Life',
    },
    {
      label: 'PS4A: Wave Properties',
    },
    {
      label: 'PS4B: Electromagnetic Radiation',
    },
    {
      label: 'PS4C: Information Technologies and Instrumentation',
    },
    {
      label: 'LS1A: Structure and Function',
    },
    {
      label: 'LS1B: Growth and Development of Organisms',
    },
    {
      label: 'LS1C: Organization for Matter and Energy Flow in Organisms',
    },
    {
      label: 'LS1D: Information Processing',
    },
    {
      label: 'LSA: Interdependent Relationships in Ecosystems',
    },
    {
      label: 'LS2B: Cycles of Matter and Energy Transfer in Ecosystems',
    },
    {
      label: 'LS2C: Ecosystems Dynamics, Functioning and Resilience',
    },
    {
      label: 'LS2D: Social Interactions and Group Behavior',
    },
    {
      label: 'LSA: Inheritance of Traits',
    },
    {
      label: 'LS3B: Variation of Traits',
    },
    {
      label: 'LSA: Evidence of Common Ancestry and Diversity',
    },
    {
      label: 'LS4B: Natural Selection',
    },
    {
      label: 'LSAC: Adaptation',
    },
    {
      label: 'LSD: Biodiversity and Humans',
    },
    {
      label: 'ESS1A: The Universe and its Stars',
    },
    {
      label: 'ESS1B: Earth and the Solar System',
    },
    {
      label: 'ESS1C: The History of Planet Earth',
    },
    {
      label: 'ESS2A: Earth Materials and Systems',
    },
    {
      label: 'ESS2B: Plate Tectonics and Large-Scale Systems',
    },
    {
      label: "ESS2C: The Role of Water in Earth's Surface Processes",
    },
    {
      label: 'ESS2D: Weather and Climate',
    },
    {
      label: 'ESS2E: Biogeology',
    },
    {
      label: 'ESS3A: Natural Resources',
    },
    {
      label: 'ESS3B: Natural Hazards',
    },
    {
      label: 'ESS3C: Human Impacts on Earth Systems',
    },
    {
      label: 'ESS3D: Global Climate Change',
    },
    {
      label: 'ETS1A: Defining and Delimiting and Engineering Problem',
    },
    {
      label: 'ETS1B: Developing Possible Solutions',
    },
    {
      label: 'ETS1C: Optimizing the Design Solution',
    },
  ],
}

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      const courseId = uuid()

      await knex('course').transacting(trx).insert({
        id: courseId,
        created: knex.fn.now(),
        updated: knex.fn.now(),
        label: ngss.label,
        value: ngss.value,
        enabled: true,
        order: 5,
      })

      await Promise.all(
        ngss.practice.map(async (practice, practiceIndex) => {
          const { label: pLabel } = practice
          const practiceId = uuid()

          await knex('practice').transacting(trx).insert({
            id: practiceId,
            created: knex.fn.now(),
            updated: knex.fn.now(),
            label: pLabel,
            value: '',
            courseId,
            order: practiceIndex,
          })
        }),
      )

      await Promise.all(
        ngss.crosscuttingConcept.map(async (concept, conceptIndex) => {
          const { label: cLabel } = concept
          const conceptId = uuid()

          await knex('crosscutting_concept').transacting(trx).insert({
            id: conceptId,
            created: knex.fn.now(),
            updated: knex.fn.now(),
            label: cLabel,
            value: '',
            courseId,
            order: conceptIndex,
          })
        }),
      )

      await Promise.all(
        ngss.disciplinaryCoreIdea.map(async (idea, ideaIndex) => {
          const { label: iLabel } = idea
          const coreIdeaId = uuid()

          await knex('disciplinary_core_idea').transacting(trx).insert({
            id: coreIdeaId,
            created: knex.fn.now(),
            updated: knex.fn.now(),
            label: iLabel,
            value: '',
            courseId,
            order: ideaIndex,
          })
        }),
      )
    })
  } catch (error) {
    logger.error('Course metadata: populateing NGSS metadata migration failed!')
    throw new Error(error)
  }
}

exports.down = () => {}

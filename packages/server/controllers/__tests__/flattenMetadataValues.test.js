const flattenMetadataValues = require('../flattenMetadataValues')

describe('Flatten metadata values', () => {
  it('flattens all keys', async () => {
    const flattened = await flattenMetadataValues()

    // topics
    expect(flattened.biochemistryMolecularBiology).toBe(
      'Biochemistry & Molecular Biology',
    )

    expect(flattened.diversityOfLife).toBe('Diversity of life')

    // subtopics
    expect(flattened.metabolismNutrition).toBe('Metabolism & Nutrition')
    expect(flattened.animalBehavior).toBe('Animal Behavior')

    // blooms
    expect(flattened['higher-apply']).toBe('Apply (higher-order)')
    expect(flattened['lower-remember']).toBe('Remember')
    expect(flattened.responding).toBe('Responding')
    expect(flattened.skilledMovements).toBe('Skilled movements')

    // frameworks
    expect(flattened.apBiology).toBe('AP Biology')
    expect(flattened.biEnvironmentalScience).toBe('IB Environmental Science')

    // units
    expect(flattened.populations).toBe('Unit 3: Populations')
    expect(flattened.landAndWaterUse).toBe('Unit 5: Land and Water Use')

    // unit topics
    expect(flattened.generalistAndSpecialistSpecies).toBe(
      'Topic 3.1 Generalist and Specialist Species',
    )

    expect(flattened.theTragedyOfTheCommons).toBe(
      'Topic 5.1 The Tragedy of the Commons',
    )

    // learning objectives
    expect(flattened['STB-4.A']).toBe(
      'STB-4.A Explain the importance of stratospheric ozone to life on Earth.',
    )

    expect(flattened['STB-3.A']).toBe(
      'STB-3.A Identify differences between point and nonpoint sources of pollution.',
    )

    // intro to bio
    expect(flattened.visionAndChange).toBe('Vision and Change')
    expect(flattened.aamcFuturePhysicians).toBe('AAMC Future Physicians')

    // core concepts
    expect(flattened.evolution).toBe('Evolution')
    expect(flattened.informationFlowExchangeAndStorage).toBe(
      'Information flow, exchange, and storage',
    )

    // subdisciplines
    expect(flattened.molecularCellularDevelopmentalBiology).toBe(
      'Molecular/Cellular/Developmental Biology',
    )

    expect(flattened.ecologyEvolutionaryBiology).toBe(
      'Ecology/Evolutionary Biology',
    )

    // statements
    expect(
      flattened.multipleMolecularMechanismsIncludingDnaDamageAndErrorsInReplicationLeadToTheGenerationOfRandomMutationsTheseMutationsCreateNewAllelesThatCanBeInheritedViaMitosisMeiosisOrCellDivision,
    ).toBe(
      'Multiple molecular mechanisms, including DNA damage and errors in replication, lead to the generation of random mutations. These mutations create new alleles that can be inherited via mitosis, meiosis, or cell division.',
    )

    expect(
      flattened.fitnessIsAnIndividualsAbilityToSurviveAndReproduceItIsEnvironmentSpecificAndDependsOnBothAbioticAndBioticFactorsEvolutionOfOptimalFitnessIsConstrainedByExistingVariationTradeOffsAndOtherFactors,
    ).toBe(
      'Fitness is an individual’s ability to survive and reproduce. It is environment-specific and depends on both abiotic and biotic factors. Evolution of optimal fitness is constrained by existing variation, trade-offs and other factors.',
    )

    expect(flattened['modelApplication-2']).toBe(
      'Use models and simulations to make predictions and refine hypotheses.',
    )

    // core competencies
    expect(flattened.processOfScience).toBe('Process of science')
    expect(flattened.interdisciplinaryNatureOfScience).toBe(
      'Interdisciplinary nature of science',
    )

    // subcompetencies
    expect(flattened.communication).toBe('Communication')
    expect(flattened.purposeOfModels).toBe('Purpose of Models')

    // concepts
    expect(flattened.FC1).toBe(
      'Foundational Concept 1: Biomolecules have unique properties that determine how they contribute to the structure and function of cells, and how they participate in the processes necessary to maintain life.',
    )
    expect(flattened.FC3).toBe(
      'Foundational Concept 3: Complex systems of tissues and organs sense the internal and external environments of multicellular organisms, and through integrated functioning, maintain a stable internal environment within an ever-changing external environment.',
    )

    // categories
    expect(flattened.CC2A).toBe(
      'Content Category 2A: Assemblies of molecules, cells, and groups of cells within single cellular and multicellular organisms.',
    )
    expect(flattened.CC4A).toBe(
      'Content Category 4A: Translational motion, forces, work, energy, and equilibrium in living systems.',
    )

    // question types
    expect(flattened.trueFalse).toBe('Multiple True / False')
    expect(flattened.fillInTheBlank).toBe('Fill-in-the-blank')
    expect(flattened.multipleDropdowns).toBe('Multiple Dropdowns')
  })
})

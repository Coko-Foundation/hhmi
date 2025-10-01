const { logger, useTransaction, uuid } = require('@coko/server')

const meta = [
  {
    label: 'Vision and Change',
    value: 'visionAndChange',
    coreConcepts: [
      {
        label: 'Evolution',
        value: 'evolution',
        explanatoryItems: [
          'All living organisms share a common ancestor.',
          'Species evolve over time, and new species can arise, when allele frequencies change due to mutation, natural selection, gene flow, and genetic drift.',
        ],
        subdisciplines: [
          {
            label: 'Molecular/Cellular/Developmental Biology',
            value: 'molecularCellularDevelopmentalBiology',
            statements: [
              {
                label:
                  'Multiple molecular mechanisms, including DNA damage and errors in replication, lead to the generation of random mutations. These mutations create new alleles that can be inherited via mitosis, meiosis, or cell division.',
                value:
                  'multipleMolecularMechanismsIncludingDnaDamageAndErrorsInReplicationLeadToTheGenerationOfRandomMutationsTheseMutationsCreateNewAllelesThatCanBeInheritedViaMitosisMeiosisOrCellDivision',
              },
              {
                label:
                  'Mutations and epigenetic modifications can impact the regulation of gene expression and/or the structure and function of the gene product. If mutations affect phenotype and lead to increased reproductive success, the frequency of those alleles will tend to increase in the population.',
                value:
                  'mutationsAndEpigeneticModificationsCanImpactTheRegulationOfGeneExpressionAndOrTheStructureAndFunctionOfTheGeneProductIfMutationsAffectPhenotypeAndLeadToIncreasedReproductiveSuccessTheFrequencyOfThoseAllelesWillTendToIncreaseInThePopulation',
              },
            ],
          },
          {
            label: 'Physiology',
            value: 'physiology',
            statements: [
              {
                label:
                  'Mutations that change protein structure and/or regulation can impact anatomy and physiological function at all levels of organization.',
                value:
                  'mutationsThatChangeProteinStructureAndOrRegulationCanImpactAnatomyAndPhysiologicalFunctionAtAllLevelsOfOrganization',
              },
              {
                label:
                  'Most organisms have anatomical and physiological traits that tend to increase their fitness for a particular environment.',
                value:
                  'mostOrganismsHaveAnatomicalAndPhysiologicalTraitsThatTendToIncreaseTheirFitnessForAParticularEnvironment',
              },
              {
                label:
                  'Physiological systems are constrained by ancestral structures, physical limits, and the requirements of other physiological systems, leading to trade-offs that affect fitness.',
                value:
                  'physiologicalSystemsAreConstrainedByAncestralStructuresPhysicalLimitsAndTheRequirementsOfOtherPhysiologicalSystemsLeadingToTradeOffsThatAffectFitness',
              },
            ],
          },
          {
            label: 'Ecology/Evolutionary Biology',
            value: 'ecologyEvolutionaryBiology',
            statements: [
              {
                label:
                  'The characteristics of populations change over time due to changes in allele frequencies. Changes in allele frequencies are caused by random and nonrandom processes – specifically mutation, natural selection, gene flow, and genetic drift. Not all of these changes are adaptive.',
                value:
                  'theCharacteristicsOfPopulationsChangeOverTimeDueToChangesInAlleleFrequenciesChangesInAlleleFrequenciesAreCausedByRandomAndNonrandomProcessesSpecificallyMutationNaturalSelectionGeneFlowAndGeneticDriftNotAllOfTheseChangesAreAdaptive',
              },
              {
                label:
                  'All species alive today are derived from the same common ancestor. New species arise when populations become genetically isolated and diverge due to mutation, natural selection, and genetic drift. Phylogenetic trees depict relationships among ancestral and descendant species, and are estimated based on data.',
                value:
                  'allSpeciesAliveTodayAreDerivedFromTheSameCommonAncestorNewSpeciesAriseWhenPopulationsBecomeGeneticallyIsolatedAndDivergeDueToMutationNaturalSelectionAndGeneticDriftPhylogeneticTreesDepictRelationshipsAmongAncestralAndDescendantSpeciesAndAreEstimatedBasedOnData',
              },
              {
                label:
                  'Fitness is an individual’s ability to survive and reproduce. It is environment-specific and depends on both abiotic and biotic factors. Evolution of optimal fitness is constrained by existing variation, trade-offs and other factors.',
                value:
                  'fitnessIsAnIndividualsAbilityToSurviveAndReproduceItIsEnvironmentSpecificAndDependsOnBothAbioticAndBioticFactorsEvolutionOfOptimalFitnessIsConstrainedByExistingVariationTradeOffsAndOtherFactors',
              },
            ],
          },
        ],
      },
      {
        label: 'Structure and function',
        value: 'structureAndFunction',
        explanatoryItems: [
          'Biological structures exist at all levels of organization, from molecules to ecosystems. A structure’s physical and chemical characteristics influence its interactions with other structures, and therefore its function.',
          'Natural selection leads to the evolution of structures that tend to increase fitness within the context of evolutionary, developmental, and environmental constraints.',
        ],
        subdisciplines: [
          {
            label: 'Molecular/Cellular/Developmental Biology',
            value: 'molecularCellularDevelopmentalBiology',
            statements: [
              {
                label:
                  'The structure of a cell – its shape, membrane, organelles, cytoskeleton, and polarity – impacts its function.',
                value:
                  'theStructureOfACellItsShapeMembraneOrganellesCytoskeletonAndPolarityImpactsItsFunction',
              },
              {
                label:
                  'The three dimensional structure of a molecule and its subcellular localization impact its function, including the ability to catalyze reactions or interact with other molecules. Function can be regulated through reversible alterations of structure e.g. phosphorylation.',
                value:
                  'theThreeDimensionalStructureOfAMoleculeAndItsSubcellularLocalizationImpactItsFunctionIncludingTheAbilityToCatalyzeReactionsOrInteractWithOtherMoleculesFunctionCanBeRegulatedThroughReversibleAlterationsOfStructureEGPhosphorylation',
              },
              {
                label:
                  'The structure of molecules or organisms or organisms may be similar due to common ancestry or selection for similar function.',
                value:
                  'theStructureOfMoleculesOrOrganismsOrOrganismsMayBeSimilarDueToCommonAncestryOrSelectionForSimilarFunction',
              },
            ],
          },
          {
            label: 'Physiology',
            value: 'physiology',
            statements: [
              {
                label:
                  'Physiological functions are often compartmentalized into different cells, tissues, organs, and systems, which have structures that support specialized activities.',
                value:
                  'physiologicalFunctionsAreOftenCompartmentalizedIntoDifferentCellsTissuesOrgansAndSystemsWhichHaveStructuresThatSupportSpecializedActivities',
              },
              {
                label:
                  'The size, shape, and physical properties of organs and organisms all affect function. The ratio of surface area to volume is particularly critical for structures that function in transport or exchange of materials and heat.',
                value:
                  'theSizeShapeAndPhysicalPropertiesOfOrgansAndOrganismsAllAffectFunctionTheRatioOfSurfaceAreaToVolumeIsParticularlyCriticalForStructuresThatFunctionInTransportOrExchangeOfMaterialsAndHeat',
              },
              {
                label:
                  'Structure constrains function in physiology; specialization for one function may limit a structure’s ability to perform another function.',
                value:
                  'structureConstrainsFunctionInPhysiologySpecializationForOneFunctionMayLimitAStructuresAbilityToPerformAnotherFunction',
              },
            ],
          },
          {
            label: 'Ecology/Evolutionary Biology',
            value: 'ecologyEvolutionaryBiology',
            statements: [
              {
                label:
                  'Natural selection has favored structures whose shape and composition contribute to their ecological function.',
                value:
                  'naturalSelectionHasFavoredStructuresWhoseShapeAndCompositionContributeToTheirEcologicalFunction',
              },
              {
                label:
                  'Competition, mutualism, and other interactions are mediated by each species’ morphological, physiological, and behavioral traits.',
                value:
                  'competitionMutualismAndOtherInteractionsAreMediatedByEachSpeciesMorphologicalPhysiologicalAndBehavioralTraits',
              },
            ],
          },
        ],
      },
      {
        label: 'Information flow, exchange, and storage',
        value: 'informationFlowExchangeAndStorage',
        explanatoryItems: [
          'Organisms inherit genetic and epigenetic information that influences the location, timing, and intensity of gene expression.',
          'Cells/organs/organisms have multiple mechanisms to perceive and respond to changing environmental conditions.',
        ],
        subdisciplines: [
          {
            label: 'Molecular/Cellular/Developmental Biology',
            value: 'molecularCellularDevelopmentalBiology',
            statements: [
              {
                label:
                  'In most cases, genetic information flows from DNA to mRNA to protein, but there are important exceptions.',
                value:
                  'inMostCasesGeneticInformationFlowsFromDnaToMRnaToProteinButThereAreImportantExceptions',
              },
              {
                label:
                  'Gene expression and protein activity are regulated by intracellular and extracellular signaling molecules. Signal transduction pathways are crucial in relaying these signals.',
                value:
                  'geneExpressionAndProteinActivityAreRegulatedByIntracellularAndExtracellularSignalingMoleculesSignalTransductionPathwaysAreCrucialInRelayingTheseSignals',
              },
              {
                label:
                  'The signals that a cell receives depend on its location, and may change through time. As a result, different types of cells express different genes, even though they contain the same DNA.',
                value:
                  'theSignalsThatACellReceivesDependOnItsLocationAndMayChangeThroughTimeAsAResultDifferentTypesOfCellsExpressDifferentGenesEvenThoughTheyContainTheSameDna',
              },
            ],
          },
          {
            label: 'Physiology',
            value: 'physiology',
            statements: [
              {
                label:
                  'Information stored in DNA is expressed as RNA and proteins. These gene products impact anatomical structures and physiological function.',
                value:
                  'informationStoredInDnaIsExpressedAsRnaAndProteinsTheseGeneProductsImpactAnatomicalStructuresAndPhysiologicalFunction',
              },
              {
                label:
                  'Organisms have sophisticated mechanisms for sensing changes in the internal or external environment. They use chemical, electrical, or other forms of signaling to coordinate responses at the cellular, tissue, organ, and/or system level.',
                value:
                  'organismsHaveSophisticatedMechanismsForSensingChangesInTheInternalOrExternalEnvironmentTheyUseChemicalElectricalOrOtherFormsOfSignalingToCoordinateResponsesAtTheCellularTissueOrganAndOrSystemLevel',
              },
            ],
          },
          {
            label: 'Ecology/Evolutionary Biology',
            value: 'ecologyEvolutionaryBiology',
            statements: [
              {
                label:
                  'Individuals transmit genetic information to their offspring; some alleles confer higher fitness than others in a particular environment.',
                value:
                  'individualsTransmitGeneticInformationToTheirOffspringSomeAllelesConferHigherFitnessThanOthersInAParticularEnvironment',
              },
              {
                label:
                  'A genotype influences the range of possible phenotypes in an individual; the actual phenotype results from interactions between alleles and the environment.',
                value:
                  'aGenotypeInfluencesTheRangeOfPossiblePhenotypesInAnIndividualTheActualPhenotypeResultsFromInteractionsBetweenAllelesAndTheEnvironment',
              },
            ],
          },
        ],
      },
      {
        label: 'Pathways and transformations of energy and matter',
        value: 'pathwaysAndTransformationsOfEnergyAndMatter',
        explanatoryItems: [
          'Energy and matter cannot be created or destroyed, but can be changed from one form to another.',
          'Energy captured by primary producers is necessary to support the maintenance, growth and reproduction of all organisms.',
          'Natural selection leads to the evolution of efficient use of resources within constraints.',
        ],
        subdisciplines: [
          {
            label: 'Molecular/Cellular/Developmental Biology',
            value: 'molecularCellularDevelopmentalBiology',
            statements: [
              {
                label:
                  'Energy captured by primary producers is stored as chemical energy. This stored energy can be converted through a series of biochemical reactions into ATP for immediate use in the cell.',
                value:
                  'energyCapturedByPrimaryProducersIsStoredAsChemicalEnergyThisStoredEnergyCanBeConvertedThroughASeriesOfBiochemicalReactionsIntoAtpForImmediateUseInTheCell',
              },
              {
                label:
                  'In cells, the synthesis and breakdown of molecules is highly regulated. Biochemical pathways usually involve multiple reactions catalyzed by enzymes that lower activation energies. Energetically unfavorable reactions are driven by coupling to energetically favorable reactions such as ATP hydrolysis.',
                value:
                  'inCellsTheSynthesisAndBreakdownOfMoleculesIsHighlyRegulatedBiochemicalPathwaysUsuallyInvolveMultipleReactionsCatalyzedByEnzymesThatLowerActivationEnergiesEnergeticallyUnfavorableReactionsAreDrivenByCouplingToEnergeticallyFavorableReactionsSuchAsAtpHydrolysis',
              },
              {
                label:
                  'Intracellular and intercellular movement of molecules occurs via 1) energy-demanding transport processes and 2) random motion. A molecule’s movement is affected by its thermal energy, size, electrochemical gradient, and biochemical properties.',
                value:
                  'intracellularAndIntercellularMovementOfMoleculesOccursVia1EnergyDemandingTransportProcessesAnd2RandomMotionAMoleculesMovementIsAffectedByItsThermalEnergySizeElectrochemicalGradientAndBiochemicalProperties',
              },
            ],
          },
          {
            label: 'Physiology',
            value: 'physiology',
            statements: [
              {
                label:
                  'Energy captured by primary producers is stored as chemical energy. This stored energy can be converted into ATP, which is required for energetically demanding activities necessary for life, including synthesis, transport, and movement.',
                value:
                  'energyCapturedByPrimaryProducersIsStoredAsChemicalEnergyThisStoredEnergyCanBeConvertedIntoAtpWhichIsRequiredForEnergeticallyDemandingActivitiesNecessaryForLifeIncludingSynthesisTransportAndMovement',
              },
              {
                label:
                  'Due to the inefficiency of biochemical reactions and other constraints, physiological processes are never 100% efficient.',
                value:
                  'dueToTheInefficiencyOfBiochemicalReactionsAndOtherConstraintsPhysiologicalProcessesAreNever100Efficient',
              },
              {
                label:
                  'Organisms have limited energetic and material resources which must be distributed across competing functional demands. These include movement of material across gradients, growth, maintenance, and reproduction, inevitably leading to trade-offs.',
                value:
                  'organismsHaveLimitedEnergeticAndMaterialResourcesWhichMustBeDistributedAcrossCompetingFunctionalDemandsTheseIncludeMovementOfMaterialAcrossGradientsGrowthMaintenanceAndReproductionInevitablyLeadingToTradeOffs',
              },
            ],
          },
          {
            label: 'Ecology/Evolutionary Biology',
            value: 'ecologyEvolutionaryBiology',
            statements: [
              {
                label:
                  'Energy captured by primary producers is stored as chemical energy. At each trophic level, most of this energy is used for maintenance, with a relatively small fraction available for growth and reproduction. As a consequence, each trophic level in an ecosystem has less energy available than the preceding level.',
                value:
                  'energyCapturedByPrimaryProducersIsStoredAsChemicalEnergyAtEachTrophicLevelMostOfThisEnergyIsUsedForMaintenanceWithARelativelySmallFractionAvailableForGrowthAndReproductionAsAConsequenceEachTrophicLevelInAnEcosystemHasLessEnergyAvailableThanThePrecedingLevel',
              },
              {
                label:
                  'Chemical elements are transferred among the abiotic and biotic components of an ecosystem; changes in the amount and distribution of chemical elements can impact the ecosystem.',
                value:
                  'chemicalElementsAreTransferredAmongTheAbioticAndBioticComponentsOfAnEcosystemChangesInTheAmountAndDistributionOfChemicalElementsCanImpactTheEcosystem',
              },
            ],
          },
        ],
      },
      {
        label: 'Systems',
        value: 'systems',
        explanatoryItems: [
          'Biological molecules, genes, cells, tissues, organs, individuals, and ecosystems interact to form complex networks. A change in one component of the network can affect many other components.',
          'Organisms have complex systems that integrate internal and external information, incorporate feedback control, and allow them to respond to changes in the environment.',
        ],
        subdisciplines: [
          {
            label: 'Molecular/Cellular/Developmental Biology',
            value: 'molecularCellularDevelopmentalBiology',
            statements: [
              {
                label:
                  'Cells receive a complex array of chemical and physical signals that vary in time, location, and intensity over the lifespan of the organism; a cell’s response depends on integration and coordination of these various signals.',
                value:
                  'cellsReceiveAComplexArrayOfChemicalAndPhysicalSignalsThatVaryInTimeLocationAndIntensityOverTheLifespanOfTheOrganismACellsResponseDependsOnIntegrationAndCoordinationOfTheseVariousSignals',
              },
              {
                label:
                  'During development, the signals a cell receives depend on its spatial orientation within the embryo and its intercellular interactions. As a consequence, cells adopt different cell fates depending on their local environment and/or cell lineage.',
                value:
                  'duringDevelopmentTheSignalsACellReceivesDependOnItsSpatialOrientationWithinTheEmbryoAndItsIntercellularInteractionsAsAConsequenceCellsAdoptDifferentCellFatesDependingOnTheirLocalEnvironmentAndOrCellLineage',
              },
              {
                label:
                  'Alteration of a single gene or molecule in a signaling network may have complex impacts at the cell, tissue or whole-organism level.',
                value:
                  'alterationOfASingleGeneOrMoleculeInASignalingNetworkMayHaveComplexImpactsAtTheCellTissueOrWholeOrganismLevel',
              },
            ],
          },
          {
            label: 'Physiology',
            value: 'physiology',
            statements: [
              {
                label:
                  'Organ systems are not isolated, but interact with each other through chemical and physical signals at the level of cells, tissues, and organs.',
                value:
                  'organSystemsAreNotIsolatedButInteractWithEachOtherThroughChemicalAndPhysicalSignalsAtTheLevelOfCellsTissuesAndOrgans',
              },
              {
                label:
                  'An individual’s physiological traits affect its interactions with other organisms and with its physical environment.',
                value:
                  'anIndividualsPhysiologicalTraitsAffectItsInteractionsWithOtherOrganismsAndWithItsPhysicalEnvironment',
              },
              {
                label:
                  'In the face of environmental changes, organisms may maintain homeostasis through control mechanisms that often use negative feedback; others have adaptations that allow them to acclimate to environmental variation.',
                value:
                  'inTheFaceOfEnvironmentalChangesOrganismsMayMaintainHomeostasisThroughControlMechanismsThatOftenUseNegativeFeedbackOthersHaveAdaptationsThatAllowThemToAcclimateToEnvironmentalVariation',
              },
            ],
          },
          {
            label: 'Ecology/Evolutionary Biology',
            value: 'ecologyEvolutionaryBiology',
            statements: [
              {
                label:
                  'The size and structure of populations are dynamic. A species’ abundance and distribution is limited by available resources and by interactions between biotic and abiotic factors.',
                value:
                  'theSizeAndStructureOfPopulationsAreDynamicASpeciesAbundanceAndDistributionIsLimitedByAvailableResourcesAndByInteractionsBetweenBioticAndAbioticFactors',
              },
              {
                label:
                  'Ecosystems are not isolated and static – they respond to change, both as a result of intrinsic changes to networks of species and as a result of extrinsic environmental drivers. Within an ecosystem, interactions among individuals form networks; changes in one mode of a network can cause changes in other nodes – directly or indirectly.',
                value:
                  'ecosystemsAreNotIsolatedAndStaticTheyRespondToChangeBothAsAResultOfIntrinsicChangesToNetworksOfSpeciesAndAsAResultOfExtrinsicEnvironmentalDriversWithinAnEcosystemInteractionsAmongIndividualsFormNetworksChangesInOneModeOfANetworkCanCauseChangesInOtherNodesDirectlyOrIndirectly',
              },
              {
                label: 'Biodiversity impacts many aspects of ecosystems.',
                value: 'biodiversityImpactsManyAspectsOfEcosystems',
              },
            ],
          },
        ],
      },
    ],
    coreCompetencies: [
      {
        label: 'Process of science',
        value: 'processOfScience',
        subcompetencies: [
          {
            label: 'Scientific Thinking',
            value: 'scientificThinking',
            explanation:
              'Explain how science generates knowledge of the natural world',
            statements: [
              {
                label:
                  'Explain how scientists use inference and evidence-based reasoning to generate knowledge.',
                value: 'scientificThinkingStatement-1',
              },
              {
                label:
                  'Describe the iterative nature of science and how new evidence can lead to the revision of scientific knowledge.',
                value: 'scientificThinkingStatement-2',
              },
            ],
          },
          {
            label: 'Information Literacy',
            value: 'informationLiteracy',
            explanation:
              'Locate, interpret, and evaluate scientific information',
            statements: [
              {
                label:
                  'Find and evaluate the credibility of a variety of sources of scientific information, including popular science media and scientific journals.',
                value: 'informationLiteracy-1',
              },
              {
                label:
                  'Interpret, summarize, and evaluate evidence in primary literature.',
                value: 'informationLiteracy-2',
              },
              {
                label:
                  'Evaluate claims in scientific papers, popular science media, and other sources using evidence-based reasoning.',
                value: 'informationLiteracy-3',
              },
            ],
          },
          {
            label: 'Question Formulation:',
            value: 'questionFormulation',
            explanation:
              'Pose testable questions and hypotheses to address gaps in knowledge.',
            statements: [
              {
                label:
                  'Recognize gaps in our current understanding of a biological system or process and identify what specific information is missing.',
                value: 'questionFormulation-1',
              },
              {
                label:
                  'Develop research questions based on your own or others’ observations.',
                value: 'questionFormulation-2',
              },
              {
                label:
                  'Formulate testable hypotheses and state their predictions.',
                value: 'questionFormulation-3',
              },
            ],
          },
          {
            label: 'Study Design',
            value: 'studyDesign',
            explanation:
              'Plan, evaluate, and inplement scientific investigations.',
            statements: [
              {
                label:
                  'Compare the strengths and limitations of various study designs.',
                value: 'studyDesign-1',
              },
              {
                label:
                  'Design controlled experiments, including plans for analyzing the data.',
                value: 'studyDesign-2',
              },
              {
                label:
                  'Execute protocols and accurately record measurements and observations.',
                value: 'studyDesign-3',
              },
              {
                label:
                  'Identify methodological problems and suggest how to troubleshoot them.',
                value: 'studyDesign-4',
              },
              {
                label:
                  'Evaluate and suggest best practices for responsible research conduct (e.g., lab safety, record keeping, proper citation of sources).',
                value: 'studyDesign-5',
              },
            ],
          },
          {
            label: 'Data Interpretation & Evaluation',
            value: 'dataInterpretationEvaluation',
            explanation:
              'Interpret, evaluate, and draw conclusions from data in order to make evidence based arguments about the natural world.',
            statements: [
              {
                label:
                  'Analyze data, summarize resulting patterns, and draw appropriate conclusions.',
                value: 'dataInterpretationEvaluation-1',
              },
              {
                label: 'Describe sources of error and uncertainty in data.',
                value: 'dataInterpretationEvaluation-2',
              },
              {
                label:
                  'Make evidence-based arguments using your own and others’ findings.',
                value: 'dataInterpretationEvaluation-3',
              },
              {
                label:
                  'Relate conclusions to original hypothesis, consider alternative hypotheses, and suggest future research directions based on findings.',
                value: 'dataInterpretationEvaluation-4',
              },
            ],
          },
          {
            label: 'Doing research',
            value: 'doingResearch',
            explanation:
              'Apply science process skills to address a research question in a course-based or independent research experience.',
            statements: [],
          },
        ],
      },
      {
        label: 'Quantitative reasoning',
        value: 'quantitativeReasoning',
        subcompetencies: [
          {
            label: 'Numeracy',
            value: 'numeracy',
            explanation:
              'Use basic mathematics (e.g., algebra, probability, unit conversion) in biological contexts.',
            statements: [
              {
                label:
                  'Perform basic calculations (e.g., percentages, frequencies, rates, means).',
                value: 'numeracy-1',
              },
              {
                label:
                  'Select and apply appropriate equations (e.g., Hardy-Weinberg, Nernst, Gibbs free energy) to solve problems.',
                value: 'numeracy-2',
              },
              {
                label:
                  'Interpret and manipulate mathematical relationships (e.g., scale, ratios, units) to make quantitative comparisons.',
                value: 'numeracy-3',
              },
              {
                label:
                  'Use probability and understanding of biological variability to reason about biological processes and statistical analyses.',
                value: 'numeracy-4',
              },
              {
                label:
                  'Use rough estimates informed by biological knowledge to check quantitative work.',
                value: 'numeracy-5',
              },
              {
                label:
                  'Describe how quantitative reasoning helps biologists understand the natural world.',
                value: 'numeracy-6',
              },
            ],
          },
          {
            label: 'Quantitative & Computational Data Analysis',
            value: 'quantitativeComputationalDataAnalysis',
            explanation:
              'Apply the tools of graphing, statistics, and data science to analyze biological data.',
            statements: [
              {
                label: 'Record, organize, and annotate simple data sets.',
                value: 'quantitativeComputationalDataAnalysis-1',
              },
              {
                label:
                  'Create and interpret informative graphs and other data visualizations.',
                value: 'quantitativeComputationalDataAnalysis-2',
              },
              {
                label: 'Select, carry out, and interpret statistical analyses.',
                value: 'quantitativeComputationalDataAnalysis-3',
              },
              {
                label:
                  'Describe how biologists answer research questions using databases, large data sets, and data science tools.',
                value: 'quantitativeComputationalDataAnalysis-4',
              },
              {
                label:
                  'Interpret the biological meaning of quantitative results.',
                value: 'quantitativeComputationalDataAnalysis-5',
              },
            ],
          },
        ],
      },
      {
        label: 'Modeling and simulations',
        value: 'modellingAndSimulations',
        subcompetencies: [
          {
            label: 'Purpose of Models',
            value: 'purposeOfModels',
            explanation:
              'Recognize the important roles that scientific models, of many different types (conceptual, mathematical, physical, etc.), play in predicting and communicating biological phenomena.',
            statements: [
              {
                label:
                  'Describe why biologists use simplified representations (models) when solving problems and communicating ideas.',
                value: 'purposeOfModels-1',
              },
              {
                label:
                  'Given two models of the same biological process or system, compare their strengths, limitations, and assumptions.',
                value: 'purposeOfModels-2',
              },
            ],
          },
          {
            label: 'Model Application',
            value: 'modelApplication',
            explanation:
              'Make inferences and solve problems using models and simulations.',
            statements: [
              {
                label:
                  'Summarize relationships and trends that can be inferred from a given model or simulation.',
                value: 'modelApplication-1',
              },
              {
                label:
                  'Use models and simulations to make predictions and refine hypotheses.',
                value: 'modelApplication-2',
              },
            ],
          },
          {
            label: 'Modeling',
            value: 'modeling',
            explanation: 'Build and evaluate models of biological systems.',
            statements: [
              {
                label:
                  'Build and revise conceptual models to propose how a biological system or process works.',
                value: 'modeling-1',
              },
              {
                label:
                  'Identify important components of a system and describe how they influence each other (e.g., positively or negatively).',
                value: 'modeling-2',
              },
              {
                label:
                  'Evaluate conceptual, mathematical, or computational models by comparing their predictions with empirical data.',
                value: 'modeling-3',
              },
            ],
          },
        ],
      },
      {
        label: 'Interdisciplinary nature of science',
        value: 'interdisciplinaryNatureOfScience',
        subcompetencies: [
          {
            label: 'Connecting Scientific Knowledge',
            value: 'connectingScientificKnowledge',
            explanation:
              'Integrate concepts across other STEM disciplines (e.g., chemistry, physics) and multiple fields of biology (e.g., cell biology, ecology).',
            statements: [
              {
                label:
                  'Given a biological problem, identify relevant concepts from other STEM disciplines or fields of biology.',
                value: 'connectingScientificKnowledge-1',
              },
              {
                label:
                  'Build models or explanations of simple biological processes that include concepts from other STEM disciplines or multiple fields of biology.',
                value: 'connectingScientificKnowledge-2',
              },
            ],
          },
          {
            label: 'Interdisciplinary Problem Solving',
            value: 'interdisciplinaryProblemSolving',
            explanation:
              'Consider interdisciplinary solutions to real-world problems.',
            statements: [
              {
                label:
                  'Describe examples of real-world problems that are too complex to be solved by applying biological approaches alone.',
                value: 'interdisciplinaryProblemSolving-1',
              },
              {
                label:
                  'Suggest how collaborators in STEM & non-STEM disciplines could contribute to solutions of real-world problems.',
                value: 'interdisciplinaryProblemSolving-2',
              },
              {
                label:
                  'Be able to explain biological concepts, data, and methods, including their limitations, using language understandable by collaborators in other disciplines.',
                value: 'interdisciplinaryProblemSolving-3',
              },
            ],
          },
        ],
      },
      {
        label: 'Communicate and collaborate with other disciplines',
        value: 'communicateAndCollaborateWithOtherDisciplines',
        subcompetencies: [
          {
            label: 'Communication',
            value: 'communication',
            explanation:
              'Share ideas, data, and findings with others clearly and accurately.',
            statements: [
              {
                label:
                  'Use appropriate language and style to communicate science effectively to targeted audiences (e.g., general public, biology experts, collaborators in other disciplines).',
                value: 'communication-1',
              },
              {
                label:
                  'Use a variety of modes to communicate science (e.g., oral, written, visual).',
                value: 'communication-2',
              },
            ],
          },
          {
            label: 'Collaboration',
            value: 'collaboration',
            explanation:
              'Work productively in teams with people who have diverse backgrounds, skill sets, and perspectives.',
            statements: [
              {
                label:
                  'Work with teammates to establish and periodically update group plans and expectations (e.g., team goals, project timeline, rules for group interactions, individual and collaborative tasks).',
                value: 'collaboration-1',
              },
              {
                label:
                  'Elicit, listen to, and incorporate ideas from teammates with different perspectives and backgrounds.',
                value: 'collaboration-2',
              },
              {
                label: 'Work effectively with teammates to complete projects.',
                value: 'collaboration-3',
              },
            ],
          },
          {
            label: 'Collegial Review',
            value: 'collegialReview',
            explanation:
              'Provide and respond to constructive feedback in order to improve individual and team work.',
            statements: [
              {
                label:
                  'Evaluate feedback from others and revise work or behavior appropriately.',
                value: 'collegialReview-1',
              },
              {
                label:
                  'Critique others’ work and ideas constructively and respectfully.',
                value: 'collegialReview-2',
              },
            ],
          },
          {
            label: 'Metacognition',
            value: 'metacognition',
            explanation:
              'Reflect on your own learning, performance, and achievements.',
            statements: [
              {
                label: 'Evaluate your own understanding and skill level.',
                value: 'metacognition-1',
              },
              {
                label:
                  'Assess personal progress and contributions to your team and generate a plan to change your behavior as needed.',
                value: 'metacognition-2',
              },
            ],
          },
        ],
      },
      {
        label: 'Understand the relationship betweeen science and society',
        value: 'relationshipBetweenScienceAndEthics',
        subcompetencies: [
          {
            label: 'Ethics',
            value: 'ethics',
            explanation:
              'Demonstrate the ability to critically analyze ethical issues in the conduct of science.',
            statements: [
              {
                label:
                  'Identify and evaluate ethical considerations (e.g., use of animal or human subjects, conflicts of interest, confirmation bias) in a given research study.',
                value: 'ethics-1',
              },
              {
                label:
                  'Critique how ethical controversies in biological research have been and can continue to be addressed by the scientific community.',
                value: 'ethics-2',
              },
            ],
          },
          {
            label: 'Societal Influences',
            value: 'societalInfluences',
            explanation:
              'Consider the potential impacts of outside influences (historical, cultural, political, technological) on how science is practiced.',
            statements: [
              {
                label:
                  'Describe examples of how scientists’ backgrounds and biases can influence science and how science is enhanced through diversity.',
                value: 'societalInfluences-1',
              },
              {
                label:
                  'Identify and describe how systemic factors (e.g., socioeconomic, political) affect how and by whom science is conducted.',
                value: 'societalInfluences-2',
              },
            ],
          },
          {
            label: "Science's Impact on Society",
            value: 'sciencesImpactOnSociety',
            explanation:
              'Apply scientific reasoning in daily life and recognize the impacts of science on a local and global scale.',
            statements: [
              {
                label:
                  'Apply evidence-based reasoning and biological knowledge in daily life (e.g., consuming popular media, deciding how to vote).',
                value: 'sciencesImpactOnSociety-1',
              },
              {
                label:
                  'Use examples to describe the relevance of science in everyday experiences.',
                value: 'sciencesImpactOnSociety-2',
              },
              {
                label:
                  'Identify and describe the broader societal impacts of biological research on different stakeholders.',
                value: 'sciencesImpactOnSociety-3',
              },
              {
                label:
                  'Describe the roles scientists have in facilitating public understanding of science.',
                value: 'sciencesImpactOnSociety-4',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'AAMC Future Physicians',
    value: 'aamcFuturePhysicians',
    concepts: [
      {
        label:
          'Foundational Concept 1: Biomolecules have unique properties that determine how they contribute to the structure and function of cells, and how they participate in the processes necessary to maintain life.',
        value: 'FC1',
        categories: [
          {
            label:
              'Content Category 1A: Structure and function of proteins and their constituent amino acids.',
            explanation:
              'Category 1A focuses on the structural and functional complexity of proteins, which is derived from their component amino acids, the sequence in which the amino acids are covalently...',
            value: 'CC1A',
          },
          {
            label:
              'Content Category 1B: Transmission of genetic information from the gene to the protein.',
            explanation:
              'Category 1B focuses on the molecular mechanisms responsible for the transfer of sequence-specific biological information between biopolymers which ultimately results in the synthesis of...',
            value: 'CC1B',
          },
          {
            label:
              'Content Category 1C: Transmission of heritable information from generation to generation and the processes that increase genetic diversity.',
            explanation:
              'Category 1C focuses on the mechanisms that function to transmit the heritable information stored in DNA from generation to generation.',
            value: 'CC1C',
          },
          {
            label:
              'Content Category 1D: Principles of bioenergetics and fuel molecule metabolism.',
            explanation:
              'Category 1D focuses on the biomolecules and regulated pathways involved in harvesting chemical energy stored in fuel molecules, which serves as the driving force for all of the processes...',
            value: 'CC1D',
          },
        ],
      },
      {
        label:
          'Foundational Concept 2: Highly-organized assemblies of molecules, cells, and organs interact to carry out the functions of living organisms.',
        value: 'FC2',
        categories: [
          {
            label:
              'Content Category 2A: Assemblies of molecules, cells, and groups of cells within single cellular and multicellular organisms.',
            explanation:
              'Category 2A focuses on the assemblies of molecules, cells, and groups of cells within single cellular and multicellular organisms that function to execute the processes necessary to...',
            value: 'CC2A',
          },
          {
            label:
              'Content Category 2B: The structure, growth, physiology, and genetics of prokaryotes and viruses.',
            explanation:
              'Category 2B focuses on the structure, growth, physiology, and genetics of prokaryotes, and the structure and life cycles of viruses.',
            value: 'CC2B',
          },
          {
            label:
              'Content Category 2C: Processes of cell division, differentiation, and specialization.',
            explanation:
              'Category 2C focuses on the processes of cell and nuclear division, and the mechanisms governing cell differentiation and specialization.',
            value: 'CC2C',
          },
        ],
      },
      {
        label:
          'Foundational Concept 3: Complex systems of tissues and organs sense the internal and external environments of multicellular organisms, and through integrated functioning, maintain a stable internal environment within an ever-changing external environment.',
        value: 'FC3',
        categories: [
          {
            label:
              'Category 3A: Structure and functions of the nervous and endocrine systems and ways in which these systems coordinate the organ systems.',
            explanation:
              'Category 3A focuses on the structure and functions of the nervous and endocrine systems, and the ways in which the systems work together to coordinate the responses of other body systems...',
            value: 'CC3A',
          },
          {
            label:
              'Category 3B: Structure and integrative functions of the main organ systems.',
            explanation:
              'Category 3B focuses on the structure and functions of the organ systems ― circulatory, respiratory, digestive, immune, lymphatic, muscular, skeletal, and reproductive ― and the ways these...',
            value: 'CC3B',
          },
        ],
      },
      {
        label:
          'Foundational Concept 4: Complex living organisms transport materials, sense their environment, process signals, and respond to changes using processes that can be understood in terms of physical principles.',
        value: 'FC4',
        categories: [
          {
            label:
              'Content Category 4A: Translational motion, forces, work, energy, and equilibrium in living systems.',
            explanation:
              'Category 4A focuses on motion and its causes, and various forms of energy and their interconversions.',
            value: 'CC4A',
          },
          {
            label:
              'Content Category 4B: Importance of fluids for the circulation of blood, gas movement, and gas exchange.',
            explanation:
              'Category 4B focuses on the behavior of fluids, which is relevant to the functioning of the pulmonary and circulatory systems.',
            value: 'CC4B',
          },
          {
            label:
              'Content Category 4C: Electrochemistry and electrical circuits and their elements.',
            explanation:
              'Category 4C emphasizes the nature of electrical currents and voltages; how energy can be converted into electrical forms that can be used to perform chemical transformations or work; and...',
            value: 'CC4C',
          },
          {
            label:
              'Content Category 4D: How light and sound interact with matter.',
            explanation:
              'Category 4D focuses on the properties of light and sound; how the interactions of light and sound with matter can be used by an organism to sense its environment; and how these...',
            value: 'CC4D',
          },
          {
            label:
              'Content Category 4E: Atoms, nuclear decay, electronic structure, and atomic chemical behavior.',
            explanation:
              'Category 4E focuses on sub-atomic particles, the atomic nucleus, nuclear radiation, the structure of the atom, and how the configuration of any particular atom can be used to predict its...',
            value: 'CC4E',
          },
        ],
      },
      {
        label:
          'Foundational Concept 5: The principles that govern chemical interactions and reactions form the basis for a broader understanding of the molecular dynamics of living systems.',
        value: 'FC5',
        categories: [
          {
            label:
              'Content Category 5A: Unique nature of water and its solutions.',
            explanation:
              'Category 5A emphasizes the nature of solution formation, factors that affect solubility, and the properties and behavior of aqueous solutions, with special emphasis on the acid-base...',
            value: 'CC5A',
          },
          {
            label:
              'Content Category 5B: Nature of molecules and intermolecular interactions.',
            explanation:
              'Category 5B focuses on molecular structure and how it affects the strength of intermolecular interactions.',
            value: 'CC5B',
          },
          {
            label: 'Content Category 5C: Separation and purification methods.',
            explanation:
              'Category 5C emphasizes how differential intermolecular interactions can be used to effect chemical separations.',
            value: 'CC5C',
          },
          {
            label:
              'Content Category 5D: Structure, function, and reactivity of biologically-relevant molecules.',
            explanation:
              'Category 5D emphasizes the varied nature of biologically-relevant molecules, and how patterns of covalent bonding can be used to predict the chemical reactivity of these molecules and...',
            value: 'CC5D',
          },
          {
            label:
              'Content Category 5E: Principles of chemical thermodynamics and kinetics.',
            explanation:
              'Category 5E emphasizes how relative energy dictates the overall favorability of chemical processes and the rate at which these processes can occur.',
            value: 'CC5E',
          },
        ],
      },
      {
        label:
          'Foundational Concept 6: Biological, psychological, and sociocultural factors influence the ways that individuals perceive, think about, and react to the world.',
        value: 'FC6',
        categories: [
          {
            label: 'Content Category 6A: Sensing the environment.',
            explanation:
              'Category 6A focuses on the detection and perception of sensory information.',
            value: 'CC6A',
          },
          {
            label: 'Content Category 6B: Making sense of the environment.',
            explanation:
              'Category 6B focuses on cognition, including our ability to attend to the environment, think about and remember what we experience, and use language to communicate with others.',
            value: 'CC6B',
          },
          {
            label: 'Content Category 6C: Responding to the world.',
            explanation:
              'Category 6C focuses on how we process and experience emotion and stress.',
            value: 'CC6C',
          },
        ],
      },
      {
        label:
          'Foundational Concept 7: Biological, psychological, and sociocultural factors influence behavior and behavior change.',
        value: 'FC7',
        categories: [
          {
            label: 'Content Category 7A: Individual influences on behavior.',
            explanation:
              'Category 7A focuses on the individual psychological and biological factors that affect behavior.',
            value: 'CC7A',
          },
          {
            label:
              'Content Category 7B: Social processes that influence human behavior.',
            explanation:
              'Category 7B focuses on how social factors, such as groups and social norms, affect behavior.',
            value: 'CC7B',
          },
          {
            label: 'Content Category 7C: Attitude and behavior change.',
            explanation:
              'Category 7C focuses on how learning affects behavior, as well as the role of attitude theories in behavior and behavior change.',
            value: 'CC7C',
          },
        ],
      },
      {
        label:
          'Foundational Concept 8: Psychological, sociocultural, and biological factors influence the way we think about ourselves and others, as well as how we interact with others.',
        value: 'FC8',
        categories: [
          {
            label: 'Content Category 8A: Self-identity.',
            explanation:
              'Category 8A focuses on the notion of self and identity formation.',
            value: 'CC8A',
          },
          {
            label: 'Content Category 8B: Social thinking.',
            explanation:
              'Category 8B focuses on the attitudes and beliefs that affect social interaction.',
            value: 'CC8B',
          },
          {
            label: 'Content Category 8C: Social interactions.',
            explanation:
              'Category 8C focuses on the actions and processes underlying social interactions.',
            value: 'CC8C',
          },
        ],
      },
      {
        label:
          'Foundational Concept 9: Cultural and social differences influence well-being.',
        value: 'FC9',
        categories: [
          {
            label: 'Content Category 9A: Understanding social structure.',
            explanation:
              'Category 9A focuses on the link between social structures and human interactions.',
            value: 'CC9A',
          },
          {
            label:
              'Content Category 9B: Demographic characteristics and processes.',
            explanation:
              'Category 9B focuses on the demographic characteristics and processes that define a society.',
            value: 'CC9B',
          },
        ],
      },
      {
        label:
          'Foundational Concept 10: Social stratification and access to resources influence well-being.',
        value: 'FC10',
        categories: [
          {
            label: 'Content Category 10A: Social inequality.',
            explanation:
              'Category 10A focuses on a broad understanding of social class, including theories of stratification, social mobility, and poverty.',
            value: 'CC10A',
          },
        ],
      },
    ],
  },
]

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      await Promise.all(
        meta.map(async (framework, frameworkIndex) => {
          if (framework.value === 'visionAndChange') {
            const { value, label, coreConcepts, coreCompetencies } = framework
            const frameworkId = uuid()

            await knex('meta_framework').transacting(trx).insert({
              id: frameworkId,
              created: knex.fn.now(),
              updated: knex.fn.now(),
              label,
              value,
              enabled: true,
              order: frameworkIndex,
            })

            await Promise.all(
              coreConcepts.map(async (coreConcept, coreConceptIndex) => {
                const {
                  label: concLabel,
                  value: concValue,
                  explanatoryItems,
                  subdisciplines,
                } = coreConcept

                const coreConceptId = uuid()

                await knex('core_concept')
                  .transacting(trx)
                  .insert({
                    id: coreConceptId,
                    created: knex.fn.now(),
                    updated: knex.fn.now(),
                    label: concLabel,
                    value: concValue,
                    explanatoryItems: JSON.stringify(explanatoryItems),
                    metaFrameworkId: frameworkId,
                    enabled: true,
                    order: coreConceptIndex,
                  })

                await Promise.all(
                  subdisciplines.map(
                    async (subdiscipline, subdisciplineIndex) => {
                      const {
                        label: subdLabel,
                        value: subdValue,
                        statements,
                      } = subdiscipline

                      const subdisciplineId = uuid()

                      await knex('subdiscipline').transacting(trx).insert({
                        id: subdisciplineId,
                        created: knex.fn.now(),
                        updated: knex.fn.now(),
                        label: subdLabel,
                        value: subdValue,
                        coreConceptId,
                        enabled: true,
                        order: subdisciplineIndex,
                      })

                      await Promise.all(
                        statements.map(async (statement, statementIndex) => {
                          const {
                            label: statementLabel,
                            value: statementValue,
                          } = statement

                          await knex('subdiscipline_statement')
                            .transacting(trx)
                            .insert({
                              id: uuid(),
                              created: knex.fn.now(),
                              updated: knex.fn.now(),
                              label: statementLabel,
                              value: statementValue,
                              subdisciplineId,
                              enabled: true,
                              order: statementIndex,
                            })
                        }),
                      )
                    },
                  ),
                )
              }),
            )

            await Promise.all(
              coreCompetencies.map(
                async (coreCompetence, coreCompetenceIndex) => {
                  const {
                    label: compLabel,
                    value: compValue,
                    subcompetencies,
                  } = coreCompetence

                  const coreCompetenceId = uuid()

                  await knex('core_competence').transacting(trx).insert({
                    id: coreCompetenceId,
                    created: knex.fn.now(),
                    updated: knex.fn.now(),
                    label: compLabel,
                    value: compValue,
                    metaFrameworkId: frameworkId,
                    order: coreCompetenceIndex,
                  })

                  await Promise.all(
                    subcompetencies.map(
                      async (subcompetence, subcompetenceIndex) => {
                        const {
                          label: subcLabel,
                          value: subcValue,
                          explanation,
                          statements,
                        } = subcompetence

                        const subcompetenceId = uuid()

                        await knex('subcompetence').transacting(trx).insert({
                          id: subcompetenceId,
                          created: knex.fn.now(),
                          updated: knex.fn.now(),
                          label: subcLabel,
                          value: subcValue,
                          explanation,
                          coreCompetenceId,
                          enabled: true,
                          order: subcompetenceIndex,
                        })

                        await Promise.all(
                          statements.map(async (statement, statementIndex) => {
                            const { label: statLabel, value: statValue } =
                              statement

                            await knex('subcompetence_statement')
                              .transacting(trx)
                              .insert({
                                id: uuid(),
                                created: knex.fn.now(),
                                updated: knex.fn.now(),
                                label: statLabel,
                                value: statValue,
                                subcompetenceId,
                                enabled: true,
                                order: statementIndex,
                              })
                          }),
                        )
                      },
                    ),
                  )
                },
              ),
            )
          } else if (framework.value === 'aamcFuturePhysicians') {
            const { value, label, concepts } = framework
            const frameworkId = uuid()

            await knex('meta_framework').transacting(trx).insert({
              id: frameworkId,
              created: knex.fn.now(),
              updated: knex.fn.now(),
              label,
              value,
              enabled: true,
              order: frameworkIndex,
            })

            await Promise.all(
              concepts.map(async (concept, conceptIndex) => {
                const {
                  label: conceptLabel,
                  value: conceptValue,
                  categories,
                } = concept

                const conceptId = uuid()

                await knex('concept').transacting(trx).insert({
                  id: conceptId,
                  created: knex.fn.now(),
                  updated: knex.fn.now(),
                  label: conceptLabel,
                  value: conceptValue,
                  metaFrameworkId: frameworkId,
                  enabled: true,
                  order: conceptIndex,
                })

                await Promise.all(
                  categories.map(async (category, categoryIndex) => {
                    const {
                      label: categoryLabel,
                      value: categoryValue,
                      explanation,
                    } = category

                    await knex('category').transacting(trx).insert({
                      id: uuid(),
                      created: knex.fn.now(),
                      updated: knex.fn.now(),
                      label: categoryLabel,
                      value: categoryValue,
                      explanation,
                      conceptId,
                      enabled: true,
                      order: categoryIndex,
                    })
                  }),
                )
              }),
            )
          }
        }),
      )
    })
  } catch (error) {
    logger.error(
      'Course metadata: populate Vision and Change and AAMC mmetadata migration failed!',
    )
    throw new Error(error)
  }
}

exports.down = () => {}

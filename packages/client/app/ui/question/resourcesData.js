const resources = [
  {
    label: 'Adenosine Triphosphate (ATP)',
    value: 'adenosineTriphosphate(ATP)',
    url:
      'https://www.biointeractive.org/classroom-resources/adenosine-triphosphate-atp',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules'],
  },
  {
    label: 'ATP Synthesis',
    value: 'aTPSynthesis',
    url: 'https://www.biointeractive.org/classroom-resources/atp-synthesis',
    topics: ['biochemistryMolecularBiology', 'cellBiology'],
    subtopics: ['macromolecules', 'enzymesReactions', 'cellularEnergetics'],
  },
  {
    label: 'BCR-ABL',
    value: 'bCR-ABL',
    url: 'https://www.biointeractive.org/classroom-resources/bcrabl',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules'],
  },
  {
    label: 'BCR-ABL: Protein Structure and Function',
    value: 'bCR-ABL:ProteinStructureAndFunction',
    url:
      'https://www.biointeractive.org/classroom-resources/bcrabl-protein-structure-and-function',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['macromolecules', 'enzymesReactions', 'geneticDisease'],
  },
  {
    label: 'Biochemistry and Cell Signaling Pathway of the Mc1r Gene',
    value: 'biochemistryAndCellSignalingPathwayOfTheMc1rGene',
    url:
      'https://www.biointeractive.org/classroom-resources/biochemistry-and-cell-signaling-pathway-mc1r-gene',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['macromolecules', 'geneExpressionRegulation', 'mutations'],
  },
  {
    label: 'Citric Acid Cycle',
    value: 'citricAcidCycle',
    url: 'https://www.biointeractive.org/classroom-resources/citric-acid-cycle',
    topics: ['biochemistryMolecularBiology', 'cellBiology'],
    subtopics: ['macromolecules', 'enzymesReactions', 'cellularEnergetics'],
  },
  {
    label: 'Cystic Fibrosis Mechanism and Treatment',
    value: 'cysticFibrosisMechanismAndTreatment',
    url:
      'https://www.biointeractive.org/classroom-resources/cystic-fibrosis-mechanism-and-treatment',
    topics: ['biochemistryMolecularBiology', 'genetics', 'cellBiology'],
    subtopics: ['macromolecules', 'geneticDisease', 'cellStructureFunction'],
  },
  {
    label: 'Electron Transport Chain',
    value: 'electronTransportChain',
    url:
      'https://www.biointeractive.org/classroom-resources/electron-transport-chain',
    topics: ['biochemistryMolecularBiology', 'cellBiology'],
    subtopics: ['macromolecules', 'enzymesReactions', 'cellularEnergetics'],
  },
  {
    label: 'Gleevec-Resistant BCR-ABL',
    value: 'gleevec-ResistantBCR-ABL',
    url:
      'https://www.biointeractive.org/classroom-resources/gleevecresistant-bcrabl',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules'],
  },
  {
    label: 'How DNA Is Packaged',
    value: 'howDNAIsPackaged',
    url: 'https://www.biointeractive.org/classroom-resources/how-dna-packaged',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules', 'dnaRna'],
  },
  {
    label: 'How The Body Uses Fat',
    value: 'howTheBodyUsesFat',
    url: 'https://www.biointeractive.org/classroom-resources/how-body-uses-fat',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology'],
    subtopics: ['macromolecules', 'metabolismNutrition'],
  },
  {
    label: 'Mechanism of a Medication for Chronic Myeloid Leukemia',
    value: 'mechanismOfAMedicationForChronicMyeloidLeukemia',
    url:
      'https://www.biointeractive.org/classroom-resources/mechanism-medication-chronic-myeloid-leukemia',
    topics: ['biochemistryMolecularBiology', 'genetics', 'cellBiology'],
    subtopics: ['macromolecules', 'geneticDisease', 'cellCommunication'],
  },
  {
    label: 'Modeling the Structure of DNA',
    value: 'modelingTheStructureOfDNA',
    url:
      'https://www.biointeractive.org/classroom-resources/modeling-structure-dna',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules', 'dnaRna'],
  },
  {
    label: 'Molecular Structure of Fat',
    value: 'molecularStructureOfFat',
    url:
      'https://www.biointeractive.org/classroom-resources/molecular-structure-fat',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology'],
    subtopics: ['macromolecules', 'metabolismNutrition'],
  },
  {
    label: 'Photosynthesis',
    value: 'photosynthesis',
    url: 'https://www.biointeractive.org/classroom-resources/photosynthesis',
    topics: [
      'biochemistryMolecularBiology',
      'cellBiology',
      'anatomyPhysiology',
    ],
    subtopics: [
      'macromolecules',
      'cellularEnergetics',
      'plantAnatomyPhysiology',
    ],
  },
  {
    label: 'Resistance to a Medication for Chronic Myeloid Leukemia',
    value: 'resistanceToAMedicationForChronicMyeloidLeukemia',
    url:
      'https://www.biointeractive.org/classroom-resources/resistance-medication-chronic-myeloid-leukemia',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['macromolecules', 'geneticDisease'],
  },
  {
    label: 'Role of p53 in Transcription',
    value: 'roleOfP53InTranscription',
    url:
      'https://www.biointeractive.org/classroom-resources/role-p53-transcription',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['macromolecules', 'geneExpressionRegulation'],
  },
  {
    label: 'Structure of Dengue Virus',
    value: 'structureOfDengueVirus',
    url:
      'https://www.biointeractive.org/classroom-resources/structure-dengue-virus',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules'],
  },
  {
    label: 'The Drosophila Biological Clock',
    value: 'theDrosophilaBiologicalClock',
    url:
      'https://www.biointeractive.org/classroom-resources/drosophila-biological-clock',
    topics: ['biochemistryMolecularBiology', 'genetics', 'cellBiology'],
    subtopics: [
      'macromolecules',
      'geneExpressionRegulation',
      'cellCommunication',
    ],
  },
  {
    label: 'The Fate of Fat',
    value: 'theFateOfFat',
    url: 'https://www.biointeractive.org/classroom-resources/fate-fat',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology'],
    subtopics: ['macromolecules', 'metabolismNutrition'],
  },
  {
    label: 'The Mammalian Biological Clock',
    value: 'theMammalianBiologicalClock',
    url:
      'https://www.biointeractive.org/classroom-resources/mammalian-biological-clock',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['macromolecules', 'geneExpressionRegulation'],
  },
  {
    label: 'The p53 Gene and Cancer',
    value: 'theP53GeneAndCancer',
    url:
      'https://www.biointeractive.org/classroom-resources/p53-gene-and-cancer',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['macromolecules', 'dnaRna', 'geneticDisease'],
  },
  {
    label: 'Translation (Advanced Detail)',
    value: 'translation(AdvancedDetail)',
    url:
      'https://www.biointeractive.org/classroom-resources/translation-advanced-detail',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules', 'dnaRna'],
  },
  {
    label: 'Translation (Basic Detail)',
    value: 'translation(BasicDetail)',
    url:
      'https://www.biointeractive.org/classroom-resources/translation-basic-detail',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['macromolecules', 'dnaRna'],
  },
  {
    label: 'Triplet Code',
    value: 'tripletCode',
    url: 'https://www.biointeractive.org/classroom-resources/triplet-code',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['macromolecules', 'dnaRna', 'bioinformatics'],
  },
  {
    label: 'Ubiquitin and the Proteasome',
    value: 'ubiquitinAndTheProteasome',
    url:
      'https://www.biointeractive.org/classroom-resources/ubiquitin-and-proteasome',
    topics: ['biochemistryMolecularBiology', 'cellBiology'],
    subtopics: ['macromolecules', 'enzymesReactions', 'cellStructureFunction'],
  },
  {
    label: 'Amylase Copy Number and Diet',
    value: 'amylaseCopyNumberAndDiet',
    url:
      'https://www.biointeractive.org/classroom-resources/amylase-copy-number-and-diet',
    topics: ['biochemistryMolecularBiology', 'evolution'],
    subtopics: ['enzymesReactions', 'humanEvolution'],
  },
  {
    label: 'Blood Glucose Data Analysis',
    value: 'bloodGlucoseDataAnalysis',
    url:
      'https://www.biointeractive.org/classroom-resources/blood-glucose-data-analysis',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['enzymesReactions'],
  },
  {
    label: 'Building a Paper Model of CRISPR-Cas9',
    value: 'buildingAPaperModelOfCRISPR-Cas9',
    url:
      'https://www.biointeractive.org/classroom-resources/building-paper-model-crispr-cas9',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['enzymesReactions', 'dnaRna', 'biotechnology'],
  },
  {
    label: 'Immunology Virtual Lab',
    value: 'immunologyVirtualLab',
    url:
      'https://www.biointeractive.org/classroom-resources/immunology-virtual-lab',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology'],
    subtopics: ['enzymesReactions', 'biotechnology', 'immuneSystem'],
  },
  {
    label: 'Lactose Digestion in Infants',
    value: 'lactoseDigestionInInfants',
    url:
      'https://www.biointeractive.org/classroom-resources/lactose-digestion-infants',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology'],
    subtopics: ['enzymesReactions', 'metabolismNutrition'],
  },
  {
    label: 'Milk: How Sweet Is It?',
    value: 'milkHowSweetIsIt?',
    url: 'https://www.biointeractive.org/classroom-resources/milk-how-sweet-it',
    topics: [
      'biochemistryMolecularBiology',
      'anatomyPhysiology',
      'sciencePractices',
    ],
    subtopics: ['enzymesReactions', 'metabolismNutrition', 'dataAnalysis'],
  },
  {
    label: '“Fixing” Gene Expression',
    value: '“Fixing”GeneExpression',
    url:
      'https://www.biointeractive.org/classroom-resources/fixing-gene-expression',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'geneExpressionRegulation', 'geneticDisease'],
  },
  {
    label: 'Activity for The Double Helix',
    value: 'activityForTheDoubleHelix',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-double-helix',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Biology of SARS-CoV-2',
    value: 'biologyOfSARS-CoV-2',
    url:
      'https://www.biointeractive.org/classroom-resources/biology-sars-cov-2',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Building Blocks of DNA',
    value: 'buildingBlocksOfDNA',
    url:
      'https://www.biointeractive.org/classroom-resources/building-blocks-dna',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Central Dogma and Genetic Medicine',
    value: 'centralDogmaAndGeneticMedicine',
    url:
      'https://www.biointeractive.org/classroom-resources/central-dogma-and-genetic-medicine',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: [
      'dnaRna',
      'biotechnology',
      'geneExpressionRegulation',
      'geneticDisease',
    ],
  },
  {
    label: "Chargaff's Ratio",
    value: "chargaff'SRatio",
    url: 'https://www.biointeractive.org/classroom-resources/chargaffs-ratio',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Coding Sequences in DNA',
    value: 'codingSequencesInDNA',
    url:
      'https://www.biointeractive.org/classroom-resources/coding-sequences-dna',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'bioinformatics'],
  },
  {
    label: 'Creating Phylogenetic Trees from DNA Sequences',
    value: 'creatingPhylogeneticTreesFromDNASequences',
    url:
      'https://www.biointeractive.org/classroom-resources/creating-phylogenetic-trees-dna-sequences',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna', 'biotechnology'],
  },
  {
    label: 'CRISPR-Cas9 Mechanism & Applications',
    value: 'cRISPR-Cas9Mechanism&Applications',
    url:
      'https://www.biointeractive.org/classroom-resources/crispr-cas-9-mechanism-applications',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: [
      'dnaRna',
      'biotechnology',
      'geneExpressionRegulation',
      'geneticDisease',
    ],
  },
  {
    label: 'CSI Wildlife',
    value: 'cSIWildlife',
    url: 'https://www.biointeractive.org/classroom-resources/csi-wildlife',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'bioinformatics'],
  },
  {
    label: 'Dengue Virus Life Cycle',
    value: 'dengueVirusLifeCycle',
    url:
      'https://www.biointeractive.org/classroom-resources/dengue-virus-life-cycle',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'DNA Cloning with Plasmids',
    value: 'dNACloningWithPlasmids',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-cloning-plasmids',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna', 'biotechnology'],
  },
  {
    label: 'DNA Damage and Mutations',
    value: 'dNADamageAndMutations',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-damage-and-mutations',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'geneticDisease', 'mutations'],
  },
  {
    label: 'DNA Profiling Activity',
    value: 'dNAProfilingActivity',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-profiling-activity',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: [
      'dnaRna',
      'biotechnology',
      'patternsOfInheritance',
      'bioinformatics',
    ],
  },
  {
    label: 'DNA Replication (Advanced Detail)',
    value: 'dNAReplication(AdvancedDetail)',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-replication-advanced-detail',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'DNA Replication (Basic Detail)',
    value: 'dNAReplication(BasicDetail)',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-replication-basic-detail',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'DNA Replication (Schematic)',
    value: 'dNAReplication(Schematic)',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-replication-schematic',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'DNA Sequence Assembly',
    value: 'dNASequenceAssembly',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-sequence-assembly',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'biotechnology', 'bioinformatics'],
  },
  {
    label: 'DNA Transcription (Advanced Detail)',
    value: 'dNATranscription(AdvancedDetail)',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-transcription-advanced-detail',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'DNA Transcription (Basic Detail)',
    value: 'dNATranscription(BasicDetail)',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-transcription-basic-detail',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'HIV Reverse Transcription and AZT',
    value: 'hIVReverseTranscriptionAndAZT',
    url:
      'https://www.biointeractive.org/classroom-resources/hiv-reverse-transcription-and-azt',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'geneExpressionRegulation'],
  },
  {
    label: 'Human Chromosomes',
    value: 'humanChromosomes',
    url: 'https://www.biointeractive.org/classroom-resources/human-chromosomes',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Human Genome Sequencing',
    value: 'humanGenomeSequencing',
    url:
      'https://www.biointeractive.org/classroom-resources/human-genome-sequencing',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'biotechnology', 'bioinformatics'],
  },
  {
    label: 'Mismatch Repair',
    value: 'mismatchRepair',
    url: 'https://www.biointeractive.org/classroom-resources/mismatch-repair',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'mutations'],
  },
  {
    label: 'Paired DNA Strands',
    value: 'pairedDNAStrands',
    url:
      'https://www.biointeractive.org/classroom-resources/paired-dna-strands',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Polymerase Chain Reaction (PCR)',
    value: 'polymeraseChainReaction(PCR)',
    url:
      'https://www.biointeractive.org/classroom-resources/polymerase-chain-reaction-pcr',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna', 'biotechnology'],
  },
  {
    label: 'Pulse Chase Primer: The Meselson-Stahl Experiment',
    value: 'pulseChasePrimer:TheMeselson-StahlExperiment',
    url:
      'https://www.biointeractive.org/classroom-resources/pulse-chase-primer-meselsonstahl-experiment',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Recombination of the Y Chromosome',
    value: 'recombinationOfTheYChromosome',
    url:
      'https://www.biointeractive.org/classroom-resources/recombination-y-chromosome',
    topics: ['biochemistryMolecularBiology', 'cellBiology'],
    subtopics: ['dnaRna', 'cellCycle'],
  },
  {
    label: 'Regulation of Eukaryotic DNA Transcription',
    value: 'regulationOfEukaryoticDNATranscription',
    url:
      'https://www.biointeractive.org/classroom-resources/regulation-eukaryotic-dna-transcription',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'geneExpressionRegulation'],
  },
  {
    label: 'RNA Diversity',
    value: 'rNADiversity',
    url: 'https://www.biointeractive.org/classroom-resources/rna-diversity',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'RNA Folding',
    value: 'rNAFolding',
    url: 'https://www.biointeractive.org/classroom-resources/rna-folding',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'RNA Interference',
    value: 'rNAInterference',
    url: 'https://www.biointeractive.org/classroom-resources/rna-interference',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'biotechnology', 'geneExpressionRegulation'],
  },
  {
    label: 'RNA Splicing',
    value: 'rNASplicing',
    url: 'https://www.biointeractive.org/classroom-resources/rna-splicing',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'geneExpressionRegulation'],
  },
  {
    label: 'Role of MECP2 in Gene Silencing',
    value: 'roleOfMECP2InGeneSilencing',
    url:
      'https://www.biointeractive.org/classroom-resources/role-mecp2-gene-silencing',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'geneExpressionRegulation', 'epigenetics'],
  },
  {
    label: 'Sanger Sequencing',
    value: 'sangerSequencing',
    url: 'https://www.biointeractive.org/classroom-resources/sanger-sequencing',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'biotechnology', 'bioinformatics'],
  },
  {
    label: 'Shotgun Sequencing',
    value: 'shotgunSequencing',
    url:
      'https://www.biointeractive.org/classroom-resources/shotgun-sequencing',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'biotechnology', 'bioinformatics'],
  },
  {
    label: 'Structure and Function of Telomeres',
    value: 'structureAndFunctionOfTelomeres',
    url:
      'https://www.biointeractive.org/classroom-resources/structure-and-function-telomeres',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'The Chemical Structure of DNA',
    value: 'theChemicalStructureOfDNA',
    url:
      'https://www.biointeractive.org/classroom-resources/chemical-structure-dna',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'The Discovery of Ribozymes',
    value: 'theDiscoveryOfRibozymes',
    url:
      'https://www.biointeractive.org/classroom-resources/discovery-ribozymes',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'The Double Helix',
    value: 'theDoubleHelix',
    url: 'https://www.biointeractive.org/classroom-resources/double-helix',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Treating HIV Infection with a Reverse Transcriptase Inhibitor',
    value: 'treatingHIVInfectionWithAReverseTranscriptaseInhibitor',
    url:
      'https://www.biointeractive.org/classroom-resources/treating-hiv-infection-reverse-transcriptase-inhibitor',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Trinucleotide Repeat',
    value: 'trinucleotideRepeat',
    url:
      'https://www.biointeractive.org/classroom-resources/trinucleotide-repeat',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['dnaRna', 'geneticDisease'],
  },
  {
    label: 'Using CRISPR to Identify the Functions of Butterfly Genes',
    value: 'usingCRISPRToIdentifyTheFunctionsOfButterflyGenes',
    url:
      'https://www.biointeractive.org/classroom-resources/using-crispr-identify-functions-butterfly-genes',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna', 'biotechnology'],
  },
  {
    label: 'Viral DNA Integration',
    value: 'viralDNAIntegration',
    url:
      'https://www.biointeractive.org/classroom-resources/viral-dna-integration',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['dnaRna'],
  },
  {
    label: 'Activity for Genes as Medicine',
    value: 'activityForGenesAsMedicine',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-genes-medicine',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'patternsOfInheritance', 'geneticDisease'],
  },
  {
    label: 'Bacterial Identification Virtual Lab',
    value: 'bacterialIdentificationVirtualLab',
    url:
      'https://www.biointeractive.org/classroom-resources/bacterial-identification-virtual-lab',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'bioinformatics'],
  },
  {
    label: 'Cardiology Virtual Lab',
    value: 'cardiologyVirtualLab',
    url:
      'https://www.biointeractive.org/classroom-resources/cardiology-virtual-lab',
    topics: ['biochemistryMolecularBiology', 'genetics', 'anatomyPhysiology'],
    subtopics: [
      'biotechnology',
      'patternsOfInheritance',
      'geneticDisease',
      'cardiovascularSystem',
    ],
  },
  {
    label: 'CLARITY: Cutting Edge Microscopy for Brain Imaging',
    value: 'cLARITY:CuttingEdgeMicroscopyForBrainImaging',
    url:
      'https://www.biointeractive.org/classroom-resources/clarity-cutting-edge-microscopy-brain-imaging',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology'],
    subtopics: ['biotechnology', 'nervousEndocrineSystems'],
  },
  {
    label: 'Coloration in Vertebrates',
    value: 'colorationInVertebrates',
    url:
      'https://www.biointeractive.org/classroom-resources/coloration-vertebrates',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology', 'evolution'],
    subtopics: ['biotechnology', 'skinMusculoskeletalSystem', 'humanEvolution'],
  },
  {
    label: 'Creating Embryonic Stem Cell Lines',
    value: 'creatingEmbryonicStemCellLines',
    url:
      'https://www.biointeractive.org/classroom-resources/creating-embryonic-stem-cell-lines',
    topics: ['biochemistryMolecularBiology', 'cellBiology'],
    subtopics: ['biotechnology', 'differentiation', 'stemCells'],
  },
  {
    label: 'Dasatinib',
    value: 'dasatinib',
    url: 'https://www.biointeractive.org/classroom-resources/dasatinib',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['biotechnology'],
  },
  {
    label: 'DNA Sequence Technology Improves Cancer Treatment',
    value: 'dNASequenceTechnologyImprovesCancerTreatment',
    url:
      'https://www.biointeractive.org/classroom-resources/dna-sequence-technology-improves-cancer-treatment',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'genomics', 'bioinformatics'],
  },
  {
    label: 'Ebola: Disease Detectives',
    value: 'ebola:DiseaseDetectives',
    url:
      'https://www.biointeractive.org/classroom-resources/ebola-disease-detectives',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['biotechnology'],
  },
  {
    label: 'Genes as Medicine',
    value: 'genesAsMedicine',
    url: 'https://www.biointeractive.org/classroom-resources/genes-medicine',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'patternsOfInheritance', 'geneticDisease'],
  },
  {
    label: 'Genetically Modified Mosquitoes',
    value: 'geneticallyModifiedMosquitoes',
    url:
      'https://www.biointeractive.org/classroom-resources/genetically-modified-mosquitoes',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['biotechnology'],
  },
  {
    label: 'Gleevec (Imatinib)',
    value: 'gleevec(Imatinib)',
    url: 'https://www.biointeractive.org/classroom-resources/gleevec-imatinib',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['biotechnology'],
  },
  {
    label: 'How to Analyze DNA Microarray Data',
    value: 'howToAnalyzeDNAMicroarrayData',
    url:
      'https://www.biointeractive.org/classroom-resources/how-analyze-dna-microarray-data',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'bioinformatics'],
  },
  {
    label: 'Identifying the Key Genes for Regeneration',
    value: 'identifyingTheKeyGenesForRegeneration',
    url:
      'https://www.biointeractive.org/classroom-resources/identifying-key-genes-regeneration',
    topics: [
      'biochemistryMolecularBiology',
      'cellBiology',
      'anatomyPhysiology',
    ],
    subtopics: ['biotechnology', 'stemCells', 'reproductionDevelopment'],
  },
  {
    label: 'Inheritance and Mutations in a Single-Gene Disorder',
    value: 'inheritanceAndMutationsInASingle-GeneDisorder',
    url:
      'https://www.biointeractive.org/classroom-resources/inheritance-and-mutations-singlegene-disorder',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'patternsOfInheritance', 'geneticDisease'],
  },
  {
    label: 'Interactive Case Study for The Search for a Mutated Gene',
    value: 'interactiveCaseStudyForTheSearchForAMutatedGene',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-case-study-search-mutated-gene',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'geneticDisease'],
  },
  {
    label: 'Learning from Mice: The Science of Transgenic Technology',
    value: 'learningFromMice:TheScienceOfTransgenicTechnology',
    url:
      'https://www.biointeractive.org/classroom-resources/learning-mice-science-transgenic-technology',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'geneExpressionRegulation'],
  },
  {
    label: 'Metabarcoding',
    value: 'metabarcoding',
    url: 'https://www.biointeractive.org/classroom-resources/metabarcoding',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'bioinformatics'],
  },
  {
    label: 'Niche Partitioning and DNA Metabarcoding',
    value: 'nichePartitioningAndDNAMetabarcoding',
    url:
      'https://www.biointeractive.org/classroom-resources/niche-partitioning-and-dna-metabarcoding',
    topics: ['biochemistryMolecularBiology', 'anatomyPhysiology', 'ecology'],
    subtopics: ['biotechnology', 'animalBehavior', 'communities'],
  },
  {
    label: 'Niche Partitioning and Species Coexistence',
    value: 'nichePartitioningAndSpeciesCoexistence',
    url:
      'https://www.biointeractive.org/classroom-resources/niche-partitioning-and-species-coexistence',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['biotechnology'],
  },
  {
    label: 'Seeing Single Molecules Move',
    value: 'seeingSingleMoleculesMove',
    url:
      'https://www.biointeractive.org/classroom-resources/seeing-single-molecules-move',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'geneExpressionRegulation'],
  },
  {
    label: 'Somatic Cell Nuclear Transfer (Footage)',
    value: 'somaticCellNuclearTransfer(Footage)',
    url:
      'https://www.biointeractive.org/classroom-resources/somatic-cell-nuclear-transfer-footage',
    topics: ['biochemistryMolecularBiology', 'cellBiology'],
    subtopics: ['biotechnology', 'stemCells'],
  },
  {
    label: 'Somatic Cell Nuclear Transfer (Schematic)',
    value: 'somaticCellNuclearTransfer(Schematic)',
    url:
      'https://www.biointeractive.org/classroom-resources/somatic-cell-nuclear-transfer-schematic',
    topics: [
      'biochemistryMolecularBiology',
      'cellBiology',
      'anatomyPhysiology',
    ],
    subtopics: ['biotechnology', 'stemCells', 'reproductionDevelopment'],
  },
  {
    label: 'The Search for a Mutated Gene',
    value: 'theSearchForAMutatedGene',
    url:
      'https://www.biointeractive.org/classroom-resources/search-mutated-gene',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'genomics', 'geneticDisease'],
  },
  {
    label: 'Tracking Genetically Modified Mosquitoes',
    value: 'trackingGeneticallyModifiedMosquitoes',
    url:
      'https://www.biointeractive.org/classroom-resources/tracking-genetically-modified-mosquitoes',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['biotechnology'],
  },
  {
    label: 'Transgenic Fly Virtual Lab',
    value: 'transgenicFlyVirtualLab',
    url:
      'https://www.biointeractive.org/classroom-resources/transgenic-fly-virtual-lab',
    topics: [
      'biochemistryMolecularBiology',
      'anatomyPhysiology',
      'sciencePractices',
    ],
    subtopics: ['biotechnology', 'animalBehavior', 'explanationsArgumentation'],
  },
  {
    label: 'Using p53 to Fight Cancer',
    value: 'usingP53ToFightCancer',
    url:
      'https://www.biointeractive.org/classroom-resources/using-p53-fight-cancer',
    topics: ['biochemistryMolecularBiology', 'genetics', 'cellBiology'],
    subtopics: ['biotechnology', 'mutations', 'cellStructureFunction'],
  },
  {
    label: 'Virochip DNA Microarray',
    value: 'virochipDNAMicroarray',
    url:
      'https://www.biointeractive.org/classroom-resources/virochip-dna-microarray',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'bioinformatics'],
  },
  {
    label: 'Visualizing Gene-Expression Patterns',
    value: 'visualizingGene-ExpressionPatterns',
    url:
      'https://www.biointeractive.org/classroom-resources/visualizing-geneexpression-patterns',
    topics: ['biochemistryMolecularBiology', 'genetics'],
    subtopics: ['biotechnology', 'geneExpressionRegulation'],
  },
  {
    label: 'Winging It: Analyzing a Scientific Paper',
    value: 'wingingIt:AnalyzingAScientificPaper',
    url:
      'https://www.biointeractive.org/classroom-resources/winging-it-analyzing-scientific-paper',
    topics: ['biochemistryMolecularBiology'],
    subtopics: ['biotechnology'],
  },
  {
    label: 'Alzheimer’s Disease: Piecing Together the Evidence',
    value: 'alzheimerDisease:PiecingTogetherTheEvidence',
    url:
      'https://www.biointeractive.org/classroom-resources/alzheimers-disease-piecing-together-evidence',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems'],
  },
  {
    label: 'Autism and the Structure and Function of Synapses',
    value: 'autismAndTheStructureAndFunctionOfSynapses',
    url:
      'https://www.biointeractive.org/classroom-resources/autism-and-structure-and-function-synapses',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems'],
  },
  {
    label: 'Calcium Channel Blockers and Paralysis',
    value: 'calciumChannelBlockersAndParalysis',
    url:
      'https://www.biointeractive.org/classroom-resources/calcium-channel-blockers-and-paralysis',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'zoology'],
  },
  {
    label: 'Cone Snail Toxins and Paralysis',
    value: 'coneSnailToxinsAndParalysis',
    url:
      'https://www.biointeractive.org/classroom-resources/cone-snail-toxins-and-paralysis',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'skinMusculoskeletalSystem'],
  },
  {
    label: 'Cone Snails: Versatile Hunters',
    value: 'coneSnailsVersatileHunters',
    url:
      'https://www.biointeractive.org/classroom-resources/cone-snails-versatile-hunters',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'animalBehavior', 'zoology'],
  },
  {
    label: "Dante's Story: Genomics and Hemimegalencephaly",
    value: 'danteStoryGenomicsAndHemimegalencephaly',
    url:
      'https://www.biointeractive.org/classroom-resources/dantes-story-genomics-and-hemimegalencephaly',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'reproductionDevelopment'],
  },
  {
    label: 'Development of the Cerebral Cortex',
    value: 'developmentOfTheCerebralCortex',
    url:
      'https://www.biointeractive.org/classroom-resources/development-cerebral-cortex',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'reproductionDevelopment'],
  },
  {
    label: 'Electrical Activity of Neurons',
    value: 'electricalActivityOfNeurons',
    url:
      'https://www.biointeractive.org/classroom-resources/electrical-activity-neurons',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems'],
  },
  {
    label: 'Electrical Measurement of Muscle Activity',
    value: 'electricalMeasurementOfMuscleActivity',
    url:
      'https://www.biointeractive.org/classroom-resources/electrical-measurement-muscle-activity',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'skinMusculoskeletalSystem'],
  },
  {
    label: 'Molecular Mechanism of Synaptic Function',
    value: 'molecularMechanismOfSynapticFunction',
    url:
      'https://www.biointeractive.org/classroom-resources/molecular-mechanism-synaptic-function',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems'],
  },
  {
    label: 'Mouse Uses Memory to Navigate a Maze',
    value: 'mouseUsesMemoryToNavigateAMaze',
    url:
      'https://www.biointeractive.org/classroom-resources/mouse-uses-memory-navigate-maze',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'animalBehavior'],
  },
  {
    label: 'Neural Control of Walking and Running',
    value: 'neuralControlOfWalkingAndRunning',
    url:
      'https://www.biointeractive.org/classroom-resources/neural-control-walking-and-running',
    topics: ['anatomyPhysiology'],
    subtopics: [
      'nervousEndocrineSystems',
      'skinMusculoskeletalSystem',
      'animalBehavior',
    ],
  },
  {
    label: 'Neurophysiology Virtual Lab',
    value: 'neurophysiologyVirtualLab',
    url:
      'https://www.biointeractive.org/classroom-resources/neurophysiology-virtual-lab',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'zoology'],
  },
  {
    label: 'Prenatal Development of the Human Brain',
    value: 'prenatalDevelopmentOfTheHumanBrain',
    url:
      'https://www.biointeractive.org/classroom-resources/prenatal-development-human-brain',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'reproductionDevelopment'],
  },
  {
    label: 'Reflex and Sensitization in a Sea Slug',
    value: 'reflexAndSensitizationInASeaSlug',
    url:
      'https://www.biointeractive.org/classroom-resources/reflex-and-sensitization-sea-slug',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'animalBehavior', 'zoology'],
  },
  {
    label: 'Sex Verification Testing of Athletes',
    value: 'sexVerificationTestingOfAthletes',
    url:
      'https://www.biointeractive.org/classroom-resources/sex-verification-testing-athletes',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: [
      'nervousEndocrineSystems',
      'reproductionDevelopment',
      'scienceSociety',
    ],
  },
  {
    label: 'Sleep Clears β-amyloid from the Brain',
    value: 'sleepClearsβ-AmyloidFromTheBrain',
    url:
      'https://www.biointeractive.org/classroom-resources/sleep-clears-amyloid-brain',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['nervousEndocrineSystems', 'graphInterpretation'],
  },
  {
    label: 'Sodium Channel Evolution in Electric Fish',
    value: 'sodiumChannelEvolutionInElectricFish',
    url:
      'https://www.biointeractive.org/classroom-resources/sodium-channel-evolution-electric-fish',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['nervousEndocrineSystems', 'phylogeny', 'graphInterpretation'],
  },
  {
    label: 'The Cochlea',
    value: 'theCochlea',
    url: 'https://www.biointeractive.org/classroom-resources/cochlea',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems'],
  },
  {
    label: 'The Search for Genetic Mutations That Cause Autism',
    value: 'theSearchForGeneticMutationsThatCauseAutism',
    url:
      'https://www.biointeractive.org/classroom-resources/search-genetic-mutations-cause-autism',
    topics: ['anatomyPhysiology'],
    subtopics: ['nervousEndocrineSystems', 'reproductionDevelopment'],
  },
  {
    label: 'Cells of the Immune System',
    value: 'cellsOfTheImmuneSystem',
    url:
      'https://www.biointeractive.org/classroom-resources/cells-immune-system',
    topics: ['anatomyPhysiology'],
    subtopics: ['immuneSystem'],
  },
  {
    label: 'Cytotoxic T Cell in Action',
    value: 'cytotoxicTCellInAction',
    url:
      'https://www.biointeractive.org/classroom-resources/cytotoxic-t-cell-action',
    topics: ['anatomyPhysiology'],
    subtopics: ['immuneSystem'],
  },
  {
    label: 'HIV Receptors and Co-receptors',
    value: 'hIVReceptorsAndCo-Receptors',
    url:
      'https://www.biointeractive.org/classroom-resources/hiv-receptors-and-coreceptors',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['immuneSystem', 'modelsSimulations'],
  },
  {
    label: 'Maternal Microbiota Impacts Offspring Immune System',
    value: 'maternalMicrobiotaImpactsOffspringImmuneSystem',
    url:
      'https://www.biointeractive.org/classroom-resources/maternal-microbiota-impacts-offspring-immune-system',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['immuneSystem', 'graphInterpretation'],
  },
  {
    label: 'Microbes from Mom: Vaginal Birth vs. C-Section',
    value: 'microbesFromMom:VaginalBirthVs.C-Section',
    url:
      'https://www.biointeractive.org/classroom-resources/microbes-mom-vaginal-birth-vs-csection',
    topics: ['anatomyPhysiology'],
    subtopics: ['immuneSystem', 'reproductionDevelopment'],
  },
  {
    label: 'Monkey Social Status and Immune Response',
    value: 'monkeySocialStatusAndImmuneResponse',
    url:
      'https://www.biointeractive.org/classroom-resources/monkey-social-status-and-immune-response',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['immuneSystem', 'animalBehavior', 'graphInterpretation'],
  },
  {
    label: 'Targeting Infected Cells for Immune Defense',
    value: 'targetingInfectedCellsForImmuneDefense',
    url:
      'https://www.biointeractive.org/classroom-resources/targeting-infected-cells-immune-defense',
    topics: ['anatomyPhysiology'],
    subtopics: ['immuneSystem'],
  },
  {
    label: 'Activity for The Birth and Death of Genes',
    value: 'activityForTheBirthAndDeathOfGenes',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-birth-and-death-genes',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['cardiovascularSystem', 'naturalSelection'],
  },
  {
    label: 'Diving Adaptations in Sea Nomads',
    value: 'divingAdaptationsInSeaNomads',
    url:
      'https://www.biointeractive.org/classroom-resources/diving-adaptations-sea-nomads',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'cardiovascularSystem',
      'naturalSelection',
      'humanEvolution',
      'graphInterpretation',
    ],
  },
  {
    label: 'Heart Function',
    value: 'heartFunction',
    url: 'https://www.biointeractive.org/classroom-resources/heart-function',
    topics: ['anatomyPhysiology'],
    subtopics: ['cardiovascularSystem'],
  },
  {
    label: 'How Novel Icefish Genes Can Improve Human Health',
    value: 'howNovelIcefishGenesCanImproveHumanHealth',
    url:
      'https://www.biointeractive.org/classroom-resources/how-novel-icefish-genes-can-improve-human-health',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'cardiovascularSystem',
      'naturalSelection',
      'explanationsArgumentation',
    ],
  },
  {
    label: 'Icefish Blood Adaptations: Antifreeze Proteins',
    value: 'icefishBloodAdaptations:AntifreezeProteins',
    url:
      'https://www.biointeractive.org/classroom-resources/icefish-blood-adaptations-antifreeze-proteins',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'cardiovascularSystem',
      'naturalSelection',
      'modelsSimulations',
    ],
  },
  {
    label: 'Icefish Blood Adaptations: Viscosity',
    value: 'icefishBloodAdaptations:Viscosity',
    url:
      'https://www.biointeractive.org/classroom-resources/icefish-blood-adaptations-viscosity',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'cardiovascularSystem',
      'naturalSelection',
      'modelsSimulations',
    ],
  },
  {
    label: 'Interactive Assessment for The Birth and Death of Genes',
    value: 'interactiveAssessmentForTheBirthAndDeathOfGenes',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-assessment-birth-and-death-genes',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['cardiovascularSystem', 'naturalSelection'],
  },
  {
    label: 'Kidney Function',
    value: 'kidneyFunction',
    url: 'https://www.biointeractive.org/classroom-resources/kidney-function',
    topics: ['anatomyPhysiology'],
    subtopics: ['cardiovascularSystem'],
  },
  {
    label: 'The Making of the Fittest: The Birth and Death of Genes',
    value: 'theMakingOfTheFittest:TheBirthAndDeathOfGenes',
    url:
      'https://www.biointeractive.org/classroom-resources/making-fittest-birth-and-death-genes',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['cardiovascularSystem', 'naturalSelection'],
  },
  {
    label: 'Vertebrate Circulatorium',
    value: 'vertebrateCirculatorium',
    url:
      'https://www.biointeractive.org/classroom-resources/vertebrate-circulatorium',
    topics: ['anatomyPhysiology'],
    subtopics: ['cardiovascularSystem', 'zoology'],
  },
  {
    label: 'Zebrafish Heart Regeneration',
    value: 'zebrafishHeartRegeneration',
    url:
      'https://www.biointeractive.org/classroom-resources/zebrafish-heart-regeneration',
    topics: ['anatomyPhysiology'],
    subtopics: ['cardiovascularSystem'],
  },
  {
    label: 'Activity for The Biology of Skin Color',
    value: 'activityForTheBiologyOfSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-biology-skin-color',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'naturalSelection',
      'humanEvolution',
    ],
  },
  {
    label: 'Activity for The Origin of Birds',
    value: 'activityForTheOriginOfBirds',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-origin-birds',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology'],
  },
  {
    label: 'Activity for The Origin of Humans',
    value: 'activityForTheOriginOfHumans',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-origin-humans',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'Activity for The Origin of Tetrapods',
    value: 'activityForTheOriginOfTetrapods',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-origin-tetrapods',
    topics: ['anatomyPhysiology', 'evolution', 'earthScience'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'earthHistory'],
  },
  {
    label: 'Activity for Your Inner Fish',
    value: 'activityForYourInnerFish',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-your-inner-fish',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'Comparative Anatomy of the Domestic Chicken',
    value: 'comparativeAnatomyOfTheDomesticChicken',
    url:
      'https://www.biointeractive.org/classroom-resources/comparative-anatomy-domestic-chicken',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'phylogeny', 'paleobiology'],
  },
  {
    label: 'Explore Your Inner Animals',
    value: 'exploreYourInnerAnimals',
    url:
      'https://www.biointeractive.org/classroom-resources/explore-your-inner-animals',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'Exploring Transitional Fossils',
    value: 'exploringTransitionalFossils',
    url:
      'https://www.biointeractive.org/classroom-resources/exploring-transitional-fossils',
    topics: ['anatomyPhysiology', 'evolution', 'earthScience'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'earthHistory'],
  },
  {
    label: 'Genetic Origin of Variation in Human Skin Color',
    value: 'geneticOriginOfVariationInHumanSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/genetic-origin-variation-human-skin-color',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['skinMusculoskeletalSystem', 'graphInterpretation'],
  },
  {
    label: 'Great Transitions: The Origin of Birds',
    value: 'greatTransitionsTheOriginOfBirds',
    url:
      'https://www.biointeractive.org/classroom-resources/great-transitions-origin-birds',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology'],
  },
  {
    label: 'Great Transitions: The Origin of Humans',
    value: 'greatTransitionsTheOriginOfHumans',
    url:
      'https://www.biointeractive.org/classroom-resources/great-transitions-origin-humans',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'Great Transitions: The Origin of Tetrapods',
    value: 'greatTransitionsTheOriginOfTetrapods',
    url:
      'https://www.biointeractive.org/classroom-resources/great-transitions-origin-tetrapods',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'How We Get Our Skin Color',
    value: 'howWeGetOurSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/how-we-get-our-skin-color',
    topics: ['anatomyPhysiology'],
    subtopics: ['skinMusculoskeletalSystem'],
  },
  {
    label: 'Human Origins',
    value: 'humanOrigins',
    url: 'https://www.biointeractive.org/classroom-resources/human-origins',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'Human Skin Color: Evidence for Selection',
    value: 'humanSkinColor:EvidenceForSelection',
    url:
      'https://www.biointeractive.org/classroom-resources/human-skin-color-evidence-selection',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'humanEvolution',
      'graphInterpretation',
    ],
  },
  {
    label: 'Interactive Assessment for The Biology of Skin Color',
    value: 'interactiveAssessmentForTheBiologyOfSkinColor',
    url: '',
    topics: ['anatomyPhysiology'],
    subtopics: ['skinMusculoskeletalSystem'],
  },
  {
    label: 'Interactive Assessment for The Origin of Birds',
    value: 'interactiveAssessmentForTheOriginOfBirds',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-assessment-origin-birds',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology'],
  },
  {
    label: 'Interactive Assessment for The Origin of Humans',
    value: 'interactiveAssessmentForTheOriginOfHumans',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-assessment-origin-humans',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'Interactive Exploration of How We Get Our Skin Color',
    value: 'interactiveExplorationOfHowWeGetOurSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-exploration-how-we-get-our-skin-color',
    topics: ['anatomyPhysiology'],
    subtopics: ['skinMusculoskeletalSystem'],
  },
  {
    label: 'Red Tattoo',
    value: 'redTattoo',
    url: 'https://www.biointeractive.org/classroom-resources/red-tattoo-0',
    topics: ['anatomyPhysiology'],
    subtopics: ['skinMusculoskeletalSystem'],
  },
  {
    label: 'Skeletons Reveal Human and Chimpanzee Evolution',
    value: 'skeletonsRevealHumanAndChimpanzeeEvolution',
    url:
      'https://www.biointeractive.org/classroom-resources/skeletons-reveal-human-and-chimpanzee-evolution',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'The Biology of Skin Color',
    value: 'theBiologyOfSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/biology-skin-color',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'naturalSelection',
      'humanEvolution',
    ],
  },
  {
    label: 'The Origin of Flight: What Use Is Half a Wing?',
    value: 'theOriginOfFlightWhatUseIsHalfAWing?',
    url:
      'https://www.biointeractive.org/classroom-resources/origin-flight-what-use-half-wing',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'experimentalDesign',
    ],
  },
  {
    label: 'Tiktaalik Fossil: Body',
    value: 'tiktaalikFossil:Body',
    url:
      'https://www.biointeractive.org/classroom-resources/tiktaalik-fossil-body',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'modelsSimulations',
    ],
  },
  {
    label: 'Tiktaalik Fossil: Humerus',
    value: 'tiktaalikFossil:Humerus',
    url:
      'https://www.biointeractive.org/classroom-resources/tiktaalik-fossil-humerus',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'modelsSimulations',
    ],
  },
  {
    label: 'Tiktaalik Fossil: Pectoral Fin',
    value: 'tiktaalikFossil:PectoralFin',
    url:
      'https://www.biointeractive.org/classroom-resources/tiktaalik-fossil-pectoral-fin',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'modelsSimulations',
    ],
  },
  {
    label: 'Tiktaalik Fossil: Pelvis',
    value: 'tiktaalikFossil:Pelvis',
    url:
      'https://www.biointeractive.org/classroom-resources/tiktaalik-fossil-pelvis',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'modelsSimulations',
    ],
  },
  {
    label: 'Tiktaalik Fossil: Skull',
    value: 'tiktaalikFossil:Skull',
    url:
      'https://www.biointeractive.org/classroom-resources/tiktaalik-fossil-skull',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'modelsSimulations',
    ],
  },
  {
    label: 'Tissue Regeneration in Animals',
    value: 'tissueRegenerationInAnimals',
    url:
      'https://www.biointeractive.org/classroom-resources/tissue-regeneration-animals',
    topics: ['anatomyPhysiology'],
    subtopics: ['skinMusculoskeletalSystem'],
  },
  {
    label: 'Understanding Variation in Human Skin Color',
    value: 'understandingVariationInHumanSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/understanding-variation-human-skin-color',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['skinMusculoskeletalSystem', 'humanEvolution', 'dataAnalysis'],
  },
  {
    label: 'Young Students Recognize a Transitional Fossil',
    value: 'youngStudentsRecognizeATransitionalFossil',
    url:
      'https://www.biointeractive.org/classroom-resources/young-students-recognize-transitional-fossil',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'explanationsArgumentation',
    ],
  },
  {
    label: 'Your Inner Fish',
    value: 'yourInnerFish',
    url: 'https://www.biointeractive.org/classroom-resources/your-inner-fish',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'explanationsArgumentation',
    ],
  },
  {
    label: 'Your Inner Monkey',
    value: 'yourInnerMonkey',
    url: 'https://www.biointeractive.org/classroom-resources/your-inner-monkey',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['skinMusculoskeletalSystem', 'paleobiology', 'humanEvolution'],
  },
  {
    label: 'Your Inner Reptile',
    value: 'yourInnerReptile',
    url:
      'https://www.biointeractive.org/classroom-resources/your-inner-reptile',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'skinMusculoskeletalSystem',
      'paleobiology',
      'explanationsArgumentation',
    ],
  },
  {
    label: 'Zebrafish and Skin Color',
    value: 'zebrafishAndSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/zebrafish-and-skin-color',
    topics: ['anatomyPhysiology'],
    subtopics: ['skinMusculoskeletalSystem'],
  },
  {
    label: 'Activity for Got Lactase? The Co-evolution of Genes and Culture',
    value: 'activityForGotLactaseTheCoEvolutionOfGenesAndCulture',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-got-lactase-coevolution-genes-and-culture',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['metabolismNutrition', 'naturalSelection', 'humanEvolution'],
  },
  {
    label: 'Body Mass Index (BMI)',
    value: 'bodyMassIndexBMI',
    url:
      'https://www.biointeractive.org/classroom-resources/body-mass-index-bmi',
    topics: ['anatomyPhysiology'],
    subtopics: ['metabolismNutrition'],
  },
  {
    label: 'Cancer and Cell Fate in the Intestinal Epithelium',
    value: 'cancerAndCellFateInTheIntestinalEpithelium',
    url:
      'https://www.biointeractive.org/classroom-resources/cancer-and-cell-fate-intestinal-epithelium',
    topics: ['anatomyPhysiology'],
    subtopics: ['metabolismNutrition'],
  },
  {
    label:
      'Interactive Assessment for Got Lactase? The Co-evolution of Genes and Culture',
    value: 'interactiveAssessmentForGotLactaseTheCoEvolutionOfGenesAndCulture',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-assessment-got-lactase-coevolution-genes-and-culture',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['metabolismNutrition', 'naturalSelection', 'humanEvolution'],
  },
  {
    label: 'Lactose Intolerance: Fact or Fiction',
    value: 'lactoseIntoleranceFactOrFiction',
    url:
      'https://www.biointeractive.org/classroom-resources/lactose-intolerance-fact-or-fiction',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'metabolismNutrition',
      'humanEvolution',
      'explanationsArgumentation',
    ],
  },
  {
    label: 'Leptin Feedback Control System',
    value: 'leptinFeedbackControlSystem',
    url:
      'https://www.biointeractive.org/classroom-resources/leptin-feedback-control-system',
    topics: ['anatomyPhysiology'],
    subtopics: ['metabolismNutrition', 'homeostasis'],
  },
  {
    label: 'PPAR-gamma Activation in the Fat Cell',
    value: 'pPAR-GammaActivationInTheFatCell',
    url:
      'https://www.biointeractive.org/classroom-resources/ppargamma-activation-fat-cell',
    topics: ['anatomyPhysiology'],
    subtopics: ['metabolismNutrition'],
  },
  {
    label:
      'The Making of the Fittest: Got Lactase? The Co-evolution of Genes and Culture',
    value: 'theMakingOfTheFittestGotLactaseTheCoEvolutionOfGenesAndCulture',
    url:
      'https://www.biointeractive.org/classroom-resources/making-fittest-got-lactase-coevolution-genes-and-culture',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['metabolismNutrition', 'naturalSelection', 'humanEvolution'],
  },
  {
    label: 'Asexual vs. Sexual Reproduction',
    value: 'asexualVsSexualReproduction',
    url:
      'https://www.biointeractive.org/classroom-resources/asexual-vs-sexual-reproduction',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['reproductionDevelopment', 'populationGenetics'],
  },
  {
    label: 'Cellular Differentiation Along Concentration Gradients',
    value: 'cellularDifferentiationAlongConcentrationGradients',
    url:
      'https://www.biointeractive.org/classroom-resources/cellular-differentiation-along-concentration-gradients',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'Differentiation and the Fate of Cells',
    value: 'differentiationAndTheFateOfCells',
    url:
      'https://www.biointeractive.org/classroom-resources/differentiation-and-fate-cells',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'Genetic Mutations and Disease',
    value: 'geneticMutationsAndDisease',
    url:
      'https://www.biointeractive.org/classroom-resources/genetic-mutations-and-disease-0',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'Human Embryonic Development',
    value: 'humanEmbryonicDevelopment',
    url:
      'https://www.biointeractive.org/classroom-resources/human-embryonic-development',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'Investigating Planarian Behavior and Regeneration',
    value: 'investigatingPlanarianBehaviorAndRegeneration',
    url:
      'https://www.biointeractive.org/classroom-resources/investigating-planarian-behavior-and-regeneration',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['reproductionDevelopment', 'experimentalDesign'],
  },
  {
    label: 'Meiosis',
    value: 'meiosis',
    url: 'https://www.biointeractive.org/classroom-resources/meiosis',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'Synchronized Division',
    value: 'synchronizedDivision',
    url:
      'https://www.biointeractive.org/classroom-resources/synchronized-division',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'Testosterone Levels in Elite Athletes',
    value: 'testosteroneLevelsInEliteAthletes',
    url:
      'https://www.biointeractive.org/classroom-resources/testosterone-levels-elite-athletes',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['reproductionDevelopment', 'graphInterpretation'],
  },
  {
    label: 'Why Two Heads?',
    value: 'whyTwoHeads',
    url: 'https://www.biointeractive.org/classroom-resources/why-two-heads',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'X Inactivation',
    value: 'xInactivation',
    url: 'https://www.biointeractive.org/classroom-resources/x-inactivation',
    topics: ['anatomyPhysiology'],
    subtopics: ['reproductionDevelopment'],
  },
  {
    label: 'How Did Dinosaurs Regulate Body Temperature?',
    value: 'howDidDinosaursRegulateBodyTemperature?',
    url:
      'https://www.biointeractive.org/classroom-resources/how-did-dinosaurs-regulate-body-temperature',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['homeostasis', 'paleobiology', 'dataAnalysis'],
  },
  {
    label: 'Thermoregulation in Dinosaurs',
    value: 'thermoregulationInDinosaurs',
    url:
      'https://www.biointeractive.org/classroom-resources/thermoregulation-dinosaurs',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['homeostasis', 'paleobiology', 'graphInterpretation'],
  },
  {
    label: 'Activity for Lizards in an Evolutionary Tree',
    value: 'activityForLizardsInAnEvolutionaryTree',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-lizards-evolutionary-tree',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: [
      'animalBehavior',
      'naturalSelection',
      'speciation',
      'phylogeny',
    ],
  },
  {
    label: 'Activity for The Beak of the Finch',
    value: 'activityForTheBeakOfTheFinch',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-beak-finch',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'naturalSelection', 'speciation'],
  },
  {
    label: 'Are You a Morning or an Evening Person?',
    value: 'areYouAMorningOrAnEveningPerson?',
    url:
      'https://www.biointeractive.org/classroom-resources/are-you-morning-or-evening-person',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'scienceSociety'],
  },
  {
    label: 'Bat Echolocation',
    value: 'batEcholocation',
    url: 'https://www.biointeractive.org/classroom-resources/bat-echolocation',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'zoology', 'graphInterpretation'],
  },
  {
    label: 'Benefits of Schools',
    value: 'benefitsOfSchools',
    url: 'https://www.biointeractive.org/classroom-resources/benefits-schools',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'zoology', 'explanationsArgumentation'],
  },
  {
    label: 'Bobtail Squid Burrowing',
    value: 'bobtailSquidBurrowing',
    url:
      'https://www.biointeractive.org/classroom-resources/bobtail-squid-burrowing',
    topics: ['anatomyPhysiology'],
    subtopics: ['animalBehavior', 'zoology'],
  },
  {
    label: 'Cone Snail Strikes a Fish',
    value: 'coneSnailStrikesAFish',
    url:
      'https://www.biointeractive.org/classroom-resources/cone-snail-strikes-fish',
    topics: ['anatomyPhysiology'],
    subtopics: ['animalBehavior', 'zoology'],
  },
  {
    label: 'Deadly Straw',
    value: 'deadlyStraw',
    url: 'https://www.biointeractive.org/classroom-resources/deadly-straw',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'zoology', 'explanationsArgumentation'],
  },
  {
    label: 'Dog Breeding',
    value: 'dogBreeding',
    url: 'https://www.biointeractive.org/classroom-resources/dog-breeding',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'artificialSelection'],
  },
  {
    label: 'Effects of Predation on the Niche of Lizards',
    value: 'effectsOfPredationOnTheNicheOfLizards',
    url:
      'https://www.biointeractive.org/classroom-resources/effects-predation-niche-lizards',
    topics: ['anatomyPhysiology', 'ecology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'populations', 'graphInterpretation'],
  },
  {
    label: 'Evolution of Ant-Mimicking Beetles',
    value: 'evolutionOfAnt-MimickingBeetles',
    url:
      'https://www.biointeractive.org/classroom-resources/evolution-antmimicking-beetles',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['animalBehavior', 'phylogeny', 'graphInterpretation'],
  },
  {
    label: 'Exploring Trophic Cascades',
    value: 'exploringTrophicCascades',
    url:
      'https://www.biointeractive.org/classroom-resources/exploring-trophic-cascades',
    topics: ['anatomyPhysiology', 'ecology'],
    subtopics: ['animalBehavior', 'communities', 'matterEnergy'],
  },
  {
    label: 'Fruit Fly Courtship',
    value: 'fruitFlyCourtship',
    url:
      'https://www.biointeractive.org/classroom-resources/fruit-fly-courtship',
    topics: ['anatomyPhysiology'],
    subtopics: ['animalBehavior', 'zoology'],
  },
  {
    label: 'How Animals Use Sound to Communicate',
    value: 'howAnimalsUseSoundToCommunicate',
    url:
      'https://www.biointeractive.org/classroom-resources/how-animals-use-sound-communicate',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'zoology', 'modelsSimulations'],
  },
  {
    label: 'How Lizards Find Their Way Home',
    value: 'howLizardsFindTheirWayHome',
    url:
      'https://www.biointeractive.org/classroom-resources/how-lizards-find-their-way-home',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'experimentalDesign'],
  },
  {
    label: 'How Termites Enrich Ecosystems',
    value: 'howTermitesEnrichEcosystems',
    url:
      'https://www.biointeractive.org/classroom-resources/how-termites-enrich-ecosystems',
    topics: ['anatomyPhysiology', 'ecology'],
    subtopics: ['animalBehavior', 'zoology', 'ecosystems'],
  },
  {
    label: 'Interactive Assessment for The Beak of the Finch',
    value: 'interactiveAssessmentForTheBeakOfTheFinch',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-assessment-beak-finch',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'naturalSelection', 'speciation'],
  },
  {
    label: 'Interactive Case Study for Studying Elephant Communication',
    value: 'interactiveCaseStudyForStudyingElephantCommunication',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-case-study-studying-elephant-communication',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'experimentalDesign', 'graphInterpretation'],
  },
  {
    label: 'Lizard Evolution Virtual Lab',
    value: 'lizardEvolutionVirtualLab',
    url:
      'https://www.biointeractive.org/classroom-resources/lizard-evolution-virtual-lab',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['animalBehavior', 'speciation', 'dataAnalysis', 'statistics'],
  },
  {
    label: 'Mate Choice in Spiders',
    value: 'mateChoiceInSpiders',
    url:
      'https://www.biointeractive.org/classroom-resources/mate-choice-spiders',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['animalBehavior', 'naturalSelection', 'graphInterpretation'],
  },
  {
    label: 'Measuring Circadian Activity in Drosophila',
    value: 'measuringCircadianActivityInDrosophila',
    url:
      'https://www.biointeractive.org/classroom-resources/measuring-circadian-activity-drosophila',
    topics: ['anatomyPhysiology'],
    subtopics: ['animalBehavior', 'zoology'],
  },
  {
    label: 'Mimicry in a Diverse Community of Arthropods',
    value: 'mimicryInADiverseCommunityOfArthropods',
    url:
      'https://www.biointeractive.org/classroom-resources/mimicry-diverse-community-arthropods',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['animalBehavior', 'naturalSelection', 'graphInterpretation'],
  },
  {
    label: 'Moth Mimicry: Using Ultrasound to Avoid Bats',
    value: 'mothMimicry:UsingUltrasoundToAvoidBats',
    url:
      'https://www.biointeractive.org/classroom-resources/moth-mimicry-using-ultrasound-avoid-bats',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'zoology', 'naturalSelection'],
  },
  {
    label: 'Mozambique Mounds',
    value: 'mozambiqueMounds',
    url:
      'https://www.biointeractive.org/classroom-resources/mozambique-mounds-0',
    topics: ['anatomyPhysiology', 'ecology'],
    subtopics: ['animalBehavior', 'ecosystems'],
  },
  {
    label: 'Niche Partitioning',
    value: 'nichePartitioning',
    url:
      'https://www.biointeractive.org/classroom-resources/niche-partitioning',
    topics: ['anatomyPhysiology', 'ecology'],
    subtopics: ['animalBehavior', 'communities'],
  },
  {
    label: 'Niche Partitioning Activity',
    value: 'nichePartitioningActivity',
    url:
      'https://www.biointeractive.org/classroom-resources/niche-partitioning-activity',
    topics: ['anatomyPhysiology', 'ecology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'communities', 'explanationsArgumentation'],
  },
  {
    label: 'Reproductive Isolation and Speciation in Lizards',
    value: 'reproductiveIsolationAndSpeciationInLizards',
    url:
      'https://www.biointeractive.org/classroom-resources/reproductive-isolation-and-speciation-lizards',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'naturalSelection', 'speciation'],
  },
  {
    label: 'Schooling Behavior of Stickleback Fish from Different Habitats',
    value: 'schoolingBehaviorOfSticklebackFishFromDifferentHabitats',
    url:
      'https://www.biointeractive.org/classroom-resources/schooling-behavior-stickleback-fish-different-habitats',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: ['animalBehavior', 'naturalSelection', 'graphInterpretation'],
  },
  {
    label: 'Scientific Inquiry and Data Analysis Using WildCam Gorongosa',
    value: 'scientificInquiryAndDataAnalysisUsingWildCamGorongosa',
    url:
      'https://www.biointeractive.org/classroom-resources/scientific-inquiry-and-data-analysis-using-wildcam-gorongosa',
    topics: ['anatomyPhysiology', 'ecology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'populations', 'dataAnalysis'],
  },
  {
    label: 'Sorting Finch Species',
    value: 'sortingFinchSpecies',
    url:
      'https://www.biointeractive.org/classroom-resources/sorting-finch-species',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'speciation'],
  },
  {
    label: 'Studying Elephant Communication',
    value: 'studyingElephantCommunication',
    url:
      'https://www.biointeractive.org/classroom-resources/studying-elephant-communication',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['animalBehavior', 'zoology', 'experimentalDesign'],
  },
  {
    label: 'The Art of Hiding',
    value: 'theArtOfHiding',
    url: 'https://www.biointeractive.org/classroom-resources/art-of-hiding',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'zoology', 'naturalSelection'],
  },
  {
    label: 'The Lone Anole',
    value: 'theLoneAnole',
    url: 'https://www.biointeractive.org/classroom-resources/lone-anole',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'zoology', 'speciation'],
  },
  {
    label: 'The Origin of Species: Lizards in an Evolutionary Tree',
    value: 'theOriginOfSpecies:LizardsInAnEvolutionaryTree',
    url:
      'https://www.biointeractive.org/classroom-resources/origin-species-lizards-evolutionary-tree',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: [
      'animalBehavior',
      'naturalSelection',
      'speciation',
      'phylogeny',
    ],
  },
  {
    label: 'The Origin of Species: The Beak of the Finch',
    value: 'theOriginOfSpecies:TheBeakOfTheFinch',
    url:
      'https://www.biointeractive.org/classroom-resources/origin-species-beak-finch',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['animalBehavior', 'naturalSelection', 'speciation'],
  },
  {
    label: 'A Wasp Mom’s Gift: Blankets of Bacteria',
    value: 'aWaspMom’SGift:BlanketsOfBacteria',
    url:
      'https://www.biointeractive.org/classroom-resources/wasp-moms-gift-blankets-bacteria',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Activity for How Tube Worms Survive at Hydrothermal Vents',
    value: 'activityForHowTubeWormsSurviveAtHydrothermalVents',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-how-tube-worms-survive-hydrothermal-vents',
    topics: ['anatomyPhysiology', 'ecology'],
    subtopics: ['zoology', 'matterEnergy'],
  },
  {
    label: 'Activity for Nature’s Cutest Symbiosis: The Bobtail Squid',
    value: 'activityForNature’SCutestSymbiosis:TheBobtailSquid',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-natures-cutest-symbiosis-bobtail-squid',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Activity for Termites Digest Wood Thanks to Microbes',
    value: 'activityForTermitesDigestWoodThanksToMicrobes',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-termites-digest-wood-thanks-microbes',
    topics: ['anatomyPhysiology', 'ecology'],
    subtopics: ['zoology', 'communities'],
  },
  {
    label: 'Animated Life: The Living Fossil Fish',
    value: 'animatedLife:TheLivingFossilFish',
    url:
      'https://www.biointeractive.org/classroom-resources/animated-life-living-fossil-fish',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['zoology', 'paleobiology'],
  },
  {
    label: 'Baboon Longevity Under Adversity',
    value: 'baboonLongevityUnderAdversity',
    url:
      'https://www.biointeractive.org/classroom-resources/baboon-longevity-under-adversity',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['zoology', 'scienceSociety', 'graphInterpretation'],
  },
  {
    label: 'Bee Colony Collapse Disorder',
    value: 'beeColonyCollapseDisorder',
    url:
      'https://www.biointeractive.org/classroom-resources/bee-colony-collapse-disorder',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Biodiversity Studies in Gorongosa',
    value: 'biodiversityStudiesInGorongosa',
    url:
      'https://www.biointeractive.org/classroom-resources/biodiversity-studies-gorongosa',
    topics: ['anatomyPhysiology', 'ecology', 'sciencePractices'],
    subtopics: ['zoology', 'communities', 'dataAnalysis'],
  },
  {
    label: 'Factors That Affect the Mosquito Life Cycle',
    value: 'factorsThatAffectTheMosquitoLifeCycle',
    url:
      'https://www.biointeractive.org/classroom-resources/factors-affect-mosquito-life-cycle',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['zoology', 'explanationsArgumentation'],
  },
  {
    label: 'How Giant Tube Worms Survive at Hydrothermal Vents',
    value: 'howGiantTubeWormsSurviveAtHydrothermalVents',
    url:
      'https://www.biointeractive.org/classroom-resources/how-giant-tube-worms-survive-hydrothermal-vents',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Lizards in Hurricanes',
    value: 'lizardsInHurricanes',
    url:
      'https://www.biointeractive.org/classroom-resources/lizards-hurricanes',
    topics: ['anatomyPhysiology', 'evolution', 'earthScience'],
    subtopics: ['zoology', 'naturalSelection', 'climate'],
  },
  {
    label: 'Lizards in the Cold',
    value: 'lizardsInTheCold',
    url: 'https://www.biointeractive.org/classroom-resources/lizards-cold',
    topics: [
      'anatomyPhysiology',
      'evolution',
      'earthScience',
      'sciencePractices',
    ],
    subtopics: [
      'zoology',
      'naturalSelection',
      'climate',
      'graphInterpretation',
    ],
  },
  {
    label: 'Malaria: Mosquito Host',
    value: 'malaria:MosquitoHost',
    url:
      'https://www.biointeractive.org/classroom-resources/malaria-mosquito-host',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Mosquitoes Might Save Lives, Thanks to Bacteria',
    value: 'mosquitoesMightSaveLives,ThanksToBacteria',
    url:
      'https://www.biointeractive.org/classroom-resources/mosquitoes-might-save-lives-thanks-bacteria',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Nature’s Cutest Symbiosis: The Bobtail Squid',
    value: 'nature’SCutestSymbiosis:TheBobtailSquid',
    url:
      'https://www.biointeractive.org/classroom-resources/natures-cutest-symbiosis-bobtail-squid',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Selection for Tuskless Elephants',
    value: 'selectionForTusklessElephants',
    url:
      'https://www.biointeractive.org/classroom-resources/selection-tuskless-elephants',
    topics: ['anatomyPhysiology', 'evolution', 'environmentalScience'],
    subtopics: ['zoology', 'naturalSelection', 'conservation'],
  },
  {
    label: 'Slug Power',
    value: 'slugPower',
    url: 'https://www.biointeractive.org/classroom-resources/slug-power',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['zoology', 'naturalSelection'],
  },
  {
    label: 'Stickleback Fish Environment',
    value: 'sticklebackFishEnvironment',
    url:
      'https://www.biointeractive.org/classroom-resources/stickleback-fish-environment',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['zoology', 'paleobiology'],
  },
  {
    label: 'Symbiotic Bioluminescence',
    value: 'symbioticBioluminescence',
    url:
      'https://www.biointeractive.org/classroom-resources/symbiotic-bioluminescence',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'Termites Digest Wood Thanks to Microbes',
    value: 'termitesDigestWoodThanksToMicrobes',
    url:
      'https://www.biointeractive.org/classroom-resources/termites-digest-wood-thanks-microbes',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'The Mosquito Life Cycle',
    value: 'theMosquitoLifeCycle',
    url:
      'https://www.biointeractive.org/classroom-resources/mosquito-life-cycle',
    topics: ['anatomyPhysiology'],
    subtopics: ['zoology'],
  },
  {
    label: 'The Mosquito Life Cycle Activity',
    value: 'theMosquitoLifeCycleActivity',
    url:
      'https://www.biointeractive.org/classroom-resources/mosquito-life-cycle-activity',
    topics: ['anatomyPhysiology', 'sciencePractices'],
    subtopics: ['zoology', 'dataAnalysis'],
  },
  {
    label: 'Activity for Popped Secret: The Mysterious Origin of Corn',
    value: 'activityForPoppedSecret:TheMysteriousOriginOfCorn',
    url:
      'https://www.biointeractive.org/classroom-resources/activity-popped-secret-mysterious-origin-corn',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['plantAnatomyPhysiology', 'artificialSelection'],
  },
  {
    label: 'Can a Fungus Save Plants from Global Warming?',
    value: 'canAFungusSavePlantsFromGlobalWarming?',
    url:
      'https://www.biointeractive.org/classroom-resources/can-fungus-save-plants-global-warming',
    topics: ['anatomyPhysiology', 'environmentalScience'],
    subtopics: ['plantAnatomyPhysiology', 'climateChange'],
  },
  {
    label: 'Dating Corn Domestication Using Carbon Isotopes',
    value: 'datingCornDomesticationUsingCarbonIsotopes',
    url:
      'https://www.biointeractive.org/classroom-resources/dating-corn-domestication-using-carbon-isotopes',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'plantAnatomyPhysiology',
      'paleobiology',
      'graphInterpretation',
    ],
  },
  {
    label:
      'Interactive Assessment for Popped Secret: The Mysterious Origin of Corn',
    value: 'interactiveAssessmentForPoppedSecret:TheMysteriousOriginOfCorn',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-assessment-popped-secret-mysterious-origin-corn',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['plantAnatomyPhysiology', 'artificialSelection'],
  },
  {
    label: 'Popped Secret: The Mysterious Origin of Corn',
    value: 'poppedSecret:TheMysteriousOriginOfCorn',
    url:
      'https://www.biointeractive.org/classroom-resources/popped-secret-mysterious-origin-corn',
    topics: ['anatomyPhysiology', 'evolution'],
    subtopics: ['plantAnatomyPhysiology', 'artificialSelection'],
  },
  {
    label: 'Root Movement',
    value: 'rootMovement',
    url: 'https://www.biointeractive.org/classroom-resources/root-movement',
    topics: ['anatomyPhysiology'],
    subtopics: ['plantAnatomyPhysiology'],
  },
  {
    label: 'Salt Stress Impacts Photosynthesis in Algae',
    value: 'saltStressImpactsPhotosynthesisInAlgae',
    url:
      'https://www.biointeractive.org/classroom-resources/salt-stress-impacts-photosynthesis-algae',
    topics: ['anatomyPhysiology', 'environmentalScience', 'sciencePractices'],
    subtopics: [
      'plantAnatomyPhysiology',
      'climateChange',
      'graphInterpretation',
    ],
  },
  {
    label: 'Seed Dispersal and Habitat Fragmentation',
    value: 'seedDispersalAndHabitatFragmentation',
    url:
      'https://www.biointeractive.org/classroom-resources/seed-dispersal-and-habitat-fragmentation',
    topics: ['anatomyPhysiology', 'environmentalScience'],
    subtopics: [
      'plantAnatomyPhysiology',
      'humanPopulationImpacts',
      'conservation',
    ],
  },
  {
    label: 'Seed Dispersal in Tropical Forests',
    value: 'seedDispersalInTropicalForests',
    url:
      'https://www.biointeractive.org/classroom-resources/seed-dispersal-tropical-forests',
    topics: ['anatomyPhysiology', 'ecology', 'sciencePractices'],
    subtopics: ['plantAnatomyPhysiology', 'communities', 'graphInterpretation'],
  },
  {
    label: 'Selective Breeding in Maize',
    value: 'selectiveBreedingInMaize',
    url:
      'https://www.biointeractive.org/classroom-resources/selective-breeding-maize',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'plantAnatomyPhysiology',
      'artificialSelection',
      'graphInterpretation',
    ],
  },
  {
    label: 'Stalking the Genetic Basis of a Trait',
    value: 'stalkingTheGeneticBasisOfATrait',
    url:
      'https://www.biointeractive.org/classroom-resources/stalking-genetic-basis-trait',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'plantAnatomyPhysiology',
      'artificialSelection',
      'dataAnalysis',
    ],
  },
  {
    label: 'The Teosinte Hypothesis',
    value: 'theTeosinteHypothesis',
    url:
      'https://www.biointeractive.org/classroom-resources/teosinte-hypothesis',
    topics: ['anatomyPhysiology', 'evolution', 'sciencePractices'],
    subtopics: [
      'plantAnatomyPhysiology',
      'artificialSelection',
      'dataAnalysis',
    ],
  },
  {
    label: 'Interactive Assessment for The Biology of Skin Color',
    value: 'interactiveAssessmentForTheBiologyOfSkinColor',
    url:
      'https://www.biointeractive.org/classroom-resources/interactive-assessment-biology-skin-color',
    topics: ['evolution'],
    subtopics: ['naturalSelection', 'humanEvolution'],
  },
]

module.exports = resources

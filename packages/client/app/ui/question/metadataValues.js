const metadata = {
  topics: [
    {
      label: 'Biochemistry & Molecular Biology',
      value: 'biochemistryMolecularBiology',
      subTopics: [
        {
          label: 'General Chemistry',
          value: 'generalChemistry',
        },
        {
          label: 'Water and Carbon',
          value: 'waterAndCarbon',
        },
        {
          label: 'Macromolecules',
          value: 'macromolecules',
        },
        {
          label: 'Enzymes & Reactions',
          value: 'enzymesReactions',
        },
        {
          label: 'DNA & RNA',
          value: 'dnaRna',
        },
        {
          label: 'Biotechnology',
          value: 'biotechnology',
        },
      ],
    },
    {
      label: 'Genetics',
      value: 'genetics',
      subTopics: [
        {
          label: 'Gene Expression & Regulation',
          value: 'geneExpressionRegulation',
        },
        {
          label: 'Patterns of Inheritance',
          value: 'patternsOfInheritance',
        },
        {
          label: 'Genomics',
          value: 'genomics',
        },
        {
          label: 'Genetic Disease',
          value: 'geneticDisease',
        },
        {
          label: 'Mutations',
          value: 'mutations',
        },
        {
          label: 'Epigenetics',
          value: 'epigenetics',
        },
        {
          label: 'Bioinformatics',
          value: 'bioinformatics',
        },
      ],
    },
    {
      label: 'Cell biology',
      value: 'cellBiology',
      subTopics: [
        {
          label: 'Cellular Transport',
          value: 'cellularTransport',
        },
        {
          label: 'Cell Structure & Function',
          value: 'cellStructureFunction',
        },
        {
          label: 'Cell Cycle',
          value: 'cellCycle',
        },
        {
          label: 'Cell Communication',
          value: 'cellCommunication',
        },
        {
          label: 'Cellular Energetics',
          value: 'cellularEnergetics',
        },
        {
          label: 'Differentiation',
          value: 'differentiation',
        },
        {
          label: 'Stem Cells',
          value: 'stemCells',
        },
        {
          label: 'Meiosis',
          value: 'meiosis',
        },
      ],
    },
    {
      label: 'Diversity of life',
      value: 'diversityOfLife',
      subTopics: [
        {
          label: 'Bacteria',
          value: 'bacteria',
        },
        {
          label: 'Viruses',
          value: 'viruses',
        },
        {
          label: 'Archaea',
          value: 'archaea',
        },
        {
          label: 'Eukaryotes',
          value: 'eukaryotes',
        },
      ],
    },
    {
      label: 'Anatomy & Physiology',
      value: 'anatomyPhysiology',
      subTopics: [
        {
          label: 'Nervous & Endocrine Systems',
          value: 'nervousEndocrineSystems',
        },
        {
          label: 'Immune System',
          value: 'immuneSystem',
        },
        {
          label: 'Cardiovascular System',
          value: 'cardiovascularSystem',
        },
        {
          label: 'Skin & Musculoskeletal System',
          value: 'skinMusculoskeletalSystem',
        },
        {
          label: 'Metabolism & Nutrition',
          value: 'metabolismNutrition',
        },
        {
          label: 'Reproduction & Development',
          value: 'reproductionDevelopment',
        },
        {
          label: 'Homeostasis',
          value: 'homeostasis',
        },
        {
          label: 'Animal Behavior',
          value: 'animalBehavior',
        },
        {
          label: 'Zoology',
          value: 'zoology',
        },
        {
          label: 'Plant Anatomy & Physiology',
          value: 'plantAnatomyPhysiology',
        },
      ],
    },
    {
      label: 'Evolution',
      value: 'evolution',
      subTopics: [
        {
          label: 'Artificial Selection',
          value: 'artificialSelection',
        },
        {
          label: 'Natural Selection',
          value: 'naturalSelection',
        },
        {
          label: 'Speciation',
          value: 'speciation',
        },
        {
          label: 'Population Genetics',
          value: 'populationGenetics',
        },
        {
          label: 'Phylogeny',
          value: 'phylogeny',
        },
        {
          label: 'Paleobiology',
          value: 'paleobiology',
        },
        {
          label: 'Human Evolution',
          value: 'humanEvolution',
        },
        {
          label: 'Extinction',
          value: 'extinction',
        },
      ],
    },
    {
      label: 'Ecology',
      value: 'ecology',
      subTopics: [
        {
          label: 'Populations',
          value: 'populations',
        },
        {
          label: 'Communities',
          value: 'communities',
        },
        {
          label: 'Ecosystems',
          value: 'ecosystems',
        },
        {
          label: 'Biomes',
          value: 'biomes',
        },
        {
          label: 'Matter & Energy',
          value: 'matterEnergy',
        },
      ],
    },
    {
      label: 'Environmental science',
      value: 'environmentalScience',
      subTopics: [
        {
          label: 'Human Population & Impacts',
          value: 'humanPopulationImpacts',
        },
        {
          label: 'Conservation',
          value: 'conservation',
        },
        {
          label: 'Climate Change',
          value: 'climateChange',
        },
        {
          label: 'Natural Resources',
          value: 'naturalResources',
        },
        {
          label: 'Environmental Systems',
          value: 'environmentalSystems',
        },
      ],
    },
    {
      label: 'Earth science',
      value: 'earthScience',
      subTopics: [
        {
          label: 'Earth History',
          value: 'earthHistory',
        },
        {
          label: 'Geology',
          value: 'geology',
        },
        {
          label: 'Atmosphere',
          value: 'atmosphere',
        },
        {
          label: 'Climate',
          value: 'climate',
        },
        {
          label: 'Hydrosphere',
          value: 'hydrosphere',
        },
        {
          label: 'Origin of Life',
          value: 'originOfLife',
        },
        {
          label: 'Biogeochemical Cycles',
          value: 'biogeochemicalCycles',
        },
      ],
    },
    {
      label: 'Science practices',
      value: 'sciencePractices',
      subTopics: [
        {
          label: 'Experimental Design',
          value: 'experimentalDesign',
        },
        {
          label: 'Explanations & Argumentation',
          value: 'explanationsArgumentation',
        },
        {
          label: 'Models & Simulations',
          value: 'modelsSimulations',
        },
        {
          label: 'Careers in Science',
          value: 'careersInScience',
        },
        {
          label: 'Science & Society',
          value: 'scienceSociety',
        },
        {
          label: 'Data Analysis',
          value: 'dataAnalysis',
        },
        {
          label: 'Graph Interpretation',
          value: 'graphInterpretation',
        },
        {
          label: 'Statistics',
          value: 'statistics',
        },
      ],
    },
  ],
  blooms: {
    cognitive: [
      {
        label: 'Higher-order',
        options: [
          {
            label: 'Understand (higher-order)',
            value: 'higher-understand',
          },
          {
            label: 'Apply',
            value: 'higher-apply',
          },
          {
            label: 'Analyze',
            value: 'higher-analyze',
          },
          {
            label: 'Evaluate',
            value: 'higher-evaluate',
          },
          {
            label: 'Create',
            value: 'higher-create',
          },
        ],
      },
      {
        label: 'Lower-order',
        options: [
          {
            label: 'Remember',
            value: 'lower-remember',
          },
          {
            label: 'Understand (lower-order)',
            value: 'lower-understand',
          },
        ],
      },
    ],
    affective: [
      {
        label: 'Receiving',
        value: 'receiving',
      },
      {
        label: 'Responding',
        value: 'responding',
      },
      {
        label: 'Valuing',
        value: 'valuing',
      },
      {
        label: 'Organization',
        value: 'organization',
      },
      {
        label: 'Characterization',
        value: 'characterization',
      },
    ],
    psychomotor: [
      {
        label: 'Reflex',
        value: 'reflex',
      },
      {
        label: 'Basic fundamental movements',
        value: 'basicFundamentalMovements',
      },
      {
        label: 'Perceptual abilities',
        value: 'perceptualAbilities',
      },
      {
        label: 'Physical abilities',
        value: 'physicalAbilities',
      },
      {
        label: 'Skilled movements',
        value: 'skilledMovements',
      },
      {
        label: 'Non-discursive communication',
        value: 'nonDiscursiveCommunication',
      },
    ],
  },
  frameworks: [
    {
      label: 'AP Biology',
      value: 'apBiology',
      units: [
        {
          label: 'Unit 1: Chemistry of Life',
          value: 'chemistryOfLife',
          topics: [
            {
              label: 'Topic 1.1 Structure of Water and Hydrogen Bonding',
              value: 'structureOfWaterAndHydrogenBonding',
              learningObjectives: [
                {
                  label:
                    'SYI-1.A Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function.',
                  value: 'SYI-1.A',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-1.A.1 The subcomponents of biological molecules and their sequence determine the properties of that molecule.',
                      value: 'SYI-1.A.1',
                    },
                    {
                      label:
                        'SYI-1.A.2 Living systems depend on the properties of water',
                      value: 'SYI-1.A.2',
                    },
                    {
                      label:
                        'SYI-1.A.3 H-bonds result in cohesion, adhesion, and surface tension',
                      value: 'SYI-1.A.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.2 Elements of Life',
              value: 'elementsOfLife',
              learningObjectives: [
                {
                  label:
                    'ENE-1.A Describe the composition of macromolecules required by living organisms.',
                  value: 'ENE-1.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.A.1 Organisms have to exchange matter with the environment',
                      value: 'ENE-1.A.1',
                    },
                    {
                      label:
                        'ENE-1-A.2 Atoms from environment build new molecules',
                      value: 'ENE-1-A.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.3 Introduction to Biological Macromolecules',
              value: 'introductionToBiologicalMacromolecules',
              learningObjectives: [
                {
                  label:
                    'SYI-1.B Describe the properties of the monomers and the type of bns that connect the monomers in biological macromolecules.',
                  value: 'SYI-1.B',
                  essentialKnowledge: [
                    {
                      label: 'SYI-1.B.1 Hydrolysis and dehydration synthesis',
                      value: 'SYI-1.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.4 Properties of Biological Macromolecules',
              value: 'propertiesOfBiologicalMacromolecules',
              learningObjectives: [
                {
                  label:
                    'SYI-1.B Describe the properties of the monomers and the type of bns that connect the monomers in biological macromolecules.',
                  value: 'SYI-1.B',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-1.B.2 Structure & function of polymers comes form how the monomers are assembled',
                      value: 'SYI-1.B.2',
                    },
                  ],
                },
              ],
            },
            {
              label:
                'Topic 1.5 Structure and Function of Biological Macromolecules',
              value: 'structureAndFunctionOfBiologicalMacromolecules',
              learningObjectives: [
                {
                  label:
                    'SYI-1.C Explain how a change in the subunits of a polymer may lead to changes in structure or function of the macromolecules.',
                  value: 'SYI-1.C',
                  essentialKnowledge: [
                    {
                      label:
                        "SYI-1.C.1 Directionality of subcomponents affects structure/function of polymer (5'-3', carboxyl terminus of proteins, primary, secondary, tertiary protein structure, monomer chains of carbohydrates)",
                      value: 'SYI-1.C.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.6 Nucleic Acids',
              value: 'nucleicAcids',
              learningObjectives: [
                {
                  label:
                    'IST-1.A Describe the structural similarities and differences between DNA and RNA.',
                  value: 'IST-1.A',
                  essentialKnowledge: [
                    {
                      label: 'IST-1.A.1 DNA/RNA similarities and differences ',
                      value: 'IST-1.A.1',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 2: Cell Structure and Function',
          value: 'cellStructureAndFunction',
          topics: [
            {
              label: 'Topic 2.1 Cell Structure: Subcellular Components',
              value: 'cellStructureSubcellularComponents',
              learningObjectives: [
                {
                  label:
                    'SYI-1.D Describe the structure and/or function of subcellular components and organelles.',
                  value: 'SYI-1.D',
                  essentialKnowledge: [
                    { label: 'SYI-1.D.1 Ribosomes', value: 'SYI-1.D.1' },
                    {
                      label: 'SYI-1.D.2 Ribosomes are universal',
                      value: 'SYI-1.D.2',
                    },
                    {
                      label: 'SYI-1.D.3 ER (smooth, rough)',
                      value: 'SYI-1.D.3',
                    },
                    { label: 'SYI-1.D.4 Golgi', value: 'SYI-1.D.4' },
                    { label: 'SYI-1.D.5 Mitochondria', value: 'SYI-1.D.5' },
                    { label: 'SYI-1.D.6 Lysosomes', value: 'SYI-1.D.6' },
                    { label: 'SYI-1.D.7 Vacuoles', value: 'SYI-1.D.7' },
                    { label: 'SYI-1.D.8 Chloroplasts', value: 'SYI-1.D.8' },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.2 Cell Structure and Function',
              value: 'cellStructureAndFunction',
              learningObjectives: [
                {
                  label:
                    'SYI-1.E Explain how subcellular components and organelles contribute to the function of the cell.',
                  value: 'SYI-1.E',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-1.E.1 Organelles support cell function (ER, mitochondria, lysosomes, vacuoles)',
                      value: 'SYI-1.E.1',
                    },
                  ],
                },
                {
                  label:
                    'SYI-1.F Describe the structural features of a cell that allow organisms to capture, store, and use energy.',
                  value: 'SYI-1.F',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-1.F.1 inner membrane inc. SA for ATP production',
                      value: 'SYI-1.F.1',
                    },
                    {
                      label: 'SYI-1.F.2 Thylakoids and stroma',
                      value: 'SYI-1.F.2',
                    },
                    {
                      label: 'SYI-1.F.3 Thylakoids in stacks (grana)',
                      value: 'SYI-1.F.3',
                    },
                    {
                      label:
                        'SYI-1.F.4 Membranes contain chlorophyll pigment and e- transport proteins',
                      value: 'SYI-1.F.4',
                    },
                    {
                      label:
                        'SYI-1.F.5 Light-dependent reactions occur in grana',
                      value: 'SYI-1.F.5',
                    },
                    {
                      label:
                        'SYI-1.F.6 Stroma = fluid between inner chloroplast membrane and thylakoids',
                      value: 'SYI-1.F.6',
                    },
                    {
                      label: 'SYI-1.F.7 Carbon fixation occurs in stroma',
                      value: 'SYI-1.F.7',
                    },
                    {
                      label:
                        'SYI-1.F.8 Krebs cycle occurs in mitochondrial matrix',
                      value: 'SYI-1.F.8',
                    },
                    {
                      label:
                        'SYI-1.F.9 e- transport and ATP synthesis occur on inner mitochondrial membrane',
                      value: 'SYI-1.F.9',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.3 Cell Size',
              value: 'cellSize',
              learningObjectives: [
                {
                  label:
                    'ENE-1.B Explain the effect of surface area-to-volume ratios on the exchange of materials between cells or organisms and the environment.',
                  value: 'ENE-1.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.B.1 SA:VOL affect ability of organisms to exchange materials (all equations given)',
                      value: 'ENE-1.B.1',
                    },
                    {
                      label:
                        'ENE-1B.2 SA of plasma membrane must be large enough to exchange materials (affects cell size, leads to folds, sa-vol decreases with size)',
                      value: 'ENE-1B.2',
                    },
                  ],
                },
                {
                  label:
                    'ENE-1.C Explain how specialized structures and strategies are used for the efficient exchange of molecules to the environment.',
                  value: 'ENE-1.C',
                  essentialKnowledge: [
                    {
                      label: 'ENE-1.C.1 Adaptations to exchange materials',
                      value: 'ENE-1.C.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.4 Plasma Membrane',
              value: 'plasmaMembrane',
              learningObjectives: [
                {
                  label:
                    'ENE-2.A Describe the roles of each of the components of the cell membrane in maintaining the internal environment of the cell.',
                  value: 'ENE-2.A',
                  essentialKnowledge: [
                    {
                      label: 'ENE-2.A.1 Phospholipids hydrophobic/hydrophilic',
                      value: 'ENE-2.A.1',
                    },
                    {
                      label:
                        'ENE-2.A.2 Embedded proteins can be hydrophobic, hydrophilic, polar, non-polar',
                      value: 'ENE-2.A.2',
                    },
                  ],
                },
                {
                  label:
                    'ENE-2.B Describe the Fluid Mosaic Model of cell membranes.',
                  value: 'ENE-2.B',
                  essentialKnowledge: [
                    {
                      label: 'ENE-2.B.1 Fluid Mosaic model',
                      value: 'ENE-2.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.5 Membrane Permeability',
              value: 'membranePermeability',
              learningObjectives: [
                {
                  label:
                    'ENE-2.C Explain how the structure of biological membranes influences selective permeability.',
                  value: 'ENE-2.C',
                  essentialKnowledge: [
                    {
                      label: 'ENE-2.C.1 Structure --> selective permeability',
                      value: 'ENE-2.C.1',
                    },
                    {
                      label: 'ENE-2.C.2 Membrane = separates internal/external',
                      value: 'ENE-2.C.2',
                    },
                    {
                      label:
                        'ENE-2.C.3 Selective permeability --> membrane structure',
                      value: 'ENE-2.C.3',
                    },
                    {
                      label:
                        'ENE-2.C.4 Small nonpolar (CO2, O2, N2) pass thru; hydrophilic (large polar, ions) move thru protein channels',
                      value: 'ENE-2.C.4',
                    },
                    {
                      label:
                        'ENE-2.C.5 Polar uncharged (e.g., H2O) pass thru in small amounts',
                      value: 'ENE-2.C.5',
                    },
                  ],
                },
                {
                  label:
                    'ENE-2.D Describe the role of the cell wall in maintaining cell structure and function.',
                  value: 'ENE-2.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-2.D.1 Cell walls --> structural boundary and a permeability barrier',
                      value: 'ENE-2.D.1',
                    },
                    {
                      label:
                        'ENE-2.D.2 Cell walls of plants, prokaryotes, fungi --> complex carbohydrates',
                      value: 'ENE-2.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.6 Membrane Transport',
              value: 'membraneTransport',
              learningObjectives: [
                {
                  label:
                    'ENE-2.E Describe the mechanisms that organisms use to maintain solute and water balance.',
                  value: 'ENE-2.E',
                  essentialKnowledge: [
                    {
                      label: 'ENE-2.E.1 Passive transport definition',
                      value: 'ENE-2.E.1',
                    },
                    {
                      label:
                        'ENE-2.E.2 Passive transport important in dumping wastes',
                      value: 'ENE-2.E.2',
                    },
                    {
                      label: 'ENE-2.E.3 Active transport definition',
                      value: 'ENE-2.E.3',
                    },
                  ],
                },
                {
                  label:
                    'ENE-2.F Describe the mechanisms that organisms use to transport large molecules across the plasma membrane.',
                  value: 'ENE-2.F',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-2.F.1 Selective permeability --> concentration gradients',
                      value: 'ENE-2.F.1',
                    },
                    {
                      label: 'ENE-2.F.2 Endocytosis & exocytosis',
                      value: 'ENE-2.F.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.7 Facilitated Diffusion',
              value: 'facilitatedDiffusion',
              learningObjectives: [
                {
                  label:
                    'ENE-2.G Explain how the structure of a molecule affects its ability to pass through the plasma membrane.',
                  value: 'ENE-2.G',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-2.G.1 Membrane proteins are needed for facilitated diff. of large polar molecules and charged molecules (e.g., aquaporins for lots of water, channel proteins for Na+ and K+); membranes may get polarized by movement of ions',
                      value: 'ENE-2.G.1',
                    },
                    {
                      label:
                        'ENE-2.G.2 Membrane proteins needed for active transport',
                      value: 'ENE-2.G.2',
                    },
                    {
                      label:
                        'ENE-2.G.3 Metabolic energy needed for active transport and to establish and maintain concentration gradients',
                      value: 'ENE-2.G.3',
                    },
                    {
                      label:
                        'ENE-2.G.4 Na+/K+ ATPase --> maintains membrane potential',
                      value: 'ENE-2.G.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.8 Tonicity and Osmoregulation',
              value: 'tonicityAndOsmoregulation',
              learningObjectives: [
                {
                  label:
                    'ENE-2.H Explain how concentration gradients affect the movement of molecules across membranes.',
                  value: 'ENE-2.H',
                  essentialKnowledge: [
                    {
                      label: 'ENE-2.H.1 Hypotonic/hypertonic/isotonic; osmosis',
                      value: 'ENE-2.H.1',
                    },
                  ],
                },
                {
                  label:
                    'ENE-2.I Explain how osmoregulatory mechanisms contribute to the health and survival of organisms.',
                  value: 'ENE-2.I',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-2.I.1 Moving stuff across membranes necc. for growth and homeostasis',
                      value: 'ENE-2.I.1',
                    },
                    {
                      label:
                        'ENE-2.I.2 Osmoregulation maintains water balance (solute potential = –iCRT)',
                      value: 'ENE-2.I.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.9 Mechanisms of Transport',
              value: 'mechanismsOfTransport',
              learningObjectives: [
                {
                  label:
                    'ENE-2.J Describe the processes that allow ions and other molecules to move across membranes.',
                  value: 'ENE-2.J',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-2.J.1 Stuff moves across membranes in lots of ways (active/passive, endocytosis, exocytosis)',
                      value: 'ENE-2.J.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.10 Compartmentalization',
              value: 'compartmentalization',
              learningObjectives: [
                {
                  label:
                    'ENE-2.K Describe the membrane-bound structures of the eukaryotic cell.',
                  value: 'ENE-2.K',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-2.K.1 Membranes and membrane-bound organelles compartmentalize reactions and processes',
                      value: 'ENE-2.K.1',
                    },
                  ],
                },
                {
                  label:
                    'ENE-2.L Explain how internal membranes and membrane-bound organelles contribute to compartmentalization of eukaryotic cell functions.',
                  value: 'ENE-2.L',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-2.L.1 Internal membranes minimize competing interactions by increasing SA for reactions to occur',
                      value: 'ENE-2.L.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.11 Origins of Cell Compartmentalization',
              value: 'originsOfCellCompartmentalization',
              learningObjectives: [
                {
                  label:
                    'EVO-1.A Describe similarities and/or differences in compartmentalization between prokaryotic and eukaryotic cells.',
                  value: 'EVO-1.A',
                  essentialKnowledge: [
                    { label: 'EVO-1.A.1 Endosymbiosis', value: 'EVO-1.A.1' },
                    {
                      label:
                        'EVO-1.A.2 Prokaryotes generally lack internal membranes, but have specialized regions',
                      value: 'EVO-1.A.2',
                    },
                    {
                      label:
                        'EVO-1.A.3 Eukaryotes have internal membranes that partition the cell',
                      value: 'EVO-1.A.3',
                    },
                  ],
                },
                {
                  label:
                    'EVO-1.B Describe the relationship between the functions of endosymbiotic organelles and their free-living counterparts.',
                  value: 'EVO-1.B',
                  essentialKnowledge: [
                    { label: 'EVO-1.B.1. Endosymbiosis', value: 'EVO-1.B.1.' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 3: Cellular Energetics',
          value: 'cellularEnergetics',
          topics: [
            {
              label: 'Topic 3.1 Enzyme Structure',
              value: 'enzymeStructure',
              learningObjectives: [
                {
                  label: 'ENE-1.D Describe the properties of enzymes.',
                  value: 'ENE-1.D',
                  essentialKnowledge: [
                    { label: 'ENE-1.D.1 Active site', value: 'ENE-1.D.1' },
                    {
                      label:
                        'ENE-1.D.2 Enzyme-mediated rxns, substrate must be compatible with active site',
                      value: 'ENE-1.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.2 Enzyme Catalysis',
              value: 'enzymeCatalysis',
              learningObjectives: [
                {
                  label:
                    'ENE-1.E Explain how enzymes affect the rate of biological reactions.',
                  value: 'ENE-1.E',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.E.1 Enzymes are catalysts, lower activation energy',
                      value: 'ENE-1.E.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.3 Environmental Impacts on Enzyme Function',
              value: 'environmentalImpactsOnEnzymeFunction',
              learningObjectives: [
                {
                  label:
                    'ENE-1.F Explain how changes to the structure of an enzyme may affect its function.',
                  value: 'ENE-1.F',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.F.1 Denaturation by pH/temp can affect the efficiency of the enzyme',
                      value: 'ENE-1.F.1',
                    },
                    {
                      label: 'ENE-1.F.2 Denaturation is sometimes reversible',
                      value: 'ENE-1.F.2',
                    },
                  ],
                },
                {
                  label:
                    'ENE-1.G Explain how the cellular environment affects enzyme activity.',
                  value: 'ENE-1.G',
                  essentialKnowledge: [
                    {
                      label: 'ENE-1.G.1 pH can affect structure (h-bonds)',
                      value: 'ENE-1.G.1',
                    },
                    {
                      label:
                        'ENE-1.G.2 Relative [ ]s of substrate and enzyme affect efficiency',
                      value: 'ENE-1.G.2',
                    },
                    {
                      label:
                        'ENE-1.G.3 Inc. temp --> inc. speed of molecules & therefore rate of reaction',
                      value: 'ENE-1.G.3',
                    },
                    {
                      label:
                        'ENE-1.G.4 Competitive inhibitor molecules can bond reversible or irreversibly to active site/non-competitive inhibitors bind allosteric sites',
                      value: 'ENE-1.G.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.4 Cellular Energy',
              value: 'cellularEnergy',
              learningObjectives: [
                {
                  label:
                    'ENE-1.H Describe the role of energy in living organisms.',
                  value: 'ENE-1.H',
                  essentialKnowledge: [
                    {
                      label: 'ENE-1.H.1 Living things need constant energy',
                      value: 'ENE-1.H.1',
                    },
                    {
                      label:
                        'ENE-1.H.2 Life requires ordered systems and do not violate Second Law of T. (energy in > energy out; cell processes that release energy may be coupled with processes that need it; loss of order/energy = death)',
                      value: 'ENE-1.H.2',
                    },
                    {
                      label:
                        'ENE-1.H.3 Order of steps in energy pathways inc. efficiency. Products --> reactants in next step.',
                      value: 'ENE-1.H.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.5 Photosynthesis',
              value: 'photosynthesis',
              learningObjectives: [
                {
                  label:
                    'ENE-1.I Describe the photosynthetic processes that allow organisms to capture and store energy.',
                  value: 'ENE-1.I',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.I.1 Organisms capture and store energy (eukaryotic and prokaryotic photosynthesis); prokaryotic photosynthesis gave atm. O2',
                      value: 'ENE-1.I.1',
                    },
                    {
                      label: 'ENE-1.I.2 Light-dependent rxns',
                      value: 'ENE-1.I.2',
                    },
                  ],
                },
                {
                  label:
                    'ENE-1.J Explain how cells capture energy from light and transfer it to biological molecules for storage and use.',
                  value: 'ENE-1.J',
                  essentialKnowledge: [
                    {
                      label: 'ENE-1.J.1 Chlorophylls; photosystems I & II',
                      value: 'ENE-1.J.1',
                    },
                    {
                      label:
                        'ENE-1.J.2 Photosystems I & II are in internal chloroplast membranes, connected to ETC',
                      value: 'ENE-1.J.2',
                    },
                    {
                      label: 'ENE-1.J.3 ETC --> electrochemical gradient',
                      value: 'ENE-1.J.3',
                    },
                    {
                      label:
                        'ENE-1.J.4 Electrochem. gradient --> ATP synthase ',
                      value: 'ENE-1.J.4',
                    },
                    {
                      label:
                        'ENE-1.J.5 Energy captured in light-dependent rxns --> ATP and NADPH, which power Calvin cycle (in stroma)',
                      value: 'ENE-1.J.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.6 Cellular Respiration',
              value: 'cellularRespiration',
              learningObjectives: [
                {
                  label:
                    'ENE-1.K Describe the processes that allow organisms to use energy stored in biological macromolecules.',
                  value: 'ENE-1.K',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.K.1 Fermentation & cellular resp definition',
                      value: 'ENE-1.K.1',
                    },
                    {
                      label:
                        'ENE-1.K.2 Cellular resp. in eukaryotes involves enzyme-catalyzed rxns',
                      value: 'ENE-1.K.2',
                    },
                    {
                      label:
                        'ENE-1.K.3 ETC (chloroplasts, mitochondria, prok. membranes); in cellular resp, NADH + FADH2 --> O2 as final acceptor (except in anaerobic prokaryotes); in photosynthesis, terminal acceptor is NADP+; proton gradient; H+ forced thru ATP synthase via chemiosmosis (oxidative phosphorylation); in cellular resp, decoupling oxidative phos from ETC --> heat (endothermy!)',
                      value: 'ENE-1.K.3',
                    },
                  ],
                },
                {
                  label:
                    'ENE-1.L Explain how cells obtain energy from biological macromolecules in order to power cellular functions.',
                  value: 'ENE-1.L',
                  essentialKnowledge: [
                    { label: 'ENE-1.L.1 Glycolysis', value: 'ENE-1.L.1' },
                    {
                      label:
                        'ENE-1.L.2 Pyruvate transported from cytosol to mitochondria',
                      value: 'ENE-1.L.2',
                    },
                    {
                      label:
                        'ENE-1.L.3 Krebs (CO2 + ATP + NADH + FADH2 as products)',
                      value: 'ENE-1.L.3',
                    },
                    {
                      label: 'ENE-1.L.4 ETC (NADH + FADH2 donate electrons)',
                      value: 'ENE-1.L.4',
                    },
                    {
                      label: 'ENE-1.L.5 ETC (electrochemical gradient)',
                      value: 'ENE-1.L.5',
                    },
                    {
                      label:
                        'ENE-1.L.6 Fermentation allows glycolysis to happen w/p oxygen; produces lactic acid or alcohol',
                      value: 'ENE-1.L.6',
                    },
                    {
                      label: 'ENE-1.L.7 ATP --> ADP releases energy',
                      value: 'ENE-1.L.7',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.7 Fitness',
              value: 'fitness',
              learningObjectives: [
                {
                  label:
                    'SYI-3.A Explain the connection between variation in the number and types of molecules within cells to the ability of the organism to survive and/or reproduce in different environments.',
                  value: 'SYI-3.A',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-3.A.1 Variation @ molecular level --> ability to respond to stimuli',
                      value: 'SYI-3.A.1',
                    },
                    {
                      label:
                        'SYI-3.A.2 Variation --> greater ability to survive and reproduce in different environments',
                      value: 'SYI-3.A.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 4: Cell Communication and Cell Cycle',
          value: 'cellCommunicationAndCellCycle',
          topics: [
            {
              label: 'Topic 4.1 Cell Communication',
              value: 'cellCommunication',
              learningObjectives: [
                {
                  label:
                    'IST-3.A Describe the ways that cells can communicate with one another.',
                  value: 'IST-3.A',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-3.A.1 Cells communicate with cell-to-cell or w/ chemical messengers',
                      value: 'IST-3.A.1',
                    },
                  ],
                },
                {
                  label:
                    'IST-3.B Explain how cells communicate with one another over short and long distances.',
                  value: 'IST-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-3.B.1 Short-distances, cells communicate with regulators that target cells nearby; some signals travel far',
                      value: 'IST-3.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.2 Introduction to Signal Transduction',
              value: 'introductionToSignalTransduction',
              learningObjectives: [
                {
                  label:
                    'IST-3.C Describe the components of a signal transduction pathway.',
                  value: 'IST-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-3.C.1 Link signal reception with cellular responses',
                      value: 'IST-3.C.1',
                    },
                    {
                      label:
                        'IST-3.C.2 Many include protein modification and phosphorylation cascades',
                      value: 'IST-3.C.2',
                    },
                  ],
                },
                {
                  label:
                    'IST-3.D Describe the role of components of a signal transduction pathway in producing a cellular response.',
                  value: 'IST-3.D',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-3.D.1 Ligand (messenger; peptide, small chemical, protein) recognized by receptor protein. Ex. G protein-coupled receptors (eukaryotes)',
                      value: 'IST-3.D.1',
                    },
                    {
                      label:
                        'IST-3.D.2 Signaling cascades --> amplification of signal',
                      value: 'IST-3.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.3 Signal Transduction',
              value: 'signalTransduction',
              learningObjectives: [
                {
                  label:
                    'IST-3.E Describe the role of the environment in eliciting a cellular response.',
                  value: 'IST-3.E',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-3.E.1 Influences how cell responds to its environment',
                      value: 'IST-3.E.1',
                    },
                  ],
                },
                {
                  label:
                    'IST-3.F Describe the different types of cellular responses elicited by a signal transduction pathway.',
                  value: 'IST-3.F',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-3.F.1 Can --> changes in gene expression/cell function, apoptosis',
                      value: 'IST-3.F.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.4 Changes in Signal Transduction Pathways',
              value: 'changesInSignalTransductionPathways',
              learningObjectives: [
                {
                  label:
                    'IST-3.G Explain how a change in the structure of any signaling molecule affects the activity of the signaling pathway.',
                  value: 'IST-3.G',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-3.G.1 Changes to pathway (e.g., from mutation) --> changes in cellular response ',
                      value: 'IST-3.G.1',
                    },
                    {
                      label:
                        'IST-3.G.2 Chemicals can interfere with signaling --> activation or inhibition',
                      value: 'IST-3.G.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.5 Feedback',
              value: 'feedback',
              learningObjectives: [
                {
                  label:
                    'ENE-3.A Describe positive and/or negative feedback mechanisms.',
                  value: 'ENE-3.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-3.A.1 Feedback --> maintain internal environments and respond to changes',
                      value: 'ENE-3.A.1',
                    },
                  ],
                },
                {
                  label:
                    'ENE-3.B Explain how negative feedback helps to maintain homeostasis.',
                  value: 'ENE-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-3.B.1 If system is disturbed, negative feedback turns system back to set point. Operates at molecular and cellular levels.',
                      value: 'ENE-3.B.1',
                    },
                  ],
                },
                {
                  label:
                    'ENE-3.C Explain how positive feedback affects homeostasis.',
                  value: 'ENE-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-3.C.1 Amplify responses; variable initiating response is moved further from initial point. Amplification happens when stimulus is further activated, which then initiates additional response',
                      value: 'ENE-3.C.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.6 Cell Cycle',
              value: 'cellCycle',
              learningObjectives: [
                {
                  label:
                    'IST-1.B Describe the events that occur in the cell cycle.',
                  value: 'IST-1.B',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.B.1 Eukaryotes divide and transmit genetic info in two regulated processes',
                      value: 'IST-1.B.1',
                    },
                    {
                      label:
                        'IST-1.B.2 Interphase (G1, S, G2), mitosis, cytokinesis; G0 = no growth',
                      value: 'IST-1.B.2',
                    },
                  ],
                },
                {
                  label:
                    'IST-1.C Explain how mitosis results in the transmission of chromosomes from one generation to the next.',
                  value: 'IST-1.C',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.C.1 Mitosis --> 2 identical daughter cells (PMAT); tissue repair, growth, asexual reproduction',
                      value: 'IST-1.C.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.7 Regulation of Cell Cycle',
              value: 'regulationOfCellCycle',
              learningObjectives: [
                {
                  label:
                    'IST-1.D Describe the role of checkpoints in regulating the cell cycle.',
                  value: 'IST-1.D',
                  essentialKnowledge: [
                    {
                      label: 'IST-1.D.1 Internal checkpoints regulate cycle',
                      value: 'IST-1.D.1',
                    },
                    {
                      label: 'IST-1.D.2 Cyclins/cyclin-dependent kinases',
                      value: 'IST-1.D.2',
                    },
                  ],
                },
                {
                  label:
                    'IST-1.E Describe the effects of disruptions to the cell cycle on the cell or organism.',
                  value: 'IST-1.E',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.E.1 Disruptions to cell cycle --> apoptosis or cancer',
                      value: 'IST-1.E.1',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 5: Heredity',
          value: 'heredity',
          topics: [
            {
              label: 'Topic 5.1 Meiosis',
              value: 'meiosis',
              learningObjectives: [
                {
                  label:
                    'IST-1.F Explain how meiosis results in the transmission of chromosomes from one generation to the next.',
                  value: 'IST-1.F',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.F.1 Meiosis --> haploid gametes; Meiosis I/Meiosis II',
                      value: 'IST-1.F.1',
                    },
                  ],
                },
                {
                  label:
                    'IST-1.G Describe similarities and/or differences between the phases and outcomes of mitosis and meiosis.',
                  value: 'IST-1.G',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.G.1 Mitosis/meiosis are similar (chromosome segregation) but different (number and chromosome copies in daughter cells)',
                      value: 'IST-1.G.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.2 Meiosis and Genetic Diversity',
              value: 'meiosisAndGeneticDiversity',
              learningObjectives: [
                {
                  label:
                    'IST-1.H Explain how the process of meiosis generates genetic diversity.',
                  value: 'IST-1.H',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.H.1 Homologous chromosomes separate in meiosis I',
                      value: 'IST-1.H.1',
                    },
                    {
                      label:
                        'IST-1.H.2 Homologous chromatids cross-over in meiosis I',
                      value: 'IST-1.H.2',
                    },
                    {
                      label:
                        'IST-1.H.3 Sexual reproduction --> diversity (crossing-over, random assortment, fertilization)',
                      value: 'IST-1.H.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.3 Mendelian Genetics',
              value: 'mendelianGenetics',
              learningObjectives: [
                {
                  label:
                    'EVO-2.A Explain how shared, conserved, fundamental processes and features support the concept of common ancestry for all organisms.',
                  value: 'EVO-2.A',
                  essentialKnowledge: [
                    {
                      label: 'EVO-2.A.1 DNA and RNA carry info',
                      value: 'EVO-2.A.1',
                    },
                    {
                      label: 'EVO-2.A.2 Ribosomes are in all life',
                      value: 'EVO-2.A.2',
                    },
                    {
                      label: 'EVO-2.A.3 Genetic code shared by all organisms',
                      value: 'EVO-2.A.3',
                    },
                    {
                      label:
                        'EVO-2.A.4 Core metabolic pathways across all domains',
                      value: 'EVO-2.A.4',
                    },
                  ],
                },
                {
                  label:
                    "IST-1.I Explain the inheritance of genes and traits as described by Mendel's laws.",
                  value: 'IST-1.I',
                  essentialKnowledge: [
                    {
                      label:
                        "IST-1.I.1 Mendel's laws (genes on different chromosomes)",
                      value: 'IST-1.I.1',
                    },
                    {
                      label:
                        'IST-1.I.2 Fertilization --> diploid zygote (Punnett Sqs; monohybrid, dihybrid, sex-linked, linked)',
                      value: 'IST-1.I.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.4 Non-Mendelian Genetics',
              value: 'nonMendelianGenetics',
              learningObjectives: [
                {
                  label:
                    "IST-1.J Explain deviations from Mendel's model of the inheritance of traits.",
                  value: 'IST-1.J',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.J.1 Traits resulting from genetically-linked genes',
                      value: 'IST-1.J.1',
                    },
                    {
                      label: 'IST-1.J.2 Sex-linked traits (pedigrees)',
                      value: 'IST-1.J.2',
                    },
                    {
                      label: 'IST-1.J.3 Traits the result from multiple genes',
                      value: 'IST-1.J.3',
                    },
                    {
                      label:
                        'IST-1.J.4 Traits resulting from non-nuclear inheritance (chloroplasts, mitochondria)',
                      value: 'IST-1.J.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.5 Environmental Effects on Phenotype',
              value: 'environmentalEffectsOnPhenotype',
              learningObjectives: [
                {
                  label:
                    'SYI-3.B Explain how the same genotype can result in multiple phenotypes under different environmental conditions.',
                  value: 'SYI-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-3.B.1 Environmental factors; phenotypic plasticity',
                      value: 'SYI-3.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.6 Chromosomal Inheritance',
              value: 'chromosomalInheritance',
              learningObjectives: [
                {
                  label:
                    'SYI-3.C Explain how chromosomal inheritance generates genetic variation in sexual reproduction.',
                  value: 'SYI-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-3.C.1 Segregation, independent assortment, fertilization --> genetic variation in populations',
                      value: 'SYI-3.C.1',
                    },
                    {
                      label:
                        'SYI-3.C.2 Chromosomal basis of inheritance means we can understand how traits go from parent to offspring',
                      value: 'SYI-3.C.2',
                    },
                    {
                      label:
                        'SYI-3.C.3 Certain genetic disorders can be attributed to the inheritance of a single allele or chromosomal change (i.e., nondisjunction)',
                      value: 'SYI-3.C.3',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 6: Gene Expression and Regulation',
          value: 'geneExpressionAndRegulation',
          topics: [
            {
              label: 'Topic 6.1 DNA and RNA Structure',
              value: 'dnaAndRnaStructure',
              learningObjectives: [
                {
                  label:
                    'IST-1.K Describe the structures involved in passing hereditary information from one generation to the next.',
                  value: 'IST-1.K',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.K.1 DNA, sometimes RNA = primary source of heritable info',
                      value: 'IST-1.K.1',
                    },
                    {
                      label:
                        'IST-1.K.2 Genetic info is transmitted from one generation to the next via DNA and RNA; eukaryotic have linear chromosomes, prokaryotic typically has one circular one',
                      value: 'IST-1.K.2',
                    },
                    {
                      label:
                        'IST-1.K.3 Prokaryotes and eukaryotes can have plasmids',
                      value: 'IST-1.K.3',
                    },
                  ],
                },
                {
                  label:
                    'IST-1.L Describe the characteristics of DNA that allow it to be used as the hereditary material.',
                  value: 'IST-1.L',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.L.1 DNA (sometimes RNA) has conserved base-pairing G-C; A-T/U',
                      value: 'IST-1.L.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.2 Replication',
              value: 'replication',
              learningObjectives: [
                {
                  label:
                    'IST-1.M Describe the mechanisms by which genetic information is copied for transmission between generations.',
                  value: 'IST-1.M',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.M.1 DNA replication ensures continuity of hereditary expression',
                      value: 'IST-1.M.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.3 Transcription and RNA Processessing',
              value: 'transcriptionAndRnaProcessessing',
              learningObjectives: [
                {
                  label:
                    'IST-1.N Describe the mechanisms by which genetic information flows from DNA to RNA to protein.',
                  value: 'IST-1.N',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.N.1 Sequence of RNA bases determines RNA function (mRNA, tRNA, rRNA)',
                      value: 'IST-1.N.1',
                    },
                    {
                      label:
                        'IST-1.N.2. Genetic info flows from DNA to mRNA to amino acids',
                      value: 'IST-1.N.2.',
                    },
                    {
                      label:
                        'IST-1.N.3 RNA polymerase uses single template strand of DNA to make RNA (Transcription)',
                      value: 'IST-1.N.3',
                    },
                    {
                      label:
                        'IST-1.N.4 DNA template strand = noncoding strand, minus strand, or antisense strand. Which strand is template depends on the gene',
                      value: 'IST-1.N.4',
                    },
                    {
                      label:
                        "IST-1.N.5 RNA polymerase synthesizes mRNA 5' to 3' but reading DNA 3' to 5'",
                      value: 'IST-1.N.5',
                    },
                    {
                      label:
                        'IST-1.N.6 mRNA is processed (poly-A tail, GTP cap, excision of introns, splicing of exons [which can be variable])',
                      value: 'IST-1.N.6',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.4 Translation',
              value: 'translation',
              learningObjectives: [
                {
                  label:
                    'IST-1.O Explain how the phenotype of an organism is determined by its genotype.',
                  value: 'IST-1.O',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.O.1 Translation of mRNA -> polypeptide occurs in eukaryotes and prokaryotes in the cytoplasm and also rough ER in eukaryotes',
                      value: 'IST-1.O.1',
                    },
                    {
                      label:
                        'IST-1.O.2 In prokaryotes: mRNA translation occurs while mRNA is being transcribed',
                      value: 'IST-1.O.2',
                    },
                    {
                      label:
                        'IST-1.O.3 Translation involves energy and lots of steps',
                      value: 'IST-1.O.3',
                    },
                    {
                      label: 'IST-1.O.4 Steps of translation ',
                      value: 'IST-1.O.4',
                    },
                    {
                      label:
                        'IST-1.O.5 Retroviruses = special case of translation, from RNA to DNA via reverse transcriptase',
                      value: 'IST-1.O.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.5 Regulation of Gene Expression',
              value: 'regulationOfGeneExpression',
              learningObjectives: [
                {
                  label:
                    'IST-2.A Describe the types of interactions that regulate gene expression.',
                  value: 'IST-2.A',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-2.A.1 Regulatory sequences in DNA control transcription',
                      value: 'IST-2.A.1',
                    },
                    {
                      label:
                        'IST-2.A.2 Epigenetic changes can affect gene expression',
                      value: 'IST-2.A.2',
                    },
                    {
                      label:
                        'IST-2.A.3 Phenotype is determined by combo of genes expressed and levels that they are expressed',
                      value: 'IST-2.A.3',
                    },
                  ],
                },
                {
                  label:
                    'IST-2.B Explain how the location of regulatory sequences relates to their function.',
                  value: 'IST-2.B',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-2.B.1 Prokaryotes & Eukaryotes have genes with coordinated expression (e.g., operons, transcription factors)',
                      value: 'IST-2.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.6 Gene Expression and Cell Specialization',
              value: 'geneExpressionAndCellSpecialization',
              learningObjectives: [
                {
                  label:
                    'IST-2.C Explain how the binding of transcription factors to promoter regions affects gene expression and/or the phenotype of an organism.',
                  value: 'IST-2.C',
                  essentialKnowledge: [
                    {
                      label: 'IST-2.C.1 Promoters definition',
                      value: 'IST-2.C.1',
                    },
                    {
                      label:
                        'IST-2.C.2 Negative regulatory molecules inhibit expression',
                      value: 'IST-2.C.2',
                    },
                  ],
                },
                {
                  label:
                    'IST-2.D Explain the connection between the regulation of gene expression and phenotypic differences in cells and organisms.',
                  value: 'IST-2.D',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-2.D.1 Gene regulation results in differential gene expression and influences function',
                      value: 'IST-2.D.1',
                    },
                    {
                      label:
                        'IST-2.D.2 Certain small RNA molecules = regulators',
                      value: 'IST-2.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.7 Mutations',
              value: 'mutations',
              learningObjectives: [
                {
                  label: 'IST-2.E Describe the various types of mutation.',
                  value: 'IST-2.E',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-2.E.1 Change to genotype can --> change in phenotype (function of gene changes)',
                      value: 'IST-2.E.1',
                    },
                    {
                      label:
                        'IST-2.E.2 Mutations can change the type or amount of protein produced and therefore phenotype; Mutations can be +/- or neutral based on their effect',
                      value: 'IST-2.E.2',
                    },
                  ],
                },
                {
                  label:
                    'IST-4.A Explain how changes in genotype may result in changes in phenotype.',
                  value: 'IST-4.A',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-4.A.1 Mutations are primary source of genetic variation. Caused by: errors in replication of DNA repair, external factors; Whether mutation is +/- or neutral depends on environment.',
                      value: 'IST-4.A.1',
                    },
                    {
                      label:
                        'IST-4.A.2 Errors in meiosis or mitosis can change phenotype (chromosome # issues)',
                      value: 'IST-4.A.2',
                    },
                  ],
                },
                {
                  label:
                    'IST-4.B Explain how alterations in DNA sequences contribute to variation that can be subject to natural selection.',
                  value: 'IST-4.B',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-4.B.1 Changes in genotype may affect phenotypes subject to natural selection (Examples of environments where changes are selected for: horizontal gene transfer, viral recombination, reproduction processes that increase genetic variation are conserved)',
                      value: 'IST-4.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.8 Biotechnology',
              value: 'biotechnology',
              learningObjectives: [
                {
                  label:
                    'IST-1.P Explain the use of genetic engineering techniques in analyzing or manipulating DNA.',
                  value: 'IST-1.P',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-1.P.1 Genetic engineering techniques (electrophoresis, PCR, bacterial transformation); DNA sequencing determines the order of nucleotides in a DNA molecule',
                      value: 'IST-1.P.1',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 7: Natural Selection',
          value: 'naturalSelection',
          topics: [
            {
              label: 'Topic 7.1 Introduction to Natural Selection',
              value: 'introductionToNaturalSelection',
              learningObjectives: [
                {
                  label: 'EVO-1.C Describe the causes of natural selection.',
                  value: 'EVO-1.C',
                  essentialKnowledge: [
                    {
                      label: 'EVO-1.C.1. Nat sel = major mechanism of evo',
                      value: 'EVO-1.C.1.',
                    },
                    {
                      label: 'EVO-1.C.2 Process of nat sel according to Darwin',
                      value: 'EVO-1.C.2',
                    },
                  ],
                },
                {
                  label:
                    'EVO-1.D Explain how natural selection affects populations.',
                  value: 'EVO-1.D',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.D.1 Evo fitness = measure of reproductive success',
                      value: 'EVO-1.D.1',
                    },
                    {
                      label:
                        'EVO-1.D.2 Stability of biotic/abiotic factors affect rate and direction of evolution from generation to generation',
                      value: 'EVO-1.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.2 Natural Selection',
              value: 'naturalSelection',
              learningObjectives: [
                {
                  label:
                    'EVO-1.E Describe the importance of phenotypic variation in a population.',
                  value: 'EVO-1.E',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.E.1 Nat sel acts on phenotypic variation in populations',
                      value: 'EVO-1.E.1',
                    },
                    {
                      label: 'EVO-1.E.2 Env. change exerts selection pressures',
                      value: 'EVO-1.E.2',
                    },
                    {
                      label:
                        'EVO-1.E.3 Some phenotypic variations significantly +/- fitness',
                      value: 'EVO-1.E.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.3 Artificial Selection',
              value: 'artificialSelection',
              learningObjectives: [
                {
                  label:
                    'EVO-1.F Explain how humans can affect diversity within a population.',
                  value: 'EVO-1.F',
                  essentialKnowledge: [
                    {
                      label: 'EVO-1.F.1 Artificial selection',
                      value: 'EVO-1.F.1',
                    },
                  ],
                },
                {
                  label:
                    'EVO-1.G Explain the relationship between changes in the environment and evolutionary changes in the population.',
                  value: 'EVO-1.G',
                  essentialKnowledge: [
                    {
                      label: 'EVO-1.G.1 Convergent evolution',
                      value: 'EVO-1.G.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.4 Population Genetics',
              value: 'populationGenetics',
              learningObjectives: [
                {
                  label:
                    'EVO-1.H Explain how random occurrences affect the genetic makeup of a population.',
                  value: 'EVO-1.H',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.H.1 Evolution is also driven by random occurrences (mutation, genetic drift, gene flow)',
                      value: 'EVO-1.H.1',
                    },
                  ],
                },
                {
                  label:
                    'EVO-1.I Describe the role of random processes in the evolution of specific populations.',
                  value: 'EVO-1.I',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.I.1 Reduction of genetic variation w/in sub population can inc. differences between populations (bottlenecks)',
                      value: 'EVO-1.I.1',
                    },
                  ],
                },
                {
                  label:
                    'EVO-1.J Describe the change in the genetic makeup of a population over time.',
                  value: 'EVO-1.J',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.J.1 Mutation = genetic variation, which is acted on by NS',
                      value: 'EVO-1.J.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.5 Hardy-Weinberg Equilibrium',
              value: 'hardyWeinbergEquilibrium',
              learningObjectives: [
                {
                  label:
                    'EVO-1.K Describe the conditions under which allele and genotype frequencies will change in populations.',
                  value: 'EVO-1.K',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.K.1 H-W rules (large pop., no migration, no net mutation, random mating, no selection)',
                      value: 'EVO-1.K.1',
                    },
                    {
                      label:
                        'EVO-1.K.2 H-W equations (allele frequencies can be calculated from genotype frequencies)',
                      value: 'EVO-1.K.2',
                    },
                  ],
                },
                {
                  label:
                    'EVO-1.L Explain the impacts on the population if any of the conditions of Hardy-Weinberg are not met.',
                  value: 'EVO-1.L',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.L.1 Changes in allele frequencies = evolution',
                      value: 'EVO-1.L.1',
                    },
                    {
                      label:
                        'EVO-1.L.2 Small populations more susceptible to random impacts than large ones.',
                      value: 'EVO-1.L.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.6 Evidence of Evolution',
              value: 'evidenceOfEvolution',
              learningObjectives: [
                {
                  label:
                    'EVO-1.M Describe the types of data that provide evidence for evolution.',
                  value: 'EVO-1.M',
                  essentialKnowledge: [
                    {
                      label: 'EVO-1.M.1 Many fields support evolution',
                      value: 'EVO-1.M.1',
                    },
                  ],
                },
                {
                  label:
                    'EVO-1.N Explain how morphological, biochemical, and geological data provide evidence that organisms have changed over time.',
                  value: 'EVO-1.N',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-1.N.1 Fossils (that can be dated) & morphological homologies = evidence',
                      value: 'EVO-1.N.1',
                    },
                    {
                      label:
                        'EVO-1.N.2 Comparing DNA/protein amino acid sequences = evidence for common ancestry',
                      value: 'EVO-1.N.2',
                    },
                  ],
                },
                {
                  label:
                    'EVO-2.B Describe the fundamental molecular and cellular features shared across all domains of life, which provide evidence of common ancestry.',
                  value: 'EVO-2.B',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-2.B.1 Many molecular/cellular features are conserved',
                      value: 'EVO-2.B.1',
                    },
                    {
                      label:
                        'EVO-2.B.2 Structure/function evidence supports relatedness across domains',
                      value: 'EVO-2.B.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.7 Common Ancestry',
              value: 'commonAncestry',
              learningObjectives: [
                {
                  label:
                    'EVO-2.C Describe structural and functional evidence on cellular and molecular levels that provides evidence for the common ancestry of all eukaryotes.',
                  value: 'EVO-2.C',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-2.C.1 Membrane-bound organelles, linear chromosomes, genes with introns = evidence of common euk. ancestry',
                      value: 'EVO-2.C.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.8 Continuing Evolution',
              value: 'continuingEvolution',
              learningObjectives: [
                {
                  label:
                    'EVO-3.A Explain how evolution is an ongoing process in all living organisms.',
                  value: 'EVO-3.A',
                  essentialKnowledge: [
                    {
                      label: 'EVO-3.A.1 Populations continue to evolve',
                      value: 'EVO-3.A.1',
                    },
                    {
                      label:
                        'EVO-3.A.2 All species evolved and continue to evolve (genome changes, fossil record, chemical resistance, pathogens/emergent diseases)',
                      value: 'EVO-3.A.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.9 Phylogeny',
              value: 'phylogeny',
              learningObjectives: [
                {
                  label:
                    'EVO-3.B Describe the types of evidence that can be used to infer an evolutionary relationship.',
                  value: 'EVO-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-3.B.1 Trees/cladograms show: relationships, lineages. Phyo trees show amt of change as calibrated by molecules or fossils; Traits gained/lost; shared, shared-derived, out-groups; molecular data typically more accurate and reliable evidence ',
                      value: 'EVO-3.B.1',
                    },
                  ],
                },
                {
                  label:
                    'EVO-3.C Explain how a phylogenetic tree and/or cladogram can be used to infer evolutionary relatedness.',
                  value: 'EVO-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-3.C.1 Trees/cladograms show speciation and MRCA',
                      value: 'EVO-3.C.1',
                    },
                    {
                      label:
                        'EVO-3.C.2 Trees/cladograms can be made from morph. traits or molecular; can be of extinct or extant',
                      value: 'EVO-3.C.2',
                    },
                    {
                      label:
                        'EVO-3.C.3 Trees/cladograms = hypotheses subject to revision.',
                      value: 'EVO-3.C.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.10 Speciation',
              value: 'speciation',
              learningObjectives: [
                {
                  label:
                    'EVO-3.D Describe the conditions under which new species may arise.',
                  value: 'EVO-3.D',
                  essentialKnowledge: [
                    { label: 'EVO-3.D.1 Repro. isolation', value: 'EVO-3.D.1' },
                    {
                      label:
                        'EVO-3.D.2 Biological species concept (sexually reproducing organisms)',
                      value: 'EVO-3.D.2',
                    },
                  ],
                },
                {
                  label:
                    'EVO-3.E Describe the rate of evolution and speciation under different ecological conditions.',
                  value: 'EVO-3.E',
                  essentialKnowledge: [
                    {
                      label: 'EVO-3.E.1 Punk Eq. and gradualism',
                      value: 'EVO-3.E.1',
                    },
                    {
                      label:
                        'EVO-3.E.2 Divergent evolution; Speciation common during adaptive radiations',
                      value: 'EVO-3.E.2',
                    },
                  ],
                },
                {
                  label:
                    'EVO-3.F Explain the processes and mechanisms that drive speciation.',
                  value: 'EVO-3.F',
                  essentialKnowledge: [
                    {
                      label: 'EVO-3.F.1 Speciation --> diversity',
                      value: 'EVO-3.F.1',
                    },
                    {
                      label:
                        'EVO-3.F.2 Speciation can be allopatric or sympatric',
                      value: 'EVO-3.F.2',
                    },
                    {
                      label:
                        'EVO-3.F.3 Prezygotic and postzygotic mechanisms can prevent gene flow',
                      value: 'EVO-3.F.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.11 Extinction',
              value: 'extinction',
              learningObjectives: [
                {
                  label:
                    'EVO-3.G Describe factors that lead to the extinction of a population.',
                  value: 'EVO-3.G',
                  essentialKnowledge: [
                    {
                      label: 'EVO-3.G.1 Extinctions have always occurred',
                      value: 'EVO-3.G.1',
                    },
                    {
                      label: 'EVO-3.G.2 +Extinctions during ecological stress',
                      value: 'EVO-3.G.2',
                    },
                  ],
                },
                {
                  label:
                    'EVO-3.H Explain how the risk of extinction is affected by changes in the environment.',
                  value: 'EVO-3.H',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-3.H.1 Humans can change ecosystems, which --> extinction',
                      value: 'EVO-3.H.1',
                    },
                  ],
                },
                {
                  label:
                    'EVO-3.I Explain species diversity in an ecosystem as a function of speciation and extinction rates.',
                  value: 'EVO-3.I',
                  essentialKnowledge: [
                    {
                      label:
                        'EVO-3.I.1 Rate of speciation - rate of extinction = diversity',
                      value: 'EVO-3.I.1',
                    },
                  ],
                },
                {
                  label:
                    'EVO-3.J Explain how extinction can make new environments available for adaptive radiation.',
                  value: 'EVO-3.J',
                  essentialKnowledge: [
                    {
                      label: 'EVO-3.J.1 Extinction --> new niches',
                      value: 'EVO-3.J.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.12 Variations in Populations',
              value: 'variationsInPopulations',
              learningObjectives: [
                {
                  label:
                    'SYI-3.D Explain how the genetic diversity of a species or population affects its ability to withstand environmental pressures.',
                  value: 'SYI-3.D',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-3.D.1 Amt of variation affects population dynamics (e.g., ability to respond to change, resilience); Adv. alleles in one environment may become DISadvantageous alleles in another environment',
                      value: 'SYI-3.D.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.13 Origins of Life on Earth',
              value: 'originsOfLifeOnEarth',
              learningObjectives: [
                {
                  label:
                    'SYI-3.E Describe the scientific evidence that provides support for models of the origin of life on Earth.',
                  value: 'SYI-3.E',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-3.E.1 Several hypotheses... Earth formed 4.6 bya, life about 3.9–3.5 bya; organic from inorganic precursors + O2; organic from meteorite',
                      value: 'SYI-3.E.1',
                    },
                    { label: 'SYI-3.E.2 RNA world', value: 'SYI-3.E.2' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 8: Ecology',
          value: 'ecology',
          topics: [
            {
              label: 'Topic 8.1 Responses to the Environment',
              value: 'responsesToTheEnvironment',
              learningObjectives: [
                {
                  label:
                    'ENE-3.D Explain how the behavioral and/or physiological response of an organism is related to changes in internal or external environment.',
                  value: 'ENE-3.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-3.D.1 Organisms respond via behavior and physiology',
                      value: 'ENE-3.D.1',
                    },
                    {
                      label:
                        'ENE-3.D.2 Organisms exchange info in response to external cues, which can change behavior',
                      value: 'ENE-3.D.2',
                    },
                  ],
                },
                {
                  label:
                    'IST-5.A Explain how the behavioral responses of organisms affect their overall fitness and may contribute to the success of the population.',
                  value: 'IST-5.A',
                  essentialKnowledge: [
                    {
                      label:
                        'IST-5.A.1 Individuals act on info and communicate it to others',
                      value: 'IST-5.A.1',
                    },
                    {
                      label: 'IST-5.A.2 Communication methods (signaling)',
                      value: 'IST-5.A.2',
                    },
                    {
                      label:
                        'IST-5.A.3 Responses are vital to nat. sel & evolution (innate and learned behavior, cooperative behaviors)',
                      value: 'IST-5.A.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.2 Energy Flow Through Ecosystems',
              value: 'energyFlowThroughEcosystems',
              learningObjectives: [
                {
                  label:
                    'ENE-1.M Describe the strategies organisms use to acquire and use energy.',
                  value: 'ENE-1.M',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.M.1 Energy --> maintain organization, grow, reproduce (endotherm vs. ectotherm, reproductive strategies, relationship between size and metabolic rate, net + energy means growth or energy storage, net loss means loss of mass/death)',
                      value: 'ENE-1.M.1',
                    },
                  ],
                },
                {
                  label:
                    'ENE-1.N Explain how changes in energy availability affect populations and ecosystems.',
                  value: 'ENE-1.N',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.N.1 Changes in energy available affects population size',
                      value: 'ENE-1.N.1',
                    },
                    {
                      label:
                        'ENE-1.N.2 Disruptions in energy result in ecosystem disruptions (change in sunlight --> food pyramid)',
                      value: 'ENE-1.N.2',
                    },
                  ],
                },
                {
                  label:
                    'ENE-1.O Explain how the activities of autotrophs and heterotrophs enable the flow or energy within an ecosystem.',
                  value: 'ENE-1.O',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-1.O.1 Autotrophs (photosynthetic, chemosynthetic)',
                      value: 'ENE-1.O.1',
                    },
                    { label: 'ENE-1.O.2 Heterotrophs', value: 'ENE-1.O.2' },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.3 Population Ecology',
              value: 'populationEcology',
              learningObjectives: [
                {
                  label:
                    'SYI-1.G Describe factors that influence growth dynamics of populations.',
                  value: 'SYI-1.G',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-1.G.1 Individuals and populations interact with each other and environment in complex ways',
                      value: 'SYI-1.G.1',
                    },
                    {
                      label:
                        'SYI-1.G.2 Lots of adaptations related to energy/matter in a particular environment (population equations [dN/dt = B-D]) Expon growth (dN/dt= rmax N) occurs when unconstrained',
                      value: 'SYI-1.G.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.4 Effect of Density of Populations',
              value: 'effectOfDensityOfPopulations',
              learningObjectives: [
                {
                  label:
                    'SYI-1.H Explain how the density of a population affects and is determined by resource availability in the environment.',
                  value: 'SYI-1.H',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-1.H.1 Pop density can exceed resource availability',
                      value: 'SYI-1.H.1',
                    },
                    {
                      label:
                        'SYI-1.H.2 Limits from density-dependent and density-independent --> Logistic growth',
                      value: 'SYI-1.H.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.5 Community Ecology',
              value: 'communityEcology',
              learningObjectives: [
                {
                  label:
                    'ENE-4.A Describe the structure of a community according to its species composition and diversity.',
                  value: 'ENE-4.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-4.A.1 Community structure = species composition and species diversity',
                      value: 'ENE-4.A.1',
                    },
                  ],
                },
                {
                  label:
                    'ENE-4.B Explain how interactions within and among populations influence community structure.',
                  value: 'ENE-4.B',
                  essentialKnowledge: [
                    {
                      label: 'ENE-4.B.1 Communities change over time',
                      value: 'ENE-4.B.1',
                    },
                    {
                      label:
                        'ENE-4.B.2 Interactions among populations determine how they access energy and matter in a community',
                      value: 'ENE-4.B.2',
                    },
                    {
                      label:
                        'ENE-4.B.3 Relationships can be characterized as +/- (predator-prey, trophic cascades, niche partitioning)',
                      value: 'ENE-4.B.3',
                    },
                    {
                      label:
                        'ENE-4.B.4 Competition, predation, symbioses (comm, parasit, mutual)',
                      value: 'ENE-4.B.4',
                    },
                  ],
                },
                {
                  label:
                    'ENE-4.C Explain how community structure is related to energy availability in the environment.',
                  value: 'ENE-4.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ENE-4.C.1 Cooperation/coordination can result in benefits',
                      value: 'ENE-4.C.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.6 Biodiversity',
              value: 'biodiversity',
              learningObjectives: [
                {
                  label:
                    'SYI-3.F Describe the relationship between ecosystem diversity and its resilience to changes in the environment.',
                  value: 'SYI-3.F',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-3.F.1 Nat/artificial ecosystems with less diversity --> less resilient',
                      value: 'SYI-3.F.1',
                    },
                    {
                      label:
                        'SYI-3.F.2 Keystone species, producers, essential abiotic/biotic factors contribute to maintaining diversity',
                      value: 'SYI-3.F.2',
                    },
                  ],
                },
                {
                  label:
                    'SYI-3.G Explain how the addition or removal of any component of an ecosystem will affect its overall short-term and long-term structure.',
                  value: 'SYI-3.G',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-3.G.1 Species diversity can influence organization of ecosystem',
                      value: 'SYI-3.G.1',
                    },
                    {
                      label: 'SYI-3.G.2 Keystone species definition',
                      value: 'SYI-3.G.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.7 Disruptions to Ecosystems',
              value: 'disruptionsToEcosystems',
              learningObjectives: [
                {
                  label:
                    'EVO-1.O Explain the interaction between the environment and random or preexisting variations in populations.',
                  value: 'EVO-1.O',
                  essentialKnowledge: [
                    { label: 'EVO-1.O.1 Adaptation def.', value: 'EVO-1.O.1' },
                    {
                      label: 'EVO-1.O.2 Mutations are random',
                      value: 'EVO-1.O.2',
                    },
                  ],
                },
                {
                  label:
                    'SYI-2.A Explain how invasive species affect ecosystem dynamics.',
                  value: 'SYI-2.A',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-2.A.1 Invasives exploit new niches and out-compete other organisms',
                      value: 'SYI-2.A.1',
                    },
                    {
                      label: 'SYI-2.A.2 Invasives can have expon. growth',
                      value: 'SYI-2.A.2',
                    },
                  ],
                },
                {
                  label:
                    'SYI-2.B Describe human activities that lead to changes in ecosystem structure and/or dynamics.',
                  value: 'SYI-2.B',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-2.B.1 Distribution of ecosystems changes over time (HUMANS!)',
                      value: 'SYI-2.B.1',
                    },
                    {
                      label:
                        'SYI-2.B.2 Human impact accelerates local change (new diseases, habitat change)',
                      value: 'SYI-2.B.2',
                    },
                  ],
                },
                {
                  label:
                    'SYI-2.C Explain how geological and meteorological activity leads to changes in ecosystem structure and/or dynamics.',
                  value: 'SYI-2.C',
                  essentialKnowledge: [
                    {
                      label:
                        'SYI-2.C.1 Geological/meteorological events affect habitat change and distribution (see: biogeography)',
                      value: 'SYI-2.C.1',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'AP Environmental Science',
      value: 'apEnvironmentalScience',
      units: [
        {
          label: 'Unit 1: The Living World: Ecosystems',
          value: 'theLivingWorldEcosystems',
          topics: [
            {
              label: 'Topic 1.1 Introduction to Ecosystems',
              value: 'introductionToEcosystems',
              learningObjectives: [
                {
                  label:
                    'ERT-1.A Explain how the availability of resources influences species interactions.',
                  value: 'ERT-1.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-1.A.1 In a predator-prey relationship, the predator is an organism that eats another organism (the prey).',
                      value: 'ERT-1.A.1',
                    },
                    {
                      label:
                        'ERT-1.A.2 Symbiosis is a close and long-term interaction between two species in an ecosystem. Types of symbiosis include mutualism, commensalism, and parasitism.',
                      value: 'ERT-1.A.2',
                    },
                    {
                      label:
                        'ERT-1.A.3 Competition can occur within or between species in an ecosystem where there are limited resources. Resource partitioning— using the resources in different ways, places, or at different times—can reduce the negative impact of competition on survival.',
                      value: 'ERT-1.A.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.2 Terrestrial Biomes',
              value: 'terrestrialBiomes',
              learningObjectives: [
                {
                  label:
                    'ERT-1.B Describe the global distribution and principal environmental aspects of terrestrial biomes.',
                  value: 'ERT-1.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-1.B.1 A biome contains characteristic communities of plants and animals that result from, and are adapted to, its climate.',
                      value: 'ERT-1.B.1',
                    },
                    {
                      label:
                        'ERT-1.B.2 Major terrestrial biomes include taiga, temperate rainforests, temperate seasonal forests, tropical rainforests, shrubland, temperate grassland, savanna, desert, and tundra.',
                      value: 'ERT-1.B.2',
                    },
                    {
                      label:
                        'ERT-1.B.3 The global distribution of nonmineral terrestrial natural resources, such as water and trees for lumber, varies because of some combination of climate, geography, latitude and altitude, nutrient availability, and soil.',
                      value: 'ERT-1.B.3',
                    },
                    {
                      label:
                        'ERT-1.B.4 The worldwide distribution of biomes is dynamic; the distribution has changed in the past and may again shift as a result of global climate changes.',
                      value: 'ERT-1.B.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.3 Aquatic Biomes',
              value: 'aquaticBiomes',
              learningObjectives: [
                {
                  label:
                    'ERT-1.C Describe the global distribution and principal environmental aspects of aquatic biomes.',
                  value: 'ERT-1.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-1.C.1 Freshwater biomes include streams, rivers, ponds, and lakes. These freshwater biomes are a vital resource for drinking water.',
                      value: 'ERT-1.C.1',
                    },
                    {
                      label:
                        'ERT-1.C.2 Marine biomes include oceans, coral reefs, marshland, and estuaries. Algae in marine biomes supply a large portion of the Earth’s oxygen, and also take in carbon dioxide from the atmosphere.',
                      value: 'ERT-1.C.2',
                    },
                    {
                      label:
                        'ERT-1.C.3 The global distribution of nonmineral marine natural resources, such as different types of fish, varies because of some combination of salinity, depth, turbidity, nutrient availability, and temperature.',
                      value: 'ERT-1.C.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.4 The Carbon Cycle',
              value: 'theCarbonCycle',
              learningObjectives: [
                {
                  label:
                    'ERT-1.D Explain the steps and reservoir interactions in the carbon cycle.',
                  value: 'ERT-1.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-1.D.1 The carbon cycle is the movement of atoms and molecules containing the element carbon between sources and sinks.',
                      value: 'ERT-1.D.1',
                    },
                    {
                      label:
                        'ERT-1.D.2 Some of the reservoirs in which carbon compounds occur in the carbon cycle hold those compounds for long periods of time, while some hold them for relatively short periods of time.',
                      value: 'ERT-1.D.2',
                    },
                    {
                      label:
                        'ERT-1.D.3 Carbon cycles between photosynthesis and cellular respiration in living things.',
                      value: 'ERT-1.D.3',
                    },
                    {
                      label:
                        'ERT-1.D.4 Plant and animal decomposition have led to the storage of carbon over millions of years. The burning of fossil fuels quickly moves that stored carbon into atmospheric carbon, in the form of carbon dioxide.',
                      value: 'ERT-1.D.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.5 The Nitrogen Cycle',
              value: 'theNitrogenCycle',
              learningObjectives: [
                {
                  label:
                    'ERT-1.E Explain the steps and reservoir interactions in the nitrogen cycle',
                  value: 'ERT-1.E',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-1.E.1 The nitrogen cycle is the movement of atoms and molecules containing the element nitrogen between sources and sinks.',
                      value: 'ERT-1.E.1',
                    },
                    {
                      label:
                        'ERT-1.E.2 Most of the reservoirs in which nitrogen compounds occur in the nitrogen cycle hold those compounds for relatively short periods of time.',
                      value: 'ERT-1.E.2',
                    },
                    {
                      label:
                        'ERT-1.E.3 Nitrogen fixation is the process in which atmospheric nitrogen is converted into a form of nitrogen (primarily ammonia) that is available for uptake by plants and that can be synthesized into plant tissue.',
                      value: 'ERT-1.E.3',
                    },
                    {
                      label:
                        'ERT-1.E.4 The atmosphere is the major reservoir of nitrogen.',
                      value: 'ERT-1.E.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.6 The Phosphorus Cycle',
              value: 'thePhosphorusCycle',
              learningObjectives: [
                {
                  label:
                    'ERT-1.F Explain the steps and reservoir interactions in the phosphorus cycle.',
                  value: 'ERT-1.F',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-1.F.1 The phosphorus cycle is the movement of atoms and molecules containing the element phosphorus between sources and sinks.',
                      value: 'ERT-1.F.1',
                    },
                    {
                      label:
                        'ERT-1.F.2 The major reservoirs of phosphorus in the phosphorus cycle are rock and sediments that contain phosphorus-bearing minerals.',
                      value: 'ERT-1.F.2',
                    },
                    {
                      label:
                        'ERT-1.F.3 There is no atmospheric component in the phosphorus cycle, and the limitations this imposes on the return of phosphorus from the ocean to land make phosphorus naturally scarce in aquatic and many terrestrial ecosystems. In undisturbed ecosystems, phosphorus is the limiting factor in biological systems.',
                      value: 'ERT-1.F.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.7 The Hydrologic (Water) Cycle',
              value: 'theHydrologicWaterCycle',
              learningObjectives: [
                {
                  label:
                    'ERT-1.G Explain the steps and reservoir interactions in the hydrologic cycle.',
                  value: 'ERT-1.G',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-1.G.1 The hydrologic cycle, which is powered by the sun, is the movement of water in its various solid, liquid, and gaseous phases between sources and sinks.',
                      value: 'ERT-1.G.1',
                    },
                    {
                      label:
                        'ERT-1.G.2 The oceans are the primary reservoir of water at the Earth’s surface, with ice caps and groundwater acting as much smaller reservoirs.',
                      value: 'ERT-1.G.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.8 Primary Productivity',
              value: 'primaryProductivity',
              learningObjectives: [
                {
                  label:
                    'ENG-1.A Explain how solar energy is acquired and transferred by living organisms.',
                  value: 'ENG-1.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-1.A.1 Primary productivity is the rate at which solar energy (sunlight) is converted into organic compounds via photosynthesis over a unit of time.',
                      value: 'ENG-1.A.1',
                    },
                    {
                      label:
                        'ENG-1.A.2 Gross primary productivity is the total rate of photosynthesis in a given area.',
                      value: 'ENG-1.A.2',
                    },
                    {
                      label:
                        'ENG-1.A.3 Net primary productivity is the rate of energy storage by photosynthesizers in a given area, after subtracting the energy lost to respiration.',
                      value: 'ENG-1.A.3',
                    },
                    {
                      label:
                        'ENG-1.A.4 Productivity is measured in units of energy per unit area per unit time (e.g., kcal/m2/yr).',
                      value: 'ENG-1.A.4',
                    },
                    {
                      label:
                        'ENG-1.A.5 Most red light is absorbed in the upper 1m of water, and blue light only penetrates deeper than 100m in the clearest water. This affects photosynthesis in aquatic ecosystems, whose photosynthesizers have adapted mechanisms to address the lack of visible light.',
                      value: 'ENG-1.A.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.9 Trophic Levels',
              value: 'trophicLevels',
              learningObjectives: [
                {
                  label:
                    'ENG-1.B Explain how energy flows and matter cycles through trophic levels.',
                  value: 'ENG-1.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-1.B.1 All ecosystems depend on a continuous inflow of high-quality energy in order to maintain their structure and function of transferring matter between the environment and organisms via biogeochemical cycles.',
                      value: 'ENG-1.B.1',
                    },
                    {
                      label:
                        'ENG-1.B.2 Biogeochemical cycles are essential for life and each cycle demonstrates the conservation of matter.',
                      value: 'ENG-1.B.2',
                    },
                    {
                      label:
                        'ENG-1.B.3 In terrestrial and near-surface marine communities, energy flows from the sun to producers in the lowest trophic levels and then upward to higher trophic levels.',
                      value: 'ENG-1.B.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.10 Energy Flow and the 10% Rule',
              value: 'energyFlowAndThe10Rule',
              learningObjectives: [
                {
                  label:
                    'ENG-1.C Determine how the energy decreases as it flows through ecosystems.',
                  value: 'ENG-1.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-1.C.1 The 10% rule approximates that in the transfer of energy from one trophic level to the next, only about 10% of the energy is passed on.',
                      value: 'ENG-1.C.1',
                    },
                    {
                      label:
                        'ENG-1.C.2 The loss of energy that occurs when energy moves from lower to higher trophic levels can be explained through the laws of thermodynamics.',
                      value: 'ENG-1.C.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 1.11 Food Chains and Food Webs',
              value: 'foodChainsAndFoodWebs',
              learningObjectives: [
                {
                  label:
                    'ENG-1.D Describe food chains and food webs, and their constituent members by trophic level.',
                  value: 'ENG-1.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-1.D.1 A food web is a model of an interlocking pattern of food chains that depicts the flow of energy and nutrients in two or more food chains.',
                      value: 'ENG-1.D.1',
                    },
                    {
                      label:
                        'ENG-1.D.2 Positive and negative feedback loops can each play a role in food webs. When one species is removed from or added to a specific food web, the rest of the food web can be affected.',
                      value: 'ENG-1.D.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 2: The Living World: Biodiversity',
          value: 'theLivingWorldBiodiversity',
          topics: [
            {
              label: 'Topic 2.1 Introduction to Biodiversity',
              value: 'introductionToBiodiversity',
              learningObjectives: [
                {
                  label:
                    'ERT-2.A Explain levels of biodiversity and their importance to ecosystems.',
                  value: 'ERT-2.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.A.1 Biodiversity in an ecosystem includes genetic, species, and habitat diversity',
                      value: 'ERT-2.A.1',
                    },
                    {
                      label:
                        'ERT-2.A.2 The more genetically diverse a population is, the better it can respond to environmental stressors. Additionally, a population bottleneck can lead to a loss of genetic diversity.',
                      value: 'ERT-2.A.2',
                    },
                    {
                      label:
                        'ERT-2.A.3 Ecosystems that have a larger number of species are more likely to recover from disruptions.',
                      value: 'ERT-2.A.3',
                    },
                    {
                      label:
                        'ERT-2.A.4 Loss of habitat leads to a loss of specialist species, followed by a loss of generalist species. It also leads to reduced numbers of species that have large territorial requirements.',
                      value: 'ERT-2.A.4',
                    },
                    {
                      label:
                        'ERT-2.A.5 Species richness refers to the number of different species found in an ecosystem.',
                      value: 'ERT-2.A.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.2 Ecosystem Services',
              value: 'ecosystemServices',
              learningObjectives: [
                {
                  label: 'ERT-2.B Describe ecosystem services.',
                  value: 'ERT-2.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.B.1 There are four categories of ecosystem services: provisioning, regulating, cultural, and supporting.',
                      value: 'ERT-2.B.1',
                    },
                  ],
                },
                {
                  label:
                    'ERT-2.C Describe the results of human disruptions to ecosystem services.',
                  value: 'ERT-2.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.C.1 Anthropogenic activities can disrupt ecosystem services, potentially resulting in economic and ecological consequences.',
                      value: 'ERT-2.C.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.3 Island Biogeography',
              value: 'islandBiogeography',
              learningObjectives: [
                {
                  label: 'ERT-2.D Describe island biogeography. ',
                  value: 'ERT-2.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.D.1 Island biogeography is the study of the ecological relationships and distribution of organisms on islands, and of these organisms’ community structures.',
                      value: 'ERT-2.D.1',
                    },
                    {
                      label:
                        'ERT-2.D.2 Islands have been colonized in the past by new species arriving from elsewhere.',
                      value: 'ERT-2.D.2',
                    },
                  ],
                },
                {
                  label:
                    'ERT-2.E Describe the role of island biogeography in evolution.',
                  value: 'ERT-2.E',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.E.1 Many island species have evolved to be specialists versus generalists because of the limited resources, such as food and territory, on most islands. The long-term survival of specialists may be jeopardized if and when invasive species, typically generalists, are introduced and outcompete the specialists.',
                      value: 'ERT-2.E.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.4 Ecological Tolerance',
              value: 'ecologicalTolerance',
              learningObjectives: [
                {
                  label: 'ERT-2.F Describe ecological tolerance.',
                  value: 'ERT-2.F',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.F.1 Ecological tolerance refers to the range of conditions, such as temperature, salinity, flow rate, and sunlight that an organism can endure before injury or death results.',
                      value: 'ERT-2.F.1',
                    },
                    {
                      label:
                        'ERT-2.F.2 Ecological tolerance can apply to individuals and to species.',
                      value: 'ERT-2.F.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.5 Natural Disruptions to Ecosystems',
              value: 'naturalDisruptionsToEcosystems',
              learningObjectives: [
                {
                  label:
                    'ERT-2.G Explain how natural disruptions, both shortand long-term, impact an ecosystem.',
                  value: 'ERT-2.G',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.G.1 Natural disruptions to ecosystems have environmental consequences that may, for a given occurrence, be as great as, or greater than, many human-made disruptions.',
                      value: 'ERT-2.G.1',
                    },
                    {
                      label:
                        'ERT-2.G.2 Earth system processes operate on a range of scales in terms of time. Processes can be periodic, episodic, or random.',
                      value: 'ERT-2.G.2',
                    },
                    {
                      label:
                        'ERT-2.G.3 Earth’s climate has changed over geological time for many reasons.',
                      value: 'ERT-2.G.3',
                    },
                    {
                      label:
                        'ERT-2.G.4 Sea level has varied significantly as a result of changes in the amount of glacial ice on Earth over geological time.',
                      value: 'ERT-2.G.4',
                    },
                    {
                      label:
                        'ERT-2.G.5 Major environmental change or upheaval commonly results in large swathes of habitat changes.',
                      value: 'ERT-2.G.5',
                    },
                    {
                      label:
                        'ERT-2.G.6 Wildlife engages in both short- and long-term migration for a variety of reasons, including natural disruptions.',
                      value: 'ERT-2.G.6',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.6 Adaptations',
              value: 'adaptations',
              learningObjectives: [
                {
                  label:
                    'ERT-2.H Describe how organisms adapt to their environment.',
                  value: 'ERT-2.H',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.H.1 Organisms adapt to their environment over time, both in short- and long-term scales, via incremental changes at the genetic level.',
                      value: 'ERT-2.H.1',
                    },
                    {
                      label:
                        'ERT-2.H.2 Environmental changes, either sudden or gradual, may threaten a species’ survival, requiring individuals to alter behaviors, move, or perish.',
                      value: 'ERT-2.H.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 2.7 Ecological Succession',
              value: 'ecologicalSuccession',
              learningObjectives: [
                {
                  label: 'ERT-2.I Describe ecological succession.',
                  value: 'ERT-2.I',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.I.1 There are two main types of ecological succession: primary and secondary succession.',
                      value: 'ERT-2.I.1',
                    },
                    {
                      label:
                        'ERT-2.I.2 A keystone species in an ecosystem is a species whose activities have a particularly significant role in determining community structure.',
                      value: 'ERT-2.I.2',
                    },
                    {
                      label:
                        'ERT-2.I.3 An indicator species is a plant or animal that, by its presence, abundance, scarcity, or chemical composition, demonstrates that some distinctive aspect of the character or quality of an ecosystem is present.',
                      value: 'ERT-2.I.3',
                    },
                  ],
                },
                {
                  label:
                    'ERT-2.J Describe the effect of ecological succession on ecosystems.',
                  value: 'ERT-2.J',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-2.J.1 Pioneer members of an early successional species commonly move into unoccupied habitat and over time adapt to its particular conditions, which may result in the origin of new species.',
                      value: 'ERT-2.J.1',
                    },
                    {
                      label:
                        'ERT-2.J.2 Succession in a disturbed ecosystem will affect the total biomass, species richness, and net productivity over time.',
                      value: 'ERT-2.J.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 3: Populations',
          value: 'populations',
          topics: [
            {
              label: 'Topic 3.1 Generalist and Specialist Species',
              value: 'generalistAndSpecialistSpecies',
              learningObjectives: [
                {
                  label:
                    'ERT-3.A Identify differences between generalist and specialist species.',
                  value: 'ERT-3.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-3.A.1 Specialist species tend to be advantaged in habitats that remain constant, while generalist species tend to be advantaged in habitats that are changing.',
                      value: 'ERT-3.A.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.2 K-Selected r-Selected Species',
              value: 'kSelectedRSelectedSpecies',
              learningObjectives: [
                {
                  label:
                    'ERT-3.B Identify differences between K- and r-selected species.',
                  value: 'ERT-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-3.B.1 K-selected species tend to be large, have few offspring per reproduction event, live in stable environments, expend significant energy for each offspring, mature after many years of extended youth and parental care, have long life spans/life expectancy, and reproduce more than once in their lifetime. Competition for resources in K-selected species’ habitats is usually relatively high.',
                      value: 'ERT-3.B.1',
                    },
                    {
                      label:
                        'ERT-3.B.2 r-selected species tend to be small, have many offspring, expend or invest minimal energy for each offspring, mature early, have short life spans, and may reproduce only once in their lifetime. Competition for resources in r-selected species’ habitats is typically relatively low.',
                      value: 'ERT-3.B.2',
                    },
                    {
                      label:
                        'ERT-3.B.3 Biotic potential refers to the maximum reproductive rate of a population in ideal conditions.',
                      value: 'ERT-3.B.3',
                    },
                    {
                      label:
                        'ERT-3.B.4 Many species have reproductive strategies that are not uniquely r-selected or K-selected, or they change in different conditions at different times.',
                      value: 'ERT-3.B.4',
                    },
                    {
                      label:
                        'ERT-3.B.5 K-selected species are typically more adversely affected by invasive species than r-selected species, which are minimally affected by invasive species. Most invasive species are r-selected species.',
                      value: 'ERT-3.B.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.3 Survivorship Curves',
              value: 'survivorshipCurves',
              learningObjectives: [
                {
                  label: 'ERT-3.C Explain survivorship curves.',
                  value: 'ERT-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-3.C.1 A survivorship curve is a line that displays the relative survival rates of a cohort—a group of individuals of the same age—in a population, from birth to the maximum age reached by any one cohort member. There are Type I, Type II, and Type III curves.',
                      value: 'ERT-3.C.1',
                    },
                    {
                      label:
                        'ERT-3.C.2 Survivorship curves differ for K-selected and r-selected species, with K-selected species typically following a Type I or Type II curve and r-selected species following a Type III curve.',
                      value: 'ERT-3.C.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.4 Carrying Capacity',
              value: 'carryingCapacity',
              learningObjectives: [
                {
                  label: 'ERT-3.D Describe carrying capacity.',
                  value: 'ERT-3.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-3.D.1 When a population exceeds its carrying capacity (carrying capacity can be denoted as K), overshoot occurs. There are environmental impacts of population overshoot, including resource depletion.',
                      value: 'ERT-3.D.1',
                    },
                  ],
                },
                {
                  label:
                    'ERT-3.E Describe the impact of carrying capacity on ecosystems.',
                  value: 'ERT-3.E',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-3.E.1 A major ecological effect of population overshoot is dieback of the population (often severe to catastrophic) because the lack of available resources leads to famine, disease, and/or conflict.',
                      value: 'ERT-3.E.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.5 Population Growth and Resource Availability',
              value: 'populationGrowthAndResourceAvailability',
              learningObjectives: [
                {
                  label:
                    'ERT-3.F Explain how resource availability affects population growth.',
                  value: 'ERT-3.F',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-3.F.1 Population growth is limited by environmental factors, especially by the available resources and space.',
                      value: 'ERT-3.F.1',
                    },
                    {
                      label:
                        'ERT-3.F.2 Resource availability and the total resource base are limited and finite over all scales of time.',
                      value: 'ERT-3.F.2',
                    },
                    {
                      label:
                        'ERT-3.F.3 When the resources needed by a population for growth are abundant, population growth usually accelerates.',
                      value: 'ERT-3.F.3',
                    },
                    {
                      label:
                        'ERT-3.F.5 When the resource base of a population shrinks, the increased potential for unequal distribution of resources will ultimately result in increased mortality, decreased fecundity, or both, resulting in population growth declining to, or below, carrying capacity.',
                      value: 'ERT-3.F.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.6 Age Structure Diagrams',
              value: 'ageStructureDiagrams',
              learningObjectives: [
                {
                  label: 'EIN-1.A Explain age structure diagrams.',
                  value: 'EIN-1.A',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-1.A.1 Population growth rates can be interpreted from age structure diagrams by the shape of the structure.',
                      value: 'EIN-1.A.1',
                    },
                    {
                      label:
                        'EIN-1.A.2 A rapidly growing population will, as a rule, have a higher proportion of younger people compared to stable or declining populations.',
                      value: 'EIN-1.A.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.7 Total Fertility Rate',
              value: 'totalFertilityRate',
              learningObjectives: [
                {
                  label:
                    'EIN-1.B Explain factors that affect total fertility rate in human populations.',
                  value: 'EIN-1.B',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-1.B.1 Total fertility rate (TFR) is affected by the age at which females have their first child, educational opportunities for females, access to family planning, and government acts and policies.',
                      value: 'EIN-1.B.1',
                    },
                    {
                      label:
                        'EIN-1.B.2 If fertility rate is at replacement levels, a population is considered relatively stable.',
                      value: 'EIN-1.B.2',
                    },
                    {
                      label:
                        'EIN-1.B.3 Factors associated with infant mortality rates include whether mothers have access to good healthcare and nutrition. Changes in these factors can lead to changes in infant mortality rates over time.',
                      value: 'EIN-1.B.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.8 Human Population Dynamics',
              value: 'humanPopulationDynamics',
              learningObjectives: [
                {
                  label:
                    'EIN-1.C Explain how human populations experience growth and decline.',
                  value: 'EIN-1.C',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-1.C.1 Birth rates, infant mortality rates, and overall death rates, access to family planning, access to good nutrition, access to education, and postponement of marriage all affect whether a human population is growing or declining.',
                      value: 'EIN-1.C.1',
                    },
                    {
                      label:
                        'EIN-1.C.2 Factors limiting global human population include the Earth’s carrying capacity and the basic factors that limit human population growth as set forth by Malthusian theory.',
                      value: 'EIN-1.C.2',
                    },
                    {
                      label:
                        'EIN-1.C.3 Population growth can be affected by both density-independent factors, such as major storms, fires, heat waves, or droughts, and density-dependent factors, such as access to clean water and air, food availability, disease transmission, or territory size.',
                      value: 'EIN-1.C.3',
                    },
                    {
                      label:
                        'EIN-1.C.4 The rule of 70 states that dividing the number 70 by the percentage population growth rate approximates the population’s doubling time.',
                      value: 'EIN-1.C.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 3.9 Demographic Transition',
              value: 'demographicTransition',
              learningObjectives: [
                {
                  label: 'EIN-1.D Define the demographic transition.',
                  value: 'EIN-1.D',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-1.D.1 The demographic transition refers to the transition from high to lower birth and death rates in a country or region as development occurs and that country moves from a preindustrial to an industrialized economic system. This transition is typically demonstrated through a four-stage demographic transition model (DTM).',
                      value: 'EIN-1.D.1',
                    },
                    {
                      label:
                        'EIN-1.D.2 Characteristics of developing countries include higher infant mortality rates and more children in the workforce than developed countries.',
                      value: 'EIN-1.D.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 4: Earth Systems and Resources',
          value: 'earthSystemsAndResources',
          topics: [
            {
              label: 'Topic 4.1 Plate Tectonics',
              value: 'plateTectonics',
              learningObjectives: [
                {
                  label:
                    'ERT- 4.A Describe the geological changes and events that occur at convergent, divergent, and transform plate boundaries.',
                  value: 'ERT-',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-4.A.1 Convergent boundaries can result in the creation of mountains, island arcs, earthquakes, and volcanoes.',
                      value: 'ERT-4.A.1',
                    },
                    {
                      label:
                        'ERT-4.A.2 Divergent boundaries can result in seafloor spreading, rift v',
                      value: 'ERT-4.A.2',
                    },
                    {
                      label:
                        'ERT-4.A.3 Transform boundaries can result in earthquakes.',
                      value: 'ERT-4.A.3',
                    },
                    {
                      label:
                        'ERT-4.A.4 Maps that show the global distribution of plate boundaries can be used to determine the location of volcanoes, island arcs, earthquakes, hot spots, and faults.',
                      value: 'ERT-4.A.4',
                    },
                    {
                      label:
                        'ERT-4.A.5 An earthquake occurs when stress overcomes a locked fault, releasing stored energy.',
                      value: 'ERT-4.A.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.2 Soil Formation and Erosion',
              value: 'soilFormationAndErosion',
              learningObjectives: [
                {
                  label:
                    'ERT-4.B Describe the characteristics and formation of soil.',
                  value: 'ERT-4.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-4.B.1 Soils are formed when parent material is weathered, transported, and deposited.',
                      value: 'ERT-4.B.1',
                    },
                    {
                      label:
                        'ERT-4.B.2 Soils are generally categorized by horizons based on their composition and organic material.',
                      value: 'ERT-4.B.2',
                    },
                    {
                      label:
                        'ERT-4.B.3 Soils can be eroded by winds or water. Protecting soils can protect water quality as soils effectively filter and clean water that moves through them.',
                      value: 'ERT-4.B.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.3 Soil Composition and Properties',
              value: 'soilCompositionAndProperties',
              learningObjectives: [
                {
                  label:
                    'ERT-4.C Describe similarities and differences between properties of different soil types.',
                  value: 'ERT-4.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-4.C.1 Water holding capacity—the total amount of water soil can hold—varies with different soil types. Water retention contributes to land productivity and fertility of soils.',
                      value: 'ERT-4.C.1',
                    },
                    {
                      label:
                        'ERT-4.C.2 The particle size and composition of each soil horizon can affect the porosity, permeability, and fertility of the soil.',
                      value: 'ERT-4.C.2',
                    },
                    {
                      label:
                        'ERT-4.C.3 There are a variety of methods to test the chemical, physical, and biological properties of soil that can aid in a variety of decisions, such as irrigation and fertilizer requirements.',
                      value: 'ERT-4.C.3',
                    },
                    {
                      label:
                        'ERT-4.C.4 A soil texture triangle is a diagram that allows for the identification and comparison of soil types based on their percentage of clay, silt, and sand.',
                      value: 'ERT-4.C.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.4 Earth’s Atmosphere',
              value: 'earthsAtmosphere',
              learningObjectives: [
                {
                  label:
                    'ERT-4.D Describe the structure and composition of the Earth’s atmosphere.',
                  value: 'ERT-4.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-4.D.1 The atmosphere is made up of major gases, each with its own relative abundance.',
                      value: 'ERT-4.D.1',
                    },
                    {
                      label:
                        'ERT-4.D.2 The layers of the atmosphere are based on temperature gradients and include the troposphere, stratosphere, mesosphere, thermosphere, and exosphere.',
                      value: 'ERT-4.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.5 Global Wind Patterns',
              value: 'globalWindPatterns',
              learningObjectives: [
                {
                  label:
                    'ERT-4.E Explain how environmental factors can result in atmospheric circulation.',
                  value: 'ERT-4.E',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-4.E.1 Global wind patterns primarily result from the most intense solar radiation arriving at the equator, resulting in density differences and the Coriolis effect.',
                      value: 'ERT-4.E.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.6 Watersheds',
              value: 'watersheds',
              learningObjectives: [
                {
                  label: 'ERT-4.F Describe the characteristics of a watershed.',
                  value: 'ERT-4.F',
                  essentialKnowledge: [
                    {
                      label:
                        'ERT-4.F.1 Characteristics of a given watershed include its area, length, slope, soil, vegetation types, and divides with adjoining watersheds.',
                      value: 'ERT-4.F.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.7 Solar Radiation and Earth’s Seasons',
              value: 'solarRadiationAndEarthsSeasons',
              learningObjectives: [
                {
                  label:
                    'ENG-2.A Explain how the sun’s energy affects the Earth’s surface.',
                  value: 'ENG-2.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-2.A.1 Incoming solar radiation (insolation) is the Earth’s main source of energy and is dependent on season and latitude.',
                      value: 'ENG-2.A.1',
                    },
                    {
                      label:
                        'ENG-2.A.2 The angle of the sun’s rays determines the intensity of the solar radiation. Due to the shape of the Earth, the latitude that is directly horizontal to the solar radiation receives the most intensity.',
                      value: 'ENG-2.A.2',
                    },
                    {
                      label:
                        'ENG-2.A.3 The highest solar radiation per unit area is received at the equator and decreases toward the poles.',
                      value: 'ENG-2.A.3',
                    },
                    {
                      label:
                        'ENG-2.A.4 The solar radiation received at a location on the Earth’s surface varies seasonally, with the most radiation received during the location’s longest summer day and the least on the shortest winter day.',
                      value: 'ENG-2.A.4',
                    },
                    {
                      label:
                        'ENG-2.A.5 The tilt of Earth’s axis of rotation causes the Earth’s seasons and the number of hours of daylight in a particular location on the Earth’s surface.',
                      value: 'ENG-2.A.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.8 Earth’s Geography and Climate',
              value: 'earthsGeographyAndClimate',
              learningObjectives: [
                {
                  label:
                    'ENG-2.B Describe how the Earth’s geography affects weather and climate.',
                  value: 'ENG-2.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-2.B.1 Weather and climate are affected not only by the sun’s energy but by geologic and geographic factors, such as mountains and ocean temperature.',
                      value: 'ENG-2.B.1',
                    },
                    {
                      label:
                        'ENG-2.B.2 A rain shadow is a region of land that has become drier because a higher elevation area blocks precipitation from reaching the land.',
                      value: 'ENG-2.B.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 4.9 El Niño and La Niña',
              value: 'elNinoAndLaNina',
              learningObjectives: [
                {
                  label:
                    'ENG-2.C Describe the environmental changes and effects that result from El Niño or La Niña events (El Niño–Southern Oscillation).',
                  value: 'ENG-2.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-2.C.1 El Niño and La Niña are phenomena associated with changing ocean surface temperatures in the Pacific Ocean. These phenomena can cause global changes to rainfall, wind, and ocean circulation patterns.',
                      value: 'ENG-2.C.1',
                    },
                    {
                      label:
                        'ENG-2.C.2 El Niño and La Niña are influenced by geological and geographic factors and can affect different locations in different ways.',
                      value: 'ENG-2.C.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 5: Land and Water Use',
          value: 'landAndWaterUse',
          topics: [
            {
              label: 'Topic 5.1 The Tragedy of the Commons',
              value: 'theTragedyOfTheCommons',
              learningObjectives: [
                {
                  label:
                    'EIN-2.A Explain the concept of the tragedy of the commons.',
                  value: 'EIN-2.A',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.A.1 The tragedy of the commons suggests that individuals will use shared resources in their own self-interest rather than in keeping with the common good, thereby depleting the resources.',
                      value: 'EIN-2.A.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.2 Clearcutting',
              value: 'clearcutting',
              learningObjectives: [
                {
                  label:
                    'EIN-2.B Describe the effect of clearcutting on forests.',
                  value: 'EIN-2.B',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.B.1 Clearcutting can be economically advantageous but leads to soil erosion, increased soil and stream temperatures, and flooding.',
                      value: 'EIN-2.B.1',
                    },
                    {
                      label:
                        'EIN-2.B.2 Forests contain trees that absorb pollutants and store carbon dioxide. The cutting and burning of trees releases carbon dioxide and contributes to climate change.',
                      value: 'EIN-2.B.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.3 The Green Revolution',
              value: 'theGreenRevolution',
              learningObjectives: [
                {
                  label: 'EIN-2.C Describe changes in agricultural practices.',
                  value: 'EIN-2.C',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.C.1 The Green Revolution started a shift to new agricultural strategies and practices in order to increase food production, with both positive and negative results. Some of these strategies and methods are mechanization, genetically modified organisms (GMOs), fertilization, irrigation, and the use of pesticides.',
                      value: 'EIN-2.C.1',
                    },
                    {
                      label:
                        'EIN-2.C.2 Mechanization of farming can increase profits and efficiency for farms. It can also increase reliance on fossil fuels.',
                      value: 'EIN-2.C.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.4 Impact of Agricultural Practices',
              value: 'impactOfAgriculturalPractices',
              learningObjectives: [
                {
                  label:
                    'EIN-2.D Describe agricultural practices that cause environmental damage.',
                  value: 'EIN-2.D',
                  essentialKnowledge: [
                    {
                      label:
                        'LOR-2.D.1 Agricultural practices that can cause environmental damage include tilling, slashand-burn farming, and the use of fertilizers.',
                      value: 'LOR-2.D.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.5 Irrigation Methods',
              value: 'irrigationMethods',
              learningObjectives: [
                {
                  label: 'EIN-2.E Describe different methods of irrigation.',
                  value: 'EIN-2.E',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.E.1 The largest human use of freshwater is for irrigation (70%).',
                      value: 'EIN-2.E.1',
                    },
                    {
                      label:
                        'EIN-2.E.2 Types of irrigation include drip irrigation, flood irrigation, furrow irrigation, drip irrigation, and spray irrigation.',
                      value: 'EIN-2.E.2',
                    },
                  ],
                },
                {
                  label:
                    'EIN-2.F Describe the benefits and drawbacks of different methods of irrigation.',
                  value: 'EIN-2.F',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.F.1 Waterlogging occurs when too much water is left to sit in the soil, which raises the water table of groundwater and inhibits plants’ ability to absorb oxygen through their roots.',
                      value: 'EIN-2.F.1',
                    },
                    {
                      label:
                        'EIN-2.F.2 Furrow irrigation involves cutting furrows between crop rows and filling them with water. This system is inexpensive, but about 1/3 of the water is lost to evaporation and runoff.',
                      value: 'EIN-2.F.2',
                    },
                    {
                      label:
                        'EIN-2.F.3 Flood irrigation involves flooding an agricultural field with water. This system sees about 20% of the water lost to evaporation and runoff. This can also lead to waterlogging of the soil.',
                      value: 'EIN-2.F.3',
                    },
                    {
                      label:
                        'EIN-2.F.4 Spray irrigation involves pumping ground water into spray nozzles across an agricultural field. This system is more efficient than flood and furrow irrigation, with only 1/4 or less of the water lost to evaporation or runoff. However, spray systems are more expensive than flood and furrow irrigation, and also requires energy to run.',
                      value: 'EIN-2.F.4',
                    },
                    {
                      label:
                        'EIN-2.F.5 Drip irrigation uses perforated hoses to release small amounts of water to plant roots. This system is the most efficient, with only about 5% of water lost to evaporation and runoff. However, this system is expensive and so is not often used.',
                      value: 'EIN-2.F.5',
                    },
                    {
                      label:
                        'EIN-2.F.6 Salinization occurs when the salts in groundwater remain in the soil after the water evaporates. Over time, salinization can make soil toxic to plants.',
                      value: 'EIN-2.F.6',
                    },
                    {
                      label:
                        'EIN-2.F.7 Aquifers can be severely depleted if overused for agricultural irrigation, as has happened to the Ogallala Aquifer in the central United States.',
                      value: 'EIN-2.F.7',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.6 Pest Control Methods',
              value: 'pestControlMethods',
              learningObjectives: [
                {
                  label:
                    'EIN-2.G Describe the benefits and drawbacks of different methods of pest control.',
                  value: 'EIN-2.G',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.G.1 One consequence of using common pest-control methods such as pesticides, herbicides, fungicides, rodenticides, and insecticides is that organisms can become resistant to them through artificial selection. Pest control decreases crop damage by pest and increases crop yields.',
                      value: 'EIN-2.G.1',
                    },
                    {
                      label:
                        'EIN-2.G.2 Crops can be genetically engineered to increase their resistance to pests and diseases. However, using genetically engineered crops in planting or other ways can lead to loss of genetic diversity of that particular crop.',
                      value: 'EIN-2.G.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.7 Meat Production Methods',
              value: 'meatProductionMethods',
              learningObjectives: [
                {
                  label:
                    'EIN-2.H Identify different methods of meat production.',
                  value: 'EIN-2.H',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.H.1 Methods of meat production include concentrated animal feeding operations (CAFOs), also called feedlots, and free-range grazing.',
                      value: 'EIN-2.H.1',
                    },
                  ],
                },
                {
                  label:
                    'EIN-2.I Describe the benefits and drawbacks of different methods of meat production.',
                  value: 'EIN-2.I',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.I.1 Meat production is less efficient than agriculture; it takes approximately 20 times more land to produce the same amount of calories from meat as from plants.',
                      value: 'EIN-2.I.1',
                    },
                    {
                      label:
                        'EIN-2.I.2 Concentrated animal feeding operation (CAFOs) are used as a way to quickly get livestock ready for slaughter. They tend to be crowded, and animals are fed grains or feed that are not as suitable as grass. Additionally, feedlots generate a large amount of organic waste, which can contaminate ground and surface water. The use of feedlots are less expensive than other methods, which can keep costs to consumers down.',
                      value: 'EIN-2.I.2',
                    },
                    {
                      label:
                        'EIN-2.I.3 Free range grazing allows animals to graze on grass during their entire lifecycle. Meat from free range animals tends to be free from antibiotics and other chemicals used in feedlots. Organic waste from these animals acts as fertilizer. Free range grazing requires large areas of land and the meat produced is more expensive for consumers.',
                      value: 'EIN-2.I.3',
                    },
                    {
                      label:
                        'EIN-2.I.4 Overgrazing occurs when too many animals feed on a particular area of land. Overgrazing causes loss of vegetation, which leads to soil erosion.',
                      value: 'EIN-2.I.4',
                    },
                    {
                      label:
                        'EIN-2.I.5 Overgrazing can cause desertification. Desertification is the degradation of low precipitation regions toward being increasingly arid until they become deserts.',
                      value: 'EIN-2.I.5',
                    },
                    {
                      label:
                        'EIN-2.I.6 Less consumption of meat could reduce CO2, methane, and N2O emissions; conserve water; reduce the use of antibiotics and growth hormones; and improve topsoil.',
                      value: 'EIN-2.I.6',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.8 Impacts of Overfishing',
              value: 'impactsOfOverfishing',
              learningObjectives: [
                {
                  label:
                    'EIN-2.J Describe causes of and problems related to overfishing.',
                  value: 'EIN-2.J',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.J.1 Overfishing has led to the extreme scarcity of some fish species, which can lessen biodiversity in aquatic systems and harm people who depend on fishing for food and commerce.',
                      value: 'EIN-2.J.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.9 Impacts of Mining',
              value: 'impactsOfMining',
              learningObjectives: [
                {
                  label:
                    'EIN-2.K Describe natural resource extraction through mining.',
                  value: 'EIN-2.K',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.K.1 As the more accessible ores are mined to depletion, mining operations are forced to access lower grade ores. Accessing these ores requires increased use of resources that can cause increased waste and pollution.',
                      value: 'EIN-2.K.1',
                    },
                    {
                      label:
                        'EIN-2.K.2 Surface mining is the removal of large portions of soil and rock, called overburden, in order to access the ore underneath. An example is strip mining, which removes the vegetation from an area, making the area more susceptible to erosion.',
                      value: 'EIN-2.K.2',
                    },
                  ],
                },
                {
                  label:
                    'EIN-2.L Describe ecological and economic impacts of natural resource extraction through mining.',
                  value: 'EIN-2.L',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.L.1 Mining wastes include the soil and rocks that are moved to gain access to the ore and the waste, called slag and tailings that remain when the minerals have been removed from the ore. Mining helps to provide low cost energy and material necessary to make products. The mining of coal can destroy habitats, contaminate ground water, and release dust particles and methane.',
                      value: 'EIN-2.L.1',
                    },
                    {
                      label:
                        'EIN-2.L.2 As coal reserves get smaller, due to a lack of easily accessible reserves, it becomes necessary to access coal through subsurface mining, which is very expensive.',
                      value: 'EIN-2.L.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.10 Impacts of Urbanization',
              value: 'impactsOfUrbanization',
              learningObjectives: [
                {
                  label:
                    'EIN-2.M Describe the effects of urbanization on the environment.',
                  value: 'EIN-2.M',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.M.1 Urbanization can lead to depletion of resources and saltwater intrusion in the hydrologic cycle.',
                      value: 'EIN-2.M.1',
                    },
                    {
                      label:
                        'EIN-2.M.2 Urbanization, through the burning of fossil fuels and landfills, affects the carbon cycle by increasing the amount of carbon dioxide in the atmosphere.',
                      value: 'EIN-2.M.2',
                    },
                    {
                      label:
                        'EIN-2.M.3 Impervious surfaces are human-made structures—such as roads, buildings, sidewalks, and parking lots—that do not allow water to reach the soil, leading to flooding.',
                      value: 'EIN-2.M.3',
                    },
                    {
                      label:
                        'EIN-2.M.4 Urban sprawl is the change in population distribution from high population density areas to low density suburbs that spread into rural lands, leading to potential environmental problems.',
                      value: 'EIN-2.M.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.11 Ecological Footprints',
              value: 'ecologicalFootprints',
              learningObjectives: [
                {
                  label:
                    'EIN-2.N Explain the variables measured in an ecological footprint.',
                  value: 'EIN-2.N',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-2.N.1 Ecological footprints compare resource demands and waste production required for an individual or a society.',
                      value: 'EIN-2.N.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.12 Introduction to Sustainability',
              value: 'introductionToSustainability',
              learningObjectives: [
                {
                  label: 'STB-1.A Explain the concept of sustainability.',
                  value: 'STB-1.A',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-1.A.1 Sustainability refers to humans living on Earth and their use of resources without depletion of the resources for future generations. Environmental indicators that can guide humans to sustainability include biological diversity, food production, average global surface temperatures and CO2 concentrations, human population, and resource depletion.',
                      value: 'STB-1.A.1',
                    },
                    {
                      label:
                        'STB-1.A.2 Sustainable yield is the amount of a renewable resource that can be taken without reducing the available supply.',
                      value: 'STB-1.A.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.13 Methods to Reduce Urban Runoff',
              value: 'methodsToReduceUrbanRunoff',
              learningObjectives: [
                {
                  label:
                    'STB-1.B Describe methods for mitigating problems related to urban runoff.',
                  value: 'STB-1.B',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-1.B.1 Methods to increase water infiltration include replacing traditional pavement with permeable pavement, planting trees, increased use of public transportation, and building up, not out.',
                      value: 'STB-1.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.14 Integrated Pest Management',
              value: 'integratedPestManagement',
              learningObjectives: [
                {
                  label: 'STB-1.C Describe integrated pest management.',
                  value: 'STB-1.C',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-1.C.1 Integrated pest management (IPM) is a combination of methods used to effectively control pest species while minimizing the disruption to the environment. These methods include biological, physical, and limited chemical methods such as biocontrol, intercropping, crop rotation, and natural predators of the pests.',
                      value: 'STB-1.C.1',
                    },
                  ],
                },
                {
                  label:
                    'STB-1.D Describe the benefits and drawbacks of integrated pest management (IPM).',
                  value: 'STB-1.D',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-1.D.1 The use of integrated pest management (IPM) reduces the risk that pesticides pose to wildlife, water supplies, and human health.',
                      value: 'STB-1.D.1',
                    },
                    {
                      label:
                        'STB-1.D.2 Integrated pest management (IPM) minimizes disruptions to the environment and threats to human health but can be complex and expensive.',
                      value: 'STB-1.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.15 Sustainable Agriculture',
              value: 'sustainableAgriculture',
              learningObjectives: [
                {
                  label:
                    'STB-1.E Describe sustainable agricultural and food production practices.',
                  value: 'STB-1.E',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-1.E.1 The goal of soil conservation is to prevent soil erosion. Different methods of soil conservation include contour plowing, windbreaks, perennial crops, terracing, no-till agriculture, and strip cropping.',
                      value: 'STB-1.E.1',
                    },
                    {
                      label:
                        'STB-1.E.2 Strategies to improve soil fertility include crop rotation and the addition of green manure and limestone.',
                      value: 'STB-1.E.2',
                    },
                    {
                      label:
                        'STB-1.E.3 Rotational grazing is the regular rotation of livestock between different pastures in order to avoid overgrazing in a particular area.',
                      value: 'STB-1.E.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.16 Aquaculture',
              value: 'aquaculture',
              learningObjectives: [
                {
                  label:
                    'STB-1.F Describe the benefits and drawbacks of aquaculture.',
                  value: 'STB-1.F',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-1.F.1 Aquaculture has expanded because it is highly efficient, requires only small areas of water, and requires little fuel.',
                      value: 'STB-1.F.1',
                    },
                    {
                      label:
                        'STB-1.F.2 Aquaculture can contaminate wastewater, and fish that escape may compete or breed with wild fish. The density of fish in aquaculture can lead to increases in disease incidences, which can be transmitted to wild fish.',
                      value: 'STB-1.F.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 5.17 Sustainable Forestry',
              value: 'sustainableForestry',
              learningObjectives: [
                {
                  label:
                    'STB-1.G Describe methods for mitigating human impact on forests.',
                  value: 'STB-1.G',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-1.G.1 Some of the methods for mitigating deforestation include reforestation, using and buying wood harvested by ecologically sustainable forestry techniques, and reusing wood.',
                      value: 'STB-1.G.1',
                    },
                    {
                      label:
                        'STB-1.G.2 Methods to protect forests from pathogens and insects include integrated pest management (IPM) and the removal of affected trees.',
                      value: 'STB-1.G.2',
                    },
                    {
                      label:
                        'STB-1.G.3 Prescribed burn is a method by which forests are set on fire under controlled conditions in order to reduce the occurrence of natural fires.',
                      value: 'STB-1.G.3',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 6: Energy Resources and Consumption',
          value: 'energyResourcesAndConsumption',
          topics: [
            {
              label: 'Topic 6.1 Renewable and Nonrenewable Resources',
              value: 'renewableAndNonrenewableResources',
              learningObjectives: [
                {
                  label:
                    'ENG-3.A Identify differences between nonrenewable and renewable energy sources.',
                  value: 'ENG-3.A',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.A.1 Nonrenewable energy sources are those that exist in a fixed amount and involve energy transformation that cannot be easily replaced.',
                      value: 'ENG-3.A.1',
                    },
                    {
                      label:
                        'ENG-3.A.2 Renewable energy sources are those that can be replenished naturally, at or near the rate of consumption, and reused.',
                      value: 'ENG-3.A.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.2 Global Energy Consumption',
              value: 'globalEnergyConsumption',
              learningObjectives: [
                {
                  label: 'ENG-3.B Describe trends in energy consumption.',
                  value: 'ENG-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.B.1 The use of energy resources is not evenly distributed between developed and developing countries.',
                      value: 'ENG-3.B.1',
                    },
                    {
                      label:
                        'ENG-3.B.2 The most widely used sources of energy globally are fossil fuels.',
                      value: 'ENG-3.B.2',
                    },
                    {
                      label:
                        'ENG-3.B.3 As developing countries become more developed, their reliance on fossil fuels for energy increases.',
                      value: 'ENG-3.B.3',
                    },
                    {
                      label:
                        'ENG-3.B.4 As the world becomes more industrialized, the demand for energy increases.',
                      value: 'ENG-3.B.4',
                    },
                    {
                      label:
                        'ENG-3.B.5 Availability, price, and governmental regulations influence which energy sources people use and how they use them.',
                      value: 'ENG-3.B.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.3 Fuel Types and Uses',
              value: 'fuelTypesAndUses',
              learningObjectives: [
                {
                  label: 'ENG-3.C Identify types of fuels and their uses.',
                  value: 'ENG-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.C.1 Wood is commonly used as fuel in the forms of firewood and charcoal. It is often used in developing countries because it is easily accessible.',
                      value: 'ENG-3.C.1',
                    },
                    {
                      label:
                        'ENG-3.C.2 Peat is partially decomposed organic material that can be burned for fuel.',
                      value: 'ENG-3.C.2',
                    },
                    {
                      label:
                        'ENG-3.C.3 Three types of coal used for fuel are lignite, bituminous, and anthracite. Heat, pressure, and depth of burial contribute to the development of various coal types and their qualities.',
                      value: 'ENG-3.C.3',
                    },
                    {
                      label:
                        'ENG-3.C.4 Natural gas, the cleanest of the fossil fuels, is mostly methane.',
                      value: 'ENG-3.C.4',
                    },
                    {
                      label:
                        'ENG-3.C.5 Crude oil can be recovered from tar sands, which are a combination of clay, sand, water, and bitumen.',
                      value: 'ENG-3.C.5',
                    },
                    {
                      label:
                        'ENG-3.C.6 Fossil fuels can be made into specific fuel types for specialized uses (e.g., in motor vehicles).',
                      value: 'ENG-3.C.6',
                    },
                    {
                      label:
                        'ENG-3.C.7 Cogeneration occurs when a fuel source is used to generate both useful heat and electricity.',
                      value: 'ENG-3.C.7',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.4 Distribution of Natural Energy Resources',
              value: 'distributionOfNaturalEnergyResources',
              learningObjectives: [
                {
                  label:
                    'ENG-3.D Identify where natural energy resources occur.',
                  value: 'ENG-3.D',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.D.1 The global distribution of natural energy resources, such as ores, coal, crude oil, and gas, is not uniform and depends on regions’ geologic history.',
                      value: 'ENG-3.D.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.5 Fossil Fuels',
              value: 'fossilFuels',
              learningObjectives: [
                {
                  label:
                    'ENG-3.E Describe the use and methods of fossil fuels in power generation.',
                  value: 'ENG-3.E',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.E.1 The combustion of fossil fuels is a chemical reaction between the fuel and oxygen that yields carbon dioxide and water and releases energy.',
                      value: 'ENG-3.E.1',
                    },
                    {
                      label:
                        'ENG-3.E.2 Energy from fossil fuels is produced by burning those fuels to generate heat, which then turns water into steam. That steam turns a turbine, which generates electricity.',
                      value: 'ENG-3.E.2',
                    },
                    {
                      label:
                        'ENG-3.E.3 Humans use a variety of methods to extract fossil fuels from the earth for energy generation. ',
                      value: 'ENG-3.E.3',
                    },
                  ],
                },
                {
                  label:
                    'ENG-3.F Describe the effects of fossil fuels on the environment.',
                  value: 'ENG-3.F',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.F.1 Hydrologic fracturing (fracking) can cause groundwater contamination and the release of volatile organic compounds.',
                      value: 'ENG-3.F.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.6 Nuclear Power',
              value: 'nuclearPower',
              learningObjectives: [
                {
                  label:
                    'ENG-3.G Describe the use of nuclear energy in power generation.',
                  value: 'ENG-3.G',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.G.1 Nuclear power is generated through fission, where atoms of Uranium-235, which are stored in fuel rods, are split into smaller parts after being struck by a neutron. Nuclear fission releases a large amount of heat, which is used to generate steam, which powers a turbine and generates electricity.',
                      value: 'ENG-3.G.1',
                    },
                    {
                      label:
                        'ENG-3.G.2 Radioactivity occurs when the nucleus of a radioactive isotope loses energy by emitting radiation.',
                      value: 'ENG-3.G.2',
                    },
                    {
                      label:
                        'ENG-3.G.3 Uranium-235 remains radioactive for a long time, which leads to the problems associated with the disposal of nuclear waste.',
                      value: 'ENG-3.G.3',
                    },
                    {
                      label:
                        'ENG-3.G.4 Nuclear power generation is a nonrenewable energy source. Nuclear power is considered a cleaner energy source because it does not produce air pollutants, but it does release thermal pollution and hazardous solid waste.',
                      value: 'ENG-3.G.4',
                    },
                  ],
                },
                {
                  label:
                    'ENG-3.H Describe the effects of the use of nuclear energy on the environment.',
                  value: 'ENG-3.H',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.H.1 Three Mile Island, Chernobyl, and Fukushima are three cases where accidents or natural disasters led to the release of radiation. These releases have had short- and long-term impacts on the environment.',
                      value: 'ENG-3.H.1',
                    },
                    {
                      label:
                        'ENG-3.H.2 A radioactive element’s half-life can be used to calculate a variety of things, including the rate of decay and the radioactivity level at specific points in time.',
                      value: 'ENG-3.H.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.7 Energy from Biomass',
              value: 'energyFromBiomass',
              learningObjectives: [
                {
                  label:
                    'ENG-3.I Describe the effects of the use of biomass in power generation on the environment.',
                  value: 'ENG-3.I',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-1.I.1 Burning of biomass produces heat for energy at a relatively low cost, but it also produces carbon dioxide, carbon monoxide, nitrogen oxides, particulates, and volatile organic compounds. The overharvesting of trees for fuel also causes deforestation.',
                      value: 'ENG-1.I.1',
                    },
                    {
                      label:
                        'ENG-3.I.2 Ethanol can be used as a substitute for gasoline. Burning ethanol does not introduce additional carbon into the atmosphere via combustion, but the energy return on energy investment for ethanol is low.',
                      value: 'ENG-3.I.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.8 Solar Energy',
              value: 'solarEnergy',
              learningObjectives: [
                {
                  label:
                    'ENG-3.J Describe the use of solar energy in power generation.',
                  value: 'ENG-3.J',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.J.1 Photovoltaic solar cells capture light energy from the sun and transform it directly into electrical energy. Their use is limited by the availability of sunlight.',
                      value: 'ENG-3.J.1',
                    },
                    {
                      label:
                        'ENG-3.J.2 Active solar energy systems use solar energy to heat a liquid through mechanical and electric equipment to collect and store the energy captured from the sun.',
                      value: 'ENG-3.J.2',
                    },
                    {
                      label:
                        'ENG-3.J.3 Passive solar energy systems absorb heat directly from the sun without the use of mechanical and electric equipment, and energy cannot be collected or stored.',
                      value: 'ENG-3.J.3',
                    },
                  ],
                },
                {
                  label:
                    'ENG-3.K Describe the effects of the use of solar energy in power generation on the environment.',
                  value: 'ENG-3.K',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.K.1 Solar energy systems have low environmental impact and produce clean energy, but they can be expensive. Large solar energy farms may negatively impact desert ecosystems.',
                      value: 'ENG-3.K.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.9 Hydroelectric Power',
              value: 'hydroelectricPower',
              learningObjectives: [
                {
                  label:
                    'ENG-3.L Describe the use of hydroelectricity in power generation.',
                  value: 'ENG-3.L',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.L.1 Hydroelectric power can be generated in several ways. Dams built across rivers collect water in reservoirs. The moving water can be used to spin a turbine. Turbines can also be placed in small rivers, where the flowing water spins the turbine.',
                      value: 'ENG-3.L.1',
                    },
                    {
                      label:
                        'ENG-3.L.2 Tidal energy uses the energy produced by tidal flows to turn a turbine.',
                      value: 'ENG-3.L.2',
                    },
                  ],
                },
                {
                  label:
                    'ENG-3.M Describe the effects of the use of hydroelectricity in power generation on the environment.',
                  value: 'ENG-3.M',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.M.1 Hydroelectric power does not generate air pollution or waste, but construction of the power plants can be expensive, and there may be a loss of or change in habitats following the construction of dams.',
                      value: 'ENG-3.M.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.10 Geothermal Energy',
              value: 'geothermalEnergy',
              learningObjectives: [
                {
                  label:
                    'ENG-3.N Describe the use of geothermal energy in power generation.',
                  value: 'ENG-3.N',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.N.1 Geothermal energy is obtained by using the heat stored in the Earth’s interior to heat up water, which is brought back to the surface as steam. The steam is used to drive an electric generator.',
                      value: 'ENG-3.N.1',
                    },
                  ],
                },
                {
                  label:
                    'ENG-3.O Describe the effects of the use of geothermal energy in power generation on the environment.',
                  value: 'ENG-3.O',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.O.1 The cost of accessing geothermal energy can be prohibitively expensive, as is not easily accessible in many parts of the world. In addition, it can cause the release of hydrogen sulfide.',
                      value: 'ENG-3.O.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.11 Hydrogen Fuel Cell',
              value: 'hydrogenFuelCell',
              learningObjectives: [
                {
                  label:
                    'ENG-3.P Describe the use of hydrogen fuel cells in power generation.',
                  value: 'ENG-3.P',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.P.1 Hydrogen fuel cells are an alternate to nonrenewable fuel sources. They use hydrogen as fuel, combining the hydrogen and oxygen in the air to form water and release energy (electricity) in the process. Water is the product (emission) of a fuel cell. ',
                      value: 'ENG-3.P.1',
                    },
                  ],
                },
                {
                  label:
                    'ENG-3.Q Describe the effects of the use of hydrogen fuel cells in power generation on the environment.',
                  value: 'ENG-3.Q',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.Q.1 Hydrogen fuel cells have low environmental impact and produce no carbon dioxide when the hydrogen is produced from water. However, the technology is expensive and energy is still needed to create the hydrogen gas used in the fuel cell.',
                      value: 'ENG-3.Q.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.12 Wind Energy',
              value: 'windEnergy',
              learningObjectives: [
                {
                  label:
                    'ENG-3.R Describe the use of wind energy in power generation.',
                  value: 'ENG-3.R',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.R.1 Wind turbines use the kinetic energy of moving air to spin a turbine, which in turn converts the mechanical energy of the turbine into electricity.',
                      value: 'ENG-3.R.1',
                    },
                  ],
                },
                {
                  label:
                    'ENG-3.S Describe the effects of the use of wind energy in power generation on the environment.',
                  value: 'ENG-3.S',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.S.1 Wind energy is a renewable, clean source of energy. However, birds and bats may be killed if they fly into the spinning turbine blades.',
                      value: 'ENG-3.S.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 6.13 Energy Conservation',
              value: 'energyConservation',
              learningObjectives: [
                {
                  label: 'ERG-3.T Describe methods for conserving energy.',
                  value: 'ERG-3.T',
                  essentialKnowledge: [
                    {
                      label:
                        'ENG-3.T.1 Some of the methods for conserving energy around a home include adjusting the thermostat to reduce the use of heat and air conditioning, conserving water, use of energy-efficient appliances, and conservation landscaping.',
                      value: 'ENG-3.T.1',
                    },
                    {
                      label:
                        'ENG-3.T.2 Methods for conserving energy on a large scale include improving fuel economy for vehicles, using BEVs (battery electric vehicles) and hybrid vehicles, using public transportation, and implementing green building design features.',
                      value: 'ENG-3.T.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 7: Atmospheric Pollution',
          value: 'atmosphericPollution',
          topics: [
            {
              label: 'Topic 7.1 Introduction to Air Pollution',
              value: 'introductionToAirPollution',
              learningObjectives: [
                {
                  label:
                    'STB-2.A Identify the sources and effects of air pollutants.',
                  value: 'STB-2.A',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.A.1 Coal combustion releases air pollutants including carbon dioxide, sulfur dioxide, toxic metals, and particulates.',
                      value: 'STB-2.A.1',
                    },
                    {
                      label:
                        'STB-2.A.2 The combustion of fossil fuels releases nitrogen oxides into the atmosphere. They lead to the production of ozone, formation of photochemical smog, and convert to nitric acid in the atmosphere, causing acid rain. Other pollutants produced by fossil fuel combustion include carbon monoxide, hydrocarbons, and particulate matter.',
                      value: 'STB-2.A.2',
                    },
                    {
                      label:
                        'STB-2.A.3 Air quality can be affected through the release of sulfur dioxide during the burning of fossil fuels, mainly diesel fuels.',
                      value: 'STB-2.A.3',
                    },
                    {
                      label:
                        'STB-2.A.4 Through the Clean Air Act, the Environmental Protection Agency (EPA) regulated the use of lead, particularly in fuels, which dramatically decreased the amount of lead in the atmosphere.',
                      value: 'STB-2.A.4',
                    },
                    {
                      label:
                        'STB-2.A.5 Air pollutants can be primary or secondary pollutants.',
                      value: 'STB-2.A.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.2 Photochemical Smog',
              value: 'photochemicalSmog',
              learningObjectives: [
                {
                  label:
                    'STB-2.B Explain the causes and effects of photochemical smog and methods to reduce it.',
                  value: 'STB-2.B',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.B.1 Photochemical smog is formed when nitrogen oxides and volatile organic hydrocarbons react with heat and sunlight to produce a variety of pollutants.',
                      value: 'STB-2.B.1',
                    },
                    {
                      label:
                        'STB-2.B.2 Many environmental factors affect the formation of photochemical smog.',
                      value: 'STB-2.B.2',
                    },
                    {
                      label:
                        'STB-2.B.3 Nitrogen oxide is produced early in the day. Ozone concentrations peak in the afternoon and are higher in the summer because ozone is produced by chemical reactions between oxygen and sunlight.',
                      value: 'STB-2.B.3',
                    },
                    {
                      label:
                        'STB-2.B.4 Volatile Organic Compounds (VOCs), such as formaldehyde and gasoline, evaporate or sublimate at room temperature. Trees are a natural source of VOCs.',
                      value: 'STB-2.B.4',
                    },
                    {
                      label:
                        'STB-2.B.5 Photochemical smog often forms in urban areas because of the large number of motor vehicles there.',
                      value: 'STB-2.B.5',
                    },
                    {
                      label:
                        'STB-2.B.6 Photochemical smog can be reduced through the reduction of nitrogen oxide and VOCs.',
                      value: 'STB-2.B.6',
                    },
                    {
                      label:
                        'STB-2.B.7 Photochemical smog can harm human health in several ways, including causing respiratory problems and eye irritation.',
                      value: 'STB-2.B.7',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.3 Thermal Inversion',
              value: 'thermalInversion',
              learningObjectives: [
                {
                  label:
                    'STB-2.C Describe thermal inversion and its relationship with pollution.',
                  value: 'STB-2.C',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.C.1 During a thermal inversion, the normal temperature gradient in the atmosphere is altered as the air temperature at the Earth’s surface is cooler than the air at higher altitudes.',
                      value: 'STB-2.C.1',
                    },
                    {
                      label:
                        'STB-2.C.2 Thermal inversion traps pollution close to the ground, especially smog and particulates.',
                      value: 'STB-2.C.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.4 Atmospheric CO2 and Particulates',
              value: 'atmosphericCo2AndParticulates',
              learningObjectives: [
                {
                  label:
                    'STB-2.D Describe natural sources of CO2 and particulates.',
                  value: 'STB-2.D',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.D.1 CO2 appears naturally in the atmosphere from sources such as respiration, decomposition, and volcanic eruptions.',
                      value: 'STB-2.D.1',
                    },
                    {
                      label:
                        'STB-2.D.2 There are a variety of natural sources of particulate matter.',
                      value: 'STB-2.D.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.5 Indoor Air Pollutants',
              value: 'indoorAirPollutants',
              learningObjectives: [
                {
                  label: 'STB-2.E Identify indoor air pollutants.',
                  value: 'STB-2.E',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.E.1 Carbon monoxide is an indoor air pollutant that is classified as an asphyxiant.',
                      value: 'STB-2.E.1',
                    },
                    {
                      label:
                        'STB-2.E.2 Indoor air pollutants that are classified as particulates include asbestos, dust, and smoke.',
                      value: 'STB-2.E.2',
                    },
                    {
                      label:
                        'STB-2.E.3 Indoor air pollutants can come from natural sources, human-made sources, and combustion.',
                      value: 'STB-2.E.3',
                    },
                    {
                      label:
                        'STB-2.E.4 Common natural source indoor air pollutants include radon, mold, and dust.',
                      value: 'STB-2.E.4',
                    },
                    {
                      label:
                        'STB-2.E.5 Common human-made indoor air pollutants include insulation, Volatile Organic Compounds (VOCs) from furniture, paneling and carpets; formaldehyde from building materials, furniture, upholstery, and carpeting; and lead from paints.',
                      value: 'STB-2.E.5',
                    },
                    {
                      label:
                        'STB-2.E.6 Common combustion air pollutants include carbon monoxide, nitrogen oxides, sulfur dioxide, particulates, and tobacco smoke.',
                      value: 'STB-2.E.6',
                    },
                    {
                      label:
                        'STB-2.E.7 Radon-222 is a naturally occurring radioactive gas that is produced by the decay of uranium found in some rocks and soils.',
                      value: 'STB-2.E.7',
                    },
                  ],
                },
                {
                  label:
                    'STB-2.F Describe the effects of indoor air pollutants.',
                  value: 'STB-2.F',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.F.1 Radon gas can infiltrate homes as it moves up through the soil and enters homes via the basement or cracks in the walls or foundation. It is also dissolved in groundwater that enters homes through a well.',
                      value: 'STB-2.F.1',
                    },
                    {
                      label:
                        'STB-2.F.2 Exposure to radon gas can lead to radoninduced lung cancer, which is the second leading cause of lung cancer in America.',
                      value: 'STB-2.F.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.6 Reduction of Air Pollutants',
              value: 'reductionOfAirPollutants',
              learningObjectives: [
                {
                  label:
                    'STB-2.G Explain how air pollutants can be reduced at the source.',
                  value: 'STB-2.G',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.G.1 Methods to reduce air pollutants include regulatory practices, conservation practices, and alternative fuels.',
                      value: 'STB-2.G.1',
                    },
                    {
                      label:
                        'STB-2.G.2 A vapor recovery nozzle is an air pollution control device on a gasoline pump that prevents fumes from escaping into the atmosphere when fueling a motor vehicle.',
                      value: 'STB-2.G.2',
                    },
                    {
                      label:
                        'STB-2.G.3 A catalytic converter is an air pollution control device for internal combustion engines that converts pollutants (CO, NOx, and hydrocarbons) in exhaust into less harmful molecules (CO2, N2, O2, and H2O).',
                      value: 'STB-2.G.3',
                    },
                    {
                      label:
                        'STB-2.G.4 Wet and dry scrubbers are air pollution control devices that remove particulates and/or gases from industrial exhaust streams.',
                      value: 'STB-2.G.4',
                    },
                    {
                      label:
                        'STB-2.G.5 Methods to reduce air pollution from coalburning power plants include scrubbers and electrostatic precipitators.',
                      value: 'STB-2.G.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.7 Acid Rain',
              value: 'acidRain',
              learningObjectives: [
                {
                  label: 'STB-2.H Describe acid deposition.',
                  value: 'STB-2.H',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.H.1 Acid rain and deposition is due to nitrogen oxides and sulfur oxides from anthropogenic and natural sources in the atmosphere.',
                      value: 'STB-2.H.1',
                    },
                    {
                      label:
                        'STB-2.H.2 Nitric oxides that cause acid deposition come from motor vehicles and coal-burning power plants. Sulfur dioxides that cause acid deposition come from coal-burning power plants.',
                      value: 'STB-2.H.2',
                    },
                  ],
                },
                {
                  label:
                    'STB-2.I Describe the effects of acid deposition on the environment.',
                  value: 'STB-2.I',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.I.1 Acid deposition mainly affects communities that are downwind from coal-burning power plants.',
                      value: 'STB-2.I.1',
                    },
                    {
                      label:
                        'STB-2.I.2 Acid rain and deposition can lead to the acidification of soils and bodies of water and corrosion of human-made structures.',
                      value: 'STB-2.I.2',
                    },
                    {
                      label:
                        'STB-2.I.3 Regional differences in soils and bedrock affect the impact that acid deposition has on the region—such as limestone bedrock’s ability to neutralize the effect of acid rain on lakes and ponds.',
                      value: 'STB-2.I.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 7.8 Noise Pollution',
              value: 'noisePollution',
              learningObjectives: [
                {
                  label:
                    'STB-2.J Describe human activities that result in noise pollution and its effects.',
                  value: 'STB-2.J',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-2.J.1 Noise pollution is sound at levels high enough to cause physiological stress and hearing loss.',
                      value: 'STB-2.J.1',
                    },
                    {
                      label:
                        'STB-2.J.2 Sources of noise pollution in urban areas include transportation, construction, and domestic and industrial activity.',
                      value: 'STB-2.J.2',
                    },
                    {
                      label:
                        'STB-2.J.3 Some effects of noise pollution on animals in ecological systems include stress, the masking of sounds used to communicate or hunt, damaged hearing, and causing changes to migratory routes.',
                      value: 'STB-2.J.3',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 8: Aquatic and Terrestrial Pollution',
          value: 'aquaticAndTerrestrialPollution',
          topics: [
            {
              label: 'Topic 8.1 Sources of Pollution',
              value: 'sourcesOfPollution',
              learningObjectives: [
                {
                  label:
                    'STB-3.A Identify differences between point and nonpoint sources of pollution.',
                  value: 'STB-3.A',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.A.1 A point source refers to a single, identifiable source of a pollutant, such as a smokestack or waste discharge pipe.',
                      value: 'STB-3.A.1',
                    },
                    {
                      label:
                        'STB-3.A.2 Nonpoint sources of pollution are diffused and can therefore be difficult to identify, such as pesticide spraying or urban runoff.',
                      value: 'STB-3.A.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.2 Human Impacts on Ecosystems',
              value: 'humanImpactsOnEcosystems',
              learningObjectives: [
                {
                  label:
                    'STB-3.B Describe the impacts of human activities on aquatic ecosystems.',
                  value: 'STB-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.B.1 Organisms have a range of tolerance for various pollutants. Organisms have an optimum range for each factor where they can maintain homeostasis. Outside of this range, organisms may experience physiological stress, limited growth, reduced reproduction, and in extreme cases, death.',
                      value: 'STB-3.B.1',
                    },
                    {
                      label:
                        'STB-3.B.2 Coral reefs have been suffering damage due to a variety of factors, including increasing ocean temperature, sediment runoff, and destructive fishing practices.',
                      value: 'STB-3.B.2',
                    },
                    {
                      label:
                        'STB-3.B.3 Oil spills in marine waters cause organisms to die from the hydrocarbons in oil. Oil that floats on the surface of water can coat the feathers of birds and fur of marine mammals. Some components of oil sink to the ocean floor, killing some bottom-dwelling organisms.',
                      value: 'STB-3.B.3',
                    },
                    {
                      label:
                        'STB-3.B.4 Oil that washes up on the beach can have economic consequences on the fishing and tourism industries.',
                      value: 'STB-3.B.4',
                    },
                    {
                      label:
                        'STB-3.B.5 Oceanic dead zones are areas of low oxygen in the world’s oceans caused by increased nutrient pollution.',
                      value: 'STB-3.B.5',
                    },
                    {
                      label:
                        'STB-3.B.6 An oxygen sag curve is a plot of dissolved oxygen levels versus the distance from a source of pollution, usually excess nutrients and biological refuse.',
                      value: 'STB-3.B.6',
                    },
                    {
                      label:
                        'STB-3.B.7 Heavy metals used for industry, especially mining and burning of fossil fuels, can reach the groundwater, impacting the drinking water supply.',
                      value: 'STB-3.B.7',
                    },
                    {
                      label:
                        'STB-3.B.8 Litter that reaches aquatic ecosystems, besides being unsightly, can create intestinal blockage and choking hazards for wildlife and introduce toxic substances to the food chain.',
                      value: 'STB-3.B.8',
                    },
                    {
                      label:
                        'STB-3.B.9 Increased sediment in waterways can reduce light infiltration, which can affect primary producers and visual predators. Sediment can also settle, disrupting habitats.',
                      value: 'STB-3.B.9',
                    },
                    {
                      label:
                        'STB-3.B.10 When elemental sources of mercury enter aquatic environments, bacteria in the water convert it to highly toxic methylmercury.',
                      value: 'STB-3.B.10',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.3 Endocrine Disruptors',
              value: 'endocrineDisruptors',
              learningObjectives: [
                {
                  label: 'STB-3.C Describe endocrine disruptors.',
                  value: 'STB-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.C.1 Endocrine disruptors are chemicals that can interfere with the endocrine system of animals.',
                      value: 'STB-3.C.1',
                    },
                  ],
                },
                {
                  label:
                    'STB-3.D Describe the effects of endocrine disruptors on ecosystems.',
                  value: 'STB-3.D',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.D.1 Endocrine disruptors can lead to birth defects, developmental disorders, and gender imbalances in fish and other species.',
                      value: 'STB-3.D.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.4 Human Impacts on Wetlands and Mangroves',
              value: 'humanImpactsOnWetlandsAndMangroves',
              learningObjectives: [
                {
                  label:
                    'STB-3.E Describe the impacts of human activity on wetlands and mangroves.',
                  value: 'STB-3.E',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.E.1 Wetlands are areas where water covers the soil, either part or all of the time.',
                      value: 'STB-3.E.1',
                    },
                    {
                      label:
                        'STB-2.E.2 Wetlands provide a variety of ecological services, including water purification, flood protection, water filtration, and habitat.',
                      value: 'STB-2.E.2',
                    },
                    {
                      label:
                        'STB-3.E.3 Threats to wetlands and mangroves include commercial development, dam construction, overfishing, and pollutants from agriculture and industrial waste.',
                      value: 'STB-3.E.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.5 Eutrophication',
              value: 'eutrophication',
              learningObjectives: [
                {
                  label:
                    'STB-3.F Explain the environmental effects of excessive use of fertilizers and detergents on aquatic ecosystems.',
                  value: 'STB-3.F',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.F.1 Eutrophication occurs when a body of water is enriched in nutrients.',
                      value: 'STB-3.F.1',
                    },
                    {
                      label:
                        'STB-3.F.2 The increase in nutrients in eutrophic aquatic environments causes an algal bloom. When the algal bloom dies, microbes digest the algae, along with the oxygen in the water, leading to a decrease in the dissolved oxygen levels in the water. The lack of dissolved oxygen can result in large die-offs of fish and other aquatic organisms.',
                      value: 'STB-3.F.2',
                    },
                    {
                      label:
                        'STB-3.F.3 Hypoxic waterways are those bodies of water that are low in dissolved oxygen.',
                      value: 'STB-3.F.3',
                    },
                    {
                      label:
                        'STB-3.F.4 Compared to eutrophic waterways, oligotrophic waterways have very low amounts of nutrients, stable algae populations, and high dissolved oxygen.',
                      value: 'STB-3.F.4',
                    },
                    {
                      label:
                        'STB-3.F.5 Anthropogenic causes of eutrophication are agricultural runoff and wastewater release.',
                      value: 'STB-3.F.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.6 Thermal Pollution',
              value: 'thermalPollution',
              learningObjectives: [
                {
                  label:
                    'STB-3.G Describe the effects of thermal pollution on aquatic ecosystems.',
                  value: 'STB-3.G',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.G.1 Thermal pollution occurs when heat released into the water produces negative effects to the organisms in that ecosystem.',
                      value: 'STB-3.G.1',
                    },
                    {
                      label:
                        'STB-3.G.2 Variations in water temperature affect the concentration of dissolved oxygen because warm water does not contain as much oxygen as cold water.',
                      value: 'STB-3.G.2',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.7 Persistent Organic Pollutants (POPs)',
              value: 'persistentOrganicPollutantsPoPs',
              learningObjectives: [
                {
                  label:
                    'STB-3.H Describe the effect of persistent organic pollutants (POPs) on ecosystems.',
                  value: 'STB-3.H',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.H.1 Persistent organic pollutants (POPs) do not easily break down in the environment because they are synthetic, carbon-based molecules (such as DDT and PCBs).',
                      value: 'STB-3.H.1',
                    },
                    {
                      label:
                        'STB-3.H.2 Persistent organic pollutants (POPs) can be toxic to organisms because they are soluble in fat, which allows them to accumulate in organisms’ fatty tissues.',
                      value: 'STB-3.H.2',
                    },
                    {
                      label:
                        'STB-3.H.3 Persistent organic pollutants (POPs) can travel over long distances via wind and water before being redeposited.',
                      value: 'STB-3.H.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.8 Bioaccumulation and Biomagnification',
              value: 'bioaccumulationAndBiomagnification',
              learningObjectives: [
                {
                  label:
                    'STB-3.I Describe bioaccumulation and biomagnification.',
                  value: 'STB-3.I',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.I.1 Bioaccumulation is the selective absorption and concentration of elements or compounds by cells in a living organism, most commonly fat-soluble compounds.',
                      value: 'STB-3.I.1',
                    },
                    {
                      label:
                        'STB-3.I.2 Biomagnification is the increase in concentration of substances per unit of body tissue that occurs in successively higher trophic levels of a food chain or in a food web.',
                      value: 'STB-3.I.2',
                    },
                  ],
                },
                {
                  label:
                    'STB-3.J Describe the effects of bioaccumulation and biomagnification.',
                  value: 'STB-3.J',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.J.1 Some effects that can occur in an ecosystem when a persistent substance is biomagnified in a food chain include eggshell thinning and developmental deformities in top carnivores of the higher trophic levels.',
                      value: 'STB-3.J.1',
                    },
                    {
                      label:
                        'STB-3.J.2 Humans also experience harmful effects from biomagnification, including issues with the reproductive, nervous, and circulatory systems.',
                      value: 'STB-3.J.2',
                    },
                    {
                      label:
                        'STB-3.J.3 DDT, mercury, and PCBs are substances that bioaccumulate and have significant environmental impacts.',
                      value: 'STB-3.J.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.9 Solid Waste Disposal',
              value: 'solidWasteDisposal',
              learningObjectives: [
                {
                  label: 'STB-3.K Describe solid waste disposal methods.',
                  value: 'STB-3.K',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.K.1 Solid waste is any discarded material that is not a liquid or gas. It is generated in domestic, industrial, business, and agricultural sectors.',
                      value: 'STB-3.K.1',
                    },
                    {
                      label:
                        'STB-3.K.2 Solid waste is most often disposed of in landfills. Landfills can contaminate groundwater and release harmful gases.',
                      value: 'STB-3.K.2',
                    },
                    {
                      label:
                        'STB-3.K.3 Electronic waste, or e-waste, is composed of discarded electronic devices including televisions, cell phones, and computers.',
                      value: 'STB-3.K.3',
                    },
                    {
                      label:
                        'STB-3.K.4 A sanitary municipal landfill consists of a bottom liner (plastic or clay), a storm water collection system, a leachate collection system, a cap, and a methane collection system. ',
                      value: 'STB-3.K.4',
                    },
                  ],
                },
                {
                  label:
                    'STB-3.L Describe the effects of solid waste disposal methods.',
                  value: 'STB-3.L',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.L.1 Factors in landfill decomposition include the composition of the trash and conditions needed for microbial decomposition of the waste.',
                      value: 'STB-3.L.1',
                    },
                    {
                      label:
                        'STB-3.L.2 Solid waste can also be disposed of through incineration, where waste is burned at high temperatures. This method significantly reduces the volume of solid waste but releases air pollutants.',
                      value: 'STB-3.L.2',
                    },
                    {
                      label:
                        'STB-3.L.3 Some items are not accepted in sanitary landfills and may be disposed of illegally, leading to environmental problems. One example is used rubber tires, which when left in piles can become breeding grounds for mosquitoes that can spread disease.',
                      value: 'STB-3.L.3',
                    },
                    {
                      label:
                        'STB-3.L.4 Some countries dispose of their waste by dumping it in the ocean. This practice, along with other sources of plastic, has led to large floating islands of trash in the oceans. Additionally, wildlife can become entangled in the waste, as well as ingest it.',
                      value: 'STB-3.L.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.10 Waste Reduction Methods',
              value: 'wasteReductionMethods',
              learningObjectives: [
                {
                  label:
                    'STB-3.M Describe changes to current practices that could reduce the amount of generated waste and their associated benefits and drawbacks.',
                  value: 'STB-3.M',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.M.1 Recycling is a process by which certain solid waste materials are processed and converted into new products.',
                      value: 'STB-3.M.1',
                    },
                    {
                      label:
                        'STB-3.M.2 Recycling is one way to reduce the current global demand on minerals, but this process is energy-intensive and can be costly.',
                      value: 'STB-3.M.2',
                    },
                    {
                      label:
                        'STB-3.M.3 Composting is the process of organic matter such as food scraps, paper, and yard waste decomposing. The product of this decomposition can be used as fertilizer. Drawbacks to composting include odor and rodents.',
                      value: 'STB-3.M.3',
                    },
                    {
                      label:
                        'STB-3.M.4 E-waste can be reduced by recycling and reuse. E-wastes may contain hazardous chemicals, including heavy metals such as lead and mercury, which can leach from landfills into groundwater if they are not disposed of properly.',
                      value: 'STB-3.M.4',
                    },
                    {
                      label:
                        'STB-3.M.5 Landfill mitigation strategies range from burning waste for energy to restoring habitat on former landfills for use as parks.',
                      value: 'STB-3.M.5',
                    },
                    {
                      label:
                        'STB-3.M.6 The combustion of gases produced from decomposition of organic material in landfills can be used to turn turbines and generate electricity. This process reduces landfill volume.',
                      value: 'STB-3.M.6',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.11 Sewage Treatment',
              value: 'sewageTreatment',
              learningObjectives: [
                {
                  label: 'STB-3.N Describe best practices in sewage treatment.',
                  value: 'STB-3.N',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-3.N.1 Primary treatment of sewage is the physical removal of large objects, often through the use of screens and grates, followed by the settling of solid waste in the bottom of a tank.',
                      value: 'STB-3.N.1',
                    },
                    {
                      label:
                        'STB-3.N.2 Secondary treatment is a biological process in which bacteria break down organic matter into carbon dioxide and inorganic sludge, which settles in the bottom of a tank. The tank is aerated to increase the rate at which the bacteria break down the organic matter.',
                      value: 'STB-3.N.2',
                    },
                    {
                      label:
                        'STB-3.N.3 Tertiary treatment is the use of ecological or chemical processes to remove any pollutants left in the water after primary and secondary treatment.',
                      value: 'STB-3.N.3',
                    },
                    {
                      label:
                        'STB-3.N.4 Prior to discharge, the treated water is exposed to one or more disinfectants (usually, chlorine, ozone, or UV light) to kill bacteria.',
                      value: 'STB-3.N.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.12 Lethal Dose 50% (LD50)',
              value: 'lethalDose50Ld50',
              learningObjectives: [
                {
                  label: 'EIN-3.A Define lethal dose 50% (LD50).',
                  value: 'EIN-3.A',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-3.A.1 Lethal dose 50% (LD50) is the dose of a chemical that is lethal to 50% of the population of a particular species.',
                      value: 'EIN-3.A.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.13 Dose Response Curve',
              value: 'doseResponseCurve',
              learningObjectives: [
                {
                  label: 'EIN-3.B Evaluate dose response curves.',
                  value: 'EIN-3.B',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-3.B.1 A dose response curve describes the effect on an organism or mortality rate in a population based on the dose of a particular toxin or drug.',
                      value: 'EIN-3.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.14 Pollution and Human Health',
              value: 'pollutionAndHumanHealth',
              learningObjectives: [
                {
                  label:
                    'EIN-3.C Identify sources of human health issues that are linked to pollution.',
                  value: 'EIN-3.C',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-3.C.1 It can be difficult to establish a cause and effect between pollutants and human health issues because humans experience exposure to a variety of chemicals and pollutants.',
                      value: 'EIN-3.C.1',
                    },
                    {
                      label:
                        'EIN-3.C.2 Dysentery is caused by untreated sewage in streams and rivers.',
                      value: 'EIN-3.C.2',
                    },
                    {
                      label:
                        'EIN-3.C.3 Mesothelioma is a type of cancer caused mainly by exposure to asbestos.',
                      value: 'EIN-3.C.3',
                    },
                    {
                      label:
                        'EIN-3.C.4 Respiratory problems and overall lung function can be impacted by elevated levels of tropospheric ozone.',
                      value: 'EIN-3.C.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 8.15 Pathogens and Infectious Diseases',
              value: 'pathogensAndInfectiousDiseases',
              learningObjectives: [
                {
                  label:
                    'EIN-3.D Explain human pathogens and their cycling through the environment.',
                  value: 'EIN-3.D',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-3.D.1 Pathogens adapt to take advantage of new opportunities to infect and spread through human populations.',
                      value: 'EIN-3.D.1',
                    },
                    {
                      label:
                        'EIN-3.D.2 Specific pathogens can occur in many environments regardless of the appearance of sanitary conditions.',
                      value: 'EIN-3.D.2',
                    },
                    {
                      label:
                        'EIN-3.D.3 As equatorial-type climate zones spread north and south in to what are currently subtropical and temperate climate zones, pathogens, infectious diseases, and any associated vectors are spreading into these areas where the disease has not previously been known to occur.',
                      value: 'EIN-3.D.3',
                    },
                    {
                      label:
                        'EIN-3.D.4 Poverty-stricken, low-income areas often lack sanitary waste disposal and have contaminated drinking water supplies, leading to havens and opportunities for the spread of infectious diseases.',
                      value: 'EIN-3.D.4',
                    },
                    {
                      label:
                        'EIN-3.D.5 Plague is a disease carried by organisms infected with the plague bacteria. It is transferred to humans via the bite of an infected organism or through contact with contaminated fluids or tissues.',
                      value: 'EIN-3.D.5',
                    },
                    {
                      label:
                        'EIN-3.D.6 Tuberculosis is a bacterial infection that typically attacks the lungs. It is spread by breathing in the bacteria from the bodily fluids of an infected person.',
                      value: 'EIN-3.D.6',
                    },
                    {
                      label:
                        'EIN-3.D.7 Malaria is a parasitic disease caused by bites from infected mosquitoes. It is most often found in sub-Saharan Africa.',
                      value: 'EIN-3.D.7',
                    },
                    {
                      label:
                        'EIN-3.D.8 West Nile virus is transmitted to humans via bites from infected mosquitoes.',
                      value: 'EIN-3.D.8',
                    },
                    {
                      label:
                        'EIN-3.D.9 Severe acute respiratory syndrome (SARS) is a form of pneumonia. It is transferred by inhaling or touching infected fluids.',
                      value: 'EIN-3.D.9',
                    },
                    {
                      label:
                        'EIN-3.D.10 Middle East Respiratory Syndrome (MERS) is a viral respiratory illness that is transferred from animals to humans.',
                      value: 'EIN-3.D.10',
                    },
                    {
                      label:
                        'EIN-3.D.11 Zika is a virus caused by bites from infected mosquitoes. It can be transmitted through sexual contact.',
                      value: 'EIN-3.D.11',
                    },
                    {
                      label:
                        'EIN-3.D.12 Cholera is a bacterial disease that is contracted from infected water.',
                      value: 'EIN-3.D.12',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 9: Global Change',
          value: 'globalChange',
          topics: [
            {
              label: 'Topic 9.1 Stratospheric Ozone Depletion',
              value: 'stratosphericOzoneDepletion',
              learningObjectives: [
                {
                  label:
                    'STB-4.A Explain the importance of stratospheric ozone to life on Earth.',
                  value: 'STB-4.A',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.A.1 The stratospheric ozone layer is important to the evolution of life on Earth and the continued health and survival of life on Earth.',
                      value: 'STB-4.A.1',
                    },
                    {
                      label:
                        'STB-4.A.2 Stratospheric ozone depletion is caused by anthropogenic factors, such as chlorofluorocarbons (CFCs), and natural factors, such as the melting of ice crystals in the atmosphere at the beginning of the Antarctic spring.',
                      value: 'STB-4.A.2',
                    },
                    {
                      label:
                        'STB-4.A.3 A decrease in stratospheric ozone increases the UV rays that reach the Earth’s surface. Exposure to UV rays can lead to skin cancer and cataracts in humans.',
                      value: 'STB-4.A.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.2 Reducing Ozone Depletion',
              value: 'reducingOzoneDepletion',
              learningObjectives: [
                {
                  label:
                    'STB-4.B Describe chemicals used to substitute for chlorofluorocarbons (CFCs).',
                  value: 'STB-4.B',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.B.1 Ozone depletion can be mitigated by replacing ozone-depleting chemicals with substitutes that do not deplete the ozone layer. Hydrofluorocarbons (HFCs) are one such replacement, but some are strong greenhouse gases.',
                      value: 'STB-4.B.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.3 The Greenhouse Effect',
              value: 'theGreenhouseEffect',
              learningObjectives: [
                {
                  label: 'STB-4.C Identify the greenhouse gases.',
                  value: 'STB-4.C',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.C.1 The principal greenhouse gases are carbon dioxide, methane, water vapor, nitrous oxide, and chlorofluorocarbons (CFCs).',
                      value: 'STB-4.C.1',
                    },
                    {
                      label:
                        'STB-4.C.2 While water vapor is a greenhouse gas, it doesn’t contribute significantly to global climate change because it has a short residence time in the atmosphere.',
                      value: 'STB-4.C.2',
                    },
                    {
                      label:
                        'STB-4.C.3 The greenhouse effect results in the surface temperature necessary for life on Earth to exist.',
                      value: 'STB-4.C.3',
                    },
                  ],
                },
                {
                  label:
                    'STB-4.D Identify the sources and potency of the greenhouse gases.',
                  value: 'STB-4.D',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.D.1 Carbon dioxide, which has a global warming potential (GWP) of 1, is used as a reference point for the comparison of different greenhouse gases and their impacts on global climate change. Chlorofluorocarbons (CFCs) have the highest GWP, followed by nitrous oxide, then methane.',
                      value: 'STB-4.D.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.4 Increases in the Greenhouse Gases',
              value: 'increasesInTheGreenhouseGases',
              learningObjectives: [
                {
                  label:
                    'STB-4.E Identify the threats to human health and the environment posed by an increase in greenhouse gases.',
                  value: 'STB-4.E',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.E.1 Global climate change, caused by excess greenhouse gases in the atmosphere, can lead to a variety of environmental problems including rising sea levels resulting from melting ice sheets and ocean water expansion, and disease vectors spreading from the tropics toward the poles. These problems can lead to changes in population dynamics and population movements in response.',
                      value: 'STB-4.E.1',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.5 Global Climate Change',
              value: 'globalClimateChange',
              learningObjectives: [
                {
                  label:
                    'STB-4.F Explain how changes in climate, both short- and longterm, impact ecosystems.',
                  value: 'STB-4.F',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.F.1 The Earth has undergone climate change throughout geologic time, with major shifts in global temperatures causing periods of warming and cooling as recorded with CO2 data and ice cores.',
                      value: 'STB-4.F.1',
                    },
                    {
                      label:
                        'STB-4.F.2 Effects of climate change include rising temperatures, melting permafrost and sea ice, rising sea levels, and displacement of coastal populations.',
                      value: 'STB-4.F.2',
                    },
                    {
                      label:
                        'STB-4.F.3 Marine ecosystems are affected by changes in sea level, some positively, such as in newly created habitats on now-flooded continental shelves, and some negatively, such as deeper communities that may no longer be in the photic zone of seawater.',
                      value: 'STB-4.F.3',
                    },
                    {
                      label:
                        'STB-4.F.4 Winds generated by atmospheric circulation help transport heat throughout the Earth. Climate change may change circulation patterns, as temperature changes may impact Hadley cells and the jet stream.',
                      value: 'STB-4.F.4',
                    },
                    {
                      label:
                        'STB-4.F.5 Oceanic currents, or the ocean conveyor belt, carry heat throughout the world. When these currents change, it can have a big impact on global climate, especially in coastal regions.',
                      value: 'STB-4.F.5',
                    },
                    {
                      label:
                        'STB-4.F.6 Climate change can affect soil through changes in temperature and rainfall, which can impact soil’s viability and potentially increase erosion.',
                      value: 'STB-4.F.6',
                    },
                    {
                      label:
                        'STB-4.F.7 Earth’s polar regions are showing faster response times to global climate change because ice and snow in these regions reflect the most energy back out to space, leading to a positive feedback loop.',
                      value: 'STB-4.F.7',
                    },
                    {
                      label:
                        'STB-4.F.8 As the Earth warms, this ice and snow melts, meaning less solar energy is radiated back into space and instead is absorbed by the Earth’s surface. This in turn causes more warming of the polar regions.',
                      value: 'STB-4.F.8',
                    },
                    {
                      label:
                        'STB-4.F.9 Global climate change response time in the Arctic is due to positive feedback loops involving melting sea ice and thawing tundra, and the subsequent release of greenhouse gases like methane.',
                      value: 'STB-4.F.9',
                    },
                    {
                      label:
                        'STB-4.F.10 One consequence of the loss of ice and snow in polar regions is the effect on species that depend on the ice for habitat and food.',
                      value: 'STB-4.F.10',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.6 Ocean Warming',
              value: 'oceanWarming',
              learningObjectives: [
                {
                  label:
                    'STB-4.G Explain the causes and effects of ocean warming.',
                  value: 'STB-4.G',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.G.1 Ocean warming is caused by the increase in greenhouse gases in the atmosphere.',
                      value: 'STB-4.G.1',
                    },
                    {
                      label:
                        'STB-4.G.2 Ocean warming can affect marine species in a variety of ways, including loss of habitat, and metabolic and reproductive changes.',
                      value: 'STB-4.G.2',
                    },
                    {
                      label:
                        'STB-4.G.3 Ocean warming is causing coral bleaching, which occurs when the loss of algae within corals cause the corals to bleach white. Some corals recover and some die.',
                      value: 'STB-4.G.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.7 Ocean Acidification',
              value: 'oceanAcidification',
              learningObjectives: [
                {
                  label:
                    'STB-4.H Explain the causes and effects of ocean acidification.',
                  value: 'STB-4.H',
                  essentialKnowledge: [
                    {
                      label:
                        'STB-4.H.1 Ocean acidification is the decrease in pH of the oceans, primarily due to increased CO2 concentrations in the atmosphere, and can be expressed as chemical equations.',
                      value: 'STB-4.H.1',
                    },
                    {
                      label:
                        'STB-4.H.2 As more CO2 is released into the atmosphere, the oceans, which absorb a large part of that CO2, become more acidic.',
                      value: 'STB-4.H.2',
                    },
                    {
                      label:
                        'STB-4.H.3 Anthropogenic activities that contribute to ocean acidification are those that lead to increased CO2 concentrations in the atmosphere: burning of fossil fuels, vehicle emissions, and deforestation.',
                      value: 'STB-4.H.3',
                    },
                    {
                      label:
                        'STB-4.H.4 Ocean acidification damages coral because acidification makes it difficult for them to form shells, due to the loss of calcium carbonate.',
                      value: 'STB-4.H.4',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.8 Invasive Species',
              value: 'invasiveSpecies',
              learningObjectives: [
                {
                  label:
                    'EIN-4.A Explain the environmental problems associated with invasive species and strategies to control them.',
                  value: 'EIN-4.A',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-4.A.1 Invasive species are species that can live, and sometimes thrive, outside of their normal habitat. Invasive species can sometimes be beneficial, but they are considered invasive when they threaten native species.',
                      value: 'EIN-4.A.1',
                    },
                    {
                      label:
                        'EIN-4.A.2 Invasive species are often generalist, r-selected species and therefore may outcompete native species for resources.',
                      value: 'EIN-4.A.2',
                    },
                    {
                      label:
                        'EIN-4.A.3 Invasive species can be controlled through a variety of human interventions.',
                      value: 'EIN-4.A.3',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.9 Endangered Species',
              value: 'endangeredSpecies',
              learningObjectives: [
                {
                  label:
                    'EIN-4.B Explain how species become endangered and strategies to combat the problem.',
                  value: 'EIN-4.B',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-4.B.1 A variety of factors can lead to a species becoming threatened with extinction, such as being extensively hunted, having limited diet, being outcompeted by invasive species, or having specific and limited habitat requirements.',
                      value: 'EIN-4.B.1',
                    },
                    {
                      label:
                        'EIN-4.B.2 Not all species will be in danger of extinction when exposed to the same changes in their ecosystem. Species that are able to adapt to changes in their environment or that are able to move to a new environment are less likely to face extinction.',
                      value: 'EIN-4.B.2',
                    },
                    {
                      label:
                        'EIN-4.B.3 Selective pressures are any factors that change the behaviors and fitness of organisms within an environment.',
                      value: 'EIN-4.B.3',
                    },
                    {
                      label:
                        'EIN-4.B.4 Species in a given ecosystem compete for resources like territory, food, mates, and habitat, and this competition may lead to endangerment or extinction.',
                      value: 'EIN-4.B.4',
                    },
                    {
                      label:
                        'EIN-4.B.5 Strategies to protect animal populations include criminalizing poaching, protecting animal habitats, and legislation.',
                      value: 'EIN-4.B.5',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Topic 9.10 Human Impacts on Biodiversity',
              value: 'humanImpactsOnBiodiversity',
              learningObjectives: [
                {
                  label:
                    'EIN-4.C Explain how human activities affect biodiversity and strategies to combat the problem.',
                  value: 'EIN-4.C',
                  essentialKnowledge: [
                    {
                      label:
                        'EIN-4.C.1 HIPPCO (habitat destruction, invasive species, population growth, pollution, climate change, and over exploitation) describes the main factors leading to a decrease in biodiversity.',
                      value: 'EIN-4.C.1',
                    },
                    {
                      label:
                        'EIN-4.C.2 Habitat fragmentation occurs when large habitats are broken into smaller, isolated areas. Causes of habitat fragmentation include the construction of roads and pipelines, clearing for agriculture or development, and logging.',
                      value: 'EIN-4.C.2',
                    },
                    {
                      label:
                        'EIN-4.C.3 The scale of habitat fragmentation that has an adverse effect on the inhabitants of a given ecosystem will vary from species to species within that ecosystem.',
                      value: 'EIN-4.C.3',
                    },
                    {
                      label:
                        'EIN-4.C.4 Global climate change can cause habitat loss via changes in temperature, precipitation, and sea level rise.',
                      value: 'EIN-4.C.4',
                    },
                    {
                      label:
                        'EIN-4.C.5 Some organisms have been somewhat or completely domesticated and are now managed for economic returns, such as honeybee colonies and domestic livestock. This domestication can have a negative impact on the biodiversity of that organism.',
                      value: 'EIN-4.C.5',
                    },
                    {
                      label:
                        'EIN-4.C.6 Some ways humans can mitigate the impact of loss of biodiversity include creating protected areas, use of habitat corridors, promoting sustainable land use practices, and restoring lost habitats.',
                      value: 'EIN-4.C.6',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'BI Biology',
      value: 'biBiology',
    },
    {
      label: 'BI Environmental Science',
      value: 'biEnvironmentalScience',
    },
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
          subDisciplines: [
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
          headding: 'Overarching Principles',
          explanatoryItems: [
            'Biological structures exist at all levels of organization, from molecules to ecosystems. A structure’s physical and chemical characteristics influence its interactions with other structures, and therefore its function.',
            'Natural selection leads to the evolution of structures that tend to increase fitness within the context of evolutionary, developmental, and environmental constraints.',
          ],
          subDisciplines: [
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
          subDisciplines: [
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
          subDisciplines: [
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
          subDisciplines: [
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
    },
  ],
}

module.exports = metadata

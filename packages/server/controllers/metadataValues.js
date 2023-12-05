const metadata = {
  topics: [
    {
      label: 'Biochemistry & Molecular Biology',
      value: 'biochemistryMolecularBiology',
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
      subtopics: [
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
            label: 'Apply (higher-order)',
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
            label: 'Understand',
            value: 'lower-understand',
          },
          {
            label: 'Apply (lower-order)',
            value: 'lower-apply',
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
      label: 'IB Biology',
      value: 'biBiology',
      units: [
        {
          label: 'Unit 1: Cell biology',
          value: 'cellBiology',
          topics: [
            {
              label: 'Topic 1.1 Introduction to cells',
              value: 'introductionToCells',
              applications: [
                {
                  label:
                    'Questioning the cell theory using atypical examples, including striated muscle, giant algae and aseptate fungal hyphae.',
                  value: 'IBB-A1.1.1',
                },
                {
                  label:
                    'Investigation of functions of life in Paramecium and one named photosynthetic unicellular organism.',
                  value: 'IBB-A1.1.2',
                },
                {
                  label:
                    'Use of stem cells to treat Stargardt’s disease and one other named condition.',
                  value: 'IBB-A1.1.3',
                },
                {
                  label:
                    'Ethics of the therapeutic use of stem cells from specially created embryos, from the umbilical cord blood of a new-born baby and from an adult’s own tissues.',
                  value: 'IBB-A1.1.4',
                },
              ],
              skills: [
                {
                  label:
                    'Use of a light microscope to investigate the structure of cells and tissues, with drawing of cells. Calculation of the magnification of drawings and the actual size of structures and ultrastructures shown in drawings or micrographs. (Practical 1)',
                  value: 'IBB-S1.1.1',
                },
              ],
              understandings: [
                {
                  label:
                    'According to the cell theory, living organisms are composed of cells.',
                  value: 'IBB-U1.1.1',
                },
                {
                  label:
                    'Organisms consisting of only one cell carry out all functions of life in that cell.',
                  value: 'IBB-U1.1.2',
                },
                {
                  label:
                    'Surface area to volume ratio is important in the limitation of cell size.',
                  value: 'IBB-U1.1.3',
                },
                {
                  label:
                    'Multicellular organisms have properties that emerge from the interaction of their cellular components.',
                  value: 'IBB-U1.1.4',
                },
                {
                  label:
                    'Specialized tissues can develop by cell differentiation in multicellular organisms.',
                  value: 'IBB-U1.1.5',
                },
                {
                  label:
                    'Differentiation involves the expression of some genes and not others in a cell’s genome.',
                  value: 'IBB-U1.1.6',
                },
                {
                  label:
                    'The capacity of stem cells to divide and differentiate along different pathways is necessary in embryonic development and also makes stem cells suitable for therapeutic uses.',
                  value: 'IBB-U1.1.7',
                },
              ],
            },
            {
              label: 'Topic 1.2 Ultrastructure of cells',
              value: 'ultrastructureOfCells',
              applications: [
                {
                  label:
                    'Structure and function of organelles within exocrine gland cells of the pancreas and within palisade mesophyll cells of the leaf.',
                  value: 'IBB-A1.2.1',
                },
                {
                  label: 'Prokaryotes divide by binary fission.',
                  value: 'IBB-A1.2.2',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing of the ultrastructure of prokaryotic cells based on electron micrographs.',
                  value: 'IBB-S1.2.1',
                },
                {
                  label:
                    'Drawing of the ultrastructure of eukaryotic cells based on electron micrographs.',
                  value: 'IBB-S1.2.2',
                },
                {
                  label:
                    'Interpretation of electron micrographs to identify organelles and deduce the function of specialized cells.',
                  value: 'IBB-S1.2.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Prokaryotes have a simple cell structure without compartmentalization.',
                  value: 'IBB-U1.2.1',
                },
                {
                  label: 'Eukaryotes have a compartmentalized cell structure.',
                  value: 'IBB-U1.2.2',
                },
                {
                  label:
                    'Electron microscopes have a much higher resolution than light microscopes.',
                  value: 'IBB-U1.2.3',
                },
              ],
            },
            {
              label: 'Topic 1.3 Membrane structure',
              value: 'membraneStructure',
              applications: [
                {
                  label:
                    'Cholesterol in mammalian membranes reduces membrane fluidity and permeability to some solutes.',
                  value: 'IBB-A1.3.1',
                },
              ],
              skills: [
                {
                  label: 'Drawing of the fluid mosaic model.',
                  value: 'IBB-S1.3.1',
                },
                {
                  label:
                    'Analysis of evidence from electron microscopy that led to the proposal of the Davson-Danielli model.',
                  value: 'IBB-S1.3.2',
                },
                {
                  label:
                    'Analysis of the falsification of the Davson-Danielli model that led to the Singer-Nicolson model.',
                  value: 'IBB-S1.3.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Phospholipids form bilayers in water due to the amphipathic properties of phospholipid molecules.',
                  value: 'IBB-U1.3.1',
                },
                {
                  label:
                    'Membrane proteins are diverse in terms of structure, position in the membrane and function.',
                  value: 'IBB-U1.3.2',
                },
                {
                  label: 'Cholesterol is a component of animal cell membranes.',
                  value: 'IBB-U1.3.3',
                },
              ],
            },
            {
              label: 'Topic 1.4 Membrane transport',
              value: 'membraneTransport',
              applications: [
                {
                  label:
                    'Structure and function of sodium–potassium pumps for active transport and potassium channels for facilitated diffusion in axons.',
                  value: 'IBB-A1.4.1',
                },
                {
                  label:
                    'Tissues or organs to be used in medical procedures must be bathed in a solution with the same osmolarity as the cytoplasm to prevent osmosis.',
                  value: 'IBB-A1.4.2',
                },
              ],
              skills: [
                {
                  label:
                    'Estimation of osmolarity in tissues by bathing samples in hypotonic and hypertonic solutions. (Practical 2)',
                  value: 'IBB-S1.4.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Particles move across membranes by simple diffusion, facilitated diffusion, osmosis and active transport.',
                  value: 'IBB-U1.4.1',
                },
                {
                  label:
                    'The fluidity of membranes allows materials to be taken into cells by endocytosis or released by exocytosis. Vesicles move materials within cells.',
                  value: 'IBB-U1.4.2',
                },
              ],
            },
            {
              label: 'Topic 1.5 The origin of cells',
              value: 'originOfCells',
              applications: [
                {
                  label:
                    'Evidence from Pasteur’s experiments that spontaneous generation of cells and organisms does not now occur on Earth.',
                  value: 'IBB-A1.5.1',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Cells can only be formed by division of pre-existing cells.',
                  value: 'IBB-U1.5.1',
                },
                {
                  label:
                    'The first cells must have arisen from non-living material.',
                  value: 'IBB-U1.5.2',
                },
                {
                  label:
                    'The origin of eukaryotic cells can be explained by the endosymbiotic theory.',
                  value: 'IBB-U1.5.3',
                },
              ],
            },
            {
              label: 'Topic 1.6 Cell division ',
              value: 'cellDivision',
              applications: [
                {
                  label:
                    'The correlation between smoking and incidence of cancers.',
                  value: 'IBB-A1.6.1',
                },
              ],
              skills: [
                {
                  label:
                    'Identification of phases of mitosis in cells viewed with a microscope or in a micrograph.',
                  value: 'IBB-S1.6.1',
                },
                {
                  label: 'Determination of a mitotic index from a micrograph.',
                  value: 'IBB-S1.6.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Mitosis is division of the nucleus into two genetically identical daughter nuclei.',
                  value: 'IBB-U1.6.1',
                },
                {
                  label: 'Chromosomes condense by supercoiling during mitosis.',
                  value: 'IBB-U1.6.2',
                },
                {
                  label:
                    'Cytokinesis occurs after mitosis and is different in plant and animal cells.',
                  value: 'IBB-U1.6.3',
                },
                {
                  label:
                    'Interphase is a very active phase of the cell cycle with many processes occurring in the nucleus and cytoplasm.',
                  value: 'IBB-U1.6.4',
                },
                {
                  label:
                    'Cyclins are involved in the control of the cell cycle.',
                  value: 'IBB-U1.6.5',
                },
                {
                  label:
                    'Mutagens, oncogenes and metastasis are involved in the development of primary and secondary tumours.',
                  value: 'IBB-U1.6.6',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 2: Molecular biology',
          value: 'molecularBiology',
          topics: [
            {
              label: 'Topic 2.1 Molecules to metabolism',
              value: 'moleculesToMetabolism',
              applications: [
                {
                  label:
                    'Urea as an example of a compound that is produced by living organisms but can also be artificially synthesized.',
                  value: 'IBB-A2.1.1',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing molecular diagrams of glucose, ribose, a saturated fatty acid and a generalized amino acid.',
                  value: 'IBB-S2.1.1',
                },
                {
                  label:
                    'Identification of biochemicals such as sugars, lipids or amino acids from molecular diagrams.',
                  value: 'IBB-S2.1.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Molecular biology explains living processes in terms of the chemical substances involved.',
                  value: 'IBB-U2.1.1',
                },
                {
                  label:
                    'Carbon atoms can form four covalent bonds allowing a diversity of stable compounds to exist.',
                  value: 'IBB-U2.1.2',
                },
                {
                  label:
                    'Life is based on carbon compounds including carbohydrates, lipids, proteins and nucleic acids.',
                  value: 'IBB-U2.1.3',
                },
                {
                  label:
                    'Metabolism is the web of all the enzyme-catalysed reactions in a cell or organism.',
                  value: 'IBB-U2.1.4',
                },
                {
                  label:
                    'Anabolism is the synthesis of complex molecules from simpler molecules including the formation of macromolecules from monomers by condensation reactions.',
                  value: 'IBB-U2.1.5',
                },
                {
                  label:
                    'Catabolism is the breakdown of complex molecules into simpler molecules including the hydrolysis of macromolecules into monomers.',
                  value: 'IBB-U2.1.6',
                },
              ],
            },
            {
              label: 'Topic 2.2 Water',
              value: 'water',
              applications: [
                {
                  label:
                    'Comparison of the thermal properties of water with those of methane.',
                  value: 'IBB-A2.2.1',
                },
                {
                  label: 'Use of water as a coolant in sweat.',
                  value: 'IBB-A2.2.2',
                },
                {
                  label:
                    'Modes of transport of glucose, amino acids, cholesterol, fats, oxygen and sodium chloride in blood in relation to their solubility in water.',
                  value: 'IBB-A2.2.3',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Water molecules are polar and hydrogen bonds form between them.',
                  value: 'IBB-U2.2.1',
                },
                {
                  label:
                    'Hydrogen bonding and dipolarity explain the cohesive, adhesive, thermal and solvent properties of water.',
                  value: 'IBB-U2.2.2',
                },
                {
                  label: 'Substances can be hydrophilic or hydrophobic.',
                  value: 'IBB-U2.2.3',
                },
              ],
            },
            {
              label: 'Topic 2.3 Carbohydrates and lipids',
              value: 'carbohydratesAndLipids',
              applications: [
                {
                  label:
                    'Structure and function of cellulose and starch in plants and glycogen in humans.',
                  value: 'IBB-A2.3.1',
                },
                {
                  label:
                    'Scientific evidence for health risks of trans fats and saturated fatty acids.',
                  value: 'IBB-A2.3.2',
                },
                {
                  label:
                    'Lipids are more suitable for long-term energy storage in humans than carbohydrates.',
                  value: 'IBB-A2.3.3',
                },
                {
                  label:
                    'Evaluation of evidence and the methods used to obtain the evidence for health claims made about lipids.',
                  value: 'IBB-A2.3.4',
                },
              ],
              skills: [
                {
                  label:
                    'Use of molecular visualization software to compare cellulose, starch and glycogen.',
                  value: 'IBB-S2.3.1',
                },
                {
                  label:
                    'Determination of body mass index by calculation or use of a nomogram.',
                  value: 'IBB-S2.3.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Monosaccharide monomers are linked together by condensation reactions to form disaccharides and polysaccharide polymers.',
                  value: 'IBB-U2.3.1',
                },
                {
                  label:
                    'Fatty acids can be saturated, monounsaturated or polyunsaturated.',
                  value: 'IBB-U2.3.2',
                },
                {
                  label: 'Unsaturated fatty acids can be cis or trans isomers.',
                  value: 'IBB-U2.3.3',
                },
                {
                  label:
                    'Triglycerides are formed by condensation from three fatty acids and one glycerol.',
                  value: 'IBB-U2.3.4',
                },
              ],
            },
            {
              label: 'Topic 2.4 Proteins',
              value: 'proteins',
              applications: [
                {
                  label:
                    'Rubisco, insulin, immunoglobulins, rhodopsin, collagen and spider silk as examples of the range of protein functions.',
                  value: 'IBB-A2.4.1',
                },
                {
                  label:
                    'Denaturation of proteins by heat or by deviation of pH from the optimum.',
                  value: 'IBB-A2.4.2',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing molecular diagrams to show the formation of a peptide bond.',
                  value: 'IBB-S2.4.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Amino acids are linked together by condensation to form polypeptides.',
                  value: 'IBB-U2.4.1',
                },
                {
                  label:
                    'There are 20 different amino acids in polypeptides synthesized on ribosomes.',
                  value: 'IBB-U2.4.2',
                },
                {
                  label:
                    'Amino acids can be linked together in any sequence giving a huge range of possible polypeptides.',
                  value: 'IBB-U2.4.3',
                },
                {
                  label:
                    'The amino acid sequence of polypeptides is coded for by genes.',
                  value: 'IBB-U2.4.4',
                },
                {
                  label:
                    'A protein may consist of a single polypeptide or more than one polypeptide linked together.',
                  value: 'IBB-U2.4.5',
                },
                {
                  label:
                    'The amino acid sequence determines the three-dimensional conformation of a protein.',
                  value: 'IBB-U2.4.6',
                },
                {
                  label:
                    'Living organisms synthesize many different proteins with a wide range of functions.',
                  value: 'IBB-U2.4.7',
                },
                {
                  label: 'Every individual has a unique proteome.',
                  value: 'IBB-U2.4.8',
                },
              ],
            },
            {
              label: 'Topic 2.5 Enzymes',
              value: 'enzymes',
              applications: [
                {
                  label:
                    'Methods of production of lactose-free milk and its advantages.',
                  value: 'IBB-A2.5.1',
                },
              ],
              skills: [
                {
                  label:
                    'Design of experiments to test the effect of temperature, pH and substrate concentration on the activity of enzymes.',
                  value: 'IBB-S2.5.1',
                },
                {
                  label:
                    'Experimental investigation of a factor affecting enzyme activity. (Practical 3)',
                  value: 'IBB-S2.5.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Enzymes have an active site to which specific substrates bind.',
                  value: 'IBB-U2.5.1',
                },
                {
                  label:
                    'Enzyme catalysis involves molecular motion and the collision of substrates with the active site.',
                  value: 'IBB-U2.5.2',
                },
                {
                  label:
                    'Temperature, pH and substrate concentration affect the rate of activity of enzymes.',
                  value: 'IBB-U2.5.3',
                },
                {
                  label: 'Enzymes can be denatured.',
                  value: 'IBB-U2.5.4',
                },
                {
                  label: 'Immobilized enzymes are widely used in industry.',
                  value: 'IBB-U2.5.5',
                },
              ],
            },
            {
              label: 'Topic 2.6 Structure of DNA and RNA',
              value: 'structureOfDnaAndRna',
              applications: [
                {
                  label:
                    'Crick and Watson’s elucidation of the structure of DNA using model making.',
                  value: 'IBB-A2.6.1',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing simple diagrams of the structure of single nucleotides of DNA and RNA, using circles, pentagons and rectangles to represent phosphates, pentoses and bases.',
                  value: 'IBB-S2.6.1',
                },
              ],
              understandings: [
                {
                  label:
                    'The nucleic acids DNA and RNA are polymers of nucleotides.',
                  value: 'IBB-U2.6.1',
                },
                {
                  label:
                    'DNA differs from RNA in the number of strands present, the base composition and the type of pentose.',
                  value: 'IBB-U2.6.2',
                },
                {
                  label:
                    'DNA is a double helix made of two antiparallel strands of nucleotides linked by hydrogen bonding between complementary base pairs.',
                  value: 'IBB-U2.6.3',
                },
              ],
            },
            {
              label: 'Topic 2.7 DNA replication, transcription and translation',
              value: 'DnaReplicationTranscriptionAndTranslation',
              applications: [
                {
                  label:
                    'Use of Taq DNA polymerase to produce multiple copies of DNA rapidly by the polymerase chain reaction (PCR).',
                  value: 'IBB-A2.7.1',
                },
                {
                  label:
                    'Production of human insulin in bacteria as an example of the universality of the genetic code allowing gene transfer between species.',
                  value: 'IBB-A2.7.2',
                },
              ],
              skills: [
                {
                  label:
                    'Use a table of the genetic code to deduce which codon(s) corresponds to which amino acid.',
                  value: 'IBB-S2.7.1',
                },
                {
                  label:
                    'Analysis of Meselson and Stahl’s results to obtain support for the theory of semi-conservative replication of DNA.',
                  value: 'IBB-S2.7.2',
                },
                {
                  label:
                    'Use a table of mRNA codons and their corresponding amino acids to deduce the sequence of amino acids coded by a short mRNA strand of known base sequence.',
                  value: 'IBB-S2.7.3',
                },
                {
                  label: 'Deducing the DNA base sequence for the mRNA strand.',
                  value: 'IBB-S2.7.4',
                },
              ],
              understandings: [
                {
                  label:
                    'The replication of DNA is semi-conservative and depends on complementary base pairing.',
                  value: 'IBB-U2.7.1',
                },
                {
                  label:
                    'Helicase unwinds the double helix and separates the two strands by breaking hydrogen bonds.',
                  value: 'IBB-U2.7.2',
                },
                {
                  label:
                    'DNA polymerase links nucleotides together to form a new strand, using the pre-existing strand as a template.',
                  value: 'IBB-U2.7.3',
                },
                {
                  label:
                    'Transcription is the synthesis of mRNA copied from the DNA base sequences by RNA polymerase.',
                  value: 'IBB-U2.7.4',
                },
                {
                  label:
                    'Translation is the synthesis of polypeptides on ribosomes.',
                  value: 'IBB-U2.7.5',
                },
                {
                  label:
                    'The amino acid sequence of polypeptides is determined by mRNA according to the genetic code.',
                  value: 'IBB-U2.7.6',
                },
                {
                  label:
                    'Codons of three bases on mRNA correspond to one amino acid in a polypeptide.',
                  value: 'IBB-U2.7.7',
                },
                {
                  label:
                    'Translation depends on complementary base pairing between codons on mRNA and anticodons on tRNA.',
                  value: 'IBB-U2.7.8',
                },
              ],
            },
            {
              label: 'Topic 2.8 Cell respiration',
              value: 'cellRespiration',
              applications: [
                {
                  label:
                    'Use of anaerobic cell respiration in yeasts to produce ethanol and carbon dioxide in baking.',
                  value: 'IBB-A2.8.1',
                },
                {
                  label:
                    'Lactate production in humans when anaerobic respiration is used to maximize the power of muscle contractions.',
                  value: 'IBB-A2.8.2',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of results from experiments involving measurement of respiration rates in germinating seeds or invertebrates using a respirometer.',
                  value: 'IBB-S2.8.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Cell respiration is the controlled release of energy from organic compounds to produce ATP.',
                  value: 'IBB-U2.8.1',
                },
                {
                  label:
                    'ATP from cell respiration is immediately available as a source of energy in the cell.',
                  value: 'IBB-U2.8.2',
                },
                {
                  label:
                    'Anaerobic cell respiration gives a small yield of ATP from glucose.',
                  value: 'IBB-U2.8.3',
                },
                {
                  label:
                    'Aerobic cell respiration requires oxygen and gives a large yield of ATP from glucose.',
                  value: 'IBB-U2.8.4',
                },
              ],
            },
            {
              label: 'Topic 2.9 Photosynthesis',
              value: 'photosynthesis',
              applications: [
                {
                  label:
                    'Changes to the Earth’s atmosphere, oceans and rock deposition due to photosynthesis.',
                  value: 'IBB-A2.9.1',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing an absorption spectrum for chlorophyll and an action spectrum for photosynthesis.',
                  value: 'IBB-S2.9.1',
                },
                {
                  label:
                    'Design of experiments to investigate the effect of limiting factors on photosynthesis.',
                  value: 'IBB-S2.9.2',
                },
                {
                  label:
                    'Separation of photosynthetic pigments by chromatograph. (Practical 4)',
                  value: 'IBB-S2.9.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Photosynthesis is the production of carbon compounds in cells using light energy.',
                  value: 'IBB-U2.9.1',
                },
                {
                  label:
                    'Visible light has a range of wavelengths with violet the shortest wavelength and red the longest.',
                  value: 'IBB-U2.9.2',
                },
                {
                  label:
                    'Chlorophyll absorbs red and blue light most effectively and reflects green light more than other colours.',
                  value: 'IBB-U2.9.3',
                },
                {
                  label:
                    'Oxygen is produced in photosynthesis from the photolysis of water.',
                  value: 'IBB-U2.9.4',
                },
                {
                  label:
                    'Energy is needed to produce carbohydrates and other carbon compounds from carbon dioxide.',
                  value: 'IBB-U2.9.5',
                },
                {
                  label:
                    'Temperature, light intensity and carbon dioxide concentration are possible limiting factors on the rate of photosynthesis.',
                  value: 'IBB-U2.9.6',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 3: Genetics',
          value: 'genetics',
          topics: [
            {
              label: 'Topic 3.1 Genes',
              value: 'genes',
              applications: [
                {
                  label:
                    'The causes of sickle cell anemia, including a base substitution mutation, a change to the base sequence of mRNA transcribed from it and a change to the sequence of a polypeptide in hemoglobin.',
                  value: 'IBB-A3.1.1',
                },
                {
                  label:
                    'Comparison of the number of genes in humans with other species.',
                  value: 'IBB-A3.1.2',
                },
              ],
              skills: [
                {
                  label:
                    'Use of a database to determine differences in the base sequence of a gene in two species.',
                  value: 'IBB-S3.1.1',
                },
              ],
              understandings: [
                {
                  label:
                    'A gene is a heritable factor that consists of a length of DNA and influences a specific characteristic.',
                  value: 'IBB-U3.1.1',
                },
                {
                  label: 'A gene occupies a specific position on a chromosome.',
                  value: 'IBB-U3.1.2',
                },
                {
                  label: 'The various specific forms of a gene are alleles.',
                  value: 'IBB-U3.1.3',
                },
                {
                  label:
                    'Alleles differ from each other by one or only a few bases.',
                  value: 'IBB-U3.1.4',
                },
                {
                  label: 'New alleles are formed by mutation.',
                  value: 'IBB-U3.1.5',
                },
                {
                  label:
                    'The genome is the whole of the genetic information of an organism.',
                  value: 'IBB-U3.1.6',
                },
                {
                  label:
                    'The entire base sequence of human genes was sequenced in the Human Genome Project.',
                  value: 'IBB-U3.1.7',
                },
              ],
            },
            {
              label: 'Topic 3.2 Chromosomes',
              value: 'chromosomes',
              applications: [
                {
                  label:
                    'Cairns’ technique for measuring the length of DNA molecules by autoradiography.',
                  value: 'IBB-A3.2.1',
                },
                {
                  label:
                    'Comparison of genome size in T2 phage, Escherichia coli, Drosophila melanogaster, Homo sapiens and Paris japonica.',
                  value: 'IBB-A3.2.2',
                },
                {
                  label:
                    'Comparison of diploid chromosome numbers of Homo sapiens, Pan troglodytes, Canis familiaris, Oryza sativa, Parascaris equorum.',
                  value: 'IBB-A3.2.3',
                },
                {
                  label:
                    'Use of karyograms to deduce sex and diagnose Down syndrome in humans.',
                  value: 'IBB-A3.2.4',
                },
              ],
              skills: [
                {
                  label:
                    'Use of databases to identify the locus of a human gene and its polypeptide product.',
                  value: 'IBB-S3.2.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Prokaryotes have one chromosome consisting of a circular DNA molecule.',
                  value: 'IBB-U3.2.1',
                },
                {
                  label:
                    'Some prokaryotes also have plasmids but eukaryotes do not.',
                  value: 'IBB-U3.2.2',
                },
                {
                  label:
                    'Eukaryote chromosomes are linear DNA molecules associated with histone proteins.',
                  value: 'IBB-U3.2.3',
                },
                {
                  label:
                    'In a eukaryote species there are different chromosomes that carry different genes.',
                  value: 'IBB-U3.2.4',
                },
                {
                  label:
                    'Homologous chromosomes carry the same sequence of genes but not necessarily the same alleles of those genes.',
                  value: 'IBB-U3.2.5',
                },
                {
                  label: 'Diploid nuclei have pairs of homologous chromosomes.',
                  value: 'IBB-U3.2.6',
                },
                {
                  label: 'Haploid nuclei have one chromosome of each pair.',
                  value: 'IBB-U3.2.7',
                },
                {
                  label:
                    'The number of chromosomes is a characteristic feature of members of a species.',
                  value: 'IBB-U3.2.8',
                },
                {
                  label:
                    'A karyogram shows the chromosomes of an organism in homologous pairs of decreasing length.',
                  value: 'IBB-U3.2.9',
                },
                {
                  label:
                    'Sex is determined by sex chromosomes and autosomes are chromosomes that do not determine sex.',
                  value: 'IBB-U3.2.10',
                },
              ],
            },
            {
              label: 'Topic 3.3 Meiosis',
              value: 'meiosis',
              applications: [
                {
                  label:
                    'Non-disjunction can cause Down syndrome and other chromosome abnormalities.',
                  value: 'IBB-A3.3.1',
                },
                {
                  label:
                    'Studies showing age of parents influences chances of nondisjunction.',
                  value: 'IBB-A3.3.2',
                },
                {
                  label:
                    'Description of methods used to obtain cells for karyotype analysis e.g. chorionic villus sampling and amniocentesis and the associated risks.',
                  value: 'IBB-A3.3.3',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing diagrams to show the stages of meiosis resulting in the formation of four haploid cells.',
                  value: 'IBB-S3.3.1',
                },
              ],
              understandings: [
                {
                  label:
                    'One diploid nucleus divides by meiosis to produce four haploid nuclei.',
                  value: 'IBB-U3.3.1',
                },
                {
                  label:
                    'The halving of the chromosome number allows a sexual life cycle with fusion of gametes.',
                  value: 'IBB-U3.3.2',
                },
                {
                  label:
                    'DNA is replicated before meiosis so that all chromosomes consist of two sister chromatids.',
                  value: 'IBB-U3.3.3',
                },
                {
                  label:
                    'The early stages of meiosis involve pairing of homologous chromosomes and crossing over followed by condensation.',
                  value: 'IBB-U3.3.4',
                },
                {
                  label:
                    'Orientation of pairs of homologous chromosomes prior to separation is random.',
                  value: 'IBB-U3.3.5',
                },
                {
                  label:
                    'Separation of pairs of homologous chromosomes in the first division of meiosis halves the chromosome number.',
                  value: 'IBB-U3.3.6',
                },
                {
                  label:
                    'Crossing over and random orientation promotes genetic variation.',
                  value: 'IBB-U3.3.7',
                },
                {
                  label:
                    'Fusion of gametes from different parents promotes genetic variation.',
                  value: 'IBB-U3.3.8',
                },
              ],
            },
            {
              label: 'Topic 3.4 Inheritance',
              value: 'inheritance',
              applications: [
                {
                  label: 'Inheritance of ABO blood groups.',
                  value: 'IBB-A3.4.1',
                },
                {
                  label:
                    'Red-green colour blindness and hemophilia as examples of sexlinked inheritance.',
                  value: 'IBB-A3.4.2',
                },
                {
                  label:
                    'Inheritance of cystic fibrosis and Huntington’s disease.',
                  value: 'IBB-A3.4.3',
                },
                {
                  label:
                    'Consequences of radiation after nuclear bombing of Hiroshima and accident at Chernobyl.',
                  value: 'IBB-A3.4.4',
                },
              ],
              skills: [
                {
                  label:
                    'Construction of Punnett grids for predicting the outcomes of monohybrid genetic crosses.',
                  value: 'IBB-S3.4.1',
                },
                {
                  label:
                    'Comparison of predicted and actual outcomes of genetic crosses using real data.',
                  value: 'IBB-S3.4.2',
                },
                {
                  label:
                    'Analysis of pedigree charts to deduce the pattern of inheritance of genetic diseases.',
                  value: 'IBB-S3.4.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Mendel discovered the principles of inheritance with experiments in which large numbers of pea plants were crossed.',
                  value: 'IBB-U3.4.1',
                },
                {
                  label:
                    'Gametes are haploid so contain only one allele of each gene.',
                  value: 'IBB-U3.4.2',
                },
                {
                  label:
                    'The two alleles of each gene separate into different haploid daughter nuclei during meiosis.',
                  value: 'IBB-U3.4.3',
                },
                {
                  label:
                    'Fusion of gametes results in diploid zygotes with two alleles of each gene that may be the same allele or different alleles.',
                  value: 'IBB-U3.4.4',
                },
                {
                  label:
                    'Dominant alleles mask the effects of recessive alleles but co-dominant alleles have joint effects.',
                  value: 'IBB-U3.4.5',
                },
                {
                  label:
                    'Many genetic diseases in humans are due to recessive alleles of autosomal genes, although some genetic diseases are due to dominant or co-dominant alleles.',
                  value: 'IBB-U3.4.6',
                },
                {
                  label:
                    'Some genetic diseases are sex-linked. The pattern of inheritance is different with sex-linked genes due to their location on sex chromosomes.',
                  value: 'IBB-U3.4.7',
                },
                {
                  label:
                    'Many genetic diseases have been identified in humans but most are very rare.',
                  value: 'IBB-U3.4.8',
                },
                {
                  label:
                    'Radiation and mutagenic chemicals increase the mutation rate and can cause genetic diseases and cancer.',
                  value: 'IBB-U3.4.9',
                },
              ],
            },
            {
              label: 'Topic 3.5 Genetic modification and biotechnology',
              value: 'geneticModificationAndBiotechnology',
              applications: [
                {
                  label:
                    'Use of DNA profiling in paternity and forensic investigations.',
                  value: 'IBB-A3.5.1',
                },
                {
                  label:
                    'Gene transfer to bacteria using plasmids makes use of restriction endonucleases and DNA ligase.',
                  value: 'IBB-A3.5.2',
                },
                {
                  label:
                    'Assessment of the potential risks and benefits associated with genetic modification of crops.',
                  value: 'IBB-A3.5.3',
                },
                {
                  label:
                    'Production of cloned embryos produced by somatic-cell nuclear transfer.',
                  value: 'IBB-A3.5.4',
                },
              ],
              skills: [
                {
                  label:
                    'Design of an experiment to assess one factor affecting the rooting of stem-cuttings.',
                  value: 'IBB-S3.5.1',
                },
                {
                  label: 'Analysis of examples of DNA profiles.',
                  value: 'IBB-S3.5.2',
                },
                {
                  label:
                    'Analysis of data on risks to monarch butterflies of Bt crops.',
                  value: 'IBB-S3.5.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Gel electrophoresis is used to separate proteins or fragments of DNA according to size.',
                  value: 'IBB-U3.5.1',
                },
                {
                  label: 'PCR can be used to amplify small amounts of DNA.',
                  value: 'IBB-U3.5.2',
                },
                {
                  label: 'DNA profiling involves comparison of DNA.',
                  value: 'IBB-U3.5.3',
                },
                {
                  label:
                    'Genetic modification is carried out by gene transfer between species.',
                  value: 'IBB-U3.5.4',
                },
                {
                  label:
                    'Clones are groups of genetically identical organisms, derived from a single original parent cell.',
                  value: 'IBB-U3.5.5',
                },
                {
                  label:
                    'Many plant species and some animal species have natural methods of cloning.',
                  value: 'IBB-U3.5.6',
                },
                {
                  label:
                    'Animals can be cloned at the embryo stage by breaking up the embryo into more than one group of cells.',
                  value: 'IBB-U3.5.7',
                },
                {
                  label:
                    'Methods have been developed for cloning adult animals using differentiated cells.',
                  value: 'IBB-U3.5.8',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 4: Ecology',
          value: 'ecology',
          topics: [
            {
              label: 'Topic 4.1 Species, communities and ecosystems',
              value: 'speciesCommunitiesAndEcosystems',
              applications: [],
              skills: [
                {
                  label:
                    'Classifying species as autotrophs, consumers, detritivores or saprotrophs from a knowledge of their mode of nutrition.',
                  value: 'IBB-S4.1.1',
                },
                {
                  label:
                    'Setting up sealed mesocosms to try to establish sustainability. (Practical 5)',
                  value: 'IBB-S4.1.2',
                },
                {
                  label:
                    'Testing for association between two species using the chi-squared test with data obtained by quadrat sampling.',
                  value: 'IBB-S4.1.3',
                },
                {
                  label:
                    'Recognizing and interpreting statistical significance.',
                  value: 'IBB-S4.1.4',
                },
              ],
              understandings: [
                {
                  label:
                    'Species are groups of organisms that can potentially interbreed to produce fertile offspring.',
                  value: 'IBB-U4.1.1',
                },
                {
                  label:
                    'Members of a species may be reproductively isolated in separate populations.',
                  value: 'IBB-U4.1.2',
                },
                {
                  label:
                    'Species have either an autotrophic or heterotrophic method of nutrition (a few species have both methods).',
                  value: 'IBB-U4.1.3',
                },
                {
                  label:
                    'Consumers are heterotrophs that feed on living organisms by ingestion.',
                  value: 'IBB-U4.1.4',
                },
                {
                  label:
                    'Detritivores are heterotrophs that obtain organic nutrients from detritus by internal digestion.',
                  value: 'IBB-U4.1.5',
                },
                {
                  label:
                    'Saprotrophs are heterotrophs that obtain organic nutrients from dead organisms by external digestion.',
                  value: 'IBB-U4.1.6',
                },
                {
                  label:
                    'A community is formed by populations of different species living together and interacting with each other.',
                  value: 'IBB-U4.1.7',
                },
                {
                  label:
                    'A community forms an ecosystem by its interactions with the abiotic environment.',
                  value: 'IBB-U4.1.8',
                },
                {
                  label:
                    'Autotrophs obtain inorganic nutrients from the abiotic environment.',
                  value: 'IBB-U4.1.9',
                },
                {
                  label:
                    'The supply of inorganic nutrients is maintained by nutrient cycling.',
                  value: 'IBB-U4.1.10',
                },
                {
                  label:
                    'Ecosystems have the potential to be sustainable over long periods of time.',
                  value: 'IBB-U4.1.11',
                },
              ],
            },
            {
              label: 'Topic 4.2 Energy flow',
              value: 'energyFlow',
              applications: [],
              skills: [
                {
                  label:
                    'Quantitative representations of energy flow using pyramids of energy.',
                  value: 'IBB-S4.2.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Most ecosystems rely on a supply of energy from sunlight.',
                  value: 'IBB-U4.2.1',
                },
                {
                  label:
                    'Light energy is converted to chemical energy in carbon compounds by photosynthesis.',
                  value: 'IBB-U4.2.2',
                },
                {
                  label:
                    'Chemical energy in carbon compounds flows through food chains by means of feeding.',
                  value: 'IBB-U4.2.3',
                },
                {
                  label:
                    'Energy released from carbon compounds by respiration is used in living organisms and converted to heat.',
                  value: 'IBB-U4.2.4',
                },
                {
                  label:
                    'Living organisms cannot convert heat to other forms of energy.',
                  value: 'IBB-U4.2.5',
                },
                {
                  label: 'Heat is lost from ecosystems.',
                  value: 'IBB-U4.2.6',
                },
                {
                  label:
                    'Energy losses between trophic levels restrict the length of food chains and the biomass of higher trophic levels.',
                  value: 'IBB-U4.2.7',
                },
              ],
            },
            {
              label: 'Topic 4.3 Carbon cycling',
              value: 'carbonCycling',
              applications: [
                {
                  label:
                    'Estimation of carbon fluxes due to processes in the carbon cycle.',
                  value: 'IBB-A4.3.1',
                },
                {
                  label:
                    'Analysis of data from air monitoring stations to explain annual fluctuations.',
                  value: 'IBB-A4.3.2',
                },
              ],
              skills: [
                {
                  label: 'Construct a diagram of the carbon cycle.',
                  value: 'IBB-S4.3.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Autotrophs convert carbon dioxide into carbohydrates and other carbon compounds.',
                  value: 'IBB-U4.3.1',
                },
                {
                  label:
                    'In aquatic ecosystems carbon is present as dissolved carbon dioxide and hydrogen carbonate ions.',
                  value: 'IBB-U4.3.2',
                },
                {
                  label:
                    'Carbon dioxide diffuses from the atmosphere or water into autotrophs.',
                  value: 'IBB-U4.3.3',
                },
                {
                  label:
                    'Carbon dioxide is produced by respiration and diffuses out of organisms into water or the atmosphere.',
                  value: 'IBB-U4.3.4',
                },
                {
                  label:
                    'Methane is produced from organic matter in anaerobic conditions by methanogenic archaeans and some diffuses into the atmosphere or accumulates in the ground.',
                  value: 'IBB-U4.3.5',
                },
                {
                  label:
                    'Methane is oxidized to carbon dioxide and water in the atmosphere.',
                  value: 'IBB-U4.3.6',
                },
                {
                  label:
                    'Peat forms when organic matter is not fully decomposed because of acidic and/or anaerobic conditions in waterlogged soils.',
                  value: 'IBB-U4.3.7',
                },
                {
                  label:
                    'Partially decomposed organic matter from past geological eras was converted either into coal or into oil and gas that accumulate in porous rocks.',
                  value: 'IBB-U4.3.8',
                },
                {
                  label:
                    'Carbon dioxide is produced by the combustion of biomass and fossilized organic matter.',
                  value: 'IBB-U4.3.9',
                },
                {
                  label:
                    'Animals such as reef-building corals and mollusca have hard parts that are composed of calcium carbonate and can become fossilized in limestone.',
                  value: 'IBB-U4.3.10',
                },
              ],
            },
            {
              label: 'Topic 4.4 Climate change',
              value: 'climateChange',
              applications: [
                {
                  label:
                    'Threats to coral reefs from increasing concentrations of dissolved carbon dioxide.',
                  value: 'IBB-A4.4.1',
                },
                {
                  label:
                    'Correlations between global temperatures and carbon dioxide concentrations on Earth.',
                  value: 'IBB-A4.4.2',
                },
                {
                  label:
                    'Evaluating claims that human activities are not causing climate change.',
                  value: 'IBB-A4.4.3',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Carbon dioxide and water vapour are the most significant greenhouse gases.',
                  value: 'IBB-U4.4.1',
                },
                {
                  label:
                    'Other gases including methane and nitrogen oxides have less impact.',
                  value: 'IBB-U4.4.2',
                },
                {
                  label:
                    'The impact of a gas depends on its ability to absorb long wave radiation as well as on its concentration in the atmosphere.',
                  value: 'IBB-U4.4.3',
                },
                {
                  label:
                    'The warmed Earth emits longer wavelength radiation (heat).',
                  value: 'IBB-U4.4.4',
                },
                {
                  label:
                    'Longer wave radiation is absorbed by greenhouse gases that retain the heat in the atmosphere.',
                  value: 'IBB-U4.4.5',
                },
                {
                  label:
                    'Global temperatures and climate patterns are influenced by concentrations of greenhouse gases.',
                  value: 'IBB-U4.4.6',
                },
                {
                  label:
                    'There is a correlation between rising atmospheric concentrations of carbon dioxide since the start of the industrial revolution 200 years ago and average global temperatures.',
                  value: 'IBB-U4.4.7',
                },
                {
                  label:
                    'Recent increases in atmospheric carbon dioxide are largely due to increases in the combustion of fossilized organic matter.',
                  value: 'IBB-U4.4.8',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 5: Evolution and biodiversity',
          value: 'evolutionAndBiodiversity',
          topics: [
            {
              label: 'Topic 5.1 Evidence for evolution',
              value: 'evidenceForEvolution',
              applications: [
                {
                  label: 'Development of melanistic insects in polluted areas.',
                  value: 'IBB-A5.1.1',
                },
                {
                  label:
                    'Comparison of the pentadactyl limb of mammals, birds, amphibians and reptiles with different methods of locomotion.',
                  value: 'IBB-A5.1.2',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Evolution occurs when heritable characteristics of a species change.',
                  value: 'IBB-U5.1.1',
                },
                {
                  label: 'The fossil record provides evidence for evolution.',
                  value: 'IBB-U5.1.2',
                },
                {
                  label:
                    'Selective breeding of domesticated animals shows that artificial selection can cause evolution.',
                  value: 'IBB-U5.1.3',
                },
                {
                  label:
                    'Evolution of homologous structures by adaptive radiation explains similarities in structure when there are differences in function.',
                  value: 'IBB-U5.1.4',
                },
                {
                  label:
                    'Populations of a species can gradually diverge into separate species by evolution.',
                  value: 'IBB-U5.1.5',
                },
                {
                  label:
                    'Continuous variation across the geographical range of related populations matches the concept of gradual divergence.',
                  value: 'IBB-U5.1.6',
                },
              ],
            },
            {
              label: 'Topic 5.2 Natural selection',
              value: 'naturalSelection',
              applications: [
                {
                  label: 'Changes in beaks of finches on Daphne Major.',
                  value: 'IBB-A5.2.1',
                },
                {
                  label: 'Evolution of antibiotic resistance in bacteria.',
                  value: 'IBB-A5.2.2',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Natural selection can only occur if there is variation among members of the same species.',
                  value: 'IBB-U5.2.1',
                },
                {
                  label:
                    'Mutation, meiosis and sexual reproduction cause variation between individuals in a species.',
                  value: 'IBB-U5.2.2',
                },
                {
                  label:
                    'Adaptations are characteristics that make an individual suited to its environment and way of life.',
                  value: 'IBB-U5.2.3',
                },
                {
                  label:
                    'Species tend to produce more offspring than the environment can support.',
                  value: 'IBB-U5.2.4',
                },
                {
                  label:
                    'Individuals that are better adapted tend to survive and produce more offspring while the less well adapted tend to die or produce fewer offspring.',
                  value: 'IBB-U5.2.5',
                },
                {
                  label:
                    'Individuals that reproduce pass on characteristics to their offspring.',
                  value: 'IBB-U5.2.6',
                },
                {
                  label:
                    'Natural selection increases the frequency of characteristics that make individuals better adapted and decreases the frequency of other characteristics leading to changes within the species.',
                  value: 'IBB-U5.2.7',
                },
              ],
            },
            {
              label: 'Topic 5.3 Classification of biodiversity',
              value: 'classificationOfBiodiversity',
              applications: [
                {
                  label:
                    'Classification of one plant and one animal species from domain to species level.',
                  value: 'IBB-A5.3.1',
                },
                {
                  label:
                    'Recognition features of bryophyta, filicinophyta, coniferophyta and angiospermophyta.',
                  value: 'IBB-A5.3.2',
                },
                {
                  label:
                    'Recognition features of porifera, cnidaria, platylhelmintha, annelida, mollusca, arthropoda and chordata.',
                  value: 'IBB-A5.3.3',
                },
                {
                  label:
                    'Recognition of features of birds, mammals, amphibians, reptiles and fish.',
                  value: 'IBB-A5.3.4',
                },
              ],
              skills: [
                {
                  label:
                    'Construction of dichotomous keys for use in identifying specimens.',
                  value: 'IBB-S5.3.1',
                },
              ],
              understandings: [
                {
                  label:
                    'The binomial system of names for species is universal among biologists and has been agreed and developed at a series of congresses.',
                  value: 'IBB-U5.3.1',
                },
                {
                  label:
                    'When species are discovered they are given scientific names using the binomial system.',
                  value: 'IBB-U5.3.2',
                },
                {
                  label:
                    'Taxonomists classify species using a hierarchy of taxa.',
                  value: 'IBB-U5.3.3',
                },
                {
                  label: 'All organisms are classified into three domains.',
                  value: 'IBB-U5.3.4',
                },
                {
                  label:
                    'The principal taxa for classifying eukaryotes are kingdom, phylum, class, order, family, genus and species.',
                  value: 'IBB-U5.3.5',
                },
                {
                  label:
                    'In a natural classification, the genus and accompanying higher taxa consist of all the species that have evolved from one common ancestral species.',
                  value: 'IBB-U5.3.6',
                },
                {
                  label:
                    'Taxonomists sometimes reclassify groups of species when new evidence shows that a previous taxon contains species that have evolved from different ancestral species.',
                  value: 'IBB-U5.3.7',
                },
                {
                  label:
                    'Natural classifications help in identification of species and allow the prediction of characteristics shared by species within a group.',
                  value: 'IBB-U5.3.8',
                },
              ],
            },
            {
              label: 'Topic 5.4 Cladistics',
              value: 'cladistics',
              applications: [
                {
                  label: 'Cladograms including humans and other primates.',
                  value: 'IBB-A5.4.1',
                },
                {
                  label:
                    'Reclassification of the figwort family using evidence from',
                  value: 'IBB-A5.4.2',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of cladograms to deduce evolutionary relationships.',
                  value: 'IBB-S5.4.1',
                },
              ],
              understandings: [
                {
                  label:
                    'A clade is a group of organisms that have evolved from a common ancestor.',
                  value: 'IBB-U5.4.1',
                },
                {
                  label:
                    'Evidence for which species are part of a clade can be obtained from the base sequences of a gene or the corresponding amino acid sequence of a protein.',
                  value: 'IBB-U5.4.2',
                },
                {
                  label:
                    'Sequence differences accumulate gradually so there is a positive correlation between the number of differences between two species and the time since they diverged from a common ancestor.',
                  value: 'IBB-U5.4.3',
                },
                {
                  label: 'Traits can be analogous or homologous.',
                  value: 'IBB-U5.4.4',
                },
                {
                  label:
                    'Cladograms are tree diagrams that show the most probable sequence of divergence in clades.',
                  value: 'IBB-U5.4.5',
                },
                {
                  label:
                    'Evidence from cladistics has shown that classifications of some groups based on structure did not correspond with the evolutionary origins of a group or species.',
                  value: 'IBB-U5.4.6',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 6: Human physiology',
          value: 'humanPhysiology',
          topics: [
            {
              label: 'Topic 6.1 Digestion and absorption',
              value: 'digestionAndAbsorption',
              applications: [
                {
                  label:
                    'Processes occurring in the small intestine that result in the digestion of starch and transport of the products of digestion to the liver.',
                  value: 'IBB-A6.1.1',
                },
                {
                  label:
                    'Use of dialysis tubing to model absorption of digested food in the intestine.',
                  value: 'IBB-A6.1.2',
                },
              ],
              skills: [
                {
                  label:
                    'Production of an annotated diagram of the digestive system.',
                  value: 'IBB-S6.1.1',
                },
                {
                  label:
                    'Identification of tissue layers in transverse sections of the small intestine viewed with a microscope or in a micrograph.',
                  value: 'IBB-S6.1.2',
                },
              ],
              understandings: [
                {
                  label:
                    'The contraction of circular and longitudinal muscle of the small intestine mixes the food with enzymes and moves it along the gut.',
                  value: 'IBB-U6.1.1',
                },
                {
                  label:
                    'The pancreas secretes enzymes into the lumen of the small intestine.',
                  value: 'IBB-U6.1.2',
                },
                {
                  label:
                    'Enzymes digest most macromolecules in food into monomers in the small intestine.',
                  value: 'IBB-U6.1.3',
                },
                {
                  label:
                    'Villi increase the surface area of epithelium over which absorption is carried out.',
                  value: 'IBB-U6.1.4',
                },
                {
                  label:
                    'Villi absorb monomers formed by digestion as well as mineral ions and vitamins.',
                  value: 'IBB-U6.1.5',
                },
                {
                  label:
                    'Different methods of membrane transport are required to absorb different nutrients.',
                  value: 'IBB-U6.1.6',
                },
              ],
            },
            {
              label: 'Topic 6.2 The blood system',
              value: 'theBloodSystem',
              applications: [
                {
                  label:
                    'William Harvey’s discovery of the circulation of the blood with the heart acting as the pump..',
                  value: 'IBB-A6.2.1',
                },
                {
                  label:
                    'Pressure changes in the left atrium, left ventricle and aorta during the cardiac cycle.',
                  value: 'IBB-A6.2.2',
                },
                {
                  label:
                    'Causes and consequences of occlusion of the coronary arteries.',
                  value: 'IBB-A6.2.3',
                },
              ],
              skills: [
                {
                  label:
                    'Identification of blood vessels as arteries, capillaries or veins from the structure of their walls.',
                  value: 'IBB-S6.2.1',
                },
                {
                  label:
                    'Recognition of the chambers and valves of the heart and the blood vessels connected to it in dissected hearts or in diagrams of heart structure.',
                  value: 'IBB-S6.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Arteries convey blood at high pressure from the ventricles to the tissues of the body.',
                  value: 'IBB-U6.2.1',
                },
                {
                  label:
                    'Arteries have muscle cells and elastic fibres in their walls.',
                  value: 'IBB-U6.2.2',
                },
                {
                  label:
                    'The muscle and elastic fibres assist in maintaining blood pressure between pump cycles.',
                  value: 'IBB-U6.2.3',
                },
                {
                  label:
                    'Blood flows through tissues in capillaries. Capillaries have permeable walls that allow exchange of materials between cells in the tissue and the blood in the capillary.',
                  value: 'IBB-U6.2.4',
                },
                {
                  label:
                    'Veins collect blood at low pressure from the tissues of the body and return it to the atria of the heart.',
                  value: 'IBB-U6.2.5',
                },
                {
                  label:
                    'Valves in veins and the heart ensure circulation of blood by preventing backflow.',
                  value: 'IBB-U6.2.6',
                },
                {
                  label: 'There is a separate circulation for the lungs.',
                  value: 'IBB-U6.2.7',
                },
                {
                  label:
                    'The heart beat is initiated by a group of specialized muscle cells in the right atrium called the sinoatrial node.',
                  value: 'IBB-U6.2.8',
                },
                {
                  label: 'The sinoatrial node acts as a pacemaker.',
                  value: 'IBB-U6.2.9',
                },
                {
                  label:
                    'The sinoatrial node sends out an electrical signal that stimulates contraction as it is propagated through the walls of the atria and then the walls of the ventricles.',
                  value: 'IBB-U6.2.10',
                },
                {
                  label:
                    'The heart rate can be increased or decreased by impulses brought to the heart through two nerves from the medulla of the brain.',
                  value: 'IBB-U6.2.11',
                },
                {
                  label:
                    'Epinephrine increases the heart rate to prepare for vigorous physical activity.',
                  value: 'IBB-U6.2.12',
                },
              ],
            },
            {
              label: 'Topic 6.3 Defence against infectious disease',
              value: 'defenceAgainstInfectiousDisease',
              applications: [
                {
                  label:
                    'Causes and consequences of blood clot formation in coronary arteries.',
                  value: 'IBB-A6.3.1',
                },
                {
                  label:
                    'Florey and Chain’s experiments to test penicillin on bacterial infections in mice.',
                  value: 'IBB-A6.3.2',
                },
                {
                  label:
                    'Effects of HIV on the immune system and methods of transmission.',
                  value: 'IBB-A6.3.3',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'The skin and mucous membranes form a primary defence against pathogens that cause infectious disease.',
                  value: 'IBB-U6.3.1',
                },
                {
                  label: 'Cuts in the skin are sealed by blood clotting.',
                  value: 'IBB-U6.3.2',
                },
                {
                  label: 'Clotting factors are released from platelets.',
                  value: 'IBB-U6.3.3',
                },
                {
                  label:
                    'The cascade results in the rapid conversion of fibrinogen to fibrin by thrombin.',
                  value: 'IBB-U6.3.4',
                },
                {
                  label:
                    'Ingestion of pathogens by phagocytic white blood cells gives non-specific immunity to diseases.',
                  value: 'IBB-U6.3.5',
                },
                {
                  label:
                    'Production of antibodies by lymphocytes in response to particular pathogens gives specific immunity.',
                  value: 'IBB-U6.3.6',
                },
                {
                  label:
                    'Antibiotics block processes that occur in prokaryotic cells but not in eukaryotic cells.',
                  value: 'IBB-U6.3.7',
                },
                {
                  label:
                    'Viruses lack a metabolism and cannot therefore be treated with antibiotics. Some strains of bacteria have evolved with genes that confer resistance to antibiotics and some strains of bacteria have multiple resistance.',
                  value: 'IBB-U6.3.8',
                },
              ],
            },
            {
              label: 'Topic 6.4 Gas exchange',
              value: 'gasExchange',
              applications: [
                {
                  label: 'Causes and consequences of lung cancer.',
                  value: 'IBB-A6.4.1',
                },
                {
                  label: 'Causes and consequences of emphysema.',
                  value: 'IBB-A6.4.2',
                },
                {
                  label:
                    'External and internal intercostal muscles, and diaphragm and abdominal muscles as examples of antagonistic muscle action.',
                  value: 'IBB-A6.4.3',
                },
              ],
              skills: [
                {
                  label:
                    'Monitoring of ventilation in humans at rest and after mild and vigorous exercise. (Practical 6)',
                  value: 'IBB-S6.4.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Ventilation maintains concentration gradients of oxygen and carbon dioxide between air in alveoli and blood flowing in adjacent capillaries.',
                  value: 'IBB-U6.4.1',
                },
                {
                  label:
                    'Type I pneumocytes are extremely thin alveolar cells that are adapted to carry out gas exchange.',
                  value: 'IBB-U6.4.2',
                },
                {
                  label:
                    'Type II pneumocytes secrete a solution containing surfactant that creates a moist surface inside the alveoli to prevent the sides of the alveolus adhering to each other by reducing surface tension.',
                  value: 'IBB-U6.4.3',
                },
                {
                  label:
                    'Air is carried to the lungs in the trachea and bronchi and then to the alveoli in bronchioles.',
                  value: 'IBB-U6.4.4',
                },
                {
                  label:
                    'Muscle contractions cause the pressure changes inside the thorax that force air in and out of the lungs to ventilate them.',
                  value: 'IBB-U6.4.5',
                },
                {
                  label:
                    'Different muscles are required for inspiration and expiration because muscles only do work when they contract.',
                  value: 'IBB-U6.4.6',
                },
              ],
            },
            {
              label: 'Topic 6.5 Neurons and synapses',
              value: 'neuronsAndSynapses',
              applications: [
                {
                  label:
                    'Secretion and reabsorption of acetylcholine by neurons at synapses.',
                  value: 'IBB-A6.5.1',
                },
                {
                  label:
                    'Blocking of synaptic transmission at cholinergic synapses in insects by binding of neonicotinoid pesticides to acetylcholine receptors.',
                  value: 'IBB-A6.5.2',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of oscilloscope traces showing resting potentials and action potentials.',
                  value: 'IBB-S6.5.1',
                },
              ],
              understandings: [
                {
                  label: 'Neurons transmit electrical impulses.',
                  value: 'IBB-U6.5.1',
                },
                {
                  label:
                    'The myelination of nerve fibres allows for saltatory conduction.',
                  value: 'IBB-U6.5.2',
                },
                {
                  label:
                    'Neurons pump sodium and potassium ions across their membranes to generate a resting potential.',
                  value: 'IBB-U6.5.3',
                },
                {
                  label:
                    'An action potential consists of depolarization and repolarization of the neuron.',
                  value: 'IBB-U6.5.4',
                },
                {
                  label:
                    'Nerve impulses are action potentials propagated along the axons of neurons.',
                  value: 'IBB-U6.5.5',
                },
                {
                  label:
                    'Propagation of nerve impulses is the result of local currents that cause each successive part of the axon to reach the threshold potential.',
                  value: 'IBB-U6.5.6',
                },
                {
                  label:
                    'Synapses are junctions between neurons and between neurons and receptor or effector cells.',
                  value: 'IBB-U6.5.7',
                },
                {
                  label:
                    'When presynaptic neurons are depolarized they release a neurotransmitter into the synapse.',
                  value: 'IBB-U6.5.8',
                },
                {
                  label:
                    'A nerve impulse is only initiated if the threshold potential is reached.',
                  value: 'IBB-U6.5.9',
                },
              ],
            },
            {
              label: 'Topic 6.6 Hormones, homeostasis and reproduction',
              value: 'hormonesHomeostasisAndReproduction',
              applications: [
                {
                  label: 'Causes and treatment of Type I and Type II diabetes.',
                  value: 'IBB-A6.6.1',
                },
                {
                  label:
                    'Testing of leptin on patients with clinical obesity and reasons for the failure to control the disease.',
                  value: 'IBB-A6.6.2',
                },
                {
                  label:
                    'Causes of jet lag and use of melatonin to alleviate it.',
                  value: 'IBB-A6.6.3',
                },
                {
                  label:
                    'The use in IVF of drugs to suspend the normal secretion of hormones, followed by the use of artificial doses of hormones to induce superovulation and establish a pregnancy.',
                  value: 'IBB-A6.6.4',
                },
                {
                  label:
                    'William Harvey’s investigation of sexual reproduction in deer.',
                  value: 'IBB-A6.6.5',
                },
              ],
              skills: [
                {
                  label:
                    'Annotate diagrams of the male and female reproductive system to show names of structures and their functions.',
                  value: 'IBB-S6.6.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Insulin and glucagon are secreted by β and α cells of the pancreas respectively to control blood glucose concentration.',
                  value: 'IBB-U6.6.1',
                },
                {
                  label:
                    'Thyroxin is secreted by the thyroid gland to regulate the metabolic rate and help control body temperature.',
                  value: 'IBB-U6.6.2',
                },
                {
                  label:
                    'Leptin is secreted by cells in adipose tissue and acts on the hypothalamus of the brain to inhibit appetite.',
                  value: 'IBB-U6.6.3',
                },
                {
                  label:
                    'Melatonin is secreted by the pineal gland to control circadian rhythms.',
                  value: 'IBB-U6.6.4',
                },
                {
                  label:
                    'A gene on the Y chromosome causes embryonic gonads to develop as testes and secrete testosterone.',
                  value: 'IBB-U6.6.5',
                },
                {
                  label:
                    'Testosterone causes pre-natal development of male genitalia and both sperm production and development of male secondary sexual characteristics during puberty.',
                  value: 'IBB-U6.6.6',
                },
                {
                  label:
                    'Estrogen and progesterone cause pre-natal development of female reproductive organs and female secondary sexual characteristics duringpuberty.',
                  value: 'IBB-U6.6.7',
                },
                {
                  label:
                    'The menstrual cycle is controlled by negative and positive feedback mechanisms involving ovarian and pituitary hormones.',
                  value: 'IBB-U6.6.8',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 7: Nucleic acids',
          value: 'nucleicAcids',
          topics: [
            {
              label: 'Topic 7.1 DNA structure and replication',
              value: 'DnaStructureAndReplication',
              applications: [
                {
                  label:
                    'Rosalind Franklin’s and Maurice Wilkins’ investigation of DNA structure by X-ray diffraction.',
                  value: 'IBB-A7.1.1',
                },
                {
                  label:
                    'Use of nucleotides containing dideoxyribonucleic acid to stop DNA replication in preparation of samples for base sequencing.',
                  value: 'IBB-A7.1.2',
                },
                {
                  label: 'Tandem repeats are used in DNA profiling.',
                  value: 'IBB-A7.1.3',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of results of the Hershey and Chase experiment providing evidence that DNA is the genetic material.',
                  value: 'IBB-S7.1.1',
                },
                {
                  label:
                    'Utilization of molecular visualization software to analyse the association between protein and DNA within a nucleosome.',
                  value: 'IBB-S7.1.2',
                },
              ],
              understandings: [
                {
                  label: 'Nucleosomes help to supercoil the DNA.',
                  value: 'IBB-U7.1.1',
                },
                {
                  label:
                    'DNA structure suggested a mechanism for DNA replication.',
                  value: 'IBB-U7.1.2',
                },
                {
                  label:
                    'DNA polymerases can only add nucleotides to the 3’ end of a primer.',
                  value: 'IBB-U7.1.3',
                },
                {
                  label:
                    'DNA replication is continuous on the leading strand and discontinuous on the lagging strand.',
                  value: 'IBB-U7.1.4',
                },
                {
                  label:
                    'DNA replication is carried out by a complex system of enzymes.',
                  value: 'IBB-U7.1.5',
                },
                {
                  label:
                    'Some regions of DNA do not code for proteins but have other important functions.',
                  value: 'IBB-U7.1.6',
                },
              ],
            },
            {
              label: 'Topic 7.2 Transcription and gene expression',
              value: 'transcriptionAndGeneExpression',
              applications: [
                {
                  label:
                    'The promoter as an example of non-coding DNA with a function.',
                  value: 'IBB-A7.2.1',
                },
              ],
              skills: [
                {
                  label: 'Analysis of changes in the DNA methylation patterns.',
                  value: 'IBB-S7.2.1',
                },
              ],
              understandings: [
                {
                  label: 'Transcription occurs in a 5’ to 3’ direction.',
                  value: 'IBB-U7.2.1',
                },
                {
                  label:
                    'Nucleosomes help to regulate transcription in eukaryotes.',
                  value: 'IBB-U7.2.2',
                },
                {
                  label: 'Eukaryotic cells modify mRNA after transcription.',
                  value: 'IBB-U7.2.3',
                },
                {
                  label:
                    'Splicing of mRNA increases the number of different proteins an organism can produce.',
                  value: 'IBB-U7.2.4',
                },
                {
                  label:
                    'Gene expression is regulated by proteins that bind to specific base sequences in DNA.',
                  value: 'IBB-U7.2.5',
                },
                {
                  label:
                    'The environment of a cell and of an organism has an impact on gene expression.',
                  value: 'IBB-U7.2.6',
                },
              ],
            },
            {
              label: 'Topic 7.3 Translation',
              value: 'translation',
              applications: [
                {
                  label:
                    'tRNA-activating enzymes illustrate enzyme–substrate specificity and the role of phosphorylation.',
                  value: 'IBB-A7.3.1',
                },
              ],
              skills: [
                {
                  label:
                    'Identification of polysomes in electron micrographs of prokaryotes and eukaryotes.',
                  value: 'IBB-S7.3.1',
                },
                {
                  label:
                    'The use of molecular visualization software to analyse the structure of eukaryotic ribosomes and a tRNA molecule.',
                  value: 'IBB-S7.3.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Initiation of translation involves assembly of the components that carry out the process.',
                  value: 'IBB-U7.3.1',
                },
                {
                  label:
                    'Synthesis of the polypeptide involves a repeated cycle of events.',
                  value: 'IBB-U7.3.2',
                },
                {
                  label:
                    'Disassembly of the components follows termination of translation.',
                  value: 'IBB-U7.3.3',
                },
                {
                  label:
                    'Free ribosomes synthesize proteins for use primarily within the cell.',
                  value: 'IBB-U7.3.4',
                },
                {
                  label:
                    'Bound ribosomes synthesize proteins primarily for secretion or for use in lysosomes.',
                  value: 'IBB-U7.3.5',
                },
                {
                  label:
                    'Translation can occur immediately after transcription in prokaryotes due to the absence of a nuclear membrane.',
                  value: 'IBB-U7.3.6',
                },
                {
                  label:
                    'The sequence and number of amino acids in the polypeptide is the primary structure.',
                  value: 'IBB-U7.3.7',
                },
                {
                  label:
                    'The secondary structure is the formation of alpha helices and beta pleated sheets stabilized by hydrogen bonding.',
                  value: 'IBB-U7.3.8',
                },
                {
                  label:
                    'The tertiary structure is the further folding of the polypeptide stabilized by interactions between R groups.',
                  value: 'IBB-U7.3.9',
                },
                {
                  label:
                    'The quaternary structure exists in proteins with more than one polypeptide chain.',
                  value: 'IBB-U7.3.10',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 8: Metabolism, cell respiration and photosynthesis',
          value: 'metabolismCellRespirationAndPhotosynthesis',
          topics: [
            {
              label: 'Topic 8.1 Metabolism',
              value: 'metabolism',
              applications: [
                {
                  label:
                    'End-product inhibition of the pathway that converts threonine to isoleucine.',
                  value: 'IBB-A8.1.1',
                },
                {
                  label:
                    'Use of databases to identify potential new anti-malarial drugs.',
                  value: 'IBB-A8.1.2',
                },
              ],
              skills: [
                {
                  label:
                    'Calculating and plotting rates of reaction from raw experimental results.',
                  value: 'IBB-S8.1.1',
                },
                {
                  label:
                    'Distinguishing different types of inhibition from graphs at specified substrate concentration.',
                  value: 'IBB-S8.1.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Metabolic pathways consist of chains and cycles of enzyme-catalysed reactions.',
                  value: 'IBB-U8.1.1',
                },
                {
                  label:
                    'Enzymes lower the activation energy of the chemical reactions that they catalyse.',
                  value: 'IBB-U8.1.2',
                },
                {
                  label:
                    'Enzyme inhibitors can be competitive or non-competitive.',
                  value: 'IBB-U8.1.3',
                },
                {
                  label:
                    'Metabolic pathways can be controlled by end-product inhibition.',
                  value: 'IBB-U8.1.4',
                },
              ],
            },
            {
              label: 'Topic 8.2 Cell respiration',
              value: 'cellRespiration',
              applications: [
                {
                  label:
                    'Electron tomography used to produce images of active mitochondria.',
                  value: 'IBB-A8.2.1',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of diagrams of the pathways of aerobic respiration to deduce where decarboxylation and oxidation reactions occur.',
                  value: 'IBB-S8.2.1',
                },
                {
                  label:
                    'Annotation of a diagram of a mitochondrion to indicate the adaptations to its function.',
                  value: 'IBB-S8.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Cell respiration involves the oxidation and reduction of electron carriers.',
                  value: 'IBB-U8.2.1',
                },
                {
                  label: 'Phosphorylation of molecules makes them less stable.',
                  value: 'IBB-U8.2.2',
                },
                {
                  label:
                    'In glycolysis, glucose is converted to pyruvate in the cytoplasm.',
                  value: 'IBB-U8.2.3',
                },
                {
                  label:
                    'Glycolysis gives a small net gain of ATP without the use of oxygen.',
                  value: 'IBB-U8.2.4',
                },
                {
                  label:
                    'In aerobic cell respiration pyruvate is decarboxylated and oxidized, and converted into acetyl compound and attached to coenzyme A to form acetyl coenzyme A in the link reaction.',
                  value: 'IBB-U8.2.5',
                },
                {
                  label:
                    'In the Krebs cycle, the oxidation of acetyl groups is coupled to the reduction of hydrogen carriers, liberating carbon dioxide.',
                  value: 'IBB-U8.2.6',
                },
                {
                  label:
                    'Energy released by oxidation reactions is carried to the cristae of the mitochondria by reduced NAD and FAD.',
                  value: 'IBB-U8.2.7',
                },
                {
                  label:
                    'Transfer of electrons between carriers in the electron transport chain in the membrane of the cristae is coupled to proton pumping.',
                  value: 'IBB-U8.2.8',
                },
                {
                  label:
                    'In chemiosmosis protons diffuse through ATP synthase to generate ATP.',
                  value: 'IBB-U8.2.9',
                },
                {
                  label:
                    'Oxygen is needed to bind with the free protons to maintain the hydrogen gradient, resulting in the formation of water.',
                  value: 'IBB-U8.2.10',
                },
                {
                  label:
                    'The structure of the mitochondrion is adapted to the function it performs.',
                  value: 'IBB-U8.2.11',
                },
              ],
            },
            {
              label: 'Topic 8.3 Photosynthesis',
              value: 'photosynthesis',
              applications: [
                {
                  label:
                    'Calvin’s experiment to elucidate the carboxylation of RuBP.',
                  value: 'IBB-A8.3.1',
                },
              ],
              skills: [
                {
                  label:
                    'Annotation of a diagram to indicate the adaptations of a chloroplast to its function.',
                  value: 'IBB-S8.3.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Light-dependent reactions take place in the intermembrane space of the thylakoids.',
                  value: 'IBB-U8.3.1',
                },
                {
                  label:
                    'Light-independent reactions take place in the stroma.',
                  value: 'IBB-U8.3.2',
                },
                {
                  label:
                    'Reduced NADP and ATP are produced in the light-dependent reactions.',
                  value: 'IBB-U8.3.3',
                },
                {
                  label:
                    'Absorption of light by photosystems generates excited electrons.',
                  value: 'IBB-U8.3.4',
                },
                {
                  label:
                    'Photolysis of water generates electrons for use in the light-dependent reactions.',
                  value: 'IBB-U8.3.5',
                },
                {
                  label:
                    'Transfer of excited electrons occurs between carriers in thylakoid membranes.',
                  value: 'IBB-U8.3.6',
                },
                {
                  label:
                    'Excited electrons from Photosystem II are used to contribute to generate a proton gradient.',
                  value: 'IBB-U8.3.7',
                },
                {
                  label:
                    'ATP synthase in thylakoids generates ATP using the proton gradient.',
                  value: 'IBB-U8.3.8',
                },
                {
                  label:
                    'Excited electrons from Photosystem I are used to reduce NADP.',
                  value: 'IBB-U8.3.9',
                },
                {
                  label:
                    'In the light-independent reactions a carboxylase catalyses the carboxylation of ribulose bisphosphate.',
                  value: 'IBB-U8.3.10',
                },
                {
                  label:
                    'Glycerate 3-phosphate is reduced to triose phosphate using reduced NADP and ATP.',
                  value: 'IBB-U8.3.11',
                },
                {
                  label:
                    'Triose phosphate is used to regenerate RuBP and produce carbohydrates.',
                  value: 'IBB-U8.3.12',
                },
                {
                  label: 'Ribulose bisphosphate is reformed using ATP.',
                  value: 'IBB-U8.3.13',
                },
                {
                  label:
                    'The structure of the chloroplast is adapted to its function in photosynthesis.',
                  value: 'IBB-U8.3.14',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 9: Plant biology',
          value: 'plantBiology',
          topics: [
            {
              label: 'Topic 9.1 Transport in the xylem of plants',
              value: 'transportInTheXylemOfPlants',
              applications: [
                {
                  label:
                    'Adaptations of plants in deserts and in saline soils for water conservation.',
                  value: 'IBB-A9.1.1',
                },
                {
                  label:
                    'Models of water transport in xylem using simple apparatus including blotting or filter paper, porous pots and capillary tubing.',
                  value: 'IBB-A9.1.2',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing the structure of primary xylem vessels in sections of stems based on microscope images.',
                  value: 'IBB-S9.1.1',
                },
                {
                  label:
                    'Measurement of transpiration rates using potometers. (Practical 7)',
                  value: 'IBB-S9.1.2',
                },
                {
                  label:
                    'Design of an experiment to test hypotheses about the effect of temperature or humidity on transpiration rates.',
                  value: 'IBB-S9.1.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Transpiration is the inevitable consequence of gas exchange in the leaf.',
                  value: 'IBB-U9.1.1',
                },
                {
                  label:
                    'Plants transport water from the roots to the leaves to replace losses from transpiration.',
                  value: 'IBB-U9.1.2',
                },
                {
                  label:
                    'The cohesive property of water and the structure of the xylem vessels allow transport under tension.',
                  value: 'IBB-U9.1.3',
                },
                {
                  label:
                    'The adhesive property of water and evaporation generate tension forces in leaf cell walls.',
                  value: 'IBB-U9.1.4',
                },
                {
                  label:
                    'Active uptake of mineral ions in the roots causes absorption of water by osmosis.',
                  value: 'IBB-U9.1.5',
                },
              ],
            },
            {
              label: 'Topic 9.2 Transport in the phloem of plants',
              value: 'transportInThePhloemOfPlants',
              applications: [
                {
                  label:
                    'Structure–function relationships of phloem sieve tubes.',
                  value: 'IBB-A9.2.1',
                },
              ],
              skills: [
                {
                  label:
                    'Identification of xylem and phloem in microscope images of stem and root.',
                  value: 'IBB-S9.2.1',
                },
                {
                  label:
                    'Analysis of data from experiments measuring phloem transport rates using aphid stylets and radioactively-labelled carbon dioxide.',
                  value: 'IBB-S9.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Plants transport organic compounds from sources to sinks.',
                  value: 'IBB-U9.2.1',
                },
                {
                  label:
                    'Incompressibility of water allows transport along hydrostatic pressure gradients.',
                  value: 'IBB-U9.2.2',
                },
                {
                  label:
                    'Active transport is used to load organic compounds into phloem sieve tubes at the source.',
                  value: 'IBB-U9.2.3',
                },
                {
                  label:
                    'High concentrations of solutes in the phloem at the source lead to water uptake by osmosis.',
                  value: 'IBB-U9.2.4',
                },
                {
                  label:
                    'Raised hydrostatic pressure causes the contents of the phloem to flow towards sinks.',
                  value: 'IBB-U9.2.5',
                },
              ],
            },
            {
              label: 'Topic 9.3 Growth in plants',
              value: 'growthInPlants',
              applications: [
                {
                  label:
                    'Micropropagation of plants using tissue from the shoot apex, nutrient agar gels and growth hormones.',
                  value: 'IBB-A9.3.1',
                },
                {
                  label:
                    'Use of micropropagation for rapid bulking up of new varieties, production of virus-free strains of existing varieties and propagation of orchids and other rare species.',
                  value: 'IBB-A9.3.2',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Undifferentiated cells in the meristems of plants allow indeterminate growth.',
                  value: 'IBB-U9.3.1',
                },
                {
                  label:
                    'Mitosis and cell division in the shoot apex provide cells needed for extension of the stem and development of leaves.',
                  value: 'IBB-U9.3.2',
                },
                {
                  label: 'Plant hormones control growth in the shoot apex.',
                  value: 'IBB-U9.3.3',
                },
                {
                  label: 'Plant shoots respond to the environment by tropisms.',
                  value: 'IBB-U9.3.4',
                },
                {
                  label:
                    'Auxin efflux pumps can set up concentration gradients of auxin in plant tissue.',
                  value: 'IBB-U9.3.5',
                },
                {
                  label:
                    'Auxin influences cell growth rates by changing the pattern of gene expression.',
                  value: 'IBB-U9.3.6',
                },
              ],
            },
            {
              label: 'Topic 9.4 Reproduction in plants',
              value: 'reproductionInPlants',
              applications: [
                {
                  label:
                    'Methods used to induce short-day plants to flower out of season.',
                  value: 'IBB-A9.4.1',
                },
              ],
              skills: [
                {
                  label: 'Drawing internal structure of seeds.',
                  value: 'IBB-S9.4.1',
                },
                {
                  label: 'Drawing of half-views of animal-pollinated flowers.',
                  value: 'IBB-S9.4.2',
                },
                {
                  label:
                    'Design of experiments to test hypotheses about factors affecting germination.',
                  value: 'IBB-S9.4.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Flowering involves a change in gene expression in the shoot apex.',
                  value: 'IBB-U9.4.1',
                },
                {
                  label:
                    'The switch to flowering is a response to the length of light and dark periods in many plants.',
                  value: 'IBB-U9.4.2',
                },
                {
                  label:
                    'Success in plant reproduction depends on pollination, fertilization and seed dispersal.',
                  value: 'IBB-U9.4.3',
                },
                {
                  label:
                    'Most flowering plants use mutualistic relationships with pollinators in sexual reproduction.',
                  value: 'IBB-U9.4.4',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 10: Genetics and evolution',
          value: 'geneticsAndEvolution',
          topics: [
            {
              label: 'Topic 10.1 Meiosis',
              value: 'meiosis',
              applications: [],
              skills: [
                {
                  label:
                    'Drawing diagrams to show chiasmata formed by crossing over.',
                  value: 'IBB-S10.1.1',
                },
              ],
              understandings: [
                {
                  label: 'Chromosomes replicate in interphase before meiosis.',
                  value: 'IBB-U10.1.1',
                },
                {
                  label:
                    'Crossing over is the exchange of DNA material between non-sister homologous chromatids.',
                  value: 'IBB-U10.1.2',
                },
                {
                  label:
                    'Crossing over produces new combinations of alleles on the chromosomes of the haploid cells.',
                  value: 'IBB-U10.1.3',
                },
                {
                  label:
                    'Chiasmata formation between non-sister chromatids can result in an exchange of alleles.',
                  value: 'IBB-U10.1.4',
                },
                {
                  label: 'Homologous chromosomes separate in meiosis I.',
                  value: 'IBB-U10.1.5',
                },
                {
                  label: 'Sister chromatids separate in meiosis II.',
                  value: 'IBB-U10.1.6',
                },
                {
                  label:
                    'Independent assortment of genes is due to the random orientation of pairs of homologous chromosomes in meiosis I.',
                  value: 'IBB-U10.1.7',
                },
              ],
            },
            {
              label: 'Topic 10.2 Inheritance',
              value: 'inheritance',
              applications: [
                {
                  label:
                    'Morgan’s discovery of non-Mendelian ratios in Drosophila.',
                  value: 'IBB-A10.2.1',
                },
                {
                  label:
                    'Completion and analysis of Punnett squares for dihybrid traits.',
                  value: 'IBB-A10.2.2',
                },
                {
                  label:
                    'Polygenic traits such as human height may also be influenced by environmental factors.',
                  value: 'IBB-A10.2.3',
                },
              ],
              skills: [
                {
                  label:
                    'Calculation of the predicted genotypic and phenotypic ratio of offspring of dihybrid crosses involving unlinked autosomal genes.',
                  value: 'IBB-S10.2.1',
                },
                {
                  label:
                    'Identification of recombinants in crosses involving two linked genes.',
                  value: 'IBB-S10.2.2',
                },
                {
                  label:
                    'Use of a chi-squared test on data from dihybrid crosses.',
                  value: 'IBB-S10.2.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Gene loci are said to be linked if on the same chromosome.',
                  value: 'IBB-U10.2.1',
                },
                {
                  label:
                    'Unlinked genes segregate independently as a result of meiosis.',
                  value: 'IBB-U10.2.2',
                },
                {
                  label: 'Variation can be discrete or continuous.',
                  value: 'IBB-U10.2.3',
                },
                {
                  label:
                    'The phenotypes of polygenic characteristics tend to show continuous variation.',
                  value: 'IBB-U10.2.4',
                },
                {
                  label:
                    'Chi-squared tests are used to determine whether the difference between an observed and expected frequency distribution is statistically significant.',
                  value: 'IBB-U10.2.5',
                },
              ],
            },
            {
              label: 'Topic 10.3 Gene pools and speciation',
              value: 'genePoolsAndSpeciation',
              applications: [
                {
                  label:
                    'Identifying examples of directional, stabilizing and disruptive selection.',
                  value: 'IBB-A10.3.1',
                },
                {
                  label: 'Speciation in the genus Allium by polyploidy.',
                  value: 'IBB-A10.3.2',
                },
              ],
              skills: [
                {
                  label:
                    'Comparison of allele frequencies of geographically isolated populations.',
                  value: 'IBB-S10.3.1',
                },
              ],
              understandings: [
                {
                  label:
                    'A gene pool consists of all the genes and their different alleles, present in an interbreeding population.',
                  value: 'IBB-U10.3.1',
                },
                {
                  label:
                    'Evolution requires that allele frequencies change with time in populations.',
                  value: 'IBB-U10.3.2',
                },
                {
                  label:
                    'Reproductive isolation of populations can be temporal, behavioural or geographic.',
                  value: 'IBB-U10.3.3',
                },
                {
                  label:
                    'Speciation due to divergence of isolated populations can be gradual.',
                  value: 'IBB-U10.3.4',
                },
                {
                  label: 'Speciation can occur abruptly.',
                  value: 'IBB-U10.3.5',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 11: Animal physiology',
          value: 'animalPhysiology',
          topics: [
            {
              label: 'Topic 11.1 Antibody production and vaccination',
              value: 'antibodyProductionAndVaccination',
              applications: [
                {
                  label:
                    'Smallpox was the first infectious disease of humans to have been eradicated by vaccination.',
                  value: 'IBB-A11.1.1',
                },
                {
                  label:
                    'Monoclonal antibodies to HCG are used in pregnancy test kits.',
                  value: 'IBB-A11.1.2',
                },
                {
                  label:
                    'Antigens on the surface of red blood cells stimulate antibody production in a person with a different blood group.',
                  value: 'IBB-A11.1.3',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of epidemiological data related to vaccination programmes.',
                  value: 'IBB-S11.1.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Every organism has unique molecules on the surface of its cells.',
                  value: 'IBB-U11.1.1',
                },
                {
                  label:
                    'Pathogens can be species-specific although others can cross species barriers.',
                  value: 'IBB-U11.1.2',
                },
                {
                  label:
                    'B lymphocytes are activated by T lymphocytes in mammals.',
                  value: 'IBB-U11.1.3',
                },
                {
                  label:
                    'Activated B cells multiply to form clones of plasma cells and memory cells.',
                  value: 'IBB-U11.1.4',
                },
                {
                  label: 'Plasma cells secrete antibodies.',
                  value: 'IBB-U11.1.5',
                },
                {
                  label: 'Antibodies aid the destruction of pathogens.',
                  value: 'IBB-U11.1.6',
                },
                {
                  label:
                    'White cells release histamine in response to allergens.',
                  value: 'IBB-U11.1.7',
                },
                {
                  label: 'Histamines cause allergic symptoms.',
                  value: 'IBB-U11.1.8',
                },
                {
                  label:
                    'Immunity depends upon the persistence of memory cells.',
                  value: 'IBB-U11.1.9',
                },
                {
                  label:
                    'Vaccines contain antigens that trigger immunity but do not cause the disease.',
                  value: 'IBB-U11.1.10',
                },
                {
                  label:
                    'Fusion of a tumour cell with an antibody-producing plasma cell creates a hybridoma cell.',
                  value: 'IBB-U11.1.11',
                },
                {
                  label:
                    'Monoclonal antibodies are produced by hybridoma cells.',
                  value: 'IBB-U11.1.12',
                },
              ],
            },
            {
              label: 'Topic 11.2 Movement',
              value: 'movement',
              applications: [
                {
                  label: 'Antagonistic pairs of muscles in an insect leg.',
                  value: 'IBB-A11.2.1',
                },
              ],
              skills: [
                {
                  label: 'Annotation of a diagram of the human elbow.',
                  value: 'IBB-S11.2.1',
                },
                {
                  label:
                    'Drawing labelled diagrams of the structure of a sarcomere.',
                  value: 'IBB-S11.2.2',
                },
                {
                  label:
                    'Analysis of electron micrographs to find the state of contraction of muscle fibres.',
                  value: 'IBB-S11.2.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Bones and exoskeletons provide anchorage for muscles and act as levers.',
                  value: 'IBB-U11.2.1',
                },
                {
                  label:
                    'Synovial joints allow certain movements but not others.',
                  value: 'IBB-U11.2.2',
                },
                {
                  label:
                    'Movement of the body requires muscles to work in antagonistic pairs.',
                  value: 'IBB-U11.2.3',
                },
                {
                  label:
                    'Skeletal muscle fibres are multinucleate and contain specialized endoplasmic reticulum.',
                  value: 'IBB-U11.2.4',
                },
                {
                  label: 'Muscle fibres contain many myofibrils.',
                  value: 'IBB-U11.2.5',
                },
                {
                  label: 'Each myofibril is made up of contractile sarcomeres.',
                  value: 'IBB-U11.2.6',
                },
                {
                  label:
                    'The contraction of the skeletal muscle is achieved by the sliding of actin and myosin filaments.',
                  value: 'IBB-U11.2.7',
                },
                {
                  label:
                    'ATP hydrolysis and cross bridge formation are necessary for the filaments to slide.',
                  value: 'IBB-U11.2.8',
                },
                {
                  label:
                    'Calcium ions and the proteins tropomyosin and troponin control muscle contractions.',
                  value: 'IBB-U11.2.9',
                },
              ],
            },
            {
              label: 'Topic 11.3 The kidney and osmoregulation',
              value: 'theKidneyAndOsmoregulation',
              applications: [
                {
                  label: 'Consequences of dehydration and overhydration.',
                  value: 'IBB-A11.3.1',
                },
                {
                  label:
                    'Treatment of kidney failure by hemodialysis or kidney transplant.',
                  value: 'IBB-A11.3.2',
                },
                {
                  label:
                    'Blood cells, glucose, proteins and drugs are detected in urinary tests.',
                  value: 'IBB-A11.3.3',
                },
              ],
              skills: [
                {
                  label: 'Drawing and labelling a diagram of the human kidney.',
                  value: 'IBB-S11.3.1',
                },
                {
                  label: 'Annotation of diagrams of the nephron.',
                  value: 'IBB-S11.3.2',
                },
              ],
              understandings: [
                {
                  label: 'Animals are either osmoregulators or osmoconformers.',
                  value: 'IBB-U11.3.1',
                },
                {
                  label:
                    'The Malpighian tubule system in insects and the kidney carry out osmoregulation and removal of nitrogenous wastes.',
                  value: 'IBB-U11.3.2',
                },
                {
                  label:
                    'The composition of blood in the renal artery is different from that in the renal vein.',
                  value: 'IBB-U11.3.3',
                },
                {
                  label:
                    'The ultrastructure of the glomerulus and Bowman’s capsule facilitate ultrafiltration.',
                  value: 'IBB-U11.3.4',
                },
                {
                  label:
                    'The proximal convoluted tubule selectively reabsorbs useful substances by active transport.',
                  value: 'IBB-U11.3.5',
                },
                {
                  label:
                    'The loop of Henle maintains hypertonic conditions in the medulla.',
                  value: 'IBB-U11.3.6',
                },
                {
                  label:
                    'ADH controls reabsorption of water in the collecting duct.',
                  value: 'IBB-U11.3.7',
                },
                {
                  label:
                    'The length of the loop of Henle is positively correlated with the need for water conservation in animals.',
                  value: 'IBB-U11.3.8',
                },
                {
                  label:
                    'The type of nitrogenous waste in animals is correlated with evolutionary history and habitat.',
                  value: 'IBB-U11.3.9',
                },
              ],
            },
            {
              label: 'Topic 11.4 Sexual reproduction',
              value: 'sexualReproduction',
              applications: [
                {
                  label:
                    'The average 38-week pregnancy in humans can be positioned on a graph showing the correlation between animal size and the development of the young at birth for other mammals.',
                  value: 'IBB-A11.4.1',
                },
              ],
              skills: [
                {
                  label:
                    'Annotation of diagrams of seminiferous tubule and ovary to show the stages of gametogenesis.',
                  value: 'IBB-S11.4.1',
                },
                {
                  label:
                    'Annotation of diagrams of mature sperm and egg to indicate functions.',
                  value: 'IBB-S11.4.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Spermatogenesis and oogenesis both involve mitosis, cell growth, two divisions of meiosis and differentiation.',
                  value: 'IBB-U11.4.1',
                },
                {
                  label:
                    'Processes in spermatogenesis and oogenesis result in different numbers of gametes with different amounts of cytoplasm.',
                  value: 'IBB-U11.4.2',
                },
                {
                  label:
                    'Fertilization in animals can be internal or external.',
                  value: 'IBB-U11.4.3',
                },
                {
                  label:
                    'Fertilization involves mechanisms that prevent polyspermy.',
                  value: 'IBB-U11.4.4',
                },
                {
                  label:
                    'Implantation of the blastocyst in the endometrium is essential for the continuation of pregnancy.',
                  value: 'IBB-U11.4.5',
                },
                {
                  label:
                    'HCG stimulates the ovary to secrete progesterone during early pregnancy.',
                  value: 'IBB-U11.4.6',
                },
                {
                  label:
                    'The placenta facilitates the exchange of materials between the mother and fetus.',
                  value: 'IBB-U11.4.7',
                },
                {
                  label:
                    'Estrogen and progesterone are secreted by the placenta once it has formed.',
                  value: 'IBB-U11.4.8',
                },
                {
                  label:
                    'Birth is mediated by positive feedback involving estrogen and oxytocin.',
                  value: 'IBB-U11.4.9',
                },
              ],
            },
          ],
        },
        {
          label: 'Options A: Neurobiology and behavior',
          value: 'optionA-neurobiologyAndBehaviour',
          topics: [
            {
              label: 'Topic A.1: Neural development',
              value: 'neuralDevelopment',
              applications: [
                {
                  label:
                    'Incomplete closure of the embryonic neural tube can cause spina bifida.',
                  value: 'IBB-AOA.1.1',
                },
                {
                  label:
                    'Events such as strokes may promote reorganization of brain function.',
                  value: 'IBB-AOA.1.2',
                },
              ],
              skills: [
                {
                  label:
                    'Annotation of a diagram of embryonic tissues in Xenopus, used as an animal model, during neurulation.',
                  value: 'IBB-SOA.1.1',
                },
              ],
              understandings: [
                {
                  label:
                    'The neural tube of embryonic chordates is formed by infolding of ectoderm followed by elongation of the tube.',
                  value: 'IBB-UOA.1.1',
                },
                {
                  label:
                    'Neurons are initially produced by differentiation in the neural tube.',
                  value: 'IBB-UOA.1.2',
                },
                {
                  label: 'Immature neurons migrate to a final location.',
                  value: 'IBB-UOA.1.3',
                },
                {
                  label:
                    'An axon grows from each immature neuron in response to chemical stimuli.',
                  value: 'IBB-UOA.1.4',
                },
                {
                  label:
                    'Some axons extend beyond the neural tube to reach other parts of the body.',
                  value: 'IBB-UOA.1.5',
                },
                {
                  label: 'A developing neuron forms multiple synapses.',
                  value: 'IBB-UOA.1.6',
                },
                {
                  label: 'Synapses that are not used do not persist.',
                  value: 'IBB-UOA.1.7',
                },
                {
                  label: 'Neural pruning involves the loss of unused neurons.',
                  value: 'IBB-UOA.1.8',
                },
                {
                  label:
                    'The plasticity of the nervous system allows it to change with experience.',
                  value: 'IBB-UOA.1.9',
                },
              ],
            },
            {
              label: 'Topic A.2: The human brain',
              value: 'theHumanBrain',
              applications: [
                {
                  label:
                    'Visual cortex, Broca’s area, nucleus accumbens as areas of the brain with specific functions.',
                  value: 'IBB-AOA.2.1',
                },
                {
                  label:
                    'Swallowing, breathing and heart rate as examples of activities coordinated by the medulla.',
                  value: 'IBB-AOA.2.2',
                },
                {
                  label: 'Use of the pupil reflex to evaluate brain damage.',
                  value: 'IBB-AOA.2.3',
                },
                {
                  label:
                    'Use of animal experiments, autopsy, lesions and fMRI to identify the role of different brain parts.',
                  value: 'IBB-AOA.2.4',
                },
              ],
              skills: [
                {
                  label:
                    'Identification of parts of the brain in a photograph, diagram or scan of the brain.',
                  value: 'IBB-SOA.2.1',
                },
                {
                  label:
                    'Analysis of correlations between body size and brain size in different animals.',
                  value: 'IBB-SOA.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'The anterior part of the neural tube expands to form the brain.',
                  value: 'IBB-UOA.2.1',
                },
                {
                  label: 'Different parts of the brain have specific roles.',
                  value: 'IBB-UOA.2.2',
                },
                {
                  label:
                    'The autonomic nervous system controls involuntary processes in the body using centres located mainly in the brain stem.',
                  value: 'IBB-UOA.2.3',
                },
                {
                  label:
                    'The cerebral cortex forms a larger proportion of the brain and is more highly developed in humans than other animals.',
                  value: 'IBB-UOA.2.4',
                },
                {
                  label:
                    'The human cerebral cortex has become enlarged principally by an increase in total area with extensive folding to accommodate it within the cranium.',
                  value: 'IBB-UOA.2.5',
                },
                {
                  label:
                    'The cerebral hemispheres are responsible for higher order functions.',
                  value: 'IBB-UOA.2.6',
                },
                {
                  label:
                    'The left cerebral hemisphere receives sensory input from sensory receptors in the right side of the body and the right side of the visual field in both eyes and vice versa for the right hemisphere.',
                  value: 'IBB-UOA.2.7',
                },
                {
                  label:
                    'The left cerebral hemisphere controls muscle contraction in the right side of the body and vice versa for the right hemisphere.',
                  value: 'IBB-UOA.2.8',
                },
                {
                  label: 'Brain metabolism requires large energy inputs.',
                  value: 'IBB-UOA.2.9',
                },
              ],
            },
            {
              label: 'Topic A.3: Perception of stimuli',
              value: 'perceptionOfStimuli',
              applications: [
                {
                  label:
                    'Red-green colour-blindness as a variant of normal trichromatic vision.',
                  value: 'IBB-AOA.3.1',
                },
                {
                  label:
                    'Detection of chemicals in the air by the many different olfactory receptors.',
                  value: 'IBB-AOA.3.2',
                },
                {
                  label: 'Use of cochlear implants in deaf patients.',
                  value: 'IBB-AOA.3.3',
                },
              ],
              skills: [
                {
                  label:
                    'Labelling a diagram of the structure of the human eye.',
                  value: 'IBB-SOA.3.1',
                },
                {
                  label:
                    'Annotation of a diagram of the retina to show the cell types and the direction in which light moves.',
                  value: 'IBB-SOA.3.2',
                },
                {
                  label:
                    'Labelling a diagram of the structure of the human ear.',
                  value: 'IBB-SOA.3.3',
                },
              ],
              understandings: [
                {
                  label: 'Receptors detect changes in the environment.',
                  value: 'IBB-UOA.3.1',
                },
                {
                  label:
                    'Rods and cones are photoreceptors located in the retina.',
                  value: 'IBB-UOA.3.2',
                },
                {
                  label:
                    'Rods and cones differ in their sensitivities to light intensities and wavelengths.',
                  value: 'IBB-UOA.3.3',
                },
                {
                  label:
                    'Bipolar cells send the impulses from rods and cones to ganglion cells.',
                  value: 'IBB-UOA.3.4',
                },
                {
                  label:
                    'Ganglion cells send messages to the brain via the optic nerve.',
                  value: 'IBB-UOA.3.5',
                },
                {
                  label:
                    'The information from the right field of vision from both eyes is sent to the left part of the visual cortex and vice versa.',
                  value: 'IBB-UOA.3.6',
                },
                {
                  label:
                    'Structures in the middle ear transmit and amplify sound.',
                  value: 'IBB-UOA.3.7',
                },
                {
                  label:
                    'Sensory hairs of the cochlea detect sounds of specific wavelengths.',
                  value: 'IBB-UOA.3.8',
                },
                {
                  label:
                    'Impulses caused by sound perception are transmitted to the brain via the auditory nerve.',
                  value: 'IBB-UOA.3.9',
                },
                {
                  label:
                    'Hair cells in the semicircular canals detect movement of the head.',
                  value: 'IBB-UOA.3.10',
                },
              ],
            },
            {
              label: 'Topic A.4: Innate and learned behavior',
              value: 'innateAndLearnedBehavior',
              applications: [
                {
                  label:
                    'Withdrawal reflex of the hand from a painful stimulus.',
                  value: 'IBB-AOA.4.1',
                },
                {
                  label:
                    'Pavlov’s experiments into reflex conditioning in dogs.',
                  value: 'IBB-AOA.4.2',
                },
                {
                  label:
                    'The role of inheritance and learning in the development of birdsong.',
                  value: 'IBB-AOA.4.3',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of data from invertebrate behaviour experiments in terms of the effect on chances of survival and reproduction.',
                  value: 'IBB-SOA.4.1',
                },
                {
                  label:
                    'Drawing and labelling a diagram of a reflex arc for a pain withdrawal reflex.',
                  value: 'IBB-SOA.4.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Innate behaviour is inherited from parents and so develops independently of the environment.',
                  value: 'IBB-UOA.4.1',
                },
                {
                  label:
                    'Autonomic and involuntary responses are referred to as reflexes.',
                  value: 'IBB-UOA.4.2',
                },
                {
                  label:
                    'Reflex arcs comprise the neurons that mediate reflexes.',
                  value: 'IBB-UOA.4.3',
                },
                {
                  label:
                    'Reflex conditioning involves forming new associations.',
                  value: 'IBB-UOA.4.4',
                },
                {
                  label:
                    'Learned behaviour develops as a result of experience.',
                  value: 'IBB-UOA.4.5',
                },
                {
                  label:
                    'Imprinting is learning occurring at a particular life stage and is independent of the consequences of behaviour.',
                  value: 'IBB-UOA.4.6',
                },
                {
                  label:
                    'Operant conditioning is a form of learning that consists of trial and error experiences.',
                  value: 'IBB-UOA.4.7',
                },
                {
                  label: 'Learning is the acquisition of skill or knowledge.',
                  value: 'IBB-UOA.4.8',
                },
                {
                  label:
                    'Memory is the process of encoding, storing and accessing information.',
                  value: 'IBB-UOA.4.9',
                },
              ],
            },
            {
              label: 'Topic A.5: Neuropharmacology',
              value: 'neuropharmacology',
              applications: [
                {
                  label:
                    'Effects on the nervous system of two stimulants and two sedatives.',
                  value: 'IBB-AOA.5.1',
                },
                {
                  label: 'The effect of anesthetics on awareness.',
                  value: 'IBB-AOA.5.2',
                },
                {
                  label: 'Endorphins can act as painkillers.',
                  value: 'IBB-AOA.5.3',
                },
              ],
              skills: [
                {
                  label:
                    'Evaluation of data showing the impact of MDMA (ecstasy) on serotonin and dopamine metabolism in the brain.',
                  value: 'IBB-SOA.5.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Some neurotransmitters excite nerve impulses in postsynaptic neurons and others inhibit them.',
                  value: 'IBB-UOA.5.1',
                },
                {
                  label:
                    'Nerve impulses are initiated or inhibited in post-synaptic neurons as a result of summation of all excitatory and inhibitory neurotransmitters received from presynaptic neurones.',
                  value: 'IBB-UOA.5.2',
                },
                {
                  label:
                    'Many different slow-acting neurotransmitters modulate fast synaptic transmission in the brain.',
                  value: 'IBB-UOA.5.3',
                },
                {
                  label:
                    'Memory and learning involve changes in neurones caused by slow-acting neurotransmitters.',
                  value: 'IBB-UOA.5.4',
                },
                {
                  label:
                    'Psychoactive drugs affect the brain by either increasing or decreasing postsynaptic transmission.',
                  value: 'IBB-UOA.5.5',
                },
                {
                  label:
                    'Anesthetics act by interfering with neural transmission between areas of sensory perception and the CNS.',
                  value: 'IBB-UOA.5.6',
                },
                {
                  label:
                    'Stimulant drugs mimic the stimulation provided by the sympathetic nervous system.',
                  value: 'IBB-UOA.5.7',
                },
                {
                  label:
                    'Addiction can be affected by genetic predisposition, social environment and dopamine secretion.',
                  value: 'IBB-UOA.5.8',
                },
              ],
            },
            {
              label: 'Topic A.6: Ethology',
              value: 'ethology',
              applications: [
                {
                  label:
                    'Migratory behaviour in blackcaps as an example of the genetic basis of behaviour and its change by natural selection.',
                  value: 'IBB-AOA.6.1',
                },
                {
                  label:
                    'Blood sharing in vampire bats as an example of the development of altruistic behaviour by natural selection.',
                  value: 'IBB-AOA.6.2',
                },
                {
                  label:
                    'Foraging behaviour in shore crabs as an example of increasing chances of survival by optimal prey choice.',
                  value: 'IBB-AOA.6.3',
                },
                {
                  label:
                    'Breeding strategies in coho salmon populations as an example of behaviour affecting chances of survival and reproduction.',
                  value: 'IBB-AOA.6.4',
                },
                {
                  label:
                    'Courtship in birds of paradise as an example of mate selection.',
                  value: 'IBB-AOA.6.5',
                },
                {
                  label:
                    'Synchronized oestrus in female lions in a pride as an example of innate behaviour that increases the chances of survival and reproduction of offspring.',
                  value: 'IBB-AOA.6.6',
                },
                {
                  label:
                    'Feeding on cream from milk bottles in blue tits as an example of the development and loss of learned behaviour.',
                  value: 'IBB-AOA.6.7',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Ethology is the study of animal behaviour in natural conditions.',
                  value: 'IBB-UOA.6.1',
                },
                {
                  label:
                    'Natural selection can change the frequency of observed animal behaviour.',
                  value: 'IBB-UOA.6.2',
                },
                {
                  label:
                    'Behaviour that increases the chances of survival and reproduction will become more prevalent in a population.',
                  value: 'IBB-UOA.6.3',
                },
                {
                  label:
                    'Learned behaviour can spread through a population or be lost from it more rapidly than innate behaviour.',
                  value: 'IBB-UOA.6.4',
                },
              ],
            },
          ],
        },
        {
          label: 'Options B: Biotechnology and bioinformatics',
          value: 'optionB-biotechnologyAndBioinformatics',
          topics: [
            {
              label: 'Topic B.1: Microbiology: organisms in industry',
              value: 'microbiologyOrganismsInIndustry',
              applications: [
                {
                  label:
                    'Deep-tank batch fermentation in the mass production of penicillin.',
                  value: 'IBB-AOB.1.1',
                },
                {
                  label:
                    'Production of citric acid in a continuous fermenter by Aspergillus niger and its use as a preservative and flavouring.',
                  value: 'IBB-AOB.1.2',
                },
                {
                  label:
                    'Biogas is produced by bacteria and archaeans from organic matter in fermenters.',
                  value: 'IBB-AOB.1.3',
                },
              ],
              skills: [
                {
                  label:
                    'Gram staining of Gram-positive and Gram-negative bacteria.',
                  value: 'IBB-SOB.1.1',
                },
                {
                  label:
                    'Experiments showing zone of inhibition of bacterial growth by bactericides in sterile bacterial cultures.',
                  value: 'IBB-SOB.1.2',
                },
                {
                  label: 'Production of biogas in a small-scale fermenter.',
                  value: 'IBB-SOB.1.3',
                },
              ],
              understandings: [
                {
                  label: 'Microorganisms are metabolically diverse.',
                  value: 'IBB-UOB.1.1',
                },
                {
                  label:
                    'Microorganisms are used in industry because they are small and have a fast growth rate.',
                  value: 'IBB-UOB.1.2',
                },
                {
                  label:
                    'Pathway engineering optimizes genetic and regulatory processes within microorganisms.',
                  value: 'IBB-UOB.1.3',
                },
                {
                  label:
                    'Pathway engineering is used industrially to produce metabolites of interest.',
                  value: 'IBB-UOB.1.4',
                },
                {
                  label:
                    'Fermenters allow large-scale production of metabolites by microorganisms.',
                  value: 'IBB-UOB.1.5',
                },
                {
                  label:
                    'Fermentation is carried out by batch or continuous culture.',
                  value: 'IBB-UOB.1.6',
                },
                {
                  label:
                    'Microorganisms in fermenters become limited by their own waste products.',
                  value: 'IBB-UOB.1.7',
                },
                {
                  label:
                    'Probes are used to monitor conditions within fermenters.',
                  value: 'IBB-UOB.1.8',
                },
                {
                  label:
                    'Conditions are maintained at optimal levels for the growth of the microorganisms being cultured.',
                  value: 'IBB-UOB.1.9',
                },
              ],
            },
            {
              label: 'Topic B.2: Biotechnology in agriculture',
              value: 'biotechnologyInAgriculture',
              applications: [
                {
                  label:
                    'Use of tumour-inducing (Ti) plasmid of Agrobacterium tumefaciens to introduce glyphosate resistance into soybean crops.',
                  value: 'IBB-AOB.2.1',
                },
                {
                  label:
                    'Genetic modification of tobacco mosaic virus to allow bulk production of Hepatitis B vaccine in tobacco plants.',
                  value: 'IBB-AOB.2.2',
                },
                {
                  label:
                    'Production of Amflora potato (Solanum tuberosum) for paper and adhesive industries.',
                  value: 'IBB-AOB.2.3',
                },
              ],
              skills: [
                {
                  label:
                    'Evaluation of data on the environmental impact of glyphosate-tolerant soybeans.',
                  value: 'IBB-SOB.2.1',
                },
                {
                  label: 'Identification of an open reading frame (ORF).',
                  value: 'IBB-SOB.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Transgenic organisms produce proteins that were not previously part of their species’ proteome.',
                  value: 'IBB-UOB.2.1',
                },
                {
                  label:
                    'Genetic modification can be used to overcome environmental resistance to increase crop yields.',
                  value: 'IBB-UOB.2.2',
                },
                {
                  label:
                    'Genetically modified crop plants can be used to produce novel products.',
                  value: 'IBB-UOB.2.3',
                },
                {
                  label:
                    'Bioinformatics plays a role in identifying target genes.',
                  value: 'IBB-UOB.2.4',
                },
                {
                  label:
                    'The target gene is linked to other sequences that control its expression.',
                  value: 'IBB-UOB.2.5',
                },
                {
                  label:
                    'An open reading frame is a significant length of DNA from a start codon to a stop codon.',
                  value: 'IBB-UOB.2.6',
                },
                {
                  label: 'Marker genes are used to indicate successful uptake.',
                  value: 'IBB-UOB.2.7',
                },
                {
                  label:
                    'Recombinant DNA must be inserted into the plant cell and taken up by its chromosome or chloroplast DNA.',
                  value: 'IBB-UOB.2.8',
                },
                {
                  label:
                    'Recombinant DNA can be introduced into whole plants, leaf discs or protoplasts.',
                  value: 'IBB-UOB.2.9',
                },
                {
                  label:
                    'Recombinant DNA can be introduced by direct physical and chemical methods or indirectly by vectors.',
                  value: 'IBB-UOB.2.10',
                },
              ],
            },
            {
              label: 'Topic B.3: Environmental protection',
              value: 'environmentalProtection',
              applications: [
                {
                  label:
                    'Degradation of benzene by halophilic bacteria such as Marinobacter.',
                  value: 'IBB-AOB.3.1',
                },
                {
                  label: 'Degradation of oil by Pseudomonas.',
                  value: 'IBB-AOB.3.2',
                },
                {
                  label:
                    'Conversion by Pseudomonas of methyl mercury into elemental mercury.',
                  value: 'IBB-AOB.3.3',
                },
                {
                  label:
                    'Use of biofilms in trickle filter beds for sewage treatment.',
                  value: 'IBB-AOB.3.4',
                },
              ],
              skills: [
                {
                  label:
                    'Evaluation of data or media reports on environmental problems caused by biofilms.',
                  value: 'IBB-SOB.3.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Responses to pollution incidents can involve bioremediation combined with physical and chemical procedures.',
                  value: 'IBB-UOB.3.1',
                },
                {
                  label: 'Microorganisms are used in bioremediation.',
                  value: 'IBB-UOB.3.2',
                },
                {
                  label: 'Some pollutants are metabolized by microorganisms.',
                  value: 'IBB-UOB.3.3',
                },
                {
                  label:
                    'Cooperative aggregates of microorganisms can form biofilms.',
                  value: 'IBB-UOB.3.4',
                },
                {
                  label: 'Biofilms possess emergent properties.',
                  value: 'IBB-UOB.3.5',
                },
                {
                  label:
                    'Microorganisms growing in a biofilm are highly resistant to antimicrobial agents.',
                  value: 'IBB-UOB.3.6',
                },
                {
                  label:
                    'Microorganisms in biofilms cooperate through quorum sensing.',
                  value: 'IBB-UOB.3.7',
                },
                {
                  label:
                    'Bacteriophages are used in the disinfection of water systems.',
                  value: 'IBB-UOB.3.8',
                },
              ],
            },
            {
              label: 'Topic B.4: Medicine',
              value: 'medicine',
              applications: [
                {
                  label:
                    'Use of PCR to detect different strains of influenza virus.',
                  value: 'IBB-AOB.4.1',
                },
                {
                  label:
                    'Tracking tumour cells using transferin linked to luminescent probes.',
                  value: 'IBB-AOB.4.2',
                },
                {
                  label: 'Biopharming of antithrombin.',
                  value: 'IBB-AOB.4.3',
                },
                {
                  label:
                    'Use of viral vectors in the treatment of Severe Combined Immunodeficiency (SCID).',
                  value: 'IBB-AOB.4.4',
                },
              ],
              skills: [
                {
                  label: 'Analysis of a simple microarray.',
                  value: 'IBB-SOB.4.1',
                },
                {
                  label:
                    'Interpretation of the results of an ELISA diagnostic test.',
                  value: 'IBB-SOB.4.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Infection by a pathogen can be detected by the presence of its genetic material or by its antigens.',
                  value: 'IBB-UOB.4.1',
                },
                {
                  label:
                    'Predisposition to a genetic disease can be detected through the presence of markers.',
                  value: 'IBB-UOB.4.2',
                },
                {
                  label:
                    'DNA microarrays can be used to test for genetic predisposition or to diagnose the disease.',
                  value: 'IBB-UOB.4.3',
                },
                {
                  label:
                    'Metabolites that indicate disease can be detected in blood and urine.',
                  value: 'IBB-UOB.4.4',
                },
                {
                  label:
                    'Tracking experiments are used to gain information about the localization and interaction of a desired protein.',
                  value: 'IBB-UOB.4.5',
                },
                {
                  label:
                    'Biopharming uses genetically modified animals and plants to produce proteins for therapeutic use.',
                  value: 'IBB-UOB.4.6',
                },
                {
                  label: 'Viral vectors can be used in gene therapy.',
                  value: 'IBB-UOB.4.7',
                },
              ],
            },
            {
              label: 'Topic B.5: Bioinformatics',
              value: 'bioinformatics',
              applications: [
                {
                  label:
                    'Use of knockout technology in mice to determine gene function.',
                  value: 'IBB-AOB.5.1',
                },
                {
                  label: 'Discovery of genes by EST data mining.',
                  value: 'IBB-AOB.5.2',
                },
              ],
              skills: [
                {
                  label:
                    'Explore chromosome 21 in databases (for example in Ensembl).',
                  value: 'IBB-SOB.5.1',
                },
                {
                  label: 'Use of software to align two proteins.',
                  value: 'IBB-SOB.5.2',
                },
                {
                  label:
                    'Use of software to construct simple cladograms and phylograms of related organisms using DNA sequences.',
                  value: 'IBB-SOB.5.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Databases allow scientists easy access to information.',
                  value: 'IBB-UOB.5.1',
                },
                {
                  label:
                    'The body of data stored in databases is increasing exponentially.',
                  value: 'IBB-UOB.5.2',
                },
                {
                  label:
                    'BLAST searches can identify similar sequences in different organisms.',
                  value: 'IBB-UOB.5.3',
                },
                {
                  label:
                    'Gene function can be studied using model organisms with similar sequences.',
                  value: 'IBB-UOB.5.4',
                },
                {
                  label:
                    'Sequence alignment software allows comparison of sequences from different organisms.',
                  value: 'IBB-UOB.5.5',
                },
                {
                  label:
                    'BLASTn allows nucleotide sequence alignment while BLASTp allows protein alignment.',
                  value: 'IBB-UOB.5.6',
                },
                {
                  label:
                    'Databases can be searched to compare newly identified sequences with sequences of known function in other organisms.',
                  value: 'IBB-UOB.5.7',
                },
                {
                  label:
                    'Multiple sequence alignment is used in the study of phylogenetics.',
                  value: 'IBB-UOB.5.8',
                },
                {
                  label:
                    'EST is an expressed sequence tag that can be used to identify potential genes.',
                  value: 'IBB-UOB.5.9',
                },
              ],
            },
          ],
        },
        {
          label: 'Options C: Ecology and conservation',
          value: 'optionC-ecologyAndConservation',
          topics: [
            {
              label: 'Topic C.1: Species and communities',
              value: 'speciesAndCommunities',
              applications: [
                {
                  label:
                    'Distribution of one animal and one plant species to illustrate limits of tolerance and zones of stress.',
                  value: 'IBB-AOC.1.1',
                },
                {
                  label:
                    'Local examples to illustrate the range of ways in which species can interact within a community.',
                  value: 'IBB-AOC.1.2',
                },
                {
                  label:
                    'The symbiotic relationship between Zooxanthellae and reef-building coral reef species.',
                  value: 'IBB-AOC.1.3',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of a data set that illustrates the distinction between fundamental and realized niche.',
                  value: 'IBB-SOC.1.1',
                },
                {
                  label:
                    'Use of a transect to correlate the distribution of plant or animal species with an abiotic variable.',
                  value: 'IBB-SOC.1.2',
                },
              ],
              understandings: [
                {
                  label:
                    'The distribution of species is affected by limiting factors.',
                  value: 'IBB-UOC.1.1',
                },
                {
                  label:
                    'Community structure can be strongly affected by keystone species.',
                  value: 'IBB-UOC.1.2',
                },
                {
                  label:
                    'Each species plays a unique role within a community because of the unique combination of its spatial habitat and interactions with other species.',
                  value: 'IBB-UOC.1.3',
                },
                {
                  label:
                    'Interactions between species in a community can be classified according to their effect.',
                  value: 'IBB-UOC.1.4',
                },
                {
                  label:
                    'Two species cannot survive indefinitely in the same habitat if their niches are identical.',
                  value: 'IBB-UOC.1.5',
                },
              ],
            },
            {
              label: 'Topic C.2: Communities and ecosystems',
              value: 'communitiesAndEcosystems',
              applications: [
                {
                  label:
                    'Conversion ratio in sustainable food production practices.',
                  value: 'IBB-AOC.2.1',
                },
                {
                  label:
                    'Consideration of one example of how humans interfere with nutrient cycling.',
                  value: 'IBB-AOC.2.2',
                },
              ],
              skills: [
                {
                  label:
                    'Comparison of pyramids of energy from different ecosystems.',
                  value: 'IBB-SOC.2.1',
                },
                {
                  label:
                    'Analysis of a climograph showing the relationship between temperature, rainfall and the type of ecosystem.',
                  value: 'IBB-SOC.2.2',
                },
                {
                  label:
                    'Construction of Gersmehl diagrams to show the inter-relationships between nutrient stores and flows between taiga, desert and tropical rainforest.',
                  value: 'IBB-SOC.2.3',
                },
                {
                  label: 'Analysis of data showing primary succession.',
                  value: 'IBB-SOC.2.4',
                },
                {
                  label:
                    'Investigation into the effect of an environmental disturbance on an ecosystem.',
                  value: 'IBB-SOC.2.5',
                },
              ],
              understandings: [
                {
                  label:
                    'Most species occupy different trophic levels in multiple food chains.',
                  value: 'IBB-UOC.2.1',
                },
                {
                  label:
                    'A food web shows all the possible food chains in a community.',
                  value: 'IBB-UOC.2.2',
                },
                {
                  label:
                    'The percentage of ingested energy converted to biomass is dependent on the respiration rate.',
                  value: 'IBB-UOC.2.3',
                },
                {
                  label:
                    'The type of stable ecosystem that will emerge in an area is predictable based on climate.',
                  value: 'IBB-UOC.2.4',
                },
                {
                  label:
                    'In closed ecosystems energy but not matter is exchanged with the surroundings.',
                  value: 'IBB-UOC.2.5',
                },
                {
                  label:
                    'Disturbance influences the structure and rate of change within ecosystems.',
                  value: 'IBB-UOC.2.6',
                },
              ],
            },
            {
              label: 'Topic C.3: Impacts of humans on ecosystems',
              value: 'impactsOfHumansOnEcosystems',
              applications: [
                {
                  label:
                    'Study of the introduction of cane toads in Australia and one other local example of the introduction of an alien species.',
                  value: 'IBB-AOC.3.1',
                },
                {
                  label:
                    'Discussion of the trade-off between control of the malarial parasite and DDT pollution.',
                  value: 'IBB-AOC.3.2',
                },
                {
                  label:
                    'Case study of the impact of marine plastic debris on Laysan albatrosses and one other named species.',
                  value: 'IBB-AOC.3.3',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of data illustrating the causes and consequences of biomagnification.',
                  value: 'IBB-SOC.3.1',
                },
                {
                  label:
                    'Evaluation of eradication programmes and biological control as measures to reduce the impact of alien species.',
                  value: 'IBB-SOC.3.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Introduced alien species can escape into local ecosystems and become invasive.',
                  value: 'IBB-UOC.3.1',
                },
                {
                  label:
                    'Competitive exclusion and the absence of predators can lead to reduction in the numbers of endemic species when alien species become invasive.',
                  value: 'IBB-UOC.3.2',
                },
                {
                  label:
                    'Pollutants become concentrated in the tissues of organisms at higher trophic levels by biomagnification.',
                  value: 'IBB-UOC.3.3',
                },
                {
                  label:
                    'Macroplastic and microplastic debris has accumulated in marine environments.',
                  value: 'IBB-UOC.3.4',
                },
              ],
            },
            {
              label: 'Topic C.4: Conservation of biodiversity',
              value: 'conservationOfBiodiversity',
              applications: [
                {
                  label:
                    'Case study of the captive breeding and reintroduction of an endangered animal species.',
                  value: 'IBB-AOC.4.1',
                },
                {
                  label:
                    'Analysis of the impact of biogeographic factors on diversity limited to island size and edge effects.',
                  value: 'IBB-AOC.4.2',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of the biodiversity of two local communities using Simpson’s reciprocal index of diversity.',
                  value: 'IBB-SOC.4.1',
                },
              ],
              understandings: [
                {
                  label:
                    'An indicator species is an organism used to assess a specific environmental condition.',
                  value: 'IBB-UOC.4.1',
                },
                {
                  label:
                    'Relative numbers of indicator species can be used to calculate the value of a biotic index.',
                  value: 'IBB-UOC.4.2',
                },
                {
                  label:
                    'In situ conservation may require active management of nature reserves or national parks.',
                  value: 'IBB-UOC.4.3',
                },
                {
                  label:
                    'Ex situ conservation is the preservation of species outside their natural habitats.',
                  value: 'IBB-UOC.4.4',
                },
                {
                  label: 'Biogeographic factors affect species diversity.',
                  value: 'IBB-UOC.4.5',
                },
                {
                  label:
                    'Richness and evenness are components of biodiversity.',
                  value: 'IBB-UOC.4.6',
                },
              ],
            },
            {
              label: 'Topic C.5: Population ecology',
              value: 'populationEcology',
              applications: [
                {
                  label:
                    'Evaluating the methods used to estimate the size of commercial stock of marine resources.',
                  value: 'IBB-AOC.5.1',
                },
                {
                  label:
                    'Use of the capture-mark-release-recapture method to estimate the population size of an animal species.',
                  value: 'IBB-AOC.5.2',
                },
                {
                  label:
                    'Discussion of the effect of natality, mortality, immigration and emigration on population size.',
                  value: 'IBB-AOC.5.3',
                },
                {
                  label:
                    'Analysis of the effect of population size, age and reproductive status on sustainable fishing practices.',
                  value: 'IBB-AOC.5.4',
                },
                {
                  label:
                    'Bottom-up control of algal blooms by shortage of nutrients and top-down control by herbivory.',
                  value: 'IBB-AOC.5.5',
                },
              ],
              skills: [
                {
                  label:
                    'Modelling the growth curve using a simple organism such as yeast or species of Lemna.',
                  value: 'IBB-SOC.5.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Sampling techniques are used to estimate population size.',
                  value: 'IBB-UOC.5.1',
                },
                {
                  label:
                    'The exponential growth pattern occurs in an ideal, unlimited environment.',
                  value: 'IBB-UOC.5.2',
                },
                {
                  label:
                    'Population growth slows as a population reaches the carrying capacity of the environment.',
                  value: 'IBB-UOC.5.3',
                },
                {
                  label:
                    'The phases shown in the sigmoid curve can be explained by relative rates of natality, mortality, immigration and emigration.',
                  value: 'IBB-UOC.5.4',
                },
                {
                  label: 'Limiting factors can be top down or bottom up.',
                  value: 'IBB-UOC.5.5',
                },
              ],
            },
            {
              label: 'Topic C.6: Nitrogen and phosphorus cycles',
              value: 'nitrogenAndPhosphorusCycles',
              applications: [
                {
                  label: 'The impact of waterlogging on the nitrogen cycle.',
                  value: 'IBB-AOC.6.1',
                },
                {
                  label:
                    'Insectivorous plants as an adaptation for low nitrogen availability in waterlogged soils.',
                  value: 'IBB-AOC.6.2',
                },
              ],
              skills: [
                {
                  label:
                    'Drawing and labelling a diagram of the nitrogen cycle.',
                  value: 'IBB-SOC.6.1',
                },
                {
                  label: 'Assess the nutrient content of a soil sample.',
                  value: 'IBB-SOC.6.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Nitrogen-fixing bacteria convert atmospheric nitrogen to ammonia.',
                  value: 'IBB-UOC.6.1',
                },
                {
                  label:
                    'Rhizobium associates with roots in a mutualistic relationship.',
                  value: 'IBB-UOC.6.2',
                },
                {
                  label:
                    'In the absence of oxygen denitrifying bacteria reduce nitrate in the soil.',
                  value: 'IBB-UOC.6.3',
                },
                {
                  label:
                    'Phosphorus can be added to the phosphorus cycle by application of fertilizer or removed by the harvesting of agricultural crops.',
                  value: 'IBB-UOC.6.4',
                },
                {
                  label:
                    'The rate of turnover in the phosphorus cycle is much lower than the nitrogen cycle.',
                  value: 'IBB-UOC.6.5',
                },
                {
                  label:
                    'Availability of phosphate may become limiting to agriculture in the future.',
                  value: 'IBB-UOC.6.6',
                },
                {
                  label:
                    'Leaching of mineral nutrients from agricultural land into rivers causes eutrophication and leads to increased biochemical oxygen demand.',
                  value: 'IBB-UOC.6.7',
                },
              ],
            },
          ],
        },
        {
          label: 'Options D: Human physiology',
          value: 'optionD-humanPhysiology',
          topics: [
            {
              label: 'Topic D.1: Human nutrition',
              value: 'humanNutrition',
              applications: [
                {
                  label:
                    'Production of ascorbic acid by some mammals, but not others that need a dietary supply.',
                  value: 'IBB-AOD.1.1',
                },
                {
                  label: 'Cause and treatment of phenylketonuria (PKU).',
                  value: 'IBB-AOD.1.2',
                },
                {
                  label:
                    'Lack of Vitamin D or calcium can affect bone mineralization and cause rickets or osteomalacia.',
                  value: 'IBB-AOD.1.3',
                },
                {
                  label: 'Breakdown of heart muscle due to anorexia.',
                  value: 'IBB-AOD.1.4',
                },
                {
                  label:
                    'Cholesterol in blood as an indicator of the risk of coronary heart disease.',
                  value: 'IBB-AOD.1.5',
                },
              ],
              skills: [
                {
                  label:
                    'Determination of the energy content of food by combustion.',
                  value: 'IBB-SOD.1.1',
                },
                {
                  label:
                    'Use of databases of nutritional content of foods and software to calculate intakes of essential nutrients from a daily diet.',
                  value: 'IBB-SOD.1.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Essential nutrients cannot be synthesized by the body, therefore they have to be included in the diet.',
                  value: 'IBB-UOD.1.1',
                },
                {
                  label: 'Dietary minerals are essential chemical elements.',
                  value: 'IBB-UOD.1.2',
                },
                {
                  label:
                    'Vitamins are chemically diverse carbon compounds that cannot be synthesized by the body.',
                  value: 'IBB-UOD.1.3',
                },
                {
                  label: 'Some fatty acids and some amino acids are essential.',
                  value: 'IBB-UOD.1.4',
                },
                {
                  label:
                    'Lack of essential amino acids affects the production of proteins.',
                  value: 'IBB-UOD.1.5',
                },
                {
                  label:
                    'Malnutrition may be caused by a deficiency, imbalance or excess of nutrients in the diet.',
                  value: 'IBB-UOD.1.6',
                },
                {
                  label:
                    'Appetite is controlled by a centre in the hypothalamus.',
                  value: 'IBB-UOD.1.7',
                },
                {
                  label:
                    'Overweight individuals are more likely to suffer hypertension and type II diabetes.',
                  value: 'IBB-UOD.1.8',
                },
                {
                  label: 'Starvation can lead to breakdown of body tissue.',
                  value: 'IBB-UOD.1.9',
                },
              ],
            },
            {
              label: 'Topic D.2: Disgestion',
              value: 'disgestion',
              applications: [
                {
                  label:
                    'The reduction of stomach acid secretion by proton pump inhibitor drugs.',
                  value: 'IBB-AOD.2.1',
                },
                {
                  label: 'Dehydration due to cholera toxin.',
                  value: 'IBB-AOD.2.2',
                },
                {
                  label:
                    'Helicobacter pylori infection as a cause of stomach ulcers.',
                  value: 'IBB-AOD.2.3',
                },
              ],
              skills: [
                {
                  label:
                    'Identification of exocrine gland cells that secrete digestive juices and villus epithelium cells that absorb digested foods from electron micrographs.',
                  value: 'IBB-SOD.2.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Nervous and hormonal mechanisms control the secretion of digestive juices.',
                  value: 'IBB-UOD.2.1',
                },
                {
                  label:
                    'Exocrine glands secrete to the surface of the body or the lumen of the gut.',
                  value: 'IBB-UOD.2.2',
                },
                {
                  label:
                    'The volume and content of gastric secretions are controlled by nervous and hormonal mechanisms.',
                  value: 'IBB-UOD.2.3',
                },
                {
                  label:
                    'Acid conditions in the stomach favour some hydrolysis reactions and help to control pathogens in ingested food.',
                  value: 'IBB-UOD.2.4',
                },
                {
                  label:
                    'The structure of cells of the epithelium of the villi is adapted to the absorption of food.',
                  value: 'IBB-UOD.2.5',
                },
                {
                  label:
                    'The rate of transit of materials through the large intestine is positively correlated with their fibre content.',
                  value: 'IBB-UOD.2.6',
                },
                {
                  label: 'Materials not absorbed are egested.',
                  value: 'IBB-UOD.2.7',
                },
              ],
            },
            {
              label: 'Topic D.3: Functions of the liver',
              value: 'functionsOfTheLiver',
              applications: [
                {
                  label: 'Causes and consequences of jaundice.',
                  value: 'IBB-AOD.3.1',
                },
                {
                  label:
                    'Dual blood supply to the liver and differences between sinusoids and capillaries.',
                  value: 'IBB-AOD.3.2',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'The liver removes toxins from the blood and detoxifies them.',
                  value: 'IBB-UOD.3.1',
                },
                {
                  label:
                    'Components of red blood cells are recycled by the liver.',
                  value: 'IBB-UOD.3.2',
                },
                {
                  label:
                    'The breakdown of erythrocytes starts with phagocytosis of red blood cells by Kupffer cells.',
                  value: 'IBB-UOD.3.3',
                },
                {
                  label:
                    'Iron is carried to the bone marrow to produce hemoglobin in new red blood cells.',
                  value: 'IBB-UOD.3.4',
                },
                {
                  label: 'Surplus cholesterol is converted to bile salts.',
                  value: 'IBB-UOD.3.5',
                },
                {
                  label:
                    'Endoplasmic reticulum and Golgi apparatus in hepatocytes produce plasma proteins.',
                  value: 'IBB-UOD.3.6',
                },
                {
                  label:
                    'The liver intercepts blood from the gut to regulate nutrient levels.',
                  value: 'IBB-UOD.3.7',
                },
                {
                  label: 'Some nutrients in excess can be stored in the liver.',
                  value: 'IBB-UOD.3.8',
                },
              ],
            },
            {
              label: 'Topic D.4: The heart',
              value: 'theHeart',
              applications: [
                {
                  label:
                    'Use of artificial pacemakers to regulate the heart rate.',
                  value: 'IBB-AOD.4.1',
                },
                {
                  label:
                    'Use of defibrillation to treat life-threatening cardiac conditions.',
                  value: 'IBB-AOD.4.2',
                },
                {
                  label:
                    'Causes and consequences of hypertension and thrombosis.',
                  value: 'IBB-AOD.4.3',
                },
              ],
              skills: [
                {
                  label:
                    'Measurement and interpretation of the heart rate under different conditions.',
                  value: 'IBB-SOD.4.1',
                },
                {
                  label:
                    'Interpretation of systolic and diastolic blood pressure measurements.',
                  value: 'IBB-SOD.4.2',
                },
                {
                  label: 'Mapping of the cardiac cycle to a normal ECG trace.',
                  value: 'IBB-SOD.4.3',
                },
                {
                  label:
                    'Analysis of epidemiological data relating to the incidence of coronary heart disease.',
                  value: 'IBB-SOD.4.4',
                },
              ],
              understandings: [
                {
                  label:
                    'Structure of cardiac muscle cells allows propagation of stimuli through the heart wall.',
                  value: 'IBB-UOD.4.1',
                },
                {
                  label:
                    'Signals from the sinoatrial node that cause contraction cannot pass directly from atria to ventricles.',
                  value: 'IBB-UOD.4.2',
                },
                {
                  label:
                    'There is a delay between the arrival and passing on of a stimulus at the atrioventricular node.',
                  value: 'IBB-UOD.4.3',
                },
                {
                  label:
                    'This delay allows time for atrial systole before the atrioventricular valves close.',
                  value: 'IBB-UOD.4.4',
                },
                {
                  label:
                    'Conducting fibres ensure coordinated contraction of the entire ventricle wall.',
                  value: 'IBB-UOD.4.5',
                },
                {
                  label:
                    'Normal heart sounds are caused by the atrioventricular valves and semilunar valves closing causing changes in blood flow.',
                  value: 'IBB-UOD.4.6',
                },
              ],
            },
            {
              label: 'Topic D.5: Hormones and metabolism',
              value: 'hormonesAndMetabolism',
              applications: [
                {
                  label: 'Some athletes take growth hormones to build muscles.',
                  value: 'IBB-AOD.5.1',
                },
                {
                  label: 'Control of milk secretion by oxytocin and prolactin.',
                  value: 'IBB-AOD.5.2',
                },
              ],
              skills: [],
              understandings: [
                {
                  label:
                    'Endocrine glands secrete hormones directly into the bloodstream.',
                  value: 'IBB-UOD.5.1',
                },
                {
                  label:
                    'Steroid hormones bind to receptor proteins in the cytoplasm of the target cell to form a receptor–hormone complex.',
                  value: 'IBB-UOD.5.2',
                },
                {
                  label:
                    'The receptor–hormone complex promotes the transcription of specific genes.',
                  value: 'IBB-UOD.5.3',
                },
                {
                  label:
                    'Peptide hormones bind to receptors in the plasma membrane of the target cell.',
                  value: 'IBB-UOD.5.4',
                },
                {
                  label:
                    'Binding of hormones to membrane receptors activates a cascade mediated by a second messenger inside the cell.',
                  value: 'IBB-UOD.5.5',
                },
                {
                  label:
                    'The hypothalamus controls hormone secretion by the anterior and posterior lobes of the pituitary gland.',
                  value: 'IBB-UOD.5.6',
                },
                {
                  label:
                    'Hormones secreted by the pituitary control growth, developmental changes, reproduction and homeostasis.',
                  value: 'IBB-UOD.5.7',
                },
              ],
            },
            {
              label: 'Topic D.6: Transport of respiratory gases',
              value: 'transportOfRespiratoryGases',
              applications: [
                {
                  label: 'Consequences of high altitude for gas exchange.',
                  value: 'IBB-AOD.6.1',
                },
                {
                  label:
                    'pH of blood is regulated to stay within the narrow range of 7.35 to 7.45.',
                  value: 'IBB-AOD.6.2',
                },
                {
                  label: 'Causes and treatments of emphysema.',
                  value: 'IBB-AOD.6.3',
                },
              ],
              skills: [
                {
                  label:
                    'Analysis of dissociation curves for hemoglobin and myoglobin.',
                  value: 'IBB-SOD.6.1',
                },
                {
                  label:
                    'Identification of pneumocytes, capillary endothelium cells and blood cells in light micrographs and electron micrographs of lung tissue.',
                  value: 'IBB-SOD.6.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Oxygen dissociation curves show the affinity of hemoglobin for oxygen.',
                  value: 'IBB-UOD.6.1',
                },
                {
                  label:
                    'Carbon dioxide is carried in solution and bound to hemoglobin in the blood.',
                  value: 'IBB-UOD.6.2',
                },
                {
                  label:
                    'Carbon dioxide is transformed in red blood cells into hydrogencarbonate ions.',
                  value: 'IBB-UOD.6.3',
                },
                {
                  label:
                    'The Bohr shift explains the increased release of oxygen by hemoglobin in respiring tissues.',
                  value: 'IBB-UOD.6.4',
                },
                {
                  label: 'Chemoreceptors are sensitive to changes in blood pH.',
                  value: 'IBB-UOD.6.5',
                },
                {
                  label:
                    'The rate of ventilation is controlled by the respiratory control centre in the medulla oblongata.',
                  value: 'IBB-UOD.6.6',
                },
                {
                  label:
                    'During exercise the rate of ventilation changes in response to the amount of CO2 in the blood.',
                  value: 'IBB-UOD.6.7',
                },
                {
                  label:
                    'Fetal hemoglobin is different from adult hemoglobin allowing the transfer of oxygen in the placenta onto the fetal hemoglobin.',
                  value: 'IBB-UOD.6.8',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'IB Environmental Science',
      value: 'biEnvironmentalScience',
      units: [
        {
          label: 'Unit 1: Foundations of environmental systems and societies',
          value: 'foundationsOfEnvironmentalSystemsAndSocieties',
          topics: [
            {
              label: 'Topic 1.1 Environmental value systems',
              value: 'environmentalValueSystems',
              applications: [
                {
                  label:
                    'Discuss the view that the environment can have its own intrinsic value.',
                  value: 'IBES-A1.1.1',
                },
                {
                  label:
                    'Evaluate the implications of two contrasting EVSs in the context of given environmental issues.',
                  value: 'IBES-A1.1.2',
                },
                {
                  label:
                    'Justify, using examples and evidence, how historical influences have shaped the development of the modern environmental movement.',
                  value: 'IBES-A1.1.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Significant historical influences on the development of the environmental movement have come from literature, the media, major environmental disasters, international agreements and technological developments.',
                  value: 'IBES-U1.1.1',
                },
                {
                  label:
                    'An EVS is a worldview or paradigm that shapes the way an individual, or group of people, perceives and evaluates environmental issues, influenced by cultural, religious, economic and socio-political contexts.',
                  value: 'IBES-U1.1.2',
                },
                {
                  label:
                    'An EVS might be considered as a system in the sense that it may be influenced by education, experience, culture and media (inputs), and involves a set of interrelated premises, values and arguments that can generate consistent decisions and evaluations (outputs).',
                  value: 'IBES-U1.1.3',
                },
                {
                  label:
                    'There is a spectrum of EVSs, from ecocentric through anthropocentric to technocentric value systems.',
                  value: 'IBES-U1.1.4',
                },
                {
                  label:
                    'An ecocentric viewpoint integrates social, spiritual and environmental dimensions into a holistic ideal. It puts ecology and nature as central to humanity and emphasizes a less materialistic approach to life with greater self-sufficiency of societies. An ecocentric viewpoint prioritizes biorights, emphasizes the importance of education and encourages self-restraint in human behaviour.',
                  value: 'IBES-U1.1.5',
                },
                {
                  label:
                    'An anthropocentric viewpoint argues that humans must sustainably manage the global system. This might be through the use of taxes, environmental regulation and legislation. Debate would be encouraged to reach a consensual, pragmatic approach to solving environmental problems.',
                  value: 'IBES-U1.1.6',
                },
                {
                  label:
                    'A technocentric viewpoint argues that technological developments can provide solutions to environmental problems. This is a consequence of a largely optimistic view of the role humans can play in improving the lot of humanity. Scientific research is encouraged in order to form policies and to understand how systems can be controlled, manipulated or changed to solve resource depletion. A pro-growth agenda is deemed necessary for society’s improvement.',
                  value: 'IBES-U1.1.7',
                },
                {
                  label:
                    'There are extremes at either end of this spectrum (for example, deep ecologists–ecocentric to cornucopian–technocentric), but in practice, EVSs vary greatly depending on cultures and time periods, and they rarely fit simply or perfectly into any classification.',
                  value: 'IBES-U1.1.8',
                },
                {
                  label:
                    'Different EVSs ascribe different intrinsic value to components of the biosphere.',
                  value: 'IBES-U1.1.9',
                },
              ],
            },
            {
              label: 'Topic 1.2 Systems and models',
              value: 'systemsAndModels',
              applications: [
                {
                  label:
                    'Construct a system diagram or a model from a given set of information.',
                  value: 'IBES-A1.2.1',
                },
                {
                  label:
                    'Evaluate the use of models as a tool in a given situation, for example, climate change predictions.',
                  value: 'IBES-A1.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'A systems approach is a way of visualizing a complex set of interactions which may be ecological or societal.',
                  value: 'IBES-U1.2.1',
                },
                {
                  label:
                    'These interactions produce the emergent properties of the system.',
                  value: 'IBES-U1.2.2',
                },
                {
                  label:
                    'The concept of a system can be applied at a range of scales.',
                  value: 'IBES-U1.2.3',
                },
                {
                  label: 'A system is comprised of storages and flows.',
                  value: 'IBES-U1.2.4',
                },
                {
                  label:
                    'The flows provide inputs and outputs of energy and matter.',
                  value: 'IBES-U1.2.5',
                },
                {
                  label:
                    'The flows are processes that may be either transfers (a change in location) or transformations (a change in the chemical nature, a change in state or a change in energy).',
                  value: 'IBES-U1.2.6',
                },
                {
                  label:
                    'In system diagrams, storages are usually represented as rectangular boxes and flows as arrows, with the direction of each arrow indicating the direction of each flow. The size of the boxes and the arrows may be representative of the size/magnitude of the storage or flow.',
                  value: 'IBES-U1.2.7',
                },
                {
                  label:
                    'An open system exchanges both energy and matter across its boundary while a closed system exchanges only energy across its boundary.',
                  value: 'IBES-U1.2.8',
                },
                {
                  label:
                    'An isolated system is a hypothetical concept in which neither energy nor matter is exchanged across the boundary.',
                  value: 'IBES-U1.2.9',
                },
                {
                  label:
                    'Ecosystems are open systems; closed systems only exist experimentally, although the global geochemical cycles approximate to closed systems.',
                  value: 'IBES-U1.2.10',
                },
                {
                  label:
                    'A model is a simplified version of reality and can be used to understand how a system works and to predict how it will respond to change.',
                  value: 'IBES-U1.2.11',
                },
                {
                  label:
                    'A model inevitably involves some approximation and therefore loss of accuracy.',
                  value: 'IBES-U1.2.12',
                },
              ],
            },
            {
              label: 'Topic 1.3 Energy and equilibria',
              value: 'energyAndEquilibria',
              applications: [
                {
                  label:
                    'Explain the implications of the laws of thermodynamics to ecological systems.',
                  value: 'IBES-A1.3.1',
                },
                {
                  label: 'Discuss resilience in a variety of systems.',
                  value: 'IBES-A1.3.2',
                },
                {
                  label:
                    'Evaluate the possible consequences of tipping points.',
                  value: 'IBES-A1.3.3',
                },
              ],
              understandings: [
                {
                  label:
                    'The first law of thermodynamics is the principle of conservation of energy, which states that energy in an isolated system can be transformed but cannot be created or destroyed.',
                  value: 'IBES-U1.3.1',
                },
                {
                  label:
                    'The principle of conservation of energy can be modelled by the energy transformations along food chains and energy production systems.',
                  value: 'IBES-U1.3.2',
                },
                {
                  label:
                    'The second law of thermodynamics states that the entropy of a system increases over time. Entropy is a measure of the amount of disorder in a system. An increase in entropy arising from energy transformations reduces the energy available to do work.',
                  value: 'IBES-U1.3.3',
                },
                {
                  label:
                    'The second law of thermodynamics explains the inefficiency and decrease in available energy along a food chain and energy generation systems.',
                  value: 'IBES-U1.3.4',
                },
                {
                  label:
                    'As an open system, an ecosystem will normally exist in a stable equilibrium, either in a steady-state equilibrium or in one developing over time (for example, succession), and maintained by stabilizing negative feedback loops.',
                  value: 'IBES-U1.3.5',
                },
                {
                  label:
                    'Negative feedback loops (stabilizing) occur when the output of a process inhibits or reverses the operation of the same process in such a way as to reduce change—it counteracts deviation.',
                  value: 'IBES-U1.3.6',
                },
                {
                  label:
                    'Positive feedback loops (destabilizing) will tend to amplify changes and drive the system toward a tipping point where a new equilibrium is adopted.',
                  value: 'IBES-U1.3.7',
                },
                {
                  label:
                    'The resilience of a system, ecological or social, refers to its tendency to avoid such tipping points and maintain stability.',
                  value: 'IBES-U1.3.8',
                },
                {
                  label:
                    'Diversity and the size of storages within systems can contribute to their resilience and affect their speed of response to change (time lags).',
                  value: 'IBES-U1.3.9',
                },
                {
                  label:
                    'Humans can affect the resilience of systems through reducing these storages and diversity.',
                  value: 'IBES-U1.3.10',
                },
                {
                  label:
                    'The delays involved in feedback loops make it difficult to predict tipping points and add to the complexity of modelling systems.',
                  value: 'IBES-U1.3.11',
                },
              ],
            },
            {
              label: 'Topic 1.4 Sustainability',
              value: 'sustainability',
              applications: [
                {
                  label:
                    'Explain the relationship between natural capital, natural income and sustainability.',
                  value: 'IBES-A1.4.1',
                },
                {
                  label:
                    'Discuss the value of ecosystem services to a society.',
                  value: 'IBES-A1.4.2',
                },
                {
                  label:
                    'Discuss how environmental indicators such as MA can be used to evaluate the progress of a project to increase sustainability.',
                  value: 'IBES-A1.4.3',
                },
                {
                  label: 'Evaluate the use of EIAs.',
                  value: 'IBES-A1.4.4',
                },
                {
                  label:
                    'Explain the relationship between EFs and sustainability.',
                  value: 'IBES-A1.4.5',
                },
              ],
              understandings: [
                {
                  label:
                    'Sustainability is the use and management of resources that allows full natural replacement of the resources exploited and full recovery of the ecosystems affected by their extraction and use.',
                  value: 'IBES-U1.4.1',
                },
                {
                  label:
                    'Natural capital is a term used for natural resources that can produce a sustainable natural income of goods or services.',
                  value: 'IBES-U1.4.2',
                },
                {
                  label:
                    'Natural income is the yield obtained from natural resources.',
                  value: 'IBES-U1.4.3',
                },
                {
                  label:
                    'Ecosystems may provide life-supporting services such as water replenishment, flood and erosion protection, and goods such as timber, fisheries, and agricultural crops.',
                  value: 'IBES-U1.4.4',
                },
                {
                  label:
                    'Factors such as biodiversity, pollution, population or climate may be used quantitatively as environmental indicators of sustainability. These factors can be applied on a range of scales, from local to global. The Millennium Ecosystem Assessment (MA) gave a scientific appraisal of the condition and trends in the world’s ecosystems and the services they provide using environmental indicators, as well as the scientific basis for action to conserve and use them sustainably.',
                  value: 'IBES-U1.4.5',
                },
                {
                  label:
                    'EIAs incorporate baseline studies before a development project is undertaken. They assess the environmental, social and economic impacts of the project, predicting and evaluating possible impacts and suggesting mitigation strategies for the project. They are usually followed by an audit and continued monitoring. Each country or region has different guidance on the use of EIAs.',
                  value: 'IBES-U1.4.6',
                },
                {
                  label:
                    'EIAs provide decision-makers with information in order to consider the environmental impact of a project. There is not necessarily a requirement to implement an EIA’s proposals, and many socio-economic factors may influence the decisions made.',
                  value: 'IBES-U1.4.7',
                },
                {
                  label:
                    'Criticisms of EIAs include: the lack of a standard practice or training for practitioners, the lack of a clear definition of system boundaries and the lack of inclusion of indirect impacts.',
                  value: 'IBES-U1.4.8',
                },
                {
                  label:
                    'An ecological footprint (EF) is the area of land and water required to sustainably provide all resources at the rate at which they are being consumed by a given population. If the EF is greater than the area available to the population, this is an indication of unsustainability.',
                  value: 'IBES-U1.4.9',
                },
              ],
            },
            {
              label: 'Topic 1.5 Humans and pollution',
              value: 'humansAndPollution',
              applications: [
                {
                  label:
                    'Construct systems diagrams to show the impact of pollutants.',
                  value: 'IBES-A1.5.1',
                },
                {
                  label:
                    'Evaluate the effectiveness of each of the three different levels of intervention, with reference to figure 3.',
                  value: 'IBES-A1.5.2',
                },
                {
                  label: 'Evaluate the uses of DDT.',
                  value: 'IBES-A1.5.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Pollution is the addition of a substance or an agent to an environment through human activity, at a rate greater than that at which it can be rendered harmless by the environment, and which has an appreciable effect on the organisms in the environment.',
                  value: 'IBES-U1.5.1',
                },
                {
                  label:
                    'Pollutants may be in the form of organic or inorganic substances, light, sound or thermal energy, biological agents or invasive species, and may derive from a wide range of human activities including the combustion of fossil fuels.',
                  value: 'IBES-U1.5.2',
                },
                {
                  label:
                    'Pollution may be non-point or point source, persistent or biodegradable, acute or chronic.',
                  value: 'IBES-U1.5.3',
                },
                {
                  label:
                    'Pollutants may be primary (active on emission) or secondary (arising from primary pollutants undergoing physical or chemical change).',
                  value: 'IBES-U1.5.4',
                },
                {
                  label:
                    'Dichlorodiphenyltrichloroethane (DDT) exemplifies a conflict between the utility of a “pollutant” and its effect on the environment.',
                  value: 'IBES-U1.5.5',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 2: Ecosystems and ecology',
          value: 'ecosystemsAndEcology',
          topics: [
            {
              label: 'Topic 2.1 Species and populations',
              value: 'speciesAndPopulations',
              applications: [
                {
                  label:
                    'Interpret graphical representations or models of factors that affect an organism’s niche. Examples include predator–prey relationships, competition, and organism abundance over time.',
                  value: 'IBES-A2.1.1',
                },
                {
                  label:
                    'Explain population growth curves in terms of numbers and rates.',
                  value: 'IBES-A2.1.2',
                },
              ],
              understandings: [
                {
                  label:
                    'A species is a group of organisms that share common characteristics and that interbreed to produce fertile offspring.',
                  value: 'IBES-U2.1.1',
                },
                {
                  label:
                    'A habitat is the environment in which a species normally lives.',
                  value: 'IBES-U2.1.2',
                },
                {
                  label:
                    'A niche describes the particular set of abiotic and biotic conditions and resources to which an organism or population responds.',
                  value: 'IBES-U2.1.3',
                },
                {
                  label:
                    'The fundamental niche describes the full range of conditions and resources in which a species could survive and reproduce. The realized niche describes the actual conditions and resources in which a species exists due to biotic interactions.',
                  value: 'IBES-U2.1.4',
                },
                {
                  label:
                    'The non-living, physical factors that influence the organisms and ecosystem—such as temperature, sunlight, pH, salinity, and precipitation—are termed abiotic factors.',
                  value: 'IBES-U2.1.5',
                },
                {
                  label:
                    'The interactions between the organisms—such as predation, herbivory, parasitism, mutualism, disease, and competition—are termed biotic factors.',
                  value: 'IBES-U2.1.6',
                },
                {
                  label:
                    'Interactions should be understood in terms of the influences each species has on the population dynamics of others, and upon the carrying capacity of the others’ environment.',
                  value: 'IBES-U2.1.7',
                },
                {
                  label:
                    'A population is a group of organisms of the same species living in the same area at the same time, and which are capable of interbreeding.',
                  value: 'IBES-U2.1.8',
                },
                {
                  label:
                    'S and J population curves describe a generalized response of populations to a particular set of conditions (abiotic and biotic factors).',
                  value: 'IBES-U2.1.9',
                },
                {
                  label:
                    'Limiting factors will slow population growth as it approaches the carrying capacity of the system.',
                  value: 'IBES-U2.1.10',
                },
              ],
            },
            {
              label: 'Topic 2.2 Communities and ecosystems',
              value: 'communitiesAndEcosystems',
              applications: [
                {
                  label:
                    'Construct models of feeding relationships—such as food chains, food webs and ecological pyramids—from given data.',
                  value: 'IBES-A2.2.1',
                },
                {
                  label:
                    'Explain the transfer and transformation of energy as it flows through an ecosystem.',
                  value: 'IBES-A2.2.2',
                },
                {
                  label:
                    'Analyse the efficiency of energy transfers through a system.',
                  value: 'IBES-A2.2.3',
                },
                {
                  label:
                    'Construct system diagrams representing photosynthesis and respiration.',
                  value: 'IBES-A2.2.4',
                },
                {
                  label:
                    'Explain the relevance of the laws of thermodynamics to the flow of energy through ecosystems.',
                  value: 'IBES-A2.2.5',
                },
                {
                  label:
                    'Explain the impact of a persistent or non-biodegradable pollutant in an ecosystem.',
                  value: 'IBES-A2.2.6',
                },
              ],
              understandings: [
                {
                  label:
                    'A community is a group of populations living and interacting with each other in a common habitat.',
                  value: 'IBES-U2.2.1',
                },
                {
                  label:
                    'An ecosystem is a community and the physical environment with which it interacts.',
                  value: 'IBES-U2.2.2',
                },
                {
                  label:
                    'Respiration and photosynthesis can be described as processes with inputs, outputs and transformations of energy and matter.',
                  value: 'IBES-U2.2.3',
                },
                {
                  label:
                    'Respiration is the conversion of organic matter into carbon dioxide and water in all living organisms, releasing energy. Aerobic respiration can be represented by the following word equation: glucose+oxygen -> carbon dioxide + water',
                  value: 'IBES-U2.2.4',
                },
                {
                  label:
                    'During respiration, large amounts of energy are dissipated as heat, increasing the entropy in the ecosystem while enabling organisms to maintain relatively low entropy and so high organization.',
                  value: 'IBES-U2.2.5',
                },
                {
                  label:
                    'Primary producers in most ecosystems convert light energy into chemical energy in the process of photosynthesis.',
                  value: 'IBES-U2.2.6',
                },
                {
                  label:
                    'The photosynthesis reaction is can be represented by the following word equation: carbon dioxide + water -> glucose + oxygen',
                  value: 'IBES-U2.2.7',
                },
                {
                  label:
                    'Photosynthesis produces the raw material for producing biomass.',
                  value: 'IBES-U2.2.8',
                },
                {
                  label:
                    'The trophic level is the position that an organism occupies in a food chain, or the position of a group of organisms in a community that occupy the same position in food chains.',
                  value: 'IBES-U2.2.9',
                },
                {
                  label:
                    'Producers (autotrophs) are typically plants or algae that produce their own food using photosynthesis and form the first trophic level in a food chain. Exceptions include chemosynthetic organisms that produce food without sunlight.',
                  value: 'IBES-U2.2.10',
                },
                {
                  label:
                    'Feeding relationships involve producers, consumers and decomposers. These can be modelled using food chains, food webs and ecological pyramids.',
                  value: 'IBES-U2.2.11',
                },
                {
                  label:
                    'Ecological pyramids include pyramids of numbers, biomass and productivity and are quantitative models that are usually measured for a given area and time.',
                  value: 'IBES-U2.2.12',
                },
                {
                  label:
                    'In accordance with the second law of thermodynamics, there is a tendency for numbers and quantities of biomass and energy to decrease along food chains; therefore, the pyramids become narrower towards the apex.',
                  value: 'IBES-U2.2.13',
                },
                {
                  label:
                    'Bioaccumulation is the build-up of persistent or non-biodegradable pollutants within an organism or trophic level because they cannot be broken down.',
                  value: 'IBES-U2.2.14',
                },
                {
                  label:
                    'Biomagnification is the increase in concentration of persistent or nonbiodegradable pollutants along a food chain.',
                  value: 'IBES-U2.2.15',
                },
                {
                  label:
                    'Toxins such as DDT and mercury accumulate along food chains due to the decrease of biomass and energy.',
                  value: 'IBES-U2.2.16',
                },
                {
                  label:
                    'Pyramids of numbers can sometimes display different patterns; for example, when individuals at lower trophic levels are relatively large (inverted pyramids).',
                  value: 'IBES-U2.2.17',
                },
                {
                  label:
                    'A pyramid of biomass represents the standing stock or storage of each trophic level, measured in units such as grams of biomass per square metre (g m–2) or Joules per square metre (J m-2) (units of biomass or energy).',
                  value: 'IBES-U2.2.18',
                },
                {
                  label:
                    'Pyramids of biomass can show greater quantities at higher trophic levels because they represent the biomass present at a fixed point in time, although seasonal variations may be marked.',
                  value: 'IBES-U2.2.19',
                },
                {
                  label:
                    'Pyramids of productivity refer to the flow of energy through a trophic level, indicating the rate at which that stock/storage is being generated.',
                  value: 'IBES-U2.2.20',
                },
                {
                  label:
                    'Pyramids of productivity for entire ecosystems over a year always show a decrease along the food chain.',
                  value: 'IBES-U2.2.21',
                },
              ],
            },
            {
              label: 'Topic 2.3 Flows of energy and matter',
              value: 'flowsOfEnergyAndMatter',
              applications: [
                {
                  label:
                    'Analyse quantitative models of flows of energy and matter.',
                  value: 'IBES-A2.3.1',
                },
                {
                  label:
                    'Construct a quantitative model of the flows of energy or matter for given data.',
                  value: 'IBES-A2.3.2',
                },
                {
                  label:
                    'Analyse the efficiency of energy transfers through a system.',
                  value: 'IBES-A2.3.3',
                },
                {
                  label:
                    'Calculate the values of both GPP and NPP from given data.',
                  value: 'IBES-A2.3.4',
                },
                {
                  label:
                    'Calculate the values of both GSP and NSP from given data.',
                  value: 'IBES-A2.3.5',
                },
                {
                  label:
                    'Discuss human impacts on energy flows, and on the carbon and nitrogen cycles.',
                  value: 'IBES-A2.3.6',
                },
              ],
              understandings: [
                {
                  label:
                    'As solar radiation (insolation) enters the Earth’s atmosphere, some energy becomes unavailable for ecosystems as this energy is absorbed by inorganic matter or reflected back into the atmosphere.',
                  value: 'IBES-U2.3.1',
                },
                {
                  label:
                    'Pathways of radiation through the atmosphere involve a loss of radiation through reflection and absorption.',
                  value: 'IBES-U2.3.2',
                },
                {
                  label:
                    'Pathways of energy through an ecosystem include: – conversion of light energy to chemical energy; – transfer of chemical energy from one trophic level to another with varying efficiencies; – overall conversion of ultraviolet and visible light to heat energy by an ecosystem; – re-radiation of heat energy to the atmosphere.',
                  value: 'IBES-U2.3.3',
                },
                {
                  label:
                    'The conversion of energy into biomass for a given period of time is measured as productivity.',
                  value: 'IBES-U2.3.4',
                },
                {
                  label:
                    'Net primary productivity (NPP) is calculated by subtracting respiratory losses (R) from gross primary productivity (GPP). NPP = GPP – R',
                  value: 'IBES-U2.3.5',
                },
                {
                  label:
                    'Gross secondary productivity (GSP) is the total energy or biomass assimilated by consumers and is calculated by subtracting the mass of fecal loss from the mass of food consumed. GSP = food eaten – fecal loss',
                  value: 'IBES-U2.3.6',
                },
                {
                  label:
                    'Net secondary productivity (NSP) is calculated by subtracting respiratory losses (R) from GSP. NSP = GSP – R',
                  value: 'IBES-U2.3.7',
                },
                {
                  label:
                    'Maximum sustainable yields are equivalent to the net primary or net secondary productivity of a system.',
                  value: 'IBES-U2.3.8',
                },
                {
                  label:
                    'Matter also flows through ecosystems linking them together. This flow of matter involves transfers and transformations.',
                  value: 'IBES-U2.3.9',
                },
                {
                  label:
                    'The carbon and nitrogen cycles are used to illustrate this flow of matter using flow diagrams. These cycles contain storages (sometimes referred to as sinks) and flows, which move matter between storages.',
                  value: 'IBES-U2.3.10',
                },
                {
                  label:
                    'Storages in the carbon cycle include organisms and forests (both organic), or the atmosphere, soil, fossil fuels and oceans (all inorganic).',
                  value: 'IBES-U2.3.11',
                },
                {
                  label:
                    'Flows in the carbon cycle include consumption (feeding), death and decomposition, photosynthesis, respiration, dissolving and fossilization.',
                  value: 'IBES-U2.3.12',
                },
                {
                  label:
                    'Storages in the nitrogen cycle include organisms (organic), soil, fossil fuels, atmosphere and water bodies (all inorganic).',
                  value: 'IBES-U2.3.13',
                },
                {
                  label:
                    'Flows in the nitrogen cycle include nitrogen fixation by bacteria and lightning, absorption, assimilation, consumption (feeding), excretion, death and decomposition, and denitrification by bacteria in water-logged soils.',
                  value: 'IBES-U2.3.14',
                },
                {
                  label:
                    'Human activities such as burning fossil fuels, deforestation, urbanization and agriculture impact energy flows as well as the carbon and nitrogen cycles.',
                  value: 'IBES-U2.3.15',
                },
              ],
            },
            {
              label: 'Topic 2.4 Biomes, zonation and succession',
              value: 'biomesZonationAndSuccession',
              applications: [
                {
                  label:
                    'Explain the distributions, structure, biodiversity and relative productivity of contrasting biomes.',
                  value: 'IBES-A2.4.1',
                },
                {
                  label: 'Analyse data for a range of biomes.',
                  value: 'IBES-A2.4.2',
                },
                {
                  label: 'Discuss the impact of climate change on biomes.',
                  value: 'IBES-A2.4.3',
                },
                {
                  label:
                    'Describe the process of succession in a given example.',
                  value: 'IBES-A2.4.4',
                },
                {
                  label:
                    'Explain the general patterns of change in communities undergoing succession.',
                  value: 'IBES-A2.4.5',
                },
                {
                  label:
                    'Discuss the factors which could lead to alternative stable states in an ecosystem.',
                  value: 'IBES-A2.4.6',
                },
                {
                  label:
                    'Discuss the link between ecosystem stability, succession, diversity and human activity.',
                  value: 'IBES-A2.4.7',
                },
                {
                  label:
                    'Distinguish the roles of r and K selected species in succession.',
                  value: 'IBES-A2.4.8',
                },
                {
                  label:
                    'Interpret models or graphs related to succession and zonation.',
                  value: 'IBES-A2.4.9',
                },
              ],
              understandings: [
                {
                  label:
                    'Biomes are collections of ecosystems sharing similar climatic conditions that can be grouped into five major classes: aquatic, forest, grassland, desert and tundra. Each of these classes has characteristic limiting factors, productivity and biodiversity.',
                  value: 'IBES-U2.4.1',
                },
                {
                  label:
                    'Insolation, precipitation and temperature are the main factors governing the distribution of biomes.',
                  value: 'IBES-U2.4.2',
                },
                {
                  label:
                    'The tricellular model of atmospheric circulation explains the distribution of precipitation and temperature and how they influence structure and relative productivity of different terrestrial biomes.',
                  value: 'IBES-U2.4.3',
                },
                {
                  label:
                    'Climate change is altering the distribution of biomes and causing biome shifts.',
                  value: 'IBES-U2.4.4',
                },
                {
                  label:
                    'Zonation refers to changes in community along an environmental gradient due to factors such as changes in altitude, latitude, tidal level or distance from shore (coverage by water).',
                  value: 'IBES-U2.4.5',
                },
                {
                  label:
                    'Succession is the process of change over time in an ecosystem involving pioneer, intermediate and climax communities.',
                  value: 'IBES-U2.4.6',
                },
                {
                  label:
                    'During succession, the patterns of energy flow, gross and net productivity, diversity, and mineral cycling change over time.',
                  value: 'IBES-U2.4.7',
                },
                {
                  label:
                    'Greater habitat diversity leads to greater species and genetic diversity.',
                  value: 'IBES-U2.4.8',
                },
                {
                  label:
                    'r- and K-strategist species have reproductive strategies that are better adapted to pioneer and climax communities, respectively.',
                  value: 'IBES-U2.4.9',
                },
                {
                  label:
                    'In early stages of succession, gross productivity is low due to the unfavourable initial conditions and low density of producers. The proportion of energy lost through community respiration is relatively low too, so net productivity is high—that is, the system is growing and biomass is accumulating.',
                  value: 'IBES-U2.4.10',
                },
                {
                  label:
                    'In later stages of succession, with an increased consumer community, gross productivity may be high in a climax community. However, this is balanced by respiration, so net productivity approaches 0 and the productivity–respiration (P:R) ratio approaches 1.',
                  value: 'IBES-U2.4.11',
                },
                {
                  label:
                    'In a complex ecosystem, the variety of nutrient and energy pathways contributes to its stability.',
                  value: 'IBES-U2.4.12',
                },
                {
                  label:
                    'There is no one climax community, but rather a set of alternative stable states for a given ecosystem. These depend on the climatic factors, the properties of the local soil and a range of random events that can occur over time.',
                  value: 'IBES-U2.4.13',
                },
                {
                  label:
                    'Human activity is one factor that can divert the progression of succession to an alternative stable state by modifying the ecosystem; for example, the use of fire in an ecosystem, the use of agriculture, grazing pressure, or resource use (such as deforestation). This diversion may be more or less permanent depending upon the resilience of the ecosystem.',
                  value: 'IBES-U2.4.14',
                },
                {
                  label:
                    'An ecosystem’s capacity to survive change may depend on its diversity and resilience.',
                  value: 'IBES-U2.4.15',
                },
              ],
            },
            {
              label: 'Topic 2.5 Investigating ecosystems',
              value: 'investigatingEcosystems',
              applications: [
                {
                  label: 'Design and carry out ecological investigations.',
                  value: 'IBES-A2.5.1',
                },
                {
                  label:
                    'Construct simple identification keys for up to eight species.',
                  value: 'IBES-A2.5.2',
                },
                {
                  label: 'Evaluate sampling strategies.',
                  value: 'IBES-A2.5.3',
                },
                {
                  label:
                    'Evaluate methods to measure at least three abiotic factors in an ecosystem.',
                  value: 'IBES-A2.5.4',
                },
                {
                  label:
                    'Evaluate methods to investigate the change along an environmental gradient and the effect of a human impact in an ecosystem.',
                  value: 'IBES-A2.5.5',
                },
                {
                  label:
                    'Evaluate methods for estimating biomass at different trophic levels in an ecosystem.',
                  value: 'IBES-A2.5.6',
                },
                {
                  label:
                    'Evaluate methods for measuring or estimating populations of motile and nonmotile organisms.',
                  value: 'IBES-A2.5.7',
                },
                {
                  label:
                    'Calculate and interpret data for species richness and diversity.',
                  value: 'IBES-A2.5.8',
                },
                {
                  label:
                    'Draw graphs to illustrate species diversity in a community over time, or between communities.',
                  value: 'IBES-A2.5.9',
                },
              ],
              understandings: [
                {
                  label:
                    'The study of an ecosystem requires that it be named and located; for example, Deinikerwald in Baar, Switzerland—a mixed deciduous–coniferous managed woodland.',
                  value: 'IBES-U2.5.1',
                },
                {
                  label:
                    'Organisms in an ecosystem can be identified using a variety of tools including keys, comparison to herbarium or specimen collections, technologies and scientific expertise.',
                  value: 'IBES-U2.5.2',
                },
                {
                  label:
                    'Sampling strategies may be used to measure biotic and abiotic factors and their change in space, along an environmental gradient, over time, through succession, or before and after a human impact (for example, as part of an EIA).',
                  value: 'IBES-U2.5.3',
                },
                {
                  label:
                    'Measurements should be repeated to increase reliability of data. The number of repetitions required depends on the factor being measured.',
                  value: 'IBES-U2.5.4',
                },
                {
                  label:
                    'Methods for estimating the biomass and energy of trophic levels in a community include measurement of dry mass, controlled combustion and extrapolation from samples. Data from these methods can be used to construct ecological pyramids.',
                  value: 'IBES-U2.5.5',
                },
                {
                  label:
                    'Methods for estimating the abundance of non-motile organisms include the use of quadrats for making actual counts, measuring population density, percentage cover and percentage frequency.',
                  value: 'IBES-U2.5.6',
                },
                {
                  label:
                    'Direct and indirect methods for estimating the abundance of motile organisms can be described and evaluated. Direct methods include actual counts and sampling. Indirect methods include the use of capture–mark–recapture with the application of the Lincoln index. Lincoln Index = n1 x n2 / nm; – n1 is the number caught in the first sample; – n2 is the number caught in the second sample; – nm is the number caught in the second sample that were marked',
                  value: 'IBES-U2.5.7',
                },
                {
                  label:
                    'Species richness is the number of species in a community and is a useful comparative measure.',
                  value: 'IBES-U2.5.8',
                },
                {
                  label:
                    'Species diversity is a function of the number of species and their relative abundance and can be compared using an index. There are many versions of diversity indices, but students are only expected to be able to apply and evaluate the result of the Simpson diversity index as shown below. Using this formula, the higher the result (D), the greater the species diversity. This indication of diversity is only useful when comparing two similar habitats, or the same habitat over time. D = N(N-1) / Σn(n-1). – D is the Simpson diversity index; – N is the total number of organisms of all species found; – n is the number of individuals of a particular species',
                  value: 'IBES-U2.5.9',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 3: Biodiversity and conservation',
          value: 'biodiversityAndConservation',
          topics: [
            {
              label: 'Topic 3.1 An introduction to biodiversity',
              value: 'anIntroductionToBiodiversity',
              applications: [
                {
                  label:
                    'Distinguish between biodiversity, diversity of species, habitat diversity and genetic diversity.',
                  value: 'IBES-A3.1.1',
                },
                {
                  label: 'Comment on the relative values of biodiversity data.',
                  value: 'IBES-A3.1.2',
                },
                {
                  label:
                    'Discuss the usefulness of providing numerical values of species diversity to understanding the nature of biological communities and the conservation of biodiversity.',
                  value: 'IBES-A3.1.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Biodiversity is a broad concept encompassing the total diversity of living systems, which includes the diversity of species, habitat diversity and genetic diversity.',
                  value: 'IBES-U3.1.1',
                },
                {
                  label:
                    'Species diversity in communities is a product of two variables: the number of species (richness) and their relative proportions (evenness).',
                  value: 'IBES-U3.1.2',
                },
                {
                  label:
                    'Communities can be described and compared through the use of diversity indices. When comparing communities that are similar, low diversity could be indicative of pollution, eutrophication or recent colonization of a site. The number of species present in an area is often indicative of general patterns of biodiversity.',
                  value: 'IBES-U3.1.3',
                },
                {
                  label:
                    'Habitat diversity refers to the range of different habitats in an ecosystem or biome.',
                  value: 'IBES-U3.1.4',
                },
                {
                  label:
                    'Genetic diversity refers to the range of genetic material present in a population of a species.',
                  value: 'IBES-U3.1.5',
                },
                {
                  label:
                    'Quantification of biodiversity is important to conservation efforts so that areas of high biodiversity may be identified, explored, and appropriate conservation put in place where possible.',
                  value: 'IBES-U3.1.6',
                },
                {
                  label:
                    'The ability to assess changes to biodiversity in a given community over time is important in assessing the impact of human activity in the community.',
                  value: 'IBES-U3.1.7',
                },
              ],
            },
            {
              label: 'Topic 3.2 Origins of biodiversity',
              value: 'originsOfBiodiversity',
              applications: [
                {
                  label:
                    'Explain how plate activity has influenced evolution and biodiversity.',
                  value: 'IBES-A3.2.1',
                },
                {
                  label: 'Discuss the causes of mass extinctions.',
                  value: 'IBES-A3.2.2',
                },
              ],
              understandings: [
                {
                  label: 'Biodiversity arises from evolutionary processes.',
                  value: 'IBES-U3.2.1',
                },
                {
                  label:
                    'Biological variation arises randomly and can either be beneficial to, damaging to, or have no impact on, the survival of the individual.',
                  value: 'IBES-U3.2.2',
                },
                {
                  label:
                    'Natural selection occurs through the following mechanism. 1. Within a population of one species, there is genetic diversity, which is called variation. 2. Due to natural variation, some individuals will be fitter than others. 3. Fitter individuals have an advantage and will reproduce more successfully than individuals who are less fit. 4. The offspring of fitter individuals may inherit the genes that give that advantage.',
                  value: 'IBES-U3.2.3',
                },
                {
                  label:
                    'This natural selection will contribute to the evolution of biodiversity over time.',
                  value: 'IBES-U3.2.4',
                },
                {
                  label:
                    'Environmental change gives new challenges to species: those that are suited will survive, and those that are not suited will not survive.',
                  value: 'IBES-U3.2.5',
                },
                {
                  label:
                    'Speciation is the formation of new species when populations of a species become isolated and evolve differently from other populations.',
                  value: 'IBES-U3.2.6',
                },
                {
                  label:
                    'Isolation of populations can be caused by environmental changes forming barriers such as mountain formation, changes in rivers, sea level change, climatic change or plate movements. The surface of the Earth is divided into crustal, tectonic plates that have moved throughout geological time. This has led to the creation of both land bridges and physical barriers with evolutionary consequences.',
                  value: 'IBES-U3.2.7',
                },
                {
                  label:
                    'The distribution of continents has also caused climatic variations and variation in food supply, both contributing to evolution.',
                  value: 'IBES-U3.2.8',
                },
                {
                  label:
                    'Mass extinctions of the past have been caused by various factors, such as tectonic plate movements, super-volcanic eruption, climatic changes (including drought and ice ages), and meteorite impact—all of which resulted in new directions in evolution and therefore increased biodiversity.',
                  value: 'IBES-U3.2.9',
                },
              ],
            },
            {
              label: 'Topic 3.3 Threats to biodiversity',
              value: 'threatsToBiodiversity',
              applications: [
                {
                  label:
                    'Discuss the case histories of three different species: one that has become extinct due to human activity, another that is critically endangered, and a third species whose conservation status has been improved by intervention.',
                  value: 'IBES-A3.3.1',
                },
                {
                  label:
                    'Describe the threats to biodiversity from human activity in a given natural area of biological significance or conservation area.',
                  value: 'IBES-A3.3.2',
                },
                {
                  label:
                    'Evaluate the impact of human activity on the biodiversity of tropical biomes.',
                  value: 'IBES-A3.3.3',
                },
                {
                  label:
                    'Discuss the conflict between exploitation, sustainable development and conservation in tropical biomes.',
                  value: 'IBES-A3.3.4',
                },
              ],
              understandings: [
                {
                  label:
                    'Estimates of the total number of species on Earth vary considerably. They are based on mathematical models, which are influenced by classification issues and a lack of finance for scientific research, resulting in many habitats and groups being significantly under-recorded.',
                  value: 'IBES-U3.3.1',
                },
                {
                  label:
                    'The current rates of species loss are far greater now than in the recent past, due to increased human influence. The human activities that cause species extinctions include habitat destruction, introduction of invasive species, pollution, overharvesting and hunting.',
                  value: 'IBES-U3.3.2',
                },
                {
                  label:
                    'The International Union of Conservation of Nature (IUCN) publishes data in the “Red List of Threatened Species” in several categories. Factors used to determine the conservation status of a species include: population size, degree of specialization, distribution, reproductive potential and behaviour, geographic range and degree of fragmentation, quality of habitat, trophic level, and the probability of extinction.',
                  value: 'IBES-U3.3.3',
                },
                {
                  label:
                    'Tropical biomes contain some of the most globally biodiverse areas and their unsustainable exploitation results in massive losses in biodiversity and their ability to perform globally important ecological services.',
                  value: 'IBES-U3.3.4',
                },
                {
                  label:
                    'Most tropical biomes occur in less economically developed countries (LEDCs) and therefore there is conflict between exploitation, sustainable development and conservation.',
                  value: 'IBES-U3.3.5',
                },
              ],
            },
            {
              label: 'Topic 3.4 Conservation of biodiversity',
              value: 'conservationOfBiodiversity',
              applications: [
                {
                  label:
                    'Explain the criteria used to design and manage protected areas.',
                  value: 'IBES-A3.4.1',
                },
                {
                  label: 'Evaluate the success of a given protected area.',
                  value: 'IBES-A3.4.2',
                },
                {
                  label:
                    'Evaluate different approaches to protecting biodiversity.',
                  value: 'IBES-A3.4.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Arguments about species and habitat preservation can be based on aesthetic, ecological, economic, ethical and social justifications.',
                  value: 'IBES-U3.4.1',
                },
                {
                  label:
                    'International, governmental and non-governmental organizations (NGOs) are involved in conserving and restoring ecosystems and biodiversity, with varying levels of effectiveness due to their use of media, speed of response, diplomatic constraints, financial resources and political influence.',
                  value: 'IBES-U3.4.2',
                },
                {
                  label:
                    'Recent international conventions on biodiversity work to create collaboration between nations for biodiversity conservation.',
                  value: 'IBES-U3.4.3',
                },
                {
                  label:
                    'Conservation approaches include habitat conservation, species-based conservation and a mixed approach.',
                  value: 'IBES-U3.4.4',
                },
                {
                  label:
                    'Criteria for consideration when designing protected areas include size, shape, edge effects, corridors, and proximity to potential human influence.',
                  value: 'IBES-U3.4.5',
                },
                {
                  label:
                    'Alternative approaches to the development of protected areas are species-based conservation strategies including: – CITES; – captive breeding and reintroduction programmes, and zoos; – selection of “charismatic” species to help protect others in an area (flagship species); – selection of keystone species to protect the integrity of the food web.',
                  value: 'IBES-U3.4.6',
                },
                {
                  label:
                    'Community support, adequate funding and proper research influence the success of conservation efforts.',
                  value: 'IBES-U3.4.7',
                },
                {
                  label:
                    'The location of a conservation area in a country is a significant factor in the success of the conservation effort. Surrounding land use for the conservation area and distance from urban centres are important factors for consideration in conservation area design.',
                  value: 'IBES-U3.4.8',
                },
              ],
            },
          ],
        },
        {
          label:
            'Unit 4: Water and aquatic food production systems and societies',
          value: 'waterAndAquaticFoodProductionSystemsAndSocieties',
          topics: [
            {
              label: 'Topic 4.1 Introduction to water systems',
              value: 'introductionToWaterSystems',
              applications: [
                {
                  label: 'Discuss human impact on the hydrological cycle.',
                  value: 'IBES-A4.1.1',
                },
                {
                  label: 'Construct and analyse a hydrological cycle diagram.',
                  value: 'IBES-A4.1.2',
                },
              ],
              understandings: [
                {
                  label: 'Solar radiation drives the hydrological cycle.',
                  value: 'IBES-U4.1.1',
                },
                {
                  label:
                    'Fresh water makes up only a small fraction (approximately 2.6% by volume) of the Earth’s water storages.',
                  value: 'IBES-U4.1.2',
                },
                {
                  label:
                    'Storages in the hydrological cycle include organisms, soil and various water bodies, including oceans, groundwater (aquifers), lakes, rivers, atmosphere, glaciers and ice caps.',
                  value: 'IBES-U4.1.3',
                },
                {
                  label:
                    'Flows in the hydrological cycle include evapotranspiration, sublimation, evaporation, condensation, advection (wind-blown movement), precipitation, melting, freezing, flooding, surface runoff, infiltration, percolation, and streamflow or currents.',
                  value: 'IBES-U4.1.4',
                },
                {
                  label:
                    'Human activities such as agriculture, deforestation and urbanization have a significant impact on surface runoff and infiltration.',
                  value: 'IBES-U4.1.5',
                },
                {
                  label:
                    'Ocean circulation systems are driven by differences in temperature and salinity. The resulting difference in water density drives the ocean conveyor belt, which distributes heat around the world, and thus affects climate.',
                  value: 'IBES-U4.1.6',
                },
              ],
            },
            {
              label: 'Topic 4.2 Access to fresh water',
              value: 'accessToFreshWater',
              applications: [
                {
                  label:
                    'Evaluate the strategies that can be used to meet an increasing demand for fresh water.',
                  value: 'IBES-A4.2.1',
                },
                {
                  label:
                    'Discuss, with reference to a case study, how shared freshwater resources have given rise to international conflict.',
                  value: 'IBES-A4.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Access to an adequate freshwater supply varies widely.',
                  value: 'IBES-U4.2.1',
                },
                {
                  label:
                    'Climate change may disrupt rainfall patterns and further affect this access.',
                  value: 'IBES-U4.2.2',
                },
                {
                  label:
                    'As populations, irrigation and industrialization increase, the demand for fresh water increases.',
                  value: 'IBES-U4.2.3',
                },
                {
                  label:
                    'Freshwater supplies may become limited through contamination and unsustainable abstraction.',
                  value: 'IBES-U4.2.4',
                },
                {
                  label:
                    'Water supplies can be enhanced through reservoirs, redistribution, desalination, artificial recharge of aquifers and rainwater harvesting schemes. Water conservation (including grey-water recycling) can help to reduce demand but often requires a change in attitude by the water consumers.',
                  value: 'IBES-U4.2.5',
                },
                {
                  label:
                    'The scarcity of water resources can lead to conflict between human populations, particularly where sources are shared.',
                  value: 'IBES-U4.2.6',
                },
              ],
            },
            {
              label: 'Topic 4.3 Aquatic food production systems',
              value: 'aquaticFoodProductionSystems',
              applications: [
                {
                  label:
                    'Discuss, with reference to a case study, the controversial harvesting of a named species.',
                  value: 'IBES-A4.3.1',
                },
                {
                  label:
                    'Evaluate strategies that can be used to avoid unsustainable fishing.',
                  value: 'IBES-A4.3.2',
                },
                {
                  label:
                    'Explain the potential value of aquaculture for providing food for future generations.',
                  value: 'IBES-A4.3.3',
                },
                {
                  label:
                    'Discuss a case study that demonstrates the impact of aquaculture.',
                  value: 'IBES-A4.3.4',
                },
              ],
              understandings: [
                {
                  label:
                    'Demand for aquatic food resources continues to increase as human population grows and diet changes.',
                  value: 'IBES-U4.3.1',
                },
                {
                  label:
                    'Photosynthesis by phytoplankton supports a highly diverse range of food webs.',
                  value: 'IBES-U4.3.2',
                },
                {
                  label:
                    'Aquatic (freshwater and marine) flora and fauna are harvested by humans.',
                  value: 'IBES-U4.3.3',
                },
                {
                  label:
                    'The highest rates of productivity are found near coastlines or in shallow seas, where upwellings and nutrient enrichment of surface waters occurs.',
                  value: 'IBES-U4.3.4',
                },
                {
                  label:
                    'Harvesting some species, such as seals and whales, can be controversial. Ethical issues arise over biorights, rights of indigenous cultures and international conservation legislation.',
                  value: 'IBES-U4.3.5',
                },
                {
                  label:
                    'Developments in fishing equipment and changes to fishing methods have lead to dwindling fish stocks and damage to habitats.',
                  value: 'IBES-U4.3.6',
                },
                {
                  label:
                    'Unsustainable exploitation of aquatic systems can be mitigated at a variety of levels (international, national, local and individual) through policy, legislation and changes in consumer behaviour.',
                  value: 'IBES-U4.3.7',
                },
                {
                  label:
                    'Aquaculture has grown to provide additional food resources and support economic development and is expected to continue to rise.',
                  value: 'IBES-U4.3.8',
                },
                {
                  label:
                    'Issues around aquaculture include: loss of habitats, pollution (with feed, antifouling agents, antibiotics and other medicines added to fish pens), spread of diseases and escaped species (some involving genetically modified organisms).',
                  value: 'IBES-U4.3.9',
                },
              ],
            },
            {
              label: 'Topic 4.4 Water pollution',
              value: 'waterPollution',
              applications: [
                {
                  label: 'Analyse water pollution data.',
                  value: 'IBES-A4.4.1',
                },
                {
                  label: 'Explain the process and impacts of eutrophication.',
                  value: 'IBES-A4.4.2',
                },
                {
                  label:
                    'Evaluate the uses of indicator species and biotic indices in measuring aquatic pollution.',
                  value: 'IBES-A4.4.3',
                },
                {
                  label:
                    'Evaluate pollution management strategies with respect to water pollution.',
                  value: 'IBES-A4.4.4',
                },
              ],
              understandings: [
                {
                  label:
                    'There are a variety of freshwater and marine pollution sources.',
                  value: 'IBES-U4.4.1',
                },
                {
                  label:
                    'Types of aquatic pollutants include floating debris, organic material, inorganic plant nutrients (nitrates and phosphates), toxic metals, synthetic compounds, suspended solids, hot water, oil, radioactive pollution, pathogens, light, noise and biological pollutants (invasive species).',
                  value: 'IBES-U4.4.2',
                },
                {
                  label:
                    'A wide range of parameters can be used to directly test the quality of aquatic systems, including pH, temperature, suspended solids (turbidity), metals, nitrates and phosphates.',
                  value: 'IBES-U4.4.3',
                },
                {
                  label:
                    'Biodegradation of organic material utilizes oxygen, which can lead to anoxic conditions and subsequent anaerobic decomposition, which in turn leads to formation of methane, hydrogen sulfide and ammonia (toxic gases).',
                  value: 'IBES-U4.4.4',
                },
                {
                  label:
                    'Biochemical oxygen demand (BOD) is a measure of the amount of dissolved oxygen required to break down the organic material in a given volume of water through aerobic biological activity. BOD is used to indirectly measure the amount of organic matter within a sample.',
                  value: 'IBES-U4.4.5',
                },
                {
                  label:
                    'Some species can be indicative of polluted waters and can be used as indicator species.',
                  value: 'IBES-U4.4.6',
                },
                {
                  label:
                    'A biotic index indirectly measures pollution by assaying the impact on species within the community according to their tolerance, diversity and relative abundance.',
                  value: 'IBES-U4.4.7',
                },
                {
                  label:
                    'Eutrophication can occur when lakes, estuaries and coastal waters receive inputs of nutrients (nitrates and phosphates), which results in an excess growth of plants and phytoplankton.',
                  value: 'IBES-U4.4.8',
                },
                {
                  label:
                    'Dead zones in both oceans and fresh water can occur when there is not enough oxygen to support marine life.',
                  value: 'IBES-U4.4.9',
                },
                {
                  label:
                    'Application of figure 3 to water pollution management strategies includes: 1. reducing human activities that produce pollutants (for example, alternatives to current fertilizers and detergents); 2. reducing release of pollution into the environment (for example, treatment of waste water to remove nitrates and phosphates); 3. removing pollutants from the environment and restoring ecosystems (for example, removal of mud from eutrophic lakes and reintroduction of plant and fish species).',
                  value: 'IBES-U4.4.10',
                },
              ],
            },
          ],
        },
        {
          label:
            'Unit 5: Soil systems and terrestrial food production systems and societies',
          value: 'soilSystemsAndTerrestrialFoodProductionSystemsAndSocieties',
          topics: [
            {
              label: 'Topic 5.1 Introduction to soil systems',
              value: 'introductionToSoilSystems',
              applications: [
                {
                  label:
                    'Outline the transfers, transformations, inputs, outputs, flows and storages within soil systems.',
                  value: 'IBES-A5.1.1',
                },
                {
                  label: 'Explain how soil can be viewed as an ecosystem.',
                  value: 'IBES-A5.1.2',
                },
                {
                  label:
                    'Compare and contrast the structure and properties of sand, clay and loam soils, with reference to a soil texture diagram, including their effect on primary productivity.',
                  value: 'IBES-A5.1.3',
                },
              ],
              understandings: [
                {
                  label:
                    'The soil system may be illustrated by a soil profile that has a layered structure (horizons).',
                  value: 'IBES-U5.1.1',
                },
                {
                  label:
                    'Soil system storages include organic matter, organisms, nutrients, minerals, air and water.',
                  value: 'IBES-U5.1.2',
                },
                {
                  label:
                    'Transfers of material within the soil, including biological mixing and leaching (minerals dissolved in water moving through soil), contribute to the organization of the soil.',
                  value: 'IBES-U5.1.3',
                },
                {
                  label:
                    'There are inputs of organic material including leaf litter and inorganic matter from parent material, precipitation and energy. Outputs include uptake by plants and soil erosion.',
                  value: 'IBES-U5.1.4',
                },
                {
                  label:
                    'Transformations include decomposition, weathering and nutrient cycling.',
                  value: 'IBES-U5.1.5',
                },
                {
                  label:
                    'The structure and properties of sand, clay and loam soils differ in many ways, including mineral and nutrient content, drainage, water-holding capacity, air spaces, biota and potential to hold organic matter. Each of these variables is linked to the ability of the soil to promote primary productivity.',
                  value: 'IBES-U5.1.6',
                },
                {
                  label:
                    'A soil texture triangle illustrates the differences in composition of soils.',
                  value: 'IBES-U5.1.7',
                },
              ],
            },
            {
              label:
                'Topic 5.2 Terrestrial food production systems and food choices',
              value: 'terrestrialFoodProductionSystemsAndFoodChoices',
              applications: [
                {
                  label:
                    'Analyse tables and graphs that illustrate the differences in inputs and outputs associated with food production systems.',
                  value: 'IBES-A5.2.1',
                },
                {
                  label:
                    'Compare and contrast the inputs, outputs and system characteristics for two given food production systems.',
                  value: 'IBES-A5.2.2',
                },
                {
                  label:
                    'Evaluate the relative environmental impacts of two given food production systems.',
                  value: 'IBES-A5.2.3',
                },
                {
                  label:
                    'Discuss the links that exist between socio-cultural systems and food production systems.',
                  value: 'IBES-A5.2.4',
                },
                {
                  label:
                    'Evaluate strategies to increase sustainability in terrestrial food production systems.',
                  value: 'IBES-A5.2.5',
                },
              ],
              understandings: [
                {
                  label:
                    'The sustainability of terrestrial food production systems is influenced by factors such as scale; industrialization; mechanization; fossil fuel use; seed, crop and livestock choices; water use; fertilizers; pest control; pollinators; antibiotics; legislation; and levels of commercial versus subsistence food production.',
                  value: 'IBES-U5.2.1',
                },
                {
                  label:
                    'Inequalities exist in food production and distribution around the world.',
                  value: 'IBES-U5.2.2',
                },
                {
                  label:
                    'Food waste is prevalent in both LEDCs and more economically developed countries (MEDCs), but for different reasons.',
                  value: 'IBES-U5.2.3',
                },
                {
                  label:
                    'Socio-economic, cultural, ecological, political and economic factors can be seen to influence societies in their choices of food production systems.',
                  value: 'IBES-U5.2.4',
                },
                {
                  label:
                    'As the human population grows, along with urbanization and degradation of soil resources, the availability of land for food production per capita decreases.',
                  value: 'IBES-U5.2.5',
                },
                {
                  label:
                    'The yield of food per unit area from lower trophic levels is greater in quantity, lower in cost and may require fewer resources.',
                  value: 'IBES-U5.2.6',
                },
                {
                  label:
                    'Cultural choices may influence societies to harvest food from higher trophic levels.',
                  value: 'IBES-U5.2.7',
                },
                {
                  label:
                    'Terrestrial food production systems can be compared and contrasted according to inputs, outputs, system characteristics, environmental impact and socioeconomic factors.',
                  value: 'IBES-U5.2.8',
                },
                {
                  label:
                    'Increased sustainability may be achieved through: – altering human activity to reduce meat consumption and increase consumption of organically grown and locally produced terrestrial food products; – improving the accuracy of food labels to assist consumers in making informed food choices; – monitoring and control of the standards and practices of multinational and national food corporations by governmental and intergovernmental bodies; – planting of buffer zones around land suitable for food production to absorb nutrient runoff.',
                  value: 'IBES-U5.2.9',
                },
              ],
            },
            {
              label: 'Topic 5.3 Soil degradation and conservation',
              value: 'soilDegradationAndConservation',
              applications: [
                {
                  label:
                    'Explain the relationship between soil ecosystem succession and soil fertility.',
                  value: 'IBES-A5.3.1',
                },
                {
                  label:
                    'Discuss the influences of human activities on soil fertility and soil erosion.',
                  value: 'IBES-A5.3.2',
                },
                {
                  label:
                    'Evaluate the soil management strategies of a given commercial farming system and of a given subsistence farming system.',
                  value: 'IBES-A5.3.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Soil ecosystems change through succession. Fertile soil contains a community of organisms that work to maintain functioning nutrient cycles and that are resistant to soil erosion.',
                  value: 'IBES-U5.3.1',
                },
                {
                  label:
                    'Human activities that can reduce soil fertility include deforestation, intensive grazing, urbanization and certain agricultural practices (such as irrigation and monoculture).',
                  value: 'IBES-U5.3.2',
                },
                {
                  label:
                    'Commercial, industrialized food production systems generally tend to reduce soil fertility more than small-scale subsistence farming methods.',
                  value: 'IBES-U5.3.3',
                },
                {
                  label:
                    'Reduced soil fertility may result in soil erosion, toxification, salination and desertification.',
                  value: 'IBES-U5.3.4',
                },
                {
                  label:
                    'Soil conservation measures include soil conditioners (such as organic materials and lime), wind reduction techniques (wind breaks, shelter belts), cultivation techniques (terracing, contour ploughing, strip cultivation) and avoiding the use of marginal lands.',
                  value: 'IBES-U5.3.5',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 6: Atmospheric systems and societies',
          value: 'atmosphericSystemsAndSocieties',
          topics: [
            {
              label: 'Topic 6.1 Introduction to the atmosphere',
              value: 'introductionToTheAtmosphere',
              applications: [
                {
                  label:
                    'Discuss the role of the albedo effect from clouds in regulating global average temperature.',
                  value: 'IBES-A6.1.1',
                },
                {
                  label:
                    'Outline the role of the greenhouse effect in regulating temperature on Earth.',
                  value: 'IBES-A6.1.2',
                },
              ],
              understandings: [
                {
                  label:
                    'The atmosphere is a dynamic system (with inputs, outputs, flows and storages) that has undergone changes throughout geological time.',
                  value: 'IBES-U6.1.1',
                },
                {
                  label:
                    'The atmosphere is a predominantly a mixture of nitrogen and oxygen, with smaller amounts of carbon dioxide, argon, water vapour and other trace gases.',
                  value: 'IBES-U6.1.2',
                },
                {
                  label:
                    'Human activities impact atmospheric composition through altering inputs and outputs of the system. Changes in the concentrations of atmospheric gases—such as ozone, carbon dioxide, and water vapour—have significant effects on ecosystems.',
                  value: 'IBES-U6.1.3',
                },
                {
                  label:
                    'Most reactions connected to living systems occur in the inner layers of the atmosphere, which are the troposphere (0–10 km above sea level) and the stratosphere (10–50 km above sea level).',
                  value: 'IBES-U6.1.4',
                },
                {
                  label:
                    'Most clouds form in the troposphere and play an important role in the albedo effect of the planet.',
                  value: 'IBES-U6.1.5',
                },
                {
                  label:
                    'The greenhouse effect of the atmosphere is a natural and necessary phenomenon maintaining suitable temperatures for living systems.',
                  value: 'IBES-U6.1.6',
                },
              ],
            },
            {
              label: 'Topic 6.2 Stratospheric ozone',
              value: 'stratosphericOzone',
              applications: [
                {
                  label:
                    'Evaluate the role of national and international organizations in reducing the emissions of ozone-depleting substances.',
                  value: 'IBES-A6.2.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Some ultraviolet radiation from the Sun is absorbed by stratospheric ozone causing the ozone molecule to break apart. Under normal conditions the ozone molecule will reform. This ozone destruction and reformation is an example of a dynamic equilibrium.',
                  value: 'IBES-U6.2.1',
                },
                {
                  label:
                    'Ozone depleting substances (including halogenated organic gases such as chlorofluorocarbons—CFCs) are used in aerosols, gas-blown plastics, pesticides, flame retardants and refrigerants. Halogen atoms (such as chlorine) from these pollutants increase destruction of ozone in a repetitive cycle, allowing more ultraviolet radiation to reach the Earth.',
                  value: 'IBES-U6.2.2',
                },
                {
                  label:
                    'Ultraviolet radiation reaching the surface of the Earth damages human living tissues, increasing the incidence of cataracts, mutation during cell division, skin cancer and other subsequent effects on health.',
                  value: 'IBES-U6.2.3',
                },
                {
                  label:
                    'The effects of increased ultraviolet radiation on biological productivity include damage to photosynthetic organisms, especially phytoplankton, which form the basis of aquatic food webs.',
                  value: 'IBES-U6.2.4',
                },
                {
                  label:
                    'Pollution management may be achieved by reducing the manufacture and release of ozone-depleting substances. Methods for this reduction include: – recycling refrigerants; – developing alternatives to gas-blown plastics, halogenated pesticides, propellants and aerosols; – developing non-propellant alternatives; UNEP has had a key role in providing information, and creating and evaluating international agreements, for the protection of stratospheric ozone.',
                  value: 'IBES-U6.2.5',
                },
                {
                  label:
                    'An illegal market for ozone-depleting substances persists and requires consistent monitoring.',
                  value: 'IBES-U6.2.6',
                },
                {
                  label:
                    'The Montreal Protocol on Substances that Deplete the Ozone Layer (1987) and subsequent updates is an international agreement for the reduction of use of ozone-depleting substances signed under the direction of UNEP. National governments complying with the agreement made national laws and regulations to decrease the consumption and production of halogenated organic gases such as chlorofluorocarbons (CFCs).',
                  value: 'IBES-U6.2.7',
                },
              ],
            },
            {
              label: 'Topic 6.3 Photochemical smog',
              value: 'photochemicalSmog',
              applications: [
                {
                  label:
                    'Evaluate pollution management strategies for reducing photochemical smog.',
                  value: 'IBES-A6.3.1',
                },
              ],
              understandings: [
                {
                  label:
                    'Primary pollutants from the combustion of fossil fuels include carbon monoxide, carbon dioxide, black carbon or soot, unburned hydrocarbons, oxides of nitrogen, and oxides of sulfur.',
                  value: 'IBES-U6.3.1',
                },
                {
                  label:
                    'In the presence of sunlight, secondary pollutants are formed when primary pollutants undergo a variety of reactions with other chemicals already present in the atmosphere.',
                  value: 'IBES-U6.3.2',
                },
                {
                  label:
                    'Tropospheric ozone is an example of a secondary pollutant, formed when oxygen molecules react with oxygen atoms that are released from nitrogen dioxide in the presence of sunlight.',
                  value: 'IBES-U6.3.3',
                },
                {
                  label:
                    'Tropospheric ozone is highly reactive and damages plants (crops and forests), irritates eyes, creates respiratory illnesses and damages fabrics and rubber materials. Smog is a complex mixture of primary and secondary pollutants, of which tropospheric ozone is the main pollutant.',
                  value: 'IBES-U6.3.4',
                },
                {
                  label:
                    'The frequency and severity of smog in an area depends on local topography, climate, population density, and fossil fuel use.',
                  value: 'IBES-U6.3.5',
                },
                {
                  label:
                    'Thermal inversions occur due to a lack of air movement when a layer of dense, cool air is trapped beneath a layer of less dense, warm air. This causes concentrations of air pollutants to build up near the ground instead of being dissipated by “normal” air movements.',
                  value: 'IBES-U6.3.6',
                },
                {
                  label:
                    'Deforestation and burning, may also contribute to smog.',
                  value: 'IBES-U6.3.7',
                },
                {
                  label:
                    'Economic losses caused by urban air pollution can be significant.',
                  value: 'IBES-U6.3.8',
                },
                {
                  label:
                    'Pollution management strategies include: – altering human activity to consume less fossil fuels—example activities include the purchase of energy-efficient technologies, the use of public or shared transit, and walking or cycling; – regulating and reducing pollutants at the point of emission through government regulation or taxation; – using catalytic converters to clean the exhaust of primary pollutants from car exhaust; – regulating fuel quality by governments; – adopting clean-up measures such as reforestation, regreening, and conservation of areas to sequester carbon dioxide.',
                  value: 'IBES-U6.3.9',
                },
              ],
            },
            {
              label: 'Topic 6.4 Acid deposition',
              value: 'acidDeposition',
              applications: [
                {
                  label:
                    'Evaluate pollution management strategies for acid deposition.',
                  value: 'IBES-A6.4.1',
                },
              ],
              understandings: [
                {
                  label:
                    'The combustion of fossil fuels produces sulfur dioxide and oxides of nitrogen as primary pollutants. These gases may be converted into secondary pollutants of dry deposition (such as ash and dry particles) or wet deposition (such as rain and snow).',
                  value: 'IBES-U6.4.1',
                },
                {
                  label:
                    'The possible effects of acid deposition on soil, water and living organisms include: – direct effect—for example, acid on aquatic organisms and coniferous forests; – indirect toxic effect—for example, increased solubility of metal (such as aluminium ions) on fish; – indirect nutrient effect—for example, leaching of plant nutrients.',
                  value: 'IBES-U6.4.2',
                },
                {
                  label:
                    'The impacts of acid deposition may be limited to areas downwind of major industrial regions but these areas may not be in the same country as the source of emissions.',
                  value: 'IBES-U6.4.3',
                },
                {
                  label:
                    'Pollution management strategies for acid deposition could include: – altering human activity—for example, through reducing use, or using alternatives to, fossil fuels; international agreements and national governments may work to reduce pollutant production through lobbying; – regulating and monitoring the release of pollutants—for example, through the use of scrubbers or catalytic converters that may remove sulfur dioxide and oxides of nitrogen from coal-burning powerplants and cars.',
                  value: 'IBES-U6.4.4',
                },
                {
                  label:
                    'Clean-up and restoration measures may include spreading ground limestone in acidified lakes or recolonization of damaged systems—but the scope of these measures is limited.',
                  value: 'IBES-U6.4.5',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 7: Climate change and energy production',
          value: 'climateChangeAndEnergyProduction',
          topics: [
            {
              label: 'Topic 7.1 Energy choices and security',
              value: 'energyChoicesAndSecurity',
              applications: [
                {
                  label:
                    'Evaluate the advantages and disadvantages of different energy sources.',
                  value: 'IBES-A7.1.1',
                },
                {
                  label:
                    'Discuss the factors that affect the choice of energy sources adopted by different societies.',
                  value: 'IBES-A7.1.2',
                },
                {
                  label: 'Discuss the factors which affect energy security.',
                  value: 'IBES-A7.1.3',
                },
                {
                  label: 'Evaluate the energy strategy of a given society.',
                  value: 'IBES-A7.1.4',
                },
              ],
              understandings: [
                {
                  label:
                    'Fossil fuels contribute to the majority of humankind’s energy supply, and they vary widely in the impacts of their production and their emissions; their use is expected to increase to meet global energy demand.',
                  value: 'IBES-U7.1.1',
                },
                {
                  label:
                    'Sources of energy with lower carbon dioxide emissions than fossil fuels include renewable energy (solar, biomass, hydropower, wind, wave, tidal and geothermal) and their use is expected to increase. Nuclear power is a lowcarbon low-emission non-renewable resource but is controversial due to the radioactive waste it produces and the potential scale of any accident.',
                  value: 'IBES-U7.1.2',
                },
                {
                  label:
                    'Energy security depends on adequate, reliable and affordable supply of energy that provides a degree of independence. An inequitable availability and uneven distributions of energy sources may lead to conflict.',
                  value: 'IBES-U7.1.3',
                },
                {
                  label:
                    'The energy choices adopted by a society may be influenced by availability; sustainability; scientific and technological developments; cultural attitudes; and political, economic and environmental factors. These in turn affect energy security and independence.',
                  value: 'IBES-U7.1.4',
                },
                {
                  label:
                    'Improvements in energy efficiencies and energy conservation can limit growth in energy demand and contribute to energy security.',
                  value: 'IBES-U7.1.5',
                },
              ],
            },
            {
              label: 'Topic 7.2 Climate change—causes and impacts',
              value: 'climateChangeCausesAndImpacts',
              applications: [
                {
                  label:
                    'Discuss the feedback mechanisms that would be associated with a change in mean global temperature.',
                  value: 'IBES-A7.2.1',
                },
                {
                  label:
                    'Evaluate contrasting viewpoints on the issue of climate change.',
                  value: 'IBES-A7.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Climate describes how the atmosphere behaves over relatively long periods of time, whereas weather describes the conditions in the atmosphere over a short period of time.',
                  value: 'IBES-U7.2.1',
                },
                {
                  label:
                    'Weather and climate are affected by oceanic and atmospheric circulatory systems.',
                  value: 'IBES-U7.2.2',
                },
                {
                  label:
                    'Human activities are increasing levels of greenhouse gases (GHGs, such as carbon dioxide, methane and water vapour) in the atmosphere, which leads to: – an increase in the mean global temperature; – increased frequency and intensity of extreme weather events; – the potential for long-term changes in climate and weather patterns; – rise in sea level.',
                  value: 'IBES-U7.2.3',
                },
                {
                  label:
                    'The potential impacts of climate change may vary from one location to another and may be perceived as either adverse or beneficial. These impacts may include changes in water availability, distribution of biomes and crop growing areas, loss of biodiversity and ecosystem services, coastal inundation, ocean acidification, and damage to human health.',
                  value: 'IBES-U7.2.4',
                },
                {
                  label:
                    'Both negative and positive feedback mechanisms are associated with climate change and may involve very long time lags.',
                  value: 'IBES-U7.2.5',
                },
                {
                  label:
                    'There has been significant debate due to conflicting EVSs surrounding the issue of climate change.',
                  value: 'IBES-U7.2.6',
                },
                {
                  label:
                    'Global climate models are complex and there is a degree of uncertainty regarding the accuracy of their predictions.',
                  value: 'IBES-U7.2.7',
                },
              ],
            },
            {
              label: 'Topic 7.3 Climate change—mitigation and adaptation',
              value: 'climateChangeMitigationAndAdaptation',
              applications: [
                {
                  label:
                    'Discuss mitigation and adaptation strategies to deal with impacts of climate change.',
                  value: 'IBES-A7.3.1',
                },
                {
                  label:
                    'Evaluate the effectiveness of international climate change talks.',
                  value: 'IBES-A7.3.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Mitigation involves reduction and/or stabilization of GHG emissions and their removal from the atmosphere.',
                  value: 'IBES-U7.3.1',
                },
                {
                  label:
                    'Mitigation strategies to reduce GHGs in general may include: – reduction of energy consumption; – reduction of emissions of oxides of nitrogen and methane from agriculture; – use of alternatives to fossil fuels; – geo-engineering.',
                  value: 'IBES-U7.3.2',
                },
                {
                  label:
                    'Mitigation strategies for carbon dioxide removal (CDR techniques) include: – protecting and enhancing carbon sinks through land management; for example, through the UN collaborative programme on reducting emissions from deforestation and forest degradation in developing countries (UNREDD) – using biomass as a fuel source; – using carbon capture and storage (CCS); – enhancing carbon dioxide absorption by the oceans through either fertilizing oceans with compounds of nitrogen, phosphorus and iron to encourage the biological pump, or increasing upwellings to release nutrients to the surface.',
                  value: 'IBES-U7.3.3',
                },
                {
                  label:
                    'Even if mitigation strategies drastically reduce future emissions of GHGs, past emissions will continue to have an effect for decades to come.',
                  value: 'IBES-U7.3.4',
                },
                {
                  label:
                    'Adaptation strategies can be used to reduce adverse affects and maximize any positive effects. Examples of adaptations include flood defences, vaccination programmes, desalinization plants and planting of crops in previously unsuitable climates.',
                  value: 'IBES-U7.3.5',
                },
                {
                  label:
                    'Adaptive capacity varies from place to place and can be dependent on financial and technological resources. MEDCs can provide economic and technological support to LEDCs.',
                  value: 'IBES-U7.3.6',
                },
                {
                  label:
                    'Adaptive capacity varies from place to place and can be dependent on financial and technological resources. MEDCs can provide economic and technological support to LEDCs.',
                  value: 'IBES-U7.3.7',
                },
              ],
            },
          ],
        },
        {
          label: 'Unit 8: Human systems and resource use',
          value: 'humanSystemsAndResourceUse',
          topics: [
            {
              label: 'Topic 8.1 Human population dynamics',
              value: 'humanPopulationDynamics',
              applications: [
                {
                  label: 'Calculate values of CBR, CDR, TFR, DT and NIR.',
                  value: 'IBES-A8.1.1',
                },
                {
                  label:
                    'Explain the relative values of CBR, CDR, TFR, DT and NIR.',
                  value: 'IBES-A8.1.2',
                },
                {
                  label:
                    'Analyse age–gender pyramids and diagrams showing demographic transition models.',
                  value: 'IBES-A8.1.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Demographic tools for quantifying human population include crude birth rate (CBR), crude death rate (CDR), total fertility rate (TFR), doubling time (DT) and natural increase rate (NIR).',
                  value: 'IBES-U8.1.1',
                },
                {
                  label:
                    'Global human population has followed a rapid growth curve, but there is uncertainty as to how this may be changing.',
                  value: 'IBES-U8.1.2',
                },
                {
                  label:
                    'As the human population grows, increased stress is placed on all of the Earth’s systems.',
                  value: 'IBES-U8.1.3',
                },
                {
                  label:
                    'Age–gender pyramids and demographic transition models (DTM) can be useful in the prediction of human population growth. The DTM is a model that shows how a population transitions from a pre-industrial stage with high CBRs and CDRs to an economically advanced stage with low or declining CBRs and low CDRs.',
                  value: 'IBES-U8.1.4',
                },
                {
                  label:
                    'Influences on human population dynamics include cultural, historical, religious, social, political and economic factors.',
                  value: 'IBES-U8.1.5',
                },
                {
                  label:
                    'National and international development policies may also have an impact on human population dynamics.',
                  value: 'IBES-U8.1.6',
                },
              ],
            },
            {
              label: 'Topic 8.2 Resource use in society',
              value: 'resourceUseInSociety',
              applications: [
                {
                  label:
                    'Outline an example of how renewable and non-renewable natural capital has been mismanaged.',
                  value: 'IBES-A8.2.1',
                },
                {
                  label:
                    'Explain the dynamic nature of the concept of natural capital.',
                  value: 'IBES-A8.2.2',
                },
              ],
              understandings: [
                {
                  label:
                    'Renewable natural capital can be generated and/or replaced as fast as it is being used. It includes living species and ecosystems that use solar energy and photosynthesis, as well as non-living items, such as groundwater and the ozone layer.',
                  value: 'IBES-U8.2.1',
                },
                {
                  label:
                    'Non-renewable natural capital is either irreplaceable or can only be replaced over geological timescales; for example, fossil fuels, soil and minerals.',
                  value: 'IBES-U8.2.2',
                },
                {
                  label:
                    'Renewable natural capital can be utilized sustainably or unsustainably. If renewable natural capital is used beyond its natural income this use becomes unsustainable.',
                  value: 'IBES-U8.2.3',
                },
                {
                  label:
                    'The impacts of extraction, transport and processing of a renewable natural capital may cause damage, making this natural capital unsustainable.',
                  value: 'IBES-U8.2.4',
                },
                {
                  label:
                    'Natural capital provides goods (such as tangible products) and services (such as climate regulation) that have value. This value may be aesthetic, cultural, economic, environmental, ethical, intrinsic, social, spiritual or technological.',
                  value: 'IBES-U8.2.5',
                },
                {
                  label:
                    'The concept of a natural capital is dynamic. Whether or not something has the status of natural capital, and the marketable value of that capital varies regionally and over time and is influenced by cultural, social, economic, environmental, technological and political factors. Examples include cork, uranium and lithium.',
                  value: 'IBES-U8.2.6',
                },
              ],
            },
            {
              label: 'Topic 8.3 Solid domestic waste',
              value: 'solidDomesticWaste',
              applications: [
                {
                  label: 'Evaluate SDW disposal options.',
                  value: 'IBES-A8.3.1',
                },
                {
                  label:
                    'Compare and contrast pollution management strategies for SDW.',
                  value: 'IBES-A8.3.2',
                },
                {
                  label:
                    'Evaluate, with reference to figure 3, pollution management strategies for SDW by considering recycling, incineration, composting and landfills.',
                  value: 'IBES-A8.3.3',
                },
                {
                  label: '[missing info]',
                  value: 'IBES-A8.3.4',
                },
              ],
              understandings: [
                {
                  label:
                    'There are different types of SDW, the volume and composition of which changes over time.',
                  value: 'IBES-U8.3.1',
                },
                {
                  label:
                    'The abundance and prevalence of non-biodegradable pollution (such as plastic, batteries or e-waste) in particular has become a major environmental issue.',
                  value: 'IBES-U8.3.2',
                },
                {
                  label:
                    'Waste disposal options include landfills, incineration, recycling and composting.',
                  value: 'IBES-U8.3.3',
                },
                {
                  label:
                    'There are a variety of strategies that can be used to manage SDW (refer to figure 3) influenced by cultural, economic, technological and political barriers. These strategies include: – altering human activity—for example, through a reduction of consumption and composting of food waste.; – controlling the release of pollutant—governments create legislation to encourage recycling and reuse initiatives and impose taxes for SDW collection and on disposable items; – reclaiming landfills, using SDW for waste-to-energy programmes, implementing initiatives to remove plastics from the Great Pacific garbage patch (clean-up and restoration).',
                  value: 'IBES-U8.3.4',
                },
              ],
            },
            {
              label: 'Topic 8.4 Human population carrying capacity',
              value: 'humanPopulationCarryingCapacity',
              applications: [
                {
                  label:
                    'Evaluate the application of carrying capacity to local and global human populations.',
                  value: 'IBES-A8.4.1',
                },
                {
                  label:
                    'Compare and contrast the differences in the EF of two countries.',
                  value: 'IBES-A8.4.2',
                },
                {
                  label:
                    'Evaluate how EVSs impact the EFs of individuals or populations.',
                  value: 'IBES-A8.4.3',
                },
              ],
              understandings: [
                {
                  label:
                    'Carrying capacity is the maximum number of a species, or “load”, that can be sustainably supported by a given area.',
                  value: 'IBES-U8.4.1',
                },
                {
                  label:
                    'It is possible to estimate the carrying capacity of an environment for a given species; however, this is problematic in the case of human populations for a number of reasons.',
                  value: 'IBES-U8.4.2',
                },
                {
                  label:
                    'An EF is the area of land and water required to support a defined human population at a given standard of living. The measure of an EF takes into account the area required to provide all the resources needed by the population, and the assimilation of all wastes.',
                  value: 'IBES-U8.4.3',
                },
                {
                  label:
                    'EF is a model used to estimate the demands that human populations place on the environment.',
                  value: 'IBES-U8.4.4',
                },
                {
                  label:
                    'EFs may vary significantly by country and by individual and include aspects such as lifestyle choices (EVS), productivity of food production systems, land use and industry. If the EF of a human population is greater than the land area available to it, this indicates that the population is unsustainable and exceeds the carrying capacity of that area.',
                  value: 'IBES-U8.4.5',
                },
                {
                  label:
                    'Degradation of the environment, together with the consumption of finite resources, is expected to limit human population growth.',
                  value: 'IBES-U8.4.6',
                },
                {
                  label:
                    'If human populations do not live sustainably, they will exceed carrying capacity and risk collapse.',
                  value: 'IBES-U8.4.7',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Introductory biology for non-majors',
      value: 'introBioForNonMajors',
    },
    {
      label: 'Introductory Biology for Majors',
      value: 'introBioForMajors',
      units: [
        {
          label: 'Biochemistry and Molecular Biology',
          value: 'ibm-u1',
          topics: [
            {
              label: 'General Chemistry',
              value: 'ibm-u1-t1',
              learningObjectives: [
                {
                  label:
                    'Using the atomic number of an element, determine the number of electrons in each electron shell.',
                  value: 'ibm-u1-t1-lo1',
                },
                {
                  label: 'Compare and contrast positive and negative ions',
                  value: 'ibm-u1-t1-lo2',
                },
                {
                  label:
                    'Determine if a non-polar, polar or ionic bond will form between any two atoms, and identify any partial or full charges that will be present.',
                  value: 'ibm-u1-t1-lo3',
                },
                {
                  label:
                    'Contrast covalent and ionic bonds, including the mechanism of formation and strength of each type of bond.',
                  value: 'ibm-u1-t1-lo4',
                },
                {
                  label:
                    'Given the atomic number and electronegativity for a few elements, determine a potential compound that could be formed. Label the types of bonds that would form between each element in the compound, and whether partial or full charges would be present.',
                  value: 'ibm-u1-t1-lo5',
                },
                {
                  label:
                    'Given the molecular formula for a compound, determine a molecular structure that would result in filled valence shells, and whether any partial or full charges would be present.',
                  value: 'ibm-u1-t1-lo6',
                },
              ],
            },
            {
              label: 'Macromolecules - General',
              value: 'ibm-u1-t2',
              learningObjectives: [
                {
                  label:
                    'Describe the composition of macromolecules required by living organisms.',
                  value: 'ibm-u1-t2-lo1',
                },
                {
                  label:
                    'Explain the reactions used to cleave and form covalent bonds between molecular subunits.',
                  value: 'ibm-u1-t2-lo2',
                },
                {
                  label:
                    'Recognize the structure of the four major biological macromolecules  and the subunits used to form each macromolecule.',
                  value: 'ibm-u1-t2-lo3',
                },
                {
                  label:
                    'Analyze how the structure of biological molecules (carbohydrates, lipids, nucleic acids, proteins) impacts their function. Predict or evaluate how a change in the subunit may lead to changes in the function of the macromolecule.',
                  value: 'ibm-u1-t2-lo4',
                },
                {
                  label:
                    'Describe the functions of each of the major biological macromolecules',
                  value: 'ibm-u1-t2-lo5',
                },
              ],
            },
            {
              label: 'Macromolecules: DNA and RNA',
              value: 'ibm-u1-t3',
              learningObjectives: [
                {
                  label:
                    'Describe the primary and secondary structure of DNA and the role of phosphodiester and hydrogen bonds in the formation of these levels of structure',
                  value: 'ibm-u1-t3-lo1',
                },
                {
                  label:
                    "Recognize complementary base pairing, and 5' and 3' antiparallel strands in a DNA molecule, and explain why complementary base pairing requires that DNA strands are antiparallel:",
                  value: 'ibm-u1-t3-lo2',
                },
                {
                  label:
                    'Compare and contrast the structure, chemical composition, location, and function of DNA and RNA.',
                  value: 'ibm-u1-t3-lo3',
                },
              ],
            },
            {
              label: 'Macromolecules Proteins',
              value: 'ibm-u1-t4',
              learningObjectives: [
                {
                  label:
                    'Recognize the four components of an amino acid and explain how the R-group will determine its unique characteristics',
                  value: 'ibm-u1-t4-lo1',
                },
                {
                  label:
                    "Describe each of the four levels of protein structure and explain how each influences the protein's final size, shape, and chemical properties",
                  value: 'ibm-u1-t4-lo2',
                },
                {
                  label:
                    "Compare which bonds are responsible for producing a protein's 1) primary structure, 2) secondary structure (alpha-helices and beta-pleated sheets), and 3) tertiary structure",
                  value: 'ibm-u1-t4-lo3',
                },
                {
                  label:
                    "Given the primary structure of a polypeptide, deduce 1)which type of bonds could form between pairs of amino acids to form the tertiary structure, 2) whether a change in a specific amino acid will change the protein's structure, and 3) which aspects of structure will be altered first in response to heating, changes in pH, or other conditions",
                  value: 'ibm-u1-t4-lo4',
                },
              ],
            },
            {
              label: 'Water',
              value: 'ibm-u1-t5',
              learningObjectives: [
                {
                  label:
                    'Demonstrate how the polarity of two molecules, such as two water molecules, results in hydrogen bonding.',
                  value: 'ibm-u1-t5-lo1',
                },
                {
                  label:
                    'Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function.',
                  value: 'ibm-u1-t5-lo2',
                },
                {
                  label:
                    'Explain how the dissociation of water results in acidic and basic conditions, and demonstrate how the concentration of protons in a solution determines pH.',
                  value: 'ibm-u1-t5-lo3',
                },
                {
                  label:
                    "Analyze how water's high energy absorbing capacity will affect temperature in a variety of contexts.",
                  value: 'ibm-u1-t5-lo4',
                },
                {
                  label:
                    'Analyze how water molecules will interact with the non-polar, polar and ionic regions of a molecule and predict whether the molecule will dissolve in water.',
                  value: 'ibm-u1-t5-lo5',
                },
              ],
            },
            {
              label: 'Biotechnology',
              value: 'ibm-u1-t6',
              learningObjectives: [
                {
                  label:
                    'Explain the concept of PCR and compare it to the process of DNA replication.',
                  value: 'ibm-u1-t6-lo1',
                },
                {
                  label:
                    'Explain how gel electrophoresis can be used to separate DNA fragments.',
                  value: 'ibm-u1-t6-lo2',
                },
                {
                  label:
                    'Given data, predict the relative size of protein or DNA samples and interpret the presence or absence of a known protein or region of DNA (such as a PCR product).',
                  value: 'ibm-u1-t6-lo3',
                },
                {
                  label: 'Explain how the CRISPR/Cas9 system edits DNA',
                  value: 'ibm-u1-t6-lo4',
                },
                {
                  label:
                    'Given a DNA sequence, design a CRISPR/Cas9 system that could be used to disable the gene.',
                  value: 'ibm-u1-t6-lo5',
                },
                {
                  label:
                    'Evaluate the benefits and concerns associated with genetic modification and gene editing.  ',
                  value: 'ibm-u1-t6-lo6',
                },
                {
                  label:
                    'Evaluate the benefits and concerns associated with the availability of genetic information.',
                  value: 'ibm-u1-t6-lo7',
                },
                {
                  label:
                    'Describe molecular techniques used for the analysis or manipulation of DNA.',
                  value: 'ibm-u1-t6-lo8',
                },
              ],
            },
          ],
        },
        {
          label: 'Cell Biology',
          value: 'ibm-u2',
          topics: [
            {
              label: 'Cell Structure and Function',
              value: 'ibm-u2-t1',
              learningObjectives: [
                {
                  label:
                    'Describe the structure of subcellular components and organelles',
                  value: 'ibm-u2-t1-lo1',
                },
                {
                  label:
                    'Explain how subcellular components and organelles contribute to the function of the cell.',
                  value: 'ibm-u2-t1-lo2',
                },
                {
                  label:
                    'Compare and contrast the structure and function of the key elements of prokaryotic versus eukaryotic cell structure.',
                  value: 'ibm-u2-t1-lo3',
                },
                {
                  label:
                    'Compare and contrast the structure and function of key elements of plant versus animal cell structure.',
                  value: 'ibm-u2-t1-lo4',
                },
                {
                  label:
                    'Predict the function of a cell, given a drawing, micrograph, or description of its structure and organelle content. ',
                  value: 'ibm-u2-t1-lo5',
                },
                {
                  label:
                    'Predict the structure of a cell, given information on its function.',
                  value: 'ibm-u2-t1-lo6',
                },
                {
                  label: 'Describe the functions of the endomembrane system.',
                  value: 'ibm-u2-t1-lo7',
                },
                {
                  label:
                    'Explain what would happen if the normal processing of proteins in the endomembrane system were altered.',
                  value: 'ibm-u2-t1-lo8',
                },
                {
                  label:
                    'Compare and contrast the structure and function of microtubules, actin filaments (microfilaments), and intermediate filaments.',
                  value: 'ibm-u2-t1-lo9',
                },
                {
                  label:
                    'Describe how motor proteins use chemical energy to change shape and create movement in the cell.',
                  value: 'ibm-u2-t1-lo10',
                },
              ],
            },
            {
              label: 'Cell Cycle',
              value: 'ibm-u2-t2',
              learningObjectives: [
                {
                  label:
                    'Describe the process, outcome and purpose of mitosis.',
                  value: 'ibm-u2-t2-lo1',
                },
                {
                  label:
                    'Predict the consequences of errors that occur during mitosis',
                  value: 'ibm-u2-t2-lo2',
                },
                {
                  label: 'Describe the events that occur in the cell cycle',
                  value: 'ibm-u2-t2-lo3',
                },
                {
                  label:
                    'Explain how the cell cycle is regulated at checkpoints by a molecular control system.',
                  value: 'ibm-u2-t2-lo4',
                },
                {
                  label:
                    'Predict the consequences of checkpoint dysfunction on cell fate',
                  value: 'ibm-u2-t2-lo5',
                },
                {
                  label:
                    'Explain how mutations that alter the cell cycle can result in cancer',
                  value: 'ibm-u2-t2-lo6',
                },
              ],
            },
            {
              label: 'Cell Energetics: General',
              value: 'ibm-u2-t3',
              learningObjectives: [
                {
                  label:
                    'Explain how redox reactions are used during the processes of cell respiration and photosynthesis',
                  value: 'ibm-u2-t3-lo1',
                },
                {
                  label:
                    'Given a molecular formula, determine which element(s) is/are being reduced and which is/are being oxidized.',
                  value: 'ibm-u2-t3-lo2',
                },
                {
                  label:
                    'Describe the changes in free energy that can occur during a chemical reaction.',
                  value: 'ibm-u2-t3-lo3',
                },
                {
                  label:
                    'Describe the structure of ATP and explain why a large change in free energy occurs when ATP is hydrolyzed, or ADP is phosphorylated.',
                  value: 'ibm-u2-t3-lo4',
                },
                {
                  label:
                    'Explain how ATP provides energy for cellular processes by coupling exergonic reactions to endergonic reactions.',
                  value: 'ibm-u2-t3-lo5',
                },
                {
                  label:
                    'Given  data on how free energy changes over the course of a chemical reaction, predict whether two specific reactions can be successfully coupled.',
                  value: 'ibm-u2-t3-lo6',
                },
              ],
            },
            {
              label: 'Cellular Energetics: Respiration',
              value: 'ibm-u2-t4',
              learningObjectives: [
                {
                  label:
                    'Summarize the inputs and outputs of glycolysis, pyruvate processing, the citric acid cycle, and oxidative phosphorylation and chemiosmosis.',
                  value: 'ibm-u2-t4-lo1',
                },
                {
                  label:
                    'Explain how energy is transferred or transformed in each stage of the cell respiration process. ',
                  value: 'ibm-u2-t4-lo2',
                },
                {
                  label:
                    'Predict the possible consequences if a step in the glucose oxidation (cellular respiration) pathway is altered. ',
                  value: 'ibm-u2-t4-lo3',
                },
                {
                  label:
                    'Explain the processes of electron transport and chemiosmosis that occur during cellular respiration',
                  value: 'ibm-u2-t4-lo4',
                },
                {
                  label:
                    'Predict the effects of a perturbation to the electron transport chain or ATP synthase.',
                  value: 'ibm-u2-t4-lo5',
                },
                {
                  label:
                    'Describe how feedback mechanisms control cellular respiration',
                  value: 'ibm-u2-t4-lo6',
                },
                {
                  label:
                    'Predict what might happen if a step in a feedback mechanism that controls cell respiration is disrupted.',
                  value: 'ibm-u2-t4-lo7',
                },
              ],
            },
            {
              label: 'CellularEnergetics: Photosynthesis',
              value: 'ibm-u2-t5',
              learningObjectives: [
                {
                  label:
                    'Describe how the ultraviolet, visible and infrared ranges of the electromagnetic spectrum differ in energy, and absorbance by photosynthetic pigments.',
                  value: 'ibm-u2-t5-lo1',
                },
                {
                  label:
                    'Summarize the inputs and outputs of the light-dependent reactions and the Calvin cycle.',
                  value: 'ibm-u2-t5-lo2',
                },
                {
                  label:
                    'Explain how the light reactions convert solar energy to the chemical energy of ATP and NADPH',
                  value: 'ibm-u2-t5-lo3',
                },
                {
                  label:
                    'Explain how the reactions of the Calvin cycle use ATP and NADPH to convert CO2 to sugar.',
                  value: 'ibm-u2-t5-lo4',
                },
                {
                  label:
                    'Predict the possible consequences for the production of ATP and NADPH if a component or process in the photosynthesis pathway is altered.',
                  value: 'ibm-u2-t5-lo5',
                },
              ],
            },
            {
              label: 'Cellular Energetics: Enzymes',
              value: 'ibm-u2-t6',
              learningObjectives: [
                {
                  label:
                    'Analyze free energy changes over the course of a chemical reaction.',
                  value: 'ibm-u2-t6-lo1',
                },
                {
                  label:
                    'Describe the structure of enzymes and explain how they affect the rate of biological reactions.',
                  value: 'ibm-u2-t6-lo2',
                },
                {
                  label:
                    'Predict how specific changes to the structure of an enzyme may affect its function.',
                  value: 'ibm-u2-t6-lo3',
                },
                {
                  label:
                    'Explain how the cellular environment affects enzyme activity',
                  value: 'ibm-u2-t6-lo4',
                },
                {
                  label:
                    'Analyze how quantitative changes in the cellular environment affect enzyme function',
                  value: 'ibm-u2-t6-lo5',
                },
                {
                  label: 'Explain how enzymes are regulated.',
                  value: 'ibm-u2-t6-lo6',
                },
                {
                  label:
                    'Predict how different concentrations of regulatory molecules will affect the activity rate of allosterically regulated enzymes.',
                  value: 'ibm-u2-t6-lo7',
                },
              ],
            },
            {
              label:
                'Cellular Energetics: Integration of  photosynthesis and respiration',
              value: 'ibm-u2-t7',
              learningObjectives: [
                {
                  label:
                    'Given the summary reactions for photosynthesis and respiration, compare 1) the reactants and products of each process, and 2) the energy transformations that occur',
                  value: 'ibm-u2-t7-lo1',
                },
                {
                  label:
                    'Integrate knowledge of photosynthesis and cellular respiration to explain how the flow of energy from the sun is eventually incorporated into a new biomolecule.',
                  value: 'ibm-u2-t7-lo2',
                },
                {
                  label:
                    'Integrate knowledge of photosynthesis and cellular respiration to explain how carbon from CO2 is eventually incorporated into a new biomolecule.',
                  value: 'ibm-u2-t7-lo3',
                },
                {
                  label:
                    'Using knowledge of cell respiration and photosynthesis processes, analyze how perturbations to the environment will affect atmospheric CO2 levels.',
                  value: 'ibm-u2-t7-lo4',
                },
              ],
            },
            {
              label: 'Membrane structure',
              value: 'ibm-u2-t8',
              learningObjectives: [
                {
                  label:
                    'Describe the amphipathic structure of phospholipids and explain how their molecular properties result in the spontaneous formation of micelles and bilayers in water.',
                  value: 'ibm-u2-t8-lo1',
                },
                {
                  label:
                    'Describe the structure of the cell membrane and explain the function of each of the components.',
                  value: 'ibm-u2-t8-lo2',
                },
                {
                  label:
                    'Explain how the structure of biological membranes influences selective permeability.',
                  value: 'ibm-u2-t8-lo3',
                },
                {
                  label:
                    'Explain how phophoslipid composition, cholesterol content and temperature affect membrane fluidity and permeability.',
                  value: 'ibm-u2-t8-lo4',
                },
              ],
            },
            {
              label: 'Movement across membranes',
              value: 'ibm-u2-t9',
              learningObjectives: [
                {
                  label:
                    'Describe the relative rates at which different types of molecules or ions cross a plasma membrane in the absence of membrane proteins.',
                  value: 'ibm-u2-t9-lo1',
                },
                {
                  label:
                    'Compare and contrast the passive and active processes that allow ions and other molecules to move across membranes.',
                  value: 'ibm-u2-t9-lo2',
                },
                {
                  label:
                    'Given a scenario, predict the method a substance uses to cross the membrane.',
                  value: 'ibm-u2-t9-lo3',
                },
                {
                  label:
                    'Given solute concentrations on either side of a membrane, characterize the tonicity of the solutions and determine the direction of net flow of the solute and/or water.',
                  value: 'ibm-u2-t9-lo4',
                },
                {
                  label:
                    'Explain the steps involved in the process of active transport of an ion or molecule across the plasma membrane.',
                  value: 'ibm-u2-t9-lo5',
                },
                {
                  label:
                    'Describe how the plasma membrane creates and/or maintains electrochemical gradients',
                  value: 'ibm-u2-t9-lo6',
                },
                {
                  label:
                    'Compare voltage-gated, mechanically-gated and ligand-gated ion channels. ',
                  value: 'ibm-u2-t9-lo7',
                },
              ],
            },
          ],
        },
        {
          label: 'Genetics',
          value: 'ibm-u3',
          topics: [
            {
              label: 'Meiosis',
              value: 'ibm-u3-t1',
              learningObjectives: [
                {
                  label:
                    'Explain the differences between somatic cells and germ cells.',
                  value: 'ibm-u3-t1-lo1',
                },
                {
                  label:
                    'Compare and contrast the genetic material in sister chromatids and homologous chromosomes',
                  value: 'ibm-u3-t1-lo2',
                },
                {
                  label:
                    'Describe the process, outcome and purpose of meiosis.',
                  value: 'ibm-u3-t1-lo3',
                },
                {
                  label:
                    'Predict the consequences of errors that occur during meiosis',
                  value: 'ibm-u3-t1-lo4',
                },
                {
                  label:
                    'Explain the processes of crossing-over and independent assortment and how they produce genetic variation',
                  value: 'ibm-u3-t1-lo5',
                },
                {
                  label:
                    'Given the genotype of a cell, determine the meiotic processes, including crossing-over and independent assortment, that would need to occur to produce a gamete with any given combination of alleles.',
                  value: 'ibm-u3-t1-lo6',
                },
                {
                  label: 'Compare and contrast sexual and asexual reproduction',
                  value: 'ibm-u3-t1-lo7',
                },
                {
                  label:
                    'Compare and contrast the phases, outcome and purpose of mitosis and meiosis.',
                  value: 'ibm-u3-t1-lo8',
                },
              ],
            },
            {
              label: 'Mutation',
              value: 'ibm-u3-t2',
              learningObjectives: [
                {
                  label:
                    'Describe the effect of various types of DNA point mutations on the process of protein synthesis.',
                  value: 'ibm-u3-t2-lo1',
                },
                {
                  label:
                    'Given the location of a specific type of point mutation, predict if it will affect protein function and phenotype. ',
                  value: 'ibm-u3-t2-lo2',
                },
                {
                  label:
                    'Explain how changes in genotype may result in changes in phenotype',
                  value: 'ibm-u3-t2-lo3',
                },
                {
                  label: 'Describe various types of chromosomal mutations',
                  value: 'ibm-u3-t2-lo4',
                },
                {
                  label:
                    'Given a specific chromosomal mutation, predict the effect on phenotype.',
                  value: 'ibm-u3-t2-lo5',
                },
                {
                  label:
                    'Explain how DNA damage and/or mismatches are detected and repaired.',
                  value: 'ibm-u3-t2-lo6',
                },
                {
                  label:
                    'Given a specific type of DNA mutation or damage, predict which DNA repair pathway would respond, and predict the consequences of successful and unsuccessful repair.',
                  value: 'ibm-u3-t2-lo7',
                },
              ],
            },
            {
              label: 'Patterns of Inheritance',
              value: 'ibm-u3-t3',
              learningObjectives: [
                {
                  label:
                    'Label the elements of a Punnett square and explain its use to determine genotype and phenotype frequency.',
                  value: 'ibm-u3-t3-lo1',
                },
                {
                  label:
                    'Calculate the frequencies of offspring genotypes and phenotypes for alleles that display complete, incomplete or co-dominance, and are autosomal or X-linked',
                  value: 'ibm-u3-t3-lo2',
                },
                {
                  label:
                    'Given information on parental and offspring phenotypes, determine the inheritance patterns of the alleles involved. ',
                  value: 'ibm-u3-t3-lo3',
                },
                {
                  label:
                    'Analyze data to determine how a trait is influenced by gene-by-gene and gene-by-environment interactions.',
                  value: 'ibm-u3-t3-lo4',
                },
                {
                  label:
                    'Explain how polygenic inheritance produces traits with continuous variation',
                  value: 'ibm-u3-t3-lo5',
                },
                {
                  label:
                    'Draw a simple pedigree, given information about the presence of a specific trait in multiple generations of a bloodline. ',
                  value: 'ibm-u3-t3-lo6',
                },
                {
                  label:
                    'Based on the data in a pedigree, predict parental and offspring phenotypes and determine the inheritance patterns of the alleles involved.',
                  value: 'ibm-u3-t3-lo7',
                },
              ],
            },
            {
              label: 'DNA Replication',
              value: 'ibm-u3-t4',
              learningObjectives: [
                {
                  label:
                    'Describe the function of major enzymes involved in DNA replication. ',
                  value: 'ibm-u3-t4-lo1',
                },
                {
                  label: 'Describe semi-conservative replication',
                  value: 'ibm-u3-t4-lo2',
                },
                {
                  label:
                    'Evaluate the evidence in support of the semi-conservative replication model.',
                  value: 'ibm-u3-t4-lo3',
                },
                {
                  label:
                    'Describe the processes by which the leading and lagging strands of DNA are replicated',
                  value: 'ibm-u3-t4-lo4',
                },
                {
                  label:
                    'Explain how the shortening of chromosomal telomeres occurs and the role of telomerase ',
                  value: 'ibm-u3-t4-lo5',
                },
              ],
            },
            {
              label: 'Gene Expression and Regulation',
              value: 'ibm-u3-t5',
              learningObjectives: [
                {
                  label: 'Explain the central dogma of molecular biology.',
                  value: 'ibm-u3-t5-lo1',
                },
                {
                  label:
                    'Compare and contrast the structure and function of the types of RNA involved in information processing. ',
                  value: 'ibm-u3-t5-lo2',
                },
                {
                  label: 'Describe the process of DNA transcription',
                  value: 'ibm-u3-t5-lo3',
                },
                {
                  label: 'Describe the process of mRNA translation',
                  value: 'ibm-u3-t5-lo4',
                },
                {
                  label:
                    'Given a strand of DNA, be able to predict the RNA transcript that is produced during transcription and the protein produced during translation.',
                  value: 'ibm-u3-t5-lo5',
                },
                {
                  label:
                    'Compare and contrast the processes of replication, transcription and translation in bacterial and eukaryotic cells',
                  value: 'ibm-u3-t5-lo6',
                },
                {
                  label:
                    'Explain how negative and positive control over transcription regulates the activity of a gene or operon.',
                  value: 'ibm-u3-t5-lo7',
                },
                {
                  label:
                    'Predict how a specific mutation could impact gene expression',
                  value: 'ibm-u3-t5-lo8',
                },
                {
                  label:
                    'Describe the process of RNA processing, and explain the consequences of alternative splicing',
                  value: 'ibm-u3-t5-lo9',
                },
                {
                  label:
                    'Given a primary transcript that contains introns and exons, predict the mRNAs and resulting gene products that could result from alternative splicing.',
                  value: 'ibm-u3-t5-lo10',
                },
                {
                  label:
                    'Explain how gene expression control can change gene products.',
                  value: 'ibm-u3-t5-lo11',
                },
              ],
            },
          ],
        },
        {
          label: 'Evolution',
          value: 'ibm-u4',
          topics: [
            {
              label: 'Mechanisms of Evolution',
              value: 'ibm-u4-t1',
              learningObjectives: [
                {
                  label:
                    'Explain how the scientific definitions of adaptation, fitness, evolution, and theory differ from their use in everyday English.',
                  value: 'ibm-u4-t1-lo1',
                },
                {
                  label:
                    'Describe the types of data that provide evidence for evolution.',
                  value: 'ibm-u4-t1-lo2',
                },
                {
                  label:
                    'Explain how random alterations in DNA create phenotypic variation that can be subject to natural selection.',
                  value: 'ibm-u4-t1-lo3',
                },
                {
                  label:
                    'Explain how differences in relative fitness associated with heritable phenotypic traits result in natural selection',
                  value: 'ibm-u4-t1-lo4',
                },
                {
                  label:
                    'Justify whether or not natural selection has occurred using data on heritable phenotypic variation, relative fitness and environmental conditions.',
                  value: 'ibm-u4-t1-lo5',
                },
                {
                  label:
                    'Compare the influence of directional, stabilizing and disruptive (diversifying) selection on the distribution of trait measurements around the mean value of the trait .',
                  value: 'ibm-u4-t1-lo6',
                },
                {
                  label:
                    'Identify presence of directional, stabilizing or disruptive (diversifying) selection using data on the change of allele or trait frequencies over time, or on the variation in fitness across the quantitative trait.',
                  value: 'ibm-u4-t1-lo7',
                },
                {
                  label:
                    "Using specific examples, explain why evolution by natural selection is neither random nor progressive, and why adaptations are not 'perfect'.",
                  value: 'ibm-u4-t1-lo8',
                },
                {
                  label: 'Explain how sexual selection occurs.',
                  value: 'ibm-u4-t1-lo9',
                },
                {
                  label:
                    'Explain how genetic drift results in changes in the frequecy of alleles or traits in a population.',
                  value: 'ibm-u4-t1-lo10',
                },
                {
                  label:
                    'Analyze a scenario or data and determine whether allele or phenotypic trait frequencies are changing due to natural selection, genetic drift, or gene flow. ',
                  value: 'ibm-u4-t1-lo11',
                },
                {
                  label:
                    'Explain how gene flow results in changes in the frequency of alleles or traits in a population.',
                  value: 'ibm-u4-t1-lo12',
                },
                {
                  label:
                    'Explain why mutation is a particularly important evolutionary process in bacteria, viruses, and other groups with short generation times.',
                  value: 'ibm-u4-t1-lo13',
                },
                {
                  label:
                    'Explain why inbreeding depression occurs and results in reduced fitness for affected populations.',
                  value: 'ibm-u4-t1-lo14',
                },
              ],
            },
            {
              label: 'Population Genetics',
              value: 'ibm-u4-t2',
              learningObjectives: [
                {
                  label:
                    'Explain why the Hardy-Weinberg principle provides a null model for evolution.',
                  value: 'ibm-u4-t2-lo1',
                },
                {
                  label:
                    'Using genotype frequency data for a population, calculate the genotype frequencies expected under the Hardy-Weinberg conditions, and interpret any differences between observed and expected genotype frequencies.',
                  value: 'ibm-u4-t2-lo2',
                },
                {
                  label:
                    'Given information about the frequency of a homozygous recessive or dominant trait, calculate all expected genotype frequencies under Hardy-Weinberg conditions.',
                  value: 'ibm-u4-t2-lo3',
                },
                {
                  label:
                    'Explain how the genetic diversity of a species or population affects its ability to withstand environmental pressures.',
                  value: 'ibm-u4-t2-lo4',
                },
                {
                  label:
                    'Evaluate the advantages and disadvantages of creating gene flow by moving individuals into a population of a specific endangered species.',
                  value: 'ibm-u4-t2-lo5',
                },
                {
                  label:
                    'Explain evolutionary tradeoffs by describing how the increase in fitness of one trait may result in decreased fitness in another trait.',
                  value: 'ibm-u4-t2-lo6',
                },
              ],
            },
            {
              label: 'Phylogenetics',
              value: 'ibm-u4-t3',
              learningObjectives: [
                {
                  label: 'Describe the structure of a phylogenetic tree.',
                  value: 'ibm-u4-t3-lo1',
                },
                {
                  label:
                    'Identify monophyletic, paraphyletic and polyphyletc groups on a phylogenetic tree.',
                  value: 'ibm-u4-t3-lo2',
                },
                {
                  label:
                    'Identify a synapomorphy for a monophyletic group on a phylogenetic tree.',
                  value: 'ibm-u4-t3-lo3',
                },
                {
                  label:
                    'Identify the most recent common ancestor of any two species on a phylogenetic tree.',
                  value: 'ibm-u4-t3-lo4',
                },
                {
                  label: 'Identify a homoplasy in a phylogenetic tree.',
                  value: 'ibm-u4-t3-lo5',
                },
                {
                  label:
                    'Compare and contrast divergent and convergent evolution.',
                  value: 'ibm-u4-t3-lo6',
                },
                {
                  label:
                    'Given a phylogenetic tree and information on the state of a trait at each tip, create a hypothesis for how that trait changed over time. ',
                  value: 'ibm-u4-t3-lo7',
                },
                {
                  label:
                    'Explain how parsimony can be used to construct a phylogenetic tree, including how it relates to the concepts of homology and homoplasy.',
                  value: 'ibm-u4-t3-lo8',
                },
                {
                  label:
                    'Construct a parsimonious phylogentic tree for a small group of taxa using data on the presence or absence of specific morphological or molecular traits within each taxa.',
                  value: 'ibm-u4-t3-lo9',
                },
              ],
            },
            {
              label: 'Speciation',
              value: 'ibm-u4-t4',
              learningObjectives: [
                {
                  label:
                    'Compare the strengths and limitations of the biological, morphological, and phylogenetic species concepts.',
                  value: 'ibm-u4-t4-lo1',
                },
                {
                  label:
                    'Using data, determine whether identified populations are of the same or different species under the biological, morphological, and phylogenetic species concepts.',
                  value: 'ibm-u4-t4-lo2',
                },
                {
                  label:
                    'Explain how genetic isolation and genetic divergence result in speciation.',
                  value: 'ibm-u4-t4-lo3',
                },
                {
                  label:
                    'Analyze data and evaluate whether two populations are evolving into distinct species',
                  value: 'ibm-u4-t4-lo4',
                },
                {
                  label:
                    'Compare and contrast allopatric and sympatric speciation.',
                  value: 'ibm-u4-t4-lo5',
                },
              ],
            },
            {
              label: 'Extinction',
              value: 'ibm-u4-t5',
              learningObjectives: [
                {
                  label:
                    'Compare and contrast the five major mass extinction events, and evaluate the claim that a mass extinction event is currently underway.',
                  value: 'ibm-u4-t5-lo1',
                },
                {
                  label:
                    'Evaluate data on competing hypotheses for the causes of the end-Cretaceous and/or end-Permian mass extinctions.',
                  value: 'ibm-u4-t5-lo2',
                },
                {
                  label:
                    'Explain how ecological opportunities and/or key innovations can cause an adaptive radiation.',
                  value: 'ibm-u4-t5-lo3',
                },
                {
                  label:
                    'Given data, evaluate the claim that an adaptive radiation occurred.',
                  value: 'ibm-u4-t5-lo4',
                },
              ],
            },
            {
              label: 'Human Evolution',
              value: 'ibm-u4-t6',
              learningObjectives: [
                {
                  label:
                    'Explain the central claims of the Out of Africa hypothesis, and the role of genetic drift, natural selection, and gene flow in the evolution of Homo sapiens.',
                  value: 'ibm-u4-t6-lo1',
                },
                {
                  label:
                    'Evaluate the claim of a biological basis for race by analyzing data on the presence or absence of different traits in human populations.',
                  value: 'ibm-u4-t6-lo2',
                },
              ],
            },
          ],
        },
        {
          label: 'Ecology',
          value: 'ibm-u5',
          topics: [
            {
              label: 'Ecosystems',
              value: 'ibm-u5-t1',
              learningObjectives: [
                {
                  label:
                    'Explain the difference between abiotic and biotic factors in an ecosystem and provide examples of how these factors can affect communities.',
                  value: 'ibm-u5-t1-lo1',
                },
                {
                  label:
                    'Describe the nested relationships among populations, species, communities, and ecosystems.',
                  value: 'ibm-u5-t1-lo2',
                },
                {
                  label: 'Describe the consequences of biomagnification.',
                  value: 'ibm-u5-t1-lo3',
                },
                {
                  label:
                    'Evaluate strategies for mitigation of biomagnification.',
                  value: 'ibm-u5-t1-lo4',
                },
              ],
            },
            {
              label: 'Biomes',
              value: 'ibm-u5-t2',
              learningObjectives: [
                {
                  label:
                    'Evaluate the importance of various biotic and abiotic factors in a particular biome',
                  value: 'ibm-u5-t2-lo1',
                },
                {
                  label:
                    'Compare the factors that limit the distribution and abundance of aquatic species versus terrestrial species.',
                  value: 'ibm-u5-t2-lo2',
                },
                {
                  label:
                    'Predict how the distribution and abundance of aquatic and terrestrial species will change in response to ecological perturbations, such as climate change.',
                  value: 'ibm-u5-t2-lo3',
                },
              ],
            },
            {
              label: 'Populations',
              value: 'ibm-u5-t3',
              learningObjectives: [
                {
                  label:
                    'Given information presented as graphs, tables, or equations, describe how the size of a population has changed over time.',
                  value: 'ibm-u5-t3-lo1',
                },
                {
                  label:
                    'Use mathematical tools to predict changes in  population size over time.',
                  value: 'ibm-u5-t3-lo2',
                },
                {
                  label:
                    'Describe the spatial distribution of individuals of a species within a community.',
                  value: 'ibm-u5-t3-lo3',
                },
                {
                  label:
                    'Analyze the consequences of human activities changing a continuous population to a metapopulation.',
                  value: 'ibm-u5-t3-lo4',
                },
                {
                  label:
                    'Explain how interactions within and among populations influence the distribution and abundance of a given species.',
                  value: 'ibm-u5-t3-lo5',
                },
              ],
            },
            {
              label: 'Communities',
              value: 'ibm-u5-t4',
              learningObjectives: [
                {
                  label:
                    'Predict how interactions within and among populations will influence evolution of a population.',
                  value: 'ibm-u5-t4-lo1',
                },
                {
                  label:
                    'Explain how interactions within and among populations influence community structure.',
                  value: 'ibm-u5-t4-lo2',
                },
                {
                  label:
                    'Describe factors that can result in changes in community composition over time.',
                  value: 'ibm-u5-t4-lo3',
                },
                {
                  label:
                    'Analyze factors contributing to changes in composition and dynamics of a specific community.',
                  value: 'ibm-u5-t4-lo4',
                },
                {
                  label:
                    'Predict the consequences of perturbations to a food web.',
                  value: 'ibm-u5-t4-lo5',
                },
                {
                  label:
                    'Expain the effects of fitness trade-offs on life history traits.',
                  value: 'ibm-u5-t4-lo6',
                },
                {
                  label:
                    'Predict the influence of a disturbance on community composition.',
                  value: 'ibm-u5-t4-lo7',
                },
              ],
            },
            {
              label: 'Matter and Energy',
              value: 'ibm-u5-t5',
              learningObjectives: [
                {
                  label:
                    'Describe the major events in the global cycling of water, carbon, and nitrogen.',
                  value: 'ibm-u5-t5-lo1',
                },
                {
                  label:
                    'Explain how human activities have affected global water, carbon and nitrogen cycles.',
                  value: 'ibm-u5-t5-lo2',
                },
                {
                  label:
                    'Compare net primary productivity in aquatic and terrestrial ecosystems.',
                  value: 'ibm-u5-t5-lo3',
                },
                {
                  label:
                    'Explain how energy availability influences abundance and biomass of organisms in a food chain.',
                  value: 'ibm-u5-t5-lo4',
                },
                {
                  label:
                    'Predict the consequences of changes in ecosystem primary production due to perturbations',
                  value: 'ibm-u5-t5-lo5',
                },
                {
                  label:
                    'Compare top-down and bottom-up regulation in a community.',
                  value: 'ibm-u5-t5-lo6',
                },
              ],
            },
            {
              label: 'Cimate Change',
              value: 'ibm-u5-t6',
              learningObjectives: [
                {
                  label:
                    'Interpret graphs showing ecosystem changes that can be attributed to fluctuating greenhouse gasses over time',
                  value: 'ibm-u5-t6-lo1',
                },
                {
                  label:
                    'Explain how human activities contribute to climate change.',
                  value: 'ibm-u5-t6-lo2',
                },
                {
                  label:
                    'Evaluate strategies for reducing atmospheric greenhouse gasses.',
                  value: 'ibm-u5-t6-lo3',
                },
                {
                  label:
                    'Describe the influence of feedback loops on greenhouse gas prevalence and climate change.',
                  value: 'ibm-u5-t6-lo4',
                },
                {
                  label:
                    'Given predictions of future changes in carbon emissions, evaluate the impacts for organisms and ecosystems.',
                  value: 'ibm-u5-t6-lo5',
                },
                {
                  label:
                    'Explain how climate change leads to changes in ecosystem structure and/or dynamics',
                  value: 'ibm-u5-t6-lo6',
                },
              ],
            },
            {
              label: 'Diversity',
              value: 'ibm-u5-t7',
              learningObjectives: [
                {
                  label:
                    'Compare and contrast different measures of biodiversity.',
                  value: 'ibm-u5-t7-lo1',
                },
                {
                  label: 'Analyze changes in biodiversity over time.',
                  value: 'ibm-u5-t7-lo2',
                },
                {
                  label:
                    'Describe different regional and global patterns of biodiversity.',
                  value: 'ibm-u5-t7-lo3',
                },
                {
                  label: 'Evaluate strategies of preserving biodiversity.',
                  value: 'ibm-u5-t7-lo4',
                },
                {
                  label: 'Describe the influence of diversity on productivity',
                  value: 'ibm-u5-t7-lo5',
                },
                {
                  label:
                    'Explain how ecosystem perturbations affect biodiversity.',
                  value: 'ibm-u5-t7-lo6',
                },
              ],
            },
          ],
        },
        {
          label: 'Biodiversity',
          value: 'ibm-u6',
          topics: [
            {
              label: 'Virus',
              value: 'ibm-u6-t1',
              learningObjectives: [
                {
                  label:
                    'Describe the fundamental  traits shared by all viruses',
                  value: 'ibm-u6-t1-lo1',
                },
                {
                  label: 'Analyze evidence that viruses are not alive.',
                  value: 'ibm-u6-t1-lo2',
                },
                {
                  label:
                    'Describe characteristics that define major groups of viruses',
                  value: 'ibm-u6-t1-lo3',
                },
                {
                  label:
                    'Explain how viruses can contradict the Central Dogma of Molecular Biology.',
                  value: 'ibm-u6-t1-lo4',
                },
                {
                  label: 'Describe a typical viral lifecycle',
                  value: 'ibm-u6-t1-lo5',
                },
              ],
            },
            {
              label: 'Diversity of Life',
              value: 'ibm-u6-t2',
              learningObjectives: [
                {
                  label:
                    'Describe the fundamental traits shared across all domains of life, which provide evidence of common ancestry.',
                  value: 'ibm-u6-t2-lo1',
                },
                {
                  label:
                    'Describe the fundamental  traits shared by organisms within each domain of life.',
                  value: 'ibm-u6-t2-lo2',
                },
                {
                  label:
                    'Describe the fundamental traits shared by organisms within the following groups - protist, plant, fungus or animal.',
                  value: 'ibm-u6-t2-lo3',
                },
              ],
            },
            {
              label: 'Bacteria and Archaea',
              value: 'ibm-u6-t3',
              learningObjectives: [
                {
                  label:
                    'Describe the fundamental traits shared by all bacteria.',
                  value: 'ibm-u6-t3-lo1',
                },
                {
                  label:
                    'Describe the fundamental traits shared by all archaea.',
                  value: 'ibm-u6-t3-lo2',
                },
                {
                  label:
                    'Discuss examples of structural and functional adaptations in bacteria that enable these organisms to exploit a wide array of energy sources and thrive in many different environments.',
                  value: 'ibm-u6-t3-lo3',
                },
                {
                  label:
                    'Discuss examples of structural and functional adaptations in archaea that enable these organisms to exploit a wide array of energy sources and thrive in many different environments.',
                  value: 'ibm-u6-t3-lo4',
                },
                {
                  label:
                    'Describe beneficial and harmful roles that bacteria and archaea play in the lives of humans and the biosphere as a whole.',
                  value: 'ibm-u6-t3-lo5',
                },
              ],
            },
            {
              label: 'Eukaryotes: General',
              value: 'ibm-u6-t4',
              learningObjectives: [
                {
                  label:
                    'Describe the fundamental traits shared by all eukaryotes.',
                  value: 'ibm-u6-t4-lo1',
                },
                {
                  label:
                    'Using information about the traits of several major lineages, construct or label a tree of the eukaryotic radiation to show where key synapomorphies arose.',
                  value: 'ibm-u6-t4-lo2',
                },
                {
                  label:
                    'Explain the role endosymbiosis played in the evolution of eukaryotes',
                  value: 'ibm-u6-t4-lo3',
                },
                {
                  label:
                    'Describe the structural or functional characteristics of major groups of protists',
                  value: 'ibm-u6-t4-lo4',
                },
              ],
            },
            {
              label: 'Eukaryotes: Plants',
              value: 'ibm-u6-t5',
              learningObjectives: [
                {
                  label:
                    'Describe the morphological, fossil and phylogenetic evidence that supports the hypothesis that land plants evolved from freshwater green algae.',
                  value: 'ibm-u6-t5-lo1',
                },
                {
                  label:
                    'Explain the adaptive significance of synapomorphies that define the major lineages of land plants ',
                  value: 'ibm-u6-t5-lo2',
                },
                {
                  label:
                    'Summarize the major features of alternation of generations.',
                  value: 'ibm-u6-t5-lo3',
                },
                {
                  label:
                    'Predict the ecosystem impacts after changes in a plant community.',
                  value: 'ibm-u6-t5-lo4',
                },
              ],
            },
            {
              label: 'Eukaryotes: Fungi',
              value: 'ibm-u6-t6',
              learningObjectives: [
                {
                  label:
                    'Identify the synapomorphies that define the major lineages of fungi',
                  value: 'ibm-u6-t6-lo1',
                },
                {
                  label:
                    'Explain how mushroom physiology results in efficient absorption of nutrients and decomposition of organic matter.',
                  value: 'ibm-u6-t6-lo2',
                },
                {
                  label:
                    'Describe mutualisms that can occur between fungi and plants.',
                  value: 'ibm-u6-t6-lo3',
                },
              ],
            },
            {
              label: 'Eukaryotes: Animals',
              value: 'ibm-u6-t7',
              learningObjectives: [
                {
                  label:
                    'Identify the synapomorphies that define the major lineages of animals',
                  value: 'ibm-u6-t7-lo1',
                },
                {
                  label:
                    'In animal lineages, compare and contrast the following: 1) body plan, 2) reproductive systems, 3) sensory organs, 4) feeding strategies, and 5) ecological role.',
                  value: 'ibm-u6-t7-lo2',
                },
                {
                  label:
                    'Identify the synapomorphies that define the major chordate groups',
                  value: 'ibm-u6-t7-lo3',
                },
                {
                  label:
                    'Explain the benefits and challenges of aquatic versus terrestrial living for animals',
                  value: 'ibm-u6-t7-lo4',
                },
              ],
            },
          ],
        },
        {
          label: 'Anatomy and Physiology',
          value: 'ibm-u7',
          topics: [
            {
              label: 'Structure and Function',
              value: 'ibm-u7-t1',
              learningObjectives: [
                {
                  label:
                    'Describe the properties that emerge at increasing levels of biological organization',
                  value: 'ibm-u7-t1-lo1',
                },
                {
                  label:
                    'Describe how the structure of a cell and/or tissue relates to the function of an organ and/or system;',
                  value: 'ibm-u7-t1-lo2',
                },
                {
                  label:
                    'Describe how changes in structure can disrupt function of an organ or system',
                  value: 'ibm-u7-t1-lo3',
                },
                {
                  label:
                    'Explain the relationship between surface area and volume for physiological functions',
                  value: 'ibm-u7-t1-lo4',
                },
                {
                  label:
                    'Compare and contrast the methods by which gas, liquid, or solute moves between compartments in a physiological system.',
                  value: 'ibm-u7-t1-lo5',
                },
                {
                  label:
                    'Analyze mass entering or leaving a compartment given flow rate and concentration or partial pressure.',
                  value: 'ibm-u7-t1-lo6',
                },
                {
                  label:
                    'Analyze the effect of surface area-to volume ratios on the exchange of materials between cells or organisms and their environment',
                  value: 'ibm-u7-t1-lo7',
                },
                {
                  label:
                    'Describe how the structures and functions of a physiological system or its components have been modified via natural selection. ',
                  value: 'ibm-u7-t1-lo8',
                },
                {
                  label:
                    'Analyze the fitness trade-offs and/or evolutionary constraints on a physiological system or component that prevents it from fulfilling its function more effectively or efficiently.',
                  value: 'ibm-u7-t1-lo9',
                },
                {
                  label:
                    'Explain how concentration gradients affect the movement of solutes across membranes.',
                  value: 'ibm-u7-t1-lo10',
                },
                {
                  label:
                    'Explain how and why ions move in response to electrical potential gradients.',
                  value: 'ibm-u7-t1-lo11',
                },
                {
                  label:
                    'Explain how fluids and gases move in response to pressure gradients.',
                  value: 'ibm-u7-t1-lo12',
                },
                {
                  label:
                    'Predict the physiological responses to specified changes in gradients.',
                  value: 'ibm-u7-t1-lo13',
                },
              ],
            },
            {
              label: 'Cellular communication',
              value: 'ibm-u7-t2',
              learningObjectives: [
                {
                  label:
                    'Compare the structure, solubility and method of transport of peptide, steroid, and amine messengers. ',
                  value: 'ibm-u7-t2-lo1',
                },
                {
                  label:
                    'Explain the relationship between a chemical messenger and its receptor',
                  value: 'ibm-u7-t2-lo2',
                },
                {
                  label:
                    "Explain the effect of upregulation or downregulation of a receptor on a cell's response to a secreted signal",
                  value: 'ibm-u7-t2-lo3',
                },
                {
                  label:
                    'Describe the components of a signal transduction pathway.  ',
                  value: 'ibm-u7-t2-lo4',
                },
                {
                  label:
                    'Identify and explain the role of the sensor, signal transduction pathway(s), hormonal signal(s), and response(s) as an organism reacts to an environmental stimulus.',
                  value: 'ibm-u7-t2-lo5',
                },
                {
                  label:
                    'Predict how a specified change in a sensor, signal transduction pathway, or hormonal signal will affect how a plant responds to the environment.',
                  value: 'ibm-u7-t2-lo6',
                },
                {
                  label:
                    'Explain how different cell types may respond differently to the same messenger molecule.',
                  value: 'ibm-u7-t2-lo7',
                },
                {
                  label:
                    'Explain the relationship between signal molecule concentration and the magnitude of the target cell response.',
                  value: 'ibm-u7-t2-lo8',
                },
                {
                  label:
                    'Describe the various mechanisms by which the signal from a chemical messenger ends',
                  value: 'ibm-u7-t2-lo9',
                },
              ],
            },
            {
              label: 'Homeostasis',
              value: 'ibm-u7-t3',
              learningObjectives: [
                {
                  label:
                    'Explain how positive or negative feedback affects homeostasis',
                  value: 'ibm-u7-t3-lo1',
                },
                {
                  label:
                    'Predict how a change in one or more of the components of a homeostatic system will change the activity of the system.',
                  value: 'ibm-u7-t3-lo2',
                },
              ],
            },
            {
              label: 'Animal Nervous System',
              value: 'ibm-u7-t4',
              learningObjectives: [
                {
                  label: 'Describe the structure and function of a neuron.',
                  value: 'ibm-u7-t4-lo1',
                },
                {
                  label:
                    'Explain how action potentials propagate in one direction along the axon.',
                  value: 'ibm-u7-t4-lo2',
                },
                {
                  label:
                    'Given information on the stimuli received by a neuron, predict whether it will fire an action potential in response',
                  value: 'ibm-u7-t4-lo3',
                },
                {
                  label:
                    'Given information about the chemical, predict how a specific neurotoxin or neuromodulator will influence the function of a neuron',
                  value: 'ibm-u7-t4-lo4',
                },
                {
                  label:
                    'Explain how an arriving stimulus is changed into an action potential by a sensory receptor.',
                  value: 'ibm-u7-t4-lo5',
                },
              ],
            },
            {
              label: 'Plant Structure and Function',
              value: 'ibm-u7-t5',
              learningObjectives: [
                {
                  label:
                    'Explain the roles of various components of the cell wall matrix in support, growth and protection against pathogens.',
                  value: 'ibm-u7-t5-lo1',
                },
                {
                  label:
                    'Identify roots, stems, and leaves and explain their overall function.',
                  value: 'ibm-u7-t5-lo2',
                },
                {
                  label:
                    'Compare and contrast the adaptive significance of root, stem and leaf structures of plants in different habitats.',
                  value: 'ibm-u7-t5-lo3',
                },
                {
                  label:
                    'Explain how and why stomata regulate exchange of CO2 and O2 in plant leaves.',
                  value: 'ibm-u7-t5-lo4',
                },
                {
                  label:
                    'Under given light, water, or temperature conditions, predict adaptations or developmental responses in stomata and other cells and structures that optimize the rate of photosynthesis and minimize the rate of water loss.',
                  value: 'ibm-u7-t5-lo5',
                },
              ],
            },
            {
              label: 'Plant Growth and Reproduction',
              value: 'ibm-u7-t6',
              learningObjectives: [
                {
                  label:
                    'Identify where mitosis, meiosis, fertilization, and haploid and diploid phases occur in a plant life cycle',
                  value: 'ibm-u7-t6-lo1',
                },
                {
                  label: 'Compare primary and secondary plant growth.',
                  value: 'ibm-u7-t6-lo2',
                },
                {
                  label:
                    'Explain the function of specific plant hormones at the cellular, tissue, organ, system, or whole-organism level.',
                  value: 'ibm-u7-t6-lo3',
                },
              ],
            },
            {
              label: 'Plant Matter and Energy Flow',
              value: 'ibm-u7-t7',
              learningObjectives: [
                {
                  label: 'Explain how CO2 is the source of mass in a plant.',
                  value: 'ibm-u7-t7-lo1',
                },
                {
                  label:
                    'Explain how inorganic nutrients are obtained from soil, either directly or via associations with mycorrhizal fungi.',
                  value: 'ibm-u7-t7-lo2',
                },
                {
                  label:
                    'Explain the mechanism responsible for the long-distance transport of water in the xylem',
                  value: 'ibm-u7-t7-lo3',
                },
                {
                  label:
                    'Explain the mechanism responsible for the long-distance transport of sugar in the phloem',
                  value: 'ibm-u7-t7-lo4',
                },
                {
                  label:
                    'Compare the mechanisms responsible for the long-distance transport of sugars versus water and nutrients.',
                  value: 'ibm-u7-t7-lo5',
                },
                {
                  label:
                    'Given data on a change in soil conditions, predict the change (if any) on the movement of water in plants',
                  value: 'ibm-u7-t7-lo6',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  introToBioMeta: [
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
                  label:
                    'Select, carry out, and interpret statistical analyses.',
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
                  label:
                    'Work effectively with teammates to complete projects.',
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
              label:
                'Content Category 5C: Separation and purification methods.',
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
  ],
  questionTypes: [
    {
      label: 'Recommended',
      options: [
        {
          value: 'multipleChoice',
          label: 'Multiple Answers',
        },
        {
          value: 'multipleChoiceSingleCorrect',
          label: 'Multiple Choice',
        },
        {
          value: 'essay',
          label: 'Essay',
        },
        {
          value: 'matching',
          label: 'Matching',
        },
        {
          value: 'trueFalse',
          label: 'Multiple True / False',
        },
      ],
    },
    {
      label: 'Formative only',
      options: [
        {
          value: 'trueFalseSingleCorrect',
          label: 'True / False',
        },

        {
          value: 'fillInTheBlank',
          label: 'Fill in the blank',
        },
        {
          value: 'multipleDropdowns',
          label: 'Multiple dropdowns',
        },
      ],
    },
  ],
}

module.exports = metadata

export const editor = {
  strong: {
    value: 'Bold text',
    selector: 'p.paragraph strong',
  },
  emphasis: {
    value: 'Emphasis text',
    selector: 'p.paragraph em',
  },
  code: {
    value: 'code text',
    selector: 'p.paragraph code',
  },
  strikethrough: {
    value: 's',
    selector: 'p.paragraph span.strikethrough',
  },
  underline: {
    value: 'underline text',
    selector: 'p.paragraph u',
  },
  subscript: {
    value: 'subscript text',
    selector: 'p.paragraph sub',
  },
  superscript: {
    value: 'superscript',
    selector: 'p.paragraph sup',
  },
}

export const question = {
  questionType: {
    value: 'Multiple Choice',
    selector: `div[data-testid="questionType-select"]`,
  },
  mainTopic: {
    topic: {
      value: 'Biochemistry & Molecular Biology',
      selector: 'div[data-testid="topic-select"]',
    },
    subtopic: {
      value: 'Water and Carbon',
      selector: '[data-testid="subtopic-select"]',
    },
  },
  course: {
    framework: {
      value: 'AP Environmental Science',
      selector: '[data-testid="course-select"]',
    },
    unit: {
      value: 'Unit 1: The Living World: Ecosystems',
      selector: '[data-testid="course-unit-select"]',
    },
    courseTopic: {
      value: 'Topic 1.1 Introduction to Ecosystems',
      selector: '[data-testid="course-topic-select"]',
    },
    learningObjective: {
      value:
        'ERT-1.A Explain how the availability of resources influences species interactions.',
      selector: '[data-testid="learning-objective-select"]',
    },
    essentialKnowledge: {
      value:
        'ERT-1.A.2 Symbiosis is a close and long-term interaction between two species in an ecosystem. Types of symbiosis include mutualism, commensalism, and parasitism.',
      selector: '[data-testid="essential-knowledge-select"]',
    },
  },
  keywords: {
    value: ['Symbiosis', 'species'],
    selector: '[data-testid="keywords-select"]',
  },
  biointeractiveResources: {
    values: [
      'Mechanism of a Medication for Chronic Myeloid Leukemia',
      'Cystic Fibrosis Mechanism and Treatment',
    ],
    selector: '[data-testid="biointeractiveResources-select"]',
  },
  cognitiveLevel: {
    value: 'Evaluate',
    selector: '[data-testid="cognitive-select"]',
  },
  affectiveLevel: {
    value: 'Organization',
    selector: '[data-testid="affective-select"]',
  },
  psychomotorLevel: {
    value: 'Perceptual abilities',
    selector: '[data-testid="psychomotor-select"]',
  },
}

export const workflowData = {
  reject: {
    operationBtn: 'Do not accept',
    prompt: {
      header: 'Are you sure you want to reject this item?',
      body: 'By rejecting, this item will not be reviewed or published.',
      cancelBtn: 'Cancel',
      okBtn: 'Reject',
    },
    success: {
      header: 'Item rejected',
      body: 'This item was rejected',
    },
    QuestionStatus: 'Rejected',
  },
  review: {
    operationBtn: 'Move to review',
    prompt: {
      header: 'You are about to move this item to review',
      body: 'This item will be passed to a reviewer and will not be editable until they provide their feedback. Are you sure you want to proceed?',
      cancelBtn: 'Cancel',
      okBtn: 'Move to review',
    },
    success: {
      header: 'Item moved to review',
      body: 'Item was moved to review successfully',
    },
    QuestionStatus: 'Under Review',
  },
  production: {
    operationBtn: 'Move to production',
    prompt: {
      header: 'You are about to move this item to production',
      body: "This item will become editable so that editors and the production team can apply the reviewers' feedback. Are you sure?",
      cancelBtn: 'Cancel',
      okBtn: 'Move to production',
    },
    success: {
      header: 'Item moved to production',
      body: 'Item was moved to production successfully',
    },
    QuestionStatus: 'In Production',
  },
  publish: {
    operationBtn: 'Publish',
    prompt: {
      header: 'Are you sure you want to publish this item version?',
      body: 'Clicking "Yes, publish" will make this item discoverable for all website visitors in the Browse Items Page.',
      cancelBtn: 'Cancel',
      okBtn: 'Yes, publish',
    },
    success: {
      header: 'Item published successfully',
      body: 'Item was published and is now available in the Browse Items page',
    },
    QuestionStatus: 'Published',
  },
}

export const fillInTheBlankString =
  ' By 2040, the world s population is expected to rise to approximately   ______  .'

export const multipleChoiceQuestionWithMetadata =
  'correctNot correctCorrectMetadataQuestion type:  multipleChoiceTopics:Topic:  environmentalScienceSubtopic:  humanPopulationImpctsCourses:Course:  apEnvironmentalScienceUnit:  populationsSkill:  Application:  Course Topic:  populationGrowthAndResourceAvailabilityUnderstanding:  Learning objective:  ERT-3.FEssential knowledge:  ERT-3.F.1Keywords:  population, environmentBioInteractive resources:Bloom&apos;s Cognitive Level:  higher-evaluateBloom&apos;s Affective Level:  valuingBloom&apos;s Psychomotor Level:  nonDiscursiveCommunicationPublication date:'

export const complexItemSet1 = {
  title: 'Set 1',
  leadingContent:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
}
export const complexItemSet2 = {
  title: 'Set 2',
  leadingContent:
    'Nulla facilisi. Suspendisse nec turpis vel ligula cursus mattis vitae id lectus',
}

export const complexItemSet3 = {
  title: 'Set 3',
  leadingContent:
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
}

export const listExportContent = `Question 1Energy: carbohydrates :: structural materials:waternucleotideslipidsproteinsSolutionsNot correctNot correctNot correctCorrectcorrect answer`

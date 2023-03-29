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
    value: 'Multiple choice',
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
      header: 'Are you sure you want to reject this question?',
      body: 'By rejecting, the question will not be reviewed or published.',
      cancelBtn: 'Cancel',
      okBtn: 'Reject',
    },
    success: {
      header: 'Question rejected',
      body: 'The question was rejected',
    },
    QuestionStatus: 'Rejected',
  },
  review: {
    operationBtn: 'Move to Review',
    prompt: {
      header: 'You are about to move the question to review',
      body: 'Question will be passed to a reviewer and will not be editable until they provide their feedback. Are you sure you want to proceed?',
      cancelBtn: 'Cancel',
      okBtn: 'Move to review',
    },
    success: {
      header: 'Question moved to review',
      body: 'Question was moved to review successfully',
    },
    QuestionStatus: 'Under Review',
  },
  production: {
    operationBtn: 'Move to production',
    prompt: {
      header: 'You are about to move the question to production',
      body: 'Question will become editable and editors can apply the feedback from the reviewer. Are you sure?',
      cancelBtn: 'Cancel',
      okBtn: 'Move to production',
    },
    success: {
      header: 'Question moved to production',
      body: 'Question was moved to production successfully',
    },
    QuestionStatus: 'In Production',
  },
  publish: {
    operationBtn: 'Publish',
    prompt: {
      header: 'Are you sure you want to publish this question version?',
      body: 'Clicking "Yes, publish" will make the question discoverable for all website visitors in the Discover page',
      cancelBtn: 'Cancel',
      okBtn: 'Yes, publish',
    },
    success: {
      header: 'Question published successfully',
      body: 'Question was published and is now available in the Discover page',
    },
    QuestionStatus: 'Published',
  },
}

export const multipleChoiceQuestionString =
  'By 2040, the world s population is expected to rise to approximately20 billion10 billion7 billion9 billion'

export const multipleChoiceQuestionWithMetadata =
  'correctNot correctCorrectMetadataQuestion type:  multipleChoiceTopics:Topic:  environmentalScienceSubtopic:  humanPopulationImpctsCourses:Course:  apEnvironmentalScienceUnit:  populationsSkill:  Application:  Course Topic:  populationGrowthAndResourceAvailabilityUnderstanding:  Learning objective:  ERT-3.FEssential knowledge:  ERT-3.F.1Keywords:  population, environmentBioInteractive resources:Bloom&apos;s Cognitive Level:  higher-evaluateBloom&apos;s Affective Level:  valuingBloom&apos;s Psychomotor Level:  nonDiscursiveCommunicationPublication date:'

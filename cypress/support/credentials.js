const setRandomNumbers = false

const randomNumber = setRandomNumbers
  ? Math.floor(Math.random() * (1000 - 100 + 1)) + 100
  : ''

export const admin = {
  firstName: 'Galenos',
  username: `galenosalexandra${randomNumber}`,
  lastName: `Alexandra`,
  email: `galenosalexandra${randomNumber}@gmail.com`,
  password: 'Password@123',
  role: `admin`,
}

export const editor = {
  firstName: 'Ellery',
  username: `elleryemil${randomNumber}`,
  lastName: 'Emil',
  email: `elleryemil${randomNumber}@gmail.com`,
  password: 'Password@123',
  role: 'editor',
}

export const handlingEditor1 = {
  firstName: 'Nuadu',
  username: `nuaduslaine${randomNumber}`,
  lastName: 'Slaine',
  email: `nuaduslaine${randomNumber}@gmail.com`,
  password: 'Password@123',
  role: 'handlingEditor',
}
export const handlingEditor2 = {
  firstName: 'Juno',
  username: `junowest${randomNumber}`,
  lastName: 'west',
  email: `junowest${randomNumber}@gmail.com`,
  password: 'Password@123',
  role: 'handlingEditor',
}

export const reviewer = {
  firstName: 'Clement',
  lastName: 'Roman',
  username: `clementroman${randomNumber}`,
  email: `clementroman${randomNumber}@gmail.com`,
  password: 'Password@123',
  role: 'reviewer',
}

export const user1 = {
  contact: {
    username: `millaraypanther${randomNumber}`,
    firstName: `Millaray`,
    middleName: 'jon',
    lastName: 'Panther',
    pronouns: 'they/them',
    displayName: `millaraypanther${randomNumber}`,
    email: `millaraypanther${randomNumber}@gmail.com`,
    phone: `342${randomNumber}`,
    updatedPhone: `555${randomNumber}`,
    password: 'Password@123',
    updatedPassword: 'Password@456',
    position: 'student',
    organization: 'coko',
  },
  address: {
    country: 'USA',
    state: 'New York',
    city: 'manhattan',
    address: 'manhattan NY, united states',
    updatedAddress: '43 W 33rd St, New York, NY 10001, United States',
    zipCode: '10036',
  },
  school: {
    position: 'student',
    organization: 'Grd',
    institutionalSetting: 'Urban',
    yearsOfExperience: '< 5',
    typeOfInstitution: 'High School',
  },
  reviewing: {
    reviewerInterest: true,
    courses: 'Ecology',
    coursesReview: 'Ecology',
    assessmentTraining: true,
    threeCourses: ['Genetics', 'Ecology', 'Evolution'],
    assessmentTrainingInclusive: false,
    source: 'college',
  },
}

export const user2 = {
  username: `scarlettphoebe${randomNumber}`,
  firstName: 'Scarlett',
  lastName: `Phoebe`,
  email: `scarlettphoebe${randomNumber}@gmail.com`,
  password: 'Password@123',
}

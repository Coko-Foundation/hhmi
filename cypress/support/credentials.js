const setRandomNumbers = false

const randomNumber = setRandomNumbers
  ? Math.floor(Math.random() * (1000 - 100 + 1)) + 100
  : ''

export const user = {
  contact: {
    firstName: `User`,
    middleName: 'jon',
    lastName: randomNumber || 1,
    pronouns: 'they/them',
    displayName: `user${randomNumber}`,
    email: `user${randomNumber}@gmail.com`,
    username: `user${randomNumber}`,
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

export const generalUser = {
  firstName: 'user1',
  username: 'user1',
  lastName: `lName${randomNumber}`,
  email: `user1${randomNumber}@gmail.com`,
  password: 'Password@123',
}

export const editor = {
  firstName: 'editor',
  username: 'editor',
  lastname: randomNumber || 1,
  email: `editor${randomNumber}@gmail.com`,
  password: 'Password@123',
}

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

// import { useCurrentUser } from '@coko/client'

import { SignupQuestionnaire } from 'ui'
import { profileOptions, getCountries, getStatesByCountry } from '../utilities'
import { CURRENT_USER, SUBMIT_QUESTIONNAIRE } from '../graphql'

const profileApiToUi = (user, isReviewer) => {
  if (!user) return null

  return {
    address: user.address,
    assessmentTraining: user.receivedTraining,
    assessmentTrainingInclusive: user.receivedInclusiveLanguageTraining,
    city: user.city,
    country: user.country,
    courses: user.coursesTeaching || [],
    coursesReview: user.topicsReviewing || [],
    displayName: user.displayName,
    email: user.defaultIdentity.email,
    firstName: user.givenNames,
    institutionalSetting: user.institutionalSetting,
    lastName: user.surname,
    middleName: user.middleName,
    organization: user.organization,
    phone: user.phone,
    position: user.position,
    pronouns: user.pronouns,
    reviewerInterest: isReviewer,
    source: user.source,
    state: user.state,
    typeOfInstitution: user.typeOfInstitution,
    yearsOfExperience: user.teachingExperience,
    zipCode: user.zipCode,
  }
}

const profileUiToApi = formData => {
  return {
    address: formData.address,
    receivedTraining: formData.assessmentTraining,
    receivedInclusiveLanguageTraining: formData.assessmentTrainingInclusive,
    city: formData.city,
    country: formData.country,
    coursesTeaching: formData.courses,
    topicsReviewing: formData.coursesReview,
    displayName: formData.displayName,
    email: formData.email,
    givenNames: formData.firstName,
    institutionalSetting: formData.institutionalSetting,
    surname: formData.lastName,
    middleName: formData.middleName,
    organization: formData.organization,
    phone: formData.phone,
    position: formData.position,
    pronouns: formData.pronouns,
    reviewerInterest: formData.reviewerInterest,
    source: formData.source,
    state: formData.state,
    typeOfInstitution: formData.typeOfInstitution,
    teachingExperience: formData.yearsOfExperience,
    zipCode: formData.zipCode,
  }
}

const SignupProfile = props => {
  const [countryOptions, setCountryOptions] = useState(null)
  const [statesOptions, setStatesOptions] = useState(null)
  const [redirecting, setRedirecting] = useState(false) // avoid multiple redirects

  const history = useHistory()

  const { data: currentUserQueryData } = useQuery(CURRENT_USER)
  const currentUser = currentUserQueryData?.currentUser

  const [submitQuestionnaireMutation, { data, loading }] =
    useMutation(SUBMIT_QUESTIONNAIRE)

  useEffect(async () => {
    const countries = await getCountries()
    setCountryOptions(countries)

    if (!currentUser) return
    const states = (await getStatesByCountry(currentUser.country)) || []
    setStatesOptions(states)
  }, [currentUser])

  const onCountryChange = async selectedCountry => {
    const states = (await getStatesByCountry(selectedCountry)) || []
    setStatesOptions(states)
  }

  const handleSubmit = formData => {
    const mutationData = {
      variables: {
        input: profileUiToApi(formData),
      },
    }

    submitQuestionnaireMutation(mutationData)
  }

  const submitted = currentUser?.profileSubmitted || !!data

  if (submitted && !redirecting) {
    setRedirecting(true)

    setTimeout(() => {
      history.push('/')
    }, 3000)
  }

  if (!(countryOptions && statesOptions)) return null

  const initialValues = profileApiToUi(currentUser)

  return (
    <SignupQuestionnaire
      countries={countryOptions}
      courses={profileOptions.courses}
      // form={form}
      initialValues={initialValues}
      institutionalSetting={profileOptions.institutionalSetting}
      institutionLevels={profileOptions.institutionLevels}
      loading={loading}
      // message={message}
      onCountryChange={onCountryChange}
      onSubmit={handleSubmit}
      states={statesOptions}
      // submissionStatus={submissionStatus}
      submitted={submitted}
      topics={profileOptions.topics}
    />
  )
}

SignupProfile.propTypes = {}

SignupProfile.defaultProps = {}

export default SignupProfile

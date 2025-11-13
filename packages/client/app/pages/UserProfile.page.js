import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import { useCurrentUser } from '@coko/client'

import { Profile, SignupQuestionnaire, VisuallyHiddenElement } from 'ui'
import { profileOptions, hasGlobalRole } from '../utilities'
import {
  SUBMIT_QUESTIONNAIRE,
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
  GET_USER_DATA,
  GET_COUNTRIES_OPTIONS,
  GET_STATES_OPTIONS,
} from '../graphql'

const profileApiToUi = (user, signup) => {
  if (!user) return null

  const isReviewer = hasGlobalRole(user, 'reviewer')

  return {
    address: user.address,
    apIbCourses: user.apIbCourses,
    assessmentTraining: user.receivedTraining,
    assessmentTrainingInclusive: user.receivedInclusiveLanguageTraining,
    city: user.city,
    country: user.country || 'US',
    courses: user.coursesTeaching || [],
    coursesReview: user.topicsReviewing || [],
    displayName: user.displayName,
    email: user.defaultIdentity.email,
    employmentStatus: user.employmentStatus,
    firstName: user.givenNames,
    institutionalSetting: user.institutionalSetting,
    lastName: user.surname,
    middleName: user.middleName,
    organization: user.organization,
    otherLevel: user.otherLevel,
    phone: user.phone,
    position: user.position,
    pronouns: user.pronouns,
    ...(!signup && { reviewerInterest: isReviewer }),
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
    apIbCourses: formData.apIbCourses || null,
    city: formData.city,
    country: formData.country,
    coursesTeaching: formData.courses || [],
    displayName: formData.displayName,
    email: formData.email,
    employmentStatus: formData.employmentStatus || null,
    givenNames: formData.firstName,
    institutionalSetting: formData.institutionalSetting,
    middleName: formData.middleName,
    organization: formData.organization,
    otherLevel: formData.otherLevel || null,
    phone: formData.phone,
    position: formData.position,
    pronouns: formData.pronouns,
    receivedInclusiveLanguageTraining: formData.assessmentTrainingInclusive,
    receivedTraining: formData.assessmentTraining,
    reviewerInterest: formData.reviewerInterest,
    source: formData.source,
    state: formData.state,
    surname: formData.lastName,
    teachingExperience: formData.yearsOfExperience,
    topicsReviewing: formData.coursesReview || [],
    typeOfInstitution: formData.typeOfInstitution,
    zipCode: formData.zipCode,
  }
}

const UserProfile = props => {
  const { signup } = props

  const [selectedCountry, setSelectedCountry] = useState()
  const [message, setMessage] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const history = useHistory()
  const { id: userId } = useParams()

  const { currentUser, setCurrentUser } = useCurrentUser()

  if (currentUser.id === userId) {
    window.history.replaceState({}, '', '/profile')
  }

  const { data: userData, loading: userLoading } = useQuery(GET_USER_DATA, {
    skip: !userId,
    variables: {
      id: userId,
    },
  })

  const { data: { getCountriesForUserProfile: countryOptions } = {} } =
    useQuery(GET_COUNTRIES_OPTIONS)

  const { data: { getStatesByCountryForUserProfile: statesOptions } = {} } =
    useQuery(GET_STATES_OPTIONS, {
      variables: {
        skip: !currentUser || !selectedCountry,
        country: selectedCountry,
      },
    })

  const [updateProfileMutation, { loading: updateProfileLoading }] =
    useMutation(UPDATE_PROFILE, {
      onCompleted({ updateUserProfile }) {
        setCurrentUser({
          ...currentUser,
          ...updateUserProfile,
        })
      },
    })

  const [submitQuestionnaireMutation, { loading: submitQuestionnaireLoading }] =
    useMutation(SUBMIT_QUESTIONNAIRE, {
      onCompleted({ submitQuestionnaire }) {
        setCurrentUser({
          ...currentUser,
          ...submitQuestionnaire,
        })
      },
    })

  const [updatePasswordMutation, { loading: updatePasswordLoading }] =
    useMutation(UPDATE_PASSWORD)

  useEffect(async () => {
    setSubmitted(signup && currentUser?.profileSubmitted)
    setSelectedCountry(currentUser?.country || 'US')
  }, [currentUser])

  const onCountryChange = async country => {
    setSelectedCountry(country)
  }

  const handleProfileSubmit = async formData => {
    const mutationData = {
      variables: {
        input: {
          ...profileUiToApi(formData),
          id: currentUser.id,
        },
      },
    }

    try {
      if (signup) {
        await submitQuestionnaireMutation(mutationData)

        // redirect to '/' after completing the signup questionnaire
        setSubmitted(true)
        setTimeout(() => {
          history.push('/')
        }, 3000)
      } else {
        await updateProfileMutation(mutationData)

        setMessage('Profile updated successfully')
        setSubmissionStatus('success')
        setTimeout(() => {
          setMessage('')
          setSubmissionStatus(null)
        }, 3000)
      }
    } catch (e) {
      setMessage(e.message)
      setSubmissionStatus('error')
      setTimeout(() => {
        setMessage('')
        setSubmissionStatus(null)
      }, 3000)
    }
  }

  const handlePasswordSubmit = async formData => {
    const mutationData = {
      variables: {
        input: {
          id: currentUser.id,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      },
    }

    try {
      await updatePasswordMutation(mutationData)

      setMessage('Password updated successfully')
      setSubmissionStatus('success')
      setTimeout(() => {
        setMessage('')
        setSubmissionStatus(null)
      }, 3000)
    } catch (e) {
      setMessage(e.message)
      setSubmissionStatus('error')
      setTimeout(() => {
        setMessage('')
        setSubmissionStatus(null)
      }, 3000)
    }
  }

  const initialValues = userId
    ? profileApiToUi(userData?.user)
    : profileApiToUi(currentUser, signup)

  if (signup) {
    return (
      <>
        <VisuallyHiddenElement as="h1">User Profile</VisuallyHiddenElement>
        <SignupQuestionnaire
          countries={countryOptions}
          courses={profileOptions.courses}
          initialValues={initialValues}
          institutionalSetting={profileOptions.institutionalSetting}
          institutionLevels={profileOptions.institutionLevels}
          loading={submitQuestionnaireLoading}
          message={message}
          onCountryChange={onCountryChange}
          onSubmit={handleProfileSubmit}
          states={statesOptions}
          submissionStatus={submissionStatus}
          submitted={submitted}
          topics={profileOptions.topics}
        />
      </>
    )
  }

  if (userId && userLoading) return null

  return (
    <>
      <VisuallyHiddenElement as="h1">User Profile</VisuallyHiddenElement>
      <Profile
        countries={countryOptions}
        courses={profileOptions.courses}
        initialValues={initialValues}
        institutionalSetting={profileOptions.institutionalSetting}
        institutionLevels={profileOptions.institutionLevels}
        loading={updateProfileLoading || updatePasswordLoading}
        message={message}
        onCountryChange={onCountryChange}
        onPasswordUpdate={handlePasswordSubmit}
        onProfileUpdate={handleProfileSubmit}
        showSecondaryButton={false}
        states={statesOptions}
        submissionStatus={submissionStatus}
        topics={profileOptions.topics}
        userId={userId !== currentUser.id ? userId : null}
      />
    </>
  )
}

UserProfile.propTypes = {
  signup: PropTypes.bool,
}

UserProfile.defaultProps = {
  signup: false,
}

export default UserProfile

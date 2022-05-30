/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ProfileInfo from './ProfileInfo'
import AuthenticationHeader from './AuthenticationHeader'

const Wrapper = styled.div``

const SignupQuestionnaire = props => {
  const {
    form,
    headingText,
    initialValues,
    loading,
    message,
    onSubmit,
    secondaryButtonAction,
    submissionStatus,
    countries,
    courses,
    institutionLevels,
    institutionalSetting,
    states,
    topics,
    onCountryChange,
  } = props

  return (
    <Wrapper>
      <AuthenticationHeader>{headingText}</AuthenticationHeader>
      <ProfileInfo
        countries={countries}
        courses={courses}
        form={form}
        initialValues={initialValues}
        institutionalSetting={institutionalSetting}
        institutionLevels={institutionLevels}
        loading={loading}
        message={message}
        onCountryChange={onCountryChange}
        onSubmit={onSubmit}
        secondaryButtonAction={secondaryButtonAction}
        secondaryButtonLabel="Clear"
        showSecondaryButton
        states={states}
        submissionStatus={submissionStatus}
        submitButtonLabel="Submit"
        topics={topics}
      />
    </Wrapper>
  )
}

SignupQuestionnaire.propTypes = {
  form: PropTypes.shape(),
  headingText: PropTypes.string,
  initialValues: PropTypes.shape(),
  loading: PropTypes.bool,
  message: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  secondaryButtonAction: PropTypes.func.isRequired,
  submissionStatus: PropTypes.string,
  countries: PropTypes.arrayOf(PropTypes.shape()),
  courses: PropTypes.arrayOf(PropTypes.shape()),
  institutionLevels: PropTypes.arrayOf(PropTypes.shape()),
  institutionalSetting: PropTypes.arrayOf(PropTypes.shape()),
  states: PropTypes.arrayOf(PropTypes.shape()),
  topics: PropTypes.arrayOf(PropTypes.shape()),
  onCountryChange: PropTypes.func.isRequired,
}

SignupQuestionnaire.defaultProps = {
  form: null,
  headingText: 'Signup',
  initialValues: {},
  loading: false,
  message: '',
  submissionStatus: null,
  countries: [],
  courses: [],
  institutionLevels: [],
  institutionalSetting: [],
  states: [],
  topics: [],
}

export default SignupQuestionnaire

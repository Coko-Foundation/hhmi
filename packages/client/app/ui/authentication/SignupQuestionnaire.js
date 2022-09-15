/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ProfileInfo from './ProfileInfo'
import AuthenticationHeader from './AuthenticationHeader'
import { Form, Page, Result } from '../common'

const Wrapper = styled.div`
  width: 100%;
`

const SignupQuestionnaire = props => {
  const {
    countries,
    courses,
    // form,
    headingText,
    initialValues,
    institutionLevels,
    institutionalSetting,
    loading,
    message,
    onCountryChange,
    onSubmit,
    onSubmitionError,
    // secondaryButtonAction,
    states,
    submissionStatus,
    submitted,
    topics,
  } = props

  const [form] = Form.useForm()

  return (
    <Page maxWidth={900}>
      <Wrapper>
        {submitted && (
          <div role="alert">
            <Result
              status="success"
              subTitle="Redirecting..."
              title="Thank you for submitting your profile!"
            />
          </div>
        )}

        {!submitted && (
          <>
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
              onSubmitionError={onSubmitionError}
              // secondaryButtonAction={secondaryButtonAction}
              // secondaryButtonLabel="Clear"
              showSecondaryButton={false}
              states={states}
              submissionStatus={submissionStatus}
              submitButtonLabel="Submit"
              topics={topics}
            />
          </>
        )}
      </Wrapper>
    </Page>
  )
}

SignupQuestionnaire.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCountryChange: PropTypes.func.isRequired,
  onSubmitionError: PropTypes.func,

  countries: PropTypes.arrayOf(PropTypes.shape()),
  courses: PropTypes.arrayOf(PropTypes.shape()),
  // form: PropTypes.shape(),
  headingText: PropTypes.string,
  initialValues: PropTypes.shape(),
  institutionLevels: PropTypes.arrayOf(PropTypes.shape()),
  institutionalSetting: PropTypes.arrayOf(PropTypes.shape()),
  loading: PropTypes.bool,
  message: PropTypes.string,
  // secondaryButtonAction: PropTypes.func.isRequired,
  states: PropTypes.arrayOf(PropTypes.shape()),
  submissionStatus: PropTypes.string,
  submitted: PropTypes.bool,
  topics: PropTypes.arrayOf(PropTypes.shape()),
}

SignupQuestionnaire.defaultProps = {
  countries: [],
  courses: [],
  // form: null,
  headingText: 'User profile',
  initialValues: {},
  institutionLevels: [],
  institutionalSetting: [],
  loading: false,
  message: '',
  states: [],
  submissionStatus: null,
  submitted: false,
  topics: [],
  onSubmitionError: () => {},
}

export default SignupQuestionnaire

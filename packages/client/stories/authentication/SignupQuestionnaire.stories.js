/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import {
  SignupQuestionnaire,
  // Form,
  Checkbox,
} from 'ui'
import {
  profileOptions,
  getCountries,
  getStatesByCountry,
} from '../../app/utilities'

const initialValues = {
  firstName: 'Filan',
  lastName: 'Fisteku',
  email: 'filanfisteku@email.com',
}

export const Base = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const [error, setError] = useState(false)

  // const [form] = Form.useForm()

  const [stateOptions, setStates] = useState([])
  const [countryOptions, setCountries] = useState([])

  useEffect(async () => {
    const countries = await getCountries()
    setCountries(countries)
  }, [])

  const onCountryChange = async selectedCountry => {
    const states = (await getStatesByCountry(selectedCountry)) || []
    setStates(states)
  }

  // const clearFormFields = () => {
  //   form.resetFields()
  // }

  const handleSubmit = values => {
    console.log(values)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

      if (!error) {
        setMessage('Form submitted successully')
        setSubmissionStatus('success')
      } else {
        setMessage('There was an error submitting the form. Please try again')
        setSubmissionStatus('error')
      }
    }, 1000)
  }

  return (
    <>
      <p>
        <Checkbox checked={error} onChange={() => setError(!error)}>
          Check and submit the form to see error state
        </Checkbox>
      </p>

      <SignupQuestionnaire
        countries={countryOptions}
        courses={profileOptions.courses}
        // form={form}
        initialValues={initialValues}
        institutionalSetting={profileOptions.institutionalSetting}
        institutionLevels={profileOptions.institutionLevels}
        loading={loading}
        message={message}
        onCountryChange={onCountryChange}
        onSubmit={handleSubmit}
        states={stateOptions}
        // secondaryButtonAction={clearFormFields}
        submissionStatus={submissionStatus}
        topics={profileOptions.topics}
      />
    </>
  )
}

export default {
  component: SignupQuestionnaire,
  title: 'Authentication/Signup Questionnaire',
}

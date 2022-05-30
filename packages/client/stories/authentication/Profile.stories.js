/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { Profile, Checkbox, Form } from 'ui'
import { profileOptions } from '../../app/utilities/utilities'

const initialValues = {
  firstName: 'Filan',
  lastName: 'Fisteku',
  email: 'filanfisteku@email.com',
  country: 'US',
  state: 'NY',
  courses: ['biology', 'genetics'],
  assessmentTrainingInclusive: true,
}

export const Base = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const [form] = Form.useForm()

  const [error, setError] = useState(false)

  const [stateOptions, setStates] = useState([])
  const [countryOptions, setCountries] = useState([])

  useEffect(async () => {
    const response = await fetch(
      'https://web.cvent.com/event_guest/v1/lookups/v1/countries?locale=en',
    )

    if (response.status === 200) {
      const countries = await response.json()

      const formattedCountries = Object.values(countries.countries).map(c => ({
        label: c.name,
        value: c.code,
      }))

      setCountries(formattedCountries.sort((a, b) => a.label > b.label))
    }
  }, [])

  const onCountryChange = async selectedCountry => {
    const response = await fetch(
      `https://web.cvent.com/event_guest/v1/lookups/v1/states?countryCode=${selectedCountry}`,
    )

    if (response.status === 200) {
      const states = await response.json()

      const formattedStates = Object.values(states.states).map(s => ({
        label: s.name,
        value: s.code,
      }))

      setStates(formattedStates)
    } else {
      setStates([])
    }
  }

  const handleProfileSubmit = vals => {
    console.log(vals)
    console.log(error)

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      if (!error) {
        setMessage('Profile updated successfully')
        setSubmissionStatus('success')
      } else {
        setMessage('There was an error, please try again')
        setSubmissionStatus('error')
      }
    }, 1000)
  }

  const handlePasswordSubmit = vals => {
    console.log(vals)
    console.log(error)

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      if (!error) {
        setMessage('Password changed successfully')
        setSubmissionStatus('success')
      } else {
        setMessage('There was an error, please try again')
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
      <Profile
        countries={countryOptions}
        courses={profileOptions.courses}
        form={form}
        initialValues={initialValues}
        institutionalSetting={profileOptions.institutionalSetting}
        institutionLevels={profileOptions.institutionLevels}
        loading={loading}
        message={message}
        onAutoSave={vals => console.log('saving', vals)}
        onCountryChange={onCountryChange}
        onPasswordUpdate={handlePasswordSubmit}
        onProfileUpdate={handleProfileSubmit}
        states={stateOptions}
        submissionStatus={submissionStatus}
        topics={profileOptions.topics}
      />
    </>
  )
}

export default {
  component: Profile,
  title: 'Authentication/Profile',
}

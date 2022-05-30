/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { ProfileInfo, Form } from 'ui'
import { profileOptions } from '../../app/utilities/utilities'

export const Base = args => {
  const [form] = Form.useForm()

  const clearFormFields = () => {
    form.resetFields()
  }

  const onAutoSave = () => {
    // eslint-disable-next-line no-console
    console.log('saving form automatically')
  }

  const handleSubmit = values => {
    console.log(values)
  }

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

  return (
    <ProfileInfo
      {...args}
      countries={countryOptions}
      courses={profileOptions.courses}
      form={form}
      institutionalSetting={profileOptions.institutionalSetting}
      institutionLevels={profileOptions.institutionLevels}
      onAutoSave={onAutoSave}
      onCountryChange={onCountryChange}
      onSubmit={handleSubmit}
      secondaryButtonAction={clearFormFields}
      states={stateOptions}
      topics={profileOptions.topics}
    />
  )
}

export default {
  component: ProfileInfo,
  title: 'Authentication/Profile Info',
}

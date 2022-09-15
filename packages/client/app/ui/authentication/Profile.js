import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'
import { TabsStyled as Tabs } from '../common'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'

const Wrapper = styled.div``

const StyledTabs = styled(Tabs)`
  .ant-tabs-tabpane {
    margin: ${grid(4)} auto 0;
    max-width: 100%;
    width: 900px;
  }
`

const Profile = props => {
  const {
    className,
    initialValues,
    loading,
    message,
    onAutoSave,
    onPasswordUpdate,
    onProfileUpdate,
    submissionStatus,
    countries,
    courses,
    institutionLevels,
    institutionalSetting,
    states,
    topics,
    onCountryChange,
    onSubmitionError,
  } = props

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [activeKey, setActiveKey] = useState('profileInfo')

  const checkForUnsavedChanges = newTabKey => {
    if (newTabKey !== activeKey) {
      if (unsavedChanges) {
        // TODO: show dialog to warn user of unsaved changes and proceed accoring to their choice
        // eslint-disable-next-line no-alert, no-restricted-globals
        const result = confirm('you have unsaved changes. continue anyway?')
        if (!result) return false
        setUnsavedChanges(false)
        setActiveKey(newTabKey)
        return true
      }

      setActiveKey(newTabKey)
      return true
    }

    setActiveKey(newTabKey)
    return true
  }

  const handleValuesChange = () => {
    if (!unsavedChanges) setUnsavedChanges(true)
  }

  const handleProfileInfoSubmit = values => {
    setUnsavedChanges(false)
    onProfileUpdate(values)
  }

  const handleChangePasswordSubmit = values => {
    setUnsavedChanges(false)
    onPasswordUpdate(values)
  }

  const items = [
    {
      label: 'Profile info',
      key: 'profileInfo',
      children: (
        <ProfileInfo
          countries={countries}
          courses={courses}
          initialValues={initialValues}
          institutionalSetting={institutionalSetting}
          institutionLevels={institutionLevels}
          loading={loading}
          message={message}
          onAutoSave={onAutoSave}
          onCountryChange={onCountryChange}
          onSubmit={handleProfileInfoSubmit}
          onSubmitionError={onSubmitionError}
          onValuesChange={handleValuesChange}
          // secondaryButtonLabel="Cancel"
          showSecondaryButton={false}
          states={states}
          submissionStatus={submissionStatus}
          submitButtonLabel="Save"
          topics={topics}
        />
      ),
    },
    {
      label: 'Password',
      key: 'changePassword',
      children: (
        <ChangePassword
          loading={loading}
          message={message}
          onSubmit={handleChangePasswordSubmit}
          onValuesChange={handleValuesChange}
          submissionStatus={submissionStatus}
        />
      ),
    },
  ]

  return (
    <Wrapper className={className}>
      <StyledTabs
        activeKey={activeKey}
        items={items}
        onTabClick={checkForUnsavedChanges}
      />
    </Wrapper>
  )
}

Profile.propTypes = {
  initialValues: PropTypes.shape(),
  loading: PropTypes.bool,
  message: PropTypes.string,
  onAutoSave: PropTypes.func,
  onPasswordUpdate: PropTypes.func.isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
  onSubmitionError: PropTypes.func,
  submissionStatus: PropTypes.string,
  countries: PropTypes.arrayOf(PropTypes.shape()),
  courses: PropTypes.arrayOf(PropTypes.shape()),
  institutionLevels: PropTypes.arrayOf(PropTypes.shape()),
  institutionalSetting: PropTypes.arrayOf(PropTypes.shape()),
  states: PropTypes.arrayOf(PropTypes.shape()),
  topics: PropTypes.arrayOf(PropTypes.shape()),
  onCountryChange: PropTypes.func.isRequired,
}

Profile.defaultProps = {
  initialValues: {},
  loading: false,
  message: '',
  onAutoSave: () => {},
  onSubmitionError: () => {},
  submissionStatus: null,
  countries: [],
  courses: [],
  institutionLevels: [],
  institutionalSetting: [],
  states: [],
  topics: [],
}

export default Profile

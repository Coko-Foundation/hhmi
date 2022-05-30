import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'
import { TabsStyled } from '../common'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'

const Wrapper = styled.div``

const StyledTabPane = styled(TabsStyled.TabPane)`
  margin-top: ${grid(4)};
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

  return (
    <Wrapper className={className}>
      <TabsStyled activeKey={activeKey} onTabClick={checkForUnsavedChanges}>
        <StyledTabPane key="profileInfo" tab="Profile info">
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
            onValuesChange={handleValuesChange}
            secondaryButtonLabel="Cancel"
            states={states}
            submissionStatus={submissionStatus}
            submitButtonLabel="Save"
            topics={topics}
          />
        </StyledTabPane>
        <StyledTabPane key="changePassword" tab="Password">
          <ChangePassword
            loading={loading}
            message={message}
            onSubmit={handleChangePasswordSubmit}
            onValuesChange={handleValuesChange}
            submissionStatus={submissionStatus}
          />
        </StyledTabPane>
      </TabsStyled>
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
  submissionStatus: null,
  countries: [],
  courses: [],
  institutionLevels: [],
  institutionalSetting: [],
  states: [],
  topics: [],
}

export default Profile

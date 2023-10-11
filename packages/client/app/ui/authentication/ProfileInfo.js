/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'
import { Row as AntRow, Col } from 'antd'
import ProfileForm from './ProfileForm'
import { FormSection, Form, Input, Select, Radio } from '../common'

const Wrapper = styled.div`
  margin-bottom: ${grid(8)};
`

const Row = ({ children }) => (
  <AntRow align="bottom" gutter={8}>
    {children}
  </AntRow>
)

const yesOrNoOptions = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
]

const ProfileInfo = props => {
  const {
    autoSave,
    className,
    form,
    initialValues,
    loading,
    message,
    onAutoSave,
    onCountryChange,
    onSubmit,
    secondaryButtonAction,
    secondaryButtonLabel,
    showSecondaryButton,
    submitButtonLabel,
    submissionStatus,
    institutionalSetting,
    institutionLevels,

    courses,
    topics,

    countries,
    states,
    ...rest
  } = props

  const [showStates, setShowStates] = useState(false)

  useEffect(() => {
    if (states.length > 0) {
      setShowStates(true)
    } else {
      setShowStates(false)
    }
  }, [states])

  return (
    <Wrapper className={className}>
      <ProfileForm
        autoSave={autoSave}
        form={form}
        initialValues={initialValues}
        loading={loading}
        message={message}
        onAutoSave={onAutoSave}
        onSubmit={onSubmit}
        secondaryButtonAction={secondaryButtonAction}
        secondaryButtonLabel={secondaryButtonLabel}
        showSecondaryButton={showSecondaryButton}
        submissionStatus={submissionStatus}
        submitButtonLabel={submitButtonLabel}
        {...rest}
      >
        <FormSection label="Contact Information">
          <Row>
            <Col sm={12} xs={24}>
              {/* QUESTION reverse order from sign up form? */}
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Last name is required',
                  },
                ]}
              >
                <Input
                  autoComplete="family-name"
                  placeholder="Fill in your last name"
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'First name is required',
                  },
                ]}
              >
                <Input
                  autoComplete="given-name"
                  placeholder="Fill in your first name"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              {/* QUESTION why not the display name? */}
              <Form.Item
                label="Name as you would like it to appear in the assessment builder"
                name="displayName"
                rules={[
                  {
                    required: true,
                    message: 'Display name is required',
                  },
                ]}
              >
                <Input placeholder="Fill in your display name" />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Phone number is required',
                  },
                  {
                    pattern: /^(\+?\d\s*)+$/,
                    message:
                      'Please enter a valid format (optional + in front, followed by digits or spaces only) ',
                  },
                ]}
              >
                <Input
                  autoComplete="tel"
                  placeholder="Fill in your phone number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Email address is required',
                  },
                  {
                    type: 'email',
                    message: 'This is not a valid email',
                  },
                ]}
              >
                <Input
                  autoComplete="email"
                  placeholder="Fill in your email address"
                />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>

        <FormSection label="Address">
          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message:
                      'Please select the country where your institution is located',
                  },
                ]}
              >
                <Select
                  autoComplete="country-name"
                  data-testid="select-country"
                  filterOption={(inputValue, option) => {
                    return (
                      option.label
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) === 0
                    )
                  }}
                  onChange={onCountryChange}
                  optionFilterProp="label"
                  options={countries}
                  placeholder="Select the country where your institution is located"
                  showSearch
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              {showStates && (
                <Form.Item
                  dependencies={['country']}
                  label="State / Province"
                  name="state"
                  rules={[
                    {
                      required: true,
                      message:
                        'Please select the state where your institution is located',
                    },
                  ]}
                >
                  <Select
                    autoComplete="address-level1"
                    data-testid="state-select"
                    filterOption={(inputValue, option) => {
                      return (
                        option.label
                          .toLowerCase()
                          .indexOf(inputValue.toLowerCase()) === 0
                      )
                    }}
                    optionFilterProp="label"
                    options={states}
                    placeholder="Select the state where your institution is located"
                    showSearch
                  />
                </Form.Item>
              )}
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message:
                      'City where your Institution is located is required',
                  },
                ]}
              >
                <Input
                  autoComplete={
                    showStates ? 'address-level2' : 'address-level1'
                  }
                  placeholder="Enter the City where your Institution is located"
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item label="Address" name="address">
                <Input
                  autoComplete="street-address"
                  placeholder="Type your address"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item label="ZIP code" name="zipCode">
                <Input
                  autoComplete="postal-code"
                  placeholder="Enter your ZIP code"
                />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>

        <FormSection label="School">
          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="Position"
                name="position"
                rules={[
                  {
                    required: true,
                    message: 'You have to fill in you position',
                  },
                ]}
              >
                <Input placeholder="Type your position" />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item
                label="Institution/Organization"
                name="organization"
                rules={[
                  {
                    required: true,
                    message:
                      'You have to fill in your Institution/Organization',
                  },
                ]}
              >
                <Input
                  autoComplete="organization"
                  placeholder="Type your Institution/Organization"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              {/* QUESTION is the number input more appropriate here? */}
              <Form.Item
                label="Years of teaching experience"
                name="yearsOfExperience"
                rules={[
                  {
                    required: true,
                    message:
                      'You have to select your years of teaching experience',
                  },
                ]}
              >
                <Select
                  data-testid="teaching-experience-select"
                  options={[
                    { label: '< 5', value: 'lessThan5' },
                    { label: '> 5', value: 'moreThan5' },
                  ]}
                  placeholder="Select your years of teaching experience"
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              {/* QUESTION what is this sorcery? */}
              <Form.Item
                label="Primary Institution Type"
                name="typeOfInstitution"
              >
                <Select
                  data-testid="primary-institution-select"
                  options={institutionLevels}
                  placeholder="What level do you primarily teach?"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item dependencies={['typeOfInstitution']} noStyle>
                {({ getFieldValue }) => {
                  if (getFieldValue('typeOfInstitution') === 'highSchool') {
                    return (
                      <Form.Item
                        label="Do you teach AP/IB courses?"
                        name="apIbCourses"
                      >
                        <Radio
                          aria-label="Do you teach AP/IB courses?"
                          name="apIbCourses"
                          options={yesOrNoOptions}
                        />
                      </Form.Item>
                    )
                  }

                  if (
                    getFieldValue('typeOfInstitution') === '2-year-college' ||
                    getFieldValue('typeOfInstitution') === '4-year-college'
                  ) {
                    return (
                      <Form.Item
                        label="Which best describes your position?"
                        name="employmentStatus"
                      >
                        <Radio
                          aria-label="Which best describes your position?"
                          name="employmentStatus"
                          options={[
                            {
                              label: 'Full time faculty',
                              value: 'fullTimeFaculty',
                            },
                            {
                              label: 'Part-time/adjunct faculty',
                              value: 'partTimeAdjunctFaculty',
                            },
                          ]}
                        />
                      </Form.Item>
                    )
                  }

                  if (getFieldValue('typeOfInstitution') === 'other') {
                    return (
                      <Form.Item
                        label="Please specify the level you primarily teach:"
                        name="otherLevel"
                      >
                        <Input placeholder="What level do you primarily teach?" />
                      </Form.Item>
                    )
                  }

                  return null
                }}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item label="What course(s) do you teach?" name="courses">
                <Select
                  data-testid="course-taught-select"
                  mode="multiple"
                  options={courses}
                  placeholder="Select courses"
                />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>

        <FormSection label="Reviewing" last>
          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="Are you interested in serving as a reviewer?"
                name="reviewerInterest"
                rules={[
                  {
                    required: true,
                    message: 'Please select an option',
                  },
                ]}
              >
                <Radio
                  aria-label="Are you interested in serving as a reviewer?"
                  name="reviewerInterest"
                  options={yesOrNoOptions}
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item dependencies={['reviewerInterest']} noStyle>
                {({ getFieldValue }) => {
                  if (getFieldValue('reviewerInterest') === false) {
                    return null
                  }

                  return (
                    <Form.Item
                      label="Select the three topics you are most comfortable reviewing for scientific accuracy"
                      name="coursesReview"
                      rules={[
                        {
                          required: true,
                          message: 'Please select three topics',
                        },
                        () => ({
                          validator(_, value) {
                            if (
                              !value ||
                              value?.length === 3 ||
                              value?.length === 0
                              // if length is 0 or value is undefined, the error is captured by the first rule, added to avoid duplication of error
                            ) {
                              return Promise.resolve()
                            }

                            if (value.length < 3) {
                              return Promise.reject(
                                new Error('Please select three topics.'),
                              )
                            }

                            return Promise.reject(
                              new Error(
                                'Please select no more than three topics.',
                              ),
                            )
                          },
                        }),
                      ]}
                    >
                      <Select
                        data-testid="three-course-select"
                        mode="multiple"
                        options={topics}
                        placeholder="Select three topics"
                      />
                    </Form.Item>
                  )
                }}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="Have you had training in writing/reviewing assessment items?"
                name="assessmentTraining"
                rules={[
                  {
                    required: true,
                    message: 'Please select an option',
                  },
                ]}
              >
                <Radio
                  aria-label="Have you had training in writing/reviewing assessment items?"
                  name="assessmentTraining"
                  options={yesOrNoOptions}
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item
                label="Have you had training on assessing items for inclusive language?"
                name="assessmentTrainingInclusive"
                rules={[
                  {
                    required: true,
                    message: 'Please select an option',
                  },
                ]}
              >
                <Radio
                  aria-label="Have you had training on assessing items for inclusive language?"
                  name="assessmentTrainingInclusive"
                  options={yesOrNoOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item label="Where did you hear about this?" name="source">
                <Input placeholder="Enter source" />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>
      </ProfileForm>
    </Wrapper>
  )
}

ProfileInfo.propTypes = {
  autoSave: PropTypes.bool,
  message: PropTypes.string,
  form: PropTypes.shape(),
  initialValues: PropTypes.shape(),
  loading: PropTypes.bool,
  onAutoSave: PropTypes.func,
  onSubmit: PropTypes.func,
  secondaryButtonAction: PropTypes.func,
  secondaryButtonLabel: PropTypes.string,
  showSecondaryButton: PropTypes.bool,
  submitButtonLabel: PropTypes.string,
  submissionStatus: PropTypes.string,
  institutionalSetting: PropTypes.arrayOf(PropTypes.shape()),
  institutionLevels: PropTypes.arrayOf(PropTypes.shape()),
  courses: PropTypes.arrayOf(PropTypes.shape()),
  topics: PropTypes.arrayOf(PropTypes.shape()),
  countries: PropTypes.arrayOf(PropTypes.shape()),
  states: PropTypes.arrayOf(PropTypes.shape()),
  onCountryChange: PropTypes.func.isRequired,
}

ProfileInfo.defaultProps = {
  autoSave: true,
  message: '',
  form: null,
  initialValues: {},
  loading: false,
  onAutoSave: () => {},
  onSubmit: () => {},
  secondaryButtonAction: () => {},
  secondaryButtonLabel: 'Clear',
  showSecondaryButton: true,
  submitButtonLabel: 'Submit',
  submissionStatus: null,
  institutionalSetting: [],
  institutionLevels: [],
  courses: [],
  topics: [],
  countries: [],
  states: [],
}

export default ProfileInfo

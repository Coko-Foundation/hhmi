/* stylelint-disable declaration-no-important */
/* stylelint-disable no-descending-specificity */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-fallthrough */
import React, { useEffect, useState, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Breadcrumb } from 'antd'
import { CloseOutlined, HolderOutlined, PlusOutlined } from '@ant-design/icons'
import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { grid, th } from '@coko/client'
import { Button, Table, Modal, Form, Input } from '../common'

// #region styled
const StyledSection = styled.section`
  background: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${grid(4)};
`

const StyledTable = styled(Table)`
  .disabled,
  .disabled:hover {
    background-color: #eee;
  }

  .non-draggable > td:first-of-type > button {
    display: none;
  }

  td,
  th {
    border: none;
  }
`

const Btn = styled(Button)`
  max-width: 100%;
  padding: 0;
  text-align: start;
  white-space: wrap;

  &:hover {
    border-color: transparent !important;
  }
`

const NavWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const StyledBreadcrumb = styled(Breadcrumb)`
  padding: 2ch;

  ol {
    align-items: center;
  }
`

const ActionsWrapper = styled.div`
  display: flex;
  gap: ${grid(2)};
`

const DL = styled.dl`
  dd {
    margin-inline-start: 2ch;
  }
`

const DynamicFormItemWrapper = styled.div`
  align-items: last baseline;
  display: grid;
  grid-template-columns: 9fr 1fr;

  button {
    color: ${th('colorError')};
    display: grid;
    margin-left: auto;
    place-content: center;

    &:hover,
    &:focus {
      color: ${th('colorError')} !important;
    }
  }
`
// #endregion styled

const courseDataToUi = (data, type, isLast) => {
  if (!data) return []

  return data.map(d => ({
    isLast,
    type,
    label: d.label,
    key: d.value,
    topic: d.topic,
    textValue: d.textValue,
    enabled: d.enabled,
    explanatoryItems: d.explanatoryItems,
    explanation: d.explanation,
  }))
}

const firstColumnConfig = {
  title: 'Label',
  dataIndex: 'label',
  key: 'label',
}

const uneditableTypes = [
  'biSubtopic',
  'introBioSubcat',
  'visionAndChangeSubCategories',
]

const newButtonsConfigs = {
  unit: {
    label: 'Add unit',
    key: 'unit',
  },
  topic: {
    label: 'Add topic',
    key: 'topic',
  },
  learningObjectice: {
    label: 'Add learning objective',
    key: 'learning_objective',
  },
  essentialKnowledge: {
    label: 'Add essential knowledge',
    key: 'essential_knowledge',
  },
  application: {
    label: 'Add application',
    key: 'application',
  },
  courseSubtopic: {
    label: 'Add course subtopic',
    key: 'application',
  },
  skill: {
    label: 'Add content statement',
    key: 'skill',
  },
  understanding: {
    label: 'Add understanding',
    key: 'understanding',
  },
  coreConcept: {
    label: 'Add core concept',
    key: 'coreConcept',
  },
  subdiscipline: {
    label: 'Add subdiscipline',
    key: 'subdiscipline',
  },
  subdisciplineStatement: {
    label: 'Add subdiscipline statement',
    key: 'subdisciplineStatement',
  },
  coreCompetence: {
    label: 'Add core competence',
    key: 'coreCompetence',
  },
  subcompetence: {
    label: 'Add subcompetence',
    key: 'subcompetence',
  },
  subcompetenceStatement: {
    label: 'Add subcompetence statement',
    key: 'subcompetenceStatement',
  },
  concept: {
    label: 'Add concept',
    key: 'concept',
  },
  category: {
    label: 'Add category',
    key: 'category',
  },
}

const ModalContext = React.createContext(null)
const RowContext = React.createContext({})

const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext)
  return (
    <Button
      icon={<HolderOutlined />}
      ref={setActivatorNodeRef}
      size="small"
      style={{ cursor: 'move' }}
      type="text"
      {...listeners}
    />
  )
}

const Row = props => {
  // eslint-disable-next-line react/prop-types
  const { 'data-row-key': dataRowKey, style: styles } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dataRowKey })

  const style = {
    ...styles,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9 } : {}),
  }

  const contextValue = useMemo(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  )

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  )
}

const CourseMetadataTable = props => {
  const {
    courses,
    introToBioMeta,
    onMetadataUpdate,
    onMetadataDisable,
    onMetadataEnable,
    onMetadataAdd,
    onDataReordered,
  } = props

  const [modal, contextHolder] = Modal.useModal()
  const { header: ModalHeader, footer: ModalFooter } = Modal
  const { confirm } = modal

  const metadataItemRender = (label, data) => {
    return data.isLast ? (
      <span>{label}</span>
    ) : (
      <Btn onClick={() => setCurrentEntry(data)} type="link">
        {label}
      </Btn>
    )
  }

  const [editMetadataForm] = Form.useForm()
  const [newMetadataForm] = Form.useForm()

  const [dataSource, setDataSource] = useState()
  const [navigation, setNavigation] = useState([{ type: '' }])
  const [navigationItems, setNavigationItems] = useState()
  const [newButtonAttrs, setNewButtonAttrs] = useState()
  const [currentEntry, setCurrentEntry] = useState([])

  const [columns, setColumns] = useState([
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { ...firstColumnConfig, render: metadataItemRender },
    {
      title: 'Actions',
      dataIndex: 'key',
      key: 'key',
      width: '20%',
      render: (_, item) => {
        return uneditableTypes.indexOf(item.type) === -1 ? (
          <ActionsWrapper>
            <Button onClick={() => editMetadata(item)} type="primary">
              Edit
            </Button>
            {item.enabled ? (
              <Button
                onClick={() => disableMetadata(item)}
                status="danger"
                type="primary"
              >
                Disable
              </Button>
            ) : (
              <Button
                onClick={() => onMetadataEnable(item.key, item.type)}
                status="success"
                type="primary"
              >
                Enable
              </Button>
            )}
          </ActionsWrapper>
        ) : null
      },
    },
  ])

  useEffect(() => {
    if (courses.length && !dataSource) {
      setDataSource(courseDataToUi(courses, 'course'))
    } else if (dataSource) {
      // update ui by reseting the current dataSource
      selectEntry(currentEntry)
    }
  }, [courses])

  useEffect(() => {
    setNavigationItems(
      navigation.map(n => ({
        title: (
          <Btn onClick={() => setCurrentEntry(n)} type="link">
            {n.label || 'All courses'}
          </Btn>
        ),
      })),
    )

    const firstColumn = structuredClone(firstColumnConfig)
    const currentCourse = navigation[1]?.label

    const lastNavItem = navigation[navigation.length - 1]

    switch (lastNavItem.type) {
      case 'course':
        if (lastNavItem.textValue === 'introBioForMajors') {
          firstColumn.title = 'Introductory Biology for Majors'
        } else {
          firstColumn.title = 'Unit'
          setNewButtonAttrs(newButtonsConfigs.unit)
        }
        break
      case 'unit':
        firstColumn.title = 'Topic'
        setNewButtonAttrs(newButtonsConfigs.topic)
        break
      case 'topic':
        firstColumn.title = 'Learning objective'
        setNewButtonAttrs(newButtonsConfigs.learningObjectice)
        break
      case 'learningObjective':
        firstColumn.title = 'Essential knowledge'
        setNewButtonAttrs(newButtonsConfigs.essentialKnowledge)
        break
      case 'biSubtopic':
        if (lastNavItem.key === 'applications') {
          if (currentCourse === 'IB Biology') {
            firstColumn.title = 'Course Subtopic'
            setNewButtonAttrs(newButtonsConfigs.courseSubtopic)
          } else {
            firstColumn.title = 'Application'
            setNewButtonAttrs(newButtonsConfigs.application)
          }
        } else if (lastNavItem.key === 'skills') {
          firstColumn.title = 'Content Statement'
          setNewButtonAttrs(newButtonsConfigs.skill)
        } else if (lastNavItem.key === 'understandings') {
          firstColumn.title = 'Understanding'
          setNewButtonAttrs(newButtonsConfigs.understanding)
        }
        break
      case 'introBioSubcat':
        if (lastNavItem.key === 'units') {
          firstColumn.title = 'Unit'
          setNewButtonAttrs(newButtonsConfigs.unit)
        } else if (lastNavItem.key === 'visionAndChange') {
          firstColumn.title = 'Vision and Change'
        } else if (lastNavItem.key === 'aamc') {
          firstColumn.title = 'Concept'
          setNewButtonAttrs(newButtonsConfigs.concept)
        }
        break
      case 'visionAndChangeSubCategories':
        if (lastNavItem.key === 'coreConcepts') {
          firstColumn.title = 'Core concepts'
          setNewButtonAttrs(newButtonsConfigs.coreConcept)
        } else if (lastNavItem.key === 'coreCompetencies') {
          firstColumn.title = 'Core competencies'
          setNewButtonAttrs(newButtonsConfigs.coreCompetence)
        }
        break
      case 'coreConcept':
        firstColumn.title = 'Subdiscipline'
        setNewButtonAttrs(newButtonsConfigs.subdiscipline)
        break
      case 'subdiscipline':
        firstColumn.title = 'Subdiscipline statement'
        setNewButtonAttrs(newButtonsConfigs.subdisciplineStatement)
        break
      case 'coreCompetence':
        firstColumn.title = 'Subcompetence'
        setNewButtonAttrs(newButtonsConfigs.subcompetence)
        break
      case 'subcompetence':
        firstColumn.title = 'Subcompetence statement'
        setNewButtonAttrs(newButtonsConfigs.subcompetenceStatement)
        break
      case 'concept':
        firstColumn.title = 'Category'
        setNewButtonAttrs(newButtonsConfigs.category)
        break
      default:
        firstColumn.title = 'Course'
        break
    }

    setColumns([
      { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
      { ...firstColumn, render: metadataItemRender },
      columns[2],
    ])
  }, [navigation])

  useEffect(() => {
    if (currentEntry !== undefined) {
      selectEntry(currentEntry)
    }
  }, [currentEntry])

  const updateMetadata = dialog => {
    editMetadataForm
      .validateFields()
      .then(v => {
        const data = {
          ...v,
          explanatoryItems:
            v.explanatoryItems &&
            v.explanatoryItems.map(({ explanation }) => explanation),
          explanation: v.explanation,
        }

        onMetadataUpdate(data).then(() => {
          dialog.destroy()
        })
      })
      .catch(e => console.error(e))
  }

  const editMetadata = ({
    key,
    type,
    label,
    explanatoryItems,
    explanation,
  }) => {
    const dialog = confirm()

    const initialValues = {
      id: key,
      type,
      label,
    }

    if (type === 'coreConcept') {
      initialValues.explanatoryItems = explanatoryItems.map(exp => ({
        explanation: exp,
      }))
    }

    if (type === 'subcompetence' || type === 'category') {
      initialValues.explanation = explanation
    }

    editMetadataForm.setFieldsValue(initialValues)

    dialog.update({
      width: 500,
      icon: null,
      title: <ModalHeader>Edit metadata</ModalHeader>,
      content: (
        <Form form={editMetadataForm} layout="vertical">
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <Form.Item hidden name="type">
            <Input />
          </Form.Item>
          <Form.Item
            label="Label"
            name="label"
            rules={[
              {
                required: true,
                message: 'Label is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {type === 'coreConcept' && (
            <Form.List name="explanatoryItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <DynamicFormItemWrapper>
                      <Form.Item
                        label={`Explanatory item ${index + 1}`}
                        name={[index, 'explanation']}
                        rules={[
                          {
                            required: true,
                            message: 'Explanatory item cannot be empty',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Btn
                          aria-label="Remove explanatory item"
                          onClick={() => remove(field.name)}
                          type="link"
                        >
                          <CloseOutlined />
                        </Btn>
                      )}
                    </DynamicFormItemWrapper>
                  ))}
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    type="dashed"
                  >
                    Add explanatory item
                  </Button>
                </>
              )}
            </Form.List>
          )}
          {(type === 'subcompetence' || type === 'category') && (
            <Form.Item
              label="Explanation"
              name="explanation"
              rules={[
                {
                  required: true,
                  message: 'Explanation is required',
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            key="save"
            onClick={() => updateMetadata(dialog)}
            type="primary"
          >
            Save
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const disableMetadataConfirm = (key, type, dialog) => {
    onMetadataDisable(key, type)
      .then(() => {
        dialog.destroy()
      })
      .catch(e => console.error(e))
  }

  const disableMetadata = ({ key, type }) => {
    const dialog = confirm()

    dialog.update({
      width: 500,
      icon: null,
      title: <ModalHeader>Disable metadata</ModalHeader>,
      content: (
        <div>
          <p>
            Disableing this item will make it unavailable for usage in new
            questions, but will not affect previous questions where this item
            was used. To modify older questions, the editors can will need to
            edit them one by one.
          </p>
          <p>Are you sure you want to proceed?</p>
        </div>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            key="disable"
            onClick={() => disableMetadataConfirm(key, type, dialog)}
            status="danger"
            type="primary"
          >
            Disable
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const saveNewMetadata = dialog => {
    newMetadataForm
      .validateFields()
      .then(v => {
        const { biSubtopic, ...rest } = v
        onMetadataAdd(rest).then(() => {
          dialog.destroy()
        })
      })
      .catch(e => console.error(e))
  }

  const addMetadata = newKey => {
    const dialog = confirm()
    const fieldsValue = {
      newKey,
      label: '',
    }

    navigation.slice(1).forEach(({ type, key }) => {
      fieldsValue[type] = key
    })

    newMetadataForm.setFieldsValue(fieldsValue)

    dialog.update({
      width: 500,
      icon: null,
      title: <ModalHeader>{newButtonAttrs.label}</ModalHeader>,
      content: (
        <>
          <div>
            The new entry will be added under:{' '}
            <DL>
              {navigation.slice(1).map(n => (
                <>
                  <dt />
                  <dd>{n.label}</dd>
                </>
              ))}
            </DL>
          </div>
          <Form form={newMetadataForm} layout="vertical">
            {navigation.slice(1).map(nav => (
              <Form.Item hidden key={nav.key} name={nav.type}>
                <Input />
              </Form.Item>
            ))}
            <Form.Item hidden key={newKey} name="newKey">
              <Input />
            </Form.Item>
            <Form.Item
              label="Label"
              name="label"
              rules={[
                {
                  required: true,
                  message: 'Label is required',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            key="add"
            onClick={() => saveNewMetadata(dialog)}
            type="primary"
          >
            Add
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const selectEntry = data => {
    const { key, type, textValue } = data

    if (type === '') {
      setDataSource(courseDataToUi(courses, 'course'))
    } else if (type === 'course') {
      switch (textValue) {
        case 'introBioForMajors':
          setDataSource(
            courseDataToUi(
              [
                {
                  label: 'Units',
                  value: 'units',
                  course: textValue,
                  enabled: true,
                },
                {
                  label: 'Vision and Change',
                  value: 'visionAndChange',
                  course: textValue,
                  enabled: true,
                },
                {
                  label: 'AAMC Future Physicians',
                  value: 'aamc',
                  course: textValue,
                  enabled: true,
                },
              ],
              'introBioSubcat',
            ),
          )

          break
        default:
          setDataSource(
            courseDataToUi(courses.find(c => c.value === key).units, 'unit'),
          )
          break
      }
    } else if (type === 'unit') {
      setDataSource(
        courseDataToUi(
          courses
            .find(c => c.value === navigation[1].key)
            .topics.filter(t => t.unit === key),
          'topic',
        ),
      )
    } else if (type === 'topic') {
      switch (navigation[1].textValue) {
        case 'apBiology':
        case 'apEnvironmentalScience': {
          const los = courses
            .find(c => c.value === navigation[1].key)
            .learningObjectives.filter(lo => lo.topic === key)

          setDataSource(courseDataToUi(los, 'learningObjective'))
          break
        }

        case 'biBiology': {
          const biBioSubtopics = [
            {
              label: 'Course Subtopic',
              value: 'applications',
              topic: key,
              enabled: true,
            },
            {
              label: 'Content Statement',
              value: 'skills',
              topic: key,
              enabled: true,
            },
            {
              label: 'Understandings',
              value: 'understandings',
              topic: key,
              enabled: true,
            },
          ]

          setDataSource(courseDataToUi(biBioSubtopics, 'biSubtopic'))
          break
        }

        case 'biEnvironmentalScience': {
          const biEnvSubtopics = [
            {
              label: 'Applications',
              value: 'applications',
              topic: key,
              enabled: true,
            },
            {
              label: 'Understandings',
              value: 'understandings',
              topic: key,
              enabled: true,
            },
          ]

          setDataSource(courseDataToUi(biEnvSubtopics, 'biSubtopic'))
          break
        }

        case 'introBioForMajors': {
          const los = courses
            .find(c => c.value === navigation[1].key)
            .learningObjectives.filter(lo => lo.topic === key)

          setDataSource(courseDataToUi(los, 'learningObjective', true))
          break
        }

        default:
          break
      }
    } else if (type === 'biSubtopic') {
      const items = courses
        .find(c => c.value === navigation[1].key)
        [key].filter(lo => lo.topic === data.topic)

      setDataSource(courseDataToUi(items, data.label.toLowerCase(), true))
    } else if (type === 'learningObjective') {
      const eks = courses
        .find(c => c.value === navigation[1].key)
        .essentialKnowledge.filter(ek => ek.learningObjective === key)

      setDataSource(courseDataToUi(eks, 'essentialKnowledge', true))
    } else if (type === 'introBioSubcat') {
      if (key === 'units') {
        setDataSource(
          courseDataToUi(
            courses.find(c => c.value === navigation[1].key).units,
            'unit',
          ),
        )
      } else if (key === 'visionAndChange') {
        setDataSource(
          courseDataToUi(
            [
              {
                label: 'Core concepts',
                value: 'coreConcepts',
                enabled: true,
              },
              {
                label: 'Core competencies',
                value: 'coreCompetencies',
                enabled: true,
              },
            ],
            'visionAndChangeSubCategories',
          ),
        )
      } else if (key === 'aamc') {
        setDataSource(courseDataToUi(introToBioMeta[1].concepts, 'concept'))
      }
    } else if (type === 'visionAndChangeSubCategories') {
      setDataSource(
        courseDataToUi(
          introToBioMeta[0][key],
          key === 'coreConcepts' ? 'coreConcept' : 'coreCompetence',
        ),
      )
    } else if (type === 'coreConcept') {
      const subdisciplines = introToBioMeta[0].subdisciplines.filter(
        subd => subd.coreConcept === key,
      )

      setDataSource(courseDataToUi(subdisciplines, 'subdiscipline'))
    } else if (type === 'subdiscipline') {
      const statements = introToBioMeta[0].subdisciplineStatements.filter(
        statemenet =>
          statemenet.subdiscipline === key &&
          statemenet.coreConcept === navigation[navigation.length - 1].key,
      )

      setDataSource(courseDataToUi(statements, 'subdisciplineStatement', true))
    } else if (type === 'coreCompetence') {
      const subcompetencies = introToBioMeta[0].subcompetencies.filter(
        subd => subd.coreCompetence === key,
      )

      setDataSource(courseDataToUi(subcompetencies, 'subcompetence'))
    } else if (type === 'subcompetence') {
      const statements = introToBioMeta[0].subcompetenceStatements.filter(
        statement => statement.subcompetence === key,
      )

      setDataSource(courseDataToUi(statements, 'subcompetenceStatement', true))
    } else if (type === 'concept') {
      const categories = introToBioMeta[1].categories.filter(
        category => category.concept === key,
      )

      setDataSource(courseDataToUi(categories, 'category', true))
    }

    setNavigation(() => {
      const index = navigation.findIndex(n => n.key === data.key)

      return index > -1 ? navigation.slice(0, index + 1) : [...navigation, data]
    })
  }

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const activeIndex = dataSource.findIndex(
        record => record.key === active?.id,
      )

      const overIndex = dataSource.findIndex(record => record.key === over?.id)
      const reorderedDataSource = arrayMove(dataSource, activeIndex, overIndex)
      setDataSource(reorderedDataSource)
      onDataReordered(reorderedDataSource)
    }
  }

  const calculateRowClass = record => {
    if (uneditableTypes.indexOf(record.type) > -1) {
      return 'non-draggable'
    }
    if (!record.enabled) {
      return 'disabled'
    }

    return ''
  }

  const hideAddNewButton =
    navigation[navigation.length - 1].type === '' ||
    (navigation[navigation.length - 1].type === 'topic' &&
      ['biBiology', 'biEnvironmentalScience'].includes(
        navigation[1].textValue,
      )) ||
    (navigation[1].textValue === 'introBioForMajors' &&
      (navigation.length === 2 ||
        navigation[navigation.length - 1].key === 'visionAndChange'))

  return (
    <ModalContext.Provider>
      <StyledSection>
        <NavWrapper>
          <StyledBreadcrumb items={navigationItems} />
          <Button
            hidden={hideAddNewButton}
            onClick={() => addMetadata(newButtonAttrs?.key)}
            type="primary"
          >
            {newButtonAttrs?.label}
          </Button>
        </NavWrapper>
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={dataSource ? dataSource.map(i => i.key) : []}
            strategy={verticalListSortingStrategy}
          >
            <StyledTable
              bordered={false}
              columns={columns}
              components={{ body: { row: Row } }}
              dataSource={dataSource}
              rowClassName={calculateRowClass}
            />
          </SortableContext>
        </DndContext>
      </StyledSection>
      {contextHolder}
    </ModalContext.Provider>
  )
}

CourseMetadataTable.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape()),
  introToBioMeta: PropTypes.arrayOf(PropTypes.shape()),
  onMetadataAdd: PropTypes.func,
  onMetadataDisable: PropTypes.func,
  onMetadataEnable: PropTypes.func,
  onMetadataUpdate: PropTypes.func,
  onDataReordered: PropTypes.func,
}
CourseMetadataTable.defaultProps = {
  courses: [],
  introToBioMeta: [],
  onMetadataAdd: null,
  onMetadataDisable: null,
  onMetadataEnable: null,
  onMetadataUpdate: null,
  onDataReordered: null,
}

export default CourseMetadataTable

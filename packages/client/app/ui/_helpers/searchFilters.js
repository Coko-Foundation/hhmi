import theme from '../../theme'

export const createHeAssignedFilters = (handlingEditors = []) => {
  const heOptions = handlingEditors.map(he => {
    const { label, value } = he
    return {
      label,
      value,
      badgeBg: theme.colorSuccessAlt,
    }
  })

  return {
    key: { label: 'Assigned to HE', value: 'heAssigned' },
    values: [
      {
        label: 'Is not Assigned',
        value: '',
        badgeBg: theme.colorErrorAlt,
      },
      ...heOptions,
    ],
  }
}

export const statusFilters = [
  {
    key: { label: 'Status', value: 'status' },
    values: [
      { label: 'Submitted', value: 'submitted', badgeBg: theme.colorText },
      {
        label: 'Under Review',
        value: 'underReview',
        badgeBg: theme.colorWarning,
      },
      {
        label: 'In Production',
        value: 'inProduction',
        badgeBg: theme.colorPrimary,
      },
      { label: 'Published', value: 'published', badgeBg: theme.colorSuccess },
      { label: 'Rejected', value: 'rejected', badgeBg: theme.colorError },
      {
        label: 'Unpublished',
        value: 'unpublished',
        badgeBg: theme.colorErrorAlt,
      },
    ],
  },
  // {
  //   key: { label: 'Assigned to HE', value: 'heAssigned' },
  //   values: [
  //     {
  //       label: 'editorUser',
  //       value: 'editorUser',
  //       badgeBg: theme.colorSuccessAlt,
  //     },
  //     { label: 'Is not', value: false, badgeBg: theme.colorErrorAlt },
  //   ],
  // },
  // {
  //   key: { label: 'Author', value: 'author' },
  //   values: [
  //     {
  //       label: '%',
  //       value: '%',
  //       badgeBg: theme.colorSecondary,
  //       ariaLabel:
  //         'type the name of the author you want to search for (or part of it)',
  //     },
  //   ],
  // },
]

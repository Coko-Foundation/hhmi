import theme from '../../theme'

/* eslint-disable import/prefer-default-export */
export const dashboardEditorFilters = [
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
    ],
  },
  {
    key: { label: 'Assigned to HE', value: 'heAssigned' },
    values: [
      { label: 'Is', value: true, badgeBg: theme.colorSuccessAlt },
      { label: 'Is not', value: false, badgeBg: theme.colorErrorAlt },
    ],
  },
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

export const notificationMessageFilters = [
  {
    key: { label: 'Unread', value: 'unreadmention', badgeBg: theme.colorChat },
    values: [
      { label: 'Is', value: true, badgeBg: theme.colorChat },
      { label: 'Is not', value: false, badgeBg: theme.colorErrorAlt },
    ],
  },
  {
    key: { label: 'From', value: 'messageAuthor' },
    values: [{ label: '%', value: '%', badgeBg: theme.colorChat }],
  },
]

import React, { useEffect, useMemo, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { name, lorem } from 'faker'

export const NotificationsContext = React.createContext()

const fakeMessages = length => {
  const lngth = Array.from({ length })
  const messages = []
  lngth.forEach((_, i) => {
    messages[i] = {
      id: i,
      from: `@${name.findName()}`,
      content: lorem.words(15),
      date: new Date().toLocaleString(),
      unread: Math.random() > 0.5,
    }
  })
  return messages
}

const initialMsgs = [...fakeMessages(10)]

export const NotificationsProvider = ({ children }) => {
  const [mentions, setMentions] = useState(initialMsgs)
  const [tabKey, setTabKey] = useState('mentions')

  const [fakePendingMsgs, setFakePendingMsgs] = useState(
    mentions.filter(msg => msg.unread === true),
  )

  const setUpdated = () => {
    ;[
      ...document
        .querySelector('#mentions-list')
        .querySelectorAll('[aria-selected="true"]'),
    ].forEach((el, i) => {
      setMentions(prev => {
        const newMsgs = prev

        const current = [...newMsgs].find(
          msg => msg.id === Number(el.dataset.id),
        )

        current && (newMsgs[newMsgs.indexOf(current)].unread = false)
        setFakePendingMsgs(mentions.filter(msg => msg.unread === true))

        return newMsgs
      })
    })
  }

  const values = useMemo(() => {
    return {
      mentions,
      setMentions,
      fakePendingMsgs,
      setUpdated,
      tabKey,
      setTabKey,
    }
  }, [mentions, fakePendingMsgs, setUpdated, setTabKey])

  useEffect(() => {}, [mentions])

  return (
    <NotificationsContext.Provider value={values}>
      {children}
    </NotificationsContext.Provider>
  )
}

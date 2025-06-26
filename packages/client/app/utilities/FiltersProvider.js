/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react'

export const FiltersContext = React.createContext({})
export const useFilters = () => React.useContext(FiltersContext)

export const FiltersProvider = props => {
  const { children } = props
  const [filters, setFilters] = useState(null)

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

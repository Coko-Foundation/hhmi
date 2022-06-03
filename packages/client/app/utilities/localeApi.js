const sortCallback = (a, b) => {
  const la = a.label.toLowerCase()
  const lb = b.label.toLowerCase()

  if (la < lb) return -1
  if (la > lb) return 1
  return 0
}

export const getCountries = async () => {
  const response = await fetch(
    'https://web.cvent.com/event_guest/v1/lookups/v1/countries?locale=en',
  )

  if (response.status !== 200) {
    console.error(response)
    return null
  }

  const data = await response.json()

  const formattedCountries = Object.values(data.countries)
    .map(c => ({
      label: c.name,
      value: c.code,
    }))
    .sort(sortCallback)

  return formattedCountries
}

export const getStatesByCountry = async country => {
  if (!country) return null

  const response = await fetch(
    `https://web.cvent.com/event_guest/v1/lookups/v1/states?countryCode=${country}`,
  )

  if (response.status !== 200) {
    console.error(response)
    return null
  }

  const data = await response.json()

  const formattedStates = Object.values(data.states)
    .map(s => ({
      label: s.name,
      value: s.code,
    }))
    .sort(sortCallback)

  return formattedStates
}

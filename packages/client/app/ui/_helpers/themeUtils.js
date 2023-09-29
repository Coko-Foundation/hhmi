/* eslint-disable import/prefer-default-export */
/* eslint-disable no-nested-ternary */
import { isString } from 'lodash'
import theme from '../../theme'

const clamp = ammount => (ammount > 1 ? 1 : ammount < 0 ? 0 : ammount)

// usage :
//  'source' can be one of the keys from the theme objrct or a hex color string
//     with hashtag and the the 6 digits(without the alpha and not abreviated)
//   'alphaAmmount' must be a number between 0 and 1 (eg.: 0.222)
//   'fallbackHexColor' can be any color string
export const alpha = (source, alphaAmmount, fallbackHexColor = '#000') => {
  const isHexColor =
    isString(source) && source.startsWith('#') && source.length === 7

  if (!theme[source] && !isHexColor) return fallbackHexColor

  const toRgb = 255 * clamp(alphaAmmount)
  const alphaToHex = Math.floor(toRgb).toString(16)
  return isHexColor ? source + alphaToHex : theme[source] + alphaToHex
}

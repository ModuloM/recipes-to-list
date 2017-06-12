import { css } from 'styled-components';

// TODO UT just for fun and show benefice of doing CSS in JS
// media query mixin
const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 480
}
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

// variables
export const spacingDefault = '1rem';

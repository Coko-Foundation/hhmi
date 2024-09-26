/* eslint-disable react/no-invalid-html-attribute */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import biointeractiveLogo from '../../../static/biointeractive.svg'

const StyledFooter = styled.footer`
  background-color: ${th('colorBody')};
  color: ${th('colorTextReverse')};
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: space-between;
  padding: ${grid(1)} 0;

  @media screen and (min-width: ${th('mediaQueries.small')}) {
    flex-direction: row;
  }
`

const SiteLogo = styled.a`
  align-self: center;
  background-image: ${`url(${biointeractiveLogo})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 160px 35px;
  display: block;
  height: 35px;
  margin-inline-end: ${grid(5)};
  overflow: hidden;
  width: 160px;

  &:hover,
  &:focus-visible {
    filter: drop-shadow(0 0 5px #0ffb);
  }

  h2 {
    height: 0;
    overflow: hidden;
    width: 0;
  }
`

const FooterList = styled.ul`
  display: flex;
  gap: ${grid(3)};
  margin: 0;
  padding-inline-start: ${grid(2)};

  @media screen and (min-width: ${th('mediaQueries.medium')}) {
    justify-content: right;
  }

  li {
    align-items: center;
    display: inline-flex;
    font-size: clamp(
      ${th('fontSizeBaseSmaller')},
      0.7065rem + 0.2174vw,
      ${th('fontSizeBaseSmall')}
    );
    list-style: none;
    ${({ social }) => social && `display: inline-block;`}

    a {
      color: ${th('colorTextReverse')};
      text-decoration: underline;
      text-decoration-color: ${th('colorTertiary')};

      &:hover,
      &:focus-visible {
        color: ${th('colorTertiary')};
      }
    }
  }
`

const Footer = props => {
  const {
    links: { termsOfUse, privacyPolicy },
    ...rest
  } = props

  return (
    <StyledFooter role="contentinfo" {...rest}>
      <FooterList>
        <li>
          <a href={termsOfUse} rel="terms-of-service external">
            Terms of Use
          </a>
        </li>

        <li>
          <a href={privacyPolicy} rel="privacy-policy external">
            Privacy Policy
          </a>
        </li>
      </FooterList>

      <SiteLogo href="https://www.biointeractive.org/" rel="external">
        <h2>A project of HHMI Biointeractive</h2>
      </SiteLogo>
    </StyledFooter>
  )
}

Footer.propTypes = {
  links: PropTypes.shape({
    termsOfUse: PropTypes.string,
    privacyPolicy: PropTypes.string,
  }),
}

Footer.defaultProps = {
  links: {
    termsOfUse: '#',
    privacyPolicy: '#',
  },
}

export default Footer

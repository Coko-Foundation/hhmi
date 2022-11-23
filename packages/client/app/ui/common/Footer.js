/* stylelint-disable string-quotes */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import logo from '../../../static/hhmi-ab-logo-sm.svg'

const StyledFooter = styled.footer`
  align-items: center;
  background-color: ${th('colorBody')};
  color: ${th('colorTextReverse')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${grid(1)} 0;

  @media screen and (min-width: 720px) {
    flex-direction: row;
    height: 60px;
    padding: 0;
  }
`

const SiteLogo = styled(Link)`
  background-image: ${`url(${logo})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 250px 32px;
  display: block;
  height: 32px;
  margin: 0 calc(4px * 3);
  overflow: hidden;
  width: 250px;

  h1 {
    height: 0;
    overflow: hidden;
    width: 0;
  }

  /* @media screen and (min-width: ${th('mediaQueries.small')}) {
    background-size: 400px 52px;
    height: 52px;
    width: 400px;
  } */

  /* @media (min-width: ${props => props.theme.mediaQueries.large}) {
    background-size: 501px 67px;
    height: 67px;
    width: 501px;
  } */
`

const FooterList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  @media screen and (min-width: ${th('mediaQueries.medium')}) {
    justify-content: right;
  }

  li {
    font-size: ${th('fontSizeBaseSmall')};
    list-style: none;
    margin: 0 ${grid(3)};
    ${({ social }) => social && `display: inline-block;`}

    @media screen and (min-width: ${th('mediaQueries.medium')}) {
      display: inline-flex;
    }

    a {
      color: ${th('colorTextReverse')};

      &:hover {
        color: ${th('colorTertiary')};
      }
    }
  }
`

const Footer = props => {
  const {
    links: { homepage, newsletter, hhmi, termsOfUse, privacyPolicy },
    ...rest
  } = props

  return (
    <StyledFooter role="contentinfo" {...rest}>
      <FooterList>
        <li>
          <a href={newsletter}>Newsletter</a>
        </li>
        <li>
          <a href={hhmi}>HHMI.org</a>
        </li>
        <li>
          <Link to={termsOfUse}>Terms of Use</Link>
        </li>
        <li>
          <Link to={privacyPolicy}>Private Policy</Link>
        </li>
      </FooterList>
      <SiteLogo rel="Home" title="Home" to={homepage}>
        <h1>Assesment Builder</h1>
      </SiteLogo>
    </StyledFooter>
  )
}

Footer.propTypes = {
  links: PropTypes.shape({
    homepage: PropTypes.string,
    twitterUrl: PropTypes.string,
    facebookUrl: PropTypes.string,
    youtubeUrl: PropTypes.string,
    instagramUrl: PropTypes.string,
    newsletter: PropTypes.string,
    hhmi: PropTypes.string,
    termsOfUse: PropTypes.string,
    privacyPolicy: PropTypes.string,
  }),
}

Footer.defaultProps = {
  links: {
    homepage: '#',
    twitterUrl: '#',
    facebookUrl: '#',
    youtubeUrl: '#',
    instagramUrl: '#',
    newsletter: '#',
    hhmi: '#',
    termsOfUse: '#',
    privacyPolicy: '#',
  },
}

export default Footer

/* stylelint-disable string-quotes */
import React from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
// import logo from '../../../static/hhmi-ab-logo-sm.svg'
// import logoSmall from '../../../static/hhmi-logo-white-sm.svg'

const StyledFooter = styled.footer`
  background-color: ${th('colorBody')};
  color: ${th('colorTextReverse')};
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: space-between;
  padding: ${grid(1)} 0;

  @media screen and (min-width: ${th('mediaQueries.small')}) {
    flex-direction: row;
  }
`

// const SiteLogo = styled(Link)`
//   display: none;

//   h1 {
//     height: 0;
//     overflow: hidden;
//     width: 0;
//   }

//   @media screen and (min-width: ${th('mediaQueries.small')}) {
//     background-image: ${`url(${logoSmall})`};
//     background-position: center center;
//     background-repeat: no-repeat;
//     background-size: 65px 32px;
//     display: block;
//     height: 32px;
//     margin: 0 calc(4px * 3);
//     overflow: hidden;
//     width: 65px;
//   }

//   @media screen and (min-width: ${th('mediaQueries.medium')}) {
//     background-image: ${`url(${logo})`};
//     background-position: center center;
//     background-repeat: no-repeat;
//     background-size: 250px 32px;
//     width: 250px;
//   }

//   /* @media screen and (min-width: ${th('mediaQueries.small')}) {
//     background-size: 400px 52px;
//     height: 52px;
//     width: 400px;
//   } */

//   /* @media (min-width: ${props => props.theme.mediaQueries.large}) {
//     background-size: 501px 67px;
//     height: 67px;
//     width: 501px;
//   } */
// `

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
    margin: 0 ${grid(2)};
    ${({ social }) => social && `display: inline-block;`}

    @media screen and (min-width: ${th('mediaQueries.medium')}) {
      display: inline-flex;
      margin: 0 ${grid(3)};
    }

    a {
      color: ${th('colorTextReverse')};
      text-decoration: underline;
      text-decoration-color: ${th('colorTertiary')};

      &:hover {
        color: ${th('colorTertiary')};
      }
    }
  }
`

const Footer = props => {
  const {
    links: {
      // homepage,
      termsOfUse,
      privacyPolicy,
    },
    ...rest
  } = props

  return (
    <StyledFooter role="contentinfo" {...rest}>
      <FooterList>
        <li>
          <a href={termsOfUse} rel="noreferrer" target="_blank">
            Terms of Use
          </a>
        </li>

        <li>
          <a href={privacyPolicy} rel="noreferrer" target="_blank">
            Privacy Policy
          </a>
        </li>
      </FooterList>

      {/* <SiteLogo rel="Home" title="Home" to={homepage}>
        <h1>Assesment Builder</h1>
      </SiteLogo> */}
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
    termsOfUse: '#',
    privacyPolicy: '#',
  },
}

export default Footer

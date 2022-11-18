/* stylelint-disable string-quotes */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import logo from '../../../static/hhmi-ab-logo.svg'
import fb from '../../../static/social-facebook-square.svg'
import fbGreen from '../../../static/social-facebook-square-green.svg'
import twitter from '../../../static/social-twitter.svg'
import twitterGreen from '../../../static/social-twitter-green.svg'
import youtube from '../../../static/social-youtube-play.svg'
import youtubeGreen from '../../../static/social-youtube-play-green.svg'
import insta from '../../../static/social-instagram.svg'
import instaGreen from '../../../static/social-instagram-green.svg'

const StyledFooter = styled.footer`
  background-color: ${th('colorBody')};
  color: ${th('colorTextReverse')};

  > div {
    margin-left: auto;
    margin-right: auto;
    max-width: 1300px;
    padding-left: ${grid(6)};
    padding-right: ${grid(6)};
  }
`

const FooterTop = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${grid(2)} 0;

  @media screen and (min-width: ${props => props.theme.mediaQueries.medium}) {
    flex-direction: row;
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid ${th('colorText')};
  padding: ${grid(2)} 0;
  text-align: center;

  @media screen and (min-width: ${props => props.theme.mediaQueries.medium}) {
    text-align: right;
  }
`

const SiteLogo = styled(Link)`
  background-image: ${`url(${logo})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 250px 32px;
  display: block;
  height: 32px;
  margin-right: 0;
  overflow: hidden;
  width: 250px;

  h1 {
    height: 0;
    overflow: hidden;
    width: 0;
  }

  @media screen and (min-width: ${props => props.theme.mediaQueries.small}) {
    background-size: 400px 52px;
    height: 52px;
    width: 400px;
  }

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

  @media screen and (min-width: 900px) {
    justify-content: right;
  }

  li {
    font-size: ${th('fontSizeBaseSmall')};
    list-style: none;
    margin: 0 ${grid(3)};
    ${({ social }) => social && `display: inline-block;`}

    @media screen and (min-width: 900px) {
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

const SocialLink = styled.a`
  color: transparent;
  display: inline-block;
  font: 0/0;
  height: 45px;
  position: relative;
  text-shadow: none;
  width: 45px;

  &::before,
  &::after {
    background-size: 45px 45px;
    content: '';
    display: block;
    height: 45px;
    left: 0;
    position: absolute;
    top: 0;
    transition: opacity 300ms ease;
    width: 45px;
  }

  &::before {
    background-image: ${({ title }) => {
      switch (title) {
        case 'facebook':
          return `url(${fb})`
        case 'twitter':
          return `url(${twitter})`
        case 'youtube':
          return `url(${youtube})`
        case 'instagram':
          return `url(${insta})`
        default:
          return null
      }
    }};
    opacity: 1;
  }

  &::after {
    background-image: ${({ title }) => {
      switch (title) {
        case 'facebook':
          return `url(${fbGreen})`
        case 'twitter':
          return `url(${twitterGreen})`
        case 'youtube':
          return `url(${youtubeGreen})`
        case 'instagram':
          return `url(${instaGreen})`
        default:
          return null
      }
    }};
    opacity: 0;
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }
`

const Footer = props => {
  const {
    links: {
      homepage,
      twitterUrl,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      newsletter,
      hhmi,
      termsOfUse,
      privacyPolicy,
    },
    ...rest
  } = props

  return (
    <StyledFooter role="contentinfo" {...rest}>
      <div>
        <FooterTop>
          <SiteLogo rel="Home" title="Home" to={homepage}>
            <h1>Assesment Builder</h1>
          </SiteLogo>
          <FooterList social>
            <li>
              <SocialLink href={twitterUrl} target="_blank" title="twitter" />
            </li>
            <li>
              <SocialLink href={facebookUrl} target="_blank" title="facebook" />
            </li>
            <li>
              <SocialLink href={youtubeUrl} target="_blank" title="youtube" />
            </li>
            <li>
              <SocialLink
                href={instagramUrl}
                target="_blank"
                title="instagram"
              />
            </li>
          </FooterList>
        </FooterTop>
        <FooterBottom>
          <FooterList>
            <li>
              <a href={newsletter}>Newsletter Sign Up</a>
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
        </FooterBottom>
      </div>
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

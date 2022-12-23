/* stylelint-disable string-quotes */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import logoMobile from '../../../static/hhmi-logo-white-sm.svg'
import logo from '../../../static/hhmi-ab-logo-sm.svg'
import menuOpen from '../../../static/waffle-white.svg'
import menuClose from '../../../static/close-white.svg'
import Button from './Button'

// #region styles
const StyledHeader = styled.header`
  align-items: center;
  background-color: ${th('colorBody')};
  /* box-shadow: -5px 5px 18px -2px ${th('colorText')}; */
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: ${th('headerPaddingVertical')} ${grid(4)};
  width: 100%;
  z-index: 9;

  @media screen and (min-width: ${th('mediaQueries.medium')}) {
    padding: ${th('headerPaddingVertical')} ${grid(6)};
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    flex-direction: row;
    /* height: 110px; */
    justify-content: unset;
  }
`

const Branding = styled(Link)`
  background-image: ${`url(${logoMobile})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 80px ${th('mobileLogoHeight')};
  display: block;
  height: ${th('mobileLogoHeight')};
  margin-right: 30px;
  overflow: hidden;
  transition: outline 200ms ease-in;
  width: 95px;

  @media screen and (min-width: ${th('mediaQueries.small')}) {
    background-image: ${() => `url(${logo})`};
    background-size: 332px ${th('mobileLogoHeight')};
    width: 340px;
  }

  /* @media screen and (min-width: ${th('mediaQueries.medium')}) {
    background-image: ${() => `url(${logo})`};
    background-size: 332px 44px;
    height: 44px;
    width: 332px;
  } */

  h1 {
    height: 0;
    overflow: hidden;
    width: 0;
  }

  &:hover,
  &:focus {
    outline: 1px solid ${th('colorTextReverse')};
  }
`

const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-basis: 40px;
  height: ${th('mobileLogoHeight')};
  justify-content: center;
  overflow: visible;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    background-color: ${th('colorBody')};
    flex-grow: 1;
    /* height: auto; */
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }
`

const StyledList = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
    color: ${th('colorTextDark')};
    font-size: ${th('fontSizeBase')};
    line-height: 2.5rem;

    > a {
      display: inline-flex;
      width: 100%;
    }
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    align-items: start;
    display: flex;
    height: 3.0625rem;
    padding: ${grid(4)} 0 0 0;

    > li {
      align-items: center;
      color: ${th('colorTextReverse')};
      display: inline-flex;
      line-height: inherit;

      &:not(:first-child:last-child) {
        margin-right: 1rem;
      }
    }
  }
`

const LeftNavContainer = styled.div`
  @media screen and (min-width: ${th('mediaQueries.large')}) {
    display: flex;
    flex-direction: row;
  }
`

const NavLinks = styled.div`
  background-color: ${th('colorBackground')};
  display: none;
  height: calc(
    100vh - (${th('mobileLogoHeight')} + 2 * ${th('headerPaddingVertical')})
  );
  left: 0;
  overflow: auto;
  padding: ${grid(6)} ${grid(4)}; // 1.5rem 1rem;
  position: absolute;
  top: calc(${th('mobileLogoHeight')} + 2 * ${th('headerPaddingVertical')});
  width: 100%;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    background-color: ${th('colorBody')};
    display: flex;
    height: auto;
    justify-content: space-between;
    left: unset;
    overflow: initial;
    padding: 0;
    position: relative;
    top: unset;
  }
`

const StyledLink = styled(Link)`
  color: inherit;
  display: inline-block;
  font-size: inherit;
  font-weight: 700;
  line-height: 1.25;
  overflow-x: hidden;
  padding: 10px 0;
  text-decoration: none;

  span::after {
    background-color: ${th('colorTertiary')};
    content: '';
    display: block;
    height: 2px;
    margin-top: 0;
    transform: translateX(-101%);
    transition: all 200ms ease-out;
    width: 100%;
  }

  &:hover,
  &:focus,
  &[aria-current='page'] {
    color: inherit;

    span::after {
      transform: translateX(0);
    }
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    line-height: 1.5;
    padding: 0;

    span::after {
      background-color: ${th('colorTextReverse')};
    }
  }
`

const StyledLogin = styled(Link)`
  align-items: center;
  background-color: ${th('colorPrimary')};
  border-color: ${th('colorPrimary')};
  border-radius: 3px;
  color: ${th('colorTextReverse')};
  display: flex;
  font-size: ${th('fontSizeBase')};
  height: 40px;
  padding: ${grid(1)} ${grid(4)};
  text-align: left;
  text-decoration: none;
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.3s;
  width: 100%;

  && {
    line-height: 38px;
  }

  &:hover,
  &:focus {
    background-color: ${th('colorSecondary')};
    border-color: ${th('colorSecondary')};
    color: ${th('colorTextReverse')};
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    height: 32px;
    margin-top: ${grid(-1)};

    && {
      line-height: 30px;
    }
  }
`

const MobileMenuToggle = styled.button`
  background-color: ${th('colorBody')};
  background-image: linear-gradient(transparent, transparent),
    ${() => `url(${menuOpen})`};

  &[aria-expanded='true'] {
    background-image: linear-gradient(transparent, transparent),
      ${() => `url(${menuClose})`};
  }

  /* control display of NavLinks only for < medium screens */
  @media screen and (max-width: ${th('mediaQueries.large')}) {
    &[aria-expanded='true'] ~ ${NavLinks} {
      display: block;
    }

    &[aria-expanded='false'] ~ ${NavLinks} {
      display: none;
    }
  }
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 31px 31px;
  border: none;
  cursor: pointer;
  display: block;
  height: 31px;
  overflow: hidden;
  padding: 0;
  transition: outline 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 31px;

  &:hover,
  &:focus {
    outline: 1px solid ${th('colorTextReverse')};
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    display: none;
  }
`

const UserMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  width: 100%;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    height: 32px;
    margin-top: ${grid(-1)};
  }
`

const UserMenuButton = styled(Button)`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  font-weight: 700;
  justify-content: space-between;

  span:not([role='img']) {
    margin-left: 0;
    margin-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span[role='img'] {
    margin-top: 3px;
  }
`

const CollapsableMenu = styled.ul`
  background-color: ${th('colorPrimary')};
  border: none;
  color: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  gap: ${grid(1)};
  list-style: none;
  padding: ${grid(2)} ${grid(4)};
  text-align: left;

  > li > a {
    color: ${th('colorTextReverse')};
    display: inline-flex;
    font-size: ${th('fontSizeBase')};
    width: 100%;
  }
`

const Separator = styled.hr`
  margin: 0 0 ${grid(4)} 0;
  padding: 0;

  &::after {
    background-color: ${th('colorText')};
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    display: none;
  }
`

const SkipLink = styled.a`
  background-color: ${th('colorTextDark')};
  border-radius: 0 0 ${grid(1)} ${grid(1)};
  color: ${th('colorTextReverse')};
  height: 30px;
  left: 50%;
  padding: ${grid(1)} ${grid(2)};
  position: absolute;
  top: -100px;
  transform: translateX(-50%);
  transition: top 300ms ease-in;
  width: auto;
  z-index: 3;

  &:focus {
    top: 0;
  }
`
// #endregion styles

const Header = props => {
  const {
    loggedin,
    canManageUsers,
    canManageTeams,
    currentPath,
    displayName,
    links: {
      homepage,
      questions,
      dashboard,
      // lists,
      about,
      learning,
      manageUsers,
      manageTeams,
      profile,
      login,
    },
    onLogout,
    ...rest
  } = props

  const [showMenu, setShowMenu] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const userMenuOnKeyDown = e => {
    const wrapper = e.currentTarget

    switch (e.code) {
      case 'Escape':
        e.preventDefault()
        setOpenUserMenu(false)
        wrapper.querySelector('button').focus()
        break
      case 'Enter':
      case 'Space':
        setTimeout(() => {
          wrapper.querySelectorAll('#user-menu a')[0].focus()
        }, 50)
        break
      case 'ArrowDown':
        e.preventDefault()

        if (!openUserMenu) {
          setOpenUserMenu(true)
          setTimeout(() => {
            wrapper.querySelectorAll('#user-menu a')[0].focus()
          }, 50)
        } else {
          const listOfLinks = [...wrapper.querySelectorAll('#user-menu a')]

          const currentIndex = listOfLinks.indexOf(document.activeElement)

          listOfLinks[(currentIndex + 1) % listOfLinks.length].focus()
        }

        break

      case 'ArrowUp':
        e.preventDefault()

        if (!openUserMenu) {
          const listOfLinks = [...wrapper.querySelectorAll('#user-menu a')]

          setOpenUserMenu(true)
          setTimeout(() => {
            listOfLinks[listOfLinks.length - 1].focus()
          }, 50)
        } else {
          const listOfLinks = [...wrapper.querySelectorAll('#user-menu a')]

          const currentIndex = listOfLinks.indexOf(document.activeElement)

          listOfLinks[
            (currentIndex + listOfLinks.length - 1) % listOfLinks.length
          ].focus()
        }

        break
      default:
        break
    }
  }

  const userMenuOnBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenUserMenu(false)
    }
  }

  return (
    <StyledHeader role="banner" {...rest}>
      <SkipLink
        // have an href to be valid link
        href="#main-content"
        // focus main element with js to avoid polluting the url with #main-content
        onClick={e => {
          e.preventDefault()
          document.getElementById('main-content').focus()
        }}
      >
        Skip to main content
      </SkipLink>
      <Branding to={homepage}>
        <h1>HHMI BioInterctive Assesent Builder</h1>
      </Branding>
      <Navigation role="navigation">
        <MobileMenuToggle
          aria-controls="main-nav"
          aria-expanded={showMenu}
          aria-label="Menu"
          onClick={() => setShowMenu(!showMenu)}
        />
        <NavLinks id="main-nav">
          <StyledList>
            <li>
              <StyledLink
                aria-current={currentPath === questions ? 'page' : false}
                onClick={() => setShowMenu(false)}
                to={questions}
              >
                <span>Browse Questions</span>
              </StyledLink>
            </li>
            {loggedin && (
              <>
                <li>
                  <StyledLink
                    aria-current={currentPath === dashboard ? 'page' : false}
                    onClick={() => setShowMenu(false)}
                    to={dashboard}
                  >
                    <span>Dashboard</span>
                  </StyledLink>
                </li>
                {/* <li>
                  <StyledLink to={lists}>My Lists</StyledLink>
                </li> */}
              </>
            )}
          </StyledList>
          <Separator />
          <LeftNavContainer>
            <StyledList>
              <li>
                <StyledLink to={about}>
                  <span>About</span>
                </StyledLink>
              </li>
              <li>
                <StyledLink to={learning}>
                  <span>Professional Learning</span>
                </StyledLink>
              </li>
            </StyledList>
            <Separator />
            <StyledList>
              <li>
                {loggedin ? (
                  <UserMenuWrapper
                    onBlur={userMenuOnBlur}
                    onKeyDown={userMenuOnKeyDown}
                  >
                    <UserMenuButton
                      aria-controls="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      icon={openUserMenu ? <UpOutlined /> : <DownOutlined />}
                      onClick={() => setOpenUserMenu(!openUserMenu)}
                      type="primary"
                    >
                      {displayName}
                    </UserMenuButton>
                    <CollapsableMenu
                      aria-label="User menu"
                      id="user-menu"
                      role="menu"
                      style={{ display: openUserMenu ? 'flex' : 'none' }}
                    >
                      {canManageUsers && (
                        <li role="none">
                          <StyledLink
                            aria-current={
                              currentPath === manageUsers ? 'page' : false
                            }
                            onClick={() => {
                              setShowMenu(false)
                              setOpenUserMenu(false)
                            }}
                            role="menuitem"
                            to={manageUsers}
                          >
                            <span>Manage Users</span>
                          </StyledLink>
                        </li>
                      )}
                      {canManageTeams && (
                        <li role="none">
                          <StyledLink
                            aria-current={
                              currentPath === manageTeams ? 'page' : false
                            }
                            onClick={() => {
                              setShowMenu(false)
                              setOpenUserMenu(false)
                            }}
                            role="menuitem"
                            to={manageTeams}
                          >
                            <span>Manage Teams</span>
                          </StyledLink>
                        </li>
                      )}
                      <li role="none">
                        <StyledLink
                          aria-current={
                            currentPath === profile ? 'page' : false
                          }
                          onClick={() => {
                            setShowMenu(false)
                            setOpenUserMenu(false)
                          }}
                          role="menuitem"
                          to={profile}
                        >
                          <span>Profile</span>
                        </StyledLink>
                      </li>
                      <li role="none">
                        <StyledLink
                          onClick={() => {
                            setShowMenu(false)
                            setOpenUserMenu(false)
                            onLogout()
                          }}
                          role="menuitem"
                          to="#"
                        >
                          <span>Logout</span>
                        </StyledLink>
                      </li>
                    </CollapsableMenu>
                  </UserMenuWrapper>
                ) : (
                  <StyledLogin onClick={() => setShowMenu(false)} to={login}>
                    Login
                  </StyledLogin>
                )}
              </li>
            </StyledList>
          </LeftNavContainer>
        </NavLinks>
      </Navigation>
    </StyledHeader>
  )
}

Header.propTypes = {
  loggedin: PropTypes.bool,
  currentPath: PropTypes.string.isRequired,
  // user: PropTypes.shape(),
  canManageUsers: PropTypes.bool,
  canManageTeams: PropTypes.bool,
  displayName: PropTypes.string,
  links: PropTypes.shape({
    homepage: PropTypes.string,
    questions: PropTypes.string,
    dashboard: PropTypes.string,
    lists: PropTypes.string,
    about: PropTypes.string,
    learning: PropTypes.string,
    manageUsers: PropTypes.string,
    manageTeams: PropTypes.string,
    profile: PropTypes.string,
    login: PropTypes.string,
  }),
  onLogout: PropTypes.func,
}

Header.defaultProps = {
  loggedin: false,
  // user: {},
  canManageUsers: false,
  canManageTeams: false,
  displayName: 'User',
  onLogout: () => {},
  links: {
    homepage: '#',
    questions: '#',
    dashboard: '#',
    lists: '#',
    about: '#',
    learning: '#',
    manageUsers: '#',
    manageTeams: '#',
    profile: '#',
    login: '#',
  },
}

export default Header

/* stylelint-disable string-quotes */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th, darken } from '@coko/client'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import logoMobile from '../../../static/hhmi-logo-white-sm.svg'
import manageTeamIcon from '../../../static/team.svg'
import manageUserIcon from '../../../static/manageuser.svg'
import userIcon from '../../../static/user-icon.svg'
import logo from '../../../static/hhmi-ab-logo-sm.svg'
import menuOpen from '../../../static/waffle-white.svg'
import menuClose from '../../../static/close-white.svg'

import Button from './Button'
import useWindowSize from '../_helpers/useWindowSize'
import useKeyboardOnList from '../_helpers/useKeyboardOnList'

// #region styles
const StyledHeader = styled.header`
  align-items: center;
  background-color: ${th('colorBody')};
  box-shadow: 0 0 15px 2px #00000045, inset 0 0 12px #ffffff28;
  display: flex;
  height: 64px;
  justify-content: space-between;
  padding-left: 0;
  width: 100%;
  z-index: 9;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    justify-content: unset;
    padding-left: ${grid(5)};
  }

  @media screen and (min-width: ${th('mediaQueries.small')}) {
    flex-direction: row;
    padding-left: ${grid(3)};
  }
`

const Branding = styled(Link)`
  background: #0000 url(${logoMobile}) no-repeat center / contain;
  display: block;
  filter: drop-shadow(0 0 12px #ff00);
  height: ${th('mobileLogoHeight')};
  margin: 0 1.5rem 0.3rem 0;
  overflow: hidden;
  transition: filter 0.3s ease-in;
  width: 95px;

  @media screen and (min-width: ${th('mediaQueries.small')}) {
    background-image: url(${logo});
    background-size: contain;
    width: 340px;
  }

  h1 {
    height: 0;
    overflow: hidden;
    width: 0;
  }

  &:hover,
  &:focus {
    filter: drop-shadow(0 0 5px #0ff8);
  }
`

const Navigation = styled.nav`
  align-items: center;
  background-color: #0000;
  display: flex;
  flex-basis: 40px;
  height: ${th('mobileLogoHeight')};
  justify-content: center;
  overflow: visible;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    background-color: #0000;
    flex-grow: 1;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }
`

const MainNav = styled.div`
  align-items: center;
  background-color: ${p => (p.show ? '#efefef' : '#c5c5c5')};
  box-shadow: 0 0 10px #0003 ${p => p.open && ', inset 0px 0px 30px #0008'};
  color: #000;
  display: flex;
  height: calc(
    100vh - (${th('mobileLogoHeight')} + 2 * ${th('headerPaddingVertical')})
  );
  justify-content: flex-end;
  overflow: visible;
  position: absolute;
  right: 0;
  top: calc(${th('mobileLogoHeight')} + 2 * ${th('headerPaddingVertical')});
  transition: width 0.3s, padding 0.3s, background-color 0.5s;
  width: ${p => (!p.show ? '0' : '250px')};

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    background-color: #0000;
    flex-direction: row;
    height: auto;
    justify-content: space-between;
    padding: 0;
    position: relative;
    top: 0;
    width: 100%;
  }
`

const NavWrapper = styled.div`
  height: 100%;
  margin: 0;
  overflow: hidden ${p => (p.show ? 'auto' : 'hidden')};
  padding: 1rem 0 1rem 1.5rem;
  top: 0;
  width: 100%;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    > ul:nth-of-type(1) {
      border-left: 1px solid #ffffff34;
      padding-left: 2rem;
    }
    display: contents;
    overflow: hidden;
  }
`

const RightNavContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    flex-direction: row;
  }
`

const StyledList = styled.ul`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  width: 250px;

  > li {
    color: ${th('colorTextDark')};
    font-size: ${th('fontSizeBase')};
    line-height: 2.5rem;

    > a {
      display: flex;
      width: max-content;
    }
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    align-items: center;
    background-color: #0000;
    display: flex;
    flex-direction: row;
    height: 2.5rem;
    padding: 0 0 0 1rem;
    width: fit-content;

    > li {
      align-items: center;
      color: ${th('colorTextReverse')};
      display: flex;
      line-height: inherit;

      &:not(:first-child:last-child) {
        margin-right: 1rem;
      }
    }
  }
`

const StyledLink = styled(Link)`
  color: black;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 900;
  line-height: 1.25;
  overflow-x: hidden;
  padding: 10px 0;
  text-decoration: none;
  width: max-content;

  &.info {
    color: #000;
    font-size: 0.8rem;
    font-weight: 300;

    &:hover {
      color: #8ebbbd;
    }

    span::after {
      background-color: #8ebbbd;
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
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
    color: #fff;
    padding: 0;
    width: 200px;

    &.info {
      color: #8ebbbd;
    }

    span::after {
      background-color: #eee;
    }
  }
`

const StyledButton = styled(Button)`
  background: none;
  border: none;
  color: ${th('colorTextReverse')};
  display: inline-block;
  font-size: inherit;
  font-weight: 700;
  line-height: 1.25;
  overflow-x: hidden;
  padding: 10px 0;
  text-align: start;
  transition: none;
  width: max-content;

  /* stylelint-disable-next-line no-descending-specificity */
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
  &:focus {
    top: 0;

    span {
      &::after {
        transform: translateX(0);
      }
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
  color: ${th('colorTextReverse')};
  display: flex;
  font-size: ${th('fontSizeBase')};
  height: 32px;
  padding: ${grid(1)} ${grid(4)};
  text-align: center;
  text-decoration: none;
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.3s;
  width: 100%;

  &:hover,
  &:focus {
    background-color: ${th('colorSecondary')};
    border-color: ${th('colorSecondary')};
    color: ${th('colorTextReverse')};
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    height: 32px;
    margin-right: ${grid(5)};
  }
`

const MobileMenuToggle = styled.button`
  aspect-ratio: 1 / 1;
  background-color: ${th('colorBody')};
  background-image: url(${menuOpen});

  &[aria-expanded='true'] {
    background-image: url(${menuClose});
  }

  background-size: cover;
  border: none;
  cursor: pointer;
  display: block;
  margin-right: ${grid(5)};
  overflow: hidden;
  padding: 0;
  transition: filter 300ms;
  width: 25px;

  &:hover {
    filter: drop-shadow(0 0 3px #0ff6);
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    display: none;
  }
`

const UserMenuWrapper = styled.div`
  align-items: flex-start;
  border: none;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-right: ${grid(2)};
  width: 100%;

  > p {
    color: ${darken('colorPrimary', 0.4)};
    margin: 0;
    padding: 0 0 0 0.5rem;
    width: max-content;
  }

  .ant-btn:not(:disabled):focus-visible {
    filter: drop-shadow(0 0 2px #5edfff55);
    outline-color: #0000;
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    align-items: center;
    border-left: 1px solid #34f1ff62;
    flex-direction: row;
    gap: 0.3rem;
    height: 40px;

    p {
      border-radius: 0.5rem;
      color: ${th('colorPrimaryBorder')};
      margin: 0;
      padding: 0 0.5rem 0 1rem;
    }
  }
`

const UserMenuButton = styled(Button)`
  display: none;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    align-items: center;
    background: #0000 url(${userIcon}) no-repeat center / contain;
    border: none;
    border-radius: 100% 100% 0.5rem;
    display: flex;
    height: 32px;
    margin-right: 10px;
    width: 32px;

    &:hover,
    &:focus-visible,
    &:active {
      background-color: transparent;
      filter: drop-shadow(0 0 2px #5edfff55);
      transform: scale(1.05);
    }
  }
`

const CollapsableMenu = styled.ul`
  align-items: flex-start;
  background-color: #0000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin: 0;
  max-height: 1000px;
  overflow: hidden;
  padding: 0;
  transition: none;

  > li {
    display: flex;
    line-height: 1rem;
    margin: 0;
    padding: 0;
    width: 100%;

    > a,
    button {
      color: ${darken('colorPrimary', 0.25)};
      font-size: 0.9rem;
      font-weight: 600;

      &:hover {
        > span {
          color: ${th('colorPrimary')};
        }
      }

      /* stylelint-disable-next-line no-descending-specificity */
      & span::after {
        background-color: ${th('colorPrimary')};
      }
    }
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    background-color: ${darken('colorPrimary', 0.3)};
    border-radius: 0 0 0 0.5rem;
    box-shadow: 0 0 12px #0006, inset 0 0 25px #0004;
    color: ${th('colorBackground')};
    left: calc(100% - 250px + ${grid(4)});
    max-height: ${p => (!p.isOpen ? '0' : '1000px')};
    padding-left: 0.5rem;
    position: absolute;
    top: 52px;
    transition: max-height 0.3s;
    width: 250px;
    will-change: max-height;

    > li {
      /* stylelint-disable-next-line no-descending-specificity */
      & span::after {
        background-color: #7fdbff;
      }

      > a,
      button {
        color: ${th('colorTextReverse')};
        display: inline-flex;
        height: inherit;
        margin: 0 0.5rem;
        padding: ${grid(2)} 0;
        transition: background-color 0.3s;
        width: inherit;

        &:focus,
        &:hover,
        &:active,
        &:focus-visible {
          color: #7fdbff;

          > span {
            color: #7fdbff;
          }
          /* outline-color: #0000; */
        }
      }

      :not(:last-child) {
        border-bottom: 1px solid #0002;
      }
    }
  }
`

const Separator = styled.hr`
  height: 2px;
  margin: ${grid(2)};
  padding: 0;
  width: 90%;

  &::after {
    background-color: #0002;
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

const StyledIcon = styled.img`
  filter: brightness(20%);
  margin: 0 0.5rem;
  object-fit: contain;
  width: 16px;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    filter: none;
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
    links,
    onLogout,
    ...rest
  } = props

  const [showMenu, setShowMenu] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const { width: windowWidth } = useWindowSize()

  const userMenuKeyDown = useKeyboardOnList({
    /* to avoid conflicts between both menues that shares some of their links */
    enabled: windowWidth >= 1200,
    setOpen: setOpenUserMenu,
    isOpen: openUserMenu,
    menuItems: [
      ...document.querySelectorAll('#user-menu [aria-label="menu-link"]'),
    ],
    openButton: document.querySelector('button[aria-controls="user-menu"]'),
    additionalKeys: action => {
      return {
        PageUp: action.selectFirst,
        PageDown: action.selectLast,
      }
    },
  })

  const mainNavKeyDown = useKeyboardOnList({
    enabled: windowWidth < 1200,
    setOpen: setShowMenu,
    isOpen: showMenu,
    menuItems: [...document.querySelectorAll('[aria-label="menu-link"]')],
    openButton: document.querySelector('[aria-label="Menu"]'),
    overrideKeys: action => {
      return {
        Escape: action.close,
        Enter: action.select,
        ArrowUp: action.moveUpLoop,
        ArrowDown: action.moveDownLoop,
        ArrowLeft: action.open,
        ArrowRight: action.close,
        PageUp: action.goToFirst,
        PageDown: action.goToLast,
      }
    },
  })

  const handleMainNavBlur = e => {
    !e.currentTarget.contains(e.relatedTarget)
      ? hideMenu()
      : e.currentTarget.focus()
  }

  const handleUserMenuBlur = e => {
    !e.currentTarget.contains(e.relatedTarget) && setOpenUserMenu(false)
  }

  const hideMenu = () => showMenu && setShowMenu(false)

  const linksUI = {
    navigation: [
      {
        link: links.questions,
        text: 'Browse Questions',
      },
      {
        link: links.dashboard,
        text: 'My Questions',
        renderIf: loggedin,
      },
      {
        link: links.sets,
        text: 'My Sets',
        renderIf: loggedin,
      },
      {
        link: links.lists,
        text: 'My Lists',
        renderIf: loggedin,
      },
    ],
    info: [
      {
        link: links.about,
        text: 'About',
        className: 'info',
      },
      {
        link: links.learning,
        text: 'Professional Learning',
        className: 'info',
      },
    ],
    userLinks: [
      {
        link: links.manageUsers,
        text: 'Manage Users',
        click: () => setOpenUserMenu(false),
        renderIf: canManageUsers,
        icon: <StyledIcon src={manageUserIcon} />,
      },
      {
        link: links.manageTeams,
        text: 'Manage Teams',
        click: () => setOpenUserMenu(false),
        renderIf: canManageTeams,
        icon: <StyledIcon src={manageTeamIcon} />,
      },
      {
        link: links.profile,
        text: 'Profile',
        click: () => setOpenUserMenu(false),
        icon: <EditOutlined style={{ margin: '0 .5rem' }} />,
      },
      {
        text: 'Logout',
        click: () => {
          setOpenUserMenu(false)
          onLogout()
        },
        icon: <LogoutOutlined style={{ margin: '0 .5rem' }} />,
        Component: StyledButton,
        'data-testid': 'logout-btn',
      },
    ],
  }

  const renderLinks = sourceLinks => (
    <>
      {[...sourceLinks].map(
        ({
          link,
          text,
          click,
          icon,
          renderIf = true,
          Component = StyledLink,
          ...remaining
        }) =>
          renderIf && (
            <li key={`${text}-link`}>
              {icon}
              <Component
                aria-current={currentPath === link ? 'page' : false}
                aria-label="menu-link"
                onClick={click}
                to={link}
                {...remaining}
              >
                <span>{text}</span>
              </Component>
            </li>
          ),
      )}
    </>
  )

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
      <Branding to={links.homepage}>
        <h1>HHMI BioInterctive Assessment Builder</h1>
      </Branding>
      <Navigation
        onBlur={handleMainNavBlur}
        onKeyDown={mainNavKeyDown}
        role="navigation"
      >
        <MobileMenuToggle
          aria-controls="main-nav"
          aria-expanded={showMenu}
          aria-label="Menu"
          data-testid="nav-toggle"
          onClick={() => setShowMenu(!showMenu)}
        />
        <MainNav id="main-nav" show={showMenu}>
          <NavWrapper show={showMenu}>
            <StyledList>{renderLinks(linksUI.navigation)}</StyledList>
            <Separator />
            <RightNavContainer>
              <StyledList>{renderLinks(linksUI.info)}</StyledList>
              <Separator />
              <StyledList>
                {loggedin ? (
                  <UserMenuWrapper
                    onBlur={handleUserMenuBlur}
                    onKeyDown={userMenuKeyDown}
                  >
                    <p>{displayName}</p>
                    <UserMenuButton
                      aria-controls="user-menu"
                      aria-expanded={openUserMenu}
                      aria-haspopup="true"
                      data-testid="usermenu-btn"
                      onClick={() => setOpenUserMenu(!openUserMenu)}
                    />
                    <CollapsableMenu
                      aria-label="User menu"
                      id="user-menu"
                      isOpen={openUserMenu}
                      role="menu"
                    >
                      {renderLinks(linksUI.userLinks)}
                    </CollapsableMenu>
                  </UserMenuWrapper>
                ) : (
                  <StyledLogin onClick={hideMenu} to={links.login}>
                    Login
                  </StyledLogin>
                )}
              </StyledList>
            </RightNavContainer>
          </NavWrapper>
        </MainNav>
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
  links: PropTypes.objectOf(PropTypes.string),
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
    sets: '#',
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

/* stylelint-disable string-quotes */
import React, { useEffect, useState } from 'react'
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
import { CounterBadge } from '../notifications/NotificationIcon'
import { UserNotificationsUI } from '../notifications/UserNotificationsUI'

// #region styleds
const StyledHeader = styled.header`
  align-items: center;
  background-color: ${th('colorBody')};
  box-shadow: 0 0 15px 2px #00000045, inset 0 0 12px #ffffff28;
  display: flex;
  height: 64px;
  justify-content: space-between;
  padding-left: 0;
  width: 100%;
  z-index: 99;

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
  z-index: 9999;

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
  box-shadow: 0 0 10px #0003;
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
  transition: width 0.3s, padding 0.3s, background-color 0.5s, visibility 0.3s;

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

/* To achieve vertical scrolling if the menu is open on small height devices */
const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  overflow: hidden ${p => (p.show ? 'auto' : 'hidden')};
  padding: 1rem 0.5rem;
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
  height: 100%;
  justify-content: space-between;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    align-items: center;
    flex-direction: row;
    height: unset;
    justify-content: unset;
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
  width: 270px;

  > li {
    color: ${th('colorTextDark')};
    font-size: ${th('fontSizeBase')};
    line-height: 2.5rem;
    padding-left: 1rem;

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
      padding-left: 0;

      &:not(:first-child:last-child) {
        margin-right: 1rem;
      }
    }
  }
`

const StyledLink = styled(Link)`
  color: black;
  display: inline-block;
  font-size: ${th('fontSizeBase')};
  font-weight: 900;
  line-height: 1.25;
  overflow-x: hidden;
  padding: 10px 0;
  text-decoration: none;
  width: max-content;

  &.info {
    color: #000;
    font-size: ${th('fontSizeBaseSmall')};
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
  width: fit-content;

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
  background-size: cover;

  border: none;
  cursor: pointer;
  display: flex;
  margin-right: ${grid(5)};
  padding: 0;
  position: relative;
  transition: filter 300ms;
  width: 25px;

  &:focus {
    outline: 1px solid white;
    outline-offset: 1px;
  }

  &[aria-expanded='true'] {
    background-image: url(${menuClose});
  }

  @media screen and (max-width: ${th('mediaQueries.large')}) {
    &[aria-expanded='true'] ~ ${MainNav} {
      background-color: #efefef;
      visibility: visible;
      width: 250px;
    }

    &[aria-expanded='false'] ~ ${MainNav} {
      background-color: #efefef;
      visibility: hidden;
      width: 0;
    }
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    display: none;

    &[aria-expanded='true'] ~ ${MainNav} {
      background-color: #0000;
      width: 100%;
    }

    &[aria-expanded='false'] ~ ${MainNav} {
      background-color: #0000;
      width: 100%;
    }
  }
`

const UserMenuWrapper = styled.div`
  align-items: flex-start;
  border: none;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-right: ${grid(2)};
  position: relative;
  width: 100%;

  > p {
    color: ${th('colorSecondary')};
    margin: 0;
    padding: 0 0 0 0.5rem;
    /* position: absolute; */
    top: 5px;
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
      color: ${th('colorSelection')};
      margin: 0;
      padding: 0 0.5rem 0 1rem;
      position: initial;
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
  width: 100%;

  > li {
    display: flex;
    line-height: 1rem;
    margin: 0;
    padding: 0;
    white-space: nowrap;
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
    /* left: calc(100% - 250px + ${grid(4)}); */
    /* max-height: ${p => (!p.isOpen ? '0' : '1000px')}; */
    position: absolute;
    right: -10px;
    top: 52px;
    transition: max-height 0.3s, visibility 0.3s;
    width: 250px;
    will-change: max-height;

    > li {
      padding-left: 0.3rem;
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
        width: inherit;

        &:focus,
        &:hover,
        &:active,
        &:focus-visible {
          color: #7fdbff;
          outline-color: #0000;

          > span {
            color: #7fdbff;
            outline-color: #0000;
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
    position: relative;
    width: 32px;

    &:hover,
    &:focus-visible,
    &:active {
      background-color: transparent;
      transform: scale(1.05);
    }

    &[aria-expanded='true'] + ${CollapsableMenu} {
      max-height: 1000px;
      visibility: visible;
    }

    &[aria-expanded='false'] + ${CollapsableMenu} {
      max-height: 0;
      visibility: hidden;
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
// #endregion styleds

const LinksList = ({
  sourceLinks,
  currentPath,
  listWrapper,
  renderCondition,
}) => {
  const [Wrapper, wrapperProps = {}] = listWrapper
  return (
    renderCondition && (
      <Wrapper {...wrapperProps}>
        {[...sourceLinks].map(
          ({
            link,
            text,
            click,
            icon,
            renderIf = true,
            Component = StyledLink,
            ariaCurrent = currentPath === link ? 'page' : false,
            className = 'menu-link',
            ...remaining
          }) =>
            renderIf && (
              <li key={`${text}-link`}>
                {icon}
                <Component
                  aria-current={ariaCurrent}
                  className={className}
                  to={link}
                  {...remaining}
                >
                  <span>{text}</span>
                </Component>
              </li>
            ),
        )}
      </Wrapper>
    )
  )
}

const createHeaderLinksObject = ({
  links,
  loggedin,
  onClick,
  canManageUsers,
  canManageTeams,
  onLogout,
  windowWidth,
  pendingTsks,
  unreadMentions,
}) => {
  return {
    navigation: [
      {
        link: links.questions,
        text: 'Browse Items',
        onClick,
      },
      {
        link: links.dashboard,
        text: 'Dashboard',
        renderIf: loggedin,
        onClick,
      },
      {
        link: links.sets,
        text: 'My Sets',
        renderIf: loggedin,
        onClick,
      },
      {
        link: links.lists,
        text: 'My Lists',
        renderIf: loggedin,
        onClick,
      },
    ],
    info: [
      {
        link: links.about,
        text: 'About',
        className: 'menu-link info',
        onClick,
      },
      {
        link: links.learning,
        text: 'Professional Learning',
        className: 'menu-link info',
        onClick,
      },
    ],
    userLinks: [
      {
        link: links.manageUsers,
        text: 'Manage Users',
        onClick,
        renderIf: canManageUsers,
        icon: <StyledIcon alt="manage users" src={manageUserIcon} />,
      },
      {
        link: links.manageTeams,
        text: 'Manage Teams',
        onClick,
        renderIf: canManageTeams,
        icon: <StyledIcon alt="manage team" src={manageTeamIcon} />,
      },
      {
        link: links.profile,
        text: 'Profile',
        onClick,
        icon: <EditOutlined style={{ margin: '0 .5rem' }} />,
      },
      {
        text: 'Logout',
        onClick: () => {
          onClick(false)
          onLogout()
        },
        icon: <LogoutOutlined style={{ margin: '0 .5rem' }} />,
        Component: StyledButton,
        'data-testid': 'logout-btn',
      },
      {
        Component: UserNotificationsUI,
        link: [links.messages, links.tasks],
        mediaBreak: windowWidth >= 1200,
        tasks: pendingTsks,
        renderIf: loggedin,
        unreadMentions,
        onClick,
      },
    ],
  }
}

const Header = props => {
  const {
    loggedin,
    canManageUsers,
    canManageTeams,
    currentPath,
    displayName,
    links,
    onLogout,
    unreadMentions,
    ...rest
  } = props

  const notificationsTotal = unreadMentions
  const { width: windowWidth } = useWindowSize()

  const [userMenuIsOpen, setUserMenuOpen] = useState(false)
  const [mainMenuIsOpen, setMainMenuOpen] = useState(false)

  const closeMenus = () => {
    mainMenuIsOpen && setMainMenuOpen(false)
    userMenuIsOpen && setUserMenuOpen(false)
  }

  const linksObject = createHeaderLinksObject({
    ...props,
    onClick: closeMenus,
  })

  useEffect(() => {
    const closeOnClickOutside = e => {
      const userMenuButton = document.querySelector(
        'button[aria-controls="user-menu"]',
      )

      const navMenuButton = document.querySelector(
        'button[aria-controls="main-nav"]',
      )

      if (
        userMenuButton?.getAttribute('aria-expanded') === 'true' &&
        !userMenuButton.contains(e.target) &&
        document.querySelector('#user-menu') !== e.target &&
        !document.querySelector('#user-menu')?.contains(e.target)
      ) {
        setUserMenuOpen(false)
      } else if (
        navMenuButton?.getAttribute('aria-expanded') === 'true' &&
        !navMenuButton.contains(e.target) &&
        document.querySelector('#main-nav') !== e.target &&
        !document.querySelector('#main-nav')?.contains(e.target)
      ) {
        setMainMenuOpen(false)
      }
    }

    const closeOnEscape = e => {
      const userMenuButton = document.querySelector(
        'button[aria-controls="user-menu"]',
      )

      const navMenuButton = document.querySelector(
        'button[aria-controls="main-nav"]',
      )

      if (e.key === 'Escape') {
        if (userMenuButton.getAttribute('aria-expanded') === 'true') {
          setUserMenuOpen(false)

          if (
            document
              .querySelector('#user-menu')
              .contains(document.activeElement)
          ) {
            userMenuButton?.focus()
          }
        } else if (navMenuButton.getAttribute('aria-expanded') === 'true') {
          setMainMenuOpen(false)

          if (
            document.querySelector('#main-nav').contains(document.activeElement)
          ) {
            navMenuButton?.focus()
          }
        }
      }
    }

    document.addEventListener('keyup', closeOnEscape)

    document.addEventListener('mouseup', closeOnClickOutside)

    return () => {
      document.removeEventListener('keyup', closeOnEscape)
      document.removeEventListener('mouseup', closeOnClickOutside)
    }
  }, [])

  return (
    <StyledHeader id="main-page-header" role="banner" {...rest}>
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
      <Navigation aria-label="Site navigation" role="navigation">
        <MobileMenuToggle
          aria-controls="main-nav"
          aria-expanded={mainMenuIsOpen}
          aria-label="Toggle menu"
          data-testid="nav-toggle"
          onClick={() => setMainMenuOpen(!mainMenuIsOpen)}
        >
          <CounterBadge
            $pos="-5px 0 0 -8px"
            $scale="0"
            $show={loggedin && !mainMenuIsOpen && notificationsTotal > 0}
            counts={notificationsTotal}
          />
        </MobileMenuToggle>
        <MainNav id="main-nav">
          <NavWrapper data-testid="nav-wrapper" show={mainMenuIsOpen}>
            <LinksList
              currentPath={currentPath}
              sourceLinks={linksObject.navigation}
            />
            <Separator />
            <RightNavContainer>
              <LinksList
                currentPath={currentPath}
                renderCondition={windowWidth >= 1200}
                sourceLinks={linksObject.info}
              />
              {loggedin ? (
                <UserMenuWrapper>
                  <p>{displayName}</p>
                  <UserMenuButton
                    aria-controls="user-menu"
                    aria-expanded={userMenuIsOpen}
                    aria-haspopup="true"
                    aria-label="Toggle user menu"
                    data-testid="usermenu-btn"
                    onClick={() => setUserMenuOpen(!userMenuIsOpen)}
                  >
                    <CounterBadge
                      $pos="auto -4px -4px auto;"
                      $show={!userMenuIsOpen && notificationsTotal > 0}
                      counts={notificationsTotal}
                    />
                  </UserMenuButton>
                  <LinksList
                    currentPath={currentPath}
                    listWrapper={[
                      CollapsableMenu,
                      {
                        'aria-label': 'User menu',
                        id: 'user-menu',
                        isOpen: userMenuIsOpen,
                      },
                    ]}
                    sourceLinks={linksObject.userLinks}
                  />
                </UserMenuWrapper>
              ) : (
                <StyledLogin onClick={closeMenus} to={links.login}>
                  Login
                </StyledLogin>
              )}
              <LinksList
                currentPath={currentPath}
                renderCondition={windowWidth < 1200}
                sourceLinks={linksObject.info}
              />
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
  canManageUsers: PropTypes.bool,
  canManageTeams: PropTypes.bool,
  displayName: PropTypes.string,
  links: PropTypes.objectOf(PropTypes.string),
  onLogout: PropTypes.func,
  unreadMentions: PropTypes.number,
}

Header.defaultProps = {
  loggedin: false,
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
  unreadMentions: 0,
}

LinksList.propTypes = {
  sourceLinks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  currentPath: PropTypes.string,
  listWrapper: PropTypes.oneOfType([PropTypes.array]),
  renderCondition: PropTypes.bool,
}

LinksList.defaultProps = {
  currentPath: '',
  listWrapper: [StyledList, {}],
  renderCondition: true,
}

export default Header

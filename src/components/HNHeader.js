import React from 'react'

// import hnLogoGif from "../assets/imgs/hn-logo.gif"

import { Link, NavLink } from 'react-router-dom'

import styled from 'styled-components'

const HNLogo = styled.div`
margin-right: 6px;
border: 1px solid white;

@media only screen and (min-width: 250px) and (max-width: 768px) {
  & {
    margin-right: 12px;
  }
}
`;

const Header = styled.header`
padding: 0 2px;
background: var(--hn-dark-orange);

.hacker-news {
  font-size: 14px;
  font-weight: 700;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  & {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  
  .hacker-news {
    font-size: 17px;
  }

  nav, .login {
    font-size: 14px;
  }

  .hn-menu {
    line-height: 1.12em;
  }
}

@media only screen and (min-width: 768px) {
  nav {
    font-size: 16px;
  }
}
`;

const StyledLink = styled(Link)`
text-decoration: none;
display: block;

color: var(--hn-text-dark);

&:hover {
  color: var(--hn-text-dark);
  text-decoration: none;
}

&:visited {
  color: var(--hn-text-dark);
}
`;

const StyledNavLink = styled(NavLink)`
text-decoration: none;
display: block;

color: var(--hn-text-dark);

&:hover {
  color: var(--hn-text-dark);
  text-decoration: none;
}

&:visited {
  color: var(--hn-text-dark);
}

animation: none !important;
transition: none !important;
padding: 0;

&.router-link-active {
  color: var(--hn-text-light);
}
`;

const Login = styled.div`
float: right;
`;

export default () => {
  return (
    <Header className="d-flex flex-row align-items-center hn-header">
      <div className="d-flex flex-row mr-auto align-items-center hn-menu-left">
        <HNLogo className="hn-logo">
          <StyledLink to="/news" ><img src='/hn-logo.gif' className="d-block" /></StyledLink>
        </HNLogo>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center hn-menu">
          <StyledLink to="/news" className="mr-2">
            <div className="hacker-news m-0">
              Hacker News
            </div>
          </StyledLink>
          <nav>
            <ul className="m-0 list-unstyled d-flex flex-row flex-wrap">
              <li className="nav-item">
                <StyledNavLink to="/newest" className="nav-link" activeClassName="router-link-active">new</StyledNavLink>
              </li>
              <li className="mx-1">|</li>
              <li className="nav-item">
                <StyledNavLink to="/past" className="nav-link" activeClassName="router-link-active">past</StyledNavLink>
              </li>
              <li className="mx-1">|</li>
              <li className="nav-item">
                <StyledNavLink to="/comments" className="nav-link" activeClassName="router-link-active">comments</StyledNavLink>
              </li>
              <li className="mx-1">|</li>
              <li className="nav-item">
                <StyledNavLink to="/ask" className="nav-link" activeClassName="router-link-active">ask</StyledNavLink>
              </li>
              <li className="mx-1">|</li>
              <li className="nav-item">
                <StyledNavLink to="/show" className="nav-link" activeClassName="router-link-active">show</StyledNavLink>
              </li>
              <li className="mx-1">|</li>
              <li className="nav-item">
                <StyledNavLink to="/jobs" className="nav-link" activeClassName="router-link-active">jobs</StyledNavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Login className="hn-menu-right hn-login mr-2">login</Login>
    </Header>
  )
}
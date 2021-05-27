import React from 'react'

import styled from 'styled-components'

const Footer = styled.footer`
ul {
  font-size: 12px;
}

a {
  color: var(--hn-text-dark);
  text-decoration: none;
}
`;

export default () => {
  return (
    <Footer className="py-3">
      <ul className="mb-3 m-0 list-unstyled d-flex flex-row justify-content-center">
        <li>
          <a href="https://news.ycombinator.com/newsguidelines.html">Guidelines</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="https://news.ycombinator.com/newsfaq.html">FAQ</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="mailto:hn@ycombinator.com">Support</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="https://github.com/HackerNews/API">API</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="https://news.ycombinator.com/security.html">Security</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="https://news.ycombinator.com/lists">Lists</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="https://news.ycombinator.com/bookmarklet.html">Bookmarklet</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="https://www.ycombinator.com/legal/">Legal</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="https://www.ycombinator.com/apply/">Apply to YC</a>
        </li>
        <li>
            &nbsp;|&nbsp;
        </li>
        <li>
          <a href="mailto:hn@ycombinator.com">Contact</a>
        </li>
      </ul>
      <div className="algolia">
        <form className="d-flex px-3 flex-column flex-md-row justify-content-md-center align-items-center" id="algolia-search-form" method="get" action="//hn.algolia.com/">
          <span className="mr-md-1">Search:</span>
          <input className="col-12 col-md-4" type="text" name="algolia-search" id="algolia-search" defaultValue="" />
        </form>
      </div>
    </Footer>
  )
}
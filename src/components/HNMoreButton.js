import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

const StyledButton = styled.button`
color: var(--hn-text-dark);
font-family: "Verdana", sans-serif;

outline: none;
border: none;
background: transparent;
padding: 0;

a {
  color: var(--hn-text-dark);
  text-decoration: none;
}

a:hover {
  color: var(--hn-text-dark);
  text-decoration: none;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  & {
    font-size: 16px;
  }
}
`;

export default ({ page, handleClick }) => {
  return (
    <StyledButton>
      <Link to={`?page=${page + 1}`} onClick={handleClick} className="more">
        More
      </Link>
    </StyledButton>
  );
}
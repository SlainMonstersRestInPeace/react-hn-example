import React from 'react'

import { calculateDateFromMs } from '../util'
import { extractDomain } from '../util'

import styled from 'styled-components'

const StoryItem = styled.article`
* {
  font-family: "Verdana", sans-serif
}

.linky {
  font-size: 12px;
font-weight: normal;
color: var(--hn-text-dark);
text-decoration: none;
}
`;

const StoryNumber = styled.div`
font-size: 12px;
font-weight: normal;
color: var(--hn-text-dark);

a {
  color: var(--hn-text-dark);
  text-decoration: none;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  font-size: 15px;
}
`;

const StoryTitle = styled.span`
font-size: 12px;
font-weight: normal;
color: var(--hn-text-dark);

a {
  color: var(--hn-text-dark);
  text-decoration: none;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  font-size: 15px;
}
`;

const StoryUrl = styled.span`
font-size: 11px;
color: var(--hn-text-gray);

a {
  color: var(--hn-text-gray);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
`;

const StoryInfo = styled.div`
color: var(--hn-text-gray);
font-size: 10px;

a {
  color: var(--hn-text-gray);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  font-size: 12px;
}
`;

export default ({
  title,
  url,
  author,
  points,
  type,
  created_at_i,
  num_comments,
  number
}) => {
  const childrenLabel = num_comments && num_comments > 0 ? `${num_comments} comments` : 'discuss';
  const domainUrl = url && url !== "" ? (
    <StoryUrl className="story-url">
      <a className="link" href="#">({`${extractDomain(url)}`})</a>
    </StoryUrl>
  ) : null;

  const date = calculateDateFromMs(created_at_i);

  return (
    <StoryItem className="story-item hn-item mb-1 d-flex flex-row align-items-baseline">
      <StoryNumber className="mr-1">
        <span className="story-number">{number}.</span>
        {' '}
        <span className="vote-up"></span>
      </StoryNumber>
      <div className="story-content">
        <header className="story-header">
          <StoryTitle className="story-title">
            <a href={url || "#"}>{title}</a>
            <span>&nbsp;</span>
          </StoryTitle>
          {domainUrl}
        </header>
        <StoryInfo className="story-info">
          <span className="story-points">
            {points} points by
          </span>{' '}
          <span className="story-author" >
            <a className="link" href="#">{author}</a>
          </span>{' '}
          <span className="story-date">
            <a className="link" href="#">{date}</a>
          </span>{' '}
          <div className="story-actions d-inline-block">
            <span>|</span>{' '}
            <a className="link story-hide" href="#">
              hide
            </a>
            {' '}<span>|</span>{' '}
            <a className="link story-past" href="#">
              past
            </a>
            {' '}<span>|</span>{' '}
            <a className="link story-discuss" href="#">
              {childrenLabel}
            </a>
          </div>
        </StoryInfo>
      </div>
    </StoryItem>
  );
}
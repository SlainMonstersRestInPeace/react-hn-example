import React, { Component } from 'react'

import { calculateDateFromMs } from '../util'
import { extractDomain } from '../util'

import styled from 'styled-components'

const JobItem = styled.article`
* {
  font-family: "Verdana", sans-serif
}
`;

const JobHeader = styled.header`
line-height: 1em;
`;

const JobTitle = styled.span`
font-size: 12px;
font-weight: normal;
color: var(--hn-text-dark);

a {
  font-size: 12px;
  font-weight: normal;
  color: var(--hn-text-dark);

  text-decoration: none;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  &, a {
    font-size: 16px;
  }
}
`;

const JobUrl = styled.span`
font-size: 11px;
color: var(--hn-text-gray);

a {
  font-size: 11px;
  color: var(--hn-text-gray);

  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
`;

const JobDate = styled.div`
font-size: 10px;
color: var(--hn-text-gray);

a {
  font-size: 10px;
  color: var(--hn-text-gray);

  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}


@media only screen and (min-width: 250px) and (max-width: 768px) {
  &, a {
    font-size: 12px;
  }
}
`;


export default ({
  title,
  url,
  created_at_i,
}) => {
  const domainUrl = url && url !== "" ? (
    <JobUrl className="job-url">
      <a className="link" href="#">({`${extractDomain(url)}`})</a>
    </JobUrl>
  ) : null

  const date = calculateDateFromMs(created_at_i);

  return (
    <JobItem className="hn-item job-item mb-1">
      <JobHeader className="job-header">
        <JobTitle className="job-title">
          <a href={url}>{title}</a>
        </JobTitle>
        &nbsp;{domainUrl}
      </JobHeader>
      <div className="job-info">
        <JobDate className="job-date">
          <a className="link" href="#">{date}</a>
        </JobDate>
      </div>
    </JobItem>
  )
}

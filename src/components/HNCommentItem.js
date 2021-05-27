import React from 'react'

import { calculateDateFromMs } from '../util'

import  styled from 'styled-components'

const CommentHeader = styled.div`
&, a {
  font-size: 12px;
  color: var(--hn-text-gray);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
`;

const CommentText = styled.div`
font-size: 13px;
line-height: 1.25em;

@media only screen and (min-width: 250px) and (max-width: 768px) {
  &, .comment-text a {
    font-size: 15px;
  }
}
`;

export default ({
  author,
  story_title,
  story_url,
  comment_text,
  created_at_i,
  number
}) => {
  const date = calculateDateFromMs(created_at_i);

  return (
    <div className="hn-item hn-comment mb-3">
      <CommentHeader className="comment-header">
        <ul className="comment-info list-unstyled d-flex mb-1">
          <li>
            <div className="vote-up"></div>
          </li>
          &nbsp;
          <li>
            <div className="comment-by">
              <a className="link" href="#">
                {author}
              </a>
            </div>
          </li>
          &nbsp;
          <li>
            <div className="comment-time">
              <a className="link" href="#">
                {date}
              </a>
            </div>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li>
            <div className="comment-parent">
              <a className="link" href="#">
                parent
              </a>
            </div>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li>
            <div className="comment-on">
              <span>on: </span>
              <a className="link" href="#">
                <span>
                  {story_title}
                </span>
              </a>
            </div>
          </li>
        </ul>
      </CommentHeader>
      <CommentText className="comment-text" dangerouslySetInnerHTML={{ __html: comment_text }} />
    </div>
  )
}
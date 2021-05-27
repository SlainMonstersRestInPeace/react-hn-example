import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HNNewest from './HNNewest'
import HNComments from './HNComments'
import HNNews from './HNNews'
import HNAsk from './HNAsk'
import HNShow from './HNShow'
import HNJobs from './HNJobs'
import HNPast from './HNPast'
import NotFound from './NotFound'

import HNHeader from '../components/HNHeader'
import HNFooter from '../components/HNFooter'

import styled from 'styled-components'

const Wrapper = styled.div`
@media only screen and (max-width: 250px) {
  min-width: 820px;
  margin: 12px;
}

@media only screen and (min-width: 250px) and (max-width: 768px) {
  & {
    width: 100%;
    margin: 0;
  }
}

@media only screen and (min-width: 768px) {
  & {
    min-width: calc(768px - 12px * 2);
    width: 80%;
    margin: 12px auto;
  }
}
`;

export default () => {
  return (
    <Wrapper className="wrapper">
      <HNHeader />
      <main className="p-2">
        <div className="content">
          <Switch>
            <Redirect exact from="/" to="/news" />
            <Route exact path="/news" component={HNNews} />
            <Route exact path="/newest" component={HNNewest} />
            <Route exact path="/comments" component={HNComments} />
            <Route exact path="/ask" component={HNAsk} />
            <Route exact path="/past" component={HNPast} />
            <Route exact path="/show" component={HNShow} />
            <Route exact path="/jobs" component={HNJobs} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
      <div className="divider" />
      <HNFooter />
    </Wrapper>
  );
}
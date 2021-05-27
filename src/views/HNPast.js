import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import HNMoreButton from '../components/HNMoreButton'
import HNStoryItem from '../components/HNStoryItem'

import { makeAlgoliaApiUrl } from '../util'

import { fetchHNItems } from '../redux/reducers/app'
import { useLocation } from 'react-router-dom'

import { v4 as uuid } from 'uuid'

import queryString from 'query-string'
import useCancelToken from '../hooks/useCancelToken'

import { validateParams, validatePage, withinTimeFrame } from '../util'

import moment from 'moment'

import styled from 'styled-components'

const DateNavLink = styled.a`
color: var(--hn-text-gray);

&:hover {
  color: var(--hn-text-gray);
}

&:visited {
  color: var(--hn-text-gray);
}
`;

const Notice = styled.div`
font-size: 14px;
font-style: Verdana, arial;
color: var(--hn-text-gray);
`;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
]

export default () => {
  const location = useLocation();
  const params = validateParams(queryString.parse(location.search, { parseNumbers: true }), validatePage);

  const items = useSelector(state => state.app.hnItems);
  const totalPages = useSelector(state => state.app.nbPages);
  const itemsPerPage = useSelector(state => state.app.itemsPerPage);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(params.page || 0);

  const [yesterday] = useState(moment().startOf('day').subtract(1, "days"));
  const [conception] = useState(moment([2007, 1, 19]));
  
  const [date, setDate] = useState(moment(yesterday));
  
  const source = useCancelToken();
  
  useEffect(() => {
    const cancelToken = source.token;
    const options = { cancelToken };

    fetchItems(page, date, options);

    return function () {
      source.cancel();
    }
  }, []);
  
  async function fetchItems(page, date, options) {
    const url = makeAlgoliaApiUrl({
      searchOption: "search_by_date",
      tags: "story", 
      page: page || 0,
      numericFilters: makeDateFilter(date)
    });

    await dispatch(fetchHNItems(url, options));

    if (!source.isCancelled()) {
      setLoaded(true);
    }
  }

  function moveAPeriod(count, measure) {
    const newDate = moment(date).add(count, measure);

    if (withinTimeFrame(newDate, conception, yesterday)) {
      setPage(0);
      setDate(newDate);
      setLoaded(false);

      const cancelToken = source.token;
      const options = { cancelToken };

      fetchItems(0, newDate, options);
    }
  }

  function handleGoBackwardDay() {
    moveAPeriod(-1, "days");
  }

  function handleGoBackwardMonth() {
    moveAPeriod(-1, "months");
  }

  function handleGoBackwardYear() {
    moveAPeriod(-1, "years");
  }

  function handleGoForwardDay() {
    moveAPeriod(1, "days");
  }

  function handleGoForwardMonth() {
    moveAPeriod(1, "months");
  }

  function handleGoForwardYear() {
    moveAPeriod(1, "years");
  }

  function createForwardLinks() {
    const labels = ["day", "month", "year"];
    const classes = ["go-forward-day", "go-forward-month", "go-forward-year"];
    const handlers = [handleGoForwardDay, handleGoForwardMonth, handleGoForwardYear];
    const measure = ["days", "months", "years"];

    const links = [];

    labels.forEach((label, i) => {
      const newDate = moment(date).add(1, measure[i]);

      if (withinTimeFrame(newDate, conception, yesterday)) {
        links.push({
          class: `date-navlink go-forward ${classes[i]}`,
          handler: handlers[i],
          label
        })
      }
    });

    links.forEach((link, i) => {
      link.colon = i === links.length - 1 ? '' : ', ';
    })

    return links;
  }

  function createBackwardLinks() {
    const labels = ["day", "month", "year"];
    const classes = ["go-backward-day", "go-backward-month", "go-backward-year"];
    const handlers = [handleGoBackwardDay, handleGoBackwardMonth, handleGoBackwardYear];
    const measure = ["days", "months", "years"];

    const links = [];

    labels.forEach((label, i) => {
      const newDate = moment(date).add(-1, measure[i]);

      if (withinTimeFrame(newDate, conception, yesterday)) {
        links.push({
          class: `date-navlink go-back ${classes[i]}`,
          handler: handlers[i],
          label,
        })
      }
    })

    links.forEach((link, i) => {
      link.colon = i === links.length - 1 ? '' : ', ';
    });

    return links;
  }

  function createLink(link) {
    return (
      <React.Fragment key={uuid()} >
        <DateNavLink className={link.class} href="#" onClick={link.handler}>
          {link.label}
        </DateNavLink>
        {link.colon}
      </React.Fragment>
    )
  }

  const backwardLinks = createBackwardLinks().map(link => {
    return createLink(link);
  });

  const forwardLinks = createForwardLinks().map(link => {
    return createLink(link);
  });

  function makeDateFilter() {
    const thisDay = moment.unix(date.unix()).startOf("day").subtract(1, "days");
    const tomorrow = moment.unix(thisDay.unix()).add(1, "days");

    const lower = thisDay.unix();
    const upper = tomorrow.unix();

    return `created_at_i>${lower},created_at_i<${upper}`;
  }


  function handleMoreClick(e) {
    setPage(page + 1);
    setLoaded(false);
    
    const cancelToken = source.token;
    const options = { cancelToken };

    fetchItems(page, date, options);
  }

  const content = loaded ? items : [];

  const itemList = content.map((item, i) => {
    const numItem = itemsPerPage * page + i + 1;
    
    return (
      <li key={uuid()}>
        <HNStoryItem {...item} number={numItem} />
      </li>
    );
  });

  return (
    <div className="hn-past">
      <If condition={loaded}>
        <Notice className="hn-notice mt-2 mb-3">
          <p className="m-0">Stories from {monthNames[date.month()]} {date.date()}, {date.year()} (UTC)</p>
          <p className="m-0">
            {backwardLinks.length > 0 ? <>Go back a {backwardLinks}. </> : null }
            {forwardLinks.length > 0 ? <>Go forward a {forwardLinks}.</> : null }
          </p>
        </Notice>
        <ul className="item-list list-unstyled mb-4">
          {itemList}
        </ul>
        <If condition={content.length && page < totalPages - 1}>
          <HNMoreButton page={page} handleClick={handleMoreClick} />
        </If>
      </If>
    </div>
  );
}
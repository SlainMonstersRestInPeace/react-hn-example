import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import HNMoreButton from '../components/HNMoreButton'
import HNStoryItem from '../components/HNStoryItem'

import { makeAlgoliaApiUrl, timeFrameWeekFromToday } from '../util'

import { fetchHNItems } from '../redux/reducers/app'
import { useLocation } from 'react-router-dom'

import { v4 as uuid } from 'uuid'

import queryString from 'query-string'
import useCancelToken from '../hooks/useCancelToken'

import { validateParams, validatePage } from '../util'

export default () => {
  const location = useLocation();
  const params = validateParams(queryString.parse(location.search, { parseNumbers: true }), validatePage);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(params.page || 0);

  const items = useSelector(state => state.app.hnItems);
  const totalPages = useSelector(state => state.app.nbPages);
  const itemsPerPage = useSelector(state => state.app.itemsPerPage);

  const source = useCancelToken();

  function makeDateFilter() {
    const { lower, upper } = { ...timeFrameWeekFromToday() };

    return `created_at_i>${lower},created_at_i<${upper}`;
  }

  async function fetchItems(page, options) {
    const url = makeAlgoliaApiUrl({ 
      searchOption: "search", 
      tags: "show_hn", 
      page: page || 0,
      numericFilters: makeDateFilter()
    });

    await dispatch(fetchHNItems(url, options));

    if (!source.isCancelled()) {
      setLoaded(true);
    }
  }

  useEffect(() => {
    const cancelToken = source.token;
    const options = { cancelToken };

    fetchItems(page, options);

    return function () {
      source.cancel();
    }
  }, []);

  function handleMoreClick(e) {
    setPage(page + 1);
    setLoaded(false);

    const cancelToken = source.token;
    const options = { cancelToken };

    fetchItems(page + 1, options);
  };

  const content = loaded ? items : [];

  const itemList = content.map((item, i) => {
    const numItem = page * itemsPerPage + i + 1;

    return (
      <li key={uuid()}>
        <HNStoryItem {...item} number={numItem}/>
      </li>
    );
  })

  return (
    <div className="hn-show">
      <If condition={loaded}>
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
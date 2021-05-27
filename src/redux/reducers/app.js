import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  itemsPerPage: 30,
  hnItems: [],
  page: 0,
  nbPages: 0,
  nbHits: 0,
  error: null,
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchStart(state, action) {
      state.isLoading = true;
    },
    fetchEnd(state, action) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state, action) {
      state.error = null;
    },
    setItems(state, action) {
      state.hnItems = action.payload.hits;
      state.nbPages = action.payload.nbPages;
      state.nbHits = action.payload.nbHits;
      state.page = action.payload.page;
    },
    clearItems(state, action) {
      state.hnItems = [];
      state.nbPages = 0;
      state.nbHits = 0;
      state.page = 0;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
  }
});

const {
  setItemsPerPage,
  setItems,
  setError,
  clearItems,
  clearError,
  setPage,
  fetchStart,
  fetchEnd,
} = app.actions;


import axios from 'axios'
import { serializeError } from 'serialize-error'

import ResourceNotFoundError from '../../ResourceNotFoundError'
import ItemSetIsEmptyError from '../../ItemSetIsEmptyError'
import RequestCancelledError from '../../RequestCancelledError'

function fetchOperation(url, {
  options,
  onSuccess,
  onError,
  transformResponse
}) {
  return async (dispatch, getState) => {
    const opts = options || {};
    const onsuccess = onSuccess || (() => { });
    const errorhandler = onError || (err => { throw err })
    const transform = transformResponse || (res => res);

    let res = {};

    try {
      dispatch(fetchStart());

      res = await axios(url, opts);
      res = transform(res);

      onsuccess(res, { dispatch, getState });
    } catch (err) {
      dispatch(fetchEnd());

      errorhandler(err);
    }

    dispatch(fetchEnd());

    return res;
  }
}

function fetchHNItems(url, options) {
  return async (dispatch, getState) => {
    const transformResponse = res => res.data;
    const onError = function (err) {
      let error = new Error('Unknown error');

      if (err.isAxiosError) {
        if (err.reponse) {
          if (err.response.status === 404) {
            error = new ResourceNotFoundError("Resource Not Found", err.response.status, err.response.statusText);
          } else {
            error = new Error('Failed to access Hacker News API');
          }
        } else {
          if (err.request) {
            if (err.code === 'ECONNABORTED') {
              error = new Error('Connection timeout');
            } else {
              error = new Error('Network error');
            }
          }
        }
      } else {
        if (axios.isCancel(err)) {
          error = new RequestCancelledError();
        } else {
          if (err instanceof ItemSetIsEmptyError) {
            error = err;
          } else {
            throw err;
          }
        }
      }

      dispatch(setError(serializeError(error)));
    }

    const onSuccess = (data, { dispatch }) => {
      if (!data.hits || data.hits.length === 0) {
        throw new ItemSetIsEmptyError("No items found");
      }

      dispatch(setItems(data));
    }

    await dispatch(fetchOperation(url, {
      options,
      onSuccess,
      onError,
      transformResponse
    }))
  }
}

export default app.reducer

export {
  setItemsPerPage,
  setItems,
  clearItems,
  clearError,
  setPage,
  fetchHNItems
}
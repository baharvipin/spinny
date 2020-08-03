import axios from 'axios';

import ACTIONS from '../../constants/store/narutoAction';

const fetchNarutoDataInit = () => {
  return {
    type: ACTIONS.NARUTO_DATA_FETCH_INIT
  };
};

const fetchNarutoDataFail = () => {
  return {
    type: ACTIONS.NARUTO_DATA_FETCH_FAIL
  };
};

const fetchNarutoDataSuccess = narutoData => {
  return {
    type: ACTIONS.NARUTO_DATA_FETCH_SUCCESS,
    narutoData: narutoData
  };
};

const invalidateNarutoData = () => {
  return {
    type: ACTIONS.NARUTO_DATA_INVALIDATE
  };
};

const fetchNarutoData = count => {
  return function(dispatch, getState) {
    const currentState = getState().narutoData;
    if (!currentState.isInvalidated) return null;

    dispatch(fetchNarutoDataInit());
    axios
      .get(`https://api.jikan.moe/v3/search/anime?q=naruto&limit=${count}`)
      .then(function(response) {
        dispatch(fetchNarutoDataSuccess(response.data.results));
      })
      .catch(function(err) {
        dispatch(fetchNarutoDataFail(err));
      });
  };
};

export default {
  fetchNarutoData,
  invalidateNarutoData
};

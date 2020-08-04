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

const fetchNarutoDataSuccess = (narutoData, pageNo) => {
  return {
    type: ACTIONS.NARUTO_DATA_FETCH_SUCCESS,
    narutoData: narutoData,
    pageNo: pageNo
  };
};

const invalidateNarutoData = () => {
  return {
    type: ACTIONS.NARUTO_DATA_INVALIDATE
  };
};

const fetchNarutoData = (count, pageNo) => {
  return function(dispatch, getState) {
    const currentState = getState().narutoData;
    if (!currentState.isInvalidated) return null;

    dispatch(fetchNarutoDataInit());
    axios
      .get(
        `https://api.jikan.moe/v3/search/anime?q=naruto&limit=${count}&page=${pageNo}`
      )
      .then(function(response) {
        dispatch(fetchNarutoDataSuccess(response.data.results, pageNo));
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

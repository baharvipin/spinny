import ACTIONS from '../../constants/store/narutoAction';

const initialState = {
  isInvalidated: true
};
const narutoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.NARUTO_DATA_FETCH_INIT:
      return {
        ...state,
        isFetching: true,
        isInvalidated: false
      };
      break;
    case ACTIONS.NARUTO_DATA_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        narutoData: action.narutoData
      };
      break;
    case ACTIONS.NARUTO_DATA_FETCH_FAIL:
      return {
        ...state,
        isFetching: false
      };
      break;
    case ACTIONS.NARUTO_DATA_INVALIDATE:
      return {
        ...state,
        isInvalidated: true
      };
      break;
    default:
      return state;
  }
};

export default narutoReducer;

// ---------- Data validation starts-------------

const isNull = item => {
  return item === undefined || item === null;
};

const isStringEmpty = str => {
  if (str.constructor === String && (str.length === 0 || str === ' ')) {
    return true;
  }
  return false;
};

const isDataEmpty = data => {
  if (isNull(data)) return true;
  if (isStringEmpty(data)) return true;
  if (
    (data.constructor === Object && Object.keys(data).length === 0) ||
    (data.constructor === Array && data.length === 0)
  ) {
    return true;
  }
  return false;
};

// ---------- Data validation ends-------------

export default {
  isNull,
  isDataEmpty
};

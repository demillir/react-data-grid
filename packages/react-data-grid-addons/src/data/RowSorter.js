import { utils } from 'react-data-grid';
const { getMixedTypeValueRetriever, isImmutableCollection } = utils;

const comparer = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
};

const sortRows = (rows, sortColumn, sortDirection) => {
  const retriever = getMixedTypeValueRetriever(isImmutableCollection(rows));
  let sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
  let rowComparer = (a, b) => {
    // Case-insensitive sorting.
    var av = retriever.getValue(a, sortColumn);
    var bv = retriever.getValue(b, sortColumn);
    var avs = av === undefined ? av : av.toString().trim().toLowerCase();
    var bvs = bv === undefined ? bv : bv.toString().trim().toLowerCase();
    return sortDirectionSign * comparer(avs, bvs);
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.slice().sort(rowComparer);
};

module.exports = sortRows;
module.exports.comparer = comparer;

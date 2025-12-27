import React from 'react';
import IconTrash from './IconTrash';
import IconSearch from './IconSearch';
import { LocationType } from 'src/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSearchHistory,
  selectSearchHistory,
} from 'src/store/searchHistory';
import { getUniqueId } from 'src/utils/common';

type SearchHistoryPropsType = {
  handleSelect: (item: LocationType) => void;
};

export default function SearchHistory({
  handleSelect,
}: SearchHistoryPropsType) {
  const dispatch = useDispatch();
  const searchHistory = useSelector(selectSearchHistory);

  const handleDelete =
    (indexItem: number) =>
    (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {

      console.log('delete search');
      dispatch(deleteSearchHistory(indexItem));
    };

  return searchHistory.length ? (
    <>
      <h3>Search history</h3>
      <ul className="select-city search-history">
        {searchHistory.map((item, index) => (
          <li key={`${item.id}_${item.name}`}>
            {item.name}, {item.country}
            <div className="action">
              <span
                className="select"
                onClick={(e) => handleSelect({ ...item, id: getUniqueId() })}
              >
                <IconSearch width={16} height={16} />
              </span>
              <span className="delete" onClick={handleDelete(index)}>
                <IconTrash width={16} height={16} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  ) : (
    ''
  );
}

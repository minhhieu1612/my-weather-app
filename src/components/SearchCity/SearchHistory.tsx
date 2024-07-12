import React from 'react';
import IconTrash from './IconTrash';
import IconSearch from './IconSearch';
import { LocationType } from 'src/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchHistory, setSearchHistory } from 'src/store/searchHistory';

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
      dispatch(
        setSearchHistory(
          searchHistory.filter((_x, index) => indexItem !== index)
        )
      );
    };

  return searchHistory.length ? (
    <>
      <h3>Search history</h3>
      <ul className="select-city search-history">
        {searchHistory.map((item, index) => (
          <li key={`${item.lat}_${item.lon}_${item.name}`}>
            {item.name}, {item.country}
            <div className="action">
              <span className="select" onClick={(e) =>handleSelect(item)}>
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

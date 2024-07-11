import React from 'react';
import { LocationType } from './PopupSearchCity';
import IconTrash from './IconTrash';
import IconSearch from './IconSearch';

type SearchHistoryPropsType = {
  searchHistory: LocationType[];
  handleSelect: (
    item: LocationType
  ) => (_e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleDelete: (
    indexItem: number
  ) => (_e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export default function SearchHistory({
  searchHistory,
  handleSelect,
  handleDelete,
}: SearchHistoryPropsType) {
  return (
    <>
      <h3>Search history</h3>
      <ul className="select-city search-history">
        {searchHistory.map((item, index) => (
          <li key={`${item.lat}_${item.lon}_${item.name}`}>
            {item.name}, {item.country}
            <div className="action">
              <span className="select" onClick={handleSelect(item)}>
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
  );
}

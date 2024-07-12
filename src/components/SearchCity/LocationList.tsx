import React from 'react';
import { LocationType } from 'src/types';

type LocationListPropTypes = {
  list: LocationType[];
  handleSelectItem: (item?: LocationType) => void;
};

export default function LocationList({
  list,
  handleSelectItem,
}: LocationListPropTypes) {

  return (
    <ul className="select-city">
      {list.map((item) => (
        <li
          key={`${item.lat}_${item.lon}_${item.name}`}
          onClick={(e) => handleSelectItem(item)}
        >
          {item.name}, {item.country}
        </li>
      ))}
    </ul>
  );
}

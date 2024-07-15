import React, { useEffect } from 'react';
import { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setqueryLocationParams } from 'src/store/queryLocation';
import SearchHistory from './SearchHistory';
import {
  DEFAULT_COUNTRY,
  DEFAULT_LATTITUDE,
  DEFAULT_LONGTITUDE,
  DEFAULT_NAME,
} from 'src/utils/config';
import { LocationType } from 'src/types';
import { pushSearchHistory } from 'src/store/searchHistory';
import SearchForm from './SearchForm';
import LocationList from './LocationList';
import { getUniqueId } from 'src/utils/common';

type PopupSearchCityPropsType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
  closePopup: () => void;
};

const PopupSearchCity = ({
  searchText,
  setSearchText,
  isVisible,
  closePopup,
}: PopupSearchCityPropsType) => {
  const inputRef = createRef<HTMLInputElement>();
  const [locations, setLocations] = useState<LocationType[]>([]);
  const dispatch = useDispatch();

  const handleSearchCity = (item?: LocationType) => {
    // search the default city if item is not provided
    if (item === undefined) {
      handleSearchCity({
        id: getUniqueId(),
        lat: DEFAULT_LATTITUDE.toString(),
        lon: DEFAULT_LONGTITUDE.toString(),
        country: DEFAULT_COUNTRY,
        name: DEFAULT_NAME,
      });
    } else {
      dispatch(setqueryLocationParams({ lat: item.lat, lon: item.lon }));
      if (item.name.length) {
        setSearchText(`${item.name}, ${item.country}`);
      }
      closePopup();
      setLocations([]);
      dispatch(pushSearchHistory(item));
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [isVisible]);

  return (
    <div className={`popup-wrap ${isVisible ? 'show' : ''}`}>
      <div className="container">
        <div className="popup-body">
          <SearchForm
            ref={inputRef}
            searchText={searchText}
            setSearchText={setSearchText}
            setLocations={setLocations}
            handleSearch={handleSearchCity}
          />
          <button className="close" onClick={() => closePopup()}>
            x
          </button>
          <hr />
          {locations.length ? (
            <LocationList
              list={locations}
              handleSelectItem={handleSearchCity}
            />
          ) : (
            <SearchHistory handleSelect={handleSearchCity} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupSearchCity;

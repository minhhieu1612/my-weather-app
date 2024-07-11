import React from 'react';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLocation } from '../../services';
import { setqueryLocationParams } from '../../store/queryLocation';
import SearchHistory from './SearchHistory';
import {
  DEFAULT_COUNTRY,
  DEFAULT_LATTITUDE,
  DEFAULT_LONGTITUDE,
  DEFAULT_NAME,
} from '../../utils/config';

type PopupSearchCityPropsType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
  closePopup: () => void;
};

export type LocationType = {
  name: string;
  lat: string;
  lon: string;
  country: string;
};

const LS_SEARCH_HISTORY_KEY = 'searchHistory';

const PopupSearchCity = ({
  searchText,
  setSearchText,
  isVisible,
  closePopup,
}: PopupSearchCityPropsType) => {
  const inputRef = createRef<HTMLInputElement>();
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [searchHistory, setSearchHistory] = useState(
    (JSON.parse(
      localStorage.getItem(LS_SEARCH_HISTORY_KEY) as string
    ) as LocationType[]) || []
  );
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target?.value);
    showErrorMessage && setShowErrorMessage(false);
  };

  const hanldeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText.length) {
      const response = await getLocation({ query: searchText, limit: 5 });

      if (response.success) {
        setLocations(
          response.data?.map(({ name, lat, lon, country }) => ({
            name,
            lat,
            lon,
            country,
          })) || []
        );

        if (response.data?.length === 0) {
          setShowErrorMessage(true);
        }
      } else {
        setShowErrorMessage(true);
      }
    } else {
      handleSearchCity({
        lat: DEFAULT_LATTITUDE.toString(),
        lon: DEFAULT_LONGTITUDE.toString(),
        country: DEFAULT_COUNTRY,
        name: DEFAULT_NAME,
      });
    }
  };

  const updateSearchHistory = (newSearchHistory: LocationType[]) => {
    localStorage.setItem(
      LS_SEARCH_HISTORY_KEY,
      JSON.stringify(newSearchHistory)
    );
    setSearchHistory(newSearchHistory);
  };

  const handleSearchCity = (item: LocationType) => {
    dispatch(setqueryLocationParams({ lat: item.lat, lon: item.lon }));
    if (item.name.length) {
      setSearchText(`${item.name}, ${item.country}`);
    }
    closePopup();
    setLocations([]);
    updateSearchHistory([item].concat(searchHistory));
  };

  const handleSelectCity =
    (item: LocationType) =>
    (_e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      handleSearchCity(item);
    };

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLDivElement)?.classList.contains('popup-wrap')) {
      closePopup();
    }
  };

  const deleteSearchHistory =
    (indexItem: number) =>
    (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      updateSearchHistory(
        searchHistory.filter((_x, index) => indexItem !== index)
      );
    };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <div
      className={`popup-wrap ${isVisible ? 'show' : ''}`}
      onClick={handleClose}
    >
      <div className="container">
        <div className="popup-body">
          <div className="form-search">
            <form onSubmit={hanldeSubmit}>
              <input
                ref={inputRef}
                onChange={handleChange}
                value={searchText}
              />
              <button className="btn" type="submit">
                Search
              </button>
            </form>
          </div>
          <button className="close" onClick={() => closePopup()}>x</button>
          <hr />
          {showErrorMessage ? (
            <span className="error-message">Invalid country or city</span>
          ) : (
            ''
          )}
          {locations.length ? (
            <ul className="select-city">
              {locations.map((item) => (
                <li
                  key={`${item.lat}_${item.lon}_${item.name}`}
                  onClick={handleSelectCity(item)}
                >
                  {item.name}, {item.country}
                </li>
              ))}
            </ul>
          ) : searchHistory.length ? (
            <SearchHistory
              handleSelect={handleSelectCity}
              handleDelete={deleteSearchHistory}
              searchHistory={searchHistory}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupSearchCity;

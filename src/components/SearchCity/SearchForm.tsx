import React, { useState } from 'react';
import { getLocation } from 'src/services';
import { LocationType } from 'src/types';

type SearchFormPropsType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  setLocations: (value: React.SetStateAction<LocationType[]>) => void;
  handleSearch: (item?: LocationType) => void
};

export default function SearchForm({
  searchText,
  setSearchText,
  inputRef,
  setLocations,
  handleSearch
}: SearchFormPropsType) {
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target?.value);
    hasError && setHasError(false);
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
          setHasError(true);
        }
      } else {
        setHasError(true);
      }
    } else {
      handleSearch();
    }
  };

  return (
    <div className="form-search">
      <form onSubmit={hanldeSubmit}>
        <input ref={inputRef} onChange={handleChange} value={searchText} />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      {hasError ? (
        <span className="error-message">Invalid country or city</span>
      ) : (
        ''
      )}
    </div>
  );
}

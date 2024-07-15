import React, { forwardRef, useState } from 'react';
import { weatherService } from 'src/services';
import { LocationType } from 'src/types';
import { getUniqueId } from 'src/utils/common';

type SearchFormPropsType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setLocations: (value: React.SetStateAction<LocationType[]>) => void;
  handleSearch: (item?: LocationType) => void;
};

export default forwardRef(function SearchForm(
  {
    searchText,
    setSearchText,
    setLocations,
    handleSearch,
  }: SearchFormPropsType,
  inputRef: React.RefObject<HTMLInputElement>
) {
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target?.value);
    hasError && setHasError(false);
  };

  const hanldeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText.length) {
      const response = await weatherService.getLocation({ query: searchText, limit: 5 });

      if (response.success) {
        setLocations(
          response.data?.map(({ name, lat, lon, country }) => ({
            id: getUniqueId(),
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
});

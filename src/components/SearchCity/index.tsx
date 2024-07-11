import React, { useState } from 'react';
import './index.scss';
import { createPortal } from 'react-dom';
import PopupSearchCity from './PopupSearchCity';

const SearchCity = () => {
  const [searchText, setSearchText] = useState('');
  const [isShowPopup, setShowPopup] = useState(false);

  const closePopup = () => setShowPopup(false);

  return (
    <div className="search-city">
      <div className="form-search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input value={searchText} onFocus={() => setShowPopup(true)} />
          <button className="btn" onClick={() => setShowPopup(true)}>
            Search
          </button>
        </form>
      </div>
      {createPortal(
        <PopupSearchCity
          searchText={searchText}
          setSearchText={setSearchText}
          isVisible={isShowPopup}
          closePopup={closePopup}
        />,
        document.getElementById('popup-search-city') as Element
      )}
    </div>
  );
};

export default SearchCity;

import React from 'react';
import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const Loader = loading ? <div className="loader">Loading...</div> : '';

  const startLoading = () => {
    setLoading(true);
  };

  const endLoading = () => {
    setLoading(false);
  };

  return { startLoading, endLoading, Loader };
};

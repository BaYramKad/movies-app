import React from 'react';

export const RatedMovies = ({ ratedItems }) => {
  if (!ratedItems.length) return 'Избранные фильмы отсутствуют';
  return <div>RatedMovies</div>;
};

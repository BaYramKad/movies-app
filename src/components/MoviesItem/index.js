import React from 'react';

import './movies-style.css';
import { RenderItem } from './RenderItem';

export const MoviesItem = ({ movies }) => {
  return (
    <div className="movies">
      <ul className="movies-list">
        <RenderItem items={movies} />
      </ul>
    </div>
  );
};

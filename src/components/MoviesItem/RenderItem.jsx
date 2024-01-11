import React from 'react';
import { Rate, Typography } from 'antd';
import { format } from 'date-fns';

import { EmptyPoster } from './EmptyPoster';
// import { currectStr } from '../../access/short_str';
const { Title, Text, Paragraph } = Typography;

export const RenderItem = ({ items, genres, postRateMovie }) => {
  const renderGenre = (arrayGenre) => {
    const selectedGenre = genres.filter((genre) => {
      return arrayGenre.includes(genre.id);
    });
    return selectedGenre.map((genre) => <span key={genre.id}>{genre.name}</span>);
  };
  return (
    <React.Fragment>
      {items.map((item) => {
        const { id, poster_path, title, release_date, overview, genre_ids } = item;
        const imgPoster = `https://image.tmdb.org/t/p/original/${poster_path}`;
        return (
          <li key={id} className="movies-item">
            {poster_path ? <img src={imgPoster} alt="poster" /> : <EmptyPoster />}
            <div className="movies-item__info">
              <Title title={title} level={2}>
                {title.length > 13 ? title.slice(0, 10) + '...' : title}
              </Title>
              <Text type="secondary">{release_date && format(release_date, 'MMMM dd, yyyy')}</Text>
              <div className="movies-item__genres">{renderGenre(genre_ids)}</div>
              <Paragraph className="paragraph">{overview}</Paragraph>
              <Rate
                className="rate-style"
                count={10}
                allowHalf
                defaultValue={2.5}
                onChange={(rate) => postRateMovie(id, rate)}
              />
            </div>
          </li>
        );
      })}
    </React.Fragment>
  );
};

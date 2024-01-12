import React from 'react';

import { Empty } from 'antd';
import { Rate, Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;

import { EmptyPoster } from '../MoviesItem/EmptyPoster';
import { getvoteOverage } from '../../access/getVoteOverage';
import { format } from 'date-fns';

import '../movies-style.css';

export const RatedMovies = ({ genres, postRateMovie }) => {
  const storageRatedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || [];
  if (!storageRatedMovies.length) return <Empty />;

  const renderGenre = (arrayGenre) => {
    const selectedGenre = genres.filter((genre) => {
      return arrayGenre.includes(genre.id);
    });
    return selectedGenre.map((genre) => <span key={genre.id}>{genre.name}</span>);
  };
  return (
    <ul className="movies-list">
      {storageRatedMovies.map((item) => {
        const { id, overview, poster_path, release_date, title, genre_ids, vote_average } = item;
        const imgPoster = `https://image.tmdb.org/t/p/original/${poster_path}`;
        return (
          <li key={id} className="movies-item">
            <div>{poster_path ? <img src={imgPoster} alt="poster" /> : <EmptyPoster />}</div>

            <div>
              <Title id="item-title" title={title} level={2}>
                {title}
              </Title>
              <div
                className="item-style-overage"
                style={{ border: `${getvoteOverage(vote_average)}` }}>
                {vote_average.toFixed(1)}
              </div>
              <Text type="secondary">{release_date && format(release_date, 'MMMM dd, yyyy')}</Text>
              <div className="movies-item__genres">{renderGenre(genre_ids)}</div>
            </div>

            <div className="paragraph-block">
              <Paragraph className="paragraph">
                {overview.length ? overview : 'There is no description of the film'}
              </Paragraph>
              <Rate
                className="rate-style"
                count={10}
                allowHalf
                defaultValue={vote_average.toFixed(2)}
                onChange={(rate) => postRateMovie(id, rate)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

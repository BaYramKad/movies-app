import React from 'react';
import { Rate, Typography } from 'antd';
import { format } from 'date-fns';
import { EmptyPoster } from './EmptyPoster';
import { getvoteOverage } from '../../access/getVoteOverage';
const { Title, Text, Paragraph } = Typography;

export const RenderItem = ({ items, genres, postRateMovie }) => {
  const renderGenre = (arrayGenre) => {
    const selectedGenre = genres.filter((genre) => {
      return arrayGenre.includes(genre.id);
    });
    return selectedGenre.map((genre) => <span key={genre.id}>{genre.name}</span>);
  };

  const storageRatedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || [];

  return (
    <React.Fragment>
      {items.map((item) => {
        const { id, overview, poster_path, release_date, title, genre_ids, vote_average } = item;
        const findIdStorage = storageRatedMovies.find((stItem) => stItem.id === id);
        const rate = findIdStorage ? findIdStorage.vote_average : vote_average;
        const imgPoster = `https://image.tmdb.org/t/p/original/${poster_path}`;
        const rateNumber = !findIdStorage ? 0 : rate.toFixed(1);
        return (
          <li key={id} className="movies-item">
            <div>{poster_path ? <img src={imgPoster} alt="poster" /> : <EmptyPoster />}</div>

            <div>
              <Title id="item-title" title={title} level={2}>
                {title}
              </Title>
              <div
                className="item-style-overage"
                style={{ border: `${getvoteOverage(rateNumber)}` }}>
                {rateNumber}
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
                defaultValue={rateNumber}
                onChange={(rate) => postRateMovie(id, rate)}
              />
            </div>
          </li>
        );
      })}
    </React.Fragment>
  );
};

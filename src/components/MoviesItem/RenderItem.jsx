import React from 'react';
import { Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;

import { EmptyPoster } from './EmptyPoster';
import { currectStr } from '../../access/short_str';

export const RenderItem = ({ items }) => {
  return (
    <React.Fragment>
      {items.map((item) => {
        const imgPoster = `https://image.tmdb.org/t/p/original/${item.poster_path}`;

        return (
          <li key={item.id} className="movies-item">
            {item.poster_path ? <img src={imgPoster} alt="poster" /> : <EmptyPoster />}

            <div className="movies-item__info">
              <Title level={2}>{item.title}</Title>
              <Text type="secondary">March 5, 2020 </Text>
              <div className="movies-item__genres">
                <span>Action</span>
                <span>Drama</span>
              </div>
              <Paragraph>{currectStr(item.overview)}</Paragraph>
            </div>
          </li>
        );
      })}
    </React.Fragment>
  );
};

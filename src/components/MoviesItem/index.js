import React from 'react';

import './movies-style.css';
import { RenderItem } from './RenderItem';
import { Pagination } from 'antd';
import { Loader } from '../../access/loader';
import { MyContext } from '../..';

export const MoviesItem = ({ movies, query, queryPending, pageInfo, changePage }) => {
  const loadingData = !movies?.length ? (
    <h1>Фильмы по запросу `{query}` не найдено</h1>
  ) : (
    <>
      <ul className="movies-list">
        <MyContext.Consumer>
          {(genres) => {
            return <RenderItem items={movies} genres={genres} />;
          }}
        </MyContext.Consumer>
      </ul>
      <div className="pagination">
        <Pagination
          total={pageInfo.totalPages}
          current={pageInfo.page}
          showQuickJumper={true}
          showSizeChanger={false}
          pageSize={movies.length}
          onChange={changePage}
        />
      </div>
    </>
  );

  return <div className="movies">{queryPending ? <Loader size={'large'} /> : loadingData}</div>;
};

import React from 'react';

import './movies-style.css';
import { RenderItem } from './RenderItem';
import { Input, Pagination } from 'antd';
import { Loader } from '../../access/loader';

export const MoviesItem = ({ movies, inputEvent, query, queryPending, pageInfo, changePage }) => {
  const stylesPagination = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    minWidth: 'max-content',
  };

  const loadingData = !movies?.length ? (
    <h1>Фильмы по запросу `{query}` не найдено</h1>
  ) : (
    <ul className="movies-list">
      <RenderItem items={movies} />
      <div style={stylesPagination}>
        <Pagination
          total={pageInfo.totalPages}
          current={pageInfo.page}
          showQuickJumper={true}
          showSizeChanger={false}
          onChange={changePage}
        />
      </div>
    </ul>
  );

  return (
    <div className="movies">
      <Input style={{ marginBottom: 30 }} placeholder="Search" onChange={inputEvent} />
      {queryPending ? <Loader size={'large'} /> : loadingData}
    </div>
  );
};

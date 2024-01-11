import { Button, Flex } from 'antd';
import React, { useId } from 'react';

export const Menu = ({ onChoiceMovies, choisedMovies }) => {
  const unicId1 = useId();
  const unicId2 = useId();

  const handleClick = (e) => {
    if (e.target.closest('button')) {
      const buttons = [...e.target.closest('.ant-flex').children];
      buttons.forEach((btn) => {
        if (btn.id === e.target.closest('button').id) {
          btn.style.borderBottom = '2px solid rgba(24, 144, 255, 1)';
          btn.style.color = 'rgba(24, 144, 255, 1)';
          const text = btn.children[0].textContent.toLowerCase();
          onChoiceMovies(text);
        } else {
          btn.style.borderBottom = '2px solid rgba(24, 144, 255, 0)';
          btn.style.color = 'black';
        }
      });
    }
  };

  return (
    <Flex
      gap={'small'}
      justify="center"
      style={{ marginBottom: 20, marginTop: 20 }}
      onClick={handleClick}>
      <Button
        id={unicId1}
        type="text"
        style={{
          borderBottom: `2px solid rgba(24, 144, 255, ${choisedMovies == 'search' ? '1' : '0'})`,
        }}>
        Search
      </Button>
      <Button
        id={unicId2}
        type="text"
        style={{
          borderBottom: `2px solid rgba(24, 144, 255, ${choisedMovies == 'rated' ? '1' : '0'}))`,
        }}>
        Rated
      </Button>
    </Flex>
  );
};

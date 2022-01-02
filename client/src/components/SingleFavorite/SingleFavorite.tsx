import React from 'react';
import Converter from '../Converter/Converter';

export const SingleFavorite = (props: Favorite): JSX.Element => {
  return (
    <div>
      <h3>{props.label}</h3>
      <Converter {...props} />
    </div>
  );
};

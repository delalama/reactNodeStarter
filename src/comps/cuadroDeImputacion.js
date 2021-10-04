import * as React from 'react';
import { useState, useEffect } from 'react';
import RecipeReviewCard from './card';

export default function CuadroDeImputacion(props) {
  const noShadow = {
    textShadow: 'none',
    display: 'grid',
    gridGap: '10px',
    padding: '10px',
    gridTemplateColumns: 'auto auto auto auto auto',
    justifyContent: 'center',
  };

  useEffect(() => {
    props.impute();
  },[]);

  return (
    <div style={noShadow}>
      {props.imputationRows.map(function (imp, i) {
        return <RecipeReviewCard imp={imp} ind={i}></RecipeReviewCard>;
      })}
    </div>
  );
}

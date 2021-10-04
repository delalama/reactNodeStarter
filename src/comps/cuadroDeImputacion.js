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
    fetch(`/api/seleniumCaib?data=${encodeURIComponent(props.imputationRows)}}`)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          rows: response,
          hayData: true,
        })
      );
    const subscription = props.imputationRows;
    return () => {
      // Limpiar la suscripción
      subscription.unsubscribe();
    };
  });

  return (
    <div style={noShadow}>
      {props.imputationRows.map(function (imp, i) {
        return <RecipeReviewCard imp={imp} ind={i}></RecipeReviewCard>;
      })}
    </div>
  );
}

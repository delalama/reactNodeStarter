import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import meal from '../static/images/meal.jpg';
import bye from '../static/images/bye.jpg';

export default function RecipeReviewCard({ imp,ind }) {

  const cardStyle = {
    width: '250px',
    margin: '20px',
  };

  return (
    <div style={cardStyle}>
      <Card sx={{ maxWidth: 345 }} id={ind}>
        {imp.motivo.includes('Comida') && (
          <CardMedia
            component="img"
            height="140"
            image={meal}
            alt="green iguana"
          />
        )}
        {!imp.motivo.includes('Comida') && (
          <CardMedia
            component="img"
            height="140"
            image={bye}
            alt="green iguana"
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Día {imp.dia}
          </Typography>
          <Typography variant="body2" color="primary">
            Desde {imp.horaEntrada}
             hasta {imp.horaSalida}
          </Typography>
        </CardContent>
      </Card>
      
    </div>
  );
}

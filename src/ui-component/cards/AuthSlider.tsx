/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { Grid, Typography } from '@material-ui/core';

// third-party
import Slider from 'react-slick';
import { AuthSliderProps } from 'types';

const AuthSlider = ({ items }: { items: AuthSliderProps[] }) => {
  const settings = {
    autoplay: true,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {items.map((item, i) => (
        <Grid key={i} container direction="column" alignItems="center" spacing={3} textAlign="center">
          <Grid item>
            <Typography variant="h1">{item.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">{item.description}</Typography>
          </Grid>
        </Grid>
      ))}
    </Slider>
  );
};

export default AuthSlider;

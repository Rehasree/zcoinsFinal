import React from 'react';
import { Grid,Typography,Slider,Input } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';



export default function InputSlider(props) {
  const [value, setValue] = React.useState(100);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.setCoins(newValue)
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > 1000) {
      setValue(1000);
    }
  };

  return (
    <div >
      <Typography id="input-slider" gutterBottom>
        No. of Coins
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <MoneyIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 1}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className="w-100"
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 100,
              min: 1,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

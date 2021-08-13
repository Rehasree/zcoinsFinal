import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import MoneyIcon from '@material-ui/icons/Money';

export default function InputSlider(props) {
  const [value, setValue] = React.useState(1);
  let maxCoins = props.userValue.money/100;
  //Make changes such that whenever props.action changes, this will be called
  if(props.action == 'sell') {
      maxCoins = props.userValue.coins;
  }
  let steps = Math.floor(maxCoins/10);
  if(steps < 1) {steps = 1;}
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
    } else if (value > maxCoins) {
      setValue(maxCoins);
    }
  };

  return (
    <div >
      <Typography id="input-slider" gutterBottom>
        No. of Coins {steps}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <MoneyIcon />
        </Grid>
        <Grid item xs>
          <Slider
            min={1}
            max={maxCoins}
            steps={steps}
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
              step: 10,
              min: 1,
              max: 50,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

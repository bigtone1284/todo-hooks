import React, { forwardRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const getLoader = (isLoading, text) => {
  return isLoading ? <CircularProgress color={"inherit"} size={20} /> : text;
}

const colors = {
  blue: blue,
  green: green,
  red: red
};

export default forwardRef(({onClick, btnText, color, type, disabled, isLoading, size }, ref) => {
  const useStyles = makeStyles({
    root: {
      background: colors[color][500],
      color: 'white',
      textTransform: 'none',
      '&:hover': {
        background: colors[color][700]
      }
    },
  });
  
  return (
    <Button
      className={useStyles().root}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      size={size}
      type={type || 'button'}
      variant="contained"
    >
      {getLoader(isLoading, btnText)}
    </Button>
  )
})
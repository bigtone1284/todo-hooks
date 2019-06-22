import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



export default (Component) => (props) => {

  return props.isLoading ?
    <CircularProgress />
    : (
    <Component {...props} />
  );
};
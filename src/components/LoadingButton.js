import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const getLoader = (isLoading, text) => {
  return isLoading ? <CircularProgress color={"inherit"} size={20} /> : text;
}

export default ({ disabled, isLoading, onClick, btnText, color }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn waves-effect ${color} flex-btn`}
    >
      {getLoader(isLoading, btnText)}
    </button>
  )
}
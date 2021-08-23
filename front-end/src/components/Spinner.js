import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => (
  <div className="overlay">
    <div className="loader">
      <Loader type="TailSpin" color="#3fc380" height={100} width={100} />
    </div>
  </div>

);
export default Spinner;
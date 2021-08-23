import React from 'react';

export const MessageDialog = (props) => {
  return (
    <div className={`alert alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}

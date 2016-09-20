import React from 'react';

export default (props)=>{
  return(
    <div>
      <span className="main">{props.main}</span>
      <span className="sub">{props.sub}</span>
    </div>
  );
}
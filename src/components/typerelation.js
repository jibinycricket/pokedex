import React from 'react';

export default (props)=>{

  function renderRelation(elements){
    elements.forEach((element)=>{
      return (<div>{element}</div>)
    });

    return elements;
  }

  if(props.elements.length>0){
    return(
      <div>
        {renderRelation(props.elements)}
        {props.label}
      </div>
    ); 
  }else{
    return null
  }
}
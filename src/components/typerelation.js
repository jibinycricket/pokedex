import React from 'react';

export default (props)=>{
  /*
  --TypeRelation Component--
  Renders Relational Set of Elements
  Props: Elements, Label
  */
  function renderRelation(elements){
    elements.forEach((element)=>{
      return (<div className="element">{element}</div>)
    });

    return elements;
  }

  if(props.elements.length>0){
    return(
      <div className="type-relation-set">
        {renderRelation(props.elements)}
        <div className="label">{props.label}</div>
      </div>
    ); 
  }else{
    return null
  }
}
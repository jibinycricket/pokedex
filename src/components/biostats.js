import React from 'react';
import BioStat from './biostat';
/*--BioStats--
Contains BioStat component that renders species, height, weight after values are converted into Imperial units
*/
export default (props)=>{
  function convertHeightToFeet(meters){
    const raw_height = meters*.1*3.28084;
    var feet = Math.floor(raw_height);
    const inches = Math.round(raw_height%1 * 12);
    if(inches === 12){
      feet+=1;
      return feet+"'"
    }else{
      return `${feet}' ${inches}"`
    }
  }

  function convertWeightToLbs(kg){
    const raw_weight = (kg*.1*2.20462).toFixed(1);
    return `${raw_weight} lbs`;
  }

  console.log(props.generalData);
  return(
    <div className="bio">
      <div className="poke-img">
        <img src="" alt=""/>
        <span className="poke-num">{props.generalData.id}</span>
      </div>
      <div className="physical-stats">
        <BioStat main={props.bioData.genera[0].genus.toUpperCase()} sub="SPECIES"/>
        <BioStat main={convertHeightToFeet(props.generalData.height)} sub="HEIGHT"/>
        <BioStat main={convertWeightToLbs(props.generalData.weight)} sub="WEIGHT"/>
      </div>
      <div className="fun-fact">
        {props.bioData.flavor_text_entries[9].flavor_text}
      </div>
    </div>
  );
}
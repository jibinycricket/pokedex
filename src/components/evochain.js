import React from 'react';
import PokeImage from './pokeimage';

export default (props)=>{
  function verifyEvolutionCondition(evolution_details){
    if(evolution_details.min_level!==null){
      return evolution_details.min_level;
    }
    if(evolution_details.min_happiness!==null){
      return "happiness";
    }
    if(evolution_details.trigger.name === "trade"){
      return "trade";
    }
    if(evolution_details.min_beauty!==null){
      return "beauty";
    }
    if(evolution_details.item!==null){
      return evolution_details.item.name;
    }
  }
  function sortEvoChainData(object){
    var array = [];
    console.log(object);
    if(object.evolves_to.length>0){
      array.push(object.species.url.split('/')[6]);
      if(object.evolution_details.length>0){
        var condition = verifyEvolutionCondition(object.evolution_details[0])
        array.push(condition);
      }else{
        array.push(0);
      }
      return array.concat(sortEvoChainData(object.evolves_to[0]));
    }else{
      array.push(object.species.url.split('/')[6]);
      if(object.evolution_details[0]!=null){
        condition = verifyEvolutionCondition(object.evolution_details[0])
        array.push(condition);
      }
      return array;
    }
  }

  function renderEvoChain(array){
    var imageArray=[];
    for(let i=0;i<array.length;i+=2){
      if(i!==0){
        console.log(i);
        imageArray.push(<div key={`evochain${i}evoreq`}>Lvl:{array[i+1]}</div>)
      }
      imageArray.push(<PokeImage key={`evochain${i}sprite`} idNum={array[i]}/>);
    }
    return imageArray;
  }
  var evoArray = sortEvoChainData(props.evoData.chain);

  return <div>{renderEvoChain(evoArray)}</div>
}
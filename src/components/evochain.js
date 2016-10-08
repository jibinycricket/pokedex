import React from 'react';
import PokeImage from './pokeimage';

export default (props)=>{
  function verifyEvolutionCondition(evolution_details){

    let reqArray = [];
    if(evolution_details.item!==null){
      reqArray.push(<img src={require(`../images/req_sprites/${evolution_details.item.name}.png`)} key={evolution_details.item.name} title={`trade while holding ${evolution_details.item.name}`} alt={`${evolution_details.item.name} sprite`}/>);
    }
    //By Level
    if(evolution_details.min_level!==null){
      reqArray.push(`Lvl: ${evolution_details.min_level}`);
    }
    //By Happiness
    if(evolution_details.min_happiness!==null){
      reqArray.push(<img src={require(`../images/req_sprites/happiness.png`)} key="happiness" title="Evolves on level up after max happiness" alt={`heart sprite`}/>);
    }
    //By Time of Day
    if(evolution_details.time_of_day!==null){
      if(evolution_details.time_of_day==='night'){
        reqArray.push(<img src={require(`../images/req_sprites/night.png`)} key="night" title="Evolves on level up at night" alt="moon sprite"/>);
      }else if(evolution_details.time_of_day==='day'){
        reqArray.push(<img src={require(`../images/req_sprites/day.png`)} key="day" title="Evolves on level up during the day" alt="sun sprite"/>);
      }
    }
    //By Trade
    if(evolution_details.trigger.name === "trade"){
      if(evolution_details.held_item!==null){//By Trade with Item
        var heldItem = evolution_details.held_item.name;
        reqArray.push(<img src={require(`../images/req_sprites/${heldItem}.png`)} key={heldItem} title={`trade while holding ${heldItem}`} alt={`${heldItem} sprite`}/>);
      }else{
        reqArray.push(<img src={require(`../images/req_sprites/trade.png`)} key="trade" title="Evolves when traded" alt="trade sprite"/>);
      }
    }
    //By Max Beauty
    if(evolution_details.min_beauty!==null){
      reqArray.push("max beauty");
    }

    if(evolution_details.location){
      if(evolution_details.location.name==="eterna-forest"){
        reqArray.push("Lvl by Moss Rock");
      }else{
        reqArray.push("Lvl by Ice Rock");
      }
    }

    if(evolution_details.known_move_type){
      reqArray.push("Lvl with Fairy Move");
    }

    return reqArray;
  }


function sortEvoChainData(pokeObject){
  console.log(pokeObject);
  let pokeArray = [];
  if(pokeObject.evolves_to.length>0){
    pokeArray.push(pokeObject.species.url.split('/')[6]);
    if(pokeObject.evolution_details.length>0){
      var condition = verifyEvolutionCondition(pokeObject.evolution_details[0])
      pokeArray.push(condition);
    }else{
      pokeArray.push(0);
    }
    for(let i = 0;i<pokeObject.evolves_to.length;i++){
      pokeArray=pokeArray.concat(sortEvoChainData(pokeObject.evolves_to[i]));
    }
  }else{
    pokeArray.push(pokeObject.species.url.split('/')[6]);
    if(pokeObject.evolution_details[0]!=null){
      condition = verifyEvolutionCondition(pokeObject.evolution_details[0])
      pokeArray.push(condition);
    }
  }
  return pokeArray;
}

  function renderEvoChain(array){
    let imageArray=[];
    //Every Even is a pokemon, every odd is how it evolves
    for(let i=0;i<array.length;i+=2){
      if(i!==0){
        imageArray.push(<div key={`evochain${i}evoreq`}>{array[i+1]}</div>)
      }
      imageArray.push(<PokeImage key={`evochain${i}sprite`} idNum={array[i]}/>);
    }
    return imageArray;
  }
  var evoArray = sortEvoChainData(props.evoData.chain);

  return <div>{renderEvoChain(evoArray)}</div>
}
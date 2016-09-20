import {FETCH_POKEDATA} from '../actions/index';

export default function(state=1, action){
  switch(action.type){
    case FETCH_POKEDATA:
      return [action.payload];
  }
  return state;
}
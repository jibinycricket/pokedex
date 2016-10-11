import {START_SPINNER} from '../actions/index';

export default function(state=true, action){
  switch(action.type){
    case START_SPINNER:
      return action.payload;
  }
  return state;
}
import {START_SPINNER} from '../actions/index';

export default function(state=true, action){
  switch(action.type){
    case START_SPINNER:
      console.log(action.payload);
      return action.payload;
  }
  return state;
}
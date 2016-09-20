import {combineReducers} from 'redux';
import PokeDataReducer from './reducer_pokedata';

const rootReducer = combineReducers({
  pokeData:PokeDataReducer
});

export default rootReducer;
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeSpinnerState} from '../actions/index';
import Bio from '../components/biostats';
import TypeRelations from '../components/typerelations';
import Chart from '../components/statchart';
import EvoChain from '../components/evochain';

class PokemonContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      foundData: false,
      generalData:{},
      bioData: {},
      evoData: {}
    };
    this.renderBio = this.renderBio.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      foundData: true,
      generalData:nextProps.pokeData[0][0].data,
      bioData: nextProps.pokeData[0][1][0].data,
      evoData: nextProps.pokeData[0][1][1].data
    });
    //If the next set of data is loaded, stop spinner
    if(this.state.generalData.name!=nextProps.pokeData[0][0].data.name){
      this.props.changeSpinnerState(false);
    }
  }
  renderBio(){
    if(this.props.spinner===true){
      return <img id="pokemon-spinner" src={require(`../images/pokeballspinner.png`)} width="150px"/>
    }else{
      return(
        <div>
          <div></div>
          <Bio 
            generalData={this.state.generalData} 
            bioData={this.state.bioData}
          />
          <TypeRelations generalData={this.state.generalData}/>
          <Chart statsData={this.state.generalData.stats.reverse()}/>
          <EvoChain evoData={this.state.evoData}/>
        </div>
      );
    }
  }
  render(){
    return(
      <div>
        {this.renderBio()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{spinner:state.spinner, pokeData:state.pokeData}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeSpinnerState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);
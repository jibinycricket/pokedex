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
    this.mainColor = this.mainColor.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      foundData: true,
      generalData:nextProps.pokeData[0][0].data,
      bioData: nextProps.pokeData[0][1][0].data,
      evoData: nextProps.pokeData[0][1][1].data,
      typeColor: this.mainColor(nextProps.pokeData[0][0].data.types)
    });
    //If the next set of data is loaded, stop spinner
    if(this.state.generalData.name!=nextProps.pokeData[0][0].data.name){
      this.props.changeSpinnerState(false);
    }
  }
  mainColor(types){
    const colors = {
      normal: '#BDC3C7',
      fighting: '#A95747',
      flying: '#78A3FF',
      poison:'#AA5DA1',
      ground:'#ECCA57',
      rock:'#CEBD72',
      bug:'#C2D21F',
      ghost:'#7874D4',
      steel:'#C4C2DB',
      fire:'#FA5645',
      water:'#56AEFF',
      grass:'#8DD851',
      electric:'#FDE53E',
      psychic:'#F662B1',
      ice:'#96F1FF',
      dragon:'#8975FF',
      dark:'#8D6955',
      fairy:'#F8ADFF'
    }

    if(types.length<2){
      return colors[types[0].type.name];
    }else{
      return colors[types[1].type.name];
    }
  }
  renderBio(){
    if(this.props.spinner===true){
      if(this.state.foundData===true){
        return <img id="pokemon-spinner" src={require(`../images/pokeballspinner.png`)} width="150px"/>
      }else{
        return <img src={require(`../images/pokeballspinner.png`)} width="150px"/>
      }
    }else{
      var style={
        backgroundColor:this.state.typeColor
      }
      return(
        <div>
          <div style={style} className="pokemon-name">{(this.state.generalData.name).toUpperCase()}</div>
          <Bio 
            generalData={this.state.generalData} 
            bioData={this.state.bioData}
          />
          <div className="stats-data">
            <TypeRelations typecolor={this.state.typeColor} generalData={this.state.generalData}/>
            <Chart typecolor={this.state.typeColor} statsData={this.state.generalData.stats.reverse()}/>
          </div>
          <EvoChain typecolor={this.state.typeColor} evoData={this.state.evoData}/>
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
import React,{Component} from 'react';
import Chart from 'chart.js';

export default class StatChart extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    var statDataSet = [];
    this.props.statsData.forEach((stat)=>{
      statDataSet.push(stat.base_stat); 
    });
    const mainColor = '#E44A4C';
    const hoverColor = '#ffddee';
    var ctx = document.getElementById("StatChart");
    Chart.defaults.global.legend.display = false;
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["HP", "ATK", "DEF", "SAK", "SDF", "SPD"],
            datasets: [{
                data: statDataSet,
                backgroundColor: [
                    mainColor,
                    mainColor,
                    mainColor,
                    mainColor,
                    mainColor,
                    mainColor
                ],
                borderColor: [
                    hoverColor,
                    hoverColor,
                    hoverColor,
                    hoverColor,
                    hoverColor,
                    hoverColor
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }
  render(){
    return(
      <div className="chart-container">
        <h1>Blue</h1>
        <canvas id="StatChart" width="400" height="400"></canvas>
      </div>
    );
  }
}



import React, { Component } from 'react';
import { Line} from 'react-chartjs-2';
import './Graph.css'

export class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitChartData: {},
      impressionChartData: {},
      conversionChartData: {},
      downloadChartData: {},
      salesStatisticsChartData:{},
      netProfitChartData:{},
      totaltransactionChartData: {},
      marketingOverviewChartData:{},
      areaOptions : {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            display: false
          }],
          xAxes: [{ 
            display: false
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        },
        stepsize: 100
      },
      salesStaticsOptions : {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        elements: {
          point: {
            radius: 3
          },
          line: {
            tension: 0
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: false,
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              display: false,
              beginAtZero: false
            },
            gridLines: {
              drawBorder: false,
              color: "#f8f8f8",
              zeroLineColor: "#f8f8f8",
            }
          }],
          yAxes: [{
            ticks: {
              max: 200,
              min: 0,
              stepSize: 50,
              fontColor: "#8b9298",
              beginAtZero: false
            },
            gridLines: {
              color: "#f8f8f8",
              zeroLineColor: "#f8f8f8",
              display: true,
              drawBorder: false
            }
          }]
        }
      },
      netProfitOptions : {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 20,
            display: false,
          },
          pointLabels: {
            fontSize: 14,
            fontColor: "#6c757c",
            color: "#f3f3f3",
            zeroLineColor: "#f3f3f3"
          },
          angleLines: {
            color: "#f3f3f3",
            zeroLineColor: "#f3f3f3",
          },
          gridLines: {
            color: "#f3f3f3",
            zeroLineColor: "#f3f3f3",
          }
        },
        legend: false,
      },
      totaltransactionChartOptions :{
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        elements: {
          point: {
            radius: 0
          }
        },
        layout: {
          padding: {
            left: -10,
            right: 0,
            top: 0,
            bottom: -10
          }
        },
        legend: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              color: '#fff',
              zeroLineColor:  '#fff',
            },
            ticks: {
              display: false,
              color:  '#fff',
              zeroLineColor:  '#fff',
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              color:  '#fff',
              zeroLineColor:  '#fff',
            },
            ticks: {
              display: false,
              color: '#fff',
              zeroLineColor:  '#fff',
            }
          }]
        }
      },
      marketingOverviewOptions: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              max: 400,
              display: true,
              beginAtZero: true,
              fontColor: "#dde4eb",
              stepSize: 100
            },
            gridLines: {
              display: false,
              color: "#dde4eb",
              zeroLineColor: "#dde4eb"
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              fontColor: "#dde4eb",
              color: "#dde4eb",
              zeroLineColor: "#dde4eb"
            },
            gridLines: {
              display: true,
              color: "#dde4eb",
              zeroLineColor: "#dde4eb"
            },
            barPercentage: 0.2
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      },
      todos: [
        {
            id: 1,
            task: 'Pick up kids from school',
            isCompleted: false
        },
        {
            id: 2,
            task: 'Prepare for presentation',
            isCompleted: false
        },
        {
            id: 3,
            task: 'Print Statements',
            isCompleted: false
        },
        {
            id: 4,
            task: 'Create invoice',
            isCompleted: false
        },
        {
            id: 5,
            task: 'Call John',
            isCompleted: false
        }
      ],
      inputValue: '',
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this); 
  } 
  changeChartOneData = () =>{
    
    var oldDataSet = this.state.datasets[0];
    var oldDataSet1 = this.state.datasets[1];
    var newData = [60, 75, 65, 130, 130, 145, 110, 145, 155, 149, 170];
    var newData1 = [0, 25, 20, 40, 70, 52, 49, 90, 70, 94, 110, 135];
    var newDataSet = {
      ...oldDataSet
    };
    var newDataSet1 = {
      // ...oldDataSet,
      ...oldDataSet1
    };

    newDataSet.data = newData;
    newDataSet1.data = newData1;
    
    // console.log('this is:', oldDataSet.data);
    console.log('this is:', newDataSet.data);
    console.log('this is:', newDataSet1.data);
    var newState = {
      // ...data,
      datasets: [newDataSet, newDataSet1]
    };
    try {
      this.setState(
        newState
      );
    } catch(e) {
      throw Error(e);
    }
  }
  changeChartTwoData = () =>{
    
    var oldDataSet = this.state.datasets[0];
    var oldDataSet1 = this.state.datasets[1];
    var newData = [130, 145, 155, 60, 75, 65, 130, 110, 145, 149, 170];
    var newData1 = [0, 70, 52, 90, 25, 20, 40, 70, 49, 94, 110, 135];
    var newDataSet = {
      ...oldDataSet
    };
    var newDataSet1 = {
      // ...oldDataSet,
      ...oldDataSet1
    };

    newDataSet.data = newData;
    newDataSet1.data = newData1;
    
    // console.log('this is:', oldDataSet.data);
    console.log('this is:', newDataSet.data);
    console.log('this is:', newDataSet1.data);
    var newState = {
      // ...data,
      datasets: [newDataSet, newDataSet1]
    };
    try {
      this.setState(
        newState
      );
    } catch(e) {
      throw Error(e);
    }
  }
  changeChartThreeData = () =>{
    
    var oldDataSet = this.state.datasets[0];
    var oldDataSet1 = this.state.datasets[1];
    var newData = [130, 75, 65, 130, 110, 145, 155, 60, 145, 149, 170];
    var newData1 = [0, 70, 52, 94, 110, 135, 90, 25, 20, 40, 70, 49];
    var newDataSet = {
      ...oldDataSet
    };
    var newDataSet1 = {
      // ...oldDataSet,
      ...oldDataSet1
    };

    newDataSet.data = newData;
    newDataSet1.data = newData1;
    
    // console.log('this is:', oldDataSet.data);
    console.log('this is:', newDataSet.data);
    console.log('this is:', newDataSet1.data);
    var newState = {
      // ...data,
      datasets: [newDataSet, newDataSet1]
    };
    try {
      this.setState(
        newState
      );
    } catch(e) {
      throw Error(e);
    }
  }
  changeChartFourData = () =>{
    
    var oldDataSet = this.state.datasets[0];
    var oldDataSet1 = this.state.datasets[1];
    var newData = [130, 145, 65, 130, 75, 145, 149, 170, 110, 155, 60];
    var newData1 = [0, 70, 90, 25, 40, 20, 94, 110, 135, 70, 49, 52];
    var newDataSet = {
      ...oldDataSet
    };
    var newDataSet1 = {
      // ...oldDataSet,
      ...oldDataSet1
    };

    newDataSet.data = newData;
    newDataSet1.data = newData1;
    
    // console.log('this is:', oldDataSet.data);
    console.log('this is:', newDataSet.data);
    console.log('this is:', newDataSet1.data);
    var newState = {
      // ...data,
      datasets: [newDataSet, newDataSet1]
    };
    try {
      this.setState(
        newState
      );
    } catch(e) {
      throw Error(e);
    }
  }

  changeMarketingOneData = () =>{
    console.log("ashgj")
    var oldDataSet = this.state.datasets[0];
    var oldDataSet1 = this.state.datasets[1];
    var oldDataSet2 = this.state.datasets[2];
    var oldDataSet3 = this.state.datasets[3];
    var newData = [145, 238, 148, 293, 242, 235, 256, 334];
    var newData1 = [330, 380, 230, 400, 309, 430, 340, 310];
    var newData2 = [375, 440, 284, 450, 386, 480, 400, 365];
    var newData3 = [425, 480, 324, 490, 426, 520, 440, 405];
    var newDataSet = {
      ...oldDataSet
    };
    var newDataSet1 = {
      ...oldDataSet1
    };
    var newDataSet2 = {
      ...oldDataSet2
    };
    var newDataSet3 = {
      ...oldDataSet3
    };

    newDataSet.data = newData;
    newDataSet1.data = newData1;
    newDataSet2.data = newData2;
    newDataSet3.data = newData3;
    
    console.log('this is:', newDataSet.data);
    console.log('this is:', newDataSet1.data);
    var newState = {
      datasets: [newDataSet, newDataSet1, newDataSet2, newDataSet3]
    };
    try {
      this.setState(
        newState
      );
    } catch(e) {
      throw Error(e);
    }
  }
  changeMarketingTwoData = () =>{
    console.log("ashgj")
    var oldDataSet = this.state.datasets[0];
    var oldDataSet1 = this.state.datasets[1];
    var oldDataSet2 = this.state.datasets[2];
    var oldDataSet3 = this.state.datasets[3];
    var newData = [125, 138, 108, 193, 102, 200, 290, 204];
    var newData1 = [330, 380, 230, 400, 309, 430, 340, 310];
    var newData2 = [375, 440, 284, 450, 386, 480, 400, 365];
    var newData3 = [425, 480, 324, 490, 426, 520, 440, 405];
    var newDataSet = {
      ...oldDataSet
    };
    var newDataSet1 = {
      ...oldDataSet1
    };
    var newDataSet2 = {
      ...oldDataSet2
    };
    var newDataSet3 = {
      ...oldDataSet3
    };

    newDataSet.data = newData;
    newDataSet1.data = newData1;
    newDataSet2.data = newData2;
    newDataSet3.data = newData3;
    
    console.log('this is:', newDataSet.data);
    console.log('this is:', newDataSet1.data);
    var newState = {
      datasets: [newDataSet, newDataSet1, newDataSet2, newDataSet3]
    };
    try {
      this.setState(
        newState
      );
    } catch(e) {
      throw Error(e);
    }
  }
  changeMarketingThreeData = () =>{
    console.log("ashgj")
    var oldDataSet = this.state.datasets[0];
    var oldDataSet1 = this.state.datasets[1];
    var oldDataSet2 = this.state.datasets[2];
    var oldDataSet3 = this.state.datasets[3];
    var newData = [145, 238, 148, 293, 242, 235, 256, 334];
    var newData1 = [330, 380, 230, 400, 309, 430, 340, 310];
    var newData2 = [375, 440, 284, 450, 386, 480, 400, 365];
    var newData3 = [425, 480, 324, 490, 426, 520, 440, 405];
    var newDataSet = {
      ...oldDataSet
    };
    var newDataSet1 = {
      ...oldDataSet1
    };
    var newDataSet2 = {
      ...oldDataSet2
    };
    var newDataSet3 = {
      ...oldDataSet3
    };

    newDataSet.data = newData;
    newDataSet1.data = newData1;
    newDataSet2.data = newData2;
    newDataSet3.data = newData3;
    
    console.log('this is:', newDataSet.data);
    console.log('this is:', newDataSet1.data);
    var newState = {
      datasets: [newDataSet, newDataSet1, newDataSet2, newDataSet3]
    };
    try {
      this.setState(
        newState
      );
    } catch(e) {
      throw Error(e);
    }
  }
  statusChangedHandler(event, id) {
    const todo = {...this.state.todos[id]};
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
        todos: todos
    })
  }

  addTodo (event) {
      event.preventDefault();

      const todos = [...this.state.todos];
      todos.unshift({
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          task: this.state.inputValue,
          isCompleted: false
          
      })

      this.setState({
          todos: todos,
          inputValue: ''
      })
  }

  removeTodo (index) {
      const todos = [...this.state.todos];
      todos.splice(index, 1);

      this.setState({
          todos: todos
      })
  }

  inputChangeHandler(event) {
      this.setState({
          inputValue: event.target.value
      });
  }

  usersDoughnutChartData = {
    datasets: [{
      data: [80, 34, 100],
      backgroundColor: [
        "#19d895",
        "#2196f3",
        "#dde4eb"
      ],
      borderColor: [
        "#19d895",
        "#2196f3",
        "#dde4eb"
      ],
    }],
    labels: [
      'Request',
      'Email',
    ]
  };

  usersDoughnutChartOptions = {
    cutoutPercentage: 70,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    responsive: true,
    maintainAspectRatio: true,
    showScale: true,
    legend: {
      display: false
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  amountDueBarData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
    datasets: [{
      label: 'Profit',
      data: [39, 19, 25, 16, 31, 39, 12, 18, 33, 24],
      backgroundColor: [
        '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
      ],
      borderColor: [
        '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
      ],
      borderWidth: 2,
      fill: true
    }]
  };

  amountDueBarOptions = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },

    scales: {
      responsive: true,
      maintainAspectRatio: true,
      yAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0, 0, 0, 0.03)',
        }
      }],
      xAxes: [{
        display: false,
        barPercentage: 0.4,
        gridLines: {
          display: false,
        }
      }]
    },
    legend: {
      display: false
    }
  };
  totalRevenueData = {
    labels: [
      "Day01","Day02","Day03","Day04","Day05","Day06","Day07","Day08","Day09","Day10","Day11","Day12","Day13","Day14","Day15","Day16","Day17","Day18","Day19","Day20","Day21","Day22","Day23","Day24","Day25","Day26","Day27","Day28","Day29","Day30","Day31","Day32","Day33","Day34","Day35","Day36","Day37","Day38","Day39","Day40","Day41","Day42","Day43","Day44","Day45","Day46","Day47","Day48","Day49","Day50","Day51","Day52","Day53","Day54","Day55","Day56","Day57","Day58","Day59","Day60","Day61","Day62","Day63","Day64","Day65","Day66","Day67","Day68","Day69","Day70","Day71","Day72","Day73","Day74","Day75","Day76","Day77","Day78","Day79","Day80","Day81","Day82"
    ],
    datasets: [{
      label: 'Total Revenue',
      data: [56,
        55,59,59,59,57,56,57,54,56,58,57,59,58,59,57,55,56,54,52,49,48,50,50,46,45,49,50,52,53,52,55,54,53,56,55,56,55,54,55,57,58,56,55,56,57,58,59,58,57,55,53,52,55,57,55,54,52,55,57,56,57,58,59,58,59,57,56,55,57,58,59,60,62,60,59,58,57,56,57,56,58,59
      ],
      borderColor: '#9B86F1',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderWidth: 3,
      fill: 'origin'
    }]
  };
  totalRevenueOptions= {
    responsive:true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        display: false
      }],
      xAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0
      }
    },
    stepsize: 100
  };
  
  realTimeStatisticsData= {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
        label: 'Profit',
        data: [330, 380, 230, 400, 309, 530, 340],
        backgroundColor: "#0f5bff",
        borderColor: '#0f5bff',
        borderWidth: 0
      },
      {
        label: 'Target',
        data: [600, 600, 600, 600, 600, 600, 600],
        backgroundColor: '#e5e9f2',
        borderColor: '#e5e9f2',
        borderWidth: 0
      }
    ]
  };
  realTimeStatisticsOptions= {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 0,
        right: 25,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        display: false,
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        stacked: true,
        ticks: {
          display: false,
          beginAtZero: true,
          fontColor: "#f3f3f3",
        },
        gridLines: {
          display: false,
          color: "#f3f3f3",
          zeroLineColor: '0,0,0,0'
        },
        barPercentage: 0.5,
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  componentDidMount(){

    //your code
    var ctx = document.getElementById('visitChart')?.getContext("2d")
    var gradientBar1 = ctx?.createLinearGradient(0, 0, 0, 181)
    gradientBar1?.addColorStop(1, 'rgba(110,123,247,0.7)')
    gradientBar1?.addColorStop(0, 'rgba(255,255,255,0)')

    var ctx2 = document.getElementById('imoressionChart')?.getContext("2d")
    var gradientBar2 = ctx2?.createLinearGradient(0, 0, 0, 181)
    gradientBar2?.addColorStop(1, 'rgba(110,123,247,0.7)')
    gradientBar2?.addColorStop(0, 'rgba(255,255,255,0)')

    var ctx3 = document.getElementById('conversionChart')?.getContext("2d")
    var gradientBar3 = ctx3?.createLinearGradient(0, 0, 0, 181)
    gradientBar3?.addColorStop(1, 'rgba(110,123,247,0.7)')
    gradientBar3?.addColorStop(0, 'rgba(255,255,255,0)')

    var ctx4 = document.getElementById('downloadChart')?.getContext("2d")
    var gradientBar4 = ctx4?.createLinearGradient(0, 0, 0, 181)
    gradientBar4?.addColorStop(1, 'rgba(110,123,247,0.7)')
    gradientBar4?.addColorStop(0, 'rgba(255,255,255,0)')

    var ctx5 = document.getElementById('salesStatisticsChart')?.getContext("2d")
    var gradientBar5 = ctx5?.createLinearGradient(0, 0, 0, 450)
    gradientBar5?.addColorStop(1, 'rgba(255,255,255, 0.0)')
    gradientBar5?.addColorStop(0, 'rgba(102,78,235, 0.2)')

    var ctx6 = document.getElementById('salesStatisticsChart')?.getContext("2d")
    var gradientBar6 = ctx6?.createLinearGradient(0, 0, 0, 400)
    gradientBar6?.addColorStop(1, '#93329e41')
    gradientBar6?.addColorStop(0, '#93329e41')

    var ctx7 = document.getElementById('totaltransactionChart')?.getContext("2d")
    var gradientBar7 = ctx7?.createLinearGradient(0, 100, 200, 0)
    gradientBar7?.addColorStop(1, '#fa3252')
    gradientBar7?.addColorStop(0, '#fa5539')

    

   
   
    var Datas = [60, 75, 65, 130, 130, 145, 110, 145, 155, 149, 170];
    var Datas1 = [0, 25, 20, 40, 70, 52, 49, 90, 70, 94, 110, 135];




  

    const salesStatisticsData = {
      labels: ["Jan 1", "Jan 7", "Jan 14", "Jan 21", "Jan 28", "Feb 4", "Feb 11", "Feb 18"],
      datasets: [{
        label: 'Returns',
        data: Datas,
        borderColor: '#8862e0',
        backgroundColor: gradientBar5,
        borderWidth: 2,
        fill: true
      }, {
        label: 'Investments',
        data: Datas1,
        borderColor: '#93329E',
        backgroundColor: gradientBar6,
        borderWidth: 2,
        fill: true
      }]
    };

    this.setState(salesStatisticsData);

  }

  
  render () {
    return (
      <div className="row" >
          <div className="graph" >
                <div className="d-xl-flex flex-column flex-lg-row">
                  <ul className="nav nav-tabs sales-mini-tabs ml-lg-auto mb-4 mb-md-0" role="tablist">
                    <li className="nav-item">
                      <button className="nav-link active bg-white" id="sales-statistics_switch_1" onClick={this.changeChartOneData} data-toggle="tab" role="tab" aria-selected="true">1D</button>
                    </li>
                    <li className="nav-item">
                    <button className="nav-link  bg-white" id="sales-statistics_switch_2" onClick={this.changeChartTwoData} data-toggle="tab" role="tab" aria-selected="false">5D</button>
                    </li>
                    <li className="nav-item">
                    <button className="nav-link  bg-white" id="sales-statistics_switch_3" onClick={this.changeChartThreeData} data-toggle="tab" role="tab" aria-selected="false">1M</button>
                    </li>
                    <li className="nav-item">
                    <button className="nav-link  bg-white" id="sales-statistics_switch_3" onClick={this.changeChartFourData} data-toggle="tab" role="tab" aria-selected="false">1Y</button>
                    </li>
                  </ul>
                </div>
                {this.props.isHome ?( <div className="row" align="left">
                 <div className="col">
                    <p><b>Your Balance:</b> {this.props.balance}</p>
                    <p><b>Transactable amount:</b>  {this.props.transactableAmount}</p><br/>
                 </div>
                 <div className="col">
                 <p><b>No. of coins:</b>  {this.props.coins}</p>
                    <p><b>Price of coin:</b> 100/-</p><br/>
                 </div>
                 <h2>Your profits through Z coins</h2>
               </div>):(
                  <div>
                    <h2>Profits earned using Z coins in the last one year</h2>
                  </div>
               )}
              
                <Line  data={this.state} options={this.state.salesStaticsOptions}  datasetKeyProvider={this.datasetKeyProvider} height={50} width={100} id="salesStatisticsChart" />               
        </div> 
      </div>
   );
  }
}
export default Graph;
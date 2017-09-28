import imgRun from './img/ic_play_arrow_black_24px.svg';
import imgStop from './img/ic_stop_black_24px.svg';

import Chart from 'chart.js';
import angular from 'angular';
import moment from 'moment';
import Colors  from 'color-name';

export default class QueryController {

    constructor($scope, connectionService) {
        'ngInject';
        
        this.img = {
            run: imgRun,
            stop: imgStop
        };
        
        this.scope = $scope;
        this.connectionService = connectionService; 
        this.records = [];
    }
    
    $onInit() {
        
        let ctx = document.getElementById("time").getContext("2d");
        this.chartConfig = 
            {
                type: 'line',
                data: {
                 datasets:[]
                },
                options: {
                   scales: {
                       xAxes: [{
                         type: 'time',
                         distribution: 'linear'
                        }]
                    }
                 }
             };
         this.chart = new Chart(ctx, this.chartConfig);    
      }
    
    
    updateChartData(data) {
        let labels = Object.keys(data);
        labels
            .filter(label => label != 'timestamp')
            .forEach (label => {
                let dataset = this.chartConfig.data.datasets.find(dataset => dataset.label == label); 
                if (!dataset) {
                    dataset = this.createDataSet(label);
                    this.chartConfig.data.datasets.push(dataset);
                }
                dataset.data.push({x: new Date(data.timestamp), y: data[label]});
                if (dataset.data.length > 50) {
                    dataset.data.shift();
                }
        });
        
        this.chart.update();
    }
    
    resetChartData() {
        this.chartConfig.data.datasets.forEach(dataset => {
            dataset.data = [];
        });
          this.chart.update();
    }
    
    createDataSet(label) {
        let colorNames = Object.keys(Colors);
        let newColor = colorNames[(this.chartConfig.data.datasets.length + 71) % colorNames.length];
        let dataSet = {
            label: label,
            borderColor: newColor,
            fill: false,
            data: []
         };
        return dataSet;
    }
  
    run() {
         
        let queryService = this.connectionService.connection.service("query");
        
         queryService.get(this.query)
            .then(response => console.log(response))
            .catch(err=>console.error('server error', JSON.stringify(err.message)));
       
          if (this.listener) {
            queryService.removeListener('data',  this.listener);        
          }
        
          this.listener = (record) => {
              if (record) {
                  this.updateChartData(record);
                  record.timestamp = moment(record.timestamp).format('HH:mm:ss'); 
                  this.records.push(record);
                  if (this.records.length > 50) {
                    this.records.shift();
                  }
                  console.log("record receied: "+record);
                  this.scope.$apply();
              }
          };
          
          queryService.on('data', this.listener);
        
    }
    
    stop() {
         let queryService = this.connectionService.connection.service("query");
         
         if (this.listener) {
            queryService.removeListener('data',  this.listener);        
          }
        
         this.listener = null;
        
         this.records = [];
        
         this.resetChartData();
        
        queryService.get('stop')
              .then(response => console.log(response))
              .catch(err=>console.error('server error', JSON.stringify(err.message)));
        
        
    }
   
}

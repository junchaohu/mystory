'use strict';

app
	.controller('DeviceStatusController', function($scope, highchartsNG, DTOptionsBuilder) {
		$scope.factory = {};
		$scope.factories = [{
			id: '1',
			name: 'JQPT'
		}, {
			id: '2',
			name: 'JQPT2'
		}];

		$scope.shop = {};
		$scope.shops = [{
			number: '1',
			text: 'LGE发动机'
		}, {
			number: '2',
			text: 'GF6变速箱'
		}, {
			number: '3',
			text: 'L850发动机'
		}, {
			number: '4',
			text: 'CSS发动机'
		}, {
			number: '5',
			text: '风机'
		},{
			number: '6',
			text: '冷冻站'
		}, {
			number: '7',
			text: '办公生活'
		}, {
			number: '8',
			text: '仓储实验'
		}];

		$scope.line = {};
		$scope.lines = [{
			number: '1',
			text: 'LGE生产线'
		}, {
			number: '2',
			text: 'GF6生产线'
		}, {
			number: '3',
			text: 'L850生产线'
		}, {
			number: '4',
			text: 'CSS生产线'
		}, {
			number: '5',
			text: '风机'
		}, {
			number: '6',
			text: '冷冻站'
		}, {
			number: '7',
			text: '办公生活'
		}];

		$scope.daterange = {
			startDate: null,
			endDate: null
		};

		$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withDOM('<"html5buttons"B>lTfgitp')
			.withOption('order', false)
			.withButtons([{
					extend: 'copy'
				}, {
					extend: 'csv'
				}, {
					extend: 'excel',
					title: 'ExampleFile'
				}, {
					extend: 'pdf',
					title: 'ExampleFile'
				},

				{
					extend: 'print',
					customize: function(win) {
						$(win.document.body).addClass('white-bg');
						$(win.document.body).css('font-size', '10px');

						$(win.document.body).find('table')
							.addClass('compact')
							.css('font-size', 'inherit');
					}
				}
			]);

		/**
		 * persons - Data used in Tables view for Data Tables plugin
		 */
		$scope.persons = [{
			id: 1,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
			
		}, {
			id: 2,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		}, {
			id: 3,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		},{
			id: 4,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		},{
			id: 5,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'设施',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		},{
			id: 6,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		},{
			id: 7,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		},{
			id: 8,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		},{
			id: 9,
			line: 'LGE CB',
			gongwei:'OP10A',
			shuxing:'非重点能耗设备',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		},{
			id: '汇总',
			line: 'LGE CB',
			gongwei:'N/A',
			shuxing:'***',
			xing:'***',
			bi1:'13%',
			bi2:'15%'
		}];


		$scope.PieChart4 = {
		    data: [1, 4],
		    options: {
		        fill: ["#1ab394", "#d7d7d7"]
		    }
		};


		$scope.chartConfig = {
			options: {
				chart: {
					type: 'column',
					height:266
				},
				
				legend:{
					enabled:false
				},
				xAxis: {
					categories: [
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					],
					crosshair: true
				},

				
				

			},

			series: [{
				name: '运行',
				data: [Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1),
				 Math.floor(Math.random()*500+1)
				 ]

			},{
				name: '空运转',
				data: [Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1),
				 Math.floor(Math.random()*200+1)
				 ]

			},{
				name: '待机',
				data: [Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1),
				 Math.floor(Math.random()*100+1)
				 ]

			}],


			
		};



		$scope.pieConfig = {
			options: {
				chart: {
					type: 'pie',
					height:266
				},
				tooltip: {
					pointFormat: '</br> <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						innerSize: 50,
						//allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							style: {
								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						}
					}
				},
			},
			series: [{
				name: 'Percentage',
				colorByPoint: true,
				data: [{
					name: '运行',
					y: Math.floor(Math.random()*50+1),
					
				}, {
					name: '空运转',
					y: Math.floor(Math.random()*20+1),
					
				}, {
					name: '待机',
					y: Math.floor(Math.random()*10+1)
				},{
					name: '关机',
					y: Math.floor(Math.random()*20+1)
				}]
			}],

		};

		$scope.combConfig={
			options:{
				
				xAxis: {
					categories: [
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					],
					crosshair: true
				},
				
			},
			
			series: [{
			            type: 'column',
			            name: '重点设备',
						data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
			        }, {
			            type: 'column',
			            name: '非重点设备',
						data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
			        }, {
			            type: 'column',
			            name: '厂务设备',
						data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
			        }, {
			            type: 'pie',
			            name: 'Percentage',
			            data: [{
			                name: '重点设备',
			                y: 13,
			                color: Highcharts.getOptions().colors[0] // Jane's color
			            }, {
			                name: '非重点设备',
			                y: 23,
			                color: Highcharts.getOptions().colors[1] // John's color
			            }, {
			                name: '厂务设备',
			                y: 19,
			                color: Highcharts.getOptions().colors[2] // Joe's color
			            }],
			            center: [100, 40],
			            size: 100,
			            showInLegend: false,
			            dataLabels: {
			                enabled: false,
			            },
			            tooltip: {
							pointFormat: '</br> <b>{point.percentage:.1f}%</b>'
						},
			        }]
		};

		$scope.cbModel={
			value1:true,
			value2:false,
			value3:true,
			value4:true,
			value5:false,
			value6:true,
			value7:false,
			value8:true,
		}
		$scope.totalEnergy="column";

		$scope.cbChange1=function(){
			if ($scope.cbModel.value1 && $scope.cbModel.value2) {
				$scope.totalEnergy='both';
			} else if($scope.cbModel.value1 && !$scope.cbModel.value2) {
				$scope.totalEnergy='column';

			} else if(!$scope.cbModel.value1 && $scope.cbModel.value2){
				$scope.totalEnergy='pie';
			} else {
				$scope.totalEnergy='column';
				$scope.cbModel.value1=true;
			}
		};

		




	});
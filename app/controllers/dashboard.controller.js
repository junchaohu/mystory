'use strict';

app
	.controller('DashboardController', function($scope, highchartsNG) {


		$scope.chartConfig = {
			options: {
				chart: {
					type: 'column',

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
				yAxis: [{
					labels: {
				                style: {
				                    color: Highcharts.getOptions().colors[0]
				                }
				            },
				            title: {
				                text: null,
				                style: {
				                    color: Highcharts.getOptions().colors[0]
				                }
				            },

				},{ // Primary yAxis
							id:'温度',
				            labels: {
				            	format: '{value}°C',
				                style: {
				                    color: Highcharts.getOptions().colors[2]
				                }
				            },
				            title: {
				                text: '温度',
				                style: {
				                    color: Highcharts.getOptions().colors[2]
				                }
				            },
				            opposite: true

				        }],
				        

			},

			series: [{
				name: '分厂1',
				yAxis: 0,
				data: [
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1)
				]

			}, {
				name: '分厂2',
				yAxis: 0,
				data: [
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1)
				]

			}, {
				name: '分厂3',
				yAxis: 0,
				data: [ 
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 380 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1),
					Math.floor(Math.random() * 370 + 1)
				]

			}, {
				name: '温度',
				type: 'spline',
				yAxis:1,
				data: [
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),
					Math.floor(Math.random() * 25 + 1),

				],
				tooltip: {
					valueSuffix: ' °C'
				}
			}],



		};

		$scope.areaConfig = {
			options: {
				chart: {
					type: 'area',

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
				name: '重点设备',
				data: [
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400),
					Math.floor(Math.random() * 600 + 400)
				]

			}, {
				name: '非重点设备',
				data: [
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200),
					Math.floor(Math.random() * 400 + 200)
				]

			}, {
				name: '厂务设备',
				data: [
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				]

			}],



		};

		$scope.pieConfig = {
			options: {
				chart: {
					type: 'pie',

				},
				tooltip: {
					pointFormat: '</br> <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
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
					name: 'LGE',
					y: 56.33
				}, {
					name: 'GF6',
					y: 24.03,
					sliced: true,
					selected: true
				}, {
					name: 'L850',
					y: 10.38
				}]
			}],


			title: {
				text: null
			},
			//useHighStocks: true
		};

		$scope.combConfig = {
			options: {

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
				name: 'LGE',
				data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0,
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				]
			}, {
				type: 'column',
				name: 'GF6',
				data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5,
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				]
			}, {
				type: 'column',
				name: 'L850',
				data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3,
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				]
			}, {
				type: 'pie',
				name: 'Percentage',
				data: [{
					name: 'LGE',
					y: 13,
					color: Highcharts.getOptions().colors[0] // Jane's color
				}, {
					name: 'GF6',
					y: 23,
					color: Highcharts.getOptions().colors[1] // John's color
				}, {
					name: 'L850',
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



	});
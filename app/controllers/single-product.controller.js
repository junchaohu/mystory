'use strict';

app
	.controller('SingleProductController', function($scope, highchartsNG, DTOptionsBuilder) {
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
			id: 'LGE',
			elec: '4525421',
			water: '125456',
			energy: '1254254154',
			cost: '25415421561',
			percent: '25%'
		}, {
			id: 'GF6',
			elec: '884451154',
			water: '55215432',
			energy: '66545451546',
			cost: '22154855115',
			percent: '55%'
		}, {
			id: 'L850',
			elec: '5251154',
			water: '335165',
			energy: '22154854',
			cost: '33654845',
			percent: '20%'
		}];

		$scope.heatConfig = {
			options: {
				chart: {
				            type: 'heatmap',
				            //marginTop: 40,
				            //marginBottom: 80,
				            plotBorderWidth: 1
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
					//crosshair: true
				},

				yAxis: {
				            categories: ['LGE', 'GF6', 'L850', 'JQPT', 'OTHER'],
				            title: null
				        },

				 colorAxis: {
				             //min: 0,
				             minColor: '#FFFFFF',
				             maxColor: Highcharts.getOptions().colors[0]
				         },

				         legend: {
				             align: 'right',
				             layout: 'vertical',
				             margin: 0,
				             verticalAlign: 'top',
				             y: 25,
				             symbolHeight: 220
				         },

				         tooltip: {
				             formatter: function () {
				                 return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> ues <br><b>' +
				                     this.point.value + '</b> energy on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
				             }
				         },


			},

			series: [{
				name: '单产品',
				
				
				borderWidth: 1,
				            data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
				            dataLabels: {
				                enabled: true,
				                color: '#000000'
				            }


			}],



		};

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


			},

			series: [{
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

		$scope.cbModel = {
			value1: true,
			value2: false,
			value3: true,
			value4: true,
			value5: false,
			value6: true,
			value7: true,
			value8: false,
		}
		$scope.totalEnergy = "column";

		$scope.cbChange1 = function() {
			if ($scope.cbModel.value1 && $scope.cbModel.value2) {
				$scope.totalEnergy = 'both';
			} else if ($scope.cbModel.value1 && !$scope.cbModel.value2) {
				$scope.totalEnergy = 'column';

			} else if (!$scope.cbModel.value1 && $scope.cbModel.value2) {
				$scope.totalEnergy = 'pie';
			} else {
				$scope.totalEnergy = 'column';
				$scope.cbModel.value1 = true;
			}
		};

		$scope.totalCost = "both";

		$scope.cbChange2 = function() {
			if ($scope.cbModel.value3 && $scope.cbModel.value4) {
				$scope.totalCost = 'both';
			} else if ($scope.cbModel.value3 && !$scope.cbModel.value4) {
				$scope.totalCost = 'column';

			} else if (!$scope.cbModel.value3 && $scope.cbModel.value4) {
				$scope.totalCost = 'pie';
			} else {
				$scope.totalCost = 'column';
				$scope.cbModel.value3 = true;
			}
		};

		$scope.totalElec = "pie";

		$scope.cbChange3 = function() {
			if ($scope.cbModel.value5 && $scope.cbModel.value6) {
				$scope.totalElec = 'both';
			} else if ($scope.cbModel.value5 && !$scope.cbModel.value6) {
				$scope.totalElec = 'column';

			} else if (!$scope.cbModel.value5 && $scope.cbModel.value6) {
				$scope.totalElec = 'pie';
			} else {
				$scope.totalElec = 'column';
				$scope.cbModel.value5 = true;
			}
		};

		$scope.totalWater = "column";

		$scope.cbChange4 = function() {
			if ($scope.cbModel.value7 && $scope.cbModel.value8) {
				$scope.totalWater = 'both';
			} else if ($scope.cbModel.value7 && !$scope.cbModel.value8) {
				$scope.totalWater = 'column';

			} else if (!$scope.cbModel.value7 && $scope.cbModel.value8) {
				$scope.totalWater = 'pie';
			} else {
				$scope.totalWater = 'column';
				$scope.cbModel.value7 = true;
			}
		};



	});
'use strict';

app
	.controller('KeyDeviceController', function($scope, highchartsNG, DTOptionsBuilder) {
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
			id: '重点设备',
			elec: '4525421',
			water: '125456',
			energy: '1254254154',
			cost: '25415421561',
			percent: '25%'
		}, {
			id: '非重点设备',
			elec: '884451154',
			water: '55215432',
			energy: '66545451546',
			cost: '22154855115',
			percent: '55%'
		}, {
			id: '厂务设备',
			elec: '5251154',
			water: '335165',
			energy: '22154854',
			cost: '33654845',
			percent: '20%'
		}, {
			id: '汇总',
			elec: '52511054',
			water: '3350165',
			energy: '22154854',
			cost: '33654845',
			percent: '70%'
		}];

		$scope.percent=function(y,stack){
			return (y/stack)* 100% +'%';
		},

		$scope.totalConfig = {
			options: {
				chart: {
					type: 'column',
					options3d: {
						enabled: true,
						alpha: 10,
						beta: 15,
						depth: 25
					}

				},

				

				plotOptions: {
					
					column: {
						stacking: 'normal',
						depth: 25
					}
				},
				tooltip: {
            		headerFormat: '<b>{point.key}</b><br>',
            		pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}  </br>'
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
					
				},


			},

			series: [{
				name: '重点设备',
				
				data: [49, 71, 106, 129, 144,
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				],
				stack:'total',

			}, {
				name: '非重点设备',
				data: [83, 78, 98, 93, 106,
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				],
				stack:'total',


			}, {
				name: '厂务设备',
				stack:'total',
				data: [48, 38, 39, 41, 47,
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				],
				stack:'total',


			}],

			func: function(chart) {
				$scope.mouseEvent(chart);
			}


		};
		
		$scope.mouseEvent=function(chart){
			angular.element('.chart').bind('mousedown.hc touchstart.hc', function(eStart) {
				eStart = chart.pointer.normalize(eStart);

				var posX = eStart.pageX,
					posY = eStart.pageY,
					alpha = chart.options.chart.options3d.alpha,
					beta = chart.options.chart.options3d.beta,
					newAlpha,
					newBeta,
					sensitivity = 5; // lower is more sensitive

				angular.element(document).bind({
					'mousemove.hc touchdrag.hc': function(e) {
						// Run beta
						newBeta = beta + (posX - e.pageX) / sensitivity;
						chart.options.chart.options3d.beta = newBeta;

						// Run alpha
						newAlpha = alpha + (e.pageY - posY) / sensitivity;
						chart.options.chart.options3d.alpha = newAlpha;

						chart.redraw(false);
					},
					'mouseup touchend': function() {
						angular.element(document).unbind('.hc');
					}
				});
			});
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
				name: '重点设备',
				data: [49.9, 71.5, 106.4, 129.2, 144.0, 
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				]

			}, {
				name: '非重点设备',
				data: [83.6, 78.8, 98.5, 93.4, 106.0, 
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1),
					Math.floor(Math.random() * 200 + 1)
				]

			}, {
				name: '厂务设备',
				data: [48.9, 38.8, 39.3, 41.4, 47.0, 
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
					name: '重点设备',
					y: 56.33
				}, {
					name: '非重点设备',
					y: 24.03,
					sliced: true,
					selected: true
				}, {
					name: '厂务设备',
					y: 10.38
				}]
			}],

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
				name: '重点设备',
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
				name: '非重点设备',
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
				name: '厂务设备',
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

		$scope.cbModel = {
			value1: true,
			value2: false,
			value3: true,
			value4: true,
			value5: false,
			value6: true,
			value7: false,
			value8: true,
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
				$scope.totalElec = 'pie';
				$scope.cbModel.value6 = true;
			}
		};

		$scope.totalWater = "pie";

		$scope.cbChange4 = function() {
			if ($scope.cbModel.value7 && $scope.cbModel.value8) {
				$scope.totalWater = 'both';
			} else if ($scope.cbModel.value7 && !$scope.cbModel.value8) {
				$scope.totalWater = 'column';

			} else if (!$scope.cbModel.value7 && $scope.cbModel.value8) {
				$scope.totalWater = 'pie';
			} else {
				$scope.totalWater = 'pie';
				$scope.cbModel.value8 = true;
			}
		};



	});
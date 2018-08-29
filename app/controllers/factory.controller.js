'use strict';

app
	.controller('FactoryController', function($scope, highchartsNG, DTOptionsBuilder) {
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
			id: 'JQPT',
			elec: '4525421',
			water: '125456',
			energy: '1254254154',
			cost: '25415421561',
			percent: '25%'
		}, {
			id: 'JQPT2',
			elec: '884451154',
			water: '55215432',
			energy: '66545451546',
			cost: '22154855115',
			percent: '55%'
		}, {
			id: 'JQPT3',
			elec: '5251154',
			water: '335165',
			energy: '22154854',
			cost: '33654845',
			percent: '20%'
		}, {
			id: '汇总',
			elec: '52511504',
			water: '3351650',
			energy: '221548054',
			cost: '336548450',
			percent: '99%'
		}];

		$scope.benchmarkingConfig ={
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: 'LGE产品能耗对标管理'
			},
			subtitle: {
				text: '-'
			},
			xAxis: [{
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				crosshair: true
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					format: '{value}°C',
					style: {
						color: Highcharts.getOptions().colors[2]
					}
				},
				title: {
					text: '实际能耗',
					style: {
						color: Highcharts.getOptions().colors[2]
					}
				},
				opposite: true

			}, { // Secondary yAxis
				gridLineWidth: 0,
				title: {
					text: 'Rainfall',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				labels: {
					format: '{value} mm',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				}

			}, { // Tertiary yAxis
				gridLineWidth: 0,
				title: {
					text: '理论能耗',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				labels: {
					format: '{value} mb',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				x: 80,
				verticalAlign: 'top',
				y: 55,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
			},
			series: [{
				name: 'LGE实际能耗',
				type: 'column',
				yAxis: 1,
				data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
				tooltip: {
					valueSuffix: ' mm'
				}

			},   {
				name: 'LGE理论能耗',
				type: 'spline',
				data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
				tooltip: {
					valueSuffix: ' °C'
				}
			}]
		};

		$scope.totalConfig = {
					options: {
						chart: {
							type: 'column',
							options3d: {
								enabled: true,
								alpha: 10,
								beta: 15,
								depth: 70
							}

						},

						legend: {
							enabled: false
						},

						plotOptions: {
							column: {
								depth: 25
							}
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
						name: '集团',
						data: [49.9, 71.5, 106.4, 129.2, 144.0,
							Math.floor(Math.random() * 200 + 1),
							Math.floor(Math.random() * 200 + 1),
							Math.floor(Math.random() * 200 + 1),
							Math.floor(Math.random() * 200 + 1),
							Math.floor(Math.random() * 200 + 1),
							Math.floor(Math.random() * 200 + 1),
							Math.floor(Math.random() * 200 + 1)
						]

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
					options3d: {
						enabled: true,
						alpha: 10,
						beta: 15,
						depth: 70
					}

				},
				plotOptions: {
					column: {
						depth: 25
					}
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
				name: 'JQPT',
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
				name: 'JQPT2',
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
				name: 'JQPT3',
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
			func: function(chart) {
				$scope.mouseEvent(chart);
			}


		};



		$scope.pieConfig = {
			options: {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45
					}

				},
				tooltip: {
					pointFormat: '</br> <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						innerSize: 100,
						depth: 45,
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
					name: 'JQPT',
					y: 56.33
				}, {
					name: 'JQPT2',
					y: 24.03,
					
				}, {
					name: 'JQPT3',
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
				name: 'JQPT',
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
				type: 'column',
				name: 'JQPT2',
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
				type: 'column',
				name: 'JQPT3',
				data: [48.9, 38.8, 39.3, 41.4, 47.0, 
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
					name: 'JQPT',
					y: 13,
					color: Highcharts.getOptions().colors[0] // Jane's color
				}, {
					name: 'JQPT2',
					y: 23,
					color: Highcharts.getOptions().colors[1] // John's color
				}, {
					name: 'JQPT3',
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
			value1: 'column',
			value2: "pie",
			value3: 'pie',
			value4: "column",
			
		}
		$scope.totalEnergy = "column";

		$scope.cbChange1 = function(type) {
			

			if(type=='column'){
				$scope.totalEnergy = 'column';
			}else{
				$scope.totalEnergy = 'pie';
			}
		};

		$scope.totalCost = "pie";

		$scope.cbChange2 = function(type) {
			if(type=='column'){
				$scope.totalCost = 'column';
			}else{
				$scope.totalCost = 'pie';
			}
		};

		$scope.totalElec = "pie";

		$scope.cbChange3 = function(type) {
			if(type=='column'){
				$scope.totalElec = 'column';
			}else{
				$scope.totalElec = 'pie';
			}
		};

		$scope.totalWater = "column";

		$scope.cbChange4 = function(type) {
			if(type=='column'){
				$scope.totalWater = 'column';
			}else{
				$scope.totalWater = 'pie';
			}
		};


	});
'use strict';

app
	.controller('NonProductDayController', function($scope, highchartsNG, DTOptionsBuilder) {
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
		}, {
			id: '汇总',
			elec: '52511054',
			water: '3350165',
			energy: '221504854',
			cost: '33654845',
			percent: '80%'
		}];



		$scope.pieConfig1 = {
			options: {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45
					}

				},
				//tooltip: {
				//	pointFormat: '</br> <b>{point.percentage:.1f}%</b>'
				//},
				plotOptions: {
					pie: {
						innerSize: 100,
						depth: 45,
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
				name: '能耗',
				colorByPoint: true,
				data: [{
					name: '生产日',
					y: Math.floor(Math.random() * 500 + 1),
				}, {
					name: '非生产日',
					y: Math.floor(Math.random() * 200 + 1),

				}]
			}],



		};



		///////////////////////////////////



		$scope.pieConfig = {
			options: {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45
					}

				},
				//tooltip: {
				//	pointFormat: '</br> <b>{point.percentage:.1f}%</b>'
				//},
				plotOptions: {
					pie: {
						innerSize: 100,
						depth: 45,
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
				name: '能耗',
				colorByPoint: true,
				data: [{
					name: 'LGE',
					y: Math.floor(Math.random() * 200 + 1),
				}, {
					name: 'GF6',
					y: Math.floor(Math.random() * 100 + 1),

				}, {
					name: 'L850',
					y: Math.floor(Math.random() * 50 + 1),
				}]
			}],


			title: {
				text: null
			},
			//useHighStocks: true
		};



	});
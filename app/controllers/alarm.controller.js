'use strict';

app
	.controller('AlarmController', function($scope, highchartsNG, DTOptionsBuilder) {
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
			.withDisplayLength(25)
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
			id: '分厂一',
			elec: '分厂',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: 'GF6产品',
			elec: '产品',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: '车间一',
			elec: '车间',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		},{
			id: '分厂二',
			elec: '分厂',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: 'GF6产品',
			elec: '产品',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: '车间二',
			elec: '车间',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		},{
			id: '分厂二',
			elec: '分厂',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: 'GF6产品',
			elec: '产品',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: '车间一',
			elec: '车间',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		},{
			id: '分厂二',
			elec: '分厂',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: 'GF6产品',
			elec: '产品',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: '车间三',
			elec: '车间',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		},{
			id: '分厂三',
			elec: '分厂',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: 'GF6产品',
			elec: '产品',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: '车间三',
			elec: '车间',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		},{
			id: '分厂三',
			elec: '分厂',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: 'GF6产品',
			elec: '产品',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}, {
			id: '车间三',
			elec: '车间',
			water: Math.floor(Math.random()*200000+1),
			energy: Math.floor(Math.random()*200000+5000),
			cost: '2016-'+Math.floor(Math.random()*12+1)+'-'+Math.floor(Math.random()*30+1),
		}];


		

		


	});
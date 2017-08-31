define(['Chart', 'echarts', 'moment'], function(Chart, echarts, moment) {
	return ['$scope', 'GridService', 'MENU_GROUPS', 'SectionsService', HomepageCtrl];

	function HomepageCtrl($scope, GridService, menuGroups, SectionsService) {
		//设备列表
		var toogle = document.getElementsByClassName('sidebar-toggle')[0];
		
		createCpuChart();
		createBarChart();
		createLegendChart();
		
		$scope.menus = menuGroups;
		$scope.addSection = function (section) {
            SectionsService.addActiveSection(section);
        };

		toogle.onclick = function() {
			if($('#cpuChart').width() == 799){			//仪表盘图表在1920时自适应
				$('#cpuChart').width(714);
			}else if($('#cpuChart').width() == 714){
				$('#cpuChart').width(799);
			}else if($('#cpuChart').width() == 538) {	//仪表盘图表在1366时自适应
				$('#cpuChart').width(454);
			}else if($('#cpuChart').width() == 454){
				$('#cpuChart').width(538);
			}else if($('#cpuChart').width() == 498){	//仪表盘图表在1280时自适应
				$('#cpuChart').width(413);
			}else if($('#cpuChart').width() == 413){
				$('#cpuChart').width(498);
			}
			createCpuChart();
		}

		//系统信息
		// 基于准备好的dom，初始化echarts实例
		function createCpuChart() {
			var myChart = echarts.init(document.getElementById('cpuChart'));
			// 指定图表的配置项和数据
			option = {
				tooltip: {
					formatter: "{a} <br/>{c} {b}"
				},
				toolbox: {
					show: true
				},
				series: [{
						name: 'CPU',
						type: 'gauge',
						z: 3,
						min: 0,
						max: 100,
						splitNumber: 10,
						radius: '70%',
						axisLine: { // 坐标轴线
							lineStyle: { // 属性lineStyle控制线条样式
								width: 8
							}
						},
						axisTick: { // 坐标轴小标记
							length: 10, // 属性length控制线长
							lineStyle: { // 属性lineStyle控制线条样式
								color: 'auto'
							}
						},
						splitLine: { // 分隔线
							length: 12, // 属性length控制线长
							lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
								color: 'auto'
							}
						},
						pointer: {
							width: 4
						},
						title: {
							textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontWeight: 'bolder',
								fontSize: 14,
								fontStyle: 'italic'
							}
						},
						detail: {
							textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontWeight: 'bolder',
								fontSize: 16
							}
						},
						data: [{
							value: 40,
							name: 'CPU'
						}]
					},
					{
						name: '内存',
						type: 'gauge',
						center: ['18%', '55%'], // 默认全局居中
						radius: '60%',
						min: 0,
						max: 100,
						endAngle: 45,
						splitNumber: 10,
						axisLine: { // 坐标轴线
							lineStyle: { // 属性lineStyle控制线条样式
								width: 6
							}
						},
						axisTick: { // 坐标轴小标记
							length: 8, // 属性length控制线长
							lineStyle: { // 属性lineStyle控制线条样式
								color: 'auto'
							}
						},
						splitLine: { // 分隔线
							length: 10, // 属性length控制线长
							lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
								color: 'auto'
							}
						},
						pointer: {
							width: 3
						},
						title: {
							offsetCenter: [0, '-30%'], // x, y，单位px,
							fontSize: 14,
							fontStyle: 'italic',
							fontWeight: 'bolder'
						},
						detail: {
							textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontWeight: '',
								fontSize: '18',
								fontWeight: 'bolder'
							}
						},
						data: [{
							value: 64,
							name: '内存'
						}]
					},
					{
						name: '硬盘',
						type: 'gauge',
						center: ['82%', '55%'], // 默认全局居中
						radius: '60%',
						min: 0,
						max: 100,
						startAngle: 140,
						endAngle: -45,
						splitNumber: 10,
						axisLine: { // 坐标轴线
							lineStyle: { // 属性lineStyle控制线条样式
								width: 6
							}
						},
						axisTick: { // 坐标轴小标记
							length: 8, // 属性length控制线长
							lineStyle: { // 属性lineStyle控制线条样式
								color: 'auto'
							}
						},
						splitLine: { // 分隔线
							length: 10, // 属性length控制线长
							lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
								color: 'auto'
							}
						},
						pointer: {
							width: 3
						},
						title: {
							offsetCenter: [0, '-30%'], // x, y，单位px,
							fontSize: 14,
							fontStyle: 'italic',
							fontWeight: 'bolder'
						},
						detail: {
							textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontWeight: 'bolder',
								fontSize: 18
							}
						},
						data: [{
							value: 83,
							name: '硬盘'
						}]
					}
				]
			};

			/*setInterval(function() {
				option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
				option.series[1].data[0].value = (Math.random() * 100).toFixed(2) - 0;
				option.series[2].data[0].value = (Math.random() * 100).toFixed(2) - 0;*/
			myChart.setOption(option, true);
			//}, 2000);
		}

		//上号信息

		function createBarChart() {
			var barChart = echarts.init(document.getElementById('barChart'));
			options = {
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					axisTick: {
						alignWithLabel: true
					}
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '直接访问',
					type: 'bar',
					barWidth: '60%',
					data: [10, 52, 200, 334, 390, 330, 220]
				}]
			};

			barChart.setOption(options, true);
		}

		//归属地

		function createLegendChart() {
			var legendChart = echarts.init(document.getElementById('legend-chart'));
			options = {
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'value'
				}],
				yAxis: [{

					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
					axisTick: {
						alignWithLabel: true
					}
				}],
				series: [{
					name: '直接访问',
					type: 'bar',
					barWidth: '60%',
					data: [333333, 444444, 555555, 666666, 777777]
				}]
			};
			legendChart.setOption(options, true);
		}

		//地理视图

	}

});
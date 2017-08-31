define([
	'angular'
], function (angular) {
	'use strict';
	angular.module('webApp.menu', [])
		.constant('MENU_GROUPS', [
			{
				 name: '首页',
				 id: 'main_home',
				 icon: 'fa-home',
				 default: true,
				 active:true,
				 templateUrl: 'js/modules/app/templates/home.html'
			 },
/*			 {
				 name: '地理视图',
				 id: 'main_map',
				 icon: 'fa-globe',
				 default: true,
				 active:true,
				 templateUrl: 'js/modules/app/templates/map.html'
			 },*/
			 {
				name: '设备操作',
				icon: 'fa-laptop',
				subMenus: [
					{
						name: '设备列表',
						id: 'device_list',
						templateUrl: 'js/modules/device/templates/device_list.html'
					}
				]
			},
			{
				name: '业务管理',

				icon: 'fa-database',
				// permissions:'ALARM_READ,ALARM_MANAGE',
				subMenus: [
					{
						name: '业务人员管理',
						id: 'bus_user',
						templateUrl: 'js/modules/base/templates/bus_user.html'
					},
					{
						name: '黑名单管理',
						id: 'black_list',
						templateUrl: 'js/modules/base/templates/black_list.html'
					},
					{
						name: '目标告警通知策略',
						id: 'backlist_alarm_notify_policy',
						templateUrl: 'js/modules/base/templates/backlist_alarm_notify_policy.html'
					},
					{
						name: '设备告警通知策略',
						id: 'device_alarm_notify_policy',
						templateUrl: 'js/modules/base/templates/device_alarm_notify_policy.html'
					}
				]
			},
			{
				name: '数据分析',
				icon: 'fa-bar-chart',
				subMenus: [
					
					{
						name: '碰撞分析',
						id: 'across_analysis',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/across_analysis.html'
					},
					{
						name: '伴随分析',
						id: 'partner_analysis',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/partner_analysis.html'
					},
					{
						name: '常驻人口分析',
						id: 'resident_analysis',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/resident_analysis.html'
					},
					{
						name: '终端轨迹跟踪',
						id: 'trace_log',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/trace_log.html'
					},
					{
						name: '统计流量分析',
						id: 'traffic_analysis',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/traffic_analysis.html'
					},
					{
						name: '归属地统计',
						id: 'belonging',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/belonging.html'
					},
					/*{
						name: 'Wifi设备上报信息',
						id: 'wifi',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/wifi.html'
					},*/
					{
						name: '综合查询',
						id: 'report_history',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/report_history.html'
					},
					{
						name: '通知记录',
						id: 'notify_log',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/report/templates/notify_log.html'
					}
				]
			},
			{
				name: '告警信息',
				icon: 'fa-bell',
				// permissions:'ALARM_READ,ALARM_MANAGE',
				subMenus: [
					{
						name: '黑名单告警',
						id: 'warning_blacklist',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/warning/templates/warning_blacklist.html'
					},
					{
						name: '设备告警',
						id: 'warning_device',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/warning/templates/warning_device.html'
					},
					{
						name: '系统告警',
						id: 'warning_system',
						//permissions:'ALARM_READ,ALARM_MANAGE',
						templateUrl: 'js/modules/warning/templates/warning_system.html'
					}
				]
			},
			{
				name: '系统设置',
				icon: 'fa-cogs',
				// permissions:'SYSTEM_USER_CONFIG,SYSTEM_USER_READ,SYSTEM_ROLE_READ,SYSTEM_ROLE_CONFIG,SYSTEM_SCOPE_READ,SYSTEM_SCOPE_CONFIG,SYSTEM_LOG_READ,SYSTEM_LOG_CONFIG,SYSTEM_CONFIG_READ,SYSTEM_CONFIG_READ',
				subMenus: [
					{
						name: '用户管理',
						id: 'system_user',
						permissions: 'SYSTEM_USER_CONFIG,SYSTEM_USER_READ',
						templateUrl: 'js/modules/system/templates/user.html'
					},
					{
						name: '授权管理',
						id: 'system_license',
						//permissions:'SYSTEM_LOG_READ,SYSTEM_LOG_CONFIG',
						templateUrl: 'js/modules/system/templates/license.html'
					},
					{
						name: '系统设置',
						id: 'system_configure',
						permissions: 'SYSTEM_CONFIG_READ,SYSTEM_CONFIG_WRITE',
						templateUrl: 'js/modules/system/templates/configure.html'
					}

				]
			}
		]);


});
define(
	function () {
		var INVALID_TOKEN = 9999;
		var SUCESS = 0;

		return ['$q', '$location', '$rootScope', 'DialogService',  'AlertService', '$http', 'Upload', 'API_HOST', 'API_URL', HttpService];

		function HttpService($q, $location, $rootScope, DialogService, AlertService, $http, Upload, API_HOST, API_URL) {
			var initConfig = function (parameters, isShowLoading) {
				if (!isShowLoading) {
					$rootScope.showGrlobleLoading = true;
				}
				return {
					params: parameters,
					headers: {Authorization: sessionStorage.getItem("token")},
					responseType: 'json'
				};
			};
			var process = function (promise, deffered) {
				promise.then(
					function success(result) {
//						if (result.data && result.data.statusCode == -1) {
						if (result.data && result.data.status == -1) {
							DialogService.showDialog(
								'操作失败',
								result.data.message, [{
									name: 'Ok',
									class: 'btn-primary'
								}]
							);
							deffered.reject(result);
						} else {
							if (!result.data) {
								deffered.resolve(result);
								return;
							}
							deffered.resolve(result.data);
						}
					},
					function failure(error) {
						// 1) 400 license invalid
						// 2) 401 not login
						// 3) 403 no permission
						// 4) 404 no such api or api url error
						// 5) 405 user has been locked
						// 6) 406 session locked
						switch (error.status) {
							case 400:
								DialogService.showDialog(
									'请求失败',
									'请更新授权信息', [{
										name: 'Ok',
										class: 'btn-primary'
									}]
								);
								break;
							case 401:
								DialogService.showDialog(
									'请求失败',
									'请重新登录', [{
										name: 'Ok',
										class: 'btn-primary'
									}]
								);
								$location.path('/login');
								break;
							case 403:
								DialogService.showDialog(
									'请求失败',
									'无权限访问', [{
										name: 'Ok',
										class: 'btn-primary'
									}]
								);
								break;
							case 404:
								AlertService.show('请求失败', '无效的API访问地址');
								break;
							case 405:
								DialogService.showDialog(
									'请求失败',
									'用户已经被锁定，请管理员解锁', [{
										name: 'Ok',
										class: 'btn-primary'
									}]
								);
								break;
							case 406:
								DialogService.showDialog(
									'请求失败',
									'会话已经被锁定，请输入密码解锁', [{
										name: 'Ok',
										class: 'btn-primary'
									}]
								);
								$location.path('/login');
								break;
							default:   //500 case
								AlertService.show('请求失败', '服务器内部错误');
								break;
						}
						deffered.notify(error);


					}
				).finally(function () {
					$rootScope.showGrlobleLoading = false;
				});
			};


			return {
				post: function (uri, postObj, parameters,isShowLoading) {
					var deffered = $q.defer();
					config = initConfig(parameters, isShowLoading);
					process($http.post(API_HOST + API_URL + uri, postObj || {}, config), deffered);
					return deffered.promise;
				},
				get: function (uri,parameters,isShowLoading) {
					var deffered = $q.defer();
					config = initConfig(parameters, isShowLoading);
					process($http.get(API_HOST + API_URL + uri, config), deffered);
					return deffered.promise;
				},
				remove: function (uri, parameters,isShowLoading) {
					var deffered = $q.defer();
					config = initConfig(parameters, isShowLoading);
					process($http.delete(API_HOST + API_URL + uri, config), deffered);
					return deffered.promise;
				},
				upload: function (uri, config,isShowLoading) {
					config.headers = {Authorization: 'token ' + sessionStorage.getItem("token")};
					config.url = API_HOST + API_URL + uri;
					return Upload.upload(config);
				},
				download: function (uri, postObj, parameters,isShowLoading) {
					var deffered = $q.defer();
					config = initConfig(parameters, isShowLoading);
					var url = API_HOST + API_URL + uri;
					process($http.post(url, postObj || {}, config), deffered);
					return deffered.promise;
				}

			};
		}
	});
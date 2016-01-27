Geolocation = {
	getCurrentPosition: function(options)
	{
		var located = $.Deferred();
		
		
		// Hide the complexities of the load mechanism...
		var _getGeo = function()
		{
			var isLocationEnabled = 
				typeof cordova.plugins.diagnostic.isGpsLocationEnabled != 'undefined' ?
					cordova.plugins.diagnostic.isGpsLocationEnabled :
					cordova.plugins.diagnostic.isLocationAuthorized;
			
			isLocationEnabled
			(
				function(enabled)
				{
					console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
					if (!enabled)
					{
						if (typeof cordova.plugins.locationAccuracy != 'undefined')
						{
							cordova.plugins.locationAccuracy.request(
								_getGeo, 
								console.log,
								cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
							);
							
							cordova.plugins.diagnostic.switchToLocationSettings();
						}
						else 
						{
							cordova.plugins.diagnostic.getLocationAuthorizationStatus(
								function(status) 
								{
									if (status == 'not_determined')
									{
										cordova.plugins.diagnostic.requestLocationAuthorization(
											_getGeo,
											function(error) {
												alert("ERROR: " + error);
											}
										);
									}
								}
							);
							
						}
						
					}
					else if (enabled)
					{
						navigator.geolocation.getCurrentPosition(
							function(position) {
								located.resolve(position);
							},
							function(error) {
								alert(
									'code: '    + error.code    + '\n' +
									'message: ' + error.message + '\n'
								);
								
								located.reject(error);
							},
							{ enableHighAccuracy: true }
						);
					}
				},
				function(error)
				{
					console.log(error);
				}
			);
		};
		
		if (typeof cordova == 'undefined' || cordova.platformId=='browser')
		{
			located.resolve({
				coords: {
					accuracy: 49,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: -33.427782,
					longitude: -70.6192058,
					speed: null
				},
				timestamp: new Date().getTime()
			});
		}
		else
		{
			document.addEventListener(
				"deviceReady", 
				_getGeo,
				false
			);
		}
		
		return located.promise();
	}
};

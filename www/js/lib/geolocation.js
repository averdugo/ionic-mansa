Geolocation = {
	getCurrentPosition: function(options)
	{
		var located = new $.Deferred;
		
		
		// Hide the complexities of the load mechanism...
		var _getGeo = function(dontSetSettings)
		{
			var getGeoInterval = null;
			
			if (typeof cordova.plugins.diagnostic == 'undefined')
			{
				setTimeout(_getGeo, 1000);
			}
			
			cordova.plugins.diagnostic.isGpsLocationEnabled(
				function(enabled)
				{
					console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
					if (!enabled && !dontSetSettings)
					{
						cordova.plugins.locationAccuracy.request(
							_getGeo(true), 
							console.log,
							cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
						);
						cordova.plugins.diagnostic.switchToLocationSettings();
						getGeoInterval = setInterval(
							function() {
								_getGeo(true);
							}, 
							2500
						);
						
					}
					else if (enabled)
					{
						if (getGeoInterval)
						{
							clearInterval(getGeoInterval);
						}
						
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
		
		
		_getGeo();
		return located.promise();
	}
};

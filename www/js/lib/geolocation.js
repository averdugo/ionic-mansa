Geolocation = {
	getCurrentPosition: function(options)
	{
		var located = new $.Deferred;
		
		
		// Hide the complexities of the load mechanism...
		var _getGeo = function(dontSetSettings)
		{
			var getGeoInterval = null;
			
			// This is a hideous hack to work around load ordering...
			// -Phillip Whelan
			if (typeof cordova.plugins == 'undefined')
			{
				console.log('cordova plugins not loaded...');
				setTimeout(_getGeo, 1000);
				return;
			}
			if (typeof cordova.plugins.diagnostic == 'undefined')
			{
				console.log('cordova diagnostic plugin not loaded...');
				setTimeout(_getGeo, 1000);
				return;
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
			_getGeo();	
		}
		
		return located.promise();
	}
};

class LocationService {

  getLocation = function(onSuccess, onError) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        onSuccess({latitude, longitude})
      }, error => {
        let errorMessage = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location settings, to find collection points near you.";
            break;
          case error.TIMEOUT:
            errorMessage = "It took too long to find your location, please try again.";
            break;
          default:
            errorMessage = "We could not find your location. Please check your location settings.";
        }
        onError(errorMessage);
      });
    } else {
      onError('We could not find your location. Please check your location settings.');
    }
  }
}

export default new LocationService();
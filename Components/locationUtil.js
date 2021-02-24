import {useState, useEffect} from 'react';

const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (e) => {
    setError(e.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return {...position, error};
};

// import React, {useState, useEffect} from 'react';

// import Geolocation from 'react-native-geolocation-service';

// const useCurrentLocation = () => {
//   const [error, setError] = useState();
//   const [location, setLocation] = useState();

//   const handleSuccess = (position) => {
//     const {latitude, longitude} = position.coords;
//     setLocation({
//       latitude,
//       longitude,
//     });
//   };
//   const handleError = (e) => {
//     setError(e.message);
//   };

//   useEffect(() => {
//     Geolocation.getCurrentPosition(handleSuccess, handleError);
//   });

//   return {location, error};
// };

// export default useCurrentLocation;

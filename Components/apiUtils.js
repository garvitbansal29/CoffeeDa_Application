import {getToken} from './SessionToken';

const getLocationData = async (props) => {
  const sessionToken = await getToken();

  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/find?q=${props.searchValue}&overall_rating=${props.overallRating}&price_rating=${props.priceRating}&quality_rating=${props.qualityRating}&clenliness_rating=${props.cleanlinessRating}&search_in=${props.searchIn}&limit=${props.resultLimit}&offset=${props.resultOffset}`,
    {
      method: 'GET',
      headers: {'x-authorization': sessionToken},
    },
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('request location data successful ');
      return {responseJson};
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

const addReview = async (props) => {
  const sessionToken = await getToken();

  const {
    locationID,
    overallRating,
    priceRating,
    qualityRating,
    cleanlinessRating,
    reviewBody,
  } = props;
  console.log(reviewBody);

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review`,
      {
        method: 'POST',
        headers: {
          'x-authorization': sessionToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          overall_rating: overallRating,
          price_rating: priceRating,
          quality_rating: qualityRating,
          clenliness_rating: cleanlinessRating,
          review_body: reviewBody,
        }),
      },
    );
    console.log('Review Posted Successfully');
    return true;
  } catch (error) {
    console.log(`ERROR:  ${error}`);
    return false;
  }
};

const getUserDetails = async (props) => {
  const sessionToken = await getToken();

  const {userID} = props;
  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/user/${userID}`,
      {
        headers: {
          'x-authorization': sessionToken,
        },
      },
    );
    const responseJson = await response.json();
    console.log('User Data Successfully Retrieved');
    return responseJson;
  } catch (error) {
    console.log(error);
    return 'Request unsuccessful';
  }
};

const updateUserDetails = async (props) => {
  const {firstName, lastName, email, password, userID} = props;
  const sessionToken = await getToken();

  const settings = {
    method: 'PATCH',
    headers: {
      'x-authorization': sessionToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
    }),
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/user/${userID}`,
      settings,
    );
    const {status} = response;
    console.log(`Updated status  : ${status}`);
    if (status === 200) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getFavouriteLocations = async (props) => {
  const {userID} = props;
  try {
    const response = await getUserDetails({userID});
    const favLocations = response.favourite_locations;
    return favLocations;
  } catch (error) {
    console.log(`Error: unable to get favourite location ${error}`);
    return [];
  }
};

const getFavouriteLocationID = async (props) => {
  const {userID} = props;
  try {
    const response = await getFavouriteLocations({userID});
    const favLocationID = response.map((item) => {
      return {
        favLocationID: item.location_id,
      };
    });
    console.log(`retrieved location ID's successfully`);
    return favLocationID;
  } catch (error) {
    console.log(`Error: unable to get favourite location ID's ${error}`);
    return [];
  }
};

const updateFavourite = async (props) => {
  const {locationID} = props;
  const sessionToken = await getToken();

  const settings = {
    method: 'POST',
    headers: {
      'x-authorization': sessionToken,
    },
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/favourite`,
      settings,
    );
    const {status} = response;
    console.log(`Add Favourite Updated status  : ${status}`);
    if (status === 200) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteFavourite = async (props) => {
  const {locationID} = props;
  const sessionToken = await getToken();

  const settings = {
    method: 'DELETE',
    headers: {
      'x-authorization': sessionToken,
    },
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/favourite`,
      settings,
    );
    const {status} = response;
    console.log(`DELETE FAVOURITE Updated status  : ${status}`);
    if (status === 200) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  getLocationData,
  addReview,
  getUserDetails,
  updateUserDetails,
  getFavouriteLocations,
  getFavouriteLocationID,
  updateFavourite,
  deleteFavourite,
};

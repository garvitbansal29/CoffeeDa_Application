import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from './SessionToken';
import {getUserID, removeUserID, removeUsertoken} from './AsyncData';

// Refectored and working
export const requestLogin = async (props) => {
  const {email, password} = props;

  const settings = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch(
      'http://10.0.2.2:3333/api/1.0.0/user/login',
      settings,
    );

    const {status} = response;

    if (status === 200) {
      console.log('Login Request: Successful');
      const responseJson = await response.json();
      return responseJson;
    }
    if (status === 400) {
      console.log('Login Request: Invalid email or password');
      return 'invalid';
    }
    console.log(`Login Request: Unsuccessful -> status : ${status}`);
    return 'unsuccessful';
  } catch (error) {
    console.log(`Login Request: Unsuccessful -> status : ${error}`);
    return 'unsuccessful';
  }
};

export const requestLogout = async () => {
  const sessionToken = await getToken();
  const settings = {
    method: 'POST',
    headers: {'x-authorization': sessionToken},
  };
  try {
    const response = await fetch(
      'http://10.0.2.2:3333/api/1.0.0/user/logout',
      settings,
    );
    const {status} = response;
    if (status === 200) {
      console.log('LOGOUT: Successful');
      await removeUserID();
      await removeUserID();
      return true;
    }
    console.log('LOGOUT: Successful');

    return false;
  } catch (error) {
    console.log(`LOGOUT: Unsuccessful: ${error}`);
    return false;
  }
};

// Refectored and working
export const getLocationData = async (props) => {
  const sessionToken = await getToken();

  const settings = {
    method: 'GET',
    headers: {'x-authorization': sessionToken},
  };

  const response = await fetch(
    `http://10.0.2.2:3333/api/1.0.0/find?q=${props.searchValue}&overall_rating=${props.overallRating}&price_rating=${props.priceRating}&quality_rating=${props.qualityRating}&clenliness_rating=${props.cleanlinessRating}&search_in=${props.searchIn}&limit=${props.resultLimit}&offset=${props.resultOffset}`,
    settings,
  );

  const {status} = response;

  if (status === 200) {
    console.log('Get All Locations Data: Successful');
    const responseJson = await response.json();
    return responseJson;
  }

  console.log('Get All Locations Data: Unsuccessful');
  return 'unsuccessful';
};

// Refactored and working
export const getReviewPhoto = async (props) => {
  const sessionToken = await getToken();
  const {locationID, reviewID} = props;
  const settings = {
    headers: {
      'x-authorization': sessionToken,
    },
  };
  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review/${reviewID}/photo?timestamp=3sdf90sfdfadf845`,
      settings,
    );
    const {status, url} = response;
    if (status === 200) {
      console.log('GET Review Image: Successful');
      return url;
    }
    console.log(
      `GET Review Image: No image found for location ${locationID} and ${reviewID}`,
    );

    return '';
  } catch (error) {
    console.log('GET Review Image: Error');
    return '';
  }
};

// Refactored and Working
export const getSingleLocationData = async (props) => {
  const sessionToken = await getToken();
  const {locationID} = props;

  const settings = {
    headers: {
      'x-authorization': sessionToken,
    },
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}`,
      settings,
    );
    const {status} = response;

    if (status === 200) {
      console.log('GET single location data: SUCCESSFUL');
      const responseJson = await response.json();
      return responseJson;
    }
    console.log('GET single location data: SUCCESSFUL');

    return '';
  } catch (error) {
    console.log(`GET single location data: SUCCESSFUL: ${error}`);
    return '';
  }
};

// Refactored and Working
export const deleteReview = async (props) => {
  const {locationID, reviewID} = props;
  const sessionToken = await getToken();
  const settings = {
    method: 'DELETE',
    headers: {'x-authorization': sessionToken},
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review/${reviewID}`,
      settings,
    );

    const {status} = response;
    if (status === 200) {
      console.log(`Delete Review: Successful`);
      return true;
    }

    console.log(`Delete Review Error: Unsuccessful ${status}`);
    return false;
  } catch (error) {
    console.log(`Delete Review Error: Unsucessful ${error}`);
    return false;
  }
};

// Refacotred
export const addReviewImage = async (props) => {
  const {locationID, reviewID, img} = props;
  const sessionToken = await getToken();

  const settings = {
    method: 'POST',
    headers: {'x-authorization': sessionToken, 'Content-Type': 'image/jpeg'},
    body: img,
  };

  console.log(`HERE IS THE IMAGE DATA I HAVE:  ${JSON.stringify(img)}`);
  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review/${reviewID}/photo`,
      settings,
    );

    const {status} = response;
    if (status === 200) {
      console.log(`Picture Uploaded: Successful`);
      return true;
    }

    console.log(`Picture Uploaded: Unsuccessful ${status}`);
    return false;
  } catch (error) {
    console.log(`Picture Uploaded: Unsucessful ${error}`);
    return false;
  }
};

// Refactored
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

  const settings = {
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
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review`,
      settings,
    );

    const {status} = response;
    if (status === 201) {
      console.log('Review Posted Successfully');
      return true;
    }
    console.log(`Review was NOT posted successfully: satus error-${status}`);
    return false;
  } catch (error) {
    console.log(`Review was NOT posted successfully: satus error-${error}`);
    return false;
  }
};

export const deleteReviewPhoto = async (props) => {
  const sessionToken = getToken();
  const {locationID, reviewID} = props;
  const settings = {
    method: 'DELETE',
    headers: {
      'x-authorization': sessionToken,
    },
  };
  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review/${reviewID}/photo`,
      settings,
    );
    const {status} = response;
    if (status === 200) {
      console.log(`Delete review photo successful`);
      return true;
    }
    console.log(`Delete review photo: Unsuccessful: satus ${status}`);
    return false;
  } catch (e) {
    console.log(`Delete review photo: Unsuccessful: error: ${e}`);
    return false;
  }
};

const getUserDetails = async (props) => {
  const sessionToken = await getToken();
  const userID = await getUserID();
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

const getUserLikedReviews = async () => {
  const userID = await getUserID();

  try {
    const response = await getUserDetails({userID});
    const likedReviews = response.liked_reviews;
    return likedReviews;
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

const getLikedReviewID = async () => {
  const userID = await getUserID();
  try {
    const response = await getUserLikedReviews({userID});
    const reviewID = response.map((item) => {
      return {
        likedReviewID: item.review.review_id,
      };
    });

    console.log(`retrieved location ID's successfully`);
    return reviewID;
  } catch (error) {
    console.log(`Error: unable to get favourite location ID's ${error}`);
    return [];
  }
};

export const getUserReviews = async () => {
  try {
    const response = await getUserDetails();
    const {reviews} = response;
    console.log(`Get User Reviews: Successful`);
    return reviews;
  } catch (error) {
    console.log(`Get User Reviews: Unsuccessful: ${error}`);
    return [];
  }
};

export const getUserReviewID = async () => {
  try {
    const response = await getUserReviews();
    const userReviewIDs = response.map((item) => {
      return {
        reviewID: item.review.review_id,
      };
    });
    console.log(`Get User Review ID's: Successful`);
    return userReviewIDs;
  } catch (error) {
    console.log(`Get User Review ID's: Unsuccessful ${error}`);
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

const likeReview = async (props) => {
  const sessionToken = await getToken();
  const {locationID, reviewID} = props;
  const settings = {
    method: 'POST',
    headers: {
      'x-authorization': sessionToken,
    },
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review/${reviewID}/like`,
      settings,
    );
    const {status} = response;

    if (status === 200) {
      console.log(`Like Review Successful: ${status} `);
      return true;
    }

    console.log(
      `Like Review Unsuccessful: ${status} + :: ${JSON.stringify(response)}`,
    );
    return false;
  } catch (error) {
    console.log(`Like Review Unsuccessful: ${error}`);
    return false;
  }
};

const unLikeReview = async (props) => {
  const sessionToken = await getToken();
  const {locationID, reviewID} = props;
  const settings = {
    method: 'DELETE',
    headers: {
      'x-authorization': sessionToken,
    },
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review/${reviewID}/like`,
      settings,
    );
    const {status} = response;

    if (status === 200) {
      console.log(`Un-Like Review Successful: ${status}`);
      return true;
    }

    console.log(`Un-Like Review Unsuccessful: ${status}`);
    return false;
  } catch (error) {
    console.log(`Un-Like Review Unsuccessful: ${error}`);
    return false;
  }
};

const getReviewData = async (props) => {
  const searchValue = '';
  const {locationID, reviewID} = props;

  try {
    const response = await getLocationData({searchValue});

    const locations = await response.find(
      (item) => item.location_id === locationID,
    );

    const locationReviews = locations.location_reviews;

    const review = await locationReviews.find(
      (item) => item.review_id === reviewID,
    );

    console.log(`Get Review Data: Successful `);
    return review;
  } catch (error) {
    console.log(`Get Review Data: Unsuccessful:   ${error}`);
    return [];
  }
};

export const updateReview = async (props) => {
  const {
    overallRating,
    priceRating,
    qualityRating,
    cleanlinessRating,
    reviewBody,
    locationID,
    reviewID,
  } = props;

  const sessionToken = await getToken();

  const settings = {
    method: 'PATCH',
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
  };

  try {
    const response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${locationID}/review/${reviewID}`,
      settings,
    );

    const {status} = response;
    if (status === 200) {
      console.log('Update Review Successful');
      return true;
    }
    console.log(`Update Review: Unsuccessful Status: ${status}`);
    return false;
  } catch (error) {
    console.log(`Update Review Unsuccessful: ${error}`);
    return false;
  }
};

export {
  addReview,
  getUserDetails,
  updateUserDetails,
  getFavouriteLocations,
  getFavouriteLocationID,
  updateFavourite,
  deleteFavourite,
  getLikedReviewID,
  getUserLikedReviews,
  likeReview,
  unLikeReview,
  getReviewData,
};

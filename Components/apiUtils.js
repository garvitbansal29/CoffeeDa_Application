const getLocationData = async (props) => {
  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/find?q=${props.searchValue}&overall_rating=${props.overallRating}&price_rating=${props.priceRating}&quality_rating=${props.qualityRating}&clenliness_rating=${props.cleanlinessRating}&search_in=${props.searchIn}&limit=${props.resultLimit}&offset=${props.resultOffset}`,
    {
      method: 'GET',
      headers: {'x-authorization': props.sessionToken},
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

export default getLocationData;

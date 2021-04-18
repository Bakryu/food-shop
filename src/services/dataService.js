const BASE_URL = "https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e";

const getData = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export default getData;

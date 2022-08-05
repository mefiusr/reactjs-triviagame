const fetchApi = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  return result;
};

export default fetchApi;

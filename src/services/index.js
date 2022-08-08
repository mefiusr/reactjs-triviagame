export const fetchApi = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  return result;
};

export const fetchTrivia = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  return result;
};

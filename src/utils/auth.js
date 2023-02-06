export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (e) {
        return e;
      }
    })
    .catch((err) => console.log(err));
};

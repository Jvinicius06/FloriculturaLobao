
const BASEURL = 'https://lobao.djjoaoo.live/';
// const BASEURL = 'http://192.168.15.15/';
var token = '';

const setToken = (_token) => {
  token = _token;
}

const loginByEmail = (email, password) => {
  const json = JSON.stringify({ email, password });
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json;charset=UTF-8');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return fetch(`${BASEURL}login`, {
    method: 'POST',
    headers: myHeaders,
    body: json,
  })
}

const isLogin = () => {
  const myHeaders = new Headers({
    'Authorization': `Bearer ${token}`
  });
  return fetch(`${BASEURL}islogin`, {
    headers: myHeaders,
  });
}

const register = ({ password, name, lastName, email })  => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json;charset=UTF-8');
  return fetch(`${BASEURL}login/register`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ password, name, lastName, email }),
  });
}

export {
  loginByEmail,
  isLogin,
  setToken,
  register,
};

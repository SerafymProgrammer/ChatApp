
export default class AuthService {
    static loginUser = async (user) => {
      return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(user)
      })
    };
  }
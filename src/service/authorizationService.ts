import axios from "axios";


const register = async (username: string, password: string) => {
console.log(username + " " + password);
    let linkRegister = "http://localhost:3000/auth/register";
    let axiosRespSearch = await axios.post(linkRegister, 
      {
        "username": username,
        "password":password
      }
    );
  }

  const login = async (username: string, password: string) => {
    let linkRegister = "http://localhost:3000/auth/login";
    let axiosRespSearch = await axios.post(linkRegister, 
      {
        "username": username,
        "password":password
      }
    );

    sessionStorage.token = axiosRespSearch.data.accessToken;
    console.log(axiosRespSearch)

}


const authorizationService = { login, register };
export default authorizationService
{
    
};


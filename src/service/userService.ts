import { User } from "@/model/user";
import axios from "axios";


//Get the user information and returns a User
const getUser = async() :Promise<User>  =>
{

    let linkRegister = "http://localhost:3000/library/profile";
    let axiosRespSearch = await axios.get(linkRegister,
        {
            headers:
            {
            'Authorization': sessionStorage.token
            }
        });

    return axiosRespSearch.data;
  
}

const getAllUsers = async(search: string) :Promise<Array<User>>  =>
{

    let linkRegister = "http://localhost:3000/admin/users";
    let axiosRespSearch = await axios.get(linkRegister,
        {
            headers:
                {
                    'Authorization': sessionStorage.token
                }
        });

    let users = axiosRespSearch.data.users;

    //Filters on username
    let result = users.filter((user) => user.username.includes(search))

    //Goes through and adds all quantity
    let finishedUsers = result.map((user) => {
        let purchases = 0;
        if (user.purchases !== undefined) {
            purchases = user.purchases.reduce((a, n) => a + n.quantity, 0)
        }

        return {
            username: user.username,
            role: user.role,
            purchases: purchases
        }
    })
    return finishedUsers;

}

const promoteUser = async(username: string) =>
{

    let linkRegister = "http://localhost:3000/admin/users";
    let axiosRespSearch = await axios.put(linkRegister,
        {
            "username": username
        },
        {
            headers:
                {
                    'Authorization': sessionStorage.token
                }
        });

}

const deleteUser = async(username: string) =>
{

    let linkRegister = "http://localhost:3000/admin/users";
    let axiosRespSearch = await axios.delete(linkRegister,
        {
            headers: {
                'Authorization': sessionStorage.token

            },
            data:{
                "username": username
            }

        });

}

const userService = { getUser, getAllUsers, promoteUser, deleteUser};
export default userService
{
    
};


import UserDTO from "../../services/User/DTOs/UserDTO";
import LoginUserDTO from "../../services/User/DTOs/LoginUserDTO";

interface IUserService{
    login(loginDTO: LoginUserDTO): Promise< {token: string, user: any} | null>
    register(userDTO: UserDTO): Promise< {fullName: string, email: string} | null>
}

export default IUserService;
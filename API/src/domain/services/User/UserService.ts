'use strict';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import IUserService from '../../interfaces/services/IUserService';
import { UserRepository} from '../../../infra/mongoose/repositories/UserRepository';
import { User } from '../../entities/User';
import UserDTO from './DTOs/UserDTO';
import LoginDTO from './DTOs/LoginUserDTO';

class UserService implements IUserService {

    private readonly _userRepository: UserRepository;
    
    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async register(userDTO: UserDTO): Promise<{fullName: string, email: string} | null>{
        try {
            if(await this._userRepository.getByEmail(userDTO.email))
            {
                return null;
            }

            const password = await bcrypt.hash(userDTO.password, 10);

            let user = new User(userDTO);
            user.password = password;

            const result =  await this._userRepository.save(user);

            if(!result)
                return null;
            
            return {
                fullName: result.fullName,
                email: result.email
            };
        }
        catch (error: any) {
            throw new Error(error.message);
        }
        
    }

    async login(userlogin: LoginDTO): Promise< {token: string, user: any} | null>{
        
        try {
            const user = await this._userRepository.getByEmail(userlogin.email);

            if(!user)
                return null;
            
            if(!await bcrypt.compare(userlogin.password, user.password))
                return null;
            
            let token = await this.generateToken({
                id: user.id,
                name: user.fullName,
                email: user.email,
                roles: user.roles
            });

            return {
                token: token,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    roles: user.roles
                }
            };
        }
        catch (error: any) {
            throw new Error(error.message);
        }
        
    }

    private generateToken = async (data: any): Promise<string> => {
        return jwt.sign(data, process.env.SECRET_KEY || "", { expiresIn: '1d' });
    }
    
    private decodeToken = async (token: string): Promise<string | jwt.JwtPayload> => {
        const data = await jwt.verify(token, process.env.SECRET_KEY || "");
        return data;
    }
    
}

export { UserService };
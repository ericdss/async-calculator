import { User } from '../../../domain/entities/User';
import UserMapper from '../mappers/UserMapper';
import UserModel from '../models/UserModel';

class UserRepository {

    async getByEmail(email : string): Promise<User | null>{
        const resultSchema = await UserModel.findOne({email: email});
        return UserMapper.toEntity(resultSchema);
    }

    async save(user: User): Promise<User | null>{
        const schema = UserMapper.toSchema(user);
        const resultSchema = await UserModel.create(schema);
        return UserMapper.toEntity(resultSchema);
    }
}

export { UserRepository };
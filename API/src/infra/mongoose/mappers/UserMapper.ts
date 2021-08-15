import mongoose from "mongoose";
import { User } from "../../../domain/entities/User";
import UserModel, { UserSchemaProps } from "../models/UserModel";
import Mapper from "./Mapper";

class UserMapper extends Mapper{
    static toSchema(user: User): UserSchemaProps | null {
        if(!user)
            return null;

        const userSchema: UserSchemaProps = {
            id: user.id ? mongoose.Types.ObjectId(user.id) : undefined,
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            roles: user.roles,
            creationDateTime: user.creationDateTime,
        };

        return userSchema;
    }

    static toEntity(schema: any): User | null {
        if(!schema)
            return null;
        
        const user = new User({
            id: schema.id.toString(),
            fullName: schema.fullName,
            email: schema.email,
            password: schema.password,
            roles: schema.roles,
            creationDateTime: schema.creationDateTime,
        });

        return user;
    }

    static toListEntity(schemaList: any): Array<User>{
        
        if(!schemaList || !schemaList.map || schemaList.length < 1)
            return [];
        
        const list = schemaList.map( (item: any): User | null => { return this.toEntity(item); } );
        
        if(list == null)
            return [];
        
        return list;
    }
}

export default UserMapper;
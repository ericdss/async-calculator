import { User } from "../../entities/User";

interface IUserRepository {
    getByEmail(id: string): Promise<User | null>
    save(User: User): Promise<User | null>
}

export default IUserRepository;
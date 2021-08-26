import { UserRepository } from '../../../../../src/infra/mongoose/repositories/UserRepository';
import bcrypt from 'bcrypt';

const userRepositoryMock: jest.Mocked<UserRepository> = {
    getByEmail: jest.fn(),
    save: jest.fn()
}

const validUser = {
    id: "611027d8881b3837e81a1f82",
    fullName: "Name Test",
    email: "test@test.com",
    password: bcrypt.hashSync("12345678", 10),
    roles: ["admin"],
    creationDateTime: new Date()
};

userRepositoryMock.getByEmail.mockResolvedValue(validUser);
userRepositoryMock.save.mockResolvedValue(validUser);

export default userRepositoryMock;
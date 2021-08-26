import { UserService } from '../../../../src/domain/services/User/UserService';
import userRepositoryMock from './Mocks/UserRepositoryMock';

const userService = new UserService(userRepositoryMock);

describe('User_Register', () =>{
    
    it('Should register a User', async () => {
        userRepositoryMock.getByEmail.mockResolvedValueOnce(null);

        const result =  await userService.register({
            id: "611027d8881b3837e81a1f82",
            fullName: "Name Test",
            email: "test@test.com",
            password: "12345678",
            roles: ["admin"]
        });

        expect(userRepositoryMock.getByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(result).toEqual({fullName: "Name Test", email: "test@test.com"});
    });

    it('Should return null when e-mail already exists', async () => {

        const result = await userService.register({
            email: "test@test.com",
        } as any);

        expect(userRepositoryMock.getByEmail).toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });

});

describe('User_Login', () =>{

    it('Should authenticate a User', async () => {

        const result =  await userService.login({
            email: "test@test.com",
            password: "12345678"
        });

        expect(userRepositoryMock.getByEmail).toHaveBeenCalledTimes(1);
        
        expect(result).toEqual({
            token: expect.any(String),
                user: {
                    id: "611027d8881b3837e81a1f82",
                    fullName: "Name Test",
                    email: "test@test.com",
                    roles: ["admin"]
                }
        });
    });

    it('Should return null when e-mail not exists', async () => {

        userRepositoryMock.getByEmail.mockResolvedValueOnce(null);

        const result =  await userService.login({
            email: "nonexistentuser@test.com",
        } as any);

        expect(userRepositoryMock.getByEmail).toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });

    it('Should return null when password does not match', async () => {

        const result = await userService.login({
            email: "test@test.com",
            password: "123456789"
        } as any);

        expect(userRepositoryMock.getByEmail).toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });

});
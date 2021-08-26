import app from '../../../src/application/app';
import request from 'supertest';


describe('UsersController', () => {
    // REGISTER

    it('Should return status code 200 when User is successfully registered', async () =>{
        const response = await request(app)
        .post('/api/v1/register')
        .send({
            fullName: "Teste 1",
            email: "teste3@teste.com",
            password: "12345678",
            roles: ["admin"]
        });

        expect(response.statusCode).toEqual(200);
    });

    it('Should return status code 400 when email already exists', async () =>{
        const response = await request(app)
        .post('/api/v1/register')
        .send({
            fullName: "Teste 1",
            email: "teste3@teste.com",
            password: "12345678",
            roles: ["admin"]
        });

        expect(response.statusCode).toEqual(400);
    });

    // LOGIN

    it('Should authenticate a User and return a token and roles', async () =>{
        const response = await request(app)
        .post('/api/v1/login')
        .send({
            email: "teste3@teste.com",
            password: "12345678"
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data.token');
        expect(response.body).toHaveProperty('data.user.roles');
    });

    it('Should return status code 401 when email not found', async () =>{
        const response = await request(app)
        .post('/api/v1/login')
        .send({email: "nonexistentemail@teste.com"});

        expect(response.statusCode).toEqual(401);
    });

    it('Should return status code 401 when password does not match', async () =>{
        const response = await request(app)
        .post('/api/v1/login')
        .send({
            email: "nonexistentemail@teste.com",
            password: "87654321"
        });

        expect(response.statusCode).toEqual(401);
    });

});
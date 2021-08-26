import app from '../../../src/application/app';
import request from 'supertest';

let token = "";


beforeAll( async () => {
    await request(app)
        .post('/api/v1/register')
        .send({
            fullName: "Teste 1",
            email: "teste3@teste.com",
            password: "12345678",
            roles: ["admin"]
        });

    const loginReponse = await request(app)
    .post('/api/v1/login')
    .send({
        email: "teste3@teste.com",
        password: "12345678"
    });

    token = loginReponse.body.data.token || token;
});

describe('CalculatorsController', () => {

    // GET RESULT
    it('Should return calculation status', async () =>{
        
        // Create a new sum to get id
        const newSum = await request(app)
        .post('/api/v1/calc-async/sum')
        .set('x-access-token',token)
        .send({
            number1: 25,
            number2: 75,
        });

        expect(newSum.statusCode).toEqual(201);
        const id = newSum.body.id;

        // Get result
        const result = await request(app)
        .get('/api/v1/calc-async/'+id)
        .set('x-access-token',token)
        .send();

        expect(result.statusCode).toEqual(200);
    });

    it('Should return status code 400 when id is in incorret format', async () =>{

        const result = await request(app)
        .get('/api/v1/calc-async/12345')
        .set('x-access-token',token)
        .send();

        expect(result.statusCode).toEqual(400);
        expect(result.body.message).toEqual("ID is in incorret format. Please try again");
    });

    it('Should return status code 404 when id not found', async () =>{

        const result = await request(app)
        .get('/api/v1/calc-async/611027d8881b3837e81a1f82')
        .set('x-access-token',token)
        .send();

        expect(result.statusCode).toEqual(404);
    });

    // SUM
    it('Should create a new sum and enqueue in the message broker', async() =>{
        const newSum = await request(app)
        .post('/api/v1/calc-async/sum')
        .set('x-access-token',token)
        .send({
            number1: 25,
            number2: 75,
        });

        expect(newSum.statusCode).toEqual(201);
        expect(newSum.body.status).toEqual("Pending");
    });

    it('Should return 500 when body is not in the correct format', async() =>{
        const newSum = await request(app)
        .post('/api/v1/calc-async/sum')
        .set('x-access-token',token)
        .send({
            number1: 25
        });

        expect(newSum.statusCode).toEqual(500);
    });
});
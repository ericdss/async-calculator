import { Router } from 'express';

const routes = Router();

routes.get('/test', async (req, resp) => {
    console.log(1);
    return resp.status(200).send("The Service is UP");
});

export default routes;
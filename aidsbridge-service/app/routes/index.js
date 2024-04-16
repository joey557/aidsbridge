import hivRouter from './hiv-route.js';

const initializeRoutes = (app) => {
    app.use('/', hivRouter);
}

export default initializeRoutes;
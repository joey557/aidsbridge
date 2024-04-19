import hivRouter from './aidsbridge-route.js';

const initializeRoutes = (app) => {
    app.use('/aidsbridge', hivRouter);
}

export default initializeRoutes;
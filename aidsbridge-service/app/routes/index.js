import aidsbridgeRouter from './aidsbridge-route.js';

const initializeRoutes = (app) => {
    app.use('/aidsbridge', aidsbridgeRouter);
}

export default initializeRoutes;
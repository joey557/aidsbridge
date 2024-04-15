import hivRouter from './meeting-notes-router.js';

const initializeRoutes = (app) => {
    app.use('/', meetingNotesRouter);
}

export default initializeRoutes;
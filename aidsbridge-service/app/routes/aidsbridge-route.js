import express from 'express';
import * as aidsbridgeController from '../controllers/aidsbridge-controller.js';
const router = express.Router();

router.route('/login')
  .post(aidsbridgeController.userLogin);


//articles
router.route('/articles')
  .get(aidsbridgeController.readArticles)
  .post(aidsbridgeController.postArticles);

router.route('/articles/:title')
  .delete(aidsbridgeController.deleteArticle)
  .put(aidsbridgeController.updateArticle);

router.route('/articles/filter')
  .get(aidsbridgeController.filterArticles);

//events
router.route('/events')
  .get(aidsbridgeController.readEvents)
  .post(aidsbridgeController.postEvent);

router.route('/events/:title')
  .delete(aidsbridgeController.deleteEvent)
  .put(aidsbridgeController.updateEvent);

router.route('/events/filter')
  .get(aidsbridgeController.filterEvents);

export default router;
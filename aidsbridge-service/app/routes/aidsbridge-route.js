import express from "express";
import * as aidsbridgeController from "../controllers/aidsbridge-controller.js";
import fs from "fs";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

//login
router.route("/login").post(aidsbridgeController.userLogin);

router.route("/user").get(aidsbridgeController.getUser);

//register
router.route("/register").post(aidsbridgeController.userRegister);

//articles
router
  .route("/articles")
  .get(aidsbridgeController.readArticles)
  .post(aidsbridgeController.postArticles);

router
  .route("/articles/:id")
  .delete(aidsbridgeController.deleteArticle)
  .put(aidsbridgeController.updateArticle);

router.route("/articles/filter").get(aidsbridgeController.filterArticles);

//events
router
  .route("/events")
  .get(aidsbridgeController.readEvents)
  .post(aidsbridgeController.postEvent);

router
  .route("/events/:id")
  .delete(aidsbridgeController.deleteEvent)
  .put(aidsbridgeController.updateEvent);

router.route("/events/filter").get(aidsbridgeController.filterEvents);


router
  .route("/upload")
  .post(upload.single("eventsImage"), aidsbridgeController.uploadImage)
  .get(aidsbridgeController.getImages);

  
router.route("/user/update/:accountId").put(aidsbridgeController.updateUserInfo);

export default router;

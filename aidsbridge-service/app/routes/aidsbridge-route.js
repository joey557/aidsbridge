import express from "express";
import * as aidsbridgeController from "../controllers/aidsbridge-controller.js";
import fs from "fs";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

//login
router.route("/login").post(aidsbridgeController.userLogin);

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

// router
//   .post('/upload', upload.single('eventsImage'), (req, res) => {
//     const saveImage = new imageModel({
//       name: req.body.name,
//       img: {
//         data: fs.readFileSync('./uploads/' + req.file.filename),
//         contentType: 'image/png'
//       }
//     });
//     saveImage.save()
//       .then((res) => { console.log('image saved') })
//       .catch((err) => { console.log(err, 'error while saving image') });
//   })

router.post("/upload", upload.single("eventsImage"), aidsbridgeController.uploadImage);

export default router;

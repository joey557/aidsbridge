import { setResponse, setError } from "./response-handler.js";
import * as articleService from "../services/aidsbridge-articles-service.js";
import * as eventService from "../services/aidsbridge-events-service.js";
import * as userService from "../services/aidsbridge-user-service.js";
import fs from "fs";
import imageModel from "../models/images.js";

export const readArticles = async (req, res) => {
    try {
        const articles = await articleService.readArticles();
        setResponse(articles, res);
    } catch (error) {
        setError(error, res);
    }
}

export const postArticles = async (req, res) => {
    try {
        const article = { ...req.body };
        const newArticle = await articleService.saveArticles(article);
        setResponse(newArticle, res);
    } catch (error) {
        setError(error, res);
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await articleService.removeArticles(id);
        setResponse({ message: "Article successfully deleted", result }, res);
    } catch (error) {
        setError(error, res);
    }
}

export const updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const content = { ...req.body };
        const updatedArticle = await articleService.updateArticles(id, content);
        setResponse(updatedArticle, res);
    } catch (error) {
        setError(error, res);
    }
}

export const filterArticles = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const filteredArticles = await articleService.filterArticles({ keyword });
        setResponse(filteredArticles, res);
    } catch (error) {
        setError(error, res);
    }
}

//functions for events
export const readEvents = async (req, res) => {
    try {
        const events = await eventService.readEvents();
        setResponse(events, res);
    } catch (error) {
        setError(error, res);
    }
}

export const postEvent = async (req, res) => {
    try {
        const event = { ...req.body };
        const newEvent = await eventService.saveEvents(event);
        setResponse(newEvent, res);
    } catch (error) {
        setError(error, res);
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await eventService.removeEvents(id);
        setResponse({ message: "Event successfully deleted", result }, res);
    } catch (error) {
        setError(error, res);
    }
}

export const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $push: { people: person } },  
            { new: true, safe: true, upsert: false }
          );
        const id = req.params.id;
        const content = { ...req.body };
        //const updatedEvent = await eventService.updateEvents(id, content);
        setResponse(updatedEvent, res);
    } catch (error) {
        setError(error, res);
    }
}

export const filterEvents = async (req, res) => {
    try {
        const { keyword, startDate, endDate } = req.query;
        const filterOptions = { keyword, startDate, endDate };
        const filteredEvents = await eventService.filterEvents(filterOptions);
        setResponse(filteredEvents, res);
    } catch (error) {
        setError(error, res);
    }
}

//fuctions for user login and register
export const userLogin = async (req, res) => {
    try {
        const { accountId, password } = req.body;
        const user = await userService.login(accountId, password);
        setResponse(user, res);
    } catch (error) {
        setError(error, res);
    }
}

export const getUser = async (req, res) => {
    try {
        //const accountId = req.params.accountId;
        const user = await userService.getUser();
        setResponse(user, res);
    } catch (error) {
        setError(error, res);
    }

}

export const userRegister = async (req, res) => {
    try {
        const { userName, accountId, password } = req.body;
        const newUser = await userService.register({ userName, accountId, password });
        setResponse(newUser, res);
    } catch (error) {
        setError(error, res);
    }
}

export const uploadImage = async (req, res) => {
    try {
        const saveImage = new imageModel({
            name: req.body.name,
            img: {
                data: fs.readFileSync('./uploads/' + req.file.filename),
                contentType: 'image/png'
            }
        });
        await saveImage.save();
        setResponse({ message: 'Image saved', imageId: saveImage._id}, res);
    } catch (err) {
        setError(err, res);
    }
};

export const getImages = async (req, res) => {
    try {
        const images = await imageModel.find({});
        setResponse(images, res);
    } catch (err) {
        setError(err, res);
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const { userName, newPassword } = req.body;

        const success = await userService.updateUserDetails(accountId, { userName, newPassword });

        if (success) {
            setResponse({ message: "User details updated successfully" }, res);
        } else {
            throw new Error("Failed to update user details");
        }
    } catch (error) {
        setError(error, res);
    }
}

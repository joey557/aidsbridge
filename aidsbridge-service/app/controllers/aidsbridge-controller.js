import { setResponse, setError } from "./response-handler.js";
import * as articleService from "../services/aidsbridge-articles.js";
import * as eventService from "../services/aidsbridge-events.js";
import * as userService from "../services/aidsbridge-user-service.js";

export const readArticles = async (req, res) => {
    try {
        const articles = await articleService.read();
        setResponse(articles, res);
    } catch (error) {
        setError(error, res);
    }
}

export const postArticles = async (req, res) => {
    try {
        const article = { ...req.body };
        const newArticle = await articleService.save(article);
        setResponse(newArticle, res);
    } catch (error) {
        setError(error, res);
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const title = req.params.title;
        const result = await articleService.removeArticles(title);
        setResponse({ message: "Article successfully deleted", result }, res);
    } catch (error) {
        setError(error, res);
    }
}

export const updateArticle = async (req, res) => {
    try {
        const title = req.params.title;
        const content = req.body.content;
        const updatedArticle = await articleService.updateArticles(title, { content });
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
        const title = req.params.title;
        const result = await eventService.removeEvents(title);
        setResponse({ message: "Event successfully deleted", result }, res);
    } catch (error) {
        setError(error, res);
    }
}

export const updateEvent = async (req, res) => {
    try {
        const title = req.params.title;
        const content = { ...req.body };
        const updatedEvent = await eventService.updateEvents(title, content);
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

export const userLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userService.login(userName, password);
        setResponse(user, res);
    } catch (error) {
        setError(error, res);
    }
}


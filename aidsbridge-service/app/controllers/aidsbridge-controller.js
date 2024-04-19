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
        const article = {...req.body};
        const newArticle = await articleService.save(article);
        setResponse(newArticle, res);
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


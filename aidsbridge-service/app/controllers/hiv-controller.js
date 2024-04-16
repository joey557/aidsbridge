import { setResponse, setError } from "./response-handler.js";
import * as articleService from "../services/hiv-articles.js";
import * as eventService from "../services/hiv-events.js";
import * as hivService from "../services/hiv-service.js";

export const read = async (req, res) => {
    try {
        const articles = await articleService.read();
        setResponse(articles, res);
    } catch (error) {
        setError(error, res);
    }
}

export const post = async (req, res) => {
    try {
        const article = {...req.body};
        const newArticle = await articleService.save(article);
        setResponse(newArticle, res);
    } catch (error) {
        setError(error, res);
    }
}


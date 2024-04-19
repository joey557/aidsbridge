import Articles from '../models/articles.js';

export const readArticles = async () => {
    return await Articles.find({}).exec();
}

export const saveArticles = async (articles) => {
    const newArticle = new Articles(articles);
    return await newArticle.save();
}

export const removeArticles = async (id) => {
    return await Articles.findByIdAndDelete(id).exec();
}

export const updateArticles = async (id, articleData) => {
    return await Articles.findByIdAndUpdate(id, articleData, {new: true}).exec();
}

export const filterArticles = async (filterOptions) => {
    let query = {};

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { content: { $regex: keyword, $options: 'i' } }
        ];
    }

    return await Articles.find(query).exec();
};
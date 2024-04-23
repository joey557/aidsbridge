// Import the Articles model from the defined Mongoose schema file.
import Articles from '../models/articles.js';

// Function to retrieve all articles from the database.
export const readArticles = async () => {
    // Fetch all documents from the Articles collection and execute the query.
    return await Articles.find({}).exec();
}

// Function to save a new article to the database.
export const saveArticles = async (articles) => {
    // Create a new instance of the Articles model with the data provided.
    const newArticle = new Articles(articles);
    // Save the new article document in the database and return the result.
    return await newArticle.save();
}

// Function to remove an article from the database by its ID.
export const removeArticles = async (id) => {
    // Find a document by its ID and remove it from the database, then execute the query.
    return await Articles.findByIdAndDelete(id).exec();
}

// Function to update an existing article in the database by its ID.
export const updateArticles = async (id, articleData) => {
    // Find a document by its ID and update it with the new data provided.
    // The {new: true} option returns the updated document.
    return await Articles.findByIdAndUpdate(id, articleData, {new: true}).exec();
}

// Function to filter articles based on provided keyword options.
export const filterArticles = async (keyword) => {
    // Define an empty query object to build upon based on conditions.
    let query = {};

    // Check if a keyword is provided to filter by title or content.
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },  // Case-insensitive regex search in title.
            { content: { $regex: keyword, $options: 'i' } } // Case-insensitive regex search in content.
        ];
    }

    // Execute a find operation on Articles with the built query.
    return await Articles.find(query).exec();
};

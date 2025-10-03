// book_finder_server.js

const express = require('express');
const axios = require('axios'); // For making HTTP requests to external APIs
const cors = require('cors');    // To allow requests from a frontend client

// --- SETUP: Install Dependencies ---
// Run this command in your terminal:
// npm install express axios cors

const app = express();
const PORT = 5000;

// --- CONFIGURATION ---
// 1. Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to parse JSON bodies

// 2. Google Books API Key (Optional but recommended for production)
// Note: Google Books API can often be used without a key, but a key ensures stability.
// Replace 'YOUR_GOOGLE_BOOKS_API_KEY' with your actual key if you have one.
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY || ''; 
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// --- API ENDPOINT ---

/**
 * Endpoint for searching books based on a query.
 * Route: GET /api/books/search?q=query_term
 */
app.get('/api/books/search', async (req, res) => {
    // Extract the search query from the URL parameters (e.g., ?q=...)
    const query = req.query.q; 
    
    if (!query) {
        return res.status(400).json({ error: 'Search query (q) is required.' });
    }

    console.log(`Received search query: "${query}"`);

    try {
        // Construct the URL for the Google Books API
        const apiUrl = `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=20`;

        // Make the GET request to the external API using axios
        const response = await axios.get(apiUrl);
        
        // Extract relevant data from the external API response
        const books = response.data.items ? response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['N/A'],
            publisher: item.volumeInfo.publisher,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
            thumbnail: item.volumeInfo.imageLinks 
                ? item.volumeInfo.imageLinks.thumbnail 
                : null,
            // Add a link to the book's Google Books page
            infoLink: item.volumeInfo.infoLink
        })) : [];

        // Send the clean, structured data back to the client
        res.status(200).json({ 
            totalItems: response.data.totalItems || 0,
            books: books 
        });

    } catch (error) {
        console.error('Error fetching data from Google Books API:', error.message);
        
        // Handle specific Axios errors (e.g., network issues, 4xx/5xx status codes)
        res.status(500).json({ 
            error: 'Failed to retrieve book data.',
            details: error.response ? error.response.data : error.message
        });
    }
});

// --- START SERVER ---

app.listen(PORT, () => {
    console.log(`Book Finder Backend running on http://localhost:${PORT}`);
    console.log(`API Endpoint: http://localhost:${PORT}/api/books/search?q=react`);
});

// To run this server, execute: node book_finder_server.js

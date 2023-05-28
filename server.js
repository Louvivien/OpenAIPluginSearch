const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); // Add this line
require('dotenv').config();

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public')); // This line is needed to serve static files like robots.txt and sitemap.xml
app.use(morgan('combined')); // Add this line

app.get('/', (req, res) => {
    console.log('GET request to /');
    res.render('index');
});

app.get('/search', async (req, res) => {
    console.log(`GET request to /search with query ${req.query.q}`);
    const query = req.query.q;
    const url = process.env.SERVER+`${query}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'authorization': `Bearer ${process.env.OPENAI_TOKEN}`,
                'content-type': 'application/json'
            }
        });

            // Filter the items based on the query
            const items = response.data.items;
            const queryWords = query.toLowerCase().split(' ');
            const filteredItems = items
                .map(item => {
                    const itemText = (item.namespace + ' ' + item.manifest.description_for_model + ' ' + item.manifest.description_for_human).toLowerCase();
                    const matchCount = queryWords.reduce((count, word) => count + (itemText.includes(word) ? 1 : 0), 0);
                    return { item, matchCount };
                })
                .filter(({ matchCount }) => matchCount > 0)
                .sort((a, b) => b.matchCount - a.matchCount)
                .map(({ item }) => item);


        res.render('results', { items: filteredItems });
    } catch (error) {
        console.error(`Error during /search: ${error.toString()}`);
        res.json({ error: error.toString() });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

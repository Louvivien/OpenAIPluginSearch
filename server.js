const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public')); // This line is needed to serve static files like robots.txt and sitemap.xml

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/search', async (req, res) => {
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
        const filteredItems = items.filter(item => {
            return item.namespace.toLowerCase().includes(query.toLowerCase()) || 
                   item.manifest.description_for_model.toLowerCase().includes(query.toLowerCase()) ||
                   item.manifest.description_for_human.toLowerCase().includes(query.toLowerCase());
        });

        res.render('results', { items: filteredItems });
    } catch (error) {
        res.json({ error: error.toString() });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

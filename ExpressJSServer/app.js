const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("css"));

app.get('/', (req, res) => {
    res.render('index', 
    { title: 'Vanier', people: 'vanier students', user: { name: '', position: 'prof' } });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
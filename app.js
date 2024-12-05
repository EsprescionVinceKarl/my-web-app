const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const notesRoutes = require('./routes/notesRoutes');  

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', notesRoutes);  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



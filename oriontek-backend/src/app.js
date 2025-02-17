const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const clientRoutes = require('./routes/clientRoutes');
const addressRoutes = require('./routes/addressRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/clients/:clientId/addresses', addressRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('db connection ok.');
  })
  .catch(err => {
    console.error('Error:', err);
  });


const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

app.get('/', (req, res) => {
  res.json({ message: 'API working!!!' });
});
const corsOptions = {
    origin: "*", // Replace with your frontend app's URL
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
  
  module.exports = corsOptions
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/Movie-ticket-booking');
(async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
                    
          
          await sequelize.sync();      
        } 
      catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})().catch(console.error);

const sequelize = require('../db/connect.js');
const Task = require('./taskModel.js');

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log('Database connection established');
        await sequelize.sync();
        console.log('All models synchronized');
    } catch (error) {
        console.error('Unable to connect to the database', error);
    }
})();

module.exports = {sequelize, Task};
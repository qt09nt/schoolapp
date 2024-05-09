const Sequelize = require('sequelize');

const databaseName = 'roboschoolapp';
const username = 'root';
const password = 'ghostsoap';
const dbConfig = new Sequelize(databaseName, username, password, {dialect: 'mariadb'});

//Test DB connection
dbConfig.authenticate().then(() => {
    console.log('Database is connected');

    //Create database tables
    dbConfig.sync().then(() => {
        console.log('Tables created')
    }).catch((err) => {
        console.log(err);
    });

}).catch((err) => {
    console.log(err)
});


module.exports = dbConfig;
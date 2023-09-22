const { DataSource } = require('typeorm');

const wekeaDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE
});

const wekeaDataSourceInit = async () => {
    
    await wekeaDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized");
        })
        .catch((err) => {
            console.error('Error occured during Data Source initialization', err);
            wekeaDataSource.destroy();
        });
}

wekeaDataSourceInit();

module.exports = { wekeaDataSource }
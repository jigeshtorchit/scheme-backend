const config = {
    mongodb: {
        url: 'mongodb+srv://admin:govtscheme23nov@govtscheme.f9jqscx.mongodb.net/',
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    timeout: 300000, // Set a higher timeout value (in milliseconds)
};

module.exports = config;

var logger = require('mindweb-logger'),
    argv = require('minimist')(process.argv.slice(2)),
    Config = require('./Config'),

    configPath = '../config/tracker.json',
    config = new Config(),
    tracker,
    dataStoreClass,
    dataStore;

if (typeof argv.config === 'string') {
    configPath = argv.config;
}

try {
    config.readFromPath(configPath);
    config.readFromObject(argv, 'config-');

    tracker = require(config.get('module'));
    dataStoreClass = require(config.get('dataStore'));
    dataStore = new dataStoreClass(logger);
} catch (err) {
    logger.error(err.message);

    process.exit(1);
}

if (typeof argv.verbose === 'string') {
    logger.setLevel(argv.verbose);
}

tracker.setLogger(logger);
tracker.setDataStore(dataStore);

config.get('modules').forEach(
    function (module)
    {
        var ModuleClass = require(module),
            instance = new ModuleClass();

        instance.register(tracker);
    }
);

tracker.init();
tracker.run(
    config.get('domain'),
    config.get('port')
);

var logger = require('mindweb-logger'),
    argv = require('minimist')(process.argv.slice(2)),
    Config = require('./Config'),
    ModuleFactory = require('./ModuleFactory'),

    configPath = '../config/tracker.json',
    config = new Config(),
    moduleFactory = new ModuleFactory(),
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
        var instance,
            name;

        if (typeof module === 'string') {
            instance = moduleFactory.factory(require(module));
            name = module.split('/').slice(-1)[0];
        } else if (typeof module === 'object' && typeof module.module === 'string') {
            instance = moduleFactory.factory(require(module.module), module.args);
            if (typeof module.name !== 'string') {
                name = module.module.split('/').slice(-1)[0];
            } else {
                name = module.name;
            }
        } else {
            return;
        }

        if (typeof instance !== 'undefined') {
            if (typeof instance.register === 'function') {
                instance.register(tracker);
            } else {
                tracker.register(name, instance);
            }
        }

    }
);

tracker.init();
tracker.run(
    config.get('domain'),
    config.get('port')
);

'use strict';
/* eslint-env node */
const yargs = require('yargs');

const TestingServer = require('../test/server/TestingServer');

const {argv} = (
    yargs
    .option('host', {
        alias: 'h',
        describe: 'HTTP Listen host',
        default: 'localhost',
    })
    .option('port', {
        alias: 'p',
        describe: 'HTTP Listen port',
        default: 0,
        number: true,
    })
    .option('bad-cert-port', {
        describe: 'HTTPS Listen port which provides a bad certificate',
        default: -1,
        number: true,
    })
    .help('help')
);

(async () => {
    try {
        const server = new TestingServer({
            listenHost: argv.host,
            listenPort: argv.port,
            badTLSListenPort: argv['bad-cert-port'],
        });
        await server.start();
    }
    catch (err) {
        console.error('Error starting server!', err);
        process.exitCode = 1;
    }
})();

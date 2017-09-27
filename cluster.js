'use strict';

// load the packages
const cluster = require('cluster');
const os = require('os');
const logger = require('./server/utils/logger').logger;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  logger('info', `Starting ${numCPUs} nodes...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', worker => {
    logger('info', `Node ${worker.process.pid} started!`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger('warn', `Node ${worker.process.pid} died with code: ${code}, and signal: ${JSON.stringify(signal)}`);
    logger('info', `Starting a new node...`);
    cluster.fork();
  });
} else {
  // eslint-disable-next-line
  require('./server');
}

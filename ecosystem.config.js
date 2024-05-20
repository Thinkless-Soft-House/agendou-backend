/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
  apps: [
    {
      name: 'prod', // pm2 start App name
      script: 'dist/server.js',
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instance_var: 'INSTANCE_ID', // instance variable
      instances: 2, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 3000,
        NODE_ENV: 'production',
        DB_HOST: 'aws-0-sa-east-1.pooler.supabase.com',
        DB_PORT: '5432',
        DB_USER: 'postgres.pgcijumytcljunqihrsp',
        DB_PASSWORD: 'Xbbh1YH2WWjWliZu',
        DB_DATABASE: 'postgres',
        SECRET_KEY: 'secretKey',
        LOG_FORMAT: 'dev',
        LOG_DIR: '../logs',
        ORIGIN: '*',
        CREDENTIALS: 'true',
        URL_LAMBDA: 'https://3btojc1td5.execute-api.us-east-1.amazonaws.com',
        KEY: 'fjmdkshwr4uy8ht90v453ou113616850tu',
      },
    },
    {
      name: 'dev', // pm2 start App name
      script: 'ts-node', // ts-node
      args: '-r tsconfig-paths/register --transpile-only src/server.ts', // ts-node args
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instance_var: 'INSTANCE_ID', // instance variable
      instances: 2, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 3000,
        NODE_ENV: 'development',
        DB_HOST: 'aws-0-sa-east-1.pooler.supabase.com',
        DB_PORT: '5432',
        DB_USER: 'postgres.pgcijumytcljunqihrsp',
        DB_PASSWORD: 'Xbbh1YH2WWjWliZu',
        DB_DATABASE: 'postgres',
        SECRET_KEY: 'secretKey',
        LOG_FORMAT: 'dev',
        LOG_DIR: '../logs',
        ORIGIN: '*',
        CREDENTIALS: 'true',
        URL_LAMBDA: 'https://3btojc1td5.execute-api.us-east-1.amazonaws.com',
        KEY: 'fjmdkshwr4uy8ht90v453ou113616850tu',
      },
    },
  ],
  deploy: {
    production: {
      user: 'user',
      host: '0.0.0.0',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: 'dist/server.js',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --only prod',
    },
  },
};

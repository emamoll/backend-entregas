module.exports = {
  apps : [{
    name: 'app',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    instances: "max",
    args: '--puerto=8080'
  },
  {
    name: 'app1',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    instances: "max",
    args: '--puerto=8082'
  },
  {
    name: 'app2',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    instances: "max",
    args: '--puerto=8083'
  },
  {
    name: 'app3',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    instances: "max",
    args: '--puerto=8084'
  },
  {
    name: 'app4',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    instances: "max",
    args: '--puerto=8085'
  }]
};

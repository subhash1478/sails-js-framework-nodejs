## Installation

Install from NPM.

```bash
# In your app:
$ npm install sails-mysql2
```

## Sails Configuration

Add the mysql config to the config/connections.js file. Basic options:

```javascript
module.exports.connections = {
  mysql: {
    adapter   : 'sails-mysql2',
    host      : 'localhost',
    port      : 3306,
    user      : 'username',
    password  : 'password',
    database  : 'MySQL Database Name'

    // OR (explicit sets take precedence)
    adapter   : 'sails-mysql',
    url       : 'mysql2://USER:PASSWORD@HOST:PORT/DATABASENAME'

    // Optional
    charset   : 'utf8',
    collation : 'utf8_swedish_ci'
  }
};
```

And then change default model configuration to the config/models.js:

```javascript
module.exports.models = {
  connection: 'mysql'
};
```

## Run tests

You can set environment variables to override the default database config for the tests, e.g.:

```sh
$ WATERLINE_ADAPTER_TESTS_PASSWORD=yourpass npm test
```


Default settings are:

```javascript
{
  host: process.env.WATERLINE_ADAPTER_TESTS_HOST || 'localhost',
  port: process.env.WATERLINE_ADAPTER_TESTS_PORT || 3306,
  user: process.env.WATERLINE_ADAPTER_TESTS_USER || 'root',
  password: process.env.WATERLINE_ADAPTER_TESTS_PASSWORD || '',
  database: process.env.WATERLINE_ADAPTER_TESTS_DATABASE || 'sails_mysql',
  pool: true,
  connectionLimit: 10,
  waitForConnections: true
}
``

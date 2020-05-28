process.env.NODE_ENV = 'development';
process.env.STATICDIR = 'build';
process.env.PORT = 3001;
require("@babel/register")({
	plugins: ["@babel/plugin-transform-runtime"]
});
// ignore `import '*.css'` statements
require.extensions['.css'] = () => {};

require('./src/server.js');

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
      "path": require.resolve("path-browserify")
    }) 
   config.resolve.fallback = fallback; 
    return config;
  }
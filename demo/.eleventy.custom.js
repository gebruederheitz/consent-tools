module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        '../dist/**/*js*': 'assets/scripts',
    });
    eleventyConfig.addPassthroughCopy({
        '../dist/**/*css': 'assets/css',
    });

	// Wait for rollup builds to finish
	eleventyConfig.setWatchThrottleWaitTime(2000);
}


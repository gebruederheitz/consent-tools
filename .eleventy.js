const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
// const { escape } = require('html-escaper');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('demo/*.css');
    eleventyConfig.addPassthroughCopy('dist');

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addCollection('demos', function (collectionApi) {
        return collectionApi.getFilteredByTag('demo').sort((a, b) => {
            const bNavOrder = b.data.navOrder || 99;
            const aNavOrder = a.data.navOrder || 99;
            return aNavOrder - bNavOrder;
        });
    });

    const markdownIt = require('markdown-it');
    const options = {
        html: true,
        breaks: false,
        linkify: true,
    };
    const md = markdownIt(options);
    md.renderer.rules.table_open = function () {
        return '<table class="table table-bordered table-group-divider">';
    };
    md.disable('code');
    eleventyConfig.setLibrary('md', md);

    let pathPrefix;
    if (process.env.NODE_ENV === 'production') {
        pathPrefix = '/consent-tools/';
    } else {
        pathPrefix = '';
    }

    return {
        markdownTemplateEngine: 'njk',
        pathPrefix,
    };
};

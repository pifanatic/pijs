module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "chai"],
        files: [
            {
                pattern: "test/**/*.js",
                type: "module"
            },
            {
                pattern: "js/pi.js",
                type: "module"
            }
        ],
        preprocessors: {
            "js/pi.js": ["coverage"]
        },
        reporters: ["progress", "coverage"],
        coverageReporter: {
            reporters: [
                { type: "text" },
                { type: "html" }
            ]
        },
        singleRun: true,
        port: 9876,  // karma web server port
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ["ChromeHeadless"],
        autoWatch: false,
        concurrency: Infinity
    })
}

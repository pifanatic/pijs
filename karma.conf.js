module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "chai-spies", "chai"],
        files: [
            {
                pattern: "test/**/*.js",
                type: "module"
            },
            {
                pattern: "src/pi.js",
                type: "module"
            },
            {
                pattern: "src/utils.js",
                type: "module"
            }
        ],
        preprocessors: {
            "src/pi.js": ["coverage"],
            "src/utils.js": ["coverage"]
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

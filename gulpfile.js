// node modules

// npm modules
const gulp = require('gulp');
const webpack = require('webpack');
const WStream = require('webpack-stream');
const pump = require('pump');

// --gulp modules
const babel = require('gulp-babel');
const less = require('gulp-less');
const watch = require('gulp-watch')

// custom modules
const wp_config = require('./webpack.config.js');

const paths = {
    less: {
        src: "./less/main.less",
        out: "./resources/style/",
        imp: "./less/**/*.less"
    },
    react: {
        src: "./react/build/**/*.js",
        out: "./react"
    },
    webpack: {
        src: "./js/webpack.js",
        out: "./resources/scripts"
    }
}

function buildReact() {
    console.log("running React");
    pump([
        gulp.src(paths.react.src),
        babel({
            presets: ["react"]
        }),
        gulp.dest(paths.react.out)
    ],(err) => {
        if(err) {
            console.log("ERROR during stream: React\n",err);
        } else {
            console.log("stream: React finished");
        }
    });
}

function buildLess() {
    console.log('running Less');
    pump([
        gulp.src(paths.less.src),
        less({
            paths: paths.less.imp
        }),
        gulp.dest(paths.less.out)
    ],(err) => {
        if(err) {
            console.log("ERROR during stream: Less\n",err);
        } else {
            console.log("stream: Less finished");
        }
    });
}

function buildWebpack() {
    console.log('running Webpack');
    pump([
        gulp.src(paths.webpack.src),
        WStream(wp_config,webpack,(err,stats) => {
            if(err) {
                console.log(`error during packing\n`,err);
            } else {
                console.log(`packing results
    time: ${stats.endTime - stats.startTime}ms
    hash: ${stats.hash}`);
            }
        }),
        gulp.dest(paths.webpack.out)
    ],(err) => {
        if(err) {
            console.log('ERROR during stream: Webpack\n',err);
        } else {
            console.log('stream: Webpack finished');
        }
    });
}

gulp.task('build-react',() => {
    buildReact();
});

gulp.task('build-less',() => {
    buildLess();
});

gulp.task('build-webpack',() => {
    buildWebpack();
});

gulp.task('watch-react',() => {
    return watch(paths.react.src,() => {
        buildReact();
    });
});

gulp.task('watch-less',() => {
    return watch([paths.less.src,paths.less.imp],() => {
        buildLess();
    });
});

gulp.task('default',['build-react','build-less','build-webpack','watch-react','watch-less']);

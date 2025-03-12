const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {};

const defaultConfig = getDefaultConfig(__dirname);
module.exports = mergeConfig(defaultConfig, config);

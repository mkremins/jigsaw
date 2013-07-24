var fs = require('fs');
var path = require('path');
var util = require('util');

function PluginLoader(pluginsDir) {
	this._dir = pluginsDir;
	this._dirname = path.basename(pluginsDir);
	this._plugins = {};
}

util.inherits(PluginLoader, EventEmitter);

PluginLoader.prototype.load = function(filename, api) {
	var plugin, self = this;
	try {
		plugin = require(self._dir + '/' + filename);
		plugin.enable(api);
		plugin.name = plugin.name || filename.split('.')[0];
		self._plugins[plugin.name] = plugin;
		self.emit('load', plugin);
	} catch(err) {
		self.emit('fail', { filename: filename, reason: err });
	}
};

PluginLoader.prototype.loadAll = function(api) {
	var self = this;
	fs.readdir(self._dir, function(filenames) {
		filenames.forEach(function(filename) {
			self.load(filename, api);
		});
	});
};

PluginLoader.prototype.unload = function(pluginName) {
	var plugin, self = this;
	plugin = self._plugins[pluginName];
	if (typeof plugin.disable == 'function') {
		plugin.disable();
	}
	self.emit('unload', plugin);
};

PluginLoader.prototype.unloadAll = function() {
	var plugin, self = this;
	for (var pluginName in self._plugins) {
		self.unload(pluginName);
	}
};

module.exports = PluginLoader;

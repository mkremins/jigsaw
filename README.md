jigsaw
=======================================

jigsaw is a plugin loader for extensible node.js projects.

usage
---------------------------------------

### loading + unloading plugins

    var PluginLoader = require('jigsaw');

    var myPluginLoader = new PluginLoader('/path/to/plugin/directory');

    // give each plugin access to some API methods
    myPluginLoader.loadAll({
    	someMethodForPluginsToUse: ...,
    	someOtherMethodForPluginsToUse: ...,
    	someVariableForPluginsToUse: ...,
    	...
    });

    ...

    // some time later
    myPluginLoader.unloadAll();

### plugins look like this

    function enable(api) {
    	// perform initialization here
    	// 'api' is the object that was passed to loadAll(...) in the first code sample
    }

    function disable() {
    	// perform cleanup (if you have to do any) here
    }

    ...

    // plugins should be valid node modules
    module.exports = {
    	enable: enable,    // required – called when your plugin is loaded
    	disable: disable,  // optional – if provided, called when your plugin is unloaded
    	name: 'MyPlugin',  // optional – if not provided, defaults to name of file containing plugin code
    	...
    };

### ![](https://cloud.githubusercontent.com/assets/2152766/6998101/5c13946c-dbcd-11e4-968b-b357b7c60a06.png)

Pyblish integration for After Effects CC.

This package depends on the following packages:

- [pyblish-standalone](https://github.com/pyblish/pyblish-standalone)
- [pyblish-lite](https://github.com/pyblish/pyblish-lite)

Please refer to each package for installation guide.

### What is included?

A server/client framework to communicate with After Effects with easy to use Python functions.

### Installation

Install ```pyblish-standalone```.

Copy the provided ExtendScript script ```pyblish-aftereffects/script/pyblish_aftereffects.jsx``` to your scripts directory; https://helpx.adobe.com/after-effects/using/scripts.html

### Usage

In After Effects go to ```File > Scripts > pyblish_aftereffects.jsx```.  
(**NOTE: You can rename ```pyblish_aftereffects.jsx``` to something nicer**)

You may be presented with an error when executing the script;

![ae_script_error](https://cloud.githubusercontent.com/assets/1860085/19266693/a792392c-8fa2-11e6-809b-872de04071b2.png)

If this happens, go to ```Preferences > General``` and enable ```Allow Scripts to Write Files and Access Network```.

Now ```pyblish-lite``` should open and put After Effects into a locked mode. Only when ```pyblish-lite``` is closed again, will After Effects respond to user inputs.

From here you can communicate with After Effects through the provided framework. Here is an example of a collector that prints the After Effects version to the Pyblish log;

```python
import pyblish.api
import pyblish_aftereffects

class CollectAEVersion(pyblish.api.ContextPlugin):

    order = pyblish.api.CollectorOrder

    def process(self, context):
        app_version = pyblish_aftereffects.send("return app.version")
        self.log.info(app_version)
```

The main function to use is ```pyblish_aftereffects.send()```. This takes ExtendScript/JavaScript code, and sends it to After Effects. If the code returns anything, you will get that result. As it is send over TCP/IP, all return values will be strings.

### Javascript reference
Here is a collected reference for ExtendScript/JavaScript for After Effects.

http://www.adobe.com/devnet/aftereffects.html
http://download.macromedia.com/pub/developer/aftereffects/scripting/After-Effects-CS6-Scripting-Guide.pdf
http://download.macromedia.com/pub/developer/aftereffects/scripting/JavaScript-Tools-Guide-CC.pdf

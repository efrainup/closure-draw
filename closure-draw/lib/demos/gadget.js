goog.provide('closuredraw.gadget.App');
goog.require('goog.dom.xml');
goog.require('goog.string');
goog.require('goog.userAgent');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.ToolbarSeparator');
goog.require('closuredraw');

closuredraw.gadget.App = function() {
  var width = 0, height = 512;
  if(document.documentElement && document.documentElement.clientWidth) {
	width = document.documentElement.clientWidth;
  } else {
	width = document.body.clientWidth;
  }

  var isIE = goog.userAgent.IE;
  if(isIE) {
	goog.dom.$('svgtext-div').style.display = 'block';
	height = 256;
  }

  var outer  = goog.dom.$('canvas');
  var canvas = new closuredraw.Widget(width, height);
  canvas.render(outer);

  var toolbar = canvas.getToolbar();
  var saveBtn = new goog.ui.ToolbarButton("Save");
  toolbar.addChildAt(saveBtn, 0, true);
  toolbar.addChildAt(new goog.ui.ToolbarSeparator(), 1, true);

  goog.events.listen(saveBtn, goog.ui.Component.EventType.ACTION, function(e) {
	var svg = goog.dom.xml.serialize(canvas.exportSVG().documentElement);
	// remove empty namespaces because IE may generate it.
	svg = svg.replace(/\s*xmlns=\"\"/g, '');

	if(isIE) {
	  goog.dom.setTextContent(goog.dom.$('svgtext'), svg);
	} else {
	  window.open('data:image/svg+xml;charset=UTF-8,' + goog.string.urlEncode(svg), null);
	}
  });
}
new closuredraw.gadget.App();

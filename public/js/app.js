require(["codemirror/lib/codemirror", "codemirror/mode/ruby/ruby"], function(CodeMirror) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    $(function() {
    	var newEditor = function($el) {
			new CodeMirror($el[0], {
				lineNumbers: true,
				mode: "ruby"
			});
		};
		var mirror = newEditor($("#main_editor"));
		var $secondary_editor = $("<div />").addClass("code-editor");
		$("#secondary").append($secondary_editor);
		var secondary_mirror = newEditor($secondary_editor);
    });
});

require(["codemirror/lib/codemirror", "codemirror/mode/ruby/ruby"], function(CodeMirror) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    $(function() {
    	var newEditor = function($el) {
			return new CodeMirror($el[0], {
				lineNumbers: true,
				mode: "ruby"
			});
		};

		var load_file = function(path, editor) {
			return $.getJSON("/files/get", {path: path}, function (file) {
				var text = file.contents;
				editor.setValue(text);
			});
		};

		var open_secondary_file = function(path) {
			var promise = $.Deferred();
			var $secondary_editor = $("<div />").addClass("code-editor");
			$("#secondary").append($secondary_editor);
			var editor = newEditor($secondary_editor);
			load_file(path, editor).done(function() {
				promise.resolve(editor);
			});
			return promise;
		};

		var load_file_for_token = function(token) {
			$.getJSON("/symbols/find", {name: token.string}, function(matches) {
				if (matches.length > 0) {
					var match = matches[0];
					open_secondary_file(match.path).done(function(editor){
						editor.focus();
						editor.setCursor(match.line - 1, 0);
					});
				} else {
					console.log("No match");
				}
			});
		};

		window.mirror = newEditor($("#main_editor"));
		mirror.setOption("extraKeys", {
			"Cmd-B": function(cm) {
				var token = cm.getTokenAt(cm.getCursor());
				load_file_for_token(token);
			}
		});

		load_file("example/main.rb", mirror);
    });
});

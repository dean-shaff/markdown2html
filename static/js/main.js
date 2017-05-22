
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

var Markdown2Html = {
    loadFile: function(self, evt){
        var files = evt.target.files ;
        if (files.length > 1){
            return ;
        }
        var f = files[0];
        var reader = new FileReader();
        reader.onload = function(e){
            var contents = e.target.result ;
            // console.log("File contents:");
            // console.log(contents);
            $("#markdown-edit").val(contents);
            self.render();
        };
        reader.readAsText(f);
    },
    render: function(e){
	    var text_cur = $('#markdown-edit').val();
	    var nLines = text_cur.split("\n").length ;
	    var fontSize = parseInt($("#markdown-edit").css('font-size'),10);
	    var curHeight = $("#markdown-edit").height();
	    var candidateHeight = nLines*fontSize;
	    if (candidateHeight != curHeight && candidateHeight > 400){
	    	$("#markdown-edit").height("{}px".format(candidateHeight));
	    }
	    // console.log(nLines);
	    // console.log(fontSize);
	    // console.log(candidateHeight);
	    $('#html-area').html(marked(text_cur));
	},
	tab: function(e){
		var keyCode = e.keyCode || e.which ;
		if (keyCode === 9) {
	        e.preventDefault();
	        var start = this.selectionStart;
	        var end = this.selectionEnd;
	        var val = this.value;
	        var selected = val.substring(start, end);
	        var re = /^/gm;
	        var count = selected.match(re).length;
	        this.value = val.substring(0, start) + selected.replace(re, '    ') + val.substring(end);
	        this.selectionEnd = start + 4;
	    }
	},
	init: function(){
        var self = this ;
		var columnsWidth = $("#edit-columns").width();
		$("#markdown-edit").height("400px");
		$("#markdown-edit").width(columnsWidth);
        $('#markdown-edit').on('keydown', this.tab);
        $("#markdown-edit").on('change keyup paste', this.render);
        $("#load-file").on('change', function(e){self.loadFile(self, e)});
        $("#load-file-meta").on('click', function(e){
            $("#load-file").click();
        })

	}
}

$(document).ready(Markdown2Html.init());

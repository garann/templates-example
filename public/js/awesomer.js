if (!awesomer) var awesomer = {};

awesomer.initHome = function() {
	awesomer.infos = $("div.band-info");
	awesomer.infos.each(function() {
		var $t = $(this);
		var spot = $t.spotlight(5);
		$t.mouseover(function() {
			spot.go();
		})
		.mouseout(function() { spot.stop(); });
		
		$t.click(function() {
			window.location.href = "http://127.0.0.1:3000/banana-wolf";
		});
	});
};

awesomer.initBand = function() {
	$("div.band-info").delegate("#addComment","click",function() {
		var comment = {timestamp: new Date()},
			txtName = document.getElementById("txtName"),
			txtText = document.getElementById("txtText");
		
		comment.commentor = txtName.value;
		comment.text = txtText.value;
		if ($.template("commentTmpl").length) {
			awesomer.updateComment(comment,[txtName,txtText]);
		} else {
			$.get("/templates/comment-tmpl.js",function(response) {
				$.template("commentTmpl",response);
				awesomer.updateComment(comment,[txtName,txtText]);
			});
		}
	});
};

awesomer.updateComment = function(comment,formFields) {
	$("h4").before($.tmpl("commentTmpl",comment));
	$.each(formFields,function() {
		this.value = "";
	});
};
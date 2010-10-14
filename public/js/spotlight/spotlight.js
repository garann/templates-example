(function($) {
  $.fn.spotlight = function(lights) {
  	this.lights = lights;
	this.objs = new Array();
	this.positions = new Array();
	this.going = false;
	var that = this;
    
	this.init = function() {
		var l = this.lights;
		while (l != 0) {
			this.objs.push({});
			l--;	
		}
		
		if ($.template("commentTmpl").length) {
			this.draw();
		} else {
			$.get("/js/spotlight/spotlight-tmpl.js",function(response) {
				$.template("spotlightTmpl",response);
				that.draw()
			});
		}
		
	};
	
	this.draw = function() {
		$.tmpl("spotlightTmpl",this.objs).appendTo(this);
			
		var h = this.height();
		var w = this.width();
		var c = 100;
		while (c != 0) {
			this.positions.push({
				x:Math.floor(Math.random()*w),
				y:Math.floor(Math.random()*h)	
			});
			c--;	
		}
		$("div.spotlight").each(function() {
			var p = that.positions.shift();
			$(this).css("top",p.y).css("left",p.x);
			that.positions.push(p);
		});
	};
	
	this.go = function() {
		this.going = true;
		$("div.spotlight",that).show();
		var c = 20;
		while (this.going && c != 0) {
			$("div.spotlight",that).each(function() {
				var p = that.positions.shift();
				$(this).animate({top:p.y,left:p.x},1000);
				that.positions.push(p);
			});	
			c--;
		}
	};
	
	this.stop = function() {
		this.going = false;
		$("div.spotlight",that).hide();
	};
	
	this.init();
	return this;
  };
})(jQuery);
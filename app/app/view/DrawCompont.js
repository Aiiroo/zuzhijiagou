Ext.define('org.view.DrawCompont', {
	extend: 'Ext.draw.Component',
	alias: 'widget.flowChart',
	viewBox: false,
	initComponent: function() {
		var me = this;
		me.BASE_FLOW_TYPE = ['node', 'line'];
		me.clickTime = new Date();
		me.callParent(arguments);
	},
	listeners: {
		beforeAdd: function(draw, sprite) {
		},
		afterAdd: function(draw, sprite) {
		}
	},
	add: function(sprite) {
		var me = this;
		if(sprite.length == 0) {
			me.add([{
		    	type: 'text',
		    	text: '未设置流程图...',
		    	font: '20px Arial',
		    	fill: 'red',
		    	x: 0,
		    	y: 20
		   	}])
		}
		Ext.Array.each(sprite, function(s) {
			if(s.type == 'node') {
				var ptype = s.type,
					items = s.items,
					x = s.x,
					y = s.y,
					text = s.text,
					fontSize = s.fontSize,
					textSize = me.getTextSize(text, fontSize),
					width = s.width || me.getTextSize(text, fontSize).width+10,
					height = s.height || me.getTextSize(text, fontSize).height+10,
					bgColor = s.bgColor,
					color = s.color,
					textWidth = textSize.width,
					textHeight = textSize.height;
					
				me.add([{
					ptype: ptype,
					items: items,
			        type: 'rect',
			        fill: bgColor,
			        width: width,
			        height: height,
			        x: x,
			        y: y,
			        radius: 5
			   	}, {
			   		ptype: ptype,
			   		items: items,
			    	type: 'text',
			    	text: text,
			    	font: fontSize + 'px Arial',
			    	fill: color,
			    	x: x + width/2 - textWidth/2,
			    	y: y + height/2
			   	}]);
			}
			else if(s.type == 'line') {
				var ptype = s.type;
					x1 = s.x,
					y1 = s.y,
					x2 = s.x2,
					y2 = s.y2,
					a1 = s.a1 || 0,
					a2 = s.a2 || 0,
					color = s.color;
					
				me.add({
					ptype: ptype,
					type: 'path',
					path: me.getLinePath(x1,y1,x2,y2,a1,a2),
					stroke: color || '#ababab',
					'stroke-width': 1
				});
			}
			me.willBeforeAdd(s);
		});
		me.fireEvent('beforeAdd', me, sprite);
		var ss = [];
		Ext.Array.each(sprite, function(s) {
			if(me.BASE_FLOW_TYPE.indexOf(s.type) == -1) { // 只添加非封装类型图形
				var sp = me.surface.add(s);
				sp.show(true);
				ss.push(sp);
			}
		});
		
		me.fireEvent('afterAdd', me, ss);
		me.didAfterAdd(me, ss);
		return true;
	},
	getElement: function(id) {
		return document.getElementById(id);
	},
	willBeforeAdd: function(sprite) {
		var me = this;
		var draggable = sprite.draggable,
			listeners = sprite.listeners || {};
		
		if(draggable) {
			if(listeners.render) {
				listeners.render = function(sprite, event) {
					sprite.draggable = true;
					listeners.render(sprite, event);
				}
			}else {
				listeners.render = function(sprite) {
					sprite.draggable = true;
					sprite.initDraggable();
				}
			}
		}
		return sprite;
	},
	/** 添加事件等 **/
	didAfterAdd: function(draw,sprite) {
		var me = this;
		Ext.Array.each(sprite, function(s) {
			// 对节点类型添加点击事件
			if(s.ptype == 'node') {
				var items = s.items;
				if(items) {
					s.el.dom.style.cursor = 'pointer';
					var tspan = s.el.dom.getElementsByTagName('tspan')[0];
					if(tspan)tspan.style.cursor = 'pointer';
					
					if(items instanceof Array) {
						s.el.dom.addEventListener("click", function (e) {
							me.showMenu(items, e);
						});
					}else {
						if(items.url) {
							/*if(s.type === 'text') {
								s.el.dom.style.textDecorationLine = 'underline';
								s.el.dom.style.fill = 'blue';
							}*/
							s.el.dom.addEventListener("click", function () {
								openUrl2(items.url,items.title);
							});
						}
					}
				}
			}
		});
	},
	showMenu: function(items, e) {
		var me = this;
		var menu = me.createMenu(items);
		menu.showAt([e.x, e.y])
	},
	createMenu: function(items) {
		var menu = new Ext.menu.Menu();
		Ext.Array.each(items, function(item) {
			menu.add({
				text: item.text,
				url: item.url,
				style: 'backgroundColor:white;border:none;',
				handler: function() {
					// TODO
					openUrl2(item.url,item.title);
				}
			});
		});
		return menu;
	},
	getTextSize: function(text, fontSize) {
		var me = this;
		var span = document.createElement("pre");
	    var result = {};
	    result.width = span.offsetWidth;
	    result.height = span.offsetWidth; 
	    span.style.visibility = "hidden";
	    span.style.wordWrap = 'break-word';
	    span.style.position = 'absolute';
	    span.style.fontSize = fontSize + 'px';
	    document.body.appendChild(span);
	    if (typeof span.textContent != "undefined")
	        span.textContent = text;
	    else span.innerText = text;
	    result.width = span.getBoundingClientRect().width;
	    result.height = span.getBoundingClientRect().height;
	    span.parentNode.removeChild(span);
	    return result;
	},
	getLinePath: function(x1,y1,x2,y2,arrowLeft, arrowRight) {
		var path,
      		slopy,cosy,siny,
      		Par=10.0,
      		x3,y3,
      		slopy=Math.atan2((y1-y2),(x1-x2)),
      		cosy=Math.cos(slopy),
      		siny=Math.sin(slopy);
		
		path="M"+x1+","+y1+" L"+x2+","+y2;  
           
		x3=(Number(x1)+Number(x2))/2; // 中点x 
		y3=(Number(y1)+Number(y2))/2; // 中点y
		
		function drawArrow(x,y,dir) {
			var path = '';
			if(!Number.isNaN(dir) && dir != 0) {
				path +=" M"+x+","+y;  
				path +=" L"+(Number(x)+dir*Number(Par*cosy-(Par/2.0*siny)))+","+(Number(y)+dir*Number(Par*siny+(Par/2.0*cosy)));  
				path +=" M"+(Number(x)+dir*Number(Par*cosy+Par/2.0*siny)+","+ (Number(y)-dir*Number(Par/2.0*cosy-Par*siny)));  
				path +=" L"+x+","+y;
			}
			return path;
		}
		
		path += drawArrow(x1,y1,Number(arrowLeft));
		path += drawArrow(x2,y2,Number(arrowRight));
		
		return path;
	}
});
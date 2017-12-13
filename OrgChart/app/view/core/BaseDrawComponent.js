Ext.define('org.view.core.BaseDrawComponent', {
	extend: 'Ext.draw.Component',
	alias: 'widget.basedraw',
	viewBox: false,
	maxSize: {width: 0, height: 0},
	initComponent: function() {
		var me = this;
		me.nodeSize = {width: 80, height:30};
		me.nodeGap = 10;
		me.callParent(arguments);
	},
	listeners: {
		beforeAdd: function(draw, sprite) {
		},
		afterAdd: function(draw, sprite) {
			draw.doLayout();
		},
		resize: function(draw,width,height) {
			draw.doLayout();
		}
	},
	add: function(sprite) {
		var me = this;
		me.fireEvent('beforeAdd', me, sprite);
		me.setDeepValue(sprite);
		me.allWidth = sprite.deepX * (me.nodeSize.width + me.nodeGap); // 总宽度
		me.setNodeLayout(sprite, {x: me.nodeGap, y: 0, deepX: sprite.deepX, deepY: sprite.deepY + 1, lastX: sprite.deepX, lastY: sprite.deepY+1})
		me.trueAdd2(sprite);
		me.fireEvent('afterAdd', me, sprite);
		return true;
	},
	/** 设置各个节点的横纵深度 **/
	setDeepValue: function(sprite) {
		var me = this,
			level = sprite.level,
			text = sprite.text,
			box = me.getBox();
			
		sprite.deepX = 1;
		sprite.deepY = 1;
		sprite.maxDeepX = sprite.maxDeepY = sprite.sumDeepX = sprite.sumDeepY = 0;
		
		if(sprite.children instanceof Array && sprite.children.length > 0) {
			Ext.Array.each(sprite.children, function(s) {
				me.setDeepValue(s);
				sprite.sumDeepX += s.deepX;
				sprite.sumDeepY += s.deepY;
				sprite.maxDeepX = sprite.maxDeepX > s.deepX ? sprite.maxDeepX : s.deepX;
				sprite.maxDeepY = sprite.maxDeepY > s.deepY ? sprite.maxDeepY : s.deepY;
			});
		}
		if(sprite.level >= 3) {
			sprite.deepX = 1 + sprite.maxDeepX;
			sprite.deepY = 1 + sprite.sumDeepY;
		}else {
			sprite.deepX = sprite.sumDeepX;
			sprite.deepY = 1 + sprite.maxDeepY;
		}
		delete sprite.sumDeepX;
		delete sprite.maxDeepX;
		delete sprite.sumDeepY;
		delete sprite.maxDeepY;
	},
	/** 设置各个节点的大小位置 **/
	setNodeLayout: function(sprite, parent) {
		var me = this;
		
		sprite.lastX = sprite.deepX;
		sprite.lastY = sprite.deepY;
		
		if(sprite.level > 3) {
			sprite.x = parent.x + me.nodeSize.width + me.nodeGap;
			sprite.y = parent.y + me.nodeSize.height + (parent.deepY - parent.lastY) * (me.nodeGap + me.nodeSize.height) + me.nodeGap;
			parent.lastY -= sprite.deepY;
		}else {
			sprite.x = parent.x + (parent.deepX - parent.lastX) * (me.nodeGap + me.nodeSize.width);
			sprite.y = parent.y + me.nodeSize.height + me.nodeGap*2;
			parent.lastX -= sprite.deepX;
		}
		
		if(sprite.children instanceof Array && sprite.children.length > 0) {
			Ext.Array.each(sprite.children, function(s) {
				me.setNodeLayout(s, sprite);
			});
			// 根据子节点位置调整父节点位置居中
			if(sprite.level <= 2) {
				sprite.x = (sprite.children[0].x + sprite.children[sprite.children.length-1].x)/2;
			}
		}
		me.setNodePoint(sprite);
	},
	trueAdd2: function(sprite, parent) {
		
		var me = this;
		var spriteEls = [];
		var x = sprite.x,
			y = sprite.y,
			text = sprite.text,
			fontSize = 14,
			textSize = me.getTextSize(text, fontSize),
			width = me.nodeSize.width,
			height = me.nodeSize.height,
			bgColor = '#bababa',
			color = 'white',
			textWidth = textSize.width,
			textHeight = textSize.height
		
		spriteEls.push({
	        type: 'rect',
	        fill: bgColor,
	        width: width,
	        height: height,
	        x: x,
	        y: y
	   	}, {
	    	type: 'text',
	    	text: text,
	    	font: fontSize + 'px Arial',
	    	fill: color,
	    	x: x + width/2 - textWidth/2,
	    	y: y + height/2
	   	});
	   	if(parent) {
	   		spriteEls.push({
		   		type: 'path',
		   		path: me.getNodeLine(sprite, parent),
		   		stroke: 'black',
			    'stroke-width': 1
		   	});
	   	}
		
		if(sprite.children instanceof Array && sprite.children.length > 0) {
		 	Ext.Array.each(sprite.children, function(s) {
		 		me.trueAdd2(s, sprite);
		 	});
		}
		
		var ss = [];
		Ext.Array.each(spriteEls, function(s) {
			me.willBeforeAdd(s);
			var sp = me.surface.add(s);
			sp.show(true);
			ss.push(sp);
		});
		me.didAfterAdd(me, ss);
		return ss;
	},
	removeAll: function() {
		var me = this;
		var sf = me.surface;
		sf.removeAll();
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
	didAfterAdd: function(draw,sprite) {
		var me = this;
	},
	/** 设置节点连线的起止点位置 **/
	setNodePoint: function(node) {
		var me = this;
		if(node.level <= 3) { // 如果是前三级节点
			node.inPoint = {
				x: node.x + me.nodeSize.width/2,
				y: node.y
			};
			node.outPoint = {
				x: node.x + me.nodeSize.width/2,
				y: node.y + me.nodeSize.height
			}
		}else {
			node.inPoint = {
				x: node.x,
				y: node.y + me.nodeSize.height/2
			},
			node.outPoint = {
				x: node.x + me.nodeSize.width/2,
				y: node.y + me.nodeSize.height
			}
		}
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
					/*openUrl2(item.url,item.title);*/
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
	/** 
	 * 根据两个节点级别设置连线
	 **/
	getNodeLine: function(sprite, parent) {
		var me = this,
			px = parent.outPoint.x,
			py = parent.outPoint.y,
			sx = sprite.inPoint.x,
			sy = sprite.inPoint.y,
			line = '';
		
		if(sprite.level <= 3) {
			line += ' M'+px+','+py+' L'+px+','+(py+me.nodeGap)+' L'+sx+','+(sy-me.nodeGap)+' L'+sx+','+sy;
		}else {
			line += ' M'+px+','+py+' L'+px+','+sy+' L'+sx+','+sy;
		}
		return line;
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
	},
	/**
	 * 根据元素位置设置svg容器高宽以显示滚动条
	 */
	doLayout: function() {
		var draw = this,
			width = draw.el.dom.offsetWidth,
			height = draw.el.dom.offsetHeight,
			svgEl = draw.el.dom.getElementsByTagName('svg')[0];
		
		if(draw.maxSize.width > width) {
			draw.el.dom.style.overflowX = 'scroll';
			svgEl.style.width = draw.maxSize.width+10 + 'px';
		}
		if(draw.maxSize.height > height) {
			draw.el.dom.style.overflowY = 'scroll';
			svgEl.style.height = draw.maxSize.height+10 + 'px';
		}
	}
});
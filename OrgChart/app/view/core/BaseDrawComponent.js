Ext.define('org.view.core.BaseDrawComponent', {
	extend: 'Ext.draw.Component',
	alias: 'widget.basedraw',
	viewBox: false,
	contentSize: {width: 0, height: 0},
	count: 0,
	initComponent: function() {
		var me = this;
		me.horizontalDeep = 7; // 横向展示深度
		me.nodeSize = {width: 90, height:40}; // 节点大小
		me.nodeGap = 10; // 节点间距
		me.smoothValue = 3; // 连线平滑度,
		me.nodePositon = []; // 所有节点所占的位置
		me.callParent(arguments);
	},
	listeners: {
		beforeAdd: function(draw, sprite) {
		},
		afterAdd: function(draw, sprite) {
			console.log(draw.nodePositon);
			console.log('一共添加了' + draw.count + '个节点');
			draw.doLayout();
		},
		resize: function(draw,width,height) {
			draw.doLayout();
		}
	},
	add: function(sprite) {
		var me = this;
		me.count = 0;
		me.fireEvent('beforeAdd', me, sprite);
		me.setDeepValue(sprite, {level: 0});
		me.allWidth = sprite.deepX * (me.nodeSize.width + me.nodeGap); // 总宽度
		me.setNodeLayout(sprite, {x: me.nodeGap, y: 0, deepX: sprite.deepX, deepY: sprite.deepY + 1, lastX: sprite.deepX, lastY: sprite.deepY+1})
		me.trueAdd(sprite);
		me.fireEvent('afterAdd', me, sprite);
		return true;
	},
	/** 设置各个节点的横纵深度 **/
	setDeepValue: function(sprite, parent) {
		var me = this;me.count++;
		
		if(sprite.level > me.horizontalDeep) {
			sprite.deepX = 0.5;
			sprite.deepY = 1;
		}else {
			sprite.deepX = 1;
			sprite.deepY = 1;
		}
		
		sprite.level = parent.level + 1;
		sprite.maxDeepX = sprite.maxDeepY = sprite.sumDeepX = sprite.sumDeepY = 0;
		
		if(sprite.children instanceof Array && sprite.children.length > 0) {
			Ext.Array.each(sprite.children, function(s) {
				me.setDeepValue(s, sprite);
				sprite.sumDeepX += s.deepX;
				sprite.sumDeepY += s.deepY;
				sprite.maxDeepX = sprite.maxDeepX > s.deepX ? sprite.maxDeepX : s.deepX;
				sprite.maxDeepY = sprite.maxDeepY > s.deepY ? sprite.maxDeepY : s.deepY;
			});
		}
		if(sprite.level > me.horizontalDeep) {
			sprite.deepX = 0.5 + sprite.maxDeepX;
			sprite.deepY = 1 + sprite.sumDeepY;
		}else {
			if(!sprite.children || sprite.children.length == 0) {
				sprite.deepX = 1;
				sprite.deepY = 1;
			}else {
				if(sprite.level < me.horizontalDeep) {
					sprite.deepX = sprite.sumDeepX;
					sprite.deepY = 1 + sprite.maxDeepY;
				}else {
					sprite.deepX = 1 + sprite.maxDeepX;
					sprite.deepY = 1 + sprite.sumDeepY;
				}
			}
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
		
		if(sprite.level > me.horizontalDeep) {
			sprite.x = parent.x + me.nodeSize.width*0.5 + me.nodeGap;
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
			if(sprite.level < me.horizontalDeep) {
				sprite.x = (sprite.children[0].x + sprite.children[sprite.children.length-1].x)/2;
			}
		}
		delete sprite.lastX;
		delete sprite.lastY;
		me.nodePositon.push({x: sprite.x, y: sprite.y});
		me.setNodePoint(sprite);
	},
	trueAdd: function(sprite, parent) {
		
		var me = this;
		var spriteEls = [];
		var x = sprite.x,
			y = sprite.y,
			text = me.wrapText(sprite.text) || '',
			fontSize = (text.indexOf('\n') != -1 ? 12 : 14),
			textSize = me.getTextSize(text, fontSize),
			width = me.nodeSize.width,
			height = me.nodeSize.height,
			bgColor = sprite.bgColor || '#00b7c3',
			color = sprite.color || 'white',
			textWidth = textSize.width,
			textHeight = textSize.height
			
		spriteEls.push({
	        type: 'rect',
	        fill: bgColor,
	        width: width,
	        height: height,
	        x: x,
	        y: y,
	        radius: 5
	   	}, {
	    	type: 'text',
	    	text: text,
	    	font: fontSize + 'px Arial',
	    	fill: color,
	    	x: x + width/2,
	    	y: y + height/2 - (text.indexOf('\n') != -1 ? 8 : 0),
	    	'text-anchor': 'middle'
	   	});
	   	if(parent) {
	   		spriteEls.push({
		   		type: 'path',
		   		path: me.getNodeLine(sprite, parent),
		   		stroke: '#00b9a1',
			    'stroke-width': 2
		   	});
	   	}
		
		if(sprite.children instanceof Array && sprite.children.length > 0) {
		 	Ext.Array.each(sprite.children, function(s) {
		 		me.trueAdd(s, sprite);
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
		Ext.Array.each(sprite, function(s) {
			var layout = s.el.dom.getBoundingClientRect();
			me.contentSize = {
				width: me.contentSize.width > (layout.x + layout.width) ? me.contentSize.width : (layout.x + layout.width),
				height: me.contentSize.height > (layout.y + layout.height) ? me.contentSize.height : (layout.y + layout.height)
			}
		});
	},
	/** 设置节点连线的起止点位置 **/
	setNodePoint: function(node) {
		var me = this;
		if(node.level <= me.horizontalDeep) {
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
	/**
	 * 为文字添加换行符(只支持换一行)
	 */
	wrapText: function(text) {
		var w = text.replace(/\s/g,'') || '';
		if(w.length > 5) {
			if(w.length > 10) {
				w = w.substring(0,5) + '\n' + w.substring(5,9) + '...'; 
			}else {
				w = w.substring(0,5) + '\n' + w.substring(5)
			}
		}
		return w;
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
		
		if(sprite.level <= me.horizontalDeep) {
			line += ' M'+px+','+py+' L'+px+','+(py+me.nodeGap)+' L'+sx+','+(sy-me.nodeGap)+' L'+sx+','+sy;
		}else {
			line += ' M'+px+','+py+' L'+px+','+sy+' L'+sx+','+sy;
		}
		return line;
	},
	/**
	 * 根据元素位置设置svg容器高宽以显示滚动条
	 */
	doLayout: function() {
		var draw = this,
			width = draw.el.dom.offsetWidth,
			height = draw.el.dom.offsetHeight,
			svgEl = draw.el.dom.getElementsByTagName('svg')[0];
		
		if(draw.contentSize.width > width) {
			draw.el.dom.style.overflowX = 'scroll';
			svgEl.style.width = draw.contentSize.width+10 + 'px';
		}
		if(draw.contentSize.height > height) {
			draw.el.dom.style.overflowY = 'scroll';
			svgEl.style.height = draw.contentSize.height+10 + 'px';
		}
	}
});
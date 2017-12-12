/** 重写该方法否则sprite的draggable=true属性会报错会报错
 *  即使如此，在给sprite定义draggable为true时仍需要在组件渲染之后定义(afterrender)
 */
Ext.dd.DragDropManager.startDrag = function() {
	if (Ext.versions.extjs.shortVersion == "421883") {
		// Ext.require('Ext.dd.DragDropManager');
		Ext.override(Ext.dd.DragDropManager, {
			startDrag: function(x, y) {
				var me = this,current = me.dragCurrent,dragEl;
				clearTimeout(me.clickTimeout);
				if (current) {
					current.b4StartDrag(x, y);
					current.startDrag(x, y);
					dragEl = current.getDragEl();
					//if (dragEl) {
					if (dragEl && dragEl.dom.className.replace) {
						// svg elements have no css classes -- http://www.sencha.com/forum/showthread.php?261339-lt-SVGAnimatedString-gt-has-no-method-replace
						Ext.fly(dragEl).addCls(me.dragCls);
					}
				}
				me.dragThreshMet = true;
			}
		});
	}
}

/**
 * 计算角度的正弦值
 * @param {} d
 * @return {}
 */
Math.sinx = function(d) {
	return Math.sin((d/180)*Math.PI);
}
/**
 * 计算角度的余弦值
 * @param {} d
 * @return {}
 */
Math.cosx = function(d) {
	return Math.cos((d/180)*Math.PI);
}
/**
 * 计算反正弦值(得到角度)
 * @param {} d
 * @return {}
 */
Math.asinx = function(n) {
	return 180*Math.asin(n)/Math.PI
}
/**
 * 计算反余弦值(得到角度)
 * @param {} d
 * @return {}
 */
Math.acosx = function(n) {
	return 180*Math.acos(n)/Math.PI
}
/**
 * 计算两点之间的距离
 * @param {} x1
 * @param {} y1
 * @param {} x2
 * @param {} y2
 * @return {}
 */
Math.lineLength = function(x1, y1, x2, y2) {
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}
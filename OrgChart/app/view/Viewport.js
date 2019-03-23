Ext.define('org.view.Viewport', {
	extend: 'Ext.Viewport',
	layout: 'border',
	initComponent : function(){ 
    	var me = this;
    	me.items = [{
			xtype: 'panel',
			region: 'center',
			layout: 'fit',
			id: 'drawpanel',
			items: {
	            xtype: 'basedraw',
	            id: 'draw'
	        },
			tbar: [{
				xtype: 'button',
				text: '添加/刷新',
				handler: function() {
					me.clear();
					me.createTextNode();
				}
			}, {
				xtype: 'button',
				text: '清除',
				handler: function() {
					me.clear();
				}
			}]
		}]
    	me.callParent(arguments); 
	},
	createTextNode: function() {
		var draw = Ext.getCmp('draw');
		var root = {
			level: 1,
			text: 'A1'
		}
		var deep = Math.floor(Math.random()*5 + 1); // 随机深度1~5
		var horizontalDeep = Math.floor(Math.random()*5 + 1); // 随机横向展示深度1~5
		var data = this.addRandomChildrn(root, deep);
		
		draw.horizontalDeep = horizontalDeep;

		// draw.add(orgData); // 一组示例数据
		draw.add(data); // 随机生成的数据
	},
	addRandomChildrn: function(parent, deep) {
		var count = Math.floor(Math.random()*5); // 随机子节点数量
		if(deep <= 0) {
			return;
		}
		var me = this;
		parent.children = [];
		me['deep'+deep] = me['deep'+deep] || 1;
		
		for(var i = 0; i < count; i ++) {
			var chil = {
				level: parent.level + 1,
				text: me.number2Letter(parent.level + 1) + me['deep'+deep]
				// text: 'ABCDEFGHIJKLMN'.substring(0, Math.floor(Math.random()*20))
			}
			me['deep'+deep] ++;
			me.addRandomChildrn(chil, deep-1);
			parent.children.push(chil);
		}
		return parent;
	},
	/**
	 * 数字转为字母
	 */
	number2Letter: function(num) {
		if(num > 26) {
			num = num - 26;
		}
		return String.fromCharCode(64 + num);
	},

	clear: function() {
		var me = this;
		var draw = Ext.getCmp('draw');
		draw.removeAll();
		for(var i = 1; me['deep'+i]; i++) {
			delete me['deep'+i];
		}
	}
});
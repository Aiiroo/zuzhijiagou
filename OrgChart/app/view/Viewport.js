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
				text: '添加',
				handler: function() {
					var draw = Ext.getCmp('draw');
					draw.removeAll();
					for(var i = 1; me['deep'+i]; i++) {
						delete me['deep'+i];
					}
					me.createTextNode();
				}
			}, {
				xtype: 'button',
				text: '清除',
				handler: function() {
					var draw = Ext.getCmp('draw');
					draw.removeAll();
					for(var i = 1; me['deep'+i]; i++) {
						delete me['deep'+i];
					}
				}
			}]
		}]
    	me.callParent(arguments); 
	},
	createTextNode: function(sprite) {
		var draw = Ext.getCmp('draw');
		var root = {
			level: 1,
			text: 'A1'
		}
		var deep = Math.floor(Math.random()*5 + 3); // 随机深度
		this.addRandomChildrn(root, deep);
		
		draw.add(orgData);
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
//				text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'.substring(0, Math.floor(Math.random()*20))
			}
			me['deep'+deep] ++;
			me.addRandomChildrn(chil, deep-1);
			parent.children.push(chil);
		}
	},
	/**
	 * 数字转为字母
	 */
	number2Letter: function(num) {
		if(num > 26) {
			num = num - 26;
		}
		return String.fromCharCode(64 + num);
	}
});
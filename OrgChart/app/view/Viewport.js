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
		var s1 = {
			level: 1,
			text: 'A1',
			children: [{
				level: 2,
				text: 'B1',
				children: [{
					level: 3,
					text: 'C1',
					children: [{
						level: 4,
						text: 'D1'
					}, {
						level: 4,
						text: 'D2'
					}]
				}, {
					level: 3,
					text: 'C2',
					children: [{
						level: 4,
						text: 'D3',
						children: [{
							level: 5,
							text: 'E1'
						}]
					}]
				}, {
					level: 3,
					text: 'C3',
					children: [{
						level: 4,
						text: 'D4'
					}]
				}]
			}, {
				level: 2,
				text: 'B2',
				children: [{
					level: 3,
					text: 'C4',
					children: [{
						level: 4,
						text: 'D5',
						children: [{
							level: 5,
							text: 'E2'
						}]
					}, {
						level: 5,
						text: 'F1'
					}]
				}, {
					level: 3,
					text: 'C5',
					children: [{
						level: 4,
						text: 'D6',
						children: [{
							level: 5,
							text: 'E3'
						}, {
							level: 5,
							text: 'E4'
						}]
					}, {
						level: 4,
						text: 'D7'
					}]
				}]
			}, {
				level: 2,
				text: 'B3'
			}]
		};
		var ss = {
			level: 1,
			text: 'A',
			children: [{
				level: 2,
				text: 'B'
			}, {
				level: 2,
				text: 'C'
			}]
		}
		
		var root = {
			level: 1,
			text: 'A1'
		}
		var deep = Math.floor(Math.random()*5 + 1); // 随机深度
		this.addRandomChildrn(root, deep);
		draw.add(root);
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
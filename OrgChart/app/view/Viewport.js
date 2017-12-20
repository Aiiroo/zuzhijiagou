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
<<<<<<< HEAD
=======
		/*var s1 = {
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
		
>>>>>>> f70e3a6b4278baa6116a5850ffbe742c35eeed4b
		var root = {
			level: 1,
			text: 'A1'
		}
<<<<<<< HEAD
		var deep = Math.floor(Math.random()*5 + 3); // 随机深度
		this.addRandomChildrn(root, deep);
		
		draw.add(orgData);
=======
		var deep = Math.floor(Math.random()*5 + 1); // 随机深度
		this.addRandomChildrn(root, deep);*/
		var s = {"tree":[{"id":1020856,"text":"董事会","parentId":0,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020857,"text":"总经办","parentId":1020856,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020858,"text":"产品中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020859,"text":"产品规划部","parentId":1020858,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020860,"text":"项目部","parentId":1020858,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020861,"text":"测试部","parentId":1020858,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020862,"text":"研发中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020863,"text":"技术部","parentId":1020862,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020864,"text":"硬件部","parentId":1020862,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020865,"text":"软件部","parentId":1020862,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020866,"text":"平台部","parentId":1020862,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020867,"text":"营销中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020868,"text":"国内销售部","parentId":1020867,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020869,"text":"国内销售部","parentId":1020868,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020870,"text":"国内销售部","parentId":1020868,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020871,"text":"海外销售部","parentId":1020867,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020872,"text":"运营中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020873,"text":"PMC部","parentId":1020872,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020874,"text":"PMC部","parentId":1020873,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020875,"text":"PMC部","parentId":1020873,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020876,"text":"PMC部","parentId":1020873,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020877,"text":"采购部","parentId":1020872,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020878,"text":"采购部","parentId":1020877,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020879,"text":"投资部","parentId":1020877,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020880,"text":"采购部","parentId":1020877,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020881,"text":"质量中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020882,"text":"IQC部","parentId":1020881,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020883,"text":"IPQC部","parentId":1020881,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020884,"text":"OQC部","parentId":1020881,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020885,"text":"制造中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020886,"text":"SMT部","parentId":1020885,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020887,"text":"组装部","parentId":1020885,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020888,"text":"包装部","parentId":1020885,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020889,"text":"人资中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020890,"text":"人力资源部","parentId":1020889,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false},{"id":1020891,"text":"行政部","parentId":1020889,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false},{"id":1020892,"text":"财务中心","parentId":1020857,"url":"","qtitle":"","leaf":false,"allowDrag":false,"qtip":"","cls":"","iconCls":"","children":[{"id":1020893,"text":"财务部","parentId":1020892,"url":"","qtitle":"","leaf":false,"allowDrag":true,"qtip":"","cls":"","iconCls":"","children":[],"using":false,"checked":false}],"using":false,"checked":false}],"using":false,"checked":false}],"using":false,"checked":false}]};
        draw.add(s.tree[0]);
>>>>>>> f70e3a6b4278baa6116a5850ffbe742c35eeed4b
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
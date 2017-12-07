Ext.define('org.view.Viewport', {
	extend: 'Ext.window.Window',
	alias: 'widget.benchFlowChart',
	id : 'benchflowchart',
	title: '<font color=#CD6839>业务流程图</font>',
	iconCls: 'x-button-icon-set',
	height: '85%',
	width: 800,
	modal: true,
    maximizable : true,
	layout: 'border',
	initComponent: function() {
		var me = this;
		Ext.apply(me,{
			items: [{
				xtype: 'panel',
				region: 'center',
				layout: 'fit',
				items: {
		            xtype: 'flowChart',
		            id: 'chartpanel',
		            items: []
		        }
			}]
		});
		me.callParent(arguments);
		me.show();
	},
	listeners: {
		afterrender: function() {
			var me = this;
			me.getFlowChartConfig();
		}
	},
	getFlowChartConfig: function() {
		var me = this;
		me.createFlowChart(sprites);
	},
	createFlowChart: function(sprites) {
		var draw = Ext.getCmp('chartpanel');
		var s = [
			{type:'node',x:30,y: 30,width:80,height:30,text:'询价单',fontSize:14,bgColor:'#2fc2b0', items: '[{url:"1321"}]'},
			{type:'line',x:110,y:45,x2:160,y2:45,a2:0.7},
			{type:'node',x: 160,y: 30,width: 80,height: 30,text:'核价单',fontSize: 14,bgColor: '#cfdff6',items:'{url:"x"}'},
			{type:'line',x:240,y:45,x2:265,y2:45},
			{type:'line',x:265,y:45,x2:265,y2:135},
			{type:'node',x:160,y:120,width:80,height:30,text:'请购',fontSize:14,bgColor:'#cfdff6'},
			{type:'line',x:240,y:135,x2:265,y2:135},
			{type:'line',x:265,y:90,x2:290,y2:90,a2:0.7},
			{type:'node',x: 290,y:75,width: 80,height: 30,text: '采购',fontSize: 14,bgColor: '#cfdff6',items:'[{text:"采购单",url:"111"},{text:"采购变更",url:"222"}]'},
			{type:'line',x:330,y:105,x2:330,y2:165,a2:0.7},
			{type:'node',x: 290,y:165,width: 80,height: 30,text: '收料通知单',fontSize: 14,bgColor: '#cfdff6'},
			{type:'line',x:370,y:180,x2:420,y2:180,a2:0.7},
			{type:'node',x: 420,y:165,width: 80,height: 30,text: '收料单',fontSize: 14,bgColor: '#cfdff6'},
			{type:'line',x:500,y:180,x2:550,y2:180,a2:0.7},
			{type:'node',x: 550,y:165,width: 80,height: 30,text: '检验单',fontSize: 14,bgColor: '#cfdff6'},
			{type:'line',x:590,y:195,x2:590,y2:255,a2:0.7},
			{type:'node',x: 550,y:255,width: 80,height: 30,text: '采购验收单',fontSize: 14,bgColor: '#cfdff6'},
			{type:'line',x:550,y:270,x2:500,y2:270,a2:0.7},
			{type:'node',x: 420,y:255,width: 80,height: 30,text: '付款单',fontSize: 14,bgColor: '#cfdff6'},
		];
		draw.add(s);
	}
});
Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.Loader.setConfig({
		enabled:true
	});

	Ext.application({
		name : 'org',
		appFolder : "app",
		launch:function(){
	        Ext.create('org.view.Viewport');
		},
		controllers:[
			'Org'
		]
	});
})

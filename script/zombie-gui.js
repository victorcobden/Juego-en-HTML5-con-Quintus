Quintus.ZombiesGUI = function(Q){
  Q.UI.Container.extend("SidePanel",{
    init: function(p){
      this._super(Q._defaults(p,{
        fill: '#E1DEB7',
        x: 120/2,
        y: 720/2,
        raidus: 0,
        border: 0,
        shadow: 0,
        w: 120,
        h: 720,
      }));
      this.on("inserted");
      Q.state.on("change.sun",function(){
        Q('SidePanel',0).items[0].refreshStats();
      });
    },
    inserted: function(){
      var sun = new Q.Sprite({
        asset: "sun.png",
        x: 60,
        y: 40
      });
      this.stage.insert(sun);
      this.totalSun = new Q.UI.Text({
        x: 60,
        y: 80,
        label: "100"
      });
      this.stage.insert(this.totalSun);
      this.refreshStats();
      var x = 40, y = 180, plantObject;
      Q._each(this.p.plantTypes, function(element, index, list){
        plantObject = Q.plantTypes[element];
        this.stage.insert(new Q.PlantButton({x:x, y:y, asset: plantObject.asset, plant: plantObject}));
        this.stage.insert(new Q.UI.Text({x:x+40,y:y, label: plantObject.cost+''}));
        y += 90;
      }, this);
    },
    refreshStats: function(){
      this.totalSun.p.label = Q.state.get("sun") + "";
    }
  });
  Q.UI.Button.extend("PlantButton",{
    init: function (p){
      this._super(Q._defaults(p,{
        scale: 0.6
      }), function(){
        this.p.opacity = 0.5;
        Q.state.set("currentPlant",this.p.plant);
      })
    }
  });
};

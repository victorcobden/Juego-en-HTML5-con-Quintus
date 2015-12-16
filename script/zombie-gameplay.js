Quintus.ZombiesGameplay = function(Q){
  Q.Sprite.extend('Level',{
    init: function(p){
      this._super(p,{
        asset: 'background.png',
        type:Q.SPRITE_GROUND,
        x:120 + 960/2,
        y:720/2,
        w: 960,
        h: 720,
        sunFrecuency: {min: 1, max: 5}
      });
      this.timeNextSun = this.getTimeNextSun();

      //level Data
      this.zombieIndex = 0;
      this.numZombies = this.p.levelData.zombies.length;
      this.levelTime = 0;

      this.on('touch');
    },
    step: function(dt){
      this.levelTime += dt;

      if(this.levelTime >= this.p.levelData.duration){
        console.log('LEVEL COMPLETED!');
      }

      //creacion de los zombies
      if(this.zombieIndex < this.numZombies){
        var currentZombie = this.p.levelData.zombies[this.zombieIndex];
        if(this.levelTime >= currentZombie.time){
          var zombieData = Q.zombieTypes[currentZombie.type];
          var newZombie = new Q.Zombie(
            Q._extend(zombieData, {y: currentZombie.row * 120 + 60})
          );
          this.stage.insert(newZombie);
          this.zombieIndex++;
        }

      }

      this.timeNextSun -= dt;
      if(this.timeNextSun <= 0){
        this.timeNextSun = this.getTimeNextSun();
        Q.stage(1).insert(new Q.Sun());
      }
    },
    touch: function(touch){
      console.log('You touched the ground');
    },
    getTimeNextSun: function(){
      return this.p.sunFrecuency.min + Math.random()*(this.p.sunFrecuency.max-this.p.sunFrecuency.min);
    }
  });
}

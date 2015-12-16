Quintus.ZombiePlants = function(Q){
  Q.Sprite.extend("Sun", {
    init: function(p){
      this._super(p,{
        asset: "sun.png",
        type: Q.SPRITE_SUN,
        y: -120,
        x: 300 + Math.random()*(1080-360),
        vy: 80,
        finalY: 60 + Math.random()*(720-60),
        expirationTime: 3
      });
      this.add("2d");
      this.on("touch");
    },
    touch: function(touch){
      console.log("Touching sun");
      Q.state.inc("sun",25);
      this.destroy();
    },
    step: function(dt){
      if(this.p.y >= this.p.finalY){
        this.p.vy = 0;

        this.p.expirationTime -= dt;

        if(this.p.expirationTime <= 0){
          this.destroy();
        }
      }
    }
  });
  Q.plantTypes = {
    carnivorous: {
      asset: "carnivorousplant.png",
      cost: 100,
      energy: 10,
      isShooter: true,
      shootingFrecuency: 3,
      damage: 5,
    },
    corn: {
      asset: "corn.png",
      cost: 150,
      energy: 20,
      isShooter: true,
      shootingFrecuency: 3,
      damage: 2,
    },
    chili: {
      asset: "chilli.png",
      cost: 200,
      energy: 10,
      isExploding: true,
      damage: 50,
    },
    sunflower: {
      asset: "sunflower.png",
      cost: 75,
      energy: 15,
      isSunProducer: true,
      sunFrecuency: 5,
    },
  };
  Q.Sprite.extend('Plant',{
    init: function(p){
      this._super(p,{
        type: Q.SPRITE_PLANT,
      });
      this.add('2d');

      if(this.p.isShooter){
        this.p.timeToShoot = this.p.shootingFrecuency;
      }
      if(this.p.isSunProducer){
        this.p.timeToSun = this.p.sunFrecuency;
      }
    },
    step: function(dt){
      if(this.p.isShooter){
        this.p.timeToShoot -= dt;

        if(this.p.timeToShoot <= 0 ){
          this.p.timeToShoot = this.p.shootingFrecuency;

          this.stage.insert(new Q.Bullet({
            x: this.p.x,
            y: this.p.y,
            damage: this.p.damage,
          }));
        }
      }
      if(this.p.isSunProducer){
        this.p.timeToSun -= dt;

        if(this.p.timeToSun <= 0){
          this.p.timeToSun = this.p.sunFrecuency;

          Q.stage(1).insert(new Q.Sun({
            x: this.p.x - 50 + 100*Math.random(),
            y: this.p.y,
            vy: 0,
            finalY: this.p.y
          }));
        }
      }
      if(this.p.energy <= 0){
        this.destroy();
      }
    },
    takeDamage: function(damage){
      this.p.energy -= damage/50;
      console.log(this.p.energy);
    }
  });
  Q.Sprite.extend('Bullet',{
    init: function(p){
      this._super(p,{
        type: Q.SPRITE_BULLET,
        asset: 'bullet.png',
        vx: 300
      });
      this.add('2d');
    },
    step: function(dt){
      if(this.p.x >= 1110){
        this.destroy();
      }
    }
  });
};

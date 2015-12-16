Quintus.ZombiesEnemy = function(Q){
  //Tipos de zombie
  Q.zombieTypes = {
    basic: {
      asset: 'zombie1.png', //image
      vx:-20, //speed
      damage: 1,
      energy: 8
    },
    skelleton: {
      asset: 'zombie2.png',
      vx:-20,
      damage: 4,
      energy: 10
    },
    chicken: {
      asset: 'chicken.png',
      vx: -20,
      damage: 0.5,
      energy: 6
    },
    hatzombie: {
      asset: 'zombie3.png',
      vx: -30,
      damage: 2,
      energy: 20
    },
  };

  //Clase zombie
  Q.Sprite.extend("Zombie",{
    init: function(p){
      this._super(p, {
        type: Q.SPRITE_ZOMBIE,
        collisionMask: Q.SPRITE_BULLET | Q.SPRITE_PLANT,
        x: 1080+60,
      });
      this.p.originalVx=this.p.vx;
      this.add("2d");
      this.on("bump.left", function(collision){
        if(collision.obj.isA("Plant")){
          if(collision.obj.p.isExploding){
            this.p.energy -= collision.obj.p.damage;
            collision.obj.destroy();
          }
          else{
            collision.obj.takeDamage(this.p.damage);
          }
        }
        else if(collision.obj.isA('Bullet')){
          this.p.energy -= collision.obj.p.damage;
          collision.obj.destroy();
        }
        this.p.vx = this.p.originalVx;
      });
    },
    step: function(dt){
      if(this.p.x <= 240){
        this.destroy();
        console.log("The zombies ate your brain!");
        //Reiniciar
        Q.stageScene('level', {levelData: Q('Level').first().p.levelData});
      }
      if(this.p.energy <= 0){
        this.destroy();
      }
    }
  });
};

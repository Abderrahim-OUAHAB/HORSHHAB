import { Projectile } from "./projectile.js";
export class Player{
    constructor(game){
        this.game=game;
        this.width=120;
        this.height=190;
        this.x=20;
        this.y=100;
        this.frameX=0;
        this.frameY=0;//min ywta bach ytiri khas twli 1
        this.maxframe=37;
        this.speedY=0;
        this.maxSpeed=2;
        this.projectiles=[];
        this.image=player;
        this.powerUp=false;
        this.powerUpTimer=0;
        this.powerUpLimit=10000;
    }

    update(deltatime){
        if(this.game.keys.includes("ArrowUp")) this.speedY=-this.maxSpeed;
        else if (this.game.keys.includes("ArrowDown")) this.speedY=this.maxSpeed;
        else this.speedY=0;
        this.y+=this.speedY;
        //bondouries

        if(this.y>this.game.height-this.height*0.5) this.y=this.game.height-this.height*0.5;
        else if(this.y<-this.height*0.5) this.y=-this.height*0.5;
        //handle projectiles
        this.projectiles.forEach(projectile=>{
            projectile.update();
        });
        this.projectiles=this.projectiles.filter(projectile=> !projectile.markDelete);

        //sprite animation

        if(this.frameX < this.maxframe){
            this.frameX++;
        }else{
            this.frameX=0;
        }

        //power up

        if(this.powerUp){
            if(this.powerUpTimer> this.powerUpLimit){
                this.powerUpTimer=0;
                this.powerUp=false;
                this.frameY=0;
            }else{
                this.powerUpTimer+=deltatime;
                this.frameY=1;
                this.game.amo+=0.1;
            }
        }

    }


    draw(ctx){
       
        if(this.game.dbug) ctx.strokeRect(this.x,this.y,this.width,this.height);
           //handle projectiles
           this.projectiles.forEach(projectile=>{
            projectile.draw(ctx);
        });
        ctx.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
      
    }

    shootTop(){
        if(this.game.amo>0){
            this.projectiles.push(new Projectile(this.game,this.x+80,this.y+30));
            this.game.amo--;

        }
        if(this.powerUp) this.shootBottom();
    }

        shootBottom(){
            if(this.game.amo>0){
                this.projectiles.push(new Projectile(this.game,this.x+80,this.y+175));

            }
        }
    enterpowerUp(){
        this.powerUpTimer=0;
        this.powerUp=true;
        if(this.game.amo<this.game.maxAmo)this.game.amo=this.game.maxAmo;
    }
}
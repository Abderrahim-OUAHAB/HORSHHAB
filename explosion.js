class Explosion{
    constructor(game,x,y){
        this.game=game;
        this.x=x;
        this.y=y;
        this.frameX=0;
        this.spriteHeight=200;
        this.spriteWidth=200;
        this.fps=25;
        this.timer=0;
        this.interval=1000/this.fps;
        this.markDelete=false;
        this.maxFrame=8;
        this.width=this.spriteWidth;
        this.height=this.spriteHeight;
        this.x=x-this.width*0.5;
        this.y=y-this.height*0.5;
        
    }

    update(deltatime){
        this.x-=this.game.speed;
        if(this.timer> this.interval){
            this.frameX++;
            this.timer=0;
        }else{
            this.timer+=deltatime;
        }

      
        if(this.frameX>this.maxFrame) this.markDelete=true;
    }

    draw(ctx){
        ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

export class smokeExplosion extends Explosion{
    constructor(game,x,y){
        super(game,x,y);
        this.image=smoke;

    }
}
export class FireExplosion extends Explosion{
    constructor(game,x,y){
        super(game,x,y);
        this.image=fire;
    }
}
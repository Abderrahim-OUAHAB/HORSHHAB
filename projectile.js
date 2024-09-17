export class Projectile{
    constructor(game,x,y){
        this.game=game;
        this.x=x;
        this.y=y;
        this.width=10;
        this.height=3;
        this.speed=3;
        this.markDelete=false;
        this.image=proj;
        
    }

    update(){
        this.x+=this.speed;
        if(this.x>this.game.width*0.8) this.markDelete=true;
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y)
        // ctx.fillStyle="yellow";
        // ctx.fillRect(this.x,this.y,this.width,this.height);

    }
}
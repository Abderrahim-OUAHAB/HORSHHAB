class Layer{
    constructor(game,image,speedModifier){
        this.game=game;
        this.image=image;
        this.speedModifier=speedModifier;
        this.width=1768;
        this.height=500;
        this.x=0;
        this.y=0;
        
    }

    update(){
        if(this.x<=-this.width) this.x=0;
        else this.x-=this.game.speed*this.speedModifier;
    }
    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y);
        ctx.drawImage(this.image,this.x+this.width,this.y);
    }
}

export class Background{
    constructor(game){
        this.game=game;
        this.img1=layer1;
        this.layer1=new Layer(this.game,this.img1,0.2);
        this.img2=layer2;
        this.layer2=new Layer(this.game,this.img2,0.4);
        this.img3=layer3;
        this.layer3=new Layer(this.game,this.img3,1);
        this.img4=layer4;
        this.layer4=new Layer(this.game,this.img4,1.5);
        this.layers=[this.layer1,this.layer2,this.layer3];
        
    }
    update(){
        this.layers.forEach(layer=>{
            layer.update();
        })
    }

    draw(ctx){
        this.layers.forEach(layer=>{
            layer.draw(ctx);
        })
    }
}
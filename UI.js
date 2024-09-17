export class UI{
    constructor(game){
        this.game=game;
        this.fontSize=25;
        this.fontFamily='Bangers';
        this.color='white';
        this.livesImage=live;
        this.liveImageWidth = 20;  
        this.liveImageHeight = 30;
        
    }
    draw(ctx){
        ctx.save();
        ctx.fillStyle=this.color;
        ctx.shadowOffsetX=2;
        ctx.shadowOffsetY=2;
        ctx.shadowColor="black";
        ctx.font=this.fontSize+'px '+this.fontFamily;
        //score
        ctx.fillText('Score: '+this.game.score,20,40);
     //lives
     for(let i=0;i<this.game.lives;i++){
        ctx.drawImage(this.livesImage, 290 + (this.liveImageWidth + 10) * i, 13, this.liveImageWidth, this.liveImageHeight);        
    }
        //timer
        const formattedTime=(this.game.timeLimit*0.001).toFixed(0);
        if(formattedTime<=10) ctx.fillStyle='red'
        ctx.fillText('Timer: '+formattedTime,150,40);

        //game over msg
        if(this.game.gameOver){
            ctx.textAlign='center';
            let msg1;
            let msg2;
            if(this.game.score> this.game.winningScore){
                msg1="YOU WIN !";
                msg2="WELL DONE !";
            }else{
                msg1="YOU LOSE !";
                msg2="TRY AGAIN !";
            }

            ctx.font='70px '+this.fontFamily;
            ctx.fillText(msg1,this.game.width*0.5,this.game.height*0.5-20);
            ctx.font='25px '+this.fontFamily;
            ctx.fillText(msg2,this.game.width*0.5,this.game.height*0.5+40);
        }
           //amo
           if(this.game.player.powerUp) ctx.fillStyle="#ffffbd"
           for(let i=0;i<this.game.amo;i++){
               ctx.fillRect(20+5*i,50,3,20);
           }
        ctx.restore();
    }
}

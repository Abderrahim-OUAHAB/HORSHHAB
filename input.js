export class InputHandler{
    constructor(game){
        this.game=game;
        window.addEventListener("keydown",event=>{
            if((event.key==="ArrowUp" || event.key==="ArrowDown")
                 && 
                this.game.keys.indexOf(event.key)===-1){
                        this.game.keys.push(event.key);
            }else if(event.key===' ' || event.key==="Enter"){
                this.game.player.shootTop();
            }else if(event.key==='d') {
                this.game.dbug=!this.game.dbug;
            }
        });

        window.addEventListener("keyup",event=>{
            if(this.game.keys.indexOf(event.key)>-1){

                this.game.keys.splice(this.game.keys.indexOf(event.key),1);
            }
        });
        
    }
}
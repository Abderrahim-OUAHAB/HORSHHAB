import { InputHandler } from "./input.js";
import { Particle } from "./particle.js";
import { Player } from "./player.js";
import { Angler1,Angler2,Hive,LuckFish,Drone } from "./enemy.js";
import { Background } from "./Layer.js";
import { FireExplosion,smokeExplosion } from "./explosion.js";
import { UI } from "./UI.js";

window.addEventListener('DOMContentLoaded',function(){

const canvas=document.getElementById('canvas1');
const ctx =canvas.getContext('2d');
canvas.width=1768;
canvas.height=500;

class Game{
    constructor(width,height){
        this.width=width;
        this.height=height;
        this.background=new Background(this);
        this.player=new Player(this);
        this.input=new InputHandler(this);
        this.keys=[];
        this.enemies=[];
        this.particles=[];
        this.explosions=[];
        this.amo=20;
        this.maxAmo=50;
        this.amoTimer=0;
        this.amoInterval=350;
        this.enemyTimer=0;
        this.enemyInterval=1500;
        this.ui=new UI(this);
        this.gameOver=false;
        this.score=0;
        this.winningScore=50;
        this.gameTime=0;
        this.timeLimit=30000;
        this.speed=1;
        this.dbug=false;
        this.rachargeTime=10000;
        this.rachargeWininigScore=50;
        this.lives=3;
        this.maxLives=5;
      
        
    }
    update(deltatime){
        //background
        this.background.update();
        this.background.layer4.update();
        //gameover
        if( this.score>=this.winningScore){
             this.timeLimit+=this.rachargeTime;     
            this.winningScore+=this.rachargeWininigScore;
            this.enemyInterval-=100;
            this.speed+=0.2;
            }

        if(!this.gameOver) this.timeLimit-=deltatime;
        const formattedTime=(this.timeLimit*0.001).toFixed(0);
        if(formattedTime<=0 || this.lives<=0){ this.gameOver=true;

        }

        //player
        this.player.update(deltatime);
        //amo
        if(this.amoTimer>this.amoInterval){
            if(this.amo<this.maxAmo && !this.gameOver) this.amo++;
            this.amoTimer=0;
        }else{
            this.amoTimer+=deltatime;
        }
        //particles
        this.particles.forEach(part=>{
            part.update();
        })
        this.particles=this.particles.filter(part=> !part.markDelete);
        //explosions
        this.explosions.forEach(part=>{
            part.update(deltatime);
        })
        this.explosions=this.explosions.filter(part=> !part.markDelete);
        //enemies
        this.enemies.forEach(enemy=>{
           
            enemy.update();
            if(this.chechCollision(this.player,enemy)){
                enemy.markDelete=true;
                this.addExplosion(enemy);
                for(let i=0;i<enemy.score;i++){
                    this.particles.push(new Particle(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));
                }
                this.lives--;
                if(!this.gameOver) this.score--;
            }
            this.player.projectiles.forEach(proj=>{
                if(this.chechCollision(proj,enemy)){
                    enemy.lives--;
                    proj.markDelete=true;
                    this.particles.push(new Particle(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));       
                    if(enemy.lives<=0){
                        if(enemy.type==='lucky'){
                            if(this.lives<this.maxLives) this.lives++;
                            if(!this.gameOver)this.player.enterpowerUp();

                        }
                        for(let i=0;i<enemy.score;i++){
                            this.particles.push(new Particle(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));
                        }
                        enemy.markDelete=true;
                        this.addExplosion(enemy);
                        if(enemy.type==='hive'){
                             for(let i=0;i<5;i++){
                            this.enemies.push(new Drone(this,enemy.x+Math.random()*enemy.width,enemy.y+Math.random()*enemy.height*0.5));
                        }
                        }
                        if(!this.gameOver)this.score+=enemy.score;
                       // if(this.score>this.winningScore) this.gameOver=true;
                    }

                }
            })

        });
        this.enemies=this.enemies.filter(enemy=> !enemy.markDelete);

        if(this.enemyTimer > this.enemyInterval && !this.gameOver){
            this.addEnemy();
            this.enemyTimer=0;
        }else{
            this.enemyTimer+=deltatime;
        }
    }

    draw(ctx){
        this.background.draw(ctx);
        this.ui.draw(ctx);
        this.player.draw(ctx);
        this.particles.forEach(part=>{
            part.draw(ctx);
        });
        this.enemies.forEach(enemy=>{
            enemy.draw(ctx);
        });
        this.explosions.forEach(exp=>{
            exp.draw(ctx);
        });
        this.background.layer4.draw(ctx);
    }
    addEnemy(){
        const randomize=Math.random();
        if(randomize<0.3) this.enemies.push(new Angler1(this));
        else if(randomize <0.6)this.enemies.push(new Angler2(this));
        else if(randomize <0.7)this.enemies.push(new Hive(this));
        const formattedTime=(this.timeLimit*0.001).toFixed(0);
        if(formattedTime%15===0 && !this.player.powerUp ) this.enemies.push(new LuckFish(this));
    }

    addExplosion(enemy){
        const randomize=Math.random();
        if(randomize<0.5) {
            this.explosions.push(new smokeExplosion(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));
        }else{
            this.explosions.push(new FireExplosion(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));

        }
   
    }

    chechCollision(rect1,rect2){
        return (
            rect1.x<rect2.x+rect2.width &&
            rect1.x+rect1.width>rect2.x &&
            rect1.y<rect2.y+rect2.height &&
            rect1.height+rect1.y>rect2.y
        )
    }
}

//GAME LOOP
const game=new Game(canvas.width,canvas.height);
let lasttime=0;
function animate(timestamp){

    const deltatime=timestamp-lasttime;
    lasttime=timestamp;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    game.draw(ctx);
    game.update(deltatime);
    requestAnimationFrame(animate);

}

animate(0);

});
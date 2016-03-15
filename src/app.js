var BK = 1;
var PL = 2;
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var Boomb = cc.Sprite.extend({
    ctor: function(y){
        this._super(res.bomba_png);
        this.scheduleUpdate();
        this.attr({
            y: y
        });
        return true;
    },
    update: function(dt) {
        this.onUpdate();
        this.runAction(cc.moveBy(0.5, cc.p(0, -10)));
        if(this.y <= 0)
            this.removeFromParent(true);
    },
});

var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    ctor:function () {
        this._super();
        var self = this;
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0, BK);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1, PL);

          //add a keyboard event listener to statusLabel
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                if(self.ended)return;
                var mov = 8;
                var s = .5;
                if(keyCode === 39){
                    var action = cc.moveBy(s, cc.p(mov, 0));
                    self.sprConejo.runAction(action);
                }
                if(keyCode === 37){
                    var action = cc.moveBy(s, cc.p(-mov, 0));
                    self.sprConejo.runAction(action);
                }
            }
        }, this); 
        
        this.schedule(this.fallingObjs, 1);
        
        return true;
    },
    fallingObjs: function() {
        var self = this;
        var boomb = new Boomb(this.sprFondo.height);
        var min = this.sprFondo.x - this.sprFondo.width/2 + boomb.width/2;
        var max = this.sprFondo.x + this.sprFondo.width/2 - boomb.width/2;
        boomb.onUpdate = function(){
            if(cc.rectIntersectsRect(this.getBoundingBoxToWorld(), self.sprConejo.getBoundingBoxToWorld())){
                 self.showGameOver();
            }
        };
        boomb.x = getRandomArbitrary(min, max);
        if(this.ended)
            return;
        this.addChild(boomb, 1);
    },
    showGameOver: function(){
        cc.audioEngine.playEffect(res.gameover_mp3);
        cc.audioEngine.stopMusic();
        this.ended = true;
        this.unscheduleAllCallbacks();
        this.getChildren().forEach(function(c){
            if(c.getTag() === BK || c.getTag() === PL) return;
            c.unscheduleAllCallbacks();
        });
        var gm = new cc.Sprite(res.gameover_png);
        gm.attr({
            x: this.sprFondo.x,
            y: this.sprFondo.y,
            scale: 0.2
        });
        this.addChild(gm, 2);
    },
    ended: false,
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        cc.audioEngine.playMusic(res.main_mp3, true);
        this.addChild(layer);
    }
});
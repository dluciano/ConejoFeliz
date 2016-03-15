
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
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);

          //add a keyboard event listener to statusLabel
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
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
            },
            onKeyReleased: function(keyCode, event){
                
            }
        }, this); 
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


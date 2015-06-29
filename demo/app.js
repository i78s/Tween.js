(function(){
    var target = navigator.userAgent.indexOf('WebKit') < 0 ? document.documentElement : document.body;
    var tween;

    var $pageTop = document.getElementById('pageTop');
    $pageTop.addEventListener('click',function(e){
        e.preventDefault();
        if(tween){
            return;
        }

        tween = new Tween({
            scrollTop: target.scrollTop
        },{
            scrollTop: 0
        },{
            duration: 200,
            easing: 'linear',
            step: function(val){
                target.scrollTop = val.scrollTop;
            },
            complete: function(){
                tween = null;
            }
        });
    });

    var offset = document.querySelector('.nav-wrapper').clientHeight;
    var pool = {};
    var $menu = document.querySelectorAll('.menu');
    Array.prototype.forEach.call($menu,function(el){
        el.addEventListener('click',function(e){
            e.preventDefault();
            if(tween){
                return;
            }

            var hash = this.hash;
            if(!pool[hash]){
                pool[hash] = document.querySelector(hash).offsetTop;
            }

            tween = new Tween({
                scrollTop: target.scrollTop
            },{
                scrollTop: pool[hash] - offset
            },{
                duration: 200,
                easing: 'linear',
                step: function(val){
                    target.scrollTop = val.scrollTop;
                },
                complete: function(){
                    target.scrollTop = pool[hash] - offset;
                    tween = null;
                }
            });
        })
    })
})();
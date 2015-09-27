describe('Tween', () => {
    let Tween = require('../src/Tween.js');

    it('initialize', () => {
        let tween = new Tween({
            scrollTop: 0
        }, {
            scrollTop: 500
        });

        assert(tween.start.scrollTop === 0);
        assert(tween.end.scrollTop === 500);
        assert(tween.timer === null);
        assert(tween.isPlaying === false);
    });

    it('update', (done) => {
        let top = 0;
        let tween = new Tween({
            scrollTop: 0
        }, {
            scrollTop: 500
        }, {
            duration: 1000,
            step: (val) => {
                top = val.scrollTop;
            }
        });

        tween.play();
        setTimeout(() => {
            console.log(top);   // todo
            done();
        },500);
    });

    it('_extend', () => {
        let option = {
            duration: 400,
            easing: 'easeInOutBounce',
            step: (val) => {
                console.log(val);
            },
            complete: () => {
                console.log('complete');
            }
        };
        let tween = new Tween(0,500,option);

        assert(tween.setting.duration === option.duration);
        assert(tween.setting.easing === option.easing);
        assert(tween.setting.step === option.step);
        assert(tween.setting.complete === option.complete);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // 'use strict';

    let canvas = document.querySelector('#canvas');
    canvas.width = 1000;
    canvas.height = 550;
    
    let gamers = {
        'g1' : {
            name:'Jugador1',
            color: 'red'
        },
        'g2' : {
            name:'jugador2',
            color: 'green'
        }
    };

    let game = new Game(gamers, canvas);

    let winnerWindow = document.querySelector('.overlay');
    let btnClose = document.querySelector('.close');
    let text = document.querySelector('.winner-text');
    let btnReset = document.querySelector('.playnow');
    
    function showWinner(winner) {
        // TODO
        let txt = `¡Ganó ${winner.name}!`;

        text.innerHTML = txt;
        text.style.cssText = `box-shadow: 0px 0px 5px 7px ${winner.color};`;
        
        winnerWindow.classList.add('active')
    }

    btnClose.addEventListener('click', () =>  winnerWindow.classList.remove('active'));
    btnReset.addEventListener('click', () =>  {
        winnerWindow.classList.remove('active');
        game.reset();
        canvas.addEventListener('mousedown', mDown);
    });

    // debugger;
    game.draw();


    //EVENTS MANAGER
    //evt mouse sale del canvas
    function mOut() {
        // debugger;
        game.returnChipToStart();
        game.chipDropped();
        canvas.removeEventListener('mousemove', mMove);
        canvas.removeEventListener('mouseout', mOut);
        canvas.removeEventListener('mouseup', mUp);
    }
    //evt mouse suelta la ficha
    function mUp() {
        // console.log('stop move');
        game.chipDropped();
        let winner = game.getWinner(); 
        if(winner) {
            // console.log('un ganador: ', winner);
            canvas.removeEventListener('mousedown', mDown);
            game.gameComplete();
            console.log('pop-up de', winner,'ganador');
            showWinner(winner);
        }
        canvas.removeEventListener('mousemove', mMove);
        canvas.removeEventListener('mouseout', mOut)
        canvas.removeEventListener('mouseup', mUp);
    }
    //evt mouse se mueve (con la ficha)
    const mMove = (e) => {
        // debugger;
        // console.log("moving");
        game.moveChip(e.offsetX, e.offsetY);
        canvas.addEventListener('mouseout', mOut);
        canvas.addEventListener('mouseup', mUp);
    }
    //evt mouse selecciona una ficha
    const mDown = (e) => {
        // if(game.getWinner){
        //     console.log('hay un ganador');
        //     canvas.removeEventListener('mousedown', mDown);
        // }
        if(game.chipHit(e.offsetX, e.offsetY)) {
            // debugger;
            // console.log('chip hitted: ', game.getChipInMovement());
            canvas.addEventListener('mousemove', mMove);
            // canvas.addEventListener('touchmove', mMove);
            canvas.addEventListener('mouseup', mUp);
            // canvas.addEventListener('touchend', mUp);
            // console.log(game.chips);
        } else {
            // console.log('canvas is clicked');
        }
    };

    canvas.addEventListener('mousedown', mDown);
    // canvas.addEventListener('touchstart', mDown);

});

const tic_tac_toe = {

    board: ['', '', '', '', '', '', '', '', ''],
    symbols: {
        options: ['X', 'O'],
        turn_index: 0,
        change: function () {
            this.turn_index = turn_index = (this.turn_index === 0 ? 1 : 0); // alterna os jogadores **Operador ternário**
        }
    },
    conteiner_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ],

    init: function (container) {
        this.conteiner_element = container;
    },

    make_play: function(position) {
        if (this.gameover) return false; // se o jogo terminou retorna falso
        if (this.board[position] === ''){
            this.board[position] = this.symbols.options[this.symbols.turn_index];
            this.draw();
            let winning_sequences_index = this.check_winning_sequences( this.symbols.options[this.symbols.turn_index] );
            if (winning_sequences_index >= 0){
                this.game_is_over();
            } else{
                this.symbols.change();
            }
            return true;
        }
        else {
            return false;
        }
    },

    check_winning_sequences: function(symbols) {

        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == symbols  &&
                this.board[ this.winning_sequences[i][1] ] == symbols &&
                this.board[ this.winning_sequences[i][2] ] == symbols) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    game_is_over: function(){
        this.gameover = true;
        console.log("GAME OVER");
    },

    is_game_over: function() {
        for (let i of this.board){
            if (i===''){
                return false;
            }
        }

        return true;
    },

    start: function(){
        console.log("start");
        this.board.fill('');
        this.draw();
        this.gameover = false;
    },

    restart: function (){
        if(this.is_game_over() || this.gameover) {
            this.start();
            console.log('this game has been restarted!')
        }else if(confirm('Are you want to restart this game?')){
            this.start();
            console.log('this game has been restarted!')
        }
    },

    draw: function () {
        let content = '';

        for (i in this.board) {
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
        }

        this.conteiner_element.innerHTML = content;
    },

};
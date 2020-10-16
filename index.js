const vm = new Vue ({
    el: "#app",
    data: {
        upLeft: false,
        upRight: false,
        downLeft: false,
        downRight: false,
        sequence: [],
        tmpSequence: [],
        squareMapping: ["upLeft", "upRight", "downLeft", "downRight"],
        score: 0,
        record: {
            userName: "unknow",
            score: 0 
        }
    },
    methods: {
        addNewElemToSequence(){
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4 )]);
            this.tmpSequence = this.sequence.slice();

        },
        resetSquare(){
            this.upLeft = false;
            this.upRight = false;
            this.downLeft = false;
            this.downRight = false;
        },
        newGame(){
            this.sequence = [];
            this.score = 0;
            this.nextSequence();
        },
        nextSequence(){
            this.resetSquare();
            this.addNewElemToSequence();
            this.playSequence();
        },
        playSequence(){ 
            if(this.tmpSequence[0]){
                setTimeout(function(){
                    vm[vm.tmpSequence[0]] = true;
                    setTimeout(function(){
                        vm.resetSquare();
                        vm.tmpSequence.shift();
                        if (vm.tmpSequence[0]) {
                            vm.playSequence();
                        }
                        else{
                            vm.tmpSequence = vm.sequence.slice();
                        }
                    }, 400);
                }, 400);    
            }
        },
        squareClick(square){
            if(square === this.tmpSequence[0]){
                this[square] = true;
                setTimeout(function(){
                    vm.resetSquare();
                    vm.tmpSequence.shift();
                    if (!vm.tmpSequence[0]) {
                        vm.nextSequence();
                        vm.score++;
                      }
                }, 500);
            }
            else{
                let userName = window.prompt("Vous avez " + this.score + "points, Entrez votre nom !")
                let obj = {
                    "userName": userName,
                    "score": this.score
                }
                if(this.record.recorder.score < obj.score){
                        Object.assign({}, vm.record, obj)
                }
            }
        }
    }
})
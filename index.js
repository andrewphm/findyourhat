// import module/function to allow user input using prompt-sync
//Add the object literal sigint:true to allow the user to cancel the program when they'd like
const prompt = require('prompt-sync')({sigint:true});


// install clear-screen npm package.
// Run `npm install clear-screen` in the terminal first
// This lets us clear the terminal/CLI after every turn 
const clear = require('clear-screen');


const hat = '^';
const hole = '0';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field {
    constructor(field) {
        this.field = field;
        this.hatpos = {x:0, y:0}
        this.currentpos = {x:0, y:0}
    }
    // method to create start path on grid
    createCurrentPos() {
        this.currentpos.y = Math.floor(Math.random() * 10);
        this.currentpos.x = Math.floor(Math.random() * 10);
        this.field[this.currentpos.y][this.currentpos.x] = pathCharacter;
    }
    // method to create a hat position on the grid
    createHatPos() {
        this.hatpos.y = Math.floor(Math.random() * 10);
        this.hatpos.x = Math.floor(Math.random() * 10);
        this.field[this.hatpos.y][this.hatpos.x] = hat;
    }

    // Checks to see if there is a hole, if not will update path with user input.
    getInput() {
        let input = prompt('Which direction? ').toUpperCase();
        switch(input) {
            case 'U':
                this.currentpos.y -= 1;
                if(this.field[this.currentpos.y][this.currentpos.x] == 0) {
                    return true
                } else {
                    this.field[this.currentpos.y][this.currentpos.x] = pathCharacter;
                }
                break;
            case 'D':
                this.currentpos.y += 1;
                if(this.field[this.currentpos.y][this.currentpos.x] == 0) {
                    return true
                } else {
                    this.field[this.currentpos.y][this.currentpos.x] = pathCharacter;
                }
                break;
            case 'L':
                this.currentpos.x -= 1;
                if(this.field[this.currentpos.y][this.currentpos.x] == 0) {
                    return true
                } else {
                    this.field[this.currentpos.y][this.currentpos.x] = pathCharacter;
                }
                break;
            case 'R':
                this.currentpos.x += 1;
                if(this.field[this.currentpos.y][this.currentpos.x] == 0) {
                    return true
                } else {
                    this.field[this.currentpos.y][this.currentpos.x] = pathCharacter;
                }
                break;
            default:
                console.log('Enter U, D, L or R.')
                this.getInput();
                break;
        }
    }

    // Checks to see if the new location is out of bounds
    isOutOfBounds() {
        if(this.currentpos.x < 0 || this.currentpos.x > 9 ||
            this.currentpos.y < 0 || this.currentpos.y > 9) {
                return true;
            }
    }

    // Checks to see if the current position matches the hat position
    foundHat() {
        if(this.hatpos.y === this.currentpos.y &&
            this.hatpos.x === this.currentpos.x) {
                return true;
            }
    }

    // Runs game: first updates grid with random starting path and random hat location. Then creates a loop for user input to extend the path. Checks for hole, out of bounds or hat.
    runGame() {
        this.createCurrentPos();
        this.createHatPos();

        let game = true;
        while(game) {
            this.print();

            if(this.getInput()) {
                console.log('You fell in a hole.')
                break;
            } 

            if(this.isOutOfBounds()){
                console.log('You are out of bounds.')
                break;
            }  else if (this.foundHat()) {
                console.log('Congratulations, you found your hat!')
                break;
            }
        }
    }

    // Prints the grid by taking every element and joining it then console logining it line by line.
    print() {
        clear();
        this.field.forEach(element => console.log(element.join('')));
    }

    // Creates a 10x10 field and fills it roughly with 30% of holes.
    static generateField(fieldH, fieldW) {
        let field = new Array(fieldH).fill(0).map(e => new Array(fieldW).fill(0));
        for(let y = 0; y < fieldH; y++) {
            for(let x = 0; x < fieldW; x++) {
                let randNum = Math.floor(Math.random() * 10)
                if(randNum > 2) {
                    field[y][x] = fieldCharacter;
                } else {
                    field[y][x] = hole;
                }
            } 
        }
        return field;
    }

}


const myArray = new Field(Field.generateField(10,10));

myArray.runGame();
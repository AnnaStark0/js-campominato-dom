// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
// (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e
//  le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

// ****L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, 
// in cui ogni cella contiene un numero tra quelli compresi in un range: con difficoltà 1 => tra 1 e 100 
// con difficoltà 2 => tra 1 e 81 con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
//  I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - 
// abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, 
// altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. 
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri 
// consentiti. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che 
// l’utente ha inserito un numero consentito.
// BONUS: Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.

document.getElementById('play').addEventListener('click', function(){
    play();
});

function play() {
    const container = document.querySelector('.container'); 
    container.innerHTML = '';
    container.classList.remove('disabled');

    const levelSelected = parseInt(document.getElementById('livello').value);
    // console.log(levelSelected);

    let cellsNumber, cellForSide;
    const bombsNumber = 15;  

    switch(levelSelected){
        case 1:
            cellsNumber = 100;       
            break;
        case 2: 
            cellsNumber = 81;
            break;
        case 3: 
            cellsNumber = 49;
    }

    cellForSide = Math.sqrt(cellsNumber);
    // console.log(cellForSide);

    const bombs = generateBoms();
    console.log(bombs);

    const arrayAttemps = [];
    const attemps = cellsNumber - bombsNumber;

    function generateBoms() {
        const arrayBombs = [];

        while(arrayBombs.length < bombsNumber){
            const numeroRandom = getRndInteger(1,cellsNumber);
            if(!arrayBombs.includes(numeroRandom)) {
                arrayBombs.push(numeroRandom);
            }
        }

        // ordiniamolo
        arrayBombs.sort(function(a, b){return a-b});
        
        return arrayBombs;

    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    generatePlayground();

    function generatePlayground() {

        const box = document.querySelector('.container');

        for(let i = 1; i<= cellsNumber; i++){
            const grid = createItem(i);

            grid.addEventListener('click', function() {
                if(bombs.includes(i)){
                    this.classList.add('bomb');
                    endGame();
                } else {
                    this.classList.add('active');
                    arrayAttemps.push(i);
                }

                if(attemps === arrayAttemps.length){
                    console.log('hai vinto');
                }
                
            });

            // console.log(grid);
            box.appendChild(grid);
        }
        // console.log(size);        
    }

    function endGame(){
        alert('gioco finito! Numero di tentativi ' + arrayAttemps.length);
        container.classList.add('disabled');
    }

    function createItem(num) {
        const cell = document.createElement('div');
        cell.classList.add('box');
        const size = `calc(100% / ${cellForSide})`;
        cell.style.width = size;
        cell.style.height = size;

        cell.innerHTML = num;

        return cell;
    }
    }

    // Preso e riadattato dal file di Cristina ._. // 
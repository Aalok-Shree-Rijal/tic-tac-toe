const player1 = 'aalu';
const player2 = 'cross';
const audio = new Audio('drumrolls.mp4');
let winning_combos = [[1,2,3],[4,5,6],[7,8,9],
                  [1,4,7],[2,5,8],[3,6,9],
                  [1,5,9],[3,5,7]];
let available_places = [1,2,3,4,5,6,7,8,9]
let p1, p2, p1_combo=[], p2_combo=[], index;

function disableInteraction() {
  document.getElementById('interaction-blocker').style.display = 'block';
}

function enableInteraction() {
  document.getElementById('interaction-blocker').style.display = 'none';
}


function select(player){
    if(player == player1){
        p1 = true;
        p2 = false;
    }
    else{
        p1 = false;
        p2 = true;
    }
    console.log(p1+','+p2);

    change_page();
}

function change_page(){

    let h1= document.getElementsByTagName('h1')[0];
    let body = document.getElementsByTagName('body')[0];
    let grp = document.getElementsByClassName('grp')[0];
    let container = document.getElementsByClassName('container')[0];
    h1.style.display= 'none';
    grp.style.display = 'none';
    container.style.display = 'flex';
    body.style.justifyContent = 'center';

}

function start(btn){
    let value = parseInt(btn.value);

    console.log(available_places.length);
    console.log(available_places);
    
    if(p1){
        let h2 = document.getElementsByTagName('h2')[0];
        h2.innerHTML = `${player2}'s turn`;
        if(available_places.includes(value)){
            p1_combo.push(value);
            p1 = !p1;
            p2 = !p2;
            btn.innerHTML = `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="20" stroke="black" stroke-width="3" fill="none" />
            </svg>`;
            index = available_places.indexOf(value);
            available_places.splice(index,1);

            for(let combo of winning_combos){
                if(combo.every(num => p1_combo.includes(num))){
                    audio.play();
                    disableInteraction();
                    setTimeout(()=>{print_winner(player1)}, 6000);
                    return;
                }
            }
            if(available_places.length === 0){
                let h2 = document.getElementsByTagName('h2')[0];
                h2.innerHTML = 'Draw';
                setTimeout(()=>{window.location.reload();},3000);
                return;
            }
            return;
        }
        else{
            alert('That place is not available !');
            return 0;
        }
    }

    if(p2){
        let h2 = document.getElementsByTagName('h2')[0];
        h2.innerHTML = `${player1}'s turn`;
        if(available_places.includes(value)){
            p2_combo.push(value);
            p1 = !p1;
            p2 = !p2;
            btn.innerHTML = `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="40" y2="40" stroke="black" stroke-width="3" />
            <line x1="40" y1="10" x2="10" y2="40" stroke="black" stroke-width="3" />
            </svg>`;
            index = available_places.indexOf(value);
            available_places.splice(index,1);

            

            for(let combo of winning_combos){
                if(combo.every(num => p2_combo.includes(num))){
                    audio.play()
                    disableInteraction();
                    setTimeout(()=>{print_winner(player2)},6000);
                    return;
                }
            }
            
            if(available_places.length === 0){
                let h2 = document.getElementsByTagName('h2')[0];
                h2.innerHTML = 'Draw';
                setTimeout(()=>{window.location.reload();},3000);
                return;
            }
            
            return;
        }
        else{
            alert('That place is not available !');
            return 0;
        }
    }
}

function print_winner(winner){
    enableInteraction();
    confetti();
    let h1 = document.createElement('h1');
    let body = document.getElementsByTagName('body')[0];
    let button = document.createElement('button');
    let h2 = document.getElementsByTagName('h2')[0];
    h2.style.display = 'none';
    let container = document.getElementsByClassName('container')[0];
    container.style.display = 'none';

    body.style.backgroundColor = 'cream';

    h1.style.display = 'block';
    h1.style.backgroundColor = 'white';
    h1.style.zIndex = '1000';
    h1.innerHTML = `The winner is ${winner}`;
    
    button.onclick = ()=>{window.location.reload()}
    button.innerHTML='Restart';
    button.style.padding = '5px';
    button.style.fontWeight = 'bold';
    button.style.backgroundColor = 'aqua';
    button.style.cursor = 'pointer';
    
    body.append(h1);
    body.append(button);
    
}
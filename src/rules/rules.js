export function valeurCase(data, width, index){
    //const index = (y*width + x);
    const N = Number(width);
    const x = index % width;
    const y = Math.floor(index / width);
    const height = data.length/width;

    var total = 0;

    [-1,0,1].forEach( (a) => {
        [-1,0,1].forEach( (b) => {
            if (x+a>=0 && x+a<width && y+b>=0 && y+b<height){
                const v = data[(y+b)*width + x + a];
                if (v<100)
                    total +=v;
            }
        });
    });
       
    return total;
}


export function decouvreCase(data, width, index){

    var total = valeurCase(data, width, index);
    var newData = data.slice();
    newData[index] = 100 + total;
    return newData;
}

export function decouvreCasesAutour(data, width, index){
    const x = index % width;
    const y = Math.floor(index / width);
    const height = data.length/width;

    var newData = data.slice();
    [-1,0,1].forEach( (a) => {
        [-1,0,1].forEach( (b) => {
            if (x+a>=0 && x+a<width && y+b>=0 && y+b<height){
                var indexCase = (y+b)*width + x + a;
                newData[indexCase] = 100 + valeurCase(newData, width, indexCase);
            }
        });
    });
    return newData;
}



/*
Utilisé pour passer un tout
Retourne le tableau de jeu mis à jour et le nombre de changements par rapport au tableau initial

*/
export function init(width, height, nbMines){

    var initData=new Array(width*height);
    initData.fill(0);

    for (var i=0; i<nbMines; i++){
        var n = -1;
        while (n==-1 || initData[n] !==0 ){
            n = Math.floor(Math.random() * width * height) 
        }
        initData[n] = 1;
    }

    return  initData;
} 



export default valeurCase;
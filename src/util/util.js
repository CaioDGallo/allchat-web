export function generateRoomId(id, id2){
    var i;
    var char;

    console.log(id +' '+ id2)
    var hash = 0;
    if (id.length === 0) return hash;
    for (i = 0; i < id.length; i++) {
        char = id.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }

    id = hash;

    hash = 0;
    if (id2.length === 0) return hash;
    for (i = 0; i < id2.length; i++) {
        char = id2.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }

    id2 = hash;

    console.log(id + ' ' + id2);

    //Always smaller first
    if(id > id2){
        const idNumbers = id2 + id
        return 'r'+ idNumbers
    }else{
        const idNumbers = id + id2
        return 'r'+ idNumbers
    }
}

export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
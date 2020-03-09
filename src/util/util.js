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
        return id2 + id
    }else{
        return id + id2
    }
}
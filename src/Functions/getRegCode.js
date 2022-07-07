
function getRegCode(){
    let chars = 'ABCDEFGJKLMNOPQRSTUVWXYZ0123456789';
    let res = '';
    for (let i = 0; i < 8; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length))
        
    }
    return res;
}

export default getRegCode;
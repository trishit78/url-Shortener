const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function toBase62(num:number):string{
    if(num==0){
        return '0';
    }
    let res='';
    let n = num;
    while(n>0){
        res = BASE62_CHARS[n%62]+res;
        n = Math.floor(n/62);
    }
    return res;
}


export function fromBase62(str:string):number{
    let res=0;
    for(let i=0;i<str.length;i++){
        const char = str[i];
        const value = BASE62_CHARS.indexOf(char);
        res=res*62+value
    }
    return res;

}
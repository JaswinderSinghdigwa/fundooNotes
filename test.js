// write a program to detect prime no from Array of first ten thousand Integer

let a=[];
for(let i=1;i<=10000;i++){
    a.push(i);
}
if(j==2){
    console.log("it is a prime no");
}
for(let j=3;j<a.length;j++){
    for(let k=2;k<j;k++){
        if(j%k==0){
            break;
        }
      
    }
    console.log("It is a prime no",j);
}

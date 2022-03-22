// export function add(a,b) {
//   return a + b;
// }

export function multiply(a,b) {
  // if (isNaN(a) && isNaN(b)){
  //   return 1;
  // }else if (isNaN(a)){
  //   return b;
  // }else if(isNaN(b)){
  //   return a;
  // }else {
  //   return a * b;
  // }
return validate(a) * validate(b)

}

function validate(val){
  return isNaN(val) ? 1 : val;
}
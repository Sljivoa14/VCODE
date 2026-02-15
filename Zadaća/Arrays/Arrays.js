/* var arr = function(input) {
  if (toString.call(input) === "[object Array]")
    return true;
  
  return false;   
};

console.log(arr('w3resource'));

console.log(arr([1, 2, 4, 0]));

----------------------------------------------------------------------------*/

function is_array(input) {
  if (Array.isArray(input)) {
    return true;
  } else {
    return false;
  }
}

console.log(is_array('w3resource'));   // false
console.log(is_array([1, 2, 4, 0]));    // true 

/*-----------------------------------------------------------------------------
Write a JavaScript function to clone an array.
*/

[]// array
{}//object

function array_Clone(arr) {
  return arr.slice(0);
};
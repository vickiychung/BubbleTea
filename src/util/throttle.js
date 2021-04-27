export const throttle = (func, interval) => {
  let timeout;

  return function() {
   let context = this;
   let args = arguments;
   let callback = function () {
      timeout = false;
    };

    if (!timeout) {
      func.apply(context, args);
      timeout = true;
      setTimeout(callback, interval);
    }
  }
}

// const throttleFunction=(func, delay)=>{
  
//       // Previously called time of the function
//       let prev = 0; 
//       return (...args) => {
//         // Current called time of the function
//         let now = new Date().getTime(); 
  
//         // Logging the difference between previously 
//         // called and current called timings
//         console.log(now-prev, delay); 
          
//         // If difference is greater than delay call
//         // the function again.
//         if(now - prev> delay){ 
//           prev = now;
  
//           // "..." is the spread operator here 
//           // returning the function with the 
//           // array of arguments
//           return func(...args);  
//         }
//       }
//     }
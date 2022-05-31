// check if the item in the array ( like in php )
export const inArray = (array, item) => {

   for (let i = 0; i < array.length; i++) {
      if (array[i] === item) return true
   }
   return false
}



const utils = { inArray }
export default utils;
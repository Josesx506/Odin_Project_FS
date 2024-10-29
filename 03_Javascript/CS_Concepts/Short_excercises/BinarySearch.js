/**
 * Recursive implemetation of binary search
 * @param {Number} val   - target value that should be found
 * @param {Array} inpArr - input array that should be searched
 * @returns 
 */
function binarySearch(val,inpArr) {
    if (inpArr.length<=1 || (inpArr.length===1 && inpArr[0]!==val)) {
        return null;
    } else {
        let midPnt = Math.floor(inpArr.length/2);
        let midVal = inpArr[midPnt];

        if (val === midVal) {
            return val;
        } else if (val < midVal) {
            inpArr = inpArr.slice(0,midPnt);
            return binarySearch(val, inpArr);
        } else {
            inpArr = inpArr.slice(midPnt+1,inpArr.length);
            return binarySearch(val, inpArr);
        }
    }
};


let arr = [6,7,8,9,10,11,14,15,17,19,22,23,25,28,20];
console.log(binarySearch(15,arr));

let arr1 = [6];
console.log(binarySearch(16,arr1));

let arr2 = [];
console.log(binarySearch(16,arr2));
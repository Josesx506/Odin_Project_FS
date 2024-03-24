const findTheOldest = function(peopleObjs) {
    const date = new Date();
    const year = date.getFullYear();

    function fillYearOfDeath(person) {
        if (person.yearOfDeath === undefined) {
            person.yearOfDeath = year;
        }
        return person
    };

    function indexOfMax(arr) { 
        return arr.reduce((maxIndex, elem, i, arr) =>  
            elem > arr[maxIndex] ? i : maxIndex, 0); 
    } 
    
    let age = peopleObjs.map((person) => fillYearOfDeath(person).yearOfDeath - person.yearOfBirth);
    let maxAgeIndex = indexOfMax(age);
    
    return peopleObjs[maxAgeIndex]
};

// Do not edit below this line
module.exports = findTheOldest;

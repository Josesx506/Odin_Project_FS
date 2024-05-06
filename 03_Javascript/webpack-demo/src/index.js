import _ from 'lodash';
// import your function
import myName from './myName';

function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    // Update the elements text content with the custom function
    element.textContent = myName('Cody');
  
    return element;
  }
  
  document.body.appendChild(component());
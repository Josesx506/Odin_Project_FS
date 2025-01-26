import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(true);

  function handleNextClick() {
    index<=10 && setIndex(index + 1);
  }

  function handlePrevClick() {
    index>=1 && setIndex(index - 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <div style={{margin: "2rem 0", border: "1px solid grey",}}>
      <div style={{width: "80%", display: "flex", justifyContent: "space-around", margin: "0 auto"}}>
        <button onClick={handlePrevClick}>
          &#x25c0;Prev
        </button>
        <button onClick={handleNextClick}>
          Next&#x25B6;
        </button>
      </div>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <div style={{maxWidth: "40vw", margin: "0 auto"}}>
        <button onClick={handleMoreClick}>
            {showMore ? 'Hide' : 'Show'} details
        </button>
        {showMore && <p style={{border: "0.1rem solid black", borderRadius: "0.5rem"}}>{sculpture.description}</p>}
      </div>
      <img src={sculpture.url} alt={sculpture.alt} />
    </div>
  );
}

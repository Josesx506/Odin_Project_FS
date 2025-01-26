function StaticAnimals() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];
    const animalsList = animals.map((animal) => <li key={animal}>{animal}</li>)
  
    return (
      <div>
        <h1>Animals: </h1>
        <ul>
          {animalsList}
        </ul>
      </div>
    );
}

function ListItemRule(props) {
    /* Only render animals that start with L */
    return props.animal.startsWith("L") ? <li>{props.animal}</li> : null;
}

function ListItem(props) {
    // Notice how this uses singular animal
    return <li>{props.animal}</li>
}

function List(props) {
    // Notice how this uses animals with an s
    return (
      <ul>
        {props.animals.map((animal) => {
          return <ListItem key={animal} animal={animal} />;
        })}
      </ul>
    );
}
  
function Animals() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];
  
    return (
      <div>
        <h1>Animals: </h1>
        <List animals={animals} />
      </div>
    );
  }
  


export default Animals;
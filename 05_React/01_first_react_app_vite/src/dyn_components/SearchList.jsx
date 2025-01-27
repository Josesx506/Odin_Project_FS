import { useState } from 'react';
import { foods, filterItems } from './searchData.js';

function SearchBar({ query, onChange }) {
  return (
    <label>
      Search:{' '}
      <input
        type='search'
        value={query}
        onChange={onChange}
      />
    </label>
  );
}

function List({ items, query }) {
  return (
    <table style={{width: "100%" ,maxWidth: "700px"}}>
      <tbody> 
        {items.map(food => (
          <tr key={food.id}>
            <td>{(food.name.startsWith(query) && query!=="") ? <b style={{color:"green"}}>{food.name}</b> : food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SearchList() {
    const [query, setQuery] = useState('');
    const results = filterItems(foods, query);
  
    function handleChange(e) {
      setQuery(e.target.value);
    }
  
    return (
      <div style={{border: "1px solid grey", padding: "0.5rem", marginTop: "1rem", minHeight: "200px" }}>
        <SearchBar
          query={query}
          onChange={handleChange}
        />
        <hr />
        <List items={results} query={query} />
      </div>
    );
  }
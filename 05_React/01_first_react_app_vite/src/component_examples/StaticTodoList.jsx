import Avatar from './Avatar';


const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export function StaticList() {
    return (
      <ul style={{
        backgroundColor: 'black',
        color: 'pink'
      }}>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    );
}

export function Title() {
    const name = 'Gregorio Y. Zara';
    return (
        <>
        <h1>{name}`s To Do List</h1>
        <h1>To Do List for {formatDate(today)}</h1>
        </>
    );
}

export default function TodoList() {
    const person = {
        name: 'Gregorio Y. Zara',
        theme: {
          backgroundColor: 'black',
          color: 'pink'
        }
    };

    return (
        <>
            <Title />
            <div>{person.name}</div>
            <Avatar />
            <StaticList />
        </>
    )
}
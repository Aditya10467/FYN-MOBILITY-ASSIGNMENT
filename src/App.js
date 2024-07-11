import React from 'react';
import SortableList from './SortableList';
import './App.css'; // Import the CSS file for additional styles if needed

function App() {
  const items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
  ];

  const renderItem = (item) => <div>{item.text}</div>;

  return (
    <div className="App">
      <h1>Sortable List</h1>
      <SortableList items={items} renderItem={renderItem} />
    </div>
  );
}

export default App;

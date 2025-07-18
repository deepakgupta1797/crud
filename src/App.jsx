
import { useState } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleFormSubmit = () => {
    setEditingItem(null);
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <ItemForm item={editingItem} onSubmit={handleFormSubmit} />
      <ItemList onEdit={handleEdit} />
    </div>
  );
}

export default App;

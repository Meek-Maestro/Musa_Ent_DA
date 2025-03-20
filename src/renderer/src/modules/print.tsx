import { useState } from 'react';


const App = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');

  const handlePrint = async () => {
    if (!window.api) {
      console.error("Electron IPC not available!");
      return;
    }
  
    try {
      const result = await window.api.invoke('print-receipt', {
        item: "Sample Item",
        price: "10.00",
        qty: "1"
      });
  
      if (result.success) {
        alert('Receipt printed successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Printing error:', error);
    }
  };

  return (
    <div>
      <h2>Receipt Printer</h2>
      <input type="text" placeholder="Item" value={item} onChange={e => setItem(e.target.value)} />
      <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input type="text" placeholder="Qty" value={qty} onChange={e => setQty(e.target.value)} />
      <button onClick={handlePrint}>Print Receipt</button>
    </div>
  );
};

export default App;

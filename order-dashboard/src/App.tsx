import OrderList from './OrderList';
import OrderForm from './OrderForm';
import './App.css';

function App() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-300 shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Order Dashboard</h1>
      <OrderForm />
      <OrderList />
    </div>
  );
}

export default App;

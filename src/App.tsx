import Basket from "./components/Basket";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="max-w-6xl w-full px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">
              Grocery Basket
            </h1>
            <p className="text-sm text-slate-500 mt-1">
          
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-white/80 border border-slate-200 shadow-sm text-slate-500">
          </span>
        </header>
        <div className="grid md:grid-cols-2 gap-6">
          <ProductList />
          <Basket />
        </div>
      </div>
    </div>
  );
}

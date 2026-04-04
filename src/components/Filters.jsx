import { useFinance } from "../context/FinanceContext";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function Filters() {
  const { search, setSearch, filterType, setFilterType } = useFinance();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 backdrop-blur-sm self-start">
      {/* Search Input Section */}
      <div className="relative group w-full md:w-80">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-primary transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Filter transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary outline-none text-slate-200 placeholder:text-slate-500 transition-all shadow-inner"
        />
      </div>

      {/* Select Dropdown Section */}
      <div className="relative group min-w-[180px]">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-brand-primary group-hover:text-brand-accent transition-colors z-10">
          <Filter size={16} />
        </div>
        
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-xl py-2.5 pl-10 pr-10 text-sm font-bold text-slate-300 outline-none cursor-pointer appearance-none transition-all shadow-lg active:scale-[0.98]"
        >
          <option value="all">Every Transaction</option>
          <option value="income">Income Streams</option>
          <option value="expense">Expense Logs</option>
        </select>

        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-500 group-hover:text-slate-300 transition-colors">
          <ChevronDown size={14} className="group-focus-within:rotate-180 transition-transform" />
        </div>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl border border-brand-primary/20 hover:bg-brand-primary/20 transition-all text-sm font-bold active:scale-95 shadow-lg shadow-brand-primary/5">
        <SlidersHorizontal size={14} />
        <span>Settings</span>
      </button>
    </div>
  );
}
import { useFinance } from "../../../context/FinanceContext";
import { Search, Filter } from "lucide-react";
import CustomSelect from "../../../components/ui/CustomSelect";

export default function Filters() {
  const { search, setSearch, filterType, setFilterType } = useFinance();

  const filterOptions = [
    { value: "all", label: "Full History" },
    { value: "income", label: "Income Streams" },
    { value: "expense", label: "Expense Logs" }
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-900/40 p-4 rounded-[2.5rem] border border-white/5 backdrop-blur-xl self-start shadow-2xl">
      {/* Search Input Section */}
      <div className="relative group w-full md:w-96">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-primary transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-2xl py-3.5 pl-14 pr-8 text-sm font-bold focus:ring-2 focus:ring-brand-primary outline-none text-slate-100 placeholder:text-slate-600 transition-all shadow-inner"
        />
      </div>

      {/* Vertical Divider (Hidden on mobile) */}
      <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-2" />

      {/* Elite Custom Dropdown */}
      <CustomSelect
        options={filterOptions}
        value={filterType}
        onChange={setFilterType}
        icon={Filter}
        className="min-w-[240px] w-full md:w-auto"
      />
    </div>
  );
}
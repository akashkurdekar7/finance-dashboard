import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import TransactionsTable from "./Transactions";
import Insights from "./Insights";
import CardStack from "../components/CardStack";
import { Plus, X, ListPlus } from "lucide-react";

export default function Dashboard() {
    const { addTransaction, permissions } = useFinance();
    const [isAdding, setIsAdding] = useState(false);
    
    const [newTxn, setNewTxn] = useState({
        amount: "",
        category: "",
        type: "expense",
        description: "",
        date: new Date().toISOString().split('T')[0]
    });

    const handleAdd = (e) => {
        e.preventDefault();
        addTransaction({
            ...newTxn,
            amount: parseFloat(newTxn.amount)
        });
        setIsAdding(false);
        setNewTxn({
            amount: "",
            category: "",
            type: "expense",
            description: "",
            date: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            {/* Header section with page title and summary data */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-white/5">
                <div className="space-y-2">
                    <p className="text-brand-primary text-xs font-black uppercase tracking-[0.4em] leading-none mb-4">Financial Command</p>
                    <h2 className="text-5xl font-black tracking-tighter text-white">Overview</h2>
                </div>
                
                <div className="flex items-center gap-4">
                    <Filters />
                    {permissions.canAdd && (
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="bg-brand-primary text-slate-950 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20 group shrink-0"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                            <span>Post Transaction</span>
                        </button>
                    )}
                </div>
            </header>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Section: Stats and Transactions */}
                <div className="lg:col-span-8 flex flex-col gap-12">
                    {/* Key Metrics Row */}
                    <div className="w-full">
                        <SummaryCards />
                    </div>

                    {/* Transactional data view */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-black tracking-tighter">Recent Records</h3>
                                <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full border border-brand-primary/20 uppercase font-black tracking-[0.2em]">
                                    Live Sync
                                </span>
                            </div>
                        </div>
                        <div className="glass-container">
                            <TransactionsTable />
                        </div>
                    </section>
                </div>

                {/* Right Section: Assets and Insights */}
                <div className="lg:col-span-4 flex flex-col gap-12">
                    {/* Bank Cards Stack */}
                    <div className="flex justify-center w-full">
                        <CardStack />
                    </div>

                    {/* Smart Analysis Card */}
                    <div className="flex justify-center lg:justify-end w-full">
                        <Insights />
                    </div>
                </div>
            </div>

            {/* Add Transaction Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
                    <div className="bg-slate-900 w-full max-w-md p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden my-auto">
                        <header className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-primary/20 rounded-xl">
                                    <ListPlus className="text-brand-primary" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">New Transaction</h3>
                            </div>
                            <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </header>

                        <form onSubmit={handleAdd} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Type</label>
                                    <select 
                                        value={newTxn.type}
                                        onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-3 rounded-xl text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary appearance-none"
                                    >
                                        <option value="expense">Expense (-)</option>
                                        <option value="income">Income (+)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Date</label>
                                    <input 
                                        type="date"
                                        required
                                        value={newTxn.date}
                                        onChange={(e) => setNewTxn({...newTxn, date: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-3 rounded-xl text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Account & Category</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Salary, Rent, Food"
                                    required
                                    value={newTxn.category}
                                    onChange={(e) => setNewTxn({...newTxn, category: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700/50 p-4 rounded-2xl text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Amount (₹)</label>
                                <input 
                                    type="number" 
                                    placeholder="0.00"
                                    required
                                    value={newTxn.amount}
                                    onChange={(e) => setNewTxn({...newTxn, amount: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700/50 p-4 rounded-2xl text-2xl font-black text-brand-primary outline-none focus:ring-2 focus:ring-brand-primary shadow-inner placeholder:text-brand-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Description</label>
                                <textarea 
                                    placeholder="Optional details..."
                                    rows="2"
                                    value={newTxn.description}
                                    onChange={(e) => setNewTxn({...newTxn, description: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700/50 p-4 rounded-2xl text-sm font-medium text-slate-300 outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 bg-brand-primary text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs"
                            >
                                Confirm Transaction
                            </button>
                        </form>

                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
                    </div>
                </div>
            )}
        </div>
    );
}
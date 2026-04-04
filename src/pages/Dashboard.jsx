import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import TransactionsTable from "./Transactions";
import Insights from "./Insights";
import CardStack from "../components/CardStack";
import BalanceTrend from "../components/BalanceTrend";
import CustomSelect from "../components/CustomSelect"; // 🔹 Added
import { Plus, X, ListPlus, CreditCard as CardIcon, Palette, ArrowRightLeft } from "lucide-react";

export default function Dashboard() {
    const { addTransaction, addCard, permissions } = useFinance();
    const [isAdding, setIsAdding] = useState(false);
    const [isAddingCard, setIsAddingCard] = useState(false);
    
    const [newTxn, setNewTxn] = useState({
        amount: "", category: "", type: "expense", description: "", date: new Date().toISOString().split('T')[0]
    });

    const [newCard, setNewCard] = useState({
        cardNumber: "", expiry: "", holder: "", type: "visa", theme: "from-slate-950 via-slate-900 to-indigo-950", balance: 0
    });

    // 🔹 Select Options
    const typeOptions = [
        { value: "expense", label: "Expense (-)" },
        { value: "income", label: "Income (+)" }
    ];

    const cardTypeOptions = [
        { value: "visa", label: "Visa" },
        { value: "mastercard", label: "Mastercard" }
    ];

    const themeOptions = [
        { value: "from-slate-950 via-slate-900 to-indigo-950", label: "Midnight" },
        { value: "from-emerald-600 via-emerald-800 to-slate-900", label: "Emerald" },
        { value: "from-amber-500 via-amber-700 to-slate-900", label: "Gold" },
        { value: "from-rose-600 via-rose-800 to-slate-950", label: "Corporate" }
    ];

    const handleAddTxn = (e) => {
        e.preventDefault();
        addTransaction({ ...newTxn, amount: parseFloat(newTxn.amount) });
        setIsAdding(false);
        setNewTxn({ amount: "", category: "", type: "expense", description: "", date: new Date().toISOString().split('T')[0] });
    };

    const handleAddCard = (e) => {
        e.preventDefault();
        addCard({ ...newCard, balance: parseFloat(newCard.balance) });
        setIsAddingCard(false);
        setNewCard({ cardNumber: "", expiry: "", holder: "", type: "visa", theme: "from-slate-950 via-slate-900 to-indigo-950", balance: 0 });
    };

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-8 border-b border-white/5">
                <div className="space-y-2">
                    <h2 className="text-6xl font-extrabold tracking-tighter text-white">Overview</h2>
                </div>
                
                <div className="flex items-center gap-6">
                    <Filters />
                    {permissions.canAdd && (
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="bg-brand-primary text-slate-950 px-8 py-4 rounded-3xl font-black text-sm flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-primary/20 group shrink-0"
                        >
                            <Plus size={22} className="group-hover:rotate-90 transition-transform" />
                            <span>Post Entry</span>
                        </button>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                <div className="lg:col-span-8 flex flex-col gap-20">
                    <div className="w-full">
                        <SummaryCards />
                    </div>

                    <section className="w-full">
                        <BalanceTrend />
                    </section>

                    <section className="space-y-8">
                        <div className="flex items-center justify-between px-6">
                            <div className="flex items-center gap-4">
                                <h3 className="text-3xl font-extrabold tracking-tighter">Recent Records</h3>
                                <div className="h-1.5 w-1.5 rounded-full bg-brand-primary/40" />
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">History</span>
                            </div>
                        </div>
                        <div className="glass-container">
                            <TransactionsTable />
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-20 sticky top-12">
                    <div className="flex justify-center w-full">
                        <CardStack onAddClick={() => setIsAddingCard(true)} />
                    </div>

                    <div className="flex justify-center lg:justify-end w-full">
                        <Insights />
                    </div>
                </div>
            </div>

            {/* Modals with CustomSelect */}
            {isAdding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
                    <div className="bg-slate-900 w-full max-w-md p-10 rounded-[3rem] border border-white/10 shadow-3xl relative overflow-hidden my-auto">
                        <header className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-primary/20 rounded-2xl">
                                    <ListPlus className="text-brand-primary" size={24} />
                                </div>
                                <h3 className="text-2xl font-extrabold text-white tracking-tight">New Entry</h3>
                            </div>
                            <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors group">
                                <X size={24} className="text-slate-500 group-hover:rotate-90 transition-transform" />
                            </button>
                        </header>

                        <form onSubmit={handleAddTxn} className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Direction</label>
                                    <CustomSelect 
                                        options={typeOptions} value={newTxn.type} icon={ArrowRightLeft}
                                        onChange={(val) => setNewTxn({...newTxn, type: val})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Timestamp</label>
                                    <input 
                                        type="date" required value={newTxn.date} onChange={(e) => setNewTxn({...newTxn, date: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-4 rounded-2xl text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Classification</label>
                                <input 
                                    type="text" placeholder="e.g. Salary, Housing, Food" required value={newTxn.category} onChange={(e) => setNewTxn({...newTxn, category: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Valuation (₹)</label>
                                <input 
                                    type="number" placeholder="0.00" required value={newTxn.amount} onChange={(e) => setNewTxn({...newTxn, amount: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-3xl font-extrabold text-brand-primary outline-none focus:ring-2 focus:ring-brand-primary shadow-inner"
                                />
                            </div>

                            <button type="submit" className="w-full py-5 bg-brand-primary text-slate-950 rounded-[1.5rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs">
                                Confirm Record
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isAddingCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
                    <div className="bg-slate-900 w-full max-w-md p-10 rounded-[3rem] border border-white/10 shadow-3xl relative overflow-hidden my-auto">
                        <header className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-accent/20 rounded-2xl">
                                    <CardIcon className="text-brand-accent" size={24} />
                                </div>
                                <h3 className="text-2xl font-extrabold text-white tracking-tight">Register Card</h3>
                            </div>
                            <button onClick={() => setIsAddingCard(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors group">
                                <X size={24} className="text-slate-500 group-hover:rotate-90 transition-transform" />
                            </button>
                        </header>

                        <form onSubmit={handleAddCard} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Identification</label>
                                <input 
                                    type="text" placeholder="**** **** **** 1234" required value={newCard.cardNumber} onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-accent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Entity Holder</label>
                                    <input 
                                        type="text" placeholder="John Doe" required value={newCard.holder} onChange={(e) => setNewCard({...newCard, holder: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Expiry (MM/YY)</label>
                                    <input 
                                        type="text" placeholder="12/28" required value={newCard.expiry} onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-accent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Asset Identity</label>
                                <div className="grid grid-cols-2 gap-6">
                                    <CustomSelect 
                                        options={cardTypeOptions} value={newCard.type} icon={CardIcon}
                                        onChange={(val) => setNewCard({...newCard, type: val})}
                                    />
                                    <CustomSelect 
                                        options={themeOptions} value={newCard.theme} icon={Palette}
                                        onChange={(val) => setNewCard({...newCard, theme: val})}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-5 bg-brand-accent text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-accent/20 hover:scale-[1.02] active:scale-95 transition-all text-xs">
                                Authorize Asset
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
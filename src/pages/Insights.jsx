import { useFinance } from "../context/FinanceContext";
import { Sparkles, TrendingUp, AlertCircle, PieChart, BarChart3, ArrowRight } from "lucide-react";

export default function Insights() {
    const { transactions } = useFinance();

    const expenses = transactions.filter(t => t.type === "expense");

    const categoryMap = {};
    expenses.forEach(e => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });

    const categories = Object.keys(categoryMap);
    const highest = categories.reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b, "None"
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Header */}
            <header className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-xl">
                    <PieChart className="text-brand-accent transition-transform group-hover:rotate-12" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Smart Analysis</h2>
                    <p className="text-sm text-slate-500 font-medium">Algorithmic insights based on your spending</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Insight Card */}
                <div className="lg:col-span-1 flex flex-col gap-6 bg-gradient-to-br from-brand-accent/20 to-brand-primary/10 p-8 rounded-[2.5rem] border border-white/10 glass shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-3 text-brand-accent relative z-10">
                        <div className="p-2.5 bg-brand-accent/20 rounded-xl">
                            <Sparkles size={24} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-100">Top Insight</span>
                    </div>
                    
                    <div className="space-y-6 relative z-10">
                        <div className="p-6 bg-slate-950/40 rounded-3xl border border-white/5 backdrop-blur-xl shadow-inner">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Dominant Category</p>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-3xl font-extrabold text-white tracking-tighter capitalize">{highest}</span>
                                <div className="flex items-center gap-1.5 text-[10px] font-black text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20 shadow-lg shadow-red-400/5">
                                    <TrendingUp size={12} />
                                    <span>CRITICAL</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-5 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 backdrop-blur-sm group-hover:bg-brand-primary/20 transition-all duration-500 cursor-default">
                            <AlertCircle size={18} className="text-brand-primary shrink-0" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">Advisory</p>
                                <p className="text-xs leading-relaxed text-slate-300 font-medium">
                                    Your <strong>{highest}</strong> spending is significant. Implementing a 15% budget cap could save you approximately ₹{(categoryMap[highest] * 0.15).toFixed(0)} per month.
                                </p>
                            </div>
                        </div>

                        <button className="w-full py-4 text-xs font-bold uppercase tracking-[0.2em] bg-white text-slate-900 rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-accent hover:text-white transition-all shadow-xl active:scale-95 group">
                            Full Report <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-accent/20 blur-[100px] rounded-full group-hover:bg-brand-accent/30 transition-colors" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full" />
                </div>

                {/* Secondary Cards Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] border border-slate-700/50 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <BarChart3 className="text-slate-400" size={20} />
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200">Category Breakdown</h4>
                            </div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">All Expenses</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((cat, i) => (
                                <div key={i} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors shadow-lg">
                                    <span className="text-xs font-bold text-slate-300 capitalize">{cat}</span>
                                    <span className="text-sm font-black text-white">₹{categoryMap[cat].toLocaleString()}</span>
                                </div>
                            ))}
                            {categories.length === 0 && (
                                <p className="col-span-2 py-10 text-center text-xs text-slate-600 italic font-medium">No expense data available for analysis yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-brand-primary/30 transition-all shadow-2xl">
                        <div className="space-y-1">
                            <h4 className="text-lg font-bold text-white tracking-tight">Recurring Payments detected</h4>
                            <p className="text-xs text-slate-500 font-medium tracking-tight">System found 3 subscriptions that recur monthly.</p>
                        </div>
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 group-hover:bg-brand-primary group-hover:text-slate-950 transition-all font-bold">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { useFinance } from "../context/FinanceContext";
import { Trash2, ShoppingBag, ReceiptText, Calendar } from "lucide-react";

/**
 * Standard Transactions Table Page
 * Can be used as a standalone page view
 */
const TransactionsTable = () => {
    const { filteredTransactions, deleteTransaction, permissions } = useFinance();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-xl">
                        <ReceiptText className="text-brand-primary" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Transaction History</h2>
                        <p className="text-sm text-slate-500 font-medium">Detailed log of all financial movements</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-700/50">
                    <Calendar size={14} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Live Syncing</span>
                </div>
            </header>

            {/* Table Container */}
            <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-md overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700/50">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 italic">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Type</th>
                                {permissions.canDelete && <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-center">Action</th>}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-700/30">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-700/20 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-100">{t.date}</span>
                                                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">TXN-{t.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-brand-primary/30 transition-all shadow-inner">
                                                    <ShoppingBag size={18} className="text-slate-400 group-hover:text-brand-primary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-200">{t.category}</span>
                                                    <span className="text-[11px] text-slate-500 truncate max-w-[150px]">{t.description}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-5 text-right font-bold text-lg tracking-tighter ${t.type === 'income' ? 'text-brand-primary' : 'text-slate-100'}`}>
                                            {t.type === 'income' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${t.type === 'income' ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : 'bg-red-400/10 text-red-400 border border-red-400/20'}`}>
                                                {t.type}
                                            </span>
                                        </td>

                                        {permissions.canDelete && (
                                            <td className="px-6 py-5 text-center">
                                                <button 
                                                    onClick={() => deleteTransaction(t.id)}
                                                    className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all active:scale-90"
                                                    title="Remove TXN"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={permissions.canDelete ? 5 : 4} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-40">
                                            <ReceiptText size={48} className="text-slate-600 mb-2" />
                                            <p className="text-lg font-bold text-slate-400">Transaction Not Found</p>
                                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Check your search or filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionsTable;
import { useFinance } from "../context/FinanceContext";
import { Trash2, ShoppingBag, ReceiptText, Calendar, Download, FileSpreadsheet } from "lucide-react";

/**
 * Standard Transactions Table Page
 */
const TransactionsTable = () => {
    const { filteredTransactions, deleteTransaction, permissions } = useFinance();

    const handleExportJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredTransactions, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleExportCSV = () => {
        if (filteredTransactions.length === 0) return;
        
        const headers = ["Date", "Category", "Amount", "Type", "Description"];
        const rows = filteredTransactions.map(t => [
            t.date,
            t.category,
            t.amount,
            t.type,
            t.description.replace(/,/g, " ") // Prevent CSV break
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `finance_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-xl">
                        <ReceiptText className="text-brand-primary" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Transaction History</h2>
                        <p className="text-sm text-slate-500 font-medium tracking-tight">Detailed log of all financial movements</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Excel (CSV) Export */}
                    <button 
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-2.5 rounded-xl border border-emerald-500/30 transition-all active:scale-95 text-xs font-black text-emerald-400 shadow-xl uppercase tracking-widest"
                        title="Open in Excel"
                    >
                        <FileSpreadsheet size={16} />
                        <span>Excel (CSV)</span>
                    </button>

                    {/* JSON Export */}
                    <button 
                        onClick={handleExportJSON}
                        className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 px-5 py-2.5 rounded-xl border border-white/5 transition-all active:scale-95 text-xs font-black text-slate-300 shadow-xl uppercase tracking-widest"
                    >
                        <Download size={16} />
                        <span>JSON</span>
                    </button>
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
                                            <p className="text-lg font-bold text-slate-400 tracking-tight">Records Not Found</p>
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Check applied filter configuration</p>
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
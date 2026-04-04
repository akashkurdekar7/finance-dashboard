import { useState, useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { Trash2, ShoppingBag, ReceiptText, Calendar, Download, FileSpreadsheet, Edit3, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomSelect from "../components/ui/CustomSelect";
import { ArrowRightLeft } from "lucide-react";

/**
 * Standard Transactions Table Page
 */
const TransactionsTable = () => {
    const { filteredTransactions, deleteTransaction, editTransaction, permissions } = useFinance();
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [editingTxn, setEditingTxn] = useState(null);

    const typeOptions = [
        { value: "expense", label: "Expense (-)" },
        { value: "income", label: "Income (+)" }
    ];

    const sortedTransactions = useMemo(() => {
        let sortableItems = [...filteredTransactions];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];
                if (sortConfig.key === 'amount') {
                    aVal = Number(aVal);
                    bVal = Number(bVal);
                }
                if (aVal < bVal) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aVal > bVal) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredTransactions, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleExportJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sortedTransactions, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleExportCSV = () => {
        if (sortedTransactions.length === 0) return;

        const headers = ["Date", "Category", "Amount", "Type", "Description"];
        const rows = sortedTransactions.map(t => [
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

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingTxn.amount || isNaN(editingTxn.amount)) {
            alert('Please enter a valid amount');
            return;
        }
        editTransaction(editingTxn.id, {
            ...editingTxn,
            amount: parseFloat(editingTxn.amount)
        });
        setEditingTxn(null);
    };

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return <ArrowUpDown size={14} className="ml-1 inline opacity-40 group-hover:opacity-100" />;
        if (sortConfig.direction === 'asc') return <ArrowUp size={14} className="ml-1 inline text-brand-primary" />;
        return <ArrowDown size={14} className="ml-1 inline text-brand-primary" />;
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
                                <th onClick={() => requestSort('date')} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 italic cursor-pointer group hover:bg-slate-800/50 transition-colors">
                                    Date <SortIcon columnKey="date" />
                                </th>
                                <th onClick={() => requestSort('category')} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 cursor-pointer group hover:bg-slate-800/50 transition-colors">
                                    Category <SortIcon columnKey="category" />
                                </th>
                                <th onClick={() => requestSort('amount')} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right cursor-pointer group hover:bg-slate-800/50 transition-colors">
                                    Amount <SortIcon columnKey="amount" />
                                </th>
                                <th onClick={() => requestSort('type')} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 cursor-pointer group hover:bg-slate-800/50 transition-colors">
                                    Type <SortIcon columnKey="type" />
                                </th>
                                {(permissions.canEdit || permissions.canDelete) && <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-center">Action</th>}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-700/30">
                            {sortedTransactions.length > 0 ? (
                                sortedTransactions.map((t) => (
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
                                            {t.type === 'income' ? '+' : '-'} ₹{Number(t.amount).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${t.type === 'income' ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : 'bg-red-400/10 text-red-400 border border-red-400/20'}`}>
                                                {t.type}
                                            </span>
                                        </td>

                                        {(permissions.canEdit || permissions.canDelete) && (
                                            <td className="px-6 py-5 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {permissions.canEdit && (
                                                        <button
                                                            onClick={() => setEditingTxn(t)}
                                                            className="p-2.5 text-slate-500 hover:text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-all active:scale-90"
                                                            title="Edit TXN"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                    )}
                                                    {permissions.canDelete && (
                                                        <button
                                                            onClick={() => deleteTransaction(t.id)}
                                                            className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all active:scale-90"
                                                            title="Remove TXN"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={(permissions.canEdit || permissions.canDelete) ? 5 : 4} className="px-6 py-24 text-center">
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

            {/* Edit Modal */}
            <AnimatePresence>
                {editingTxn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-3xl overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-slate-900 w-full max-w-md p-10 rounded-[3rem] border border-white/10 shadow-3xl relative overflow-visible my-auto"
                        >
                            <header className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-brand-primary/20 rounded-2xl">
                                        <Edit3 className="text-brand-primary" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-white tracking-tight">Edit Entry</h3>
                                </div>
                                <button onClick={() => setEditingTxn(null)} className="p-3 hover:bg-white/5 rounded-full transition-colors group">
                                    <X size={24} className="text-slate-500 group-hover:rotate-90 transition-transform" />
                                </button>
                            </header>

                            <form onSubmit={handleEditSubmit} className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Direction</label>
                                        <CustomSelect
                                            options={typeOptions} value={editingTxn.type} icon={ArrowRightLeft}
                                            onChange={(val) => setEditingTxn({ ...editingTxn, type: val })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Timestamp</label>
                                        <input
                                            type="date" required value={editingTxn.date} onChange={(e) => setEditingTxn({ ...editingTxn, date: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700/50 p-4 rounded-2xl text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Classification</label>
                                    <input
                                        type="text" placeholder="e.g. Salary, Housing, Food" required value={editingTxn.category} onChange={(e) => setEditingTxn({ ...editingTxn, category: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Description</label>
                                    <input
                                        type="text" placeholder="Optional details..." value={editingTxn.description || ""} onChange={(e) => setEditingTxn({ ...editingTxn, description: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-sm font-bold text-slate-200 outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Valuation (₹)</label>
                                    <input
                                        type="number" placeholder="0.00" required value={editingTxn.amount} onChange={(e) => setEditingTxn({ ...editingTxn, amount: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700/50 p-5 rounded-[1.5rem] text-3xl font-extrabold text-brand-primary outline-none focus:ring-2 focus:ring-brand-primary shadow-inner"
                                    />
                                </div>

                                <button type="submit" className="w-full py-5 bg-brand-primary text-slate-950 rounded-[1.5rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs">
                                    Save Record
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TransactionsTable;
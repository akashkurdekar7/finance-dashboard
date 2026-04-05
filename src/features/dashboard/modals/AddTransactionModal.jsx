import {motion, AnimatePresence} from "framer-motion";
import {X, ListPlus, ArrowRightLeft} from "lucide-react";
import CustomSelect from "../../../components/ui/CustomSelect";

const AddTransactionModal = ({
  open,
  onClose,
  newTxn,
  setNewTxn,
  onSubmit,
  typeOptions,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-3xl overflow-y-auto">
          <motion.div
            initial={{scale: 0.9, y: 20}}
            animate={{scale: 1, y: 0}}
            exit={{scale: 0.9, y: 20}}
            className="bg-slate-900 w-full max-w-md p-10 rounded-[3rem] border border-white/10 shadow-3xl relative my-auto">
            <header className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-primary/20 rounded-2xl">
                  <ListPlus className="text-brand-primary" size={24} />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  New Entry
                </h3>
              </div>

              <button onClick={onClose} className="cursor-pointer">
                <X className="text-slate-500" />
              </button>
            </header>

            <form onSubmit={onSubmit} className="space-y-6">
              <CustomSelect
                options={typeOptions}
                value={newTxn.type}
                icon={ArrowRightLeft}
                onChange={(val) => setNewTxn({...newTxn, type: val})}
              />

              <input
                type="text"
                placeholder="Category"
                value={newTxn.category}
                onChange={(e) =>
                  setNewTxn({...newTxn, category: e.target.value})
                }
                className="w-full p-3 rounded-xl bg-slate-800"
              />

              <input
                type="number"
                placeholder="Amount"
                value={newTxn.amount}
                onChange={(e) => setNewTxn({...newTxn, amount: e.target.value})}
                className="w-full p-3 rounded-xl bg-slate-800"
              />

              <button className="w-full bg-brand-primary py-3 rounded-xl font-bold">
                Add Transaction
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;

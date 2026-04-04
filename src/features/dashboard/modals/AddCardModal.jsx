import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard as CardIcon, Palette } from "lucide-react";
import CustomSelect from "../../../components/ui/CustomSelect";

const AddCardModal = ({
    open,
    onClose,
    newCard,
    setNewCard,
    onSubmit,
    cardTypeOptions,
    themeOptions,
}) => {
    const formatExpiry = (val) =>
        val.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{1,2})/, "$1/$2");
    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, "")          // only numbers
            .slice(0, 16)               // max 16 digits
            .replace(/(.{4})/g, "$1 ")  // add space every 4
            .trim();
    };
    return (
        <AnimatePresence>
            {open && (
                <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90">
                    <motion.div className="bg-slate-900 p-10 rounded-3xl w-full max-w-md">
                        <header className="flex justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">
                                Add Card
                            </h3>
                            <button onClick={onClose}>
                                <X />
                            </button>
                        </header>

                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">

                                <input
                                    placeholder="Card Holder"
                                    value={newCard.holder}
                                    onChange={(e) =>
                                        setNewCard({
                                            ...newCard,
                                            holder: e.target.value.toUpperCase()
                                        })
                                    }
                                    className="w-full p-3 bg-slate-800 rounded-xl"
                                />

                                <input
                                    placeholder="MM/YY"
                                    value={newCard.expiry}
                                    onChange={(e) =>
                                        setNewCard({
                                            ...newCard,
                                            expiry: formatExpiry(e.target.value)
                                        })
                                    }
                                    className="w-full p-3 bg-slate-800 rounded-xl"
                                />
                            </div>
                            <input
                                placeholder="Card Number"
                                value={newCard.cardNumber}
                                onChange={(e) =>
                                    setNewCard({
                                        ...newCard,
                                        cardNumber: formatCardNumber(e.target.value)
                                    })
                                }
                                className="w-full p-3 bg-slate-800 rounded-xl"
                            />

                            <CustomSelect
                                options={cardTypeOptions}
                                value={newCard.type}
                                icon={CardIcon}
                                onChange={(val) =>
                                    setNewCard({ ...newCard, type: val })
                                }
                            />

                            <CustomSelect
                                options={themeOptions}
                                value={newCard.theme}
                                icon={Palette}
                                onChange={(val) =>
                                    setNewCard({ ...newCard, theme: val })
                                }
                            />

                            <button className="w-full bg-brand-accent py-3 rounded-xl font-bold">
                                Add Card
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddCardModal;
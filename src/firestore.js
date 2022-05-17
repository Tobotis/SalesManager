import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";

export const isValidSale = ({ sale }) => {
  return sale?.id && sale?.date && sale?.people && sale?.slot;
};

export const addSale = async (sale) => {
  console.log(sale);
  const payload = {
    date: sale.date,
    slot: sale.slot,
    people: [],
    product: sale.product,
    notes: sale.notes,
    revenue: null,
    capacity: sale.capacity,
  };
  await addDoc(collection(firestore, "sales"), payload);
};

export const enterSale = async ({ sale, name }) => {
  const docRef = doc(firestore, "sales", sale.id);
  const payload = { ...sale, people: [...sale.people, name] };
  await setDoc(docRef, payload);
};

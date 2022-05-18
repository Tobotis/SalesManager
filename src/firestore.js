import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
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

export const editSale = async ({sale, id}) => {
  console.log(sale);
  const docRef = doc(firestore, "sales", id);
  const payload = sale;
  await setDoc(docRef, payload);
};

export const deleteSale = async (id) => {
  const docRef = doc(firestore, "sales", id);
  await deleteDoc(docRef);
};

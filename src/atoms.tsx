import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export let Categories: string[] = ["TO_DO", "DOING", "DONE"];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: Categories[0],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: Categories,
});

export const { persistAtom } = recoilPersist({
  key: "saveToDo",
  storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(toDo => toDo.category === category);
  },
});

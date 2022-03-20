import Category from "./models/Category";
import ItemList from "./models/ItemList";

export type RootStackParamList = {
  ChecklistScreen: { initItemLists: ItemList[] }; // XXX: Skal komme fra context
  ListLibraryScreen: undefined;
  ItemLibraryScreen: undefined;
  CategoryLibraryScreen: { categories: Category[] }; // XXX: Skal komme fra context
};
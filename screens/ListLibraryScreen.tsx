import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../types";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

import ItemList from "../models/ItemList";
import ListsView from "../components/ListsView";
import Item from "../models/Item";
import StorageService from "../services/StorageService";

type Props = BottomTabScreenProps<RootStackParamList, "ListLibraryScreen">;

export default function ListLibraryScreen({ route, navigation }: Props) {
  const [itemLists, setItemLists] = useState<ItemList[]>(
    route.params.initItemLists
  );

  const onDeleteList = (listId: string) => {
    setItemLists((prev) => {
      // tslint:disable-next-line: no-floating-promises
      StorageService.deleteItemList(listId);
      return prev.filter((item) => item.id !== listId);
    });
  };

  const onAddList = (listToAdd: ItemList) => {
    setItemLists((prev) => {
      // tslint:disable-next-line: no-floating-promises
      StorageService.saveItemList(listToAdd);
      return [...prev, listToAdd];
    });
  };

  const onEditList = (listToEdit: ItemList) => {
    setItemLists((prev) => {
      // tslint:disable-next-line: no-floating-promises
      StorageService.saveItemList(listToEdit);
      return prev.map((list) =>
        list.id === listToEdit.id ? listToEdit : list
      );
    });
  };

  return (
    <ListsView
      onDeleteList={onDeleteList}
      onAddList={onAddList}
      onEditList={onEditList}
      itemLists={itemLists}
    ></ListsView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "red",
    borderColor: "blue",
    borderWidth: 3,
  },
});

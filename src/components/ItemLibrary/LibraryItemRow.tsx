import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";

import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import LibraryItem from "../../models/LibraryItem";

import React, { useRef } from "react";
// import ItemList from "../models/ItemList";

interface Props {
  onDeleteButtonPress: (item: LibraryItem) => void;
  onItemPress: (item: LibraryItem) => void;
  item: LibraryItem;
  isLastElement?: boolean;
  hasPrevItemCategory: boolean;
  hasNextItemCategory: boolean;
}
// XXX: Lav generic component for  denne og ItemRow?

export default function ListRow({
  onDeleteButtonPress,
  onItemPress,
  item,
  isLastElement,
  hasPrevItemCategory,
  hasNextItemCategory,
}: Props) {
  const swipableRowRef = useRef<Swipeable | null>(null);

  // Resolve styles
  const container = [
    styles.containerBase,
    isLastElement ? styles.containerLast : null,
  ];

  const categoryStyle = [
    styles.categoryColorRectangleBase,
    hasPrevItemCategory && styles.categoryColorRectangleHasPrev,
    hasNextItemCategory && styles.categoryColorRectangleHasNext,
  ];

  // XXX: Ansvar?
  const confirmDelete = (itemToDelete: LibraryItem) => {
    return Alert.alert(
      `Are you sure you want to delete the item '${itemToDelete.title}' permanently?`,
      "",
      [
        {
          text: "Yes",
          onPress: () => {
            onDeleteButtonPress(itemToDelete);
          },
        },
        { text: "No", onPress: () => swipableRowRef.current?.close() },
      ]
    );
  };

  const renderSwipeToDelete = (
    progressAnimatedValue: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation
  ) => {
    return (
      <View style={styles.swipedRow}>
        <Animated.View>
          <TouchableOpacity onPress={() => confirmDelete(item)}>
            <Text style={styles.removeButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={(ref) => (swipableRowRef.current = ref)}
        renderRightActions={renderSwipeToDelete}
      >
        <View style={container}>
          <TouchableOpacity
            style={styles.itemTextButton}
            onPress={() => onItemPress(item)}
          >
            <Text style={styles.itemTitleBase}>{item.title}</Text>
            <View
              style={[categoryStyle, { backgroundColor: item.category?.color }]}
            ></View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  containerBase: {
    // backgroundColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,

    borderColor: "transparent",
    borderWidth: 1,
    borderTopColor: "#d5d8e3",
  },
  // Add a bottom border to the last item in the list
  containerLast: {
    borderBottomColor: "#d5d8e3",
  },
  itemTitleBase: {
    paddingTop: 7,
    paddingBottom: 7,
    // backgroundColor: "red",
    color: "#454a52",
    fontSize: 20,
  },
  itemTextButton: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },
  swipedRow: {
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "white",
    padding: 10,
    fontSize: 15,
  },

  categoryColorRectangleBase: {
    marginLeft: "auto",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 13,
    marginTop: 7,
    marginBottom: 7,
  },
  categoryColorRectangleHasPrev: {
    marginTop: -1,
    borderTopLeftRadius: 0,
  },
  categoryColorRectangleHasNext: {
    marginBottom: -1,
    borderBottomLeftRadius: 0,
  },
});

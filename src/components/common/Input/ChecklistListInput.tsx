import { ReactElement, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import Category from "../../../models/Category";
import CategoryPicker from "./CategoryPicker";
import CustomAutocomplete from "./MyAutocompleter";
import colors from "../../../config/colors";
import ListItem from "../../../models/ListItem";
import LibraryItem from "../../../models/LibraryItem";

// XXX: Genbrug fra ListInput
export enum InputMode {
  ADD,
  EDIT,
}

interface Props {
  categories: Category[];
  onCategoryPress: (category: Category) => void; // XXX: Kan vist rykkes!!
  chosenCategory: Category | null;
  inputMode: InputMode;
  text: string;
  onAddItemModeEnded: () => void;
  onSubmitAddItem: (item: ListItem) => void;
  onEditItemModeEnded: () => void;
  onSubmitEditItem: (text: string, category: Category | null) => void;
  libraryItems: LibraryItem[];
}

export default function ChecklistListInput({
  libraryItems,
  categories,
  onCategoryPress,
  chosenCategory,
  text,
  inputMode,
  onAddItemModeEnded,
  onSubmitAddItem,
  onEditItemModeEnded,
  onSubmitEditItem,
}: Props) {
  const textInputRef = useRef<TextInput | null>();
  const [currentInputText, setCurrentInputText] = useState<string>(text);

  const onAutocompleteItemPress = (libraryItem: LibraryItem) => {
    switch (inputMode) {
      case InputMode.ADD:
        // Clear text input after item submitted
        textInputRef?.current?.clear();
        // Notify and pass new item to parent
        onSubmitAddItem(ListItem.fromLibraryItem(libraryItem));
        break;

      case InputMode.EDIT:
        // Clear text input after item submitted
        textInputRef?.current?.clear();
        onSubmitEditItem(libraryItem.title, libraryItem.category);
        break;
    }
    setCurrentInputText("");
  };

  // Handle item submitted
  const handleSubmitAddItem = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    // Do nothing if empty text
    if (!event?.nativeEvent?.text || "") return;

    // Clear text input after item submitted
    textInputRef?.current?.clear();

    // Notify and pass new item to parent
    onSubmitAddItem(ListItem.fromNew(event.nativeEvent.text, chosenCategory));
    setCurrentInputText("");
  };

  // XXX: Genbrug fra add item func
  const handleSubmitEditItem = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    // Do nothing if empty text
    if (!event?.nativeEvent?.text || "") return;

    // Clear text input after item submitted
    textInputRef?.current?.clear();
    onSubmitEditItem(event.nativeEvent.text, chosenCategory);
    setCurrentInputText("");
  };

  const inputComponent = (() => {
    switch (inputMode) {
      case InputMode.ADD:
        return (
          <TextInput
            style={styles.inputField}
            placeholder="Add Item"
            // Focus from start
            autoFocus={true}
            onChangeText={(text) => setCurrentInputText(text)}
            // Keep focus even after submit
            blurOnSubmit={false}
            // Turn off add item mode if not focused on input
            onBlur={onAddItemModeEnded}
            ref={(ref) => (textInputRef.current = ref)}
            onSubmitEditing={handleSubmitAddItem}
          />
        );

      case InputMode.EDIT:
        return (
          <TextInput
            style={styles.inputField}
            // Focus from start
            autoFocus={true}
            defaultValue={text}
            onChangeText={(text) => setCurrentInputText(text)}
            // Turn off add item mode if not focused on input
            onBlur={onEditItemModeEnded}
            onSubmitEditing={handleSubmitEditItem}
          />
        );
    }
  })();

  return (
    <View>
      <View style={styles.inputContainer}>
        <View>{inputComponent}</View>
        {chosenCategory && ( // XXX: Component?
          <View
            style={[
              styles.categoryColorRectangle,
              { backgroundColor: chosenCategory.color },
            ]}
          ></View>
        )}
      </View>
      {currentInputText !== "" && (
        <CustomAutocomplete
          onItemPress={onAutocompleteItemPress}
          query={currentInputText}
          items={libraryItems}
        ></CustomAutocomplete>
      )}
      <CategoryPicker
        categories={categories}
        onCategoryPress={onCategoryPress}
      ></CategoryPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryColorRectangle: {
    // backgroundColor: "blue",
    marginLeft: "auto",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 13,
    marginTop: 7,
    marginBottom: 7,
  },
  inputContainer: {
    flexDirection: "row",
  },
  inputField: {
    // XXX: Evt. global style for dette og item text
    paddingTop: 7,
    paddingBottom: 7,
    color: colors.darkGrey,
    fontSize: 20,
  },
});

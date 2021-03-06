import Category from "../models/Category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShoppingItem from "../models/ShoppingItem";
import StorageService from "./StorageService";
import ShoppingList from "../models/ShoppingList";
import AppData from "../AppData";
import LibraryItem from "../models/LibraryItem";

export default class StorageTestDataInitializer {
  public static async seedTestData() {
    // Don't seed test data if storage already contains data.
    if ((await AsyncStorage.getAllKeys()).length > 0) {
      return;
    }

    console.log("Seeding test data....");

    const testColors = [
      "#C9F1C6",
      "#C4D5FE",
      "#FFFEE3",
      "#C9F4FE",
      "#FED3F1",
      "#FFB3C8",
      "#EB7474",
      "#FC6C85",
      "#1FDA6D",
      "#1F76DA",
      "#CC99FF",
      "#8ACDEA",
      "#C9E3AC",
      "#B8C5D6",
    ];

    const testCategories = [
      new Category("Meat", "#EB7474", 0),
      new Category("Fruit & Vegetables", "#1FDA6D", 1),
      new Category("Herbs & Spices", "#16F3B4", 2),
      new Category("Seafood", "#1F76DA", 3),
      new Category("Bread", "#F7E478", 4),
      new Category("Dairy", "#B8C5D6", 5),
      new Category("Condiments", "#CC99FF", 6),
    ];

    // Default library of items
    const testLibraryItems = [
      new LibraryItem("Toast", 0, testCategories[4]),
      new LibraryItem("Onions", 1, testCategories[1]),
      new LibraryItem("Ham", 2, testCategories[0]),
      new LibraryItem("Cheese", 3, testCategories[5]),
      new LibraryItem("Ketchup", 4, testCategories[6]),
      new LibraryItem("Oregano", 5, testCategories[2]),
      new LibraryItem("Carrots", 5, testCategories[1]),
      new LibraryItem("Beef", 5, testCategories[0]),
      new LibraryItem("Pulled Pork", 5, testCategories[0]),
      new LibraryItem("Herrings", 5, testCategories[3]),
      new LibraryItem("Milk", 5, testCategories[5]),
    ];
    await StorageService.saveLibraryItems(testLibraryItems);

    const testItems = [
      ShoppingItem.fromNew("Item1", 0, testCategories[0]),
      ShoppingItem.fromNew("Item2", 1, testCategories[1]),
      ShoppingItem.fromNew("Item3", 2),
    ];

    const testItems2 = [
      ShoppingItem.fromNew("Item11", 0, testCategories[0]),
      ShoppingItem.fromNew("Item22", 1, testCategories[2]),
      ShoppingItem.fromNew("Item33", 2, null),
    ];
    const testShoppingLists = [
      new ShoppingList("ShoppingList1", testItems, 0),
      new ShoppingList("ShoppingList2", testItems2, 1),
    ];

    const appData = new AppData(testShoppingLists[0].id);
    await StorageService.saveAppData(appData);
    await StorageService.saveCategories(testCategories);
    await StorageService.saveItemLists(testShoppingLists);
    console.log("Test data seeded!");
  }
}

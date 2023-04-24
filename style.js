import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  AndroidSafeAreaStyle: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    // backgroundColor: "rgba(255,255,255,0.5)",
  },
});

export default styles;

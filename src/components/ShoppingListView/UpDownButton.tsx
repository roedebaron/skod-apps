import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import colors from "../../config/colors";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  onButtonDown(event: GestureResponderEvent): void;
  onButtonUp(event: GestureResponderEvent): void;
  isUpButtonEnabled: boolean;
  isDownButtonEnabled: boolean;
}

export default function UpDownButton({
  onButtonUp,
  onButtonDown,
  isUpButtonEnabled,
  isDownButtonEnabled,
}: Props) {
  return (
    <View style={styles.upDownButtonContainer}>
      <TouchableOpacity onPress={onButtonUp} disabled={!isUpButtonEnabled}>
        <FontAwesome
          name="chevron-up"
          style={[styles.logo, !isUpButtonEnabled ? styles.logoDisabled : null]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onButtonDown} disabled={!isDownButtonEnabled}>
        <FontAwesome
          name="chevron-down"
          style={[
            styles.logo,
            !isDownButtonEnabled ? styles.logoDisabled : null,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  upDownButtonContainer: {
    marginLeft: "auto",
  },
  logo: {
    fontSize: 26,
    color: colors.lightGrey,
  },
  logoDisabled: {
    color: colors.lightGreyDisabled,
  },
});

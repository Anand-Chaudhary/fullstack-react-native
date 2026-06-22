import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center">
      <Text className="text-2xl text-center px-4 text-white">Home Screen</Text>
    </SafeAreaView>
  );
}
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center">
      <Redirect href="register" />
    </SafeAreaView>
  );
}

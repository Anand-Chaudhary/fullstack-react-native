import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { clearToken } from "../../services/auth.utils";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await clearToken();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* Header */}
      <View className="p-5 bg-white">
        <Text className="text-2xl font-bold">Profile</Text>
      </View>

      {/* Logout Button */}
      <View className="flex-1 px-4">
        <Pressable
          onPress={handleLogout}
          className="bg-red-600 py-4 rounded-xl mt-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

import { registerApi } from "@/src/services/api/auth.api";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleRegister = async () => {
  try {
    const res = await registerApi(email, password);

    if (res?.success && res?.token) {
      await SecureStore.setItemAsync("token", res.token);
      Toast.show({
        type: "success",
        text1: res?.message,
      })
      router.replace("/(tabs)/home");
    }
  } catch (error: Error | any) {
    console.error("Error Occured:", error?.message);
    Toast.show({
        type: "error",
        text1: error?.message || "Failed to register"
    })
  }
};

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 justify-center px-6">
      <View className="gap-4">
        <Text className="text-4xl font-bold text-white">
          Create Account
        </Text>

        <Text className="text-zinc-400 mb-4">
          Register to continue
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#71717a"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-zinc-800 text-white px-4 py-4 rounded-xl border border-zinc-700"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#71717a"
          secureTextEntry
          className="bg-zinc-800 text-white px-4 py-4 rounded-xl border border-zinc-700"
        />

        <TouchableOpacity
          onPress={handleRegister}
          className="bg-blue-600 py-4 rounded-xl mt-2"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Register
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center gap-1">
          <Text className="text-zinc-400">
            Already have an account?
          </Text>

          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-blue-500 font-semibold">
                Login
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
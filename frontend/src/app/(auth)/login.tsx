import { useState } from "react";
import { useRouter } from "expo-router";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { loginApi } from "@/src/services/api/auth.api";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return;

        try {
            setLoading(true);

            const res = await loginApi(email, password);

            if (res?.success && res?.token) {
                await SecureStore.setItemAsync("token", res.token);
                Toast.show({
                    type: "success",
                    text1: res?.message
                })
                router.replace("/(tabs)/home");
            }
        } catch (error: Error | any) {
            console.error("Login error:", error);
            Toast.show({
                type: "success",
                text1: error?.message
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-zinc-900 justify-center px-6">
            <View className="gap-4">
                <Text className="text-4xl font-bold text-white">
                    Welcome Back
                </Text>

                <Text className="text-zinc-400 mb-4">
                    Login to continue
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
                    onPress={handleLogin}
                    disabled={loading}
                    className="bg-blue-600 py-4 rounded-xl"
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center font-semibold text-lg">
                            Login
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/register")}
                >
                    <Text className="text-center text-zinc-400 mt-2">
                        Don&apos;t have an account?{" "}
                        <Text className="text-blue-500 font-semibold">
                            Register
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
    return (
        <SafeAreaView className="flex-1">
            <Text>Register Screen</Text>
            <Link href="/login" asChild>
                <TouchableOpacity className="p-5 mr-5 w-full bg-blue-200">
                    <Text className="text-center">Go to login</Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    )
}
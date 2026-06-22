import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen(){
    const router = useRouter();
    return(
        <SafeAreaView className="flex-1">
            <Text>Login Screen</Text>
                <TouchableOpacity onPress={()=>{router.push('/(tabs)/home')}} className="p-5 mr-5 w-full bg-blue-200">
                    <Text className="text-center">Go to home</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}
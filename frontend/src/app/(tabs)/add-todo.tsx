import { useState } from "react";
import { Text, View, TextInput, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import useTodos from "../../store/todos.store";

export default function AddTodo() {
    const router = useRouter();
    const { setTodos, loading } = useTodos();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        if (!title.trim()) {
            alert("Please enter a title");
            return;
        }

        await setTodos({ title, description });
        setTitle("");
        setDescription("");
        router.push("/home");
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-white mb-6">Add New Task</Text>

                <View className="space-y-4">
                    <View>
                        <Text className="text-gray-400 mb-2">Title</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="What needs to be done?"
                            placeholderTextColor="#9ca3af"
                            className="bg-gray-800 text-white p-4 rounded-xl border border-gray-700 focus:border-blue-500"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-400 mb-2">Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Add details (optional)"
                            placeholderTextColor="#9ca3af"
                            multiline
                            numberOfLines={4}
                            className="bg-gray-800 text-white p-4 rounded-xl border border-gray-700 focus:border-blue-500 h-32"
                        />
                    </View>
                </View>

                <View className="flex-1" />

                <Pressable
                    onPress={handleAddTodo}
                    disabled={loading}
                    className={`flex-row justify-center items-center py-4 rounded-xl ${
                        loading
                            ? "bg-gray-600"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-lg font-semibold">
                            Add Task
                        </Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

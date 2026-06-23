import { useState, useEffect } from "react";
import { Text, View, FlatList, Pressable, RefreshControl } from "react-native";
import { Checkbox } from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import useTodos from "../../store/todos.store";

type Todo = {
  id: string;
  title: string;
  description: string;
  status: "incomplete" | "complete";
};

export default function HomeScreen() {
  const router = useRouter();
  const { todos, fetchTodos, removeTodos, loading, error } = useTodos();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTodos();
    setRefreshing(false);
  };

  const toggleTodo = (id: string) => {
    // TODO: Implement toggle functionality when API supports it
    console.log("Toggle todo:", id);
  };

  const handleDeleteTodo = async (id: string) => {
    await removeTodos(id);
    setOpenMenuId(null);
  };

  const handleAddTodo = () => {
    router.push("/add-todo");
  };

  const formatTodos = (rawTodos: any[] | null): Todo[] => {
    if (!rawTodos) return [];
    return rawTodos.map((todo) => ({
      id: todo.id || todo._id,
      title: todo.title,
      description: todo.description || "",
      status: todo.status || "incomplete",
    }));
  };

  if (error) {
    return (
      <SafeAreaView>
        <Text>{error}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="p-5 bg-white">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">My Todos</Text>
          <Pressable
            onPress={handleAddTodo}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Add</Text>
          </Pressable>
        </View>
        {error && (
          <Text className="text-red-500 mt-2">Error: {error?.message}</Text>
        )}
      </View>

      <View className="flex-1 px-4 pt-4">
        {loading && todos === null ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-400">Loading todos...</Text>
          </View>
        ) : (
          <FlatList
            data={formatTodos(todos)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => {
              const isDone = item.status === "complete";
              const isOpen = openMenuId === item.id;

              return (
                <View className="bg-gray-800 p-4 rounded-2xl">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <Checkbox
                        value={isDone}
                        onValueChange={() => toggleTodo(item.id)}
                        color={isDone ? "#22c55e" : "#9ca3af"}
                      />

                      <Text
                        className={`ml-3 text-lg flex-1 ${isDone ? "text-gray-400 line-through" : "text-white"
                          }`}
                      >
                        {item.title}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() =>
                        setOpenMenuId(isOpen ? null : item.id)
                      }
                    >
                      <Text className="text-white text-xl px-2">⋯</Text>
                    </Pressable>
                  </View>

                  {isOpen && (
                    <View className="mt-3 bg-gray-700 rounded-xl overflow-hidden">
                      <Pressable className="p-3 border-b border-gray-600">
                        <Text className="text-white">Details</Text>
                      </Pressable>

                      <Pressable className="p-3 border-b border-gray-600">
                        <Text className="text-white">Edit</Text>
                      </Pressable>

                      <Pressable
                        className="p-3"
                        onPress={() => handleDeleteTodo(item.id)}
                      >
                        <Text className="text-red-400">Delete</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeTabs, Icon, Label, VectorIcon } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="home">
                <Label>Home</Label>
                <Icon
                    src={<VectorIcon family={MaterialCommunityIcons} name="home" />}
                />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Label>Profile</Label>
                <Icon
                    src={<VectorIcon family={MaterialCommunityIcons} name="account" />}
                />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="add-todo">
                <Label>Add Task</Label>
                <Icon
                    src={<VectorIcon family={MaterialCommunityIcons} name="clipboard-plus-outline" />}
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}
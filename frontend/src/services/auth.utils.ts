import * as SecureStore from "expo-secure-store";

export const getToken = async (): Promise<string | null> => {
    const token = await SecureStore.getItemAsync("token");
    return token;
};

export const storeToken = async (token: string): Promise<void> => {
    await SecureStore.setItemAsync("token", token);
};

export const clearToken = async (): Promise<void> => {
    await SecureStore.deleteItemAsync("token");
};

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync("token");
    const authenticated = !!token;
    return authenticated;
};

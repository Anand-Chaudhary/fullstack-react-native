import * as SecureStore from "expo-secure-store";

/**
 * Get the current auth token from SecureStore
 */
export const getToken = async (): Promise<string | null> => {
    const token = await SecureStore.getItemAsync("token");
    console.log("getToken - Token exists:", token ? "Yes" : "No");
    return token;
};

/**
 * Store the auth token in SecureStore
 */
export const storeToken = async (token: string): Promise<void> => {
    console.log("storeToken - Storing token:", token);
    await SecureStore.setItemAsync("token", token);
    console.log("storeToken - Token stored successfully");
};

/**
 * Clear the auth token from SecureStore (logout)
 */
export const clearToken = async (): Promise<void> => {
    console.log("clearToken - Clearing token");
    await SecureStore.deleteItemAsync("token");
    console.log("clearToken - Token cleared");
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync("token");
    const authenticated = !!token;
    console.log("isAuthenticated - Result:", authenticated);
    return authenticated;
};

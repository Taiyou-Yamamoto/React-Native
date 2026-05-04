export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
    console.warn('API URL が設定されていません！ .env を確認してください。');
}

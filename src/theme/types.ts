export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
    setMode: (mode: ThemeMode) => void;
}

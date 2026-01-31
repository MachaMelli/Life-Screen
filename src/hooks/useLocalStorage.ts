import { useState, useEffect } from 'react';
import { GUEST_STORAGE_KEY } from '@/lib/constants';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch {
            // Error reading from localStorage
        }
    }, [key]);

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {
            // Error writing to localStorage
        }
    };

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch {
            // Error removing from localStorage
        }
    };

    return [storedValue, setValue, removeValue] as const;
}

export function useGuestMode() {
    return useLocalStorage(GUEST_STORAGE_KEY, null);
}

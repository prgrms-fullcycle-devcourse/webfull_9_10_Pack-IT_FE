export const hasSessionItem = (key: string): boolean => {
    return sessionStorage.getItem(key) !== null;
  };
  
  export const setSessionItem = <T>(key: string, value: T): void => {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`[Session Error] 저장 실패 (key: ${key}):`, error);
    }
  };
  
  export const getSessionItem = <T>(key: string): T | null => {
    try {
      const value = sessionStorage.getItem(key);
      if (value === null) return null;
  
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
    } catch (error) {
      console.error(`[Session Error] 조회 실패 (key: ${key}):`, error);
      return null;
    }
  };
  
  export const removeSessionItem = (key: string): void => {
    sessionStorage.removeItem(key);
  };
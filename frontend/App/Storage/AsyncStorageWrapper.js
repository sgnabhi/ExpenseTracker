import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageWrapper {
    // Get data from AsyncStorage
    async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return( { "value" : JSON.parse(value) } );
        } catch (error) {
            console.error('AsyncStorageWrapper getItem error:', error);
            return( { "key" : key } )
        }
    }

    // Save data to AsyncStorage
    async setItem(key, value) {
        try {
            // Retrieve existing data
            const existingData = await AsyncStorage.getItem(key);

            if (existingData) {
                // Merge existing data with new data
                const mergedData = JSON.stringify([
                    ...JSON.parse(existingData),
                    value,
                ]);

                // Save the merged data back to AsyncStorage
                await AsyncStorage.setItem(key, mergedData);
            } else {
                // If no existing data, simply save the new data
                console.log( key );
                const newDataString = JSON.stringify( [ value ] );
                await AsyncStorage.setItem(key, newDataString);
            }
        } catch (error) {
            console.error('AsyncStorageWrapper setItem error:', error);
            throw error;
        }
    }

    // Remove data from AsyncStorage
    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('AsyncStorageWrapper removeItem error:', error);
            throw error;
        }
    }

    // Clear all data from AsyncStorage
    async clear() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('AsyncStorageWrapper clear error:', error);
            throw error;
        }
    }
        

    async getAllKeys() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch (error) {
            console.error('AsyncStorageWrapper getAllKeys error:', error);
            throw error;
        }
    }

    async multiGet(keys) {
        try {
            const values = await AsyncStorage.multiGet(keys);
            // In this example, we're parsing JSON. You might need additional error handling.
            return values.map(([key, value]) => [key, JSON.parse(value)]);
        } catch (error) {
            console.error('AsyncStorageWrapper multiGet error:', error);
            throw error;
        }
    }

    // Example: Get items where the key contains a specific substring
    async getItemsWithSubstring(substring) {
        try {
            const allKeys = await AsyncStorageWrapper.getAllKeys();
            const filteredKeys = allKeys.filter(key => key.includes(substring));
            const filteredItems = await AsyncStorageWrapper.multiGet(filteredKeys);
            return filteredItems;
        } catch (error) {
            console.error('AsyncStorageWrapper getItemsWithSubstring error:', error);
            throw error;
        }
    }
}

export default AsyncStorageWrapper;
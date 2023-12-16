export default class TypeChecker {
    isExists(key: string, object: any, type?: string): boolean {
        const isObjectKey = key in object;
        const isTypeCorrect = type ? typeof object[key] === type : true;

        return isObjectKey && isTypeCorrect;
    }

    isObject(type): boolean {
        return typeof type === 'object';
    }

    isTypePrimitive(type): boolean {
        return typeof type === 'boolean' ||
            typeof type === 'string' ||
            typeof type === 'number' ||
            typeof type === 'symbol' ||
            typeof type === 'function'
    }
}

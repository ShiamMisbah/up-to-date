export const checkFieldEmpty = (field: string): boolean => {
    if (field === null || field === undefined || field.trim() === "") {
        return false
    }
    return true
}
export function changeUser(name) {
    return {
        type: 'CHANGEUSER',
        user: name,
    }
}
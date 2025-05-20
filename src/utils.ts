const PATTERN_NAME = /\$NAME(?:\.([ul]))?/g
const PATTERN_ID = /\$ID(?:\.([f]))?/g

const VariableModifiers = {
    l: (text: string) => text.toLowerCase(),
    u: (text: string) => text.toUpperCase(),
    f: (number: number) => number.toLocaleString("fr-FR"),
}


export function formatMessage(message: string, name: string, id: number): string {
    return message
        .replaceAll(PATTERN_NAME, (_, mod: "l" | "u" | undefined) => (mod && VariableModifiers[mod](name) || name))
        .replaceAll(PATTERN_ID, (_, mod: "f" | undefined) => (mod && VariableModifiers[mod](id) || id).toString())
}

export function randomEntry<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

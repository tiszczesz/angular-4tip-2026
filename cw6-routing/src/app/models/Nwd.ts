
export class Nwd {

    public static calculateRec(a: number, b: number): number {
        if (b === 0) {
            return a;
        }
        return this.calculateRec(b, a % b);
    }
    public static calculateIter(a: number, b: number): number {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}


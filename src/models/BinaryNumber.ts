
/**
 * Represents a signed binary number.
 */
export default class BinaryNumber {
    bits: boolean[];

    constructor(bits: boolean[]) {
        this.bits = bits;
    }

    /**
     * Shifts the binary number to the right.
     * @returns {boolean} The bit that was shifted out.
     */
    rightShift(newBit?: boolean) {
        const bit = this.bits.pop();
        this.bits.unshift(newBit === undefined ? this.bits[0] : newBit);
        return bit ?? false;
    }

    /**
     * Returns the binary number as a string.
     * @returns {string} The binary number as a string.
     */
    toString(): string {
        return this.bits.map((bit) => bit ? "1" : "0").join("");
    }

    /**
     * Gets the last bit of the binary number.
     * @returns {boolean} The last bit of the binary number.
     */
    lastBit(): boolean {
        return this.bits[this.bits.length - 1];
    }

    /**
     * Converts a decimal number to a binary number.
     * @param decimal - The decimal value of the binary number.
     * @param size - The size of the binary number.
     * @returns {BinaryNumber} The binary number.
     */
    static fromDecimal(decimal: number, size: number): BinaryNumber {
        const bits = [];
        for (let i = 0; i < size; i++) {
            bits.unshift((decimal & (1 << i)) !== 0);
        }
        return new BinaryNumber(bits);
    }

    /**
     * Returns the signed decimal value of the binary number.
     * @returns {number} The decimal value of the binary number.
     */
    toDecimal(): number {
        let decimal = 0;
        for (let i = this.bits.length - 1; i >= 0; i--) {
            if (this.bits[i]) {
                decimal += 1 << (this.bits.length - 1 - i);
            }
        }
        if (this.bits[0]) {
            decimal -= 1 << this.bits.length;
        }
        return decimal;
    }

    /**
     * Copies the binary number.
     * @returns {BinaryNumber} A copy of the binary number.
     */
    copy() {
        return new BinaryNumber(this.bits.slice());
    }

    /**
     * Adds two binary numbers.
     * @param a - Binary number a
     * @param b - Binary number b
     * @returns {BinaryNumber} The sum of the two binary numbers.
     */
    static add(a: BinaryNumber, b: BinaryNumber): BinaryNumber {
        const bits = [];
        let carryBit = false;
        for (let i = a.bits.length - 1; i >= 0; i--) {
            const bitA = a.bits[i];
            const bitB = b.bits[i];
            bits.unshift(bitA !== bitB !== carryBit);
            carryBit = (bitA && bitB) || (bitA && carryBit) || (bitB && carryBit);
        }
        return new BinaryNumber(bits);
    }

    /**
     * Subtracts two binary numbers.
     * @param a - Binary number a
     * @param b - Binary number b
     * @returns {BinaryNumber} The difference of the two binary numbers.
     */
    static subtract(a: BinaryNumber, b: BinaryNumber): BinaryNumber {
        const bits = [];
        let carryBit = false;
        for (let i = a.bits.length - 1; i >= 0; i--) {
            const bitA = a.bits[i];
            const bitB = b.bits[i];
            bits.unshift(bitA !== bitB !== carryBit);
            carryBit = (!bitA && bitB) || (!bitA && carryBit) || (bitB && carryBit);
        }
        return new BinaryNumber(bits);
    }

    /**
     * Merges two binary numbers.
     * @param a - BinaryNumber a
     * @param b - BinaryNumber b
     * @returns {BinaryNumber} The merged binary number.
     */
    static merge(a: BinaryNumber, b: BinaryNumber): BinaryNumber {
        return new BinaryNumber(a.bits.concat(b.bits));
    }
}

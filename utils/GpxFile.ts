export default class GpxFile {

    // ----- Private attributes ----- //

    private name: string;

    private data: string;

    // ----- Public methods ----- //

    public constructor(name: string, data: string) {
        this.name = name;
        this.data = data;
    }

    public getName(): string {
        return this.name;
    }

    public getNameWithoutExtension(): string {
        return this.name.replace(/\.[a-z0-9]$/i, "");
    }

    /**
     * Get the size of the uncompressed file in bytes.
     * @returns The size in bytes.
     */
    public getSize(): number {
        return this.data.length;
    }
}
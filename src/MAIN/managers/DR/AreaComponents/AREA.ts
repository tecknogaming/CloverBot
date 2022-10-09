export default class AREA {
    public declare id: string
    public declare data: any

    constructor(id: string, metadata?: any) {
        this.id = id
        this.data = metadata
    }
}
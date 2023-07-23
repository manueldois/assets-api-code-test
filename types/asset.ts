export interface Asset {
    id: number,
    name: string,
    data: Buffer,
    size: number,
    createdAt: Date,
    encoding: string,
    mimetype: string
}

export type NewAsset = Omit<Asset, 'id'>

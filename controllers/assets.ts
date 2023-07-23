import { UploadedFile } from "express-fileupload"
import { client } from "../getDbClient"
import { NewAsset } from "../types/asset"

export const postAsset = async (req, res) => {
    if (!req.files) {
        res.status(400).json({ error: "No form encoded files provided" })
        return
    }

    const assets = (Object.values(req.files) as Array<any>)
        .map((f: UploadedFile) => {
            return {
                data: f.data,
                encoding: f.encoding,
                mimetype: f.mimetype,
                name: f.name,
                size: f.size,
                createdAt: new Date()
            }
        })

    const insertAsset = async (a: NewAsset) => {
        try {
            const newAsset = await client.query(`
          INSERT INTO assets (name, data, size, encoding, mimetype, createdAt)
          VALUES (
            $1, $2, $3, $4, $5, $6
          )
          RETURNING id;
        `, [
                a.name,
                a.data,
                a.size,
                a.encoding,
                a.mimetype,
                a.createdAt
            ])
            return { id: newAsset.rows[0].id, name: a.name }
        } catch (error) {
            return { name: a.name, error }
        }
    }

    const isImageOrVideo = (f: NewAsset) => ['image', 'video'].includes(f.mimetype.split('/')[0])

    const newAssets = await Promise.allSettled(assets.filter(isImageOrVideo).map(insertAsset))

    res.json(newAssets.map(p => p['value']))

    return

}

export const getAssetById = async (req, res) => {
    const { id } = req.params

    const query = await client.query(`
    SELECT "data", "mimetype" FROM assets WHERE "id" = $1
  `, [id])

    const asset = query.rows[0]

    if (!asset || !asset.mimetype || !asset.data) {
        res.sendStatus(404)
        return
    }

    res.setHeader('mimetype', asset.mimetype)
    res.send(asset.data)
    return
}
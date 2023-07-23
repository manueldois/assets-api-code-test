import 'dotenv/config'
import { beforeEach, beforeAll, describe, expect, vi, it } from 'vitest';
import request from 'supertest'
import app from '..';
import path from 'path';
import { client } from '../getDbClient';
import { writeFile, readFile } from 'fs/promises';

describe('API Integration Tests', () => {
    beforeAll(async () => {
        await client.connect()
        await client.query(`TRUNCATE assets RESTART IDENTITY`)
    })

    it('Says hi', async () => {
        return request(app).get('/').expect({ info: 'App is running!' })
    })

    it('Uploads and gets an asset (image)', async () => {
        const img = await readFile('./tests/test_pic_1.jpg')
        const resPost = await request(app)
            .post('/assets')
            .set("Content-Type", "multipart/form-data")
            .attach("file1", path.resolve(__dirname, "./test_pic_1.jpg"))

        expect(resPost.status).toBe(200)
        expect(resPost.body[0]).toMatchObject({ id: 1, name: "test_pic_1.jpg" })

        const resGet = await request(app)
            .get('/assets/1')
            .responseType('blob')

        await writeFile('./tests/test_pic_1_response.jpg', resGet.body)

        const isSameFile = resGet.body.toString() === img.toString()
        expect(isSameFile).toBeTruthy()
        expect(resGet.headers["mimetype"]).toEqual("image/jpeg");
        expect(resGet.headers["content-type"]).toEqual("application/octet-stream");
    })

    it('Rejects assets of type other than image or video', async () => {
        const resPost = await request(app)
            .post('/assets')
            .set("Content-Type", "multipart/form-data")
            .attach("file1", path.resolve(__dirname, "./invalid_type.docx"))

        expect(resPost.status).toBe(200)
        expect(resPost.body).toHaveLength(0)
    })
})
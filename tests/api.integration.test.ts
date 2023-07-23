import 'dotenv/config'
import { beforeEach, beforeAll, describe, expect, vi, it } from 'vitest';
import request from 'supertest'
import app from '..';

describe('API Integration Tests', () => {
    it('Says hi', async () => {
        return request(app).get('/').expect({ info: 'App is running!' })
    })
})
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['./tests/**/*.integration.{test,spec}.?(c|m)[jt]s?(x)']
  },
})
// jest.ui.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.ui.setup.ts'],

  testMatch: [
    '<rootDir>/lib/**/*.test.ts',
    '<rootDir>/components/**/*.test.tsx',
    '<rootDir>/app/**/?(*.)+(test).tsx',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },

  // 🔧 Главное место: компиляция TS/TSX с нужным JSX-режимом
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',   // вместо "preserve"
          module: 'commonjs', // чтобы Jest мог импортировать
        },
      },
    ],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  transformIgnorePatterns: ['/node_modules/(?!(@supabase|@tonconnect)/)'],
};

export default config;

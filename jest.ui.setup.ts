import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { TextEncoder, TextDecoder } from 'node:util';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;
(global as any).alert = jest.fn();

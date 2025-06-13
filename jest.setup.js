import "whatwg-fetch";
import "setimmediate";
import "@testing-library/jest-dom";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));

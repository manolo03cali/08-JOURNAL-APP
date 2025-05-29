// Matchers personalizados como toBeInTheDocument()
import "@testing-library/jest-dom";
//import "setimmediate";

// Fetch API si lo usas
import "whatwg-fetch";

// Fix para TextEncoder/TextDecoder en entorno de pruebas
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

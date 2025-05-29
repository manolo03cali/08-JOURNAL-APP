module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // opcional para evitar errores al importar estilos
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

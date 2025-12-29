import "@testing-library/jest-dom";

// Set consistent timezone and locale for tests
process.env.TZ = "UTC";

// Mock Intl.DateTimeFormat to use consistent locale (pt-BR)
const originalDateTimeFormat = Intl.DateTimeFormat;
jest.spyOn(Intl, "DateTimeFormat").mockImplementation((locale, options) => {
  return new originalDateTimeFormat("pt-BR", options);
});

// Mock Intl.NumberFormat to use consistent locale (pt-BR)
const originalNumberFormat = Intl.NumberFormat;
jest.spyOn(Intl, "NumberFormat").mockImplementation((locale, options) => {
  return new originalNumberFormat("pt-BR", options);
});

// Mock matchMedia for themeMode
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

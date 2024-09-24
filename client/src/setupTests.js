jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/messaging', () => ({
  getMessaging: jest.fn(),
  getToken: jest.fn(),
  onMessage: jest.fn(),
}));

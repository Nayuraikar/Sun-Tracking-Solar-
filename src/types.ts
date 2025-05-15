export type UsageType = 'residential' | 'school' | 'office';

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface ArduinoData {
  ldr1Value: number;
  ldr2Value: number;
  servoPosition: number;
  timestamp: number;
}

export interface BatterySuggestion {
  capacityKWh: number;
  description: string;
}

// Web Serial API types
declare global {
  interface Navigator {
    serial: {
      requestPort(options?: { filters: Array<{ usbVendorId: number }> }): Promise<SerialPort>;
    };
  }

  interface SerialPort {
    readable: ReadableStream;
    writable: WritableStream;
    open(options: { baudRate: number }): Promise<void>;
    close(): Promise<void>;
  }
}
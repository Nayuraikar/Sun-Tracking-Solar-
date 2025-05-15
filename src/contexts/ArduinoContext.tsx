import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ArduinoData } from '../types';

interface ArduinoContextType {
  connected: boolean;
  connecting: boolean;
  connect: () => void;
  disconnect: () => void;
  ldr1Value: number;
  ldr2Value: number;
  servoPosition: number;
  data: ArduinoData[];
}

const ArduinoContext = createContext<ArduinoContextType>({
  connected: false,
  connecting: false,
  connect: () => {},
  disconnect: () => {},
  ldr1Value: 0,
  ldr2Value: 0,
  servoPosition: 90,
  data: [],
});

export const useArduino = () => useContext(ArduinoContext);

interface ArduinoProviderProps {
  children: ReactNode;
}

export const ArduinoProvider: React.FC<ArduinoProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [port, setPort] = useState<SerialPort | null>(null);
  const [reader, setReader] = useState<ReadableStreamDefaultReader | null>(null);
  const [ldr1Value, setLdr1Value] = useState(0);
  const [ldr2Value, setLdr2Value] = useState(0);
  const [servoPosition, setServoPosition] = useState(90);
  const [data, setData] = useState<ArduinoData[]>(
    Array(20).fill({ ldr1Value: 0, ldr2Value: 0, servoPosition: 90, timestamp: Date.now() })
  );

  useEffect(() => {
    if (connected && port) {
      const readData = async () => {
        try {
          const textDecoder = new TextDecoderStream();
          port.readable.pipeTo(textDecoder.writable);
          const readableStreamDefaultReader = textDecoder.readable.getReader();

          while (true) {
            const { value, done } = await readableStreamDefaultReader.read();
            if (done) {
              break;
            }
            
            // Parse the incoming data
            const lines = value.split('\n');
            for (const line of lines) {
              if (line.startsWith('LDR1: ')) {
                const match = line.match(/LDR1: (\d+)\s+\|\s+LDR2: (\d+)/);
                if (match) {
                  const ldr1 = parseInt(match[1]);
                  const ldr2 = parseInt(match[2]);
                  setLdr1Value(ldr1);
                  setLdr2Value(ldr2);
                  
                  // Update data history
                  setData(prevData => {
                    const newData = [...prevData.slice(1), {
                      ldr1Value: ldr1,
                      ldr2Value: ldr2,
                      servoPosition,
                      timestamp: Date.now()
                    }];
                    return newData;
                  });
                }
              }
            }
          }
        } catch (error) {
          console.error('Error reading from Arduino:', error);
          disconnect();
        }
      };

      readData();
    }
  }, [connected, port, servoPosition]);

  const connect = async () => {
    try {
      setConnecting(true);
      
      // Request port with Arduino USB vendor ID
      const selectedPort = await navigator.serial.requestPort({
        // Arduino Uno vendor ID
        filters: [{ usbVendorId: 0x2341 }]
      });
      
      // Open the port with 9600 baud rate
      await selectedPort.open({ baudRate: 9600 });
      
      setPort(selectedPort);
      setConnected(true);
      
    } catch (error) {
      console.error('Failed to connect:', error);
      setConnected(false);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      if (reader) {
        await reader.cancel();
      }
      if (port) {
        await port.close();
      }
      
      setConnected(false);
      setPort(null);
      setReader(null);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const value = {
    connected,
    connecting,
    connect,
    disconnect,
    ldr1Value,
    ldr2Value,
    servoPosition,
    data,
  };

  return (
    <ArduinoContext.Provider value={value}>
      {children}
    </ArduinoContext.Provider>
  );
};
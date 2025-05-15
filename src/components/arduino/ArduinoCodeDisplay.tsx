import React from 'react';

const ArduinoCodeDisplay: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-200 p-4 rounded-md overflow-auto text-sm font-mono max-h-96">
      <pre className="whitespace-pre-wrap">
{`#include <Servo.h>

#define LDR1 A0
#define LDR2 A1
#define error 10
int Spoint =  90;

Servo servo;

void setup() {
  Serial.begin(9600);  // Start serial monitor
  servo.attach(11);
  servo.write(Spoint);
  delay(1000);
}

void loop() {
  int ldr1 = analogRead(LDR1);
  int ldr2 = analogRead(LDR2);

  Serial.print("LDR1: ");
  Serial.print(ldr1);
  Serial.print("  |  LDR2: ");
  Serial.println(ldr2);

  int value1 = abs(ldr1 - ldr2);
  int value2 = abs(ldr2 - ldr1);

  if ((value1 > error) || (value2 > error)) {
    if (ldr1 > ldr2) {
      Spoint = --Spoint;
    }
    if (ldr1 < ldr2) {
      Spoint = ++Spoint;
    }
    servo.write(Spoint);
    delay(80);
  }

  delay(500); // Slower serial printing
}`}
      </pre>
    </div>
  );
};

export default ArduinoCodeDisplay;
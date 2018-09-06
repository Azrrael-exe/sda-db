#include <Arduino.h>
#include <ArduinoJson.h>

long t = 100000;

void setup() {
    Serial.begin(115200);
}

void loop() {
    if(abs(millis() - t) > 60000 ){
        t = millis();
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& res = jsonBuffer.createObject();
        res["value"] = analogRead(A0);
        String out;
        res.printTo(out);
        Serial.println(out);
    }
}
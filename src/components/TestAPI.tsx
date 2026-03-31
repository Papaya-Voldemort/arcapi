"use client";

import { useState } from "react";
import styles from "./TestAPI.module.css";

export default function TestAPI({ endpoint }: { endpoint: string }) {
  const [output, setOutput] = useState<string>(
    "Test the API by clicking the button below!",
  );
  return (
    <div className={styles.container}>
      <h1>Test API</h1>
      <p>{endpoint}</p>
      <code id="output">{output}</code>
      <button
        className={styles.testButton}
        type="button"
        onClick={() => {
          fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
              setOutput(JSON.stringify(data, null, 2));
            })
            .catch((error) => {
              setOutput(JSON.stringify(error, null, 2));
            });
        }}
      >
        Test Now!
      </button>
    </div>
  );
}

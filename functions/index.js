import { onObjectFinalized } from "firebase-functions/v2/storage";
import * as logger from "firebase-functions/logger";
import vision from "@google-cloud/vision";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const MAIL_COLLECTION = "result";

// Initialize Firebase app and Firestore
initializeApp();
const firestore = getFirestore();

export const readMailDetails = onObjectFinalized(
  {
    region: "asia-east1",
  },
  async (event) => {
    const object = event.data;
    const imageBucket = `gs://${object.bucket}/${object.name}`;
    // 檢查圖片大小
    if (object.size <= 0) return await markFileAsCorrupt(imageBucket);

    const client = new vision.ImageAnnotatorClient();
    const [textDetections] = await client.textDetection(imageBucket);
    const [annotation] = textDetections.textAnnotations;
    const text = annotation ? annotation.description : "";
    logger.log(annotation);
    logger.log(text);

    const textJSON = JSON.stringify(text);

    const result = {
      result: textJSON,
    };

    await firestore.collection(MAIL_COLLECTION).add(result);
  }
);

async function markFileAsCorrupt(filePath) {
  // 在 Firestore 中紀錄損毀圖片訊息
  const docRef = firestore.collection("corruptFiles").doc();
  await docRef.set({
    filePath: filePath,
    timestamp: firestore.FieldValue.serverTimestamp(),
    status: "corrupt",
  });
}

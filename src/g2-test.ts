import { createNepaliImage } from "./nepali-image";
import {
  waitForEvenAppBridge,
  TextContainerProperty,
  ImageContainerProperty,
} from "@evenrealities/even_hub_sdk";

export async function testG2Connection() {
  try {
    const bridge = await waitForEvenAppBridge();

    const result = await bridge.createStartUpPageContainer({
      containerTotalNum: 2,
      textObject: [
        new TextContainerProperty({
          containerID: 1,
          containerName: "hello-g2",
          xPosition: 0,
          yPosition: 0,
          width: 576,
          height: 288,
          content: "",
          isEventCapture: 1,
          zOrderIndex: 1,
        }),
      ],
     imageObject: [
  new ImageContainerProperty({
    containerID: 2,
    containerName: "nepali-img",
    xPosition: 144,
    yPosition: 72,
    width: 288,
    height: 144,
    zOrderIndex: 2,
  }),
], 
    });

const nepaliPixels = createNepaliImage();

await bridge.updateImageRawData({
  containerID: 2,
  containerName: "nepali-img",
  imageData: nepaliPixels,
});
    
    console.log("G2 display result:", result);
    return true;
  } catch (error) {
    console.error("G2 display failed:", error);
    return false;
  }
}

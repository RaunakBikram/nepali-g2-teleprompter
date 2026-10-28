
import {
  waitForEvenAppBridge,
  TextContainerProperty,
} from "@evenrealities/even_hub_sdk";

export async function testG2Connection() {
  try {
    const bridge = await waitForEvenAppBridge();

    const result = await bridge.createStartUpPageContainer({
      containerTotalNum: 1,
      textObject: [
        new TextContainerProperty({
          containerID: 1,
          containerName: "hello-g2",
          xPosition: 0,
          yPosition: 0,
          width: 576,
          height: 288,
          content: "नमस्कार नेपाल",
          isEventCapture: 1,
        }),
      ],
    });

    console.log("G2 display result:", result);
    return true;
  } catch (error) {
    console.error("G2 display failed:", error);
    return false;
  }
}

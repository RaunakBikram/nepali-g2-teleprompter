import { createNepaliImage } from "./nepali-image";
import {
  waitForEvenAppBridge,
  TextContainerProperty,
  ImageContainerProperty,
  OsEventTypeList,
} from "@evenrealities/even_hub_sdk";

export async function testG2Connection() {
  let currentPage = 0;
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
bridge.onEvenHubEvent((event) => {
  console.log("G2/R1 event:", event);
  const eventType = event.textEvent?.eventType;
  
if (eventType === OsEventTypeList.SCROLL_TOP_EVENT) {
  currentPage++;
  console.log("Next page:", currentPage);
}
  if (eventType === OsEventTypeList.SCROLL_BOTTOM_EVENT) {
  currentPage = Math.max(0, currentPage - 1);
  console.log("Previous page:", currentPage);
  }
  if (
  eventType === OsEventTypeList.SCROLL_TOP_EVENT ||
  eventType === OsEventTypeList.SCROLL_BOTTOM_EVENT
) {
  void bridge.updateImageRawData({
    containerID: 2,
    containerName: "nepali-img",
    imageData: createNepaliImage(currentPage),
  }).catch((error) => {
    console.error("Page update failed:", error);
  });
  }
});
const nepaliPixels = createNepaliImage(currentPage);
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

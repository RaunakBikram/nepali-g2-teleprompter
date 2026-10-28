import { waitForEvenAppBridge } from "@evenrealities/even_hub_sdk";

export async function testG2Connection() {
  try {
    const bridge = await waitForEvenAppBridge();
    console.log("Even G2 bridge connected", bridge);
    return true;
  } catch (error) {
    console.error("G2 connection failed", error);
    return false;
  }
}

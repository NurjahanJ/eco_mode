import { ConvexProvider, ConvexReactClient } from "convex/react";

// Create a Convex client
const convexUrl = process.env.REACT_APP_CONVEX_URL || "https://relaxed-otter-24.convex.cloud";
export const convexClient = new ConvexReactClient(convexUrl);

// Export the ConvexProvider for use in the app
export function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Table to store user information
  users: defineTable({
    userId: v.string(), // Unique user ID
  }),

  // Table to store prompts and responses with EcoMode state
  conversations: defineTable({
    userId: v.string(), // Reference to the user who sent the prompt
    prompt: v.string(), // The user's prompt content
    response: v.string(), // The AI's response content
    ecoModeActive: v.boolean(), // Whether EcoMode was active for this response
    // Using Convex's built-in _creationTime field instead of custom timestamp
  }),
});

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { nanoid } from "nanoid";

// Create a new user or retrieve existing user ID from storage
export const getOrCreateUser = mutation({
  args: {},
  handler: async (ctx) => {
    // Generate a unique ID
    const userId = nanoid(10);
    
    // Store the user in the database
    await ctx.db.insert("users", {
      userId,
    });
    
    return userId;
  },
});

// Get user by ID
export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
  },
});

// Get all users (admin function)
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .collect();
  },
});

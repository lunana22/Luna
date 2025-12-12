try {
  console.log("Resolved:", require.resolve("@luna/queries"));
} catch (e) {
  console.error("Failed:", e.message);
}

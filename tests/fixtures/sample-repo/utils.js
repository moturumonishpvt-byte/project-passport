function calculateSum(a, b) {
  return a + b;
}

function formatMessage(msg) {
  return `[SAMPLE] ${msg}`;
}

function orphanHelper() {
  // Synthetic unreferenced function for Phase 4 dead-code detection
  return 'unused';
}

module.exports = {
  calculateSum,
  formatMessage,
  orphanHelper,
};

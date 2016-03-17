/**
 * dartboard initialization -- DB & Metadata
 */

export const numCPUs = process.env.PROCESSES || require('os').cpus().length;
export var db;

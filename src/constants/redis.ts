export const redis = {
  port: Number(process.env.REDIS_PORT!),
  host: "127.0.0.1",
  maxRetriesPerRequest: null,
};

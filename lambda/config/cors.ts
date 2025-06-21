const corsConfig = {
  origin: ["http://localhost:4200"],
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  exposedHeaders: ["Content-Type", "Authorization"],
};

export default corsConfig;

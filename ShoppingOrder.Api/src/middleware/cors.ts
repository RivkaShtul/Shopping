import cors from "cors";

const corsOptions = {
  origin: [process.env.CLIENT_URL || "http://localhost:5174"],
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Accept", "Origin"],
};

export default cors(corsOptions);

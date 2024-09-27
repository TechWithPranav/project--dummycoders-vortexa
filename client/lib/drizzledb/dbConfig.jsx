import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const sql = neon(
  "postgresql://healthcare_owner:18BjSPwrNAsE@ep-raspy-firefly-a5ho51jq.us-east-2.aws.neon.tech/healthcare?sslmode=require"
);

export const db = drizzle(sql, { schema });

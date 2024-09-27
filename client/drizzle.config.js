export default {
    dialect: 'postgresql', // Correct key name
    schema: './lib/drizzledb/schema.jsx',
    out: './drizzle',

    dbCredentials: {
        url: 'postgresql://healthcare_owner:18BjSPwrNAsE@ep-raspy-firefly-a5ho51jq.us-east-2.aws.neon.tech/healthcare?sslmode=require',
        connectionString: 'postgresql://healthcare_owner:18BjSPwrNAsE@ep-raspy-firefly-a5ho51jq.us-east-2.aws.neon.tech/healthcare?sslmode=require',
    },
};



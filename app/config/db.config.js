module.exports = {
  HOST: "ep-polished-sound-admrooii-pooler.c-2.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_n0jViKelm5Rv",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
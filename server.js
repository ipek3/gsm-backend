const express = require("express");
const cors = require("cors");
const { getConnection } = require("./db");
const oracledb = require("oracledb");

const app = express();

/* ✅ MIDDLEWARE (EN ÜSTTE OLACAK) */
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* LOG MIDDLEWARE */
app.use((req, res, next) => {
  console.log("🔥 REQUEST:", req.method, req.url);
  next();
});

/* BASE */
app.get("/", (req, res) => {
  res.send("GSM Backend çalışıyor 🚀");
});

/* LOGIN */
app.post("/login", async (req, res) => {

  console.log("🔥 LOGIN REQUEST:", req.body);

  const { username, password } = req.body;

  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
  `BEGIN login_users(:u, :p, :r, :id); END;`,
  {
    u: username,
    p: password,
    r: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
  }
);

console.log(result.outBinds.r);   // SUCCESS
console.log(result.outBinds.id);  // user_id

    const loginResult = result.outBinds.r;

    console.log("🔐 LOGIN RESULT:", loginResult);

    if (loginResult === "SUCCESS") {
      return res.json({ success: true });
    }

    return res.status(401).json({ success: false });

  } catch (err) {
    console.log("❌ LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  } finally {
    if (conn) await conn.close();
  }
});

/* PURCHASE SERVICE */
app.post("/purchase-service", async (req, res) => {

  console.log("🛒 PURCHASE REQUEST:", req.body);

  const { subscriberId, serviceId } = req.body;

  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `BEGIN purchase_service(:sid, :serid); END;`,
      {
        sid: subscriberId,
        serid: serviceId
      }
    );

    res.json({
      success: true,
      message: "Servis satın alındı"
    });

  } catch (err) {
    console.log("❌ PURCHASE ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  } finally {
    if (conn) await conn.close();
  }
});
/* GET ALL SERVICES */
app.get("/services", async (req, res) => {

  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT service_id, service_type, price, status 
       FROM services
       WHERE status = 'ACTIVE'`
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (err) {

    console.log("❌ SERVICES ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  } finally {
    if (conn) await conn.close();
  }
});
/* SERVER */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
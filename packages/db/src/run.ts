import { db } from "./db";
// import fs from "node:fs";
// import path from "node:path";

import { users } from "./schema";

(async function () {
  // await db.delete(users);

  const [useEntity] = await db
    .insert(users)
    .values({
      username: "perfectyang" + Math.random(),
      password: "1234567" + Math.random(),
    })
    .returning();
  console.log("useEntity", useEntity);
})();

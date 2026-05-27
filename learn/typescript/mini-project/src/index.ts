import type { User } from "./user.js";
import { formatUser } from "./user.js";

const demo: User = { id: 1, name: "Ada", email: "ada@ex.com" };
console.log(formatUser(demo));

export { demo };

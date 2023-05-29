const { execSync } = require("child_process")
const { join } = require("path")

module.exports = function() {
    execSync(`npx prisma generate`, { cwd: join(__dirname + "/../"), shell: true, stdio: "inherit" })
}
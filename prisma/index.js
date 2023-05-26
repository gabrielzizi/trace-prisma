const { execSync } = require("child_process")
const { join } = require("path")

module.exports = function generateSchema() {
    execSync(`npx prisma generate --schema=${join(process.cwd() + '/schema.prisma')}`, { cwd: join(__dirname + "/../"), shell: true, stdio: "inherit" })
}
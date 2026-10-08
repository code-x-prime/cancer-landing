module.exports = {
    apps: [
        {
            name: "cancer-landing",
            script: "/home/admin/.nvm/versions/node/v20.20.2/bin/npm",
            args: "start",
            cwd: "/home/admin/cancer-landing",

            env: {
                NODE_ENV: "production",
                PORT: 7000
            }
        }
    ]
};
module.exports = {
    apps: [
        {
            name: "cancer-landing",
            script: "pnpm",
            args: "start",
            cwd: "/root/fence-craft",

            env: {
                NODE_ENV: "production",
                PORT: 7000
            }
        }
    ]
};
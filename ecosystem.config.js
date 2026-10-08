module.exports = {
    apps: [
        {
            name: "cancer-landing",
            script: "npm",
            args: "start",
            cwd: "/root/cancer-landing$",

            env: {
                NODE_ENV: "production",
                PORT: 7000
            }
        }
    ]
};
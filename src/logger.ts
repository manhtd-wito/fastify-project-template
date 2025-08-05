const IS_ENV_LOCAL = process.env.NODE_ENV == 'local'

const loggerConfig = {
  level: 'info',
  serializers: {
    req(req: any) {
      return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        hostname: req.hostname,
        remoteAddress: req.ip,
      }
    },
    res(res: any) {
      return {
        statusCode: res.raw?.statusCode,
        responseTime: res.responseTime,
      }
    },
  },
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          destination: IS_ENV_LOCAL ? process.env.LOG_FILE : undefined,
          colorize: !IS_ENV_LOCAL,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: IS_ENV_LOCAL ? 'pid' : 'time,pid,hostname,reqId,req',
          messageFormat: `
            {if req}{req.remoteAddress} - - "{req.method} {req.url}" {req.headers.authorization}{end}
            {if res}{res.statusCode} - -{end}
          `,
          singleLine: true,
        },
      },
    ],
  },
}

export default loggerConfig

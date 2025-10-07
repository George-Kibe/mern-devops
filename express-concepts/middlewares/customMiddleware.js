const os = require('os');

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.get('User-Agent') || 'Unknown';
    console.log(`[${timestamp}] ${method} ${url} - User-Agent: ${userAgent}`);
    next();
}
const addTimestamp = (req, res, next) => {
    req.requestTime = new Date();
    next();
}

const detectClientArchitecture = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  let clientInfo = {
    os: 'Unknown',
    architecture: 'Unknown',
    raw: userAgent
  };

  if (/windows/i.test(userAgent)) {
    clientInfo.os = 'Windows';
  } else if (/macintosh/i.test(userAgent)) {
    clientInfo.os = 'macOS';
    // Apple Silicon Macs still report Intel
    clientInfo.architecture = /arm|apple silicon/i.test(userAgent)
      ? 'Apple Silicon (M1/M2/M3)'
      : 'Intel (spoofed or legacy string)';
  } else if (/linux/i.test(userAgent)) {
    clientInfo.os = 'Linux';
  } else if (/android/i.test(userAgent)) {
    clientInfo.os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    clientInfo.os = 'iOS';
  }

  console.log('Client Info:', clientInfo);
  req.clientInfo = clientInfo;
  next();
};

module.exports = { requestLogger, addTimestamp, detectClientArchitecture };
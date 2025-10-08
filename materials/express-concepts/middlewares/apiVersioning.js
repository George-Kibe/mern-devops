const urlVersioning = (version) => (req, res, next) => {
    console.log('Request Path:', req.path);
    if (req.path.startsWith(`/api/${version}`)) {
        // req.apiVersion = version;
        next();
    } else {
        res.status(404).json({
          success: false,
          message: 'API version is not supported' 
        });
    }
}

const headerVersioning = (version) => (req, res, next) => {
    if (req.get("Accept-Version") === version) {
        // req.apiVersion = version;
        next();
    } else {
        res.status(404).json({
          success: false,
          message: 'API version is not supported' 
        });
    }
}

const contentTypeVersioning = (version) => (req, res, next) => {
    const contentType = req.get("Content-Type");
    console.log('Content-Type:', contentType);
    if (contentType && contentType.includes(`application/vnd.api.${version}+json`)) {
        // req.apiVersion = version;
        next();
    } else {
        res.status(404).json({
          success: false,
          message: 'API version is not supported' 
        });
    }
}

module.exports = { urlVersioning, headerVersioning, contentTypeVersioning };
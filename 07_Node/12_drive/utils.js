

function bytesToMB (bytes) {
    const mb = (bytes / (1024 * 1024)).toFixed(2);
    return mb;
};

function resolveResourceType(ext) {
    let type = "auto";
    switch (ext) {
        case (['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv'].includes(ext)): 
            type = "video";
            break
        case (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif', 'heic', 'webp', 'avif'].includes(ext)):
            type = "image";
            break
        default:
            type = "raw";
            break
    }
    return type;
}

const escapeString = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
};

module.exports = { bytesToMB,resolveResourceType, escapeString };
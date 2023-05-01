function isRelativePath(path) {
    path === '.' || path.startsWith('./') || path.startsWith('../');
  }

module.exports = {
    isRelativePath
}
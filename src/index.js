const DEFAULT_DELAY = 250;

function getMixin(delay){
  return {
    _handleScreenResize() {
      if (typeof this._resizeTimeout !== 'undefined') {
        window.clearTimeout(this._resizeTimeout);
        delete this._resizeTimeout;
      }
      this._resizeTimeout = window.setTimeout(() => {
        if (typeof this.onScreenResize === 'function'){
          this.onScreenResize();
        }
      }, delay);
    },
    componentWillMount() {
      window.addEventListener('resize', this._handleScreenResize);
    },
    componentWillUnmount() {
  	  window.removeEventListener('resize', this._handleScreenResize);
    },
    delay(delay) {
      return getMixin(delay);
    }
  }
}

module.exports = getMixin(DEFAULT_DELAY);

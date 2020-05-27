
export const isAuthGuard = (to, from, next) => {
    if (to.meta.auth) {
      if (localStorage.getItem('token')) {
        next.redirect('/chat');
      }
      next.redirect('/login');
    } else {
      next();
    }
};




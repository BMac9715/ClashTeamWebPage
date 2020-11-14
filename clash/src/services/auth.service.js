export const isAuthenticated = () => {
    if(localStorage.getItem('expiration')){
        const expiration_time = new Date( parseInt(localStorage.getItem('expiration')));
        var dateNow = new Date();
    
        return expiration_time.getTime() < dateNow.getTime() ? false : true;
    }
    else{
        return false;
    }
}

export const Logout = () => {
    localStorage.clear();
}
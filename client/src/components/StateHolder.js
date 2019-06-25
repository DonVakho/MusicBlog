class StateHolder{
    constructor(){
      this.isAuthorized = false
      this.userEmail = ''
    }
    login(){
        this.isAuthorized = true
    }
    logout(){
        this.isAuthorized = false
    }
    getStatus(){
        return this.isAuthorized
    }
    setEmail(email){
        this.userEmail = email
    }
    getEmail(){
        return this.userEmail
    }
}
export default new StateHolder()
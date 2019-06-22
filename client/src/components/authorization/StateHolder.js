class StateHolder{
    constructor(){
      this.isAuthorized = false
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
}
export default new StateHolder()
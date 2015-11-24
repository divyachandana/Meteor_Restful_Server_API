if (Meteor.isClient) {

}
Students = new Mongo.Collection('students');
Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.startup(function () {
    //create newrestivus
      var Api=new Restivus({

         /* auth: {
              token: 'auth.apiKey',
              user: function () {
                  return {
                      userId: this.request.headers['user-id'],
                      token: this.request.headers['login-token']
                  };
              }
          },
          defaultHeaders: {
              'Content-Type': 'application/json'
          },
          onLoggedIn: function () {
              console.log(this.user.username + ' (' + this.userId + ') logged in');
          },
          onLoggedOut: function () {
              console.log(this.user.username + ' (' + this.userId + ') logged out');
          },
          prettyJson: true,
          useDefaultAuth: true,
          version: 'v1'*/
          prettyjson:true

      });

      Api.addCollection(Students);
      Api.addCollection(Items);
      /*Api.addCollection(Meteor.users, {
          excludedEndpoints: ['getAll', 'put'],
          routeOptions: {
              authRequired: true
          },
          endpoints: {
              post: {
                  authRequired: false
              },
              delete: {
                  roleRequired: 'admin'
              }
          }
      });*/

      /*Api.addRoute('api/users',{authRequired:true},{
          post: function(){
              if ( Meteor.users.find().count() === 0 ) {
                  Accounts.createUser({
                      username: 'username',
                      email: 'email',
                      password: 'asdfasdf',
                      profile: {
                          first_name: 'fname',
                          last_name: 'lname',
                          company: 'company'
                      }

                  },function(email){
                      var token=JWTLogin.getToken(email);
                      return {status:"success",token:token}
                  });
              }
          }
      });*/
      Api.addRoute('api/students/:id',{authRequired:false},{
          get:function(){
              return Students.findOne(this.urlParams.id);
          },

          put: function () {

              var entityIsUpdated = Students.upsert(this.urlParams.id, this.bodyParams);
              if (entityIsUpdated) {
                  var entity = Students.findOne(this.urlParams);
                  return {status: "success", data: entity};
              }
              else {
                  return {
                      statusCode: 404,
                      body: {status: "fail", message: "student not found"}
                  }
          }},

          delete: function () {
              if (Students.remove(this.urlParams.id)) {
                  return {status: 'success', data: {message: 'student removed'}};
              }
              return {
                  statusCode: 404,
                  body: {status: 'fail', message: 'Student not found'}
              };
          }
      });
Api.addRoute('api/students/',{},{
    post:{
        action:function(data){

            var student=this.urlParams;
            if(student){
                return {status:'success',data:student}

            }else{
                return {status:'fail',message:"student no added found"}
            }
return;
        }
    }

});

  });
}

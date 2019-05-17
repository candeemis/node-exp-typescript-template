
export default [
    {
        pattern: 'https://reqres.in/api(.*)',

        /**
         * returns the data
         *
         * @param match array Result of the resolution of the regular expression
         * @param params object sent by 'send' function
         * @param headers object set by 'set' function
         * @param context object the context of running the fixtures function
         */
        fixtures: function (match: any, params: any, headers: any, context: any) {
            
            if (match[1] === '/users/1') {
              return '{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/api/avatar/128.jpg"}'
            }
       
            if(match[1] === '/avatar/128.jpg'){
                return [12, 23, 34, 45, 64, 23, 53, 85, 124, 234, 43, 231];
            }
         
            //throw 404 for non matching
            throw new Error('404');
            
          },
       
          /**
           * returns the result of the GET request
           *
           * @param match array Result of the resolution of the regular expression
           * @param data  mixed Data returns by `fixtures` attribute
           */
          get: function (match: any, data: any) {
            return {
              body: data
            };
          },
       
          /**
           * returns the result of the POST request
           *
           * @param match array Result of the resolution of the regular expression
           * @param data  mixed Data returns by `fixtures` attribute
           */
          post: function (match: any, data:any) {
            return {
              status: 201,
              data
            };
          }
        }
];
# Important Notes # 
- In the first project, api/avatars directory contains the image files
- In the second project, cron/data contains the users.json file. Which is used to store the users data.
- Before starting all projects, first run `npm install` in *gpe-commons* project followed by `npm run build`.
- After building *gpe-commons* package, run `npm install` in *api* and *cron* projects.

- Test all projects with `npm test` command

* following are URIs to test APIs:
- GET user: http://localhost:3000/api/user/1
- GET avatar: http://localhost:3000/api/user/2/avatar
- DELETE avatar: http://localhost:3000/api/user/2/avatar
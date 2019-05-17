# Important Notes #

- Since the both projects are too small, consisting of just a few files, therefore the files are not organized properly. In production, we do have modules properly organized into their separate directories.
- In the first task, api/avatars directory contains the image files
- In the second task, cron/data contains the users.json file. Which is used to store the users data.
- Before starting both project, please don't forget to run `npm install` command
- Test gpe-commons package with `npm test`

* following are URIs to test APIs:
- GET user: http://localhost:3000/api/user/1
- GET avatar: http://localhost:3000/api/user/2/avatar
- DELETE avatar: http://localhost:3000/api/user/2/avatar

### I have skipped the tests intentionally to save a few minutes ###
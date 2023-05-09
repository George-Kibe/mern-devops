## install prisma as a dev dependency
npm install prisma --save-dev

## Initialize prisma with database provider
npx prisma init --datasource-provider sqlite
###  other datasource providers include postgres, mongodb, mysql
- update schema for your models in schema.prisma

## make migrations
npx prisma migrate dev --name "initial migration"

### To visualize data in the database
npx prisma studio
then navigate to localhost url to view
### prisma client is used to connect to prisma
npm i @prisma/client
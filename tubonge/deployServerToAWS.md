create a ts config file
`npx tsc --init`

add ouDir in tsconfig.json
`"outDir": "./build"`

Add a new script
`"build": "tsc"`

-create an ec2 instance with http, https, and ssh ports access (22, 443, 80)
-Add custom port in inbound rules eg:5000 to allow access to port 500 from anywhere
-create key(.pem) to help ssh into the instance
-install nvm and then install node then instal pm2
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
`source ~/.bashrc` -restart console
`nvm install --lts`- install lts version of node
`sudo yum update -y`
`sudo yum install git -y`
`npm install pm2 -g`
-clone the repository and install node modules and test everything is working fine 
start using pm2 ` pm2 start build/index.js`
`pm2 status` -get status
`pm2 monitor` -get any logs
`pm2 monit`
`pm2 ls` -list all processes
`pm2 restart all` or `pm2 restart processName` -Do this after pulling any changes

DB Instance-twitter
Master Username-postgres
password-kibe1234


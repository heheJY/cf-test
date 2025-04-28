sudo apt update
curl -L -o cloudflared.deb \
  https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb


sudo dpkg -i cloudflared.deb
sudo apt-get -f install
sudo apt install certbot npm nginx python3-certbot-nginx
sudo npm install pm2@latest -g
sudo npm install express@4
sudo npm install -g wrangler

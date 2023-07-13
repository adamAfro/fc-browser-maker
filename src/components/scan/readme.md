Making scannable code is made with 
datalog/[datamatrix-svg](https://github.com/datalog/datamatrix-svg) 
under MIT.

## Testing

For testing codes, serve `docs/scan/index.html` to a phone over https, 
because [html5-qrcode](https://github.com/mebjas/html5-qrcode) needs 
https:// or localhost, but you cannot host locally from desktop as a phone...

### HTTPS

VS Code `live server` extension can serve `https://` 
    with [self-signed cert.](https://www.akadia.com/services/ssh_test_certificate.html)
    1. `openssl genrsa -des3 -out server.key 1024` - create key
    2. `openssl req -new -key server.key -out server.csr` - request self-sign
    3. `openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt` - certificate
    4. then extension needs to be set up with absolute paths to newly created files
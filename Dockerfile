FROM node:22-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 \
 && mkdir -p /app/.next/cache/images && chown -R nextjs:nodejs /app/.next
RUN printf '%s\n' \
  "const http=require('http');" \
  "const fs=require('fs');" \
  "fs.writeFileSync('/app/.next/cache/images/ok.txt','ok');" \
  "http.createServer((_,r)=>{r.writeHead(200,{'Content-Type':'text/plain'});r.end('dominia ok');}).listen(3000,'0.0.0.0');" \
  > server.js
RUN chown nextjs:nodejs /app/server.js
USER nextjs
EXPOSE 3000
CMD ["node","server.js"]
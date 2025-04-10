```bash
curl -X POST -H "Content-Type:application/json" \
    http://localhost:3000/messages -d '{"text":"Hi again, World"}'

curl http://localhost:3000/messages

curl -X DELETE http://localhost:3000/messages/1
```
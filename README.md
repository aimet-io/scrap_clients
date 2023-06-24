# How to works

### Types

```typescript
type Base64String = string;

type RequestBody = {
  url: string;
};

type RequestBody = ResponseBodyData | ResponseBodyError;
type ResponseBodyData = {
  data: {
    image: Base64String;
    title: string;
    description: string;
    url: string;
  };
  error: null;
};
type ResponseBodyError = {
  data: null;
  error: "Error in runtime";
};
```

### Example

`curl http://localhost:3030/ \
    -X POST \
    -d '{"url":"https://lichess.org/"}' \
    -H "Content-Type: application/json"`

```
{
    "data": {
        "image": "data:image/png;base64,iVBO....uCC"
        "title": string;
        "description": string;
        "url": string;
    },
    "error": null;
}
```

### How to run

1. Run "npm install", "yarn install" or "pnpm install"
2. Copy .env.example to .env
3. Edit .env
4. Run "npm run dev"

Note: Please add to .gitignore the files added by npm, yarn or pnpm

# ASHIN CIPHER
A secure encryption and decryption tool with a Python-based API `(ashin-cipher-api.vercel.app)`. This project includes:

Frontend: A Next.js-based React UI for encryption/decryption.

Backend: A Python API with two endpoints (/en/{text} for encryption and /dec/{text} for decryption).

## Features
- Encrypt plaintext into ciphertext using /en/{text}
- Decrypt ciphertext back to plaintext using /dec/{text}
- Copy to Clipboard for easy sharing
- Error Handling for invalid inputs

## Tech Stack
#### Frontend
- Next.js (React)
- TypeScript
- Tailwind CSS (Styling)
- Shadcn/ui (UI Components)


#### Backend
- Python (FastAPI/Flask)
- Vercel Serverless Functions (Deployment)

## API Documentation

### Base URL
`https://ashin-cipher-api.vercel.app`

### Endpoints

#### 1. Encrypt Text
Endpoint: `/enc/`

Method: `POST`

Description: Encrypts plaintext into ciphertext using the Ashin Cipher algorithm
    
Request Body:
```json
{
    "text": "string",
    "key": "string"
}
```

Example Request:
```bash
curl -X POST "https://ashin-cipher-api.vercel.app/en/" \
-H "Content-Type: application/json" \
-d '{"text": "hello world", "key": "secret123"}'
```

Example Response:
```json
{
    "encrypted_message": "AK?KHXI"
}
```

#### 2. Decrypt Text
Endpoint: `/dec/`

Method: `POST`

Description: Decrypts ciphertext back to plaintext using the Ashin Cipher algorithm
Request Body:
```json
{
    "text": "string",
    "key": "string"
}
```

Example Request:
```bash
curl -X POST "https://ashin-cipher-api.vercel.app/decrypt/" \
-H "Content-Type: application/json" \
-d '{"text": "AK?KHXI", "key": "secret123"}'
```

Example Response:
```json
{
    "decrypted_message": "HELLO WORLD"
}
```
# ASHIN CIPHER
A secure encryption and decryption tool with a Python-based API `(ashin-cipher-api.vercel.app)`. This project includes:

Frontend: A Next.js-based React UI for encryption/decryption.

Backend: A Python API with two endpoints (/en/{text} for encryption and /dec/{text} for decryption).

## Features
- Encrypt plaintext into ciphertext using /en/{text}
- Decrypt ciphertext back to plaintext using /dec/{text}
- Copy to Clipboard for easy sharing
- Swap Fields between plaintext and ciphertext
- Responsive UI with dark/light mode
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

> **Development Notice**  
> ⚠️ This API is currently in active development. While encryption/decryption functions are operational, you may encounter occasional issues, particularly with:
> - Special characters in input text
> - Very long messages (>500 characters)


### Base URL
`https://ashin-cipher-api.vercel.app`

### Endpoints

| Endpoint       | Method | Description                              | Example |
|----------------|--------|------------------------------------------|---------|
| `/en/{text}`   | `GET`  | Encrypts plaintext into ciphertext       | [`https://ashin-cipher-api.vercel.app/en/ashin`](https://ashin-cipher-api.vercel.app/en/ashin) → `{"encrypted_message": "DIHIU"}` |
| `/dec/{text}`  | `GET`  | Decrypts ciphertext back to plaintext    | [`https://ashin-cipher-api.vercel.app/dec/DIHIU`](https://ashin-cipher-api.vercel.app/dec/DIHIU) → `{"decrypted_message": "ashin"}` |
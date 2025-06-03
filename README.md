# Yogotribe-Task-2


# Prime Number API - Setup & Testing Guide

## 🚀 Quick Start

### 1. Setup
```bash
# Create project directory
mkdir prime-api
cd prime-api

# Create the files (copy the server.js and package.json from above)
# Save the server code as 'server.js'
# Save the package.json content as 'package.json'

# Install dependencies
npm install
```

### 2. Run the Server
```bash
# Start the server
npm start

# OR for development with auto-restart
npm run dev
```

The server will start on `http://localhost:3000`

## 🧪 Testing the API

### Method 1: Using curl (Command Line)

#### GET Request:
```bash
# Test prime numbers
curl "http://localhost:3000/prime?number=17"
curl "http://localhost:3000/prime?number=25"
curl "http://localhost:3000/prime?number=2"

# Test edge cases
curl "http://localhost:3000/prime?number=1"
curl "http://localhost:3000/prime?number=-5"
curl "http://localhost:3000/prime?number=abc"
```

#### POST Request:
```bash
# Test with JSON body
curl -X POST http://localhost:3000/prime \
  -H "Content-Type: application/json" \
  -d '{"number": 97}'

curl -X POST http://localhost:3000/prime \
  -H "Content-Type: application/json" \
  -d '{"number": 100}'
```

### Method 2: Using a Web Browser
Open your browser and navigate to:
- `http://localhost:3000/` - API documentation
- `http://localhost:3000/prime?number=17` - Test prime check
- `http://localhost:3000/health` - Health check

### Method 3: Using Postman or Thunder Client
1. **GET Request**: `http://localhost:3000/prime?number=17`
2. **POST Request**: 
   - URL: `http://localhost:3000/prime`
   - Headers: `Content-Type: application/json`
   - Body: `{"number": 17}`

## 📋 Expected Responses

### Prime Number (17):
```json
{
  "number": 17,
  "isPrime": true
}
```

### Non-Prime Number (25):
```json
{
  "number": 25,
  "isPrime": false,
  "reason": "Divisible by 5"
}
```

### Invalid Input:
```json
{
  "error": "Invalid input: not a number"
}
```

### Edge Case (1):
```json
{
  "number": 1,
  "isPrime": false,
  "reason": "Numbers less than 2 are not prime"
}
```

## 🔧 Additional Testing

### Create a Simple Test Script
Save this as `test.js`:

```javascript
const http = require('http');

function testAPI(number) {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/prime?number=${number}`,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log(`Testing ${number}: ${data}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Error testing ${number}: ${e.message}`);
  });

  req.end();
}

// Test various numbers
const testNumbers = [2, 3, 4, 17, 25, 97, 100, -1, 1];
testNumbers.forEach(num => testAPI(num));
```

Run with: `node test.js`

## 📝 API Endpoints Summary

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET | `/` | API documentation | - |
| GET | `/health` | Health check | - |
| GET | `/prime?number=N` | Check if N is prime | `?number=17` |
| POST | `/prime` | Check with JSON body | `{"number": 17}` |

## 🛠️ Features

- ✅ Handles both GET and POST requests
- ✅ Input validation and error handling
- ✅ Efficient prime checking algorithm
- ✅ Detailed error messages
- ✅ Health check endpoint
- ✅ API documentation endpoint
- ✅ Support for large numbers

## 🔍 Algorithm Details

The prime checking algorithm:
1. Validates input (number, integer check)
2. Handles edge cases (< 2, even numbers)
3. Uses optimized trial division up to √n
4. Only checks odd divisors for efficiency

Time Complexity: O(√n)
Space Complexity: O(1)

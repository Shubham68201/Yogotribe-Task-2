const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Function to check if a number is prime
function isPrime(num) {
  // Handle edge cases
  if (num === null || num === undefined || isNaN(num)) {
    return { error: 'Invalid input: not a number' };
  }
  
  // Convert to number if it's a string
  const n = Number(num);
  
  // Check if it's an integer
  if (!Number.isInteger(n)) {
    return { error: 'Invalid input: not an integer' };
  }
  
  // Numbers less than 2 are not prime
  if (n < 2) {
    return { number: n, isPrime: false, reason: 'Numbers less than 2 are not prime' };
  }
  
  // 2 is prime
  if (n === 2) {
    return { number: n, isPrime: true };
  }
  
  // Even numbers greater than 2 are not prime
  if (n % 2 === 0) {
    return { number: n, isPrime: false, reason: 'Even numbers greater than 2 are not prime' };
  }
  
  // Check odd divisors up to sqrt(n)
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) {
      return { number: n, isPrime: false, reason: `Divisible by ${i}` };
    }
  }
  
  return { number: n, isPrime: true };
}

// GET endpoint - number as query parameter
app.get('/prime', (req, res) => {
  const { number } = req.query;
  
  if (!number) {
    return res.status(400).json({ 
      error: 'Missing number parameter. Use: /prime?number=17' 
    });
  }
  
  const result = isPrime(number);
  
  if (result.error) {
    return res.status(400).json(result);
  }
  
  res.json(result);
});

// POST endpoint - number in request body
app.post('/prime', (req, res) => {
  const { number } = req.body;
  
  if (number === undefined || number === null) {
    return res.status(400).json({ 
      error: 'Missing number in request body. Send: {"number": 17}' 
    });
  }
  
  const result = isPrime(number);
  
  if (result.error) {
    return res.status(400).json(result);
  }
  
  res.json(result);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Prime API is running' });
});

// Root endpoint with usage instructions
app.get('/', (req, res) => {
  res.json({
    message: 'Prime Number API',
    endpoints: {
      'GET /prime?number=N': 'Check if number N is prime',
      'POST /prime': 'Send {"number": N} in request body',
      'GET /health': 'Health check'
    },
    examples: {
      'GET': '/prime?number=17',
      'POST': 'POST /prime with body {"number": 17}'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Prime API server running on http://localhost:${PORT}`);
  console.log(`📖 API documentation: http://localhost:${PORT}`);
});

module.exports = app;
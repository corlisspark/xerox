const http = require('http');
const fs = require('fs');
const path = require('path');

// Mock data
const mockPosts = [
  {
    id: 1,
    title: "Vintage Bicycle for Sale",
    price: 250,
    category: "Sports & Recreation",
    neighborhood: "Downtown",
    description: "Classic vintage bike in excellent condition",
    images: ["https://via.placeholder.com/300x200?text=Vintage+Bike"],
    condition: "Good",
    delivery: true,
    email: "seller@example.com",
    createdAt: new Date('2025-12-20')
  },
  {
    id: 2,
    title: "iPhone 13 - Unlocked",
    price: 650,
    category: "Electronics",
    neighborhood: "Uptown", 
    description: "Barely used iPhone 13, unlocked for all carriers",
    images: ["https://via.placeholder.com/300x200?text=iPhone+13"],
    condition: "Like New",
    delivery: false,
    email: "phone@example.com",
    createdAt: new Date('2025-12-25')
  },
  {
    id: 3,
    title: "Couch - Sectional",
    price: 400,
    category: "Furniture",
    neighborhood: "Midtown",
    description: "Comfortable sectional couch, pet-free home",
    images: ["https://via.placeholder.com/300x200?text=Sectional+Couch"],
    condition: "Fair",
    delivery: true,
    email: "furniture@example.com",
    createdAt: new Date('2025-12-22')
  }
];

const mockCategories = [
  { id: 1, name: "Electronics", count: 25 },
  { id: 2, name: "Furniture", count: 18 },
  { id: 3, name: "Sports & Recreation", count: 12 },
  { id: 4, name: "Vehicles", count: 8 },
  { id: 5, name: "Books & Media", count: 15 }
];

const mockNeighborhoods = [
  { id: 1, name: "Downtown", count: 22 },
  { id: 2, name: "Uptown", count: 19 },
  { id: 3, name: "Midtown", count: 16 },
  { id: 4, name: "Eastside", count: 11 },
  { id: 5, name: "Westside", count: 13 }
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Routes
  if (url.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');

    if (url === '/api/posts' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(mockPosts));
      return;
    }

    if (url === '/api/categories' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(mockCategories));
      return;
    }

    if (url === '/api/neighborhoods' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(mockNeighborhoods));
      return;
    }

    if (url.startsWith('/api/posts/') && method === 'GET') {
      const postId = parseInt(url.split('/')[3]);
      const post = mockPosts.find(p => p.id === postId);
      if (post) {
        res.writeHead(200);
        res.end(JSON.stringify(post));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Post not found' }));
      }
      return;
    }

    // Default API response
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  // Serve static HTML for React app demo
  if (url === '/' || url === '/index.html') {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craigslist Clone - MERN Stack</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
        .header { background: #4a90e2; color: white; padding: 1rem; text-align: center; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat-card { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
        .post-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .post-image { width: 100%; height: 200px; object-fit: cover; }
        .post-content { padding: 1rem; }
        .post-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
        .post-price { color: #4a90e2; font-weight: bold; font-size: 1.2rem; }
        .post-meta { color: #666; font-size: 0.9rem; margin-top: 0.5rem; }
        .tech-stack { background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
        .tech-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .features { background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
        .features ul { list-style-position: inside; }
        .features li { margin-bottom: 0.5rem; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏠 Craigslist Clone - MERN Stack Demo</h1>
        <p>Full-stack marketplace application with React, Node.js, Express, and MongoDB</p>
    </div>
    
    <div class="container">
        <div class="tech-stack">
            <h2>🛠️ Technology Stack</h2>
            <div class="tech-list">
                <div>
                    <h4>Frontend</h4>
                    <ul>
                        <li>React 16.8.6</li>
                        <li>React Router</li>
                        <li>SCSS Styling</li>
                        <li>Google Maps API</li>
                        <li>React Carousel</li>
                    </ul>
                </div>
                <div>
                    <h4>Backend</h4>
                    <ul>
                        <li>Node.js & Express</li>
                        <li>MongoDB & Mongoose</li>
                        <li>Cloudinary (Image hosting)</li>
                        <li>CORS enabled</li>
                        <li>RESTful API</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="features">
            <h2>✨ Key Features</h2>
            <ul>
                <li>📝 Post new items with multiple image uploads</li>
                <li>🏘️ Neighborhood-based listings</li>
                <li>❤️ Favorites system with localStorage persistence</li>
                <li>🗺️ Google Maps integration for seller locations</li>
                <li>🔍 Category-based filtering</li>
                <li>📱 Responsive design</li>
                <li>🧪 Cypress end-to-end testing</li>
            </ul>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h3 id="posts-count">Loading...</h3>
                <p>Total Posts</p>
            </div>
            <div class="stat-card">
                <h3 id="categories-count">Loading...</h3>
                <p>Categories</p>
            </div>
            <div class="stat-card">
                <h3 id="neighborhoods-count">Loading...</h3>
                <p>Neighborhoods</p>
            </div>
        </div>

        <h2>📋 Recent Listings</h2>
        <div id="posts-container" class="posts-grid">
            <div>Loading posts...</div>
        </div>
    </div>

    <script>
        // Load data from our mock API
        Promise.all([
            fetch('/api/posts').then(r => r.json()),
            fetch('/api/categories').then(r => r.json()),
            fetch('/api/neighborhoods').then(r => r.json())
        ]).then(([posts, categories, neighborhoods]) => {
            // Update stats
            document.getElementById('posts-count').textContent = posts.length;
            document.getElementById('categories-count').textContent = categories.length;
            document.getElementById('neighborhoods-count').textContent = neighborhoods.length;

            // Display posts
            const container = document.getElementById('posts-container');
            container.innerHTML = posts.map(post => \`
                <div class="post-card">
                    <img src="\${post.images[0]}" alt="\${post.title}" class="post-image">
                    <div class="post-content">
                        <div class="post-title">\${post.title}</div>
                        <div class="post-price">$\${post.price}</div>
                        <div class="post-meta">
                            📍 \${post.neighborhood} • 📂 \${post.category}<br>
                            🔧 \${post.condition} • \${post.delivery ? '🚚 Delivery Available' : '🏪 Pickup Only'}
                        </div>
                    </div>
                </div>
            \`).join('');
        }).catch(err => {
            console.error('Error loading data:', err);
            document.getElementById('posts-container').innerHTML = '<div>Error loading posts</div>';
        });
    </script>
</body>
</html>
    `);
    return;
  }

  // 404 for other routes
  res.writeHead(404);
  res.end('Page not found');
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Craigslist Clone server started on port ${port}`);
  console.log(`Visit: http://localhost:${port}`);
});
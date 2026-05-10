const posts = [
    {
        title: "Master JavaScript in 30 Days",
        desc: "Learn JavaScript from basics to advanced concepts with projects and challenges.",
        category: "JavaScript",
        date: "10 May 2026",
        author: "Shrey Patel",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
        title: "CSS Tricks for Modern UI Design",
        desc: "Improve your frontend design skills with glassmorphism, gradients, animations and layouts.",
        category: "CSS",
        date: "09 May 2026",
        author: "Shrey Patel",
        img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
        title: "Build Responsive Websites Fast",
        desc: "Learn how to create responsive layouts using Flexbox, Grid and media queries.",
        category: "HTML",
        date: "08 May 2026",
        author: "Shrey Patel",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
        title: "Frontend Developer Roadmap 2026",
        desc: "Complete guide to becoming a frontend developer with React, JS, CSS and projects.",
        category: "Career",
        date: "07 May 2026",
        author: "Shrey Patel",
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },
    {
        title: "Top UI Inspiration Websites",
        desc: "Discover best websites for UI inspiration and creative design ideas.",
        category: "Design",
        date: "06 May 2026",
        author: "Shrey Patel",
        img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231"
    }
];

function renderPosts(data) {
    const blog = document.getElementById("blogContainer");
    blog.innerHTML = "";

    data.forEach(post => {
        blog.innerHTML += `
            <div class="card">
            <img src="${post.img}?auto=format&fit=crop&w=900&q=80">
            <div class="card-content">
            <span class="tag">${post.category}</span>
            <h2>${post.title}</h2>
            <p>${post.desc}</p>
            <div class="meta">
            <span>${post.author}</span>
            <span>${post.date}</span>
            </div>
            <a href="#" class="read-btn">Read More</a>
            </div>
            </div>
        `;
    });
}

function searchPosts() {
    const value = document.getElementById("searchInput").value.toLowerCase();

    const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.category.toLowerCase().includes(value)
    );

    renderPosts(filtered);
}

renderPosts(posts);
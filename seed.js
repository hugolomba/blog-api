import prisma from "./src/config/prisma.js";
import bcrypt from "bcryptjs";
import cloudinary from "./src/config/cloudinary.js";
import upload from "./src/config/multer.js";

async function seed() {
  try {
    // Limpar dados
    await prisma.comment.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.savedPost.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.follower.deleteMany({});
    await prisma.user.deleteMany({});

    const passwordHash = await bcrypt.hash("123456", 10);

    // Usuários com avatarImage já pronto (Cloudinary URLs fixas)
    const usersData = [
      {
        name: "Hugo",
        username: "hugo",
        email: "hugo@example.com",
        password: passwordHash,
        isAdmin: true,
        avatarImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Passionate about technology and blogging."
      },
      {
        name: "Andrea",
        username: "andrea",
        email: "andrea@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Loves cats, coffee, and sharing moments."
      },
      {
        name: "Medusa",
        username: "medusa",
        email: "medusa@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Curious cat who loves naps and treats."
      },
      {
        name: "Patricia",
        username: "patricia",
        email: "patricia@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Nature lover and coffee enthusiast."
      },
      {
        name: "Rafaela",
        username: "rafaela",
        email: "rafaela@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Bookworm and aspiring writer."
      },
    ];

    const createdUsers = [];
    for (const userData of usersData) {
      const user = await prisma.user.create({ data: userData });
      createdUsers.push(user);
    }

    const [hugo, andrea, medusa, patricia, rafaela] = createdUsers;

    // Posts com conteúdo longo
    const postsContent = {
      hugo: [
        {
          title: "Dinner delight",
          content: `Today Andrea cooked dinner and it was nothing short of amazing. The aroma filled the entire apartment, making everyone feel instantly hungry. We started with a fresh garden salad, tossed with a delicate vinaigrette, followed by a perfectly roasted chicken that was juicy and tender. Each bite was seasoned to perfection, highlighting the rich flavors of garlic, rosemary, and thyme. We ended the meal with a homemade chocolate mousse, light yet decadently sweet, which perfectly concluded the evening. It’s moments like these that make you appreciate the simple joys of life and the people we share them with.`,
          coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Lazy Medusa",
          content: `Medusa has claimed the sofa once again. Her golden fur glows in the afternoon sunlight streaming through the window, and her soft purring creates a calming ambiance throughout the living room. She stretches, yawns, and curls into a perfect ball of fluff. It's incredible how much personality a cat can have, each movement deliberate and full of charm. Watching her relax reminds me of the importance of taking time for ourselves, embracing moments of stillness and comfort.`,
          coverImage: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Family park walk",
          content: `We took a leisurely walk in the park today, and it was simply perfect. The trees swayed gently in the breeze, and the sun filtered through the leaves, casting playful shadows on the path. Children were laughing as they chased each other, dogs ran happily off-leash, and everyone seemed to share in the serenity of nature. It's in these moments, away from screens and schedules, that you truly reconnect with family, friends, and yourself. The simplicity of the day was its own luxury.`,
          coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      andrea: [
        {
          title: "Special breakfast",
          content: `Hugo surprised me with a breakfast that felt like a scene out of a magazine. The table was set with fresh flowers, delicate porcelain plates, and the aroma of freshly brewed coffee. There were fluffy pancakes topped with strawberries, a side of scrambled eggs with herbs, and a freshly squeezed orange juice. Every detail was thoughtful and heartfelt. Sharing the meal, laughing, and enjoying the morning sun made me realize how small gestures can carry the deepest love and appreciation.`,
          coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Cat mischief",
          content: `Medusa decided to explore the living room today, leaving a trail of mischief everywhere. She clawed at the rug, knocked over a small vase, and chased a beam of sunlight across the floor. Her antics, though chaotic, were utterly charming. Watching her reminds me that curiosity and playfulness are essential, not just for cats but for humans too. Finding joy in small, unexpected moments is what life is truly about.`,
          coverImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Movie night",
          content: `We spent the evening watching classic movies. The living room was cozy, with blankets and soft lighting creating the perfect atmosphere. We shared snacks, laughed at funny scenes, and discussed our favorite parts. It wasn’t just about the movies—it was about connecting, reminiscing, and creating shared memories. These small traditions, though simple, are the threads that weave together the fabric of relationships.`,
          coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      medusa: [
        {
          title: "Purring time",
          content: `Curling up on Andrea's lap, I felt a wave of contentment as she petted me gently. The rhythmic motion of her hands, combined with the soft hum of her voice, made me purr loudly. It's in these quiet, intimate moments that I feel most connected to my humans. Life as a cat may seem simple, but the small joys—like warmth, affection, and trust—make every day meaningful.`,
          coverImage: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Waiting for treats",
          content: `I sat patiently by the kitchen door, hoping Hugo would remember the treats he promised. My tail swished back and forth as anticipation grew, eyes fixed on his every move. Patience, after all, is a virtue—even for a cat. Eventually, the reward arrived, and it was worth every second of the wait. Sometimes, the most satisfying moments are the ones we have to wait for, savoring the anticipation.`,
          coverImage: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Sun nap",
          content: `Basking in the afternoon sun, I felt the warmth seep into my fur, relaxing every muscle. The gentle sway of the trees outside created a natural lullaby, perfect for a nap. Life as a cat is full of these serene interludes, moments where nothing else matters but comfort and peace. Observing the world from this sunny spot reminds me of the value of slowing down and enjoying the simple pleasures.`,
          coverImage: "https://images.unsplash.com/photo-1508214751199-0c6c3f3c4f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      patricia: [
        {
          title: "Morning hike",
          content: `I went for a hike in the hills this morning, and the experience was invigorating. The path wound through dense forests, open meadows, and alongside a babbling brook. Each step brought a new perspective, a new scent, a new sound. The morning air was crisp and refreshing, filling my lungs with energy. Hiking not only strengthens the body but rejuvenates the mind. Reaching the summit and looking over the valley below was a reward worth every ounce of effort.`,
          coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Coffee time",
          content: `I explored a new coffee blend today. The aroma was intoxicating, a mix of roasted beans and subtle floral notes. Sipping slowly, I savored the complexity of the flavour, noticing hints of chocolate and caramel. Coffee, for me, is more than a drink; it's a moment of mindfulness, a pause in the day to reflect and appreciate the little things that bring joy.`,
          coverImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Nature photography",
          content: `I spent the afternoon capturing the beauty of nature with my camera. The play of light and shadow, the vibrant colours of leaves, and the intricate patterns of flowers were breathtaking. Photography allows me to freeze these moments, preserving them to revisit whenever I need a reminder of the world's splendor. Each photograph tells a story, and sharing these stories brings happiness to others as well.`,
          coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      rafaela: [
        {
          title: "Book recommendation",
          content: `I just finished reading an incredible novel that kept me hooked from the first page to the last. The plot was intricate, the characters were deeply developed, and the emotional depth was profound. It reminded me of the power of storytelling and how literature can transport us to entirely new worlds. I highly recommend it to anyone looking for a book that will challenge your imagination and touch your heart.`,
          coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Writing thoughts",
          content: `Today I spent hours writing in my journal, pouring thoughts, memories, and dreams onto the page. Writing is a form of meditation for me, a way to understand myself and the world around me. Each word carries intention, each sentence a reflection. There is something therapeutic in the act of creating, a calm that settles over the mind and spirit. I feel lighter, more focused, and ready to embrace whatever comes next.`,
          coverImage: "https://images.unsplash.com/photo-1496104679561-38b4c103f5d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Library afternoon",
          content: `I spent a quiet afternoon at the library, surrounded by shelves filled with stories, knowledge, and inspiration. The scent of books, the soft rustle of pages, and the gentle hum of readers created a peaceful sanctuary. Libraries remind me that learning and exploration never end, and that curiosity is a lifelong companion. I left feeling enriched, inspired, and grateful for the treasures that books provide.`,
          coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
    };

    // Criar posts e comentários
    for (const user of createdUsers) {
      const userPosts = postsContent[user.username];
      for (const postData of userPosts) {
        const post = await prisma.post.create({
          data: {
            title: postData.title,
            content: postData.content,
            coverImage: postData.coverImage,
            published: true,
            authorId: user.id,
          },
        });

        // Comentários dos outros usuários
        for (const commenter of createdUsers) {
          if (commenter.id !== user.id) {
            let commentText = "";
            if (user.username === "hugo") {
              commentText =
                commenter.username === "andrea"
                  ? "Glad you enjoyed it!"
                  : commenter.username === "medusa"
                  ? "Meow! 😸"
                  : "Sounds lovely!";
            } else if (user.username === "andrea") {
              commentText =
                commenter.username === "hugo"
                  ? "You deserve recognition!"
                  : commenter.username === "medusa"
                  ? "Purring along! 😻"
                  : "Amazing post!";
            } else if (user.username === "medusa") {
              commentText =
                commenter.username === "hugo"
                  ? "I will wait patiently! 😼"
                  : commenter.username === "andrea"
                  ? "Petting accepted! 😽"
                  : "So cute!";
            } else if (user.username === "patricia") {
              commentText =
                commenter.username === "hugo"
                  ? "Looks like a great hike!"
                  : commenter.username === "andrea"
                  ? "Beautiful scenery!"
                  : commenter.username === "medusa"
                  ? "Meow inspiration! 😺"
                  : "I want to join!";
            } else if (user.username === "rafaela") {
              commentText =
                commenter.username === "hugo"
                  ? "Nice book choice!"
                  : commenter.username === "andrea"
                  ? "Love your writing!"
                  : commenter.username === "medusa"
                  ? "Purrfect! 😻"
                  : "Interesting read!";
            }

            await prisma.comment.create({
              data: {
                content: commentText,
                authorId: commenter.id,
                postId: post.id,
              },
            });
          }
        }
      }
    }

    console.log("Database seeded with long blog-like posts!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();